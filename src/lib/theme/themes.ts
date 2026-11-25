/** The three CreatorLab site themes. Styles live in src/app/themes.css. */
export const THEMES = [
  {
    id: "sketchbook",
    name: "Sketchbook",
    description: "Hand-drawn paper, ink and one blue. The original CreatorLab look.",
  },
  {
    id: "clay",
    name: "Studio Clay",
    description: "Warm cream, terracotta and serif headings. Soft shapes that rise in gently.",
  },
  {
    id: "signal",
    name: "Signal Grid",
    description: "Crisp white, deep ink and emerald on a fine grid. Sharp edges, quick wipes.",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const THEME_IDS: string[] = THEMES.map((t) => t.id);
export const DEFAULT_THEME: ThemeId = "sketchbook";
export const THEME_STORAGE_KEY = "creatorlab-theme";
export const isThemeId = (v: unknown): v is ThemeId => typeof v === "string" && THEME_IDS.includes(v);

/** Runs in <head> before the page paints, so the saved theme shows without a flash. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(${JSON.stringify(
  ["clay", "signal"]
)}.indexOf(t)>-1){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","sketchbook");}}catch(e){document.documentElement.setAttribute("data-theme","sketchbook");}})();`;
