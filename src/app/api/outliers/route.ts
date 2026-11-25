import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getPlan } from "@/lib/payments/server";
import { rankCreators } from "@/lib/constants/creators";
import { getNicheById } from "@/lib/constants/niches";
import { lockOutliers, mapCreatorRows } from "@/lib/outliers/shape";

export const dynamic = "force-dynamic";

const SELECT = `id, niche_id, platform, display_name, handle, profile_url, followers, followers_checked_on, criteria_checked, curated_by, curated_on,
  videos ( video_id, platform, title, description_summary, published_at, duration_seconds, thumbnail_url, video_url,
           video_snapshots ( views, likes, comments, snapshot_at ) )`;

function readNiche(db: SupabaseClient, nicheId: string) {
  return db.from("creators").select(SELECT).eq("niche_id", nicheId).eq("active", true).order("curated_on", { ascending: false });
}

/**
 * GET /api/outliers?niche=<id>
 * Ranked curated creators for one niche, filtered on the SERVER by plan:
 *   paid plans, curators, admins -> every card in full
 *   free plan                    -> the #1 card per platform in full, the rest as placeholders (rank only)
 * Locked creators and videos are never sent to the browser.
 *
 * Reads with the service key; if that is missing or fails, falls back to the signed-in user's own access
 * (database rules) so the page never goes blank. The reason is logged and the source is in X-Outliers-Source.
 */
export async function GET(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;

  const nicheId = request.nextUrl.searchParams.get("niche") || "";
  if (!getNicheById(nicheId)) return NextResponse.json({ error: "Unknown niche." }, { status: 400 });

  const planPromise = getPlan(gate.account.userId, gate.account.role).catch(() => ({ plan: "free" as const }));

  let source = "service";
  let result: { data: any[] | null; error: { message: string } | null } = { data: null, error: { message: "not run" } };
  try {
    result = await readNiche(createServiceClient(), nicheId);
    if (result.error) console.error("[outliers] service read failed:", result.error.message);
  } catch (err: any) {
    console.error("[outliers] service client unavailable:", err?.message);
  }
  if (result.error) {
    source = "session";
    result = await readNiche(await createClient(), nicheId);
    if (result.error) console.error("[outliers] session read failed:", result.error.message);
  }
  if (result.error) {
    return NextResponse.json({ error: "Could not load creators." }, { status: 500, headers: { "X-Outliers-Source": "none" } });
  }

  const { plan } = await planPromise;
  const unlocked = plan !== "free";
  const all = mapCreatorRows(result.data || []);
  const youtube = lockOutliers(rankCreators(all.filter((c) => c.platform === "youtube")), unlocked, "youtube");
  const tiktok = lockOutliers(rankCreators(all.filter((c) => c.platform === "tiktok")), unlocked, "tiktok");

  return NextResponse.json(
    { plan, unlocked, youtube, tiktok },
    { headers: { "Cache-Control": "private, no-store", "X-Outliers-Source": source } }
  );
}
