import React from "react";

/**
 * CreatorLab brand: the pen-nib mark + the "Creator" / "Lab" wordmark.
 * Single source of truth for every logo in the app. Static copies live in public/brand/.
 *
 * Mark geometry (64 x 64 grid): a fountain-pen nib tilted 45° as if writing. The breather hole is the
 * brand accent; the slit runs from the hole to the tip. Cut-outs use even-odd fill, so the one-colour
 * versions keep the hole and slit transparent and read on any background.
 */
const NIB_PATH =
  "M18 4H46A6 6 0 0 1 52 10V22Q52 26 50.4 29.6L37 56.4Q32 64.6 27 56.4L13.6 29.6Q12 26 12 22V10A6 6 0 0 1 18 4Z M32 22A7 7 0 1 0 32 36A7 7 0 1 0 32 22Z M30.5 35.8H33.5L32 60.5Z";
const NIB_TRANSFORM = "translate(25.3 38.7) rotate(45) translate(-32 -32)";

export type LogoVariant = "color" | "black" | "white";

interface LogoMarkProps {
  /** Width and height in px. */
  size?: number;
  /** color = theme ink + accent hole; black = one colour (currentColor, ink by default); white = for dark backgrounds. */
  variant?: LogoVariant;
  className?: string;
  /** Accessible name. Leave out when the mark sits next to the wordmark or a labelled link (decorative). */
  title?: string;
}

/** The pen-nib mark on its own. */
export function LogoMark({ size = 24, variant = "color", className = "", title }: LogoMarkProps) {
  const nibFill = variant === "white" ? "#FFFFFF" : "currentColor";
  const colorClass = variant === "white" ? "" : "text-ink";
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`shrink-0 ${colorClass} ${className}`}
      focusable="false"
      {...a11y}
    >
      {title && <title>{title}</title>}
      <g transform={NIB_TRANSFORM}>
        <path fill={nibFill} fillRule="evenodd" d={NIB_PATH} />
        {variant === "color" && <circle cx="32" cy="29" r="7" fill="var(--accent)" />}
      </g>
    </svg>
  );
}

const WORD_SIZES = {
  xs: { text: "text-base", mark: 18, gap: "gap-1.5" },
  sm: { text: "text-xl", mark: 24, gap: "gap-2" },
  md: { text: "text-2xl", mark: 28, gap: "gap-2" },
  lg: { text: "text-3xl", mark: 34, gap: "gap-2.5" },
  xl: { text: "text-4xl", mark: 42, gap: "gap-3" },
} as const;

interface LogoProps {
  size?: keyof typeof WORD_SIZES;
  variant?: LogoVariant;
  /** Hide the mark (wordmark only). */
  showMark?: boolean;
  className?: string;
  brandName?: string;
}

/**
 * Mark + wordmark: ink "Creator" + accent-blue "Lab" (white variant: all white).
 * The visible text is the accessible name, so the mark is decorative here.
 */
export function Logo({ size = "md", variant = "color", showMark = true, className = "", brandName = "CreatorLab" }: LogoProps) {
  const s = WORD_SIZES[size];
  const split = brandName.endsWith("Lab") ? brandName.length - 3 : brandName.length;
  const textColor = variant === "white" ? "text-white" : "text-ink";
  const labColor = variant === "color" ? "text-accent" : "";
  return (
    <span className={`inline-flex items-center ${s.gap} select-none ${className}`}>
      {showMark && <LogoMark size={s.mark} variant={variant} />}
      <span className={`font-extrabold tracking-tight leading-none ${textColor} ${s.text}`}>
        {brandName.slice(0, split)}
        <span className={labColor}>{brandName.slice(split)}</span>
      </span>
    </span>
  );
}

/** Round badge with the mark: avatars (the AI in Creator Engine) and status pages (404, errors, empty states). */
export function LogoBadge({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper-deep ${className}`}
      style={{ width: size, height: size }}
    >
      <LogoMark size={Math.round(size * 0.62)} />
    </span>
  );
}
