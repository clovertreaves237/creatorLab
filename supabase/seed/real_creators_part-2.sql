-- CreatorLab import, part 2 of 3. Run the parts in order.

begin;

-- ===== content-creation: 2 creators, 39 videos =====
insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('d22ad151-17c5-5a71-a87c-f2bdc2353240', 'content-creation', 'tiktok', 'Kallaway', '@kallaway.marketing', 'https://www.tiktok.com/@kallaway.marketing', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7711376618417130782', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'mordern plybook tool for building 7-figure personal brands', 'mordern plybook tool for building 7-figure personal brands', 'mordern plybook tool for building 7-figure personal brands', '2026-11-23T14:39:41.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7711376618417130782') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7709513851745750302', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'here is how ro plan your next 60 days of content as a business owner', 'here is how ro plan your next 60 days of content as a business owner', 'here is how ro plan your next 60 days of content as a business owner', '2026-11-18T14:11:12.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7709513851745750302') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7709138639619509535', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'Heres the easiest way to find new formats that are not currently used in your nitch', 'Heres the easiest way to find new formats that are not currently used in your nitch', 'Heres the easiest way to find new formats that are not currently used in your nitch', '2026-11-17T13:55:11.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7709138639619509535') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7708778925740150047', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'the i the ultimate script writing format for short-form content', 'the i the ultimate script writing format for short-form content', 'the i the ultimate script writing format for short-form content', '2026-11-16T14:39:19.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7708778925740150047') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7708530504366099725', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'this is the ultimate guidelin for improving your text hooks', 'this is the ultimate guidelin for improving your text hooks', 'this is the ultimate guidelin for improving your text hooks', '2026-11-15T22:35:18.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7708530504366099725') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7708170578271735071', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'these are the top 6 storytelling formats if you wanna grow your perrsonal brand faster', 'these are the top 6 storytelling formats if you wanna grow your perrsonal brand faster', 'these are the top 6 storytelling formats if you wanna grow your perrsonal brand faster', '2026-11-14T23:18:37.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7708170578271735071') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7706902495485807903', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'this are the only 3 things you need in your hook if you want your videos to drive more sales', 'this are the only 3 things you need in your hook if you want your videos to drive more sales', 'this are the only 3 things you need in your hook if you want your videos to drive more sales', '2026-11-11T13:17:48.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7706902495485807903') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7706226174216719647', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'these are the 6 modt imortant metrices that maters for content performance', 'these are the 6 modt imortant metrices that maters for content performance', 'these are the 6 modt imortant metrices that maters for content performance', '2026-11-09T17:33:20.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7706226174216719647') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7705510980360391967', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'Heres how to write hook so good its basically unskipable', 'Heres how to write hook so good its basically unskipable', 'Heres how to write hook so good its basically unskipable', '2026-11-07T19:18:01.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7705510980360391967') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7703560808797703455', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'this is the best database in the world for short-form video references.', 'this is the best database in the world for short-form video references.', 'this is the best database in the world for short-form video references.', '2026-11-02T13:10:21.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7703560808797703455') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7702466115955379486', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'this is the ultimate story telling hack for educational content', 'this is the ultimate story telling hack for educational content', 'this is the ultimate story telling hack for educational content', '2026-10-30T14:22:23.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7702466115955379486') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7701724684831755551', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'this is how to get people addicted to your storrytelling, even if you talk about super boring topics', 'this is how to get people addicted to your storrytelling, even if you talk about super boring topics', 'this is how to get people addicted to your storrytelling, even if you talk about super boring topics', '2026-10-28T14:25:15.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7701724684831755551') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7699869751488564511', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'this is how to get people truely addicted to your storytelling', 'this is how to get people truely addicted to your storytelling', 'this is how to get people truely addicted to your storytelling', '2026-10-23T14:27:10.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7699869751488564511') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7698931462661246238', 'd22ad151-17c5-5a71-a87c-f2bdc2353240', 'tiktok', 'the reason your videos dont hold attention is because youre using the wrong storry arc', 'the reason your videos dont hold attention is because youre using the wrong storry arc', 'the reason your videos dont hold attention is because youre using the wrong storry arc', '2026-10-21T01:46:07.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@kallaway.marketing/video/7698931462661246238') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('d195ed3c-733b-504e-ac74-62af0e69226e', 'content-creation', 'youtube', 'Kallaway', '@kallawaymarketing', 'https://www.youtube.com/@kallawaymarketing', 'UCg5WjzrwxRRUUDf7WHKPzsA', 491000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('nok9rnFQcb4', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to create hooks better than 99% of people', 'Get my free guide on how to build a winning content system (1B+ views, 2M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/107 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 2M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/107
Work with me: https://kallaway.co/academy

In this video, I break down the full playbook for making winning hooks. I cover 6 tips for immediately improving your hooks, the 6 best hook formats, the 6 power words that winning hooks all have, and the 4 biggest hook mistakes to avoid.

RESOURCES MENTIONED:
• Sandcastles (social media supertool): https://sandcastlesai.com/56
• Sandcastles Tutorials/Demos: https://help.sandcastles.ai/
• Join my Short Form Academy (work with me 1:1): https://kallaway.co/academy 
• Short-Form Hooks Masterclass (2 hours, 37+: pages of notes) https://lu.ma/sfa-hooks

Video Time Stamps:
0:00 Intro
0:45 6 tips to improve your hooks
15:26 6 best hook formats
34:45 6 hook power words
47:17 4 hook mistakes
1:00:43 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/107
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• https://www.youtube.com/watch?v=Cnk9NQ8JpCs
• https://www.youtube.com/watch?v=gEdt3AGLWjI
• https://www.youtube.com/watch?v=vwlK6MbdAto


1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-11-04T14:00:11Z', 3690, '[]'::jsonb, 'https://i.ytimg.com/vi/nok9rnFQcb4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=nok9rnFQcb4') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('nok9rnFQcb4', 59070, 1412, 75);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('tKRDZqXgLcQ', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'You Will Hate This, But It’ll Grow Your Social Media 10x Faster', 'Get my free guide on how to build a winning content system (1B+ views, 2M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/106 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 2M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/106
Work with me: https://kallaway.co/academy

In this video, I break down 6 nonobvious ways to find alpha in the content world (as AI slop continues to takeover the feeds)

RESOURCES MENTIONED:
• Join Short Form Academy - https://kallaway.co/academy 
• Try Sandcastles (risk-free) - https://sandcastlesai.com/106
• Official Sandcastles plugin in Claude - https://claude.ai/directory/sandcastles
• Official Sandcastles plugin in ChatGPT - https://chatgpt.com/plugins/plugin_asdk_app_6ac6c34ef58c8191afc54996f1954124 
• Install the Sandcastles plugin in Claude, ChatGPT, Grok and any other AI platform - https://help.sandcastles.ai/category/mcp 
• Hire My Editors: https://forms.gle/LQC12nuQ7NbBoQPk7

Video Time Stamps:
0:00 Intro
0:39 Visual Moats
4:36 Cadence
8:46 Antislop Protocol
11:51 Idea Quality
15:15 High Taste Volume
17:58 Four S''s of Hookwriting 
19:51 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/106
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-10-29T15:56:04Z', 1228, '[]'::jsonb, 'https://i.ytimg.com/vi/tKRDZqXgLcQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=tKRDZqXgLcQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('tKRDZqXgLcQ', 143205, 2333, 116);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('w-RgtfUnYVo', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'Give Me 24 Minutes, I''ll Give You 10,000 Hours of Content Strategy', 'Join my 4 week live content growth challenge: https://kallaway.co/launch Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/104 Get my free guide on how to build a winning content system (1B+ views, 2M+ followers): https://shortformsy…', 'Join my 4 week live content growth challenge: https://kallaway.co/launch
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/104
Get my free guide on how to build a winning content system (1B+ views, 2M+ followers): https://shortformsystem.co 
Work with me: https://kallaway.co/academy

In this video, I break down 8 unpopular tips for growing faster on social media that work surprisingly well.

RESOURCES MENTIONED:
• Join Short Form Launch (learn my content systems closes 10/25) - https://kallaway.co/launch 
• Join Short Form Academy (1:1 coaching with me, includes SF Launch access) - https://kallaway.academy 
• Sandcastles: https://sandcastles.ai 
• Sandcastles MCP Instructions (for any AI platform): https://help.sandcastles.ai/category/mcp 
• Sandcastles Official Claude Connector: https://claude.ai/directory/sandcastles 
• Sandcastles Official ChatGPT Connector - https://chatgpt.com/plugins/plugin_asdk_app_6ac6c34ef58c8191afc54996f1954124 

Video Time Stamps:
0:00 Intro
0:45 Content Formula Consistency
3:54 Use AI for the input, not the output
6:21 Be better, stay better
11:30 Frame your videos around value
13:09 Stop studying the biggest creators
15:32 Use CTAs in every video
18:32 Stop going viral
21:06 Stop copying other people''s work the wrong way
23:53 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/104
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-10-22T13:00:34Z', 1459, '[]'::jsonb, 'https://i.ytimg.com/vi/w-RgtfUnYVo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=w-RgtfUnYVo') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('w-RgtfUnYVo', 62708, 1131, 55);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('WluuZB_ck9Q', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to Master Storytelling (Beginner to Advanced)', 'Join my 4 week live content growth challenge: https://kallaway.co/launch Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/104 Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsy…', 'Join my 4 week live content growth challenge: https://kallaway.co/launch
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/104
Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Work with me: https://kallaway.co/academy

In this video, I break down 4 of the most valuable storytelling frameworks to help you improve the quality and effectiveness of your content.

RESOURCES MENTIONED:
• Join my 4-week content growth challenge (closes 10.25): https://kallaway.co/launch 
• Storytelling Template Database: https://www.content.game/c/shortform-storytelling-templates
• Short Form System: https://shortformsystem.co   
• Sandcastles: https://sandcastlesai.com/22

Video Time Stamps:
0:00 Intro
2:00 6 core storytelling techniques
12:27 Dopamine ladders
33:23 Dopamine Addiction Loops
53:27 7 Biggest Storytelling Mistakes
1:06 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/104
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-10-14T13:00:27Z', 4014, '[]'::jsonb, 'https://i.ytimg.com/vi/WluuZB_ck9Q/maxresdefault.jpg', 'https://www.youtube.com/watch?v=WluuZB_ck9Q') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('WluuZB_ck9Q', 80769, 1993, 76);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('vmsDhY9ITlI', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The ‘Invisible’ Hook That Makes Your Videos Impossible to Skip (Subliminal Influence)', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/102 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/102
Work with me: https://kallaway.co/academy

In this video, I break down the 6 methods for improving your hook using the lock-in zone

RESOURCES MENTIONED:
• The Psychology of Killer Hooks (Video): https://www.youtube.com/watch?v=pNIYikmYsyw 
• Meta Ads Creative Studio: https://bit.ly/kallawaymetadsstudio 
• Storytelling Principles Doc: https://www.content.game/c/storytelling-principles 
• Join Short Form Academy (SFA): https://onefactor.ai/kallaway/academy 
• Kallaway Marketing on IG: https://instagram.com/kallawaymarketing 


Video Time Stamps:
0:00 Intro
2:29 Lock-In Zone Method #1
4:49 Lock-In Zone Method #2
7:12 Lock-In Zone Method #3
12:22 Lock-In Zone Method #4
14:44 Lock-In Zone Method #5
17:36 Lock-In Zone Method #6
21:22 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/102
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-09-30T13:00:36Z', 1324, '[]'::jsonb, 'https://i.ytimg.com/vi/vmsDhY9ITlI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=vmsDhY9ITlI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('vmsDhY9ITlI', 74036, 1485, 69);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('S-7VkwSU0gs', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'If I only had 90 days to build a personal brand, I’d do this', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/100 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/100
Work with me: https://kallaway.co/academy

In this video, I break down the exact personal brand growth playbook I''d run for the next 90 days. This is the exact system I personally ran on https://instagram.com/kallawaymarketing to scale from 0 to 100K followers in my first 5 months

RESOURCES MENTIONED:
• Personal Brand Positioning Canvas - https://www.content.game/c/positioningcanvas 
• Work with me (Strategy Call) - https://cal.com/kallaway/kallaway-strategy-1-hour-session 
• Short Form Academy - https://onefactor.ai/kallaway/academy 
• Sandcastles - https://sandcastlesai.com/101
• Sandcastles Collections - https://sandcastles.ai/collections 

Video Time Stamps:
0:00 Intro
1:39 Positioning Q1: Objective/Game
3:46 Positioning Q2: Audience Target
5:56 Positioning Q3: Personal Brand Pillars
18:30 Content Strategy
26:42 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/101
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-09-23T13:00:14Z', 1632, '[]'::jsonb, 'https://i.ytimg.com/vi/S-7VkwSU0gs/maxresdefault.jpg', 'https://www.youtube.com/watch?v=S-7VkwSU0gs') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('S-7VkwSU0gs', 108812, 2020, 61);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('94ezZMYPzls', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'I Reversed Engineered Social Media Algorithms', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/100 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/100
Work with me: https://kallaway.co/academy

In this video, I break down the tactical content shifts to activate the algorithms to push your content (and get more reach/conversion). Drop a 👨🏻‍🍳 if you think I cooked

RESOURCES MENTIONED:
• How Social Algorithms Work (Detail) - https://www.youtube.com/watch?v=8cQidXgtGmU 
• Niche Interviewer Claude Skill - https://www.content.game/c/nicheinterviewer 
• Work With Me To Scale Your Personal Brand (For Business Owners): https://onefactor.ai/kallaway/academy 
• Book a 1:1 Content Strategy Session with me: https://cal.com/kallaway/kallaway-strategy-1-hour-session 

Video Time Stamps:
0:00 Intro
0:55 How Algorithms Work
2:43 Driving More Conversions
11:42 Driving More Virality
18:52 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/100
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-09-16T13:00:07Z', 1178, '[]'::jsonb, 'https://i.ytimg.com/vi/94ezZMYPzls/maxresdefault.jpg', 'https://www.youtube.com/watch?v=94ezZMYPzls') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('94ezZMYPzls', 56717, 1133, 71);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('W--tE9w_N_A', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to Become A Master Storyteller (It''ll Blow Up Your Business)', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/99 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/99
Work with me: https://kallaway.co/academy

In this video, I break down the 6 best storytelling frameworks, specifically for driving conversion (leads and sales) from your content. Tried my best to drop gems. Drop a 👨🏻‍🍳 in the comments if you think I cooked

RESOURCES MENTIONED:
• My Entire Short-Form System (https://shortformsystem.co)
• Work with me 1:1 (https://onefactor.ai/kallaway/academy) 

Video Time Stamps:
0:00 Intro
0:35 Avatar Framing
5:23 Broad To Narrow Framework
10:00 Double Aha
12:04 Emotional Transformation Response
14:39 Double Zoom Out
18:04 Buyer Psychology
20:01 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/99
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-09-09T13:00:15Z', 1236, '[]'::jsonb, 'https://i.ytimg.com/vi/W--tE9w_N_A/maxresdefault.jpg', 'https://www.youtube.com/watch?v=W--tE9w_N_A') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('W--tE9w_N_A', 83067, 1716, 82);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('SJ0OtNuUzls', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The BEST & WORST Advice for Growing on Social Media', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/98 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/98
Work with me: https://kallaway.co/academy

In this video, I break down the best and worst advice for growing on social media (with explanations for how to take advantage/apply the learnings to grow faster). Drop a 👨🏻‍🍳 in the comments if you think I cooked

RESOURCES MENTIONED:
• Work with me (to scale your leads on social media): https://onefactor.ai/kallaway/academy 
• My Short Form System (free): https://shortformsystem.co 
• My Full Content Ideation System (starts at 24:10): https://www.youtube.com/watch?v=vwlK6MbdAto 
• Sandcastles MCP for Claude: https://sandcastles.ai/mcp  
• My Data-Driven Content Workflow: https://www.youtube.com/watch?v=vwlK6MbdAto
• Collections: Top Short-Form Video Examples: https://sandcastles.ai/collections 
• Hire My Video Editors: https://forms.gle/9F6gQ3GJpDd4FtzRA 

Video Time Stamps:
0:00 Intro
0:45 More Views = More Dollars
3:01 Give Away All Info For Free
5:25 Focus on Hooks Most
6:47 Boosting Posts
8:34 Using Data
11:41 Copying Others
13:39 Pick Open Niche
15:35 Don''t Use CTAs
17:10 Make Trending Formats
18:59 More Time Spent = Better Videos
21:06 You Are The Niche
22:36 Hire Editors ASAP
23:38 Settings, Hashtags, Posting Times
24:40 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/98
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-09-03T13:00:34Z', 1534, '[]'::jsonb, 'https://i.ytimg.com/vi/SJ0OtNuUzls/maxresdefault.jpg', 'https://www.youtube.com/watch?v=SJ0OtNuUzls') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('SJ0OtNuUzls', 88145, 1442, 101);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('1ilMGCxJBQY', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The NEW Personal Brand Strategy Dominating Social Media in 2026', 'Get my free guide on building a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/95 Work with me: https://kallaway.co/academy', 'Get my free guide on building a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/95
Work with me: https://kallaway.co/academy

In this video, I break down how to become micro-famous in any niche. Most of you don''t want fame, you want micro-fame. This video explains what micro-fame is, why it''s easier to get famous fast in this era, and the 2 most important strategy exercises to become micro-famous in your niche. Emptied the tank on this one. Drop a 👨🏻‍🍳 in the comments if you think I cooked

RESOURCES MENTIONED:
• Kallaway’s Short Form System (free):  https://shortformsystem.co
• Sandcastles: https://sandcastlesai.com/95
• Sandcastles Collections: https://app.sandcastles.ai/collection/04f52cc5-dd9a-4116-92ed-9a8e80384c19 // https://app.sandcastles.ai/collection/265882b8-40f4-483d-b569-2c7798a73fa8 
• Work With Kallaway in Short Form Academy: https://onefactor.ai/kallaway/academy 
• Sandcastles Tutorials:
    - Building Your Watchlist: https://help.sandcastles.ai/channels
    - Setting Up Dashboard: https://help.sandcastles.ai/dashboard 
    - Deep Analyzing Your Channel: https://youtu.be/Cnk9NQ8JpCs?si=qKbenMlElzTHm_MB&t=452 

Video Time Stamps:
0:00 Intro
1:05 What is micro-fame?
3:39 Why is micro-fame easier now?
8:40 How to build a unique strategic position (live example)
21:10 How to make the content faster (321 Strategy)
28:19 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/95
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-08-12T13:00:21Z', 1770, '[]'::jsonb, 'https://i.ytimg.com/vi/1ilMGCxJBQY/maxresdefault.jpg', 'https://www.youtube.com/watch?v=1ilMGCxJBQY') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('1ilMGCxJBQY', 122933, 2954, 91);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('pNIYikmYsyw', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The Psychology of Killer Hooks', 'Get my free guide on building a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/94 Work with me: https://kallaway.co/academy', 'Get my free guide on building a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/94
Work with me: https://kallaway.co/academy

In this video, I break down the psychology of winning hooks and a boatload of super deep tactics for optimizing your text, spoken, and visual hooks. Emptied the tank on this one. Drop a 👨🏻‍🍳 in the comments if you think I cooked

RESOURCES MENTIONED:
• Kallaway’s Short Form System: https://shortformsystem.co
• Sandcastles (The Best Social Media Growth Tool Ever Invented): https://sandcastles.ai/94
• How To Install the Sandcastles Social Media Plugin (MCP) in Claude: https://help.sandcastles.ai/mcp 
• Sandcastles Collections Example (Visual Hooks — Unusual First Image): https://app.sandcastles.ai/collection/df22b370-6111-483c-a604-a6820b3b7aab 

Video Time Stamps:
0:00 Intro
0:52 What is Interrupt Theory
2:09 The 4 S''s of Hookwriting
4:56 Triple Hook Method
7:02 Text Hook Sauce
16:28 Spoken Hook Sauce
23:11 Visual Hook Sauce
26:11 Lock-in Zone
30:04 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/94
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-08-05T13:00:28Z', 1891, '[]'::jsonb, 'https://i.ytimg.com/vi/pNIYikmYsyw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pNIYikmYsyw') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('pNIYikmYsyw', 245344, 7718, 178);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('fVsl4ZKCPik', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'Everything I Learned Growing From 0 to 2M+ Followers in 3 Years', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/93 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/93
Work with me: https://kallaway.co/academy

In this video, I break down the 8 biggest lesson''s I''ve learned from 3 years in the entrepreneurial trenches. I''ve gone as all-in as possible during this span and have picked up several nonobvious learnings that I wanted to share. Drop a 👨🏻‍🍳 in the comments if you think I cooked

RESOURCES MENTIONED:
• Learn My Systems To Win Faster On Short-Form - https://onefactor.ai/kallaway/academy
• Learn My Systems To Win Faster On Long-Form - https://kallaway.co/youtublueprint 

Video Time Stamps:
0:00 Intro
0:58 Lesson 1
6:42 Lesson 2
9:14 Lesson 3
14:40 Lesson 4
17:55 Lesson 5
20:23 Lesson 6
21:44 Lesson 7
24:22 Lesson 8
26:03 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/93
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

Helpful Claude Skills For Content (Free):
• Watch this video for an overview: https://www.youtube.com/watch?v=Cnk9NQ8JpCs

1. Deep Channel Analysis (Instructions: https://www.content.game/c/deepchannelanalysis)
2. Bullseye Builder (Instructions: https://www.content.game/c/bullseye-builder)
3. Outlier Video Pulse (Instructions: https://www.content.game/c/outliervideopulse)
4. Creator Breakout Detector (Instructions: https://www.content.game/c/creator-breakout-skill)
5. Hook Machine (Instructions: https://www.content.game/c/the-hook-machine)

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallaway.marketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-07-23T13:00:20Z', 1622, '[]'::jsonb, 'https://i.ytimg.com/vi/fVsl4ZKCPik/maxresdefault.jpg', 'https://www.youtube.com/watch?v=fVsl4ZKCPik') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('fVsl4ZKCPik', 26718, 1285, 106);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('pSIY9ngEZC8', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The ONLY 4 Things You Need to Make Sales from EVERY Video', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/89 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/89
Work with me: https://kallaway.co/academy

In this video, I break down the 4 things you need in place to turn views into dollars with content. It''s called The Attention Conversion Funnel. Drop the 👨🏻‍🍳 in the comments if you think I cooked.

RESOURCES MENTIONED:

• Kallaway’s Guide To Lead Magnets (free): https://www.content.game/c/lead-magnets  

Video Time Stamps:
0:00 Intro
1:08 Step 1: Bullseye Signaling
5:46 Step 2: Trust Bank & Trust Ladder
14:20 Step 3: The Clear Ramp
19:16 Step 4: Aligned Offer
24:55 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/89
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-06-24T13:00:12Z', 1601, '[]'::jsonb, 'https://i.ytimg.com/vi/pSIY9ngEZC8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pSIY9ngEZC8') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('pSIY9ngEZC8', 23406, 970, 59);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('LvuoNlYRs7g', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to Make ANY Topic Addictive on Social Media (The Illusion of Novelty)', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/88 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try risk-free): https://sandcastlesai.com/88
Work with me: https://kallaway.co/academy

In this video, I break down the Illusion of Novelty framework. This is the best way to make any boring topic seem maximally interesting. Drop the chef if you think I cooked.

RESOURCES MENTIONED:

• The Illusion of Novelty Doc: https://www.content.game/c/illusion-of-novelty 
• Sandcastles (try risk-free): https://sandcastlesai.com/88
• Sandcastles MCP Plugin Installation Instructions: https://help.sandcastles.ai/mcp 
• How I Use Sandcastles In Claude (For Hooks): https://www.youtube.com/watch?v=a7VjpIqq8Xk 
• How to work with me: https://onefactor.ai/kallaway/academy  

Video Time Stamps:
0:00 Intro
0:52 What Makes Content Addictive?
2:10 Step 1: New Reveal + Outcome Mapping
5:54 Step 2: Contrast Framing
8:23 Step 3: Urgency (Turbo Button)
11:08 Step 4: Bullseye Proof
13:56 Step 5: Protect The Illusion
17:36 Live Example
22:06 How To Measure Success
22:53 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/88
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database you can feed into AI) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-06-18T13:00:10Z', 1659, '[]'::jsonb, 'https://i.ytimg.com/vi/LvuoNlYRs7g/maxresdefault.jpg', 'https://www.youtube.com/watch?v=LvuoNlYRs7g') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('LvuoNlYRs7g', 111331, 4722, 174);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('KyC8r-zitVE', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The Neuroscience of Addictive Storytelling (And How to Master It)', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/81 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/81
Work with me: https://kallaway.co/academy

In this video, I breakdown the neuroscience of addictive storytelling. 4 step loop. Please use the magical powers taught in this video responsibly

RESOURCES MENTIONED:

• Storytelling Template Database: https://www.content.game/c/shortform-storytelling-templates 
• Short Form System: https://shortformsystem.co  

Video Time Stamps:
0:00 Intro
1:07 How Dopamine Actually Works
2:37 The 4 Step Addiction Loop
7:20 Live Example (The Prince & The Flower)
13:25 How To Tactically Apply This Framework
20:37 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/81
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-04-22T13:00:44Z', 1308, '[]'::jsonb, 'https://i.ytimg.com/vi/KyC8r-zitVE/maxresdefault.jpg', 'https://www.youtube.com/watch?v=KyC8r-zitVE') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('KyC8r-zitVE', 389159, 20546, 669);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7pCEsr-0KIw', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'If You Don''t Understand Psychology, You Don''t Understand Social Media', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/61 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/61
Work with me: https://kallaway.co/academy

In this video, I share the 8 of the most effective psychology "hooks" (principles) for getting viewers to trust you more and watch for longer. These are hooks in the direct sense, more like guiding principles for "hooking attention"

RESOURCES MENTIONED:

1. WavyWorld (free content community for business owners): https://skool.com/wavyworld

Video Time Stamps:
0:00 Intro
0:39 Principle 1: Desire Mapping
3:18 Principle 2: The Lightbulb Effect
5:47 Principle 3: Mirroring Effect // Emulation
8:58 Principle 4: Personalization
11:10 Principle 5/6: Proof/Hit Rate
13:24 Principle 7: Familiarity
14:26 Principle 8: One Standard Deviation
17:00 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/61
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-11-06T14:00:23Z', 1054, '[]'::jsonb, 'https://i.ytimg.com/vi/7pCEsr-0KIw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=7pCEsr-0KIw') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('7pCEsr-0KIw', 51829, 2444, 87);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('SnUZdT3EpPg', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to WIN on Social Media as a Business Owner in 2026 (Nobody Teaches this)', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/55 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/55
Work with me: https://kallaway.co/academy

In this video, I breakdown the 4 social media strategies you should be using as a business owner. We explore how to pick which is best for you and which content to make in each strategy so that you grow your business faster

RESOURCES MENTIONED:

• Join WavyWorld, a community with 33K entrepreneurs looking to improve their content (free invite link): https://skool.com/wavyworld
• Sandcastles AI (try it free) - https://sandcastlesai.com/55
• Kallaway''s Game Theory Video - https://www.youtube.com/watch?v=o2nP0lfIsso
• Vault of Sandcastles tutorials - https://help.sandcastles.ai/

Video Time Stamps:
0:00 Intro
0:34 The 4 social media strategies for business owners
3:25 The 2 business games
8:39 How do I pick which social media strategy is right for me? (entertainment vs education content)
14:31 Do I use a personal brand account or traditional brand account?
19:43 Kallaway''s Modern Marketing Funnel
22:50 How do I know which content to make so that it works well based on my strategy? (sandcastles.ai)
28:30 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/55
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-09-24T13:30:29Z', 1869, '[]'::jsonb, 'https://i.ytimg.com/vi/SnUZdT3EpPg/maxresdefault.jpg', 'https://www.youtube.com/watch?v=SnUZdT3EpPg') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('SnUZdT3EpPg', 36764, 1405, 172);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('pirnGDCZD3Y', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'The Science-Based Method To Create Irresistible Ideas', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/52 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/52
Work with me: https://kallaway.co/academy

In this video, I breakdown my full process for finding viral content ideas. This is the big one -- the most valuable video I''ve made in a long time. If you implement this full Idea Mining System, you will grow significantly faster on social media

RESOURCES MENTIONED:

• Sandcastles (code KALLAWAY) - https://sandcastlesai.com/52
• Free vault of Sandcastles in-depth demos and tutorials - https://help.sandcastles.ai/

Video Time Stamps:
0:00 Intro
0:47 What is a video idea? (7 Idea Legos)
2:55 The 3 Step Idea Mining System
3:04 Step 1: Outlier Research
4:15 Step 2: Analyze Outliers (across lego bricks)
6:07 Step 3: Hold Winners, Remix Losers
7:08 What makes Idea Mining process difficult?
8:04 Diving into the tactical process 
8:33 Best places to find outlier videos (2x2 matrix)
12:01 How do we actually do this outlier research process?
12:36 Sandcastles.ai makes this idea research 100x easier
15:09 How to analyze winning videos on sandcastles.ai
16:19 The best filter settings for finding outliers on sandcastles.ai
17:11 How to analyze outlier videos found on sandcastles.ai? 
21:21 Idea Mining Process Recap
23:42 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/52
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-09-04T13:30:53Z', 1519, '[]'::jsonb, 'https://i.ytimg.com/vi/pirnGDCZD3Y/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pirnGDCZD3Y') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('pirnGDCZD3Y', 100089, 3664, 353);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('0f6_pRAIJjI', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to write a script so good viewers can’t stop watching', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/48 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/48
Work with me: https://kallaway.co/academy

In this video, I share the 3 biggest scriptwriting mistakes holding back your videos, and share tactical tips for improving them instantly

RESOURCES MENTIONED:

• Join WavyWorld (Free invite: https://skool.com/wavyworld) - I built a free community for entrepreneurs to get better at content together. Currently at 29,100 members with 59 free video lessons
• Take my short-form hooks masterclass (2 hours, 37 pages of notes, 400+: hooks database): https://lu.ma/sfa-hooks

Video Time Stamps:
0:00 Intro
0:32 The Storyflow Problem
6:33 The Comprehension Problem
10:54 The Speed to Value Problem
14:44 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/48
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-08-07T13:30:00Z', 1014, '[]'::jsonb, 'https://i.ytimg.com/vi/0f6_pRAIJjI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=0f6_pRAIJjI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('0f6_pRAIJjI', 74697, 3022, 133);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('96HQjrqA_s4', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'Storytelling Tactics Top Creators Use To Hook You', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/30 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/30
Work with me: https://kallaway.co/academy

In this video, I share 9 storytelling tactics the top 1% of creators use to hook you. Once you know them, your content will dramatically improve

RESOURCES MENTIONED:
• Hire Kallaway Editors - https://forms.gle/TAYRJkV116Q5xois9
• WavyWorld - I built a free community for creators & entrepreneurs to get better at content together. Currently at 16,300 members. Free invite: https://skool.com/wavyworld

Video Time Stamps:
0:00 Intro
0:25 Tactic 1: Comprehension Maxing (Mr. Beast)
2:41 Tactic 2: Hawk Eye Narratives (Christopher Nolan: Interstellar)
4:57 Tactic 3: Metaphors & Visual Examples (Steve Jobs)
8:30 Tactic 4: Common Ground (Casey Neistat & Ali Abdaal)
10:56 Tactic 5: Simpler Words, Simpler Ideas (Ryan Trahan)
12:54 Tactic 6: Visual Stun Gun (MKBHD & Mr. Whosetheboss)
14:13 Tactic 7: Value Compression (Alex Hormozi)
15:30 Tactic 8: Come with Proof (Alex Hormozi)
17:08 Tactic 9: Contrast (Dave Chapelle)

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/30
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-04-02T13:30:10Z', 1127, '[]'::jsonb, 'https://i.ytimg.com/vi/96HQjrqA_s4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=96HQjrqA_s4') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('96HQjrqA_s4', 55401, 2346, 125);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('35SPFdc1eXY', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How to Master the Art of Speaking (and blow up your content)', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/23 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/23
Work with me: https://kallaway.co/academy

In this video, I breakdown the 13 most helpful tips for leveling up your delivery and presence on camera.

This is one of those things that goes unnoticed, but makes a huge difference between good and great content.

Resources Mentioned In The Video:
1. WavyWorld (My free content community for entrepreneurs): If you''re interested in learning how to level up your own videos, I made a free community with video like this one. Here''s a free invite link: https://skool.com/wavyworld

2. Content Department (https://content.game): If you want to get an edge as a creator & learn about content trends/formulas before everyone else

Equipment:
• Shure SM7B Mic - https://amzn.to/42RDpwF
• XLR Cable - https://amzn.to/42RTWRb
• Low-Profile Desk Boom Arm - https://amzn.to/3QbMTLP
• Rode Procaster 2 - https://amzn.to/42XrRIt
• Logic Pro X - https://www.apple.com/logic-pro/
• Wood Veneer Hub Panels - https://www.thewoodveneerhub.com/

Video Time Stamps:
0:00 Intro
0:52 Voice Confrontation
1:58 Best Mental Approach for Recording
2:42 Dropping Phrases
3:40 Teleprompter or Not?
5:46 Rhythm Mix
6:41 Common Vocal Patterns
9:53 Clarity
10:43 2x Delivery Style
11:46 My Audio Setup & Workflow
15:55 Low Pass Filter
17:04 Excitability
17:43 Still and Center
18:01 Visual Studio Setup for Contrast

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/23
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-02-12T14:30:02Z', 1203, '[]'::jsonb, 'https://i.ytimg.com/vi/35SPFdc1eXY/maxresdefault.jpg', 'https://www.youtube.com/watch?v=35SPFdc1eXY') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('35SPFdc1eXY', 146565, 6599, 332);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('wgXGimZvDa4', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', '7 Storytelling Mistakes That Are KILLING Small Creators', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/22 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/22
Work with me: https://kallaway.co/academy

In this video, I breakdown the 7 biggest storytelling mistakes holding back small creators from blowing up.

Sandcastles (AI Storytelling Assistant): I''m building a storytelling assistant that will help you make better short-form content faster (will save 60-90 mins per video) [https://sandcastlesai.com/22]

Hire a Video Editor Like Mine: These graphics make a massive difference in my videos. My editors are absolutely cracked. If you want to hire a video editor like mine, fill out this form: https://forms.gle/TAYRJkV116Q5xois9

Video Time Stamps:
0:00 Intro
0:27 The Traditional Story Arc Is A Lie
4:30 Jumbling The W’s
7:13 Rebuys & Rehooking
9:46 Heroes vs Villains
10:30 Nobody To Root For
11:24 Atomic Shareability
12:35 Painting The Picture

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/22
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-02-06T14:30:25Z', 818, '[]'::jsonb, 'https://i.ytimg.com/vi/wgXGimZvDa4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=wgXGimZvDa4') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('wgXGimZvDa4', 158479, 7470, 411);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('bqzd0h0gmU0', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'How ‘Regular’ People Are Making Millions From Social Media', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/79 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/79
Work with me: https://kallaway.co/academy

In this video, I breakdown the 6 non-obvious ways normal people are using social media to build 7-figure businesses. Enjoy!

RESOURCES MENTIONED:

• Social Platforms Video: https://youtu.be/mbX4W5G0BPs?si=-fg7f4Bpoum16PUH
• Short-Form Formats Database: https://www.content.game/c/shortformformats 
• Get My Short-Form Content System: https://shortformsystem.co 
• Get My Long-Form Content System: https://kallaway.co/youtubeblueprint 
• Sandcastles: https://sandcastlesai.com/79

Video Time Stamps:
0:00 Intro
0:55 Single Platform Focus
3:28 Fish Where The Fish Are
4:54 Short-Form Formats
6:26 Offer First
9:51 Timeline Expansion
11:20 Build Systems Aggressively
18:56 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/79
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2026-04-01T13:30:22Z', 1274, '[]'::jsonb, 'https://i.ytimg.com/vi/bqzd0h0gmU0/maxresdefault.jpg', 'https://www.youtube.com/watch?v=bqzd0h0gmU0') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('bqzd0h0gmU0', 51669, 1868, 118);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('acEJRhZBSVk', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'Everything you know about content is (probably) wrong', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/58 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/58
Work with me: https://kallaway.co/academy

In this video, I walkthrough 5 of the biggest content myths, traps and pitfalls that hold people back from growing faster on social media and YouTube. These are non-obvious, but once you hear them, they''ll help you a ton.

RESOURCES MENTIONED:

1. Sandcastles (social media growth tool): https://sandcastlesai.com/58
2. Sandcastles Tutorials/Demos: https://help.sandcastles.ai/
3. WavyWorld (free content community for business owners): https://skool.com/wavyworld


Video Time Stamps:
0:00 Intro
0:31 Mistake #1: Speed vs Size
2:31 Mistake #2: Idea Originality
5:06 Mistake #3: Algorithm Myths
8:05 Mistake #4: Content Legos
10:31 Mistake #5: Wrong Mindset
11:50 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/58
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-10-16T13:30:03Z', 741, '[]'::jsonb, 'https://i.ytimg.com/vi/acEJRhZBSVk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=acEJRhZBSVk') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('acEJRhZBSVk', 35105, 1561, 284);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('AsKD_YPxnbw', 'd195ed3c-733b-504e-ac74-62af0e69226e', 'youtube', 'Social Media Is Evolving', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/47 Work with me: https://kallaway.co/academy', 'Get my free guide on how to build a winning content system (1B+ views, 1M+ followers): https://shortformsystem.co 
Use Sandcastles to grow 10x faster on social media (try free): https://sandcastlesai.com/47
Work with me: https://kallaway.co/academy

In this video, I share the 10 biggest shifts that I see changing in the next era of social media. For each trend, I built a pendulum that shows where we currently are in 2025, and where we''re headed in the coming years.

RESOURCES MENTIONED:
1. WavyWorld (free content community for business owners): https://skool.com/wavyworld
2. Sandcastles (AI video scriptwriting tool): https://sandcastlesai.com/47
3. Short Form Academy (learn short-form video on Instagram, Tiktok, LinkedIn, YouTube, Facebook): https://shortform.academy 


Video Time Stamps:
0:00 Intro
0:40: Content Strategy Trends
1:31 Social Shift 1: Approach
3:11 Social Shift 2: Testing
3:50 Social Shift 3: Niche
5:02 Social Shift 4: Format
6:13 Editing, Pacing, Visuals Trends
6:23 Social Shift 5: Formats
8:50 Social Shift 6: Visual Pacing
11:19 Social Shift 7: Editing Style
13:56 Brand Social Strategy
14:16 Social Shift 8: From Who
15:17 Social Shift 9: Number of Accounts
15:56 Social Shift 10: Approach
17:09 Summary

-------------------------
SHORT-FORM VIDEO (IG, TIKTOK, LINKEDIN, YOUTUBE, FACEBOOK):
• Try Sandcastles, my short-form research & storytelling tool that will help you grow 10x faster on social media (free trial): https://sandcastlesai.com/47
• Take my Short-Form Hooks Masterclass (2 hours long, comes with 37 pages of notes and 400+ hook database) - https://lu.ma/sfa-hooks
• Hire my short-form video editors - https://forms.gle/TAYRJkV116Q5xois9
• Join my Short-Form Academy (designed for business owners to build a social media content machine that turns views into leads & sales) - https://shortform.academy

LONG-FORM VIDEO (YOUTUBE)
• Get my Complete YouTube System (designed for business owners to build a Youtube content machine that turns views into leads and sales): https://kallaway.co/youtubeblueprint
• Hire My YouTube Strategist (Ideas, Titles, Thumbnails) - https://forms.gle/5SRPsikwE3RR21Ep8
• Hire My Thumbnail Designer - https://forms.gle/GJp2XmUmVM9dxZzYA
• Hire My YouTube Video Editors - https://forms.gle/TAYRJkV116Q5xois9

----------
Follow me (1M+ followers)

For Content/Marketing Strategy:
• Instagram: https://www.instagram.com/kallawaymarketing
• TikTok: https://tiktok.com/@kallawaymarketing
• YouTube: https://www.youtube.com/@kallawaymarketing
• LinkedIn: https://www.linkedin.com/in/kanekallaway
• X: https://www.x.com/kanekallaway
• Threads: https://www.threads.net/kallaway

For Tech & AI:
• Instagram: https://instagram.com/kallaway
• YouTube: https://youtube.com/@kallawaytech
• TikTok: https://tiktok.com/@kanekallaway', '2025-07-30T13:30:11Z', 1178, '[]'::jsonb, 'https://i.ytimg.com/vi/AsKD_YPxnbw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=AsKD_YPxnbw') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('AsKD_YPxnbw', 68650, 2916, 284);

commit;
