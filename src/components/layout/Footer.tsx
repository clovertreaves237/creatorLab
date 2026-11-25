"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Niches", href: "/niches" },
      { label: "Creator Engine", href: "/script-generator" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/signin" },
      { label: "Get Started", href: "/signup" },
      { label: "Become a curator", href: "/become-a-curator" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();

  // The Creator Engine runs full-viewport with no footer
  if (pathname?.startsWith("/script-generator")) {
    return null;
  }

  return (
    <footer className="w-full border-t-2 border-ink bg-paper text-pencil">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12 pb-14">
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <Link href="/" aria-label="CreatorLab home">
              <Logo size="md" />
            </Link>
            <p className="max-w-sm text-base leading-relaxed">
              Short-form creator intelligence for Cameroon and Africa: curated creators, fresh topics and
              ready scripts.
            </p>
            <div className="space-y-1 text-sm">
              <p>{/* FR-54 */}Gemini generates your scripts strictly from CreatorLab&apos;s versioned training rules.</p>
              <p>{/* FR-33 */}Zero user notes stored. Ephemeral processing only.</p>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-ink mb-4">{col.title}</h4>
                <ul className="space-y-3 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-ink hover:underline underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; 2026 CreatorLab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink hover:underline underline-offset-4">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
