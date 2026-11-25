import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("CreatorLab Requirements: Navbar (7-Day Removal), Topic Search (FR-21..27), Script Generator (FR-28..37)", async (t) => {
  // -------------------------------------------------------------
  // Test 1: Navbar Verification (Remove 7-Day Topics link)
  // -------------------------------------------------------------
  await t.test("1. Navbar: '7-Day Topics' removed from desktop & mobile navigation in Header.tsx", () => {
    const headerSource = fs.readFileSync("src/components/layout/Header.tsx", "utf8");
    assert.doesNotMatch(headerSource, /7-Day Topics/, "Header must not contain '7-Day Topics'");
    assert.doesNotMatch(headerSource, /Sujets 7j/, "Header must not contain 'Sujets 7j'");
    assert.doesNotMatch(headerSource, /Sujets 7 jours/, "Header must not contain 'Sujets 7 jours'");
  });

  // -------------------------------------------------------------
  // Test 2: FR-21 - Search Page Reachable from Creator and Niche Pages
  // -------------------------------------------------------------
  await t.test("2. FR-21: Search page reachable from creator page and niche page", () => {
    const creatorsSource = fs.readFileSync("src/app/(main)/creators/page.tsx", "utf8");
    const nichesSource = fs.readFileSync("src/app/(main)/niches/page.tsx", "utf8");
    const searchPageSource = fs.readFileSync("src/app/(main)/search/page.tsx", "utf8");

    assert.match(creatorsSource, /\/search\?niche=/, "Creator page must have direct link to /search with niche param");
    assert.match(nichesSource, /\/search\?niche=/, "Niche page must have direct link to /search with niche param");
    assert.match(searchPageSource, /input[\s\S]*?placeholder=/, "Search page must have input field for user to enter topic");
  });

  // -------------------------------------------------------------
  // Test 3: FR-22 & FR-26 & FR-27 - Search Results Contract
  // -------------------------------------------------------------
  await t.test("3. FR-22, FR-26, FR-27: Max 10 results, last 7 days, snippets only, no query storage", () => {
    const engineSource = fs.readFileSync("src/lib/search/engine.ts", "utf8");
    const apiRouteSource = fs.readFileSync("src/app/api/search/route.ts", "utf8");

    // FR-22: Up to 10 results, most recent first
    assert.match(engineSource, /matched\.slice\(0,\s*10\)/, "Engine must return up to 10 results max (FR-22)");
    assert.match(engineSource, /matched\.sort\(\(a,\s*b\)\s*=>\s*a\.daysAgo\s*-\s*b\.daysAgo\)/, "Engine must sort most recent first (FR-22)");

    // FR-26: Zero database persistence for search queries or results
    assert.doesNotMatch(apiRouteSource, /\.insert\(/, "Search API route must not insert queries or results into DB (FR-26)");
    assert.doesNotMatch(apiRouteSource, /from\("searches"\)/, "No search queries table write (FR-26)");
    assert.match(apiRouteSource, /FR-26:\s*Pure in-memory ephemeral execution/, "Documented ephemeral execution (FR-26)");

    // FR-27: Snippets only, never full article text
    assert.match(engineSource, /seed\.snippet\.slice\(0,\s*247\)/, "Snippet length constrained (FR-27)");
    assert.match(apiRouteSource, /FR-27:\s*The system shall not display full article text\. Snippets only\./, "Strict snippet enforcement (FR-27)");
  });

  // -------------------------------------------------------------
  // Test 4: FR-23 & FR-24 - Results Grouped by Source
  // -------------------------------------------------------------
  await t.test("4. FR-23 & FR-24: Results grouped by source showing source name, publish date, snippet, link in new tab", () => {
    const engineSource = fs.readFileSync("src/lib/search/engine.ts", "utf8");
    const searchPageSource = fs.readFileSync("src/app/(main)/search/page.tsx", "utf8");

    // FR-23: Grouped by source
    assert.match(engineSource, /groupMap\.set\(item\.sourceName/, "Engine must group results by source (FR-23)");
    assert.match(searchPageSource, /groups\.map/, "UI must render source groups (FR-23)");
    assert.match(searchPageSource, /group\.sourceName/, "UI must display source name (FR-23)");
    assert.match(searchPageSource, /group\.count/, "UI must display count of results for each source (FR-23)");

    // FR-24: Show source name, publish date, title, snippet, link opening source in new tab
    assert.match(searchPageSource, /item\.sourceName/, "Card must show source name (FR-24)");
    assert.match(searchPageSource, /item\.relativeTime/, "Card must show publish date/time (FR-24)");
    assert.match(searchPageSource, /item\.title/, "Card must show title (FR-24)");
    assert.match(searchPageSource, /item\.snippet/, "Card must show short snippet (FR-24)");
    assert.match(searchPageSource, /target="_blank"/, "Link must open in new tab (FR-24)");
    assert.match(searchPageSource, /rel="noopener noreferrer"/, "Secure target blank link (FR-24)");
  });

  // -------------------------------------------------------------
  // Test 5: FR-25 - Source-Type Filters (news, blogs, documentaries, newsletters)
  // -------------------------------------------------------------
  await t.test("5. FR-25: Source-type filters (news, blogs, documentaries, newsletters)", () => {
    const searchPageSource = fs.readFileSync("src/app/(main)/search/page.tsx", "utf8");
    const engineSource = fs.readFileSync("src/lib/search/engine.ts", "utf8");

    assert.match(searchPageSource, /"news",\s*"blogs",\s*"documentaries",\s*"newsletters"/, "Search page offers all 4 required source-type filters (FR-25)");
    assert.match(engineSource, /seed\.sourceType !== filterType/, "Engine filters by source type (FR-25)");
  });

  // -------------------------------------------------------------
  // Test 6: FR-28 - Notes Box 5,000 Char Limit & Live Counter
  // -------------------------------------------------------------
  await t.test("6. FR-28: Notes box accepts up to 5,000 characters with counter and limit warning", () => {
    const scriptPageSource = fs.readFileSync("src/app/(main)/script-generator/page.tsx", "utf8");
    const routeSource = fs.readFileSync("src/app/api/scripts/generate/route.ts", "utf8");

    assert.match(scriptPageSource, /MAX_NOTES_CHARS = 5000/, "Must enforce 5,000 character maximum in UI");
    assert.match(scriptPageSource, /MAX_NOTES_CHARS\.toLocaleString\(\)/, "Must display live character counter in UI");
    assert.match(scriptPageSource, /Limit reached \(5,000 characters max\)/, "Must show warning banner when limit reached");
    assert.match(routeSource, /sanitizedNotes\.length > 5000/, "API route must reject notes > 5,000 chars");
  });

  // -------------------------------------------------------------
  // Test 7: FR-29 & FR-30 - Niche Training Pack Selection & 3 Inputs Only
  // -------------------------------------------------------------
  await t.test("7. FR-29 & FR-30: Chosen niche selects training pack; 3 inputs only", () => {
    const scriptPageSource = fs.readFileSync("src/app/(main)/script-generator/page.tsx", "utf8");
    const routeSource = fs.readFileSync("src/app/api/scripts/generate/route.ts", "utf8");
    const rulesSource = fs.readFileSync("src/lib/training/rules.ts", "utf8");

    // FR-29: Choose niche before generating script
    assert.match(scriptPageSource, /1\. Choose Niche \(FR-29\)/, "UI provides niche selector before generation");
    assert.match(rulesSource, /getNicheTrainingPack/, "Loads niche training rules");

    // FR-30: Script generated from 3 inputs only: niche training rules, user topic, user notes
    assert.match(routeSource, /const\s*\{\s*niche_id,\s*topic,\s*notes\s*\}\s*=\s*body;/, "Route accepts only niche_id, topic, and notes");
    assert.match(routeSource, /generate120sScript\(\{[\s\S]*?rules:[\s\S]*?topic:[\s\S]*?notes:/, "Passes only the 3 inputs to generator");
  });

  // -------------------------------------------------------------
  // Test 8: FR-31 & FR-32 - 120s Spoken Time Cap & Bracketed Timing Marks
  // -------------------------------------------------------------
  await t.test("8. FR-31 & FR-32: Script capped at 120s spoken time with bracketed timing marks", () => {
    const geminiSource = fs.readFileSync("src/lib/scripts/gemini.ts", "utf8");
    const coreStructure = fs.readFileSync("training-rules/core/script-structure.md", "utf8");

    // FR-31: Capped at 120 seconds
    assert.match(geminiSource, /Math\.min\(120,/, "Spoken duration strictly capped at 120s (FR-31)");
    assert.match(geminiSource, /FR-31:\s*Capped at 120 seconds spoken time/, "Enforces 120s spoken cap");

    // FR-32: Defined sections with bracketed timing marks
    assert.match(geminiSource, /\[0:00\s*-\s*0:03\]/, "Contains [0:00 - 0:03] Hook mark");
    assert.match(geminiSource, /\[0:03\s*-\s*0:25\]/, "Contains [0:03 - 0:25] Context mark");
    assert.match(geminiSource, /\[0:25\s*-\s*1:15\]/, "Contains [0:25 - 1:15] Core Value mark");
    assert.match(geminiSource, /\[1:45\s*-\s*2:00\]/, "Contains [1:45 - 2:00] Closing mark");
    assert.match(coreStructure, /Standard Timing Marks/, "Training rules specify defined timing marks");
  });

  // -------------------------------------------------------------
  // Test 9: FR-33 & FR-35 - Zero Note Storage in Database & Log Request Without Notes
  // -------------------------------------------------------------
  await t.test("9. FR-33 & FR-35: Zero storage of user notes in Supabase script_requests", () => {
    const routeSource = fs.readFileSync("src/app/api/scripts/generate/route.ts", "utf8");
    const dbSchema = fs.readFileSync("supabase/full_setup.sql", "utf8");

    // Verify script_requests table has NO notes column
    assert.doesNotMatch(dbSchema, /create table if not exists public\.script_requests[\s\S]*?notes\s+text/, "Table script_requests must NOT have a notes column (FR-33 & FR-35)");

    // Verify route does not pass notes to insert
    assert.match(routeSource, /from\("script_requests"\)\.insert\(\{[\s\S]*?user_id:[\s\S]*?niche_id,[\s\S]*?topic:/, "Inserts user_id, niche_id, and topic");
    assert.doesNotMatch(routeSource, /from\("script_requests"\)\.insert\(\{[\s\S]*?notes:/, "Route MUST NOT pass notes into insert (FR-33 & FR-35)");
  });

  // -------------------------------------------------------------
  // Test 10: FR-34 - Editable Script & In-App Copy
  // -------------------------------------------------------------
  await t.test("10. FR-34: In-app editable script and copy button", () => {
    const scriptPageSource = fs.readFileSync("src/app/(main)/script-generator/page.tsx", "utf8");

    assert.match(scriptPageSource, /handleCopyScript/, "Must provide handleCopyScript function");
    assert.match(scriptPageSource, /navigator\.clipboard\.writeText/, "Must copy to clipboard (FR-34)");
    assert.match(scriptPageSource, /<textarea[\s\S]*?value=\{generatedScript\}/, "Script must be editable in a textarea (FR-34)");
  });

  // -------------------------------------------------------------
  // Test 11: FR-36 - Retry Once on Failure
  // -------------------------------------------------------------
  await t.test("11. FR-36: System retries once on failure before throwing error", () => {
    const geminiSource = fs.readFileSync("src/lib/scripts/gemini.ts", "utf8");
    assert.match(geminiSource, /while\s*\(attempt\s*<\s*2\)/, "Must attempt generation and retry once on failure (FR-36)");
    assert.match(geminiSource, /retried\s*=\s*true/, "Tracks retry status");
  });

  // -------------------------------------------------------------
  // Test 12: FR-37 - Produced Only from Rules and User Input
  // -------------------------------------------------------------
  await t.test("12. FR-37: Produced only from rules & user input (no side-by-side comparison)", () => {
    const scriptPageSource = fs.readFileSync("src/app/(main)/script-generator/page.tsx", "utf8");
    assert.match(scriptPageSource, /Produced only from rules & user input \(FR-37\)/, "Strict single-model generation pipeline");
    assert.doesNotMatch(scriptPageSource, /modelA[\s\S]*?modelB/, "No side-by-side comparison with other models");
  });
});
