# CreatorLab — UI rules

Every page, tab, button, background and new feature uses the **sketchbook design system**
(based on the uilora `hand-drawn` kit, reference screenshots in `screenshots/`).
Three bright site themes, chosen in the navbar settings (`src/app/themes.css`, `src/lib/theme/themes.ts`):
**Sketchbook** (default), **Studio Clay**, **Signal Grid**. No dark mode. Themes change colours, type, shape and
motion only, never page structure. Use the tokens below (they are CSS variables) so new UI works in all three;
check new pages in every theme.

## Build from these, don't invent new styles
- **Tokens** (`tailwind.config.ts`): `paper`, `paper-deep`, `white`, `ink`, `pencil`, `pencil-light`,
  `line`, `accent` (the single blue), `score` (green), `hl-yellow|sky|pink|mint|peach|tape`.
  Never use raw hex colours or Tailwind palette colours for new UI.
- **CSS primitives** (`src/app/globals.css`):
  `.sk-btn` (outlined) · `.sk-btn-ink` (solid black) · `.sk-btn-ghost` · `.sk-card` · `.sk-card-flat`
  · `.sk-pill` (uppercase eyebrow) · `.sk-input` · `.sk-tabs` + `.sk-tab[data-active=true]` · `.sk-row`
  · `.hl-*` (highlighter behind a heading word) · `.sticky-note` · `.tape-banner` · `.paper-grid`.
- **React** (`src/components/ui/HandDrawn.tsx`): `Highlight`, `SketchCard`, `DrawnArrow`,
  `StickyNote`, `TapeBanner`, `HandCheckItem`. Brand: `Logo` / `LogoIcon` (`src/components/ui/Logo.tsx`).

## Look
- Fonts: Archivo (`font-sans`, headings 800) and Gelasio italic (`font-serif`) for quotes / card titles.
- Headings: big, tight, ink; highlight one word with `.hl-*`.
- Outlines are 2px ink. Dividers are 1px `line`. Active / selected = solid `ink` with white text.
- Blue `accent` is for the brand ("Lab"), links and focus rings, plus light `accent/10` tints. Not for big fills.
- Generous spacing (sections `py-24`+), lots of empty paper.

## Banned (AI-slop tells)
Gradients (bg or text) · glows / coloured shadows · blur orbs · glassmorphism / `backdrop-blur` ·
purple/indigo/violet · ✨ `Sparkles` icon · emoji in UI · neon dark dashboards · `hover:scale` bounce ·
`animate-pulse` decoration · static offset shadows on every element · cards nested in cards ·
mono-font micro labels · buzzword copy (seamless, unlock, supercharge, elevate, synthesize, magic,
award-winning) · fake testimonials, stats, logos or prices. Use real CreatorLab facts only (see `CreatorLab_SRS.docx`).
