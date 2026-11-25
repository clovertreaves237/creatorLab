import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";

test("Portals walkthrough: database-backed, live, real data", async (t) => {
  await t.test("1. One migration grants the app access to every table the portals use", () => {
    const sql = fs.readFileSync("supabase/migrations/20261127000001_portal_database.sql", "utf8");
    for (const table of ["generated_scripts", "activity_events", "notifications", "script_requests", "favorite_creators"]) {
      assert.match(sql, new RegExp(`on public\\.${table} to authenticated`), `${table} must be granted`);
    }
    assert.match(sql, /add column if not exists avatar_url/);
    assert.match(sql, /add column if not exists cover_url/);
    assert.match(sql, /'profile-media'/);
    assert.match(sql, /\(storage\.foldername\(name\)\)\[1\] = auth\.uid\(\)::text/, "Pictures only in the user's own folder");
  });

  await t.test("2. Admin dashboard counts scripts from the permanent record and refreshes live", () => {
    const api = fs.readFileSync("src/app/api/admin/overview/route.ts", "utf8");
    assert.match(api, /from\("script_requests"\)/);
    assert.match(api, /\[14, 30, 90\]/);
    assert.match(api, /from\("activity_events"\)/);
    const panel = fs.readFileSync("src/components/admin/AdminPanels.tsx", "utf8");
    assert.match(panel, /setInterval\(/, "Overview and user detail reload on a timer");
    assert.match(panel, /Live activity/);
  });

  await t.test("3. No SRS section or requirement numbers are shown to users", () => {
    const files = [
      "src/app/(hidden)/admin/page.tsx",
      "src/app/(hidden)/curator/page.tsx",
      "src/app/(main)/account/page.tsx",
      "src/components/admin/AdminPanels.tsx",
      "src/components/landing/FaqSection.tsx",
    ];
    for (const f of files) {
      // Strip code comments, then look for visible requirement references
      const visible = fs
        .readFileSync(f, "utf8")
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
      assert.doesNotMatch(visible, /Section 3\.\d|SRS Section|\(N?FR-\d+/, `${f} shows requirement numbers`);
    }
  });

  await t.test("4. Loader uses only the brand palette", () => {
    const loader = fs.readFileSync("src/components/ui/MobiusLoader.tsx", "utf8");
    assert.doesNotMatch(loader, /#[0-9a-fA-F]{6}/, "No raw colours in the loader");
    const css = fs.readFileSync("src/app/globals.css", "utf8");
    const block = css.slice(css.indexOf("Loader: pencil sketch"));
    assert.doesNotMatch(block, /#[0-9a-fA-F]{6}/, "Loader CSS uses palette variables");
    assert.match(block, /prefers-reduced-motion/);
  });

  await t.test("5. Curators manage creators and every video; profiles have pictures", () => {
    const list = fs.readFileSync("src/components/curator/CreatorList.tsx", "utf8");
    assert.match(list, /Add thumbnail/);
    assert.match(list, /Restore/);
    assert.match(list, /\/api\/curator\/videos\?id=/);
    assert.match(fs.readFileSync("src/app/api/curator/videos/route.ts", "utf8"), /export async function DELETE/);
    assert.match(fs.readFileSync("src/app/api/curator/creators/route.ts", "utf8"), /export async function PATCH/);
    const media = fs.readFileSync("src/components/profile/ProfileMedia.tsx", "utf8");
    assert.match(media, /from\("profile-media"\)/);
  });

  await t.test("6. TikTok videos play on the page; favourites are saved on the account", () => {
    const page = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");
    assert.match(page, /tiktok\.com\/player\/v1\//);
    assert.doesNotMatch(page, /localStorage\.setItem\("creatorlab_favorite_creators"/);
    assert.match(page, /\/api\/favorites/);
  });

  await t.test("7. Topic search uses real sources only (no invented articles)", () => {
    const engine = fs.readFileSync("src/lib/search/engine.ts", "utf8");
    assert.doesNotMatch(engine, /TOPIC_SEEDS|generateTopicalWebArticles/);
    assert.match(engine, /youtube\/v3\/search/);
    assert.match(engine, /google_search/);
  });

  await t.test("8. Unavailable videos (copyright, removed, private, blocked) are detected", () => {
    const yt = fs.readFileSync("src/lib/youtube.ts", "utf8");
    assert.match(yt, /removed for copyright/);
    assert.match(yt, /part=snippet,contentDetails,statistics,status/);
  });
});
