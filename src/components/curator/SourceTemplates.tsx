"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, PlusCircle, RefreshCw } from "lucide-react";

/**
 * Source Lists tab: the team's source files (training-rules/<niche>/source*.md) as ready-made templates.
 * "Add this creator" fills the creator form; "Use as template" fills the video form.
 */

export interface SourceVideo {
  videoId: string;
  url: string;
  topic: string | null;
  title: string | null;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  views: number | null;
  publishedAt: string | null;
  alreadyAdded: boolean;
  /** Added, but no thumbnail yet (TikTok videos imported from the source lists) */
  needsThumbnail?: boolean;
  file: string;
}

export interface SourceGroup {
  key: string;
  platform: "youtube" | "tiktok";
  displayName: string;
  handle: string | null;
  profileUrl: string | null;
  channelId: string | null;
  followers: number | null;
  avatarUrl: string | null;
  listedAs: string[];
  creatorId: string | null;
  videos: SourceVideo[];
}

const compact = (n: number | null) =>
  n === null ? "—" : n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n);
const length = (s: number | null) => (s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "—");

export function SourceTemplates({
  nicheId,
  nicheName,
  onUseCreator,
  onUseVideo,
}: {
  nicheId: string;
  nicheName: string;
  onUseCreator: (g: SourceGroup) => void;
  onUseVideo: (g: SourceGroup, v: SourceVideo) => void;
}) {
  const [data, setData] = useState<{ groups: SourceGroup[]; issues: any[]; youtubeEnabled: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState<"all" | "youtube" | "tiktok">("all");
  // Maximum video length in seconds (0 = any length). Custom values like the script generator.
  const [maxLength, setMaxLength] = useState(0);
  const [customLength, setCustomLength] = useState("");
  const presetLengths = [0, 60, 180, 600];
  const isCustom = !presetLengths.includes(maxLength) || customLength !== "";
  const [hideAdded, setHideAdded] = useState(false);

  const load = () => {
    setData(null);
    setError(null);
    fetch(`/api/curator/sources?niche=${encodeURIComponent(nicheId)}`, { cache: "no-store" })
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json.error || "Could not load the source lists.");
        setData(json);
      })
      .catch((e) => setError(e.message));
  };
  useEffect(load, [nicheId]);

  if (error) return <p className="sk-card-flat p-6 text-sm text-red-700">{error}</p>;
  if (!data) {
    return (
      <p className="flex items-center justify-center gap-2 py-12 text-sm text-pencil">
        <Loader2 className="h-4 w-4 animate-spin" /> Reading the source lists and checking YouTube…
      </p>
    );
  }
  if (data.groups.length === 0) {
    return (
      <p className="sk-card-flat p-6 text-sm text-pencil">
        There are no source lists for {nicheName} yet. Add a <code>source.md</code> file to <code>training-rules/{nicheId}/</code>.
      </p>
    );
  }

  const groups = data.groups
    .filter((g) => platform === "all" || g.platform === platform)
    .map((g) => ({
      ...g,
      videos: g.videos.filter(
        (v) =>
          (!maxLength || v.durationSeconds === null || v.durationSeconds <= maxLength) && (!hideAdded || !v.alreadyAdded || v.needsThumbnail)
      ),
    }))
    .filter((g) => g.videos.length > 0);

  const total = data.groups.reduce((s, g) => s + g.videos.length, 0);
  const added = data.groups.reduce((s, g) => s + g.videos.filter((v) => v.alreadyAdded).length, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-ink bg-white p-5">
        <p className="text-sm text-ink">
          <strong>{total}</strong> videos from <strong>{data.groups.length}</strong> creators in the team&apos;s source lists ·{" "}
          <strong>{added}</strong> already in CreatorLab.
        </p>
        <p className="mt-1 text-xs text-pencil">
          Add the creator first, then use each video as a template. YouTube details are pulled automatically; TikTok needs a
          thumbnail upload and its length.
          {!data.youtubeEnabled && " YouTube details are off: add YOUTUBE_API_KEY on the server."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          <div className="sk-tabs">
            {(["all", "youtube", "tiktok"] as const).map((p) => (
              <button key={p} type="button" data-active={platform === p} onClick={() => setPlatform(p)} className="sk-tab text-xs">
                {p === "all" ? "All" : p === "youtube" ? "YouTube" : "TikTok"}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-ink">Length:</span>
            {presetLengths.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => {
                  setMaxLength(sec);
                  setCustomLength("");
                }}
                className={`rounded-lg border-2 border-ink px-2 py-1 font-semibold ${maxLength === sec && customLength === "" ? "bg-ink text-white" : "bg-white text-ink"}`}
              >
                {sec === 0 ? "Any" : sec < 60 ? `${sec}s` : sec % 60 === 0 ? `≤ ${sec / 60} min` : `≤ ${sec}s`}
              </button>
            ))}
            <label className={`flex items-center gap-1 rounded-lg border-2 border-ink px-2 py-0.5 ${isCustom && maxLength ? "bg-ink text-white" : "bg-white text-ink"}`}>
              <span className="font-semibold">Custom ≤</span>
              <input
                type="number"
                min={15}
                max={7200}
                value={customLength}
                placeholder="sec"
                onChange={(e) => {
                  setCustomLength(e.target.value);
                  const n = parseInt(e.target.value, 10);
                  setMaxLength(Number.isFinite(n) && n > 0 ? Math.min(7200, n) : 0);
                }}
                className="w-14 bg-transparent text-center tabular-nums focus:outline-none"
                aria-label="Custom maximum length in seconds"
              />
              <span>s</span>
            </label>
          </div>
          <label className="flex items-center gap-2 font-semibold text-ink">
            <input type="checkbox" checked={hideAdded} onChange={(e) => setHideAdded(e.target.checked)} />
            Hide videos already added
          </label>
          <button type="button" onClick={load} className="sk-btn-ghost text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      {data.issues.length > 0 && (
        <details className="rounded-2xl border-2 border-ink bg-hl-yellow/30 p-5">
          <summary className="cursor-pointer text-sm font-bold text-ink">
            <AlertTriangle className="mr-1 inline h-4 w-4" />
            {data.issues.length} link{data.issues.length === 1 ? "" : "s"} in the source files need attention
          </summary>
          <ul className="mt-3 space-y-3 text-sm">
            {data.issues.map((i, idx) => (
              <li key={idx}>
                <p className="font-semibold text-ink">
                  {i.topic ? `“${i.topic}”` : i.url}
                  {i.creator ? ` · ${i.creator}` : ""}
                </p>
                <p className="text-pencil">{i.message}</p>
                <p className="text-xs text-pencil-light">
                  {i.file}, line {i.line}
                </p>
              </li>
            ))}
          </ul>
        </details>
      )}

      {groups.map((g) => (
        <section key={g.key} className="rounded-2xl border-2 border-ink bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
            <div className="flex items-center gap-3">
              {g.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.avatarUrl} alt="" className="h-11 w-11 rounded-full border-2 border-ink object-cover" />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper-deep text-sm font-bold">
                  {g.displayName.replace(/^@/, "").slice(0, 2).toUpperCase()}
                </span>
              )}
              <div>
                <p className="font-bold text-ink">
                  {g.displayName}{" "}
                  <span className={`ml-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${g.platform === "youtube" ? "bg-red-50 text-red-700" : "bg-paper-deep text-ink"}`}>
                    {g.platform}
                  </span>
                </p>
                <p className="text-xs text-pencil">
                  {[g.handle, g.followers !== null && `${compact(g.followers)} followers`, g.listedAs.length > 0 && `listed as ${g.listedAs.join(", ")}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </div>
            {g.creatorId ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-score">
                <CheckCircle2 className="h-4 w-4" /> In CreatorLab
              </span>
            ) : (
              <button type="button" onClick={() => onUseCreator(g)} className="sk-btn-ink px-4 py-2 text-xs">
                <PlusCircle className="h-4 w-4" /> Add this creator
              </button>
            )}
          </div>

          <ul className="divide-y divide-line">
            {g.videos.map((v) => (
              <li key={v.videoId} className="flex flex-wrap items-center gap-4 py-3">
                {v.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnailUrl} alt="" className="aspect-video w-28 rounded-md border border-line object-cover" />
                ) : (
                  <span className="flex aspect-[9/16] w-12 items-center justify-center rounded-md border border-dashed border-ink text-[10px] text-pencil">
                    TikTok
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{v.title || v.url}</p>
                  {v.topic && v.topic !== v.title && <p className="truncate text-xs text-pencil">Topic: {v.topic}</p>}
                  <p className="text-xs text-pencil-light">
                    {[
                      `Length ${length(v.durationSeconds)}`,
                      v.views !== null && `${compact(v.views)} views`,
                      v.publishedAt && new Date(v.publishedAt).toLocaleDateString(),
                      v.durationSeconds && v.durationSeconds > 180 ? "long-form" : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                {v.alreadyAdded && v.needsThumbnail ? (
                  <button
                    type="button"
                    disabled={!g.creatorId}
                    onClick={() => onUseVideo(g, v)}
                    className="sk-btn-ink px-3 py-1.5 text-xs"
                    title="This video is in CreatorLab but has no thumbnail yet"
                  >
                    Add thumbnail
                  </button>
                ) : v.alreadyAdded ? (
                  <span className="text-xs font-bold text-score">Added</span>
                ) : (
                  <button
                    type="button"
                    disabled={!g.creatorId}
                    title={g.creatorId ? "" : "Add the creator first"}
                    onClick={() => onUseVideo(g, v)}
                    className="sk-btn px-3 py-1.5 text-xs"
                  >
                    Use as template
                  </button>
                )}
              </li>
            ))}
          </ul>
          {!g.creatorId && <p className="pt-2 text-xs text-pencil">Add this creator first to use their videos.</p>}
        </section>
      ))}
    </div>
  );
}
