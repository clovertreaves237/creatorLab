import Link from "next/link";
import type { Metadata } from "next";
import { HandCheckItem } from "@/components/ui/HandDrawn";

export const metadata: Metadata = {
  title: "Become a curator · CreatorLab",
  description: "What we look for in CreatorLab curators and how to apply.",
};

/**
 * Public page: curator criteria + how to apply. Applications happen by email, outside the product.
 * The application address comes from NEXT_PUBLIC_CURATOR_APPLY_EMAIL (.env.local).
 */
export default function BecomeACuratorPage() {
  const applyEmail = process.env.NEXT_PUBLIC_CURATOR_APPLY_EMAIL || "";

  const steps = [
    {
      title: "Create a CreatorLab account",
      body: "Sign up like any user and finish setup, including your @username. We can only add curators who already have an account.",
    },
    {
      title: "Email us your CV and a short letter",
      body: "Tell us why you want to curate, which niche you know best, and link to any content you have made or studied.",
    },
    {
      title: "We review and reply by email",
      body: "If we would like to work with you, we ask for your CreatorLab username, your full name as on your ID, and your location.",
    },
    {
      title: "Accept the invitation in CreatorLab",
      body: "Our team sends a curator invitation to your account. Accept it from your notifications and the Curator Workspace appears in your dashboard.",
    },
  ];

  return (
    <div className="w-full">
      <section className="px-4 sm:px-8 pt-16 pb-20 text-center">
        <span className="sk-pill mb-8">Join the team</span>
        <h1 className="text-5xl sm:text-7xl">
          Become a <span className="hl-sky">curator.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-pencil">
          Curators choose the creators and videos that CreatorLab users learn from. It is paid, part-time work for
          people who know short-form video in Cameroon and across Africa.
        </p>
      </section>

      <section className="px-4 sm:px-8 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl sm:text-4xl">
            What we <span className="hl-yellow">look for</span>
          </h2>
          <ul>
            <HandCheckItem>You watch TikTok and YouTube Shorts closely and can tell why a video worked</HandCheckItem>
            <HandCheckItem>You know at least one of our niches well (Branding & Marketing first)</HandCheckItem>
            <HandCheckItem>You can check numbers carefully: views, likes, comments and dates</HandCheckItem>
            <HandCheckItem>You can follow written selection criteria and give honest feedback</HandCheckItem>
            <HandCheckItem>You can commit a few hours every week and meet deadlines</HandCheckItem>
            <HandCheckItem>You have a CreatorLab account with a username</HandCheckItem>
          </ul>
        </div>
      </section>

      <section className="bg-paper px-4 sm:px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl sm:text-4xl">
            How to <span className="hl-mint">apply</span>
          </h2>
          <ol className="grid gap-8 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="sk-card p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper-deep text-lg font-extrabold">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-pencil">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-14 max-w-2xl text-center">
            {applyEmail ? (
              <p className="text-lg text-ink">
                Send your CV and letter to <strong className="select-all">{applyEmail}</strong> with the subject
                &ldquo;Curator application&rdquo;.
              </p>
            ) : (
              <p className="text-lg text-pencil">The application email address will be published here soon.</p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/signup" className="sk-btn-ink px-8 py-3.5 text-base">
                Create your account first
              </Link>
              <Link href="/" className="sk-btn px-8 py-3.5 text-base">
                Back to CreatorLab
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
