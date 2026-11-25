"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, Download, Trash2, Pencil, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { getNicheById } from "@/lib/constants/niches";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { track } from "@/lib/activity/track";

interface Script {
  id: string;
  niche_id: string;
  topic: string;
  script: string;
  hook: string | null;
  total_spoken_seconds: number | null;
  word_count: number | null;
  created_at: string;
  updated_at: string | null;
}

/** The creator's private, permanent script history. */
export function ScriptHistory({ onCountChange }: { onCountChange?: (n: number) => void }) {
  const [scripts, setScripts] = useState<Script[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [niche, setNiche] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const load = () =>
    fetch("/api/scripts/history", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        setScripts(json.scripts || []);
        setError(json.error || null);
        onCountChange?.((json.scripts || []).length);
      })
      .catch(() => {
        setScripts([]);
        setError("Your history could not be loaded.");
      });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(
    () =>
      (scripts || []).filter(
        (s) =>
          (!niche || s.niche_id === niche) &&
          (!query.trim() || `${s.topic} ${s.script}`.toLowerCase().includes(query.trim().toLowerCase()))
      ),
    [scripts, niche, query]
  );
  const niches = useMemo(() => Array.from(new Set((scripts || []).map((s) => s.niche_id))), [scripts]);

  const copy = (s: Script) => {
    navigator.clipboard.writeText(s.script);
    setCopied(s.id);
    track("script_copied", { nicheId: s.niche_id, target: s.topic });
    setTimeout(() => setCopied(null), 2000);
  };
  const download = (s: Script) => {
    const blob = new Blob([`${s.topic}\n\n${s.script}\n`], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `creatorlab-script-${s.created_at.slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    track("script_downloaded", { nicheId: s.niche_id, target: s.topic });
  };
  const save = async (s: Script) => {
    setMessage(null);
    const res = await fetch("/api/scripts/history", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, script: draft }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return setMessage(json.error || "Could not save.");
    setScripts((list) => (list || []).map((x) => (x.id === s.id ? { ...x, script: draft.trim(), word_count: json.word_count, updated_at: new Date().toISOString() } : x)));
    setEditing(null);
    setMessage("Saved.");
    track("script_edited", { nicheId: s.niche_id, target: s.topic });
  };
  const remove = async (s: Script) => {
    const res = await fetch(`/api/scripts/history?id=${encodeURIComponent(s.id)}`, { method: "DELETE" });
    if (!res.ok) return setMessage("Could not delete this script.");
    const next = (scripts || []).filter((x) => x.id !== s.id);
    setScripts(next);
    onCountChange?.(next.length);
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-ink">Your script history</h3>
          <p className="flex items-center gap-1.5 text-xs text-pencil">
            <Lock className="h-3 w-3" /> Every script you write is kept here. Only you can see it.
          </p>
        </div>
        {scripts && scripts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your scripts" className="sk-input w-48 text-xs" aria-label="Search your scripts" />
            <select value={niche} onChange={(e) => setNiche(e.target.value)} className="sk-input w-auto text-xs" aria-label="Filter by niche">
              <option value="">All niches</option>
              {niches.map((id) => (
                <option key={id} value={id}>
                  {getNicheById(id)?.name || id}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {message && <p className="text-xs text-ink">{message}</p>}
      {error && <p className="text-xs text-red-700">{error}</p>}

      {scripts === null ? (
        <div className="py-12">
          <MobiusLoader size="md" variant="ai" label="Loading your scripts" />
        </div>
      ) : scripts.length === 0 ? (
        <div className="space-y-3 rounded-2xl border border-dashed border-ink bg-white p-12 text-center">
          <p className="text-xs text-pencil">You have not written any scripts yet. Open the Creator Engine to write your first one.</p>
          <Link href="/script-generator" className="sk-btn-ink inline-flex text-xs">
            Open Creator Engine
          </Link>
        </div>
      ) : visible.length === 0 ? (
        <p className="py-8 text-center text-xs text-pencil">No scripts match.</p>
      ) : (
        <ul className="space-y-3">
          {visible.map((s) => {
            const isOpen = open === s.id;
            return (
              <li key={s.id} className="rounded-2xl border-2 border-ink bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-3 p-4 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-ink">{s.topic}</span>
                    <span className="mt-0.5 block text-[11px] text-pencil">
                      {getNicheById(s.niche_id)?.name || s.niche_id} · {new Date(s.created_at).toLocaleString()} ·{" "}
                      {s.word_count || 0} words{s.total_spoken_seconds ? ` · ~${s.total_spoken_seconds}s` : ""}
                      {s.updated_at ? " · edited" : ""}
                    </span>
                    {!isOpen && s.hook && <span className="mt-1.5 block line-clamp-1 text-xs italic text-pencil">“{s.hook}”</span>}
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="space-y-3 border-t border-line p-4">
                    {editing === s.id ? (
                      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={14} className="sk-input w-full font-sans text-sm leading-relaxed" aria-label="Edit script" />
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{s.script}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {editing === s.id ? (
                        <>
                          <button type="button" onClick={() => save(s)} className="sk-btn-ink text-xs">Save changes</button>
                          <button type="button" onClick={() => setEditing(null)} className="sk-btn-ghost text-xs">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button type="button" onClick={() => copy(s)} className="sk-btn-ink text-xs">
                            {copied === s.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied === s.id ? "Copied" : "Copy"}
                          </button>
                          <button type="button" onClick={() => { setEditing(s.id); setDraft(s.script); }} className="sk-btn text-xs">
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button type="button" onClick={() => download(s)} className="sk-btn text-xs">
                            <Download className="h-3.5 w-3.5" /> Download
                          </button>
                          <Link href={`/script-generator?topic=${encodeURIComponent(s.topic)}&niche=${s.niche_id}`} className="sk-btn text-xs">
                            Write a new version
                          </Link>
                          {confirmDelete === s.id ? (
                            <span className="ml-auto flex items-center gap-2 text-xs">
                              <span className="text-pencil">Delete for good?</span>
                              <button type="button" onClick={() => remove(s)} className="font-bold text-red-700 hover:underline">Yes, delete</button>
                              <button type="button" onClick={() => setConfirmDelete(null)} className="text-pencil hover:underline">Cancel</button>
                            </span>
                          ) : (
                            <button type="button" onClick={() => setConfirmDelete(s.id)} className="sk-btn-ghost ml-auto text-xs text-red-700">
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          )}
                        </>
                      )}
                    </div>
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

