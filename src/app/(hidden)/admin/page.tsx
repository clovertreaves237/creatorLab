"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { ShieldCheck, RefreshCw, Users, FileText, AlertTriangle, CheckCircle2, GitBranch, Lock, Clock, ArrowRight, ChevronRight, Database, ExternalLink, Key, PenLine, Loader2 } from "lucide-react";
import Link from "next/link";
import { OverviewPanel, CuratorsPanel, AnnouncePanel, SettingsPanel, UserDetail, RoleBadge } from "@/components/admin/AdminPanels";
import { AuditLogTable } from "@/components/admin/AuditLogTable";

export default function AdminDashboardPage() {
  const supabase = createClient();

  // Active sub-section
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "curators" | "announce" | "settings" | "refresh" | "audit" | "governance" | "gemini"
  >("overview");

  // Who is looking (role from the database): only the super admin can invite or remove admins
  const [viewer, setViewer] = useState<{ id: string | null; isSuperAdmin: boolean }>({ id: null, isSuperAdmin: false });
  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => me && setViewer({ id: me.userId, isSuperAdmin: Boolean(me.isSuperAdmin) }))
      .catch(() => {});
  }, []);

  // Audit log viewer reload (FR-51)
  const [auditKey, setAuditKey] = useState(0);

  // User search + detail (FR-49)
  const [userQuery, setUserQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Gemini API Key State
  const [geminiConfig, setGeminiConfig] = useState<any>(null);
  const [geminiKeyInput, setGeminiKeyInput] = useState("");
  const [isTestingGemini, setIsTestingGemini] = useState(false);
  const [isSavingKey, setIsSavingKey] = useState(false);
  const [geminiTestResult, setGeminiTestResult] = useState<any | null>(null);
  const [keySaveMessage, setKeySaveMessage] = useState<string | null>(null);

  // YouTube Refresh State (FR-46, FR-47, FR-48)
  const [refreshing, setRefreshing] = useState(false);
  const [refreshResult, setRefreshResult] = useState<any | null>(null);

  // User Roles State (FR-49)
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [roleChangeSuccess, setRoleChangeSuccess] = useState<string | null>(null);

  // Audit Log State (FR-50, FR-51)
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // General Notification
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load Users (FR-49)
  const fetchUsers = async (q = userQuery) => {
    setLoadingUsers(true);
    try {
      const res = await fetch(`/api/admin/users${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.warn("Failed to fetch users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Load Audit Logs (FR-50, FR-51)
  const fetchAuditLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("/api/admin/audit-log");
      const data = await res.json();
      if (res.ok) {
        setAuditLogs(data.logs || []);
      }
    } catch (err) {
      console.warn("Failed to fetch audit logs:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    // Messages belong to the tab they came from
    setErrorMsg(null);
    setRoleChangeSuccess(null);
    if (activeTab === "users") fetchUsers();
    if (activeTab === "gemini") fetchGeminiConfig();
  }, [activeTab]);

  const fetchGeminiConfig = async () => {
    try {
      const res = await fetch("/api/admin/gemini");
      const data = await res.json();
      if (res.ok) setGeminiConfig(data);
    } catch {}
  };

  const handleTestGeminiKey = async () => {
    setIsTestingGemini(true);
    setGeminiTestResult(null);
    try {
      const res = await fetch("/api/admin/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: geminiKeyInput.trim() || undefined }),
      });
      const data = await res.json();
      setGeminiTestResult(data);
    } catch (err: any) {
      setGeminiTestResult({ success: false, message: err?.message || "Failed to test key" });
    } finally {
      setIsTestingGemini(false);
    }
  };

  const handleSaveGeminiKey = async () => {
    if (!geminiKeyInput.trim()) return;
    setIsSavingKey(true);
    setKeySaveMessage(null);
    try {
      const res = await fetch("/api/admin/gemini", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: geminiKeyInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update key.");
      setKeySaveMessage(data.message || "Key saved successfully.");
      setGeminiConfig((prev: any) => ({ ...prev, maskedKey: data.maskedKey, configured: true }));
      setGeminiKeyInput("");
      setTimeout(() => setKeySaveMessage(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSavingKey(false);
    }
  };

  // Trigger Manual YouTube Refresh (FR-46, FR-47, FR-48)
  const handleTriggerRefresh = async (platform: "youtube" | "tiktok" = "youtube") => {
    setRefreshing(true);
    setRefreshResult(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Refresh failed.");

      setRefreshResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to trigger manual refresh.");
    } finally {
      setRefreshing(false);
    }
  };

  // Update User Role (FR-49, FR-7). Promotions are invitations the user accepts; removals are immediate.
  // Every action is recorded in the audit log by the database (FR-50).
  const handleUpdateRole = async (
    userId: string,
    action: "invite_curator" | "invite_admin" | "remove_role" | "revoke_invite",
    invitationId?: string
  ): Promise<boolean> => {
    setErrorMsg(null);
    const payload =
      action === "invite_curator"
        ? { action: "invite", user_id: userId, role: "curator" }
        : action === "invite_admin"
        ? { action: "invite", user_id: userId, role: "admin" }
        : action === "remove_role"
        ? { action: "remove_role", user_id: userId }
        : { action: "revoke_invite", invitation_id: invitationId };
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update role.");

      setRoleChangeSuccess(
        (action === "invite_curator" || action === "invite_admin") && data.resent
          ? data.emailSent
            ? "This user already had an invitation waiting, so we emailed them a reminder to answer it."
            : `This user already has an invitation waiting. The reminder email was not sent (${data.emailError || "email not configured"}).`
          : action === "invite_curator" || action === "invite_admin"
          ? "Invitation sent. " +
            (data.emailSent
              ? "An email asking them to answer is on its way, and they have an in-app notification. "
              : `In-app notification only. The email was not sent (${data.emailError || "email not configured"}). `) +
            "They become a " + (action === "invite_admin" ? "admin" : "curator") + " when they accept."
          : action === "remove_role"
          ? "Role removed. The user has been notified."
          : "Invitation withdrawn."
      );
      setTimeout(() => setRoleChangeSuccess(null), 5000);
      fetchUsers();
      return true;
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update user role.");
      return false;
    }
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full text-left">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-ink">
        <div className="flex items-center gap-2 text-xs text-pencil mb-2">
          <span>Portal</span>
          <span>/</span>
          <span className="text-accent font-medium">Administration</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-3">
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-xs text-pencil mt-1">
              Trigger manual YouTube data refresh, manage user roles, view 1-year audit logs, and inspect governance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile?tab=curator"
              className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-ink hover:border-line text-xs font-semibold text-pencil hover:text-ink transition-colors"
            >
              Curator Workspace
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-ink pb-2">
        {(
          [
            ["overview", "Overview"],
            ["curators", "Curator Activity"],
            ["announce", "Announcements"],
            ["settings", "Settings & Invitations"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === id ? "bg-ink text-white" : "text-pencil hover:text-ink hover:bg-white"
            }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => setActiveTab("refresh")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "refresh"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>YouTube Refresh</span>{/* (FR-46..48) */}
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "users"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users & Roles</span>{/* User Role Management (FR-49) */}
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "audit"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Audit Log Viewer</span>{/* Audit Log Viewer (FR-50, FR-51) */}
        </button>

        <button
          onClick={() => setActiveTab("governance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "governance"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Training Rules Governance</span>{/* (FR-52) */}
        </button>

        <button
          onClick={() => setActiveTab("gemini")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "gemini"
              ? "bg-ink text-white"
              : "text-pencil hover:text-ink hover:bg-white"
          }`}
        >
          <Key className="w-4 h-4 text-accent" />
          <span>Gemini API & Quotas</span>
        </button>
      </div>

      {/* General error banner */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {activeTab === "overview" && <OverviewPanel />}
      {activeTab === "curators" && <CuratorsPanel />}
      {activeTab === "announce" && <AnnouncePanel />}
      {activeTab === "settings" && <SettingsPanel />}

      {/* ============================================================== */}
      {/* SECTION 1: MANUAL YOUTUBE REFRESH (FR-46, FR-47, FR-48)        */}
      {/* ============================================================== */}
      {activeTab === "refresh" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white border-2 border-ink p-6 sm:p-8 space-y-6">
            <div className="border-b border-ink pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-ink tracking-tight flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-accent" />
                  <span>Manual YouTube Data Refresh</span>
                </h2>
                <p className="text-xs text-pencil mt-0.5">
                  Pulls the latest real stats from YouTube for videos published in the last 30 days. Each run adds new snapshots; earlier ones are never overwritten.
                </p>
              </div>

              <span className="text-[11px] px-3 py-1 rounded-full bg-paper-deep text-pencil tabular-nums">
                Admin Exclusive{/* (FR-46) */}
              </span>
            </div>

            {/* Explanation of window rule (FR-47 & FR-48) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border-2 border-ink space-y-1">
                <span className="font-bold text-accent">Window Requirement:</span>
                <p className="text-pencil leading-relaxed">
                  YouTube: pulls each creator&apos;s uploads from the last 30 days from the YouTube Data API, adds new ones, and saves real views, likes and comments. TikTok: updates titles of videos from the last 14 days (TikTok shares no stats publicly, so curators enter those).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-ink space-y-1">
                <span className="font-bold text-score">Snapshot Immutability:</span>
                <p className="text-pencil leading-relaxed">
                  Each refresh inserts a brand new snapshot row per video into <code className="text-pencil-light">video_snapshots</code>. Existing snapshots are NEVER overwritten, preserving historical telemetry.
                </p>
              </div>
            </div>

            {/* Refresh Trigger Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-ink">
              <span className="text-xs text-pencil">
                Each run is logged in the audit log with the YouTube quota it used.
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTriggerRefresh("tiktok")}
                  disabled={refreshing}
                  className="sk-btn px-5 py-3 text-xs"
                >
                  Refresh TikTok titles
                </button>
                <button
                  onClick={() => handleTriggerRefresh("youtube")}
                  disabled={refreshing}
                  className="px-6 py-3 rounded-2xl btn-primary-kinetic text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                  <span>{refreshing ? "Refreshing…" : "Trigger Manual YouTube Refresh"}</span>{/* Trigger Manual YouTube Refresh (FR-46) */}
                </button>
              </div>
            </div>
          </div>

          {/* Loader or Result */}
          {refreshing && (
            <div className="p-12 rounded-2xl bg-white border-2 border-ink flex flex-col items-center justify-center">
              <MobiusLoader
                variant="general"
                size="lg"
                label="Executing Manual YouTube Data Refresh"
                sublabel="Querying YouTube within 30-day window and inserting immutable snapshot rows..."
              />
            </div>
          )}

          {refreshResult && !refreshing && (
            <div className="rounded-2xl bg-score/5 border border-score/30 p-6 space-y-3">
              <div className="flex items-center gap-2 text-score text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Refresh Pipeline Succeeded</span>
              </div>
              <p className="text-xs text-ink font-medium">{refreshResult.message}</p>
              {refreshResult.creatorProblems?.length > 0 && (
                <ul className="text-xs text-red-700 list-disc pl-5">
                  {refreshResult.creatorProblems.map((p: string) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-4 text-xs text-pencil pt-2 border-t border-score/20 tabular-nums">
                <span>Window: {refreshResult.windowDays} days</span>
                {refreshResult.platform === "youtube" ? (
                  <>
                    <span>&bull;</span>
                    <span>Creators Checked: {refreshResult.creatorsChecked}</span>
                    <span>&bull;</span>
                    <span>New videos: {refreshResult.newVideosAdded}</span>
                    <span>&bull;</span>
                    <span>New Snapshots: {refreshResult.newSnapshotsInserted} inserted</span>
                    <span>&bull;</span>
                    <span>Quota used: {refreshResult.quotaUnitsUsed} units</span>
                  </>
                ) : (
                  <>
                    <span>&bull;</span>
                    <span>Titles updated: {refreshResult.titlesUpdated}</span>
                  </>
                )}
                <span>&bull;</span>
                <span>Timestamp: {new Date(refreshResult.refreshedAt).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: USER ROLE MANAGEMENT (FR-49)                         */}
      {/* ============================================================== */}
      {activeTab === "users" && (
        <div className="rounded-2xl bg-white border-2 border-ink p-6 space-y-6">
          <div className="border-b border-ink pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink tracking-tight flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>Manage User Roles and View Accounts</span>{/* (FR-49) */}
              </h2>
              <p className="text-xs text-pencil mt-0.5">
                Admins shall be able to manage user roles and view registered accounts.
              </p>
            </div>
            <button
              onClick={() => fetchUsers()}
              className="p-2 rounded-xl border-2 border-ink hover:border-line text-pencil hover:text-ink text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload</span>
            </button>
          </div>

          {/* Search any user by username, name or email (pulled from the database) */}
          <form
            className="flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSelectedUserId(null);
              fetchUsers(userQuery);
            }}
          >
            <input
              className="sk-input max-w-md"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Search by @username, name or email"
              aria-label="Search users"
            />
            <button type="submit" className="sk-btn-ink px-5 py-2.5">
              Search
            </button>
          </form>

          {selectedUserId && (
            <UserDetail
              userId={selectedUserId}
              viewerId={viewer.id}
              viewerIsSuperAdmin={viewer.isSuperAdmin}
              onUpdateRole={handleUpdateRole}
              onClose={() => setSelectedUserId(null)}
            />
          )}

          {roleChangeSuccess && (
            <div className="p-3 rounded-xl bg-score/10 border border-score/30 text-score text-xs flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{roleChangeSuccess}</span>
            </div>
          )}

          {loadingUsers ? (
            <div className="py-12 flex justify-center">
              <MobiusLoader variant="general" size="md" label="Loading User Directory..." />
            </div>
          ) : users.length === 0 ? (
            <p className="text-xs text-pencil py-8 text-center">No user accounts found in database.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-pencil">
                <thead className="border-b border-ink text-[11px] uppercase tracking-wider text-pencil">
                  <tr>
                    <th className="pb-3 font-semibold">User</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Current Role</th>
                    <th className="pb-3 font-semibold">Joined</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>{/* (FR-49) */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {users.map((u) => (
                    <tr key={u.id} className={`transition-colors ${selectedUserId === u.id ? "bg-hl-yellow/30" : "hover:bg-paper"}`}>
                      <td className="py-3">
                        <p className="text-ink font-semibold text-sm">{u.display_name || "Creator"}</p>
                        {u.username && <p className="text-pencil">@{u.username}</p>}
                      </td>
                      <td className="py-3 tabular-nums">{u.email}</td>
                      <td className="py-3">
                        <RoleBadge role={u.role || "user"} />
                      </td>
                      <td className="py-3 text-pencil">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <button type="button" onClick={() => setSelectedUserId(u.id)} className="sk-btn px-3 py-1.5 text-xs">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 3: AUDIT LOG VIEWER (FR-50, FR-51)                     */}
      {/* ============================================================== */}
      {activeTab === "audit" && (
        <div className="rounded-2xl bg-white border-2 border-ink p-6 space-y-6">
          <div className="border-b border-ink pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-ink tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>Audit Log Viewer</span>{/* Audit Log Viewer (FR-50, FR-51) */}
              </h2>
              <p className="text-xs text-pencil mt-0.5">
                Records who, what, and when. Retained for one year.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-score tabular-nums px-2.5 py-1 rounded-lg bg-white border-2 border-ink">
                Retention: 1 Year{/* Retention: 1 Year (FR-50) */}
              </span>
              <button
                onClick={() => setAuditKey((k) => k + 1)}
                aria-label="Reload audit log"
                className="p-1.5 rounded-xl border-2 border-ink hover:border-line text-pencil hover:text-ink"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <AuditLogTable key={auditKey} />
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 4: REPOSITORY GOVERNANCE (FR-52)                        */}
      {/* ============================================================== */}
      {activeTab === "governance" && (
        <div className="rounded-2xl bg-white border-2 border-ink p-6 sm:p-8 space-y-6">
          <div className="border-b border-ink pb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-ink tracking-tight flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-score" />
              <span>Training Rules Repository Governance</span>{/* (FR-52) */}
            </h2>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-score/10 text-score border border-score/30 tabular-nums font-bold">
              Strictly Read-Only In Product
            </span>
          </div>

          {/* Mandatory FR-52 Notice */}
          <div className="p-5 rounded-2xl bg-white border border-accent/50 space-y-3">
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4 text-score" />
              <span>Requirement Specification:</span>{/* FR-52 */}
            </div>
            <p className="text-xs sm:text-sm text-ink font-semibold leading-relaxed">
              &ldquo;Training rules shall be updated only through the repository, not through the product.&rdquo;
            </p>
            <p className="text-xs text-pencil leading-relaxed">
              To guarantee algorithmic integrity, model reproducibility, and prevent unauthorized prompt injection, all short-form video pacing rules, hook frameworks, and niche training packs are version-controlled in the CreatorLab Git repository. They cannot be modified via HTTP endpoints or admin forms.
            </p>
          </div>

          {/* Repository Files Manifest */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              Repository Training Rules Manifest
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs tabular-nums">
              <div className="p-3 rounded-xl bg-white border-2 border-ink flex items-center justify-between">
                <span>/training-rules/core/hook-frameworks.md</span>
                <span className="text-score text-[10px]">GIT TRACKED</span>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-ink flex items-center justify-between">
                <span>/training-rules/core/script-structure.md</span>
                <span className="text-score text-[10px]">GIT TRACKED</span>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-ink flex items-center justify-between">
                <span>/training-rules/branding-marketing/rules.md</span>
                <span className="text-score text-[10px]">GIT TRACKED</span>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-ink flex items-center justify-between">
                <span>/training-rules/tech-news/rules.md</span>
                <span className="text-score text-[10px]">GIT TRACKED</span>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-ink flex items-center justify-between">
                <span>/training-rules/faceless-content/rules.md</span>
                <span className="text-score text-[10px]">GIT TRACKED</span>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-ink flex items-center justify-between">
                <span>/training-rules/startups-founders/rules.md</span>
                <span className="text-score text-[10px]">GIT TRACKED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 5: GEMINI API KEY & QUOTA MANAGEMENT                   */}
      {/* ============================================================== */}
      {activeTab === "gemini" && (
        <div className="rounded-2xl bg-white border-2 border-ink p-6 sm:p-8 space-y-6">
          <div className="border-b border-ink pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-ink tracking-tight flex items-center gap-2">
                <Key className="w-4 h-4 text-accent" />
                <span>Google Gemini API Key & Neural Generation Diagnostics</span>
              </h2>
              <p className="text-xs text-pencil mt-0.5">
                Manage the neural model API key exclusively in the Admin Portal. Test live connectivity and monitor quota limits.
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-score/10 text-score border border-score/30 tabular-nums font-bold">
              Admin Exclusive
            </span>
          </div>

          {keySaveMessage && (
            <div className="p-4 rounded-2xl bg-score/10 border border-score/30 text-score text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{keySaveMessage}</span>
            </div>
          )}

          {/* Current Key Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-4 h-4 text-accent" />
                  <span>Configured Key Status</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-score/20 text-score tabular-nums font-bold">
                  Active in .env.local
                </span>
              </div>
              <p className="text-xs text-pencil">
                Masked Key: <code className="text-accent tabular-nums bg-white px-2 py-1 rounded">{geminiConfig?.maskedKey || "AQ.Ab8RN...QmIg"}</code>
              </p>
              <p className="text-[11px] text-pencil">
                Quota Profile: <span className="text-ink font-semibold">{geminiConfig?.quotaTier || "Free Tier (RPM: 15, RPD: 1,500)"}</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-3">
              <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                <PenLine className="w-4 h-4 text-score" />
                <span>Active Model Routing</span>
              </span>
              <p className="text-xs text-pencil leading-relaxed">
                Primary endpoints prioritized: <code className="text-accent">gemini-flash-latest</code>, <code className="text-accent">gemini-3.8-flash</code>, and <code className="text-accent">gemini-pro-latest</code> with automated 1-retry fallback.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleTestGeminiKey}
                  disabled={isTestingGemini}
                  className="px-4 py-2 rounded-xl bg-ink hover:bg-ink-soft text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  {isTestingGemini ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying with Google API...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Test Key Live Connectivity</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Test Result Display */}
          {geminiTestResult && (
            <div
              className={`p-5 rounded-2xl border text-xs space-y-2.5 ${
                geminiTestResult.success
                  ? "bg-score/5 border-score/40 text-pencil-light"
                  : "bg-red-50 border-red-300 text-red-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-2">
                  {geminiTestResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-score" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                  )}
                  <span>{geminiTestResult.success ? "Key Verified Working" : "Verification Notice"}</span>
                </span>
                {geminiTestResult.latencyMs && (
                  <span className="tabular-nums text-[10px] text-pencil">
                    Latency: {geminiTestResult.latencyMs}ms
                  </span>
                )}
              </div>
              <p className="leading-relaxed">{geminiTestResult.message}</p>
              {geminiTestResult.models && geminiTestResult.models.length > 0 && (
                <div className="pt-2 border-t border-line">
                  <span className="font-semibold block mb-1 text-accent">Models Confirmed Available:</span>
                  <div className="flex flex-wrap gap-1.5 tabular-nums text-[10px]">
                    {geminiTestResult.models.map((m: string) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-white border border-line">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Update Key Form */}
          <div className="p-5 rounded-2xl bg-white border-2 border-ink space-y-3">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              Update Google Gemini API Key
            </h3>
            <p className="text-xs text-pencil">
              Enter a new key below to update the system environment. This key will be applied to all future Creator Engine script generations.
            </p>
            <div className="flex gap-2 max-w-xl">
              <input
                type="password"
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                placeholder="Paste new Gemini key..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink text-xs tabular-nums placeholder:text-pencil/40 focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={handleSaveGeminiKey}
                disabled={isSavingKey || !geminiKeyInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-score/20 hover:bg-score/30 text-score border border-score/40 text-xs font-bold transition-all disabled:opacity-40"
              >
                {isSavingKey ? "Saving..." : "Save Key"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
