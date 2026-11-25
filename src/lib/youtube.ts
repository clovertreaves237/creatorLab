/**
 * YouTube Data API v3 helpers (server only). Needs YOUTUBE_API_KEY in .env.local.
 * Quota: videos.list / channels.list / playlistItems.list cost 1 unit per call (10,000 units per day free).
 */

const API = "https://www.googleapis.com/youtube/v3";

export function youtubeKey(): string {
  return (process.env.YOUTUBE_API_KEY || "").trim();
}

/** Extracts the 11-character video id from watch, youtu.be, shorts, embed and live links (or a bare id). */
export function parseYouTubeId(input: string): string | null {
  const value = (input || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = url.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return url.pathname.slice(1, 12) || null;
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
      const m = url.pathname.match(/\/(?:shorts|embed|live|v)\/([A-Za-z0-9_-]{11})/);
      if (m) return m[1];
    }
  } catch {
    // not a URL
  }
  return null;
}

/** ISO 8601 duration (PT1H2M3S) -> seconds */
export function parseIsoDuration(iso: string): number {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return 0;
  const [, d, h, min, s] = m.map((x) => Number(x || 0));
  return d * 86400 + h * 3600 + min * 60 + s;
}

export interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string | null;
  durationSeconds: number | null;
  thumbnailUrl: string;
  channelId: string | null;
  channelTitle: string | null;
  views: number | null; // null when hidden (FR-20)
  likes: number | null;
  comments: number | null;
  videoUrl: string;
  source: "youtube_api" | "oembed";
  /** Why the video cannot be shown (copyright rejection, removed, private, blocked in Cameroon...), or null. */
  unavailableReason?: string | null;
}

function bestThumbnail(thumbs: any, videoId: string): string {
  return (
    thumbs?.maxres?.url ||
    thumbs?.standard?.url ||
    thumbs?.high?.url ||
    thumbs?.medium?.url ||
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  );
}

const num = (v: unknown) => (v === undefined || v === null ? null : Number(v));

/** Full details for up to 50 videos in one call (1 quota unit). */
/** Copyright strikes, removals, private videos and region blocks for Cameroon make a video unusable. */
function unavailableReason(item: any): string | null {
  const st = item.status || {};
  if (st.uploadStatus === "rejected") return st.rejectionReason === "copyright" ? "removed for copyright" : `rejected by YouTube (${st.rejectionReason || "unknown"})`;
  if (st.uploadStatus === "deleted" || st.uploadStatus === "failed") return `upload ${st.uploadStatus}`;
  if (st.privacyStatus === "private") return "private";
  const blocked: string[] = item.contentDetails?.regionRestriction?.blocked || [];
  const allowed: string[] | undefined = item.contentDetails?.regionRestriction?.allowed;
  if (blocked.includes("CM") || (allowed && !allowed.includes("CM"))) return "blocked in Cameroon (copyright or licensing)";
  return null;
}

export async function fetchYouTubeVideos(ids: string[]): Promise<YouTubeVideoInfo[]> {
  const key = youtubeKey();
  if (!key) throw new Error("YOUTUBE_API_KEY is not set.");
  const out: YouTubeVideoInfo[] = [];
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const res = await fetch(
      `${API}/videos?part=snippet,contentDetails,statistics,status&id=${batch.join(",")}&key=${encodeURIComponent(key)}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || `YouTube API error ${res.status}`);
    for (const item of json.items || []) {
      out.push({
        videoId: item.id,
        title: item.snippet?.title || "",
        description: item.snippet?.description || "",
        publishedAt: item.snippet?.publishedAt || null,
        durationSeconds: parseIsoDuration(item.contentDetails?.duration),
        thumbnailUrl: bestThumbnail(item.snippet?.thumbnails, item.id),
        channelId: item.snippet?.channelId || null,
        channelTitle: item.snippet?.channelTitle || null,
        views: num(item.statistics?.viewCount),
        likes: num(item.statistics?.likeCount),
        comments: num(item.statistics?.commentCount),
        videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
        source: "youtube_api",
        unavailableReason: unavailableReason(item),
      });
    }
  }
  return out;
}

/** Without an API key: title + thumbnail from YouTube's public oEmbed (no length or stats). */
export async function fetchYouTubeOEmbed(videoId: string): Promise<YouTubeVideoInfo | null> {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return {
    videoId,
    title: json.title || "",
    description: "",
    publishedAt: null,
    durationSeconds: null,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    channelId: null,
    channelTitle: json.author_name || null,
    views: null,
    likes: null,
    comments: null,
    videoUrl: url,
    source: "oembed",
  };
}

export interface YouTubeChannelInfo {
  channelId: string;
  title: string;
  handle: string | null; // "@name"
  subscribers: number | null; // null when hidden
  avatarUrl: string | null;
  profileUrl: string;
}

/** Channel name, @handle and subscriber count for up to 50 channels (1 quota unit). */
export async function fetchYouTubeChannels(ids: string[]): Promise<YouTubeChannelInfo[]> {
  const key = youtubeKey();
  if (!key || ids.length === 0) return [];
  const out: YouTubeChannelInfo[] = [];
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const res = await fetch(`${API}/channels?part=snippet,statistics&id=${batch.join(",")}&key=${encodeURIComponent(key)}`, { cache: "no-store" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error?.message || `YouTube API error ${res.status}`);
    for (const c of json.items || []) {
      const handle = c.snippet?.customUrl ? (String(c.snippet.customUrl).startsWith("@") ? c.snippet.customUrl : `@${c.snippet.customUrl}`) : null;
      out.push({
        channelId: c.id,
        title: c.snippet?.title || "",
        handle,
        subscribers: c.statistics?.hiddenSubscriberCount ? null : num(c.statistics?.subscriberCount),
        avatarUrl: c.snippet?.thumbnails?.medium?.url || c.snippet?.thumbnails?.default?.url || null,
        profileUrl: handle ? `https://www.youtube.com/${handle}` : `https://www.youtube.com/channel/${c.id}`,
      });
    }
  }
  return out;
}

/** Reads a channel reference from a link: /channel/UC..., /@handle, or a bare @handle. */
export function parseYouTubeChannel(input: string): { channelId?: string; handle?: string } | null {
  const value = (input || "").trim();
  if (/^@[A-Za-z0-9._-]{3,}$/.test(value)) return { handle: value };
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (!url.hostname.replace(/^www\.|^m\./, "").endsWith("youtube.com")) return null;
    const id = url.pathname.match(/^\/channel\/(UC[A-Za-z0-9_-]{22})/)?.[1];
    if (id) return { channelId: id };
    const handle = url.pathname.match(/^\/(@[A-Za-z0-9._-]{3,})/)?.[1];
    if (handle) return { handle };
  } catch {
    // not a URL
  }
  return null;
}

/** Resolves a channel id from a creator's handle ("@name") or stored channel id. 1 quota unit. */
export async function resolveChannelId(handleOrId: string): Promise<string | null> {
  const key = youtubeKey();
  if (!key || !handleOrId) return null;
  if (/^UC[A-Za-z0-9_-]{22}$/.test(handleOrId)) return handleOrId;
  const handle = handleOrId.startsWith("@") ? handleOrId : `@${handleOrId}`;
  const res = await fetch(`${API}/channels?part=id&forHandle=${encodeURIComponent(handle)}&key=${encodeURIComponent(key)}`, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  return json?.items?.[0]?.id || null;
}

/** Latest uploads of a channel (2 quota units): uploads playlist -> newest items. */
export async function fetchLatestUploadIds(channelId: string, max = 10): Promise<{ id: string; publishedAt: string }[]> {
  const key = youtubeKey();
  if (!key) return [];
  // A channel's uploads playlist id is the channel id with "UC" replaced by "UU"
  const uploads = channelId.replace(/^UC/, "UU");
  const res = await fetch(
    `${API}/playlistItems?part=contentDetails&maxResults=${max}&playlistId=${uploads}&key=${encodeURIComponent(key)}`,
    { cache: "no-store" }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return [];
  return (json.items || []).map((i: any) => ({
    id: i.contentDetails?.videoId,
    publishedAt: i.contentDetails?.videoPublishedAt,
  })).filter((i: any) => i.id);
}
