import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Script rules, sound rules and curator source lists are read from training-rules/ at runtime.
  // Ship that folder with every server function on Vercel.
  outputFileTracingIncludes: {
    "/**": ["./training-rules/**/*"],
  },
  poweredByHeader: false,
  // Security headers (OWASP A02). A full script/style CSP is not set here because the YouTube/TikTok embeds,
  // Supabase and Google sign-in need a careful allow-list; these directives cannot break those features.
  async headers() {
    const security = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
    ];
    return [
      { source: "/:path*", headers: security },
      // Signed-in API data must never be stored by shared caches (the public price list sets its own cache)
      { source: "/api/((?!plans).*)", headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }] },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "p16-va.tiktokcdn.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Curator-uploaded thumbnails and profile pictures (Supabase Storage public buckets)
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
    // Thumbnails rarely change: cache optimized versions for a day
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
