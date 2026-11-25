import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const O = await import("../src/lib/http/origin.ts");
const R = await import("../src/lib/http/rate-limit.ts");
const E = await import("../src/lib/http/errors.ts");
const read = (f) => fs.readFileSync(f, "utf8");
const HOST = "creator-lab-beta.vercel.app";

test("OWASP 2025 hardening", async (t) => {
  await t.test("A01.8 CSRF: API writes from another site are refused; normal use is not affected", () => {
    assert.equal(O.isCrossSiteWrite("POST", "/api/payments/checkout", "https://evil.example", HOST), true);
    assert.equal(O.isCrossSiteWrite("DELETE", "/api/favorites", "https://evil.example", HOST), true);
    assert.equal(O.isCrossSiteWrite("PATCH", "/api/profile", "null", HOST), true);
    // same site, reads, server-to-server webhook, non-browser clients: allowed through to normal auth
    assert.equal(O.isCrossSiteWrite("POST", "/api/payments/checkout", `https://${HOST}`, HOST), false);
    assert.equal(O.isCrossSiteWrite("POST", "/api/scripts/generate", "http://localhost:3000", "localhost:3000"), false);
    assert.equal(O.isCrossSiteWrite("GET", "/api/billing", "https://evil.example", HOST), false);
    assert.equal(O.isCrossSiteWrite("POST", "/api/payments/webhook", "https://evil.example", HOST), false);
    assert.equal(O.isCrossSiteWrite("POST", "/api/profile", null, HOST), false);
    assert.equal(O.isCrossSiteWrite("POST", "/signin", "https://evil.example", HOST), false, "only /api routes");
    assert.match(read("src/middleware.ts"), /isCrossSiteWrite\(\s*request\.method/);
  });

  await t.test("A06.6 Rate limits on paid APIs (sliding window)", () => {
    const key = `test:${Math.random()}`;
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) assert.equal(R.takeToken(key, 3, 60_000, now + i), true);
    assert.equal(R.takeToken(key, 3, 60_000, now + 10), false, "4th within the window is refused");
    assert.equal(R.takeToken(key, 3, 60_000, now + 60_001), true, "allowed again after the window");
  });

  await t.test("A01.1 Search and video analysis require sign-in and are rate limited", () => {
    for (const f of ["src/app/api/search/route.ts", "src/app/api/video-analysis/route.ts"]) {
      const src = read(f);
      assert.match(src, /const gate = await requireRole\("user"\);\s+if \("response" in gate\) return gate\.response;/, f);
      assert.match(src, /takeToken\(/, f);
    }
    assert.match(read("src/app/api/search/route.ts"), /\.slice\(0, 200\)/, "query length capped");
    assert.match(read("src/app/api/video-analysis/route.ts"), /body\.title\.slice\(0, 300\)/, "input lengths capped");
  });

  await t.test("A02.1 / A10 Safe errors: users never see internal error text", () => {
    const original = console.error;
    console.error = () => {};
    try {
      const msg = E.publicMessage(new Error('duplicate key value violates unique constraint "payments_pkey"'), "Could not save.", "t");
      assert.equal(msg, "Could not save.");
    } finally {
      console.error = original;
    }
    for (const f of ["src/app/api/favorites/route.ts", "src/app/api/profile/route.ts", "src/app/api/onboarding/route.ts", "src/app/api/activity/route.ts"]) {
      assert.doesNotMatch(read(f), /error: (err|error)\??\.message/, `${f} must not echo error text`);
    }
  });

  await t.test("A02.3 Security headers and no caching of signed-in API data", () => {
    const cfg = read("next.config.ts");
    for (const h of ["X-Frame-Options", "frame-ancestors 'none'", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
      assert.ok(cfg.includes(h), h);
    }
    assert.match(cfg, /poweredByHeader: false/);
    assert.match(cfg, /source: "\/api\/\(\(\?!plans\)\.\*\)", headers: \[\{ key: "Cache-Control", value: "private, no-store, max-age=0" \}\]/);
    assert.doesNotMatch(cfg, /microphone=\(self\)|clipboard-write=\(\)/, "clipboard (copy buttons) stays allowed");
  });

  await t.test("A08.4 Webhook: wrong secret rejected; missing secret on Vercel fails closed", () => {
    const wh = read("src/app/api/payments/webhook/route.ts");
    assert.match(wh, /if \(!safeEqual\(given, expected\)\)/);
    assert.match(wh, /\} else if \(process\.env\.VERCEL\) \{[\s\S]{0,700}status: 401/);
  });

  await t.test("A10.3 Fail closed: no generation when the plan or limit cannot be checked", () => {
    const gen = read("src/app/api/scripts/generate/route.ts");
    assert.match(gen, /if \(!allowance\) \{[\s\S]{0,500}status: 503/);
    assert.match(gen, /slot\.unavailable\) \{[\s\S]{0,500}status: 503/);
    assert.match(read("src/lib/payments/server.ts"), /return \{ ok: false, unavailable: true \};/);
  });

  await t.test("A01.9 Outbound fetches: short-link resolver only reaches TikTok short hosts", () => {
    assert.match(read("src/lib/curation/sources.ts"), /\^\(vt\|vm\)\\\.tiktok\\\.com\$/);
  });

  await t.test("A08.5 Profile picture URLs must point to our own storage", () => {
    assert.match(read("src/app/api/profile/route.ts"), /v\.startsWith\(base\)/);
  });
});
