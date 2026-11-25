"use client";

import { useEffect, useState } from "react";
import { ALLOWED_NICHES, getNicheById } from "@/lib/constants/niches";
import { describeEvent } from "@/lib/activity/track";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { timeAgo } from "@/components/notifications/NotificationList";

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

export const ROLE_LABEL: Record<string, string> = {
  user: "User",
  curator: "Curator",
  admin: "Admin",
  super_admin: "Super admin",
  visitor: "Visitor",
};

export function RoleBadge({ role }: { role: string }) {
  const style =
    role === "super_admin" || role === "admin"
      ? "bg-ink text-white"
      : role === "curator"
      ? "bg-hl-yellow text-ink border border-ink"
      : "bg-paper-deep text-pencil";
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${style}`}>{ROLE_LABEL[role] || role}</span>;
}

function Stat({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="sk-card p-5">
      <p className="text-3xl font-extrabold text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
      {hint && <p className="text-xs text-pencil">{hint}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

export function OverviewPanel() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<14 | 30 | 90>(14);

  // Live: reloads every 10 seconds while the tab is visible, and right away when you come back to it
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(`/api/admin/overview?days=${days}`, { cache: "no-store" })
        .then(async (r) => {
          const json = await r.json();
          if (!r.ok) throw new Error(json.error || "Could not load the overview.");
          if (alive) {
            setData(json);
            setError(null);
          }
        })
        .catch((e) => alive && setError(e.message));
    load();
    const timer = setInterval(() => document.visibilityState === "visible" && load(), 10000);
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      alive = false;
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [days]);

  if (error && !data) return <p className="sk-card-flat p-6 text-red-700">{error}</p>;
  if (!data) return <div className="py-10"><MobiusLoader size="md" label="Loading the overview" /></div>;

  const max = Math.max(1, ...data.scriptsPerDay.map((d: any) => d.value));
  const labelEvery = data.scriptsPerDay.length > 30 ? 7 : data.scriptsPerDay.length > 14 ? 3 : 1;
  return (
    <div className="space-y-8">
      <p className="flex items-center gap-2 text-xs text-pencil">
        <span className="inline-block h-2 w-2 rounded-full bg-score" aria-hidden />
        Live · updated {new Date(data.generatedAt).toLocaleTimeString()}
        {error && <span className="text-red-700"> · last refresh failed, retrying</span>}
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Users" value={data.users} hint={`${data.newUsers7} new this week`} />
        <Stat label="Active this week" value={data.activeUsers7} hint={`${data.notOnboarded} have not finished setup`} />
        <Stat label="Scripts today" value={data.scriptsToday} hint={`${data.scriptsTotal} written since launch`} />
        <Stat label="Curators" value={data.curators} hint={`${data.admins} admins · ${data.pendingInvites} invites pending`} />
      </div>

      <section className="sk-card p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-ink">Scripts written</h3>
            <p className="text-xs text-pencil">
              {data.scriptsInRange} in the last {data.days} days · {data.scriptsTotal} since launch
            </p>
          </div>
          <div className="sk-tabs" role="tablist" aria-label="Range">
            {([14, 30, 90] as const).map((d) => (
              <button key={d} type="button" role="tab" className="sk-tab" data-active={days === d} onClick={() => setDays(d)}>
                {d} days
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex h-44 min-w-[28rem] items-end gap-1" role="img" aria-label={`Scripts per day for the last ${data.days} days`}>
            {data.scriptsPerDay.map((d: any, i: number) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-1" title={`${d.date}: ${d.value} script${d.value === 1 ? "" : "s"}`}>
                <span className="text-[10px] tabular-nums text-pencil">{d.value || ""}</span>
                <div className={`w-full rounded-t ${d.value ? "bg-ink" : "bg-line"}`} style={{ height: `${Math.max(2, (d.value / max) * 130)}px` }} />
                <span className="h-3 text-[10px] text-pencil-light">{i % labelEvery === 0 || i === data.scriptsPerDay.length - 1 ? d.date.slice(5) : ""}</span>
              </div>
            ))}
          </div>
        </div>
        {Object.keys(data.scriptsPerNiche || {}).length > 0 && (
          <p className="mt-4 text-xs text-pencil">
            By niche:{" "}
            {ALLOWED_NICHES.filter((n) => data.scriptsPerNiche[n.id])
              .map((n) => `${n.name} ${data.scriptsPerNiche[n.id]}`)
              .join(" · ")}
          </p>
        )}
      </section>

      <section className="sk-card p-6">
        <h3 className="mb-1 font-bold text-ink">Live activity</h3>
        <p className="mb-3 text-xs text-pencil">What people are doing on CreatorLab right now, newest first.</p>
        {!data.activityAvailable ? (
          <p className="text-sm text-red-700">
            Activity cannot be read yet. Run the latest database migration (supabase/migrations) in the Supabase SQL editor.
          </p>
        ) : data.activity.length === 0 ? (
          <p className="text-sm text-pencil">No activity recorded yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {data.activity.map((e: any) => (
              <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2 text-sm">
                <span className="min-w-0">
                  <span className="font-semibold text-ink">{e.who}</span>{" "}
                  <span className="text-pencil">{describeEvent(e.event_type).toLowerCase()}</span>
                  {e.target && <span className="text-ink"> · {String(e.target).slice(0, 80)}</span>}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-pencil">{timeAgo(e.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="sk-card p-6">
          <h3 className="mb-3 font-bold text-ink">Niche followers</h3>
          <ul className="divide-y divide-line">
            {ALLOWED_NICHES.map((n) => (
              <li key={n.id} className="flex justify-between py-2 text-sm">
                <span className="text-ink">{n.name}</span>
                <span className="font-bold tabular-nums">{data.nicheFollowers[n.id] || 0}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="sk-card p-6">
          <h3 className="mb-3 font-bold text-ink">Account deletion requests</h3>
          {data.deletionRequests.length === 0 ? (
            <p className="text-sm text-pencil">None.</p>
          ) : (
            <ul className="divide-y divide-line">
              {data.deletionRequests.map((u: any) => {
                const due = new Date(new Date(u.deletion_requested_at).getTime() + 90 * 86400000);
                return (
                  <li key={u.id} className="py-2 text-sm">
                    <p className="font-semibold text-ink">{u.display_name}</p>
                    <p className="text-pencil">
                      {u.email} · remove by {due.toLocaleDateString()}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* User detail (opened from the users table)                                  */
/* -------------------------------------------------------------------------- */

export function UserDetail({
  userId,
  viewerIsSuperAdmin,
  viewerId,
  onUpdateRole,
  onClose,
}: {
  userId: string;
  viewerIsSuperAdmin: boolean;
  viewerId: string | null;
  onUpdateRole: (userId: string, action: "invite_curator" | "invite_admin" | "remove_role" | "revoke_invite", invitationId?: string) => Promise<boolean>;
  onClose: () => void;
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () =>
    fetch(`/api/admin/users?id=${encodeURIComponent(userId)}`, { cache: "no-store" })
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json.error || "Could not load this user.");
        setData(json);
      })
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
    // Refresh when the admin comes back to this tab (e.g. after the user accepted an invitation)
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    // Live: the user's activity and role status update every 10 seconds while open
    const timer = setInterval(() => document.visibilityState === "visible" && load(), 10000);
    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(timer);
    };
  }, [userId]);

  const act = async (action: Parameters<typeof onUpdateRole>[1], invitationId?: string) => {
    setBusy(true);
    const ok = await onUpdateRole(userId, action, invitationId);
    setBusy(false);
    if (ok) load();
  };

  const u = data?.user;
  const pending = (data?.invitations || []).filter((i: any) => i.status === "pending");
  const isSelf = viewerId === userId;

  return (
    <div className="sk-card p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-ink">{u?.display_name || "Loading…"}</h3>
          {u && (
            <p className="text-sm text-pencil">
              {u.username ? `@${u.username} · ` : ""}
              {u.email}
            </p>
          )}
        </div>
        <button type="button" onClick={onClose} className="sk-btn-ghost">
          Close
        </button>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {u && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-pencil">Current Role</span>
            <RoleBadge role={u.role} />
            {!u.onboarding_completed_at && <span className="text-xs text-pencil">Setup not finished</span>}
            {u.deletion_requested_at && <span className="text-xs font-bold text-red-700">Deletion requested</span>}
          </div>

          {/* Role actions: promotions are invitations the user must accept (FR-7) */}
          {!isSelf && u.role !== "super_admin" && (
            <div className="flex flex-wrap gap-2 border-y border-line py-4">
              {pending.length > 0 && (
                <p className="w-full text-sm text-ink">
                  {pending.map((p: any) => (
                    <span key={p.id} className="block">
                      <strong>{ROLE_LABEL[p.role]}</strong> invitation waiting for an answer since {new Date(p.created_at).toLocaleString()}.
                    </span>
                  ))}
                </p>
              )}
              {u.role === "user" && (
                <button type="button" disabled={busy} onClick={() => act("invite_curator")} className="sk-btn-ink px-4 py-2">
                  {pending.some((p: any) => p.role === "curator") ? "Resend curator invitation email" : "Make curator (send invitation)"}
                </button>
              )}
              {viewerIsSuperAdmin && u.role !== "admin" && (
                <button type="button" disabled={busy} onClick={() => act("invite_admin")} className="sk-btn px-4 py-2">
                  {pending.some((p: any) => p.role === "admin") ? "Resend admin invitation email" : "Make admin (send invitation)"}
                </button>
              )}
              {(u.role === "curator" || (u.role === "admin" && viewerIsSuperAdmin)) && (
                <button type="button" disabled={busy} onClick={() => act("remove_role")} className="sk-btn px-4 py-2 text-red-700">
                  Remove {ROLE_LABEL[u.role].toLowerCase()} role
                </button>
              )}
              {pending.map((p: any) => (
                <button key={p.id} type="button" disabled={busy} onClick={() => act("revoke_invite", p.id)} className="sk-btn-ghost">
                  Withdraw pending {p.role} invitation
                </button>
              ))}
            </div>
          )}

          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {[
              ["Describes them", u.user_type],
              ["Experience", u.experience_level],
              ["Location", [u.city, u.country].filter(Boolean).join(", ")],
              ["Joined", new Date(u.created_at).toLocaleDateString()],
              ["Last active", u.last_active_at ? timeAgo(u.last_active_at) : "Never"],
              ["Niches", (data.niches || []).map((n: any) => getNicheById(n.niche_id)?.name || n.niche_id).join(", ") || "None"],
              ["Scripts written", String(data.scriptCount)],
              ["Tracked actions", String(data.activityCount)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-pencil">{k}</dt>
                <dd className="font-semibold text-ink">{v || "—"}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h4 className="mb-2 font-bold text-ink">Recent activity</h4>
            {data.activity.length === 0 ? (
              <p className="text-sm text-pencil">No activity recorded yet.</p>
            ) : (
              <ul className="max-h-72 divide-y divide-line overflow-y-auto rounded-lg border border-line">
                {data.activity.map((e: any, i: number) => (
                  <li key={i} className="flex justify-between gap-3 px-3 py-2 text-sm">
                    <span className="text-ink">
                      {describeEvent(e.event_type)}
                      {e.target ? <span className="text-pencil"> · {e.target}</span> : null}
                    </span>
                    <span className="shrink-0 text-xs text-pencil-light">{timeAgo(e.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Curators: work per curator for a period (for review and payment)           */
/* -------------------------------------------------------------------------- */

export function CuratorsPanel() {
  const today = new Date().toISOString().slice(0, 10);
  const monthStart = today.slice(0, 8) + "01";
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(today);
  const [rows, setRows] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setRows(null);
    fetch(`/api/admin/curators?from=${from}&to=${to}`, { cache: "no-store" })
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json.error || "Could not load curator activity.");
        setRows(json.curators || []);
      })
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const total = (k: string) => (rows || []).reduce((s, r) => s + (r.work?.[k] || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm font-bold text-ink">
          From
          <input type="date" className="sk-input mt-1" value={from} max={to} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label className="text-sm font-bold text-ink">
          To
          <input type="date" className="sk-input mt-1" value={to} min={from} max={today} onChange={(e) => setTo(e.target.value)} />
        </label>
        <button type="button" onClick={load} className="sk-btn-ink px-5 py-2.5">
          Show work
        </button>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
      {!rows ? (
        <p className="py-8 text-center text-pencil">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="sk-card-flat p-6 text-pencil">No curators yet. Invite one from the Users tab.</p>
      ) : (
        <div className="sk-card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wider text-pencil">
              <tr>
                <th className="px-4 py-3">Curator</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Creators added</th>
                <th className="px-4 py-3 text-right">Edited</th>
                <th className="px-4 py-3 text-right">Removed</th>
                <th className="px-4 py-3 text-right">Videos entered</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Last work</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{r.display_name}</p>
                    <p className="text-xs text-pencil">{r.username ? `@${r.username}` : r.email}</p>
                  </td>
                  <td className="px-4 py-3"><RoleBadge role={r.role} /></td>
                  {["creatorsAdded", "creatorsEdited", "creatorsRemoved", "videosEntered", "total"].map((k) => (
                    <td key={k} className={`px-4 py-3 text-right tabular-nums ${k === "total" ? "font-extrabold" : ""}`}>
                      {r.work?.[k] || 0}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-pencil">{r.work?.lastWorkAt ? timeAgo(r.work.lastWorkAt) : "—"}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-ink font-bold">
              <tr>
                <td className="px-4 py-3" colSpan={2}>All staff</td>
                {["creatorsAdded", "creatorsEdited", "creatorsRemoved", "videosEntered", "total"].map((k) => (
                  <td key={k} className="px-4 py-3 text-right tabular-nums">{total(k)}</td>
                ))}
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Announcements                                                              */
/* -------------------------------------------------------------------------- */

export function AnnouncePanel() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [audience, setAudience] = useState("all");
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  const send = async () => {
    setResult(null);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "broadcast", title, body, link: link || null, audience }),
    });
    const json = await res.json().catch(() => ({}));
    setConfirming(false);
    if (!res.ok) return setResult({ ok: false, text: json.error || "Could not send." });
    setResult({ ok: true, text: `Sent to ${json.recipients} ${json.recipients === 1 ? "person" : "people"}.` });
    setTitle("");
    setBody("");
    setLink("");
  };

  const audienceLabel =
    audience === "all" ? "every user" : audience === "curators" ? "all curators" : audience === "admins" ? "all admins" : `followers of ${getNicheById(audience)?.name}`;

  return (
    <div className="sk-card max-w-2xl space-y-5 p-6">
      <p className="text-sm text-pencil">Sends an in-app notification. Use it for new features, maintenance windows or curator instructions.</p>
      <label className="block text-sm font-bold text-ink">
        Send to
        <select className="sk-input mt-1" value={audience} onChange={(e) => setAudience(e.target.value)}>
          <option value="all">Everyone</option>
          <option value="curators">Curators</option>
          <option value="admins">Admins</option>
          {ALLOWED_NICHES.map((n) => (
            <option key={n.id} value={n.id}>
              Followers of {n.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-bold text-ink">
        Title
        <input className="sk-input mt-1" value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="block text-sm font-bold text-ink">
        Message
        <textarea className="sk-input mt-1" rows={4} value={body} maxLength={1000} onChange={(e) => setBody(e.target.value)} />
      </label>
      <label className="block text-sm font-bold text-ink">
        Link inside CreatorLab (optional)
        <input className="sk-input mt-1" value={link} placeholder="/script-generator" onChange={(e) => setLink(e.target.value)} />
      </label>
      {confirming ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-ink">Send to {audienceLabel}?</span>
          <button type="button" onClick={send} className="sk-btn-ink px-5 py-2.5">
            Yes, send
          </button>
          <button type="button" onClick={() => setConfirming(false)} className="sk-btn-ghost">
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" disabled={!title.trim()} onClick={() => setConfirming(true)} className="sk-btn-ink px-5 py-2.5">
          Send announcement
        </button>
      )}
      {result && <p className={`text-sm ${result.ok ? "text-score" : "text-red-700"}`}>{result.text}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Settings + invitations                                                     */
/* -------------------------------------------------------------------------- */

export function SettingsPanel() {
  const [limit, setLimit] = useState<string>("");
  const [invites, setInvites] = useState<any[]>([]);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [billing, setBilling] = useState({ free_scripts_per_day: "", pro_price_xaf: "", pro_days: "" });
  const [billingMessage, setBillingMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const load = () =>
    fetch("/api/admin/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        setLimit(String(json.settings?.daily_script_limit ?? 20));
        setBilling({
          free_scripts_per_day: String(json.settings?.free_scripts_per_day ?? 1),
          pro_price_xaf: String(json.settings?.pro_price_xaf ?? 1000),
          pro_days: String(json.settings?.pro_days ?? 30),
        });
        setInvites(json.invitations || []);
      })
      .catch(() => {});

  const saveBilling = async () => {
    setBillingMessage(null);
    for (const key of ["free_scripts_per_day", "pro_price_xaf", "pro_days"] as const) {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: Number(billing[key]) }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const label = key === "pro_price_xaf" ? "Price (100 XAF or more)" : key === "pro_days" ? "Days (1 to 366)" : "Free scripts (0 to 100)";
        setBillingMessage({ ok: false, text: `${label}: ${json.error || "could not save."}` });
        return;
      }
    }
    setBillingMessage({ ok: true, text: "Saved. New checkouts use these values." });
  };
  useEffect(() => {
    load();
  }, []);

  const saveLimit = async () => {
    const value = Number(limit);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "daily_script_limit", value }),
    });
    const json = await res.json().catch(() => ({}));
    setMessage(res.ok ? { ok: true, text: "Saved." } : { ok: false, text: json.error || "Could not save." });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="sk-card space-y-4 p-6">
        <h3 className="font-bold text-ink">Daily script limit per user</h3>
        <p className="text-sm text-pencil">Protects the Gemini free-tier quota. Admins are not limited. 0 means no limit.</p>
        <div className="flex items-center gap-3">
          <input type="number" min={0} max={1000} className="sk-input w-32" value={limit} onChange={(e) => setLimit(e.target.value)} />
          <button type="button" onClick={saveLimit} className="sk-btn-ink px-5 py-2.5">
            Save
          </button>
        </div>
        {message && <p className={`text-sm ${message.ok ? "text-score" : "text-red-700"}`}>{message.text}</p>}
      </section>

      <section className="sk-card space-y-4 p-6">
        <h3 className="font-bold text-ink">Plans &amp; payments</h3>
        <p className="text-sm text-pencil">
          Free accounts get a number of scripts per rolling 24 hours. Pro is paid once through Fapshi (MTN Mobile Money or
          Orange Money) and lasts the number of days below. Pro users follow the daily script limit.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-bold text-ink">
            Free scripts / 24h
            <input type="number" min={0} max={100} className="sk-input mt-1 w-full" value={billing.free_scripts_per_day} onChange={(e) => setBilling((b) => ({ ...b, free_scripts_per_day: e.target.value }))} />
          </label>
          <label className="text-xs font-bold text-ink">
            Pro price (XAF)
            <input type="number" min={100} step={50} className="sk-input mt-1 w-full" value={billing.pro_price_xaf} onChange={(e) => setBilling((b) => ({ ...b, pro_price_xaf: e.target.value }))} />
          </label>
          <label className="text-xs font-bold text-ink">
            Pro length (days)
            <input type="number" min={1} max={366} className="sk-input mt-1 w-full" value={billing.pro_days} onChange={(e) => setBilling((b) => ({ ...b, pro_days: e.target.value }))} />
          </label>
        </div>
        <button type="button" onClick={saveBilling} className="sk-btn-ink px-5 py-2.5">
          Save plan settings
        </button>
        {billingMessage && <p className={`text-sm ${billingMessage.ok ? "text-score" : "text-red-700"}`}>{billingMessage.text}</p>}
      </section>

      <section className="sk-card p-6">
        <h3 className="mb-3 font-bold text-ink">Role invitations</h3>
        {invites.length === 0 ? (
          <p className="text-sm text-pencil">No invitations sent yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {invites.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span>
                  <span className="font-semibold text-ink">{i.user?.display_name || "User"}</span>
                  <span className="text-pencil"> · {ROLE_LABEL[i.role]} · {timeAgo(i.created_at)}</span>
                </span>
                <span
                  className={`text-xs font-bold uppercase ${
                    i.status === "accepted" ? "text-score" : i.status === "pending" ? "text-ink" : "text-pencil"
                  }`}
                >
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
