"use client";

import { useEffect, useState } from "react";
import { getNicheById } from "@/lib/constants/niches";
import { ROLE_LABEL } from "@/components/admin/AdminPanels";

/** Audit log viewer (FR-50, FR-51): who did what, to whom, and when, with filters and paging. */

const ACTION_LABEL: Record<string, string> = {
  role_invite_sent: "Sent a role invitation",
  role_invite_email_sent: "Invitation email delivered",
  role_invite_email_failed: "Invitation email NOT delivered",
  role_invite_accepted: "Accepted a role invitation",
  role_invite_declined: "Declined a role invitation",
  role_invite_revoked: "Withdrew an invitation",
  role_removed: "Removed a role",
  add_creator: "Added a creator",
  edit_creator: "Edited a creator",
  remove_creator: "Removed a creator",
  enter_video_data: "Entered video data",
  manual_youtube_refresh: "Ran YouTube refresh",
  manual_tiktok_title_refresh: "Ran TikTok title refresh",
  fake_snapshots_removed: "Removed simulated stats",
  setting_changed: "Changed a setting",
  gemini_key_changed: "Changed the Gemini API key",
  announcement_sent: "Sent an announcement",
  update_user_role: "Changed a role (old system)",
};

function summarizeDetails(action: string, d: any): string {
  if (!d || typeof d !== "object") return "";
  const role = (r: string) => ROLE_LABEL[r] || r;
  switch (action) {
    case "role_invite_sent":
    case "role_invite_accepted":
    case "role_invite_declined":
      return d.role ? `Role: ${role(d.role)}` : "";
    case "role_invite_email_sent":
      return [d.role && `Role: ${role(d.role)}`, d.reminder && "Reminder for a pending invitation"].filter(Boolean).join(" · ");
    case "role_invite_email_failed":
      return [d.reminder && "Reminder", d.reason].filter(Boolean).join(" · ");
    case "role_removed":
      return [d.previous_role && `Was ${role(d.previous_role)}`, d.reason].filter(Boolean).join(" · ");
    case "add_creator":
    case "edit_creator":
    case "remove_creator":
      return [d.display_name, d.platform, d.niche_id && getNicheById(d.niche_id)?.name].filter(Boolean).join(" · ");
    case "enter_video_data":
      return [d.title, d.views != null && `${Number(d.views).toLocaleString()} views`].filter(Boolean).join(" · ");
    case "manual_youtube_refresh":
      if (d.simulated) return "Old simulated run: its stats were not real";
      return `${d.new_videos_added ?? 0} new videos, ${d.new_snapshots_inserted ?? 0} snapshots, ${d.quota_units_used ?? 0} quota units`;
    case "manual_tiktok_title_refresh":
      return `${d.titles_updated ?? 0} of ${d.videos_checked ?? 0} titles updated`;
    case "fake_snapshots_removed":
      return `${d.rows_removed ?? 0} rows removed`;
    case "setting_changed":
      return `New value: ${JSON.stringify(d.value)}`;
    case "announcement_sent":
      return `"${d.title}" to ${d.recipients ?? 0} people`;
    default:
      return Object.entries(d)
        .slice(0, 3)
        .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`)
        .join(" · ");
  }
}

export function AuditLogTable() {
  const [group, setGroup] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (before?: string) => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ limit: "50" });
    if (group) params.set("action", group);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (before) params.set("before", before);
    try {
      const res = await fetch(`/api/admin/audit-log?${params}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not load the audit log.");
      setRows((prev) => (before ? [...prev, ...json.logs] : json.logs));
      setHasMore(Boolean(json.hasMore));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  const person = (p: any, id?: string | null) =>
    p ? (
      <span>
        <span className="font-semibold text-ink">{p.name}</span>
        <span className="block text-[11px] text-pencil">{p.username ? `@${p.username}` : p.email}</span>
      </span>
    ) : id ? (
      <span className="text-pencil">Deleted account</span>
    ) : (
      <span className="text-pencil">System</span>
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs font-bold text-ink">
          Show
          <select className="sk-input mt-1" value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="">All activity</option>
            <option value="roles">Roles & invitations</option>
            <option value="curation">Curator work</option>
            <option value="refresh">Data refreshes</option>
            <option value="settings">Settings & announcements</option>
          </select>
        </label>
        <label className="text-xs font-bold text-ink">
          From
          <input type="date" className="sk-input mt-1" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label className="text-xs font-bold text-ink">
          To
          <input type="date" className="sk-input mt-1" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <button type="button" onClick={() => load()} className="sk-btn-ink px-4 py-2.5 text-xs">
          Apply
        </button>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
      {!loading && rows.length === 0 && !error && (
        <p className="py-8 text-center text-sm text-pencil">No entries for this selection.</p>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-ink text-[11px] uppercase tracking-wider text-pencil">
              <tr>
                <th className="pb-3 pr-4 font-semibold">When</th>
                <th className="pb-3 pr-4 font-semibold">Who</th>
                <th className="pb-3 pr-4 font-semibold">What</th>
                <th className="pb-3 pr-4 font-semibold">Affected</th>
                <th className="pb-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((log) => (
                <tr key={log.id} className="align-top">
                  <td className="py-3 pr-4 whitespace-nowrap tabular-nums text-pencil">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="py-3 pr-4">{person(log.actor, log.actor_id)}</td>
                  <td className="py-3 pr-4">
                    <span className={`font-semibold ${String(log.action).endsWith("_failed") ? "text-red-700" : "text-ink"}`}>
                      {ACTION_LABEL[log.action] || String(log.action).replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 pr-4 max-w-[14rem]">
                    {log.targetPerson ? person(log.targetPerson) : <span className="break-all text-pencil">{log.target}</span>}
                  </td>
                  <td className="py-3 max-w-xs text-pencil">{summarizeDetails(log.action, log.details)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading && <p className="py-4 text-center text-sm text-pencil">Loading…</p>}
      {hasMore && !loading && (
        <button type="button" onClick={() => load(rows[rows.length - 1]?.created_at)} className="sk-btn px-4 py-2 text-xs">
          Load more
        </button>
      )}
    </div>
  );
}
