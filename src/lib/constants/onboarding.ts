import { LIVE_NICHE_IDS } from "@/lib/constants/niches";

/**
 * Setup questions asked once after sign-up. The answers personalise the app:
 * which niches and creators the user sees, and the voice/CTA of their scripts.
 */
export const ONBOARDING_OPTIONS = {
  userType: [
    { value: "creator", label: "Content creator", hint: "I post videos to grow an audience" },
    { value: "business_owner", label: "Business owner", hint: "I sell products or services" },
    { value: "marketer", label: "Brand or marketing professional", hint: "I market a brand or company" },
    { value: "agency", label: "Agency or freelancer", hint: "I make content for clients" },
    { value: "student", label: "Student or just curious", hint: "I want to learn short-form video" },
  ],
  experience: [
    { value: "starting", label: "Just starting", hint: "Not posting yet" },
    { value: "occasional", label: "Posting sometimes", hint: "A few videos a month" },
    { value: "consistent", label: "Posting consistently", hint: "Every week" },
    { value: "professional", label: "Professional", hint: "It's my job" },
  ],
  platforms: [
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube Shorts" },
    { value: "instagram", label: "Instagram Reels" },
    { value: "facebook", label: "Facebook" },
    { value: "whatsapp", label: "WhatsApp Status / Channel" },
    { value: "none", label: "Not posting yet" },
  ],
  goals: [
    { value: "followers", label: "Grow my followers" },
    { value: "customers", label: "Get more customers and sales" },
    { value: "brand", label: "Build my personal brand" },
    { value: "scripting", label: "Learn to write better scripts" },
    { value: "monetize", label: "Make money from my content" },
  ],
  language: [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "en_fr", label: "English and French" },
    { value: "pidgin", label: "Pidgin" },
    { value: "other", label: "Another language" },
  ],
} as const;

/**
 * Personalisation rule: a user must keep at least one LIVE niche. Coming-soon niches cannot be picked yet.
 * (Kept under this name for existing imports: these are the niches a user may choose from.)
 */
export const REQUIRED_NICHE_IDS: string[] = [];
export const SELECTABLE_NICHE_IDS: string[] = LIVE_NICHE_IDS;
