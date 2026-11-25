"use client";

import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, TrendingUp, Eye, Heart, MessageCircle, Users, Play, PenLine, Check, Plus, ArrowRight, ExternalLink } from "lucide-react";

interface LandingVisualMockupProps {
  onTriggerAuthGate: (featureName: string) => void;
}

/**
 * Pixel-Perfect Hero Visual Centerpiece
 * Faithful recreation of media_1795525773457_ad0e1639.jpg:
 * 1. Base Layer: Explorer App Dashboard with Search & Filter Pills and Video Grid
 * 2. Floating Card 1 (Top-Left): Outlier Performance Metrics (105.3x, 3.2M, 11%, 169K, 1.6K, 331K)
 * 3. Floating Card 2 (Top-Right): Creator Watchlist Card (@hormozi, 4.1M followers, Add to watchlist)
 * 4. Floating Card 3 (Middle-Right): Script Length Slider (60s, 130-160 words interactive slider)
 * 5. Floating Card 4 (Bottom-Left): Hook Writer Selector (Option 1 & 2 TSMC Initial Context Shock)
 * 6. Floating Card 5 (Bottom-Right): Script Version Diff Comparison (Previous vs Current script)
 *
 * Fluid mobile-first architecture: stacks smoothly and scales cleanly on phones, shines on laptops and projectors.
 */
export function LandingVisualMockup({ onTriggerAuthGate }: LandingVisualMockupProps) {
  // Interactive micro-states
  const [scriptDuration, setScriptDuration] = useState<number>(60);
  const [selectedHook, setSelectedHook] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"feed" | "ideas" | "script">("feed");
  const [watchlistAdded, setWatchlistAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const wordCountEstimate = Math.round(scriptDuration * 2.5);

  return (
    <div className="relative w-full max-w-6xl mx-auto my-4 transition-all duration-300">
      {/* Outer ambient glow behind the mockup */}

      {/* Main Glassmorphic Studio Frame */}
      <div className="relative rounded-2xl p-[1px] overflow-hidden bg-ink">
        <div className="rounded-[23px] bg-white p-3 sm:p-6 lg:p-8 flex flex-col gap-6 relative">
          
          {/* Top Tabs Bar: Allows direct switching between Explore Feed, Review Ideas, and Create Script */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-line">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-line">
              <button
                type="button"
                onClick={() => setActiveTab("feed")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "feed"
                    ? "bg-ink text-white"
                    : "text-pencil hover:text-ink"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-ink/[0.06] text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Explore feed</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ideas")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "ideas"
                    ? "bg-ink text-white"
                    : "text-pencil hover:text-ink"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-ink/[0.06] text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Review ideas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("script")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "script"
                    ? "bg-ink text-white"
                    : "text-pencil hover:text-ink"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-ink/[0.06] text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Create script</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-pencil hidden sm:inline">
                Live Engine: <strong className="text-accent font-semibold">10.4x Outlier Outperforming</strong>
              </span>
              <button
                type="button"
                onClick={() => onTriggerAuthGate("Open Live CreatorLab Explorer")}
                className="text-xs text-accent hover:text-accent font-medium inline-flex items-center gap-1"
              >
                <span>Live Studio</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Search Bar & Filter Controls Header matching Image 1 */}
          <div className="flex flex-col gap-3">
            {/* Search Input Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-2xl bg-white border border-line">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-pencil border-b sm:border-b-0 sm:border-r border-line shrink-0 cursor-pointer hover:text-ink transition-colors">
                <span>Basic search</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 flex items-center px-3 py-1 gap-2">
                <Search className="w-4 h-4 text-pencil/70 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="your niche, and why it worked."
                  className="w-full bg-transparent text-xs text-ink placeholder:text-pencil/60 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => onTriggerAuthGate("Search Database of Millions of Outliers")}
                className="btn-primary-kinetic px-5 py-2 rounded-xl text-white text-xs font-semibold shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Search</span>
              </button>
            </div>

            {/* Filter Pills from Image 1 */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => onTriggerAuthGate("Filter Views")}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-deep border border-line text-pencil hover:text-ink transition-colors"
              >
                <span>Views</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => onTriggerAuthGate("Filter Platform")}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-deep border border-line text-pencil hover:text-ink transition-colors"
              >
                <span>Platform</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-medium">
                <span>&gt; 2x outlier</span>
                <span className="text-accent text-[10px] cursor-pointer">&times;</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-medium">
                <span>Last 3 months</span>
                <span className="text-accent text-[10px] cursor-pointer">&times;</span>
              </div>
            </div>
          </div>

          {/* Core Interactive Canvas: Background Video Explorer + Floating 3D Depth Cards */}
          <div className="relative min-h-[580px] lg:min-h-[520px] w-full rounded-2xl bg-white border border-line p-3 sm:p-5 overflow-hidden">
            
            {/* Background Layer: 4 Outlier Video Cards from Image 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 opacity-50 pointer-events-none select-none filter">
              {/* Video 1: Charlie Woods Golf Swing */}
              <div className="rounded-xl bg-white border border-line p-2 flex flex-col gap-2">
                <div className="aspect-[9/16] w-full rounded-lg relative overflow-hidden flex flex-col justify-between p-2 bg-paper-deep">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center self-start text-[10px] font-bold shadow">
                    ▶
                  </div>
                  <div className="w-full h-24 flex items-end bg-paper-deep">
                    <span className="text-[10px] text-ink font-medium line-clamp-2">Charlie Woods gets first A...</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-pencil">
                  <span>@golfhub</span>
                  <span className="text-emerald-700 font-bold">12.5x</span>
                </div>
              </div>

              {/* Video 2: Leo Pareja Podcast */}
              <div className="rounded-xl bg-white border border-line p-2 flex flex-col gap-2">
                <div className="aspect-[9/16] w-full rounded-lg relative overflow-hidden flex flex-col justify-between p-2 bg-paper-deep">
                  <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center self-start text-[10px] font-bold shadow">
                    IG
                  </div>
                  <div className="w-full h-24 flex items-end bg-paper-deep">
                    <span className="text-[10px] text-ink font-medium line-clamp-2">Breaking down @leopareja...</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-pencil">
                  <span>@realestate</span>
                  <span className="text-emerald-700 font-bold">105.3x</span>
                </div>
              </div>

              {/* Video 3: Taiwan Bubbles */}
              <div className="rounded-xl bg-white border border-line p-2 flex flex-col gap-2">
                <div className="aspect-[9/16] w-full rounded-lg relative overflow-hidden flex flex-col justify-between p-2 bg-paper-deep">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center self-start text-[10px] font-bold border border-line shadow">
                    TT
                  </div>
                  <div className="w-full h-24 flex items-end bg-paper-deep">
                    <span className="text-[10px] text-ink font-medium line-clamp-2">The best and easy way to...</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-pencil">
                  <span>@techtrends</span>
                  <span className="text-emerald-700 font-bold">44.8x</span>
                </div>
              </div>

              {/* Video 4: Sandwich Strategy */}
              <div className="rounded-xl bg-white border border-line p-2 flex flex-col gap-2">
                <div className="aspect-[9/16] w-full rounded-lg relative overflow-hidden flex flex-col justify-between p-2 bg-paper-deep">
                  <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center self-start text-[10px] font-bold shadow">
                    IG
                  </div>
                  <div className="w-full h-24 flex items-end bg-paper-deep">
                    <span className="text-[10px] text-ink font-medium line-clamp-2">Sandwiches are easy, it&apos;s t...</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-pencil">
                  <span>@foodies</span>
                  <span className="text-emerald-700 font-bold">18.2x</span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* FLOATING CARD 1 (Top-Left): Outlier Performance Metrics        */}
            {/* ------------------------------------------------------------- */}
            <div
              onClick={() => onTriggerAuthGate("Inspect Outlier Performance Metrics")}
              className="relative lg:absolute top-2 left-2 lg:top-4 lg:left-4 z-20 w-full sm:w-[320px] rounded-2xl bg-white border border-line p-4 hover:border-accent/50 transition-all cursor-pointer group mb-3 lg:mb-0"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.2)",
              }}
            >
              <div className="grid grid-cols-2 gap-2 text-left">
                {/* Outlier score (Green) */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-500/20">
                  <span className="text-[10px] text-emerald-700/80 font-medium block">Outlier score</span>
                  <div className="flex items-center gap-1 text-emerald-700 font-bold text-sm mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>105.3x</span>
                  </div>
                </div>

                {/* Views (Blue) */}
                <div className="p-2.5 rounded-xl bg-blue-100 border border-accent/20">
                  <span className="text-[10px] text-accent/80 font-medium block">Views</span>
                  <div className="flex items-center gap-1 text-accent font-bold text-sm mt-0.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>3.2M</span>
                  </div>
                </div>

                {/* Engagement rate (Amber) */}
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-500/20">
                  <span className="text-[10px] text-amber-700/80 font-medium block">Engagement rate</span>
                  <div className="flex items-center gap-1 text-amber-700 font-bold text-sm mt-0.5">
                    <span>⭐</span>
                    <span>11%</span>
                  </div>
                </div>

                {/* Likes (Purple) */}
                <div className="p-2.5 rounded-xl bg-blue-100 border border-accent/20">
                  <span className="text-[10px] text-accent/80 font-medium block">Likes</span>
                  <div className="flex items-center gap-1 text-accent font-bold text-sm mt-0.5">
                    <Heart className="w-3.5 h-3.5 fill-accent" />
                    <span>169K</span>
                  </div>
                </div>

                {/* Comments (Orange) */}
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-500/20">
                  <span className="text-[10px] text-orange-700/80 font-medium block">Comments</span>
                  <div className="flex items-center gap-1 text-orange-700 font-bold text-sm mt-0.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>1.6K</span>
                  </div>
                </div>

                {/* Channel followers (Cyan) */}
                <div className="p-2.5 rounded-xl bg-blue-100 border border-accent/20">
                  <span className="text-[10px] text-accent/80 font-medium block">Channel followers</span>
                  <div className="flex items-center gap-1 text-accent font-bold text-sm mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>331K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* FLOATING CARD 2 (Top-Right): Creator Watchlist Card           */}
            {/* ------------------------------------------------------------- */}
            <div
              className="relative lg:absolute top-2 right-2 lg:top-4 lg:right-4 z-20 w-full sm:w-[310px] rounded-2xl bg-white border border-line p-4 mb-3 lg:mb-0 text-left"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.2)",
              }}
            >
              {/* Creator row */}
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs font-bold text-emerald-700">
                    H
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-ink">hormozi</span>
                    <span className="text-[10px] text-pencil">4.1M followers</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-500/30">
                  Top 1%
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                <span className="text-[11px] text-pencil block">Add this channel to a watchlist:</span>
                
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-paper-deep border border-line text-xs text-pencil">
                  <span>Select a watchlist</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => onTriggerAuthGate("Browse Hormozi's Videos")}
                    className="text-[11px] text-accent hover:underline font-medium"
                  >
                    Browse this channel&apos;s videos
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWatchlistAdded(true);
                      setTimeout(() => setWatchlistAdded(false), 2000);
                    }}
                    className="px-3 py-1 rounded-lg bg-ink hover:bg-ink-soft text-white text-xs font-semibold shadow flex items-center gap-1"
                  >
                    {watchlistAdded ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* FLOATING CARD 3 (Middle-Right): Script Length Slider          */}
            {/* ------------------------------------------------------------- */}
            <div
              className="relative lg:absolute top-[185px] right-2 lg:right-6 z-20 w-full sm:w-[280px] rounded-2xl bg-white border border-line p-4 mb-3 lg:mb-0 text-left"
              style={{
                boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(37, 99, 235, 0.15)",
              }}
            >
              <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
                <span>Change the length of the script</span>
              </div>

              {/* Slider Component matching Image 1 */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="30"
                  max="120"
                  step="15"
                  value={scriptDuration}
                  onChange={(e) => setScriptDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-paper-deep rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-accent">{scriptDuration} seconds</span>
                  <span className="text-pencil/80 text-[10px]">
                    Approximately {wordCountEstimate - 15}-{wordCountEstimate + 15} words
                  </span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* FLOATING CARD 4 (Bottom-Left): Hook Writer Selector           */}
            {/* ------------------------------------------------------------- */}
            <div
              className="relative lg:absolute bottom-3 left-2 lg:bottom-4 lg:left-4 z-20 w-full sm:w-[350px] rounded-2xl bg-white border border-line p-4 mb-3 lg:mb-0 text-left"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.2)",
              }}
            >
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-ink">Hook</h4>
                  <span className="text-[10px] text-accent font-semibold">Hook Writer v2</span>
                </div>
                <p className="text-[10px] text-pencil mt-0.5">
                  Select your preferred option using the hook writer
                </p>
              </div>

              <div className="space-y-2 mt-3">
                {/* Hook Option 1 */}
                <div
                  onClick={() => setSelectedHook(1)}
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed cursor-pointer transition-all ${
                    selectedHook === 1
                      ? "bg-paper-deep border-accent/80"
                      : "bg-white border-line hover:border-line"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-accent text-[10px] uppercase tracking-wide">
                      Initial Context Shock
                    </span>
                    {selectedHook === 1 && <Check className="w-3 h-3 text-emerald-700" />}
                  </div>
                  <p className="text-pencil line-clamp-3">
                    Contextualize TSMC&apos;s impact by explaining its dominance; TSMC manufactures over half of the world&apos;s semiconductors, like one company making more than half of all the cars globally.
                  </p>
                </div>

                {/* Hook Option 2 */}
                <div
                  onClick={() => setSelectedHook(2)}
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed cursor-pointer transition-all ${
                    selectedHook === 2
                      ? "bg-paper-deep border-accent/80"
                      : "bg-white border-line hover:border-line"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-accent text-[10px] uppercase tracking-wide">
                      Foundational Genesis
                    </span>
                    {selectedHook === 2 && <Check className="w-3 h-3 text-emerald-700" />}
                  </div>
                  <p className="text-pencil line-clamp-3">
                    Detail what TSMC is and how it works, starting with its founding in 1987 by Morris Chang, and moving to its essential role as a semiconductor foundry for major tech companies like Apple and Nvidia.
                  </p>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* FLOATING CARD 5 (Bottom-Right): Script Version Diff           */}
            {/* ------------------------------------------------------------- */}
            <div
              className="relative lg:absolute bottom-3 right-2 lg:bottom-4 lg:right-4 z-20 w-full sm:w-[360px] rounded-2xl bg-white border border-line p-4 text-left"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-line">
                <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <PenLine className="w-3.5 h-3.5 text-accent" />
                  <span>Script</span>
                </h4>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Data-Backed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] leading-relaxed">
                {/* Previous version (Red highlights) */}
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-500/20 text-red-700">
                  <span className="text-[9px] text-red-700 font-bold uppercase tracking-wider block mb-1">
                    Previous version
                  </span>
                  <p className="line-clamp-4">
                    Taiwan Semiconductor just crossed a trillion-dollar valuation, becoming one of the world&apos;s most valuable companies.
                  </p>
                </div>

                {/* Current script (Green highlights) */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-500/30 text-emerald-700">
                  <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider block mb-1">
                    Current script
                  </span>
                  <p className="line-clamp-4">
                    This company is the secret weapon powering Apple and Nvidia. They&apos;ve grown from $14B to $1T over the last 20 years.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-line flex items-center justify-between">
                <span className="text-[10px] text-pencil">Capped at 120s spoken time</span>{/* (FR-31) */}
                <button
                  type="button"
                  onClick={() => onTriggerAuthGate("Open 120s Script Studio")}
                  className="text-[11px] text-accent hover:text-accent font-semibold flex items-center gap-1"
                >
                  <span>Open Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Banner Triggering Auth Gate */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-line text-xs text-pencil">
            <p>
              Millions of videos analyzed daily across TikTok, YouTube Shorts & Instagram Reels.
            </p>
            <button
              type="button"
              onClick={() => onTriggerAuthGate("Launch Full Studio")}
              className="w-full sm:w-auto px-5 py-2 rounded-xl btn-primary-kinetic text-white text-xs font-semibold"
            >
              Launch Full Studio Free
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
