import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const { safeRedirectPath, DEFAULT_AFTER_LOGIN } = await import("../src/lib/auth/redirect.ts");

test("Post-login redirect and signed-in guard", async (t) => {
  await t.test("1. Destination validation blocks open redirects", () => {
    assert.equal(DEFAULT_AFTER_LOGIN, "/niches");
    assert.equal(safeRedirectPath("/creators?niche=tech-news"), "/creators?niche=tech-news");
    assert.equal(safeRedirectPath("/profile?tab=notifications"), "/profile?tab=notifications");
    for (const bad of ["//evil.com", "https://evil.com", "javascript:alert(1)", "/\\evil.com", "evil.com", "", null, undefined, "/x\nSet-Cookie: a=b"]) {
      assert.equal(safeRedirectPath(bad), "/niches", `must reject ${JSON.stringify(bad)}`);
    }
    // Never back to the auth pages (would loop)
    assert.equal(safeRedirectPath("/signin"), "/niches");
    assert.equal(safeRedirectPath("/signup?x=1"), "/niches");
    assert.equal(safeRedirectPath("/signing-tips"), "/signing-tips");
  });

  await t.test("2. Sign-in leaves with a full page load and keeps the spinner", () => {
    const src = fs.readFileSync("src/app/(auth)/signin/page.tsx", "utf8");
    assert.match(src, /window\.location\.replace\(redirectPath\)/, "Successful login must do a full navigation (stale router cache)");
    assert.doesNotMatch(src, /router\.push\(redirectPath\)/, "router.push can reuse a cached redirect back to /signin");
    assert.match(src, /safeRedirectPath\(searchParams\.get\("next"\) \|\| searchParams\.get\("redirect"\)\)/);
  });

  await t.test("3. No shared fallback account behind the social buttons", () => {
    for (const file of ["src/app/(auth)/signin/page.tsx", "src/components/auth/SignUpForm.tsx"]) {
      const src = fs.readFileSync(file, "utf8");
      assert.doesNotMatch(src, /creator@creatorlab\.com|CreatorLab_\$\{provider\}/, `${file} must not sign people into a shared account`);
      assert.match(src, /redirectTo: `\$\{window\.location\.origin\}\/auth\/callback/, `${file} OAuth must return to this site's /auth/callback`);
    }
  });

  await t.test("4. Middleware sends signed-in users away from /signin and /signup", () => {
    const mw = fs.readFileSync("src/middleware.ts", "utf8");
    assert.match(mw, /path === "\/signin" \|\| path === "\/signup"/);
    assert.match(mw, /safeRedirectPath\(params\.get\("next"\) \|\| params\.get\("redirect"\)\)/);
    assert.match(mw, /url\.searchParams\.set\("redirect", path \+ request\.nextUrl\.search\)/, "Protected pages must remember the full destination, query included");
    const cb = fs.readFileSync("src/app/(auth)/callback/route.ts", "utf8");
    assert.match(cb, /exchangeCodeForSession\(code\)/);
    assert.match(cb, /safeRedirectPath\(/);
    assert.ok(fs.existsSync("src/app/auth/callback/route.ts"), "/auth/callback must exist (used by email links and OAuth)");
  });

  await t.test("5. Sign-out reloads to the sign-in page", () => {
    const header = fs.readFileSync("src/components/layout/Header.tsx", "utf8");
    assert.match(header, /signOut\(\);[\s\S]{0,200}window\.location\.replace\("\/signin"\)/);
  });
});
