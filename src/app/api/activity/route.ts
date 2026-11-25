import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { TRACKED_EVENTS } from "@/lib/activity/track";

/**
 * User activity tracking, shown back to the user on their profile.
 *
 * POST /api/activity { event_type, niche_id?, target?, metadata? }   record one event (signed-in only)
 * GET  /api/activity?limit=50&before=<iso>                           own timeline + 30-day summary
 *
 * Privacy rules: research notes are never stored (FR-33), and search events never include the
 * query text (FR-26). Only the event types below are accepted.
 */
const ALLOWED = new Set<string>(TRACKED_EVENTS);

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;
    const body = await request.json().catch(() => ({}));
    const eventType = String(body.event_type || "");
    if (!ALLOWED.has(eventType)) return NextResponse.json({ error: "Unknown event." }, { status: 400 });

    const metadata = body.metadata && typeof body.metadata === "object" ? body.metadata : {};
    // FR-26: never keep search text
    if (eventType === "topic_search") {
      delete metadata.query;
      delete metadata.topic;
    }
    const supabase = await createClient();
    const { error } = await supabase.from("activity_events").insert({
      user_id: gate.account.userId,
      event_type: eventType,
      niche_id: typeof body.niche_id === "string" ? body.niche_id.slice(0, 64) : null,
      target: eventType === "topic_search" ? null : typeof body.target === "string" ? body.target.slice(0, 300) : null,
      metadata: JSON.parse(JSON.stringify(metadata).slice(0, 2000) || "{}"),
    });
    if (error) {
      // Tracking never blocks the user, but failures must be visible to us
      console.error("[activity] could not record event:", eventType, error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 202 });
    }

    // Last active time, used by admins (cheap: at most once per page view / action)
    await supabase.from("profiles").update({ last_active_at: new Date().toISOString() }).eq("id", gate.account.userId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 50));
    const before = searchParams.get("before");

    let timeline = supabase
      .from("activity_events")
      .select("id, event_type, niche_id, target, metadata, created_at")
      .eq("user_id", gate.account.userId)
      .neq("event_type", "page_view")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (before) timeline = timeline.lt("created_at", before);

    const since30 = new Date(Date.now() - 30 * 86400000).toISOString();
    const [events, recent, scripts] = await Promise.all([
      timeline,
      supabase.from("activity_events").select("event_type, created_at")
        .eq("user_id", gate.account.userId).gte("created_at", since30).limit(5000),
      supabase.from("generated_scripts").select("id", { count: "exact", head: true }).eq("user_id", gate.account.userId),
    ]);
    if (events.error) return NextResponse.json({ events: [], summary: null, migrated: false });

    const byType: Record<string, number> = {};
    const activeDays = new Set<string>();
    for (const e of recent.data || []) {
      byType[e.event_type] = (byType[e.event_type] || 0) + 1;
      activeDays.add(String(e.created_at).slice(0, 10));
    }

    return NextResponse.json({
      migrated: true,
      events: events.data || [],
      summary: {
        scriptsTotal: scripts.count ?? 0,
        last30: byType,
        activeDays30: activeDays.size,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load activity." }, { status: 500 });
  }
}
