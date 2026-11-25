import fs from "node:fs";
import path from "node:path";
import { isValidNiche } from "@/lib/constants/niches";
import { sanitizePlan, SoundPlan, DRUM_KITS, BASS_PRESETS, PAD_PRESETS, LEAD_PRESETS, SCALES, LAYERS } from "./plan";

/**
 * Sound composer (server only). Gemini receives:
 *   - training-rules/core/sound.md (how background sound works + strict rules + plan format)
 *   - the profile and genres of the ONE requested niche (training-rules/<niche>/sound.md)
 *   - the ~30 recipes of that niche that best match the script
 * Niche isolation is enforced here: no other niche's sound file is ever read for a request.
 */

const SOUND_MODELS = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest"];
const RECIPES_SENT = 30;
const REQUEST_TIMEOUT_MS = 30000;

interface NicheSoundDoc {
  profile: string; // everything before the recipe list
  recipes: string[];
}

const docCache = new Map<string, NicheSoundDoc>();
let coreCache: string | null = null;

function readCore(): string {
  if (coreCache && process.env.NODE_ENV === "production") return coreCache;
  const p = path.join(process.cwd(), "training-rules", "core", "sound.md");
  coreCache = fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "";
  return coreCache;
}

function readNicheSound(nicheId: string): NicheSoundDoc | null {
  if (!isValidNiche(nicheId)) return null; // whitelist: the id is one of our niche folders, never a free path
  const cached = docCache.get(nicheId);
  if (cached && process.env.NODE_ENV === "production") return cached;
  const p = path.join(process.cwd(), "training-rules", nicheId, "sound.md");
  if (!fs.existsSync(p)) return null;
  const text = fs.readFileSync(p, "utf-8").replace(/\r\n/g, "\n");
  const idx = text.indexOf("\n## 4. Recipes");
  const profile = (idx >= 0 ? text.slice(0, idx) : text).replace(/<!--[\s\S]*?-->/g, "").trim();
  const recipes = text.split("\n").filter((l) => /^[A-Z]{2}-\d{4} \|/.test(l));
  const doc = { profile, recipes };
  docCache.set(nicheId, doc);
  return doc;
}

const STOP = new Set("the a an and or to of in on for with is are be this that it you your we our they their at as by from how what why when".split(" "));
const words = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

export type Energy = "soft" | "medium" | "high";

const SOFT_CUES = /\b(market|stall|boutique|tailor|dress(es)?|fabric|ankara|lace|handmade|home business|small business|my shop|local|bakery|baker|food|salon|hair|braid|skin ?care|beauty|baby|family|mother|mum|mama|faith|church|pray|health|care|grief|calm|gentle|soft|cosy|cozy|relax|peace|quiet|slow)\b/i;
const HIGH_CUES = /\b(hype|giveaway|countdown|gym|workout|crazy|insane|explod|game ?changer|changes everything|biggest|massive|party|club|sale ends|last chance|launch(ing)? today|energetic|loud|hard|fast)\b/i;

/** First read of the script (or of the user's wish): how much energy should the sound have? */
export function detectEnergy(text: string): Energy {
  const soft = (text.match(new RegExp(SOFT_CUES.source, "gi")) || []).length;
  const high = (text.match(new RegExp(HIGH_CUES.source, "gi")) || []).length;
  if (soft > high) return "soft";
  if (high > soft) return "high";
  return "medium";
}

/** Mood hints from the script's wording, so recipe moods can match even when words differ. */
const MOOD_HINTS: Array<[RegExp, string[]]> = [
  [SOFT_CUES, ["warm", "friendly", "calm", "cosy", "smooth", "honest", "authentic", "gentle"]],
  [/mistake|fail|wrong|stop|problem|struggl|lost|broke|pain/i, ["serious", "tense", "reflective", "determined", "focused"]],
  [/launch|new|announce|finally|introduc|release|reveal/i, ["bold", "confident", "futuristic", "energetic", "exciting"]],
  [/story|journey|started|years ago|when i|my first/i, ["emotional", "reflective", "hopeful", "inspiring", "honest"]],
  [/tip|how to|step|tutorial|guide|learn/i, ["focused", "friendly", "calm", "clean", "relatable"]],
  [/sale|offer|discount|order|buy|shop|price|deal/i, ["confident", "upbeat", "celebratory", "friendly", "premium"]],
  [/secret|mystery|nobody|hidden|truth|dark/i, ["mysterious", "suspenseful", "curious"]],
  [/ai\b|tech|future|chip|app|robot|software|phone/i, ["futuristic", "precise", "curious", "modern"]],
  [/luxury|premium|exclusive|quality/i, ["premium", "luxurious", "smooth"]],
  [/fun|funny|crazy|wild|lol/i, ["playful", "energetic", "upbeat"]],
];

export function selectRecipes(recipes: string[], script: string, count = RECIPES_SENT, variation = 0, energy: Energy = detectEnergy(script)): string[] {
  const scriptWords = new Set(words(script));
  const moods = new Set<string>();
  for (const [re, m] of MOOD_HINTS) if (re.test(script)) m.forEach((x) => moods.add(x));

  const scored = recipes.map((line, i) => {
    const parts = line.split("|").map((p) => p.trim());
    const mood = parts.find((p) => p.startsWith("mood:")) || "";
    const best = parts.find((p) => p.startsWith("best for:")) || "";
    let score = 0;
    const bpm = Number(/(\d+) BPM/.exec(line)?.[1] || 100);
    const loud = /bold|energetic|edgy|intense|urgent|exciting|euphoric|gritty|dark/.test(mood) || /kit: 808/.test(line);
    const gentle = /warm|calm|cosy|smooth|friendly|gentle|honest|authentic|relaxed|hopeful/.test(mood);
    if (energy === "soft") score += (gentle ? 3 : 0) - (loud ? 5 : 0) - (bpm > 112 ? 4 : 0);
    if (energy === "high") score += (loud ? 3 : 0) + (bpm >= 110 ? 2 : 0) - (bpm < 90 ? 2 : 0);
    for (const w of words(best)) if (scriptWords.has(w)) score += 3;
    for (const w of words(mood)) {
      if (moods.has(w)) score += 2;
      if (scriptWords.has(w)) score += 1;
    }
    // Deterministic tie-break that changes with "make another" so users get different options
    const jitter = ((i * 2654435761 + variation * 40503) >>> 0) % 1000 / 1000;
    return { line, score: score + jitter };
  });
  scored.sort((a, b) => b.score - a.score);

  // Keep variety: at most 4 recipes of the same genre
  const perGenre = new Map<string, number>();
  const out: string[] = [];
  for (const { line } of scored) {
    const genre = line.split("|")[1]?.trim() || "";
    const n = perGenre.get(genre) || 0;
    if (n >= 4) continue;
    perGenre.set(genre, n + 1);
    out.push(line);
    if (out.length >= count) break;
  }
  return out;
}

/** JSON schema Gemini must follow (structured output). */
const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    reading: {
      type: "OBJECT",
      properties: {
        speaker: { type: "STRING" },
        setting: { type: "STRING" },
        audience: { type: "STRING" },
        feeling: { type: "STRING" },
        energy: { type: "STRING", enum: ["soft", "medium", "high"] },
      },
      required: ["speaker", "setting", "feeling", "energy"],
    },
    title: { type: "STRING" },
    recipeId: { type: "STRING" },
    why: { type: "STRING" },
    mood: { type: "ARRAY", items: { type: "STRING" } },
    bpm: { type: "INTEGER" },
    key: { type: "STRING" },
    scale: { type: "STRING", enum: [...SCALES] },
    chords: { type: "ARRAY", items: { type: "STRING" } },
    drums: {
      type: "OBJECT",
      properties: {
        kit: { type: "STRING", enum: [...DRUM_KITS] },
        kick: { type: "STRING" },
        snare: { type: "STRING" },
        hat: { type: "STRING" },
        openHat: { type: "STRING" },
        perc: { type: "STRING" },
      },
      required: ["kit", "kick", "snare", "hat"],
    },
    bass: {
      type: "OBJECT",
      properties: { preset: { type: "STRING", enum: [...BASS_PRESETS] }, pattern: { type: "STRING" } },
      required: ["preset", "pattern"],
    },
    pad: { type: "OBJECT", properties: { preset: { type: "STRING", enum: [...PAD_PRESETS] } }, required: ["preset"] },
    lead: {
      type: "OBJECT",
      properties: { preset: { type: "STRING", enum: [...LEAD_PRESETS] }, melody: { type: "ARRAY", items: { type: "INTEGER" } } },
      required: ["preset", "melody"],
    },
    fx: {
      type: "OBJECT",
      properties: { riserIntoLastSection: { type: "BOOLEAN" }, impactAtSectionStarts: { type: "BOOLEAN" } },
    },
    sections: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          start: { type: "NUMBER" },
          end: { type: "NUMBER" },
          layers: { type: "ARRAY", items: { type: "STRING", enum: [...LAYERS] } },
          energy: { type: "NUMBER" },
        },
        required: ["name", "start", "end", "layers", "energy"],
      },
    },
  },
  propertyOrdering: ["reading", "title", "recipeId", "why", "mood", "bpm", "key", "scale", "chords", "drums", "bass", "pad", "lead", "fx", "sections"],
  required: ["reading", "title", "recipeId", "why", "bpm", "key", "scale", "chords", "drums", "bass", "pad", "lead", "sections"],
};

export class SoundComposeError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
  }
}

export async function composeSoundPlan(args: {
  nicheId: string;
  nicheName: string;
  script: string;
  duration: number;
  variation?: number;
  avoidRecipeId?: string;
  /** The user's own description of the sound they want (wins over the recipes). */
  preference?: string;
}): Promise<{ plan: SoundPlan; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new SoundComposeError("Sound generation is not set up yet (no Gemini key on the server).", 503);

  const niche = readNicheSound(args.nicheId);
  if (!niche) throw new SoundComposeError("There are no sound rules for this niche yet.", 400);
  const core = readCore();

  const preference = (args.preference || "").trim().slice(0, 400);
  // The user's wish decides the energy when they gave one; otherwise the script does.
  const prefEnergy = preference ? detectEnergy(preference) : null;
  const energy: Energy = prefEnergy && prefEnergy !== "medium" ? prefEnergy : detectEnergy(args.script);
  let recipes = selectRecipes(niche.recipes, `${preference} ${preference} ${args.script}`, RECIPES_SENT, args.variation || 0, energy);
  if (args.avoidRecipeId) recipes = recipes.filter((r) => !r.startsWith(args.avoidRecipeId + " "));

  const systemInstruction = [
    "You are CreatorLab's sound composer. You design ORIGINAL instrumental background tracks (no vocals) that sit under a creator's voice in a short video.",
    "Follow the core sound rules and the niche sound file exactly. Output only the JSON plan.",
    "",
    "=== CORE SOUND RULES ===",
    core,
    "",
    `=== NICHE SOUND FILE: ${args.nicheName} (the ONLY niche you may use) ===`,
    niche.profile,
  ].join("\n");

  const userMessage = [
    `Niche: ${args.nicheName} (${args.nicheId})`,
    ...(preference
      ? ["", "THE USER DESCRIBED THE SOUND THEY WANT. Follow this first, above the recipes and your own reading (still instrumental, still original):", `"${preference.replace(/"/g, "'")}"`]
      : []),
    "",
    "STEP 1, before anything else: read the script like a sensitive producer. Who is speaking (for example a market trader, a founder, a teacher)? What do they sell or teach, where, and to whom? How should the viewer feel? Fill in `reading` honestly.",
    "STEP 2: let that reading set the energy. Small traders, local shops, calm tips, care and family topics are SOFT (85 to 105 BPM, light percussion, warm pads, no 808s, no hype, low energy). Only real hype content is high energy. When unsure, go softer.",
    `First read by CreatorLab: this looks ${energy === "soft" ? "SOFT" : energy === "high" ? "HIGH energy" : "MEDIUM energy"} (check it yourself).`,
    `Track length: exactly ${args.duration} seconds. Sections must cover 0 to ${args.duration} with no gaps.`,
    "",
    `Recipes from this niche that best match the script (choose one, or blend two; put its ID in recipeId):`,
    recipes.join("\n"),
    "",
    "The script the creator will read over the track:",
    '"""',
    args.script.slice(0, 6000),
    '"""',
    "",
    "Compose the plan now. Requirements: patterns are exactly 16 characters of x and .; 4 or 8 chords in the chosen key and scale;",
    "melody uses scale degrees (0 = rest), sparse under speech; one section per script part using the script's timing marks;",
    "`why` = one or two plain sentences telling the creator why this sound suits their script.",
  ].join("\n");

  let lastError = "";
  for (const model of SOUND_MODELS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
            maxOutputTokens: 4096,
          },
        }),
      });
      if (!res.ok) {
        lastError = `${model}: HTTP ${res.status}`;
        if (res.status === 429) throw new SoundComposeError("Gemini is busy right now (rate limit). Try again in a minute.", 429);
        continue;
      }
      const json = await res.json();
      const text: string = json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text || "").join("") || "";
      let raw: unknown;
      try {
        raw = JSON.parse(text);
      } catch {
        lastError = `${model}: answer was not valid JSON`;
        continue;
      }
      const fallbackRecipe = recipes[0]?.split(" ")[0] || "";
      const plan = sanitizePlan(raw, args.duration, fallbackRecipe);
      // Safety net: a soft script stays soft even if the model drifted (unless the user asked for energy)
      const isSoft = plan.reading ? plan.reading.energy === "soft" : energy === "soft";
      if (isSoft && prefEnergy !== "high") {
        for (const s of plan.sections) s.energy = Math.min(s.energy, 0.6);
        plan.fx.impactAtSectionStarts = false;
        if (plan.drums.kit === "808") plan.drums.kit = "afro";
        if (plan.bass.preset === "808") plan.bass.preset = "warm";
        plan.bpm = Math.min(plan.bpm, 110);
      }
      return { plan, model };
    } catch (e: any) {
      if (e instanceof SoundComposeError) throw e;
      lastError = `${model}: ${e?.name === "AbortError" ? "timed out" : e?.message || String(e)}`;
    } finally {
      clearTimeout(timer);
    }
  }
  console.error("[sound] compose failed:", lastError);
  throw new SoundComposeError("The sound could not be composed right now. Please try again.");
}
