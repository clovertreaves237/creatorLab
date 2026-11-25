"use client";

import { useState } from "react";
import { VideoData } from "@/lib/constants/creators";
import { X, PenLine, TrendingUp, Calendar, Clock, Eye, ThumbsUp, MessageSquare } from "lucide-react";
import Link from "next/link";
import { VideoAnalysisModal } from "./VideoAnalysisModal";

interface VideoModalProps {
  video: VideoData | null;
  creatorName: string;
  nicheId: string;
  onClose: () => void;
}

/**
 * FR-18: Video modal with title, short description, publish date, stats block with 'as of' date, and embedded player.
 * FR-19: TikTok official embed & YouTube iframe embed playing directly on CreatorLab page.
 * FR-20: 'Hidden' stat display when platform hides metrics.
 */
export function VideoModal({ video, creatorName, nicheId, onClose }: VideoModalProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border-2 border-ink p-6 sm:p-8 text-left overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-ink">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-score" />
            <h3 className="font-bold text-ink text-sm truncate max-w-md">
              {creatorName} &bull; {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-paper-deep text-pencil hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* FR-19 Embedded Player */}
          <div
            className={`rounded-2xl bg-ink border-2 border-ink overflow-hidden relative ${
              video.embed_url.includes("youtube") ? "w-full aspect-video" : "mx-auto aspect-[9/16] h-[70vh] max-h-[640px] max-w-full"
            }`}
          >
            {video.embed_url.includes("youtube.com") ? (
              <iframe
                src={`${video.embed_url}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              /* TikTok Embed or video player */
              <iframe
                src={video.embed_url}
                title={video.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>

          {/* Video Metadata & Description */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h2 className="text-base sm:text-lg font-bold text-ink">
                {video.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-pencil">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>Published {video.publish_date}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-pencil" />
                  <span>{video.duration_formatted}</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-pencil leading-relaxed">
              {video.short_description}
            </p>
          </div>

          {/* FR-18 & FR-20 Stats Block with 'as of' date & 'Hidden' state */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-ink space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink uppercase tracking-wider">
                Public Engagement Snapshot{/* (FR-18) */}
              </span>
              <span className="text-[11px] text-pencil">
                Recorded as of <strong className="text-ink">{video.stats.as_of}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Views */}
              <div className="p-3 rounded-xl bg-white border-2 border-ink">
                <span className="text-[10px] text-pencil flex items-center gap-1 mb-1">
                  <Eye className="w-3 h-3 text-accent" />
                  <span>Views</span>
                </span>
                <span className="text-sm sm:text-base font-extrabold text-ink">
                  {video.stats.views !== null ? video.stats.views.toLocaleString() : (
                    <span className="text-amber-700 font-bold italic text-xs">Hidden</span>
                  )}
                </span>
              </div>

              {/* Likes */}
              <div className="p-3 rounded-xl bg-white border-2 border-ink">
                <span className="text-[10px] text-pencil flex items-center gap-1 mb-1">
                  <ThumbsUp className="w-3 h-3 text-score" />
                  <span>Likes</span>
                </span>
                <span className="text-sm sm:text-base font-extrabold text-ink">
                  {video.stats.likes !== null ? video.stats.likes.toLocaleString() : (
                    <span className="text-amber-700 font-bold italic text-xs">Hidden</span>
                  )}
                </span>
              </div>

              {/* Comments */}
              <div className="p-3 rounded-xl bg-white border-2 border-ink">
                <span className="text-[10px] text-pencil flex items-center gap-1 mb-1">
                  <MessageSquare className="w-3 h-3 text-accent" />
                  <span>Comments</span>
                </span>
                <span className="text-sm sm:text-base font-extrabold text-ink">
                  {video.stats.comments !== null ? video.stats.comments.toLocaleString() : (
                    <span className="text-amber-700 font-bold italic text-xs">Hidden</span>
                  )}
                </span>
              </div>
            </div>

            {/* FR-20 Notice footnote */}
            {(video.stats.views === null || video.stats.likes === null || video.stats.comments === null) && (
              <p className="text-[11px] text-amber-700/90 pt-1">
                * Note: Where a platform hides an engagement metric, CreatorLab displays &lsquo;Hidden&rsquo;, not zero.{/* (FR-20) */}
              </p>
            )}
          </div>
        </div>

        {/* Modal footer with Remix CTA */}
        <div className="pt-4 border-t border-ink flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border-2 border-ink text-xs font-semibold text-pencil hover:text-ink"
            >
              Close
            </button>
            <button
              onClick={() => setShowAnalysis(true)}
              className="px-4 py-2.5 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <PenLine className="w-3.5 h-3.5 text-score" />
              <span>Why this worked</span>{/* (FR-38) */}
            </button>
          </div>

          <Link
            href={`/script-generator?topic=${encodeURIComponent(video.title)}&niche=${nicheId}`}
            className="px-6 py-2.5 rounded-xl btn-primary-kinetic text-white text-xs font-semibold flex items-center gap-2"
          >
            <PenLine className="w-3.5 h-3.5 text-score" />
            <span>Remix with 120s Gemini Script</span>
          </Link>
        </div>
      </div>

      {showAnalysis && (
        <VideoAnalysisModal
          video={video}
          creatorName={creatorName}
          nicheId={nicheId}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
}
