import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const O = await import("../src/lib/outliers/shape.ts");
const L = await import("../src/lib/payments/logic.ts");
const read = (f) => fs.readFileSync(f, "utf8");

const rows = [1, 2, 3, 4].map((n) => ({
  id: `creator-${n}`,
  niche_id: "tech-news",
  platform: "youtube",
  display_name: `Secret Creator ${n}`,
  handle: `secret_handle_${n}`,
  profile_url: `https://youtube.com/@secret_handle_${n}`,
  followers: 1000 * n,
  curated_on: "2026-11-01",
  videos: [
    {
      video_id: `vid-${n}`,
      platform: "youtube",
      title: `Secret video title ${n}`,
      video_url: `https://youtube.com/watch?v=vid-${n}`,
      published_at: "2026-11-20T00:00:00Z",
      duration_seconds: 61,
      video_snapshots: [
        { views: 10 * n, likes: 1, comments: 0, snapshot_at: "2026-11-21T00:00:00Z" },
        { views: 999999 * n, likes: 5, comments: 1, snapshot_at: "2026-11-24T00:00:00Z" },
      ],
    },
  ],
}));

test("Free vs paid experience", async (t) => {
  await t.test("1. Free plan: only the #1 outlier per view; locked cards carry NO creator or video data", () => {
    const ranked = O.mapCreatorRows(rows).sort((a, b) => b.followers - a.followers);
    const free = O.lockOutliers(ranked, false, "youtube");
    assert.equal(free.length, 4);
    assert.equal(free[0].locked, false);
    assert.equal(free[0].rank, 1);
    for (const c of free.slice(1)) {
      assert.deepEqual(Object.keys(c).sort(), ["locked", "platform", "rank"], "placeholder has only rank + platform");
    }
    const payload = JSON.stringify(free);
    for (const c of ranked.slice(1)) {
      assert.ok(!payload.includes(c.display_name), `locked name leaked: ${c.display_name}`);
      assert.ok(!payload.includes(c.handle.replace("@", "")), "locked handle leaked");
      assert.ok(!payload.includes(c.videos[0].id), "locked video id leaked");
      assert.ok(!payload.includes(c.videos[0].video_url), "locked video url leaked");
    }
    assert.equal(O.FREE_OUTLIERS_PER_VIEW, 1);
  });

  await t.test("2. Paid plans and staff see every outlier", () => {
    const paid = O.lockOutliers(O.mapCreatorRows(rows), true, "youtube");
    assert.ok(paid.every((c) => c.locked === false && c.display_name));
  });

  await t.test("3. Latest stats snapshot is used; video data is shaped for the page", () => {
    const [c] = O.mapCreatorRows(rows.slice(0, 1));
    assert.equal(c.videos[0].stats.views, 999999);
    assert.equal(c.videos[0].duration_formatted, "1:01");
    assert.equal(c.handle, "@secret_handle_1");
  });

  await t.test("4. Expired plans fall back to free automatically", () => {
    const now = new Date("2026-12-31T00:00:00Z");
    assert.equal(L.activePlan({ pro_until: "2026-12-30T23:59:59Z" }, now).plan, "free");
    assert.equal(L.activePlan({ agency_until: "2026-12-01T00:00:00Z", pro_until: "2027-01-05T00:00:00Z" }, now).plan, "creator");
  });

  await t.test("5. Outliers are filtered on the server, the browser no longer reads them directly", () => {
    const route = read("src/app/api/outliers/route.ts");
    assert.match(route, /requireRole\("user"\)/);
    assert.match(route, /lockOutliers\(/);
    assert.match(route, /createServiceClient\(\)/);
    assert.match(route, /const unlocked = plan !== "free";/);
    const page = read("src/app/(main)/creators/page.tsx");
    assert.match(page, /fetch\(`\/api\/outliers\?niche=/);
    assert.doesNotMatch(page, /\.from\("creators"\)/, "creators page must not query the database directly");
    assert.match(page, /openUpgrade\("UPGRADE"\)/, "locked cards open the plan picker");
    const profile = read("src/app/api/profile/route.ts");
    assert.match(profile, /plan === "free" \? \(recentVideosAll \|\| \[\]\)\.slice\(0, 1\)/);
  });

  await t.test("6. Database: outlier tables locked for normal users, atomic limit function", () => {
    const sql = read("supabase/migrations/20261130000001_outlier_lock_atomic_limits.sql");
    assert.match(sql, /drop policy if exists "Public can read videos" on public\.videos;/);
    assert.match(sql, /drop policy if exists "Public can read snapshots" on public\.video_snapshots;/);
    assert.match(sql, /revoke select on public\.videos, public\.video_snapshots from anon;/);
    assert.match(sql, /pg_advisory_xact_lock\(/, "one decision at a time per user");
    assert.match(sql, /if p_limit > 0 and n >= p_limit then/);
    assert.match(sql, /insert into public\.script_requests/);
    assert.match(sql, /user_id = auth\.uid\(\) and created_at > now\(\) - interval '15 minutes'/, "refund only own, recent slot");
  });

  await t.test("7. Generation: atomic slot BEFORE Gemini, 429 with nextAvailableAt, refund on failure, no double count", () => {
    const gen = read("src/app/api/scripts/generate/route.ts");
    const reserveAt = gen.indexOf("reserveScriptSlot(db, allowance");
    const geminiAt = gen.indexOf("generate120sScript({");
    const streamAt = gen.indexOf("return streamScriptResponse({");
    assert.ok(reserveAt > 0 && reserveAt < geminiAt && reserveAt < streamAt, "slot reserved before any Gemini call");
    assert.match(gen, /nextAvailableAt: a\?\.blocked\?\.nextAt \?\? null/);
    assert.match(gen, /limit: a \? \(a\.plan === "free" \? a\.free\.limit : a\.dailyLimit\) : null/);
    assert.match(gen, /status: 429/);
    assert.match(gen, /await releaseScriptSlot\(db, slot\.requestId\); \/\/ failed generations/);
    assert.match(gen, /if \(!ctx\.requestId\) \{/, "request recorded once");
    const server = read("src/lib/payments/server.ts");
    assert.match(server, /db\.rpc\("reserve_script_slot"/);
    assert.match(server, /since = new Date\(now - DAY_MS\)/, "free = rolling 24 hours");
  });

  await t.test("8. Entitlement summary for the UI", () => {
    const billing = read("src/app/api/billing/route.ts");
    for (const f of ["expiresAt", "scriptsUsedToday", "scriptsLimit", "nextAvailableAt", "outliersUnlocked", "plan"]) {
      assert.match(billing, new RegExp(`${f}:`), f);
    }
    assert.match(read("src/app/api/entitlement/route.ts"), /export \{ GET \} from "\.\.\/billing\/route"/);
  });

  await t.test("9. Return hub: every state has a way forward; success goes to Creator Engine (replace)", () => {
    const ret = read("src/app/(main)/billing/return/page.tsx");
    assert.match(ret, /window\.location\.replace\("\/script-generator\?upgraded=1"\)/);
    assert.match(ret, /setTimeout\(goToApp, 3000\)/);
    assert.match(ret, /Go to Creator Engine/);
    assert.match(ret, /We&apos;re still confirming your payment/);
    assert.match(ret, /Check again/);
    assert.match(ret, /We couldn&apos;t find this payment/);
    assert.match(ret, /href="\/billing" className="sk-btn-ink min-h-\[48px\] justify-center sm:px-7">\s*<RotateCcw/, "Try again -> plan picker");
    assert.ok((ret.match(/Back to Creator Engine/g) || []).length >= 2, "pending and not-found offer a way back");
  });

  await t.test("10. Already subscribed: checkout does not ask to pay again; duplicate pending checkouts are reused", () => {
    const co = read("src/app/(main)/billing/checkout/page.tsx");
    assert.match(co, /if \(\(extending && !extendAnyway\) \|\| coveredByAgency\)/);
    assert.match(co, /You&apos;re already on/);
    const route = read("src/app/api/payments/checkout/route.ts");
    assert.match(route, /await settlePendingPayments\(account\.userId\);/);
    assert.match(route, /\.eq\("product", price\.product\)\s*\.eq\("status", "pending"\)/);
    assert.match(route, /reused: true/);
  });

  await t.test("11. No stale state after Back/Forward: pages re-check the plan on pageshow (bfcache)", () => {
    for (const f of [
      "src/app/(main)/script-generator/page.tsx",
      "src/app/(main)/billing/checkout/page.tsx",
      "src/app/(main)/billing/page.tsx",
      "src/components/layout/Header.tsx",
      "src/components/billing/useEntitlement.tsx",
    ]) {
      const src = read(f);
      assert.match(src, /addEventListener\("pageshow"/, `${f} listens for pageshow`);
      assert.match(src, /persisted/, `${f} handles bfcache restores`);
    }
    assert.match(read("src/app/(main)/script-generator/page.tsx"), /searchParams\.get\("upgraded"\) === "1"/);
  });

  await t.test("12. Mobile stability: live countdown uses fixed-width digits; no hover jumps on touch", () => {
    assert.match(read("src/components/billing/LiveCountdown.tsx"), /tabular-nums/);
    const css = read("src/app/globals.css");
    assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
    assert.match(css, /scrollbar-gutter: stable/);
    assert.match(css, /prefers-reduced-motion: reduce/);
    const modal = read("src/components/billing/UpgradeModal.tsx");
    assert.match(modal, /h-\[100dvh\]/, "plan picker is a full-screen sheet on phones");
    assert.match(modal, /safe-area-inset-bottom/);
    assert.match(modal, /e\.key !== "Tab"/, "focus trapped in the dialog");
  });
});
