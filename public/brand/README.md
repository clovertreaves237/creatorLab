# CreatorLab brand files

The mark is a fountain-pen nib tilted as if writing, with a blue breather hole and a slit to the tip.
Colours (Sketchbook theme): ink `#18181B`, blue `#2563EB`, paper `#FAFAF8`.
In the app, always use `src/components/brand/Logo.tsx` (`Logo`, `LogoMark`, `LogoBadge`); it follows the site theme.

| File | Use it for |
|---|---|
| `logo-mark.svg` | Mark, full colour (light backgrounds) |
| `logo-mark-black.svg` | Mark, one colour black |
| `logo-mark-white.svg` | Mark, one colour white (dark backgrounds) |
| `logo-full.svg` | Mark + wordmark (text uses Archivo 800; falls back to Arial) |
| `logo-full-1200.png` | Mark + wordmark as an image (slides, documents) |
| `app-icon.svg`, `app-icon-180/192/512.png` | App icon: white nib on ink, solid background |
| `logo-mark-192/512/1024.png`, `logo-mark-black-512.png`, `logo-mark-white-512.png` | Transparent PNG marks |
| `google-oauth-logo-120.png` (or `-512`) | Google Cloud → Google Auth Platform → Branding → App logo |
| `email-logo.png` | Email header (Supabase email templates, invitation emails) |
| `favicon.ico`, `favicon-16/32/48/180/192/512.png` | Favicon pack for any other site or tool |
| `og-image.png` | Social share image (1200 x 630) |

Supabase email templates (Authentication → Email Templates): add at the top of each template
`<img src="https://creator-lab-beta.vercel.app/brand/email-logo.png" width="200" height="43" alt="CreatorLab">`
