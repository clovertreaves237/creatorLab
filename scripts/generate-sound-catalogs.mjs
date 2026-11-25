// Generates training-rules/<niche>/sound.md for every niche: a niche sound profile + 1,000 unique
// background-instrumental recipes built from curated, niche-specific palettes.
// Run:  node scripts/generate-sound-catalogs.mjs
// Edit the palettes below and run again to regenerate. Output is deterministic (seeded).
import fs from "node:fs";
import path from "node:path";

const PER_NICHE = 1000;
const KEYS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

// Small seeded PRNG so the catalog is stable between runs
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const pickN = (r, arr, n) => {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) out.push(copy.splice(Math.floor(r() * copy.length), 1)[0]);
  return out;
};

// g(name, [bpmMin, bpmMax], scales, kit, drumFeels, bass, pads, leads, fx, moods)
const g = (name, bpm, scales, kit, drums, bass, pads, leads, fx, moods) => ({ name, bpm, scales, kit, drums, bass, pads, leads, fx, moods });

const NICHES = {
  "branding-marketing": {
    code: "BM",
    title: "Branding & Marketing",
    profile: `Sound for brand owners, marketers and businesses selling products or services, and for creators teaching
marketing. The music must feel **trustworthy, modern and confident**: it sells without shouting. Under a business
owner's ad it supports the product; under an educator it supports authority.

- **Tempo:** mostly 95 to 124 BPM (steady, confident). Slower (70 to 90) for brand stories and testimonials.
- **Scales:** major, mixolydian and dorian dominate; natural minor only for "costly mistake" or problem-led scripts.
- **Signature sounds:** clean four-on-the-floor kicks, claps on 2 and 4, plucks, marimba, warm pads, soft electric
  piano, light risers into the call to action. African-market content: afro-house, amapiano log drums, afrobeats
  percussion, highlife-style plucks.
- **Avoid:** dark or aggressive textures, horror tension, heavy distorted 808s, anything that sounds cheap or "meme".
- **Under the CTA:** resolve to the home chord, brightest moment of the track, confident and clean ending.`,
    useCases: ["product launch", "local shop promo", "restaurant / food ad", "service booking ad", "personal brand intro", "agency case study", "brand story", "testimonial / social proof", "pricing explainer", "sale or limited offer", "behind the scenes", "how-to marketing tip", "before and after transformation", "customer journey story", "WhatsApp order CTA", "event promo"],
    genres: [
      g("Corporate upbeat pop", [110, 124], ["major", "mixolydian"], "electronic", ["kick 4-on-floor, clap on 2 & 4, open hat offbeats", "kick on 1 & 3, claps, 16th closed hats"], ["pluck", "warm"], ["warm", "air"], ["pluck", "bell", "keys"], ["soft riser into CTA", "reverse cymbal at cuts", "clean impact on the payoff"], ["confident", "uplifting", "friendly", "optimistic", "premium", "clean"]),
      g("Afro-house groove", [112, 122], ["dorian", "minor", "major"], "afro", ["kick 4-on-floor, shaker 16ths, rim clicks, conga fills", "kick 4-on-floor, off-beat hats, tribal tom pattern"], ["warm", "pluck"], ["warm", "dark"], ["marimba", "kalimba", "pluck"], ["percussive fill before CTA", "filtered sweep", "light vinyl texture"], ["confident", "warm", "authentic", "celebratory", "smooth", "bold"]),
      g("Soft amapiano", [108, 115], ["dorian", "minor"], "afro", ["log-drum bass hits, shaker 16ths, sparse kick", "soft kick, shuffled shakers, rim on 2 & 4"], ["808", "warm"], ["warm", "air"], ["keys", "marimba"], ["log drum roll into CTA", "airy pad swell", "subtle whistle-like synth"], ["smooth", "cosy", "premium", "warm", "playful", "authentic"]),
      g("Afrobeats bounce", [96, 108], ["major", "mixolydian", "dorian"], "afro", ["syncopated kick, rim shots, shaker 16ths", "kick 1 & the 'and' of 2, clap 2 & 4, shekere pattern"], ["warm", "pluck"], ["warm"], ["pluck", "marimba", "kalimba"], ["percussion break", "light snare roll into CTA"], ["celebratory", "friendly", "warm", "energetic", "authentic", "playful"]),
      g("Lo-fi house", [118, 124], ["dorian", "minor"], "lofi", ["dusty 4-on-floor kick, soft clap, shuffled hats", "muted kick, side-stick, swung hats"], ["warm", "sub"], ["warm", "dark"], ["keys", "pluck"], ["vinyl crackle", "low-pass sweep", "tape stop at the end"], ["cosy", "smooth", "nostalgic", "calm", "authentic"]),
      g("Minimal tech house", [120, 126], ["minor", "dorian"], "electronic", ["tight 4-on-floor kick, off-beat open hat, rim shots", "kick 4-on-floor, 16th hats, sparse clap"], ["pluck", "sub"], ["glass", "dark"], ["pluck", "bell"], ["filtered riser", "white-noise sweep", "subtle glitch"], ["focused", "premium", "clean", "minimal", "confident"]),
      g("Deep house", [118, 124], ["minor", "dorian"], "electronic", ["soft 4-on-floor kick, clap on 2 & 4, shaker", "kick, open hat offbeats, conga accents"], ["warm", "sub"], ["warm", "strings"], ["keys", "pluck"], ["long pad swell", "soft riser"], ["smooth", "luxurious", "warm", "premium", "calm"]),
      g("Motivational cinematic pop", [90, 110], ["major", "minor"], "acoustic", ["big kick on 1, claps on 2 & 4, building toms", "half-time kick, snare on 3, risers"], ["warm", "sub"], ["strings", "warm"], ["keys", "bell"], ["orchestral riser", "big impact on reveal", "cymbal swell into CTA"], ["inspiring", "triumphant", "hopeful", "bold", "emotional"]),
      g("Chill pop", [92, 104], ["major", "lydian"], "electronic", ["kick 1 & 3, finger snaps 2 & 4, light hats", "soft kick, clap, shaker 8ths"], ["warm", "pluck"], ["air", "warm"], ["pluck", "kalimba", "keys"], ["gentle swell", "snap fill"], ["friendly", "calm", "optimistic", "playful", "clean"]),
      g("Uplifting piano house", [120, 124], ["major"], "electronic", ["4-on-floor kick, clap, open hats", "kick, claps, 16th shakers"], ["warm", "pluck"], ["warm", "air"], ["keys", "bell"], ["piano stab on reveal", "white-noise riser into CTA"], ["uplifting", "celebratory", "energetic", "optimistic", "inspiring"]),
      g("80s synth-pop", [104, 118], ["major", "minor"], "electronic", ["gated snare on 2 & 4, kick 1 & 3, 8th hats", "driving kick 8ths, snare backbeat"], ["pluck", "warm"], ["glass", "warm"], ["bell", "pluck"], ["gated reverb hit", "arp sweep"], ["nostalgic", "bold", "energetic", "playful"]),
      g("Clean minimal trap", [130, 145], ["minor", "dorian"], "808", ["half-time: kick 1, snare 3, hat triplet rolls", "half-time kick pattern, clap 3, 16th hats"], ["808", "sub"], ["dark", "warm"], ["bell", "pluck"], ["808 slide into CTA", "reverse crash"], ["bold", "confident", "edgy", "premium"]),
      g("Highlife-inspired pluck groove", [100, 112], ["major", "mixolydian"], "afro", ["kick 1 & 3, rim and bell pattern, shaker", "clave-style rim, soft kick, congas"], ["warm", "pluck"], ["warm"], ["pluck", "marimba"], ["bell pattern fill", "light percussion break"], ["joyful", "warm", "authentic", "celebratory", "friendly"]),
      g("Soft acoustic-style pluck pop", [84, 100], ["major"], "acoustic", ["light kick, finger snaps, shaker 8ths", "brushed snare, soft kick"], ["warm"], ["warm", "air"], ["pluck", "kalimba"], ["soft swell", "chime at CTA"], ["warm", "honest", "friendly", "hopeful", "calm"]),
    ],
  },

  "startups-founders": {
    code: "SF",
    title: "Startups & Founders",
    profile: `Sound for founders, builders and entrepreneurs: build-in-public updates, founder stories, pitch breakdowns,
lessons and launches. The music should feel **ambitious, honest and forward-moving**: the sound of building something,
not of a TV advert.

- **Tempo:** 70 to 100 BPM for stories and lessons (thoughtful), 100 to 124 BPM for launches and wins.
- **Scales:** minor and dorian for struggle and lessons, major and lydian for wins, vision and launches.
- **Signature sounds:** cinematic piano, soft strings, ambient pads, steady minimal pulses, lo-fi "late-night hustle"
  beats, slow builds that open up at the payoff.
- **Avoid:** party / club energy, playful cartoon sounds, horror tension, aggressive trap under reflective stories.
- **Arc:** start restrained (the problem / the struggle), build steadily, open up at the lesson or the win, resolve
  calmly under the CTA.`,
    useCases: ["founder story", "build in public update", "startup lesson", "pitch breakdown", "fundraising news", "product launch", "failure and comeback", "hiring / team culture", "day in the life", "metrics milestone", "bootstrapping advice", "vision statement", "customer discovery story", "investor tips", "app demo", "late-night grind"],
    genres: [
      g("Cinematic piano documentary", [64, 82], ["minor", "major"], "acoustic", ["no drums, soft heartbeat kick on 1", "light kick on 1 & 3, rim on 3"], ["warm", "sub"], ["strings", "warm"], ["keys"], ["slow string swell at the lesson", "soft impact on the reveal"], ["reflective", "emotional", "hopeful", "serious", "honest"]),
      g("Ambient electronic pulse", [80, 100], ["lydian", "minor"], "electronic", ["soft 8th pulse kick, sparse hats", "no kick, ticking 16th hats, soft clap"], ["sub", "warm"], ["air", "glass"], ["bell", "pluck"], ["slow filter sweep", "airy riser"], ["focused", "calm", "curious", "futuristic", "minimal"]),
      g("Inspirational build", [90, 110], ["major", "minor"], "acoustic", ["building toms, kick on 1, snare enters later", "half-time kick, snare on 3, crescendo hats"], ["warm"], ["strings", "warm"], ["keys", "bell"], ["long riser into the win", "big impact at the payoff"], ["inspiring", "triumphant", "hopeful", "bold", "determined"]),
      g("Lo-fi late-night hustle", [72, 88], ["dorian", "minor"], "lofi", ["dusty kick, lazy snare, swung hats", "boom-bap kick and snare, vinyl hats"], ["warm", "sub"], ["warm", "dark"], ["keys", "pluck"], ["vinyl crackle", "tape wobble"], ["focused", "cosy", "determined", "nostalgic", "calm"]),
      g("Minimal tech pulse", [110, 122], ["minor", "dorian"], "electronic", ["tight 4-on-floor kick, rim clicks", "kick 1 & 3, 16th hats, sparse clap"], ["pluck", "sub"], ["glass", "dark"], ["pluck", "bell"], ["glitch fill", "filtered riser"], ["focused", "clean", "minimal", "confident", "modern"]),
      g("Afro-soul instrumental", [88, 100], ["dorian", "major"], "afro", ["soft kick, shaker, rim on 2 & 4", "conga groove, light kick"], ["warm"], ["warm", "strings"], ["keys", "kalimba"], ["soft percussion fill", "warm pad swell"], ["warm", "authentic", "hopeful", "reflective", "proud"]),
      g("Hopeful indie-electronic", [96, 112], ["major", "lydian"], "electronic", ["kick 1 & 3, clap 2 & 4, shaker", "driving 8th kick, snare backbeat"], ["pluck", "warm"], ["air", "warm"], ["pluck", "bell"], ["sparkle riser", "reverse swell"], ["hopeful", "optimistic", "curious", "bright", "uplifting"]),
      g("Soft motivational trap", [130, 140], ["minor"], "808", ["half-time: kick 1, snare 3, light hat rolls", "sparse 808 kicks, clap 3"], ["808", "sub"], ["dark", "strings"], ["bell", "keys"], ["808 drop at the lesson", "reverse cymbal"], ["determined", "bold", "serious", "confident"]),
      g("Modern classical strings", [60, 78], ["minor", "major"], "acoustic", ["no drums", "soft timpani-style kick on 1"], ["warm"], ["strings"], ["keys", "bell"], ["string swell", "soft impact"], ["emotional", "serious", "inspiring", "reflective"]),
      g("Chillwave drive", [96, 110], ["major", "dorian"], "electronic", ["soft kick 4-on-floor, clap, chorus hats", "kick 1 & 3, snare 2 & 4, open hats"], ["warm", "pluck"], ["warm", "glass"], ["pluck", "bell"], ["tape sweep", "airy riser"], ["nostalgic", "calm", "hopeful", "dreamy"]),
      g("Focus beats", [84, 96], ["dorian", "major"], "lofi", ["steady soft kick, rim, 8th hats", "swung kick and snare"], ["sub", "warm"], ["warm", "air"], ["keys", "kalimba"], ["subtle vinyl", "low-pass fade"], ["focused", "calm", "productive", "steady"]),
      g("Synthwave ambition", [100, 118], ["minor", "major"], "electronic", ["gated snare backbeat, 8th kick drive", "kick 4-on-floor, clap, 16th hats"], ["pluck", "sub"], ["glass", "warm"], ["bell", "pluck"], ["arp riser", "gated impact"], ["determined", "bold", "futuristic", "energetic"]),
    ],
  },

  "faceless-content": {
    code: "FC",
    title: "Faceless Content",
    profile: `Sound for faceless channels: voice-over facts, stories, history, mysteries, motivation, top-10 lists and
explainers over B-roll. With no face on screen, the **music carries the emotion**, so it matters more here than in any
other niche. It must create atmosphere and curiosity while the narration leads.

- **Tempo:** 60 to 90 BPM for stories, mysteries and documentary; 85 to 100 for facts and lists; up to 140 half-time
  for high-energy motivation edits.
- **Scales:** minor, phrygian and dorian for mystery and tension; major and lydian for wonder and positive facts.
- **Signature sounds:** dark ambient pads, pulsing low drones, ticking hats, cinematic swells, lo-fi beats for
  study-style facts, clean phonk-style rhythms (no vocals) for motivation edits.
- **Avoid:** bright corporate pop, ad-style jingles, cluttered melodies that fight the narrator.
- **Arc:** tension under the question, a reveal moment (impact or drop), calmer resolve under the CTA.`,
    useCases: ["mystery story", "true story narration", "history facts", "top 10 list", "did you know facts", "motivational edit", "science explainer", "psychology facts", "space and universe", "documentary recap", "money and finance facts", "life lessons", "scary / creepy story (soft)", "nature and animals", "quotes and wisdom", "news recap"],
    genres: [
      g("Dark ambient", [60, 75], ["minor", "phrygian"], "electronic", ["no drums, low pulse on 1", "sparse sub hits, ticking hats"], ["sub"], ["dark", "air"], ["bell", "none"], ["deep impact on reveal", "reverse swell", "low rumble"], ["mysterious", "suspenseful", "dark", "curious", "serious"]),
      g("Mystery suspense pulse", [70, 90], ["phrygian", "minor"], "electronic", ["ticking 16th hats, kick on 1", "heartbeat kick, rim clicks"], ["sub", "pluck"], ["dark", "glass"], ["pluck", "bell"], ["tension riser", "hit on the reveal", "clock-tick texture"], ["suspenseful", "mysterious", "curious", "tense"]),
      g("Lo-fi study beats", [72, 88], ["dorian", "minor", "major"], "lofi", ["dusty kick, soft snare, swung hats", "boom-bap pattern, vinyl hats"], ["warm"], ["warm", "air"], ["keys", "kalimba"], ["vinyl crackle", "tape stop"], ["calm", "cosy", "focused", "curious", "nostalgic"]),
      g("Documentary cinematic", [64, 84], ["minor", "major"], "acoustic", ["no drums, soft kick swells", "light toms, kick on 1"], ["warm", "sub"], ["strings", "warm"], ["keys", "bell"], ["string swell", "soft impact"], ["serious", "emotional", "reflective", "epic"]),
      g("True-story heartbeat", [60, 72], ["minor"], "electronic", ["heartbeat kick pattern (x.x.....)", "kick on 1, soft rim on 3"], ["sub"], ["dark", "strings"], ["keys", "none"], ["low boom on reveal", "reverse piano"], ["tense", "emotional", "serious", "mysterious"]),
      g("Sci-fi ambient", [70, 92], ["lydian", "minor"], "electronic", ["sparse pulse, glitch ticks", "soft 8th kick, airy hats"], ["sub", "pluck"], ["glass", "air"], ["bell", "pluck"], ["space riser", "shimmer swell"], ["futuristic", "curious", "dreamy", "awe"]),
      g("Clean phonk-style rhythm (no vocals)", [130, 145], ["phrygian", "minor"], "808", ["cowbell-style 808 pattern, kick 1, snare 3", "half-time kick, 16th hats, clap 3"], ["808"], ["dark"], ["bell", "pluck"], ["808 slide", "drop at the payoff"], ["bold", "gritty", "energetic", "edgy", "determined"]),
      g("Dark trap half-time", [130, 142], ["minor", "phrygian"], "808", ["half-time kick 1, snare 3, hat triplets", "sparse 808, clap 3, rolls"], ["808", "sub"], ["dark", "strings"], ["bell", "pluck"], ["reverse crash", "808 drop"], ["dark", "bold", "intense", "serious"]),
      g("Epic orchestral-style", [80, 100], ["minor", "major"], "acoustic", ["building toms, big kick hits", "march-style snare, kick on 1"], ["warm", "sub"], ["strings", "warm"], ["bell", "keys"], ["huge impact", "long riser", "cymbal swell"], ["epic", "triumphant", "inspiring", "bold"]),
      g("Retro synthwave", [96, 112], ["minor", "dorian"], "electronic", ["gated snare backbeat, 8th kick", "4-on-floor kick, clap"], ["pluck", "sub"], ["glass", "warm"], ["bell", "pluck"], ["arp sweep", "gated hit"], ["nostalgic", "dreamy", "bold", "retro"]),
      g("Meditative drone", [60, 70], ["lydian", "major", "dorian"], "electronic", ["no drums", "very soft pulse on 1"], ["sub"], ["air", "warm"], ["bell", "kalimba"], ["slow swell", "chime"], ["calm", "reflective", "peaceful", "wise"]),
      g("Soft horror tension", [60, 76], ["phrygian", "minor"], "electronic", ["irregular low hits", "slow heartbeat kick"], ["sub"], ["dark"], ["bell", "none"], ["dissonant swell", "sudden impact", "creak-like noise"], ["creepy", "tense", "suspenseful", "dark"]),
      g("Curious facts groove", [88, 100], ["major", "dorian"], "electronic", ["kick 1 & 3, clap 2 & 4, 8th hats", "light kick, snaps, shaker"], ["pluck", "warm"], ["air", "warm"], ["pluck", "marimba", "kalimba"], ["pop swell", "tick fill"], ["curious", "playful", "light", "friendly"]),
    ],
  },

  "tech-news": {
    code: "TN",
    title: "Tech News",
    profile: `Sound for tech and AI news, gadget reviews, product breakdowns, developer tools and app launches. The music
must feel **current, precise and intelligent**: the sound of the future arriving, never cheesy.

- **Tempo:** 100 to 128 BPM for news and reviews (crisp, informed); 70 to 95 for deep explainers; 128 to 140
  (or half-time) for big reveals.
- **Scales:** minor and dorian (sleek, serious), lydian (wonder, futuristic), occasional major for positive launches.
- **Signature sounds:** clean electronic drums, glitchy hats, arpeggiated plucks, glassy bells, analog-style synth
  bass, futuristic pads, data-like ticks, short whooshes on transitions.
- **Avoid:** acoustic folk textures, sentimental orchestral swells, party afrobeats, horror tension.
- **Arc:** a crisp intro sting under the headline, a steady "information" groove under the explanation, a lift for the
  verdict or the "what this means", a clean button ending under the CTA.`,
    useCases: ["AI news update", "gadget review", "phone unboxing", "app launch", "developer tool breakdown", "tech explainer", "chip / hardware news", "startup tech news", "tutorial / how-to", "comparison video", "security / privacy alert", "future predictions", "tech deal alert", "software update news", "African tech scene news", "product teardown"],
    genres: [
      g("Futuristic electronic", [112, 126], ["minor", "lydian"], "electronic", ["tight 4-on-floor kick, glitch hats, clap 2 & 4", "kick 1 & 3, 16th hats, snare backbeat"], ["pluck", "sub"], ["glass", "air"], ["pluck", "bell"], ["whoosh transitions", "data-glitch fill", "riser into verdict"], ["futuristic", "focused", "clean", "curious", "precise"]),
      g("Glitch / IDM-lite", [96, 118], ["minor", "dorian"], "electronic", ["stuttered hats, kick 1 & 3", "glitchy 16th ticks, soft clap"], ["pluck", "sub"], ["glass", "dark"], ["bell", "pluck"], ["stutter fill", "bit-crush sweep"], ["curious", "edgy", "precise", "modern"]),
      g("Synthwave tech", [100, 116], ["minor", "dorian"], "electronic", ["gated snare, 8th kick drive", "4-on-floor kick, clap, 16th hats"], ["pluck", "sub"], ["glass", "warm"], ["bell", "pluck"], ["arp riser", "gated impact"], ["futuristic", "nostalgic", "bold", "energetic"]),
      g("Tech house news bed", [122, 126], ["minor", "dorian"], "electronic", ["4-on-floor kick, off-beat hats, rim", "kick, 16th hats, clap"], ["pluck", "sub"], ["dark", "glass"], ["pluck", "bell"], ["filtered riser", "white-noise sweep"], ["focused", "confident", "clean", "modern"]),
      g("Cyberpunk pulse", [118, 132], ["phrygian", "minor"], "electronic", ["driving 8th kick, snare backbeat, metallic hats", "4-on-floor kick, 16th hats"], ["808", "pluck"], ["dark", "glass"], ["bell", "pluck"], ["distorted sweep", "impact on reveal"], ["edgy", "futuristic", "bold", "intense"]),
      g("Ambient techno", [118, 124], ["dorian", "minor"], "electronic", ["soft 4-on-floor kick, rim clicks", "kick, open hats, shaker"], ["sub"], ["air", "glass"], ["bell", "pluck"], ["slow filter sweep", "airy swell"], ["calm", "focused", "minimal", "precise"]),
      g("Future garage", [128, 136], ["minor", "dorian"], "electronic", ["2-step shuffle kick, snare on 2 & 4 offset", "swung hats, shuffled kick"], ["sub", "warm"], ["dark", "air"], ["bell", "keys"], ["vinyl hiss", "reverse swell"], ["moody", "smooth", "curious", "modern"]),
      g("Minimal electro", [110, 122], ["minor"], "electronic", ["electro kick pattern, clap 2 & 4", "kick 1, 'and' of 2, 3, clap"], ["pluck", "808"], ["glass"], ["pluck", "bell"], ["laser zap fill", "short riser"], ["precise", "edgy", "clean", "focused"]),
      g("Corporate electronic news bed", [104, 118], ["major", "lydian"], "electronic", ["kick 1 & 3, clap 2 & 4, 16th hats", "4-on-floor kick, soft clap"], ["pluck", "warm"], ["air", "glass"], ["pluck", "bell"], ["news-sting impact", "clean riser"], ["informative", "optimistic", "clean", "confident"]),
      g("Half-time drum & bass", [160, 172], ["minor", "dorian"], "electronic", ["half-time: kick 1, snare 3, fast ghost hats", "breakbeat-style kick and snare"], ["sub", "808"], ["dark", "glass"], ["bell", "pluck"], ["reese-like sweep", "big impact"], ["energetic", "intense", "futuristic", "bold"]),
      g("Chillstep", [136, 144], ["minor", "lydian"], "electronic", ["half-time kick 1, snare 3", "sparse kick, clap 3, hat rolls"], ["sub", "warm"], ["air", "glass"], ["bell", "keys"], ["airy swell", "drop at the verdict"], ["dreamy", "calm", "futuristic", "hopeful"]),
      g("AI wonder pads", [70, 90], ["lydian", "major"], "electronic", ["no drums, soft pulse", "light ticks, soft kick on 1"], ["sub"], ["air", "glass"], ["bell", "pluck"], ["shimmer riser", "soft impact"], ["awe", "curious", "futuristic", "calm"]),
      g("Lo-fi electronic", [82, 96], ["dorian", "minor"], "lofi", ["dusty kick, soft clap, bit-crushed hats", "swung kick and snare"], ["warm", "pluck"], ["warm", "glass"], ["keys", "pluck"], ["bit-crush sweep", "vinyl texture"], ["calm", "focused", "cosy", "curious"]),
    ],
  },

  "content-creation": {
    code: "CC",
    title: "Content Creation",
    profile: `Sound for creators teaching creation: filming, editing, scripting, growth, gear and creator business, plus
vlogs and behind-the-scenes. The music should feel **creative, upbeat and relatable**, the "creator economy" sound of
YouTube and TikTok edits.

- **Tempo:** 85 to 100 BPM for tutorials and talking-head tips; 100 to 124 for vlogs, edits and growth content.
- **Scales:** major, mixolydian and dorian (bright, cool); minor for "mistake" or "why your videos fail" scripts.
- **Signature sounds:** lo-fi and boom-bap beats, chill pop, tropical and future-bass plucks, amapiano and afrobeats
  grooves for African creators, snaps, claps, risers on cuts, "whoosh" transitions.
- **Avoid:** heavy corporate jingles, dark horror tension, long cinematic builds under quick tips.
- **Arc:** a punchy intro under the hook, a steady relaxed groove under the tips, a small lift on the result /
  before-after, a clean ending under the CTA.`,
    useCases: ["editing tutorial", "filming tips", "hook writing tips", "growth strategy", "gear review", "vlog", "behind the scenes", "day in the life", "before and after edit", "script writing tips", "algorithm explainer", "creator business tips", "phone filming hacks", "storytelling tips", "content planning", "transition showcase"],
    genres: [
      g("Lo-fi hip-hop", [72, 90], ["dorian", "minor", "major"], "lofi", ["dusty kick, lazy snare, swung hats", "boom-bap kick and snare, vinyl hats"], ["warm"], ["warm", "air"], ["keys", "pluck"], ["vinyl crackle", "tape stop at the end"], ["cosy", "calm", "focused", "relatable", "nostalgic"]),
      g("Vlog chill pop", [96, 110], ["major", "mixolydian"], "electronic", ["kick 1 & 3, snaps 2 & 4, shaker", "soft 4-on-floor, clap, light hats"], ["pluck", "warm"], ["air", "warm"], ["pluck", "kalimba", "bell"], ["whoosh at cuts", "soft riser"], ["friendly", "upbeat", "relatable", "playful", "optimistic"]),
      g("Tropical house", [100, 115], ["major", "mixolydian"], "electronic", ["4-on-floor kick, clap, shaker 16ths", "kick, off-beat hats, rim"], ["pluck", "warm"], ["warm", "air"], ["marimba", "pluck", "kalimba"], ["pluck riser", "white-noise sweep"], ["sunny", "upbeat", "playful", "relaxed"]),
      g("Amapiano creator groove", [108, 115], ["dorian", "minor"], "afro", ["log-drum bass, shaker 16ths, sparse kick", "soft kick, shuffled shakers, rim"], ["808", "warm"], ["warm", "air"], ["keys", "marimba"], ["log drum roll", "pad swell"], ["smooth", "cool", "authentic", "cosy", "playful"]),
      g("Afrobeats vlog", [96, 108], ["major", "mixolydian"], "afro", ["syncopated kick, rim, shaker 16ths", "kick, clap 2 & 4, shekere"], ["warm", "pluck"], ["warm"], ["pluck", "marimba", "kalimba"], ["percussion break", "snare roll"], ["joyful", "energetic", "authentic", "celebratory"]),
      g("Boom bap", [86, 96], ["minor", "dorian"], "lofi", ["boom-bap kick on 1 & the 'and' of 2, snare 2 & 4", "swung kick, hard snare, 8th hats"], ["warm", "sub"], ["warm", "dark"], ["keys", "pluck"], ["scratch-like noise fill", "tape stop"], ["confident", "gritty", "cool", "authentic"]),
      g("Light trap edit", [130, 144], ["minor", "dorian"], "808", ["half-time kick 1, snare 3, hat rolls", "808 pattern, clap 3, 16th hats"], ["808"], ["dark", "glass"], ["bell", "pluck"], ["808 drop on reveal", "reverse cymbal"], ["bold", "energetic", "cool", "edgy"]),
      g("Future bass pop", [140, 150], ["major", "lydian"], "electronic", ["half-time kick 1, snare 3, rolls", "kick, clap 3, 16th hats"], ["sub", "pluck"], ["glass", "air"], ["bell", "pluck"], ["supersaw-style swell", "drop on the result"], ["euphoric", "bright", "energetic", "hopeful"]),
      g("Bedroom pop instrumental", [84, 98], ["major", "dorian"], "lofi", ["soft kick, brush-like snare, shaker", "light kick, snaps"], ["warm"], ["warm", "air"], ["keys", "kalimba"], ["tape wobble", "soft swell"], ["dreamy", "warm", "relatable", "nostalgic"]),
      g("House groove", [118, 124], ["dorian", "major"], "electronic", ["4-on-floor kick, clap, open hats", "kick, 16th hats, rim"], ["pluck", "warm"], ["warm", "glass"], ["keys", "pluck"], ["filter sweep", "riser on the result"], ["energetic", "confident", "upbeat", "cool"]),
      g("Jazzy lo-fi", [70, 84], ["dorian", "major"], "lofi", ["swung kick, rim, brushed hats", "lazy kick, soft snare"], ["warm"], ["warm"], ["keys"], ["vinyl crackle", "room tone"], ["cosy", "smooth", "calm", "thoughtful"]),
      g("Hype edit energy", [124, 132], ["minor", "mixolydian"], "electronic", ["driving 4-on-floor, claps, 16th hats", "kick 8ths, snare 2 & 4, rolls"], ["808", "pluck"], ["glass", "dark"], ["bell", "pluck"], ["riser into drop", "impact on cut"], ["energetic", "bold", "intense", "exciting"]),
      g("Chill R&B instrumental", [70, 86], ["dorian", "minor"], "lofi", ["soft kick, snap 2 & 4, rolling hats", "laid-back kick, rim"], ["warm", "sub"], ["warm", "air"], ["keys", "bell"], ["soft swell", "reverse keys"], ["smooth", "warm", "relaxed", "intimate"]),
    ],
  },
};

function buildCatalog(nicheId, niche, seed) {
  const r = rng(seed);
  const seen = new Set();
  const lines = [];
  let i = 0;
  let guard = 0;
  while (lines.length < PER_NICHE && guard < PER_NICHE * 50) {
    guard++;
    const genre = niche.genres[i % niche.genres.length];
    i++;
    const [lo, hi] = genre.bpm;
    const bpm = lo + Math.round(r() * (hi - lo));
    const key = pick(r, KEYS);
    const scale = pick(r, genre.scales);
    const moods = pickN(r, genre.moods, 2 + Math.floor(r() * 2)).join(", ");
    const drums = pick(r, genre.drums);
    const bass = pick(r, genre.bass);
    const pad = pick(r, genre.pads);
    const lead = pick(r, genre.leads);
    const fx = pick(r, genre.fx);
    const use = pick(r, niche.useCases);
    const sig = `${genre.name}|${bpm}|${key}|${scale}|${moods}|${lead}|${use}`;
    if (seen.has(sig)) continue;
    seen.add(sig);
    const id = `${niche.code}-${String(lines.length + 1).padStart(4, "0")}`;
    lines.push(
      `${id} | ${genre.name} | ${bpm} BPM | ${key} ${scale} | mood: ${moods} | kit: ${genre.kit}; ${drums} | bass: ${bass} | pad: ${pad} | lead: ${lead} | fx: ${fx} | best for: ${use}`
    );
  }
  return lines;
}

const root = process.cwd();
let seed = 20261126;
for (const [nicheId, niche] of Object.entries(NICHES)) {
  const lines = buildCatalog(nicheId, niche, seed++);
  const genreList = niche.genres.map((x) => `- **${x.name}**: ${x.bpm[0]} to ${x.bpm[1]} BPM, ${x.scales.join(" / ")}, kit ${x.kit}; moods: ${x.moods.join(", ")}`).join("\n");
  const doc = `<!-- CreatorLab SOUND file for niche "${nicheId}". Used ONLY by the sound composer, never by the script writer. Generated by scripts/generate-sound-catalogs.mjs -->
# Background Sound: ${niche.title}

> NICHE LOCK: this file applies only to **${niche.title}** (\`${nicheId}\`). When composing for this niche, use only
> this profile and these recipes. Never use sound guidance from another niche's file.

## 1. Sound profile

${niche.profile}

## 2. Genres used in this niche

${genreList}

## 3. Recipe format

\`ID | genre | tempo | key and scale | mood | kit and drum feel | bass | pad | lead | fx | best for\`

Kits, pads, leads and bass values map directly to the CreatorLab renderer (see core/sound.md, section 9).

## 4. Recipes (${lines.length})

${lines.join("\n")}
`;
  const out = path.join(root, "training-rules", nicheId, "sound.md");
  fs.writeFileSync(out, doc);
  console.log(`${nicheId}: ${lines.length} recipes, ${(doc.length / 1024).toFixed(0)} KB -> ${path.relative(root, out)}`);
}
