"use client";

import { useEffect, useState } from "react";
import { VideoData } from "@/lib/constants/creators";
import { VideoAnalysisResult } from "@/lib/types/analysis";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { X, PenLine, Info, CheckCircle2, Lightbulb, Award, ArrowRight, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";

interface VideoAnalysisModalProps {
  video: VideoData | null;
  creatorName: string;
  nicheId: string;
  platform?: "youtube" | "tiktok";
  onClose: () => void;
}

export function VideoAnalysisModal({
  video,
  creatorName,
  nicheId,
  platform = "youtube",
  onClose,
}: VideoAnalysisModalProps) {
  const [analysis, setAnalysis] = useState<VideoAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!video) {
      setAnalysis(null);
      return;
    }

    // FR-39: Analysis runs ONLY when the user clicks the button. Not automatically.
    async function runAnalysis() {
      if (!video) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/video-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videoId: video.id,
            platform: platform,
            title: video.title,
            description: video.short_description || "",
            duration_seconds: video.duration_seconds,
            chapters: (video as any).chapters || null,
            stats: video.stats,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Analysis failed.");
        }

        setAnalysis(data.analysis);
      } catch (err: any) {
        console.error("Analysis modal error:", err);
        setError(err?.message || "Failed to analyze video. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    runAnalysis();
  }, [video]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border-2 border-ink p-6 space-y-6 text-left">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 uppercase tracking-wider">
                Video Analysis{/* (FR-38..43) */}
              </span>
              <span className="text-xs text-pencil">&bull; {creatorName}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-ink leading-tight">
              {video.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-pencil hover:text-ink hover:bg-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State with Mobius AI Loader */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center">
            <MobiusLoader
              variant="ai"
              size="lg"
              label="Analyzing Video Performance"
              sublabel="Evaluating public stats, duration pacing, and retention drivers with Gemini..."
            />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Analysis Content (FR-41 & FR-42) */}
        {analysis && !loading && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* FR-42 Mandatory Legal Note */}
            <div className="p-3.5 rounded-xl bg-white border-2 border-ink text-[11px] text-pencil flex items-center gap-2.5">
              <Info className="w-4 h-4 text-score shrink-0" />
              <span className="font-medium text-pencil-light">{analysis.disclaimer}</span>
            </div>

            {/* 1. Summary (FR-41) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ink" />
                <span>Executive Summary</span>
              </h3>
              <p className="text-xs text-pencil leading-relaxed bg-white p-4 rounded-2xl border-2 border-ink">
                {analysis.summary}
              </p>
            </div>

            {/* 2. Likely Reasons (FR-41: each labeled 'likely') */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-score" />
                <span>Why This Video Worked</span>{/* (FR-41) */}
              </h3>
              <div className="space-y-2">
                {analysis.likelyReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border-2 border-ink flex items-start gap-2.5 text-xs text-pencil"
                  >
                    <span className="px-2 py-0.5 rounded-md bg-score/10 text-score border border-score/30 text-[10px] tabular-nums font-bold uppercase shrink-0">
                      likely
                    </span>
                    <span className="leading-relaxed">
                      {reason.replace(/^likely:\s*/i, "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Three Suggestions (FR-41) */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                <span>3 Tactical Suggestions for Creators</span>
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {analysis.suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border-2 border-ink flex items-start gap-3 text-xs text-pencil"
                  >
                    <span className="w-5 h-5 rounded-full bg-ink text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. One-Line Verdict (FR-41) */}
            <div className="p-4 rounded-2xl border border-accent/50 space-y-1 bg-paper-deep">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-score" />
                <span>Performance Verdict</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink">
                &ldquo;{analysis.verdict}&rdquo;
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-ink flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-pencil hover:text-ink border-2 border-ink hover:border-line transition-colors"
              >
                Close
              </button>

              <Link
                href={`/script-generator?topic=${encodeURIComponent(video.title)}&niche=${nicheId}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ink hover:bg-ink-soft text-white font-semibold text-xs transition-all"
              >
                <PenLine className="w-3.5 h-3.5 text-score" />
                <span>Turn into 120s Script</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
