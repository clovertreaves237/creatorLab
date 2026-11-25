"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { track } from "@/lib/activity/track";

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  data: Record<string, any>;
  read_at: string | null;
  created_at: string;
  invitationStatus?: string;
}

export function timeAgo(iso: string): string {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} d ago`;
  return new Date(iso).toLocaleDateString();
}

/** List of notifications with Accept / Decline on curator and admin invitations. */
export function NotificationList({
  items,
  onChanged,
  onNavigate,
  compact = false,
}: {
  items: AppNotification[];
  onChanged: () => void;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const markRead = async (ids: string[]) => {
    if (ids.length === 0) return;
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    }).catch(() => {});
  };

  const answerInvite = async (n: AppNotification, accept: boolean) => {
    setBusy(n.id);
    setMessage(null);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "respond_invite", invitation_id: n.data?.invitation_id, accept }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not answer the invitation.");
      await markRead([n.id]);
      if (accept) {
        // New role: reload so the curator/admin tools appear in the dashboard
        window.location.href = `/profile?tab=${n.data?.role === "admin" ? "dashboard" : "curator"}`;
        return;
      }
      onChanged();
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setBusy(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-10 text-center text-pencil">
        <Bell className="w-6 h-6 mx-auto mb-2 text-pencil-light" />
        <p className="text-sm">No notifications yet.</p>
      </div>
    );
  }

  return (
    <div>
      {message && <p className="px-3 py-2 text-sm text-red-700">{message}</p>}
      <ul className="divide-y divide-line">
        {items.map((n) => {
          const unread = !n.read_at;
          const openInvite = n.type === "role_invite" && n.invitationStatus === "pending";
          const content = (
            <>
              <div className="flex items-start gap-2">
                {unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm ${unread ? "font-bold" : "font-medium"} text-ink`}>{n.title}</p>
                  {n.body && <p className={`text-sm text-pencil ${compact ? "line-clamp-2" : ""}`}>{n.body}</p>}
                  <p className="mt-1 text-xs text-pencil-light">{timeAgo(n.created_at)}</p>
                </div>
              </div>
            </>
          );
          return (
            <li key={n.id} className={`px-3 py-3 ${unread ? "bg-hl-yellow/20" : ""}`}>
              {n.link && !openInvite ? (
                <Link
                  href={n.link}
                  onClick={() => {
                    markRead([n.id]);
                    track("notification_opened", { target: n.type });
                    onNavigate?.();
                  }}
                  className="block hover:opacity-80"
                >
                  {content}
                </Link>
              ) : (
                <button type="button" className="block w-full text-left" onClick={() => unread && markRead([n.id]).then(onChanged)}>
                  {content}
                </button>
              )}

              {n.type === "role_invite" && (
                <div className="mt-2 pl-4">
                  {openInvite ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={busy === n.id}
                        onClick={() => answerInvite(n, true)}
                        className="sk-btn-ink px-3 py-1.5 text-xs"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button
                        type="button"
                        disabled={busy === n.id}
                        onClick={() => answerInvite(n, false)}
                        className="sk-btn px-3 py-1.5 text-xs"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-pencil">
                      {n.invitationStatus === "accepted"
                        ? "You accepted this invitation."
                        : n.invitationStatus === "declined"
                        ? "You declined this invitation."
                        : n.invitationStatus === "revoked"
                        ? "This invitation was withdrawn."
                        : ""}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
