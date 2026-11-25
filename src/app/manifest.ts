import type { MetadataRoute } from "next";

/** Web app manifest: name, brand colours and the pen-nib app icons (public/brand). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CreatorLab",
    short_name: "CreatorLab",
    description: "Short-form creator intelligence for Cameroon and Africa: curated creators, fresh topics and ready-to-use scripts.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#18181B",
    icons: [
      { src: "/brand/app-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
