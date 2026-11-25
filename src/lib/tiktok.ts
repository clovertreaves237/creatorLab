/**
 * TikTok link helpers. TikTok's public oEmbed no longer returns titles or thumbnails, so CreatorLab
 * takes the handle and id from the link, the title from the curator (or the source list topic),
 * and the thumbnail from an upload.
 */
export interface TikTokVideoRef {
  handle: string; // "@name"
  videoId: string;
  url: string; // clean link without tracking parameters
  profileUrl: string;
}

export function parseTikTokVideo(input: string): TikTokVideoRef | null {
  const value = (input || "").trim();
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (!url.hostname.replace(/^www\.|^m\.|^vm\./, "").endsWith("tiktok.com")) return null;
    const m = url.pathname.match(/^\/(@[A-Za-z0-9._-]+)\/video\/(\d{8,25})/);
    if (!m) return null;
    return {
      handle: m[1],
      videoId: m[2],
      url: `https://www.tiktok.com/${m[1]}/video/${m[2]}`,
      profileUrl: `https://www.tiktok.com/${m[1]}`,
    };
  } catch {
    return null;
  }
}

export function isTikTokLink(input: string): boolean {
  return /(^|\/\/|\.)tiktok\.com\//i.test(input || "");
}
