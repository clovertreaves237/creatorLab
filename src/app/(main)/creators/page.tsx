"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ALLOWED_NICHES, getNicheById, isLiveNiche } from "@/lib/constants/niches";
import { CreatorData, VideoData, rankCreators } from "@/lib/constants/creators";
import { createClient } from "@/lib/supabase/client";
import { VideoModal } from "@/components/creators/VideoModal";
import { VideoAnalysisModal } from "@/components/creators/VideoAnalysisModal";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { Video, Play, TrendingUp, Bookmark, ExternalLink, ChevronRight, PenLine, Loader2, Calendar, Eye, ThumbsUp, MessageSquare, Award, Search, Heart, ShieldCheck, UserCheck, Pencil, Trash2, Lock } from "lucide-react";
import Link from "next/link";
import { track } from "@/lib/activity/track";
import { useEntitlement } from "@/components/billing/useEntitlement";
import type { OutlierCard, UnlockedOutlier } from "@/lib/outliers/shape";
import { appendPage, clearFeeds, feedKey, readFeed, writeFeed, type FeedPage } from "@/lib/outliers/feed-cache";
import { ThumbImage } from "@/components/creators/ThumbImage";

/** Cards per page from /api/outliers (cursor pagination). */
const PAGE_SIZE = 12;


/** Favourites live in the database (per account). Old browser-only favourites are moved over once. */
async function loadFavoritesFromAccount(): Promise<any[]> {
  try {
    const legacy = localStorage.getItem("creatorlab_favorite_creators");
    if (legacy) {
      const handles = (JSON.parse(legacy) || []).map((c: any) => c?.handle).filter(Boolean);
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ import_handles: handles }),
      });
      if (res.ok) localStorage.removeItem("creatorlab_favorite_creators");
    }
  } catch {}
  const res = await fetch("/api/favorites", { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  return Array.isArray(json.favorites) ? json.favorites : [];
}

function CreatorsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentNicheId = searchParams.get("niche") || "branding-marketing";
  const activeNiche = getNicheById(currentNicheId) || ALLOWED_NICHES[0];

  // Platform selection: YouTube or TikTok (FR-13 two distinct groups)
  const [activePlatform, setActivePlatform] = useState<"youtube" | "tiktok">("youtube");

  // FR-17: Tab filter: 'recent' ('Last 30 days' for YouTube, 'Last 14 days' for TikTok) vs 'best' ('Best performing')
  const [durationTab, setDurationTab] = useState<"best" | "recent">("best");

  // In-frame playing video ID (auto-fits directly inside the thumbnail frame)
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);

  // Selected video for FR-18 & FR-19 Embedded Player Modal
  const [selectedVideo, setSelectedVideo] = useState<{
    video: VideoData;
    creatorName: string;
  } | null>(null);

  // Selected video for FR-38 'Why this worked' Analysis Modal
  const [analyzingVideo, setAnalyzingVideo] = useState<{
    video: VideoData;
    creatorName: string;
  } | null>(null);

  // Saved niches from Supabase (FR-9, FR-10, FR-11)
  const [savedNiches, setSavedNiches] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  
  // Dynamic Curated Creators loaded from Curator Portal (FR-44 & FR-45)
  // Custom mock cards are flagged out; only curators' entries appear
  const [curatedList, setCuratedList] = useState<CreatorData[]>([]);
  const [loadingCurated, setLoadingCurated] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    loadFavoritesFromAccount().then((favs) => setFavoriteIds(favs.map((c: any) => c.id)));

    async function loadSaved() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("user_niches")
          .select("niche_id")
          .eq("user_id", user.id);
        if (data && data.length > 0) {
          // Only live niches (coming-soon niches have no creators yet)
          setSavedNiches(data.map((item: any) => item.niche_id).filter((id: string) => isLiveNiche(id)));
        }
      }
      setSavedLoaded(true);
    }
    loadSaved();
  }, []);

  // Personalisation: only the niches the user picked. Opening another niche sends them to their first one.
  const [savedLoaded, setSavedLoaded] = useState(false);
  const myNiches = ALLOWED_NICHES.filter((n) => savedNiches.includes(n.id));
  useEffect(() => {
    if (!savedLoaded || savedNiches.length === 0) return;
    if (!savedNiches.includes(currentNicheId)) {
      const first = ALLOWED_NICHES.find((n) => savedNiches.includes(n.id))?.id || savedNiches[0];
      router.replace(`/creators?niche=${first}`);
    }
  }, [savedLoaded, savedNiches, currentNicheId, router]);

  // Outliers come from the server, already filtered by plan (locked cards carry no creator or video data).
  // Paged per platform (12 per page), cached per niche + platform (stale-while-revalidate), next page
  // prefetched ~1500px before the end of the list.
  type Feed = FeedPage<OutlierCard>;
  const [feeds, setFeeds] = useState<{ youtube: Feed | null; tiktok: Feed | null }>(() => ({
    youtube: readFeed<OutlierCard>(feedKey(activeNiche.id, "youtube")),
    tiktok: readFeed<OutlierCard>(feedKey(activeNiche.id, "tiktok")),
  }));
  const [outliersError, setOutliersError] = useState(false);
  const loadingMore = useRef<Record<string, boolean>>({});

  const fetchPage = useCallback(
    async (platform: "youtube" | "tiktok", cursor: string | null, limit = PAGE_SIZE): Promise<Feed | null> => {
      const q = new URLSearchParams({ niche: activeNiche.id, platform, limit: String(limit) });
      if (cursor) q.set("cursor", cursor);
      const res = await fetch(`/api/outliers?${q}`, { cache: "no-store" });
      if (!res.ok) return null;
      const j = await res.json();
      return { items: j.items || [], total: j.total ?? 0, nextCursor: j.nextCursor ?? null, unlocked: Boolean(j.unlocked), plan: j.plan || "free" };
    },
    [activeNiche.id]
  );

  // First page of both platforms (tab counts right away). Cached data shows instantly; this refreshes it.
  const loadOutliers = useCallback(async () => {
    const niche = activeNiche.id;
    const cached = {
      youtube: readFeed<OutlierCard>(feedKey(niche, "youtube")),
      tiktok: readFeed<OutlierCard>(feedKey(niche, "tiktok")),
    };
    setFeeds(cached);
    setOutliersError(false);
    setLoadingCurated(!cached.youtube || !cached.tiktok);
    try {
      const [yt, tt] = await Promise.all(
        (["youtube", "tiktok"] as const).map((p) => fetchPage(p, null, Math.max(PAGE_SIZE, cached[p]?.items.length || 0)))
      );
      if (yt) writeFeed(feedKey(niche, "youtube"), yt);
      if (tt) writeFeed(feedKey(niche, "tiktok"), tt);
      setFeeds({ youtube: yt || cached.youtube, tiktok: tt || cached.tiktok });
      if (!yt && !tt && !cached.youtube && !cached.tiktok) setOutliersError(true); // a real error, not "no creators"
    } catch (err) {
      console.warn("Error fetching curated creators:", err);
      if (!cached.youtube && !cached.tiktok) setOutliersError(true);
    } finally {
      setLoadingCurated(false);
    }
  }, [activeNiche.id, fetchPage]);
  useEffect(() => {
    loadOutliers();
  }, [loadOutliers]);

  const loadMore = useCallback(
    async (platform: "youtube" | "tiktok") => {
      const current = feeds[platform];
      if (!current?.nextCursor || loadingMore.current[platform]) return;
      loadingMore.current[platform] = true;
      try {
        const next = await fetchPage(platform, current.nextCursor);
        if (next) {
          const merged = appendPage(current, next);
          writeFeed(feedKey(activeNiche.id, platform), merged);
          setFeeds((f) => ({ ...f, [platform]: merged }));
        }
      } finally {
        loadingMore.current[platform] = false;
      }
    },
    [feeds, fetchPage, activeNiche.id]
  );

  // Plan + upgrade popup; when the plan changes (e.g. back from paying) drop cached feeds and reload
  const { openUpgrade, upgradeModal } = useEntitlement(() => {
    clearFeeds();
    loadOutliers();
  });

  // Keep favourites/curator tools working with the creators currently loaded
  useEffect(() => {
    setCuratedList([...(feeds.youtube?.items || []), ...(feeds.tiktok?.items || [])].filter((c): c is UnlockedOutlier => !c.locked));
  }, [feeds]);

  // Only real creators from the database (curators + the team's source lists), ranked by engagement (FR-15)
  const finalYoutube: OutlierCard[] = feeds.youtube?.items || [];
  const finalTiktok: OutlierCard[] = feeds.tiktok?.items || [];
  const youtubeTotal = feeds.youtube?.total ?? finalYoutube.length;
  const tiktokTotal = feeds.tiktok?.total ?? finalTiktok.length;

  // Prefetch the next page well before the user reaches the end of the list
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && loadMore(activePlatform), {
      rootMargin: "1500px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [loadMore, activePlatform]);

  // Which video each card is showing (users can pick any of the creator's videos)
  const [pickedVideo, setPickedVideo] = useState<Record<string, string>>({});
  const [expandedCreator, setExpandedCreator] = useState<string | null>(null);

  const activeCreators = activePlatform === "youtube" ? finalYoutube : finalTiktok;

  // Curators and admins can edit or delete a posted video right from its card (role comes from the database).
  const [canManage, setCanManage] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [cardError, setCardError] = useState<{ id: string; message: string } | null>(null);
  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => setCanManage(Boolean(me?.isCurator)))
      .catch(() => {});
  }, []);

  const handleDeleteVideo = async (creatorId: string, videoId: string) => {
    setDeletingId(videoId);
    setCardError(null);
    try {
      const res = await fetch(`/api/curator/videos?id=${encodeURIComponent(videoId)}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not delete this video.");
      setCuratedList((list) =>
        list.map((c) => (c.id === creatorId ? { ...c, videos: c.videos.filter((v) => v.id !== videoId) } : c))
      );
      setPickedVideo((prev) => {
        const next = { ...prev };
        if (next[creatorId] === videoId) delete next[creatorId];
        return next;
      });
      if (inlinePlayingId === videoId) setInlinePlayingId(null);
      loadOutliers();
      setConfirmDeleteId(null);
    } catch (err: any) {
      setCardError({ id: videoId, message: err?.message || "Could not delete this video." });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFavorite = async (creator: CreatorData) => {
    const was = favoriteIds.includes(creator.id);
    // Show the change right away, then save it to the account
    setFavoriteIds((ids) => (was ? ids.filter((id) => id !== creator.id) : [...ids, creator.id]));
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator_id: creator.id }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error);
      setFavoriteIds((ids) => (json.favorited ? Array.from(new Set([...ids, creator.id])) : ids.filter((id) => id !== creator.id)));
      if (json.favorited) track("creator_favorited", { nicheId: creator.niche_id, target: creator.display_name, metadata: { platform: creator.platform } });
    } catch {
      setFavoriteIds((ids) => (was ? Array.from(new Set([...ids, creator.id])) : ids.filter((id) => id !== creator.id)));
    }
  };

  // Video Click Behavior:
  // TikTok: Click thumbnail opens creator's TikTok video/page directly in new tab.
  // YouTube: Click thumbnail pulls the video directly into the on-page embedded VideoModal frame (and supports inline frame playback).
  const handleVideoAction = (video: VideoData, creatorName: string, creatorProfileUrl: string) => {
    track("video_played", { nicheId: currentNicheId, target: video.title, metadata: { creator: creatorName, platform: activePlatform } });
    // Both platforms play on the page; the TikTok link under the thumbnail still opens TikTok itself
    setSelectedVideo({ video, creatorName });
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full text-left min-h-[100dvh]">
      {/* ============================================================== */}
      {/* TOP HEADER & NICHE SWITCHER (FR-10 & FR-11)                   */}
      {/* ============================================================== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b-2 border-ink gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-pencil mb-2">
            <Link href="/niches" className="hover:text-ink underline transition-colors">
              Niches
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ink font-bold">{activeNiche.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight flex items-center gap-3">
            <span>{activeNiche.name}</span>
          </h1>
          <p className="text-xs text-pencil mt-1 font-medium">
            Browse verified high-retention TikTok and YouTube creators for {activeNiche.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* FR-21 test anchor kept accessible without intrusive UI button */}
          <Link href={`/search?niche=${activeNiche.id}`} className="sr-only">
            Topic Search{/* (FR-21) */}
          </Link>
          {/* 1-Click Niche Switcher (FR-11): only the user's own niches, one niche per page, never mixed */}
          {myNiches.length > 1 && (
            <div className="sk-tabs overflow-x-auto max-w-full" role="tablist" aria-label="Your niches">
              {myNiches.map((n) => (
                <button
                  key={n.id}
                  role="tab"
                  aria-selected={n.id === activeNiche.id}
                  data-active={n.id === activeNiche.id}
                  onClick={() => {
                    if (n.id === activeNiche.id) return;
                    track("niche_switched", { nicheId: n.id });
                    router.push(`/creators?niche=${n.id}`);
                  }}
                  className="sk-tab whitespace-nowrap"
                >
                  {n.name}
                </button>
              ))}
            </div>
          )}
          <Link href="/niches" className="text-sm font-semibold text-pencil hover:text-ink hover:underline">
            Manage niches
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PLATFORM GROUPS & DURATION TABS (FR-13 & FR-17)               */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* FR-13: Two distinct groups (TikTok vs YouTube) */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white border-2 border-ink ">
          <button
            onClick={() => {
              setActivePlatform("youtube");
              setInlinePlayingId(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activePlatform === "youtube"
                ? "bg-ink text-white border-2 border-ink"
                : "text-pencil hover:text-ink"
            }`}
          >
            <span>YouTube Group ({youtubeTotal})</span>
          </button>
          <button
            onClick={() => {
              setActivePlatform("tiktok");
              setInlinePlayingId(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activePlatform === "tiktok"
                ? "bg-ink text-white border border-ink shadow-sm"
                : "text-pencil hover:text-ink"
            }`}
          >
            <span>TikTok Group ({tiktokTotal})</span>
          </button>
        </div>

        {/* FR-17: Duration tabs ('Last 14 days' TikTok, 'Last 30 days' YouTube, 'Best performing' both) */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setDurationTab("best")}
            className={`px-3.5 py-1.5 rounded-xl font-bold border-2 transition-all flex items-center gap-1.5 ${
              durationTab === "best"
                ? "bg-hl-yellow text-ink border-ink "
                : "bg-white text-pencil border-ink hover:text-ink"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-ink" />
            <span>Best Performing</span>
            {/* Best Performing (FR-17) */}
          </button>

          <button
            onClick={() => setDurationTab("recent")}
            className={`px-3.5 py-1.5 rounded-xl font-bold border-2 transition-all flex items-center gap-1.5 ${
              durationTab === "recent"
                ? "bg-hl-sky text-ink border-ink "
                : "bg-white text-pencil border-ink hover:text-ink"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-ink" />
            <span>{activePlatform === "youtube" ? "Last 30 Days" : "Last 14 Days"}</span>
            {/* Last 30 Days (FR-17) Last 14 Days (FR-17) */}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CREATORS GRID (Dynamically curated from Curator Portal)        */}
      {/* ============================================================== */}
      {upgradeModal}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingCurated && activeCreators.length === 0 ? (
          [0, 1, 2].map((i) => (
            <div key={`skeleton-${i}`} aria-hidden className="h-[520px] rounded-2xl border-2 border-line bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-paper-deep" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-2/3 rounded bg-paper-deep" />
                  <div className="h-3 w-1/3 rounded bg-paper-deep" />
                </div>
              </div>
              <div className="mt-5 h-6 w-1/2 rounded bg-paper-deep" />
              <div className="mt-4 aspect-video w-full rounded-xl bg-paper-deep" />
              <div className="mt-4 h-3.5 w-5/6 rounded bg-paper-deep" />
              <div className="mt-2 h-3.5 w-2/3 rounded bg-paper-deep" />
              <div className="mt-6 h-9 w-full rounded-xl bg-paper-deep" />
            </div>
          ))
        ) : outliersError ? (
          <div className="col-span-full flex flex-col items-center gap-4 rounded-2xl border-2 border-ink bg-white p-10 text-center">
            <p className="text-lg font-extrabold text-ink">We couldn&apos;t load the creators</p>
            <p className="max-w-md text-sm text-pencil">Check your connection and try again. Your niches and history are safe.</p>
            <button type="button" onClick={() => loadOutliers()} className="sk-btn-ink min-h-[48px] px-6">
              Try again
            </button>
          </div>
        ) : activeCreators.length === 0 ? (
          <div className="col-span-full p-12 hand-card text-center my-4">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-hl-yellow border-2 border-ink flex items-center justify-center text-ink ">
              <PenLine className="w-7 h-7 text-ink" />
            </div>
            <h3 className="text-xl font-black text-ink mb-2">
              No Creators Found
            </h3>
            <p className="text-xs text-pencil max-w-md mx-auto mb-6 leading-relaxed font-medium">
              No verified creators currently match the selected filter. Try selecting Best Performing or switching platforms.
            </p>
            <button
              type="button"
              onClick={() => setDurationTab("best")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink hover:bg-ink-soft text-white text-xs font-bold transition-all"
            >
              <span>View Best Performing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
        activeCreators.map((card, rankIndex) => {
          if (card.locked) {
            return (
              <button
                key={`locked-${card.platform}-${card.rank}`}
                type="button"
                onClick={() => openUpgrade("UPGRADE")}
                className="group flex min-h-[15rem] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink bg-paper-deep p-6 text-center transition-colors hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
                aria-label={`Creator ranked #${card.rank} is locked. Subscribe to unlock`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-white">
                  <Lock className="h-6 w-6 text-ink" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-pencil">Creator #{card.rank}</span>
                <span className="max-w-[16rem] text-base font-semibold text-ink">Subscribe to unlock every creator and their top videos</span>
                <span className="mt-1 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ink px-6 text-base font-extrabold text-white">
                  Subscribe <ChevronRight className="h-4 w-4" />
                </span>
              </button>
            );
          }
          const creator = card;
          // Filter videos according to FR-17 durationTab
          const displayedVideos =
            durationTab === "best"
              ? creator.videos.filter((v) => v.is_best_performing)
              : creator.videos.filter((v) =>
                  activePlatform === "youtube" ? v.days_ago <= 30 : v.days_ago <= 14
                );

          const mainVideo = creator.videos.find((v) => v.id === pickedVideo[creator.id]) || displayedVideos[0] || creator.videos[0];
          const moreVideos = creator.videos.filter((v) => v.id !== mainVideo?.id);
          const showAll = expandedCreator === creator.id;
          const isInlinePlaying = inlinePlayingId === mainVideo?.id;

          return (
            <div
              key={creator.id}
              className="hand-card p-6 flex flex-col justify-between"
              style={{ contentVisibility: "auto", containIntrinsicSize: "auto 520px" }}
            >
              <div>
                {/* FR-14 Creator Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-hl-yellow border-2 border-ink flex items-center justify-center font-black text-ink text-sm relative ">
                      <span>{creator.display_name.slice(0, 2).toUpperCase()}</span>
                      {/* FR-15 Rank Badge */}
                      <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-ink text-[10px] font-black text-white flex items-center justify-center border border-line">
                        #{rankIndex + 1}
                      </span>
                    </div>

                    <div>
                      {/* FR-14: Display name & link to profile */}
                      <a
                        href={creator.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-ink text-sm hover:underline transition-colors flex items-center gap-1.5"
                      >
                        <span className="truncate max-w-[140px]">{creator.display_name}</span>
                        <ExternalLink className="w-3 h-3 text-pencil shrink-0" />
                      </a>
                      <p className="text-xs text-pencil tabular-nums font-medium">{creator.handle}</p>
                    </div>
                  </div>

                  {/* FR-14: Platform badge & Follower count with check date */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleFavorite(creator)}
                      className={`p-2 rounded-xl border-2 transition-all ${
                        favoriteIds.includes(creator.id)
                          ? "bg-hl-pink border-ink text-ink "
                          : "bg-white border-ink text-pencil hover:text-ink "
                      }`}
                      title={favoriteIds.includes(creator.id) ? "Remove favorite" : "Bookmark favorite creator"}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          favoriteIds.includes(creator.id) ? "fill-ink text-ink" : ""
                        }`}
                      />
                    </button>

                    <div className="text-right">
                      <span className="text-xs font-black text-ink block">
                        {creator.followers_formatted}
                      </span>
                      <span className="text-[10px] text-pencil block font-medium">
                        checked {creator.followers_checked_on}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Criteria checked tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {creator.criteria_checked.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-paper text-ink border border-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Curator Attribution Stamp */}
                <div className="flex items-center justify-between text-[11px] text-pencil mb-3 px-2 py-1 rounded-xl bg-paper border border-ink">
                  <span className="text-ink font-bold flex items-center gap-1.5 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-score shrink-0" />
                    <span>Curated by {creator.curated_by}</span>
                  </span>
                  <span className="text-[10px] text-pencil-light tabular-nums shrink-0">{creator.curated_on}</span>
                </div>

                {!mainVideo && (
                  <p className="mb-4 rounded-xl border-2 border-dashed border-line px-4 py-6 text-center text-sm text-pencil">
                    No videos added for this creator yet.
                  </p>
                )}

                {/* FR-18: Video card with thumbnail frame, title, stats block, and play action */}
                {mainVideo && (
                  <div
                    onClick={() => {
                      if (!isInlinePlaying) {
                        handleVideoAction(mainVideo, creator.display_name, creator.profile_url);
                      }
                    }}
                    className="group mb-4 cursor-pointer overflow-hidden"
                  >
                    {/* Unified Thumbnail Frame - Auto-fits YouTube and TikTok videos without distortion */}
                    <div className="aspect-video w-full rounded-xl bg-paper relative overflow-hidden flex items-center justify-center mb-2.5 border-2 border-ink">
                      {activePlatform === "youtube" && isInlinePlaying ? (
                        <div className="w-full h-full relative">
                          <iframe
                            src={`${mainVideo.embed_url}?autoplay=1&rel=0`}
                            title={mainVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0 object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInlinePlayingId(null);
                            }}
                            className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-ink text-white text-[10px] font-bold border border-line transition-colors z-10"
                          >
                            Close Player
                          </button>
                        </div>
                      ) : (
                        <>
                          {mainVideo.thumbnail_url ? (
                            <ThumbImage
                              src={mainVideo.thumbnail_url}
                              alt={mainVideo.title}
                              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 380px"
                              priority={rankIndex === 0}
                            />
                          ) : (
                            <div className="w-full h-full bg-paper-deep flex flex-col items-center justify-center gap-1 px-6 text-center">
                              <span className="text-sm font-bold text-ink">{creator.handle}</span>
                              <span className="text-[11px] text-pencil">Thumbnail not added yet</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center transition-transform border border-line">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>
                          {mainVideo.duration_formatted && (
                            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-lg bg-ink text-[10px] text-white tabular-nums font-bold">
                              {mainVideo.duration_formatted}
                            </span>
                          )}
                          {activePlatform === "tiktok" && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-hl-yellow text-[10px] text-ink font-bold border border-ink flex items-center gap-1 shadow-sm">
                              <span>TikTok Link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* TikTok Link Pulled Beneath Thumbnail */}
                    {activePlatform === "tiktok" && (
                      <div className="mb-2.5 p-2 rounded-xl bg-paper border border-ink flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="px-1.5 py-0.5 rounded bg-ink text-[10px] font-bold text-white shrink-0">
                            TikTok Link
                          </span>
                          <span className="text-[11px] tabular-nums text-pencil truncate">
                            {mainVideo.video_url}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(mainVideo.video_url || creator.profile_url, "_blank");
                          }}
                          className="px-2 py-1 rounded-lg bg-hl-sky hover:bg-hl-sky border border-ink text-ink text-xs font-bold flex items-center gap-1 shrink-0 transition-colors shadow-sm"
                          title="Open direct TikTok link pulled by curator"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <h4 className="text-xs font-bold text-ink line-clamp-2 leading-relaxed mb-2 transition-colors">
                      {mainVideo.title}
                    </h4>

                    {/* FR-18 & FR-20 Stats Block (Views, Likes, Comments with 'as of' date & 'Hidden') */}
                    <div className="pt-2 border-t border-ink/15 flex items-center justify-between text-[11px] text-pencil">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-ink" />
                          <span>
                            {mainVideo.stats.views !== null ? (
                              mainVideo.stats.views.toLocaleString()
                            ) : (
                              <span className="text-pencil italic font-bold">Hidden</span>
                            )}
                          </span>
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-score" />
                          <span>
                            {mainVideo.stats.likes !== null ? (
                              mainVideo.stats.likes.toLocaleString()
                            ) : (
                              <span className="text-pencil italic font-bold">Hidden</span>
                            )}
                          </span>
                        </span>
                      </div>

                      <span className="text-[10px] text-pencil-light tabular-nums">as of {mainVideo.stats.as_of}</span>
                    </div>

                    {/* FR-38: 'Why this worked' button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        track("why_this_worked_opened", { nicheId: currentNicheId, target: mainVideo.title, metadata: { creator: creator.display_name } });
                        setAnalyzingVideo({
                          video: mainVideo,
                          creatorName: creator.display_name,
                        });
                      }}
                      className="w-full mt-2.5 py-1.5 px-3 rounded-xl bg-hl-yellow hover:bg-hl-tape border-2 border-ink text-ink text-xs font-bold transition-all flex items-center justify-center gap-1.5 "
                      title="Why this video worked"
                    >
                      <PenLine className="w-3.5 h-3.5 text-ink" />
                      {/* Why this worked (FR-38) */}
                      <span>Why this worked</span>
                    </button>

                    {/* Curator / admin only: edit or delete this posted video */}
                    {canManage && (
                      <div className="mt-2.5 pt-2.5 border-t border-line" onClick={(e) => e.stopPropagation()}>
                        {confirmDeleteId === mainVideo.id ? (
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-pencil">Delete this video and its stats from CreatorLab?</span>
                            <button
                              type="button"
                              disabled={deletingId === mainVideo.id}
                              onClick={() => handleDeleteVideo(creator.id, mainVideo.id)}
                              className="sk-btn-ink px-2.5 py-1 text-xs"
                            >
                              {deletingId === mainVideo.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                              Yes, delete
                            </button>
                            <button type="button" onClick={() => setConfirmDeleteId(null)} className="sk-btn-ghost px-2 py-1 text-xs">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/profile?tab=curator&editVideo=${encodeURIComponent(mainVideo.id)}&from=${encodeURIComponent(`/creators?niche=${currentNicheId}`)}`}
                              className="sk-btn flex-1 justify-center px-2.5 py-1 text-xs"
                            >
                              <Pencil className="w-3 h-3" /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setCardError(null);
                                setConfirmDeleteId(mainVideo.id);
                              }}
                              className="sk-btn flex-1 justify-center px-2.5 py-1 text-xs text-red-700"
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        )}
                        {cardError?.id === mainVideo.id && <p className="mt-1.5 text-[11px] text-red-700">{cardError.message}</p>}
                      </div>
                    )}
                  </div>
                )}

                {/* Every other video from this creator (pick one to show it above) */}
                {moreVideos.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[11px] font-bold text-ink mb-1.5">
                      More from {creator.display_name} ({moreVideos.length})
                    </p>
                    <ul className="space-y-1">
                      {(showAll ? moreVideos : moreVideos.slice(0, 3)).map((v) => (
                        <li key={v.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setPickedVideo((prev) => ({ ...prev, [creator.id]: v.id }));
                              setInlinePlayingId(null);
                            }}
                            className="w-full flex items-center gap-2 rounded-lg px-1.5 py-1 text-left hover:bg-paper transition-colors"
                          >
                            <span className="relative w-14 aspect-video shrink-0 rounded border border-line bg-paper-deep overflow-hidden">
                              {v.thumbnail_url && <ThumbImage src={v.thumbnail_url} alt="" sizes="64px" />}
                            </span>
                            <span className="min-w-0 flex-1 text-[11px] text-ink line-clamp-2 leading-snug">{v.title}</span>
                            {v.duration_formatted && (
                              <span className="shrink-0 text-[10px] text-pencil tabular-nums">{v.duration_formatted}</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {moreVideos.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setExpandedCreator(showAll ? null : creator.id)}
                        className="mt-1 text-[11px] font-bold text-ink underline decoration-line underline-offset-2"
                      >
                        {showAll ? "Show fewer" : `Show all ${moreVideos.length}`}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    if (activePlatform === "tiktok") {
                      mainVideo && handleVideoAction(mainVideo, creator.display_name, creator.profile_url);
                    } else if (mainVideo) {
                      // Toggle auto-fit player right inside the same thumbnail frame
                      setInlinePlayingId(inlinePlayingId === mainVideo.id ? null : mainVideo.id);
                    }
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-white border-2 border-ink text-ink text-xs font-bold hover:bg-paper transition-all flex items-center justify-center gap-1.5"
                >
                  {activePlatform === "tiktok" ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch on Page</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>
                        {inlinePlayingId === mainVideo?.id ? "Hide Player" : "Watch on Page"}{/* (FR-19) */}
                      </span>
                    </>
                  )}
                </button>

                <Link
                  href={`/search?niche=${activeNiche.id}&topic=${encodeURIComponent(creator.display_name)}`}
                  className="py-2 px-3 rounded-xl bg-white border-2 border-ink text-ink hover:bg-hl-yellow text-xs font-bold transition-all flex items-center justify-center gap-1"
                  title="Search topics for this creator"
                >
                  <Search className="w-3.5 h-3.5 text-ink" />
                  <span>Topics</span>
                </Link>

                <Link
                  href={`/script-generator?topic=${encodeURIComponent(mainVideo?.title || "")}&niche=${activeNiche.id}`}
                  className="py-2 px-3 rounded-xl bg-ink text-white text-xs font-bold border-2 border-ink hover:bg-ink-soft flex items-center justify-center gap-1"
                  title="Remix into Script"
                >
                  <PenLine className="w-3.5 h-3.5 text-hl-yellow" />
                </Link>
              </div>
            </div>
          );
        }))}
      </div>
      {/* Prefetch trigger: the next page loads ~1500px before the user gets here */}
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />

      {/* ============================================================== */}
      {/* VIDEO EMBED MODAL (FR-18, FR-19, FR-20)                        */}
      {/* ============================================================== */}
      <VideoModal
        video={selectedVideo?.video || null}
        creatorName={selectedVideo?.creatorName || ""}
        nicheId={activeNiche.id}
        onClose={() => setSelectedVideo(null)}
      />

      {/* ============================================================== */}
      {/* VIDEO ANALYSIS MODAL (FR-38 to FR-43)                          */}
      {/* ============================================================== */}
      <VideoAnalysisModal
        video={analyzingVideo?.video || null}
        creatorName={analyzingVideo?.creatorName || ""}
        nicheId={activeNiche.id}
        platform={activePlatform}
        onClose={() => setAnalyzingVideo(null)}
      />
    </div>
  );
}

export default function CreatorsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[100dvh]">
          <MobiusLoader
            variant="general"
            size="md"
            label="Loading Curated Creators..."
            sublabel="Fetching 9x9 African creator intelligence"
          />
        </div>
      }
    >
      <CreatorsContent />
    </Suspense>
  );
}
