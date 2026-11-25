import nodemailer from "nodemailer";

/**
 * Outgoing email through a Gmail account (SMTP + Google "app password").
 * Configure in .env.local:
 *   GMAIL_USER=yourname@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx     (16-character app password, NOT your Gmail password)
 *   EMAIL_FROM_NAME=CreatorLab                  (optional)
 *   NEXT_PUBLIC_APP_URL=https://your-site       (used for links in emails)
 * If these are missing, sendEmail() returns { sent: false } and nothing breaks.
 */

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  if (!user || !pass) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}

export function emailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export function appUrl(path = ""): string {
  const base = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");
  return `${base}${path}`;
}

export async function sendEmail(message: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "Email is not configured (GMAIL_USER / GMAIL_APP_PASSWORD)." };
  try {
    await t.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "CreatorLab"}" <${process.env.GMAIL_USER}>`,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    return { sent: true };
  } catch (err: any) {
    console.error("[email] send failed:", err?.message || err);
    return { sent: false, reason: err?.message || "Email could not be sent." };
  }
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Simple branded email layout (inline styles: email clients ignore stylesheets). */
function layout(heading: string, paragraphs: string[], button: { label: string; url: string }, footer: string) {
  const html = `<!doctype html><html><body style="margin:0;background:#FAFAF8;font-family:Arial,Helvetica,sans-serif;color:#18181B">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF8;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:2px solid #18181B;border-radius:12px">
<tr><td style="padding:28px 28px 8px;font-size:22px;font-weight:800">Creator<span style="color:#2563EB">Lab</span></td></tr>
<tr><td style="padding:8px 28px 0;font-size:24px;font-weight:800;line-height:1.3">${escapeHtml(heading)}</td></tr>
${paragraphs.map((p) => `<tr><td style="padding:14px 28px 0;font-size:16px;line-height:1.6;color:#3f3f46">${escapeHtml(p)}</td></tr>`).join("")}
<tr><td style="padding:24px 28px 8px"><a href="${button.url}" style="display:inline-block;background:#18181B;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 24px;border-radius:8px">${escapeHtml(button.label)}</a></td></tr>
<tr><td style="padding:8px 28px 28px;font-size:13px;line-height:1.5;color:#71717A">If the button does not work, copy this link: ${escapeHtml(button.url)}<br><br>${escapeHtml(footer)}</td></tr>
</table></td></tr></table></body></html>`;
  const text = `${heading}\n\n${paragraphs.join("\n\n")}\n\n${button.label}: ${button.url}\n\n${footer}`;
  return { html, text };
}

/** Invitation to become a curator or admin. The answer is given inside CreatorLab (accept / decline). */
export function roleInvitationEmail(input: { name: string; role: "curator" | "admin"; inviterName: string; note?: string | null }) {
  const roleLabel = input.role === "curator" ? "curator" : "admin";
  const answerUrl = appUrl(`/signin?redirect=${encodeURIComponent("/profile?tab=notifications")}`);
  const paragraphs = [
    `Hi ${input.name},`,
    `${input.inviterName} has invited you to become a ${roleLabel} on CreatorLab.`,
    ...(input.note ? [`Their note: "${input.note}"`] : []),
    input.role === "curator"
      ? "As a curator you choose the creators and videos our users learn from. Your work is recorded under your account."
      : "As an admin you manage users, curators and the platform settings.",
    "Please sign in and accept or decline the invitation from your notifications.",
  ];
  const { html, text } = layout(
    `You're invited to be a CreatorLab ${roleLabel}`,
    paragraphs,
    { label: "Answer the invitation", url: answerUrl },
    "You received this because a CreatorLab admin invited your account. If you did not expect it, you can decline or ignore it."
  );
  return { subject: `Invitation: become a CreatorLab ${roleLabel}`, html, text };
}
