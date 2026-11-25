import type { Metadata } from "next";
import Link from "next/link";
import { ContactLink, LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — CreatorLab",
  description: "The rules for using CreatorLab, including accounts, AI-generated scripts and CreatorLab Pro payments.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Using CreatorLab",
    body: (
      <p>
        By creating an account or using CreatorLab, you agree to these terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the service. You must be able to
        enter into this agreement where you live; if you are under 18, use CreatorLab with a parent or guardian&apos;s permission.
      </p>
    ),
  },
  {
    id: "account",
    title: "Your account",
    body: (
      <ul>
        <li>Give accurate details and keep your sign-in (password or Google account) secure.</li>
        <li>You are responsible for what happens under your account. Tell us quickly if you think someone else is using it.</li>
        <li>One person per account. Do not share or sell accounts.</li>
        <li>You can delete your account at any time from the <Link href="/account">account page</Link>.</li>
      </ul>
    ),
  },
  {
    id: "service",
    title: "What CreatorLab provides",
    body: (
      <>
        <p>
          CreatorLab shows curated creators and their public video performance, helps you find recent topics, and generates
          short-form video scripts from our training rules, your topic and your notes.
        </p>
        <ul>
          <li>
            Video numbers come from public data and are shown with the date they were checked. They can change and may be
            incomplete.
          </li>
          <li>
            The &ldquo;Why this worked&rdquo; analysis is an interpretation based on public data. It is not verified by watching the
            video.
          </li>
          <li>
            Videos, names and channels shown on CreatorLab belong to their creators and platforms. We link to and embed them; we
            do not claim ownership.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "scripts",
    title: "AI-generated scripts",
    body: (
      <ul>
        <li>Scripts are written by an AI model (Google Gemini) and can contain mistakes. Check facts, names and figures before you publish.</li>
        <li>
          You may use the scripts you generate for your own content. You are responsible for what you publish and for following
          the rules of TikTok, YouTube and any other platform.
        </li>
        <li>Only paste notes you have the right to use. Do not paste other people&apos;s private information.</li>
        <li>Similar requests can produce similar scripts for different users, so we cannot promise that a script is unique.</li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>Please do not:</p>
        <ul>
          <li>Use CreatorLab to create content that is illegal, hateful, harassing, deceptive or that infringes someone&apos;s rights.</li>
          <li>Try to get around plan limits, access other people&apos;s data, or reach parts of the service you are not allowed to use.</li>
          <li>Copy CreatorLab&apos;s curated data in bulk, scrape the site, or overload it with automated requests.</li>
          <li>Interfere with the security or normal operation of the service.</li>
        </ul>
        <p>We may suspend or close accounts that break these rules.</p>
      </>
    ),
  },
  {
    id: "plans",
    title: "Free plan and CreatorLab Pro",
    body: (
      <ul>
        <li>
          <strong>Free plan:</strong> a limited number of scripts in each 24-hour period, shown in the app. We may change free
          limits to keep the service running for everyone.
        </li>
        <li>
          <strong>CreatorLab Pro:</strong> paid once for a set number of days. The price in XAF and the length are shown before
          you pay. Pro lets you keep generating scripts up to the daily limit shown in the app.
        </li>
        <li>
          <strong>Payment:</strong> processed by Fapshi with MTN Mobile Money or Orange Money. You confirm the payment on your
          phone. CreatorLab never sees your PIN.
        </li>
        <li>
          <strong>No automatic renewal:</strong> Pro ends on the date shown in your <Link href="/billing">Plan &amp; Billing</Link>{" "}
          page unless you pay again. Paying again adds days to your end date.
        </li>
        <li>
          <strong>Problems with a payment:</strong> if you were charged but Pro did not switch on, or you were charged twice,
          contact <ContactLink /> with the date and amount. We will check it with our payment provider and fix it or refund the
          duplicate charge.
        </li>
        <li>
          <strong>Test mode:</strong> pages marked &ldquo;Test mode · no real money&rdquo; use a payment sandbox. No real money is
          taken there.
        </li>
      </ul>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes",
    body: (
      <p>
        We work to keep CreatorLab available and accurate, but we cannot promise it will always be online, error-free or that
        every feature will stay the same. We may add, change or remove features. If a change removes something you paid for
        while your Pro period is active, contact us.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    body: (
      <>
        <p>
          CreatorLab is provided &ldquo;as is&rdquo;. We do not promise that using it will make your videos perform, grow your
          audience or earn income. Decisions about what you publish are yours.
        </p>
        <p>
          As far as the law allows, CreatorLab is not liable for indirect losses (such as lost income or views). Our total
          liability for any claim is limited to the amount you paid us in the three months before the claim. Nothing in these
          terms removes rights you have under applicable consumer law.
        </p>
      </>
    ),
  },
  {
    id: "ending",
    title: "Ending your use",
    body: (
      <p>
        You can stop using CreatorLab and delete your account at any time. We may suspend or close an account that breaks these
        terms or puts the service or other users at risk. Sections that by their nature should continue (such as liability)
        stay in effect after an account is closed.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law, changes and contact",
    body: (
      <>
        <p>
          These terms are intended to be governed by the laws of the Republic of Cameroon, subject to legal review before
          launch. If we change these terms, we will update the date at the top and, for important changes, tell you in the app
          or by email. Continuing to use CreatorLab after a change means you accept the new terms.
        </p>
        <p>
          Questions about these terms: <ContactLink />.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of"
      highlight="Service"
      intro={
        <p>
          These terms explain how you can use CreatorLab, what we provide, and how CreatorLab Pro payments work. We have kept
          them short and in plain language.
        </p>
      }
      sections={sections}
      otherPage={{ href: "/privacy", label: "Read the Privacy Policy" }}
    />
  );
}
