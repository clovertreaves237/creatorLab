import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("CreatorLab System Features: Landing Page & Requirements FR-1, FR-2, FR-3", async (t) => {
  // Test 1: Landing Page Structure & Sandcastles Visual Fidelity
  await t.test("1. Landing Page Structure, Graphics & Palette Alignment", () => {
    const landingSource = fs.readFileSync("src/app/page.tsx", "utf8");
    const mockupSource = fs.readFileSync("src/components/landing/LandingVisualMockup.tsx", "utf8");

    // Check Sandcastles-inspired headline & gradient
    assert.match(landingSource, /Create viral/, "Hero headline must feature 'Create viral'");
    assert.match(landingSource, /short-form videos/, "Hero headline must feature 'short-form videos'");
    assert.match(landingSource, /hl-sky">short-form videos/, "Headline uses the sketchbook highlighter mark (no gradient text)");
    assert.doesNotMatch(landingSource, /bg-clip-text|bg-gradient-/, "Landing page must not use gradient text or gradient fills");

    // Check 3-Step Graphics from screenshots/immediately after auth.png
    assert.match(mockupSource, /Explore feed/, "Mockup tab 1 must be 'Explore feed'");
    assert.match(mockupSource, /Review ideas/, "Mockup tab 2 must be 'Review ideas'");
    assert.match(mockupSource, /Create script/, "Mockup tab 3 must be 'Create script'");
    assert.match(mockupSource, /10\.4x Outlier/, "Outlier score in Signal Lime must be present");
  });

  // Test 2: Visitor Action Gate (Unregistered users cannot take action)
  await t.test("2. Visitor Action Gate (SRS Section 2.2 & Middleware)", () => {
    const landingSource = fs.readFileSync("src/app/page.tsx", "utf8");
    const gateModalSource = fs.readFileSync("src/components/landing/AuthGateModal.tsx", "utf8");
    const middlewareSource = fs.readFileSync("src/middleware.ts", "utf8");

    // Landing page interactive gate
    assert.match(landingSource, /triggerAuthGate/, "Landing page must bind actions to triggerAuthGate");
    assert.match(gateModalSource, /Account Required/, "AuthGateModal must alert that account is required");
    assert.match(gateModalSource, /Unregistered visitors cannot browse/, "Visitor restriction explanation must be present");

    // Middleware route protection for protected paths
    assert.match(middlewareSource, /path\.startsWith\("\/niches"\)/, "Middleware must protect /niches");
    assert.match(middlewareSource, /path\.startsWith\("\/creators"\)/, "Middleware must protect /creators");
    assert.match(middlewareSource, /path\.startsWith\("\/script-generator"\)/, "Middleware must protect /script-generator");
    assert.match(middlewareSource, /url\.pathname = "\/signin"/, "Middleware must redirect unauthenticated visitors to /signin");
  });

  // Test 3: FR-1 - Account Creation with Email and Password
  await t.test("3. FR-1: Account Creation with Email & Password", () => {
    const signUpFormSource = fs.readFileSync("src/components/auth/SignUpForm.tsx", "utf8");
    const supabaseClientSource = fs.readFileSync("src/lib/supabase/client.ts", "utf8");
    const dbMigrationSource = fs.readFileSync("supabase/migrations/20261123000001_init_schema_and_auth.sql", "utf8");

    // Form inputs and validation
    assert.match(signUpFormSource, /first_name/, "Must capture first name");
    assert.match(signUpFormSource, /last_name/, "Must capture last name");
    assert.match(signUpFormSource, /email/, "Must capture email");
    assert.match(signUpFormSource, /password/, "Must capture password");
    assert.match(signUpFormSource, /password\.length < 8/, "Must validate min 8 chars password");

    // Supabase Auth integration & Profiles trigger
    assert.match(signUpFormSource, /supabase\.auth\.signUp/, "Must call Supabase auth.signUp");
    assert.match(dbMigrationSource, /create table if not exists public\.profiles/, "public.profiles table must exist in schema");
    assert.match(dbMigrationSource, /create or replace trigger on_auth_user_created/, "Auth trigger on_auth_user_created must exist");
  });

  // Test 4: FR-2 - Email Verification Gate
  await t.test("4. FR-2: Email Verification Gate & Unverified Block", () => {
    const verifyPageSource = fs.readFileSync("src/app/(auth)/verify-email/page.tsx", "utf8");
    const middlewareSource = fs.readFileSync("src/middleware.ts", "utf8");
    const clientSource = fs.readFileSync("src/lib/supabase/client.ts", "utf8");

    // Unverified account handling
    assert.match(verifyPageSource, /Check your email/, "Verify page must instruct user to check email");
    assert.match(verifyPageSource, /Requirement FR-2 Gate/, "Must cite FR-2 verification gate");
    assert.match(middlewareSource, /!user\.email_confirmed_at/, "Middleware must check if email is confirmed");
    assert.match(middlewareSource, /url\.pathname = "\/verify-email"/, "Middleware must redirect unverified user to /verify-email");
    assert.match(clientSource, /Email not confirmed/, "Auth client must reject login when email is unconfirmed");
  });

  // Test 5: FR-3 - Sign in with Google (Supabase Auth)
  await t.test("5. FR-3: Google OAuth Sign-in & Callback Exchange", () => {
    const signUpFormSource = fs.readFileSync("src/components/auth/SignUpForm.tsx", "utf8");
    const signInPageSource = fs.readFileSync("src/app/(auth)/signin/page.tsx", "utf8");
    const callbackRouteSource = fs.readFileSync("src/app/(auth)/callback/route.ts", "utf8");

    // Google OAuth button in SignUp & SignIn
    assert.match(signUpFormSource, /handleSocialSignIn\("google"\)/, "SignUp must trigger Google OAuth");
    assert.match(signInPageSource, /handleSocialSignIn\("google"\)/, "SignIn must trigger Google OAuth");
    assert.match(signInPageSource, /Continue with Google/, "Button label must be 'Continue with Google'");

    // Callback code exchange
    assert.match(callbackRouteSource, /supabase\.auth\.exchangeCodeForSession\(code\)/, "Callback route must exchange auth code for session token");
  });

  // Test 6: FR-55 - Transparency Disclosure & Cameroon Law No. 2024/017
  await t.test("6. FR-55: Data Transparency Disclosure (Cameroon Law No. 2024/017)", () => {
    const modalSource = fs.readFileSync("src/components/auth/DataNoticeModal.tsx", "utf8");

    assert.match(modalSource, /Cameroon Law No\. 2024\/017/, "Must cite Cameroon Law No. 2024/017");
    assert.match(modalSource, /Zero Storage of Research Notes/, "Must explicitly guarantee zero note storage (FR-33)");
    assert.match(modalSource, /Right to Complete Deletion/, "Must cite 90-day deletion right (FR-5)");
  });
});
