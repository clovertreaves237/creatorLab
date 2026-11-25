"use client";

/**
 * CreatorLab loader: a sketchbook "pencil" animation in the brand palette.
 *
 * - general: an ink pencil line draws an endless loop (the Möbius / ∞ mark) while a highlighter
 *   stroke sweeps under it, cycling through the highlighter colours (yellow, sky, mint, pink, peach).
 *   A blue (accent) pencil tip leads the line.
 * - ai: three handwritten script lines are written one after another, with a highlight on the middle one
 *   (used while the Creator Engine writes).
 * Pure SVG + CSS (see .sk-loader in globals.css). Respects "reduce motion".
 *
 * Legacy asset map kept for older imports and the test suite:
 * - mobius-loop.mp4: general loader, mobius-ai.mp4: AI / script engine loader (no longer played).
 */
export const LEGACY_VIDEO_MAP = {
  general: "/loaders/mobius-loop.mp4",
  ai: "/loaders/mobius-ai.mp4",
};

interface MobiusLoaderProps {
  variant?: "general" | "ai";
  size?: "xs" | "sm" | "md" | "lg" | "fullscreen";
  label?: string;
  sublabel?: string;
  /** Kept for compatibility; the loader no longer plays video. */
  useVideo?: boolean;
  className?: string;
}

const WIDTH = { xs: 36, sm: 56, md: 96, lg: 132, fullscreen: 168 } as const;

// Hand-drawn infinity loop (slightly uneven, like a pencil sketch)
const LOOP = "M40 30 C33 19 24 13 16 15 C7 17 5 29 9 36 C13 44 26 44 33 37 C36 34 38 32 40 30 C43 27 46 23 51 20 C58 15 70 15 73 25 C76 35 69 45 59 45 C51 45 45 37 40 30";

export function MobiusLoader({ variant = "general", size = "md", label, sublabel, className = "" }: MobiusLoaderProps) {
  const w = WIDTH[size];
  const h = Math.round((w * 60) / 80);

  const art =
    variant === "ai" ? (
      <svg viewBox="0 0 80 60" width={w} height={h} className="sk-loader sk-loader--ai" aria-hidden="true">
        <rect className="sk-loader__hl" x="12" y="26" width="50" height="9" rx="3" />
        <path className="sk-loader__line sk-loader__line--1" pathLength={100} d="M10 18 c4 -3 7 3 11 0 s7 -3 11 0 s7 3 11 0 s7 -3 11 0 s6 2 12 0" />
        <path className="sk-loader__line sk-loader__line--2" pathLength={100} d="M10 31 c4 -3 7 3 11 0 s7 -3 11 0 s7 3 11 0 s6 -2 10 0" />
        <path className="sk-loader__line sk-loader__line--3" pathLength={100} d="M10 44 c4 -3 7 3 11 0 s7 -3 11 0 s5 2 8 0" />
      </svg>
    ) : (
      <svg viewBox="0 0 80 60" width={w} height={h} className="sk-loader" aria-hidden="true">
        <path className="sk-loader__hl-stroke" d="M8 47 C26 43 52 43 74 46" pathLength={100} />
        <path className="sk-loader__ghost" d={LOOP} />
        <path className="sk-loader__draw" d={LOOP} pathLength={100} />
        <circle className="sk-loader__tip" r="2.6" style={{ offsetPath: `path("${LOOP}")` }} />
      </svg>
    );

  const content = (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center ${className}`}>
      {art}
      {(label || sublabel) ? (
        <div className="mt-2 space-y-0.5 text-center">
          {label && <p className="text-xs font-semibold tracking-tight text-ink">{label}</p>}
          {sublabel && <p className="max-w-xs text-[10px] text-pencil">{sublabel}</p>}
        </div>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );

  if (size === "fullscreen") {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper p-4">{content}</div>;
  }
  return content;
}
