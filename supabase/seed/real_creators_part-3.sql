-- CreatorLab import, part 3 of 3. Run the parts in order.

begin;

-- ===== tech-news: 7 creators, 40 videos =====
insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'tech-news', 'youtube', 'Unbox Therapy', '@unboxtherapy', 'https://www.youtube.com/@unboxtherapy', 'UCsTcErHg8oDvUnTzoqsYeNw', 25700000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('WN14ucoXt1U', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'Unboxing the YESOUL T5 Treadmill...', 'Unboxing The YESOUL T5 Longevity Treadmill The YESOUL T5 Series Longevity Treadmill combines up to 30% Auto Incline with low-impact incline walking for Zone 2 Training. ZoneFinder™ helps with your training zone, while ZoneSync™ helps you stay in Zone 2. With a 12.4 MPH max spe…', 'Unboxing The YESOUL T5 Longevity Treadmill
The YESOUL T5 Series Longevity Treadmill combines up to 30% Auto Incline with low-impact incline walking for Zone 2 Training. ZoneFinder™ helps with your training zone, while ZoneSync™ helps you stay in Zone 2. With a 12.4 MPH max speed, 2.0 HP continuous power, and 4.5 HP peak power, the T5 delivers consistent performance for longer workouts and extra power for faster runs and high-intensity intervals.

Also includes Free Screen Mirroring, Built-In Entertainment Mode, Foldable Design, and No Mandatory Subscription.

Speed & Power:
- 12.4 MPH MAX SPEED — Built for Faster Runs, Intervals & More.
- 2.0 HP CONTINUOUS — Consistent Power for Longer Workouts.
- 4.5 HP PEAK — Extra Headroom When Intensity Rises.

Explore the T5 Series: https://bit.ly/4CfO8QE

🎁 Exclusive YESOUL Offers — Code: UNBOX

Offer 1: FREE YESOUL Yoga Mat
- Get a FREE YESOUL Yoga Mat with a qualifying T5 Series treadmill purchase.
- How to redeem:** Add both the T5 Series treadmill and the YESOUL Yoga Mat to your cart, then enter code **UNBOX** at checkout.
-*Important: The yoga mat MUST be added to your cart before applying the code.
- Valid through November 30, 2026. US only.

Offer 2: Exclusive Discount
- Use code UNBOX for an exclusive discount on selected YESOUL products:
  - G1M Plus Bike/G1M MAX
  - T3S Plus Treadmill
  - R1M Plus Rowing Machine

Shop YESOUL: https://bit.ly/4tefFOn

#YESOUL #T5Series #Zone2Training #TreadmillReview#foldabletreadmill #longevitytraining  #lowimpactcardio 

Thanks to Yesoul for partnering on this video.', '2026-11-21T16:08:41Z', 616, '[]'::jsonb, 'https://i.ytimg.com/vi/WN14ucoXt1U/maxresdefault.jpg', 'https://www.youtube.com/watch?v=WN14ucoXt1U') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('WN14ucoXt1U', 422564, 514, 39);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('Wwq6lvZ5PPA', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'In Search of the Ultimate Pocket Camera... XTRA MUSE 2 PRO', 'Want to upgrade your setup? Search XTRA MUSE 2 PRO on Amazon or TikTok Shop right now, or check it out here: https://xtracamera.com/products/xtra-muse-2-pro', 'Want to upgrade your setup? Search XTRA MUSE 2 PRO on Amazon or TikTok Shop right now, or check it out here: https://xtracamera.com/products/xtra-muse-2-pro

Is this the ultimate pocket vlogging camera? 

Some features include dual-lens system with 3x optical zoom, a 3-axis mechanical gimbal for smooth footage, and 17-stop dynamic range in X-Log 3 color mode. It also comes with 103GB of built-in storage right out of the box, so no SD card required. Get cinematic quality right in your pocket.

#XTRACAMERA #XTRAMUSE2PRO #VloggingCamera #TechReview

Thanks to @XTRATech_Official for partnering on this video.

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-11-17T16:06:16Z', 599, '[]'::jsonb, 'https://i.ytimg.com/vi/Wwq6lvZ5PPA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=Wwq6lvZ5PPA') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('Wwq6lvZ5PPA', 989611, 958, 104);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('Qw6UAdGL14s', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'This Thing Runs On Android?', 'Check out the early access to the Singcore S1 Pro, from Ultimea here: https://www.kickstarter.com/projects/singcore/singcore-s1-pro-all-in-one-ai-karaoke-machine?ref=4ivuqw Pre-order yours for only $9.90 USD.', 'Check out the early access to the Singcore S1 Pro, from Ultimea here: https://www.kickstarter.com/projects/singcore/singcore-s1-pro-all-in-one-ai-karaoke-machine?ref=4ivuqw
Pre-order yours for only $9.90 USD. 

Thanks to Ultimea for partnering on this video. 

#ultimea #sing #karaoke #speaker  

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-11-02T18:33:27Z', 553, '[]'::jsonb, 'https://i.ytimg.com/vi/Qw6UAdGL14s/maxresdefault.jpg', 'https://www.youtube.com/watch?v=Qw6UAdGL14s') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('Qw6UAdGL14s', 971694, 1623, 119);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('8ULFcCPEBAM', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'Smartphones Are Getting OUT of Control…', 'Check out the new vivo X500 Pro Max here: https://vivo-official.com/products/x500promax', 'Check out the new vivo X500 Pro Max here: 
https://vivo-official.com/products/x500promax

Take your phones camera capabilities to a new level with the ZEISS telephoto photography kit.

Thanks to @vivo_global for partnering on this video
#vivo #vivox500 #vivox500pro #vivox500promax 

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-10-28T14:44:56Z', 832, '[]'::jsonb, 'https://i.ytimg.com/vi/8ULFcCPEBAM/maxresdefault.jpg', 'https://www.youtube.com/watch?v=8ULFcCPEBAM') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('8ULFcCPEBAM', 1369996, 3950, 247);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('gyUqMHDSn2I', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'Apple iPhone Duo Unboxing and First Impressions', 'Get your Ridge tech gear, built for your day-to-day - use my link http://ridge.com/UNBOXTHERAPY', 'Get your Ridge tech gear, built for your day-to-day - use my link http://ridge.com/UNBOXTHERAPY 

Latercase - https://latercase.com/products/iphone-duo-maglock-case

Sponsored by Ridge

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-10-24T16:30:22Z', 1289, '[]'::jsonb, 'https://i.ytimg.com/vi/gyUqMHDSn2I/maxresdefault.jpg', 'https://www.youtube.com/watch?v=gyUqMHDSn2I') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('gyUqMHDSn2I', 1551876, 12102, 1134);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('LiQGoDnv2EQ', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'Xiaomi 18 Pro Max Unboxing: The REAL Pro Max?', 'Xiaomi''s version of a Pro Max. It has a rear display, 200MP Leica cameras, a privacy display, triple speakers and a Snapdragon chip built for gaming. So which is the real Max?', 'Xiaomi''s version of a Pro Max. It has a rear display, 200MP Leica cameras, a privacy display, triple speakers and a Snapdragon chip built for gaming. So which is the real Max?

0:00 Intro
0:28 Unboxing & What’s in the Box
1:40 Design
3:03 Snapdragon Elite Extreme Gen 6
3:20 Battery & Weight vs iPhone
4:17 200MP Leica Cameras
5:23 Privacy Display
6:59 Display & 120Hz
7:35 Ultrasonic Fingerprint Sensor
8:03 Triple Speakers
8:52 Rear Display
9:31 Rear Camera Selfies & Vlogging
11:34 Gaming Test: Blood Strike
13:05 Final Thoughts: Which Is the Real Max?

Thanks to @xiaomi  for partnering on this video

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-10-16T15:26:17Z', 817, '[]'::jsonb, 'https://i.ytimg.com/vi/LiQGoDnv2EQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=LiQGoDnv2EQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('LiQGoDnv2EQ', 1321098, 4962, 369);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('6NLHltCsTsQ', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'The Ultimate All-In-One Workstation', 'MWE Lab Chairs - https://mwelab.com/ Sponsored by Wispr Flow! Wispr Flow is faster and more efficient than any other dictation tool. Download Wispr Flow today for free and get 1 month of Wispr Flow Pro with unlimited words: https://ref.wisprflow.ai/unbox-therapy-yt-6', 'MWE Lab Chairs - https://mwelab.com/
Sponsored by Wispr Flow! Wispr Flow is faster and more efficient than any other dictation tool. Download Wispr Flow today for free and get 1 month of Wispr Flow Pro with unlimited words: https://ref.wisprflow.ai/unbox-therapy-yt-6

When you sign up, Wispr Flow will ask how you heard about them. Select YouTube and Unbox Therapy, so they know we sent you. 

#wisprflowpartner @wisprflow 

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-10-08T17:36:19Z', 702, '[]'::jsonb, 'https://i.ytimg.com/vi/6NLHltCsTsQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=6NLHltCsTsQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('6NLHltCsTsQ', 1064992, 1967, 147);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('I6nYySJavMg', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'iPhone 18 Pro Max Unboxing: Worth the Upgrade?', 'Thanks to Notibility for partnering on this video. Use our discount code: UNBOX25 for 25% off your plan https://notability.com/ambassador/unbox #notability', 'Thanks to Notibility for partnering on this video. Use our discount code: UNBOX25 for 25% off your plan https://notability.com/ambassador/unbox #notability

latercase: https://latercase.com/

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-09-19T19:45:26Z', 677, '[]'::jsonb, 'https://i.ytimg.com/vi/I6nYySJavMg/maxresdefault.jpg', 'https://www.youtube.com/watch?v=I6nYySJavMg') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('I6nYySJavMg', 1377402, 6187, 461);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('pJzuFc52oWk', '1b6023be-4dde-5082-a6a3-c2e85fb8f54a', 'youtube', 'iPhone 18 Pro Unboxing: A Detail Nobody Noticed...', 'Protect your privacy on the network level with Cape at https://cape.co/unboxtherapy. Use code UNBOX33 at checkout for 33% off your first 6 months', 'Protect your privacy on the network level with Cape at https://cape.co/unboxtherapy. Use code UNBOX33 at checkout for 33% off your first 6 months

latercase: https://latercase.com/

FOLLOW ME IN THESE PLACES FOR UPDATES
Twitter - http://twitter.com/unboxtherapy
Instagram - http://instagram.com/unboxtherapy
TikTok - http://tiktok.com/@unboxtherapyofficial', '2026-09-19T18:36:59Z', 941, '[]'::jsonb, 'https://i.ytimg.com/vi/pJzuFc52oWk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pJzuFc52oWk') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('pJzuFc52oWk', 1468192, 7971, 379);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('1e398380-2750-55ce-a4cd-7bf8530d3848', 'tech-news', 'youtube', 'Marques Brownlee', '@mkbhd', 'https://www.youtube.com/@mkbhd', 'UCBJycsmduvYEL83R_U4JriQ', 21500000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('cc5C8hRblBY', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'I''m Starting Over', 'Last video from this studio. Ever. Next up: A fresh start', 'Last video from this studio. Ever. Next up: A fresh start

Black Friday sale at Ridge and get up to 49% off at https://ridge.com/MKBHD

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-11-23T21:10:51Z', 1296, '[]'::jsonb, 'https://i.ytimg.com/vi/cc5C8hRblBY/maxresdefault.jpg', 'https://www.youtube.com/watch?v=cc5C8hRblBY') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('cc5C8hRblBY', 3967391, 108452, 3806);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('KTDJiVpSDTI', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'Can You Trust MKBHD?', 'Can you trust MKBHD videos? Part 2.', 'Can you trust MKBHD videos? Part 2.

Part 1: https://youtu.be/5nLWTVTwOhY

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-11-17T18:39:57Z', 859, '[]'::jsonb, 'https://i.ytimg.com/vi/KTDJiVpSDTI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=KTDJiVpSDTI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('KTDJiVpSDTI', 3936036, 92343, 6591);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('hdMszZ2ah5Q', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'Macbook PROLED Review: It''s Not About That', 'Incredible laptop. But don''t get distracted.', 'Incredible laptop. But don''t get distracted.

Protect and make your MacBook unique with dbrand at https://dbrand.com/shop/macbook

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

Laptop provided by Apple for review.

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-11-11T18:43:56Z', 914, '[]'::jsonb, 'https://i.ytimg.com/vi/hdMszZ2ah5Q/maxresdefault.jpg', 'https://www.youtube.com/watch?v=hdMszZ2ah5Q') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('hdMszZ2ah5Q', 6745819, 78813, 4178);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('g6Die8gVFn0', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'OLED iPad Mini is The Most Apple Product They''ve Ever Appled', 'iPad Mini 8 Refresh gets a big refresh and a big price bump and a LOT of laddering', 'iPad Mini 8 Refresh gets a big refresh and a big price bump and a LOT of laddering

Protect and make your iPad more user-friendly with dbrand at https://dbrand.com/shop/ipad

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

Tablet provided by Apple for review.

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-11-03T14:01:31Z', 780, '[]'::jsonb, 'https://i.ytimg.com/vi/g6Die8gVFn0/maxresdefault.jpg', 'https://www.youtube.com/watch?v=g6Die8gVFn0') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('g6Die8gVFn0', 12542968, 126609, 9973);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('ESABTN4VtrA', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'iPhone Duo Review: First Generation Fun!', 'What it''s actually like to use the first folding iPhone - Duo', 'What it''s actually like to use the first folding iPhone - Duo

Don’t miss Ridge’s friends and family sale at https://ridge.com/MKBHD
Protect your iPhone Duo at https://dbrand.com/duo 

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5
Phone provided by Apple for review.

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD

0:00 Intro
1:13 First Generation
3:21 The Hardware
14:18 The Apps Situation
20:02 What It''s Good At
25:11 Conclusion', '2026-10-21T12:00:52Z', 1745, '[]'::jsonb, 'https://i.ytimg.com/vi/ESABTN4VtrA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=ESABTN4VtrA') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('ESABTN4VtrA', 13811640, 209504, 15591);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('scwlR0QHGOk', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'The NEW Tesla Roadster: My Honest Reaction', 'Tesla doesn''t do marketing. Until they do.', 'Tesla doesn''t do marketing. Until they do.

Hagerty video: https://youtu.be/22rvpUecLts?si=z7reGi_rtH9mG3R3

Auto Focus: http://youtube.com/AutoFocus

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-10-17T02:09:23Z', 1365, '[]'::jsonb, 'https://i.ytimg.com/vi/scwlR0QHGOk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=scwlR0QHGOk') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('scwlR0QHGOk', 12579561, 193099, 22930);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('_0G4OG39XjI', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'WTF is a Googlebook?', 'New laptops are dropping left and right! Let''s talk about Google''s entry.', 'New laptops are dropping left and right! Let''s talk about Google''s entry.

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

Asus Googlebook provided by Asus for review.
XPS Googlebook provided by Dell for review.

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-10-08T21:00:40Z', 853, '[]'::jsonb, 'https://i.ytimg.com/vi/_0G4OG39XjI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=_0G4OG39XjI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('_0G4OG39XjI', 9248551, 102640, 8131);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('rayrrXot17M', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'Nothing Headphone 1 Pro: They Copied the Wrong Thing!', 'Nothing decided to join the $400+ ANC headphone ranks, and made just one bizarre mistake...', 'Nothing decided to join the $400+ ANC headphone ranks, and made just one bizarre mistake...

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

Headphones provided by Nothing for review.

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-09-29T01:01:35Z', 860, '[]'::jsonb, 'https://i.ytimg.com/vi/rayrrXot17M/maxresdefault.jpg', 'https://www.youtube.com/watch?v=rayrrXot17M') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('rayrrXot17M', 6344842, 66181, 2721);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('pOX1l1edBME', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'The Apple Watch Has a Problem', 'Apple Watch series 12 has a new "Audio Intelligence" feature, let''s talk about it', 'Apple Watch series 12 has a new "Audio Intelligence" feature, let''s talk about it

Apple vs the AI Race: https://youtu.be/eWKY0OnPByg

MKBHD Merch: http://shop.MKBHD.com

Apple wearable study: https://www.apple.com/health/pdf/Heart_Rate_Accuracy_Study_2026.pdf

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

Watch provided by Apple for review.

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-09-22T17:49:42Z', 906, '[]'::jsonb, 'https://i.ytimg.com/vi/pOX1l1edBME/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pOX1l1edBME') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('pOX1l1edBME', 5697421, 77593, 7050);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('e1q-TuHdc4Y', '1e398380-2750-55ce-a4cd-7bf8530d3848', 'youtube', 'Dear YouTube!', 'Let''s talk about this new video A/B testing feature', 'Let''s talk about this new video A/B testing feature

The Waveform podcast: https://youtu.be/UD9X5WxZ5nE?si=OxzE_7V_D1xiy_hD&t=3870

MKBHD Merch: http://shop.MKBHD.com

Playlist of MKBHD Intro music: https://goo.gl/B3AWV5

~
http://twitter.com/MKBHD
http://instagram.com/MKBHD
http://facebook.com/MKBHD', '2026-09-30T14:42:19Z', 743, '[]'::jsonb, 'https://i.ytimg.com/vi/e1q-TuHdc4Y/maxresdefault.jpg', 'https://www.youtube.com/watch?v=e1q-TuHdc4Y') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('e1q-TuHdc4Y', 5909950, 128696, 9597);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('0b76050d-319c-5f62-a130-733d25425c94', 'tech-news', 'youtube', 'Linus Tech Tips', '@linustechtips', 'https://www.youtube.com/@linustechtips', 'UCXuqSBlHAE6Xw-yeJA0Tunw', 16900000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('Ip5EiqbuBpE', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'Mac Gaming is Solved But Not By Apple', 'Buy the brand new Tech Sling and earphone pouch and get a $30 LTT Gift card!', 'Buy the brand new Tech Sling and earphone pouch and get a $30 LTT Gift card!

US: https://www.lttstore.com/products/tech-sling-earphone-pouch-free-30-gift-card-bundle
Global: https://global.lttstore.com/products/tech-sling-earphone-pouch-30-gift-card-bundle

Apple Macs are very powerful machines. But not all developers port their games over to MacOS. That''s why we tried out FX Steam Launcher, a program that enables Mac gamers to run native SteamOS in a virtualization window! So let''s try it out, and see how it scales across different generations of Apple Silicon...

Discuss on the forum: https://linustechtips.com/topic/1644698-mac-gaming-is-solved-but-not-by-apple/

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Why we lyin
1:24 Is this new tech?
2:50 ITS WORKING!!!
3:03 Portal 2
3:56 Risk of Rain 2
5:50 Tape to Tape
8:20 M2 Air
10:47 Neo
13:30 M6
16:27 Takeaways', '2026-11-23T17:00:11Z', 1149, '[]'::jsonb, 'https://i.ytimg.com/vi/Ip5EiqbuBpE/maxresdefault.jpg', 'https://www.youtube.com/watch?v=Ip5EiqbuBpE') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('Ip5EiqbuBpE', 1963348, 23719, 1299);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('f0KK_4AaqLQ', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'I Played GTA VI at 60 FPS', 'Click this link https://boot.dev/?promo=LTTBFCM and use my code LTTBFCM to get 45% off your first payment for boot.dev.', 'Click this link https://boot.dev/?promo=LTTBFCM and use my code LTTBFCM to get 45% off your first payment for boot.dev.

After checking out GTA VI on every console yesterday, we figured that there must be a way to play the hottest new video game at a higher frame rate than it''s current 30 FPS. And there is! With the help of Veyra, we were able to inject DLSS 5 Neural Rendering AND NVIDIA Frame Gen into our capture card feed of GTA VI. 

Discuss on the forum: https://linustechtips.com/topic/1644641-i-played-gta-vi-at-60-fps/

Check out Veyra: https://github.com/Likely7/Veyra-NRVideo

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
1:29 DLSS 5 and FrameGen ON
5:33 Lets try some Anti-Aliasing
7:47 What about Super Resolution
9:31 YASSIFY TIME
11:18 Two Layers of DLSS 5
12:08 FOUR LAYERS
13:43 1 DLSS Layer and 120 FPS
14:22 PS5 Pro time
16:27 Outro', '2026-11-20T15:12:44Z', 1008, '[]'::jsonb, 'https://i.ytimg.com/vi/f0KK_4AaqLQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=f0KK_4AaqLQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('f0KK_4AaqLQ', 2350740, 28997, 2385);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('E4RGVl86E2U', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'Comparing GTA VI on Every Console', 'Save big on your SIHOO Doro C300 Pro V2 during their Black Friday Sale and save an additional 10% using code 2611LTT', 'Save big on your SIHOO Doro C300 Pro V2 during their Black Friday Sale and save an additional 10% using code 2611LTT

- US: https://www.sihoo.com/LTT2611
- EU: https://eu.sihoo.com/LTT2611
- UK: https://uk.sihoo.com/LTT2611
- DE: https://de.sihoo.com/DELTT2611
- FR: https://fr.sihoo.com/FRLTT2611

Amazon (6% OFF Code: SIHOODEAL): https://www.amazon.com/dp/B0H7HS5JN1?maas=maas_adg_BFF5D0DF6FD20BF4017A68CF6040938B_afap_abs&ref_=aa_maas&tag=maas&th=1

Buy some overpriced stickers at https://www.shortlinus.com

GTA VI IS HERE BABYYYYYYYYYYYY. We''re celebrating the launch for the most anticipated game of 2026 the only way we know how - by testing it on EVERY SINGLE CONSOLE. We''re talking PS5, PS5 Pro, XBOX Series X, and XBOX Series S. RIP PC and Nintendo gamers, maybe one day we''ll get to experience GTA VI

Discuss on the forum: https://linustechtips.com/topic/1644608-comparing-gta-vi-on-every-console/

Check out our Channel Partners:

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
1:27 OFF TO THE RACES
2:54 NPCs look REAL GOOD
4:00 The Hair
4:57 PS5 vs PS5 Pro
7:55 XBOX Series S vs XBOX Series X
11:11 XBOX Series X vs PS5
13:20 No need to compare Series S & PS5 Pro
13:58 Pricing Woes
15:13 This game is pretty cool
16:47 How does 30FPS feel?
17:44 BIG SCREEN YEAAAAAA
20:46 Outro', '2026-11-19T06:30:17Z', 1257, '[]'::jsonb, 'https://i.ytimg.com/vi/E4RGVl86E2U/maxresdefault.jpg', 'https://www.youtube.com/watch?v=E4RGVl86E2U') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('E4RGVl86E2U', 3215200, 39118, 3928);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('vDnogMSwbk4', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'He DECLINED an AMD $5000 Ultimate Tech Upgrade', 'Thanks to AMD for being a great partner and sponsoring this series! Check out their latest offerings at https://lmg.gg/f6PMg', 'Thanks to AMD for being a great partner and sponsoring this series! Check out their latest offerings at https://lmg.gg/f6PMg

Go to https://bit.ly/4kP1ux0 to enter the sweepstakes to win an AMD Ryzen 7 5800X3D 10th Anniversary Edition CPU plus an ASRock B550 Rock WiFi ATX motherboard!

Mr. Luke Lafreniere won an $5,000 AMD Ultimate Tech Upgrade and gave it to his brother! Join Linus and Luke as they build a custom NAS for family photos, upgrade the Wi-Fi, and mount new TVs. Somehow, milk made it into the budget too.

Discuss on the forum: https://linustechtips.com/topic/1644600-he-declined-an-amd-5000-ultimate-tech-upgrade/

Check out the stuff from Luke''s upgrade:

NAS and networking
- AMD Ryzen 7 5800X3D 10th Anniversary Edition: https://geni.us/UBxA4
- ASUS Prime B550M-A WiFi II motherboard: https://geni.us/PiLBUm
- Thermalright PA 120 SE Black CPU cooler: https://geni.us/VT9yk
- Corsair Vengeance LPX 16GB DDR4-2133 RAM: https://geni.us/Uv4Ez
- TEAMGROUP NV5000 500GB NVMe SSD: https://geni.us/tGABb
- Seagate IronWolf 4TB NAS hard drive: https://geni.us/eQaKWC
- ASUS Prime AP201 case: https://geni.us/bTFM
- CyberPower battery backup: https://geni.us/58Q8RAS
- TP-Link Deco X50 AX3000 mesh Wi-Fi 6 system: https://geni.us/bZ64

TVs, audio and smart home
- TCL 55″ M8L Pro Mini LED TV: https://geni.us/pg9asHL
- TCL 43″ Q51K QLED Google TV: https://geni.us/28oYrR
- Fractal Design Scape wireless gaming headset: https://geni.us/W5LoNb
- Cozyla Calendar Plus 2: https://geni.us/N27rUu0

Furniture and home
- Silk & Snow Organic Mattress: https://geni.us/QjnTM
- IKEA KALLAX shelf unit: https://geni.us/QtFaMjY
- IKEA LACK wall shelf: https://geni.us/8ffVb

Miscellaneous
- Chemical Guys Car Wash Kit with Foam Blaster 6: https://geni.us/Cy9bw
- Morimoto X3B LED third brake light: https://geni.us/md4JUln
- Fairlife 2% ultra-filtered milk: https://geni.us/uDmNBx


Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 - Intro
1:16 - AMD giveaway!
1:55 - got Milk?
2:20 - close the fridge Linus 
2:58 - a new bed
6:00 - classic Luke
6:55 - Richard''s office
7:25 - Got em
7:43 - Building the NAS
8:50 - AMD Ryzen 7 5800X3D
16:18 - Ikea.. Skyrim collab?
17:30 - another broken bed...
18:30 - mounting the TVs
21:00 - Linus loosing his screws
22:25 - upgrading the Wi-Fi
23:50 - new office chair
24:50 - setting up the TV
27:01 - mounting the shelves
27:56 - setting up the digital calendar
28:22 - replacing the cooler... now?
29:13 - Linus loosing more screws
30:13 - setting up HexOS?
31:52 - new audio gear!
33:40 - Final thoughts', '2026-11-18T20:06:11Z', 2068, '[]'::jsonb, 'https://i.ytimg.com/vi/vDnogMSwbk4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=vDnogMSwbk4') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('vDnogMSwbk4', 2562843, 38131, 1627);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('skdOVaiRq1c', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'Don’t Break Into my Grandparents House', 'Thanks to Omada for sponsoring this video! Buy an Omada Fusion Pro 2.5G and get $200 off an 8MP NVR kit or $150 off a 5MP NVR kit. Or grab a Fusion Pro 2.5G PoE and get 30% off up to 4 Omada cameras! Check out the launch deals here: https://tplinksystemsinc.pxf.io/L0LzG0LMGLTT', 'Thanks to Omada for sponsoring this video! Buy an Omada Fusion Pro 2.5G and get $200 off an 8MP NVR kit or $150 off a 5MP NVR kit. Or grab a Fusion Pro 2.5G PoE and get 30% off up to 4 Omada cameras! Check out the launch deals here: https://tplinksystemsinc.pxf.io/L0LzG0LMGLTT

With deliveries, caretakers, and all sorts of visitors coming and going, Linus wants to make sure his grandparents'' home is safe and sound. Naturally, that means turning a simple security camera upgrade into a full-blown networking project with Omada. What could possibly go wrong?

- Fusion Pro 2.5G PoE: https://tplinksystemsinc.pxf.io/DW6jrbLTT
- Omada T8S4-4T Security Camera Kit: https://tplinksystemsinc.pxf.io/rEKAxDLTT
- Fusion Gateways: https://tplinksystemsinc.pxf.io/9V6b3jLTT
- Omada Surveillance Cameras: https://tplinksystemsinc.pxf.io/en0OGXLTT

Amazon (US):

- Fusion Pro 2.5G + NVR Kits: https://www.amazon.com/s?maas=maas_adg_CCC03BE64C4E621EAACC021A029438B0_afap_abs&ref_=aa_maas&tag=maas&rh=p_78%3AB0HNRH4N9D%257CB0HN9QS6GF%257CB0HNRFGR8L%257CB0HN98QWBB%257CB0HN91ZC5X&smid=AJ8LMC6YR4HCZ
- Fusion Pro 2.5G + Omada Cameras: https://www.amazon.com/s?maas=maas_adg_2FAD5C8A0B6CBEC8AB9F505E6CE07D12_afap_abs&ref_=aa_maas&tag=maas&rh=p_78%3AB0HNR9G93C%257CB0HNS2XWVY%257CB0HNRNC7S8%257CB0HNR8LYZ2%257CB0HNR4JWD9%257CB0HNRJ3TT5%257CB0HN9CJH2M&smid=AJ8LMC6YR4HCZ

To receive the promotional bundle price on Amazon, add your Omada cameras to your cart first. Amazon does not support mix-and-match for Omada cameras.

What do real users think about Omada Security Cameras and Fusion Pro? Join the discussion on r/Omada_Networks: https://www.reddit.com/r/Omada_Networks/

Discuss on the forum: https://linustechtips.com/topic/1644563-setting-up-affordable-home-security-for-my-grandparents/

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
1:17 What''s the plan?
1:49 SIDE QUEST TIME!
2:09 Planning the setup
2:50 Linus grandparent''s story time
3:32 Omada Fusion Pro 2.5G PoE Gateway
3:53 hakuna matata
4:30 WorkSafe approved
5:10 Running ethernet cables 
6:01 LinusHomeTips
6:29 Definitely WorkSafe approved
6:53 Furniture magic
7:50 Testing the connections?
8:13 Omada T8S4-4T NVR Kit
10:30 Setting up Omada
11:30 Installing the cameras
12:11 It''s the little details that matter
12:30 Testing the camera feeds
14:30 Final thoughts
15:00 Omada launch promos', '2026-11-17T18:03:43Z', 938, '[]'::jsonb, 'https://i.ytimg.com/vi/skdOVaiRq1c/maxresdefault.jpg', 'https://www.youtube.com/watch?v=skdOVaiRq1c') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('skdOVaiRq1c', 1310213, 18444, 902);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('-5rtUVyxH5w', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'Tesla “Hater” Uses Full Self-Driving for a Month', 'Upgrade your setup with Secretlab’s Black Friday & Cyber Monday Sale, running November 12 to December 4! Shop the deals here: https://www.dpbolvw.net/click-101929796-17295612?sid=ltt-pr2-26', 'Upgrade your setup with Secretlab’s Black Friday & Cyber Monday Sale, running November 12 to December 4! Shop the deals here: https://www.dpbolvw.net/click-101929796-17295612?sid=ltt-pr2-26 

Check out our ShortCircuit coverage of each product for a closer look:
TITAN Evo: https://lmg.gg/sctitanevo
MAGNUS Pro: https://lmg.gg/scmagnuspro
ATLAS: https://lmg.gg/scatlas

Linus borrowed a Tesla and let its ''Full Self-Driving'' chauffeur him around for a few weeks days. How did it go? Has it been smooth-sailing, or too much ''Linus, take the wheel''? Let''s watch and find out! Do you think Colton will give back the Porsche?

Discuss on the forum: https://linustechtips.com/topic/1644553-tesla-%E2%80%9Chater%E2%80%9D-uses-full-self-driving-for-a-month/

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
1:56 Tesla Take the Wheel
4:30 We were so close...
5:19 Lunch with the boys
9:23 A Dental Digression
10:10 Can it be TOO sunny?
11:45 Where are we going?
14:30 A little fast...
18:33 Day 13
19:30 I was crazy once...
21:35 I did NOT see that guy!
22:08 Last Day
26:52 That''s why he smells like vanilla
30:00 One Last Drive
33:58 Final Judgement...
36:55 Credits', '2026-11-16T21:30:55Z', 2231, '[]'::jsonb, 'https://i.ytimg.com/vi/-5rtUVyxH5w/maxresdefault.jpg', 'https://www.youtube.com/watch?v=-5rtUVyxH5w') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('-5rtUVyxH5w', 1567592, 24453, 2088);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('XpWfH5Qw1R8', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'I Stepped into my Favorite Games (for Free)', 'Get a free 15-day trial of Odoo’s all-in-one business solution and see how it can make your life easier! Check it out at https://www.odoo.com/ltt', 'Get a free 15-day trial of Odoo’s all-in-one business solution and see how it can make your life easier! Check it out at https://www.odoo.com/ltt

Over the last several years, the VR modding community has been twisting flat-screen classics into fully immersive experiences. Today, I''m putting my stomach (and our test benches) to the test to see if these unofficial mods finally bring us the VR library we''ve been waiting for.

Check out Flat2VR: https://www.flat2vrstudios.com/
Check out CircuitLords Titanfall 2 Mod: https://github.com/CircuitLord/CircuitLordVRModInstaller
Check out BetterVR BotW: https://github.com/Crementif/BotW-BetterVR

Discuss on the forum: https://linustechtips.com/topic/1644499-i-stepped-into-my-favorite-games-for-free/

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
2:05 Inside Expedition 33
3:19 What is this? (UEVR)
3:59 How to make setup easier!
4:52 Inside Breath of the Wild
7:42 Inside Titanfall 2
10:35 Mech time baybeee!
11:56 This guy benches A LOT (Labs)
15:39 Pitfalls with VR Testing
17:06 Conclusion
19:29 Outro', '2026-11-15T17:00:21Z', 1181, '[]'::jsonb, 'https://i.ytimg.com/vi/XpWfH5Qw1R8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=XpWfH5Qw1R8') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('XpWfH5Qw1R8', 1444388, 19169, 1171);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('taBO0I1YBzU', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'Every Samsung Fold Compared', 'Thanks to Samsung Canada for sponsoring this video! Check out the Samsung Z Fold8: https://geni.us/lOTJZrd', 'Thanks to Samsung Canada for sponsoring this video! Check out the Samsung Z Fold8: https://geni.us/lOTJZrd

Linus has been using Galaxy Z Fold phones since the very beginning. They weren''t always the greatest, but throughout the years, these phones have shown significant improvement time and time again. Join us as we take a trip down memory lane and revisit every single Samsung Galaxy Z Fold.

Discuss on the forum: https://linustechtips.com/topic/1644478-every-samsung-fold-compared/

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
0:44 Z Fold 
1:58 Z Fold2 
3:30 Z Fold3 
3:35 Z Fold4
5:00 Z Fold5
5:53 Z Fold6
6:45 Z Fold7
8:35 Z Fold 8
10:25 Outro

Corrections:
9:45 Linus says Silicon-carbide, but it''s a Silicon-Carbon battery', '2026-11-13T17:27:31Z', 644, '[]'::jsonb, 'https://i.ytimg.com/vi/taBO0I1YBzU/maxresdefault.jpg', 'https://www.youtube.com/watch?v=taBO0I1YBzU') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('taBO0I1YBzU', 1462537, 19998, 1030);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('t62ZRncv2d4', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'Imagining A World Without Windows', 'Save Money by Seeing Problems Early! RISION’s Black Friday sale runs from November 19–30, with its biggest discounts of the year, all products included, and savings of up to 45%. https://lmg.gg/Vj0Jq', 'Save Money by Seeing Problems Early! RISION’s Black Friday sale runs from November 19–30, with its biggest discounts of the year, all products included, and savings of up to 45%. https://lmg.gg/Vj0Jq

Amazon US: https://lmg.gg/q4WVJ
Amazon UK: https://lmg.gg/0wT1Y

I imagine it would be pretty dark... In all seriousness, we asked five different people various questions about Windows. Do they use it, general likes and dislikes, if Windows was taken away how would it inconvenience them, etc etc. There was a slew of differing answers.

Check out all the creators:
https://www.youtube.com/@UCrPseYLGpNygVi34QpGNqpA 
https://www.youtube.com/@UCSpFnDQr88xCZ80N-X7t0nQ 
https://www.youtube.com/@UCjgpFI5dU-D1-kh9H1muoxQ 
https://www.youtube.com/@UCw_TDIvTASqbeBwYXtvQLPg 

Discuss on the forum: https://linustechtips.com/topic/1644400-imagine-a-world-without-windows/

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
1:41 What operating systems are others on?
3:44 How important is Windows to you?
5:36 Are you excited to use other OS''s?
7:38 Why is Microsoft losing you?
10:28 What would you miss about Windows?
11:20 What''s your biggest issue with Windows?
11:59 How long would it take to get use to something else?
13:38 Software incompatibility issues
14:45 The world would suffer without Windows
15:51 We''re tired boss
17:13 No way, triple OS boot
17:35 Can they stop the bleeding?
18:13 Do they want to win people back?
19:55 Outro', '2026-11-11T17:01:32Z', 1213, '[]'::jsonb, 'https://i.ytimg.com/vi/t62ZRncv2d4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=t62ZRncv2d4') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('t62ZRncv2d4', 2157612, 36842, 4938);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7hlTu95nOCw', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'I’ve never seen this before (and it’s 20 years old.)', 'Get a free 15-day trial of Odoo’s all-in-one business solution and see how it can make your life easier! Check it out at https://www.odoo.com/ltt', 'Get a free 15-day trial of Odoo’s all-in-one business solution and see how it can make your life easier! Check it out at https://www.odoo.com/ltt

We bought a 20-year-old enterprise server, upgraded it to maximum power, and found some things we’ve never seen in person before.  Did you know you could hot swap MEMORY?!

Discuss on the forum: https://linustechtips.com/topic/1644282-i%E2%80%99ve-never-seen-this-before-and-it%E2%80%99s-20-years-old/


IBM 39Y7256 Voltage Regulator Module: https://geni.us/3SyaA
IBM 38L5916 / 39M5811 DDR2 ECC Server Memory (2GB): https://geni.us/znVcy0
IBM X-Series Processor Heatsink (39M2608 / 26K8805): https://geni.us/irAAt
IBM eServer X-Series Processor Heatsink (26K8805): https://geni.us/IrJ8R

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
2:30 How did you do that?
5:20 Oops?
8:22 Blinkenlights & Storage
10:39 Power & Expansion                              
17:00 A ton of copper
18:30 Xeon time
20:41 It''s still good!
21:14 We need a montage
22:34 This isn''t gonna go well.
25:40 credits', '2026-11-07T17:01:40Z', 1559, '[]'::jsonb, 'https://i.ytimg.com/vi/7hlTu95nOCw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=7hlTu95nOCw') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('7hlTu95nOCw', 1920741, 24684, 1110);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('vDmjw-c_R2k', '0b76050d-319c-5f62-a130-733d25425c94', 'youtube', 'My F-You To Sam Altman', 'Start building your website today! Visit https://squarespace.syuh.net/LTT and use offer code LTT for 50% off Core, Plus, and Advanced annual and monthly plans for the month of November', 'Start building your website today! Visit https://squarespace.syuh.net/LTT and use offer code LTT for 50% off Core, Plus, and Advanced annual and monthly plans for the month of November

Cloud AI has so many issues: Cloud downtime, monthly subscriptions, and not to mention a ton of privacy concerns. So what do you do when you want to still use AI despite all of that? Well, you build a local AI machine... That is if you have the money to fund something like this. We''re building an absolute monster of a local AI workstation today with TWO RTX 5090''s and so much more.

Link to the LABS article: https://www.lttlabs.com/articles/2026/11/02/jarvis-at-home

Discuss on the forum: https://linustechtips.com/topic/1644169-my-f-you-to-sam-altman/

SilverStone ALTA T1 Case: https://geni.us/DYEZ
Intel Xeon w9-3495X Processor: https://geni.us/5vQO
ASUS Pro WS W790E-SAGE SE Motherboard: https://geni.us/39PgIE
NVIDIA GeForce RTX 5090 Founders Edition: https://geni.us/HtbaYs0
SilverStone HELA 3000Rz Power Supply: https://geni.us/0HyBbP

Check out our Channel Partners:

Secretlab 
- Grab a TITAN Evo ergonomic gaming chair:  https://lmg.gg/secretlabltt
- Grab an ATLAS ergonomic office chair:  https://lmg.gg/secretlablttatlas

PIA 
- Get the VPN of our choice: https://www.piavpn.com/ltt

dbrand 
- Buy a "Circuit" series skin for your device: https://dbrand.com/pcb

► SHOP LTT PRODUCTS: https://lttstore.com
► GET EXCLUSIVE CONTENT ON FLOATPLANE: https://lmg.gg/lttfloatplane
► DIVE DEEPER ON THE LTT LABS WEBSITE: https://lmg.gg/labs
► SPONSORS, AFFILIATES, AND PARTNERS: https://lmg.gg/partners

Purchases made through some store links may provide some compensation to Linus Media Group. Affiliate links powered in part by https://affilimate.com/?aid=ghz1izbpb

Linus Sebastian is an investor in Framework Computer, Inc and HexOS by Eshtek.

CHAPTERS
---------------------------------------------------
0:00 Intro
2:13 Linus'' Test bench
3:08 SilverStone Alta T1
5:39 The Motherboard, CPU & RAM
6:30 RTX 5090''s
7:45 Hella RAM
8:17 Installing the CPU & Cooler
10:05 Putting parts in the case
13:37 Side quest with DGX Spark
14:23 Pump & reservoir are mounted
15:05 Putting in the GPUs
16:24 Storage
16:47 Time for the PSU
18:22 Let''s try that again
19:40 Wiring things up
20:46 Whyyyyyyyyyyyyyyyyy
21:53 Filling the loop
22:16 Local AI shenanigans
28:00 Sventlana is working
30:32 Outro


Corrections:
23:30 Always use the official website: https://hermes-agent.nousresearch.com/', '2026-11-02T17:13:11Z', 1850, '[]'::jsonb, 'https://i.ytimg.com/vi/vDmjw-c_R2k/maxresdefault.jpg', 'https://www.youtube.com/watch?v=vDmjw-c_R2k') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('vDmjw-c_R2k', 7381596, 90402, 5555);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('67295d87-dcce-54f4-ab89-723c099eed52', 'tech-news', 'youtube', 'iJustine', '@ijustine', 'https://www.youtube.com/@ijustine', 'UCey_c7U86mJGz1VJWH5CYPA', 7050000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('QTaRLfPa3oc', '67295d87-dcce-54f4-ab89-723c099eed52', 'youtube', 'Touching my Mac! The new PROLED MacBook Pro is here!', '💕 PINK iJUSTINE CABLES HERE: https://geni.us/wnIN 🎥 iJUSTINE EDITING PLUGIN: https://mvfx.co/mKeynote-with-iJustine 🎶 MUSIC I USE - http://share.epidemicsound.com/NNNGs', '💕 PINK iJUSTINE CABLES HERE: https://geni.us/wnIN
🎥 iJUSTINE EDITING PLUGIN:  https://mvfx.co/mKeynote-with-iJustine
🎶 MUSIC I USE - http://share.epidemicsound.com/NNNGs

+: 

http://instagram.com/ijustine
https://tiktok.com/@ijustine
http://twitter.com/ijustine
http://facebook.com/ijustine
https://snapchat.com/add/ijustine
http://youtube.com/samebrain

BECOME A CHANNEL MEMBER: https://www.youtube.com/channel/UCey_c7U86mJGz1VJWH5CYPA/join', '2026-11-05T14:00:35Z', 986, '[]'::jsonb, 'https://i.ytimg.com/vi/QTaRLfPa3oc/maxresdefault.jpg', 'https://www.youtube.com/watch?v=QTaRLfPa3oc') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('QTaRLfPa3oc', 356313, 4999, 378);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'tech-news', 'youtube', 'MrMobile [Michael Fisher]', '@themrmobile', 'https://www.youtube.com/@themrmobile', 'UCSOpcUkE-is7u7c4AkLgqTw', 1280000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('C2995EgRcn8', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'Motorola Signature 27 Hands-On (And Other Tech That’s Worth Your Time)', 'Sponsored by Bambu Lab. 🔥 Bambu Lab Black Friday Sale is live! Get up to 40% off and save up to $450 at https://tidd.ly/4Aj9KtP to start printing your own custom accessories!', 'Sponsored by Bambu Lab. 🔥 Bambu Lab Black Friday Sale is live! Get up to 40% off and save up to $450 at https://tidd.ly/4Aj9KtP to start printing your own custom accessories!


[GADGET GRAB BAG NOVEMBER 2026]

For phone freaks, November 2026 is a smartphone sandwich: on one side, an overpowered Oppo with an accessory ecosystem to augment its crazy camera; and on the other, the most maxed-out Motorola we''ve seen in years, with a design reminiscent of the old Droid Razr and a spec sheet almost nothing else in the States can touch. In this episode of the Gadget Grab Bag, I share early thoughts on both of these, and also give you a glimpse of some other tech accessories worth your time. If you think you''d like a battery charger the size of a credit card, a USB cable that doubles as a phone stand, or an Android smart watch that actually looks good on a wrist, jump on in!


[ABOUT MRMOBILE''S GADGET GRAB BAG NOVEMBER 2026]

This video was produced following a hands-on experience with the Oppo Find X10 Pro Max at a media event in Berlin at IFA 2026, followed by a hands-on with the Motorola Signature 27 at a media event in NYC, followed by real-world testing of all remaining products, ranging several days to several weeks. The products featured are a mix of review samples and items purchased by MrMobile. 

Oppo provided some travel reimbursement and lodging so that MrMobile could attend IFA 2026.

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. No manufacturer provided compensation in exchange for this coverage.


[LINKS - PRODUCTS]

Motorola Signature 27:
https://www.motorola.com/us/en/p/phones/signature/motorola-signature/pmipmka46mo

Motorola Moto Watch Ultra:
https://www.motorola.com/us/en/p/wearables/moto-watch-ultra-2026

Aquavault Charge Card:
https://theaquavault.com/products/credit-card-sized-portable-charger

Statik PowerStand:
https://statik.com/products/powerstand

Samson Go Mic:
https://samsontech.com/products/microphones/usb-microphones/gomic/

Oppo Find X10 Pro Max:
https://www.oppo.com/en/smartphones/series-find-x/find-x10-pro-max/


[LINKS - BAMBU MODELS]

Pocket Watch Stand by Kandor
https://makerworld.com/en/models/3380166-pocket-watch-stand-wood-black

Propeller Modular 7-Blade by Golf_181069460
https://makerworld.com/en/models/2346443-propeller-propeller-modular-7-blade-model

Toroidal Flying Propeller by Abyssal Cactus
https://makerworld.com/en/models/2684692-toroidal-flying-propeller-launcher-high-speed

Clicks Communicator mockup by akkmaharaj:
https://makerworld.com/en/models/2305231-clicks-communicator

Cat Ring Toy Donut – Infinity Ball Loop by Scratchplate 3D
https://makerworld.com/en/models/189281-cat-ring-toy-donut-inifinty-ball-loop

3D Paint Splatter Light Switch Cover by Ada & K
https://makerworld.com/en/models/2340057-3d-paint-splatter-light-switch-cover


[CHAPTERS]

00:00 Motorola Signature 27 
03:02 Motorola Watch Ultra 
05:16 Bambu P2S [Sponsor]
07:33 Aquavault Charge Card
09:09 Statik PowerStand
10:39 Samson Go Mic
11:45 Oppo Find X10 Pro Max
15:34 Outro & Disclosures


[SOCIALIZE]

https://instagram.com/themrmobile
https://threads.net/captain2phones
https://twitter.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]
Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#gadgetgrabbag #motorolasignature27 #oppofindx10promax #statik #chargecard #tech #gadgets #wearabletech #android', '2026-11-20T22:15:09Z', 976, '[]'::jsonb, 'https://i.ytimg.com/vi/C2995EgRcn8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=C2995EgRcn8') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('C2995EgRcn8', 183767, 3691, 311);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('C3VR0-jg0Mo', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'I’ve Used A Galaxy Fold 8 For 3 Months – Here’s How The iPhone Duo Stacks Up', 'Sponsored by Bambu Lab. 🔥 Bambu Lab Black Friday Sale is live! Get up to 40% off and save up to $450 at https://tidd.ly/4Aj9KtP to start printing your own custom accessories!', 'Sponsored by Bambu Lab. 🔥 Bambu Lab Black Friday Sale is live! Get up to 40% off and save up to $450 at https://tidd.ly/4Aj9KtP to start printing your own custom accessories!

[IPHONE DUO VS GALAXY FOLD8]

When I moved into Samsung’s Galaxy Fold8, I got the sensation that there was a ticking clock on how seriously I’d be able to take it. After all, we already knew at that point that Apple would be using the same display, in the same aspect ratio, inside a similar enclosure for its iPhone Duo. And after 7 years of laying back in the cut watching the competition, my expectation was that Apple would dominate so hard with the Duo that the Fold8 would soon seem an embarrassing also-ran. 

Well I’ve carried both of ‘em in my pockets for the past three weeks – from Brooklyn to Waterloo to Florida – to answer the question everyone’s been asking me all season: MrMobile, now that the iPhone folds … are you gonna switch to it? 


[ABOUT MRMOBILE''S IPHONE DUO VS GALAXY FOLD8 COMPARISON]

MrMobile''s iPhone Duo vs Galaxy Fold8 comparison was produced after three months with a Galaxy Fold8 purchased by MrMobile and an iPhone Duo review sample provided by Apple. 

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. Neither Apple nor any other manufacturer provided compensation in exchange for this coverage. 


[BAMBU LABS MODEL LINKS]

Minimal MagSafe Dock for iPhone Duo by Jbo:
https://makerworld.com/en/models/3483203-minimal-magsafe-dock-for-iphone-duo

iPhone MagSafe Stand by EBdesign:
https://makerworld.com/en/models/847736-iphone-magsafe-stand-retro-imac-inspired-design

iPhone Standby Mode Dock (designed with OVERWERK) by Scott Yu-Jan:
https://makerworld.com/en/models/615378-iphone-standby-mode-dock-designed-with-overwerk

Minimalist portable foldable phone stand phone strap and keychain all-in-one by Puresa:
https://makerworld.com/en/models/1734253-minimalist-portable-foldable-phone-stand-phone-str

mobile phone stand. aesthtic wiggle phone rest by Abstractia Design:
https://makerworld.com/en/models/1286644-mobile-phone-stand-aesthtic-wiggle-phone-rest

The Impossible Laptop Stand v2 by Protoprints:
https://makerworld.com/en/models/451998-the-impossible-laptop-stand-v2-fits-a1-mini#profileId-364228

iPhone Duo Mini by Nobod1Studio:
https://makerworld.com/en/models/3422081-iphone-duo-mini-iphone-flip



[CHAPTERS]

00:00 Did the iPhone Duo kill the Galaxy Fold8?
01:05 Revisiting the Review
05:02 Bambu Lab
06:55 App Avalanche (so much fun)
09:55 Android''s bad app rap
12:05 Duo dominates on hardware
13:07 Misc Matters from Mid-Edit MrMobile
14:11 Duo vs Fold = iPhone vs Android
15:25 Outro & Disclosures


[SOCIALIZE]

https://instagram.com/themrmobile
https://threads.net/captain2phones
https://twitter.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]

Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#iphoneduo #galaxyfold8 #galaxyfold #galaxyfold8ultra #iphone18 #iphonefold #iphone #apple #appleevent #mrmobile #foldingphone #foldable', '2026-11-06T23:13:36Z', 966, '[]'::jsonb, 'https://i.ytimg.com/vi/C3VR0-jg0Mo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=C3VR0-jg0Mo') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('C3VR0-jg0Mo', 516584, 10146, 1112);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('NaQ1FE4xhWQ', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'Pixel Watch 5 Review: The Best WearOS Smartwatch?', 'Sponsored by Facer. Visit https://www.facer.io/premium?fp_ref=mrmobile2026 or use code MRMOBILE2026 at www.facer.io/premium to guarantee the best price!', 'Sponsored by Facer. Visit https://www.facer.io/premium?fp_ref=mrmobile2026 or use code MRMOBILE2026 at www.facer.io/premium to guarantee the best price!

[PIXEL WATCH 5 REVIEW]

If you hang out in certain quadrants of the internet, you could be forgiven for believing that smartwatches are dying. (And look, I get it: as I prep for a “dumbphone detox” in December, one of the things I look forward to most is downgrading to a dumbwatch as well.) 

But just like Millennials did not ultimately kill Olive Garden (thank our benevolent breadstick overlords), neither Gen Z nor Alpha is likely to kill the smartwatch. And that’s fortunate, because it means I get to tell you, after two months of wearing it, that Google’s Pixel Watch 5 is a fantastic specimen of this often-misunderstood category. Actually? I think it’s the best WearOS watch you can get.


[ABOUT MRMOBILE''S PIXEL WATCH 5 REVIEW]

This video was produced following seven weeks days with a Pixel Watch 5 review sample provided by Google. It was paired with a Galaxy Fold8, Pixel 11 Pro, and Pixel 11 Pro Fold at various points during the testing process.

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. Neither Google nor any other manufacturer provided compensation in exchange for this coverage. 


[LINKS]

Google Pixel Watch 5 Accuracy Deep-Dive: Most Accurate GPS Watch Ever? [DCRainmaker]:
https://www.dcrainmaker.com/2026/08/google-pixel-watch-5-gps-accuracy-vs-garmin-apple.html


[SOCIALIZE]

https://instagram.com/themrmobile
https://threads.net/captain2phones
https://twitter.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]

Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#pixelwatch5 #pixelwatch #pixel #googlepixel #google #smartwatch #wearable #watch #wristwatch #wearOS #android', '2026-10-26T22:21:01Z', 752, '[]'::jsonb, 'https://i.ytimg.com/vi/NaQ1FE4xhWQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=NaQ1FE4xhWQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('NaQ1FE4xhWQ', 340810, 5011, 400);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('P5_GBTMAbFI', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'iPhone Duo Review: Double-Edged Sword', 'To fully understand the first folding iPhone, we need to revisit another first from 16 years ago. No, not the 2007 iPhone keynote: I’m talking about the iPad debut from January 2010. It was buzzy and exciting in its own way, but even then, people seemed to grasp that it wasn’t…', 'To fully understand the first folding iPhone, we need to revisit another first from 16 years ago. No, not the 2007 iPhone keynote: I’m talking about the iPad debut from January 2010. It was buzzy and exciting in its own way, but even then, people seemed to grasp that it wasn’t the sea change the iPhone had represented. Partially that’s because at launch it was essentially what its critics called it – an oversized iPod Touch. Its main advantage was that it was … big. But people vastly underestimated how big a difference that could make.

All these years later, the iPhone Duo doubles down on the same bet by offering a larger display – only when you need it. That simple promise has been enough to sell foldables to a small audience for the better part of a decade, but always constrained by the critical caveat that if you want your phone to fold, you need to switch to Android.

Well, not anymore. 

I''m MrMobile and I''ve spent a week with the iPhone Duo. During that time, I’ve seen all the promise – and pitfalls – of a product that lives or dies on the same thing that made the iPad: the apps. 


[ABOUT MRMOBILE''S IPHONE DUO REVIEW]

MrMobile''s iPhone Duo Review was produced after a week with an iPhone Duo review sample provided by Apple. Tested on T-Mobile in New York City on a review account also provided by Apple.

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. Neither Apple nor any other manufacturer provided compensation in exchange for this coverage. 


[CHAPTERS]

00:00 The iPad comes to your pocket
01:43 An iPhone (and display) like no other
05:00 Compromised – but quality – cameras
08:08 App optimization and other oddities
11:07 The dream of 2008 is alive in the Duo
13:43 Nuts and bolts: endurance to immersion
16:19 Justifying $2000
18:00 Sponsored by nobody


[SOCIALIZE]

https://instagram.com/themrmobile
https://threads.net/captain2phones
https://twitter.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]

Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#iphoneduo #iphone18 #iphonefold #iphone #apple #appleevent #mrmobile #foldingphone #foldable', '2026-10-21T12:00:18Z', 1212, '[]'::jsonb, 'https://i.ytimg.com/vi/P5_GBTMAbFI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=P5_GBTMAbFI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('P5_GBTMAbFI', 659699, 21055, 1842);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('0RS0Qr8P92M', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'Exclusive: The iPhone Duo''s Display, Exposed', 'Sponsored by Surfshark. Go to https://surfshark.com/mrmobile or use code MRMOBILE at checkout to get 4 extra months of Surfshark!', 'Sponsored by Surfshark. Go to https://surfshark.com/mrmobile or use code MRMOBILE at checkout to get 4 extra months of Surfshark!


[IPHONE DUO DISPLAY DEEP DIVE]

I''m fairly accustomed to spending time with cutting-edge pieces of technology; a much rarer treat is getting the opportunity to talk with the people who brought that tech into existence.

During the Apple Event in Cupertino back in September, I got to sit down with three such people: VP of iPhone Product Design, Rich Dinh; Senior Product Manager for iPhone, Piyush Pratik; and JP Guillou, Senior Director of Display Technology for iPhone. 

During our 20-minute sit down, we delved into every corner of the iPhone Duo''s display technology. How much Samsung had to do with it; how Apple achieved its unusually dramatic satin finish; and how and why the company brought back the under-display camera. I also got some insights into how the execs enjoy their pizza (but not, sadly, whether they''d build an iPhone Flip or an iPhone TriFold next). 

Join me for a rare MrMobile interview – and stay tuned for my iPhone Duo Review coming soon!


[ABOUT MRMOBILE''S IPHONE DUO DISPLAY DEEP DIVE]


MrMobile''s iPhone Duo Display Deep Dive was filmed on-site at Apple HQ in Cupertino California during the September 2026 Apple Event. Production equipment and crew provided by Apple.

MrMobile submitted advance notice of the topics he wanted to cover during this interview including an outline of potential questions – but Apple did not approve (or reject) any questions, and had no editorial input into the content of this video. It has been lightly edited for time.

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. Neither Apple nor any other manufacturer provided compensation in exchange for this coverage. The lone sponsor of this video is Surfshark.


[CHAPTERS]

00:00 Hello from Cupertino
01:47 Why is now the right time for a folding iPhone?
03:00 Aspect ratio: why so squatty?
05:29 Apple vs Samsung
07:47 "Stunningly satin" – the nanotexture
10:42 How durable is the Duo?
13:40 Bringing back the under-display camera
16:54 iPhone Flip vs iPhone TriFold
18:37 Surfshark
20:03 Outro & Disclosures


[SOCIALIZE]

https://instagram.com/themrmobile
https://threads.net/captain2phones
https://twitter.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]

Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#iphoneduo #iphone18 #iphonefold #iphone #apple #appleevent #mrmobile #foldingphone #foldable', '2026-10-15T00:15:07Z', 1233, '[]'::jsonb, 'https://i.ytimg.com/vi/0RS0Qr8P92M/maxresdefault.jpg', 'https://www.youtube.com/watch?v=0RS0Qr8P92M') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('0RS0Qr8P92M', 402213, 8308, 862);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('xxCqvOV-qdU', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'Xiaomi 18 Fold Review: Duo-n''t Be Fooled', 'Sponsored by Lucid. Schedule a demo drive here: https://lucidmotors.com/demo-drive?utm_source=youtube&utm_medium=social&utm_campaign=TDYF&utm_content=MrMobile', 'Sponsored by Lucid. Schedule a demo drive here: https://lucidmotors.com/demo-drive?utm_source=youtube&utm_medium=social&utm_campaign=TDYF&utm_content=MrMobile


[MRMOBILE''S XIAOMI 18 FOLD REVIEW]

Everybody’s talking about the iPhone Duo – and rightly so: Apple’s first foldable is the shot in the arm the category has needed for years, and my early look last month has had me yearning for its late-October release. 

But what if you took the Duo and crammed in an extra camera, a much bigger battery, gave it a hot paint job, and made it available today?

Well, then you’d have the Xiaomi 18 Fold. It’s a massive design departure from an underrated company whose foldables I’ve admired for years, and when I bought this one from a Hong Kong exporter I wondered if it might replace the Samsung Galaxy Fold8 that makes up half of my everyday carry. 

But then something crucial happened: I spent a week actually trying to use it.


[ABOUT MRMOBILE''S XIAOMI 18 FOLD REVIEW]

MrMobile''s Xiaomi 18 Fold Review was produced following roughly ten days with a Xiaomi 18 Fold device purchased by MrMobile. Tested on T-Mobile in New York City and Eastern Long Island, NY. Production device running production software.

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. With the exception of today''s sponsor, Lucid, no company provided additional compensation in exchange for this coverage. 


[CHAPTERS]

00:00 iPhone Duo from an alternate dimension
00:58 Where ya from?
1:48 Hardware as hot as the color
04:50 Lucid
06:36 Software as frustrating as always
09:53 More cameras, better photos
11:40 More phone than we deserve
14:54 Outro & Disclosures


[LINKS]

Setting up your Xiaomi 18 Fold & ANY Other Chinese Phone! [Average Dad]:
https://www.youtube.com/watch?v=jidThdYtZp4


[SOCIALIZE]

https://facebook.com/themrmobile
https://instagram.com/themrmobile
https://threads.com/captain2phones
https://x.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]

Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#xiaomi #xiaomi18fold #foldingphone #foldable #iphoneduo #mrmobile #foldingscreen', '2026-10-08T00:22:55Z', 933, '[]'::jsonb, 'https://i.ytimg.com/vi/xxCqvOV-qdU/maxresdefault.jpg', 'https://www.youtube.com/watch?v=xxCqvOV-qdU') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('xxCqvOV-qdU', 380617, 6491, 608);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('luKNGNqXWiU', 'f77b6be0-dd2c-5b68-abdc-1a5d30c2205d', 'youtube', 'The Tech That Takes Me: What''s In MrMobile''s Bag? (2026-27)', 'Sponsored by Anker. Get your Anker Universal Charger and Anker Travel Charging Station here:', 'Sponsored by Anker. Get your Anker Universal Charger and Anker Travel Charging Station here: 

Buy Anker Universal Charger on US Amazon：https://shop.anker.com/140A1A05campaign_MrMobile_Michael_Fisher_217202

Buy Anker Universal Charger on Anker US official website: https://shop.anker.com/140A1A05campaign_MrMobile_Michael_Fisher_194588

Buy Anker Travel Charging Station on US Amazon：https://shop.anker.com/140A1A05campaign_MrMobile_Michael_Fisher_277611

Buy Anker Travel Charging Station on Anker US official website: https://shop.anker.com/140A1A05campaign_MrMobile_Michael_Fisher_242091


[MRMOBILE’S TRAVEL TECH 2026-27]

Traveler’s luck doesn’t hold out forever, as I was recently reminded during a seven-hour delay at Salt Lake City International Airport on my way to Qualcomm’s latest Summit. But there''s no such thing as down time when you''ve got that hustle grindset, am I right LinkedIn?
Even in the  ethereal otherworld of endless in-betweens that is the modern-day airport, there''s work to be done. So during a lull between the waves of existential dread and ruminating on regrets … I started thinking about all the stuff I take with me that carries me through trips like this.

Believe it or not, it''s been almost 2 years since the last one of these … so, from SLC to the Snapdragon Summit on Maui (yes, I finally got there) to a weekend layover in what feels like my second home, San Francisco … I''m MrMobile, and here’s the Tech That Takes Me for 2026 (and beyond).


[ABOUT MRMOBILE''S TRAVEL TECH 2026-27]

MrMobile''s Travel Tech 2024 video was filmed with review samples from their respective manufacturers, as well as items purchased by MrMobile.

Filmed partially on location during the Qualcomm Snapdragon Summit 2026 in Maui, for which Qualcomm provided travel, lodging and meals.

MrMobile does not offer manufacturers the opportunity to preview, edit or approve content before publication. With the exception of today''s sponsor, Anker, no company provided additional compensation in exchange for this coverage. 


[CHAPTERS]

00:00 Life in an airport
01:11 Low-tech: Pec Pockets
01:48 Earbuds & Cans
03:35 Phones & Phone Accessories
06:30 Anker
07:54 The "Pocket Laptop"
09:34 Defeating Motion Interpolation
12:30 Roku
13:21 Google Fi & Adobe Podcast
15:43 Outro & Disclosures


[PRODUCTS IN THIS VIDEO]


Review samples:

Samsung Galaxy Fold8
Motorola Razr Ultra 2026
Apple iPhone 18 Pro
Samsung Buds4 Pro
Nothing Ear (3)
Nothing Headphones (1)
Google Pixel Buds Pro
Apple AirPods 4
Logitech Mobi Fold
Clevetura S Keyboard
ELO Vagabond


Purchased/owned:

Samsung Flash Drive
Benro Mobile Tripod
Peak Design Everyday Carry v2
Moko Foldable Cell Phone Stand
Factory SVC Remocon Service Remote Control (MKJ39170828)
Roku Express HD
Google Fi 
Adobe Podcast Speech Enhancer


[SOCIALIZE]

https://facebook.com/themrmobile
https://instagram.com/themrmobile
https://threads.com/captain2phones
https://x.com/captain2phones
https://mrmobile.tech


[DISCLOSURES]

Additional information concerning MrMobile’s ethics policy can be found here: 
https://mrmobile.tech/ethics

#everydaycarry #edc #edcgear #techbag #tech #gadgets #travel #traveltech #mrmobile #Anker #AnkerUniversalCharger #AnkerTravelChargingStation', '2026-09-30T23:34:10Z', 989, '[]'::jsonb, 'https://i.ytimg.com/vi/luKNGNqXWiU/maxresdefault.jpg', 'https://www.youtube.com/watch?v=luKNGNqXWiU') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('luKNGNqXWiU', 342045, 5808, 361);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('16292fbc-92d7-5c2d-ae78-28766b2d617e', 'tech-news', 'youtube', 'Jonathan Morrison', '@tld', 'https://www.youtube.com/@tld', 'UCDlQwv99CovKafGvxyaiNDA', 2500000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('hMYqiIX5cnY', '16292fbc-92d7-5c2d-ae78-28766b2d617e', 'youtube', 'Health Transformation Update - This Gadget Changed My Life', 'Check out the Gym Monster 2! https://bit.ly/4y7EBrX #speediance #gymmonster Shout out @speediance.official for the video!', 'Check out the Gym Monster 2! https://bit.ly/4y7EBrX
#speediance #gymmonster
Shout out @speediance.official for the video!', '2026-09-28T05:57:16Z', 894, '[]'::jsonb, 'https://i.ytimg.com/vi/hMYqiIX5cnY/maxresdefault.jpg', 'https://www.youtube.com/watch?v=hMYqiIX5cnY') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('hMYqiIX5cnY', 101343, 1436, 105);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('075d25f4-6c3b-5dd2-a4c5-52a8e1764584', 'tech-news', 'youtube', 'Kevin Stratvert', '@kevinstratvert', 'https://www.youtube.com/@kevinstratvert', 'UCfJT_eYDTmDE-ovKaxVE1ig', 4510000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('wETSpF4ef6E', '075d25f4-6c3b-5dd2-a4c5-52a8e1764584', 'youtube', 'Hermes Agent Tutorial for Beginners (FREE & Local)', 'Learn how to use Hermes AI Agent on Windows, from installation and local AI setup to browser tasks, memory, reusable skills, and scheduled automation. Follow along as I use Hermes to manage YouTube comments.', 'Learn how to use Hermes AI Agent on Windows, from installation and local AI setup to browser tasks, memory, reusable skills, and scheduled automation. Follow along as I use Hermes to manage YouTube comments.

Host: Kevin Stratvert

📚 RESOURCES
- Hermes: https://hermes-agent.nousresearch.com/desktop
- Prompts used in this video: https://docs.google.com/document/d/1X5oTG9DTucymvyneero_KmjCRGZ7nEGiBZoMLmXdSQk/edit?usp=drivesdk

⌚ TIMESTAMPS
0:00 - Introduction
0:35 - Install Hermes on Windows
1:06 - Set up a local AI model
2:07 - Create a folder and file
3:17 - Connect your browser
4:22 - Review YouTube comments
5:05 - Publish an approved reply
5:33 - Save preferences with memory
6:19 - Test memory in a new session
6:43 - Create a reusable skill
7:57 - Use your skill
8:28 - Schedule automated jobs
9:31 - Connect messaging apps

📩 NEWSLETTER
- Get the latest high-quality tutorial and tips and tricks videos emailed to your inbox each week: https://newsletter.kevinstratvert.com

🔽 CONNECT WITH ME
- Official website: http://www.kevinstratvert.com
- LinkedIn: https://www.linkedin.com/in/kevinstratvert/
- Discord: https://bit.ly/KevinStratvertDiscord
- Twitter: https://twitter.com/kevstrat
- Facebook: https://www.facebook.com/Kevin-Stratvert-101912218227818
- TikTok: https://www.tiktok.com/@kevinstratvert
- Instagram: https://www.instagram.com/kevinstratvert/

🎁 PARTNERS & DISCOUNTED OFFERS
💻 Hostinger | https://hostinger.kevinstratvert.com
📋 Notion | https://notion.kevinstratvert.com
💵 Quickbooks Online | https://qbo.kevinstratvert.com
🎙️ Voicemod AI Voice Changer | https://voicemod.kevinstratvert.com
🕵️ VidIQ | http://vidiq.kevinstratvert.com 

🎒 MY COURSES
- Go from Excel novice to data analysis ninja in just 2 hours: https://kevinstratvert.thinkific.com/

🎓 TRAINING - Take your skills, or your team’s, to the next level by partnering with us for expert training: https://kevinstratvert.com/training

🙏 REQUEST VIDEOS
https://forms.gle/BDrTNUoxheEoMLGt5

🔔 SUBSCRIBE ON YOUTUBE
https://www.youtube.com/user/kevlers?sub_confirmation=1

🙌 SUPPORT THE CHANNEL
- Hit the THANKS button in any video!
- Amazon affiliate link: https://amzn.to/3kCP2yz

⚖ DISCLOSURE
Some links are affiliate links. Purchasing through these links gives me a small commission to support videos on this channel. The price to you is the same.

#stratvert #hermesagent', '2026-10-23T07:00:06Z', 614, '[]'::jsonb, 'https://i.ytimg.com/vi/wETSpF4ef6E/maxresdefault.jpg', 'https://www.youtube.com/watch?v=wETSpF4ef6E') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('wETSpF4ef6E', 107425, 1087, 98);



insert into public.audit_log (actor_id, action, target, details) values (null, 'import_source_lists', 'creators', '{"creators":28,"videos":142,"deactivated":["Brian Kesh","Brian","Tamia Nontsikelel"],"per_niche":{"branding-marketing":{"youtubeCreators":13,"youtubeVideos":43,"tiktokCreators":6,"tiktokVideos":20},"content-creation":{"youtubeCreators":1,"youtubeVideos":25,"tiktokCreators":1,"tiktokVideos":14},"tech-news":{"youtubeCreators":7,"youtubeVideos":40,"tiktokCreators":0,"tiktokVideos":0}}}'::jsonb);

commit;


-- Check: active creators and videos per niche
select c.niche_id, c.platform, count(distinct c.id) as creators, count(v.video_id) as videos, count(v.video_id) filter (where v.thumbnail_url = '') as videos_needing_thumbnail from public.creators c left join public.videos v on v.creator_id = c.id where c.active group by 1, 2 order by 1, 2;
