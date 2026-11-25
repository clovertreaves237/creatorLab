"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, LayoutGrid, PenTool, Users, Search, FileText, Plus, Minus } from "lucide-react";
import {
  Highlight,
  SketchCard,
  DrawnArrow,
  StickyNote,
  TapeBanner,
  HandCheckItem,
} from "@/components/ui/HandDrawn";
import { AuthGateModal } from "@/components/landing/AuthGateModal";
import { ALLOWED_NICHES } from "@/lib/constants/niches";
import { PlanCards } from "@/components/billing/PlanCards";
import { parseBillingSettings, planCatalog, type PlanInfo } from "@/lib/payments/logic";
import { Check } from "lucide-react";

const CheckMark = () => <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />;
const DEFAULT_SETTINGS = parseBillingSettings([]);
const DEFAULT_PRICING = {
  freeScriptsPerDay: DEFAULT_SETTINGS.freeScriptsPerDay,
  freeSoundsPerHour: DEFAULT_SETTINGS.freeSoundsPerHour,
  plans: planCatalog(DEFAULT_SETTINGS) as PlanInfo[],
};

const FAQ = [
  {
    q: "Who is CreatorLab for?",
    a: "Beginner and intermediate short-form creators in Cameroon and across Africa who want to learn what works on TikTok and YouTube, then write their own scripts with that knowledge.",
  },
  {
    q: "Do I have to connect my social media accounts?",
    a: "No. CreatorLab only uses public performance numbers for the curated creators. You never link your own TikTok or YouTube account.",
  },
  {
    q: "Where does the “Why this worked” analysis come from?",
    a: "Gemini reads the video's public numbers and title and explains the likely reasons it performed. Every breakdown carries the note: interpretation based on public data, not verified by watching the video.",
  },
  {
    q: "How is my personal research data protected?",
    a: "In line with Cameroon Law No. 2024/017 on personal data protection, the notes you paste are sent to Gemini for one request and then discarded. Zero user notes are stored.",
  },
  {
    q: "Why must visitors register to view creator lists?",
    a: "Visitor access is limited to the landing page and sign-up. Creators, topic search and script generation need a free account, which keeps the service stable for registered creators.",
  },
  {
    q: "Can I edit and copy my generated scripts?",
    a: "Yes. Every script opens in an editor inside the app, and you can copy it with one click.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const [authGateFeature, setAuthGateFeature] = useState("access creator intelligence");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Pricing: defaults render immediately; live prices (admin settings) replace them when loaded.
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  useEffect(() => {
    fetch("/api/plans")
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => p?.plans?.length && setPricing(p))
      .catch(() => {});
  }, []);

  // Verified users skip the landing page.
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user && data.user.email_confirmed_at) {
        router.replace("/niches");
      }
    };
    checkAuth();
  }, [router]);

  const triggerAuthGate = (feature: string) => {
    setAuthGateFeature(feature);
    setAuthGateOpen(true);
  };

  return (
    <div className="w-full">
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-8 pt-16 pb-28 sm:pt-20 sm:pb-36">
        <LayoutGrid
          aria-hidden="true"
          className="absolute left-[8%] top-12 hidden md:block h-20 w-20 -rotate-6 text-pencil-light/70"
          strokeWidth={1.75}
        />
        <PenTool
          aria-hidden="true"
          className="absolute right-[10%] bottom-24 hidden md:block h-16 w-16 -rotate-12 text-pencil-light/70"
          strokeWidth={1.75}
        />

        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center">
          <span className="sk-pill mb-10 text-sm">Short-form creator intelligence</span>

          <h1 className="relative text-5xl sm:text-7xl md:text-[96px] font-extrabold leading-[1.05]">
            Create viral
            <br />
            <span className="hl-sky">short-form videos.</span>
            <DrawnArrow label="Start here!" className="absolute -right-32 top-2" />
          </h1>

          <p className="mt-10 max-w-2xl text-lg sm:text-[22px] leading-relaxed text-pencil">
            Learn what works on TikTok and YouTube. Study the top creators in your niche, find this
            week&apos;s topics, and turn your own notes into a 120-second script.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
            <Link href="/signup" className="sk-btn px-10 py-4 text-lg">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/signin"
              className="text-base font-medium text-ink underline underline-offset-[6px] decoration-2 decoration-line hover:decoration-ink"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. The Toolkit ──────────────────────────────────── */}
      <section id="features" className="px-4 sm:px-8 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl sm:text-5xl mb-16 sm:mb-20">
            The <Highlight color="yellow">Toolkit</Highlight>
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <SketchCard title="Curated Creators" icon={<Users className="h-6 w-6" />}>
              9 TikTok and 9 YouTube creators in every niche, hand-picked by our curators against
              written criteria.
            </SketchCard>
            <SketchCard title="Fresh Topics" icon={<Search className="h-6 w-6" />} delay={0.08}>
              Search any topic and get up to 10 results from the last 7 days, most recent first.
            </SketchCard>
            <SketchCard title="Ready Scripts" icon={<FileText className="h-6 w-6" />} delay={0.16}>
              Paste your notes and get a script of up to 120 seconds, built from our written
              training rules.
            </SketchCard>
          </div>
        </div>
      </section>

      {/* ── 3. Sticky note ──────────────────────────────────── */}
      <section className="bg-paper px-4 sm:px-8 py-24 sm:py-28">
        <StickyNote
          quote="Your research notes are sent to Gemini for one request and then discarded. We never store them."
          author="Our privacy promise"
          role="Cameroon Law No. 2024/017"
        />
      </section>

      {/* ── 4. Checklist + tape ─────────────────────────────── */}
      <section id="how-it-works" className="pt-20 sm:pt-24">
        <ul className="mx-auto max-w-3xl px-4 sm:px-8 mb-24">
          <HandCheckItem>Pick your niches: 3 live today, more coming soon</HandCheckItem>
          <HandCheckItem>Study the top creators on TikTok and YouTube</HandCheckItem>
          <HandCheckItem>See why a video worked, from its public numbers</HandCheckItem>
          <HandCheckItem>Write and edit your own 120-second script</HandCheckItem>
        </ul>
        <TapeBanner items={ALLOWED_NICHES.map((n) => n.name)} />
      </section>

      {/* ── 5. Image cards ──────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl sm:text-6xl mb-16 sm:mb-20">
            See <Highlight color="pink">why it worked.</Highlight>
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <FrameCard
              title="Why this worked"
              body="Open any curated video and get a short breakdown of its hook, pacing and audience trigger."
            >
              <div className="w-full max-w-sm space-y-3 text-left">
                <div className="flex items-center justify-between rounded-md border-2 border-ink bg-white px-4 py-3">
                  <span className="font-bold">Branding &amp; Marketing</span>
                  <span className="hl-mint text-sm font-bold">10.4x outlier</span>
                </div>
                <div className="rounded-md border-2 border-ink bg-white px-4 py-3 text-sm leading-relaxed">
                  <p className="font-bold mb-1">Why this worked</p>
                  <p className="text-pencil">A clear promise in the first 3 seconds, then one idea per cut.</p>
                </div>
              </div>
            </FrameCard>
            <FrameCard
              title="Your script"
              body="Timed beats you can edit right in the app, then copy straight into your shoot notes."
            >
              <div className="w-full max-w-sm rounded-md border-2 border-ink bg-white px-5 py-4 text-left text-sm leading-7">
                <p><span className="font-bold">[0:00 – 0:03] HOOK:</span> <span className="text-pencil">Most brands in Douala…</span></p>
                <p><span className="font-bold">[0:03 – 0:25] CONTEXT:</span> <span className="text-pencil">Here&apos;s what changed…</span></p>
                <p><span className="font-bold">[0:25 – 1:45] STORY:</span> <span className="text-pencil">Three steps…</span></p>
                <p><span className="font-bold">[1:45 – 2:00] CTA:</span> <span className="text-pencil">Follow for part 2.</span></p>
              </div>
            </FrameCard>
          </div>
        </div>
      </section>

      {/* ── 6. Access tiers ─────────────────────────────────── */}
      <section id="pricing" className="bg-paper px-4 sm:px-8 py-24 sm:py-28 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl sm:text-6xl">
            Simple <Highlight color="mint">pricing.</Highlight>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-pencil">
            Start free. When you need more scripts, pay once with MTN Mobile Money or Orange Money. No automatic renewal.
          </p>
          <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:items-stretch">
            <div className="flex flex-col rounded-2xl border-2 border-ink bg-white p-6 sm:p-8">
              <p className="font-serif text-2xl italic">Free</p>
              <p className="mt-1 text-sm text-pencil sm:min-h-[2.5rem]">To try CreatorLab</p>
              <p className="mt-4 text-4xl font-extrabold tracking-tight">0 XAF</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-[15px]">
                {[
                  `${pricing.freeScriptsPerDay === 1 ? "1 script" : `${pricing.freeScriptsPerDay} scripts`} every 24 hours`,
                  `Up to ${pricing.freeSoundsPerHour} background sounds an hour`,
                  "All live niches and curated creators",
                  "7-day topic search and “Why this worked”",
                ].map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <CheckMark />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="sk-btn mt-6 w-full justify-center py-3.5 text-base">
                Create free account
              </Link>
            </div>
            <PlanCards plans={pricing.plans} gridClassName="contents" ctaPrefix="Get" />
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="px-4 sm:px-8 py-24 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-4xl sm:text-5xl mb-16 sm:mb-20">
            The <Highlight color="peach">Scribbled</Highlight> FAQ.
          </h2>
          <div className="space-y-8">
            {FAQ.map((item, idx) => {
              const open = faqOpenIndex === idx;
              return (
                <div key={item.q} className="sk-card">
                  <button
                    type="button"
                    onClick={() => setFaqOpenIndex(open ? null : idx)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 px-8 py-8 text-left"
                  >
                    <span className="text-xl sm:text-2xl font-bold">{item.q}</span>
                    {open ? <Minus className="h-6 w-6 shrink-0" /> : <Plus className="h-6 w-6 shrink-0" />}
                  </button>
                  {open && <p className="px-8 pb-8 -mt-2 text-lg leading-relaxed text-pencil">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7b. Become a curator ────────────────────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="sk-card mx-auto flex max-w-4xl flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-3xl sm:text-4xl">
              Know short-form? <span className="hl-sky">Curate with us.</span>
            </h2>
            <p className="mt-3 max-w-xl text-lg text-pencil">
              Curators pick the creators and videos our users learn from. See what we look for and how to apply.
            </p>
          </div>
          <Link href="/become-a-curator" className="sk-btn shrink-0 px-8 py-4 text-base">
            Curator criteria
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ── 8. Niches ───────────────────────────────────────── */}
      <section className="px-4 sm:px-8 pt-8 pb-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl sm:text-5xl mb-6">
            Your <Highlight color="sky">Niches.</Highlight>
          </h2>
          <p className="text-center text-lg text-pencil mb-16 max-w-xl mx-auto">
            Curated African creators and tailored training rules in each one.
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {ALLOWED_NICHES.map((niche) => (
              <button
                key={niche.id}
                type="button"
                onClick={() => triggerAuthGate(`explore ${niche.name}`)}
                className="sk-card group flex flex-col gap-4 p-8 text-left"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-xl font-bold">{niche.name}</span>
                  {niche.status === "live" ? (
                    <span className="hl-yellow text-xs font-bold uppercase">Live</span>
                  ) : (
                    <span className="rounded border border-line px-1.5 py-0.5 text-xs font-bold uppercase text-pencil">Coming soon</span>
                  )}
                </span>
                <span className="text-base leading-relaxed text-pencil flex-1">{niche.description}</span>
                <span className="flex items-center justify-between pt-2 text-sm font-semibold">
                  9 TikTok &middot; 9 YouTube
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AuthGateModal isOpen={authGateOpen} onClose={() => setAuthGateOpen(false)} actionTitle={authGateFeature} />
    </div>
  );
}

/** Thick-outlined card with a dashed inner frame and a serif italic title (sample section 5). */
function FrameCard({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-xl bg-ink"
        style={{ filter: "url(#rough-paper)" }}
      />
      <div className="relative rounded-xl border-[3px] border-ink bg-white p-6" style={{ filter: "url(#rough-paper)" }}>
        <div className="aspect-[16/9] w-full border-2 border-dashed border-ink bg-paper-deep flex items-center justify-center p-6">
          {children}
        </div>
        <h3 className="mt-6 font-serif italic font-bold text-4xl">{title}</h3>
        <p className="mt-3 text-lg text-pencil">{body}</p>
      </div>
    </div>
  );
}
