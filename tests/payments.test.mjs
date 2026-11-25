import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const L = await import("../src/lib/payments/logic.ts");

/** In-memory stand-in for the payments table + grant_pro_for_payment() (same rules as the SQL function). */
function fakeDb(payment) {
  const state = { payment: { ...payment }, grants: 0, proDaysGranted: 0, updates: [] };
  return {
    state,
    deps(fapshiReply) {
      return {
        fetchStatus: async (transId) => {
          if (fapshiReply instanceof Error) throw fapshiReply;
          return { transId, ...fapshiReply };
        },
        grant: async (paymentId, transId, amount) => {
          const p = state.payment;
          if (paymentId !== p.id) return "not_found";
          if (p.granted_at) return "already_granted";
          if (p.fapshi_trans_id !== transId) return "trans_mismatch";
          if (amount !== p.amount) return "amount_mismatch";
          p.granted_at = new Date().toISOString();
          p.status = "successful";
          state.grants += 1;
          state.proDaysGranted += 30;
          return "granted";
        },
        update: async (_id, fields) => {
          state.updates.push(fields);
          if (fields.status) state.payment.status = fields.status;
        },
      };
    },
  };
}

const basePayment = { id: "p1", amount: 1000, status: "pending", fapshi_trans_id: "TX123", granted_at: null };

test("Fapshi payments", async (t) => {
  await t.test("1. Server-side price list (never from the browser)", () => {
    const s = L.parseBillingSettings([
      { key: "plan_creator_price_xaf", value: 5000 },
      { key: "plan_agency_price_xaf", value: 50000 },
      { key: "plan_agency_daily_scripts", value: 150 },
      { key: "pro_days", value: 30 },
      { key: "free_scripts_per_day", value: 1 },
      { key: "daily_script_limit", value: 20 },
    ]);
    assert.deepEqual(L.priceFor("creator_month", s), { product: "creator_month", plan: "creator", amount: 5000, days: 30 });
    assert.deepEqual(L.priceFor("agency_month", s), { product: "agency_month", plan: "agency", amount: 50000, days: 30 });
    for (const bad of ["pro_pass", "agency_month_cheap", { amount: 1 }, null, "__proto__", "toString"]) {
      assert.equal(L.priceFor(bad, s), null, `refuse ${JSON.stringify(bad)}`);
    }
    // Defaults: 5,000 and 50,000 XAF, never below Fapshi's 100 XAF minimum
    const d = L.parseBillingSettings([{ key: "plan_creator_price_xaf", value: 5 }, { key: "pro_days", value: "abc" }]);
    assert.equal(d.creatorPriceXaf, 5000);
    assert.equal(d.agencyPriceXaf, 50000);
    assert.equal(d.planDays, 30);
    assert.equal(d.freeScriptsPerDay, 1);
  });

  await t.test("1b. Agency & Academy always gives more than Creator", () => {
    for (const rows of [
      [],
      [{ key: "daily_script_limit", value: 20 }, { key: "plan_agency_daily_scripts", value: 150 }],
      [{ key: "daily_script_limit", value: 40 }, { key: "plan_agency_daily_scripts", value: 10 }], // misconfigured
      [{ key: "daily_script_limit", value: 40 }, { key: "plan_agency_daily_scripts", value: 40 }], // equal
    ]) {
      const [creator, agency] = L.planCatalog(L.parseBillingSettings(rows));
      assert.equal(creator.id, "creator");
      assert.equal(agency.id, "agency");
      assert.ok(agency.amount > creator.amount, "agency costs more");
      assert.ok(agency.scriptsPerDay === 0 || agency.scriptsPerDay > creator.scriptsPerDay, `agency scripts ${agency.scriptsPerDay} > creator ${creator.scriptsPerDay}`);
      assert.ok(agency.soundsPerHour > creator.soundsPerHour, "agency gets more sounds");
      assert.ok(agency.features.length >= creator.features.length);
    }
    const plain = L.planCatalog(L.parseBillingSettings([]));
    assert.match(plain[0].features[0], /20 scripts a day/);
    assert.match(plain[1].features[0], /150 scripts a day/);
  });

  await t.test("1c. Active plan from subscription dates (Agency wins while both are active)", () => {
    const now = new Date("2026-11-25T10:00:00Z");
    const future = "2026-12-20T00:00:00Z", past = "2026-11-01T00:00:00Z";
    assert.deepEqual(L.activePlan(null, now), { plan: "free", until: null });
    assert.deepEqual(L.activePlan({ pro_until: past }, now), { plan: "free", until: null });
    assert.deepEqual(L.activePlan({ pro_until: future }, now), { plan: "creator", until: future });
    assert.deepEqual(L.activePlan({ pro_until: future, agency_until: future }, now), { plan: "agency", until: future });
    assert.deepEqual(L.activePlan({ pro_until: future, agency_until: past }, now), { plan: "creator", until: future });
  });

  await t.test("2. Free plan: 1 script per rolling 24 hours, unlock time = last script + 24h", () => {
    const now = new Date("2026-11-25T10:00:00Z");
    assert.deepEqual(L.freeAllowance([], 1, now), { limit: 1, used: 0, remaining: 1, nextAt: null });
    const used = L.freeAllowance(["2026-11-25T08:30:00Z"], 1, now);
    assert.equal(used.remaining, 0);
    assert.equal(used.nextAt, "2026-11-26T08:30:00.000Z");
    // A script from 25 hours ago no longer counts
    assert.equal(L.freeAllowance(["2026-11-24T09:00:00Z"], 1, now).remaining, 1);
    // With 2 per day, the slot frees 24h after the older of the two
    const two = L.freeAllowance(["2026-11-25T09:00:00Z", "2026-11-25T07:00:00Z"], 2, now);
    assert.equal(two.nextAt, "2026-11-26T07:00:00.000Z");
  });

  await t.test("3. Webhook/status: SUCCESSFUL with the right amount grants Pro once", async () => {
    const db = fakeDb(basePayment);
    const r = await L.reconcilePayment(db.state.payment, db.deps({ status: "SUCCESSFUL", amount: 1000, medium: "mobile money" }));
    assert.deepEqual(r, { status: "successful", outcome: "granted" });
    assert.equal(db.state.grants, 1);
  });

  await t.test("4. Duplicate webhook / reload of the return page never grants twice", async () => {
    const db = fakeDb(basePayment);
    const deps = db.deps({ status: "SUCCESSFUL", amount: 1000 });
    await L.reconcilePayment({ ...basePayment }, deps); // first call (stale copy of the row)
    const again = await L.reconcilePayment({ ...basePayment }, deps); // second call with the same stale row
    assert.equal(again.status, "successful");
    assert.equal(again.outcome, "already_granted");
    const third = await L.reconcilePayment(db.state.payment, deps); // fresh row: skipped before calling Fapshi
    assert.equal(third.outcome, "already_granted");
    assert.equal(db.state.grants, 1, "Pro must be granted exactly once");
  });

  await t.test("5. Amount mismatch is refused", async () => {
    const db = fakeDb(basePayment);
    const r = await L.reconcilePayment(db.state.payment, db.deps({ status: "SUCCESSFUL", amount: 100 }));
    assert.deepEqual(r, { status: "failed", outcome: "amount_mismatch" });
    assert.equal(db.state.grants, 0);
    assert.equal(db.state.updates.at(-1).provider_status, "AMOUNT_MISMATCH");
  });

  await t.test("6. FAILED / EXPIRED are recorded, never granted", async () => {
    for (const [fapshi, mine] of [["FAILED", "failed"], ["EXPIRED", "expired"]]) {
      const db = fakeDb(basePayment);
      const r = await L.reconcilePayment(db.state.payment, db.deps({ status: fapshi, amount: 1000 }));
      assert.equal(r.status, mine);
      assert.equal(db.state.grants, 0);
    }
  });

  await t.test("7. CREATED / PENDING stay pending", async () => {
    const db = fakeDb(basePayment);
    const r = await L.reconcilePayment(db.state.payment, db.deps({ status: "PENDING", amount: 1000 }));
    assert.deepEqual(r, { status: "pending", outcome: "still_pending" });
    assert.equal(db.state.grants, 0);
  });

  await t.test("8. Unknown / mismatched transaction is not granted", async () => {
    const db = fakeDb(basePayment);
    const r = await L.reconcilePayment(db.state.payment, {
      ...db.deps({}),
      fetchStatus: async () => ({ transId: "SOMEONE_ELSES", status: "SUCCESSFUL", amount: 1000 }),
    });
    assert.equal(r.outcome, "trans_mismatch");
    assert.equal(db.state.grants, 0);
    // No Fapshi transaction yet (initiate-pay failed): nothing to check
    const none = await L.reconcilePayment({ ...basePayment, fapshi_trans_id: null }, db.deps({}));
    assert.equal(none.outcome, "no_transaction");
  });

  await t.test("9. Fapshi unreachable: error surfaces, nothing granted", async () => {
    const db = fakeDb(basePayment);
    await assert.rejects(L.reconcilePayment(db.state.payment, db.deps(new Error("Could not reach Fapshi"))));
    assert.equal(db.state.grants, 0);
  });

  await t.test("10. Helpers: ids, constant-time secret compare, test mode", () => {
    assert.ok(L.isFapshiId("abc-DEF_123"));
    assert.ok(!L.isFapshiId("../etc"));
    assert.ok(!L.isFapshiId("a".repeat(101)));
    assert.ok(L.isUuid("3f2b6c1e-8a4d-4b1e-9c2a-1d2e3f4a5b6c"));
    assert.ok(!L.isUuid("1 or 1=1"));
    assert.ok(L.safeEqual("s3cret", "s3cret"));
    assert.ok(!L.safeEqual("s3cret", "s3creT"));
    assert.ok(!L.safeEqual("s3cret", "s3cret-longer"));
    assert.ok(L.detectTestMode("FAK_TEST_x", "https://live.fapshi.com"));
    assert.ok(L.detectTestMode("FAK_x", "https://sandbox.fapshi.com"));
    assert.ok(!L.detectTestMode("FAK_x", "https://live.fapshi.com"));
  });

  await t.test("11. Routes: auth, server prices, verified webhook, owner-only status", () => {
    const checkout = fs.readFileSync("src/app/api/payments/checkout/route.ts", "utf8");
    assert.match(checkout, /requireRole\("user"\)/);
    assert.match(checkout, /priceFor\(body\?\.product, settings\)/, "price must come from the server list");
    assert.doesNotMatch(checkout, /body\??\.amount/, "never read an amount from the browser");
    assert.match(checkout, /\/billing\/return\?ref=\$\{externalId\}/);

    const webhook = fs.readFileSync("src/app/api/payments/webhook/route.ts", "utf8");
    assert.match(webhook, /x-wh-secret/);
    assert.match(webhook, /safeEqual\(/);
    assert.match(webhook, /reconcileWithFapshi\(/, "webhook must re-check with Fapshi, not trust the body");
    assert.doesNotMatch(webhook, /body\.status/, "webhook must not use the body's status");

    const status = fs.readFileSync("src/app/api/payments/status/route.ts", "utf8");
    assert.match(status, /requireRole\("user"\)/);
    assert.match(status, /\.eq\("user_id", gate\.account\.userId\)/, "users only see their own payments");
    assert.match(status, /MIN_CHECK_INTERVAL_MS = 10_000/, "respect Fapshi's 6 requests/min limit");

    const gen = fs.readFileSync("src/app/api/scripts/generate/route.ts", "utf8");
    assert.match(gen, /getAllowance\(/);
    assert.match(gen, /status: 429/);
  });

  await t.test("12. Secrets stay on the server and out of git", () => {
    for (const f of ["src/lib/payments/fapshi.ts", "src/lib/payments/server.ts", "src/lib/supabase/service.ts"]) {
      assert.match(fs.readFileSync(f, "utf8"), /^import "server-only";/, `${f} must be server-only`);
    }
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]));
    for (const f of walk("src")) {
      const src = fs.readFileSync(f, "utf8");
      assert.doesNotMatch(src, /NEXT_PUBLIC_FAPSHI|NEXT_PUBLIC_SUPABASE_SERVICE/, `${f}: payment secrets must never be NEXT_PUBLIC_`);
      assert.doesNotMatch(src, /FAK_TEST_[A-Za-z0-9]{8,}|FAK_[0-9a-f]{12,}/, `${f}: no Fapshi key in code`);
      if (/^\s*["']use client["']/.test(src)) {
        assert.doesNotMatch(src, /process\.env\.FAPSHI_|SUPABASE_SERVICE_ROLE_KEY|lib\/payments\/(fapshi|server)|supabase\/service/, `${f}: client code must not touch payment secrets`);
      }
    }
    const example = fs.readFileSync(".env.example", "utf8");
    assert.match(example, /^FAPSHI_API_USER=$/m);
    assert.match(example, /^FAPSHI_API_KEY=$/m);
  });

  await t.test("14. Migration 6: two plans, agency end date, grant per product", () => {
    const sql = fs.readFileSync("supabase/migrations/20261129000001_creator_agency_plans.sql", "utf8");
    assert.match(sql, /product in \('pro_pass', 'creator_month', 'agency_month'\)/);
    assert.match(sql, /add column if not exists agency_until timestamptz/);
    assert.match(sql, /is_agency := \(p\.product = 'agency_month'\)/);
    assert.match(sql, /if p\.granted_at is not null then\s+return 'already_granted'/);
    assert.match(sql, /grant execute on function public\.grant_pro_for_payment[^;]*to service_role;/);
    assert.match(sql, /'plan_creator_price_xaf', '5000'/);
    assert.match(sql, /'plan_agency_price_xaf', '50000'/);
  });

  await t.test("13. Migration: RLS on, no browser writes, grant only for the service role", () => {
    const sql = fs.readFileSync("supabase/migrations/20261128000001_payments_subscriptions.sql", "utf8");
    assert.match(sql, /alter table public\.payments enable row level security/);
    assert.match(sql, /alter table public\.subscriptions enable row level security/);
    assert.match(sql, /grant select on public\.payments to authenticated;/);
    assert.doesNotMatch(sql, /grant (insert|update|delete)[^;]*on public\.(payments|subscriptions) to authenticated/);
    assert.match(sql, /for update;/, "grant must lock the payment row");
    assert.match(sql, /if p\.granted_at is not null then\s+return 'already_granted'/);
    assert.match(sql, /grant execute on function public\.grant_pro_for_payment[^;]*to service_role;/);
    assert.match(sql, /external_id text not null unique/);
    assert.match(sql, /fapshi_trans_id text unique/);
  });
});
