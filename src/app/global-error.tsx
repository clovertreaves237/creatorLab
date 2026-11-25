"use client";

import { useEffect } from "react";
import "./globals.css";
import "./themes.css";
import { Logo } from "@/components/brand/Logo";

/**
 * Last-resort error page: replaces the root layout when the layout itself crashes
 * (for example the header failing to reach Supabase). Must render its own <html> and <body>.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const setupProblem = error?.message?.startsWith("CreatorLab setup:");

  return (
    <html lang="en" data-theme="sketchbook">
      <body className="min-h-screen bg-paper text-ink">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
          <Logo size="md" className="mb-8" />
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
            Something went <span className="hl-yellow">wrong</span>
          </h1>
          <p className="mb-8 max-w-md text-sm text-pencil">
            {setupProblem
              ? error.message
              : "CreatorLab could not load. Try again in a moment. If it keeps happening, let the team know."}
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={reset} className="sk-btn-ink">
              Try again
            </button>
            {/* Plain link: the app router may be what failed */}
            <a href="/" className="sk-btn">
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
