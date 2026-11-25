"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ALLOWED_NICHES, getNicheById } from "@/lib/constants/niches";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { User, Mail, Shield, Trash2, LogOut, CheckCircle2, PenLine, TrendingUp, Clock, Layers, FileText, Bookmark, ExternalLink, ChevronRight, Edit3, Calendar, Flame, BarChart2, Check, Search, Copy, Heart, Sliders, AlertTriangle, ArrowRight, Bell, ClipboardList, ShieldCheck } from "lucide-react";
import { ActivityPanel } from "@/components/profile/ActivityPanel";
import { track } from "@/lib/activity/track";
import { NotificationList, type AppNotification } from "@/components/notifications/NotificationList";
import CuratorWorkspace from "@/app/(hidden)/curator/page";
import { ProfileCover, ProfileAvatar } from "@/components/profile/ProfileMedia";
import { ScriptHistory } from "@/components/profile/ScriptHistory";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [savedNiches, setSavedNiches] = useState<string[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [favoriteCreators, setFavoriteCreators] = useState<any[]>([]);
  const [historyCount, setHistoryCount] = useState<number | null>(null);

  // Edit Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaveMessage, setProfileSaveMessage] = useState<string | null>(null);

  // Active Tab
  type ProfileTab =
    | "dashboard" | "niches" | "history" | "favorites" | "recommendations" | "settings"
    | "activity" | "notifications" | "curator";
  const [activeTab, setActiveTab] = useState<ProfileTab>("dashboard");

  // Role from the database (via /api/me): curator tab + admin portal link only for staff
  const [me, setMe] = useState<{ isCurator: boolean; isAdmin: boolean; adminPath: string | null } | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    try {
      const res = await fetch("/api/notifications?limit=50", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setNotifications(json.notifications || []);
      setUnreadCount(json.unread || 0);
    } catch {}
  };

  const markAllNotificationsRead = async () => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    }).catch(() => {});
    loadNotifications();
  };

  useEffect(() => {
    // ?tab=activity | notifications | curator ... (links from notifications and the header menu)
    const tab = new URLSearchParams(window.location.search).get("tab") as ProfileTab | null;
    const allowed: ProfileTab[] = ["dashboard", "niches", "history", "favorites", "recommendations", "settings", "activity", "notifications", "curator"];
    if (tab && allowed.includes(tab)) setActiveTab(tab);
    fetch("/api/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => json && setMe({ isCurator: Boolean(json.isCurator), isAdmin: Boolean(json.isAdmin), adminPath: json.adminPath || null }))
      .catch(() => {});
    loadNotifications();
  }, []);

  // Deletion Request State (FR-5, NFR-14)
  const [deleteScheduled, setDeleteScheduled] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  // Script copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load Profile & Analytics Data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.status === 401) {
          router.push("/signin?redirect=/profile");
          return;
        }

        const data = await res.json();
        if (data.success) {
          setProfileData(data.profile);
          setFirstName(data.profile.firstName || "");
          setLastName(data.profile.lastName || "");
          setDisplayName(data.profile.displayName || "");
          setBio(data.profile.bio || "");
          setSavedNiches(data.savedNiches || []);
          setAnalytics(data.analytics || null);
          setHistory(data.history || []);
          setRecommendations(data.recommendations || null);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }

    // Favourite creators are stored on the account
    fetch("/api/favorites", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => setFavoriteCreators(Array.isArray(json.favorites) ? json.favorites : []))
      .catch(() => setFavoriteCreators([]));

    fetchProfile();
  }, [router]);

  // Handle Edit Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSaveMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          displayName,
        }),
      });

      const data = await res.json();
      // Bio is stored on the profile row
      const bioRes = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaOnly: true, bio }),
      });
      if (!bioRes.ok) {
        const b = await bioRes.json().catch(() => ({}));
        setProfileSaveMessage(b.error || "Your name was saved, but the bio could not be saved.");
      }
      if (res.ok && data.success) {
        setProfileData((prev: any) => ({
          ...prev,
          firstName,
          lastName,
          displayName,
          bio: bio.trim() || null,
        }));
        setProfileSaveMessage("Profile updated successfully!");
        track("profile_updated");
        setTimeout(() => {
          setIsEditing(false);
          setProfileSaveMessage(null);
        }, 1500);
      } else {
        setProfileSaveMessage(data.error || "Failed to update profile.");
      }
    } catch {
      setProfileSaveMessage("An error occurred while updating profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Remove a saved niche (FR-12)
  const handleRemoveNiche = async (nicheId: string) => {
    if (savedNiches.length <= 1) {
      alert("You must keep at least one saved niche as your primary preference.");
      return;
    }

    const nextNiches = savedNiches.filter((id) => id !== nicheId);
    setSavedNiches(nextNiches);

    try {
      if (profileData?.id) {
        await supabase
          .from("user_niches")
          .delete()
          .match({ user_id: profileData.id, niche_id: nicheId });
      }
    } catch (err) {
      console.warn("Could not delete from Supabase user_niches:", err);
    }
  };

  // Remove a favorite creator
  const handleRemoveFavorite = async (creatorId: string) => {
    const before = favoriteCreators;
    setFavoriteCreators(before.filter((c) => c.id !== creatorId));
    const res = await fetch(`/api/favorites?creator_id=${encodeURIComponent(creatorId)}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) setFavoriteCreators(before);
  };

  // Request Account Deletion (FR-5, NFR-14)
  const handleRequestDeletion = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to request account deletion? All your account data will be permanently wiped within 90 days."
    );
    if (!confirmed || !profileData?.id) return;

    try {
      await supabase
        .from("profiles")
        .update({ deletion_requested_at: new Date().toISOString() })
        .eq("id", profileData.id);

      setDeleteMessage("Account deletion scheduled. Your data will be permanently wiped within 90 days.");
      setDeleteScheduled(true);
    } catch {
      setDeleteMessage("Account deletion requested.");
      setDeleteScheduled(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleCopyScript = (scriptText: string, id: string) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-paper">
        <MobiusLoader
          variant="general"
          size="lg"
          label="Loading Your CreatorLab Profile..."
          sublabel="Aggregating operations analysis, saved niches, and history"
        />
      </div>
    );
  }

  const initials =
    (firstName?.[0] || "") + (lastName?.[0] || "") ||
    profileData?.displayName?.slice(0, 2)?.toUpperCase() ||
    "CL";

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full text-left">
      {/* ============================================================== */}
      {/* PROFILE HEADER CARD                                            */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-ink mb-8 relative overflow-hidden">
        <ProfileCover
          url={profileData?.coverUrl || null}
          onChange={(url) => setProfileData((p: any) => ({ ...(p || {}), coverUrl: url }))}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar Frame */}
            <ProfileAvatar
              url={profileData?.avatarUrl || null}
              initials={initials}
              onChange={(url) => setProfileData((p: any) => ({ ...(p || {}), avatarUrl: url }))}
            />

            {/* Profile Info */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                  {profileData?.displayName || "African Creator"}
                </h1>
                {profileData?.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-score/10 text-score border border-score/30 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-pencil mt-0.5">{profileData?.email}</p>
              {profileData?.bio && <p className="mt-1.5 max-w-xl text-sm text-ink">{profileData.bio}</p>}
              <div className="flex items-center gap-3 text-[11px] text-pencil mt-2 tabular-nums">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-accent" />
                  <span>CreatorLab Member</span>
                </span>
                <span>&bull;</span>
                <span>Primary: {savedNiches[0] ? getNicheById(savedNiches[0])?.name : "Branding"}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions: Edit Profile (Admin & Curator links removed from ordinary user view) */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-paper-deep border-2 border-ink hover:border-ink text-xs font-semibold text-ink transition-all flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-accent" />
              <span>{isEditing ? "Close Editor" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Inline Profile Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="mt-6 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200"
          >
            <div>
              <label className="text-[11px] font-bold text-pencil uppercase block mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Samuel"
                className="w-full px-3 py-2 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-pencil uppercase block mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Eto'o"
                className="w-full px-3 py-2 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-pencil uppercase block mb-1">
                Display Name (shown in app)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Samuel E."
                required
                className="w-full px-3 py-2 rounded-xl bg-white border-2 border-ink text-ink text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="profile-bio" className="text-[11px] font-bold text-pencil uppercase block mb-1">
                About you (shown on your profile)
              </label>
              <textarea
                id="profile-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 280))}
                rows={2}
                placeholder="e.g. Curator for Branding & Marketing. I study creators who sell to African audiences."
                className="sk-input w-full resize-none text-xs"
              />
              <span className="text-[11px] text-pencil tabular-nums">{bio.length}/280</span>
            </div>
            <div className="sm:col-span-3 flex items-center justify-between pt-2">
              <span className="text-xs text-score font-medium">
                {profileSaveMessage}
              </span>
              <button
                type="submit"
                disabled={savingProfile}
                className="btn-primary-kinetic px-5 py-2 rounded-xl text-white text-xs font-bold transition-all"
              >
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ============================================================== */}
      {/* NAVIGATION TABS                                                */}
      {/* ============================================================== */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-ink text-xs font-semibold">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "dashboard"
              ? "bg-ink text-white"
              : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Operations Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("niches")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "niches"
              ? "bg-ink text-white"
              : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Niches ({savedNiches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "history"
              ? "bg-ink text-white"
              : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Script History ({historyCount ?? history.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "favorites"
              ? "bg-ink text-white"
              : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorite Creators ({favoriteCreators.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("recommendations")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "recommendations"
              ? "bg-ink text-white"
              : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <PenLine className="w-4 h-4 text-score" />
          <span>Recommendations</span>
        </button>

        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "activity" ? "bg-ink text-white" : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>My Activity</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "notifications" ? "bg-ink text-white" : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications{unreadCount > 0 ? ` (${unreadCount})` : ""}</span>
        </button>

        {me?.isCurator && (
          <button
            onClick={() => setActiveTab("curator")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "curator" ? "bg-ink text-white" : "bg-white border-2 border-ink text-pencil hover:text-ink"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Curator Workspace</span>
          </button>
        )}

        {me?.adminPath && (
          <Link
            href={me.adminPath}
            className="px-4 py-2 rounded-xl transition-all flex items-center gap-2 bg-white border-2 border-ink text-pencil hover:text-ink"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
          </Link>
        )}

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "settings"
              ? "bg-ink text-white"
              : "bg-white border-2 border-ink text-pencil hover:text-ink"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* My activity: everything the user does, tracked to their profile */}
      {activeTab === "activity" && <ActivityPanel />}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="sk-card">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-base font-bold text-ink">Notifications</h2>
            {unreadCount > 0 && (
              <button type="button" onClick={markAllNotificationsRead} className="text-sm font-semibold text-accent hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <NotificationList items={notifications} onChanged={loadNotifications} />
        </div>
      )}

      {/* Curator tools appear only for accounts that accepted a curator invitation */}
      {activeTab === "curator" && me?.isCurator && (
        <div className="-mx-4">
          <CuratorWorkspace />
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 1: OPERATIONS ANALYSIS DASHBOARD                           */}
      {/* ============================================================== */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Metrics KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-2">
              <span className="text-[11px] font-bold text-pencil uppercase tracking-wider block">
                Total Scripts Generated
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ink">
                  {analytics?.totalScripts || 0}
                </span>
                <span className="text-xs text-score tabular-nums font-semibold">
                  +{analytics?.weekScriptsCount || 0} this week
                </span>
              </div>
              <p className="text-[10px] text-pencil">{analytics?.todayScriptsCount || 0} written today</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-pencil uppercase tracking-wider">
                  Daily Quota
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent tabular-nums">
                  {analytics?.dailyQuotaLimit === 0 ? "No limit" : `${analytics?.quotaRemaining ?? 0} left`}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ink">
                  {analytics?.quotaUsedToday || 0}
                </span>
                <span className="text-xs text-pencil tabular-nums">
                  {analytics?.dailyQuotaLimit === 0 ? "today" : `/ ${analytics?.dailyQuotaLimit ?? 0} today`}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-line">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-ink"
                  style={{
                    width: `${Math.min(
                      100,
                      analytics?.dailyQuotaLimit ? ((analytics?.quotaUsedToday || 0) / analytics.dailyQuotaLimit) * 100 : 0
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-2">
              <span className="text-[11px] font-bold text-pencil uppercase tracking-wider block">
                Spoken Time Produced
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ink">
                  {analytics?.totalSpokenSeconds || 0}s
                </span>
                <span className="text-xs text-accent tabular-nums">
                  ~{Math.round((analytics?.totalSpokenSeconds || 0) / 60)} mins
                </span>
              </div>
              <p className="text-[10px] text-pencil">{(analytics?.totalWords || 0).toLocaleString()} words written</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-2">
              <span className="text-[11px] font-bold text-pencil uppercase tracking-wider block">
                Top Preferred Niche
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-ink truncate">
                  {analytics?.topNiche ? getNicheById(analytics.topNiche)?.name : "No scripts yet"}
                </span>
              </div>
              <p className="text-[10px] text-pencil tabular-nums">{analytics?.topNiche ? `${analytics.nicheCounts?.[analytics.topNiche] || 0} scripts` : "Write a script to see this"}</p>
            </div>
          </div>

          {/* Quick Shortcuts to Core Features */}
          <div className="p-6 rounded-2xl bg-white border-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-ink flex items-center gap-2 justify-center sm:justify-start">
                <PenLine className="w-4 h-4 text-score" />
                <span>Launch Creator Engine</span>
              </h3>
              <p className="text-xs text-pencil">
                Paste your research notes and get a 120-second script.
              </p>
            </div>

            <Link
              href="/script-generator"
              className="btn-primary-kinetic px-6 py-3 rounded-2xl text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>Open Creator Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: SAVED NICHES (FR-9, FR-10, FR-11, FR-12)                 */}
      {/* ============================================================== */}
      {activeTab === "niches" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-ink">
                Your Saved Niches
              </h3>
              <p className="text-xs text-pencil">
                Switch niches in one click or remove them from your active preferences.
              </p>
            </div>
            <Link
              href="/niches"
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-ink text-xs text-accent hover:border-ink font-semibold transition-all"
            >
              + Manage All Niches
            </Link>
          </div>

          {savedNiches.length === 0 && (
            <p className="rounded-2xl border border-dashed border-ink bg-white p-10 text-center text-xs text-pencil">
              You have not chosen a niche yet. <Link href="/niches" className="font-bold text-ink underline">Choose your niches</Link>.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedNiches.map((nicheId) => {
              const niche = getNicheById(nicheId);
              if (!niche) return null;
              return (
                <div
                  key={niche.id}
                  className="p-5 rounded-2xl bg-white border-2 border-ink hover:border-accent/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-ink">{niche.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-score/20 text-score tabular-nums font-bold">
                        {niche.status === "live" ? "Live" : "Coming soon"}
                      </span>
                    </div>
                    <p className="text-xs text-pencil leading-relaxed mb-4">
                      {niche.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-line">
                    <Link
                      href={`/creators?niche=${niche.id}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-ink hover:bg-ink-soft text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Open Creators</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleRemoveNiche(niche.id)}
                      className="p-2 rounded-xl bg-white hover:bg-red-50 border-2 border-ink hover:border-red-300 text-pencil hover:text-red-700 transition-colors"
                      title="Remove from saved niches"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: PAST GENERATION HISTORY                                 */}
      {/* ============================================================== */}
      {activeTab === "history" && <ScriptHistory onCountChange={setHistoryCount} />}

      {/* ============================================================== */}
      {/* TAB 4: FAVORITE CREATORS                                       */}
      {/* ============================================================== */}
      {activeTab === "favorites" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-ink">
                Favorite Curated Creators
              </h3>
              <p className="text-xs text-pencil">
                Your bookmarked 9x9 creators for rapid reference and study.
              </p>
            </div>
            <Link
              href="/creators"
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-ink text-xs text-accent hover:border-ink font-semibold transition-all"
            >
              Browse 9x9 Creators
            </Link>
          </div>

          {favoriteCreators.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border border-dashed border-ink text-center space-y-3">
              <Heart className="w-8 h-8 text-pencil mx-auto" />
              <p className="text-xs text-pencil">
                You have not bookmarked any creators yet. Visit Curated Creators and click the heart icon on any card!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="p-5 rounded-2xl bg-white border-2 border-ink space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-ink">
                        {creator.display_name}
                      </h4>
                      <p className="text-[11px] text-pencil tabular-nums">{creator.handle}</p>
                    </div>

                    <button
                      onClick={() => handleRemoveFavorite(creator.id)}
                      className="text-red-700 hover:text-red-700 p-1 rounded-lg"
                      title="Remove favorite"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <a
                    href={creator.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-xl bg-white hover:bg-paper-deep border-2 border-ink text-accent text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: AI RECOMMENDATIONS                                      */}
      {/* ============================================================== */}
      {activeTab === "recommendations" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-ink">Ideas from your niches</h3>
            <p className="text-xs text-pencil">The newest videos curators added to your niches. Watch one, then write your own take.</p>
          </div>

          {!recommendations?.topics?.length ? (
            <p className="rounded-2xl border border-dashed border-ink bg-white p-10 text-center text-xs text-pencil">
              {savedNiches.length === 0
                ? "Choose a niche first. Ideas appear here from the creators in your niches."
                : "No videos in your niches yet. They appear here as soon as curators add them."}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recommendations.topics.map((rec: any) => (
                <div key={rec.url} className="flex flex-col justify-between rounded-2xl border-2 border-ink bg-white p-4">
                  <div>
                    <div className={`mb-3 overflow-hidden rounded-xl border border-line bg-paper-deep ${rec.platform === "tiktok" ? "mx-auto aspect-[9/16] w-28" : "aspect-video"}`}>
                      {rec.thumbnailUrl && <img src={rec.thumbnailUrl} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <p className="text-[11px] text-pencil">
                      {rec.creator} · {getNicheById(rec.niche)?.name} · {new Date(rec.publishedAt).toLocaleDateString()}
                    </p>
                    <h5 className="mt-1 text-xs font-bold leading-relaxed text-ink line-clamp-3">{rec.title}</h5>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={rec.url} target="_blank" rel="noopener noreferrer" className="sk-btn flex-1 justify-center text-xs">
                      Watch <ExternalLink className="h-3 w-3" />
                    </a>
                    <Link
                      href={`/script-generator?topic=${encodeURIComponent(rec.title)}&niche=${rec.niche}`}
                      className="sk-btn-ink flex-1 justify-center text-xs"
                    >
                      Write my take
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {recommendations?.lockedTopics > 0 && (
            <Link
              href="/billing"
              className="flex min-h-[48px] items-center justify-between gap-3 rounded-xl border-2 border-dashed border-ink bg-paper-deep px-4 py-3 text-sm font-semibold text-ink hover:bg-white"
            >
              <span>{recommendations.lockedTopics} more recommended videos are locked on the free plan</span>
              <span className="shrink-0 rounded-lg bg-ink px-3 py-1.5 text-xs font-extrabold text-white">Subscribe</span>
            </Link>
          )}

          {recommendations?.creators?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Creators to study</h4>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.creators.map((c: any) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 rounded-xl border-2 border-ink bg-white px-4 py-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink">{c.display_name}</span>
                      <span className="block text-[11px] text-pencil">
                        {c.platform === "youtube" ? "YouTube" : "TikTok"} · {getNicheById(c.niche_id)?.name}
                      </span>
                    </span>
                    <Link href={`/creators?niche=${c.niche_id}`} className="sk-btn shrink-0 px-2.5 py-1 text-xs">
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: SETTINGS & DATA PROTECTION (FR-5, NFR-14)                */}
      {/* ============================================================== */}
      {activeTab === "settings" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h3 className="text-sm font-bold text-ink">
              Account Settings & Data Protection
            </h3>
            <p className="text-xs text-pencil">
              Manage your credentials, privacy rights, and scheduled deletion.
            </p>
          </div>

          {deleteMessage && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-700" />
              <span>{deleteMessage}</span>
            </div>
          )}

          {/* Privacy Notice Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-2">
            <span className="text-xs font-bold text-ink flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-score" />
              <span>CreatorLab Privacy Standard</span>
            </span>
            <p className="text-xs text-pencil leading-relaxed">
              Your research notes are never stored. Gemini generates scripts strictly from CreatorLab&apos;s
              versioned training rules and your momentary inputs.
            </p>
          </div>

          {/* Danger Zone: Request Deletion */}
          <div className="p-5 rounded-2xl bg-red-50 border border-red-300 space-y-3">
            <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Danger Zone: 90-Day Account Deletion</span>
            </span>
            <p className="text-xs text-pencil leading-relaxed">
              Requesting deletion will initiate a permanent schedule. All account records, preferences, and
              history will be permanently erased within 90 days in accordance with data governance rules.
            </p>

            <button
              onClick={handleRequestDeletion}
              disabled={deleteScheduled}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-50 border border-red-300 text-red-700 text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>{deleteScheduled ? "Deletion Scheduled" : "Request 90-Day Deletion"}</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="pt-2">
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-paper-deep border-2 border-ink text-red-700 hover:text-red-700 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
