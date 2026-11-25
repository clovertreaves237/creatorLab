import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("CreatorLab Functional Requirements: Niche Preferences (FR-8..12) & Creator Browsing (FR-13..20)", async (t) => {
  // Test 1: FR-8 - Five Niches Allow-List
  await t.test("1. FR-8: Five Niches Defined in One Place with Demo Niche", () => {
    const nichesSource = fs.readFileSync("src/lib/constants/niches.ts", "utf8");
    assert.match(nichesSource, /branding-marketing/, "Must include branding-marketing");
    assert.match(nichesSource, /faceless-content/, "Must include faceless-content");
    assert.match(nichesSource, /startups-founders/, "Must include startups-founders");
    assert.match(nichesSource, /tech-news/, "Must include tech-news");
    assert.match(nichesSource, /content-creation/, "Must include content-creation");
    assert.match(nichesSource, /isLiveDemo: true/, "Branding & marketing must be live demo niche");
  });

  // Test 2: FR-9 & FR-12 - Save and Remove Niche Preferences
  await t.test("2. FR-9 & FR-12: Save and Remove Niche Preferences in user_niches", () => {
    const nichesPageSource = fs.readFileSync("src/app/(main)/niches/page.tsx", "utf8");
    assert.match(nichesPageSource, /toggleSaveNiche/, "Must contain toggleSaveNiche function");
    assert.match(nichesPageSource, /\.from\("user_niches"\)[\s\S]*?\.insert/, "FR-9: Must insert into user_niches");
    assert.match(nichesPageSource, /\.from\("user_niches"\)[\s\S]*?\.delete/, "FR-12: Must delete from user_niches");
  });

  // Test 3: FR-10 & FR-11 - Open Saved Niche and 1-Click Switcher
  await t.test("3. FR-10 & FR-11: Niche Switcher Without Losing Saved List", () => {
    const creatorsPageSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");
    // Personalisation: the switcher lists only the niches the user chose (never every niche on one page)
    assert.match(creatorsPageSource, /const myNiches = ALLOWED_NICHES\.filter\(\(n\) => savedNiches\.includes\(n\.id\)\)/, "Switcher is limited to the user's niches");
    assert.match(creatorsPageSource, /myNiches\.map/, "Must render 1-click Niche Switcher tabs");
    assert.match(creatorsPageSource, /savedNiches\.includes/, "Must indicate saved status on switcher pills");
    assert.match(creatorsPageSource, /router\.push\(`\/creators\?niche=\$\{n\.id\}`\)/, "1-click navigation without losing state");
  });

  // Test 4: FR-13 - Two Groups with 9 Creators Each
  await t.test("4. FR-13: Real curated creators in two groups (YouTube & TikTok), no hard-coded creators", () => {
    const creatorsSource = fs.readFileSync("src/lib/constants/creators.ts", "utf8");
    const creatorsPageSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");

    assert.doesNotMatch(creatorsSource, /YOUTUBE_CREATORS_RAW|TIKTOK_CREATORS_RAW|CURATOR_PROFILES/, "No invented creators or curators");
    assert.match(creatorsPageSource, /\.from\("creators"\)/, "Creators come from the database");
    assert.doesNotMatch(creatorsPageSource, /getCuratedCreatorsForNiche/, "No baseline/demo creators merged in");
    assert.match(creatorsPageSource, /YouTube Group \(\{finalYoutube\.length\}\)/, "YouTube group count visible");
    assert.match(creatorsPageSource, /TikTok Group \(\{finalTiktok\.length\}\)/, "TikTok group count visible");
    assert.ok(fs.existsSync("scripts/build-creators-seed.cjs"), "Source-list importer exists");
  });

  // Test 5: FR-14 & FR-15 - Creator Card Metadata & Ranking Score
  await t.test("5. FR-14 & FR-15: Creator Metadata & Engagement Score Ranking", () => {
    const creatorsSource = fs.readFileSync("src/lib/constants/creators.ts", "utf8");
    const creatorsPageSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");

    // FR-14 fields
    assert.match(creatorsPageSource, /creator\.display_name/, "Must show display_name");
    assert.match(creatorsPageSource, /creator\.followers_formatted/, "Must show follower count");
    assert.match(creatorsPageSource, /creator\.followers_checked_on/, "Must show check date");
    assert.match(creatorsPageSource, /creator\.profile_url/, "Must link to profile URL");

    // FR-15 ranking score formula
    assert.match(creatorsSource, /computeScore/, "Must compute engagement ranking score");
    assert.match(creatorsSource, /views \+ likes \* 10 \+ comments \* 20/, "Score formula must match (views*1 + likes*10 + comments*20)");
    assert.match(creatorsSource, /sort\(\(a, b\) => b\.score - a\.score\)/, "Must sort descending by score");
  });

  // Test 6: FR-17 - Duration Filter Tabs
  await t.test("6. FR-17: Duration Tabs ('Last 14 days' TikTok, 'Last 30 days' YouTube, 'Best performing' both)", () => {
    const creatorsPageSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");
    assert.match(creatorsPageSource, /Best Performing \(FR-17\)/, "Best performing tab must exist");
    assert.match(creatorsPageSource, /Last 30 Days \(FR-17\)/, "YouTube Last 30 Days must exist");
    assert.match(creatorsPageSource, /Last 14 Days \(FR-17\)/, "TikTok Last 14 Days must exist");
  });

  // Test 7: FR-18 & FR-19 - Video Cards, Stats Block, and Embedded Player
  await t.test("7. FR-18 & FR-19: Video Cards & On-Page Embedded Player", () => {
    const videoModalSource = fs.readFileSync("src/components/creators/VideoModal.tsx", "utf8");
    assert.match(videoModalSource, /video\.title/, "Must render video title");
    assert.match(videoModalSource, /video\.short_description/, "Must render short description");
    assert.match(videoModalSource, /video\.publish_date/, "Must render publish date");
    assert.match(videoModalSource, /video\.stats\.as_of/, "Must render as-of date");

    // FR-19: Embeds on CreatorLab page
    assert.match(videoModalSource, /iframe/, "Must render iframe player on page");
    assert.match(videoModalSource, /embed_url/, "Must embed video URL directly");
  });

  // Test 8: FR-20 - Platform Hidden Stat Handling
  await t.test("8. FR-20: 'Hidden' Stat Display When Platform Hides Metric", () => {
    const videoModalSource = fs.readFileSync("src/components/creators/VideoModal.tsx", "utf8");
    const creatorsPageSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");

    assert.match(videoModalSource, /video\.stats\.views !== null[\s\S]*?Hidden/, "Modal must display 'Hidden' when views are null");
    assert.match(videoModalSource, /video\.stats\.likes !== null[\s\S]*?Hidden/, "Modal must display 'Hidden' when likes are null");
    assert.match(videoModalSource, /video\.stats\.comments !== null[\s\S]*?Hidden/, "Modal must display 'Hidden' when comments are null");
    assert.match(creatorsPageSource, /Hidden/, "Creator grid video cards must handle Hidden stats");
  });
});
