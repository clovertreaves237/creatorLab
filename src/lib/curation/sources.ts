import fs from "fs";
import path from "path";
import { parseYouTubeId, parseYouTubeChannel } from "@/lib/youtube";
import { parseTikTokVideo } from "@/lib/tiktok";
import { isValidNiche } from "@/lib/constants/niches";

/**
 * Reads the team's source lists in training-rules/<niche>/ (any .md file with "source" in its name,
 * or Tiktok_creators*.md) and turns every YouTube / TikTok link into a structured entry the
 * Curator Workspace offers as a template. These files are curator reference material only; they are
 * never sent to Gemini (FR-30, FR-37).
 *
 * Formats handled (all three live niches use different ones):
 *   "## Raj Shamani" · "CREATOR: Eileen Yan" · "creators name : Unbox Therapy" · "Marques Brownlee" (plain line
 *   followed by links) · "[@alexhormozi](channel)" · "<link> (topic)" · "<link>" then "Topic: ..." ·
 *   "<short link> (<same video, other short link>) (topic)" · vt.tiktok.com short links (resolved later).
 */

export interface SourceEntry {
  file: string;
  line: number;
  platform: "youtube" | "tiktok";
  kind: "video" | "channel_only"; // channel_only = a channel link where a video link was expected
  url: string;
  videoId?: string;
  tiktokHandle?: string;
  shortUrl?: string; // vt.tiktok.com link, resolved by resolveShortTikTokLinks()
  channelId?: string;
  channelHandle?: string;
  topic?: string;
  listedCreator?: string; // creator heading the link was written under
}

const URL_RE = /https?:\/\/[^\s()<>\]]+/g; // "(" ends a link: "…/channel/UC…(topic)"
const isSourceFile = (name: string) => /\.md$/i.test(name) && (/source/i.test(name) || /^tiktok_creators/i.test(name));
const isTikTokShort = (url: string) => /^https?:\/\/(vt|vm)\.tiktok\.com\//i.test(url);

export function sourceFilesFor(nicheId: string): string[] {
  if (!isValidNiche(nicheId)) return [];
  const dir = path.join(process.cwd(), "training-rules", nicheId);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(isSourceFile).map((f) => path.join(dir, f));
}

/** Text in the last "( … )" after the link that is not itself a link. */
function topicAfter(line: string, url: string): string | undefined {
  const rest = line.slice(line.indexOf(url) + url.length);
  const groups = [...rest.matchAll(/\(([^()]*)\)/g)].map((m) => m[1].trim()).filter((t) => t && !/^https?:\/\//i.test(t));
  return groups.length ? groups[groups.length - 1] : undefined;
}

/** A plain line naming a creator, directly followed by links (Tech News format). */
function looksLikeNameLine(line: string, next: string | undefined) {
  return (
    line.length <= 48 &&
    !/https?:\/\//.test(line) &&
    /^[A-Z][\w .'\-&[\]]+$/.test(line) &&
    !/^(topic|video links?|creator|note)\b/i.test(line) &&
    Boolean(next && /^[-*\d).\s]*https?:\/\//.test(next))
  );
}

export function parseSourceFiles(nicheId: string): SourceEntry[] {
  const entries: SourceEntry[] = [];
  const seen = new Map<string, SourceEntry>();

  for (const file of sourceFilesFor(nicheId)) {
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/).map((l) => l.trim());
    let creator: string | undefined;
    let lastWithoutTopic: SourceEntry | null = null;

    lines.forEach((line, index) => {
      if (!line) return;
      const next = lines.slice(index + 1).find((l) => l);

      // Creator headings
      const heading =
        line.match(/^#{2,3}\s+(?:\d+\.\s*)?(.+)$/)?.[1] ||
        line.match(/^creators?\s*(?:name)?\s*:\s*(.+)$/i)?.[1] ||
        line.match(/^\[(@[^\]]+)\]\(/)?.[1];
      if (heading) {
        // Section headings ("## 1. TikTok Curated Creators & Video Links") start a section with no creator yet
        creator = /curated|sources|links|repository|section/i.test(heading) ? undefined : heading.replace(/\*+/g, "").trim();
        lastWithoutTopic = null;
        return;
      }
      if (/^[a-z][a-z ]+\(not a creator/i.test(line)) {
        creator = line.split("(")[0].trim();
        return;
      }
      if (looksLikeNameLine(line, next)) {
        creator = line;
        lastWithoutTopic = null;
        return;
      }

      // "Topic: ..." on its own line belongs to the previous link
      const topicLine = line.match(/^topic\s*:\s*(.+)$/i)?.[1];
      if (topicLine && lastWithoutTopic) {
        lastWithoutTopic.topic = topicLine.trim();
        lastWithoutTopic = null;
        return;
      }

      const urls = line.match(URL_RE) || [];
      if (urls.length === 0) return;

      // A line of only profile links (e.g. "tiktok.com/@kanekallaway . tiktok.com/@kallaway.marketing") names a creator
      const profileHandles = urls.map((u) => u.match(/tiktok\.com\/(@[A-Za-z0-9._-]+)\/?(?:\?|$)/)?.[1]).filter(Boolean) as string[];
      if (profileHandles.length === urls.length) {
        creator = profileHandles[profileHandles.length - 1];
        return;
      }

      // One video per line: the first link. Links inside brackets are alternates of the same video.
      const url: string = urls[0]!;
      const topic = topicAfter(line, url);
      const ytId = parseYouTubeId(url);
      const tt = parseTikTokVideo(url);
      const channel = parseYouTubeChannel(url);
      const base = { file: path.basename(file), line: index + 1, listedCreator: creator, topic };

      let entry: SourceEntry | null = null;
      if (ytId) {
        entry = { ...base, platform: "youtube", kind: "video", url: `https://www.youtube.com/watch?v=${ytId}`, videoId: ytId };
      } else if (tt) {
        entry = { ...base, platform: "tiktok", kind: "video", url: tt.url, videoId: tt.videoId, tiktokHandle: tt.handle };
      } else if (isTikTokShort(url)) {
        entry = { ...base, platform: "tiktok", kind: "video", url, shortUrl: url };
      } else if (channel) {
        if (!topic) {
          // A bare channel link is a creator heading (e.g. "https://www.youtube.com/@leilahormozi")
          creator = channel.handle || creator;
          return;
        }
        entry = { ...base, platform: "youtube", kind: "channel_only", url, channelId: channel.channelId, channelHandle: channel.handle };
      }
      if (!entry) return;

      const key = entry.kind === "video" && entry.videoId ? `${entry.platform}:${entry.videoId}` : `${entry.kind}:${url}:${topic || ""}`;
      const existing = seen.get(key);
      if (existing) {
        if (!existing.topic && entry.topic) existing.topic = entry.topic;
        lastWithoutTopic = existing.topic ? null : existing;
        return;
      }
      seen.set(key, entry);
      entries.push(entry);
      lastWithoutTopic = entry.topic ? null : entry;
    });
  }
  return entries;
}

// vt.tiktok.com short link -> full video link (cached; links never change)
const shortCache = new Map<string, string | null>();

async function resolveShortLink(url: string): Promise<string | null> {
  if (shortCache.has(url)) return shortCache.get(url)!;
  try {
    const res = await fetch(url, {
      redirect: "manual",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      cache: "no-store",
    });
    const location = res.headers.get("location");
    shortCache.set(url, location);
    return location;
  } catch {
    return null;
  }
}

/**
 * Resolves vt.tiktok.com links to full video links (handle + id) and removes duplicates that
 * turn out to be the same video. Unresolvable links are returned in `unresolved`.
 */
export async function resolveShortTikTokLinks(entries: SourceEntry[]): Promise<{ entries: SourceEntry[]; unresolved: SourceEntry[] }> {
  const shorts = entries.filter((e) => e.shortUrl);
  await Promise.all(
    shorts.map(async (e) => {
      const full = await resolveShortLink(e.shortUrl!);
      const tt = full ? parseTikTokVideo(full) : null;
      if (tt) {
        e.url = tt.url;
        e.videoId = tt.videoId;
        e.tiktokHandle = tt.handle;
      }
    })
  );
  const unresolved = entries.filter((e) => e.shortUrl && !e.videoId);
  const out: SourceEntry[] = [];
  const seen = new Map<string, SourceEntry>();
  for (const e of entries) {
    if (e.shortUrl && !e.videoId) continue;
    const key = e.kind === "video" && e.videoId ? `${e.platform}:${e.videoId}` : `${e.kind}:${e.url}:${e.topic || ""}`;
    const prev = seen.get(key);
    if (prev) {
      if (!prev.topic && e.topic) prev.topic = e.topic;
      continue;
    }
    seen.set(key, e);
    out.push(e);
  }
  return { entries: out, unresolved };
}
