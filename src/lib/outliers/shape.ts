/**
 * Outliers = the ranked curated creators (and their videos) on the Creators page.
 * Pure functions (type-only imports) so the locking can be unit tested.
 *
 * Free plan: in each niche + platform view only the #1 ranked creator is sent in full.
 * Every other card is a placeholder that carries NOTHING but its rank and platform.
 */
import type { CreatorData, VideoData } from "../constants/creators";

export interface LockedOutlier {
  locked: true;
  rank: number;
  platform: "youtube" | "tiktok";
}
export type UnlockedOutlier = CreatorData & { locked: false; rank: number };
export type OutlierCard = UnlockedOutlier | LockedOutlier;

/** How many ranked cards a free plan sees in full per niche + platform view. */
export const FREE_OUTLIERS_PER_VIEW = 1;

/** Maps database rows (creators + videos + snapshots) to the card data the page renders. */
export function mapCreatorRows(rows: any[], now: number = Date.now()): CreatorData[] {
  return (rows || []).map((c: any) => {
    const vids: VideoData[] = (c.videos || []).map((v: any) => {
      const snap = [...(v.video_snapshots || [])].sort((a: any, b: any) => String(b.snapshot_at).localeCompare(String(a.snapshot_at)))[0] || {};
      const pubDate = v.published_at ? String(v.published_at).split("T")[0] : new Date(now).toISOString().split("T")[0];
      const daysAgo = Math.max(0, Math.floor((now - new Date(pubDate).getTime()) / (1000 * 60 * 60 * 24)));
      const dur = v.duration_seconds || 0;
      const mins = Math.floor(dur / 60);
      const secs = dur % 60;
      return {
        id: v.video_id,
        title: v.title || "Curated Video",
        short_description: v.description_summary || "",
        publish_date: pubDate,
        duration_seconds: dur,
        duration_formatted: dur > 0 ? `${mins}:${secs < 10 ? "0" : ""}${secs}` : "",
        thumbnail_url: v.thumbnail_url || (v.platform === "youtube" ? `https://i.ytimg.com/vi/${v.video_id}/hqdefault.jpg` : ""),
        video_url: v.video_url || "",
        embed_url:
          v.platform === "youtube"
            ? `https://www.youtube-nocookie.com/embed/${v.video_id}`
            : `https://www.tiktok.com/player/v1/${v.video_id}?music_info=1&description=1&rel=0`,
        is_best_performing: true,
        days_ago: daysAgo,
        stats: {
          views: snap.views ?? null,
          likes: snap.likes ?? null,
          comments: snap.comments ?? null,
          as_of: snap.snapshot_at ? String(snap.snapshot_at).split("T")[0] : new Date(now).toISOString().split("T")[0],
        },
      } as VideoData;
    });
    vids.sort((a, b) => (b.stats.views ?? -1) - (a.stats.views ?? -1) || b.publish_date.localeCompare(a.publish_date));

    const followersNum = c.followers || 0;
    const followersFormatted =
      c.followers == null
        ? "Not shown"
        : followersNum >= 1000000
          ? `${(followersNum / 1000000).toFixed(1)}M`
          : followersNum >= 1000
            ? `${(followersNum / 1000).toFixed(0)}K`
            : `${followersNum}`;

    const handle = String(c.handle || "");
    return {
      id: c.id,
      niche_id: c.niche_id,
      platform: c.platform,
      display_name: c.display_name,
      handle: handle.startsWith("@") ? handle : `@${handle}`,
      profile_url: c.profile_url || `https://${c.platform}.com/@${handle}`,
      channel_id: c.id,
      followers: followersNum,
      followers_formatted: followersFormatted,
      followers_checked_on: c.followers_checked_on ? String(c.followers_checked_on).split("T")[0] : c.curated_on || "Recent",
      curated_by: c.curated_by || "Curator",
      curated_on: c.curated_on || new Date(now).toISOString().split("T")[0],
      criteria_checked: c.criteria_checked || [],
      videos: vids,
      score: 100,
    } as CreatorData;
  });
}

/** Applies the plan: unlocked plans get every card; the free plan gets the top card(s) and bare placeholders. */
export function lockOutliers(ranked: CreatorData[], unlocked: boolean, platform: "youtube" | "tiktok"): OutlierCard[] {
  return ranked.map((c, i) =>
    unlocked || i < FREE_OUTLIERS_PER_VIEW
      ? ({ ...c, locked: false, rank: i + 1 } as UnlockedOutlier)
      : ({ locked: true, rank: i + 1, platform } as LockedOutlier)
  );
}
