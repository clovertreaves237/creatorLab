"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Shown on every 404 page: "Sign in" that returns to the address the visitor opened.
 * The same link appears on any missing page, so it reveals nothing about which addresses exist.
 * The destination is a relative path and is validated again by the sign-in page (safeRedirectPath).
 */
export function SignInBackLink() {
  const [href, setHref] = useState("/signin");
  useEffect(() => {
    const here = window.location.pathname + window.location.search;
    if (here.startsWith("/") && !here.startsWith("//")) setHref(`/signin?redirect=${encodeURIComponent(here)}`);
  }, []);
  return (
    <Link href={href} prefetch={false} className="mt-4 text-xs font-semibold text-pencil underline underline-offset-4 hover:text-ink">
      Signed out? Sign in
    </Link>
  );
}
