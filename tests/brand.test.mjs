import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]));

test("Brand: one logo source used everywhere", async (t) => {
  await t.test("1. One component, no old logo or hand-made CL badge left", () => {
    assert.ok(fs.existsSync("src/components/brand/Logo.tsx"));
    assert.ok(!fs.existsSync("src/components/ui/Logo.tsx"), "old logo component must be gone");
    for (const f of walk("src").filter((f) => /\.(tsx?|css)$/.test(f))) {
      const src = fs.readFileSync(f, "utf8");
      assert.doesNotMatch(src, /components\/ui\/Logo|LogoIcon\b/, `${f} uses the old logo`);
      assert.doesNotMatch(src, />C<span className="text-accent">L</, `${f} has a hand-made CL badge`);
    }
  });

  await t.test("2. Header, footer, auth, error and status pages use the brand component", () => {
    const uses = {
      "src/components/layout/Header.tsx": /<Logo /,
      "src/components/layout/Footer.tsx": /<Logo /,
      "src/app/(auth)/signin/page.tsx": /<Logo /,
      "src/components/auth/SignUpForm.tsx": /<Logo /,
      "src/app/not-found.tsx": /<LogoBadge /,
      "src/app/error.tsx": /<LogoBadge /,
      "src/app/global-error.tsx": /<Logo /,
      "src/app/(hidden)/admin/page.tsx": /<LogoMark /,
      "src/app/(main)/billing/return/page.tsx": /<Logo /,
    };
    for (const [f, re] of Object.entries(uses)) assert.match(fs.readFileSync(f, "utf8"), re, f);
  });

  await t.test("3. Static assets, icons and metadata exist", () => {
    for (const f of [
      "public/brand/logo-mark.svg", "public/brand/logo-mark-black.svg", "public/brand/logo-mark-white.svg", "public/brand/logo-full.svg",
      "public/brand/app-icon.svg", "public/brand/logo-mark-192.png", "public/brand/logo-mark-512.png", "public/brand/logo-mark-1024.png",
      "public/brand/app-icon-180.png", "public/brand/app-icon-192.png", "public/brand/app-icon-512.png", "public/brand/email-logo.png",
      "public/brand/google-oauth-logo-120.png", "public/brand/google-oauth-logo-512.png", "public/brand/favicon.ico",
      "src/app/icon.svg", "src/app/favicon.ico", "src/app/apple-icon.png", "src/app/opengraph-image.png", "src/app/twitter-image.png", "src/app/manifest.ts",
    ]) assert.ok(fs.existsSync(f), `missing ${f}`);
    const svg = fs.readFileSync("public/brand/logo-mark.svg", "utf8");
    assert.match(svg, /#18181B/i);
    assert.match(svg, /#2563EB/i);
    assert.doesNotMatch(svg, /<image|base64/, "SVG must be clean paths, no raster embeds");
    assert.match(fs.readFileSync("src/app/layout.tsx", "utf8"), /metadataBase/);
  });
});
