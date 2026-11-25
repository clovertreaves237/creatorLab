import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { parseSourceFiles, resolveShortTikTokLinks } from "@/lib/curation/sources";
import { fetchYouTubeVideos, fetchYouTubeChannels, youtubeKey, type YouTubeVideoInfo, type YouTubeChannelInfo } from "@/lib/youtube";

/**
 * GET /api/curator/sources?niche=branding-marketing
 * The team's source lists as ready-to-use templates, grouped by the creator who really owns each video,
 * enriched with real YouTube data, and marked with what is already in CreatorLab.
 */

// YouTube details are cached briefly so opening the tab repeatedly costs no extra quota
const cache = new Map<string, { at: number; videos: Map<string, YouTubeVideoInfo>; channels: Map<string, YouTubeChannelInfo> }>();
const TTL = 10 * 60 * 1000;

const norm = (h?: string | null) => (h || "").replace(/^@/, "").trim().toLowerCase();

/** True when any word (4+ letters) of the listed name appears in the account handle, e.g. "Alex Hormozi" ~ @ahormozi. */
function nameMatchesHandle(name: string, handle?: string) {
  const h = norm(handle).replace(/[^a-z0-9]/g, "");
  if (!h) return true;
  const words = name.toLowerCase().replace(/^@/, "").split(/[^a-z0-9]+/).filter((w) => w.length >= 4);
  return words.length === 0 || words.some((w) => h.includes(w));
}

export async function GET(request: NextRequest) {
  const gate = await requireRole("curator");
  if ("response" in gate) return gate.response;
  const niche = new URL(request.url).searchParams.get("niche") || "branding-marketing";

  try {
    // vt.tiktok.com short links are resolved to the real account + video id
    const { entries, unresolved } = await resolveShortTikTokLinks(parseSourceFiles(niche));
    if (entries.length === 0) {
      return NextResponse.json({ niche, groups: [], issues: [], youtubeEnabled: Boolean(youtubeKey()) });
    }

    // Real YouTube data (videos + their channels)
    let yt = cache.get(niche);
    if ((!yt || Date.now() - yt.at > TTL) && youtubeKey()) {
      const ids = entries.filter((e) => e.platform === "youtube" && e.kind === "video").map((e) => e.videoId!);
      const videos = new Map((await fetchYouTubeVideos(ids)).map((v) => [v.videoId, v]));
      const channelIds = new Set<string>();
      videos.forEach((v) => v.channelId && channelIds.add(v.channelId));
      entries.forEach((e) => e.channelId && channelIds.add(e.channelId));
      const channels = new Map((await fetchYouTubeChannels([...channelIds])).map((c) => [c.channelId, c]));
      yt = { at: Date.now(), videos, channels };
      cache.set(niche, yt);
    }

    // What is already in CreatorLab
    const supabase = await createClient();
    const [{ data: creators }, { data: videos }] = await Promise.all([
      supabase.from("creators").select("id, platform, handle, channel_id, display_name, active").eq("niche_id", niche),
      supabase.from("videos").select("video_id, thumbnail_url, duration_seconds").in("video_id", entries.filter((e) => e.videoId).map((e) => e.videoId!)),
    ]);
    const existingVideos = new Set((videos || []).map((v) => v.video_id));
    // TikTok videos imported from the source lists still need the curator's thumbnail (and length)
    const needsThumbnail = new Set((videos || []).filter((v) => !v.thumbnail_url).map((v) => v.video_id));
    const findCreator = (platform: string, handle?: string | null, channelId?: string | null) =>
      (creators || []).find(
        (c) => c.active && c.platform === platform && ((channelId && c.channel_id === channelId) || (handle && norm(c.handle) === norm(handle)))
      ) || null;

    type Group = {
      key: string;
      platform: "youtube" | "tiktok";
      displayName: string;
      handle: string | null;
      profileUrl: string | null;
      channelId: string | null;
      followers: number | null;
      avatarUrl: string | null;
      listedAs: string[];
      creatorId: string | null;
      videos: any[];
    };
    const groups = new Map<string, Group>();
    const issues: any[] = unresolved.map((e) => ({
      type: "unresolved",
      message: "This TikTok short link could not be opened. Check that the video still exists.",
      url: e.url,
      topic: e.topic,
      file: e.file,
      line: e.line,
    }));

    const group = (key: string, init: () => Group) => {
      if (!groups.has(key)) groups.set(key, init());
      return groups.get(key)!;
    };

    for (const e of entries) {
      if (e.kind === "channel_only") {
        const ch = e.channelId ? yt?.channels.get(e.channelId) : undefined;
        issues.push({
          type: "channel_link",
          message: "This is a channel link, not a video link. Find the video on the channel and paste its link instead.",
          topic: e.topic,
          url: e.url,
          creator: ch?.title || e.listedCreator || null,
          file: e.file,
          line: e.line,
        });
        continue;
      }

      if (e.platform === "youtube") {
        const v = yt?.videos.get(e.videoId!);
        if (youtubeKey() && !v) {
          issues.push({ type: "unavailable", message: "Video not found on YouTube (private, deleted or wrong link).", url: e.url, topic: e.topic, file: e.file, line: e.line });
          continue;
        }
        const ch = v?.channelId ? yt?.channels.get(v.channelId) : undefined;
        const key = `youtube:${v?.channelId || e.listedCreator || "unknown"}`;
        const g = group(key, () => ({
          key,
          platform: "youtube",
          displayName: ch?.title || v?.channelTitle || e.listedCreator || "Unknown channel",
          handle: ch?.handle || null,
          profileUrl: ch?.profileUrl || null,
          channelId: v?.channelId || null,
          followers: ch?.subscribers ?? null,
          avatarUrl: ch?.avatarUrl || null,
          listedAs: [],
          creatorId: findCreator("youtube", ch?.handle, v?.channelId)?.id || null,
          videos: [],
        }));
        if (e.listedCreator && !g.listedAs.includes(e.listedCreator)) g.listedAs.push(e.listedCreator);
        g.videos.push({
          videoId: e.videoId,
          url: e.url,
          topic: e.topic || null,
          title: v?.title || e.topic || null,
          thumbnailUrl: v?.thumbnailUrl || `https://i.ytimg.com/vi/${e.videoId}/hqdefault.jpg`,
          durationSeconds: v?.durationSeconds ?? null,
          views: v?.views ?? null,
          publishedAt: v?.publishedAt || null,
          alreadyAdded: existingVideos.has(e.videoId!),
          file: e.file,
        });
        continue;
      }

      // TikTok: owner comes from the link itself
      const key = `tiktok:${norm(e.tiktokHandle)}`;
      const g = group(key, () => ({
        key,
        platform: "tiktok",
        displayName: e.tiktokHandle || "TikTok creator",
        handle: e.tiktokHandle || null,
        profileUrl: e.tiktokHandle ? `https://www.tiktok.com/${e.tiktokHandle}` : null,
        channelId: null,
        followers: null,
        avatarUrl: null,
        listedAs: [],
        creatorId: findCreator("tiktok", e.tiktokHandle)?.id || null,
        videos: [],
      }));
      if (e.listedCreator && !g.listedAs.includes(e.listedCreator)) g.listedAs.push(e.listedCreator);
      // Listed under a creator whose name does not match the account in the link
      if (e.listedCreator && !nameMatchesHandle(e.listedCreator, e.tiktokHandle)) {
        issues.push({
          type: "other_account",
          message: `Listed under "${e.listedCreator}" but the link belongs to ${e.tiktokHandle}. It is grouped under ${e.tiktokHandle}.`,
          url: e.url,
          topic: e.topic,
          file: e.file,
          line: e.line,
        });
      }
      g.videos.push({
        videoId: e.videoId,
        url: e.url,
        topic: e.topic || null,
        title: e.topic || null,
        thumbnailUrl: null,
        durationSeconds: null,
        views: null,
        publishedAt: null,
        alreadyAdded: existingVideos.has(e.videoId!),
        needsThumbnail: needsThumbnail.has(e.videoId!),
        file: e.file,
      });
    }

    const list = [...groups.values()].sort((a, b) => b.videos.length - a.videos.length);
    return NextResponse.json({ niche, groups: list, issues, youtubeEnabled: Boolean(youtubeKey()) });
  } catch (err: any) {
    console.error("[curator/sources]", err?.message || err);
    return NextResponse.json({ error: err?.message || "Could not read the source lists." }, { status: 500 });
  }
}
