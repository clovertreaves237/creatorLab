"use client";

/**
 * Hand-drawn primitives (uilora "hand-drawn" kit, adapted for CreatorLab).
 * Pair these with the CSS primitives in globals.css (.sk-btn, .sk-card, .hl-*, …).
 */
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. THE ENGINE (Squiggle Filters) — mounted once in the root layout ---
export function HandDrawnFilters() {
  return (
    <svg className="fixed h-0 w-0 pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="rough-paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
        <filter id="pencil-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}

type HlColor = "yellow" | "sky" | "pink" | "mint" | "peach";

// A. Highlighter — a flat marker block behind a word (always visible, like the kit).
export function Highlight({ children, color = "yellow" }: { children: React.ReactNode; color?: HlColor }) {
  return <span className={`hl-${color}`}>{children}</span>;
}

// B. Hand-drawn button (uilora original; prefer the .sk-btn class for links).
export function SketchButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn("sk-btn px-8 py-4 text-base", className)} {...props}>
      {children}
    </button>
  );
}

// C. Sketch card — round arrow icon, bold title, grey body (Toolkit section).
export function SketchCard({
  title,
  children,
  icon,
  delay = 0,
  className,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      viewport={{ once: true }}
      className={cn("sk-card flex flex-col gap-5 p-9 text-left", className)}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-paper-deep">
        {icon ?? <ArrowRight className="h-6 w-6" />}
      </span>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg leading-relaxed text-pencil">{children}</p>
    </motion.div>
  );
}

// D. Drawn arrow with a handwritten note (hero decoration).
export function DrawnArrow({ label = "Look here!", className }: { label?: string; className?: string }) {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      aria-hidden="true"
      className={cn("hidden lg:block pointer-events-none select-none", className)}
    >
      <motion.path
        d="M8,28 C35,8 80,6 104,40 M86,36 L104,41 L102,20"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        style={{ filter: "url(#rough-paper)", stroke: "rgb(var(--c-ink))" }}
      />
      <motion.text
        x="10"
        y="70"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        style={{ fill: "rgb(var(--c-ink))" }}
        transform="rotate(8 10 70)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        {label}
      </motion.text>
    </svg>
  );
}

// E. Sticky note with red pin, serif italic text, round "avatar" dot.
export function StickyNote({
  quote,
  author,
  role,
  className,
}: {
  quote: string;
  author: string;
  role: string;
  className?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, rotate: -3 }}
      whileInView={{ opacity: 1, rotate: -1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("sticky-note mx-auto max-w-3xl text-left", className)}
      style={{ filter: "url(#rough-paper)" }}
    >
      <span className="sticky-pin" aria-hidden="true" />
      <blockquote className="font-serif italic text-2xl sm:text-[28px] leading-[1.6] text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4">
        <span className="h-14 w-14 shrink-0 rounded-full bg-hl-tape" aria-hidden="true" />
        <span>
          <span className="block font-bold text-lg text-ink">{author}</span>
          <span className="block text-pencil">{role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

// F. Yellow tape banner — big uppercase words separated by ✖.
export function TapeBanner({
  items = ["Branding & Marketing", "Faceless Content", "Startups & Founders", "Tech News", "Content Creation"],
  className,
}: {
  items?: string[];
  className?: string;
}) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={cn("tape-banner", className)}>
      <div className="flex w-max items-center gap-10 animate-marquee text-ink">
        {repeated.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="text-3xl sm:text-4xl font-black uppercase tracking-[0.06em]">{item}</span>
            <span className="text-xl font-black text-ink/60" aria-hidden="true">
              ✖
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// G. Checklist row — green outlined check + text, hairline divider.
export function HandCheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="sk-row text-lg sm:text-xl">
      <CheckCircle2 className="h-6 w-6 shrink-0 text-score" strokeWidth={2} />
      <span>{children}</span>
    </li>
  );
}
