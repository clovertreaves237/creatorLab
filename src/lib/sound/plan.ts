/**
 * The composition plan Gemini returns for a background instrumental (see training-rules/core/sound.md §9).
 * Shared by the server (validation) and the browser renderer (Tone.js). No vocals, ever.
 */

export const DRUM_KITS = ["electronic", "808", "acoustic", "lofi", "afro"] as const;
export const BASS_PRESETS = ["sub", "808", "pluck", "warm"] as const;
export const PAD_PRESETS = ["warm", "glass", "strings", "dark", "air"] as const;
export const LEAD_PRESETS = ["pluck", "bell", "marimba", "keys", "kalimba", "none"] as const;
export const SCALES = ["major", "minor", "dorian", "mixolydian", "lydian", "phrygian"] as const;
export const LAYERS = ["drums", "bass", "pad", "lead", "fx"] as const;
export const NOTE_NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"] as const;

export type DrumKit = (typeof DRUM_KITS)[number];
export type Scale = (typeof SCALES)[number];
export type Layer = (typeof LAYERS)[number];

export interface SoundSection {
  name: string;
  start: number;
  end: number;
  layers: Layer[];
  energy: number;
}

export interface SoundReading {
  speaker: string;
  setting: string;
  audience: string;
  feeling: string;
  energy: "soft" | "medium" | "high";
}

export interface SoundPlan {
  reading?: SoundReading;
  title: string;
  recipeId: string;
  why: string;
  mood: string[];
  bpm: number;
  key: string;
  scale: Scale;
  duration: number;
  chords: string[];
  drums: { kit: DrumKit; kick: string; snare: string; hat: string; openHat: string; perc: string };
  bass: { preset: (typeof BASS_PRESETS)[number]; pattern: string };
  pad: { preset: (typeof PAD_PRESETS)[number] };
  lead: { preset: (typeof LEAD_PRESETS)[number]; melody: number[] };
  fx: { riserIntoLastSection: boolean; impactAtSectionStarts: boolean };
  sections: SoundSection[];
}

const oneOf = <T extends string>(list: readonly T[], v: unknown, fallback: T): T =>
  typeof v === "string" && (list as readonly string[]).includes(v) ? (v as T) : fallback;

const clamp = (n: unknown, lo: number, hi: number, fallback: number) => {
  const x = typeof n === "number" && Number.isFinite(n) ? n : Number(n);
  return Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : fallback;
};

/** 16-step pattern: keep only x and ., pad/trim to 16. */
export function cleanPattern(p: unknown, fallback = "................"): string {
  if (typeof p !== "string") return fallback;
  const s = p.toLowerCase().replace(/[^x.]/g, "").slice(0, 16);
  return s.length === 0 ? fallback : s.padEnd(16, ".");
}

const CHORD_RE = /^([A-G])(#|b)?(m|min|maj7|maj|m7|7|sus2|sus4|dim|add9|6|m6|9|m9)?$/;

export function normaliseKey(k: unknown): string {
  const raw = typeof k === "string" ? k.trim().replace(/\s.*$/, "") : "";
  const m = /^([A-Ga-g])(#|b)?/.exec(raw);
  if (!m) return "C";
  const name = m[1].toUpperCase() + (m[2] || "");
  const pc = notePitchClass(name);
  return NOTE_NAMES[pc ?? 0];
}

/** Pitch class 0..11 for names like C, F#, Bb. */
export function notePitchClass(name: string): number | null {
  const m = /^([A-G])(#|b)?$/.exec(name);
  if (!m) return null;
  const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1] as "C"]!;
  return (base + (m[2] === "#" ? 1 : m[2] === "b" ? 11 : 0)) % 12;
}

/** Chord name → MIDI notes (root in octave 3, voiced around C4). Unknown chords fall back to a major triad. */
export function chordToMidi(chord: string): { root: number; notes: number[] } {
  const m = CHORD_RE.exec(chord.trim());
  const rootPc = m ? notePitchClass(m[1] + (m[2] || "")) ?? 0 : 0;
  const q = m?.[3] || "";
  const intervals: Record<string, number[]> = {
    "": [0, 4, 7], maj: [0, 4, 7], m: [0, 3, 7], min: [0, 3, 7], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10],
    "7": [0, 4, 7, 10], sus2: [0, 2, 7], sus4: [0, 5, 7], dim: [0, 3, 6], add9: [0, 4, 7, 14], "6": [0, 4, 7, 9],
    m6: [0, 3, 7, 9], "9": [0, 4, 7, 10, 14], m9: [0, 3, 7, 10, 14],
  };
  const root = 48 + rootPc; // C3..B3
  const notes = (intervals[q] || intervals[""]).map((i) => {
    let n = 60 + rootPc + i;
    while (n > 71) n -= 12; // keep the pad between C4 and B4 for a soft, centred voicing
    return n;
  });
  return { root, notes: notes.sort((a, b) => a - b) };
}

const SCALE_STEPS: Record<Scale, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
};

/** Scale degree (1 = root, 8 = octave, up to 15) → MIDI note in the lead register (around C5). */
export function degreeToMidi(degree: number, key: string, scale: Scale): number {
  const steps = SCALE_STEPS[scale];
  const d = Math.max(1, Math.min(15, Math.round(degree))) - 1;
  const octave = Math.floor(d / 7);
  return 72 + (notePitchClass(key) ?? 0) + steps[d % 7] + 12 * octave - 12;
}

/**
 * Turns whatever Gemini returned into a safe, renderable plan. Never throws; fills gaps with sensible defaults.
 * `duration` is the length the user asked for and always wins.
 */
export function sanitizePlan(raw: any, duration: number, fallbackRecipe = ""): SoundPlan {
  const d = Math.round(clamp(duration, 10, 180, 60));
  const scale = oneOf(SCALES, raw?.scale, "minor");
  const chordsRaw: string[] = Array.isArray(raw?.chords) ? raw.chords.filter((c: unknown) => typeof c === "string") : [];
  let chords = chordsRaw.map((c) => c.trim()).filter((c) => CHORD_RE.test(c)).slice(0, 8);
  if (chords.length < 2) chords = scale === "major" || scale === "lydian" || scale === "mixolydian" ? ["C", "G", "Am", "F"] : ["Am", "F", "C", "G"];

  const melodyRaw: unknown[] = Array.isArray(raw?.lead?.melody) ? raw.lead.melody : [];
  let melody = melodyRaw.map((v) => Math.round(clamp(v, 0, 15, 0))).slice(0, 128);
  if (melody.length < 16) melody = melody.concat(Array(16 - melody.length).fill(0));
  melody = melody.slice(0, Math.floor(melody.length / 16) * 16);

  // Sections: sorted, clamped, contiguous, covering 0..d
  const secRaw: any[] = Array.isArray(raw?.sections) ? raw.sections : [];
  let sections: SoundSection[] = secRaw
    .map((s) => ({
      name: typeof s?.name === "string" ? s.name.slice(0, 40) : "Section",
      start: clamp(s?.start, 0, d, 0),
      end: clamp(s?.end, 0, d, d),
      layers: (Array.isArray(s?.layers) ? s.layers : []).filter((l: unknown) => (LAYERS as readonly unknown[]).includes(l)) as Layer[],
      energy: clamp(s?.energy, 0.2, 1, 0.6),
    }))
    .filter((s) => s.end > s.start)
    .sort((a, b) => a.start - b.start);
  if (sections.length === 0) {
    sections = [
      { name: "Intro", start: 0, end: Math.min(4, d), layers: ["pad", "drums"], energy: 0.5 },
      { name: "Main", start: Math.min(4, d), end: d, layers: ["drums", "bass", "pad"], energy: 0.6 },
    ].filter((s) => s.end > s.start) as SoundSection[];
  }
  sections[0].start = 0;
  for (let i = 1; i < sections.length; i++) sections[i].start = sections[i - 1].end;
  sections = sections.filter((s) => s.end > s.start);
  sections[sections.length - 1].end = d;
  for (const s of sections) if (s.layers.length === 0) s.layers = ["pad"];

  const r = raw?.reading;
  const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 120) : "");
  const reading: SoundReading | undefined =
    r && typeof r === "object"
      ? { speaker: str(r.speaker), setting: str(r.setting), audience: str(r.audience), feeling: str(r.feeling), energy: oneOf(["soft", "medium", "high"] as const, r.energy, "medium") }
      : undefined;

  return {
    reading,
    title: typeof raw?.title === "string" ? raw.title.slice(0, 80) : "Background sound",
    recipeId: typeof raw?.recipeId === "string" ? raw.recipeId.slice(0, 20) : fallbackRecipe,
    why: typeof raw?.why === "string" ? raw.why.slice(0, 400) : "",
    mood: Array.isArray(raw?.mood) ? raw.mood.filter((m: unknown) => typeof m === "string").slice(0, 4) : [],
    bpm: Math.round(clamp(raw?.bpm, 60, 175, 100)),
    key: normaliseKey(raw?.key),
    scale,
    duration: d,
    chords,
    drums: {
      kit: oneOf(DRUM_KITS, raw?.drums?.kit, "electronic"),
      kick: cleanPattern(raw?.drums?.kick, "x...x...x...x..."),
      snare: cleanPattern(raw?.drums?.snare, "....x.......x..."),
      hat: cleanPattern(raw?.drums?.hat, "..x...x...x...x."),
      openHat: cleanPattern(raw?.drums?.openHat),
      perc: cleanPattern(raw?.drums?.perc),
    },
    bass: { preset: oneOf(BASS_PRESETS, raw?.bass?.preset, "sub"), pattern: cleanPattern(raw?.bass?.pattern, "x.......x......." ) },
    pad: { preset: oneOf(PAD_PRESETS, raw?.pad?.preset, "warm") },
    lead: { preset: oneOf(LEAD_PRESETS, raw?.lead?.preset, "none"), melody },
    fx: {
      riserIntoLastSection: raw?.fx?.riserIntoLastSection !== false,
      impactAtSectionStarts: Boolean(raw?.fx?.impactAtSectionStarts),
    },
    sections,
  };
}
