"use client";

import { ShieldCheck, X, Lock, EyeOff, UserCheck, Trash2 } from "lucide-react";

interface DataNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FR-55: The sign-up flow shall show what data is collected and why.
 * Compliant with Cameroon Law No. 2024/017 on personal data protection.
 * Styled with Obsidian Depth & Carbon Glass.
 */
export function DataNoticeModal({ isOpen, onClose }: DataNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="relative w-full max-w-lg bg-white border-2 border-ink rounded-2xl p-6 sm:p-7 text-ink overflow-hidden">
        {/* Ambient Top Glow */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-pencil hover:text-ink p-1 rounded-xl hover:bg-paper-deep transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-accent/20 border border-accent/30 text-accent flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-ink text-lg">
              Transparency & Privacy Notice
            </h3>
            <p className="text-[11px] text-pencil">
              Cameroon Law No. 2024/017 on Personal Data Protection
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-pencil">
          <div className="p-3.5 rounded-2xl bg-white border-2 border-ink">
            <div className="flex items-center gap-2 text-ink font-semibold text-xs mb-1">
              <UserCheck className="w-4 h-4 text-accent" />
              <span>1. Account Information</span>{/* (FR-1) */}
            </div>
            <p className="leading-relaxed">
              We collect your name and email to identify your session and tailor your creator workspace. Passwords are salted and securely managed by Supabase Auth — plain passwords are never stored.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border-2 border-ink">
            <div className="flex items-center gap-2 text-ink font-semibold text-xs mb-1">
              <EyeOff className="w-4 h-4 text-score" />
              <span>2. Zero Storage of Research Notes</span>{/* (FR-33 & NFR-11) */}
            </div>
            <p className="leading-relaxed">
              Your research notes entered in the 120s script generator are transmitted ephemerally to the Gemini API and immediately discarded. CreatorLab does not record, sell, or index your notes.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border-2 border-ink">
            <div className="flex items-center gap-2 text-ink font-semibold text-xs mb-1">
              <Lock className="w-4 h-4 text-accent" />
              <span>3. Setup Answers & Saved Niches</span>{/* (FR-9) */}
            </div>
            <p className="leading-relaxed">
              After sign-up we ask for a username, what describes you, your experience, the platforms you use, your goals, your country, city and language, and at least one niche. We use them only to show you the right creators and write scripts that fit you. You can change them at any time.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border-2 border-ink">
            <div className="flex items-center gap-2 text-ink font-semibold text-xs mb-1">
              <Lock className="w-4 h-4 text-accent" />
              <span>4. Your Activity History</span>
            </div>
            <p className="leading-relaxed">
              We record what you do in CreatorLab (pages you open, videos you watch, scripts you write, copy or download) and show it back to you under My Activity. Search words and research notes are never recorded. Our admins can see this activity to support you and improve the service.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border-2 border-ink">
            <div className="flex items-center gap-2 text-ink font-semibold text-xs mb-1">
              <Trash2 className="w-4 h-4 text-red-700" />
              <span>5. Right to Complete Deletion</span>{/* (FR-5 & NFR-14) */}
            </div>
            <p className="leading-relaxed">
              You maintain the absolute right to delete your account from your settings page. All associated profile and preference data is irrevocably expunged within 90 days.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl btn-primary-kinetic font-semibold text-white text-xs transition-all"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
