import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const A = await import("../src/lib/auth/admin-path.ts");
const DUMMY = "test-admin-path"; // never a real path

const admin = { signedIn: true, emailConfirmed: true, role: "admin" };
const decide = (pathname, rawPath, who) => A.adminPortalDecision({ pathname, rawPath, ...who });

test("Admin portal (secret path + role check)", async (t) => {
  await t.test("1. Admin on the matching path gets the portal", () => {
    assert.deepEqual(decide(`/${DUMMY}`, DUMMY, admin), { kind: "rewrite", to: "/admin" });
    assert.deepEqual(decide(`/${DUMMY}/users`, DUMMY, admin), { kind: "rewrite", to: "/admin/users" });
    assert.deepEqual(decide(`/${DUMMY}`, DUMMY, { ...admin, role: "super_admin" }), { kind: "rewrite", to: "/admin" });
  });

  await t.test("2. Non-admins on the matching path get a plain 404", () => {
    for (const role of ["user", "curator", null, undefined, "ADMIN"]) {
      assert.deepEqual(decide(`/${DUMMY}`, DUMMY, { signedIn: true, emailConfirmed: true, role }), { kind: "not-found" }, String(role));
    }
    // Admin role but unconfirmed email: still 404
    assert.deepEqual(decide(`/${DUMMY}`, DUMMY, { ...admin, emailConfirmed: false }), { kind: "not-found" });
  });

  await t.test("3. Logged out on the matching path gets a plain 404", () => {
    assert.deepEqual(decide(`/${DUMMY}`, DUMMY, { signedIn: false, emailConfirmed: false, role: null }), { kind: "not-found" });
  });

  await t.test("4. Other paths are untouched (normal routing / normal 404)", () => {
    for (const p of ["/", "/niches", `/${DUMMY}x`, `/x${DUMMY}`, "/test-admin", `/${DUMMY.toUpperCase()}`, "/admin"]) {
      assert.deepEqual(decide(p, DUMMY, admin), { kind: "not-admin-path" }, p);
    }
  });

  await t.test("5. Unset / empty / too short variable disables the portal", () => {
    for (const raw of [undefined, null, "", "   ", "/", "//", "short"]) {
      assert.equal(A.normalizeAdminPath(raw), "", JSON.stringify(raw));
      assert.deepEqual(decide(`/${DUMMY}`, raw, admin), { kind: "not-admin-path" });
      assert.equal(A.adminPathHref(raw), "");
    }
  });

  await t.test("6. Normalization of the configured value and of the URL", () => {
    for (const raw of [DUMMY, `/${DUMMY}`, `${DUMMY}/`, `/${DUMMY}/`, `  ${DUMMY}  `, `${DUMMY}\n`, `\t/${DUMMY}/\r\n`]) {
      assert.equal(A.normalizeAdminPath(raw), DUMMY, JSON.stringify(raw));
      assert.deepEqual(decide(`/${DUMMY}`, raw, admin), { kind: "rewrite", to: "/admin" });
    }
    // Trailing slash on the URL is ignored; the URL is decoded; matching is case-sensitive
    assert.deepEqual(decide(`/${DUMMY}/`, DUMMY, admin), { kind: "rewrite", to: "/admin" });
    assert.deepEqual(decide(`/test%2Dadmin%2Dpath`, DUMMY, admin), { kind: "rewrite", to: "/admin" });
    assert.deepEqual(decide(`/Test-Admin-Path`, DUMMY, admin), { kind: "not-admin-path" });
    assert.deepEqual(decide(`/%E0%A4%A`, DUMMY, admin), { kind: "not-admin-path" }, "malformed encoding never matches");
    // Unsafe values are refused
    assert.equal(A.normalizeAdminPath("has space inside"), "");
    assert.equal(A.normalizeAdminPath("../../etc/passwd"), "");
    assert.equal(A.adminPathHref(` /${DUMMY}/ `), `/${DUMMY}`);
  });

  await t.test("7. Middleware: runtime env, plain 404, /admin hidden, no secret in logs", () => {
    const mw = fs.readFileSync("src/middleware.ts", "utf8");
    assert.match(mw, /process\.env\.ADMIN_PORTAL_PATH/, "read at request time");
    assert.match(mw, /adminPortalDecision\(/);
    assert.match(mw, /if \(decision\.kind !== "rewrite"\) return notFound\(\);/);
    assert.match(mw, /path === "\/admin" \|\| path\.startsWith\("\/admin\/"\)/, "/admin itself stays hidden");
    assert.match(mw, /supabase\.auth\.getUser\(\)/);
    // Diagnostic lines log booleans/length only
    const logs = mw.match(/console\.(info|log|warn)\([\s\S]*?\);/g) || [];
    for (const l of logs) assert.doesNotMatch(l, /rawAdminPath\}|\$\{raw\}|\$\{clean\}|\$\{path\}|email\}/, `log must not print secrets: ${l.slice(0, 80)}`);
    const cfg = fs.readFileSync("next.config.ts", "utf8");
    assert.doesNotMatch(cfg, /rewrites|ADMIN_PORTAL_PATH/, "no build-time admin rewrites");
  });

  await t.test("8. Every admin API re-checks the role on the server", () => {
    const dir = "src/app/api/admin";
    for (const name of fs.readdirSync(dir)) {
      const src = fs.readFileSync(`${dir}/${name}/route.ts`, "utf8");
      const handlers = (src.match(/export async function (GET|POST|PATCH|PUT|DELETE)/g) || []).length;
      const checks = (src.match(/requireRole\("(admin|super_admin)"\)/g) || []).length;
      assert.ok(handlers > 0 && checks >= handlers, `${name}: ${checks} role checks for ${handlers} handlers`);
    }
  });

  await t.test("9. 404 page offers sign-in that returns to the same address (relative, validated)", () => {
    const nf = fs.readFileSync("src/app/not-found.tsx", "utf8");
    assert.match(nf, /<SignInBackLink \/>/);
    const link = fs.readFileSync("src/components/layout/SignInBackLink.tsx", "utf8");
    assert.match(link, /startsWith\("\/"\) && !here\.startsWith\("\/\/"\)/);
  });
});
