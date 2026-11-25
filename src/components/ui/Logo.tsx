import React from "react";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** kept for API compatibility; the brand is a wordmark only */
  showText?: boolean;
  className?: string;
  brandName?: string;
}

const textSizes = {
  xs: "text-base",
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

/**
 * CreatorLab wordmark: ink "Creator" + accent-blue "Lab",
 * the same treatment as the sketchbook kit's "Sketch.io".
 */
export function Logo({ size = "md", className = "", brandName = "CreatorLab" }: LogoProps) {
  const split = brandName.endsWith("Lab") ? brandName.length - 3 : brandName.length;
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-tight leading-none select-none text-ink ${textSizes[size]} ${className}`}
    >
      {brandName.slice(0, split)}
      <span className="text-accent">{brandName.slice(split)}</span>
    </span>
  );
}

/**
 * Round monogram for avatars and small badges. Same look as the
 * kit's round icon buttons: ink outline on a light fill.
 */
export function LogoIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper-deep font-extrabold text-ink leading-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
    >
      C<span className="text-accent">L</span>
    </span>
  );
}
