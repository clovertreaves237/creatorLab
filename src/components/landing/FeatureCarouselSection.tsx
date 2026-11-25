"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Search, Plus, PenLine, TrendingUp, Users } from "lucide-react";

interface FeatureCarouselSectionProps {
  onTriggerAuthGate: (featureName: string) => void;
}

/**
 * Sandcastles Feature Cards Section
 * Recreates media_1795525866857_21449144.jpg:
 * - Title: "Everything you need to create winning short-form videos"
 * - Arrow navigation buttons (←) (→)
 * - 4 Vertical feature cards matching Image 8:
 *   1. Discover successful channels in your niche
 *   2. Easily find winning videos from your favorite channels
 *   3. Generate dozens of winning hooks in seconds
 *   4. Build a feed of top-performing channels for easy analysis
 */
export function FeatureCarouselSection({ onTriggerAuthGate }: FeatureCarouselSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="features" className="relative w-full max-w-6xl mx-auto px-4 py-20 transition-all duration-300">
      {/* Header with Title and Carousel Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink max-w-2xl leading-tight">
          Everything you need to create winning short-form videos
        </h2>

        {/* Carousel Arrow Buttons from Image 8 */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous features"
            className="w-10 h-10 rounded-full bg-white border border-line hover:border-accent/50 text-pencil hover:text-ink flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next features"
            className="w-10 h-10 rounded-full bg-white border border-line hover:border-accent/50 text-pencil hover:text-ink flex items-center justify-center transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Vertical Feature Cards (Horizontal swipeable on mobile, grid on desktop) */}
      <div
        ref={scrollContainerRef}
        className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory"
      >
        {/* ----------------------------------------------------------- */}
        {/* CARD 1: Discover successful channels in your niche         */}
        {/* ----------------------------------------------------------- */}
        <div
          onClick={() => onTriggerAuthGate("Discover Successful Channels")}
          className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start rounded-2xl bg-white border border-line hover:border-accent/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer group"
        >
          {/* Visual Mockup from Image 8: Channel Tags */}
          <div className="rounded-xl bg-white border border-line p-3 mb-6 min-h-[190px] flex flex-col justify-center gap-2 overflow-hidden">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-line">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-600/30 text-red-700 font-bold text-[9px] flex items-center justify-center">N</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-ink">NasDaily</span>
                  <span className="text-[8px] text-pencil">11.9M subscribers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-line">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-600/30 text-pink-700 font-bold text-[9px] flex items-center justify-center">K</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-ink">kimkardashian</span>
                  <span className="text-[8px] text-pencil">361M followers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-line">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/30 text-accent font-bold text-[9px] flex items-center justify-center">MB</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-ink">MrBeast</span>
                  <span className="text-[8px] text-pencil">421M subscribers</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-ink mb-2 leading-snug">
              <span className="text-accent">Discover successful channels</span> in your niche
            </h3>
            <p className="text-xs text-pencil leading-relaxed">
              Learn from their success and replicate those tactics in your next video.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* CARD 2: Easily find winning videos from favorite channels   */}
        {/* ----------------------------------------------------------- */}
        <div
          onClick={() => onTriggerAuthGate("Find Winning Outlier Videos")}
          className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start rounded-2xl bg-white border border-line hover:border-accent/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer group"
        >
          {/* Visual Mockup from Image 8: Video Outlier Search */}
          <div className="rounded-xl bg-white border border-line p-3 mb-6 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white text-[9px] text-pencil mb-2">
              <Search className="w-3 h-3 text-pencil/70" />
              <span>Search</span>
            </div>

            <div className="flex items-center gap-1 text-[8px] mb-2">
              <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent">&gt; 1M views</span>
              <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent">10x - 200x outlier</span>
            </div>

            <div className="rounded-lg bg-white p-2 border border-line flex flex-col gap-1">
              <div className="h-16 rounded relative flex items-center justify-center bg-paper-deep">
                <span className="text-xl">🐕</span>
                <span className="absolute top-1 right-1 text-[7px] font-bold px-1 rounded bg-pink-600 text-white">IG</span>
              </div>
              <span className="text-[10px] font-bold text-ink truncate">World&apos;s Smartest Dog</span>
              <div className="flex items-center justify-between text-[8px] text-pencil">
                <span className="text-emerald-700 font-bold">37.6x</span>
                <span>29M</span>
                <span>8%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-ink mb-2 leading-snug">
              Easily <span className="text-accent">find winning videos</span> from your favorite channels
            </h3>
            <p className="text-xs text-pencil leading-relaxed">
              Explore a database with millions of validated outliers.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* CARD 3: Generate dozens of winning hooks in seconds         */}
        {/* ----------------------------------------------------------- */}
        <div
          onClick={() => onTriggerAuthGate("Generate Winning Hooks")}
          className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start rounded-2xl bg-white border border-line hover:border-accent/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer group"
        >
          {/* Visual Mockup from Image 8: Hook Cards */}
          <div className="rounded-xl bg-white border border-line p-3 mb-6 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div className="text-[10px] font-bold text-ink flex items-center gap-1 mb-2">
              <PenLine className="w-3 h-3 text-accent" />
              <span>Pick your favorite hook</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="p-1.5 rounded bg-white border border-accent/30 text-[8px] text-pencil">
                <span className="text-accent font-bold block mb-0.5">Option A</span>
                <span>This free AI tool from Google...</span>
              </div>
              <div className="p-1.5 rounded bg-white border border-line text-[8px] text-pencil">
                <span className="text-accent font-bold block mb-0.5">Option B</span>
                <span>This is going to change the world...</span>
              </div>
            </div>

            <div className="p-2 rounded bg-white border border-line text-[9px] text-pencil leading-relaxed line-clamp-3">
              &ldquo;This free AI tool from Google is a goldmine for creators. This is going to change the content world forever.&rdquo;
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-ink mb-2 leading-snug">
              Generate <span className="text-accent">dozens of winning hooks</span> in seconds
            </h3>
            <p className="text-xs text-pencil leading-relaxed">
              Eliminate guesswork by using hook templates that have millions of views.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* CARD 4: Build a feed of top-performing channels             */}
        {/* ----------------------------------------------------------- */}
        <div
          onClick={() => onTriggerAuthGate("Build Feed of Top Channels")}
          className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start rounded-2xl bg-white border border-line hover:border-accent/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer group"
        >
          {/* Visual Mockup from Image 8: Watchlist */}
          <div className="rounded-xl bg-white border border-line p-3 mb-6 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-bold text-ink mb-2">
              <span>Your Watchlist</span>
              <Plus className="w-3 h-3 text-accent" />
            </div>

            <div className="space-y-1.5">
              <div className="p-1.5 rounded bg-white border border-line flex items-center justify-between text-[9px]">
                <span className="text-ink font-medium">AI tech</span>
                <span className="text-accent font-bold">23 channels</span>
              </div>
              <div className="p-1.5 rounded bg-white border border-line flex items-center justify-between text-[9px]">
                <span className="text-ink font-medium">Fitness</span>
                <span className="text-accent font-bold">14 channels</span>
              </div>
              <div className="p-1.5 rounded bg-white border border-line flex items-center justify-between text-[9px]">
                <span className="text-ink font-medium">Meme accounts</span>
                <span className="text-accent font-bold">7 channels</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-ink mb-2 leading-snug">
              Build a feed of <span className="text-accent">top-performing channels</span> for easy analysis
            </h3>
            <p className="text-xs text-pencil leading-relaxed">
              Track any channel across Instagram, Tiktok and YouTube in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
