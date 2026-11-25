import Link from "next/link";
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from "@/lib/constants/legal";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

/** Shared layout for /privacy and /terms: title, review note, contents list, numbered sections. */
export function LegalPage({
  eyebrow,
  title,
  highlight,
  intro,
  sections,
  otherPage,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: React.ReactNode;
  sections: LegalSection[];
  otherPage: { href: string; label: string };
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="sk-pill">{eyebrow}</span>
      <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
        {title} <span className="hl-yellow">{highlight}</span>
      </h1>
      <p className="mt-4 text-sm text-pencil">Last updated: {LEGAL_LAST_UPDATED}</p>

      <div className="mt-8 rounded-xl border-2 border-dashed border-ink bg-paper-deep px-4 py-3 text-sm text-ink">
        <span className="font-bold">Draft.</span> This text is written in plain language and must be reviewed by a lawyer before
        CreatorLab launches publicly.
      </div>

      <div className="mt-8 text-base leading-relaxed text-ink">{intro}</div>

      <nav aria-label="Contents" className="sk-card-flat mt-10 px-5 py-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-pencil">Contents</p>
        <ol className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-ink hover:underline underline-offset-4">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 space-y-12">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              {i + 1}. {s.title}
            </h2>
            <div className="legal-body mt-4 space-y-4 text-[15px] leading-relaxed text-ink/90 [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
              {s.body}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
        <p className="text-pencil">
          Questions? Write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <Link href={otherPage.href} className="sk-btn px-4 py-2 text-sm">
          {otherPage.label}
        </Link>
      </div>
    </div>
  );
}

/** Mail link to the contact address. */
export function ContactLink() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}
