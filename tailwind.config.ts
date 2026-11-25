import type { Config } from "tailwindcss";

/**
 * CreatorLab — Sketchbook design system (based on the uilora "hand-drawn" kit).
 *
 * Use the semantic names below for ALL new pages and features:
 *   paper / paper-deep   page canvas and recessed panels
 *   white                cards, inputs, dropdowns
 *   ink                  primary text, borders, primary buttons
 *   pencil / pencil-light secondary / tertiary text
 *   line                 hairline dividers
 *   accent               the single blue brand accent (links, focus, "Lab")
 *   score                positive / outlier scores (green check colour)
 *   hl-*                 highlighter marks behind heading words, tag tints
 *
 * The legacy names (alabaster, mist, carbon, slate-rim, electric, cyber,
 * signal, obsidian) are kept as aliases so older code renders correctly.
 */
// Every colour is a CSS variable (RGB channels) so the three site themes can repaint everything.
// Values per theme live in src/app/themes.css; Sketchbook is the default (:root).
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;
const ink = v("ink");
const pencil = v("pencil");
const paper = v("paper");
const accent = v("accent");
const score = v("score");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        hand: ["var(--font-hand)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: { DEFAULT: paper, deep: v("paper-deep") },
        ink: { DEFAULT: ink, soft: v("ink-soft") },
        pencil: { DEFAULT: pencil, light: v("pencil-light") },
        line: v("line"),
        accent: { DEFAULT: accent, hover: v("accent-hover") },
        score,
        hl: {
          yellow: v("hl-yellow"),
          sky: v("hl-sky"),
          pink: v("hl-pink"),
          mint: v("hl-mint"),
          peach: v("hl-peach"),
          tape: v("hl-tape"),
        },

        // Legacy aliases, remapped to the sketchbook palette
        obsidian: { void: paper },
        carbon: { glass: "#FFFFFF", input: "#FFFFFF" },
        slate: { rim: ink },
        electric: { cobalt: accent, hover: v("accent-hover") },
        cyber: { cyan: accent },
        signal: { lime: score },
        alabaster: { pure: ink },
        mist: { cool: pencil },

        background: paper,
        foreground: ink,
        card: { DEFAULT: "#FFFFFF", foreground: ink },
        border: ink,
      },
      boxShadow: {
        // Hard offset "ink" shadows only. No glows.
        sketch: "3px 3px 0 rgb(var(--c-ink))",
        "sketch-sm": "2px 2px 0 rgb(var(--c-ink))",
        "sketch-lg": "6px 6px 0 rgb(var(--c-ink))",
        note: "0 10px 24px -8px rgb(var(--c-ink) / 0.25)",
        // Legacy names neutralised
        glow: "none",
        "glow-cyan": "none",
        "glow-lime": "none",
        innerHighlight: "none",
      },
      borderRadius: {
        "3xl": "1rem",
        "2xl": "0.875rem",
        xl: "0.75rem",
        lg: "0.5rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
