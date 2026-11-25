"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Download, RotateCcw, Loader2, X, Send } from "lucide-react";
import type { SoundPlan } from "@/lib/sound/plan";
import { track } from "@/lib/activity/track";

type Phase = "offer" | "declined" | "composing" | "rendering" | "ready" | "error";

/**
 * Shown under a finished script. Nothing happens unless the user presses "Yes, make a sound".
 * Gemini plans the instrumental (no vocals) from the niche's sound rules; the browser renders it with Tone.js.
 */
export function SoundOffer({ script, nicheId, duration }: { script: string; nicheId: string; duration: number }) {
  const [phase, setPhase] = useState<Phase>("offer");
  const [plan, setPlan] = useState<SoundPlan | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // The user's own description of the sound they want (sent with the next request only)
  const [wish, setWish] = useState("");
  const [lastWish, setLastWish] = useState("");
  const variation = useRef(0);
  const urlRef = useRef<string | null>(null);

  const length = Math.max(10, Math.min(180, Math.round(duration || 60)));

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const make = async (preference = "") => {
    setLastWish(preference);
    setError(null);
    setPhase("composing");
    try {
      const res = await fetch("/api/sound/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche_id: nicheId,
          script,
          duration: length,
          variation: variation.current,
          avoid_recipe_id: plan?.recipeId || undefined,
          preference: preference || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.plan) throw new Error(data?.error || "The sound could not be made right now.");
      const next: SoundPlan = data.plan;

      setPhase("rendering");
      const { renderSoundPlan, audioBufferToWav } = await import("@/lib/sound/render");
      const buffer = await renderSoundPlan(next);
      const blob = audioBufferToWav(buffer);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(blob);

      setPlan(next);
      setAudioUrl(urlRef.current);
      setPhase("ready");
      setWish("");
      variation.current += 1;
      track("sound_generated", { nicheId, target: next.recipeId, metadata: { bpm: next.bpm, seconds: next.duration, described: Boolean(preference) } });
    } catch (e: any) {
      setError(e?.message || "The sound could not be made right now.");
      setPhase("error");
    }
  };

  if (phase === "declined") {
    return (
      <p className="text-xs text-pencil">
        No background sound for this script.{" "}
        <button type="button" onClick={() => setPhase("offer")} className="underline decoration-line underline-offset-2 hover:text-ink">
          Changed your mind?
        </button>
      </p>
    );
  }

  return (
    <div className="sk-card-flat p-4 space-y-3 max-w-xl">
      {phase === "offer" && (
        <>
          <div className="flex items-start gap-3">
            <Music className="w-4 h-4 mt-0.5 text-ink shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink">Want a background sound for this video?</p>
              <p className="text-xs text-pencil mt-0.5">
                An instrumental (no vocals) made for this script and your niche, {length} seconds long, to play while you film or edit.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pl-7">
            <button type="button" onClick={() => make()} className="sk-btn-ink text-xs">
              Yes, make a sound
            </button>
            <button
              type="button"
              onClick={() => {
                setPhase("declined");
                track("sound_declined", { nicheId });
              }}
              className="sk-btn-ghost text-xs"
            >
              No thanks
            </button>
          </div>
        </>
      )}

      {(phase === "composing" || phase === "rendering") && (
        <div className="flex items-center gap-3 text-sm text-pencil">
          <Loader2 className="w-4 h-4 animate-spin text-ink" />
          {phase === "composing" ? (lastWish ? "Making the sound you described…" : "Reading your script and choosing the sound…") : "Mixing the instrumental…"}
        </div>
      )}

      {phase === "ready" && plan && audioUrl && (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-serif italic text-lg text-ink leading-tight">{plan.title}</p>
              <p className="text-xs text-pencil mt-1">
                {plan.bpm} BPM · {plan.key} {plan.scale} · {plan.duration}s{plan.mood.length > 0 ? ` · ${plan.mood.join(", ")}` : ""}
              </p>
            </div>
            <button type="button" onClick={() => setPhase("declined")} className="p-1 text-pencil hover:text-ink" title="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          {plan.reading && (plan.reading.speaker || plan.reading.setting) && (
            <p className="text-xs text-pencil">
              <span className="font-bold text-ink">How I read your script: </span>
              {[plan.reading.speaker, plan.reading.setting, plan.reading.feeling].filter(Boolean).join(" · ")}
              {" · "}
              {plan.reading.energy === "soft" ? "soft sound" : plan.reading.energy === "high" ? "high energy" : "medium energy"}
            </p>
          )}
          {lastWish && (
            <p className="text-xs text-pencil">
              <span className="font-bold text-ink">You asked for: </span>“{lastWish}”
            </p>
          )}
          {plan.why && <p className="text-sm text-ink leading-relaxed">{plan.why}</p>}
          <audio controls src={audioUrl} className="w-full" />
          <div className="flex flex-wrap gap-2">
            <a
              href={audioUrl}
              download={`creatorlab-sound-${plan.recipeId || "track"}.wav`}
              onClick={() => track("sound_downloaded", { nicheId, target: plan.recipeId })}
              className="sk-btn-ink text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download WAV
            </a>
            <button type="button" onClick={() => make()} className="sk-btn text-xs">
              <RotateCcw className="w-3.5 h-3.5" />
              Make another
            </button>
          </div>
          <form
            className="space-y-2 pt-3 border-t border-line"
            onSubmit={(e) => {
              e.preventDefault();
              if (wish.trim().length >= 3) make(wish.trim());
            }}
          >
            <label htmlFor="sound-wish" className="block text-xs font-bold text-ink">
              Or describe the sound you want
            </label>
            <textarea
              id="sound-wish"
              value={wish}
              onChange={(e) => setWish(e.target.value.slice(0, 400))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (wish.trim().length >= 3) make(wish.trim());
                }
              }}
              rows={2}
              placeholder="For example: softer and slower, just light shakers and warm keys, like a calm morning at my shop"
              className="sk-input w-full text-sm resize-none"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-pencil tabular-nums">{wish.length}/400</span>
              <button type="submit" disabled={wish.trim().length < 3} className="sk-btn-ink text-xs disabled:opacity-40">
                <Send className="w-3.5 h-3.5" />
                Make this sound
              </button>
            </div>
          </form>
          <p className="text-[11px] text-pencil">Tip: keep the music about 15 to 20 dB quieter than your voice when you edit.</p>
        </>
      )}

      {phase === "error" && (
        <div className="space-y-2">
          <p className="text-sm text-red-700">{error}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => make(lastWish)} className="sk-btn text-xs">
              <RotateCcw className="w-3.5 h-3.5" />
              Try again
            </button>
            <button type="button" onClick={() => setPhase("declined")} className="sk-btn-ghost text-xs">
              Never mind
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
