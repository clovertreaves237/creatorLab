import { SearchResultItem, SourceGroup, SourceType } from "@/lib/types/search";
import { youtubeKey } from "@/lib/youtube";

/**
 * Topic search: REAL results only, from the last 7 days. No invented articles.
 *
 * Sources:
 *  1. YouTube Data API (search, last 7 days): real recent videos -> "documentaries" (videos and explainers).
 *  2. Gemini with Google Search grounding: real web articles (news, blogs, newsletters). Only links that Google
 *     Search actually returned (grounding sources) are kept. Needs a Gemini plan that includes Search grounding;
 *     on the free tier Google refuses it, and only YouTube results are shown.
 *
 * FR-22: up to 10 results, most recent first.  FR-23: grouped by source.  FR-25: source-type filter.
 * FR-26: queries and results are never written to the database (a short in-memory cache only saves API quota).
 * FR-27: snippets only, never full article text.
 */

interface TopicSeed {
  title: string;
  sourceName: string;
  sourceType: SourceType;
  daysAgo: number;
  publishedAt: string;
  snippet: string;
  url: string;
}

const NICHE_HINT: Record<string, string> = {
  "branding-marketing": "marketing branding business",
  "content-creation": "content creator YouTube TikTok",
  "tech-news": "tech AI",
  "faceless-content": "faceless YouTube channel",
  "startups-founders": "startup founder",
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const CACHE_MS = 10 * 60 * 1000;
const cache = new Map<string, { at: number; seeds: TopicSeed[]; notes: string[] }>();

const daysAgoOf = (iso: string) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** Real recent videos from YouTube (100 quota units per search, cached 10 minutes). */
async function searchYouTube(q: string): Promise<TopicSeed[]> {
  const key = youtubeKey();
  if (!key) return [];
  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    q,
    maxResults: "15",
    order: "relevance",
    publishedAfter: new Date(Date.now() - WEEK_MS).toISOString(),
    relevanceLanguage: "en",
    safeSearch: "moderate",
    key,
  });
  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error?.message || `YouTube search error ${res.status}`);
  return (json.items || [])
    .filter((it: any) => it?.id?.videoId && it?.snippet?.publishedAt)
    .map((it: any) => ({
      title: decode(it.snippet.title || ""),
      sourceName: decode(it.snippet.channelTitle || "YouTube"),
      sourceType: "documentaries" as SourceType,
      publishedAt: it.snippet.publishedAt,
      daysAgo: daysAgoOf(it.snippet.publishedAt),
      snippet: decode(it.snippet.description || ""),
      url: `https://www.youtube.com/watch?v=${it.id.videoId}`,
    }));
}

const host = (u: string) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
};
function typeOfSite(h: string): SourceType {
  if (/substack\.com|beehiiv\.com|newsletter|mailchi\.mp|buttondown|convertkit|kit\.com/.test(h)) return "newsletters";
  if (/medium\.com|blog|wordpress|hubspot\.com|hootsuite\.com|buffer\.com|later\.com|sproutsocial\.com|dev\.to/.test(h)) return "blogs";
  return "news";
}

/** Real web articles through Gemini + Google Search grounding. Returns [] when the plan does not allow it. */
async function searchWeb(q: string, apiKey: string): Promise<TopicSeed[]> {
  const prompt =
    `Use Google Search to find up to 8 articles, blog posts or newsletter issues published in the last 7 days about: ${q}. ` +
    `Answer ONLY with a JSON array: [{"title":"...","source":"publication name","url":"https://...","published":"YYYY-MM-DD","summary":"one or two sentences"}]. ` +
    `Use only pages you actually found in the search results. Never invent a link.`;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], tools: [{ google_search: {} }] }),
    }
  );
  if (res.status === 429 || res.status === 403) throw new Error("web-search-not-in-plan");
  if (!res.ok) return [];
  const json = await res.json();
  const cand = json?.candidates?.[0];
  const text: string = cand?.content?.parts?.map((p: any) => p.text || "").join("") || "";
  // Domains Google Search really returned
  const grounded = new Set<string>(
    (cand?.groundingMetadata?.groundingChunks || []).map((c: any) => String(c?.web?.title || "").replace(/^www\./, "").toLowerCase()).filter(Boolean)
  );
  let items: any[] = [];
  try {
    items = JSON.parse(text.replace(/```json|```/gi, "").trim());
  } catch {
    const m = text.match(/\[[\s\S]*\]/);
    if (m) {
      try {
        items = JSON.parse(m[0]);
      } catch {}
    }
  }
  if (!Array.isArray(items)) return [];
  return items
    .filter((it) => typeof it?.url === "string" && /^https:\/\//.test(it.url) && typeof it?.title === "string")
    .filter((it) => {
      const h = host(it.url);
      return [...grounded].some((g) => h === g || h.endsWith("." + g) || g.endsWith("." + h));
    })
    .map((it) => {
      const published = /^\d{4}-\d{2}-\d{2}/.test(it.published || "") ? new Date(it.published).toISOString() : new Date().toISOString();
      return {
        title: String(it.title),
        sourceName: String(it.source || host(it.url)),
        sourceType: typeOfSite(host(it.url)),
        publishedAt: published,
        daysAgo: daysAgoOf(published),
        snippet: String(it.summary || ""),
        url: it.url,
      };
    })
    .filter((s) => s.daysAgo <= 7);
}

function relative(days: number) {
  return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;
}

export async function searchTopics(params: {
  query?: string;
  nicheId?: string;
  sourceType?: "all" | SourceType;
  apiKey?: string;
}): Promise<{
  results: SearchResultItem[];
  groups: SourceGroup[];
  totalResults: number;
  notes: string[];
}> {
  const typed = (params.query || "").trim();
  const nicheId = params.nicheId || "";
  const filterType = params.sourceType || "all";
  const hint = NICHE_HINT[nicheId] || "";
  // Short topics get the niche as context ("pricing" in Branding & Marketing -> "pricing marketing branding business")
  const q = !typed ? hint || "content creators" : typed.split(/\s+/).length < 3 && hint ? `${typed} ${hint}` : typed;

  const key = `${q}|${nicheId}`;
  let entry = cache.get(key);
  if (!entry || Date.now() - entry.at > CACHE_MS) {
    const notes: string[] = [];
    const [yt, web] = await Promise.all([
      searchYouTube(q).catch((e) => {
        console.error("[search] YouTube:", e.message);
        notes.push("YouTube results are unavailable right now.");
        return [] as TopicSeed[];
      }),
      params.apiKey
        ? searchWeb(q, params.apiKey).catch((e) => {
            if (e.message === "web-search-not-in-plan") {
              notes.push("Articles, blogs and newsletters need Google Search in the Gemini plan. Showing recent YouTube videos only.");
            } else console.error("[search] web:", e.message);
            return [] as TopicSeed[];
          })
        : Promise.resolve([] as TopicSeed[]),
    ]);
    entry = { at: Date.now(), seeds: [...web, ...yt], notes };
    cache.set(key, entry);
  }

  // Source-type filter (FR-25), most recent first (FR-22), up to 10 (FR-22)
  let matched = entry.seeds.filter((seed) => {
    if (filterType !== "all" && seed.sourceType !== filterType) return false;
    return seed.daysAgo <= 7;
  });
  matched.sort((a, b) => a.daysAgo - b.daysAgo);
  matched = matched.slice(0, 10);

  const results: SearchResultItem[] = matched.map((seed, idx) => ({
    id: `r-${idx}-${seed.url.length}`,
    title: seed.title,
    sourceName: seed.sourceName,
    sourceType: seed.sourceType,
    publishDate: seed.publishedAt,
    relativeTime: relative(seed.daysAgo),
    // FR-27: short snippet only
    snippet: seed.snippet.length > 250 ? seed.snippet.slice(0, 247) + "..." : seed.snippet,
    url: seed.url,
  }));

  // FR-23: grouped by source
  const groupMap = new Map<string, SourceGroup>();
  for (const item of results) {
    const g = groupMap.get(item.sourceName);
    if (g) {
      g.items.push(item);
      g.count++;
    } else {
      groupMap.set(item.sourceName, { sourceName: item.sourceName, sourceType: item.sourceType, count: 1, items: [item] });
    }
  }

  return { results, groups: [...groupMap.values()], totalResults: results.length, notes: entry.notes };
}
