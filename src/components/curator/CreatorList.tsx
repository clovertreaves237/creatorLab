"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Plus, RotateCcw, ChevronDown, ChevronUp, ImagePlus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MobiusLoader } from "@/components/ui/MobiusLoader";

export interface ListVideo {
  video_id: string;
  platform: "youtube" | "tiktok";
  title: string;
  description_summary: string | null;
  published_at: string;
  duration_seconds: number;
  thumbnail_url: string;
  video_url: string;
  stats: { views: number | null; likes: number | null; comments: number | null } | null;
}

export interface ListCreator {
  id: string;
  niche_id: string;
  platform: "youtube" | "tiktok";
  display_name: string;
  handle: string;
  profile_url: string;
  channel_id: string | null;
  followers: number | null;
  criteria_checked: string[] | null;
  curated_by: string;
  curated_on: string;
  active: boolean;
  videos: ListVideo[];
}

const compact = (n: number | null | undefined) =>
  n === null || n === undefined ? "–" : new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
const length = (s: number) => (s > 0 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "length not entered");

/**
 * The curator's list of creators in one niche, with every video they have in CreatorLab.
 * Edit / remove / restore creators, and add, edit (e.g. add a TikTok thumbnail) or remove videos.
 */
export function CreatorList({
  nicheId,
  nicheName,
  reloadKey,
  onAddCreator,
  onEditCreator,
  onAddVideo,
  onEditVideo,
}: {
  nicheId: string;
  nicheName: string;
  reloadKey: number;
  onAddCreator: () => void;
  onEditCreator: (c: ListCreator) => void;
  onAddVideo: (c: ListCreator) => void;
  onEditVideo: (c: ListCreator, v: ListVideo) => void;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [creators, setCreators] = useState<ListCreator[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [platform, setPlatform] = useState<"all" | "youtube" | "tiktok">("all");
  const [query, setQuery] = useState("");
  const [showRemoved, setShowRemoved] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [confirm, setConfirm] = useState<string | null>(null); // "creator:<id>" | "video:<id>"
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setError(null);
    const { data, error: err } = await supabase
      .from("creators")
      .select(
        "id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, criteria_checked, curated_by, curated_on, active, " +
          "videos(video_id, platform, title, description_summary, published_at, duration_seconds, thumbnail_url, video_url, video_snapshots(views, likes, comments, snapshot_at))"
      )
      .eq("niche_id", nicheId)
      .order("display_name", { ascending: true });
    if (err) {
      setError(err.message);
      setCreators([]);
      return;
    }
    setCreators(
      (data || []).map((c: any) => ({
        ...c,
        videos: (c.videos || [])
          .map((v: any) => {
            const snap = [...(v.video_snapshots || [])].sort((a: any, b: any) => String(b.snapshot_at).localeCompare(String(a.snapshot_at)))[0];
            return { ...v, stats: snap ? { views: snap.views, likes: snap.likes, comments: snap.comments } : null };
          })
          .sort((a: ListVideo, b: ListVideo) => String(b.published_at).localeCompare(String(a.published_at))),
      }))
    );
  };

  useEffect(() => {
    setCreators(null);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicheId, reloadKey]);

  const call = async (url: string, method: string, done: string) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(url, { method });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "That did not work. Try again.");
      setMessage(done);
      setConfirm(null);
      await load();
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  };

  const visible = (creators || []).filter(
    (c) =>
      (showRemoved ? !c.active : c.active) &&
      (platform === "all" || c.platform === platform) &&
      (!query.trim() || `${c.display_name} ${c.handle}`.toLowerCase().includes(query.trim().toLowerCase()))
  );
  const activeCount = (creators || []).filter((c) => c.active).length;
  const removedCount = (creators || []).filter((c) => !c.active).length;
  const videoCount = (creators || []).filter((c) => c.active).reduce((s, c) => s + c.videos.length, 0);
  const needThumb = (creators || []).filter((c) => c.active).reduce((s, c) => s + c.videos.filter((v) => !v.thumbnail_url).length, 0);

  return (
    <div className="rounded-2xl border-2 border-ink bg-white p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-ink">Creators in {nicheName}</h2>
          {creators && (
            <p className="text-xs text-pencil">
              {activeCount} creators · {videoCount} videos
              {needThumb > 0 && ` · ${needThumb} TikTok video${needThumb === 1 ? "" : "s"} need a thumbnail`}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onAddCreator} className="sk-btn-ink px-3 py-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add creator
          </button>
          <button type="button" onClick={() => load()} className="sk-btn px-3 py-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="sk-tabs" role="tablist" aria-label="Platform">
          {(["all", "youtube", "tiktok"] as const).map((p) => (
            <button key={p} type="button" role="tab" className="sk-tab" data-active={platform === p} onClick={() => setPlatform(p)}>
              {p === "all" ? "All" : p === "youtube" ? "YouTube" : "TikTok"}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or handle"
          className="sk-input max-w-xs flex-1 text-sm"
          aria-label="Search creators"
        />
        <label className="flex items-center gap-2 text-xs text-pencil">
          <input type="checkbox" checked={showRemoved} onChange={(e) => setShowRemoved(e.target.checked)} />
          Show removed creators ({removedCount})
        </label>
      </div>

      {message && <p className="mb-4 text-sm text-ink">{message}</p>}
      {error && <p className="mb-4 text-sm text-red-700">Could not load creators: {error}</p>}

      {creators === null ? (
        <div className="py-12">
          <MobiusLoader size="md" label="Loading creators" />
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-line px-6 py-12 text-center text-sm text-pencil">
          {showRemoved
            ? "No removed creators in this niche."
            : "No creators in this niche yet. Add one, or open Source Lists to use the team's links."}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((c) => {
            const isOpen = open[c.id];
            return (
              <li key={c.id} className="rounded-xl border-2 border-ink">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={c.profile_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-ink hover:underline">
                        {c.display_name}
                        <ExternalLink className="h-3 w-3 text-pencil" />
                      </a>
                      <span className="rounded border border-ink px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">
                        {c.platform === "youtube" ? "YouTube" : "TikTok"}
                      </span>
                      {!c.active && <span className="rounded bg-paper-deep px-1.5 py-0.5 text-[10px] font-bold uppercase text-pencil">Removed</span>}
                    </div>
                    <p className="mt-0.5 text-xs text-pencil">
                      {c.handle} · {c.followers !== null ? `${compact(c.followers)} followers` : "followers not shown"} · curated by {c.curated_by} on {c.curated_on}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {confirm === `creator:${c.id}` ? (
                      <>
                        <span className="text-pencil">Remove {c.display_name} from the app?</span>
                        <button type="button" disabled={busy} onClick={() => call(`/api/curator/creators?id=${encodeURIComponent(c.id)}`, "DELETE", `${c.display_name} removed. You can restore them from "Show removed creators".`)} className="font-bold text-red-700 hover:underline">
                          Yes, remove
                        </button>
                        <button type="button" onClick={() => setConfirm(null)} className="text-pencil hover:underline">Cancel</button>
                      </>
                    ) : c.active ? (
                      <>
                        <button type="button" onClick={() => onAddVideo(c)} className="sk-btn px-2.5 py-1 text-xs">
                          <Plus className="h-3 w-3" /> Video
                        </button>
                        <button type="button" onClick={() => onEditCreator(c)} className="sk-btn px-2.5 py-1 text-xs">
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button type="button" onClick={() => setConfirm(`creator:${c.id}`)} className="sk-btn px-2.5 py-1 text-xs text-red-700">
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </>
                    ) : (
                      <button type="button" disabled={busy} onClick={() => call(`/api/curator/creators?id=${encodeURIComponent(c.id)}`, "PATCH", `${c.display_name} restored.`)} className="sk-btn px-2.5 py-1 text-xs">
                        <RotateCcw className="h-3 w-3" /> Restore
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpen((o) => ({ ...o, [c.id]: !o[c.id] }))}
                      className="sk-btn-ghost px-2 py-1 text-xs"
                      aria-expanded={isOpen}
                    >
                      {c.videos.length} video{c.videos.length === 1 ? "" : "s"}
                      {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-line p-4">
                    {c.videos.length === 0 ? (
                      <p className="text-sm text-pencil">No videos yet.</p>
                    ) : (
                      <ul className="divide-y divide-line">
                        {c.videos.map((v) => (
                          <li key={v.video_id} className="flex flex-wrap items-center gap-3 py-2.5">
                            <span className={`shrink-0 overflow-hidden rounded border border-line bg-paper-deep ${v.platform === "tiktok" ? "h-16 w-10" : "h-12 w-20"}`}>
                              {v.thumbnail_url ? (
                                <img src={v.thumbnail_url} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center text-[9px] text-pencil">none</span>
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <a href={v.video_url} target="_blank" rel="noopener noreferrer" className="line-clamp-2 text-sm font-semibold text-ink hover:underline">
                                {v.title}
                              </a>
                              <p className="text-[11px] text-pencil">
                                {new Date(v.published_at).toLocaleDateString()} · {length(v.duration_seconds)}
                                {v.stats && ` · ${compact(v.stats.views)} views`}
                                {!v.thumbnail_url && <span className="font-bold text-ink"> · needs a thumbnail</span>}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              {confirm === `video:${v.video_id}` ? (
                                <>
                                  <button type="button" disabled={busy} onClick={() => call(`/api/curator/videos?id=${encodeURIComponent(v.video_id)}`, "DELETE", "Video removed.")} className="font-bold text-red-700 hover:underline">
                                    Yes, remove
                                  </button>
                                  <button type="button" onClick={() => setConfirm(null)} className="text-pencil hover:underline">Cancel</button>
                                </>
                              ) : (
                                <>
                                  {c.active && (
                                    <button type="button" onClick={() => onEditVideo(c, v)} className={`${!v.thumbnail_url ? "sk-btn-ink" : "sk-btn"} px-2.5 py-1 text-xs`}>
                                      {!v.thumbnail_url ? <ImagePlus className="h-3 w-3" /> : <Pencil className="h-3 w-3" />}
                                      {!v.thumbnail_url ? "Add thumbnail" : "Edit"}
                                    </button>
                                  )}
                                  <button type="button" onClick={() => setConfirm(`video:${v.video_id}`)} className="text-red-700 hover:underline">
                                    Remove
                                  </button>
                                </>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
