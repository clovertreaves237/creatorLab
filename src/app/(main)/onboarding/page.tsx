"use client";

import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import { ALLOWED_NICHES, isLiveNiche } from "@/lib/constants/niches";
import { ONBOARDING_OPTIONS } from "@/lib/constants/onboarding";

type Option = { value: string; label: string; hint?: string };

/**
 * One-time setup after sign-up. The answers personalise CreatorLab: only the chosen niches'
 * creators are shown, and scripts are written for the user's situation. (FR-55: see the data notice.)
 */
export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [experience, setExperience] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [country, setCountry] = useState("Cameroon");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("en");
  const [niches, setNiches] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<{ message: string; field?: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/onboarding", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const p = json?.profile;
        if (p) {
          setUsername(p.username || (p.display_name || "").toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 30));
          setUserType(p.user_type || "");
          setExperience(p.experience_level || "");
          setPlatforms(p.platforms || []);
          setGoals(p.goals || []);
          if (p.country) setCountry(p.country);
          setCity(p.city || "");
          if (p.content_language) setLanguage(p.content_language);
        }
        if (json?.niches?.length) setNiches(json.niches.filter((id: string) => isLiveNiche(id)));
      })
      .finally(() => setLoaded(true));
  }, []);

  const toggle = (list: string[], value: string, set: (v: string[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          user_type: userType,
          experience_level: experience,
          platforms,
          goals,
          country,
          city,
          content_language: language,
          niches,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError({ message: json.error || "Could not save your answers.", field: json.field });
        return;
      }
      window.location.href = `/creators?niche=${json.niches?.[0] || "branding-marketing"}`;
    } finally {
      setSaving(false);
    }
  };

  const fieldError = (field: string) =>
    error?.field === field ? <p className="mt-2 text-sm text-red-700">{error.message}</p> : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 py-12 sm:py-16">
      <span className="sk-pill mb-6">Account setup</span>
      <h1 className="text-4xl sm:text-5xl">
        Tell us about <span className="hl-yellow">you.</span>
      </h1>
      <p className="mt-4 text-lg text-pencil">
        Six quick questions so CreatorLab only shows you what helps you learn, with no noise.
      </p>

      <form onSubmit={submit} className="mt-12 space-y-12" aria-busy={!loaded}>
        <Question n={1} title="Pick a username" hint="Our team uses it to find your account, for example if you apply to be a curator.">
          <div className="flex max-w-sm items-center gap-2">
            <span className="text-lg text-pencil">@</span>
            <input
              className="sk-input"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
              placeholder="your_name"
              maxLength={30}
              required
              autoComplete="username"
            />
          </div>
          {fieldError("username")}
        </Question>

        <Question n={2} title="Which best describes you?">
          <ChoiceGrid options={ONBOARDING_OPTIONS.userType} selected={[userType]} onPick={setUserType} />
          {fieldError("user_type")}
        </Question>

        <Question n={3} title="How much video do you make today?">
          <ChoiceGrid options={ONBOARDING_OPTIONS.experience} selected={[experience]} onPick={setExperience} />
        </Question>

        <Question n={4} title="Where do you post, and what do you want?" hint="Pick all that apply.">
          <p className="mb-3 text-sm font-bold text-ink">Platforms</p>
          <ChipGroup options={ONBOARDING_OPTIONS.platforms} selected={platforms} onToggle={(v) => toggle(platforms, v, setPlatforms)} />
          <p className="mb-3 mt-6 text-sm font-bold text-ink">Goals</p>
          <ChipGroup options={ONBOARDING_OPTIONS.goals} selected={goals} onToggle={(v) => toggle(goals, v, setGoals)} />
        </Question>

        <Question n={5} title="Where are you, and what language do you create in?">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-bold text-ink">
              Country
              <input className="sk-input mt-2" value={country} onChange={(e) => setCountry(e.target.value)} maxLength={60} />
            </label>
            <label className="block text-sm font-bold text-ink">
              City
              <input className="sk-input mt-2" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Buea, Douala…" maxLength={60} />
            </label>
            <label className="block text-sm font-bold text-ink">
              Language
              <select className="sk-input mt-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {ONBOARDING_OPTIONS.language.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Question>

        <Question
          n={6}
          title="Choose your niches"
          hint="Pick one or more. From now on CreatorLab only shows you creators, videos, topics and scripts from these niches. You can add, change or remove them later."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {ALLOWED_NICHES.map((niche) => {
              const comingSoon = niche.status !== "live";
              const on = !comingSoon && niches.includes(niche.id);
              return (
                <button
                  type="button"
                  key={niche.id}
                  aria-pressed={on}
                  disabled={comingSoon}
                  onClick={() => toggle(niches, niche.id, setNiches)}
                  className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
                    comingSoon
                      ? "cursor-not-allowed border-dashed border-line bg-paper text-pencil-light"
                      : on
                      ? "border-ink bg-ink text-white"
                      : "border-ink bg-white text-ink hover:bg-paper-deep"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                      comingSoon ? "border-line" : on ? "border-white bg-white text-ink" : "border-ink"
                    }`}
                  >
                    {comingSoon ? <Lock className="h-3 w-3" /> : on ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  <span>
                    <span className="block font-bold">{niche.name}</span>
                    <span className={`block text-sm ${on ? "text-white/75" : comingSoon ? "text-pencil-light" : "text-pencil"}`}>
                      {comingSoon ? "Coming soon" : niche.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {fieldError("niches")}
        </Question>

        {error && !error.field && <p className="text-sm text-red-700">{error.message}</p>}
        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
          <button type="submit" disabled={saving || !loaded} className="sk-btn-ink px-8 py-3.5 text-base">
            {saving ? "Saving…" : "Finish setup"}
          </button>
          <p className="text-sm text-pencil">You can change these later in your profile.</p>
        </div>
      </form>
    </div>
  );
}

function Question({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-1 text-xl font-extrabold text-ink">
        <span className="mr-2 text-pencil-light tabular-nums">{n}.</span>
        {title}
      </legend>
      {hint && <p className="mb-4 text-sm text-pencil">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </fieldset>
  );
}

function ChoiceGrid({ options, selected, onPick }: { options: readonly Option[]; selected: string[]; onPick: (v: string) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <button
            type="button"
            key={o.value}
            aria-pressed={on}
            onClick={() => onPick(o.value)}
            className={`rounded-xl border-2 border-ink p-4 text-left transition-colors ${on ? "bg-ink text-white" : "bg-white text-ink hover:bg-paper-deep"}`}
          >
            <span className="block font-bold">{o.label}</span>
            {o.hint && <span className={`block text-sm ${on ? "text-white/75" : "text-pencil"}`}>{o.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

function ChipGroup({ options, selected, onToggle }: { options: readonly Option[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <button
            type="button"
            key={o.value}
            aria-pressed={on}
            onClick={() => onToggle(o.value)}
            className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold transition-colors ${on ? "bg-ink text-white" : "bg-white text-ink hover:bg-paper-deep"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
