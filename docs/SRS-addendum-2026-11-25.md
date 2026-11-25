# CreatorLab SRS: Addendum (25 November 2026)

Extends *CreatorLab_SRS.docx* v1.0. New requirements continue the numbering after FR-55 / NFR-20.

## A. Roles and access (amends 2.2, FR-6, FR-7)

| Role | How it is granted | Access |
|---|---|---|
| User | Sign-up | App, own profile, activity, notifications |
| Curator | Admin invitation, accepted by the user | + Curator Workspace tab in the profile |
| Admin | Super admin invitation, accepted by the user | + Admin portal |
| Super admin | Configured email (`super_admin_emails` table), verified | + invite/remove admins, change server secrets |

- **FR-56** A user's role shall be stored only in the database and changed only by database functions. User-editable metadata shall never grant a role.
- **FR-57** Staff powers (curator, admin, super admin) shall require a verified email address.
- **FR-58** The admin portal shall be served only on a secret path set in configuration (`ADMIN_PORTAL_PATH`). Any other visitor of that path, and every visitor of `/admin` or `/curator`, shall receive a "not found" page.
- **FR-59** There shall be no separate curator route. Curator tools shall appear as a tab in the curator's own dashboard.
- **FR-60** Row Level Security shall allow writes to creators, videos and snapshots only for curators and above. Logged-out visitors shall have no write access to any table.

## B. Becoming a curator

- **FR-61** A public page (`/become-a-curator`) shall list curator criteria and explain how to apply by email (CV and letter). Applications are handled outside the product.
- **FR-62** Admins shall search any user by username, name or email and send a curator invitation. Only the super admin may send admin invitations.
- **FR-63** The invited user shall receive a notification with Accept and Decline. On accept, the role changes and the Curator Workspace tab appears.
- **FR-64** Admins shall remove a curator role, and the super admin an admin role. The user shall be notified.
- **FR-65** Every curator action (add, edit, remove creator; enter video data) shall be recorded in the audit log with the curator's account.
- **FR-66** Curators shall be able to remove a creator (soft delete, kept in history).

## C. Personalisation and onboarding

- **FR-67** After sign-up and email verification, a user shall complete setup before using the app: username, which best describes them, experience level, platforms, goals, country, city, content language, and niches.
- **FR-68** A user shall pick at least one niche. Every live niche (currently Branding & Marketing) is required.
- **FR-69** The creators page shall show only the user's chosen niches, one niche at a time, with a tab switcher when more than one is chosen.
- **FR-70** A user shall not be able to remove a live niche or their last remaining niche.
- **FR-71** The sign-up data notice (FR-55) shall describe the setup answers and activity tracking.

## D. Activity tracking

- **FR-72** The system shall record each signed-in user's actions: page views, niche saved/removed/switched, creator favourited, video played, "Why this worked" opened, topic searched, script written, copied, downloaded, edited or stopped, profile updated, onboarding completed, notification opened, invitation answered.
- **FR-73** Users shall see their own activity (timeline and 30-day summary) in the profile under My Activity. Admins shall see any user's activity.
- **FR-74** Search events shall not store the search text (FR-26). Script events shall store the topic only, never the notes (FR-33).
- **FR-75** Generated scripts shall be stored per user in `generated_scripts` and shown in the profile history.

## E. Notifications

- **FR-76** Each user shall have in-app notifications, shown by a bell with an unread count in the header and on the profile Notifications tab, with "mark all read".
- **FR-77** Notifications shall be sent for: welcome after sign-up; role invitation; invitation accepted or declined (to the inviting admin); role granted or removed; new creators in a followed niche (at most once per niche per day); account deletion scheduled (to the user) and requested (to admins); admin announcements.
- **FR-78** Notifications shall only be created by the database, never directly by the browser.

## F. Admin portal

- **FR-79** Overview: total users, new and active users this week, users who have not finished setup, scripts today and in total, curators and admins, pending invitations, scripts per day for 14 days, followers per niche, open account deletion requests with their 90-day due date.
- **FR-80** Users & Roles: search, user detail (setup answers, niches, script count, recent activity), invite, remove role, withdraw invitation.
- **FR-81** Curator Activity: per curator, for any date range, creators added, edited, removed and videos entered, for review and payment.
- **FR-82** Announcements: send a notification to everyone, curators, admins, or followers of one niche.
- **FR-83** Settings: daily script limit per user (enforces NFR-20; admins are not limited) and the list of all invitations and their status.
- **FR-84** Existing functions remain: manual YouTube refresh (FR-46), audit log (FR-50, FR-51), training rules governance (FR-52), Gemini status. Changing the Gemini key is super admin only and audited.

## G. Script generation

- **FR-85** Scripts shall stream to the user word by word. The user may stop generation and keep the partial script.
- **FR-86** Every script shall end with a specific Call to Action following `training-rules/core/cta.md`.
- **FR-87** If Gemini's stream drops, the system shall ask it to continue without repeating text. If the script still cannot be completed, the user shall see a clear error rather than a partial script presented as complete.
- **FR-88** Script generation shall require a signed-in account.

## H. Update 26 November 2026

- **FR-89** When an admin sends a curator or admin invitation, the invitee shall also receive an email (sent through the configured Gmail account) with a link to answer it in CreatorLab. Delivery success or failure shall be recorded in the audit log and shown to the admin.
- **FR-90** For YouTube videos, the curator pastes the link and the system pulls the original title, description, thumbnail, length, publish date, views, likes and comments from the YouTube Data API.
- **FR-91** For TikTok videos, the curator uploads the card thumbnail (JPG, PNG or WebP, max 2 MB) to CreatorLab storage. A thumbnail is required; no placeholder images are used.
- **FR-92** (replaces the simulated refresh) The YouTube refresh shall use only real data from the YouTube Data API and log the quota used (NFR-19). Without an API key it shall change nothing. The TikTok refresh updates titles only (TikTok shares no public stats).
- **FR-93** The audit log viewer shall show who acted, what they did, who or what was affected, and when, with filters by type and date and paging through the full year.
- **FR-94** Creators with no videos shall show "No videos added yet" instead of a placeholder video.
- Sign-in redirects shall only lead to pages inside CreatorLab.

## I. Update 26 November 2026 (2): three live niches + personalisation

- **FR-95** (amends FR-8 / 1.2) Three niches are live: Branding & Marketing, Content Creation and Tech News. Faceless Content and Startups & Founders are shown as "Coming soon" and cannot be selected or used for scripts until they open.
- **FR-96** Script generation for every live niche uses ALL of that niche's training documents in `training-rules/<niche>/` (plus matching root-level files), not only `rules.md` / `training.md`. The short hand-written files lead; the large documents share the remaining space. Source lists are never included (FR-30, FR-37).
- **FR-97** (amends FR-68) At onboarding the user picks one or more live niches; no single niche is forced.
- **FR-98** Personalisation starts when onboarding is finished: the creators page, Creator Engine, topic search and niche choices only offer the user's own live niches, until the user adds, changes or removes a niche on the Niches page. The last live niche cannot be removed.
- **FR-99** The curator Source Lists templates cover all live niches, including TikTok short links (vt.tiktok.com), which are resolved to the real account and video. Videos can be filtered by a preset or custom maximum length.

## J. Update 26 November 2026 (3): background sound for scripts

Music creation for artists (beats, lyrics) is removed from scope. Sound enters CreatorLab as an optional background instrumental for each script.

- **FR-100** Under every finished script the user is asked whether they want a background sound. Nothing is generated unless they press "Yes, make a sound". "No thanks", or simply copying the script, makes no sound.
- **FR-101** The sound is instrumental only (no vocals), matches the script's mood and timing marks, and lasts as long as the script.
- **FR-102** Gemini composes a JSON plan (tempo, key, chords, drum, bass, pad and melody patterns, sections) from `training-rules/core/sound.md` and the sound file of the script's niche only (`training-rules/<niche>/sound.md`, 1,000 recipes each, ~30 best matches sent per request). Sound files are never used by the script writer.
- **FR-103** The browser renders the plan to audio with Tone.js (synthesised, no sound bank). The user can play it, download a WAV, or make another. No audio is stored on the server.
- **FR-104** Sound requests require a signed-in user and a live niche, are limited to 20 per user per hour, and are recorded in My Activity (made, downloaded, skipped).
- Recipes are regenerated with `node scripts/generate-sound-catalogs.mjs` after editing the palettes in that script.
- **FR-105** Before composing, the sound composer reads the script: who is speaking, what they sell or teach, where, to whom, how it should feel, and the energy (soft / medium / high). Small traders, local shops, calm tips and care topics get a soft sound; a soft reading caps the loudness and removes 808s and impacts. The reading is shown to the user.
- **FR-106** Under "Download WAV" and "Make another" there is a field "Or describe the sound you want" (max 400 characters). The description is followed above the recipes and the automatic reading (still instrumental and original). It is not stored.

## K. Update 27 November 2026: portals walkthrough

- **FR-107** The admin overview counts scripts from `script_requests` (permanent; `generated_scripts` keeps only 14 days) and offers 14 / 30 / 90-day ranges plus the total since launch. It reloads every 10 seconds and shows a live activity feed.
- **FR-108** No SRS section or requirement numbers are shown to users anywhere in the product.
- **FR-109** One loader across the product: a pencil-sketch animation in the brand palette (ink, accent, highlighters); still for users who prefer reduced motion.
- **FR-110** Every user, curators included, can add a profile picture, a cover picture and a short bio (max 280 characters), stored in the `profile-media` bucket in their own folder.
- **FR-111** The curator's Creators tab lists every creator in the chosen niche with all their videos: add, edit, remove and restore creators; add, edit (e.g. add a TikTok thumbnail) and remove videos. All actions are audited.
- **FR-112** TikTok videos play on the page in TikTok's official player, like YouTube videos. Each creator card shows the best video plus all other videos.
- **FR-113** Favourite creators are stored on the account (`favorite_creators`), not in the browser.
- **FR-114** Topic search shows only real results from the last 7 days: recent YouTube videos (YouTube Data API) and, when the Gemini plan includes Google Search, web articles whose links Google Search actually returned. No invented articles.
- **FR-115** Videos removed for copyright, deleted, private, or blocked in Cameroon are detected through the YouTube API and removed by the source-list importer.

## L. Update 27 November 2026 (2): themes, private history, uploads, profile

- **FR-116** A settings button in the navbar offers three site themes: Sketchbook (default), Studio Clay and Signal Grid. The whole site changes at once (circular reveal from the button); the choice is saved on the device and, when signed in, on the account (`profiles.ui_theme`). Themes change colours, type, shape and motion only, never page structure. All are bright; reduced-motion users get no animation.
- **FR-117** (amends FR-75) Every script a creator writes is kept permanently in their own history. Only the creator can read, edit, copy, download or delete it; admins see counts only. The 14-day window now applies only to hook de-duplication, which uses the creator's own scripts.
- **FR-118** Every file uploaded in CreatorLab (TikTok thumbnails, profile and cover pictures) is stored in Supabase Storage and recorded in `media_uploads` (who, what, where, when, size, type).
- **FR-119** The profile page shows only real data: dashboard numbers from the creator's history and the admin-set daily limit, ideas built from the newest curated videos in the creator's niches, and the creators to study in those niches. No invented ideas or claims.
