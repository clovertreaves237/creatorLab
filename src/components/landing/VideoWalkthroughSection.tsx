"use client";

import { useState } from "react";
import { Play, X, ArrowRight, TrendingUp, Sliders, CheckCircle2 } from "lucide-react";

interface VideoWalkthroughSectionProps {
  onTriggerAuthGate: (featureName: string) => void;
}

/**
 * Sandcastles Walkthrough Showcase Section
 * Replicates media_1795525808766_c6eea5d1.jpg and media_1795525852096_ef90e699.jpg:
 * - Left: Curved doodle arrow "WATCH VIDEO", title, subtitle, "Try It Risk-Free" button
 * - Right: Interactive video frame with app dashboard, outlier metrics, creator overlay, and "Watch walkthrough" trigger
 */
export function VideoWalkthroughSection({ onTriggerAuthGate }: VideoWalkthroughSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="walkthrough" className="relative w-full max-w-6xl mx-auto px-4 py-16 transition-all duration-300">
      {/* Large Glassmorphic Card Container matching Image 4 & 5 */}
      <div className="relative rounded-2xl p-[1px] overflow-hidden bg-ink">
        <div className="rounded-[23px] bg-white p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Doodle Arrow, CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left relative">
            {/* Doodle "WATCH VIDEO" with curved arrow from Image 4 */}
            <div className="flex items-center gap-2 mb-3 text-pencil/80">
              <span className="text-[11px] font-bold tracking-widest uppercase tabular-nums text-accent">
                WATCH VIDEO
              </span>
              <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                <path d="M2 18C12 2 28 3 38 12M38 12L31 11M38 12L36 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Headline matching Image 4 */}
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink leading-[1.18]">
              Learn how to grow faster on social media using CreatorLab
            </h2>

            {/* Subtitle matching Image 4 */}
            <p className="mt-4 text-xs sm:text-sm text-pencil leading-relaxed">
              Follow these steps to build a scalable workflow in less than 40 minutes
            </p>

            {/* CTA Button matching Image 4 */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onTriggerAuthGate("Try CreatorLab Risk-Free")}
                className="btn-primary-kinetic px-8 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span>Try It Risk-Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Embedded Walkthrough Frame matching Image 4 & 7 */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl bg-white border border-line p-3 overflow-hidden aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group">
              
              {/* Background Mockup Frame from Image 7 */}
              <div className="absolute inset-0 bg-white flex opacity-85 pointer-events-none select-none">
                {/* Left Mini Sidebar */}
                <div className="w-1/3 border-r border-line p-3 text-[9px] text-pencil space-y-2 hidden sm:block">
                  <div className="font-bold text-ink text-[10px] mb-1">Configure</div>
                  <div className="p-1 rounded bg-ink/[0.04] text-ink">Channels</div>
                  <div className="p-1">Persona</div>
                  <div className="p-1">Settings</div>

                  <div className="pt-2 border-t border-line space-y-1.5">
                    <span className="block text-ink font-semibold">Views</span>
                    <div className="h-1 bg-ink/[0.06] rounded w-full" />
                    <span className="block text-ink font-semibold">Engagement: 2% - 100%</span>
                    <div className="h-1 bg-ink rounded w-2/3" />
                    <span className="block text-ink font-semibold">Posted in last 9 Months</span>
                  </div>
                </div>

                {/* Right Video Grid Preview */}
                <div className="flex-1 p-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white p-1.5 border border-line flex flex-col justify-between">
                    <div className="h-12 rounded bg-blue-100 relative flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white bg-ink/40 px-1 rounded">99.1x</span>
                    </div>
                    <span className="text-[9px] text-ink font-medium truncate mt-1">
                      This is now, game over...
                    </span>
                    <div className="text-[8px] text-pencil flex justify-between">
                      <span>@heysirio</span>
                      <span className="text-emerald-700 font-bold">12M views</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-1.5 border border-line flex flex-col justify-between">
                    <div className="h-12 rounded bg-amber-50 relative flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white bg-ink/40 px-1 rounded">89.2x</span>
                    </div>
                    <span className="text-[9px] text-ink font-medium truncate mt-1">
                      Unaware use = reflexively...
                    </span>
                    <div className="text-[8px] text-pencil flex justify-between">
                      <span>@askcatgpt</span>
                      <span className="text-emerald-700 font-bold">11M views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Outlier Stat Badge from Image 4 */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-500/30 text-[10px] font-bold text-emerald-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>53.7x outlier score &bull; 3.2M views</span>
              </div>

              {/* Creator Face Cam overlay in bottom right matching Image 4 & 7 */}
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-16 h-20 sm:w-24 sm:h-28 rounded-xl border-2 border-line overflow-hidden flex flex-col items-center justify-end p-1 z-10 bg-paper-deep">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-paper-deep flex items-center justify-center text-xs font-bold text-ink shadow">
                  👤
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-white bg-ink/40 px-1 rounded mt-1">
                  Creator Lab
                </span>
              </div>

              {/* Center "▶ Watch walkthrough" Button matching Image 4 */}
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="relative z-20 px-5 py-2.5 rounded-full bg-white hover:bg-ink-soft border border-line hover:border-ink text-white text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-ink group-hover:bg-white text-white group-hover:text-accent flex items-center justify-center transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch walkthrough</span>
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Player */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-white border border-line rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-line">
              <h3 className="text-sm font-bold text-ink">
                CreatorLab Workflow Walkthrough
              </h3>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="p-1 rounded-full text-pencil hover:text-ink hover:bg-ink/[0.06]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <video
                src="/loaders/mobius-loop.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
