/**
 * Builds supabase/seed/real_creators_from_sources.sql from the team's source lists
 * (training-rules/<niche>/source*.md, Tiktok_*.md ...), with real YouTube data.
 *
 *   node scripts/build-creators-seed.cjs
 *
 * Then paste the SQL file into the Supabase SQL editor. Safe to run again whenever the source lists change:
 * creators and videos are matched and updated, never duplicated. Curators' TikTok thumbnails and lengths are kept.
 * Needs YOUTUBE_API_KEY (and the public Supabase URL/key, to read what is already in CreatorLab) in .env.local.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.join(__dirname, "..");
for (const l of fs.readFileSync(path.join(root, ".env.local"), "utf8").split(/\r?\n/)) {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(l);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const jiti = require(path.join(root, "node_modules/jiti"))(__filename, { alias: { "@": path.join(root, "src") } });
const { parseSourceFiles, resolveShortTikTokLinks } = jiti(path.join(root, "src/lib/curation/sources.ts"));
const { fetchYouTubeVideos, fetchYouTubeChannels, youtubeKey } = jiti(path.join(root, "src/lib/youtube.ts"));
const { createClient } = require(path.join(root, "node_modules/@supabase/supabase-js"));

const NICHES = ["branding-marketing", "content-creation", "tech-news", "faceless-content", "startups-founders"];
const CURATED_BY = "CreatorLab team (source lists)";
const today = new Date().toISOString().slice(0, 10);

const norm = (h) => (h || "").replace(/^@/, "").trim().toLowerCase();
const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v) => (v === null || v === undefined || Number.isNaN(Number(v)) ? "null" : String(Math.round(Number(v))));
const uuidFrom = (key) => {
  const h = crypto.createHash("sha1").update("creatorlab:" + key).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
};
/** "Alex Hormozi" ~ @alexhormozi / @eileenxyang ~ "Eileen Yan" */
function nameMatchesHandle(name, handle) {
  const h = norm(handle).replace(/[^a-z0-9]/g, "");
  const words = (name || "").toLowerCase().replace(/^@/, "").split(/[^a-z0-9]+/).filter((w) => w.length >= 4);
  return words.length > 0 && words.some((w) => h.includes(w));
}
/** TikTok video ids carry their upload time in the top 32 bits. */
const tiktokDate = (id) => {
  try {
    return new Date(Number(BigInt(id) >> 32n) * 1000).toISOString();
  } catch {
    return null;
  }
};
const cleanTopic = (t) => (t || "").replace(/\s+/g, " ").replace(/^[-–:\s"]+|[-–:\s"]+$/g, "").trim();
const summary = (text) => {
  const first = (text || "").split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim();
  return first.length > 280 ? first.slice(0, 277).trimEnd() + "…" : first;
};

(async () => {
  if (!youtubeKey()) throw new Error("YOUTUBE_API_KEY is missing in .env.local");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [{ data: dbCreators, error: e1 }, { data: dbVideos, error: e2 }] = await Promise.all([
    db.from("creators").select("id, niche_id, platform, display_name, handle, channel_id, active"),
    db.from("videos").select("video_id, creator_id, platform, video_url"),
  ]);
  if (e1 || e2) throw new Error("Could not read CreatorLab: " + (e1 || e2).message);
  const videoOwner = new Map(dbVideos.map((v) => [v.video_id, v.creator_id]));

  /** TikTok removes videos (copyright, guidelines, deleted): its embed service then refuses the link. */
  const tiktokAlive = new Map();
  async function isTikTokAvailable(url) {
    if (tiktokAlive.has(url)) return tiktokAlive.get(url);
    let ok = true;
    try {
      const r = await fetch("https://www.tiktok.com/oembed?url=" + encodeURIComponent(url));
      ok = r.ok;
    } catch {
      ok = true; // network problem: do not remove anything
    }
    tiktokAlive.set(url, ok);
    return ok;
  }

  const groups = []; // { id, niche, platform, displayName, handle, profileUrl, channelId, followers, videos: [...] }
  const report = { channelOnly: [], unavailable: [], unresolved: [], duplicates: [], removedFromDb: [], perNiche: {} };
  const seenVideos = new Map(); // videoId -> niche

  for (const niche of NICHES) {
    const { entries, unresolved } = await resolveShortTikTokLinks(parseSourceFiles(niche));
    unresolved.forEach((e) => report.unresolved.push(`${niche}: ${e.url} (${e.file})`));
    if (entries.length === 0) continue;

    const ytIds = [...new Set(entries.filter((e) => e.platform === "youtube" && e.kind === "video").map((e) => e.videoId))];
    const vids = new Map((await fetchYouTubeVideos(ytIds)).map((v) => [v.videoId, v]));
    const chIds = new Set();
    vids.forEach((v) => v.channelId && chIds.add(v.channelId));
    entries.forEach((e) => e.channelId && chIds.add(e.channelId));
    const chans = new Map((await fetchYouTubeChannels([...chIds])).map((c) => [c.channelId, c]));

    const byKey = new Map();
    const group = (key, init) => {
      if (!byKey.has(key)) {
        const g = init();
        byKey.set(key, g);
        groups.push(g);
      }
      return byKey.get(key);
    };

    for (const e of entries) {
      if (e.kind === "channel_only") {
        const ch = e.channelId ? chans.get(e.channelId) : null;
        report.channelOnly.push(`${niche}: ${ch?.title || e.listedCreator || "?"} ${e.url}${e.topic ? ` (topic: ${cleanTopic(e.topic)})` : ""}`);
        continue;
      }
      if (seenVideos.has(e.videoId)) {
        if (seenVideos.get(e.videoId) !== niche) report.duplicates.push(`${e.url} is listed in ${seenVideos.get(e.videoId)} and ${niche}; kept in ${seenVideos.get(e.videoId)}`);
        continue;
      }

      if (e.platform === "youtube") {
        const v = vids.get(e.videoId);
        if (!v || !v.channelId || v.unavailableReason) {
          report.unavailable.push(`${niche}: ${e.url} (${v ? v.unavailableReason : "not found: removed, private or wrong link"}) (${e.file})`);
          continue;
        }
        seenVideos.set(e.videoId, niche);
        const ch = chans.get(v.channelId);
        const g = group(`yt:${v.channelId}`, () => ({
          niche,
          platform: "youtube",
          displayName: ch?.title || v.channelTitle,
          handle: ch?.handle || `@${(ch?.title || v.channelTitle || "channel").replace(/\s+/g, "")}`,
          profileUrl: ch?.profileUrl || `https://www.youtube.com/channel/${v.channelId}`,
          channelId: v.channelId,
          followers: ch?.subscribers ?? null,
          videos: [],
        }));
        g.videos.push({
          videoId: v.videoId,
          platform: "youtube",
          title: v.title,
          summary: summary(v.description) || cleanTopic(e.topic) || null,
          description: (v.description || "").slice(0, 5000),
          publishedAt: v.publishedAt,
          duration: v.durationSeconds ?? 0,
          thumbnail: v.thumbnailUrl,
          url: `https://www.youtube.com/watch?v=${v.videoId}`,
          stats: { views: v.views, likes: v.likes, comments: v.comments },
        });
        continue;
      }

      // TikTok: the owner is in the link itself
      if (!(await isTikTokAvailable(`https://www.tiktok.com/@${norm(e.tiktokHandle)}/video/${e.videoId}`))) {
        report.unavailable.push(`${niche}: ${e.url} (removed from TikTok) (${e.file})`);
        continue;
      }
      seenVideos.set(e.videoId, niche);
      const handle = "@" + norm(e.tiktokHandle);
      const g = group(`tt:${norm(e.tiktokHandle)}`, () => ({
        niche,
        platform: "tiktok",
        displayName: e.listedCreator && nameMatchesHandle(e.listedCreator, handle) ? e.listedCreator.replace(/^@/, "") : norm(e.tiktokHandle),
        handle,
        profileUrl: `https://www.tiktok.com/${handle}`,
        channelId: null,
        followers: null,
        videos: [],
      }));
      if (e.listedCreator && nameMatchesHandle(e.listedCreator, handle) && g.displayName === norm(e.tiktokHandle)) g.displayName = e.listedCreator.replace(/^@/, "");
      const topic = cleanTopic(e.topic);
      g.videos.push({
        videoId: e.videoId,
        platform: "tiktok",
        title: topic ? (topic.length > 140 ? topic.slice(0, 137) + "…" : topic) : `TikTok video by ${handle}`,
        summary: topic || null,
        description: topic || null,
        publishedAt: tiktokDate(e.videoId),
        duration: 0, // unknown until a curator enters it
        thumbnail: "", // TikTok shares no thumbnail: a curator uploads it
        url: `https://www.tiktok.com/${handle}/video/${e.videoId}`,
        stats: null,
      });
    }
  }

  // Names: trim, and a TikTok account that matches a YouTube channel in the same niche uses the channel's official name
  const bare = (h) => norm(h).replace(/[^a-z0-9]/g, "");
  for (const g of groups) g.displayName = (g.displayName || "").replace(/\s+/g, " ").trim();
  for (const g of groups.filter((x) => x.platform === "tiktok")) {
    const yt = groups.find((x) => x.platform === "youtube" && x.niche === g.niche && bare(x.handle) === bare(g.handle));
    if (yt) g.displayName = yt.displayName;
  }

  // Reuse existing CreatorLab creators (same niche + platform) when the handle/channel matches, or when they already own one of the group's videos
  const used = new Set();
  for (const g of groups) {
    const candidates = dbCreators.filter((c) => c.niche_id === g.niche && c.platform === g.platform && !used.has(c.id));
    const match =
      candidates.find((c) => (g.channelId && c.channel_id === g.channelId) || norm(c.handle) === norm(g.handle)) ||
      candidates.find((c) => g.videos.some((v) => videoOwner.get(v.videoId) === c.id));
    if (match) {
      g.id = match.id;
      g.existing = match;
      used.add(match.id);
    } else {
      g.id = uuidFrom(`${g.niche}|${g.platform}|${g.channelId || norm(g.handle)}`);
    }
  }
  const retired = dbCreators.filter((c) => c.active && !used.has(c.id));

  // Videos already in CreatorLab that are no longer available (copyright, removed, private, blocked): delete them
  const importedIds = new Set(groups.flatMap((g) => g.videos.map((v) => v.videoId)));
  const dbYt = dbVideos.filter((v) => v.platform === "youtube" && !importedIds.has(v.video_id));
  const dbYtInfo = new Map((await fetchYouTubeVideos(dbYt.map((v) => v.video_id))).map((v) => [v.videoId, v]));
  const toDelete = [];
  for (const v of dbYt) {
    const info = dbYtInfo.get(v.video_id);
    if (!info || info.unavailableReason) toDelete.push({ id: v.video_id, why: info ? info.unavailableReason : "not on YouTube any more" });
  }
  for (const v of dbVideos.filter((x) => x.platform === "tiktok" && !importedIds.has(x.video_id))) {
    if (v.video_url && !(await isTikTokAvailable(v.video_url))) toDelete.push({ id: v.video_id, why: "removed from TikTok" });
  }
  // Source-list videos that are unavailable must not stay in CreatorLab either
  for (const line of report.unavailable) {
    const m = /(?:v=|youtu\.be\/|shorts\/|video\/)([A-Za-z0-9_-]{6,})/.exec(line);
    if (m && dbVideos.some((v) => v.video_id === m[1]) && !toDelete.some((d) => d.id === m[1])) toDelete.push({ id: m[1], why: "unavailable" });
  }
  report.removedFromDb = toDelete.map((d) => `${d.id} (${d.why})`);

  // ---------------- SQL ----------------
  const out = [];
  out.push(`-- CreatorLab: real creators and videos from the team's source lists`);
  out.push(`-- Generated ${new Date().toISOString()} by scripts/build-creators-seed.cjs. Safe to run again.`);
  out.push(`-- Creators not in any source list are deactivated (kept in history, can be restored by a curator).`);
  out.push(`begin;`, ``);

  if (toDelete.length) {
    out.push(`-- No longer available (copyright, removed, private or blocked): delete with their stats`);
    out.push(`delete from public.videos where video_id in (${toDelete.map((d) => q(d.id)).join(", ")});`, ``);
  }

  if (retired.length) {
    out.push(`-- Not in any source list: deactivate`);
    out.push(`update public.creators set active = false where id in (${retired.map((c) => q(c.id)).join(", ")});`, ``);
  }

  for (const niche of NICHES) {
    const gs = groups.filter((g) => g.niche === niche);
    if (!gs.length) continue;
    out.push(`-- ===== ${niche}: ${gs.length} creators, ${gs.reduce((a, g) => a + g.videos.length, 0)} videos =====`);
    report.perNiche[niche] = {
      youtubeCreators: gs.filter((g) => g.platform === "youtube").length,
      youtubeVideos: gs.filter((g) => g.platform === "youtube").reduce((a, g) => a + g.videos.length, 0),
      tiktokCreators: gs.filter((g) => g.platform === "tiktok").length,
      tiktokVideos: gs.filter((g) => g.platform === "tiktok").reduce((a, g) => a + g.videos.length, 0),
    };
    for (const g of gs) {
      out.push(
        `insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active)` +
          ` values (${q(g.id)}, ${q(niche)}, ${q(g.platform)}, ${q(g.displayName)}, ${q(g.handle)}, ${q(g.profileUrl)}, ${q(g.channelId)}, ${n(g.followers)}, ${g.followers !== null ? "now()" : "null"}, array[]::text[], ${q(CURATED_BY)}, ${q(today)}, true)` +
          ` on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url,` +
          ` channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;`
      );
      for (const v of g.videos) {
        out.push(
          `insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url)` +
            ` values (${q(v.videoId)}, ${q(g.id)}, ${q(v.platform)}, ${q(v.title)}, ${q(v.summary)}, ${q(v.description)}, ${q(v.publishedAt || new Date().toISOString())}, ${n(v.duration)}, '[]'::jsonb, ${q(v.thumbnail)}, ${q(v.url)})` +
            ` on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary,` +
            ` description_full = excluded.description_full, published_at = excluded.published_at,` +
            ` duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end,` +
            ` thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;`
        );
        if (v.stats) {
          out.push(`insert into public.video_snapshots (video_id, views, likes, comments) values (${q(v.videoId)}, ${n(v.stats.views)}, ${n(v.stats.likes)}, ${n(v.stats.comments)});`);
        }
      }
      out.push(``);
    }
  }

  const totals = Object.values(report.perNiche).reduce((a, r) => ({ c: a.c + r.youtubeCreators + r.tiktokCreators, v: a.v + r.youtubeVideos + r.tiktokVideos }), { c: 0, v: 0 });
  out.push(
    `insert into public.audit_log (actor_id, action, target, details) values (null, 'import_source_lists', 'creators', ${q(
      JSON.stringify({ creators: totals.c, videos: totals.v, deactivated: retired.map((c) => c.display_name), per_niche: report.perNiche })
    )}::jsonb);`
  );
  out.push(``, `commit;`, ``);
  out.push(`-- Check: active creators and videos per niche`);
  out.push(
    `select c.niche_id, c.platform, count(distinct c.id) as creators, count(v.video_id) as videos, count(v.video_id) filter (where v.thumbnail_url = '') as videos_needing_thumbnail` +
      ` from public.creators c left join public.videos v on v.creator_id = c.id where c.active group by 1, 2 order by 1, 2;`
  );

  const dir = path.join(root, "supabase", "seed");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "real_creators_from_sources.sql");
  fs.writeFileSync(file, out.join("\n"));

  // The same SQL split into smaller parts (one per niche) for easy pasting into the Supabase SQL editor.
  // Run them in order: part-1, part-2, part-3 ...
  const text = out.join("\n");
  const body = text.slice(text.indexOf("begin;") + "begin;".length, text.indexOf("\ncommit;"));
  const chunks = body.split(/\n(?=-- ===== )/);
  const head = chunks.shift(); // deactivations
  const tail = `\n${out.find((l) => l.startsWith("insert into public.audit_log"))}`;
  const check = text.slice(text.indexOf("-- Check:"));
  fs.readdirSync(dir).filter((f) => /^real_creators_part-\d+\.sql$/.test(f)).forEach((f) => fs.unlinkSync(path.join(dir, f)));
  chunks.forEach((c, i) => {
    const first = i === 0;
    const last = i === chunks.length - 1;
    const content = [
      `-- CreatorLab import, part ${i + 1} of ${chunks.length}. Run the parts in order.`,
      `begin;`,
      first ? head.replace(/^\s*\n/, "").trim() : "",
      c.replace(/\s+$/, "").replace(/\n(insert into public\.audit_log[^\n]*)$/, ""),
      last ? tail : "",
      `commit;`,
      last ? `\n${check}` : "",
    ].filter(Boolean).join("\n\n");
    fs.writeFileSync(path.join(dir, `real_creators_part-${i + 1}.sql`), content + "\n");
  });

  console.log(`Wrote ${path.relative(root, file)} (${(fs.statSync(file).size / 1024).toFixed(0)} KB)`);
  console.log("Per niche:", JSON.stringify(report.perNiche, null, 1));
  console.log("Reused existing creators:", groups.filter((g) => g.existing).map((g) => `${g.existing.display_name} ${g.existing.handle} -> ${g.displayName} ${g.handle}`).join("; ") || "none");
  console.log("Deactivated (not in any source list):", retired.map((c) => `${c.display_name} ${c.handle}`).join("; ") || "none");
  for (const [label, list] of [["Channel links without a video", report.channelOnly], ["YouTube videos not available", report.unavailable], ["TikTok links that could not be opened", report.unresolved], ["Listed in two niches", report.duplicates], ["Removed from CreatorLab (no longer available)", report.removedFromDb]]) {
    console.log(`${label}: ${list.length}`);
    list.forEach((x) => console.log("  - " + x));
  }
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
