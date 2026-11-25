import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

const rootDir = process.cwd();

test("Header: Displays Creator Engine and removes curator/admin from user dropdown", () => {
  const headerPath = path.join(rootDir, "src", "components", "layout", "Header.tsx");
  assert.ok(fs.existsSync(headerPath), "Header.tsx must exist");
  const content = fs.readFileSync(headerPath, "utf-8");

  // Check Creator Engine in navigation links
  assert.match(
    content,
    /Creator Engine/,
    "Header must display 'Creator Engine' in navigation"
  );
  assert.doesNotMatch(
    content,
    /120s Scripts/,
    "Header must not show old '120s Scripts' label"
  );

  // Check that curator and admin options do not exist in user dropdown
  assert.doesNotMatch(
    content,
    /href="\/curator"/,
    "Curator portal link must be removed from user dropdown"
  );
  assert.doesNotMatch(
    content,
    /href="\/admin"/,
    "Admin dashboard link must be removed from user dropdown"
  );

  // Profile link must exist in dropdown
  assert.match(
    content,
    /href="\/profile"/,
    "User dropdown must contain link to /profile"
  );
});

test("Landing Page Access Gate: Authenticated users only see landing page when logged out", () => {
  const middlewarePath = path.join(rootDir, "src", "middleware.ts");
  assert.ok(fs.existsSync(middlewarePath), "middleware.ts must exist");
  const middlewareContent = fs.readFileSync(middlewarePath, "utf-8");

  // Middleware must redirect authenticated users visiting "/" to "/niches"
  assert.match(
    middlewareContent,
    /path === "\/"[\s\S]*?redirect[\s\S]*?\/niches/,
    "Middleware must redirect authenticated verified users visiting '/' to '/niches'"
  );

  // Page.tsx must also have client-side redirect guard
  const pagePath = path.join(rootDir, "src", "app", "page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");
  assert.match(
    pageContent,
    /router\.replace\("\/niches"\)/,
    "HomePage must redirect authenticated verified users to '/niches'"
  );
});

test("Mobius Loaders: Everywhere on project with video assets and global loading pages", () => {
  const loaderComponentPath = path.join(rootDir, "src", "components", "ui", "MobiusLoader.tsx");
  assert.ok(fs.existsSync(loaderComponentPath), "MobiusLoader.tsx must exist");

  const loopVideoPath = path.join(rootDir, "public", "loaders", "mobius-loop.mp4");
  const aiVideoPath = path.join(rootDir, "public", "loaders", "mobius-ai.mp4");
  assert.ok(fs.existsSync(loopVideoPath), "mobius-loop.mp4 must exist in public/loaders");
  assert.ok(fs.existsSync(aiVideoPath), "mobius-ai.mp4 must exist in public/loaders");

  // Global loading.tsx files
  const rootLoading = path.join(rootDir, "src", "app", "loading.tsx");
  const mainLoading = path.join(rootDir, "src", "app", "(main)", "loading.tsx");
  assert.ok(fs.existsSync(rootLoading), "Root loading.tsx must exist");
  assert.ok(fs.existsSync(mainLoading), "(main)/loading.tsx must exist");

  const rootContent = fs.readFileSync(rootLoading, "utf-8");
  assert.match(rootContent, /MobiusLoader/, "Root loading must use MobiusLoader");
});

test("Training Docs: training.md, rules.md, and source.md exist for all 5 niches; source.md strictly internal", () => {
  const niches = [
    "branding-marketing",
    "faceless-content",
    "startups-founders",
    "tech-news",
    "content-creation",
  ];

  for (const n of niches) {
    const trainingFile = path.join(rootDir, "training-rules", n, "training.md");
    const rulesFile = path.join(rootDir, "training-rules", n, "rules.md");
    const sourceFile = path.join(rootDir, "training-rules", n, "source.md");

    assert.ok(fs.existsSync(trainingFile), `${n}/training.md must exist`);
    assert.ok(fs.existsSync(rulesFile), `${n}/rules.md must exist`);
    assert.ok(fs.existsSync(sourceFile), `${n}/source.md must exist`);

    const sourceContent = fs.readFileSync(sourceFile, "utf-8");
    assert.match(
      sourceContent,
      /NOT FOR AI/i,
      `${n}/source.md must clearly specify strictly NOT for AI consumption`
    );
  }

  // Check rules loader strictly omits source.md from execution
  const rulesLoaderPath = path.join(rootDir, "src", "lib", "training", "rules.ts");
  const rulesLoaderContent = fs.readFileSync(rulesLoaderPath, "utf-8");
  assert.match(rulesLoaderContent, /training\.md/, "rules.ts must load training.md lessons");
  assert.match(rulesLoaderContent, /rules\.md/, "rules.ts must load rules.md");
  assert.doesNotMatch(
    rulesLoaderContent,
    /readFileSync\([^)]*source\.md/i,
    "rules.ts must NEVER load source.md into AI context"
  );
});

test("Creator Engine & 14-Day Deduplication: Script storage and history condition", () => {
  const storagePath = path.join(rootDir, "src", "lib", "scripts", "storage.ts");
  assert.ok(fs.existsSync(storagePath), "storage.ts must exist");
  const storageContent = fs.readFileSync(storagePath, "utf-8");

  assert.match(storageContent, /getRecentScriptsForNiche/, "Must have 14-day niche script fetcher");
  assert.match(storageContent, /pruneOldScripts/, "Must have 14-day script pruning");
  assert.match(storageContent, /getOperationsAnalytics/, "Must compute operations analytics");

  // Check API route
  const apiRoutePath = path.join(rootDir, "src", "app", "api", "scripts", "generate", "route.ts");
  const apiContent = fs.readFileSync(apiRoutePath, "utf-8");
  assert.match(apiContent, /getRecentScriptsForNiche/, "API route must check past 14-day scripts");
  assert.match(apiContent, /pastHooks/, "API route must pass pastHooks for deduplication");
  assert.match(apiContent, /saveGeneratedScript/, "API route must save generated script");

  // Check Creator Engine UI page: history condition
  const uiPagePath = path.join(rootDir, "src", "app", "(main)", "script-generator", "page.tsx");
  const uiContent = fs.readFileSync(uiPagePath, "utf-8");
  assert.match(uiContent, /Creator Engine/, "UI must display 'Creator Engine'");
  assert.match(
    uiContent,
    /historyList\.length > 0/,
    "History UI must only render when there have been past generations"
  );
  assert.match(
    uiContent,
    /Attached Research Contexts|Context Document|Context Window/,
    "UI must support compressed context attachment pills"
  );
});

test("User Profile & Operations Dashboard: /profile page holds niches, history, settings, favorites, and recommendations", () => {
  const profilePagePath = path.join(rootDir, "src", "app", "(main)", "profile", "page.tsx");
  assert.ok(fs.existsSync(profilePagePath), "profile/page.tsx must exist");
  const profileContent = fs.readFileSync(profilePagePath, "utf-8");

  assert.match(profileContent, /Operations Dashboard/i, "Must have Operations Dashboard tab");
  assert.match(profileContent, /Saved Niches/i, "Must have Saved Niches tab");
  assert.match(profileContent, /Script History/i, "Must have Script History tab");
  assert.match(profileContent, /Favorite Creators/i, "Must have Favorite Creators tab");
  assert.match(profileContent, /<span>Recommendations<\/span>/, "Must have Recommendations tab (real ideas from curated videos)");
  assert.match(profileContent, /Edit Profile/i, "Must have Edit Profile functionality");
  assert.match(profileContent, /90-Day Account Deletion/i, "Must have 90-day deletion request per FR-5");

  // Profile API route
  const profileApi = path.join(rootDir, "src", "app", "api", "profile", "route.ts");
  assert.ok(fs.existsSync(profileApi), "api/profile/route.ts must exist");
});

test("Curator & Creators: TikTok direct link behind thumbnail vs YouTube platform frame", () => {
  const creatorsPagePath = path.join(rootDir, "src", "app", "(main)", "creators", "page.tsx");
  const creatorsContent = fs.readFileSync(creatorsPagePath, "utf-8");

  // TikTok link opens in new tab; YouTube opens VideoModal
  assert.match(
    creatorsContent,
    /activePlatform === "tiktok"[\s\S]*?window\.open[\s\S]*?_blank/,
    "Clicking TikTok video must open creator's TikTok link in a new tab"
  );
  assert.match(
    creatorsContent,
    /setSelectedVideo\(\{[\s\S]*?video[\s\S]*?creatorName/,
    "Clicking YouTube video must pull video directly into platform VideoModal"
  );
  assert.match(
    creatorsContent,
    /handleToggleFavorite/,
    "Creator card must support bookmarking/favoriting creators"
  );

  // Curator Portal
  const curatorPortalPath = path.join(rootDir, "src", "app", "(hidden)", "curator", "page.tsx");
  const curatorContent = fs.readFileSync(curatorPortalPath, "utf-8");
  assert.match(
    curatorContent,
    /Direct Link Behind Thumbnail|Thumbnail Image URL/,
    "Curator video entry must support TikTok thumbnail and direct link"
  );
});
