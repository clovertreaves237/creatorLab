/**
 * Creator and video types for CreatorLab (SRS Section 3.3 Creator Browsing).
 *
 * There is NO hard-coded creator data. Every creator and video comes from the database, entered by curators
 * or imported from the team's source lists (scripts/build-creators-seed.cjs).
 * - FR-14: display_name, platform badge, follower count with check date, profile_url
 * - FR-15: ranked within platform by engagement score computed from the latest snapshot
 * - FR-20: platform-hidden stats are shown as "Hidden" (not zero)
 */

export interface VideoData {
  id: string;
  title: string;
  short_description: string;
  publish_date: string;
  duration_seconds: number;
  duration_formatted: string;
  thumbnail_url: string;
  video_url: string;
  embed_url: string;
  is_best_performing: boolean;
  days_ago: number;
  stats: {
    views: number | null; // null = 'Hidden' (FR-20)
    likes: number | null; // null = 'Hidden' (FR-20)
    comments: number | null; // null = 'Hidden' (FR-20)
    as_of: string;
  };
}

export interface CreatorData {
  id: string;
  niche_id: string;
  platform: "youtube" | "tiktok";
  display_name: string;
  handle: string;
  profile_url: string;
  channel_id: string;
  followers: number;
  followers_formatted: string;
  followers_checked_on: string;
  criteria_checked: string[];
  curated_by: string;
  curated_on: string;
  score: number; // FR-15 engagement ranking score
  videos: VideoData[];
}

/**
 * Score formula (FR-15): (views * 1) + (likes * 10) + (comments * 20)
 */
export function computeScore(videos: VideoData[]): number {
  return videos.reduce((acc, v) => {
    const views = v.stats.views ?? 0;
    const likes = v.stats.likes ?? 0;
    const comments = v.stats.comments ?? 0;
    return acc + views + likes * 10 + comments * 20;
  }, 0);
}

/** Ranks creators within a platform by engagement score, highest first (FR-15). */
export function rankCreators(creators: CreatorData[]): CreatorData[] {
  return creators.map((c) => ({ ...c, score: computeScore(c.videos) })).sort((a, b) => b.score - a.score);
}
