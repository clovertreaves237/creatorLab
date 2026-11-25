import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Script rules, sound rules and curator source lists are read from training-rules/ at runtime.
  // Ship that folder with every server function on Vercel.
  outputFileTracingIncludes: {
    "/**": ["./training-rules/**/*"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "p16-va.tiktokcdn.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
