# CreatorLab security self-review: OWASP Top 10:2025 + Next Steps

| Test record | |
|---|---|
| Application | CreatorLab (Next.js 15 App Router, Supabase Auth + Postgres, Fapshi payments in sandbox) |
| Environment / base URL | Production `https://creator-lab-beta.vercel.app` (read-only, low-volume checks) and local production builds |
| Build | `main` after "Security hardening (OWASP Top 10:2025 self-review)" |
| Test date | 2026-11-25 |
| Tester | Owner-authorized review (assisted) |
| In scope | All `/api/*` routes, middleware, auth flows, payments (checkout, webhook, status), storage policies, headers, dependencies |
| Out of scope | Supabase/Vercel/Fapshi/Google platform internals; load, fuzzing and credential-guessing tests (not authorized) |
| Roles used | Anonymous (live); user / curator / admin via code review and unit tests (no live test accounts were available) |

Status values: PASS, FAIL (fixed = found and fixed in this review), N/A, NOT RUN. This is a review, not a certification.

## A01 Broken Access Control: PASS after fixes
| Check | Status | Evidence |
|---|---|---|
| A01.1 Unauthenticated access | FAIL → fixed | Live: `/api/search` returned 200 to a signed-out caller; `/api/video-analysis` had no auth. Both now `requireRole("user")`. 19/19 other protected routes return 401 signed-out. |
| A01.2 Role boundaries | PASS | Every `/api/admin/*` handler calls `requireRole("admin")` (super_admin for the Gemini key); admin RPCs re-check in Postgres; secret admin path returns 404 to non-admins (tests/admin-portal). |
| A01.3 Record ownership | PASS | Scripts, favourites, notifications, payments filter by `user_id` on the server and RLS restricts rows to the owner. |
| A01.4 Tenant isolation | N/A | Single-tenant app (no organisations). |
| A01.5 Methods / alternate routes | PASS | Route inventory: every handler of every method has a server-side check; `/admin` and `/curator` folders 404 directly. |
| A01.6 Client-side state tampering | PASS | Roles only from `profiles.role` (DB trigger blocks self-change); prices from server settings; plan from subscription dates. |
| A01.7 Business limits | PASS | Script limit enforced server-side with an atomic, per-user-locked reservation (migration 7); outliers filtered on the server. |
| A01.8 CSRF / CORS | PASS (hardened) | Cookies SameSite=Lax; no CORS headers (same-origin only); new middleware check refuses cross-site API writes (verified: 403). |
| A01.9 Outbound URL fetches | PASS (hardened) | All outbound calls go to fixed hosts with encoded params; TikTok short-link resolver now restricted to vt/vm.tiktok.com over https. |
| A01.10 Failure visibility | PASS | Denials return 401/403/404 without data; blocked cross-site writes and webhook rejections are logged. Alerting: see A09. |

## A02 Security Misconfiguration: PASS after fixes
| Check | Status | Evidence |
|---|---|---|
| A02.1 Debug/error output | FAIL → fixed | User routes echoed database error text; now `publicMessage()` returns fixed messages, details only in logs. Friendly error pages exist (error.tsx, global-error.tsx, not-found). |
| A02.2 Default/test features | PASS | Removed earlier: shared OAuth fallback account, offline mock client in production. Sandbox helpers only show in Fapshi test mode. |
| A02.3 Headers and cookies | FAIL → fixed | Only HSTS was set. Added X-Frame-Options, CSP frame-ancestors/object-src/base-uri, nosniff, Referrer-Policy, Permissions-Policy, COOP; removed X-Powered-By. Supabase cookies are Secure+SameSite=Lax; not HttpOnly by design of the browser client (risk accepted, no XSS sinks found). |
| A02.4 File exposure | PASS | Live: `/.env`, `/.env.local`, `/.git/*`, config files 404; source maps not published. |
| A02.5 Storage/services | PASS | Buckets: images only, size-capped, writes limited to own folder / curators; outlier tables no longer readable from the browser (migration 7). |
| A02.6 CORS / exposure | PASS | No CORS allowances; only the public price list is cacheable. |
| A02.7 Environment separation | PASS | `.env.example` without values; sandbox vs live chosen by config with a key/URL mismatch guard. |
| A02.8 XML parsers | N/A | No XML parsing. |
| A02.9 Secrets in config | PASS | Secret scans of every commit diff; `.env*.local` git-ignored; secrets only in Vercel env. |
| A02.10 Configuration drift | NOT RUN | No baseline tooling; recommended: review Vercel/Supabase settings each release. |

## A03 Software Supply Chain: PASS with accepted risk
| Check | Status | Evidence |
|---|---|---|
| A03.1 Inventory | PASS | `package.json` + `package-lock.json` (npm registry). |
| A03.2 Vulnerability review | PASS (risk accepted) | `npm audit --omit=dev`: 2 findings in the postcss copy bundled inside Next.js (build-time only, processes our own CSS). Fix requires Next 16. Earlier: Next CVE-2025-66478 and nodemailer advisories fixed. |
| A03.3 Maintenance | PASS | Next 15.5 backport line maintained. |
| A03.4 Sources / locking | PASS | Lockfile committed; installs from npm. |
| A03.5–A03.9 Repo, CI/CD, provenance, updates, tooling | NOT RUN | Requires GitHub/Vercel settings review by the owner: enable MFA, branch protection on `main`, secret scanning, Dependabot. |
| A03.10 Third-party integrations | PASS | Supabase, Google (Gemini, YouTube, Gmail), Vercel, Fapshi: server-only keys. |

## A04 Cryptographic Failures: PASS
| Check | Status | Evidence |
|---|---|---|
| A04.1 Data classification | PASS | Documented in /privacy (notes and searches not stored, no PINs). |
| A04.2 Transport | PASS | HTTPS with HSTS preload (Vercel). |
| A04.3 At rest | PASS | Supabase-managed encryption. |
| A04.4 Passwords | PASS | Supabase Auth (bcrypt); app never stores password text. |
| A04.5 Keys | PASS | Server-only env vars; client bundle scanned: no Fapshi/service keys. |
| A04.6 Algorithms / randomness | PASS | `crypto.randomUUID()` for payment refs; constant-time webhook secret compare. |
| A04.7 Token exposure | PASS | No secrets in URLs or logs; admin path never logged (booleans only). |
| A04.8 Caching | PASS (hardened) | `/api/*` now `private, no-store`. |
| A04.9 Crypto failure behavior | PASS | Wrong webhook secret → 401; payments always re-verified with Fapshi. |

## A05 Injection: PASS
| Check | Status | Evidence |
|---|---|---|
| A05.1 Input inventory | PASS (hardened) | Length/type caps added to search and analysis; notes ≤ 5,000 chars; ids validated (UUID / Fapshi id patterns). |
| A05.2 / A05.8 Queries | PASS | Supabase query builder (parameterised); no `.or()`/`.filter()` strings built from input. |
| A05.3 / A05.7 Output | PASS | React escaping; only `dangerouslySetInnerHTML` is a constant theme script; email templates HTML-escape values. |
| A05.4 Search/sort/filter | PASS (hardened) | Search type allow-listed. |
| A05.5 Command/template/path | N/A | No shell or template interpreters on user input. |
| A05.6 File parsers | PASS | Uploads restricted to JPEG/PNG/WebP by the storage bucket. |
| A05.9 Automated scan | NOT RUN | No DAST scanner run against production (not authorized). |

## A06 Insecure Design: PASS after fixes
A06.1 threat model: payments (server prices, Fapshi re-verification, idempotent grant), limits (atomic), roles (DB-only), outliers (server filtered). A06.2–A06.4 PASS (tests). A06.5 N/A (single tenant). A06.6 FAIL → fixed: paid APIs (search, analysis) had no rate limits; added. A06.7 PASS: 144 automated tests incl. tests/security.test.mjs. A06.8 PASS: each change reviewed in this session.

## A07 Authentication Failures: PASS with owner actions
A07.1/A07.2/A07.3/A07.4/A07.5: handled by Supabase Auth; **owner action**: in Supabase → Authentication, set minimum password length ≥ 8, enable leaked-password protection, keep rate limits and email confirmation on; consider MFA for admin accounts. A07.6/A07.7/A07.8 PASS (Supabase sessions, refresh in middleware via `getUser()`, sign-out clears session and reloads). A07.9 PASS (OAuth via Supabase). A07.10 PARTIAL: Supabase auth logs; app logs denials.

## A08 Software or Data Integrity: PASS after fixes
A08.4 FAIL → fixed: live webhook accepted any caller because `FAPSHI_WEBHOOK_SECRET` is not set in Vercel; now fails closed on Vercel (owner action: set the secret in Vercel and Fapshi). A08.5 PASS: price, role, plan and profile-picture URLs are decided or validated on the server. A08.6 N/A (no deserialisation of objects). A08.7 PASS: no third-party script tags. A08.1–A08.3/A08.8: see A03.5–A03.9 (owner settings).

## A09 Logging and Alerting: PARTIAL
A09.1 PASS: audit_log for curator/admin changes, activity events, server logs for denials and payment failures. A09.2 PASS: no secrets/notes logged. A09.3 PASS: logged error text has line breaks stripped. A09.4 PARTIAL: Vercel/Supabase log retention. A09.5/A09.6 NOT RUN: no alerting configured; recommended Vercel log drains or alerts on 5xx and `[security]` lines.

## A10 Exceptional Conditions: PASS after fixes
A10.1 PASS (input validation, safe 400s). A10.2 PASS (Fapshi 15 s timeout, controlled messages). A10.3 FAIL → fixed: script generation continued when the plan check failed; now 503 (fail closed). A10.4/A10.5 PASS: grant is row-locked and idempotent; failed generations refund the slot. A10.6 PASS: per-user limits. A10.7 PASS: error pages + logging. A10.8 NOT RUN (alerting).

## X01 Resilience: PARTIAL
X01.1 PASS (quotas, input caps, limits). X01.3 PASS (timeouts on Fapshi; status-check throttling). X01.4/X01.5 PASS (payments complete via three paths; features degrade with clear messages). X01.2, X01.7, X01.8 NOT RUN (no load test, restore drill or dashboards; owner action).

## X02 Memory Management: N/A
Node.js/TypeScript (managed memory). Only native component is `sharp` (image optimisation, maintained upstream).

## X03 AI-Generated Code: PASS with process note
X03.2–X03.4 PASS: every change was reviewed in-session, type-checked, covered by tests (144) and built. X03.5 PASS: only well-known packages added (`server-only`). X03.1/X03.6/X03.7: owner to confirm a human reviews merges to `main` and that secrets are never pasted into AI tools.

## Findings fixed in this review
| ID | Check | Title | Fix |
|---|---|---|---|
| F1 | A01.1 / A06.6 | Topic search open to signed-out users (spends YouTube + Gemini) | Sign-in + 40/hour per user + input caps |
| F2 | A01.1 / A06.6 | Video analysis open to signed-out users (spends Gemini) | Sign-in + 30/hour per user + input caps |
| F3 | A02.3 | Missing security headers | Headers in `next.config.ts` |
| F4 | A02.1 | Database error text returned to users | `publicMessage()` |
| F5 | A08.4 | Webhook accepted unsigned calls on live | Fail closed without secret on Vercel |
| F6 | A10.3 | Fail-open script limit on plan-check error | 503 instead |
| F7 | A01.8 | No server-side origin check on API writes | Middleware cross-site write block |

## Owner actions (dashboards)
1. Vercel: add `FAPSHI_WEBHOOK_SECRET`; set the same secret in the Fapshi dashboard; redeploy.
2. Supabase Auth: password length ≥ 8, leaked-password protection, rate limits, MFA for admins.
3. GitHub: MFA, branch protection on `main`, secret scanning, Dependabot alerts.
4. Monitoring: alerts on 5xx spikes and `[security]` / `[payments/webhook] rejected` log lines.
5. Later: a full Content-Security-Policy, rolled out in Report-Only mode first.
