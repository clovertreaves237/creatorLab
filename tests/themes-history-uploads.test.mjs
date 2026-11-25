import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";

test("Site themes, private script history, uploads register, real profile data", async (t) => {
  await t.test("1. Three bright themes driven by CSS variables, switchable from the navbar", () => {
    const css = fs.readFileSync("src/app/themes.css", "utf8");
    for (const id of ["sketchbook", "clay", "signal"]) assert.match(css, new RegExp(`\\[data-theme="${id}"\\]`));
    assert.match(css, /::view-transition-new\(root\)/, "Switching animates");
    assert.match(css, /prefers-reduced-motion/);
    assert.doesNotMatch(css, /linear-gradient|radial-gradient|backdrop-filter|blur\(/, "No gradients, glass or blur");
    const tw = fs.readFileSync("tailwind.config.ts", "utf8");
    assert.match(tw, /rgb\(var\(--c-\$\{name\}\) \/ <alpha-value>\)/, "Tailwind colours come from theme variables");
    const header = fs.readFileSync("src/components/layout/Header.tsx", "utf8");
    assert.match(header, /<ThemeSettings/);
    const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
    assert.match(layout, /THEME_BOOT_SCRIPT/, "Saved theme applied before first paint");
  });

  await t.test("2. Script history is permanent and private to its owner", () => {
    const storage = fs.readFileSync("src/lib/scripts/storage.ts", "utf8");
    assert.doesNotMatch(storage, /memoryScriptsCache/, "No shared in-memory scripts");
    assert.doesNotMatch(storage, /\.delete\(\)\.lt\("created_at"/, "History is never pruned");
    assert.match(storage, /\.eq\("user_id", userId\)/);
    const api = fs.readFileSync("src/app/api/scripts/history/route.ts", "utf8");
    assert.match(api, /\.eq\("user_id", gate\.account\.userId\)/);
    const sql = fs.readFileSync("supabase/migrations/20261127000001_portal_database.sql", "utf8");
    assert.match(sql, /drop policy if exists "Admins read scripts" on public\.generated_scripts/);
  });

  await t.test("3. Every upload is recorded in the database", () => {
    const rec = fs.readFileSync("src/lib/uploads/record.ts", "utf8");
    assert.match(rec, /from\("media_uploads"\)\.insert/);
    assert.match(fs.readFileSync("src/app/(hidden)/curator/page.tsx", "utf8"), /recordUpload\(\{ bucket: "thumbnails"/);
    assert.match(fs.readFileSync("src/components/profile/ProfileMedia.tsx", "utf8"), /recordUpload\(\{ bucket: "profile-media"/);
  });

  await t.test("4. Profile recommendations come from real curated data", () => {
    const api = fs.readFileSync("src/app/api/profile/route.ts", "utf8");
    assert.doesNotMatch(api, /10x retention|0 to 50K followers|algorithm shift/i);
    assert.match(api, /from\("videos"\)/);
  });
});
