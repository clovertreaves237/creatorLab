"use client";

import { useEffect, useRef, useState } from "react";
import { Settings2, Check } from "lucide-react";
import { THEMES, THEME_STORAGE_KEY, DEFAULT_THEME, isThemeId, type ThemeId } from "@/lib/theme/themes";

/** Applies a theme to the whole site. The new theme spreads out in a circle from (x, y) when the browser supports it. */
function applyTheme(id: ThemeId, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === id) return;
  if (origin) {
    root.style.setProperty("--vt-x", `${origin.x}px`);
    root.style.setProperty("--vt-y", `${origin.y}px`);
  }
  const set = () => root.setAttribute("data-theme", id);
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduce) doc.startViewTransition(set);
  else set();
}

/** Navbar settings: choose one of the three site themes. Saved on this device and, when signed in, on the account. */
export function ThemeSettings({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>(DEFAULT_THEME);
  const [saved, setSaved] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Current theme from the page; a signed-in user on a new device gets the theme saved on their account
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (isThemeId(attr)) setCurrent(attr);
    let local: string | null = null;
    try {
      local = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {}
    if (!local && signedIn) {
      fetch("/api/preferences", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => {
          if (json && isThemeId(json.theme)) {
            applyTheme(json.theme);
            setCurrent(json.theme);
            try {
              localStorage.setItem(THEME_STORAGE_KEY, json.theme);
            } catch {}
          }
        })
        .catch(() => {});
    }
  }, [signedIn]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: ThemeId) => {
    const r = button.current?.getBoundingClientRect();
    applyTheme(id, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined);
    setCurrent(id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {}
    setSaved(signedIn ? "Saved on this device and your account." : "Saved on this device.");
    if (signedIn) {
      fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: id }),
      }).catch(() => {});
    }
  };

  return (
    <div className="relative" ref={wrap}>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Settings: site theme"
        title="Settings"
        className="flex h-9 w-9 items-center justify-center rounded-full text-pencil transition-colors hover:bg-ink/[0.06] hover:text-ink"
      >
        <Settings2 className="h-[18px] w-[18px]" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Site theme"
          className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border-2 border-ink bg-white p-4 text-left shadow-note"
        >
          <p className="text-sm font-bold text-ink">Site theme</p>
          <p className="mb-3 text-xs text-pencil">Changes the look of the whole site. Everything else stays where it is.</p>
          <div className="space-y-2" role="radiogroup" aria-label="Choose a theme">
            {THEMES.map((t) => {
              const active = current === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(t.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-2.5 text-left transition-colors ${
                    active ? "border-ink" : "border-line hover:border-pencil-light"
                  }`}
                >
                  {/* Live preview rendered inside that theme's own palette */}
                  <span data-theme={t.id} className="flex h-12 w-16 shrink-0 flex-col justify-between overflow-hidden rounded-md border border-line bg-paper p-1.5" aria-hidden>
                    <span className="h-1.5 w-9 rounded-sm bg-ink" />
                    <span className="flex items-center gap-1">
                      <span className="h-3 w-6 rounded-sm bg-accent" />
                      <span className="h-3 w-4 rounded-sm bg-hl-yellow" />
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink">{t.name}</span>
                    <span className="block text-[11px] leading-snug text-pencil">{t.description}</span>
                  </span>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink ${active ? "bg-ink text-white" : ""}`}>
                    {active && <Check className="h-3 w-3" />}
                  </span>
                </button>
              );
            })}
          </div>
          {saved && <p className="mt-3 text-[11px] text-pencil">{saved}</p>}
        </div>
      )}
    </div>
  );
}
