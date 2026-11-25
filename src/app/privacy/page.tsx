import type { Metadata } from "next";
import Link from "next/link";
import { ContactLink, LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — CreatorLab",
  description: "What CreatorLab collects, why, who processes it, and how to delete your data.",
};

const sections: LegalSection[] = [
  {
    id: "collect",
    title: "What we collect",
    body: (
      <>
        <p>We keep this list short on purpose. We collect:</p>
        <ul>
          <li>
            <strong>Account details:</strong> your email address and name. If you sign in with Google, Google shares your
            name, email address and profile picture with us. If you sign up with email, you give us these yourself, plus a
            password, which is handled by our sign-in provider (Supabase). We never see or store your password text.
          </li>
          <li>
            <strong>Profile and preferences:</strong> the niches you choose, your answers to the setup questions, your site
            theme, and optional profile picture, cover picture and short bio.
          </li>
          <li>
            <strong>What you create:</strong> the scripts you generate (so you can find them in your history), the creators you
            save as favourites, and a record of each script request: your account, the niche, the topic and the time.
          </li>
          <li>
            <strong>Usage data:</strong> simple activity events such as pages you open, scripts written or the
            &ldquo;Why this worked&rdquo; analysis you open, with the time. We use them to show your activity and to understand how
            CreatorLab is used.
          </li>
          <li>
            <strong>Payment references:</strong> when you buy CreatorLab Pro, we keep the amount, the currency, the status,
            the payment method type (MTN Mobile Money or Orange Money) and the transaction reference from our payment provider.
          </li>
        </ul>
        <p>
          <strong>What we never collect:</strong> your mobile money PIN, card numbers or any payment password. You enter
          those only on our payment provider&apos;s pages or on your phone, never on CreatorLab.
        </p>
      </>
    ),
  },
  {
    id: "not-stored",
    title: "What we do not keep",
    body: (
      <ul>
        <li>
          <strong>Your research notes.</strong> The notes you paste to write a script are sent to the AI model for that one
          request and then discarded. They are not stored or logged.
        </li>
        <li>
          <strong>Your searches.</strong> Topic search queries and their results are not stored.
        </li>
        <li>
          <strong>Your social accounts.</strong> You never connect your TikTok or YouTube account. CreatorLab only uses public
          information about the creators our team curates.
        </li>
      </ul>
    ),
  },
  {
    id: "use",
    title: "How we use your data",
    body: (
      <>
        <ul>
          <li>To create and secure your account and keep you signed in.</li>
          <li>To show you creators and topics for your niches and to generate scripts you ask for.</li>
          <li>To keep your script history, favourites and activity so you can come back to them.</li>
          <li>To apply plan limits (free daily script, CreatorLab Pro) and to confirm your payments.</li>
          <li>To send emails you need, such as account confirmation or a role invitation.</li>
          <li>To keep the service safe, fix problems and understand which features are used.</li>
        </ul>
        <p>We do not sell your personal data and we do not use it for advertising.</p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Services that process data for us",
    body: (
      <>
        <p>CreatorLab runs on a few trusted services. Each one only receives what it needs to do its job:</p>
        <ul>
          <li>
            <strong>Supabase:</strong> our database and sign-in provider. Stores your account, profile, scripts, activity and
            payment records.
          </li>
          <li>
            <strong>Google:</strong> &ldquo;Sign in with Google&rdquo; (if you use it); the Gemini AI model, which receives your
            topic and notes to write a script; and the YouTube Data API, used for public video details and topic search.
          </li>
          <li>
            <strong>Vercel:</strong> hosts the website and keeps short technical logs (for example, request times and errors).
          </li>
          <li>
            <strong>Fapshi:</strong> processes CreatorLab Pro payments with MTN Mobile Money and Orange Money. Fapshi and your
            mobile operator handle the payment itself; we receive the result and a transaction reference. Your email address
            is shared with Fapshi for the payment receipt.
          </li>
          <li>
            <strong>Email delivery:</strong> invitation emails are sent through Google&apos;s Gmail service.
          </li>
          <li>
            <strong>YouTube and TikTok players:</strong> when you play a video on CreatorLab, it plays in the platform&apos;s
            official embedded player, which is provided by YouTube or TikTok under their own privacy policies.
          </li>
        </ul>
        <p>These services may process data outside Cameroon. We choose providers that protect data with industry-standard security.</p>
      </>
    ),
  },
  {
    id: "storage",
    title: "Cookies and local storage",
    body: (
      <p>
        We use the cookies needed to keep you signed in, and your browser&apos;s local storage to remember your site theme. We do
        not use advertising or tracking cookies.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <ul>
        <li>Your account data, scripts, favourites and activity: while your account is open.</li>
        <li>
          After you ask to delete your account: removed within <strong>90 days</strong>, including your script request records.
        </li>
        <li>
          The log of changes made by curators and admins: kept for <strong>one year</strong>.
        </li>
        <li>
          Payment records: kept as long as needed for accounting and to resolve payment questions, and as required by law.
        </li>
      </ul>
    ),
  },
  {
    id: "rights",
    title: "Your choices and data deletion",
    body: (
      <>
        <ul>
          <li>
            <strong>See and update</strong> your details on your <Link href="/profile">profile</Link> and{" "}
            <Link href="/account">account</Link> pages.
          </li>
          <li>
            <strong>Delete your scripts</strong> from your script history at any time.
          </li>
          <li>
            <strong>Delete your account</strong> from the <Link href="/account">account page</Link>. Your data is then removed
            within 90 days.
          </li>
          <li>
            <strong>Ask us</strong> for a copy of your data, a correction, or deletion by writing to <ContactLink />. We may ask
            you to confirm the request from the email linked to your account.
          </li>
        </ul>
        <p>We aim to follow Cameroon&apos;s Law No. 2024/017 on the protection of personal data.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Data is sent over encrypted connections. Each person can only read their own account data, scripts and payments, and
        staff roles are checked on the server for every admin action. Secret keys are kept on the server and never sent to your
        browser. No system is perfectly secure, so please use a strong password and keep your email account safe.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        CreatorLab is made for creators who can agree to these terms where they live. If you are under 18, please use CreatorLab
        with a parent or guardian&apos;s permission. If you think a child has given us data without permission, contact us and we
        will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: (
      <p>
        If we change this policy, we will update the date at the top and, for important changes, tell you in the app or by email.
        For any privacy question or request, write to <ContactLink />.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      highlight="Policy"
      intro={
        <p>
          CreatorLab helps short-form creators in Cameroon and across Africa learn what works and write their own scripts. This
          page explains, in plain words, what personal data we collect, why, who helps us process it, and how you can delete it.
        </p>
      }
      sections={sections}
      otherPage={{ href: "/terms", label: "Read the Terms of Service" }}
    />
  );
}
