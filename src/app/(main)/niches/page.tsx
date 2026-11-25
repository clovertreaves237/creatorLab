"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ALLOWED_NICHES, LIVE_NICHES, NicheId, isLiveNiche } from "@/lib/constants/niches";
import { createClient } from "@/lib/supabase/client";
import { Check, ArrowRight, Bookmark, PenLine, Layers, TrendingUp, Loader2, Video, CheckCircle2, Search } from "lucide-react";
import { LogoBadge } from "@/components/brand/Logo";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { track } from "@/lib/activity/track";


/**
 * Functional Requirements 8-12:
 * FR-8: The system shall list the five niches. A user must select a niche before viewing creators.
 * FR-9: A user shall be able to save one or more niches as preferences.
 * FR-10: When a user has saved niches, the system shall open the app on the saved niche's creator list, with a niche switcher.
 * FR-11: A user shall be able to switch niches in one click without losing the saved list.
 * FR-12: A user shall be able to remove a saved niche.
 *
 * Implements the post-auth wizard matching screenshots/immediately after auth*.png
 */
export default function NichesPage() {
  const router = useRouter();
  const supabase = createClient();

  const [savedNiches, setSavedNiches] = useState<string[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<NicheId>("branding-marketing");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [nicheRuleMessage, setNicheRuleMessage] = useState<string | null>(null);
  // Order: my niches, then live niches to add, then coming soon
  const nicheRank = (n: (typeof ALLOWED_NICHES)[number]) =>
    n.status !== "live" ? 2 : savedNiches.includes(n.id) ? 0 : 1;
  const alertNicheRule = (message: string) => {
    setNicheRuleMessage(message);
    setTimeout(() => setNicheRuleMessage(null), 4000);
  };
  const [userId, setUserId] = useState<string | null>(null);

  // Onboarding wizard steps (1: Welcome, 2: Select/Describe, 3: Journey, 4: Ready)
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  // Experience Survey state (matches immediately after auth3.png)
  const [experienceTime, setExperienceTime] = useState("3-12 months");
  const [followerRange, setFollowerRange] = useState("1k-25k");
  const [videoFrequency, setVideoFrequency] = useState("2-3 videos");

  useEffect(() => {
    async function loadUserPreferences() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          // Fetch saved niches from user_niches
          const { data, error } = await supabase
            .from("user_niches")
            .select("niche_id")
            .eq("user_id", user.id);

          if (!error && data && data.length > 0) {
            const ids = data.map((item: any) => item.niche_id);
            setSavedNiches(ids);
            setSelectedNiche(ids[0] as NicheId);
          } else {
            // First time user: show onboarding wizard matching screenshot 1
            setOnboardingStep(1);
          }
        }
      } catch (err) {
        console.error("Error loading niches:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserPreferences();
  }, []);

  // FR-9 & FR-12: Toggle saved niche preference
  const toggleSaveNiche = async (nicheId: string) => {
    if (!userId) return;
    // Personalisation rule: keep at least one niche, and the live niche(s) stay selected
    if (!isLiveNiche(nicheId)) {
      alertNicheRule("This niche is coming soon. You can add it as soon as it opens.");
      return;
    }
    if (savedNiches.includes(nicheId) && savedNiches.filter((id) => isLiveNiche(id)).length <= 1) {
      alertNicheRule("Keep at least one niche so we know what to show you. Add another niche first, then remove this one.");
      return;
    }
    setSaving(true);

    try {
      if (savedNiches.includes(nicheId)) {
        // FR-12: Remove saved niche
        await supabase
          .from("user_niches")
          .delete()
          .eq("user_id", userId)
          .eq("niche_id", nicheId);

        setSavedNiches((prev) => prev.filter((id) => id !== nicheId));
        track("niche_removed", { nicheId });
      } else {
        // FR-9: Save niche as preference
        await supabase
          .from("user_niches")
          .insert({ user_id: userId, niche_id: nicheId });

        setSavedNiches((prev) => [...prev, nicheId]);
        track("niche_saved", { nicheId });
      }
    } catch (err) {
      console.error("Failed to update niche preference:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleProceedToCreators = (nicheId: string) => {
    router.push(`/creators?niche=${nicheId}`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <MobiusLoader
          variant="general"
          size="md"
          label="Loading Curated Niches..."
          sublabel="Syncing live demo and African creator categories"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full relative">
      {/* ============================================================== */}
      {/* POST-AUTH ONBOARDING MODAL WIZARD (Screenshots 1 - 4)          */}
      {/* ============================================================== */}

      {/* Step 1: Welcome to CreatorLab (matches immediately after auth.png) */}
      {onboardingStep === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border-2 border-ink p-6 sm:p-9 text-center overflow-hidden">
            <div className="flex flex-col items-center mb-6">
              <LogoBadge size={56} className="mb-4" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Welcome to CreatorLab!
              </h2>
              <p className="text-xs sm:text-sm text-pencil mt-1.5 max-w-md">
                CreatorLab is the best way to make short-form videos like the pros in Africa. Here&apos;s how it works:
              </p>
            </div>

            {/* 3 Step Cards matching screenshot 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6 text-left">
              <div className="p-4 rounded-2xl bg-white border-2 border-ink flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center mb-2.5">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-ink flex items-center gap-1.5 mb-1">
                    <Video className="w-3.5 h-3.5 text-accent" />
                    <span>Explore feed</span>
                  </h4>
                  <p className="text-[11px] text-pencil leading-relaxed">
                    Save high-performing videos from your niche to your library.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-ink flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center mb-2.5">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-ink flex items-center gap-1.5 mb-1">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>Review ideas</span>
                  </h4>
                  <p className="text-[11px] text-pencil leading-relaxed">
                    Decide which autogenerated ideas are worth making.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-ink flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-full bg-score text-ink text-xs font-bold flex items-center justify-center mb-2.5">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-ink flex items-center gap-1.5 mb-1">
                    <PenLine className="w-3.5 h-3.5 text-score" />
                    <span>Create script</span>
                  </h4>
                  <p className="text-[11px] text-pencil leading-relaxed">
                    Turn any idea into a winning script using data-backed storytelling.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-pencil mb-5">
              To set up your Videos feed, you&apos;ll need to select the content niche you want to make.
            </p>

            <button
              onClick={() => setOnboardingStep(2)}
              className="px-8 py-3 rounded-xl btn-primary-kinetic text-white text-xs font-semibold tracking-wide"
            >
              Get started
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select/Describe Content Niche (matches immediately after auth2.png) */}
      {onboardingStep === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border-2 border-ink p-6 sm:p-8 text-left overflow-hidden">
            <h2 className="text-xl font-bold text-ink tracking-tight mb-1">
              Select your primary content niche
            </h2>
            <p className="text-xs text-pencil mb-6">
              We&apos;ll use this to set up channels for your Videos feed.
            </p>

            <div className="space-y-2.5 mb-6">
              {LIVE_NICHES.map((niche) => {
                const isSelected = selectedNiche === niche.id;
                return (
                  <div
                    key={niche.id}
                    onClick={() => setSelectedNiche(niche.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-paper-deep border-accent ring-1 ring-accent"
                        : "bg-white border-ink hover:border-line"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ink">{niche.name}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-score/10 text-score font-bold">Live</span>
                      </div>
                      <p className="text-[11px] text-pencil mt-0.5">{niche.description}</p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-3 ${
                        isSelected ? "bg-ink text-white" : "border-2 border-ink"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOnboardingStep(3)}
                className="px-6 py-2.5 rounded-xl btn-primary-kinetic text-white text-xs font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Narrow down suggestions (matches immediately after auth3.png) */}
      {onboardingStep === 3 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border-2 border-ink p-6 sm:p-8 text-left overflow-hidden">
            <h2 className="text-xl font-bold text-ink tracking-tight mb-1">
              Let&apos;s narrow down your suggestions
            </h2>
            <p className="text-xs text-pencil mb-6">
              Tell us where you are in your content journey so we can give the best-fit recommendations.
            </p>

            <div className="space-y-5 mb-8">
              {/* Question 1 */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-2">
                  How long have you been making content?
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Less than 3 months", "3-12 months", "More than a year"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setExperienceTime(opt)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        experienceTime === opt
                          ? "bg-ink border-ink text-white"
                          : "bg-white border-ink text-pencil hover:text-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-2">
                  How many followers do you have?
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Less than 1k", "1k-25k", "More than 25k"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFollowerRange(opt)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        followerRange === opt
                          ? "bg-ink border-ink text-white"
                          : "bg-white border-ink text-pencil hover:text-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-2">
                  How many videos do you post per week?
                </label>
                <div className="flex flex-wrap gap-2">
                  {["0-1 videos", "2-3 videos", "More than 3 videos"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setVideoFrequency(opt)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        videoFrequency === opt
                          ? "bg-ink border-ink text-white"
                          : "bg-white border-ink text-pencil hover:text-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={async () => {
                  // Save preference into user_niches
                  if (userId) {
                    await supabase
                      .from("user_niches")
                      .upsert({ user_id: userId, niche_id: selectedNiche });
                    setSavedNiches([selectedNiche]);
                  }
                  setOnboardingStep(4);
                }}
                className="px-6 py-2.5 rounded-xl btn-primary-kinetic text-white text-xs font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Your Feed is Ready! (matches immediately after auth4.png) */}
      {onboardingStep === 4 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-ink p-8 text-center overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-score/20 text-score border border-score/40 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl font-bold text-ink tracking-tight mb-2">
              Your feed is ready!
            </h2>
            <p className="text-xs text-pencil mb-6">
              We found curated African channels and high-performing outliers in your niche to get you started.
            </p>

            <button
              onClick={() => {
                setOnboardingStep(null);
                handleProceedToCreators(selectedNiche);
              }}
              className="w-full py-3 rounded-xl btn-primary-kinetic text-white text-xs font-semibold"
            >
              Explore Curated Creators
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN NICHE PREFERENCE DASHBOARD                                */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b-2 border-ink gap-4">
        <div>
          <div className="hand-pill mb-2 text-ink bg-white">
            <Bookmark className="w-3.5 h-3.5 text-ink" />
            <span>Niche Preference Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
            Select &amp; Manage Content Niches
          </h1>
          <p className="text-xs text-pencil mt-1 font-medium">
            Save a niche (bookmark) to see its creators. Only your saved niches appear on the creators page.
          </p>
        </div>
      </div>

      {nicheRuleMessage && (
        <p role="status" className="mb-6 rounded-xl border-2 border-ink bg-hl-yellow px-4 py-3 text-sm font-semibold text-ink">
          {nicheRuleMessage}
        </p>
      )}

      {/* Niche Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...ALLOWED_NICHES]
          .sort((a, b) => nicheRank(a) - nicheRank(b))
          .map((niche) => {
          const comingSoon = niche.status !== "live";
          const isSaved = !comingSoon && savedNiches.includes(niche.id);
          const isSelected = selectedNiche === niche.id;

          if (comingSoon) {
            return (
              <div key={niche.id} className="rounded-xl border-2 border-dashed border-line bg-paper p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-pencil">{niche.name}</h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-paper-deep text-pencil border border-line uppercase">Coming soon</span>
                </div>
                <p className="text-xs text-pencil-light leading-relaxed">{niche.description}</p>
              </div>
            );
          }

          return (
            <div
              key={niche.id}
              className={`hand-card p-6 flex flex-col justify-between relative group ${
                isSelected ? "ring-2 ring-accent" : ""
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                      <span>{niche.name}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border border-ink ${isSaved ? "bg-hl-yellow text-ink" : "bg-white text-pencil"}`}>
                        {isSaved ? "My niche" : "Live"}
                      </span>
                    </h3>
                    <span className="text-xs text-pencil-light mt-0.5 block font-medium">
                      9 TikTok &bull; 9 YouTube creators
                    </span>
                  </div>

                  {/* FR-9 & FR-12 Save / Remove Bookmark Button */}
                  <button
                    onClick={() => toggleSaveNiche(niche.id)}
                    disabled={saving}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      isSaved
                        ? "bg-hl-tape text-ink border-ink "
                        : "bg-white text-pencil-light border-ink hover:text-ink hover:shadow-[2px_2px_0px_#18181B]"
                    }`}
                    title={isSaved ? "Remove from saved preferences" : "Save as preference"}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? "fill-ink" : ""}`} />
                  </button>
                </div>

                <p className="text-xs text-pencil leading-relaxed mb-6 font-medium">
                  {niche.description}
                </p>
              </div>

              {!isSaved ? (
                <div className="pt-4 border-t-2 border-ink/10">
                  <button
                    onClick={() => toggleSaveNiche(niche.id)}
                    disabled={saving}
                    className="w-full py-2 px-3 hand-btn text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    Add to my niches
                  </button>
                </div>
              ) : (
              <div className="flex items-center gap-2 pt-4 border-t-2 border-ink/10">
                <button
                  onClick={() => {
                    setSelectedNiche(niche.id);
                    handleProceedToCreators(niche.id);
                  }}
                  className="flex-1 py-2 px-3 hand-btn-primary text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Creators</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={`/search?niche=${niche.id}`}
                  className="py-2 px-3 rounded-xl bg-white border-2 border-ink hover:border-accent/50 text-pencil hover:text-ink text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  title="Search 7-Day Topics in this niche"
                >
                  <Search className="w-3.5 h-3.5 text-accent" />
                  <span>Topics</span>
                </Link>
              </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
