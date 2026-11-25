import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const F = await import("../src/lib/outliers/feed-cache.ts");
const read = (f) => fs.readFileSync(f, "utf8");
const card = (rank) => ({ locked: false, rank });

test("Fast outlier feed", async (t) => {
  await t.test("1. Cache per niche + platform; pages append without duplicates", () => {
    F.clearFeeds();
    const key = F.feedKey("tech-news", "youtube");
    assert.equal(F.readFeed(key), null);
    const p1 = { items: [card(1), card(2)], total: 4, nextCursor: "2", unlocked: true, plan: "creator" };
    F.writeFeed(key, p1, 1000);
    assert.deepEqual(F.readFeed(key).items.map((c) => c.rank), [1, 2]);
    const merged = F.appendPage(p1, { items: [card(2), card(3), card(4)], total: 4, nextCursor: null, unlocked: true, plan: "creator" });
    assert.deepEqual(merged.items.map((c) => c.rank), [1, 2, 3, 4]);
    assert.equal(merged.nextCursor, null);
    assert.equal(F.readFeed(F.feedKey("tech-news", "tiktok")), null, "platforms are cached separately");
    F.clearFeeds();
    assert.equal(F.readFeed(key), null);
  });

  await t.test("2. API: cursor pages are slices of the same ranked, plan-locked list (no card lost or reordered)", () => {
    const route = read("src/app/api/outliers/route.ts");
    assert.match(route, /const list = platform === "youtube" \? youtube : tiktok;/);
    assert.match(route, /list\.slice\(cursor, cursor \+ limit\)/);
    assert.match(route, /nextCursor: next < list\.length \? String\(next\) : null/);
    assert.match(route, /return NextResponse\.json\(\{ plan, unlocked, youtube, tiktok \}, \{ headers \}\);/, "unpaged response unchanged");
  });

  await t.test("3. Page: prefetch 1500px ahead, cached instantly, skeletons, lazy sized thumbnails", () => {
    const page = read("src/app/(main)/creators/page.tsx");
    assert.match(page, /rootMargin: "1500px 0px"/);
    assert.match(page, /const PAGE_SIZE = 12;/);
    assert.match(page, /readFeed<OutlierCard>\(feedKey\(niche, "youtube"\)\)/);
    assert.match(page, /key=\{`skeleton-\$\{i\}`\} aria-hidden className="h-\[520px\]/);
    assert.match(page, /contentVisibility: "auto"/);
    assert.match(page, /<ThumbImage[\s\S]{0,400}priority=\{rankIndex === 0\}/);
    assert.doesNotMatch(page, /<img\s+src=\{mainVideo\.thumbnail_url\}/, "no full-size main thumbnails");
    const thumb = read("src/components/creators/ThumbImage.tsx");
    assert.match(thumb, /loading=\{priority \? "eager" : "lazy"\}/);
    assert.match(read("next.config.ts"), /hostname: "\*\.supabase\.co", pathname: "\/storage\/v1\/object\/public\/\*\*"/);
  });

  await t.test("4. Region next to the database and a niche index", () => {
    assert.deepEqual(JSON.parse(read("vercel.json")).regions, ["dub1"]);
    assert.match(read("supabase/migrations/20261201000001_outlier_feed_index.sql"), /on public\.creators \(niche_id, active, curated_on desc\)/);
  });
});
