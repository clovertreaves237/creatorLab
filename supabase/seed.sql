-- Initial Seed Data for CreatorLab

-- 1. Insert 5 Required Niches (SRS Section 1.2 & Section 6)
insert into public.niches (id, name, description, is_live_demo)
values
  ('branding-marketing', 'Branding & Marketing', 'Personal branding, digital marketing, client acquisition, and storytelling.', true),
  ('faceless-content', 'Faceless Content', 'Voiceover-driven shorts, B-roll curation, automation pipelines, and ambient narratives.', false),
  ('startups-founders', 'Startups & Founders', 'Bootstrapping, pitch decks, building in public, and tech venture dynamics in Africa.', false),
  ('tech-news', 'Tech News', 'Artificial intelligence breakdowns, consumer gadgets, developer tooling, and telecom updates.', false),
  ('content-creation', 'Content Creation', 'Shooting gear, editing hacks, short-form retention pacing, and creator business.', false)
on conflict (id) do nothing;
