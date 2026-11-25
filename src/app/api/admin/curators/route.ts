import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/admin/curators?from=YYYY-MM-DD&to=YYYY-MM-DD
 * Work done by each curator (and admin) in the period, from the audit log, for review and payment.
 */
const WORK_ACTIONS: Record<string, string> = {
  add_creator: "creatorsAdded",
  edit_creator: "creatorsEdited",
  remove_creator: "creatorsRemoved",
  enter_video_data: "videosEntered",
};

export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const to = searchParams.get("to") || new Date().toISOString().slice(0, 10);
    const from = searchParams.get("from") || new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const toExclusive = new Date(new Date(to).getTime() + 86400000).toISOString();

    const [staff, log] = await Promise.all([
      supabase.from("profiles").select("id, email, username, display_name, role, last_active_at")
        .in("role", ["curator", "admin", "super_admin"]).order("role"),
      supabase.from("audit_log").select("actor_id, action, created_at")
        .in("action", Object.keys(WORK_ACTIONS))
        .gte("created_at", new Date(from).toISOString()).lt("created_at", toExclusive).limit(10000),
    ]);
    if (staff.error) throw staff.error;

    const totals: Record<string, Record<string, number | string | null>> = {};
    for (const s of staff.data || []) {
      totals[s.id] = { creatorsAdded: 0, creatorsEdited: 0, creatorsRemoved: 0, videosEntered: 0, total: 0, lastWorkAt: null };
    }
    for (const row of log.data || []) {
      const t = totals[row.actor_id];
      if (!t) continue;
      const key = WORK_ACTIONS[row.action];
      t[key] = (t[key] as number) + 1;
      t.total = (t.total as number) + 1;
      if (!t.lastWorkAt || String(row.created_at) > String(t.lastWorkAt)) t.lastWorkAt = row.created_at;
    }

    return NextResponse.json({
      from,
      to,
      curators: (staff.data || []).map((s) => ({ ...s, work: totals[s.id] })),
    });
  } catch (err: any) {
    console.error("Admin curators error:", err);
    return NextResponse.json({ error: err?.message || "Failed to load curator activity." }, { status: 500 });
  }
}
