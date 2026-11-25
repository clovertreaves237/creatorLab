"use client";

import Image from "next/image";

/** Hosts allow-listed in next.config images.remotePatterns: served resized + WebP by the image optimizer. */
function optimizable(src: string): boolean {
  try {
    const u = new URL(src);
    if (u.protocol !== "https:") return false;
    return (
      u.hostname === "i.ytimg.com" ||
      u.hostname === "yt3.ggpht.com" ||
      u.hostname === "p16-va.tiktokcdn.com" ||
      (u.hostname.endsWith(".supabase.co") && u.pathname.startsWith("/storage/v1/object/public/"))
    );
  } catch {
    return false;
  }
}

/**
 * Video thumbnail that fills its (fixed-size) parent. Known hosts are resized to the displayed size and
 * served as WebP (a 690 KB upload becomes ~20-40 KB); anything else falls back to a lazy <img>.
 * `priority` = the first visible card (largest paint); everything else loads lazily.
 */
export function ThumbImage({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  if (optimizable(src)) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={`h-full w-full object-cover ${className}`} />;
}
