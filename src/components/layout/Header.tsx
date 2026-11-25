"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Globe, Menu, X, User, LogOut, Settings, ChevronDown, CheckCircle2, Bookmark, ClipboardList, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { ThemeSettings } from "@/components/layout/ThemeSettings";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const router = useRouter();
  const supabase = createClient();

  const [lang, setLang] = useState<"en" | "fr">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Authenticated user state
  const [user, setUser] = useState<{
    id: string;
    email?: string;
    displayName: string;
    initials: string;
    isVerified: boolean;
  } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const email = data.user.email || "";
        const metaName =
          data.user.user_metadata?.display_name ||
          data.user.user_metadata?.first_name ||
          email.split("@")[0] ||
          "Creator";

        const first = data.user.user_metadata?.first_name?.[0] || "";
        const last = data.user.user_metadata?.last_name?.[0] || "";
        const initials = (first + last).toUpperCase() || metaName.slice(0, 2).toUpperCase() || "SC";

        setUser({
          id: data.user.id,
          email,
          displayName: metaName,
          initials,
          isVerified: Boolean(data.user.email_confirmed_at),
        });
      } else {
        setUser(null);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (session?.user) {
          const email = session.user.email || "";
          const metaName =
            session.user.user_metadata?.display_name ||
            session.user.user_metadata?.first_name ||
            email.split("@")[0] ||
            "Creator";

          const first = session.user.user_metadata?.first_name?.[0] || "";
          const last = session.user.user_metadata?.last_name?.[0] || "";
          const initials = (first + last).toUpperCase() || metaName.slice(0, 2).toUpperCase() || "SC";

          setUser({
            id: session.user.id,
            email,
            displayName: metaName,
            initials,
            isVerified: Boolean(session.user.email_confirmed_at),
          });
        } else {
          setUser(null);
        }
      }
    );

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      authListener?.subscription?.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  // Staff links come from the server (database role); the admin path is only sent to admins (FR-6).
  const [staff, setStaff] = useState<{ isCurator: boolean; adminPath: string | null }>({ isCurator: false, adminPath: null });
  useEffect(() => {
    if (!user?.id) {
      setStaff({ isCurator: false, adminPath: null });
      return;
    }
    fetch("/api/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => me && setStaff({ isCurator: Boolean(me.isCurator), adminPath: me.adminPath || null }))
      .catch(() => {});
  }, [user?.id]);

  const navLinks = [
    { href: "/niches", en: "Niches", fr: "Thématiques" },
    { href: "/script-generator", en: "Creator Engine", fr: "Moteur Créateur" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        <Link href="/" aria-label="CreatorLab home">
          <Logo size="sm" />
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-ink">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline underline-offset-[6px] decoration-2">
              {lang === "en" ? l.en : l.fr}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="flex items-center gap-1.5 text-sm font-medium text-pencil hover:text-ink"
            title="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <ThemeSettings signedIn={Boolean(user)} />

          {user && <NotificationBell />}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 text-left"
                aria-expanded={userDropdownOpen}
              >
                <span className="w-9 h-9 rounded-full border-2 border-ink bg-paper-deep text-ink font-bold text-xs flex items-center justify-center">
                  {user.initials}
                </span>
                <span className="text-sm font-semibold text-ink max-w-[120px] truncate">{user.displayName}</span>
                <ChevronDown className="w-4 h-4 text-pencil" />
              </button>

              {userDropdownOpen && (
                <div className="sk-card absolute right-0 mt-3 w-60 p-2 z-50 text-sm">
                  <div className="px-3 py-2.5 border-b border-line mb-1">
                    <p className="font-bold text-ink truncate">{user.displayName}</p>
                    <p className="text-xs text-pencil truncate mt-0.5">{user.email}</p>
                    {user.isVerified && (
                      <p className="flex items-center gap-1 text-xs text-score mt-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified account
                      </p>
                    )}
                  </div>
                  {[
                    { href: "/niches", icon: Bookmark, label: "Saved Niches" },
                    { href: "/profile", icon: User, label: "Profile & Dashboard" },
                    { href: "/account", icon: Settings, label: "Account Settings" },
                    ...(staff.isCurator ? [{ href: "/profile?tab=curator", icon: ClipboardList, label: "Curator Workspace" }] : []),
                    ...(staff.adminPath ? [{ href: staff.adminPath, icon: ShieldCheck, label: "Admin Portal" }] : []),
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-pencil hover:text-ink hover:bg-ink/[0.05]"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-line my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="text-[15px] font-medium text-ink hover:underline underline-offset-[6px] decoration-2">
                {lang === "en" ? "Login" : "Connexion"}
              </Link>
              <Link href="/signup" className="sk-btn px-7 py-3">
                {lang === "en" ? "Get Started" : "Commencer"}
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeSettings signedIn={Boolean(user)} />
          {user && <NotificationBell />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-6 pt-2 bg-paper border-b-2 border-ink flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-base font-medium text-ink border-b border-line"
            >
              {lang === "en" ? l.en : l.fr}
            </Link>
          ))}

          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="flex items-center justify-between py-3 text-base font-medium text-ink border-b border-line"
          >
            <span>Language</span>
            <span className="flex items-center gap-1.5 text-pencil">
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </span>
          </button>

          {user ? (
            <>
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="py-3 text-base text-ink border-b border-line">
                Profile & Dashboard
              </Link>
              <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="py-3 text-base text-ink border-b border-line">
                Account Settings
              </Link>
              {staff.isCurator && (
                <Link href="/profile?tab=curator" onClick={() => setMobileMenuOpen(false)} className="py-3 text-base text-ink border-b border-line">
                  Curator Workspace
                </Link>
              )}
              {staff.adminPath && (
                <Link href={staff.adminPath} onClick={() => setMobileMenuOpen(false)} className="py-3 text-base text-ink border-b border-line">
                  Admin Portal
                </Link>
              )}
              <button onClick={handleSignOut} className="py-3 text-base text-left text-red-700">
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="sk-btn">
                Login
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="sk-btn-ink">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
