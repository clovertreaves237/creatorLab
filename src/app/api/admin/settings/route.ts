import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * GET   /api/admin/settings                      all settings + pending invitations
 * PATCH /api/admin/settings { key, value }        update one setting (audited)
 * POST  /api/admin/settings { action: "broadcast", title, body, link?, audience }
 *        audience: "all" | "curators" | "admins" | <niche id>
 */
const ALLOWED: Record<string, (v: unknown) => boolean> = {
  daily_script_limit: (v) => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 1000,
};

export async function GET() {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const [settings, invites] = await Promise.all([
      supabase.from("app_settings").select("key, value, updated_at"),
      supabase.from("role_invitations")
        .select("id, role, status, note, created_at, responded_at, user:profiles!role_invitations_user_id_fkey(id, email, username, display_name)")
        .order("created_at", { ascending: false }).limit(50),
    ]);
    const map: Record<string, unknown> = {};
    for (const row of settings.data || []) map[row.key] = row.value;
    return NextResponse.json({ settings: map, invitations: invites.data || [], invitationsError: invites.error?.message });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load settings." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const { key, value } = await request.json().catch(() => ({}));
    if (!ALLOWED[key] || !ALLOWED[key](value)) {
      return NextResponse.json({ error: "Invalid setting." }, { status: 400 });
    }
    const { error } = await supabase.from("app_settings").upsert({
      key,
      value,
      updated_by: gate.account.userId,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    await supabase.from("audit_log").insert({
      actor_id: gate.account.userId,
      action: "setting_changed",
      target: key,
      details: { value },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to save setting." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const body = await request.json().catch(() => ({}));
    if (body.action !== "broadcast") return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    const title = String(body.title || "").trim().slice(0, 120);
    const text = String(body.body || "").trim().slice(0, 1000);
    if (!title) return NextResponse.json({ error: "A title is required." }, { status: 400 });
    const link = typeof body.link === "string" && body.link.startsWith("/") ? body.link : null;
    const { data, error } = await supabase.rpc("admin_broadcast", {
      p_title: title,
      p_body: text || null,
      p_link: link,
      p_audience: String(body.audience || "all"),
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, recipients: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to send announcement." }, { status: 500 });
  }
}
