import type { Metadata } from "next";
import { Archivo, Gelasio } from "next/font/google";
import "./globals.css";
import "./themes.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HandDrawnFilters } from "@/components/ui/HandDrawn";
import { ActivityTracker } from "@/components/activity/ActivityTracker";
import { Suspense } from "react";
import { THEME_BOOT_SCRIPT } from "@/lib/theme/themes";

const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Gelasio({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://creator-lab-beta.vercel.app").replace(/\/+$/, "");
const SITE_DESCRIPTION =
  "Short-form creator intelligence for Cameroon and Africa: curated creators, fresh topics and ready-to-use scripts.";

// Icons come from the file conventions in src/app: icon.svg, favicon.ico, apple-icon.png,
// opengraph-image.png and twitter-image.png (all built from the pen-nib mark in public/brand).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CreatorLab — Master Short-Form Video Content",
  description: SITE_DESCRIPTION,
  applicationName: "CreatorLab",
  openGraph: {
    type: "website",
    siteName: "CreatorLab",
    title: "CreatorLab",
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorLab",
    description: SITE_DESCRIPTION,
  },
};

export const viewport = { themeColor: "#FAFAF8" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="sketchbook" suppressHydrationWarning className={`${sans.variable} ${serif.variable}`}>
      <head>
        {/* Applies the saved site theme before the first paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <HandDrawnFilters />
        <Suspense fallback={null}>
          <ActivityTracker />
        </Suspense>
        <Header />
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
