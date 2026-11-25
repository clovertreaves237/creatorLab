import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { youtubeKey, resolveChannelId, fetchLatestUploadIds, fetchYouTubeVideos } from "@/lib/youtube";

/**
 * Section 3.7 Curator and Admin Functions:
 * FR-46: Admins shall be able to trigger a manual refresh of YouTube data from the admin dashboard.
 * FR-47: On refresh, the system shall fetch the latest videos within the window (30 days for YouTube). New videos
 *        are added to the creator's list; if there are no new videos, the existing list remains.
 * FR-48: Each refresh shall insert a new snapshot row per video. Existing snapshot rows shall not be overwritten.
 * FR-50: Audit log recording who, what, when (kept for 1 year).
 * NFR-19: The YouTube refresh shall log quota used per run.
 *
 * All numbers come from the YouTube Data API. Without YOUTUBE_API_KEY nothing is written.
 */
/**
 * FR-47 (TikTok): refresh titles of TikTok videos published in the last 14 days through TikTok's public
 * oEmbed endpoint. TikTok has no public stats API, so no snapshot rows are written here (no invented numbers).
 */
async function refreshTikTokTitles(actorId: string, windowDays: number) {
  const supabase = await createClient();
  const now = new Date();
  const since = new Date(now.getTime() - windowDays * 86400000).toISOString();
  const { data: videos, error } = await supabase
    .from("videos")
    .select("video_id, title, video_url")
    .eq("platform", "tiktok")
    .gte("published_at", since);
  if (error) throw error;

  let updated = 0;
  const unavailable: string[] = [];
  for (const v of videos || []) {
    try {
      const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(v.video_url)}`, { cache: "no-store" });
      if (!res.ok) {
        unavailable.push(v.video_id);
        continue;
      }
      const json = await res.json();
      if (json?.title && json.title !== v.title) {
        await supabase.from("videos").update({ title: String(json.title).slice(0, 300) }).eq("video_id", v.video_id);
        updated++;
      }
    } catch {
      unavailable.push(v.video_id);
    }
  }

  await supabase.from("audit_log").insert({
    actor_id: actorId,
    action: "manual_tiktok_title_refresh",
    target: "tiktok_videos",
    details: { source: "tiktok_oembed", window_days: windowDays, videos_checked: videos?.length || 0, titles_updated: updated, videos_unavailable: unavailable, timestamp: now.toISOString() },
  });

  return NextResponse.json({
    success: true,
    platform: "tiktok",
    windowDays,
    videosChecked: videos?.length || 0,
    titlesUpdated: updated,
    newSnapshotsInserted: 0,
    refreshedAt: now.toISOString(),
    message: `Checked ${videos?.length || 0} TikTok video(s) from the last ${windowDays} days and updated ${updated} title(s). TikTok does not share stats publicly, so curators enter views, likes and comments by hand.`,
  });
}

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;

    const body = await request.json().catch(() => ({}));
    const targetPlatform = body.platform === "tiktok" ? "tiktok" : "youtube";
    const windowDays = targetPlatform === "youtube" ? 30 : 14; // FR-47 window (30d YouTube, 14d TikTok titles)
    if (targetPlatform === "tiktok") {
      return refreshTikTokTitles(gate.account.userId, windowDays);
    }
    const WINDOW_DAYS = windowDays;

    if (!youtubeKey()) {
      return NextResponse.json(
        { error: "YouTube refresh is not set up yet: add YOUTUBE_API_KEY to the server settings. Nothing was changed." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const now = new Date();
    const windowStart = new Date(now.getTime() - WINDOW_DAYS * 86400000);
    let quotaUnits = 0;

    const [{ data: creators, error: creatorErr }, { data: existingVideos, error: videoErr }] = await Promise.all([
      supabase.from("creators").select("id, display_name, handle, channel_id").eq("platform", "youtube").eq("active", true),
      supabase.from("videos").select("video_id, creator_id").eq("platform", "youtube"),
    ]);
    if (creatorErr) throw creatorErr;
    if (videoErr) throw videoErr;

    const known = new Set((existingVideos || []).map((v) => v.video_id));
    const newVideoCreator = new Map<string, string>(); // video id -> creator id
    const creatorProblems: string[] = [];

    // FR-47: newest uploads within the window for every active YouTube creator
    for (const c of creators || []) {
      let channelId = c.channel_id as string | null;
      if (!channelId) {
        channelId = await resolveChannelId(c.handle);
        quotaUnits += 1;
        if (channelId) {
          await supabase.from("creators").update({ channel_id: channelId }).eq("id", c.id);
        } else {
          creatorProblems.push(`${c.display_name}: channel not found from handle "${c.handle}"`);
          continue;
        }
      }
      const uploads = await fetchLatestUploadIds(channelId, 10);
      quotaUnits += 1;
      for (const u of uploads) {
        if (!known.has(u.id) && u.publishedAt && new Date(u.publishedAt) >= windowStart) {
          newVideoCreator.set(u.id, c.id);
        }
      }
    }

    // Real details + stats for existing and new videos (50 per call, 1 unit each)
    const allIds = [...known, ...newVideoCreator.keys()];
    const details = allIds.length ? await fetchYouTubeVideos(allIds) : [];
    quotaUnits += Math.ceil(allIds.length / 50);
    const byId = new Map(details.map((d) => [d.videoId, d]));

    // Add new videos to the lists
    let newVideos = 0;
    for (const [videoId, creatorId] of newVideoCreator) {
      const d = byId.get(videoId);
      if (!d) continue;
      const { error } = await supabase.from("videos").insert({
        video_id: d.videoId,
        creator_id: creatorId,
        platform: "youtube",
        title: d.title,
        description_summary: d.description.slice(0, 250) || null,
        description_full: d.description || null,
        published_at: d.publishedAt || now.toISOString(),
        duration_seconds: d.durationSeconds ?? 0,
        thumbnail_url: d.thumbnailUrl,
        video_url: d.videoUrl,
      });
      if (!error) newVideos++;
    }

    // Keep title / thumbnail / length of existing videos in sync with YouTube
    for (const videoId of known) {
      const d = byId.get(videoId);
      if (!d) continue;
      await supabase
        .from("videos")
        .update({ title: d.title, thumbnail_url: d.thumbnailUrl, duration_seconds: d.durationSeconds ?? 0 })
        .eq("video_id", videoId);
    }

    // FR-48: one NEW snapshot row per video, with the real numbers (null = hidden by the creator, FR-20)
    const snapshots = details
      .filter((d) => known.has(d.videoId) || newVideoCreator.has(d.videoId))
      .map((d) => ({ video_id: d.videoId, snapshot_at: now.toISOString(), views: d.views, likes: d.likes, comments: d.comments }));
    let snapshotsInserted = 0;
    if (snapshots.length) {
      const { error, count } = await supabase.from("video_snapshots").insert(snapshots, { count: "exact" });
      if (error) throw error;
      snapshotsInserted = count ?? snapshots.length;
    }

    const unavailable = [...known].filter((id) => !byId.has(id)); // deleted or made private on YouTube

    // FR-50 + NFR-19
    await supabase.from("audit_log").insert({
      actor_id: gate.account.userId,
      action: "manual_youtube_refresh",
      target: "youtube_creators_and_videos",
      details: {
        source: "youtube_data_api",
        window_days: WINDOW_DAYS,
        creators_checked: creators?.length || 0,
        new_videos_added: newVideos,
        new_snapshots_inserted: snapshotsInserted,
        videos_unavailable: unavailable,
        creator_problems: creatorProblems,
        quota_units_used: quotaUnits,
        timestamp: now.toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      platform: "youtube",
      windowDays: WINDOW_DAYS,
      creatorsChecked: creators?.length || 0,
      newVideosAdded: newVideos,
      newSnapshotsInserted: snapshotsInserted,
      videosUnavailable: unavailable.length,
      creatorProblems,
      quotaUnitsUsed: quotaUnits,
      refreshedAt: now.toISOString(),
      message:
        `Checked ${creators?.length || 0} YouTube creators. Added ${newVideos} new video(s) from the last ${WINDOW_DAYS} days and ` +
        `saved fresh stats for ${snapshotsInserted} video(s) without overwriting earlier snapshots. YouTube quota used: ${quotaUnits} unit(s).` +
        (unavailable.length ? ` ${unavailable.length} video(s) are no longer available on YouTube.` : ""),
    });
  } catch (err: any) {
    console.error("Admin refresh route error:", err);
    return NextResponse.json({ error: err?.message || "Failed to refresh YouTube data." }, { status: 500 });
  }
}
