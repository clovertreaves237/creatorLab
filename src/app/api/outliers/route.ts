import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createServiceClient } from "@/lib/supabase/service";
import { getPlan } from "@/lib/payments/server";
import { rankCreators } from "@/lib/constants/creators";
import { getNicheById } from "@/lib/constants/niches";
import { lockOutliers, mapCreatorRows } from "@/lib/outliers/shape";

export const dynamic = "force-dynamic";

/**
 * GET /api/outliers?niche=<id>
 * Ranked curated creators for one niche, filtered on the SERVER by plan:
 *   paid plans, curators, admins -> every card in full
 *   free plan                    -> the #1 card per platform in full, the rest as placeholders (rank only)
 * Locked creators and videos are never sent to the browser.
 */
export async function GET(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;

  const nicheId = request.nextUrl.searchParams.get("niche") || "";
  if (!getNicheById(nicheId)) return NextResponse.json({ error: "Unknown niche." }, { status: 400 });

  let db;
  try {
    db = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Creators are not available right now." }, { status: 503 });
  }

  const [{ plan }, { data, error }] = await Promise.all([
    getPlan(gate.account.userId, gate.account.role),
    db
      .from("creators")
      .select(
        `id, niche_id, platform, display_name, handle, profile_url, followers, followers_checked_on, criteria_checked, curated_by, curated_on,
         videos ( video_id, platform, title, description_summary, published_at, duration_seconds, thumbnail_url, video_url,
                  video_snapshots ( views, likes, comments, snapshot_at ) )`
      )
      .eq("niche_id", nicheId)
      .eq("active", true)
      .order("curated_on", { ascending: false }),
  ]);
  if (error) {
    console.error("[outliers]", error.message);
    return NextResponse.json({ error: "Could not load creators." }, { status: 500 });
  }

  const unlocked = plan !== "free";
  const all = mapCreatorRows(data || []);
  const youtube = lockOutliers(rankCreators(all.filter((c) => c.platform === "youtube")), unlocked, "youtube");
  const tiktok = lockOutliers(rankCreators(all.filter((c) => c.platform === "tiktok")), unlocked, "tiktok");

  return NextResponse.json(
    { plan, unlocked, youtube, tiktok },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
