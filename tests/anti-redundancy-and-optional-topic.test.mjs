import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";

test("Anti-Redundancy & Fluid Layout Verification", async (t) => {
  // Test 1: Training rules forbid robotic enumeration
  await t.test("1. Training rules and core script structure explicitly prohibit mechanical enumeration", () => {
    const rules = fs.readFileSync("training-rules/branding-marketing/rules.md", "utf8");
    const core = fs.readFileSync("training-rules/core/script-structure.md", "utf8");

    assert.match(rules, /Strictly prohibit mechanical enumerations like "First, Second, Third"/, "Rules must forbid mechanical counting");
    assert.match(rules, /Anti-Redundancy & Natural Spoken Delivery/, "Rules must define anti-redundancy spoken delivery");
    assert.match(core, /Strictly prohibit robotic counting or mechanical enumerations/, "Core structure must forbid robotic counting");
  });

  // Test 2: Gemini prompt and deterministic templates have zero robotic counting
  await t.test("2. gemini.ts enforces anti-redundancy in systemPrompt and deterministic templates", () => {
    const gemini = fs.readFileSync("src/lib/scripts/gemini.ts", "utf8");

    assert.match(gemini, /STRICT ANTI-REDUNDANCY & NATURAL CONVERSATIONAL FLOW/, "Must instruct Gemini against robotic enumeration");
    assert.match(gemini, /STRICTLY FORBIDDEN from using robotic, formulaic enumerations/, "System prompt must strictly forbid First/Second/Third");

    // Verify no deterministic template in synthesizeRuleScript has 'First, ' followed by 'Second, ' and 'Third, '
    const lines = gemini.split("\n");
    const bodyLines = lines.filter((l) => l.includes("body = `") || l.includes("body = \""));
    for (const line of bodyLines) {
      assert.doesNotMatch(line, /First,[\s\S]*?Second,[\s\S]*?Third,/i, `Template must not use robotic enumeration: ${line}`);
      assert.doesNotMatch(line, /Step one,[\s\S]*?Step two,[\s\S]*?Step three,/i, `Template must not use robotic step counting: ${line}`);
      assert.doesNotMatch(line, /Number one,[\s\S]*?Number two,/i, `Template must not use robotic number counting: ${line}`);
    }
  });

  // Test 3: Topic is optional in API route when notes are provided
  await t.test("3. Route accepts requests without topic when context notes are present", () => {
    const route = fs.readFileSync("src/app/api/scripts/generate/route.ts", "utf8");

    assert.match(route, /const\s*\{\s*niche_id,\s*topic,\s*notes\s*\}\s*=\s*body;/, "Route retains standard body destructuring");
    assert.match(route, /if\s*\(!rawTopic\s*&&\s*!sanitizedNotes\)/, "Rejects only if both topic and notes are missing");
    assert.match(route, /const effectiveTopic\s*=/, "Derives effectiveTopic when topic is omitted");
  });

  // Test 4: Script Generator single-screen fluid layout with sidebar
  await t.test("4. UI provides Creator Engine sidebar and side-by-side distraction-free panes", () => {
    const ui = fs.readFileSync("src/app/(main)/script-generator/page.tsx", "utf8");

    assert.match(ui, /h-\[calc\(100vh-\d+rem\)\]/, "Must lock viewport height (viewport minus header) to prevent page scrolling");
    assert.match(ui, /overflow-hidden/, "Must eliminate page-level scrollbars");
    assert.match(ui, /1\. Choose Niche \(FR-29\)/, "Must preserve FR-29 selector");
    assert.match(ui, /Context Window & Notes/, "Must provide Context Window pane");
    assert.match(ui, /Generated Script/, "Must provide Generated Script pane");
    assert.match(ui, /MAX_NOTES_CHARS = 5000/, "Enforces 5,000 char limit");
    assert.match(ui, /Produced only from rules & user input \(FR-37\)/, "Single-model rules compliance");
  });

  // Test 5: Intent & Tone Detection for Business Owners and Creators
  await t.test("5. gemini.ts identifies user tone & speaker role for agency owners and creators", () => {
    const gemini = fs.readFileSync("src/lib/scripts/gemini.ts", "utf8");

    // Must have service_agency speaker role and patterns for business promotion
    assert.match(gemini, /speakerRole\s*[:=]\s*"service_agency"/, "Defines service_agency speaker role");
    assert.match(gemini, /promote\\s\+\(my\|our\)/, "Detects promote my/our business pattern");
    assert.match(gemini, /branding\\s\+business/, "Detects branding business keyword");

    // Critical perspective instruction must forbid lecturing the creator
    assert.match(gemini, /CRITICAL UNIVERSAL PERSPECTIVE RULE/, "Enforces universal perspective rule");
    assert.match(gemini, /NEVER write as an outside third party giving unsolicited advice TO the user/, "Forbids unsolicited advice to user");
    assert.match(gemini, /The user is ALWAYS the creator in front of the camera/, "User is always on camera delivering script");

    // Must have dedicated service agency templates pitching to prospective clients
    assert.match(gemini, /Stop letting amateur designers convince you/, "Includes high-converting agency founder hook");
    assert.match(gemini, /When we engineer brand identity systems at our studio/, "Includes first-person studio body");
    assert.match(gemini, /book a strategic brand audit today/, "Includes client acquisition CTA");
  });

  // Test 6: Dual Persona Engine - Real-world business & restaurant owners get direct advertising scripts
  await t.test("6. gemini.ts provides direct customer advertising scripts for hospitality and retail business owners", () => {
    const gemini = fs.readFileSync("src/lib/scripts/gemini.ts", "utf8");

    // Must have direct_business_owner role
    assert.match(gemini, /speakerRole:\s*SpeakerRole\s*=\s*"creator_educator"/, "Initializes speakerRole");
    assert.match(gemini, /speakerRole\s*=\s*"direct_business_owner"/, "Assigns direct_business_owner role");
    assert.match(gemini, /businessCategory\s*=\s*"hospitality"/, "Classifies hospitality business category");

    // Critical persona instruction for hospitality
    assert.match(gemini, /CRITICAL PERSPECTIVE INSTRUCTION - RESTAURANT, FOOD & DRINKS VENUE/, "Must have hospitality persona prompt");
    assert.match(gemini, /DO NOT give meta-advice on "how to brand a restaurant"/, "Forbids branding meta-advice to restaurant owners");
    assert.match(gemini, /The user IS the food & drinks proprietor speaking TO hungry\/thirsty customers/, "Proprietor speaks to diners");

    // Must have dedicated restaurant / food / drinks templates
    assert.match(gemini, /If you are in \$\{loc\} and you are still wondering where to get genuinely delicious food and ice-cold drinks/, "Includes food & drinks hook");
    assert.match(gemini, /At our restaurant in \$\{loc\}, our kitchen fires every single order fresh to the plate/, "Includes kitchen fresh cooking body");
    assert.match(gemini, /Pull up to our spot in \$\{loc\} right now/, "Includes restaurant visit CTA");

    // Verify all training rules docs contain Dual Persona Engine / Persona Adaptation rules
    const coreStructure = fs.readFileSync("training-rules/core/script-structure.md", "utf8");
    const brandingRules = fs.readFileSync("training-rules/branding-marketing/rules.md", "utf8");
    const brandingTraining = fs.readFileSync("training-rules/branding-marketing/training.md", "utf8");
    const startupRules = fs.readFileSync("training-rules/startups-founders/rules.md", "utf8");
    const facelessRules = fs.readFileSync("training-rules/faceless-content/rules.md", "utf8");
    const techRules = fs.readFileSync("training-rules/tech-news/rules.md", "utf8");

    assert.match(coreStructure, /Dual Creator & Business Persona Engine/, "Core structure must define Dual Persona Engine");
    assert.match(brandingRules, /Critical Persona Rule: Real Business Owner Direct Advertising VS Marketing Consultant/, "Branding rules must define real business owner rule");
    assert.match(brandingTraining, /Critical Persona Rule: Real Business Owners vs Marketing Consultants/, "Branding training must define real business owners rule");
    assert.match(startupRules, /Direct Product & Startup Customer Acquisition Rule/, "Startup rules must define direct product sales");
    assert.match(facelessRules, /Direct Commercial Offer Rule/, "Faceless rules must define direct commercial offer");
    assert.match(techRules, /Direct Tech Product & App Advertising Rule/, "Tech rules must define direct app advertising");
  });
});
