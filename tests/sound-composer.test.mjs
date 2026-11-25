import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";

const NICHES = { "branding-marketing": "BM", "startups-founders": "SF", "faceless-content": "FC", "tech-news": "TN", "content-creation": "CC" };

test("Background sound (FR-100 to FR-104)", async (t) => {
  await t.test("1. Core sound rules exist with strict niche isolation, instrumental-only and voice-first rules", () => {
    const core = fs.readFileSync("training-rules/core/sound.md", "utf8");
    assert.match(core, /Niche isolation/);
    assert.match(core, /Instrumental only/);
    assert.match(core, /The voice comes first/);
    assert.match(core, /Never reproduce or imitate a specific copyrighted song/);
  });

  await t.test("2. Every niche has its own sound file with at least 1,000 unique recipes, all from that niche", () => {
    for (const [niche, code] of Object.entries(NICHES)) {
      const text = fs.readFileSync(`training-rules/${niche}/sound.md`, "utf8");
      assert.match(text, /NICHE LOCK/, `${niche} must carry the niche lock`);
      const recipes = text.split(/\r?\n/).filter((l) => /^[A-Z]{2}-\d{4} \|/.test(l));
      assert.ok(recipes.length >= 1000, `${niche} has ${recipes.length} recipes`);
      assert.ok(recipes.every((l) => l.startsWith(code + "-")), `${niche} recipes must all use the ${code}- prefix`);
      const bodies = new Set(recipes.map((l) => l.split("|").slice(1).join("|")));
      assert.strictEqual(bodies.size, recipes.length, `${niche} recipes must be unique`);
    }
  });

  await t.test("3. The composer only reads the requested niche's sound file (whitelisted id)", () => {
    const src = fs.readFileSync("src/lib/sound/compose.ts", "utf8");
    assert.match(src, /if \(!isValidNiche\(nicheId\)\) return null/);
    assert.match(src, /path\.join\(process\.cwd\(\), "training-rules", nicheId, "sound\.md"\)/);
    assert.match(src, /the ONLY niche you may use/);
    assert.match(src, /responseMimeType: "application\/json"/);
  });

  await t.test("4. Sound files never reach the script writer", () => {
    const rules = fs.readFileSync("src/lib/training/rules.ts", "utf8");
    assert.match(rules, /\/\^sound\\\.md\$\/i\.test\(name\)/);
  });

  await t.test("5. Sound is only made on request, for signed-in users and live niches", () => {
    const route = fs.readFileSync("src/app/api/sound/compose/route.ts", "utf8");
    assert.match(route, /requireRole\("user"\)/);
    assert.match(route, /isLiveNiche\(nicheId\)/);
    const offer = fs.readFileSync("src/components/sound/SoundOffer.tsx", "utf8");
    assert.match(offer, /Yes, make a sound/);
    assert.match(offer, /No thanks/);
    assert.match(offer, /Download WAV/);
    const page = fs.readFileSync("src/app/(main)/script-generator/page.tsx", "utf8");
    assert.match(page, /<SoundOffer/);
  });

  await t.test("6. Audio is rendered in the browser with Tone.js (no sound bank, nothing stored)", () => {
    const render = fs.readFileSync("src/lib/sound/render.ts", "utf8");
    assert.match(render, /await import\("tone"\)/);
    assert.match(render, /export function audioBufferToWav/);
    assert.doesNotMatch(render, /fetch\(/, "renderer must not download samples");
  });

  await t.test("7. The composer reads the script first and keeps soft scripts soft", () => {
    const core = fs.readFileSync("training-rules/core/sound.md", "utf8");
    assert.match(core, /Read the script first/);
    assert.match(core, /When unsure, go softer/);
    const src = fs.readFileSync("src/lib/sound/compose.ts", "utf8");
    assert.match(src, /export function detectEnergy/);
    assert.match(src, /propertyOrdering: \["reading"/);
    assert.match(src, /a soft script stays soft/);
  });

  await t.test("8. Users can describe the sound they want, and it takes priority", () => {
    const offer = fs.readFileSync("src/components/sound/SoundOffer.tsx", "utf8");
    assert.match(offer, /Or describe the sound you want/);
    assert.match(offer, /Make this sound/);
    assert.match(offer, /preference: preference \|\| undefined/);
    const src = fs.readFileSync("src/lib/sound/compose.ts", "utf8");
    assert.match(src, /THE USER DESCRIBED THE SOUND THEY WANT/);
  });
});
