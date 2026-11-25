import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, roleInvitationEmail } from "@/lib/email/send";

/**
 * FR-49: Admins manage user roles and view user accounts.
 * FR-7: Roles are assigned by an admin only, through invitations the user must accept
 *       (database functions admin_invite_role / respond_role_invitation / admin_remove_role).
 * FR-50: Every change is written to the audit log by those database functions.
 *
 * GET  /api/admin/users?q=<username, name or email>   search users (empty q = newest 50)
 * GET  /api/admin/users?id=<uuid>                      one user's details, activity and scripts
 * POST /api/admin/users  { action: "invite", user_id, role: "curator" | "admin", note? }
 *                        { action: "remove_role", user_id, reason? }
 *                        { action: "revoke_invite", invitation_id }
 */
const PROFILE_FIELDS =
  "id, email, username, first_name, last_name, display_name, role, user_type, experience_level, country, city, created_at, last_active_at, onboarding_completed_at, deletion_requested_at";

export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const [profile, niches, scripts, activity, invitations] = await Promise.all([
        supabase.from("profiles").select(PROFILE_FIELDS).eq("id", id).maybeSingle(),
        supabase.from("user_niches").select("niche_id, saved_at").eq("user_id", id),
        supabase.from("generated_scripts").select("id, niche_id, topic, word_count, created_at", { count: "exact" })
          .eq("user_id", id).order("created_at", { ascending: false }).limit(10),
        supabase.from("activity_events").select("event_type, niche_id, target, created_at", { count: "exact" })
          .eq("user_id", id).order("created_at", { ascending: false }).limit(30),
        supabase.from("role_invitations").select("id, role, status, created_at, responded_at")
          .eq("user_id", id).order("created_at", { ascending: false }),
      ]);
      if (profile.error) throw profile.error;
      if (!profile.data) return NextResponse.json({ error: "User not found." }, { status: 404 });
      return NextResponse.json({
        user: profile.data,
        niches: niches.data || [],
        scripts: scripts.data || [],
        scriptCount: scripts.count ?? 0,
        activity: activity.data || [],
        activityCount: activity.count ?? 0,
        invitations: invitations.data || [],
      });
    }

    const q = (searchParams.get("q") || "").trim().replace(/^@/, "").replace(/[%,()]/g, "").slice(0, 80);
    let query = supabase.from("profiles").select(PROFILE_FIELDS).order("created_at", { ascending: false }).limit(50);
    if (q) {
      const like = `%${q}%`;
      query = query.or(
        `username.ilike.${like},email.ilike.${like},display_name.ilike.${like},first_name.ilike.${like},last_name.ilike.${like}`
      );
    }
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ users: data || [] });
  } catch (err: any) {
    console.error("Admin users GET error:", err);
    return NextResponse.json({ error: err?.message || "Failed to load users." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const body = await request.json().catch(() => ({}));

    if (body.action === "invite") {
      const roleLabel = body.role === "admin" ? "admin" : "curator";

      // Already invited and still waiting for an answer? Don't create a second invitation:
      // send the invitation email again as a reminder.
      const { data: pending, error: pendingError } = await supabase
        .from("role_invitations")
        .select("id, created_at")
        .eq("user_id", body.user_id)
        .eq("role", body.role)
        .eq("status", "pending")
        .maybeSingle();
      if (pendingError) {
        console.error("[admin/users] could not read invitations:", pendingError.message);
        return NextResponse.json(
          { error: `Could not check existing invitations (${pendingError.message}). Run the latest database update and try again.` },
          { status: 500 }
        );
      }

      let data: string | null = pending?.id ?? null;
      const resent = Boolean(pending);
      if (!pending) {
        const result = await supabase.rpc("admin_invite_role", {
          p_user: body.user_id,
          p_role: body.role,
          p_note: body.note || null,
        });
        if (result.error) {
          const message =
            result.error.code === "23505"
              ? `This user already has a ${roleLabel} invitation waiting for an answer.`
              : result.error.message;
          console.warn("[admin/users] invite refused:", message);
          return NextResponse.json({ error: message }, { status: 400 });
        }
        data = result.data;
      }

      // Email the invitee so they know to answer (the in-app notification was created by the database)
      const { data: invitee } = await supabase
        .from("profiles")
        .select("email, display_name, first_name")
        .eq("id", body.user_id)
        .maybeSingle();
      let email: { sent: boolean; reason?: string } = { sent: false, reason: "No email address on this account." };
      if (invitee?.email) {
        const message = roleInvitationEmail({
          name: invitee.first_name || invitee.display_name || "there",
          role: body.role === "admin" ? "admin" : "curator",
          inviterName: gate.account.displayName,
          note: body.note || null,
        });
        email = await sendEmail({ to: invitee.email, ...message });
      }
      await supabase.from("audit_log").insert({
        actor_id: gate.account.userId,
        action: email.sent ? "role_invite_email_sent" : "role_invite_email_failed",
        target: body.user_id,
        details: { invitation_id: data, role: body.role, reminder: resent, reason: email.sent ? null : email.reason },
      });

      return NextResponse.json({
        success: true,
        invitationId: data,
        resent,
        emailSent: email.sent,
        emailError: email.sent ? null : email.reason,
      });
    }

    if (body.action === "remove_role") {
      const { error } = await supabase.rpc("admin_remove_role", { p_user: body.user_id, p_reason: body.reason || null });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true });
    }

    if (body.action === "revoke_invite") {
      const { error } = await supabase.rpc("admin_revoke_invitation", { p_invitation: body.invitation_id });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (err: any) {
    console.error("Admin users POST error:", err);
    return NextResponse.json({ error: err?.message || "Failed to update user." }, { status: 500 });
  }
}
