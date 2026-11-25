import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * FR-50: The system shall keep an audit log of every curator and admin change, recording who, what, and when. Logs shall be kept for one year.
 * FR-51: Admins shall be able to view the audit log.
 *
 * GET /api/admin/audit-log?action=<code|group>&from=YYYY-MM-DD&to=YYYY-MM-DD&before=<iso>&limit=50
 * Returns entries with the actor's name ("who") and, when the target is an account, the target's name.
 */
const GROUPS: Record<string, string[]> = {
  roles: ["role_invite_sent", "role_invite_accepted", "role_invite_declined", "role_invite_revoked", "role_removed", "role_invite_email_sent", "role_invite_email_failed"],
  curation: ["add_creator", "edit_creator", "remove_creator", "enter_video_data"],
  refresh: ["manual_youtube_refresh", "manual_tiktok_title_refresh", "fake_snapshots_removed"],
  settings: ["setting_changed", "gemini_key_changed", "announcement_sent"],
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const params = new URL(request.url).searchParams;

    // Logs kept for 1 year (FR-50)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const limit = Math.min(200, Math.max(1, Number(params.get("limit")) || 50));
    const from = params.get("from");
    const to = params.get("to");
    const before = params.get("before");
    const action = params.get("action") || "";

    let query = supabase
      .from("audit_log")
      .select("id, actor_id, action, target, details, created_at")
      .gte("created_at", from && new Date(from) > oneYearAgo ? new Date(from).toISOString() : oneYearAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(limit);
    if (to) query = query.lt("created_at", new Date(new Date(to).getTime() + 86400000).toISOString());
    if (before) query = query.lt("created_at", before);
    if (GROUPS[action]) query = query.in("action", GROUPS[action]);
    else if (action) query = query.eq("action", action);

    const { data: logs, error } = await query;
    if (error) throw error;

    // "Who": names for actors and for targets that are accounts
    const ids = new Set<string>();
    for (const l of logs || []) {
      if (l.actor_id) ids.add(l.actor_id);
      if (l.target && UUID.test(l.target)) ids.add(l.target);
    }
    const names: Record<string, { name: string; email: string; username: string | null; role: string }> = {};
    if (ids.size) {
      const { data: people } = await supabase
        .from("profiles")
        .select("id, display_name, email, username, role")
        .in("id", [...ids]);
      for (const p of people || []) names[p.id] = { name: p.display_name, email: p.email, username: p.username, role: p.role };
    }

    return NextResponse.json({
      logs: (logs || []).map((l) => ({
        ...l,
        actor: l.actor_id ? names[l.actor_id] || null : null,
        targetPerson: l.target && names[l.target] ? names[l.target] : null,
      })),
      retentionPolicy: "1 year",
      totalReturned: logs?.length || 0,
      hasMore: (logs?.length || 0) === limit,
    });
  } catch (err: any) {
    console.error("Admin audit log GET error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to retrieve audit log." },
      { status: 500 }
    );
  }
}
