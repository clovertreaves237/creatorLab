"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { NotificationList, type AppNotification } from "./NotificationList";

/** Header bell: unread badge + dropdown. Refreshes every 60 seconds and when the tab regains focus. */
export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications?limit=15", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setItems(json.notifications || []);
      setUnread(json.unread || 0);
    } catch {
      // offline: keep the last state
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 60000);
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [load]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const markAllRead = async () => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    }).catch(() => {});
    load();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) load();
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/[0.05]"
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-paper bg-accent px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="sk-card absolute right-0 z-50 mt-3 w-[min(22rem,calc(100vw-2rem))]">
          <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
            <span className="text-sm font-bold text-ink">Notifications</span>
            {unread > 0 && (
              <button type="button" onClick={markAllRead} className="text-xs font-semibold text-accent hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-[26rem] overflow-y-auto">
            <NotificationList items={items} onChanged={load} onNavigate={() => setOpen(false)} compact />
          </div>
          <Link
            href="/profile?tab=notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-line px-3 py-2.5 text-center text-sm font-semibold text-ink hover:bg-ink/[0.04]"
          >
            See all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
