import { NextRequest, NextResponse } from "next/server";
import { publicMessage } from "@/lib/http/errors";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * GET   /api/notifications?limit=30            newest notifications + unread count
 * PATCH /api/notifications { ids: [...] }      mark some as read
 * PATCH /api/notifications { all: true }       mark all as read
 * POST  /api/notifications { action: "respond_invite", invitation_id, accept }
 *        accept/decline a curator/admin invitation (database function respond_role_invitation)
 */
export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const limit = Math.min(100, Math.max(1, Number(new URL(request.url).searchParams.get("limit")) || 30));

    const [list, unread, invites] = await Promise.all([
      supabase.from("notifications").select("id, type, title, body, link, data, read_at, created_at")
        .eq("user_id", gate.account.userId).order("created_at", { ascending: false }).limit(limit),
      supabase.from("notifications").select("id", { count: "exact", head: true })
        .eq("user_id", gate.account.userId).is("read_at", null),
      supabase.from("role_invitations").select("id, status").eq("user_id", gate.account.userId),
    ]);
    if (list.error) {
      console.error("[notifications] could not load:", list.error.message);
      return NextResponse.json({ notifications: [], unread: 0, migrated: false, error: list.error.message });
    }
    if (invites.error) console.error("[notifications] could not read invitations:", invites.error.message);

    // Tell the UI which invitation notifications can still be answered
    const inviteStatus: Record<string, string> = {};
    for (const inv of invites.data || []) inviteStatus[inv.id] = inv.status;
    const notifications = (list.data || []).map((n: any) => ({
      ...n,
      invitationStatus: n.type === "role_invite" ? inviteStatus[n.data?.invitation_id] || "unknown" : undefined,
    }));

    return NextResponse.json({ notifications, unread: unread.count ?? 0, migrated: true });
  } catch (err: any) {
    return NextResponse.json({ error: publicMessage(err, "Failed to load notifications.", "notifications") }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const body = await request.json().catch(() => ({}));
    let query = supabase.from("notifications").update({ read_at: new Date().toISOString() })
      .eq("user_id", gate.account.userId).is("read_at", null);
    if (!body.all) {
      const ids = Array.isArray(body.ids) ? body.ids.filter((x: unknown) => typeof x === "string").slice(0, 100) : [];
      if (ids.length === 0) return NextResponse.json({ success: true });
      query = query.in("id", ids);
    }
    const { error } = await query;
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: publicMessage(err, "Failed to update notifications.", "notifications") }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const body = await request.json().catch(() => ({}));
    if (body.action !== "respond_invite" || typeof body.invitation_id !== "string") {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("respond_role_invitation", {
      p_invitation: body.invitation_id,
      p_accept: Boolean(body.accept),
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await supabase.from("activity_events").insert({
      user_id: gate.account.userId,
      event_type: "role_invite_answered",
      target: body.accept ? "accepted" : "declined",
      metadata: { invitation_id: body.invitation_id },
    });
    return NextResponse.json({ success: true, result: data });
  } catch (err: any) {
    return NextResponse.json({ error: publicMessage(err, "Failed to answer the invitation.", "notifications") }, { status: 500 });
  }
}
