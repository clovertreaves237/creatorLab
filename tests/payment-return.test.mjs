import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const U = await import("../src/lib/site-url.ts");
const headers = (h) => ({ get: (k) => h[k.toLowerCase()] ?? null });

test("After paying, users come back to the live app and the plan unlocks", async (t) => {
  await t.test("1. The live bug: NEXT_PUBLIC_APP_URL=localhost on Vercel is never used", () => {
    const env = { VERCEL: "1", NEXT_PUBLIC_APP_URL: "http://localhost:3002", VERCEL_PROJECT_PRODUCTION_URL: "creator-lab-beta.vercel.app" };
    assert.equal(U.siteUrl(env), "https://creator-lab-beta.vercel.app");
    // Return address for Fapshi comes from the real request host
    const req = headers({ "x-forwarded-host": "creator-lab-beta.vercel.app", "x-forwarded-proto": "https", host: "localhost:3000" });
    assert.equal(U.requestBaseUrl(req, "http://localhost:3000", env), "https://creator-lab-beta.vercel.app");
  });

  await t.test("2. Site address fallbacks", () => {
    assert.equal(U.siteUrl({ VERCEL: "1", NEXT_PUBLIC_APP_URL: "https://creatorlab.cm/" }), "https://creatorlab.cm");
    assert.equal(U.siteUrl({ VERCEL: "1", VERCEL_URL: "creator-lab-abc.vercel.app" }), "https://creator-lab-abc.vercel.app");
    assert.equal(U.siteUrl({ VERCEL: "1" }), U.PRODUCTION_URL);
    assert.equal(U.siteUrl({ VERCEL: "1", NEXT_PUBLIC_APP_URL: "http://127.0.0.1:3000" }), U.PRODUCTION_URL);
    assert.equal(U.siteUrl({ VERCEL: "1", NEXT_PUBLIC_APP_URL: "not a url" }), U.PRODUCTION_URL);
    // Local development keeps localhost
    assert.equal(U.siteUrl({ NEXT_PUBLIC_APP_URL: "http://localhost:3001" }), "http://localhost:3001");
    assert.equal(U.siteUrl({}), "http://localhost:3000");
  });

  await t.test("3. Request address: same site the user is on, never localhost on Vercel", () => {
    const vercel = { VERCEL: "1", VERCEL_PROJECT_PRODUCTION_URL: "creator-lab-beta.vercel.app" };
    assert.equal(U.requestBaseUrl(headers({ "x-forwarded-host": "creator-lab-beta.vercel.app" }), "", vercel), "https://creator-lab-beta.vercel.app");
    assert.equal(U.requestBaseUrl(headers({ host: "localhost:3000" }), "http://localhost:3000", vercel), "https://creator-lab-beta.vercel.app");
    assert.equal(U.requestBaseUrl(headers({ "x-forwarded-host": "evil.com/x" }), "https://creator-lab-beta.vercel.app", vercel), "https://creator-lab-beta.vercel.app");
    // Local testing returns to the local server
    assert.equal(U.requestBaseUrl(headers({ host: "localhost:3001" }), "http://localhost:3001", {}), "http://localhost:3001");
  });

  await t.test("4. Checkout, billing, generation and the return page are wired to finish payments", () => {
    const checkout = fs.readFileSync("src/app/api/payments/checkout/route.ts", "utf8");
    assert.match(checkout, /requestBaseUrl\(request\.headers, request\.nextUrl\.origin\)/);
    assert.doesNotMatch(checkout, /process\.env\.NEXT_PUBLIC_APP_URL/, "checkout must not trust the env URL");

    const billing = fs.readFileSync("src/app/api/billing/route.ts", "utf8");
    assert.match(billing, /await settlePendingPayments\(gate\.account\.userId\);\s+const allowance = await getAllowance/);

    const gen = fs.readFileSync("src/app/api/scripts/generate/route.ts", "utf8");
    assert.match(gen, /settlePendingPayments\(gate\.account\.userId\)/);

    const ret = fs.readFileSync("src/app/(main)/billing/return/page.tsx", "utf8");
    assert.match(ret, /window\.location\.replace\("\/script-generator\?upgraded=1"\)/, "success sends the user back into the app");

    const server = fs.readFileSync("src/lib/payments/server.ts", "utf8");
    assert.match(server, /export async function settlePendingPayments/);
    assert.match(server, /\.eq\("status", "pending"\)/);
    assert.match(server, /Date\.now\(\) - last < 10_000/, "respect Fapshi's status rate limit");

    for (const f of ["src/lib/email/send.ts", "src/app/layout.tsx"]) {
      assert.match(fs.readFileSync(f, "utf8"), /siteUrl\(\)/, `${f} uses the safe site URL`);
    }
  });
});
