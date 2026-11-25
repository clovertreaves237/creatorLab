# CreatorLab

**Master Short-Form Video Content for African Creators**  
Built for the **CIMFEST 48-Hour Hackathon 2026** (Track: *Creator Commerce*).

---

## 🌟 What is CreatorLab?
CreatorLab helps beginner and intermediate content creators in Cameroon and across Africa learn what works on TikTok and YouTube:
1. **Curated Creator Intelligence**: 9 TikTok and 9 YouTube high-performing creators per niche with engagement snapshots.
2. **7-Day Topic Discovery**: Find what creators are discussing right now via Tavily (no search query history stored).
3. **120s Script Synthesis**: Generate structured short-form scripts with timing marks using versioned Markdown training rules and Google Gemini.
4. **"Why This Worked" Analysis**: Instant breakdowns of top-performing videos using public stats and summarized metadata.

---

## 🚀 Quick Start & Development

### 1. Environment Setup
Copy the environment template:
```bash
cp .env.example .env.local
```
Fill in your credentials:
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `YOUTUBE_API_KEY`
- `TAVILY_API_KEY`

### 2. Database Migration
Apply the database schema and RLS policies using Supabase:
```bash
supabase db push
# Or run supabase/migrations/20261123000001_init_schema_and_auth.sql in your Supabase SQL editor
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📋 Functional Requirement 1 (FR-1) Status
- **Registration**: Email and password account creation (`/signup`, `SignUpForm.tsx`).
- **Data Protection**: Full transparency notice modal disclosing collected data (FR-55, Cameroon Law No. 2024/017).
- **Verification Gate**: Email verification gate (`/verify-email`, FR-2).
- **OAuth**: Google sign-in option configured via Supabase (`/signin`, FR-3).
- **Database Trigger**: `handle_new_user()` syncs new authenticated users into `public.profiles`.
