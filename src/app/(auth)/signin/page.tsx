"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { safeRedirectPath } from "@/lib/auth/redirect";
import { Logo } from "@/components/ui/Logo";
import { Eye, EyeOff, Loader2, ShieldCheck, PenLine, ArrowRight, ShieldAlert } from "lucide-react";

/**
 * User sign-in with Google, GitHub, Apple or credentials
 * Styled with Obsidian Void & Carbon Glass matching high-end design
 */
function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Only redirect inside CreatorLab ("/path"), never to another site ("https://…" or "//host")
  const redirectPath = safeRedirectPath(searchParams.get("next") || searchParams.get("redirect"));
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    let leaving = false;

    // Everyone, including staff, signs in the same way. Roles come from the database,
    // and admins open the admin portal from their account menu.
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          router.push(`/verify-email?email=${encodeURIComponent(cleanEmail)}`);
          return;
        }
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        // Full page load, not router.push: the client router may still hold the "/niches -> /signin"
        // redirect it prefetched while signed out. A fresh request carries the new session cookies through
        // the middleware, and replace() keeps the sign-in page out of the Back history.
        leaving = true;
        window.location.replace(redirectPath);
        return;
      }
      setErrorMessage("Sign-in did not complete. Please try again.");
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to sign in.");
    } finally {
      if (!leaving) setLoading(false); // keep the button spinner while the next page loads
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github" | "apple") => {
    setSocialLoading(provider);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}`,
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
    } catch (err: unknown) {
      console.warn(`${provider} sign-in failed:`, err);
      const name = provider.charAt(0).toUpperCase() + provider.slice(1);
      setErrorMessage(`${name} sign-in is not available right now. Please use your email and password.`);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="w-full max-w-[440px] rounded-2xl bg-white border-2 border-ink p-8 sm:p-9 text-left relative overflow-hidden">
      {/* Studio lighting top gradient accent */}

      <div className="flex flex-col items-center text-center mb-8">
        <Logo size="lg" brandName="CreatorLab" className="mb-4" />
        <h1 className="text-2xl sm:text-[26px] font-bold text-ink tracking-tight">
          Welcome back
        </h1>
        <p className="text-xs text-pencil mt-1.5 font-normal">
          Log in to access your curated creators and script studio
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink placeholder-pencil-light/50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-ink">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-accent hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-ink text-ink placeholder-pencil-light/50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pencil hover:text-ink transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-accent" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 rounded-xl btn-primary-kinetic text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ink" />
        </div>
        <span className="relative px-3 bg-white text-[11px] font-semibold uppercase tracking-widest text-pencil">
          OR
        </span>
      </div>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={!!socialLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-ink hover:border-line hover:bg-paper-deep text-ink text-xs font-semibold transition-all flex items-center justify-center gap-2.5"
        >
          {socialLoading === "google" ? (
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={!!socialLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-ink hover:border-line hover:bg-paper-deep text-ink text-xs font-semibold transition-all flex items-center justify-center gap-2.5"
        >
          {socialLoading === "github" ? (
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
          ) : (
            <>
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("apple")}
          disabled={!!socialLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-ink hover:border-line hover:bg-paper-deep text-ink text-xs font-semibold transition-all flex items-center justify-center gap-2.5"
        >
          {socialLoading === "apple" ? (
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
          ) : (
            <>
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.84.94-2.91-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.95 2.81 1.02.08 2.05-.51 2.68-1.27z" />
              </svg>
              <span>Continue with Apple</span>
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-pencil mt-7">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-accent hover:text-accent font-semibold transition-colors"
        >
          Sign up
        </Link>
      </p>

    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[440px] p-12 text-center text-pencil flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <span>Loading...</span>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
