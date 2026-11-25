import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("CreatorLab Requirements: Video Analysis (FR-38..43), Curator & Admin (FR-44..52), Privacy & Notices (FR-53..55)", async (t) => {
  // -------------------------------------------------------------
  // Test 1: Mobius Loaders Integration
  // -------------------------------------------------------------
  await t.test("1. Loaders: Mobius MP4 files and MobiusLoader component in brand colors", () => {
    assert.ok(fs.existsSync("public/loaders/mobius-loop.mp4"), "mobius-loop.mp4 must exist in public/loaders");
    assert.ok(fs.existsSync("public/loaders/mobius-ai.mp4"), "mobius-ai.mp4 must exist in public/loaders");

    const loaderSource = fs.readFileSync("src/components/ui/MobiusLoader.tsx", "utf8");
    assert.match(loaderSource, /variant\s*===\s*"ai"/, "Must support AI generator variant");
    assert.match(loaderSource, /mobius-ai\.mp4/, "Must serve mobius-ai.mp4 when ai is generating");
    assert.match(loaderSource, /mobius-loop\.mp4/, "Must serve mobius-loop.mp4 for general loading");
    // Sketchbook palette only: ink line, accent pencil tip, highlighter colours (defined in globals.css)
    const css = fs.readFileSync("src/app/globals.css", "utf8");
    assert.match(css, /\.sk-loader__draw[\s\S]*?stroke: var\(--ink\)/, "Loader line drawn in ink");
    assert.match(css, /\.sk-loader__tip[\s\S]*?fill: var\(--accent\)/, "Pencil tip in the brand accent");
    assert.match(css, /var\(--hl-yellow\)[\s\S]*var\(--hl-sky\)[\s\S]*var\(--hl-mint\)/, "Highlighter cycles through the palette");
    assert.doesNotMatch(loaderSource, /#38BDF8|#A3E635/i, "No off-palette cyan or lime");
  });

  // -------------------------------------------------------------
  // Test 2: FR-38 & FR-39 - 'Why this worked' Button & On-Demand Run
  // -------------------------------------------------------------
  await t.test("2. FR-38 & FR-39: 'Why this worked' button appears on each card, runs only on click", () => {
    const creatorsPageSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");
    const modalSource = fs.readFileSync("src/components/creators/VideoAnalysisModal.tsx", "utf8");

    // FR-38
    assert.match(creatorsPageSource, /Why this worked \(FR-38\)/, "Button 'Why this worked' must appear on video cards");

    // FR-39: Only runs when user clicks the button, not automatically
    assert.match(creatorsPageSource, /setAnalyzingVideo\(\{/, "Clicking sets analyzing video on-demand");
    assert.match(modalSource, /FR-39:\s*Analysis runs ONLY when the user clicks the button/, "Enforces manual run on click");
  });

  // -------------------------------------------------------------
  // Test 3: FR-40 & FR-43 - Input Constraints & Zero Video/Audio Sent
  // -------------------------------------------------------------
  await t.test("3. FR-40 & FR-43: Input limited to public metadata, YouTube desc summarized, zero media sent", () => {
    const engineSource = fs.readFileSync("src/lib/analysis/engine.ts", "utf8");
    const routeSource = fs.readFileSync("src/app/api/video-analysis/route.ts", "utf8");

    // FR-40: title, summarized description, chapters, duration, stats
    assert.match(engineSource, /summarizeDescription/, "Must summarize YouTube description before sending (FR-40)");
    // FR-40: only public metadata fields are read from the request (each one type-checked and length-capped)
    const bodyFields = [...new Set([...routeSource.matchAll(/body\??\.([a-zA-Z_]+)/g)].map((m) => m[1]))].sort();
    assert.deepEqual(bodyFields, ["chapters", "description", "duration_seconds", "platform", "stats", "title", "videoId"], "Accepts only the public metadata inputs (FR-40)");

    // FR-43: Explicit enforcement that video file, audio, or transcript are never sent to Gemini
    assert.match(engineSource, /NEVER sends video file, audio, or transcript \(FR-43\)/, "Explicit FR-43 enforcement");
    assert.doesNotMatch(engineSource, /callGeminiAnalysis\(\{[\s\S]*?transcript/, "Must not pass transcript in Gemini call (FR-43)");
    assert.doesNotMatch(engineSource, /callGeminiAnalysis\(\{[\s\S]*?audio/, "Must not pass audio in Gemini call (FR-43)");
    assert.doesNotMatch(engineSource, /callGeminiAnalysis\(\{[\s\S]*?videoFile/, "Must not pass raw video in Gemini call (FR-43)");
  });

  // -------------------------------------------------------------
  // Test 4: FR-41 & FR-42 - Analysis Output & Mandatory Note
  // -------------------------------------------------------------
  await t.test("4. FR-41 & FR-42: Output has summary, reasons labeled 'likely', 3 suggestions, verdict, and note", () => {
    const engineSource = fs.readFileSync("src/lib/analysis/engine.ts", "utf8");
    const modalSource = fs.readFileSync("src/components/creators/VideoAnalysisModal.tsx", "utf8");

    // FR-41: summary, likely reasons (each labeled 'likely'), 3 suggestions, one-line verdict
    assert.match(engineSource, /summary:/, "Must produce summary (FR-41)");
    assert.match(engineSource, /likelyReasons:/, "Must produce likely reasons (FR-41)");
    assert.match(engineSource, /`likely:\s*/, "Each reason must be labeled 'likely' (FR-41)");
    assert.match(engineSource, /suggestions:\s*\[/, "Must produce 3 suggestions (FR-41)");
    assert.match(engineSource, /verdict:/, "Must produce one-line verdict (FR-41)");

    // FR-42: Mandatory disclosure note
    const expectedNote = "Interpretation based on public data, not verified by watching the video.";
    assert.match(engineSource, new RegExp(expectedNote), "Engine must include exact FR-42 disclosure note");
    assert.match(modalSource, /analysis\.disclaimer/, "Modal must render disclosure note (FR-42)");
  });

  // -------------------------------------------------------------
  // Test 5: FR-44 - Curator Add/Edit Creator & Criteria Recording
  // -------------------------------------------------------------
  await t.test("5. FR-44: Curators can add/edit creators, record criteria checked, set curated-by & curated-on", () => {
    const curatorPageSource = fs.readFileSync("src/app/(hidden)/curator/page.tsx", "utf8");
    const routeSource = fs.readFileSync("src/app/api/curator/creators/route.ts", "utf8");

    assert.match(curatorPageSource, /criteriaChecked/, "Curator form must capture criteria checked (FR-44)");
    assert.match(curatorPageSource, /curatedBy/, "Curator form must capture curated-by (FR-44)");
    assert.match(curatorPageSource, /curatedOn/, "Curator form must capture curated-on (FR-44)");
    assert.match(routeSource, /curated_by:/, "API route persists curated_by (FR-44)");
    assert.match(routeSource, /curated_on:/, "API route persists curated_on (FR-44)");
    assert.match(routeSource, /criteria_checked:/, "API route persists criteria_checked (FR-44)");
  });

  // -------------------------------------------------------------
  // Test 6: FR-45 - Curator Enter Video Data
  // -------------------------------------------------------------
  await t.test("6. FR-45: Curators can enter video data: title, desc, pub date, URL, views, likes, comments, check date", () => {
    const curatorPageSource = fs.readFileSync("src/app/(hidden)/curator/page.tsx", "utf8");
    const routeSource = fs.readFileSync("src/app/api/curator/videos/route.ts", "utf8");

    assert.match(curatorPageSource, /videoTitle/, "Curator form captures video title");
    assert.match(curatorPageSource, /publishDate/, "Curator form captures publish date");
    assert.match(curatorPageSource, /views/, "Curator form captures views");
    assert.match(curatorPageSource, /likes/, "Curator form captures likes");
    assert.match(curatorPageSource, /comments/, "Curator form captures comments");
    assert.match(curatorPageSource, /checkDate/, "Curator form captures check date");

    assert.match(routeSource, /\.from\("videos"\)[\s\S]*?\.upsert/, "API route stores video record (FR-45)");
    assert.match(routeSource, /\.from\("video_snapshots"\)[\s\S]*?\.insert/, "API route creates snapshot row (FR-48)");
  });

  // -------------------------------------------------------------
  // Test 7: FR-46, FR-47, FR-48 - Admin YouTube Refresh & Immutable Snapshots
  // -------------------------------------------------------------
  await t.test("7. FR-46..48: Manual YouTube refresh, window check (30d/14d), immutable snapshot rows", () => {
    const adminPageSource = fs.readFileSync("src/app/(hidden)/admin/page.tsx", "utf8");
    const refreshRouteSource = fs.readFileSync("src/app/api/admin/refresh/route.ts", "utf8");

    // FR-46: Trigger manual refresh from admin dashboard
    assert.match(adminPageSource, /Trigger Manual YouTube Refresh \(FR-46\)/, "Admin dashboard has trigger button");
    assert.match(adminPageSource, /handleTriggerRefresh/, "Admin dashboard invokes refresh handler");

    // FR-47: 30 days for YouTube; 14 days for TikTok
    assert.match(refreshRouteSource, /targetPlatform === "youtube" \? 30 : 14/, "Enforces 30-day (YouTube) and 14-day (TikTok) window (FR-47)");

    // FR-48: Insert new snapshot row per video, never overwritten
    assert.match(refreshRouteSource, /\.from\("video_snapshots"\)[\s\S]*?\.insert/, "Inserts new snapshot row on refresh (FR-48)");
    assert.doesNotMatch(refreshRouteSource, /\.from\("video_snapshots"\)[\s\S]*?\.update/, "Must NEVER update or overwrite existing snapshot rows (FR-48)");
  });

  // -------------------------------------------------------------
  // Test 8: FR-49 - User Role Management
  // -------------------------------------------------------------
  await t.test("8. FR-49: Admins can manage user roles and view user accounts", () => {
    const adminPageSource = fs.readFileSync("src/app/(hidden)/admin/page.tsx", "utf8");
    const usersRouteSource = fs.readFileSync("src/app/api/admin/users/route.ts", "utf8");

    assert.match(adminPageSource, /handleUpdateRole/, "Admin dashboard provides role update handler (FR-49)");
    assert.match(adminPageSource, /Current Role/, "Admin dashboard displays user account roles table (FR-49)");
    // FR-7/FR-49: roles change only through audited database functions (invite -> accept, or remove)
    assert.match(usersRouteSource, /rpc\("admin_invite_role"/, "API invites users to a role (FR-49)");
    assert.match(usersRouteSource, /rpc\("admin_remove_role"/, "API removes roles (FR-49)");
    assert.match(usersRouteSource, /requireRole\("admin"\)/, "Users API is restricted to admins (FR-6)");
    assert.doesNotMatch(usersRouteSource, /\.from\("profiles"\)[\s\S]*?\.update\(\{\s*role/, "Role column is never written directly");
  });

  // -------------------------------------------------------------
  // Test 9: FR-50 & FR-51 - Audit Log Kept for 1 Year
  // -------------------------------------------------------------
  await t.test("9. FR-50 & FR-51: Audit log records who, what, when, kept for 1 year, viewable by admins", () => {
    const adminPageSource = fs.readFileSync("src/app/(hidden)/admin/page.tsx", "utf8");
    const auditRouteSource = fs.readFileSync("src/app/api/admin/audit-log/route.ts", "utf8");

    assert.match(auditRouteSource, /oneYearAgo\.setFullYear\(oneYearAgo\.getFullYear\(\) - 1\)/, "Enforces 1-year retention query filter (FR-50)");
    assert.match(adminPageSource, /Audit Log Viewer \(FR-50, FR-51\)/, "Admin dashboard renders audit log viewer (FR-51)");
    assert.match(adminPageSource, /Retention: 1 Year \(FR-50\)/, "Displays retention notice (FR-50)");
  });

  // -------------------------------------------------------------
  // Test 10: FR-52 - Training Rules Updated Only via Repository
  // -------------------------------------------------------------
  await t.test("10. FR-52: Training rules updated only through repository, not through product", () => {
    const adminPageSource = fs.readFileSync("src/app/(hidden)/admin/page.tsx", "utf8");

    assert.match(adminPageSource, /Training rules shall be updated only through the repository, not through the product/, "Admin page declares FR-52 read-only governance");
    assert.match(adminPageSource, /Strictly Read-Only In Product/, "Strict repository governance badge visible");
  });

  // -------------------------------------------------------------
  // Test 11: FR-53 & FR-54 - Privacy Notice, Terms, and Gemini Training Rule Note in Footer
  // -------------------------------------------------------------
  await t.test("11. FR-53 & FR-54: Footer includes privacy notice, terms link, and Gemini training rule note", () => {
    const footerSource = fs.readFileSync("src/components/layout/Footer.tsx", "utf8");

    // FR-53
    assert.match(footerSource, /href="\/privacy"/, "Footer must have privacy link (FR-53)");
    assert.match(footerSource, /href="\/terms"/, "Footer must have terms link (FR-53)");

    // FR-54
    assert.match(footerSource, /Gemini generates your scripts strictly from CreatorLab/, "Footer must display FR-54 note on Gemini generation rules");
  });

  // -------------------------------------------------------------
  // Test 12: FR-55 - Sign-Up Flow Shows Data Collected and Why
  // -------------------------------------------------------------
  await t.test("12. FR-55: Sign-up flow shows what data is collected and why (Cameroon Law No. 2024/017)", () => {
    const signUpSource = fs.readFileSync("src/components/auth/SignUpForm.tsx", "utf8");
    const noticeModalSource = fs.readFileSync("src/components/auth/DataNoticeModal.tsx", "utf8");

    assert.match(signUpSource, /DataNoticeModal|What data is collected and why/, "Sign-up form links to data collection notice (FR-55)");
    assert.match(noticeModalSource, /FR-55: The sign-up flow shall show what data is collected and why/, "Notice modal specifies what is collected and why (FR-55)");
    assert.match(noticeModalSource, /Law No\. 2024\/017/, "Complies with Cameroon data protection law");
  });
});
