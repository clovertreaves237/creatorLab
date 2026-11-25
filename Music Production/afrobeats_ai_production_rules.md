# AFROBEATS AI PRODUCTION RULESET
## Comprehensive Numeric Training Rules for Authentic Beat Generation
### Covers 6 Sub-Genres · 100+ Rules Per Genre · Designed for AI Model Training

> **Purpose:** Feed these rules as structured system-prompt constraints to AI music models (Gemini, MusicLM, Suno, etc.) to generate authentic, non-generic Afrobeats productions. Every value is derived from real production practice, not stylistic description.

---

## HOW TO USE THIS FILE

Each genre section is self-contained. Rules are organized into these categories:

1. **Tempo & Time Signature**
2. **Swing & Humanization**
3. **Drum Pattern (16-Step Grid)**
4. **Velocity Rules**
5. **Harmonic Rules**
6. **Bass & Low-End Rules**
7. **Arrangement Structure**
8. **Vocal Chain & Processing**
9. **Stereo & Spatial Rules**
10. **Instrumentation & Timbre**

Feed rules as numbered constraints. Use the **Rule ID** as a parameter key. Mark values as HARD (non-negotiable) or SOFT (range with preference).

---

---

# GENRE 1: MAINSTREAM AFROPOP / NAIJA POP
### Reference Artists: Wizkid, Davido, Rema, Ayra Starr, Oxlade

---

## 1. TEMPO & TIME SIGNATURE

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AP-T01 | Time signature | 4/4 only | HARD |
| AP-T02 | BPM — ballad / R&B crossover | 85–95 BPM | SOFT |
| AP-T03 | BPM — standard Naija pop | 95–110 BPM | SOFT |
| AP-T04 | BPM — uptempo dance | 110–118 BPM | SOFT |
| AP-T05 | Sweet spot for streaming/radio | 100–108 BPM | SOFT preferred |
| AP-T06 | Reference: Rema "Calm Down" | 107 BPM | Reference |
| AP-T07 | Reference: Oxlade "KU LO SA" | 93 BPM | Reference |
| AP-T08 | Reference: Burna Boy "Last Last" | 88 BPM | Reference |
| AP-T09 | Grid resolution | 1/16th note (16-step) | HARD |
| AP-T10 | Clave pattern | 3–2 or 2–3 clave | HARD |
| AP-T11 | Clave subdivision | 3+3+2 eighth-note grouping | HARD |
| AP-T12 | No 4-on-the-floor kick | Kick must NOT hit beats 1,2,3,4 uniformly | HARD |
| AP-T13 | Half-time feel option | Available at 85–95 BPM range | SOFT |
| AP-T14 | Tempo stability | No tempo automation in verse/chorus | HARD |
| AP-T15 | Rubato sections | Allowed in intro only, max ±3 BPM drift | SOFT |

---

## 2. SWING & HUMANIZATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AP-S01 | Hi-hat swing amount | 55–64% | SOFT |
| AP-S02 | Shaker swing amount | 58–66% | SOFT |
| AP-S03 | Kick drum swing | 0% — fully locked to grid | HARD |
| AP-S04 | Snare/rimshot swing | 0–5% — nearly locked | HARD |
| AP-S05 | Conga/bongo swing | 60–70% | SOFT |
| AP-S06 | Maximum swing before sounding stilted | 73% | HARD ceiling |
| AP-S07 | MIDI timing nudge — hi-hats | ±5–12ms off grid | SOFT |
| AP-S08 | MIDI timing nudge — shakers | ±3–10ms off grid | SOFT |
| AP-S09 | MIDI timing nudge — melodic elements | ±2–8ms off grid | SOFT |
| AP-S10 | Quantization amount — hi-hats | 50–70% (not 100%) | SOFT |
| AP-S11 | Quantization amount — kick | 100% | HARD |
| AP-S12 | Groove template source | Extract from live drum recording | PREFERRED |
| AP-S13 | Velocity randomization range | ±8–18 velocity units per note | SOFT |
| AP-S14 | No two consecutive identical velocities | Δ ≥ 5 velocity units minimum | HARD |
| AP-S15 | Guitar timing humanization | Nudge melody notes ±5–15ms off grid | HARD |
| AP-S16 | Chord stagger (strum sim) | 5–20ms per string, top to bottom | SOFT |
| AP-S17 | Percussion timing eagerness | Slightly behind beat: +5 to +10ms delay | SOFT |
| AP-S18 | Downbeat accent timing | Downbeats land on grid or ±2ms only | HARD |
| AP-S19 | Upbeat accent timing | Upbeats can drift ±5–15ms | SOFT |
| AP-S20 | Hi-hat roll subdivision | 1/32nd notes, swing 60–65% | SOFT |

---

## 3. DRUM PATTERN (16-STEP GRID)

Steps 1–16 on a 1/16th-note grid at the chosen BPM.

| Rule ID | Instrument | Step Positions | Type |
|---|---|---|---|
| AP-D01 | Kick — primary position | Steps 1, 5, 9 (beats 1, 2.5, 3) | SOFT |
| AP-D02 | Kick — variant A | Steps 1, 5, 11 | SOFT |
| AP-D03 | Kick — variant B | Steps 1, 7, 9 | SOFT |
| AP-D04 | Rimshot/snare — primary | Steps 4, 11 | SOFT |
| AP-D05 | Rimshot/snare — variant A | Steps 3, 11 | SOFT |
| AP-D06 | Rimshot/snare — variant B | Steps 4, 11, 14 | SOFT |
| AP-D07 | Open hi-hat | Steps 3, 7, 11, 15 | SOFT |
| AP-D08 | Closed hi-hat — base | All 16 steps, swung | SOFT |
| AP-D09 | Closed hi-hat — sparse | Even steps only (2,4,6,8…) | SOFT |
| AP-D10 | Shaker | All 16 steps, velocity alternated | HARD |
| AP-D11 | Conga — primary hit | Steps 3, 7, 11, 15 | SOFT |
| AP-D12 | Conga — ghost notes | Steps 2, 6, 10, 14 at velocity 40–55 | SOFT |
| AP-D13 | Talking drum accent | Steps 5, 13 | SOFT |
| AP-D14 | Clap layer (doubles snare) | Steps 5, 13 | SOFT |
| AP-D15 | Kick must NOT land on step 13 alone | Prevents 4/4 house feel | HARD |
| AP-D16 | Drum fill frequency | Every 8 bars minimum, every 4 bars max | SOFT |
| AP-D17 | Drum fill type | Rimshot cascade, tom roll, or stutter kick | SOFT |
| AP-D18 | Fill velocity swell | Velocity increases 60 → 110 over 4 steps | SOFT |
| AP-D19 | Kick drum sound character | Woody, punchy, sub + mid transient | HARD |
| AP-D20 | Snare sound preference | Rimshot or cross-stick over standard snare | SOFT |
| AP-D21 | No purely electronic 808 kick pattern | 808 used as bass, not primary kick | HARD |
| AP-D22 | Auxiliary perc layer count | Minimum 3 layers (shaker + 2 others) | SOFT |
| AP-D23 | Max percussion layers before overcrowding | 6–7 total active at once | SOFT |
| AP-D24 | Percussion muting in verse | Mute 1–2 layers for vocal space | SOFT |
| AP-D25 | Polyrhythmic offset rule | At least 1 percussion element offset by 1/16th from main grid | HARD |

---

## 4. VELOCITY RULES

| Rule ID | Parameter | Value Range | Type |
|---|---|---|---|
| AP-V01 | Kick — downbeat (step 1) velocity | 110–127 | HARD |
| AP-V02 | Kick — offbeat velocity | 85–105 | SOFT |
| AP-V03 | Rimshot/snare velocity | 90–115 | SOFT |
| AP-V04 | Open hi-hat velocity | 70–95 | SOFT |
| AP-V05 | Closed hi-hat — downbeat accent | 85–105 | SOFT |
| AP-V06 | Closed hi-hat — offbeat softening | 45–70 | SOFT |
| AP-V07 | Shaker — downbeat (steps 1, 5, 9, 13) | 90–110 | SOFT |
| AP-V08 | Shaker — upbeat (steps 3, 7, 11, 15) | 60–80 | SOFT |
| AP-V09 | Shaker — weak subdivisions | 40–60 | SOFT |
| AP-V10 | Conga — primary hit | 80–100 | SOFT |
| AP-V11 | Conga — ghost note | 30–55 | SOFT |
| AP-V12 | MIDI guitar — velocity range spread | Min 60, Max 110, Δ ≥ 10 between notes | SOFT |
| AP-V13 | Chord stab velocity | 65–90 (sits below lead melody) | SOFT |
| AP-V14 | Lead melody velocity | 85–115 | SOFT |
| AP-V15 | Consecutive identical velocity ban | Δ ≥ 5 always | HARD |
| AP-V16 | Velocity accent pattern | Accent beats 1, 3 > beats 2, 4 | SOFT |
| AP-V17 | Drum fill peak velocity | 110–127 on final hit before drop | SOFT |
| AP-V18 | Intro velocity ceiling | No element exceeds velocity 90 in intro | SOFT |
| AP-V19 | Chorus velocity floor | No element below velocity 60 in chorus | SOFT |
| AP-V20 | Ghost note velocity ceiling | Never exceed 55 for ghost notes | HARD |

---

## 5. HARMONIC RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AP-H01 | Primary scales | Major diatonic, Natural minor | SOFT |
| AP-H02 | Extended chord preference | 7th, 9th chords over plain triads | SOFT |
| AP-H03 | Avoid plain triads | Major/minor triads alone sound thin | SOFT |
| AP-H04 | Progression CP-01 (Makosa) | I – IV – V | SOFT |
| AP-H05 | Progression CP-02 (Verse loop) | I – ii – V – IV | SOFT |
| AP-H06 | Progression CP-03 (Hypnotic) | I – IV – V – IV | SOFT |
| AP-H07 | Progression CP-04 (R&B bridge) | I – IV – vi – V | SOFT |
| AP-H08 | Chord rhythm placement | Off-beat stabs — NOT sustained blocks | HARD |
| AP-H09 | Chord stab displacement | Min 2 displaced 16th notes per bar | HARD |
| AP-H10 | Root note bass movement | Bass follows chord root on beat 1 | SOFT |
| AP-H11 | Melodic range — vocals | Typically 1–1.5 octaves per section | SOFT |
| AP-H12 | Key signature modulation | Avoid mid-track key changes (stay diatonic) | SOFT |
| AP-H13 | Modal borrowing (alté hybrid) | Dorian mode allowed in verse for depth | SOFT |
| AP-H14 | Guitar melody character | Syncopated, pentatonic-based licks | SOFT |
| AP-H15 | Electric piano timbre | Warm Rhodes or Wurlitzer emulation | SOFT |
| AP-H16 | Kalimba/marimba use | Allowed as secondary melody, octave above chord | SOFT |
| AP-H17 | Synth pad character | Lush, slow attack (100–300ms), moderate release | SOFT |
| AP-H18 | No atonal elements | All notes diatonic to key | HARD |
| AP-H19 | Semitone cluster chords | Forbidden — sounds dissonant/wrong for genre | HARD |
| AP-H20 | Earworm melody rule | Main melody repeats every 4 bars minimum | SOFT |

---

## 6. BASS & LOW-END RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AP-B01 | Bass frequency range (sub) | 40–80 Hz sine wave core | HARD |
| AP-B02 | Bass mid-layer | 80–300 Hz body layer | SOFT |
| AP-B03 | High-pass filter (all non-bass elements) | 150 Hz cutoff minimum | HARD |
| AP-B04 | Sub-bass mono rule | All content below 100 Hz in mono only | HARD |
| AP-B05 | Kick EQ boost | +3 to +6 dB at 55–65 Hz | SOFT |
| AP-B06 | Bass EQ notch (frequency allocation) | –3 to –6 dB at 55–65 Hz (kick zone) | SOFT |
| AP-B07 | Bass EQ boost (complement to kick) | +2 to +4 dB at 90–110 Hz | SOFT |
| AP-B08 | Sidechain trigger | Kick drum transient only | HARD |
| AP-B09 | Sidechain duck depth | 6–12 dB | SOFT |
| AP-B10 | Sidechain attack | 0.5–2ms (catches transient immediately) | SOFT |
| AP-B11 | Sidechain release | 60–120ms (recovers before next kick) | SOFT |
| AP-B12 | Sidechain ratio | 4:1 to 8:1 | SOFT |
| AP-B13 | Bass rhythm pattern | Syncopated — not on every beat | HARD |
| AP-B14 | Bass note duration | Staccato during chorus, legato in verse | SOFT |
| AP-B15 | Saturation target | Mid/upper harmonics (100 Hz+) only | HARD |
| AP-B16 | Sub saturation | FORBIDDEN — keep sub clean | HARD |
| AP-B17 | Bass velocity variation | ±10–15 velocity units across pattern | SOFT |
| AP-B18 | 808 usage | As melodic sub-bass only, not kick replacement | SOFT |
| AP-B19 | Bass + kick phase check | Phase correlation > 0 (not cancelling) | HARD |
| AP-B20 | Headroom below 100 Hz | Leave –6 dBFS minimum for mastering | SOFT |

---

## 7. ARRANGEMENT STRUCTURE

| Rule ID | Section | Duration | Energy (1–10) | Active Elements |
|---|---|---|---|---|
| AP-A01 | Intro | 10–15 sec | 3 | Light perc, filtered pad/melody |
| AP-A02 | Verse 1 | 30–45 sec | 5 | Stripped back, kick may be muted |
| AP-A03 | Pre-Chorus / Build | 8–16 bars | 7 | Snare rolls, riser, full perc returns |
| AP-A04 | Chorus / Drop | 16–32 bars | 10 | Full groove, all elements, earworm melody |
| AP-A05 | Verse 2 | 25–35 sec | 5 | Same as Verse 1 structure |
| AP-A06 | Chorus 2 | 16 bars | 10 | Same as Chorus 1 |
| AP-A07 | Breakdown / Bridge | 8–16 bars | 2 | Drums muted, atmospheric only |
| AP-A08 | Final Drop | 16 bars | 10 | Maximum density |
| AP-A09 | Outro | 10–20 sec | 2 | Elements removed gradually |
| AP-A10 | Total track length | 2:30–3:30 | — | Commercial target |
| AP-A11 | No new instruments per 8-bar section | Max 2 new elements added at once | SOFT |
| AP-A12 | Verse bass rule | Bassline can be muted or LP-filtered (cutoff 200 Hz) | SOFT |
| AP-A13 | Build riser rule | Min 1 ascending pitch riser per pre-chorus | SOFT |
| AP-A14 | Breakdown rule | Kick AND bass must both drop out | HARD |
| AP-A15 | LP filter sweep rate | 1 octave per 4 bars max | SOFT |
| AP-A16 | HP filter in break | Apply HP filter sweeping up to 500 Hz then release at drop | SOFT |
| AP-A17 | Vocal chop in chorus | At least 1 chop/stutter of vocal per 8 bars | SOFT |
| AP-A18 | Reverb tail into drop | Reverb freeze or long tail 1–2s before drop | SOFT |
| AP-A19 | Silence before drop | 0.5–1 beat of near-silence before Chorus drop | SOFT |
| AP-A20 | Loop length | Core groove repeats every 2 or 4 bars | HARD |

---

## 8. VOCAL CHAIN & PROCESSING

| Rule ID | Process | Parameter | Type |
|---|---|---|---|
| AP-VC01 | Step 1: Pitch correction | Retune speed 20–40ms | SOFT |
| AP-VC02 | Step 2: High-pass filter | 80–100 Hz cutoff | HARD |
| AP-VC03 | Step 3: Mud EQ notch | –4 to –8 dB at 200–400 Hz | SOFT |
| AP-VC04 | Step 4a: Fast compressor (peak) | Attack 1–5ms, Release 30–60ms, Ratio 4:1–8:1 | SOFT |
| AP-VC05 | Step 4b: Optical compressor (body) | Attack 10–30ms, Release 100–200ms, Ratio 2:1–3:1 | SOFT |
| AP-VC06 | Step 5: De-esser frequency | 5–10 kHz target range | SOFT |
| AP-VC07 | Step 6: Air EQ boost | +2 to +4 dB shelf at 10 kHz+ | SOFT |
| AP-VC08 | Step 7: Multiband comp (low-mids) | 200–500 Hz, ±3 dB dynamic range | SOFT |
| AP-VC09 | Reverb type | Medium room or hall, NOT convolution cave | SOFT |
| AP-VC10 | Reverb pre-delay | 20–40ms | SOFT |
| AP-VC11 | Reverb decay | 1.2–2.5 seconds | SOFT |
| AP-VC12 | Reverb send level | –12 to –18 dB (parallel, not insert) | HARD |
| AP-VC13 | Ping-pong delay | Synced to 1/8 or 1/4 note of session BPM | SOFT |
| AP-VC14 | Delay catch | Automate to catch last word of phrase only | SOFT |
| AP-VC15 | Vocal position in mix | Lead vocal at –6 to –3 dBFS peak | SOFT |
| AP-VC16 | Crowd choir layers | 8–16 distinct takes | SOFT |
| AP-VC17 | Choir formant up-shift (soprano sim) | +2 to +4 semitones | SOFT |
| AP-VC18 | Choir formant down-shift (baritone sim) | –2 to –4 semitones | SOFT |
| AP-VC19 | Choir micro-detuning | ±5–15 cents per layer | HARD |
| AP-VC20 | Choir pan spread | L80–R80 even distribution | SOFT |

---

## 9. STEREO & SPATIAL RULES

| Rule ID | Element | Pan Position | Width | Type |
|---|---|---|---|---|
| AP-SP01 | Sub-bass (< 100 Hz) | Center (0°) | Mono | HARD |
| AP-SP02 | Kick drum | Center (0°) | Mono | HARD |
| AP-SP03 | Lead vocal | Center (0°) | Mono | HARD |
| AP-SP04 | Rimshot/snare | Center (0°) | Mono–slight | HARD |
| AP-SP05 | Bass instrument body | Center ±5° | Narrow | SOFT |
| AP-SP06 | Guitar melody | ±20–40° | Moderate | SOFT |
| AP-SP07 | Counter-melody | Opposite to main guitar | Moderate | SOFT |
| AP-SP08 | Synth pads | ±40–80° | Wide | SOFT |
| AP-SP09 | Shakers | Alternating ±30–60° | Moderate | SOFT |
| AP-SP10 | Background vocals (harmonies) | ±30–60° | Moderate | SOFT |
| AP-SP11 | Crowd choir | ±80–100° | Maximum | SOFT |
| AP-SP12 | Congas | ±15–30° | Slight | SOFT |
| AP-SP13 | Talking drum | ±20–40° | Slight | SOFT |
| AP-SP14 | Mid/Side EQ bass cutoff | Collapse all < 100 Hz to Mid channel | HARD |
| AP-SP15 | Choir reverb tail pan | Full stereo (L100–R100) | Maximum | SOFT |
| AP-SP16 | Reverb wet signal | Never in mono | HARD |
| AP-SP17 | Stereo width of mix (measured) | 60–80% average correlation | SOFT |
| AP-SP18 | Stereo bass check | Mono sum must not lose > 3 dB bass energy | HARD |
| AP-SP19 | Side-channel low-cut | Side channel high-pass at 150 Hz | HARD |
| AP-SP20 | Panning automation | Static panning — no LFO pan movement | SOFT |

---

## 10. INSTRUMENTATION & TIMBRE

| Rule ID | Instrument | Character | Avoid |
|---|---|---|---|
| AP-I01 | Kick drum | Woody, round sub + punchy mid transient | Boomy, over-compressed |
| AP-I02 | Snare/rimshot | Organic, acoustic texture, mid-focused | Clappy electronic snares |
| AP-I03 | Hi-hat | Metallic but warm, not harsh | Harsh digital hats |
| AP-I04 | Shaker | Rattly, organic, slightly lo-fi | Pristine synthetic shakers |
| AP-I05 | Guitar | Multi-sampled library or live, NOT synth guitar | Basic MIDI piano-roll chord prog |
| AP-I06 | Electric piano | Warm Rhodes/Wurlitzer, slight chorus | Bright or cold digital piano |
| AP-I07 | Bass | Sub-sine with slight mid grit | Pure sine with no character |
| AP-I08 | Synth pads | Lush, slow attack, modulated | Harsh, bright leads as pads |
| AP-I09 | Kalimba | Bright, metallic overtones | Heavily processed timbres |
| AP-I10 | Vocal FX | Pitch chop, reverb freeze, granular — sparingly | Heavy vocoder on lead |

---
---

# GENRE 2: AMAPIANO / AFROBEATS-AMAPIANO HYBRID
### Reference Artists: Kabza De Small, Major League DJz, Asake (hybrid), MFR Souls

---

## 1. TEMPO & TIME SIGNATURE

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AM-T01 | Time signature | 4/4 | HARD |
| AM-T02 | BPM — deep/soulful Amapiano | 108–112 BPM | SOFT |
| AM-T03 | BPM — standard Amapiano | 112–115 BPM | SOFT preferred |
| AM-T04 | BPM — exact Amapiano target | 115 BPM | HARD (purist) |
| AM-T05 | BPM — Afrobeats-Amapiano hybrid | 105–115 BPM | SOFT |
| AM-T06 | BPM — Afro-house Amapiano fusion | 112–118 BPM | SOFT |
| AM-T07 | Maximum BPM before log drum loses character | 120 BPM | HARD ceiling |
| AM-T08 | Grid resolution | 1/16th note (16-step) | HARD |
| AM-T09 | Felt tempo illusion | Feels heavier/slower than BPM number suggests | NOTE |
| AM-T10 | No rubato | Strict tempo lock throughout | HARD |
| AM-T11 | Half-time groove option | Available for breakdown sections only | SOFT |
| AM-T12 | DJ set open tempo | DJ sets open at 112 BPM, build to 115–118 | NOTE |
| AM-T13 | Clave type | 3–2 Afrobeats clave OR four-on-floor hybrid | SOFT |
| AM-T14 | Delay time at 115 BPM (1/4 note) | 521ms | Reference |
| AM-T15 | Delay time at 115 BPM (1/8 note) | 261ms | Reference |

---

## 2. SWING & HUMANIZATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AM-S01 | Log drum swing | 52–58% (subtle, melodic instrument) | SOFT |
| AM-S02 | Hi-hat swing | 58–68% | SOFT |
| AM-S03 | Piano chord swing | 54–62% | SOFT |
| AM-S04 | Kick drum swing | 0–3% (near-locked) | HARD |
| AM-S05 | Percussion (congas/djembe) swing | 60–72% | SOFT |
| AM-S06 | Shaker humanization timing | ±5–12ms off grid | SOFT |
| AM-S07 | Log drum note duration variation | ±5–20ms per note length | SOFT |
| AM-S08 | Lazy groove target | Log drum slightly behind beat by +8–12ms | SOFT preferred |
| AM-S09 | Piano comping timing | Behind beat by +5–10ms | SOFT |
| AM-S10 | Quantization amount — log drum | 60–80% (never 100%) | HARD |
| AM-S11 | Velocity randomization per hit | ±10–20 velocity units | SOFT |
| AM-S12 | Log drum melody swing profile | Downbeats locked, upbeats swung 60–68% | SOFT |
| AM-S13 | No 100% quantization on any melodic element | HARD rule for anti-generic output | HARD |
| AM-S14 | Flam technique on log drum | Occasional 2-note flam offset by 20–40ms | SOFT |
| AM-S15 | Percussion poly-offset | Layer 2 offset from layer 1 by exactly 1/32nd note | SOFT |
| AM-S16 | DJ-mix consideration | Grooves must beatmatch to 115 BPM anchor | SOFT |
| AM-S17 | Live drummer microtiming model | Use Groove MIDI Dataset South African patterns | PREFERRED |
| AM-S18 | Swing plateau | Increase swing in breakdown, reduce at drop | SOFT |
| AM-S19 | Saxophone timing (if used) | Behind beat +10–20ms | SOFT |
| AM-S20 | Vocal chop timing | On-grid snap required for rhythmic effect | HARD |

---

## 3. DRUM PATTERN (16-STEP GRID)

| Rule ID | Instrument | Step Positions | Type |
|---|---|---|---|
| AM-D01 | Kick — classic Amapiano | Steps 1, 5, 9, 13 (four-on-floor) | SOFT |
| AM-D02 | Kick — Afrobeats hybrid | Steps 1, 5, 9 (drop 13) | SOFT |
| AM-D03 | Kick — syncopated variant | Steps 1, 4, 9, 12 | SOFT |
| AM-D04 | Snare / clap | Steps 5, 13 (beats 2 and 4) | SOFT |
| AM-D05 | Open hi-hat | Steps 3, 7, 11, 15 | SOFT |
| AM-D06 | Closed hi-hat | Steps 1, 3, 5, 7, 9, 11, 13, 15 (8th notes) | SOFT |
| AM-D07 | Log drum primary hit | Steps 1, 3, 7, 9 | SOFT |
| AM-D08 | Log drum secondary hit | Steps 5, 11, 13 | SOFT |
| AM-D09 | Log drum ghost/roll | Steps 2, 4, 6 at velocity 30–50 | SOFT |
| AM-D10 | Djembe layer | Steps 3, 7, 11 | SOFT |
| AM-D11 | Shaker | All 16 steps, strong swing | HARD |
| AM-D12 | Cabasa / auxiliary perc | Steps 2, 6, 10, 14 | SOFT |
| AM-D13 | Rim/woodblock accent | Steps 4, 12 | SOFT |
| AM-D14 | Piano chord stab pattern | Steps 3, 7, 11, 15 (offbeats) | SOFT |
| AM-D15 | Log drum melodic roll | Triplet feel: steps 1, 1.33, 1.67, 2 | SOFT |
| AM-D16 | Kick weight | Heavier than Afropop — sub punch > mid punch | SOFT |
| AM-D17 | Snare character | Bright, crisp, dry — no long reverb | SOFT |
| AM-D18 | Log drum tonal root | Must match key of track | HARD |
| AM-D19 | Percussion density in verse | 3–4 layers max | SOFT |
| AM-D20 | Percussion density in chorus | 5–7 layers | SOFT |
| AM-D21 | Log drum role | Melodic bass instrument — NOT simple bassline | HARD |
| AM-D22 | Log drum phrase length | 2–4 bar melodic phrase minimum | SOFT |
| AM-D23 | Keyboard/piano roll frequency | Comping every 2–4 bars | SOFT |
| AM-D24 | Saxophope accent (optional) | Steps 1, 9 on chorus entrance | SOFT |
| AM-D25 | Tambourine | Steps 5, 13 doubling snare | SOFT |

---

## 4. VELOCITY RULES

| Rule ID | Parameter | Value Range | Type |
|---|---|---|---|
| AM-V01 | Kick velocity | 100–127 | HARD |
| AM-V02 | Log drum primary hit | 95–115 | SOFT |
| AM-V03 | Log drum ghost note | 25–50 | HARD |
| AM-V04 | Log drum accent (musical phrase peak) | 110–127 | SOFT |
| AM-V05 | Piano chord stab | 70–90 | SOFT |
| AM-V06 | Piano melody lead | 85–110 | SOFT |
| AM-V07 | Hi-hat alternating | Strong: 80–100 / Weak: 45–65 | SOFT |
| AM-V08 | Shaker strong beat | 90–110 | SOFT |
| AM-V09 | Shaker weak beat | 50–70 | SOFT |
| AM-V10 | Djembe hit | 80–100 | SOFT |
| AM-V11 | Saxophone note (if used) | 85–115 with expression CC | SOFT |
| AM-V12 | Vocal chop | 90–110 (punchy and clear) | SOFT |
| AM-V13 | Background pad velocity | 40–70 (must not compete with log drum) | HARD |
| AM-V14 | Log drum phrase velocity arc | Increases toward phrase peak by 20–30 units | SOFT |
| AM-V15 | No element exceeds lead at 127 except kick | SOFT |
| AM-V16 | Ghost note ceiling | 55 velocity maximum | HARD |
| AM-V17 | Downbeat accenting rule | Beats 1, 3 always louder than 2, 4 | SOFT |
| AM-V18 | Verse percussion ceiling | No element over velocity 100 in verse | SOFT |
| AM-V19 | Chorus percussion floor | No element under velocity 60 in chorus | SOFT |
| AM-V20 | Log drum roll velocity | Ramps from 40 to 110 over 4–8 steps | SOFT |

---

## 5. HARMONIC RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AM-H01 | Primary scales | Minor modes, Dorian, Natural minor | SOFT preferred |
| AM-H02 | Jazz chord usage | Maj7, min7, dom7, 9th chords common | SOFT |
| AM-H03 | Log drum tuning | Tuned to key tonic or 5th | HARD |
| AM-H04 | Piano comping style | Sparse, rhythmic, jazz-influenced | SOFT |
| AM-H05 | Chord progression — minor feel | i – VII – VI – VII | SOFT |
| AM-H06 | Chord progression — jazz gospel | I – IV – iii – VI | SOFT |
| AM-H07 | Chord progression — soulful | i – iv – VII – III | SOFT |
| AM-H08 | Chord voicing | Open voicings (10th spreads, shell voicings) | SOFT |
| AM-H09 | Saxophone key | Match to track key exactly | HARD |
| AM-H10 | Log drum melodic movement | Stepwise or ±3–5 semitone leaps | SOFT |
| AM-H11 | Log drum avoids large jumps | No interval > octave in one note | SOFT |
| AM-H12 | Piano style reference | Kabza De Small — jazz-meets-soul piano | NOTE |
| AM-H13 | Flute usage | High-register countermelody, 2 octaves above bass | SOFT |
| AM-H14 | Key selection | Minor keys preferred, e.g. A min, D min, F# min | SOFT preferred |
| AM-H15 | Chord rhythm | Syncopated comping — not block chord sustained | HARD |
| AM-H16 | Chord stab displacement | Min 1 displaced 16th per 2-bar phrase | SOFT |
| AM-H17 | Suspended chords | Sus2, Sus4 chords add tension before resolution | SOFT |
| AM-H18 | Modal mixture | Borrowing from parallel major allowed in chorus | SOFT |
| AM-H19 | Harmonic rhythm | Chord change every 1–2 bars (not faster) | SOFT |
| AM-H20 | Log drum melodic phrase | Must resolve to tonic or 5th at end of phrase | SOFT |

---

## 6. BASS & LOW-END RULES (LOG DRUM SPECIFIC)

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AM-B01 | Log drum sub core | Pure sine wave: 40–80 Hz | HARD |
| AM-B02 | Log drum transient layer | Woodblock/muted conga: 200–800 Hz | HARD |
| AM-B03 | Log drum synthesis method | FM synthesis (Operator modulation) or layering | SOFT |
| AM-B04 | FM Operator 2 to Operator 1 ratio | 2:1 or 3:1 for woody tone | SOFT |
| AM-B05 | ADSR — attack | 1–5ms (punchy transient) | SOFT |
| AM-B06 | ADSR — decay | 150–400ms (sub sustain) | SOFT |
| AM-B07 | ADSR — sustain | 0–30% (falls away) | SOFT |
| AM-B08 | ADSR — release | 50–200ms | SOFT |
| AM-B09 | Saturation target | 100–500 Hz upper harmonics only | HARD |
| AM-B10 | Sub (< 100 Hz) stays clean | No distortion below 100 Hz | HARD |
| AM-B11 | Sub-bass mono rule | Mono below 100 Hz always | HARD |
| AM-B12 | Sidechain source | Kick drum | HARD |
| AM-B13 | Sidechain duck depth | 8–14 dB | SOFT |
| AM-B14 | Sidechain release | 70–130ms | SOFT |
| AM-B15 | Log drum melodic motion | Follow chord changes — not static root notes | HARD |
| AM-B16 | Log drum vs piano relationship | Log drum is bass + melody; piano is rhythm | HARD |
| AM-B17 | Competing bass ban | No additional bassline when log drum is active | HARD |
| AM-B18 | HP filter on all non-bass | 150 Hz minimum | HARD |
| AM-B19 | Low-end headroom | Leave –6 dBFS below 80 Hz | SOFT |
| AM-B20 | Band-split saturation | Split at 100 Hz; saturate mid band only | HARD |

---

## 7. ARRANGEMENT STRUCTURE

| Rule ID | Section | Duration | Energy (1–10) | Notes |
|---|---|---|---|---|
| AM-A01 | Intro | 20–40 sec | 2–3 | Log drum melody only, no full perc |
| AM-A02 | Build 1 | 16–32 bars | 5 | Layered perc added gradually |
| AM-A03 | Main Section (verse equivalent) | 32–64 bars | 7–8 | Full groove, log drum melody |
| AM-A04 | Drop / Chorus | 16–32 bars | 10 | Maximum energy, all elements |
| AM-A05 | Breakdown | 8–16 bars | 2 | Only log drum + light perc |
| AM-A06 | Build 2 | 16 bars | 6–8 | Faster element entry |
| AM-A07 | Final Drop | 32 bars | 10 | Full density |
| AM-A08 | Outro | 20–40 sec | 2–3 | Gradual strip-back |
| AM-A09 | Total length (club version) | 5:00–8:00 | — | DJ-mix format |
| AM-A10 | Total length (radio edit) | 3:00–4:30 | — | Commercial edit |
| AM-A11 | Intro/outro DJ handles | 16-bar plain intro for beatmatch | HARD (DJ rule) |
| AM-A12 | Log drum melody variation | New phrase every 4 bars minimum | SOFT |
| AM-A13 | Piano entry | Enters at Build 1, not intro | SOFT |
| AM-A14 | Saxophone entry (if used) | Enters at Drop only | SOFT |
| AM-A15 | Vocal chant entry | Enters at Drop | SOFT |

---

## 8. VOCAL CHAIN & PROCESSING

| Rule ID | Process | Parameter | Type |
|---|---|---|---|
| AM-VC01 | Vocal style | Deep, soulful, unhurried — not rushed Afropop | NOTE |
| AM-VC02 | Pitch correction retune speed | 40–80ms (more natural than Afropop) | SOFT |
| AM-VC03 | HPF | 100 Hz | HARD |
| AM-VC04 | Reverb type | Large hall or church — big, spiritual space | SOFT |
| AM-VC05 | Reverb decay | 2.0–4.0 seconds | SOFT |
| AM-VC06 | Reverb pre-delay | 30–60ms | SOFT |
| AM-VC07 | Vocal chop effect | Hard chop to 1/8th or 1/16th, verb tail retained | SOFT |
| AM-VC08 | Compression approach | Light touch — 2:1 ratio, slow attack | SOFT |
| AM-VC09 | Vocal doubling | 1–2 tight doubles ±5–10ms | SOFT |
| AM-VC10 | Vocal space in mix | Leave 200–3000 Hz clear for vocal body | HARD |

---

## 9. STEREO & SPATIAL RULES

| Rule ID | Element | Pan | Width | Type |
|---|---|---|---|---|
| AM-SP01 | Log drum sub | Center | Mono | HARD |
| AM-SP02 | Log drum transient layer | Center ±10° | Narrow | SOFT |
| AM-SP03 | Kick | Center | Mono | HARD |
| AM-SP04 | Piano | ±15–30° | Moderate | SOFT |
| AM-SP05 | Saxophone | ±10–20° | Slight | SOFT |
| AM-SP06 | Vocal | Center | Mono | HARD |
| AM-SP07 | Percussion (djembe, shaker) | ±20–50° | Moderate | SOFT |
| AM-SP08 | Pads / atmosphere | ±60–100° | Wide | SOFT |
| AM-SP09 | Reverb tails | Full stereo | Maximum | SOFT |
| AM-SP10 | Low-end mono check | Mono sum must not lose > 3 dB | HARD |

---

## 10. INSTRUMENTATION & TIMBRE

| Rule ID | Instrument | Character | Avoid |
|---|---|---|---|
| AM-I01 | Log drum | Woody, round, percussive — tuneable bass | Generic 808 sub |
| AM-I02 | Piano | Upright or electric piano, jazz-inflected | Bright synth piano |
| AM-I03 | Kick | Deep, club-weight sub — heavier than Afropop kick | Thin 808 kick |
| AM-I04 | Saxophone | Smooth alto or tenor, legato | Harsh or over-processed sax |
| AM-I05 | Flute | Breathy, airy high register | Bright synth flute |
| AM-I06 | Percussion | Mix of djembe, cabasa, shaker, tambourine | Only electronic drum kit |
| AM-I07 | Pads | Deep, slow-attack, ambient — almost inaudible | Bright, cutting pads |
| AM-I08 | Vocals | Chanted, call-and-response style | Auto-pitched pop style |
| AM-I09 | Bass | Log drum IS the bass — no separate bassline | Adding 808 on top |
| AM-I10 | String accents | Sparse pizzicato allowed in breakdown | Lush full orchestral strings |

---
---

# GENRE 3: AFRO-FUSION (BURNA BOY STYLE)
### Reference Artists: Burna Boy, Adekunle Gold, Simi, Tems, Tay Iwar

---

## 1. TEMPO & TIME SIGNATURE

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AF-T01 | Time signature | 4/4 primary; 6/8 feel passages allowed | SOFT |
| AF-T02 | BPM — R&B-leaning fusion | 80–92 BPM | SOFT |
| AF-T03 | BPM — standard Afrofusion | 90–105 BPM | SOFT preferred |
| AF-T04 | BPM — uptempo fusion | 105–115 BPM | SOFT |
| AF-T05 | Reference: Burna Boy "Last Last" | 88 BPM | Reference |
| AF-T06 | Dancehall half-time feel | Available at 90–100 BPM range | SOFT |
| AF-T07 | Reggae one-drop influence | Kick on beat 3 only (sparingly) | SOFT |
| AF-T08 | Grid resolution | 1/16th note base; triplet 1/8ths allowed | SOFT |
| AF-T09 | Tempo modulation | Subtle ritardando allowed in breakdowns (±2 BPM) | SOFT |
| AF-T10 | 6/8 interlude | Insert one 6/8 bar per 8-bar phrase for interest | SOFT |
| AF-T11 | Dub/reggae clave | 2–3 clave overlay allowed | SOFT |
| AF-T12 | Triplet feel over 4/4 | Hemiola rhythms over straight grid | SOFT |
| AF-T13 | BPM for introspective tracks | 80–88 BPM | SOFT |
| AF-T14 | No rigid four-on-floor | Kick is expressive — not robotic | HARD |
| AF-T15 | Delay at 92 BPM (dotted 1/8) | 489ms | Reference |

---

## 2. SWING & HUMANIZATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AF-S01 | Kick swing | 2–8% (slight looseness) | SOFT |
| AF-S02 | Snare swing | 5–12% | SOFT |
| AF-S03 | Hi-hat swing | 55–68% | SOFT |
| AF-S04 | Guitar swing | 55–65% | SOFT |
| AF-S05 | Reggae-style skank guitar | Hits on offbeats — step positions 3, 7, 11, 15 | HARD |
| AF-S06 | Timing nudge — all elements | ±5–15ms natural drift | SOFT |
| AF-S07 | Live band feel simulation | Use groove template extracted from live recording | PREFERRED |
| AF-S08 | Bass guitar timing | Slightly lazy — behind beat +8–15ms | SOFT |
| AF-S09 | Piano timing | On or slightly ahead of beat ±3ms | SOFT |
| AF-S10 | No mechanical quantization | 0% quantization on live-recorded parts | HARD |
| AF-S11 | MIDI humanization amount | ±10–20ms on all melodic elements | SOFT |
| AF-S12 | Percussion variety | Each percussion element has own unique swing % | SOFT |
| AF-S13 | Dub delay swing | Delay throws swing with track groove | SOFT |
| AF-S14 | Downbeat anchor | Beat 1 always lands within ±3ms of grid | HARD |
| AF-S15 | Upbeat looseness | Beats 2.5, 3.5, 4.5 can drift ±10–18ms | SOFT |
| AF-S16 | Vocal delivery timing | Intentionally ahead or behind beat — not on grid | NOTE |
| AF-S17 | Reggae one-drop timing | Kick on beat 3 exactly: 0% swing | HARD |
| AF-S18 | Stagger chord entries | Multi-instrument chords: each enters ±10–30ms apart | SOFT |
| AF-S19 | Groove evolution | Swing % increases by 3–5% from verse to chorus | SOFT |
| AF-S20 | Fill humanization | Each fill note has unique velocity and ±5ms offset | SOFT |

---

## 3. DRUM PATTERN

| Rule ID | Instrument | Step Positions | Type |
|---|---|---|---|
| AF-D01 | Kick — Afrofusion base | Steps 1, 5, 11 | SOFT |
| AF-D02 | Kick — dancehall influence | Steps 1, 7 | SOFT |
| AF-D03 | Kick — reggae one-drop | Step 9 only (beat 3) | SOFT |
| AF-D04 | Snare / crack | Steps 5, 13 | SOFT |
| AF-D05 | Ghost snare | Steps 4, 12 at velocity 35–55 | SOFT |
| AF-D06 | Hi-hat — skank pattern | Steps 3, 7, 11, 15 | SOFT |
| AF-D07 | Hi-hat — full pattern | All 16, swung | SOFT |
| AF-D08 | Rimshot | Steps 3, 11 | SOFT |
| AF-D09 | Shaker | All 16 steps, swung | SOFT |
| AF-D10 | Percussion (conga) | Steps 3, 7, 10, 15 | SOFT |
| AF-D11 | Tambourine skank | Steps 3, 7, 11, 15 (doubles hi-hat) | SOFT |
| AF-D12 | Clap | Steps 5, 13 | SOFT |
| AF-D13 | Cowbell / agogo | Steps 1, 4, 7, 10, 13 | SOFT |
| AF-D14 | Dub kick variant (reggae) | Step 9, with sub-bass note also on step 9 | SOFT |
| AF-D15 | Kick sub-frequency hit | Triggers matching sub-bass note | SOFT |
| AF-D16 | Snare roll (dancehall type) | 4 steps before drop: steps 10, 11, 12, 13 | SOFT |
| AF-D17 | Percussion layering rule | Minimum 4 layers in chorus | SOFT |
| AF-D18 | Open hi-hat | Step 9 or 11, velocity 65–85 | SOFT |
| AF-D19 | Drum fill character | Syncopated, not straight roll | SOFT |
| AF-D20 | Ride cymbal (optional) | Steps 1, 3, 5, 7, 9, 11, 13, 15 at low velocity | SOFT |
| AF-D21 | Talking drum role | Melodic accent layer, steps 5, 9 | SOFT |
| AF-D22 | Kick weight | Moderate — less dominant than Amapiano | SOFT |
| AF-D23 | Snare reverb | Short room (0.3–0.8s) or no reverb | SOFT |
| AF-D24 | Dub echo on snare | Allowed: 1/4-note echo throw | SOFT |
| AF-D25 | Full texture entry | All layers enter at chorus simultaneously | SOFT |

---

## 4. VELOCITY RULES

| Rule ID | Parameter | Value Range | Type |
|---|---|---|---|
| AF-V01 | Kick | 95–120 | SOFT |
| AF-V02 | Snare | 85–110 | SOFT |
| AF-V03 | Ghost snare | 30–55 | HARD |
| AF-V04 | Hi-hat strong | 80–100 | SOFT |
| AF-V05 | Hi-hat weak | 45–65 | SOFT |
| AF-V06 | Shaker downbeat | 85–105 | SOFT |
| AF-V07 | Shaker upbeat | 55–75 | SOFT |
| AF-V08 | Guitar melody | 70–110, randomized | SOFT |
| AF-V09 | Piano comping | 60–85 | SOFT |
| AF-V10 | Bass guitar | 80–110 | SOFT |
| AF-V11 | Percussion (conga) | 75–100 | SOFT |
| AF-V12 | Vocal chop | 90–115 | SOFT |
| AF-V13 | Cowbell/agogo | 50–70 (subtle) | SOFT |
| AF-V14 | Pad/atmosphere | 30–60 | SOFT |
| AF-V15 | Consecutive identical velocity ban | Δ ≥ 5 | HARD |
| AF-V16 | Dub echo velocity decay | Each repeat decays 15–25 velocity units | SOFT |
| AF-V17 | Fill velocity swell | Builds to 120–127 on final hit | SOFT |
| AF-V18 | Intro velocity ceiling | No element > 80 velocity in intro | SOFT |
| AF-V19 | Downbeat > offbeat | Beat 1 velocity always > beat 2.5 | SOFT |
| AF-V20 | Ride/cowbell dynamics | Very subtle — max velocity 70 | SOFT |

---

## 5. HARMONIC RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AF-H01 | Primary modes | Mixolydian, Dorian, Natural minor | SOFT preferred |
| AF-H02 | Extended chords | m9, Maj9, 11th, 13th chords allowed | SOFT |
| AF-H03 | Chord progression — Afrofusion standard | I – III – IV – i (Mixolydian feel) | SOFT |
| AF-H04 | Chord progression — introspective | i – VI – III – VII | SOFT |
| AF-H05 | Chord progression — dancehall influence | I – V – vi – IV | SOFT |
| AF-H06 | Chord progression — jazz influence | ii – V – I – vi | SOFT |
| AF-H07 | Reggae harmony influence | 7th chords on every chord | SOFT |
| AF-H08 | Chord stab character | Loose, slightly behind beat | SOFT |
| AF-H09 | Guitar style | Fingerpicking allowed; palm-muted strums | SOFT |
| AF-H10 | Keyboard style | Sparse Rhodes, gospel-influenced runs | SOFT |
| AF-H11 | Bass role | Melodic, moving — not static root notes | HARD |
| AF-H12 | Horn section (optional) | Sparse brass stabs on beat 1 or 3 | SOFT |
| AF-H13 | Key preference | Minor keys — emotional, introspective | SOFT preferred |
| AF-H14 | Modulation | Allowed: semitone up for final chorus | SOFT |
| AF-H15 | Vocal harmony | Stack 3rds and 5ths above lead | SOFT |
| AF-H16 | No heavy modulation FX on guitar | Natural guitar tone preferred | SOFT |
| AF-H17 | Pentatonic soloing allowed | Guitar solos use minor pentatonic | SOFT |
| AF-H18 | Chord rhythm | 2 chords per bar in verse; 1 per bar in chorus | SOFT |
| AF-H19 | Dub spacing | Long space between chord stabs (call/response) | SOFT |
| AF-H20 | Vocal melody | Major 2nd and minor 7th intervals typical | NOTE |

---

## 6. BASS & LOW-END RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AF-B01 | Bass type | Live-sounding bass guitar preferred over synth | SOFT preferred |
| AF-B02 | Bass range | 40–200 Hz body; 200–500 Hz presence | SOFT |
| AF-B03 | Bass timing | Behind beat +8–15ms (reggae/dub influence) | SOFT |
| AF-B04 | Bass rhythm | Syncopated, melodic — not root-only | HARD |
| AF-B05 | Mono below 100 Hz | HARD rule | HARD |
| AF-B06 | Sidechain depth | 4–8 dB (lighter than Afropop) | SOFT |
| AF-B07 | Sidechain release | 80–150ms | SOFT |
| AF-B08 | HP filter on all non-bass | 150 Hz cutoff | HARD |
| AF-B09 | Bass saturation | Light warm saturation — not heavy distortion | SOFT |
| AF-B10 | Sub frequency | Sine sub under bass: 40–70 Hz | SOFT |
| AF-B11 | Kick–bass interaction | Kick on beat 1; bass fills rest of bar | SOFT |
| AF-B12 | Bass slides / portamento | Allowed; glide time 20–50ms | SOFT |
| AF-B13 | Dub sub-bass hit | Optional: single low bass note on beat 1 of chorus | SOFT |
| AF-B14 | Bass velocity | 85–110 with ±10 variation | SOFT |
| AF-B15 | Low-end frequency allocation | Kick owns 55–70 Hz; bass owns 80–150 Hz | SOFT |

---

## 7. ARRANGEMENT STRUCTURE

| Rule ID | Section | Duration | Energy (1–10) | Notes |
|---|---|---|---|---|
| AF-A01 | Intro | 15–25 sec | 3 | Atmospheric — guitar/piano only |
| AF-A02 | Verse 1 | 30–50 sec | 5 | Sparse drums, focus on vocal |
| AF-A03 | Pre-Chorus | 8–12 bars | 7 | Bass enters, percussion builds |
| AF-A04 | Chorus | 16–24 bars | 9 | Full band feel |
| AF-A05 | Verse 2 | 25–35 sec | 5 | Slight variation on Verse 1 |
| AF-A06 | Chorus 2 | 16–24 bars | 9 | Same or slight variation |
| AF-A07 | Bridge | 8–16 bars | 4 | Key change possible, stripped |
| AF-A08 | Final Chorus | 16–32 bars | 10 | Full density + vocal ad libs |
| AF-A09 | Outro | 20–30 sec | 3 | Dub-style decay, long reverb |
| AF-A10 | Total length | 3:00–4:30 | — | Longer than Afropop |
| AF-A11 | Dub breakdown rule | At least one dub-style strip (drums only or bass only) | SOFT |
| AF-A12 | Vocal ad lib section | Last 30 sec dedicated to ad libs over groove | SOFT |
| AF-A13 | Instrument solo | Optional 8-bar guitar or sax solo | SOFT |
| AF-A14 | Key change | Allowed in final chorus (+1 semitone) | SOFT |
| AF-A15 | Outro fade type | Gradual dub fade over 15–30 sec | SOFT |

---

## 8–10. VOCAL, STEREO & INSTRUMENTATION
*(Same structure as Afropop sections — apply Afrofusion-specific adjustments below)*

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AF-VC01 | Reverb size | Larger than Afropop — 2.0–4.0s decay | SOFT |
| AF-VC02 | Dub echo on vocals | 1/4 note or dotted 1/8 delay throw | SOFT |
| AF-VC03 | Pitch correction | Slower retune (60–100ms) — natural tone | SOFT |
| AF-SP01 | Guitar stereo width | Wider than Afropop: ±40–60° | SOFT |
| AF-SP02 | Dub echo pan | Delay repeats pan opposite to source | SOFT |
| AF-I01 | Guitar character | Electric guitar, slight room reverb, warm tone | SOFT |
| AF-I02 | Bass character | Live bass feel — plucked, melodic | SOFT |
| AF-I03 | Horn stabs | Sparse, dry — no long reverb tail on brass | SOFT |
| AF-I04 | Keyboard | Gospel-influenced Rhodes runs | SOFT |
| AF-I05 | String accents | Allowed — sparse pizzicato only | SOFT |

---
---

# GENRE 4: ALTÉ (ALTERNATIVE NIGERIAN)
### Reference Artists: Cruel Santino, Odunsi (The Engine), Amaarae, Lady Donli, Tems (early)

---

## 1. TEMPO & TIME SIGNATURE

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AL-T01 | Time signature | 4/4 primary; odd meters allowed | SOFT |
| AL-T02 | BPM range | 80–110 BPM | SOFT |
| AL-T03 | Sweet spot | 90–100 BPM | SOFT preferred |
| AL-T04 | No fixed BPM rule | Tempo can float/experiment unlike commercial genres | SOFT |
| AL-T05 | Slow/introspective tracks | 70–85 BPM allowed | SOFT |
| AL-T06 | Grid resolution | 1/16th note; triplet grids allowed | SOFT |
| AL-T07 | 7/8 or 5/4 time | Allowed in experimental sections | SOFT |
| AL-T08 | Half-time feel | Common at 80–95 BPM | SOFT preferred |
| AL-T09 | Rubato passages | Allowed in intros and outros | SOFT |
| AL-T10 | Tempo automation | Allowed — intentional drift signals genre authenticity | SOFT |

---

## 2. SWING & HUMANIZATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AL-S01 | Overall swing ethos | Understated, laid-back — space > density | HARD |
| AL-S02 | Hi-hat swing | 55–70% | SOFT |
| AL-S03 | Kick swing | 3–10% | SOFT |
| AL-S04 | Melodic element swing | 50–65% | SOFT |
| AL-S05 | Intentional imperfection | Slight timing errors left in — not corrected | SOFT |
| AL-S06 | Live recording preference | Favor recorded imperfection over DAW programming | PREFERRED |
| AL-S07 | MIDI timing nudge | ±8–20ms — wider tolerance than other genres | SOFT |
| AL-S08 | Velocity randomization | ±15–25 velocity units (more variation than pop) | SOFT |
| AL-S09 | Anti-quantization rule | Never quantize to 100% on any element | HARD |
| AL-S10 | Space as groove | Silence and gaps ARE the groove — do not fill | HARD |
| AL-S11 | Sample-based percussion timing | Preserve original sample timing imperfections | SOFT |
| AL-S12 | Swing contrast | Different swing on lead vs rhythm instruments | SOFT |
| AL-S13 | Syncopated rests | Intentional 1–2 step rests in melody common | SOFT |
| AL-S14 | LFO timing modulation | Allowed on synth elements | SOFT |
| AL-S15 | No commercial bounce | Avoid the hyper-syncopated Afropop bounce | HARD |

---

## 3. DRUM PATTERN

| Rule ID | Instrument | Step Positions / Notes | Type |
|---|---|---|---|
| AL-D01 | Kick — sparse | Steps 1, 9 only (minimal) | SOFT |
| AL-D02 | Kick — variant A | Steps 1, 5, 11 | SOFT |
| AL-D03 | Kick — trap influence | Steps 1, 3.5, 7, 9 | SOFT |
| AL-D04 | Snare / 808 snare | Steps 5, 13 | SOFT |
| AL-D05 | Clap (lo-fi) | Steps 5, 13 at velocity 60–80 | SOFT |
| AL-D06 | Hi-hat — sparse | Steps 3, 7, 11, 15 only | SOFT |
| AL-D07 | Hi-hat — trap 32nd roll | Random 32nd rolls between steps | SOFT |
| AL-D08 | 808 bass hit | Steps 1, 5 (melodic, tuned) | SOFT |
| AL-D09 | Percussion — lo-fi drum | Vinyl-crackling drum samples | SOFT |
| AL-D10 | Rim shot | Steps 3, 11 | SOFT |
| AL-D11 | Shaker | Sparse — steps 1, 5, 9, 13 only | SOFT |
| AL-D12 | Live drum layer | Record one live drum take, leave imperfect | PREFERRED |
| AL-D13 | Electronic percussion | 808, TR-808 style elements allowed | SOFT |
| AL-D14 | Sample chop percussion | Use chopped samples as percussion hits | SOFT |
| AL-D15 | Max percussion layers | 3–4 total (sparse aesthetic) | HARD |
| AL-D16 | Blank bar rule | Leave one completely empty bar per 8 | SOFT |
| AL-D17 | Drum break | Allow 2–4 bar drum-only break | SOFT |
| AL-D18 | No hyper-syncopated Afropop pattern | Use simpler, more spacious patterns | HARD |
| AL-D19 | Noise layer | Add lo-fi vinyl crackle at –24 to –30 dBFS | SOFT |
| AL-D20 | Kick character | Warm, slightly lo-fi, not over-compressed | SOFT |

---

## 4. VELOCITY RULES

| Rule ID | Parameter | Value Range | Type |
|---|---|---|---|
| AL-V01 | Kick | 85–115 (not always at max) | SOFT |
| AL-V02 | Snare | 70–100 | SOFT |
| AL-V03 | Hi-hat | 40–80 (intentionally soft) | SOFT |
| AL-V04 | 808 bass | 90–120 | SOFT |
| AL-V05 | Melody | 55–100 (wide dynamic range) | SOFT |
| AL-V06 | Pad/atmosphere | 20–55 (barely audible) | SOFT |
| AL-V07 | Vocal sample chop | 70–100 | SOFT |
| AL-V08 | Lo-fi drum | 60–90 | SOFT |
| AL-V09 | Wide dynamic range | Δ 40+ velocity units across a bar allowed | SOFT |
| AL-V10 | No consistent loudness | Intentional dynamic variation — not uniform | HARD |

---

## 5. HARMONIC RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AL-H01 | Preferred modes | Dorian, Phrygian, minor pentatonic | SOFT |
| AL-H02 | Extended chords | m7, m9, Maj7#11, altered dominants | SOFT preferred |
| AL-H03 | 80s/90s R&B influence | Neo-soul chords: Maj9, minor 11ths | SOFT |
| AL-H04 | Chord progression — dark | i – bVII – bVI – bVII | SOFT |
| AL-H05 | Chord progression — neo-soul | I – iii – IV – ii | SOFT |
| AL-H06 | Chord progression — lo-fi | I – V – vi – IV (with 7ths) | SOFT |
| AL-H07 | Detuned instruments | ±10–20 cents intentional detune on synths | SOFT |
| AL-H08 | Borrowed chords | Chromatic mediants allowed | SOFT |
| AL-H09 | Atonal moments | Brief atonality allowed in experimental passages | SOFT |
| AL-H10 | Sample-based harmony | Chop and pitch vinyl samples for chords | SOFT preferred |
| AL-H11 | Vocal pitch | Intentionally breathy, slightly under pitch | NOTE |
| AL-H12 | Guitar style | Fingerpicked, ambient, reverb-drenched | SOFT |
| AL-H13 | Synth choice | Detuned polysynths, Rhodes, lo-fi samples | SOFT |
| AL-H14 | No predictable cadences | Avoid V – I resolutions — leave unresolved | SOFT |
| AL-H15 | Chord stab rhythm | Sparse, atmospheric — not aggressive | HARD |

---

## 6–7. BASS & ARRANGEMENT

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AL-B01 | Bass type | 808 sub OR sampled bass guitar | SOFT |
| AL-B02 | Bass role | Melodic, sparse — not constant | SOFT |
| AL-B03 | Bass timing | Behind beat — +10–20ms | SOFT |
| AL-B04 | Sub below 100 Hz | Mono | HARD |
| AL-B05 | Sidechain | Optional — lighter touch than Afropop | SOFT |
| AL-A01 | Total length | 2:00–4:00 | SOFT |
| AL-A02 | No rigid verse/chorus structure required | Sections can flow freely | SOFT |
| AL-A03 | Intro length | Long: 20–45 sec | SOFT |
| AL-A04 | Silence sections | Allowed — 2–4 sec near-silence | SOFT |
| AL-A05 | Loop-based structure | Hypnotic repeat structure acceptable | SOFT |

---

## 8–10. VOCAL, STEREO & INSTRUMENTATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AL-VC01 | Vocal style | Breathy, intimate, conversational | NOTE |
| AL-VC02 | Reverb | Large room: 2.5–5.0s decay | SOFT |
| AL-VC03 | Pitch correction | Minimal or none — natural pitch preferred | SOFT |
| AL-VC04 | Lo-fi vocal texture | Low-pass filter on doubles (LP at 8–10 kHz) | SOFT |
| AL-VC05 | Whisper vocals | Allowed — velocity 50–70 range | SOFT |
| AL-SP01 | Mix width | Wide — ±80° for most elements | SOFT |
| AL-SP02 | Sub bass | Mono below 100 Hz | HARD |
| AL-SP03 | Vinyl noise | Stereo or center, –24 dBFS | SOFT |
| AL-I01 | Guitar | Reverb-heavy, ambient, lo-fi | SOFT |
| AL-I02 | Synths | Detuned, warm, analog character | SOFT |
| AL-I03 | Drums | Lo-fi, compressed, slightly distant | SOFT |
| AL-I04 | Sample sources | Vinyl rips, field recordings, cassette tape | SOFT |
| AL-I05 | FX sounds | Reverse reverb, granular glitch, bit-crush | SOFT |

---
---

# GENRE 5: AFRO-TRAP
### Reference Artists: Zlatan, Naira Marley, Bella Shmurda, Olamide (trap era)

---

## 1. TEMPO & TIME SIGNATURE

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AT-T01 | Time signature | 4/4 | HARD |
| AT-T02 | BPM range | 90–110 BPM | SOFT |
| AT-T03 | Trap half-time feel | Kick at half-time = 45–55 BPM felt | SOFT |
| AT-T04 | Standard target BPM | 100–108 BPM | SOFT preferred |
| AT-T05 | Hi-hat resolution | 1/32nd notes for trap rolls | HARD |
| AT-T06 | Grid resolution | 1/32nd note (32-step for hi-hats) | HARD |
| AT-T07 | Triplet hi-hat pattern | Allowed: 1/8th note triplets | SOFT |
| AT-T08 | BPM for drill-influenced | 130–145 BPM (UK drill hybrid) | SOFT |
| AT-T09 | No four-on-floor kick | HARD | HARD |
| AT-T10 | Delay at 100 BPM (1/8 note) | 300ms | Reference |

---

## 2. SWING & HUMANIZATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AT-S01 | Hi-hat swing | 50–62% (trap style: straighter than Afropop) | SOFT |
| AT-S02 | 808 timing | Slightly behind beat +5–10ms | SOFT |
| AT-S03 | Kick swing | 0–5% | HARD |
| AT-S04 | Snare swing | 0–3% | HARD |
| AT-S05 | Hi-hat roll timing | Each roll note ±1–3ms micro-variation | SOFT |
| AT-S06 | Triplet feel | No swing needed on triplets — natural triplet feel | NOTE |
| AT-S07 | 808 glide | Portamento 20–80ms between notes | SOFT |
| AT-S08 | Velocity on trap rolls | Builds from 40 to 110 across roll | SOFT |
| AT-S09 | Chant/gang vocal timing | Slightly behind beat — drunken feel | SOFT |
| AT-S10 | Anti-mechanical rule | At least one humanized element per 2 bars | SOFT |

---

## 3. DRUM PATTERN

| Rule ID | Instrument | Notes | Type |
|---|---|---|---|
| AT-D01 | Kick — trap | Steps 1, 7 or 1, 5, 9 (half-time feel) | SOFT |
| AT-D02 | 808 kick | Deep, long sub tail — tuned to key | HARD |
| AT-D03 | Snare — trap | Step 9 only (every other bar) | SOFT |
| AT-D04 | Clap | Steps 5, 13 or just step 9 | SOFT |
| AT-D05 | Hi-hat — straight | All 16 steps | SOFT |
| AT-D06 | Hi-hat — 32nd roll | Triplet/32nd acceleration into step 1 | HARD |
| AT-D07 | Hi-hat open | Steps 7, 15 at velocity 80–100 | SOFT |
| AT-D08 | Hi-hat roll velocity ramp | 40 → 110 over 4–8 steps | HARD |
| AT-D09 | African drum layer | Add Afrobeats shaker/conga OVER trap drums | HARD |
| AT-D10 | Shaker (Afrobeats layer) | All 16 steps, swung at 60–65% | SOFT |
| AT-D11 | Talking drum accent | Steps 5, 9 | SOFT |
| AT-D12 | Tambourine | Steps 5, 13 | SOFT |
| AT-D13 | 808 kick pitch | Slides from root down 3–5 semitones | SOFT |
| AT-D14 | Snare reverb | Very short room (0.1–0.3s) | SOFT |
| AT-D15 | Percussion density | Less than pure Afrobeats — trap is sparser | SOFT |
| AT-D16 | Rim accent | Steps 3, 11 | SOFT |
| AT-D17 | Kick sub tail length | 400–800ms | SOFT |
| AT-D18 | No busy percussion | Max 4 layers at once | SOFT |
| AT-D19 | Kick at bar start | ALWAYS step 1 | HARD |
| AT-D20 | African hi-hat hybrid | Combine trap 32nd rolls with Afrobeats shaker | HARD |

---

## 4. VELOCITY RULES

| Rule ID | Parameter | Value Range | Type |
|---|---|---|---|
| AT-V01 | 808 kick | 110–127 | HARD |
| AT-V02 | Snare/clap | 100–120 | SOFT |
| AT-V03 | Hi-hat straight | 70–90 | SOFT |
| AT-V04 | Hi-hat roll: start | 35–50 | SOFT |
| AT-V05 | Hi-hat roll: peak | 100–120 | SOFT |
| AT-V06 | Shaker (Afrobeats layer) | 55–80 (sits under trap elements) | SOFT |
| AT-V07 | Talking drum | 70–90 | SOFT |
| AT-V08 | 808 bass note | 100–120 | SOFT |
| AT-V09 | Melody (flute/synth) | 75–100 | SOFT |
| AT-V10 | No flat velocity on 808 | Slight variation ±8 units minimum | SOFT |

---

## 5. HARMONIC RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AT-H01 | Scale preference | Minor pentatonic, natural minor | SOFT |
| AT-H02 | Chord progression — dark | i – bVII – bVI – v | SOFT |
| AT-H03 | Chord progression — Afro-trap standard | i – iv – bVII – bVI | SOFT |
| AT-H04 | Flute melody | High-register pentatonic runs | SOFT preferred |
| AT-H05 | 808 pitch glide | Stepwise motion, ±3–5 semitones | SOFT |
| AT-H06 | Synth character | Dark, minor, atmospheric pads | SOFT |
| AT-H07 | No happy/major sounds | Dark aesthetic throughout | SOFT |
| AT-H08 | Sample chops | Pitched vocal chops as melody | SOFT |
| AT-H09 | Key selection | Minor keys: G min, D min, A min | SOFT preferred |
| AT-H10 | Melodic range | 1 octave max — stays in pocket | SOFT |

---

## 6–10. REMAINING RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AT-B01 | 808 bass | Tuned, melodic sub — follows chord | HARD |
| AT-B02 | 808 portamento | 20–80ms glide | SOFT |
| AT-B03 | 808 mono | Below 100 Hz: mono only | HARD |
| AT-B04 | Sidechain | Kick triggers 808 duck: 8–15 dB | SOFT |
| AT-A01 | Track length | 2:00–3:30 | SOFT |
| AT-A02 | Intro type | Atmospheric synth + trap hi-hats only | SOFT |
| AT-A03 | Hook dominance | 50%+ of track is hook/chorus | SOFT |
| AT-VC01 | Vocal style | Rapid-fire Yoruba-English patois delivery | NOTE |
| AT-VC02 | Reverb | Short room, punchy | SOFT |
| AT-SP01 | 808 bass | Mono below 100 Hz | HARD |
| AT-SP02 | Hi-hat stereo | Slight spread ±15–25° | SOFT |
| AT-I01 | Flute | Breathy, pentatonic, staccato runs | SOFT |
| AT-I02 | 808 | Long sub-tail, tuned, slides | HARD |
| AT-I03 | Synth pads | Dark, minor, long sustain | SOFT |
| AT-I04 | Vocal chants | Group, slightly detuned layer | SOFT |
| AT-I05 | African drum layer | ALWAYS present over trap drums | HARD |

---
---

# GENRE 6: AFRO-HOUSE / AFRO-DANCE
### Reference Artists: Black Coffee, Themba, Enoo Napa, Louie Vega (Afro edit)

---

## 1. TEMPO & TIME SIGNATURE

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AH-T01 | Time signature | 4/4 | HARD |
| AH-T02 | BPM range | 118–128 BPM | SOFT |
| AH-T03 | Afro-house sweet spot | 122–126 BPM | SOFT preferred |
| AH-T04 | Deep Afro-house | 115–122 BPM | SOFT |
| AH-T05 | Reference: standard house | 122 BPM | Reference |
| AH-T06 | Four-on-the-floor kick | REQUIRED for Afro-house | HARD |
| AH-T07 | Grid resolution | 1/16th note | HARD |
| AH-T08 | Delay at 122 BPM (1/4 note) | 492ms | Reference |
| AH-T09 | Delay at 122 BPM (1/8 note) | 246ms | Reference |
| AH-T10 | No rubato | Rigid tempo for DJ mixing | HARD |
| AH-T11 | Tempo automation | Forbidden | HARD |
| AH-T12 | Minimum intro for DJ mix | 32-bar intro at full BPM | HARD |
| AH-T13 | Outro for DJ mix | 32-bar outro, stripped | HARD |
| AH-T14 | Maximum BPM | 128 BPM — above becomes peak-hour techno | HARD ceiling |
| AH-T15 | Minimum BPM | 115 BPM — below becomes Amapiano | HARD floor |

---

## 2. SWING & HUMANIZATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AH-S01 | Kick swing | 0% — four-on-floor must be rigid | HARD |
| AH-S02 | Percussion swing | 55–65% | SOFT |
| AH-S03 | Hi-hat swing | 52–62% | SOFT |
| AH-S04 | African percussion swing | 60–70% | SOFT |
| AH-S05 | Bassline timing | Slightly behind beat +5–8ms | SOFT |
| AH-S06 | Chord stab timing | On off-beat steps, slight swing | SOFT |
| AH-S07 | Vocal chop timing | On-grid snap | HARD |
| AH-S08 | Djembe timing | Natural feel: ±5–12ms off grid | SOFT |
| AH-S09 | Shaker humanization | ±4–10ms | SOFT |
| AH-S10 | No heavy swing on kick | Four-on-floor integrity must be maintained | HARD |
| AH-S11 | African perc layer swing contrast | Different swing % from house elements | SOFT |
| AH-S12 | Synth melody timing | ±3–8ms soft humanization | SOFT |
| AH-S13 | Velocity variation on hi-hats | ±15–20 velocity units across pattern | SOFT |
| AH-S14 | Groove extraction source | Extract from live Afro percussion recording | PREFERRED |
| AH-S15 | House grid vs African grid contrast | Intentional tension between two grids | NOTE |

---

## 3. DRUM PATTERN

| Rule ID | Instrument | Step Positions | Type |
|---|---|---|---|
| AH-D01 | Kick — four-on-floor | Steps 1, 5, 9, 13 | HARD |
| AH-D02 | Snare / clap | Steps 5, 13 (beats 2 and 4) | HARD |
| AH-D03 | Open hi-hat | Steps 3, 7, 11, 15 | SOFT |
| AH-D04 | Closed hi-hat | Steps 1, 3, 5, 7, 9, 11, 13, 15 | SOFT |
| AH-D05 | African djembe | Steps 3, 5, 9, 11 (crosses house grid) | SOFT |
| AH-D06 | Talking drum | Steps 7, 15 | SOFT |
| AH-D07 | Conga layer | Steps 3, 7, 10, 15 | SOFT |
| AH-D08 | Shaker | All 16, swung | HARD |
| AH-D09 | Cowbell / agogo | Steps 1, 4, 7, 10, 13 (5+3+5+3 pattern) | SOFT |
| AH-D10 | Clap layer | Steps 5, 13 (doubles snare) | SOFT |
| AH-D11 | Rimshot accent | Steps 4, 12 | SOFT |
| AH-D12 | Kick sub resonance | Kick rings at 50–70 Hz, 300–600ms | SOFT |
| AH-D13 | Snare character | Bright, house-style, slight reverb | SOFT |
| AH-D14 | Perc density in drop | 6–8 layers simultaneously | SOFT |
| AH-D15 | Perc density in breakdown | 1–2 layers only | SOFT |
| AH-D16 | African vs house perc contrast | African layers swing, house layers grid-locked | HARD |
| AH-D17 | Drum fill | 4-step build before drop | SOFT |
| AH-D18 | Filter on drums in breakdown | LP filter sweeps down from 10 kHz to 200 Hz | SOFT |
| AH-D19 | Kick punch | Transient > sub in house context | SOFT |
| AH-D20 | No purely electronic sound | At least 3 organic/acoustic percussion elements | HARD |

---

## 4. VELOCITY RULES

| Rule ID | Parameter | Value Range | Type |
|---|---|---|---|
| AH-V01 | Kick | 110–127 | HARD |
| AH-V02 | Snare | 100–120 | SOFT |
| AH-V03 | Open hi-hat | 80–100 | SOFT |
| AH-V04 | Closed hi-hat — accent | 85–100 | SOFT |
| AH-V05 | Closed hi-hat — weak | 55–70 | SOFT |
| AH-V06 | Djembe | 85–110 | SOFT |
| AH-V07 | Conga | 75–100 | SOFT |
| AH-V08 | Shaker strong | 90–110 | SOFT |
| AH-V09 | Shaker weak | 55–75 | SOFT |
| AH-V10 | Cowbell | 60–80 (subtle) | SOFT |
| AH-V11 | Vocal chop | 90–115 | SOFT |
| AH-V12 | Synth bass | 95–115 | SOFT |
| AH-V13 | Chord stab | 65–85 | SOFT |
| AH-V14 | Background atmosphere | 25–50 | SOFT |
| AH-V15 | Consecutive identical velocity ban | Δ ≥ 5 always | HARD |

---

## 5. HARMONIC RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AH-H01 | Key preference | Minor modes (Dorian, Aeolian) | SOFT preferred |
| AH-H02 | Chord progression — deep house | i – III – VII – IV | SOFT |
| AH-H03 | Chord progression — soulful | I – IV – iii – VI | SOFT |
| AH-H04 | Chord stab rhythm | Offbeat 16th-note stabs, never sustained | HARD |
| AH-H05 | Vocal chops | Pitched, diatonic to key | HARD |
| AH-H06 | Piano style | Soulful gospel-influenced runs | SOFT |
| AH-H07 | Synth bass character | Deep, warm, analog — not aggressive | SOFT |
| AH-H08 | African melodic element | Kalimba, thumb piano, or mbira line | SOFT |
| AH-H09 | Harmonic tension | Suspended chords before resolution | SOFT |
| AH-H10 | No major key anthemic feel | Avoid bright, euphoric house energy | SOFT |
| AH-H11 | Chord voicing | Open, airy voicings — not close position | SOFT |
| AH-H12 | Bass motion | Quarter-note pulses locked to kick | SOFT |
| AH-H13 | Chord change frequency | Every 2–4 bars | SOFT |
| AH-H14 | African melodic range | 1–1.5 octave range | SOFT |
| AH-H15 | Flute or lead synth | Optional high register melody | SOFT |

---

## 6. BASS & LOW-END RULES

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AH-B01 | Bass type | Deep house synth bass — warm and punchy | SOFT |
| AH-B02 | Bass pattern | Locks to kick: hits on steps 1, 5, 9, 13 | SOFT |
| AH-B03 | Bass syncopation | Add offbeat bass hits on steps 3, 7, 11 | SOFT |
| AH-B04 | Sub mono | Below 100 Hz: mono | HARD |
| AH-B05 | Sidechain depth | 4–8 dB (lighter than Afropop) | SOFT |
| AH-B06 | Sidechain release | 100–180ms | SOFT |
| AH-B07 | HP filter on all non-bass | 150 Hz | HARD |
| AH-B08 | Kick–bass tuning | Kick and bass tuned to same root | SOFT |
| AH-B09 | Bass frequency allocation | Bass owns 80–150 Hz; kick owns 50–75 Hz | SOFT |
| AH-B10 | Warm saturation | Light analog warmth on bass — not distortion | SOFT |

---

## 7. ARRANGEMENT STRUCTURE (CLUB/DJ FORMAT)

| Rule ID | Section | Duration (bars) | Energy (1–10) | Notes |
|---|---|---|---|---|
| AH-A01 | Intro | 32 bars | 2 | Perc only, no full kick |
| AH-A02 | Intro 2 | 16 bars | 4 | Kick enters |
| AH-A03 | Build 1 | 16 bars | 6 | Perc layers add |
| AH-A04 | Drop 1 | 32 bars | 10 | Full groove |
| AH-A05 | Breakdown | 16 bars | 2 | Drums stripped |
| AH-A06 | Build 2 | 16 bars | 7 | Filter sweep up |
| AH-A07 | Drop 2 | 32 bars | 10 | Full groove |
| AH-A08 | Outro | 32 bars | 2 | Gradual strip to perc only |
| AH-A09 | Total length | 7:00–10:00 (club) | — | DJ format |
| AH-A10 | Radio edit | 4:00–5:30 | — | Shorter edit |
| AH-A11 | No verse/chorus structure | Builds and drops replace verse/chorus | HARD |
| AH-A12 | Vocal style | Chopped, looped — not long phrases | SOFT |
| AH-A13 | Filter sweep timing | LP filter opens fully at bar 1 of drop | SOFT |
| AH-A14 | Riser before drop | White noise riser: 8–16 bars | SOFT |
| AH-A15 | Kick removal before drop | Mute kick for last 2 bars of build | SOFT |

---

## 8–10. VOCAL, STEREO & INSTRUMENTATION

| Rule ID | Parameter | Value | Type |
|---|---|---|---|
| AH-VC01 | Vocal style | Chopped, repetitive, hypnotic | NOTE |
| AH-VC02 | Reverb | Large: 2.5–4.0s decay | SOFT |
| AH-VC03 | Pitch correction | Musical auto-tune effect allowed | SOFT |
| AH-VC04 | Vocal chop grid | Snap to 1/8th or 1/16th note | HARD |
| AH-SP01 | Kick | Mono, center | HARD |
| AH-SP02 | African perc | ±20–50° alternating | SOFT |
| AH-SP03 | Synth pads | Wide: ±60–100° | SOFT |
| AH-SP04 | Vocal chops | Center ±10° | SOFT |
| AH-SP05 | Sub bass | Mono below 100 Hz | HARD |
| AH-I01 | Kick | Deep, house-weight, punchy transient | SOFT |
| AH-I02 | African percussion | Real/organic character — not synthetic | HARD |
| AH-I03 | Piano | Gospel-influenced, warm, slightly lo-fi | SOFT |
| AH-I04 | Synth bass | Analog warmth — no digital harshness | SOFT |
| AH-I05 | Atmospheric pads | Subtle, harmonic, long sustain | SOFT |

---

---

# MASTER REFERENCE TABLE
## Sub-Genre BPM Quick Reference

| Genre | BPM Min | BPM Max | Sweet Spot | Swing Range | Kick Pattern |
|---|---|---|---|---|---|
| Mainstream Afropop | 85 | 118 | 100–108 | 55–64% | Syncopated, NOT 4/4 |
| Amapiano | 108 | 118 | 115 | 52–68% | 4/4 or syncopated |
| Afrofusion | 80 | 115 | 90–100 | 55–68% | Syncopated / reggae |
| Alté | 70 | 110 | 90–100 | 50–70% | Sparse, experimental |
| Afro-Trap | 90 | 110 | 100–105 | 50–62% | Half-time trap |
| Afro-House | 115 | 128 | 122–126 | 52–65% | Four-on-floor REQUIRED |

---

## MASTER HARD RULES (Apply to ALL Genres)

| Rule ID | Rule |
|---|---|
| MASTER-01 | Sub-bass below 100 Hz: MONO ONLY. No exceptions. |
| MASTER-02 | No two consecutive percussion hits with identical velocity. Δ ≥ 5 minimum. |
| MASTER-03 | Never quantize melodic or rhythmic elements to 100% — imperfection is authenticity. |
| MASTER-04 | Clave pattern: 3+3+2 subdivision. Never evenly spaced 8th notes on percussion. |
| MASTER-05 | Kick drum EQ and bass EQ must be frequency-allocated to avoid collision at 55–70 Hz. |
| MASTER-06 | Sidechain bass to kick: bass ducks on kick transient. Minimum 4 dB duck. |
| MASTER-07 | High-pass filter ALL non-bass elements at minimum 150 Hz. |
| MASTER-08 | Swing maximum: 73%. Above this sounds stilted/stilted in all African groove contexts. |
| MASTER-09 | Lead vocal: CENTER (0°), MONO. Never panned. |
| MASTER-10 | Afrobeats is NOT hip-hop. No trap hi-hat without African percussion layer on top. |
| MASTER-11 | No atonal clusters. All notes diatonic to key unless genre explicitly allows (Alté). |
| MASTER-12 | The beat must SERVE the vocal. Leave frequency gaps (200–3000 Hz) for vocal body. |
| MASTER-13 | Reverb: always on aux/parallel send — never as direct insert. |
| MASTER-14 | No identical bars. Every 4-bar phrase must have at least 1 velocity or timing variation. |
| MASTER-15 | Log drum (Amapiano): tuned to key tonic or 5th. Never un-tuned. |

---

## GEMINI / AI MODEL PROMPT TEMPLATE

```
SYSTEM PROMPT — AFROBEATS PRODUCTION AI

Genre: [Choose: Afropop / Amapiano / Afrofusion / Alté / Afro-Trap / Afro-House]
BPM: [From genre BPM table above]
Key: [Choose key]
Time Signature: 4/4
Grid: 1/16th note (16-step), extend to 1/32nd for Afro-Trap hi-hats

HARD CONSTRAINTS (non-negotiable):
- Sub-bass below 100 Hz: MONO only
- Kick velocity: minimum 100 for all genres
- Consecutive identical velocities: forbidden (Δ ≥ 5 minimum)
- Clave: 3+3+2 subdivision — never even 8th notes
- Swing ceiling: 73% maximum
- Lead vocal: center channel, mono
- HP filter on all non-bass: 150 Hz

SWING SETTINGS:
- Kick: [0–5%]
- Hi-hat: [55–68% — from genre table]
- Shaker: [58–66%]
- Melodic elements: [50–65%]

DRUM PATTERN:
- Kick steps: [From genre drum table]
- Snare/rimshot steps: [From genre drum table]
- Shaker: all 16 steps, velocity alternated (downbeat: 90–110, upbeat: 50–70)

HARMONIC:
- Scale: [From genre harmonic table]
- Chord progression: [From genre harmonic table]
- Chord rhythm: syncopated off-beat stabs — no sustained blocks

BASS:
- Sidechain to kick: [duck depth dB from genre table], release [ms from genre table]
- Saturation: mid/upper harmonics only (100 Hz+)
- 808/log drum: tuned to key tonic or 5th

ARRANGEMENT:
- Total length: [From genre arrangement table]
- Verse: stripped back, kick may filter or mute
- Chorus: full density, all elements
- Breakdown: kick AND bass both removed

OUTPUT FORMAT: MIDI note data with velocity, timing offset (ms from grid), 
and swing parameter per track. Flag each rule applied.
```

---

*End of Ruleset — Version 1.0 | Generated November 2026*
*Source: Derived from BeatsToRapOn production guide + production research across BeatKey, MusicProductionWiki, Splice, VobesDJ, BPMCalc, and native-instruments.com*
