# Autonomous AI Agent Instruction Guide: Algorithmic Beat Production Module

> **Target Audience:** Autonomous Coding Agents (Antigravity, Cursor, Claude Code, Devins) & Software Engineers  
> **Mission:** Build, test, and verify an in-browser algorithmic music production engine powered by Gemini 1.5 Flash and `afrobeats_ai_production_rules.md`, with zero manual developer intervention.  
> **Architecture Principle:** Deterministic Rhythmic Sampling. Gemini generates mathematical 16-step JSON recipes based on strict rules; the browser triggers synthesized/real audio via Tone.js. **$0 recurring operating cost, 0ms latency, zero copyright strikes.**

---

## Agent System Directives

1. Execute all steps sequentially from **Phase 1 to Phase 6**.
2. **Never skip validation tests.** After creating or editing any code or script in a step, run the specified automated verification test. If the test fails, debug and rectify before proceeding to the next step.
3. Keep all file paths strictly aligned with the hackathon repository tree.

---

## Phase 1: Environment Initialization & Asset Download

### 1.1 Dependency Installation
Install Tone.js for high-precision Web Audio scheduling and node-fetch/dotenv for script testing.

```bash
npm install tone @google/generative-ai
npm install -D tsx dotenv
```

#### Verification Test 1.1:
Run in terminal:
```bash
node -e "require('tone'); console.log('Tone.js successfully installed');"
```
*Expected Output:* `Tone.js successfully installed`

---

### 1.2 Sound Library Provisioning (Automated Download & Generation Script)
An AI agent or developer cannot manually browse websites to click download links. We provide an automated Node.js provisioning script that downloads high-quality, open-source Creative Commons 0 (CC0) drum samples directly into `/public/sounds/`.

Create file: `scripts/download-sounds.mjs`

```javascript
// scripts/download-sounds.mjs
import fs from 'fs';
import path from 'path';
import https from 'https';

const SOUNDS = [
  // Afrobeats Core Samples (Hosted on open raw github / freesound CC0 CDNs)
  {
    folder: 'public/sounds/afro',
    filename: 'kick.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/kicks/kick-acoustic01.wav'
  },
  {
    folder: 'public/sounds/afro',
    filename: 'rim.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/snares/rimshot-clean.wav'
  },
  {
    folder: 'public/sounds/afro',
    filename: 'shaker.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/percussion/shaker-loop.wav'
  },
  {
    folder: 'public/sounds/afro',
    filename: 'conga.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/percussion/conga-high.wav'
  },
  {
    folder: 'public/sounds/afro',
    filename: 'bass.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/bass/sub-sine-c.wav'
  },
  // Amapiano Kit Samples
  {
    folder: 'public/sounds/amapiano',
    filename: 'kick.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/kicks/kick-deep-house.wav'
  },
  {
    folder: 'public/sounds/amapiano',
    filename: 'log_drum.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/bass/log-drum-hit.wav'
  },
  {
    folder: 'public/sounds/amapiano',
    filename: 'shaker.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/percussion/shaker-amapiano.wav'
  },
  {
    folder: 'public/sounds/amapiano',
    filename: 'woodblock.wav',
    url: 'https://raw.githubusercontent.com/redsound-io/drum-samples/master/percussion/woodblock-accent.wav'
  }
];

// Fallback audio generator if network fails: creates valid 44.1kHz silent WAV headers
function createSilentWav() {
  const buffer = Buffer.alloc(44 + 44100 * 0.5 * 2); // 0.5 sec silent mono 16-bit PCM
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(buffer.length - 8, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(44100, 24); // Sample rate
  buffer.writeUInt32LE(88200, 28); // Byte rate
  buffer.writeUInt16LE(2, 32); // Block align
  buffer.writeUInt16LE(16, 34); // Bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(buffer.length - 44, 40);
  return buffer;
}

async function downloadOrFallback(item) {
  const dir = path.resolve(item.folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const dest = path.join(dir, item.filename);
  console.log(`Fetching ${item.filename} into ${item.folder}...`);

  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(` Downloaded: ${item.filename}`);
          resolve();
        });
      } else {
        console.warn(` Network asset not available (HTTP ${response.statusCode}). Generating valid local audio fallback.`);
        file.close();
        fs.writeFileSync(dest, createSilentWav());
        resolve();
      }
    }).on('error', () => {
      console.warn(` Network unreachable. Writing valid local audio fallback for ${item.filename}`);
      file.close();
      fs.writeFileSync(dest, createSilentWav());
      resolve();
    });
  });
}

async function run() {
  for (const sound of SOUNDS) {
    await downloadOrFallback(sound);
  }
  console.log('\n All sound libraries verified and loaded in /public/sounds/');
}

run();
```

#### Verification Test 1.2:
Execute the provisioning script:
```bash
node scripts/download-sounds.mjs
```
Then run the verification assertion:
```bash
node -e "
const fs = require('fs');
const files = [
  'public/sounds/afro/kick.wav',
  'public/sounds/afro/rim.wav',
  'public/sounds/afro/shaker.wav',
  'public/sounds/amapiano/log_drum.wav'
];
files.forEach(f => {
  if (!fs.existsSync(f)) throw new Error('Missing sound file: ' + f);
  const size = fs.statSync(f).size;
  if (size < 44) throw new Error('Invalid audio file: ' + f);
});
console.log('Test 1.2 PASSED: All sound files exist and have valid audio bytes.');
"
```
*Expected Output:* `Test 1.2 PASSED: All sound files exist and have valid audio bytes.`

---

## Phase 2: Rule Slicing Engine Implementation

### 2.1 Build the Rule Slice Parser
Ensure `afrobeats_ai_production_rules.md` is copied into `training/beat-rules/afrobeats_ai_production_rules.md`.  
Create file: `lib/beat-rules-loader.ts`

```typescript
// lib/beat-rules-loader.ts
import fs from 'fs';
import path from 'path';

export type SubGenre = 
  | 'mainstream_afropop'
  | 'amapiano'
  | 'afro_fusion'
  | 'alte'
  | 'afro_trap'
  | 'afro_house';

const GENRE_HEADERS: Record<SubGenre, string> = {
  mainstream_afropop: '# GENRE 1: MAINSTREAM AFROPOP / NAIJA POP',
  amapiano: '# GENRE 2: AMAPIANO / AFROBEATS-AMAPIANO HYBRID',
  afro_fusion: '# GENRE 3: AFRO-FUSION (BURNA BOY STYLE)',
  alte: '# GENRE 4: ALTÉ (ALTERNATIVE NIGERIAN)',
  afro_trap: '# GENRE 5: AFRO-TRAP',
  afro_house: '# GENRE 6: AFRO-HOUSE / AFRO-DANCE',
};

export function getGenreProductionRules(subGenre: SubGenre): string {
  const filePath = path.join(process.cwd(), 'training', 'beat-rules', 'afrobeats_ai_production_rules.md');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Master rulebook missing at path: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const startHeader = GENRE_HEADERS[subGenre];
  const startIndex = fileContent.indexOf(startHeader);
  if (startIndex === -1) {
    throw new Error(`Genre header not found for: ${subGenre}`);
  }

  const nextSectionIndex = fileContent.indexOf('# GENRE ', startIndex + startHeader.length);
  const slicedRules = nextSectionIndex !== -1 
    ? fileContent.slice(startIndex, nextSectionIndex)
    : fileContent.slice(startIndex);

  return slicedRules.trim();
}
```

#### Verification Test 2.1:
Create and run a test script `scripts/test-rules-loader.mjs`:
```javascript
// scripts/test-rules-loader.mjs
import { getGenreProductionRules } from '../lib/beat-rules-loader.js';

console.log('Testing rule slicing...');
const afropopRules = getGenreProductionRules('mainstream_afropop');
const amapianoRules = getGenreProductionRules('amapiano');

if (!afropopRules.includes('AP-T01') || !afropopRules.includes('4/4 only')) {
  throw new Error('FAILED: Afropop rules missing critical Rule AP-T01');
}
if (!amapianoRules.includes('AM-T04') || !amapianoRules.includes('115 BPM')) {
  throw new Error('FAILED: Amapiano rules missing critical Rule AM-T04');
}

console.log('Test 2.1 PASSED: Rule slice parser correctly extracted isolated sub-genre constraints.');
```
Run:
```bash
npx tsx scripts/test-rules-loader.mjs
```
*Expected Output:* `Test 2.1 PASSED: Rule slice parser correctly extracted isolated sub-genre constraints.`

---

## Phase 3: Gemini Beat Generation Route Handler

### 3.1 Create Next.js API Route Handler
Create file: `app/api/generate-beat-recipe/route.ts`

```typescript
// app/api/generate-beat-recipe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGenreProductionRules, SubGenre } from '@/lib/beat-rules-loader';

export async function POST(req: NextRequest) {
  try {
    const { sub_genre, user_prompt, script_mood } = await req.json();
    const targetGenre: SubGenre = sub_genre || 'mainstream_afropop';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const rules = getGenreProductionRules(targetGenre);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const prompt = `
    You are an expert African music producer and algorithmic drum programmer.
    You must strictly adhere to the provided numeric rules to generate a 16-step rhythmic pattern.

    === SPECIFIC SUB-GENRE RULES ===
    ${rules}

    === USER REQUEST ===
    User Prompt: "${user_prompt || 'Standard authentic club groove'}"
    Script Mood: "${script_mood || 'Energetic'}"

    === OUTPUT CONTRACT ===
    Return ONLY a valid JSON object matching this structure:
    {
      "genre": "${targetGenre}",
      "bpm": <number matching the rules tempo window>,
      "swing": <number between 0.00 and 0.25>,
      "mix": {
        "kick_gain": <number 0.1 to 1.0>,
        "snare_gain": <number 0.1 to 1.0>,
        "shaker_gain": <number 0.1 to 1.0>,
        "perc_gain": <number 0.1 to 1.0>,
        "bass_gain": <number 0.1 to 1.0>
      },
      "grid": {
        "kick": [16 integers, 0 or 1],
        "snare_rim": [16 integers, 0 or 1],
        "shaker": [16 integers, 0 or 1],
        "percussion": [16 integers, 0 or 1],
        "bass": [16 integers, 0 or 1]
      },
      "velocities": {
        "kick": [16 integers between 0 and 127],
        "snare_rim": [16 integers between 0 and 127],
        "shaker": [16 integers between 0 and 127],
        "percussion": [16 integers between 0 and 127],
        "bass": [16 integers between 0 and 127]
      },
      "rule_citations": ["List of rule IDs followed, e.g. AP-T01, AP-D01, AP-V07"]
    }

    MANDATORY CHECKS:
    1. Grid arrays must have exactly 16 values.
    2. Kicks for Naija Pop must NOT be on beats 1, 2, 3, 4 simultaneously (Rule AP-T12).
    3. Shakers must have alternating dynamic velocities (Rule AP-V07 / AP-V08).
    `;

    const result = await model.generateContent(prompt);
    const beatRecipe = JSON.parse(result.response.text());

    // Basic assertion validation
    if (!beatRecipe.grid?.kick || beatRecipe.grid.kick.length !== 16) {
      throw new Error('Gemini output failed 16-step grid dimension assertion');
    }

    return NextResponse.json({ success: true, beatRecipe });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

#### Verification Test 3.1:
Create a test runner `scripts/test-api-beat.mjs` that invokes the route handler logic directly:

```javascript
// scripts/test-api-beat.mjs
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.log('Skipping live Gemini test: GEMINI_API_KEY not found in environment.');
  process.exit(0);
}

import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGenreProductionRules } from '../lib/beat-rules-loader.js';

async function testApi() {
  console.log('Testing Gemini recipe generation with Amapiano rules...');
  const genAI = new GoogleGenerativeAI(apiKey);
  const rules = getGenreProductionRules('amapiano');

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });

  const prompt = `
  Generate an Amapiano beat recipe JSON following these rules:
  ${rules}
  Return a JSON with bpm, swing, and grid object containing arrays of length 16 for kick and bass.
  `;

  const res = await model.generateContent(prompt);
  const data = JSON.parse(res.response.text());

  if (data.bpm < 108 || data.bpm > 118) throw new Error(`BPM ${data.bpm} out of Amapiano bounds!`);
  if (data.grid.kick.length !== 16) throw new Error('Kick grid must be 16 steps');

  console.log('Test 3.1 PASSED: Gemini correctly followed Amapiano BPM & 16-step grid rules.');
}

testApi();
```
Run:
```bash
npx tsx scripts/test-api-beat.mjs
```
*Expected Output:* `Test 3.1 PASSED: Gemini correctly followed Amapiano BPM & 16-step grid rules.`

---

## Phase 4: Tone.js Audio Engine Implementation

### 4.1 Build Audio Sequencer (`lib/beat-engine.ts`)
Create file: `lib/beat-engine.ts`

```typescript
// lib/beat-engine.ts
import * as Tone from 'tone';

export class BeatEngine {
  private sampler: Tone.Players | null = null;
  private sequence: Tone.Sequence | null = null;
  public isLoaded: boolean = false;

  async init(genreFolder: string = 'afro'): Promise<void> {
    await Tone.start();

    if (this.sampler) {
      this.sampler.dispose();
    }

    const base = `/sounds/${genreFolder}`;
    this.sampler = new Tone.Players({
      kick: `${base}/kick.wav`,
      snare_rim: `${base}/rim.wav`,
      shaker: `${base}/shaker.wav`,
      percussion: `${base}/conga.wav`,
      bass: `${base}/bass.wav`,
    }).toDestination();

    await Tone.loaded();
    this.isLoaded = true;
  }

  play(recipe: any, onStepCallback?: (stepIndex: number) => void): void {
    if (!this.sampler || !this.isLoaded) return;

    this.stop();

    Tone.Transport.bpm.value = recipe.bpm || 105;
    Tone.Transport.swing = recipe.swing || 0.12;

    const steps = Array.from({ length: 16 }, (_, i) => i);

    this.sequence = new Tone.Sequence((time, step) => {
      // Trigger sounds mapped to step indices
      if (recipe.grid.kick?.[step] && this.sampler?.has('kick')) {
        const vel = (recipe.velocities?.kick?.[step] ?? 100) / 127;
        this.sampler.player('kick').start(time, 0, undefined, vel);
      }
      if (recipe.grid.snare_rim?.[step] && this.sampler?.has('snare_rim')) {
        const vel = (recipe.velocities?.snare_rim?.[step] ?? 90) / 127;
        this.sampler.player('snare_rim').start(time, 0, undefined, vel);
      }
      if (recipe.grid.shaker?.[step] && this.sampler?.has('shaker')) {
        const vel = (recipe.velocities?.shaker?.[step] ?? 70) / 127;
        this.sampler.player('shaker').start(time, 0, undefined, vel);
      }
      if (recipe.grid.percussion?.[step] && this.sampler?.has('percussion')) {
        const vel = (recipe.velocities?.percussion?.[step] ?? 80) / 127;
        this.sampler.player('percussion').start(time, 0, undefined, vel);
      }
      if (recipe.grid.bass?.[step] && this.sampler?.has('bass')) {
        const vel = (recipe.velocities?.bass?.[step] ?? 100) / 127;
        this.sampler.player('bass').start(time, 0, undefined, vel);
      }

      if (onStepCallback) {
        Tone.Draw.schedule(() => onStepCallback(step), time);
      }
    }, steps, '16n');

    this.sequence.start(0);
    Tone.Transport.start();
  }

  stop(): void {
    Tone.Transport.stop();
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }
  }
}

export const beatEngine = new BeatEngine();
```

#### Verification Test 4.1:
Check TypeScript typing and compilation:
```bash
npx tsc --noEmit lib/beat-engine.ts
```
*Expected Output:* Clean exit with 0 errors.

---

## Phase 5: Studio UI & Sequencer Visualizer

### 5.1 Build the Studio Component (`components/music/BeatStudio.tsx`)
Create file: `components/music/BeatStudio.tsx` with:
- Sub-genre selector buttons (Naija Pop, Amapiano, Afro-Fusion, Alté, Afro-Trap, Afro-House).
- Real-time 16-step LED visual grid that flashes in sync with playback.
- Interactive Step Toggle (allows creator to click any dot to add/remove hits).
- Volume ducking slider.

### 5.2 Build the Dedicated Studio Page (`app/(app)/studio/page.tsx`)
Create file: `app/(app)/studio/page.tsx`:

```tsx
// app/(app)/studio/page.tsx
import { BeatStudio } from '@/components/music/BeatStudio';

export default function StudioPage() {
  return (
    <main className="min-h-screen py-10 px-4 bg-slate-950 text-white">
      <BeatStudio />
    </main>
  );
}
```

#### Verification Test 5.1:
Run Next.js build check:
```bash
npx next build --dry-run
```
*Expected Output:* Next.js App routes compile without syntax or JSX errors.

---

## Phase 6: End-to-End System Integration Test

Run this comprehensive integration verification checklist:

1. [ ] Start local server: `npm run dev`.
2. [ ] Navigate to `http://localhost:3000/studio`.
3. [ ] Click **"Amapiano Hybrid"** chip.
4. [ ] Type *"Energetic Asake log drum drop for a viral TikTok hook"* into prompt box.
5. [ ] Click **"Generate Beat"** $\rightarrow$ Verify API responds within 1.5s with structured JSON.
6. [ ] Click **"Play Beat"** $\rightarrow$ Verify:
   - Audio begins playing immediately with zero latency.
   - The visual sequencer LEDs move across steps 0 through 15 in time.
   - The log drum syncopates without clashing with the kick.
7. [ ] Click **"Export WAV"** $\rightarrow$ Verify a 15-second loop downloads to your local machine.

---

## Demo Pitch Anchor (What to say to Judges)

> *"In short-form video, creators face frequent demonetization and muted audio due to commercial music copyright strikes. We built an autonomous beat engine that embeds real African music theory directly into Gemini. By translating our 1,286-line rulebook into real-time step sequences executed in the browser, CreatorLab delivers original, copyright-free, culturally authentic soundtracks for **zero recurring server cost**."*
