import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/admin/overview?days=14|30|90 : platform numbers for the admin home screen.
 * Scripts are counted from script_requests, the permanent record of every script written (no notes stored).
 * The generated_scripts table only keeps 14 days (de-duplication), so it cannot be used for history.
 */
export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();

    const requested = Number(new URL(request.url).searchParams.get("days"));
    const days = [14, 30, 90].includes(requested) ? requested : 14;

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const since7 = new Date(now - 7 * day).toISOString();
    const sinceRange = new Date(now - (days - 1) * day);
    sinceRange.setUTCHours(0, 0, 0, 0);
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const count = (q: any) =>
      q.then((r: any) => {
        if (r.error) console.error("[admin/overview]", r.error.message);
        return r.count ?? 0;
      });
    const [
      users,
      newUsers7,
      activeUsers7,
      notOnboarded,
      curators,
      admins,
      scriptsTotal,
      scriptsToday,
      pendingInvites,
      rangeScripts,
      niches,
      deletionRequests,
      recentActivity,
    ] = await Promise.all([
      count(supabase.from("profiles").select("id", { count: "exact", head: true })),
      count(supabase.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", since7)),
      count(supabase.from("profiles").select("id", { count: "exact", head: true }).gte("last_active_at", since7)),
      count(supabase.from("profiles").select("id", { count: "exact", head: true }).is("onboarding_completed_at", null)),
      count(supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "curator")),
      count(supabase.from("profiles").select("id", { count: "exact", head: true }).in("role", ["admin", "super_admin"])),
      count(supabase.from("script_requests").select("id", { count: "exact", head: true })),
      count(supabase.from("script_requests").select("id", { count: "exact", head: true }).gte("created_at", startOfToday.toISOString())),
      count(supabase.from("role_invitations").select("id", { count: "exact", head: true }).eq("status", "pending")),
      supabase.from("script_requests").select("created_at, niche_id").gte("created_at", sinceRange.toISOString()).limit(20000),
      supabase.from("user_niches").select("niche_id").limit(10000),
      supabase
        .from("profiles")
        .select("id, email, display_name, deletion_requested_at")
        .not("deletion_requested_at", "is", null)
        .order("deletion_requested_at", { ascending: true }),
      supabase.from("activity_events").select("id, user_id, event_type, niche_id, target, created_at").order("created_at", { ascending: false }).limit(30),
    ]);
    if (rangeScripts.error) console.error("[admin/overview] scripts:", rangeScripts.error.message);
    if (recentActivity.error) console.error("[admin/overview] activity:", recentActivity.error.message);

    // Scripts per day over the chosen range (UTC days), plus per niche
    const perDay: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) perDay[new Date(now - i * day).toISOString().slice(0, 10)] = 0;
    const perNiche: Record<string, number> = {};
    for (const row of rangeScripts.data || []) {
      const key = String(row.created_at).slice(0, 10);
      if (key in perDay) perDay[key]++;
      perNiche[row.niche_id] = (perNiche[row.niche_id] || 0) + 1;
    }

    const nicheFollowers: Record<string, number> = {};
    for (const row of niches.data || []) nicheFollowers[row.niche_id] = (nicheFollowers[row.niche_id] || 0) + 1;

    // Live activity feed with who did it
    const events = recentActivity.data || [];
    const ids = [...new Set(events.map((e: any) => e.user_id))];
    const { data: people } = ids.length
      ? await supabase.from("profiles").select("id, display_name, email").in("id", ids)
      : { data: [] as any[] };
    const names = new Map((people || []).map((p: any) => [p.id, p.display_name || p.email]));

    return NextResponse.json({
      days,
      users,
      newUsers7,
      activeUsers7,
      notOnboarded,
      curators,
      admins,
      scriptsTotal,
      scriptsToday,
      scriptsInRange: (rangeScripts.data || []).length,
      pendingInvites,
      scriptsPerDay: Object.entries(perDay).map(([date, value]) => ({ date, value })),
      scriptsPerNiche: perNiche,
      nicheFollowers,
      deletionRequests: deletionRequests.data || [],
      activity: events.map((e: any) => ({ ...e, who: names.get(e.user_id) || "A user" })),
      activityAvailable: !recentActivity.error,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Admin overview error:", err);
    return NextResponse.json({ error: err?.message || "Failed to load overview." }, { status: 500 });
  }
}
