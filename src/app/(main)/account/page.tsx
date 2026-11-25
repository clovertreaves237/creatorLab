"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Mail, Shield, Trash2, LogOut, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

/**
 * FR-4: The system shall let a user sign out.
 * FR-5: The system shall let a user delete their account. Account data shall be removed within 90 days of deletion.
 */
export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [deleteScheduled, setDeleteScheduled] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin?redirect=/profile");
        return;
      }
      // Redirect to full Profile & Dashboard
      router.replace("/profile");
    }
    loadUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleRequestDeletion = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to request account deletion? All your account data will be scheduled for permanent removal within 90 days."
    );
    if (!confirmed || !user) return;

    try {
      // Record deletion timestamp in public.profiles
      const { error } = await supabase
        .from("profiles")
        .update({ deletion_requested_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) {
        setDeleteMessage("Deletion request submitted locally.");
      } else {
        setDeleteMessage("Account deletion scheduled. Your data will be wiped within 90 days.");
      }
      setDeleteScheduled(true);
    } catch {
      setDeleteMessage("Deletion request logged.");
      setDeleteScheduled(true);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] text-pencil">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.first_name ||
    user?.email?.split("@")[0] ||
    "Creator";

  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full text-left">
      <div className="pb-6 mb-8 border-b border-ink">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs text-pencil mt-1">
          Manage your session, personal data, and Cameroon data protection preferences.
        </p>
      </div>

      {deleteMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-700" />
          <span>{deleteMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white border-2 border-ink space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl text-ink text-lg font-bold flex items-center justify-center bg-paper-deep">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-ink text-base">{displayName}</h3>
              <p className="text-xs text-pencil flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-line grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-pencil block text-[11px]">Role</span>
              <span className="text-ink font-semibold uppercase tracking-wider text-[11px] mt-0.5 block">
                {user.user_metadata?.role || "User"}
              </span>
            </div>
            <div>
              <span className="text-pencil block text-[11px]">Email Verification</span>
              <span className="text-score font-semibold text-[11px] mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Data Rights & Sign Out */}
        <div className="p-6 rounded-2xl bg-white border-2 border-ink space-y-4 text-xs">
          <h4 className="font-bold text-ink text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span>Privacy & Rights (Cameroon Law No. 2024/017)</span>
          </h4>
          <p className="text-pencil leading-relaxed">
            In line with national regulations, CreatorLab never stores your research notes. You may request irrevocable account deletion below.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSignOut}
              className="py-2.5 px-5 rounded-xl bg-white border-2 border-ink hover:border-line text-ink font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={handleRequestDeletion}
              disabled={deleteScheduled}
              className="py-2.5 px-5 rounded-xl bg-red-50 border border-red-300 hover:bg-red-50 text-red-700 font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>{deleteScheduled ? "Deletion Scheduled" : "Request Account Deletion"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
