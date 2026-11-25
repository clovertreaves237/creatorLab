/**
 * NFR-18: The niche allow-list shall be defined in one place in the code.
 * Five core niches specified in CreatorLab SRS Section 1.2 & Section 6.
 *
 * status:
 *   "live"         training documents + curated creators exist; users can pick it and write scripts
 *   "coming_soon"  shown to users, but cannot be selected yet
 * Live niches are listed first. Branding & Marketing stays the demo niche (isLiveDemo).
 */
export const ALLOWED_NICHES = [
  {
    id: "branding-marketing",
    name: "Branding & Marketing",
    description: "Personal branding, corporate marketing, audience acquisition, and conversion strategies.",
    isLiveDemo: true, // First live demo niche
    status: "live",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    description: "Video editing workflows, scripting frameworks, equipment tips, and creator monetization.",
    isLiveDemo: false,
    status: "live",
  },
  {
    id: "tech-news",
    name: "Tech News",
    description: "Emerging tech, AI updates, developer tools, and consumer electronics breakdowns.",
    isLiveDemo: false,
    status: "live",
  },
  {
    id: "faceless-content",
    name: "Faceless Content",
    description: "Automated channels, voiceover-driven narratives, and B-roll visual storytelling.",
    isLiveDemo: false,
    status: "coming_soon",
  },
  {
    id: "startups-founders",
    name: "Startups & Founders",
    description: "Founder journeys, pitch breakdowns, product launches, and bootstrapping lessons.",
    isLiveDemo: false,
    status: "coming_soon",
  },
] as const;

export type NicheId = (typeof ALLOWED_NICHES)[number]["id"];

export function isValidNiche(id: string): id is NicheId {
  return ALLOWED_NICHES.some((niche) => niche.id === id);
}

export function getNicheById(id: string) {
  return ALLOWED_NICHES.find((niche) => niche.id === id);
}

/** Niches users can pick and use today. */
export const LIVE_NICHES = ALLOWED_NICHES.filter((n) => n.status === "live");
export const LIVE_NICHE_IDS: string[] = LIVE_NICHES.map((n) => n.id);

export function isLiveNiche(id: string | null | undefined): boolean {
  return Boolean(id && LIVE_NICHE_IDS.includes(id));
}
