"use client";

import { useState } from "react";
import { Check, ArrowRight, TrendingUp, PenLine, SlidersHorizontal, Users, ShieldCheck, Play } from "lucide-react";

interface HowItWorksSectionProps {
  onTriggerAuthGate: (featureName: string) => void;
}

/**
 * Sandcastles "How it works" Interactive Section
 * Faithful recreation of media_1795525876242_d414e40a.png and media_1795525887939_c6a315b8.jpg:
 * - Title: "How it works"
 * - Subtitle: "Sandcastles handles the heavy lifting of idea research and scriptwriting so you can focus on bringing your short-form videos to life."
 * - Left: 4 Interactive Step selectors (STEP 1, STEP 2, STEP 3, STEP 4)
 * - Right: Dynamic Glassmorphic Card that updates as user selects each step
 */
export function HowItWorksSection({ onTriggerAuthGate }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      tag: "STEP 1",
      title: "Customize Your Feed",
      description: "Discover successful channels from Instagram, Tiktok, & YouTube Shorts",
    },
    {
      num: 2,
      tag: "STEP 2",
      title: "Find Outlier Videos",
      description: "Filter through millions of videos by views, engagement, and outlier score to identify viral patterns.",
    },
    {
      num: 3,
      tag: "STEP 3",
      title: "Understand Why They Went Viral",
      description: "Deconstruct the 0-3s hook factor, visual pacing, and storytelling mechanics that caused millions of views.",
    },
    {
      num: 4,
      tag: "STEP 4",
      title: "Write Winning Short-Form Scripts",
      description: "Generate tailored scripts with precise timing marks, bracketed beats, and multiple hook variations in seconds.",
    },
  ];

  return (
    <section id="how-it-works" className="relative w-full max-w-6xl mx-auto px-4 py-20 transition-all duration-300">
      {/* Header matching Image 9 */}
      <div className="text-left mb-14 max-w-3xl">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink">
          How it works
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-pencil leading-relaxed">
          CreatorLab handles the heavy lifting of idea research and scriptwriting so you can focus on bringing your short-form videos to life.
        </p>
      </div>

      {/* Split Layout matching Image 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: 4 Step Selectors */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {steps.map((s) => {
            const isActive = activeStep === s.num;
            return (
              <div
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer text-left border ${
                  isActive
                    ? "bg-white border-accent/60"
                    : "bg-white border-line hover:border-line"
                }`}
              >
                <span className="text-[10px] font-bold text-accent tracking-wider uppercase block mb-1">
                  {s.tag}
                </span>
                <h3 className={`text-base sm:text-lg font-bold ${isActive ? "text-ink" : "text-pencil"}`}>
                  {s.title}
                </h3>
                {isActive && (
                  <p className="mt-2 text-xs text-pencil leading-relaxed animate-in fade-in duration-200">
                    {s.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Interactive Showcase Card matching Image 10 */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl p-[1px] overflow-hidden min-h-[420px] flex items-center justify-center bg-ink">
            <div className="w-full h-full rounded-[23px] bg-white p-6 sm:p-8 flex flex-col justify-between">
              
              {/* STEP 1 Dynamic View: Watchlist & Top Channels matching Image 10 */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Top Hormozi Card from Image 10 */}
                  <div className="p-4 rounded-2xl bg-white border border-line flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-sm font-bold text-emerald-700">
                        H
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-ink">hormozi</span>
                        <span className="text-xs text-pencil">4.1M followers</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onTriggerAuthGate("Add Hormozi to Watchlist")}
                      className="px-4 py-1.5 rounded-xl bg-ink hover:bg-ink-soft text-white text-xs font-semibold shadow"
                    >
                      Add
                    </button>
                  </div>

                  {/* Channel Tag Pills from Image 10 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { name: "MrBeast", stat: "421M sub" },
                      { name: "zachking", stat: "82M fol" },
                      { name: "kayla_itsines", stat: "16M fol" },
                      { name: "MarkRober", stat: "69M sub" },
                      { name: "Kallaway", stat: "331K fol" },
                      { name: "Marques Brownlee", stat: "20.1M sub" },
                      { name: "jayshetty", stat: "17M fol" },
                      { name: "therealhammytv", stat: "17M fol" },
                    ].map((creator, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl bg-white border border-line text-left hover:border-accent/30 transition-colors"
                      >
                        <span className="text-[11px] font-bold text-ink block truncate">{creator.name}</span>
                        <span className="text-[9px] text-pencil">{creator.stat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-pencil">Over 2,500,000 indexed channels</span>
                    <button
                      type="button"
                      onClick={() => onTriggerAuthGate("Explore Creator Directory")}
                      className="text-accent hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Explore Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 Dynamic View: Outlier Video Finder */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">Real-Time Outlier Feed</span>
                    <span className="text-xs text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-500/20">
                      Live Algorithmic Sorting
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-white border border-line flex items-center gap-3">
                      <div className="w-12 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-sm font-bold text-accent">
                        105x
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-ink line-clamp-1">
                          Meet the tech row AI crawler
                        </span>
                        <span className="text-[10px] text-pencil">3.2M views &bull; 169K likes</span>
                        <span className="text-[10px] text-emerald-700 font-bold mt-1">105.3x Outlier</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-line flex items-center gap-3">
                      <div className="w-12 h-16 rounded-lg bg-emerald-50 flex items-center justify-center text-sm font-bold text-emerald-700">
                        89x
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-ink line-clamp-1">
                          The 3-second positioning framework
                        </span>
                        <span className="text-[10px] text-pencil">2.1M views &bull; 84K likes</span>
                        <span className="text-[10px] text-emerald-700 font-bold mt-1">89.2x Outlier</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-pencil">Filter by views, outlier ratio & platform</span>
                    <button
                      type="button"
                      onClick={() => onTriggerAuthGate("Inspect Outlier Database")}
                      className="text-accent hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Inspect Feed</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 Dynamic View: Viral Breakdown Factors */}
              {activeStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300 text-left">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span>Why This Worked: &ldquo;The 3-Second Rule&rdquo;</span>
                    </h4>
                    <span className="text-[10px] text-pencil">Performance Intelligence</span>{/* FR-38 to FR-42 */}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-line">
                      <span className="text-[10px] text-accent font-bold block mb-1">0-3s HOOK</span>
                      <p className="text-pencil text-[11px] leading-relaxed">
                        High contrast text overlay created instant tension loop.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-line">
                      <span className="text-[10px] text-emerald-700 font-bold block mb-1">PACING & CUTS</span>
                      <p className="text-pencil text-[11px] leading-relaxed">
                        1.8-second cuts prevented visual fatigue in the first 20s.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-line">
                      <span className="text-[10px] text-accent font-bold block mb-1">AUDIENCE TRIGGER</span>
                      <p className="text-pencil text-[11px] leading-relaxed">
                        Provocative industry debate question generated 3,400+ comments.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-pencil">AI breakdown generated on click</span>{/* (FR-39) */}
                    <button
                      type="button"
                      onClick={() => onTriggerAuthGate("Remix Video Idea")}
                      className="px-4 py-1.5 rounded-xl bg-ink hover:bg-ink-soft text-white text-xs font-semibold shadow"
                    >
                      Remix This Idea
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 Dynamic View: Script Studio & Hook Selector */}
              {activeStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-300 text-left">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h4 className="text-sm font-bold text-ink">
                      Creator Engine: 120s Script Studio
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Creator Engine Pipeline
                    </span>{/* FR-28 to FR-37 */}
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-line space-y-2 text-xs tabular-nums">
                    <div className="p-2 rounded bg-ink/40 border-l-2 border-accent text-ink">
                      <span className="text-accent font-bold">[0:00 - 0:03] HOOK:</span> &ldquo;Stop running paid ads before fixing this landing page flaw...&rdquo;
                    </div>
                    <div className="p-2 rounded bg-ink/40 border-l-2 border-emerald-500 text-ink">
                      <span className="text-emerald-700 font-bold">[0:03 - 0:25] CONTEXT:</span> &ldquo;Most creators burn budget sending mobile users to desktop layouts...&rdquo;
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-pencil">Zero storage of research notes</span>{/* (FR-33) */}
                    <button
                      type="button"
                      onClick={() => onTriggerAuthGate("Open Script Studio")}
                      className="px-4 py-1.5 rounded-xl btn-primary-kinetic text-white text-xs font-semibold"
                    >
                      Open Script Studio
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
