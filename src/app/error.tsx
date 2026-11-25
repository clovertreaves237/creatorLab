"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LogoBadge } from "@/components/brand/Logo";

/** Shown when a page crashes in the browser. The header and footer stay in place. */
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const setupProblem = error?.message?.startsWith("CreatorLab setup:");

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center max-w-md mx-auto">
      <LogoBadge size={52} className="mb-4" />
      <h2 className="text-3xl font-extrabold text-ink tracking-tight mb-2">
        Something went <span className="hl-yellow">wrong</span>
      </h2>
      <p className="text-sm text-pencil mb-6">
        {setupProblem ? error.message : "This page hit an error while loading. Try again, or go back to the home page."}
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={reset} className="sk-btn-ink">
          Try again
        </button>
        <Link href="/" className="sk-btn">
          Home
        </Link>
      </div>
    </div>
  );
}
