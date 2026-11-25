"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { LogoIcon } from "@/components/ui/Logo";

/**
 * FR-2: Verification gate preventing unverified accounts from signing in.
 * Styled matching Obsidian Depth with Electric Bioluminescence.
 */
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email address";

  return (
    <div className="w-full max-w-[440px] rounded-2xl bg-white border-2 border-ink p-8 sm:p-9 text-center relative overflow-hidden">

      <div className="flex flex-col items-center mb-6">
        <LogoIcon size={52} className="mb-4" />
        <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent border border-accent/30 flex items-center justify-center mb-3">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-ink tracking-tight">
          Check your email
        </h1>
        <p className="text-xs text-pencil mt-1">
          We sent a verification link to:
        </p>
        <p className="text-sm font-semibold text-accent mt-1 px-3 py-1 rounded-lg bg-white border-2 border-ink max-w-full truncate">
          {email}
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border-2 border-ink text-xs text-pencil text-left space-y-2 mb-6">
        <div className="flex items-center gap-1.5 text-ink font-semibold">
          <ShieldCheck className="w-4 h-4 text-score" />
          <span>Email Verification Security Gate</span>
          {/* Requirement FR-2 Gate */}
        </div>
        <p className="leading-relaxed">
          To protect community data and prevent bot registrations, your account cannot access curated creators or scripts until this link is clicked.
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/signin"
          className="w-full py-3 rounded-xl btn-primary-kinetic text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Return to Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[440px] p-12 text-center text-pencil flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <span>Loading...</span>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
