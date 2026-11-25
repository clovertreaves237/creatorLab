"use client";

import { SoundPlan, chordToMidi, degreeToMidi, notePitchClass, Layer } from "./plan";

/**
 * Renders a SoundPlan to audio in the browser. Everything is synthesised: no samples, no downloads,
 * nothing stored on the server.
 *
 * How (fast on any phone or laptop):
 *  1. Every distinct sound in the plan (the kick, a hat, each chord, each melody note, each bass note length...)
 *     is synthesised ONCE with Tone.js in a tiny offline render.
 *  2. Those one-shots are placed on the timeline and mixed in plain JavaScript.
 *  3. One native convolver pass adds the room (reverb), then a soft limiter and fades finish the track.
 * (Scheduling thousands of notes into a single Web Audio graph instead took minutes for a 2-minute track.)
 */

const SR = 44100;
const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

type ToneLib = typeof import("tone");

interface Hit {
  sound: string; // one-shot key
  t: number; // seconds
  gain: number;
  pan: number; // -1..1
  send: number; // reverb amount 0..1
}

/** Synthesises one sound into a mono buffer (build() runs inside a fresh offline context). */
async function oneShot(Tone: ToneLib, seconds: number, build: (T: ToneLib) => void): Promise<Float32Array> {
  const original = Tone.getContext();
  const ctx = new Tone.OfflineContext(1, Math.max(0.05, seconds), SR);
  Tone.setContext(ctx);
  try {
    build(Tone);
  } finally {
    Tone.setContext(original);
  }
  const buf = await (ctx.rawContext as OfflineAudioContext).startRendering();
  return buf.getChannelData(0);
}

export async function renderSoundPlan(plan: SoundPlan): Promise<AudioBuffer> {
  const Tone = await import("tone");

  const barSec = (4 * 60) / plan.bpm;
  const stepSec = barSec / 16;
  const end = plan.duration;
  const kit = plan.drums.kit;
  const keyPc = notePitchClass(plan.key) ?? 0;
  const bp = plan.bass.preset;
  const pp = plan.pad.preset;
  const lp = plan.lead.preset;

  // ---------- 1. Timeline of hits ----------
  const sectionAt = (t: number) => plan.sections.find((s) => t >= s.start && t < s.end) || plan.sections[plan.sections.length - 1];
  const has = (t: number, layer: Layer) => sectionAt(t).layers.includes(layer);
  const vel = (t: number, base: number) => Math.min(1, base * (0.5 + 0.5 * sectionAt(t).energy));

  const hits: Hit[] = [];
  const shots = new Map<string, { seconds: number; build: (T: ToneLib) => void }>();
  const def = (key: string, seconds: number, build: (T: ToneLib) => void) => {
    if (!shots.has(key)) shots.set(key, { seconds, build });
    return key;
  };

  // Drum one-shots (lo-fi kit gets a darker tone)
  const drumOut = (T: ToneLib) => (kit === "lofi" ? new T.Filter(4200, "lowpass").toDestination() : T.getDestination());
  const kickKey = def("kick", kit === "808" ? 1.2 : 0.6, (T) => {
    new T.MembraneSynth({
      pitchDecay: kit === "808" ? 0.08 : 0.05,
      octaves: kit === "808" ? 8 : 6,
      envelope: { attack: 0.001, decay: kit === "808" ? 0.9 : kit === "lofi" ? 0.3 : 0.4, sustain: 0, release: 0.1 },
      volume: kit === "lofi" ? -6 : -3,
    })
      .connect(drumOut(T))
      .triggerAttackRelease(kit === "808" ? midiToFreq(24 + keyPc) : "C1", "8n", 0.001);
  });
  const snareKey = def("snare", 0.4, (T) => {
    const f = new T.Filter(kit === "afro" ? 3200 : 1800, "bandpass").connect(drumOut(T));
    new T.NoiseSynth({
      noise: { type: kit === "lofi" || kit === "acoustic" ? "pink" : "white" },
      envelope: { attack: 0.001, decay: kit === "afro" ? 0.07 : 0.18, sustain: 0 },
      volume: kit === "afro" ? -14 : -12,
    })
      .connect(f)
      .triggerAttackRelease(0.05, 0.001);
  });
  const hatKey = (open: boolean) =>
    def(open ? "ohat" : "hat", open ? 0.4 : 0.12, (T) => {
      const f = new T.Filter(kit === "lofi" ? 6000 : 8000, "highpass").connect(drumOut(T));
      new T.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: open ? 0.25 : 0.04, sustain: 0 },
        volume: open ? -26 : -22,
      })
        .connect(f)
        .triggerAttackRelease(0.02, 0.001);
    });
  const percKey = def("perc", 0.3, (T) => {
    new T.MembraneSynth({ pitchDecay: 0.01, octaves: 2, envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.05 }, volume: -16 })
      .connect(drumOut(T))
      .triggerAttackRelease(kit === "afro" ? "G3" : "A3", "16n", 0.001);
  });

  const bassKey = (midi: number, steps: number) => {
    const dur = steps * stepSec * 0.95;
    return def(`bass:${midi}:${steps}`, dur + 0.4, (T) => {
      new T.MonoSynth({
        oscillator: { type: bp === "pluck" ? "square" : bp === "warm" ? "triangle" : "sine" },
        envelope:
          bp === "pluck"
            ? { attack: 0.005, decay: 0.2, sustain: 0, release: 0.1 }
            : bp === "808"
              ? { attack: 0.005, decay: 1.2, sustain: 0.3, release: 0.3 }
              : { attack: 0.01, decay: 0.3, sustain: 0.8, release: 0.2 },
        filter: { type: "lowpass", Q: 1 },
        filterEnvelope: {
          attack: 0.005, decay: 0.2, sustain: bp === "pluck" ? 0.1 : 0.6, release: 0.2,
          baseFrequency: bp === "pluck" ? 300 : 180, octaves: bp === "pluck" ? 3 : 1.5,
        },
        volume: bp === "808" ? -8 : -10,
      })
        .toDestination()
        .triggerAttackRelease(midiToFreq(midi), dur, 0.001);
    });
  };

  const padRelease = pp === "air" ? 3 : 1.8;
  const padKey = (chordName: string, dur: number) =>
    def(`pad:${chordName}:${dur.toFixed(3)}`, dur + padRelease + 0.2, (T) => {
      const notes = chordToMidi(chordName).notes.map(midiToFreq);
      const filter = new T.Filter(pp === "dark" ? 600 : pp === "strings" ? 2200 : pp === "glass" ? 4000 : 1400, "lowpass").toDestination();
      const synth =
        pp === "glass"
          ? new T.PolySynth(T.FMSynth, { harmonicity: 2, modulationIndex: 2.5, envelope: { attack: 0.4, decay: 0.5, sustain: 0.7, release: 1.5 }, volume: -20 })
          : new T.PolySynth(T.Synth, {
              oscillator: { type: pp === "strings" || pp === "dark" ? "sawtooth" : pp === "air" ? "sine" : "triangle" },
              envelope: { attack: pp === "air" ? 1.5 : pp === "strings" ? 0.9 : 0.6, decay: 0.5, sustain: 0.8, release: padRelease },
              volume: pp === "strings" || pp === "dark" ? -24 : -18,
            });
      synth.connect(filter).triggerAttackRelease(notes, dur, 0.001);
    });

  const leadKey = (midi: number) =>
    def(`lead:${midi}`, lp === "bell" ? 2.4 : 1.2, (T) => {
      const synth =
        lp === "bell"
          ? new T.FMSynth({ harmonicity: 3.01, modulationIndex: 8, envelope: { attack: 0.001, decay: 1.2, sustain: 0, release: 1 }, volume: -20 })
          : lp === "keys"
            ? new T.FMSynth({ harmonicity: 1, modulationIndex: 1.5, envelope: { attack: 0.005, decay: 0.8, sustain: 0.2, release: 0.6 }, volume: -18 })
            : new T.Synth({
                oscillator: { type: lp === "pluck" ? "triangle" : "sine" },
                envelope: { attack: 0.001, decay: lp === "kalimba" ? 0.5 : lp === "marimba" ? 0.3 : 0.25, sustain: 0, release: 0.2 },
                volume: -16,
              });
      synth.toDestination().triggerAttackRelease(midiToFreq(midi), stepSec * 2, 0.001);
    });

  const totalSteps = Math.floor(end / stepSec);
  const melodyBars = plan.lead.melody.length / 16;
  const add = (sound: string, t: number, gain: number, pan = 0, send = 0) => {
    if (t < end - 0.05) hits.push({ sound, t, gain, pan, send });
  };

  for (let i = 0; i < totalSteps; i++) {
    const t = i * stepSec;
    const step = i % 16;
    const bar = Math.floor(i / 16);
    const chordName = plan.chords[bar % plan.chords.length];
    const chord = chordToMidi(chordName);
    const swing = kit === "lofi" && step % 2 === 1 ? stepSec * 0.18 : 0;

    if (has(t, "drums")) {
      if (plan.drums.kick[step] === "x") add(kickKey, t, vel(t, 1));
      if (plan.drums.snare[step] === "x") add(snareKey, t, vel(t, 0.9), 0, 0.2);
      if (plan.drums.openHat[step] === "x") add(hatKey(true), t + swing, vel(t, 0.7), 0.25);
      else if (plan.drums.hat[step] === "x") add(hatKey(false), t + swing, vel(t, step % 4 === 0 ? 0.8 : 0.55), 0.25);
      if (plan.drums.perc[step] === "x") add(percKey, t + swing, vel(t, 0.7), -0.3);
    }
    if (has(t, "bass") && plan.bass.pattern[step] === "x") {
      let len = 1;
      while (len < 8 && step + len < 16 && plan.bass.pattern[step + len] !== "x") len++;
      add(bassKey(chord.root - (bp === "sub" || bp === "808" ? 12 : 0), len), t, vel(t, 0.9));
    }
    if (step === 0 && has(t, "pad")) {
      const dur = Math.min(barSec * 0.98, end - t - 0.02);
      if (dur > 0.1) add(padKey(chordName, dur), t, vel(t, 0.7), 0, 0.35);
    }
    if (lp !== "none" && has(t, "lead")) {
      const degree = plan.lead.melody[(bar % melodyBars) * 16 + step];
      if (degree > 0) add(leadKey(degreeToMidi(degree, plan.key, plan.scale)), t, vel(t, 0.75), -0.15, 0.3);
    }
  }

  // Riser into the last section (the call to action) and impacts at section starts
  const last = plan.sections[plan.sections.length - 1];
  if (plan.fx.riserIntoLastSection && plan.sections.length > 1 && last.start > 2) {
    const len = Math.min(barSec * 2, 4, last.start - 0.5);
    const key = def(`riser:${len.toFixed(3)}`, len + 0.2, (T) => {
      const f = new T.Filter(200, "highpass").toDestination();
      f.frequency.setValueAtTime(200, 0);
      f.frequency.exponentialRampToValueAtTime(6000, len);
      new T.NoiseSynth({ noise: { type: "white" }, envelope: { attack: len, decay: 0.01, sustain: 1, release: 0.05 }, volume: -26 })
        .connect(f)
        .triggerAttackRelease(len, 0.001, 0.8);
    });
    add(key, last.start - len, 1, 0, 0.4);
  }
  if (plan.fx.impactAtSectionStarts) {
    const key = def("impact", 1.8, (T) => {
      new T.MembraneSynth({ pitchDecay: 0.2, octaves: 4, envelope: { attack: 0.001, decay: 1.4, sustain: 0, release: 0.5 }, volume: -10 })
        .toDestination()
        .triggerAttackRelease(midiToFreq(24 + keyPc), 1, 0.001, 0.8);
    });
    for (const s of plan.sections.slice(1)) if (s.start < end - 0.5) add(key, s.start, 1, 0, 0.3);
  }

  // ---------- 2. Synthesise each distinct sound once ----------
  const entries = Array.from(shots.entries());
  const rendered = await Promise.all(entries.map(([, s]) => oneShot(Tone, s.seconds, s.build)));
  const buffers = new Map(entries.map(([key], i) => [key, rendered[i]]));

  // ---------- 3. Mix ----------
  const len = Math.round(end * SR);
  const L = new Float32Array(len);
  const R = new Float32Array(len);
  const send = new Float32Array(len);
  for (const h of hits) {
    const src = buffers.get(h.sound);
    if (!src) continue;
    const start = Math.round(h.t * SR);
    const n = Math.min(src.length, len - start);
    const gl = h.gain * Math.min(1, 1 - h.pan);
    const gr = h.gain * Math.min(1, 1 + h.pan);
    const gs = h.gain * h.send;
    for (let k = 0; k < n; k++) {
      const v = src[k];
      L[start + k] += v * gl;
      R[start + k] += v * gr;
      if (gs) send[start + k] += v * gs;
    }
  }

  // Reverb: one native convolver pass over the send bus
  const wet = await convolve(send, pp === "air" ? 3.2 : 2.2);
  const wetGain = 0.6;
  for (let k = 0; k < len; k++) {
    L[k] += wet[0][k] * wetGain;
    R[k] += wet[1][k] * wetGain;
  }

  // Soft limiter + fades (sits under a voice, never clips)
  let peak = 0;
  for (let k = 0; k < len; k++) peak = Math.max(peak, Math.abs(L[k]), Math.abs(R[k]));
  const pre = peak > 0 ? 1.15 / peak : 1;
  const norm = Math.tanh(1.15);
  const fadeIn = Math.round(0.03 * SR);
  const fadeOut = Math.round(0.8 * SR);
  for (let k = 0; k < len; k++) {
    let g = 0.89 / norm;
    if (k < fadeIn) g *= k / fadeIn;
    if (k > len - fadeOut) g *= Math.max(0, (len - k) / fadeOut);
    L[k] = Math.tanh(L[k] * pre) * g;
    R[k] = Math.tanh(R[k] * pre) * g;
  }

  const out = new AudioBuffer({ length: len, numberOfChannels: 2, sampleRate: SR });
  out.copyToChannel(L, 0);
  out.copyToChannel(R, 1);
  return out;
}

/** Stereo reverb from a generated impulse response (decaying, slightly darkened noise). */
async function convolve(mono: Float32Array, seconds: number): Promise<[Float32Array, Float32Array]> {
  const ctx = new OfflineAudioContext(2, mono.length, SR);
  const irLen = Math.round(seconds * SR);
  const ir = ctx.createBuffer(2, irLen, SR);
  let seed = 12345;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    let lp = 0;
    for (let k = 0; k < irLen; k++) {
      lp += 0.35 * (rand() - lp); // gentle low-pass for a warmer room
      d[k] = lp * Math.pow(1 - k / irLen, 2.5);
    }
  }
  const src = ctx.createBufferSource();
  const input = ctx.createBuffer(1, mono.length, SR);
  input.getChannelData(0).set(mono);
  src.buffer = input;
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  src.connect(conv).connect(ctx.destination);
  src.start(0);
  const res = await ctx.startRendering();
  return [res.getChannelData(0), res.getChannelData(1)];
}

/** 16-bit PCM WAV. */
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const channels = buffer.numberOfChannels;
  const length = buffer.length;
  const bytesPerSample = 2;
  const dataSize = length * channels * bytesPerSample;
  const out = new ArrayBuffer(44 + dataSize);
  const view = new DataView(out);
  const writeStr = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * channels * bytesPerSample, true);
  view.setUint16(32, channels * bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  const data = Array.from({ length: channels }, (_, c) => buffer.getChannelData(c));
  let o = 44;
  for (let i = 0; i < length; i++) {
    for (let c = 0; c < channels; c++) {
      const s = Math.max(-1, Math.min(1, data[c][i]));
      view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      o += 2;
    }
  }
  return new Blob([out], { type: "audio/wav" });
}
