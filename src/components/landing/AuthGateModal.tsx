"use client";

import { X, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo, LogoBadge } from "@/components/brand/Logo";

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionTitle?: string;
}

/**
 * Visitor Gatekeeping Modal
 * Ensures visitors cannot access creator lists, search, or script generation
 * without first registering (FR-1) or signing in (FR-3).
 */
export function AuthGateModal({
  isOpen,
  onClose,
  actionTitle = "access this feature",
}: AuthGateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-ink p-8 text-center overflow-hidden">
        {/* Top ambient highlight */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pencil hover:text-ink p-1.5 rounded-xl hover:bg-paper-deep transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <Logo size="lg" brandName="CreatorLab" className="mb-4" />
          <div className="w-11 h-11 rounded-2xl bg-accent/20 text-accent border border-accent/30 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-ink tracking-tight">
            Account Required
          </h2>
          <p className="text-xs text-pencil mt-1.5 max-w-xs">
            To {actionTitle}, please create a free account or sign in with your credentials.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border-2 border-ink text-xs text-pencil text-left mb-6 space-y-1.5">
          <div className="flex items-center gap-1.5 text-ink font-semibold">
            <ShieldCheck className="w-4 h-4 text-score" />
            <span>Visitor Access Restriction</span>{/* (SRS Section 2.2 & FR-1) */}
          </div>
          <p className="text-[11px] leading-relaxed">
            Unregistered visitors cannot browse curated video intelligence, inspect performance metrics, or generate 120s scripts.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/signup"
            className="w-full py-3 rounded-xl btn-primary-kinetic text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <span>Create Free Account</span>{/* (FR-1) */}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/signin"
            className="w-full py-2.5 rounded-xl bg-white border-2 border-ink hover:border-line text-ink font-medium text-xs transition-colors"
          >
            Sign In with Existing Account{/* (FR-3) */}
          </Link>
        </div>
      </div>
    </div>
  );
}
