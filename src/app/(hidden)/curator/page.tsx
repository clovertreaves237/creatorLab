"use client";

import { useState, useEffect } from "react";
import { ALLOWED_NICHES, NicheId } from "@/lib/constants/niches";
import { createClient } from "@/lib/supabase/client";
import { ShieldAlert, UserCheck, Video, CheckCircle2, Calendar, PenLine, Layers, ArrowRight, Plus, Edit2, Save, Loader2, ExternalLink, Sliders, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SourceTemplates } from "@/components/curator/SourceTemplates";
import { recordUpload } from "@/lib/uploads/record";
import { CreatorList, type ListCreator, type ListVideo } from "@/components/curator/CreatorList";

const CURATION_CRITERIA_OPTIONS = [
  "Consistent Posting (>=2 videos/week)",
  "Strong 3-Second Spoken Hook",
  "African / Cameroonian Market Resonance",
  "High-Value Educational & Conversion Angle",
  "Organic Verified Engagement (No bot metrics)",
  "Clear Audio & Visual Framing",
];

export default function CuratorPortalPage() {
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<"sources" | "add-creator" | "enter-video" | "view-creators">("sources");
  // Set when a form was filled from a source-list template
  const [creatorChannelId, setCreatorChannelId] = useState("");
  const [fromSourceList, setFromSourceList] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState<NicheId>("branding-marketing");

  // The signed-in curator (from the database role). Work is attributed to this account in the audit log.
  const [activeCuratorProfile, setActiveCuratorProfile] = useState<string>("");
  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => {
        if (!me?.displayName) return;
        setActiveCuratorProfile(me.displayName);
        setCuratedBy((prev: string) => (!prev ? me.displayName : prev));
      })
      .catch(() => {});
  }, []);

  // Add/Edit Creator Form State (FR-44)
  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [platform, setPlatform] = useState<"youtube" | "tiktok">("youtube");
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [followers, setFollowers] = useState("");
  const [criteriaChecked, setCriteriaChecked] = useState<string[]>([
    "Consistent Posting (>=2 videos/week)",
    "Strong 3-Second Spoken Hook",
  ]);
  const [curatedBy, setCuratedBy] = useState<string>("");
  const [curatedOn, setCuratedOn] = useState(new Date().toISOString().split("T")[0]);

  // Enter Video Form State (FR-45)
  const [videoCreatorId, setVideoCreatorId] = useState("");
  const [videoPlatform, setVideoPlatform] = useState<"youtube" | "tiktok">("youtube");
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split("T")[0]);
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [checkDate, setCheckDate] = useState(new Date().toISOString().split("T")[0]);
  const [durationSeconds, setDurationSeconds] = useState("");

  // YouTube auto-fill (original video, thumbnail and length) + TikTok thumbnail upload
  const [ytFetching, setYtFetching] = useState(false);
  const [ytInfo, setYtInfo] = useState<{ title: string; channelTitle: string | null; complete: boolean } | null>(null);
  const [ytMessage, setYtMessage] = useState<string | null>(null);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [thumbMessage, setThumbMessage] = useState<string | null>(null);

  const formatLength = (s: string) => {
    const n = Number(s);
    if (!n) return "";
    return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
  };

  const pullFromYouTube = async (url = videoUrl) => {
    if (!url.trim()) return;
    setYtFetching(true);
    setYtMessage(null);
    try {
      const res = await fetch(`/api/curator/youtube?url=${encodeURIComponent(url.trim())}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not read this YouTube link.");
      const v = json.video;
      setVideoId(v.videoId);
      setVideoUrl(v.videoUrl);
      setVideoTitle(v.title);
      if (v.description) setVideoDescription(v.description.slice(0, 600));
      if (v.publishedAt) setPublishDate(v.publishedAt.slice(0, 10));
      setThumbnailUrl(v.thumbnailUrl);
      if (v.durationSeconds) setDurationSeconds(String(v.durationSeconds));
      setViews(v.views === null || v.views === undefined ? "" : String(v.views));
      setLikes(v.likes === null || v.likes === undefined ? "" : String(v.likes));
      setComments(v.comments === null || v.comments === undefined ? "" : String(v.comments));
      setCheckDate(new Date().toISOString().split("T")[0]);
      setYtInfo({ title: v.title, channelTitle: v.channelTitle, complete: Boolean(json.complete) });
      setYtMessage(json.warning || null);
    } catch (e: any) {
      setYtInfo(null);
      setYtMessage(e.message);
    } finally {
      setYtFetching(false);
    }
  };

  // TikTok links look like https://www.tiktok.com/@user/video/7311234567890123456
  const tiktokIdFromUrl = (url: string) => url.match(/\/video\/(\d{8,25})/)?.[1] || "";

  const handleThumbnailUpload = async (file: File | undefined) => {
    if (!file) return;
    setThumbMessage(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setThumbMessage("Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setThumbMessage("The image must be 2 MB or smaller.");
      return;
    }
    setUploadingThumb(true);
    try {
      const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const base = (videoId || tiktokIdFromUrl(videoUrl) || "tiktok").replace(/[^A-Za-z0-9_-]/g, "");
      const path = `tiktok/${base}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("thumbnails").upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("thumbnails").getPublicUrl(path);
      await recordUpload({ bucket: "thumbnails", path, publicUrl: data.publicUrl, kind: "tiktok_thumbnail", file, relatedId: base });
      setThumbnailUrl(data.publicUrl);
      setThumbMessage("Thumbnail uploaded.");
    } catch (e: any) {
      setThumbMessage(e?.message?.includes("row-level security") ? "Only curators can upload thumbnails." : e?.message || "Upload failed.");
    } finally {
      setUploadingThumb(false);
    }
  };

  // Status & Data lists
  const [existingCreators, setExistingCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tells the creator list to reload after a save
  const [listReload, setListReload] = useState(0);

  // Fills the "Enter video" form with an existing video so it can be edited and saved again.
  const openVideoEditor = (creatorId: string, v: ListVideo) => {
    setSuccessMsg(null);
    setErrorMsg(null);
    setVideoCreatorId(creatorId);
    setVideoPlatform(v.platform);
    setVideoUrl(v.video_url);
    setVideoId(v.video_id);
    setVideoTitle(v.title);
    setVideoDescription(v.description_summary || "");
    setThumbnailUrl(v.thumbnail_url || "");
    setDurationSeconds(v.duration_seconds > 0 ? String(v.duration_seconds) : "");
    setPublishDate(String(v.published_at).slice(0, 10));
    setViews(v.stats?.views != null ? String(v.stats.views) : "");
    setLikes(v.stats?.likes != null ? String(v.stats.likes) : "");
    setComments(v.stats?.comments != null ? String(v.stats.comments) : "");
    setYtInfo(null);
    setYtMessage(null);
    setThumbMessage(
      v.platform === "tiktok" && !v.thumbnail_url
        ? "Upload this video's thumbnail (and its length and stats from TikTok if you have them), then save."
        : null
    );
    setActiveTab("enter-video");
  };

  // Opened from the Edit button on a video card on the Creators page: ?tab=curator&editVideo=<video_id>&from=<page>
  const [returnTo, setReturnTo] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("editVideo");
    if (!id) return;
    const from = params.get("from");
    if (from && from.startsWith("/creators")) setReturnTo(from);
    (async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("video_id, platform, title, description_summary, published_at, duration_seconds, thumbnail_url, video_url, creator_id, creators(niche_id), video_snapshots(views, likes, comments, snapshot_at)")
        .eq("video_id", id)
        .maybeSingle();
      if (error || !data) {
        setErrorMsg("That video could not be found. It may have been removed.");
        return;
      }
      const row: any = data;
      const snap = [...(row.video_snapshots || [])].sort((a: any, b: any) => String(b.snapshot_at).localeCompare(String(a.snapshot_at)))[0];
      const nicheId = Array.isArray(row.creators) ? row.creators[0]?.niche_id : row.creators?.niche_id;
      if (nicheId && ALLOWED_NICHES.some((n) => n.id === nicheId)) setSelectedNiche(nicheId as NicheId);
      openVideoEditor(row.creator_id, {
        video_id: row.video_id,
        platform: row.platform,
        title: row.title || "",
        description_summary: row.description_summary,
        published_at: row.published_at || new Date().toISOString(),
        duration_seconds: row.duration_seconds || 0,
        thumbnail_url: row.thumbnail_url || "",
        video_url: row.video_url || "",
        stats: snap ? { views: snap.views ?? null, likes: snap.likes ?? null, comments: snap.comments ?? null } : null,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load existing creators
  const loadCreators = async () => {
    setListReload((k) => k + 1);
    try {
      const { data } = await supabase
        .from("creators")
        .select("*")
        .eq("niche_id", selectedNiche)
        .eq("active", true)
        .order("curated_on", { ascending: false });

      if (data) {
        setExistingCreators(data);
        if (data.length > 0 && !videoCreatorId) {
          setVideoCreatorId(data[0].id);
        }
      }
    } catch (err) {
      console.warn("Could not load creators from Supabase:", err);
    }
  };

  useEffect(() => {
    loadCreators();
  }, [selectedNiche]);

  // Edit / remove existing creators (soft delete through the curator API, recorded in the audit log)
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [listMessage, setListMessage] = useState<string | null>(null);

  const handleEditExistingCreator = (c: any) => {
    setCreatorId(c.id);
    setPlatform(c.platform === "tiktok" ? "tiktok" : "youtube");
    setDisplayName(c.display_name || "");
    setHandle(c.handle || "");
    setProfileUrl(c.profile_url || "");
    setFollowers(c.followers ? String(c.followers) : "");
    setCriteriaChecked(Array.isArray(c.criteria_checked) ? c.criteria_checked : []);
    setCuratedBy(c.curated_by || activeCuratorProfile);
    setCuratedOn(c.curated_on || new Date().toISOString().split("T")[0]);
    setActiveTab("add-creator");
  };

  const handleRemoveCreator = async (id: string) => {
    setListMessage(null);
    try {
      const res = await fetch(`/api/curator/creators?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not remove this creator.");
      setListMessage("Creator removed.");
      await loadCreators();
    } catch (e: any) {
      setListMessage(e.message);
    } finally {
      setConfirmRemoveId(null);
    }
  };

  // Toggle criteria checkbox
  const handleToggleCriteria = (criterion: string) => {
    setCriteriaChecked((prev) =>
      prev.includes(criterion) ? prev.filter((c) => c !== criterion) : [...prev, criterion]
    );
  };

  // Submit Creator (FR-44)
  const handleSaveCreator = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/curator/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: creatorId || undefined,
          niche_id: selectedNiche,
          platform,
          display_name: displayName,
          handle,
          profile_url: profileUrl,
          followers,
          criteria_checked: criteriaChecked,
          curated_by: curatedBy || activeCuratorProfile,
          curated_on: curatedOn,
          channel_id: creatorChannelId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save creator.");

      setSuccessMsg(
        `Creator "${displayName}" saved with the criteria you checked.` +
          (fromSourceList ? " Open Source Lists to add their videos." : "")
      );
      // Reset form
      setCreatorId(null);
      setDisplayName("");
      setHandle("");
      setProfileUrl("");
      setFollowers("");
      setCreatorChannelId("");
      setFromSourceList(false);
      loadCreators();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save creator.");
    } finally {
      setLoading(false);
    }
  };

  // Submit Video Data (FR-45)
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/curator/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_id: videoId,
          creator_id: videoCreatorId,
          platform: videoPlatform,
          title: videoTitle,
          description: videoDescription,
          publish_date: publishDate,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl || (videoPlatform === "youtube" ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined),
          duration_seconds: durationSeconds === "" ? null : Number(durationSeconds),
          views: views === "" ? null : Number(views),
          likes: likes === "" ? null : Number(likes),
          comments: comments === "" ? null : Number(comments),
          check_date: checkDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save video data.");

      setSuccessMsg(`Video "${videoTitle}" saved. Its stats were recorded as a new snapshot.`);
      setListReload((k) => k + 1);
      setVideoId("");
      setVideoTitle("");
      setVideoDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setViews("");
      setLikes("");
      setComments("");
      setDurationSeconds("");
      setYtInfo(null);
      setYtMessage(null);
      setThumbMessage(null);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save video data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full text-left">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-ink">
        <div className="flex items-center gap-2 text-xs text-pencil mb-2">
          <span>Portal</span>
          <span>/</span>
          <span className="text-accent font-medium">Curator Suite</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-3">
              <span>Curator Portal</span>
            </h1>
            <p className="text-xs text-pencil mt-1">
              Add and edit curated creators in your niche, record verification criteria, and pull video links beneath thumbnails.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/creators"
              className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-ink hover:border-accent/50 text-xs font-semibold text-accent hover:text-ink transition-colors"
            >
              View Live Creators
            </Link>
          </div>
        </div>
      </div>

      {/* Signed-in curator: every change is logged to this account (FR-50) */}
      <div className="mb-6 p-4 rounded-2xl bg-white border-2 border-ink flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-score" />
        <span className="text-sm text-pencil">
          Working as <strong className="text-ink">{activeCuratorProfile || "your account"}</strong>. Every creator and video you
          add, edit or remove is recorded under your name.
        </span>
      </div>

      {/* Niche the curator is working on (shared by every tab) */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor="curator-niche" className="text-sm font-bold text-ink">Niche</label>
        <select
          id="curator-niche"
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value as NicheId)}
          className="sk-input w-auto text-sm"
        >
          {ALLOWED_NICHES.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}{n.status === "live" ? "" : " (coming soon)"}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-ink pb-2">
        <button
          onClick={() => setActiveTab("sources")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "sources" ? "bg-ink text-white" : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Source Lists</span>
        </button>

        <button
          onClick={() => setActiveTab("add-creator")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "add-creator"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Add / Edit Creator</span>{/* (FR-44) */}
        </button>

        <button
          onClick={() => setActiveTab("enter-video")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "enter-video"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Enter Video Data</span>{/* (FR-45) */}
        </button>

        <button
          onClick={() => setActiveTab("view-creators")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "view-creators"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Curated Creators ({existingCreators.length})</span>
        </button>
      </div>

      {/* Source lists: the team's research files as ready-made templates */}
      {activeTab === "sources" && (
        <SourceTemplates
          nicheId={selectedNiche}
          nicheName={ALLOWED_NICHES.find((n) => n.id === selectedNiche)?.name || selectedNiche}
          onUseCreator={(g) => {
            setCreatorId(null);
            setPlatform(g.platform);
            setDisplayName(g.displayName.replace(/^@/, ""));
            setHandle(g.handle || "");
            setProfileUrl(g.profileUrl || "");
            setFollowers(g.followers !== null ? String(g.followers) : "");
            setCreatorChannelId(g.channelId || "");
            setCuratedBy(activeCuratorProfile || curatedBy);
            setCuratedOn(new Date().toISOString().split("T")[0]);
            setFromSourceList(true);
            setSuccessMsg(null);
            setErrorMsg(null);
            setActiveTab("add-creator");
          }}
          onUseVideo={(g, v) => {
            if (!g.creatorId) return;
            setSuccessMsg(null);
            setErrorMsg(null);
            setVideoCreatorId(g.creatorId);
            setVideoPlatform(g.platform);
            setVideoUrl(v.url);
            setVideoId(v.videoId);
            setVideoTitle(v.title || v.topic || "");
            setVideoDescription(v.topic || "");
            setThumbnailUrl(v.thumbnailUrl || "");
            setDurationSeconds(v.durationSeconds ? String(v.durationSeconds) : "");
            setViews("");
            setLikes("");
            setComments("");
            setYtInfo(null);
            setYtMessage(null);
            setThumbMessage(
              g.platform === "tiktok" ? "Upload this video's thumbnail and enter its length, views, likes and comments from TikTok." : null
            );
            setActiveTab("enter-video");
            // YouTube: pull the original title, thumbnail, length and current stats
            if (g.platform === "youtube") pullFromYouTube(v.url);
          }}
        />
      )}

      {/* Feedback Banners */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-score/10 border border-score/30 text-score text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
          {returnTo && (
            <Link href={returnTo} className="ml-auto font-bold text-ink underline underline-offset-2">
              Back to the Creators page
            </Link>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 1: ADD / EDIT CREATOR (FR-44)                              */}
      {/* ============================================================== */}
      {activeTab === "add-creator" && (
        <form onSubmit={handleSaveCreator} className="rounded-2xl bg-white border-2 border-ink p-6 space-y-6">
          <div className="border-b border-ink pb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ink" />
              <span>Creator Curation Form</span>{/* FR-44 */}
            </h2>
            <span className="text-[11px] text-pencil">All changes recorded to Audit Log</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Niche Selection */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Curator Niche</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value as NicheId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              >
                {ALLOWED_NICHES.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Platform Group</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform("youtube")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    platform === "youtube"
                      ? "bg-ink text-white"
                      : "bg-white text-pencil border-2 border-ink"
                  }`}
                >
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("tiktok")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    platform === "tiktok"
                      ? "bg-ink text-white"
                      : "bg-white text-pencil border-2 border-ink"
                  }`}
                >
                  TikTok
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Clovert Reaves"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Handle */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Platform Handle</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="e.g. @clovert_creator"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Profile URL */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Profile URL</label>
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://youtube.com/@handle"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Follower Count */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Follower Count</label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                placeholder="e.g. 45000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Curated By (FR-44) */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Curated By</label>{/* (FR-44) */}
              <input
                type="text"
                value={curatedBy}
                onChange={(e) => setCuratedBy(e.target.value)}
                placeholder="Curator Name / Email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Curated On (FR-44) */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Curated On Date</label>{/* (FR-44) */}
              <input
                type="date"
                value={curatedOn}
                onChange={(e) => setCuratedOn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Criteria Checked Checkboxes (FR-44) */}
          <div className="pt-2">
            <label className="text-xs font-bold text-ink block mb-3">
              Curation Criteria Checked{/* (FR-44) */}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CURATION_CRITERIA_OPTIONS.map((criterion) => {
                const checked = criteriaChecked.includes(criterion);
                return (
                  <label
                    key={criterion}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      checked
                        ? "bg-accent/10 border-accent text-ink"
                        : "bg-white border-ink text-pencil hover:text-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleCriteria(criterion)}
                      className="rounded border-ink text-accent focus:ring-0"
                    />
                    <span className="text-xs">{criterion}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-ink flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl btn-primary-kinetic text-white text-xs font-bold flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Creator & Criteria</span>{/* (FR-44) */}
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 2: ENTER VIDEO DATA (FR-45)                                */}
      {/* ============================================================== */}
      {activeTab === "enter-video" && (
        <form onSubmit={handleSaveVideo} className="rounded-2xl bg-white border-2 border-ink p-6 space-y-6">
          <div className="border-b border-ink pb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-score" />
              <span>Enter Video Data</span>{/* FR-45 */}
            </h2>
            <span className="text-[11px] text-pencil">Inserts new snapshot row</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select Creator */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Select Creator</label>
              <select
                value={videoCreatorId}
                onChange={(e) => {
                  setVideoCreatorId(e.target.value);
                  // The video's platform follows the creator's platform
                  const c = existingCreators.find((x) => x.id === e.target.value);
                  if (c?.platform === "tiktok" || c?.platform === "youtube") setVideoPlatform(c.platform);
                }}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              >
                {existingCreators.length === 0 ? (
                  <option value="">No creators in this niche yet</option>
                ) : (
                  existingCreators.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.display_name} ({c.platform})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Video Platform</label>
              <select
                value={videoPlatform}
                onChange={(e) => setVideoPlatform(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              >
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>

            {/* Link first: YouTube pulls everything, TikTok gets an uploaded thumbnail */}
            <div className="md:col-span-2 rounded-xl border-2 border-ink bg-paper p-4 space-y-3">
              <label className="text-xs font-bold text-ink block">
                {videoPlatform === "tiktok" ? "Direct Link Behind Thumbnail (the TikTok video users open)" : "YouTube video link"}
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => {
                    const value = e.target.value;
                    setVideoUrl(value);
                    setYtInfo(null);
                    // Recognise the platform from the link itself
                    const linkPlatform = /tiktok\.com\//i.test(value) ? "tiktok" : /(youtube\.com|youtu\.be)\//i.test(value) ? "youtube" : null;
                    if (linkPlatform && linkPlatform !== videoPlatform) setVideoPlatform(linkPlatform);
                    if (linkPlatform === "tiktok") {
                      const id = tiktokIdFromUrl(value);
                      if (id) setVideoId(id);
                    }
                  }}
                  onBlur={() => {
                    if (videoPlatform === "youtube" && videoUrl && !ytInfo) pullFromYouTube();
                  }}
                  placeholder={videoPlatform === "tiktok" ? "https://www.tiktok.com/@creator/video/…" : "https://www.youtube.com/watch?v=… or a Shorts link"}
                  required
                  className="sk-input flex-1 min-w-[16rem]"
                />
                {videoPlatform === "youtube" && (
                  <button type="button" onClick={() => pullFromYouTube()} disabled={ytFetching || !videoUrl} className="sk-btn-ink px-4 py-2.5 text-xs">
                    {ytFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {ytFetching ? "Pulling…" : "Pull from YouTube"}
                  </button>
                )}
              </div>
              {(() => {
                const creatorPlatform = existingCreators.find((c) => c.id === videoCreatorId)?.platform;
                return creatorPlatform && videoUrl && creatorPlatform !== videoPlatform ? (
                  <p className="text-xs font-semibold text-red-700">
                    This is a {videoPlatform === "tiktok" ? "TikTok" : "YouTube"} link, but the selected creator is on{" "}
                    {creatorPlatform === "tiktok" ? "TikTok" : "YouTube"}. Pick the right creator or link.
                  </p>
                ) : null;
              })()}
              {videoPlatform === "youtube" && ytMessage && (
                <p className={`text-xs ${ytInfo ? "text-pencil" : "text-red-700"}`}>{ytMessage}</p>
              )}

              {videoPlatform === "tiktok" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink block">Card thumbnail (JPG, PNG or WebP, max 2 MB)</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={uploadingThumb}
                    onChange={(e) => handleThumbnailUpload(e.target.files?.[0])}
                    className="block w-full text-xs text-pencil file:mr-3 file:rounded-lg file:border-2 file:border-ink file:bg-white file:px-3 file:py-2 file:text-xs file:font-bold file:text-ink hover:file:bg-paper-deep"
                  />
                  {uploadingThumb && <p className="text-xs text-pencil">Uploading…</p>}
                  {thumbMessage && (
                    <p className={`text-xs ${thumbMessage === "Thumbnail uploaded." ? "text-score" : "text-red-700"}`}>{thumbMessage}</p>
                  )}
                </div>
              )}

              {/* Preview of what users will see on the card */}
              {thumbnailUrl && (
                <div className="flex items-start gap-4 pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt="Card thumbnail preview"
                    className={`rounded-lg border-2 border-ink object-cover ${videoPlatform === "tiktok" ? "w-24 aspect-[9/16]" : "w-48 aspect-video"}`}
                  />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-ink">{videoTitle || "Untitled"}</p>
                    {ytInfo?.channelTitle && <p className="text-pencil">{ytInfo.channelTitle}</p>}
                    {durationSeconds && <p className="text-pencil">Length {formatLength(durationSeconds)}</p>}
                    <button type="button" onClick={() => setThumbnailUrl("")} className="text-red-700 hover:underline">
                      Remove thumbnail
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Video ID (filled from the link) */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Video ID</label>
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                placeholder={videoPlatform === "tiktok" ? "Filled from the TikTok link" : "Filled when you pull from YouTube"}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Length */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">
                Length in seconds {durationSeconds ? `(${formatLength(durationSeconds)})` : ""}
              </label>
              <input
                type="number"
                min={1}
                max={86400}
                value={durationSeconds}
                onChange={(e) => setDurationSeconds(e.target.value)}
                placeholder={videoPlatform === "youtube" ? "Filled from YouTube" : "e.g. 58"}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Title</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Video title"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Publish Date</label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Views */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Views (null if Hidden)</label>
              <input
                type="number"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                placeholder="Leave blank if platform hides metric"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Likes */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Likes (null if Hidden)</label>
              <input
                type="number"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                placeholder="Leave blank if platform hides metric"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Comments (null if Hidden)</label>
              <input
                type="number"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Leave blank if platform hides metric"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>

            {/* Check Date */}
            <div>
              <label className="text-xs font-bold text-ink block mb-2">Snapshot Check Date</label>
              <input
                type="date"
                value={checkDate}
                onChange={(e) => setCheckDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-ink block mb-2">Short Description</label>
            <textarea
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              rows={3}
              placeholder="Brief summary of hook, value pillars, and why this video succeeded..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-4 border-t border-ink flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl btn-primary-kinetic text-white text-xs font-bold flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Enter Video Data</span>{/* (FR-45) */}
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 3: VIEW & AUDIT CURATED CREATORS                           */}
      {/* ============================================================== */}
      {activeTab === "view-creators" && (
        <CreatorList
          nicheId={selectedNiche}
          nicheName={ALLOWED_NICHES.find((n) => n.id === selectedNiche)?.name || selectedNiche}
          reloadKey={listReload}
          onAddCreator={() => {
            setCreatorId(null);
            setDisplayName("");
            setHandle("");
            setProfileUrl("");
            setFollowers("");
            setCreatorChannelId("");
            setCriteriaChecked([]);
            setCuratedBy(activeCuratorProfile || curatedBy);
            setCuratedOn(new Date().toISOString().split("T")[0]);
            setFromSourceList(false);
            setSuccessMsg(null);
            setErrorMsg(null);
            setActiveTab("add-creator");
          }}
          onEditCreator={(c: ListCreator) => {
            setCreatorChannelId(c.channel_id || "");
            handleEditExistingCreator(c);
          }}
          onAddVideo={(c: ListCreator) => {
            setSuccessMsg(null);
            setErrorMsg(null);
            setVideoCreatorId(c.id);
            setVideoPlatform(c.platform);
            setVideoUrl("");
            setVideoId("");
            setVideoTitle("");
            setVideoDescription("");
            setThumbnailUrl("");
            setDurationSeconds("");
            setViews("");
            setLikes("");
            setComments("");
            setYtInfo(null);
            setYtMessage(null);
            setThumbMessage(c.platform === "tiktok" ? "Paste the TikTok link, upload its thumbnail and enter its length and stats." : null);
            setActiveTab("enter-video");
          }}
          onEditVideo={(c: ListCreator, v: ListVideo) => openVideoEditor(c.id, v)}
        />
      )}
    </div>
  );
}
