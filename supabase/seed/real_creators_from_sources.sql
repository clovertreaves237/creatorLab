-- CreatorLab: real creators and videos from the team's source lists
-- Generated 2026-11-25T03:47:20.210Z by scripts/build-creators-seed.cjs. Safe to run again.
-- Creators not in any source list are deactivated (kept in history, can be restored by a curator).
begin;

-- Not in any source list: deactivate
update public.creators set active = false where id in ('3fe376e3-abb2-4e1c-9052-a277a9b008e4', 'f383b8e8-af3b-4147-a405-32f549a09bf4', '56b436cf-91e3-4d51-8860-06105f33c28c');

-- ===== branding-marketing: 19 creators, 63 videos =====
insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('3325ac39-0075-47a2-9569-44001798d65c', 'branding-marketing', 'tiktok', 'Eileen Yan', '@eileenxyang', 'https://www.tiktok.com/@eileenxyang', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7708993384806894879', '3325ac39-0075-47a2-9569-44001798d65c', 'tiktok', 'The greatest Artist and Entrepreneurs focus more on quantity and not quallity.', 'The greatest Artist and Entrepreneurs focus more on quantity and not quallity.', 'The greatest Artist and Entrepreneurs focus more on quantity and not quallity.', '2026-11-17T04:31:31.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@eileenxyang/video/7708993384806894879') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7698016387612101919', '3325ac39-0075-47a2-9569-44001798d65c', 'tiktok', 'Why are venture capital firms now posting on tiktok', 'Why are venture capital firms now posting on tiktok', 'Why are venture capital firms now posting on tiktok', '2026-10-18T14:35:10.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@eileenxyang/video/7698016387612101919') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('7426f542-ad29-58cf-ad40-558a6978e3d2', 'branding-marketing', 'tiktok', 'Anaity Sell Anything Online', '@sellanythingonline', 'https://www.tiktok.com/@sellanythingonline', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7673826293560970516', '7426f542-ad29-58cf-ad40-558a6978e3d2', 'tiktok', 'Why hundreds of brands wont survive the next few years', 'Why hundreds of brands wont survive the next few years', 'Why hundreds of brands wont survive the next few years', '2026-08-14T10:05:15.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@sellanythingonline/video/7673826293560970516') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('8a8ac2ce-81a6-5c67-a991-a8f03ff76556', 'branding-marketing', 'tiktok', 'rebrandedbykaitlynn', '@rebrandedbykaitlynn', 'https://www.tiktok.com/@rebrandedbykaitlynn', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7707654328688889119', '8a8ac2ce-81a6-5c67-a991-a8f03ff76556', 'tiktok', 'Top holidays marketing ideas for your business and brand', 'Top holidays marketing ideas for your business and brand', 'Top holidays marketing ideas for your business and brand', '2026-11-13T13:55:18.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@rebrandedbykaitlynn/video/7707654328688889119') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('0f2f869e-8b24-57a6-a23a-99b4f8d7bb9c', 'branding-marketing', 'tiktok', 'perlsinbusiness', '@perlsinbusiness', 'https://www.tiktok.com/@perlsinbusiness', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7625998191787248918', '0f2f869e-8b24-57a6-a23a-99b4f8d7bb9c', 'tiktok', 'If you want to start up a business in 2026', 'If you want to start up a business in 2026', 'If you want to start up a business in 2026', '2026-04-07T12:47:47.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@perlsinbusiness/video/7625998191787248918') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('fb5a2e3f-0483-4928-b621-feeb5b65debc', 'branding-marketing', 'tiktok', 'Alex Hormozi', '@ahormozi', 'https://www.tiktok.com/@ahormozi', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7711430429127052558', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'Business grow to their contraint and no furhter', 'Business grow to their contraint and no furhter', 'Business grow to their contraint and no furhter', '2026-11-23T18:08:30.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7711430429127052558') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7711279564328029453', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'If you are a small business owner you have to advertise more.', 'If you are a small business owner you have to advertise more.', 'If you are a small business owner you have to advertise more.', '2026-11-23T08:23:04.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7711279564328029453') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7711131288316513550', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'You cant fail is you consistently show up.', 'You cant fail is you consistently show up.', 'You cant fail is you consistently show up.', '2026-11-22T22:47:41.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7711131288316513550') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710908426666265886', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'How to get 10X more referrals', 'How to get 10X more referrals', 'How to get 10X more referrals', '2026-11-22T08:22:52.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7710908426666265886') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710611691515481358', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'Every business idea already exist', 'Every business idea already exist', 'Every business idea already exist', '2026-11-21T13:11:23.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7710611691515481358') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710316896117165325', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'This experience may end up given you more money', 'This experience may end up given you more money', 'This experience may end up given you more money', '2026-11-20T18:07:25.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7710316896117165325') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710166217541127438', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'The 4 eelements you must have to sell any product.', 'The 4 eelements you must have to sell any product.', 'The 4 eelements you must have to sell any product.', '2026-11-20T08:22:43.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7710166217541127438') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710018089424850190', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'The biggest business and brand owners make that tend to resuce their sales', 'The biggest business and brand owners make that tend to resuce their sales', 'The biggest business and brand owners make that tend to resuce their sales', '2026-11-19T22:47:54.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7710018089424850190') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7709945833499675918', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'Learn how to advertise any product so you sell it', 'Learn how to advertise any product so you sell it', 'Learn how to advertise any product so you sell it', '2026-11-19T18:07:30.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7709945833499675918') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7709721172635602189', 'fb5a2e3f-0483-4928-b621-feeb5b65debc', 'tiktok', 'How to price your product as a business owner.', 'How to price your product as a business owner.', 'How to price your product as a business owner.', '2026-11-19T03:35:43.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@ahormozi/video/7709721172635602189') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('d0c9931a-f8fb-5f79-a2e5-99e99770f64e', 'branding-marketing', 'tiktok', 'Leila Hormozi', '@leilahormozi', 'https://www.tiktok.com/@leilahormozi', null, null, null, array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710347591505972494', 'd0c9931a-f8fb-5f79-a2e5-99e99770f64e', 'tiktok', 'How to build a truth culture among employees', 'How to build a truth culture among employees', 'How to build a truth culture among employees', '2026-11-20T20:06:32.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@leilahormozi/video/7710347591505972494') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710068084412779790', 'd0c9931a-f8fb-5f79-a2e5-99e99770f64e', 'tiktok', 'Before you quit your job to start a business you need to hear this', 'Before you quit your job to start a business you need to hear this', 'Before you quit your job to start a business you need to hear this', '2026-11-20T02:01:54.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@leilahormozi/video/7710068084412779790') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7710022184814791949', 'd0c9931a-f8fb-5f79-a2e5-99e99770f64e', 'tiktok', 'Use this productivity hack to sky rocket your production.', 'Use this productivity hack to sky rocket your production.', 'Use this productivity hack to sky rocket your production.', '2026-11-19T23:03:47.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@leilahormozi/video/7710022184814791949') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7709976069822106911', 'd0c9931a-f8fb-5f79-a2e5-99e99770f64e', 'tiktok', 'Advice for all women in business', 'Advice for all women in business', 'Advice for all women in business', '2026-11-19T20:04:50.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@leilahormozi/video/7709976069822106911') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('7709930863768767757', 'd0c9931a-f8fb-5f79-a2e5-99e99770f64e', 'tiktok', 'A big lesson cashier job experience thought me.', 'A big lesson cashier job experience thought me.', 'A big lesson cashier job experience thought me.', '2026-11-19T17:09:25.000Z', 0, '[]'::jsonb, '', 'https://www.tiktok.com/@leilahormozi/video/7709930863768767757') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('ce8988a1-45e0-40a6-93ba-544346312075', 'branding-marketing', 'youtube', 'Alex Hormozi', '@alexhormozi', 'https://www.youtube.com/@alexhormozi', 'UCUyDOdBWhC1MCxEjC46d-zw', 4670000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('oVPXgRs0IdI', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', 'The Most Valuable Sales Training You’ll Ever Watch - $100M Sales Team', '$1M+ Business Owners: Build a sales team that closes without you: https://link.acquisition.com/sales-workshop-masterclass', '$1M+ Business Owners: Build a sales team that closes without you: https://link.acquisition.com/sales-workshop-masterclass

-----------------------
  Free Tools
-----------------------

Download your free scaling roadmap here: https://link.acquisition.com/roadmap-yt-sales

BANT Coach Skill: https://acquisition.com/bant-coach-skill

Call Notes Skill: https://acquisition.com/call-notes-skill

-----------------------
 Timestamps
-----------------------

Intro - 0:00:00

SECTION 1: Sales Strategy -  0:01:10 

1a. The Top 0.01% Handbook - 0:03:07
1b. The Roadmap - 0:08:09

SECTION 2: Sales Recruitment - 0:10:18

2a. What You Need - 0:10:27
2b. Who to Look For - 1:15:01
2c. How to Build the Machine - 1:36:17
2d. How to Feed the Machine - 1:48:26

SECTION 3: Sales Training  - 1:55:03

3a. Stranger to SDR: 14-Day Bootcamp - 1:55:33
3b. When to Ramp - 2:05:29
3c. When to Cut - 2:08:26
3d. Career Path: Roles + Perks - 2:11:19
3e. Career Path: Promotion - 2:15:36
3f. SDR to Closer - 2:16:25
3g. Ramping Closers - 2:18:32

SECTION 4: Sales Management - 2:20:37

4a. Culture of Feedback + Reinforcement - 2:21:26
4b. Manager Daily Schedule - 2:29:33
4c. SDR Daily Huddles + Schedule - 2:36:33
4d. SDR Weekly - 2:41:34
4e. BC Daily Huddles + Schedule - 2:51:30
4f. BC Weekly - 3:06:44
4g. Monthly Full Team - 3:16:42

-----------------------
  Description
-----------------------
If you’re new to my channel, my name is Alex Hormozi. I’m the founder and managing partner of Acquisition.com. It’s a family office, which is just a formal way of saying we invest our own money into companies. Our 10 portfolio companies bring in over $250,000,000+ per year. Our ownership stake varies between 20% and 100% of them. Given this is a YT channel, and anyone can claim anything, I’ll give you some stuff you can google to verify below.

How I got here…

21: Graduated Vanderbilt in 3 years Magna Cum Laude, and took a fancy consulting job.
23 yrs old: Left my fancy consulting job to start a business (a gym).
24 yrs old: Opened 5 gym locations.
26 yrs old: Closed down 6th gym. Lost everything. 
26 yrs old: Got back to launching gyms (launched 33). Then, lost everything for a 2nd time. 
26 yrs old: In desperation, started licensing model as a hail mary. It worked. 
27 yrs old: "Gym Launch" does $3M profit the next 6 months. Then $17M profit next 12 months.
28 yrs old: Started Prestige Labs. $20M the first year.  
29 yrs old: Launched ALAN, a software company for agencies to work leads for customers. Scaled to $1.7mmo within 6 months. 
31 yrs old: Sold 75% of UseAlan to a strategic buyer in an all stock deal. 
31 yrs old: Sold 66% of Gym Launch & Prestige Labs at $46.2M valuation in all-cash deal to American Pacific Group. (you can google it)
31 yrs old: Started our family office Acquisition.com. We invest and scale companies using the $42M in distributions we had taken + the cash from the $46.2M exit.
32 yrs old: Started making free content showing how we grow companies to make real business education accessible to everyone (and) to attract business owners to invest or scale their businesses. 
34 yrs old: I became co-owner of https://Skool.com, which is a platform for people to build communities online, making a living doing what they love, with people like them.
36 yrs old: I did a $106M book launch selling 3.6M copies of my $100M Money Models book, in 72 hours, breaking the Guinness world record for the fastest selling non-fiction book of all time.

Today: Our portfolio now does $250M/yr between 10 companies. The largest doing $100M/yr the smallest doing $5M per year. Our ownership varies between 20% and 100% ownership of the companies. Many of them we invested in early and helped grow (which is how we make our money - not youtube videos).

To all the gladiators in the arena, we’re all in the middle of writing our own stories. The worse the monsters, the more epic the story.

You either get an epic outcome or an epic story. Both mean you win. 

Keep crushing. May your desires be greater than your obstacles. 

Never quit,

Alex

DISCLOSURE 
Information shared here is for educational purposes only.  Individuals and business owners should evaluate their own business strategies, and identify any potential risks.  The information shared here is not a guarantee of success. Your results may vary.
Copyright © 2026.', '2026-11-16T22:13:05Z', 12106, '[]'::jsonb, 'https://i.ytimg.com/vi/oVPXgRs0IdI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=oVPXgRs0IdI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('oVPXgRs0IdI', 444732, 8852, 247);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('_MTZQ7rPCbE', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', '"The 3 P''s to Start a Business"', '"The 3 P''s to Start a Business"', '"The 3 P''s to Start a Business"', '2026-11-02T20:30:33Z', 93, '[]'::jsonb, 'https://i.ytimg.com/vi/_MTZQ7rPCbE/maxresdefault.jpg', 'https://www.youtube.com/watch?v=_MTZQ7rPCbE') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('_MTZQ7rPCbE', 49041, 2345, 12);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('RZZoX7oq8A8', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', 'This Mistake Cost Me $5 Million', 'This Mistake Cost Me $5 Million', 'This Mistake Cost Me $5 Million', '2026-11-10T22:02:55Z', 64, '[]'::jsonb, 'https://i.ytimg.com/vi/RZZoX7oq8A8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=RZZoX7oq8A8') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('RZZoX7oq8A8', 55957, 1281, 20);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('KQCYYf3zbVs', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', '9 Rules To Keep Your Customers', '9 Rules To Keep Your Customers', '9 Rules To Keep Your Customers', '2026-11-12T14:03:44Z', 45, '[]'::jsonb, 'https://i.ytimg.com/vi/KQCYYf3zbVs/maxresdefault.jpg', 'https://www.youtube.com/watch?v=KQCYYf3zbVs') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('KQCYYf3zbVs', 35113, 1626, 3);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('KhFlD54nQrY', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', '13 Years Of Brutally Honest Business Advice in 90 Mins', 'Get your free personalized $100M scaling roadmap: https://www.acquisition.com/roadmap', 'Get your free personalized $100M scaling roadmap: https://www.acquisition.com/roadmap

If you’re new to my channel, my name is Alex Hormozi. I’m the founder and managing partner of Acquisition.com. It’s a family office, which is just a formal way of saying we invest our own money into companies. Our 10 portfolio companies bring in over $250,000,000+ per year. Our ownership stake varies between 20% and 100% of them. Given this is a YT channel, and anyone can claim anything, I’ll give you some stuff you can google to verify below.

How I got here…

21: Graduated Vanderbilt in 3 years Magna Cum Laude, and took a fancy consulting job.
23 yrs old: Left my fancy consulting job to start a business (a gym).
24 yrs old: Opened 5 gym locations.
26 yrs old: Closed down 6th gym. Lost everything. 
26 yrs old: Got back to launching gyms (launched 33). Then, lost everything for a 2nd time. 
26 yrs old: In desperation, started licensing model as a hail mary. It worked. 
27 yrs old: "Gym Launch" does $3M profit the next 6 months. Then $17M profit next 12 months.
28 yrs old: Started Prestige Labs. $20M the first year.  
29 yrs old: Launched ALAN, a software company for agencies to work leads for customers. Scaled to $1.7mmo within 6 months. 
31 yrs old: Sold 75% of UseAlan to a strategic buyer in an all stock deal. 
31 yrs old: Sold 66% of Gym Launch & Prestige Labs at $46.2M valuation in all-cash deal to American Pacific Group. (you can google it)
31 yrs old: Started our family office Acquisition.com. We invest and scale companies using the $42M in distributions we had taken + the cash from the $46.2M exit.
32 yrs old: Started making free content showing how we grow companies to make real business education accessible to everyone (and) to attract business owners to invest or scale their businesses. 
34 yrs old: I became co-owner of https://Skool.com, which is a platform for people to build communities online, making a living doing what they love, with people like them.
36 yrs old: I did a $106M book launch selling 3.6M copies of my $100M Money Models book, in 72 hours, breaking the Guinness world record for the fastest selling non-fiction book of all time.

Today: Our portfolio now does $200M/yr between 10 companies. The largest doing $100M/yr the smallest doing $5M per year. Our ownership varies between 20% and 100% ownership of the companies. Many of them we invested in early and helped grow (which is how we make our money - not youtube videos).

To all the gladiators in the arena, we’re all in the middle of writing our own stories. The worse the monsters, the more epic the story.

You either get an epic outcome or an epic story. Both mean you win. 

Keep crushing. May your desires be greater than your obstacles. 

Never quit,

Alex

DISCLOSURE 
Information shared here is for educational purposes only.  Individuals and business owners should evaluate their own business strategies, and identify any potential risks.  The information shared here is not a guarantee of success. Your results may vary.
Copyright © 2026.', '2024-05-11T18:00:16Z', 5400, '[]'::jsonb, 'https://i.ytimg.com/vi/KhFlD54nQrY/maxresdefault.jpg', 'https://www.youtube.com/watch?v=KhFlD54nQrY') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('KhFlD54nQrY', 3633102, 102346, 2714);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('_GFY7VxRo8M', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', '10 Hacks To WIN In Business', '10 Hacks To WIN In Business', '10 Hacks To WIN In Business', '2026-11-08T21:01:35Z', 47, '[]'::jsonb, 'https://i.ytimg.com/vi/_GFY7VxRo8M/maxresdefault.jpg', 'https://www.youtube.com/watch?v=_GFY7VxRo8M') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('_GFY7VxRo8M', 31509, 2108, 12);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('pwZJcLZc3_Y', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', 'How To Make More Money Than You Deserve (My 2027 Framework)', 'Download your free scaling roadmap here: https://www.acquisition.com/roadmap?el=yt-alex-main-video-pwzjclzc3_y-scaling-roadmap-lead-v1-e0ace596394d&htrafficsource=youtube&utm_source=youtube&utm_medium=alex-main&utm_campaign=pwZJcLZc3_Y&utm_content=scaling-roadmap-lead', 'Download your free scaling roadmap here: https://www.acquisition.com/roadmap?el=yt-alex-main-video-pwzjclzc3_y-scaling-roadmap-lead-v1-e0ace596394d&htrafficsource=youtube&utm_source=youtube&utm_medium=alex-main&utm_campaign=pwZJcLZc3_Y&utm_content=scaling-roadmap-lead

If you’re new to my channel, my name is Alex Hormozi. I’m the founder and managing partner of Acquisition.com. It’s a family office, which is just a formal way of saying we invest our own money into companies. Our 10 portfolio companies bring in over $250,000,000+ per year. Our ownership stake varies between 20% and 100% of them. Given this is a YT channel, and anyone can claim anything, I’ll give you some stuff you can google to verify below.

How I got here…

21: Graduated Vanderbilt in 3 years Magna Cum Laude, and took a fancy consulting job.
23 yrs old: Left my fancy consulting job to start a business (a gym).
24 yrs old: Opened 5 gym locations.
26 yrs old: Closed down 6th gym. Lost everything. 
26 yrs old: Got back to launching gyms (launched 33). Then, lost everything for a 2nd time. 
26 yrs old: In desperation, started licensing model as a hail mary. It worked. 
27 yrs old: "Gym Launch" does $3M profit the next 6 months. Then $17M profit next 12 months.
28 yrs old: Started Prestige Labs. $20M the first year.  
29 yrs old: Launched ALAN, a software company for agencies to work leads for customers. Scaled to $1.7mmo within 6 months. 
31 yrs old: Sold 75% of UseAlan to a strategic buyer in an all stock deal. 
31 yrs old: Sold 66% of Gym Launch & Prestige Labs at $46.2M valuation in all-cash deal to American Pacific Group. (you can google it)
31 yrs old: Started our family office Acquisition.com. We invest and scale companies using the $42M in distributions we had taken + the cash from the $46.2M exit.
32 yrs old: Started making free content showing how we grow companies to make real business education accessible to everyone (and) to attract business owners to invest or scale their businesses. 
34 yrs old: I became co-owner of https://Skool.com, which is a platform for people to build communities online, making a living doing what they love, with people like them.
36 yrs old: I did a $106M book launch selling 3.6M copies of my $100M Money Models book, in 72 hours, breaking the Guinness world record for the fastest selling non-fiction book of all time.

Today: Our portfolio now does $250M/yr between 10 companies. The largest doing $100M/yr the smallest doing $5M per year. Our ownership varies between 20% and 100% ownership of the companies. Many of them we invested in early and helped grow (which is how we make our money - not youtube videos).

To all the gladiators in the arena, we’re all in the middle of writing our own stories. The worse the monsters, the more epic the story.

You either get an epic outcome or an epic story. Both mean you win. 

Keep crushing. May your desires be greater than your obstacles. 

Never quit,

Alex

DISCLOSURE 
Information shared here is for educational purposes only.  Individuals and business owners should evaluate their own business strategies, and identify any potential risks.  The information shared here is not a guarantee of success. Your results may vary.
Copyright © 2026.', '2026-11-08T03:00:36Z', 1057, '[]'::jsonb, 'https://i.ytimg.com/vi/pwZJcLZc3_Y/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pwZJcLZc3_Y') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('pwZJcLZc3_Y', 2421720, 28425, 687);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('rRI0iH-cpjg', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', 'Once You Understand This, Business Becomes Embarrassingly Simple', 'Download your free scaling roadmap here: https://link.acquisition.com/roadmap-speed', 'Download your free scaling roadmap here: https://link.acquisition.com/roadmap-speed

If you’re new to my channel, my name is Alex Hormozi. I’m the founder and managing partner of Acquisition.com. It’s a family office, which is just a formal way of saying we invest our own money into companies. Our 10 portfolio companies bring in over $250,000,000+ per year. Our ownership stake varies between 20% and 100% of them. Given this is a YT channel, and anyone can claim anything, I’ll give you some stuff you can google to verify below.

How I got here…

21: Graduated Vanderbilt in 3 years Magna Cum Laude, and took a fancy consulting job.
23 yrs old: Left my fancy consulting job to start a business (a gym).
24 yrs old: Opened 5 gym locations.
26 yrs old: Closed down 6th gym. Lost everything. 
26 yrs old: Got back to launching gyms (launched 33). Then, lost everything for a 2nd time. 
26 yrs old: In desperation, started licensing model as a hail mary. It worked. 
27 yrs old: "Gym Launch" does $3M profit the next 6 months. Then $17M profit next 12 months.
28 yrs old: Started Prestige Labs. $20M the first year.  
29 yrs old: Launched ALAN, a software company for agencies to work leads for customers. Scaled to $1.7mmo within 6 months. 
31 yrs old: Sold 75% of UseAlan to a strategic buyer in an all stock deal. 
31 yrs old: Sold 66% of Gym Launch & Prestige Labs at $46.2M valuation in all-cash deal to American Pacific Group. (you can google it)
31 yrs old: Started our family office Acquisition.com. We invest and scale companies using the $42M in distributions we had taken + the cash from the $46.2M exit.
32 yrs old: Started making free content showing how we grow companies to make real business education accessible to everyone (and) to attract business owners to invest or scale their businesses. 
34 yrs old: I became co-owner of https://Skool.com, which is a platform for people to build communities online, making a living doing what they love, with people like them.
36 yrs old: I did a $106M book launch selling 3.6M copies of my $100M Money Models book, in 72 hours, breaking the Guinness world record for the fastest selling non-fiction book of all time.

Today: Our portfolio now does $250M/yr between 10 companies. The largest doing $100M/yr the smallest doing $5M per year. Our ownership varies between 20% and 100% ownership of the companies. Many of them we invested in early and helped grow (which is how we make our money - not youtube videos).

To all the gladiators in the arena, we’re all in the middle of writing our own stories. The worse the monsters, the more epic the story.

You either get an epic outcome or an epic story. Both mean you win. 

Keep crushing. May your desires be greater than your obstacles. 

Never quit,

Alex

DISCLOSURE 
Information shared here is for educational purposes only.  Individuals and business owners should evaluate their own business strategies, and identify any potential risks.  The information shared here is not a guarantee of success. Your results may vary.
Copyright © 2026.', '2026-11-22T14:00:33Z', 947, '[]'::jsonb, 'https://i.ytimg.com/vi/rRI0iH-cpjg/maxresdefault.jpg', 'https://www.youtube.com/watch?v=rRI0iH-cpjg') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('rRI0iH-cpjg', 486202, 9574, 257);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('s-d0rxOasjA', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', 'If your business isn’t making $100,000 a month.', 'If your business isn’t making $100,000 a month.', 'If your business isn’t making $100,000 a month.

Follow these 2 steps.

1) Grab a kitchen timer & turn it to 4 hours.

2) Advertise until the timer is up.

You can do warm outbound, cold outbound, content, or paid ads. Don’t do all of them. Just pick 1 until you get to $100k a month. I would start with outbound or content because they’re the cheapest to get started (aka free).

When the 4-hour timer is up, and the day is done - do it again tomorrow.', '2026-11-02T08:24:25Z', 39, '[]'::jsonb, 'https://i.ytimg.com/vi/s-d0rxOasjA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=s-d0rxOasjA') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('s-d0rxOasjA', 98413, 2543, 16);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('W1__WySKs9k', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', '50 hooks, three bodies, three CTAs. That''s 450 ads.', '50 hooks, three bodies, three CTAs. That''s 450 ads.', '50 hooks, three bodies, three CTAs. That''s 450 ads.', '2026-11-03T16:24:31Z', 51, '[]'::jsonb, 'https://i.ytimg.com/vi/W1__WySKs9k/maxresdefault.jpg', 'https://www.youtube.com/watch?v=W1__WySKs9k') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('W1__WySKs9k', 136353, 5333, 27);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('VBoRLJimVzc', 'ce8988a1-45e0-40a6-93ba-544346312075', 'youtube', 'If I Wanted to Become a Millionaire In 2024, This is What I''d Do [FULL BLUEPRINT]', 'Get your free personalized $100M scaling roadmap: https://www.acquisition.com/roadmap', 'Get your free personalized $100M scaling roadmap: https://www.acquisition.com/roadmap

If you’re new to my channel, my name is Alex Hormozi. I’m the founder and managing partner of Acquisition.com. It’s a family office, which is just a formal way of saying we invest our own money into companies. Our 10 portfolio companies bring in over $250,000,000+ per year. Our ownership stake varies between 20% and 100% of them. Given this is a YT channel, and anyone can claim anything, I’ll give you some stuff you can google to verify below.

How I got here…

21: Graduated Vanderbilt in 3 years Magna Cum Laude, and took a fancy consulting job.
23 yrs old: Left my fancy consulting job to start a business (a gym).
24 yrs old: Opened 5 gym locations.
26 yrs old: Closed down 6th gym. Lost everything. 
26 yrs old: Got back to launching gyms (launched 33). Then, lost everything for a 2nd time. 
26 yrs old: In desperation, started licensing model as a hail mary. It worked. 
27 yrs old: "Gym Launch" does $3M profit the next 6 months. Then $17M profit next 12 months.
28 yrs old: Started Prestige Labs. $20M the first year.  
29 yrs old: Launched ALAN, a software company for agencies to work leads for customers. Scaled to $1.7mmo within 6 months. 
31 yrs old: Sold 75% of UseAlan to a strategic buyer in an all stock deal. 
31 yrs old: Sold 66% of Gym Launch & Prestige Labs at $46.2M valuation in all-cash deal to American Pacific Group. (you can google it)
31 yrs old: Started our family office Acquisition.com. We invest and scale companies using the $42M in distributions we had taken + the cash from the $46.2M exit.
32 yrs old: Started making free content showing how we grow companies to make real business education accessible to everyone (and) to attract business owners to invest or scale their businesses. 
34 yrs old: I became co-owner of https://Skool.com, which is a platform for people to build communities online, making a living doing what they love, with people like them.
36 yrs old: I did a $106M book launch selling 3.6M copies of my $100M Money Models book, in 72 hours, breaking the Guinness world record for the fastest selling non-fiction book of all time.

Today: Our portfolio now does $200M/yr between 10 companies. The largest doing $100M/yr the smallest doing $5M per year. Our ownership varies between 20% and 100% ownership of the companies. Many of them we invested in early and helped grow (which is how we make our money - not youtube videos).

To all the gladiators in the arena, we’re all in the middle of writing our own stories. The worse the monsters, the more epic the story.

You either get an epic outcome or an epic story. Both mean you win. 

Keep crushing. May your desires be greater than your obstacles. 

Never quit,

Alex

DISCLOSURE 
Information shared here is for educational purposes only.  Individuals and business owners should evaluate their own business strategies, and identify any potential risks.  The information shared here is not a guarantee of success. Your results may vary.
Copyright © 2026.', '2023-11-08T19:33:51Z', 3821, '[]'::jsonb, 'https://i.ytimg.com/vi/VBoRLJimVzc/maxresdefault.jpg', 'https://www.youtube.com/watch?v=VBoRLJimVzc') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('VBoRLJimVzc', 4063305, 131845, 2839);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('3c874504-faa6-5577-aaaf-25b03e24de3b', 'branding-marketing', 'youtube', 'Leila Hormozi', '@leilahormozi', 'https://www.youtube.com/@leilahormozi', 'UCxCcu9pet4dljrBLf8R5nwA', 1790000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('dXQZUTqz99I', '3c874504-faa6-5577-aaaf-25b03e24de3b', 'youtube', 'Give me 26 minutes, and I''ll Make You A Dangerous Entrepreneur', 'Want to learn how to scale your business? You can get my 5 Scaling Frameworks for free here: https://link.acquisition.com/leila-scaling-frameworks', 'Want to learn how to scale your business? You can get my 5 Scaling Frameworks for free here: https://link.acquisition.com/leila-scaling-frameworks



If you’re new to my channel, my name is Leila Hormozi. 

I’m the founder and Chairwoman of Acquisition.com, where we help ambitious people scale extraordinary companies.

A little about me...

10 years ago:
- Was 100lbs overweight.
- Had $1,000 saved after 19 months of work.

This year:
- We bought our first headquarters here in Las Vegas.
- We grew our holding company team at Acquisition.com to 65 people.

Success is accessible to anyone willing to do the work required.
Big visions never make sense to small-minded people.

If you want to have a greater impact, you’ll have to make greater sacrifices.

My message to you: Don’t let anybody kill your dreams ❤️



PS: Get the unfiltered memos I send my team as we scale Acquisition.com to $1B+: https://leilahormozi.com/subscribe



Information shared here is for educational purposes only. Individuals and business owners should evaluate their own business strategies, and identify any potentials risks. The information shared here is not a guarantee of success. Your results may vary. Copyright © Acquisition.com 2026.', '2026-11-05T18:15:02Z', 1569, '[]'::jsonb, 'https://i.ytimg.com/vi/dXQZUTqz99I/sddefault.jpg', 'https://www.youtube.com/watch?v=dXQZUTqz99I') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('dXQZUTqz99I', 301221, 6360, 226);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('9b6273ec-72e9-5c0d-ae34-dcde38ac4a57', 'branding-marketing', 'youtube', 'RNN TV', '@officialrnntv', 'https://www.youtube.com/@officialrnntv', 'UCCwzr6YQuMeCkEnBGvqWtZg', 238000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('inB_RdkGvxw', '9b6273ec-72e9-5c0d-ae34-dcde38ac4a57', 'youtube', 'WATCH: Bae U Invites Dangote to YouTube’s Biggest Show: “It’s Time We Had You!”', 'Nigerian media personality Bae U has invited billionaire businessman Aliko Dangote to appear on what he describes as YouTube’s biggest show. He argued that many of Dangote’s interviews appear on platforms younger audiences may not follow and asked when the refinery owner would…', 'Nigerian media personality Bae U has invited billionaire businessman Aliko Dangote to appear on what he describes as YouTube’s biggest show. He argued that many of Dangote’s interviews appear on platforms younger audiences may not follow and asked when the refinery owner would make an appearance.

Will Dangote accept the invitation? Watch and share your thoughts in the comments!

Subscribe to RNN TV for more Nigerian news, business stories and trending conversations.

Disclaimer
This video is for news reporting, commentary and public information purposes. The remarks are presented in the context provided and do not imply that Aliko Dangote has accepted the invitation or confirmed an interview. Viewers should refer to the original footage for full context.

#BaeU #AlikoDangote #Dangote #NigerianBusiness #YouTube #NigerianNews #TrendingNews #RNN TV

RNN TV covers Nigeria''s biggest trending stories — from breaking political news and celebrity drama to faith controversies, security updates and viral moments — with full context, balance and depth. Every video goes beyond the headline to give you the complete picture. Subscribe and hit the bell so you never miss a story that matters.', '2026-10-19T20:31:20Z', 424, '[]'::jsonb, 'https://i.ytimg.com/vi/inB_RdkGvxw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=inB_RdkGvxw') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('inB_RdkGvxw', 755273, 5705, 422);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'branding-marketing', 'youtube', 'Caleb Ralston', '@calebralston', 'https://www.youtube.com/@calebralston', 'UCbc7A6bNtpyybJbGvIi0PNQ', 183000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('kYsbuf3QGIg', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', 'If You Want a Disgustingly Good Personal Brand, You Can’t Do It Alone', 'Download the FREE 20 page Editor Tryouts Playbook here: calebralston.com/tryoutsplaybook?utm_source=YouTube&utm_medium=Organic&utm_content=110626', 'Download the FREE 20 page Editor Tryouts Playbook here: calebralston.com/tryoutsplaybook?utm_source=YouTube&utm_medium=Organic&utm_content=110626    

Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=110626   

--------------------------------------------

I’m here to help you grow your personal brand to build trust with your ideal customers.

If you’re looking to learn how to go viral, there are many other incredible creators who cover that. But if you’re looking to build a personal brand that brings customers to you, I’m your guy.

We usually publish 1-2 videos per month with the goal of having the highest value per minute that we can produce.

Thanks for being here.

And if you’d like to go further than the free content, check out Ralston Select:
https://calebralston.com/select

We teach you how to MAKE educational content. The pre-production, production, post production, and platform strategy. It’s gangster.


Now for those who have no idea who I am (rightfully so), I’m the guy who’s been behind the biggest brands in business online. If you don’t believe me, feel free to check out my LinkedIn: https://www.linkedin.com/in/calebralston/

Or if you’d rather stay on YouTube, here’s a bit more on my journey:
2008: Started filming training videos for local bodybuilders
2009: Hired by IFBB Pro Bodybuilder & Powerlifter, Stan Efferding, produced his hit training DVD “Proving It”
2010: Hired by Universal Nutrition to film the “Animal Cage” at the Mr. Olympia
2011: Hired by 7x Mr. Olympia, Flex Lewis + American Media Inc.

2012: Landed a "big boy job" as a Jr. Editor at Logos Bible Software
2013: Promoted to Assistant Editor and moved to the Marketing Department
2014: Instagram featured me as a "Suggested User" for new accounts
2015): Promoted to Lead Editor, overseeing main brand campaigns at Logos Bible Software
2016: Major layoffs at Logos Bible Software—I was one of them

2016: Landed two i502 Cannabis Companies + three other brands as freelance clients
2016: Doubled my previous income while freelancing in Bellingham, WA

2017: Hired as a Video Producer for PureWow and moved to Brooklyn, NY
2017: Gary Vaynerchuk, who owned PureWow, pulled me up to Team GaryVee as his traveling videographer & editor
2018: Partnered with David Rock & Gary Vaynerchuk to create his hit series “Trash Talk” – I was the Lead Editor
2018: Gary assigned me to take over his TikTok account and go all in (grew it from 300K → 3.5M in 3 months)
2019: Transitioned over from Team GaryVee to VaynerMedia’s client side

2019: Offered a Producer role at Constellation Brands to help build the Direct-to-Consumer team
2020: Launched Wild Media—a side project with my best friend to create innovative content for the Harley Davidson community (this led me to move to Las Vegas)

2022: Offered a Creative Director role by two of the biggest names in business today to scale their brand and build out their in-house media team
2023: Led the brand and media execution of a major book launch campaign, registering over 500,000 attendees
2023: Scaled the internal media team from outsourced vendors to 18 full-time members

2024: Officially stepped out to build my consulting firm, Ralston
2026: Ralston has partnered with the most incredible humans building some of the biggest and fastest growing personal brands in business. We have a powerful team that I''m incredibly proud of...and we grew to 100,000 subscribers on YouTube in just over a year, leading to over 60,000 leads for our business. Unreal.

And we''re teaching how to make content the same way we do...the way that builds trust and drives customers. Join Ralston Select to take all that you''re learning here deeper:
https://calebralston.com/select', '2026-11-06T17:00:00Z', 2639, '[]'::jsonb, 'https://i.ytimg.com/vi/kYsbuf3QGIg/maxresdefault.jpg', 'https://www.youtube.com/watch?v=kYsbuf3QGIg') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('kYsbuf3QGIg', 17593, 290, 23);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('NFFPkpTYdEk', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', 'How to Stand Out In the New Era of Personal Branding', 'FREE Workbook – download the ''How to Stand Out Workbook'' here: https://calebralston.com/standout?utm_source=YouTube&utm_medium=Organic&utm_content=100926', 'FREE Workbook – download the ''How to Stand Out Workbook'' here: https://calebralston.com/standout?utm_source=YouTube&utm_medium=Organic&utm_content=100926

Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=100926      

--------------------------------------------

I’m here to help you grow your personal brand to build trust with your ideal customers.

If you’re looking to learn how to go viral, there are many other incredible creators who cover that. But if you’re looking to build a personal brand that brings customers to you, I’m your guy.

We usually publish 1-2 videos per month with the goal of having the highest value per minute that we can produce.

Thanks for being here.

And if you’d like to go further than the free content, check out Ralston Select:
https://calebralston.com/select

We teach you how to MAKE educational content. The pre-production, production, post production, and platform strategy. It’s gangster.


Now for those who have no idea who I am (rightfully so), I’m the guy who’s been behind the biggest brands in business online. If you don’t believe me, feel free to check out my LinkedIn: https://www.linkedin.com/in/calebralston/

Or if you’d rather stay on YouTube, here’s a bit more on my journey:
2008: Started filming training videos for local bodybuilders
2009: Hired by IFBB Pro Bodybuilder & Powerlifter, Stan Efferding, produced his hit training DVD “Proving It”
2010: Hired by Universal Nutrition to film the “Animal Cage” at the Mr. Olympia
2011: Hired by 7x Mr. Olympia, Flex Lewis + American Media Inc.

2012: Landed a "big boy job" as a Jr. Editor at Logos Bible Software
2013: Promoted to Assistant Editor and moved to the Marketing Department
2014: Instagram featured me as a "Suggested User" for new accounts
2015): Promoted to Lead Editor, overseeing main brand campaigns at Logos Bible Software
2016: Major layoffs at Logos Bible Software—I was one of them

2016: Landed two i502 Cannabis Companies + three other brands as freelance clients
2016: Doubled my previous income while freelancing in Bellingham, WA

2017: Hired as a Video Producer for PureWow and moved to Brooklyn, NY
2017: Gary Vaynerchuk, who owned PureWow, pulled me up to Team GaryVee as his traveling videographer & editor
2018: Partnered with David Rock & Gary Vaynerchuk to create his hit series “Trash Talk” – I was the Lead Editor
2018: Gary assigned me to take over his TikTok account and go all in (grew it from 300K → 3.5M in 3 months)
2019: Transitioned over from Team GaryVee to VaynerMedia’s client side

2019: Offered a Producer role at Constellation Brands to help build the Direct-to-Consumer team
2020: Launched Wild Media—a side project with my best friend to create innovative content for the Harley Davidson community (this led me to move to Las Vegas)

2022: Offered a Creative Director role by two of the biggest names in business today to scale their brand and build out their in-house media team
2023: Led the brand and media execution of a major book launch campaign, registering over 500,000 attendees
2023: Scaled the internal media team from outsourced vendors to 18 full-time members

2024: Officially stepped out to build my consulting firm, Ralston
2026: Ralston has partnered with the most incredible humans building some of the biggest and fastest growing personal brands in business. We have a powerful team that I''m incredibly proud of...and we grew to 100,000 subscribers on YouTube in just over a year, leading to over 60,000 leads for our business. Unreal.

And we''re teaching how to make content the same way we do...the way that builds trust and drives customers. Join Ralston Select to take all that you''re learning here deeper:
https://calebralston.com/select', '2026-10-09T16:00:12Z', 1662, '[]'::jsonb, 'https://i.ytimg.com/vi/NFFPkpTYdEk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=NFFPkpTYdEk') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('NFFPkpTYdEk', 52124, 975, 58);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('FQqtU1zb9II', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', '25+ Years of Personal Branding Advice for Solo Creators', 'Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=youtube&utm_medium=organic&utm_content=092526', 'Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=youtube&utm_medium=organic&utm_content=092526

Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=092526   

--------------------------------------------

Follow Trevor: https://www.instagram.com/odom.trevor

--------------------------------------------

I’m here to help you grow your personal brand to build trust with your ideal customers.

If you’re looking to learn how to go viral, there are many other incredible creators who cover that. But if you’re looking to build a personal brand that brings customers to you, I’m your guy.

We usually publish 1-2 videos per month with the goal of having the highest value per minute that we can produce.

Thanks for being here.

And if you’d like to go further than the free content, check out Ralston Select:
https://calebralston.com/select

We teach you how to MAKE educational content. The pre-production, production, post production, and platform strategy. It’s gangster.


Now for those who have no idea who I am (rightfully so), I’m the guy who’s been behind the biggest brands in business online. If you don’t believe me, feel free to check out my LinkedIn: https://www.linkedin.com/in/calebralston/

Or if you’d rather stay on YouTube, here’s a bit more on my journey:
2008: Started filming training videos for local bodybuilders
2009: Hired by IFBB Pro Bodybuilder & Powerlifter, Stan Efferding, produced his hit training DVD “Proving It”
2010: Hired by Universal Nutrition to film the “Animal Cage” at the Mr. Olympia
2011: Hired by 7x Mr. Olympia, Flex Lewis + American Media Inc.

2012: Landed a "big boy job" as a Jr. Editor at Logos Bible Software
2013: Promoted to Assistant Editor and moved to the Marketing Department
2014: Instagram featured me as a "Suggested User" for new accounts
2015): Promoted to Lead Editor, overseeing main brand campaigns at Logos Bible Software
2016: Major layoffs at Logos Bible Software—I was one of them

2016: Landed two i502 Cannabis Companies + three other brands as freelance clients
2016: Doubled my previous income while freelancing in Bellingham, WA

2017: Hired as a Video Producer for PureWow and moved to Brooklyn, NY
2017: Gary Vaynerchuk, who owned PureWow, pulled me up to Team GaryVee as his traveling videographer & editor
2018: Partnered with David Rock & Gary Vaynerchuk to create his hit series “Trash Talk” – I was the Lead Editor
2018: Gary assigned me to take over his TikTok account and go all in (grew it from 300K → 3.5M in 3 months)
2019: Transitioned over from Team GaryVee to VaynerMedia’s client side

2019: Offered a Producer role at Constellation Brands to help build the Direct-to-Consumer team
2020: Launched Wild Media—a side project with my best friend to create innovative content for the Harley Davidson community (this led me to move to Las Vegas)

2022: Offered a Creative Director role by two of the biggest names in business today to scale their brand and build out their in-house media team
2023: Led the brand and media execution of a major book launch campaign, registering over 500,000 attendees
2023: Scaled the internal media team from outsourced vendors to 18 full-time members

2024: Officially stepped out to build my consulting firm, Ralston
2026: Ralston has partnered with the most incredible humans building some of the biggest and fastest growing personal brands in business. We have a powerful team that I''m incredibly proud of...and we grew to 100,000 subscribers on YouTube in just over a year, leading to over 60,000 leads for our business. Unreal.

And we''re teaching how to make content the same way we do...the way that builds trust and drives customers. Join Ralston Select to take all that you''re learning here deeper:
https://calebralston.com/select', '2026-09-25T16:00:21Z', 4796, '[]'::jsonb, 'https://i.ytimg.com/vi/FQqtU1zb9II/maxresdefault.jpg', 'https://www.youtube.com/watch?v=FQqtU1zb9II') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('FQqtU1zb9II', 20402, 302, 16);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('3We6G9-UkLo', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', 'The Formula to Make ANY Personal Brand Blow Up', 'FREE Workbook – download How to Build Your Brand Workbook here: http://calebralston.com/workbook?utm_source=YouTube&utm_medium=Organic&utm_content=102326', 'FREE Workbook – download How to Build Your Brand Workbook here: http://calebralston.com/workbook?utm_source=YouTube&utm_medium=Organic&utm_content=102326 

Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=102326       

--------------------------------------------

I’m here to help you grow your personal brand to build trust with your ideal customers.

If you’re looking to learn how to go viral, there are many other incredible creators who cover that. But if you’re looking to build a personal brand that brings customers to you, I’m your guy.

We usually publish 1-2 videos per month with the goal of having the highest value per minute that we can produce.

Thanks for being here.

And if you’d like to go further than the free content, check out Ralston Select:
https://calebralston.com/select

We teach you how to MAKE educational content. The pre-production, production, post production, and platform strategy. It’s gangster.


Now for those who have no idea who I am (rightfully so), I’m the guy who’s been behind the biggest brands in business online. If you don’t believe me, feel free to check out my LinkedIn: https://www.linkedin.com/in/calebralston/

Or if you’d rather stay on YouTube, here’s a bit more on my journey:
2008: Started filming training videos for local bodybuilders
2009: Hired by IFBB Pro Bodybuilder & Powerlifter, Stan Efferding, produced his hit training DVD “Proving It”
2010: Hired by Universal Nutrition to film the “Animal Cage” at the Mr. Olympia
2011: Hired by 7x Mr. Olympia, Flex Lewis + American Media Inc.

2012: Landed a "big boy job" as a Jr. Editor at Logos Bible Software
2013: Promoted to Assistant Editor and moved to the Marketing Department
2014: Instagram featured me as a "Suggested User" for new accounts
2015): Promoted to Lead Editor, overseeing main brand campaigns at Logos Bible Software
2016: Major layoffs at Logos Bible Software—I was one of them

2016: Landed two i502 Cannabis Companies + three other brands as freelance clients
2016: Doubled my previous income while freelancing in Bellingham, WA

2017: Hired as a Video Producer for PureWow and moved to Brooklyn, NY
2017: Gary Vaynerchuk, who owned PureWow, pulled me up to Team GaryVee as his traveling videographer & editor
2018: Partnered with David Rock & Gary Vaynerchuk to create his hit series “Trash Talk” – I was the Lead Editor
2018: Gary assigned me to take over his TikTok account and go all in (grew it from 300K → 3.5M in 3 months)
2019: Transitioned over from Team GaryVee to VaynerMedia’s client side

2019: Offered a Producer role at Constellation Brands to help build the Direct-to-Consumer team
2020: Launched Wild Media—a side project with my best friend to create innovative content for the Harley Davidson community (this led me to move to Las Vegas)

2022: Offered a Creative Director role by two of the biggest names in business today to scale their brand and build out their in-house media team
2023: Led the brand and media execution of a major book launch campaign, registering over 500,000 attendees
2023: Scaled the internal media team from outsourced vendors to 18 full-time members

2024: Officially stepped out to build my consulting firm, Ralston
2026: Ralston has partnered with the most incredible humans building some of the biggest and fastest growing personal brands in business. We have a powerful team that I''m incredibly proud of...and we grew to 100,000 subscribers on YouTube in just over a year, leading to over 60,000 leads for our business. Unreal.

And we''re teaching how to make content the same way we do...the way that builds trust and drives customers. Join Ralston Select to take all that you''re learning here deeper:
https://calebralston.com/select', '2026-10-23T16:00:02Z', 1595, '[]'::jsonb, 'https://i.ytimg.com/vi/3We6G9-UkLo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=3We6G9-UkLo') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('3We6G9-UkLo', 53777, 1049, 38);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('Ch4Sl0POBhU', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', 'How to Build a Personal Brand (Full Course)', 'FREE Workbook – download How to Build Your Brand Workbook here: http://calebralston.com/workbook?utm_source=YouTube&utm_medium=Organic&utm_content=040425', 'FREE Workbook – download How to Build Your Brand Workbook here: http://calebralston.com/workbook?utm_source=YouTube&utm_medium=Organic&utm_content=040425 

Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=040425   

------------------

For years I had received DMs and Emails asking if I have a resource for those who can’t work with me to learn my principles and beliefs on brand building. The answer was always an unfortunate “no”. And I hated it. Even more than that…I didn’t have any resources I could point them to from other creators. None that I trusted.

See, I believe that 99.9% of the courses out there on how to build your brand lack real principles. They’re purely “social media tactics”…tactics that will no longer be relevant 6-12 months from now. What makes it worse…99.9% of those courses cost $$. I’m not saying I have a problem with people charging for courses (not at all)…I just have a problem with people charging for bullshit. That’s why we made this, so you can forget those paid courses and watch this one instead.

I feel very confident in saying that this is the most in-depth course on How to Build Your Brand that you’ll watch. Period.

Writer/Director/Dude on Camera:
Caleb Ralston – calebralston.com
http://instagram.com/calebralston
https://www.linkedin.com/in/calebralston/ 

DP/Editor/Producer:
Trevor Odom – https://www.instagram.com/odom.trevor/
https://www.linkedin.com/in/trevor-odom-3460051b2/

Motion Designer:
Michael Moise – https://www.linkedin.com/in/michael-moise-059ab822b/
https://readymag.website/u4245714473/5115563/projects/

Workbook Designer:
Vincent Calabrese – https://www.vincalabrese.com/
https://www.instagram.com/vin.design?igsh=aWJrbHR3NTd3ejV6 

Filmed in Los Angeles California.

For y’all that read this entire description / watched the whole course. I hope this came at the right time for you. I hope you were able to track with what I was saying and that this sets you on another path. One of intentionality. One that builds a brand that scales trust and lasts a lifetime. I appreciate you and your attention so much. Thank you.

Timestamps:
0:00 - Intro  
1:06 - What Brand Is  
3:42 - Define Your Brand  
12:09 - Position Your Brand  
26:24 - Brand Story Framework  
33:12 - Pick Your Topic(s)  

51:02 - Section 2: Content  
52:49 - Choose Your Content Medium  
1:08:28 - Choosing the Right Platforms  
1:23:56 - Your Posting Cadence  
2:08:12 - Storytelling In Your Content  
2:34:17 - Community Driven Content  
2:45:24 - Scale Your Content  
3:12:56 - Create Room for Experimentation  

3:20:37 - Section 3: Team  
3:23:56 - Define Your Needs Before Hiring  
3:33:35 - Streamline Your Hiring Process  
4:06:12 - Hire for Culture, Train for Skills  
4:14:50 - Start Lean, Grow Intentionally  
4:21:36 - Full-Time Employees vs Contractors/Agencies  
4:39:12 - Onboard Your Team Effectively  
4:55:10 - Develop and Retain Your High Performing Team  
5:21:51 - Build a Strong Team Culture  
5:39:13 - Remote vs In Person vs Hybrid  

6:04:14 - Section 4: Monetize  
6:04:28 - Trust Before Transactions  
6:06:30 - Define Your Monetization Model  
6:09:58 - Share the Knowledge, Sell the Execution  
6:12:12 - Build Your Offer Stack  
6:14:16 - Let Your Content Do the Selling  
6:15:40 - Play the Long Game  
6:19:11 - It’s Your Turn to Take Action', '2025-04-04T17:00:20Z', 22948, '[]'::jsonb, 'https://i.ytimg.com/vi/Ch4Sl0POBhU/maxresdefault.jpg', 'https://www.youtube.com/watch?v=Ch4Sl0POBhU') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('Ch4Sl0POBhU', 1928578, 82942, 2167);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('BorXxk6RyN8', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', 'Before You Restart Your Personal Brand, Watch This', 'FREE WORKBOOK – download your Rebrand Workbook here: https://calebralston.com/rebrand?utm_source=youtube&utm_medium=organic&utm_content=yt082126', 'FREE WORKBOOK  – download your Rebrand Workbook here: https://calebralston.com/rebrand?utm_source=youtube&utm_medium=organic&utm_content=yt082126


Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=082126   

--------------------------------------------

I’m here to help you grow your personal brand to build trust with your ideal customers.

If you’re looking to learn how to go viral, there are many other incredible creators who cover that. But if you’re looking to build a personal brand that brings customers to you, I’m your guy.

We usually publish 1-2 videos per month with the goal of having the highest value per minute that we can produce.

Thanks for being here.

And if you’d like to go further than the free content, check out Ralston Select:
https://calebralston.com/select

We teach you how to MAKE educational content. The pre-production, production, post production, and platform strategy. It’s gangster.


Now for those who have no idea who I am (rightfully so), I’m the guy who’s been behind the biggest brands in business online. If you don’t believe me, feel free to check out my LinkedIn: https://www.linkedin.com/in/calebralston/

Or if you’d rather stay on YouTube, here’s a bit more on my journey:
2008: Started filming training videos for local bodybuilders
2009: Hired by IFBB Pro Bodybuilder & Powerlifter, Stan Efferding, produced his hit training DVD “Proving It”
2010: Hired by Universal Nutrition to film the “Animal Cage” at the Mr. Olympia
2011: Hired by 7x Mr. Olympia, Flex Lewis + American Media Inc.

2012: Landed a "big boy job" as a Jr. Editor at Logos Bible Software
2013: Promoted to Assistant Editor and moved to the Marketing Department
2014: Instagram featured me as a "Suggested User" for new accounts
2015): Promoted to Lead Editor, overseeing main brand campaigns at Logos Bible Software
2016: Major layoffs at Logos Bible Software—I was one of them

2016: Landed two i502 Cannabis Companies + three other brands as freelance clients
2016: Doubled my previous income while freelancing in Bellingham, WA

2017: Hired as a Video Producer for PureWow and moved to Brooklyn, NY
2017: Gary Vaynerchuk, who owned PureWow, pulled me up to Team GaryVee as his traveling videographer & editor
2018: Partnered with David Rock & Gary Vaynerchuk to create his hit series “Trash Talk” – I was the Lead Editor
2018: Gary assigned me to take over his TikTok account and go all in (grew it from 300K → 3.5M in 3 months)
2019: Transitioned over from Team GaryVee to VaynerMedia’s client side

2019: Offered a Producer role at Constellation Brands to help build the Direct-to-Consumer team
2020: Launched Wild Media—a side project with my best friend to create innovative content for the Harley Davidson community (this led me to move to Las Vegas)

2022: Offered a Creative Director role by two of the biggest names in business today to scale their brand and build out their in-house media team
2023: Led the brand and media execution of a major book launch campaign, registering over 500,000 attendees
2023: Scaled the internal media team from outsourced vendors to 18 full-time members

2024: Officially stepped out to build my consulting firm, Ralston
2026: Ralston has partnered with the most incredible humans building some of the biggest and fastest growing personal brands in business. We have a powerful team that I''m incredibly proud of...and we grew to 100,000 subscribers on YouTube in just over a year, leading to over 60,000 leads for our business. Unreal.

And we''re teaching how to make content the same way we do...the way that builds trust and drives customers. Join Ralston Select to take all that you''re learning here deeper:
https://calebralston.com/select', '2026-08-21T16:00:19Z', 1234, '[]'::jsonb, 'https://i.ytimg.com/vi/BorXxk6RyN8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=BorXxk6RyN8') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('BorXxk6RyN8', 14610, 293, 13);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('_pSPAZsQGI0', 'bfccff36-4d2e-5e81-ab43-50c9fa0fbae0', 'youtube', 'Why content sucks right now (how we fix it)', 'Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=071026', 'Learn how to make content that gets you customers: https://calebralston.com/select?utm_source=YouTube&utm_medium=Organic&utm_content=071026   

FREE How to Start Your Brand Workbook: https://calebralston.com/startyourbrand?utm_source=YouTube&utm_medium=Organic&utm_content=071026  

--------------------------------------------

I’m here to help you grow your personal brand to build trust with your ideal customers.

If you’re looking to learn how to go viral, there are many other incredible creators who cover that. But if you’re looking to build a personal brand that brings customers to you, I’m your guy.

We usually publish 1-2 videos per month with the goal of having the highest value per minute that we can produce.

Thanks for being here.

And if you’d like to go further than the free content, check out Ralston Select:
https://calebralston.com/select

We teach you how to MAKE educational content. The pre-production, production, post production, and platform strategy. It’s gangster.


Now for those who have no idea who I am (rightfully so), I’m the guy who’s been behind the biggest brands in business online. If you don’t believe me, feel free to check out my LinkedIn: https://www.linkedin.com/in/calebralston/

Or if you’d rather stay on YouTube, here’s a bit more on my journey:
2008: Started filming training videos for local bodybuilders
2009: Hired by IFBB Pro Bodybuilder & Powerlifter, Stan Efferding, produced his hit training DVD “Proving It”
2010: Hired by Universal Nutrition to film the “Animal Cage” at the Mr. Olympia
2011: Hired by 7x Mr. Olympia, Flex Lewis + American Media Inc.

2012: Landed a "big boy job" as a Jr. Editor at Logos Bible Software
2013: Promoted to Assistant Editor and moved to the Marketing Department
2014: Instagram featured me as a "Suggested User" for new accounts
2015): Promoted to Lead Editor, overseeing main brand campaigns at Logos Bible Software
2016: Major layoffs at Logos Bible Software—I was one of them

2016: Landed two i502 Cannabis Companies + three other brands as freelance clients
2016: Doubled my previous income while freelancing in Bellingham, WA

2017: Hired as a Video Producer for PureWow and moved to Brooklyn, NY
2017: Gary Vaynerchuk, who owned PureWow, pulled me up to Team GaryVee as his traveling videographer & editor
2018: Partnered with David Rock & Gary Vaynerchuk to create his hit series “Trash Talk” – I was the Lead Editor
2018: Gary assigned me to take over his TikTok account and go all in (grew it from 300K → 3.5M in 3 months)
2019: Transitioned over from Team GaryVee to VaynerMedia’s client side

2019: Offered a Producer role at Constellation Brands to help build the Direct-to-Consumer team
2020: Launched Wild Media—a side project with my best friend to create innovative content for the Harley Davidson community (this led me to move to Las Vegas)

2022: Offered a Creative Director role by two of the biggest names in business today to scale their brand and build out their in-house media team
2023: Led the brand and media execution of a major book launch campaign, registering over 500,000 attendees
2023: Scaled the internal media team from outsourced vendors to 18 full-time members

2024: Officially stepped out to build my consulting firm, Ralston
2026: Ralston has partnered with the most incredible humans building some of the biggest and fastest growing personal brands in business. We have a powerful team that I''m incredibly proud of...and we grew to 100,000 subscribers on YouTube in just over a year, leading to over 60,000 leads for our business. Unreal.

And we''re teaching how to make content the same way we do...the way that builds trust and drives customers. Join Ralston Select to take all that you''re learning here deeper:
https://calebralston.com/select', '2026-07-10T16:00:12Z', 919, '[]'::jsonb, 'https://i.ytimg.com/vi/_pSPAZsQGI0/maxresdefault.jpg', 'https://www.youtube.com/watch?v=_pSPAZsQGI0') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('_pSPAZsQGI0', 58200, 2699, 315);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('12915934-76ee-5879-ae7d-321af2535e6e', 'branding-marketing', 'youtube', 'GaryVee', '@garyvee', 'https://www.youtube.com/@garyvee', 'UCctXZhXmG-kf3tlIXgVZUlw', 4910000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('IWuVEcQexWo', '12915934-76ee-5879-ae7d-321af2535e6e', 'youtube', 'How to Build Unlimited Attention on Social Media While You Still Can | GaryVee Keynote', 'Today’s episode is a keynote speech I gave in Mexico, and it’s all about why social media is still the single biggest opportunity on Earth. I give my two cents on why “attention” is the #1 asset in the world, why you’re out of excuses in 2025, and how insecurity and laziness a…', 'Today’s episode is a keynote speech I gave in Mexico, and it’s all about why social media is still the single biggest opportunity on Earth. I give my two cents on why “attention” is the #1 asset in the world, why you’re out of excuses in 2025, and how insecurity and laziness are keeping people from this life-changing opportunity. Hope you enjoy!

00:00 – The most powerful opportunity in your life
01:49 – Why every entrepreneur should be creating content daily
07:38 – How insecurity is stopping you from posting
09:04 – Technology doesn’t care about your feelings
11:20 – The #1 thing that will change your financial life
17:08 – The phone era is ending & attention is everything
20:29 – Why attention beats money, land, or status
25:00 – The last free opportunity in human history
27:30 – Why your content isn’t working (and how to fix it)
33:16 – The real reason most people never start
40:50 – Nothing is worth missing your family
42:15 – You don’t need a niche — post about everything
47:05 – How to actually get better at content

#garyvee #socialmedia #attention #entrepreneurship #mindset #contentcreation #marketing #motivation #innovation #businessgrowth

Did you catch my Q&A with John Hu, founder of Stan? Check it out here: https://garyvee.com/stanpod
—
Thanks for watching!

Sign up for the GaryVee x Stan challenge: http://www.garyvee.com/stan
Join My Discord!: http://www.garyvee.com/discord
Check out another series on my channel:
Gary Vaynerchuk Keynote Speeches: http://www.garyvee.com/keynotespeeches
Gary Vaynerchuk''s thoughts on NFTs, Web3, cryptocurrencies and more: http://www.garyvee.com/web3nfts
Life, Business, and Career Advice l Gary Vaynerchuk Original Films: http://www.garyvee.com/gvoriginals
How to Make Money at Garage Sales l TrashTalk: http://www.garyvee.com/trashtalks
Inside the Life of a $300M+ Company''s CEO l DailyVee: http://www.garyvee.com/dailyvees
— 
Gary Vaynerchuk is a serial entrepreneur and serves as the Chairman of VaynerX, the CEO of VaynerMedia, and the CEO and creator of VeeFriends. Gary is considered one of the leading global minds on what''s next in culture, business, and the internet.

Known as "GaryVee," he is described as one of the most forward thinkers in business. He acutely recognizes trends and patterns early to help others understand how shifts in consumer attention impact the realities of the business world today. Gary''s approach sits at the intersection of business and pop culture. He keenly understands how to bring brand relevance to the forefront. He is a prolific angel investor with early investments in companies like Facebook, Twitter, Tumblr, Venmo, Snapchat, Coinbase, and Uber.

Gary is an entrepreneur at heart – he builds businesses. Today, he helps Fortune 1000 brands leverage consumer attention through his full-service advertising agency, VaynerMedia, which has offices in New York, Los Angeles, Chicago, Miami, Toronto, Mexico City, London, Amsterdam, Sydney, Singapore, Tokyo, Bangkok, Delhi, and Kuala Lumpur. VaynerMedia is part of the VaynerX holding company, which also includes Eva Nosidam Productions, Gallery Media Group, The Sasha Group, VaynerSpeakers, VaynerCommerce, and Tingley Lane Trading. Gary is the Co-Founder of VaynerSports, VCR Group, VaynerWatt, ArtOfficial, Resy, and Empathy Wines. He guided Resy and Empathy to successful exits -- which he later sold to American Express and Constellation Brands, respectively. He also owns a Major League Pickleball team called the 5s, is part owner of a Big3 basketball team, and is an investor in the revival of the SlamBall League.

In 2021, Gary created VeeFriends, an entertainment company that has become a rising powerhouse in modern entertainment and collectibles. Often described as Pokemon meets Sesame Street, the company leverages stories, games, events, collectibles, and technology to scale its character universe. Vaynerchuk also has negotiated partnerships with brand powerhouses such as Crocs, Fanatics, Macy’s/Toys “R” Us, Mattel’s UNO, Mattel’s Masters of the Universe, Moonbug Entertainment, Reebok, Squishmallows, Topps, and more.

Gary is also the founder and creator of VeeCon – a contemporary super conference that converges business and pop culture with innovation and technology. He is a six-time New York Times bestselling author, with titles including Crush It!, Jab, Jab, Jab, Right Hook, Twelve and a Half and Day Trading Attention. In addition to running multiple businesses, Gary documents his daily life as a CEO through his social media channels, which have more than 45 million followers and garner more than 300 million monthly impressions/views across all platforms. His podcast, "The GaryVee Audio Experience," ranks among the top podcasts globally.

Gary serves on the board of MikMak, Bojangles Restaurants, Global Citizen Forum, The Paley Center, and Pencils of Promise. He is also a longtime Well Member of charity: water.

Gary''s life ambition is to buy the New York Jets.', '2025-10-28T19:00:26Z', 2963, '[]'::jsonb, 'https://i.ytimg.com/vi/IWuVEcQexWo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=IWuVEcQexWo') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('IWuVEcQexWo', 111253, 2652, 105);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('29a81898-4886-5470-a0a8-1d90079dff61', 'branding-marketing', 'youtube', 'Vanessa Lau', '@vanessalau', 'https://www.youtube.com/@vanessalau', 'UCdOPzgbosSnbfwd9-iXP2NA', 1010000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('dJxlFgG7CrA', '29a81898-4886-5470-a0a8-1d90079dff61', 'youtube', 'The EXACT System I Used to Rebrand My Instagram in 7 Days (FULL MASTERCLASS)', 'Try Poppy.AI for $1 only here (7 day trial!) : https://creator.getpoppy.ai/vanessa-rebrand', 'Try Poppy.AI for $1 only here (7 day trial!) :  https://creator.getpoppy.ai/vanessa-rebrand

My Content Strategy Poppy Template: https://app.getpoppy.ai/boards/cool-cherry-e_qC9

If you covered up your Instagram bio and looked at your last 12 feed posts, would a stranger know exactly who you are? If the answer is no — this video is for you.

A few weeks ago, I lost brand deals because my feed was confusing. Brands couldn''t figure out who my account was actually for. So I spent 7 days rebuilding my entire content strategy from scratch — and in this full masterclass, I''m walking you through every single step so you can do the same.

♡ What''s in this video:

00:00:00 Why your Instagram feed is costing you opportunities
00:01:25 Step 1: Audit your profile
00:03:07 Step 2: Figure out your content goals 
00:04:48 Step 3: Build your content strategy 
00:07:15 Giving Poppy context 
00:08:40 Ideal audience avatar 
00:13:51 Content pillars 
00:19:16 Studying your Favorite Creators 
00:21:14 Lesson 1: Central theme (Grace Beverley) 
00:24:20 Lesson 2: Power of B-roll (Elise) 
00:25:16 Lesson 3: Repeatable formats (Michelle) 
00:26:59 Lesson 4: Documenting in the Moment (Millie) 
00:29:31 Lesson 5: Series with stakes (Julia) 
00:30:47 Lesson 6: Visual Identity
00:31:28 Content Operating Guideline 
00:34:37 Repeatable Content Formats 
00:39:47 Scripting Frameworks 
00:45:33 Brand Voice Guide 
00:46:23 Part 3: Execution
00:46:57 Organizing content ideas
00:49:05 Mapping your content calendar
00:51:54 LIVE demo: Scripting a real video 
00:58:02 The final result 
00:59:49 Automated Video Editing

🧋If any of my videos have helped you, I''d love for you to follow and support my tea business!

https://www.superboba.com
https://www.instagram.com/getsuperboba/

Use code "VLYOUTUBE" for 15% off - my thank you for being a subscriber! :)

😍 Like my outfits? I''ve linked everything I wear and use here: https://shopmy.us/shop/vanessalauco

♡  All Equipment: https://tr.ee/pgDYxj

Get the Insta360 Luna Ultra here (code: "Vanessa" to get a FREE Throwpod with your order!): https://store.insta360.com/product/luna-series?utm_source=AffiliateCenter&utm_medium=copylink&utm_term=Vanessa

🛍️ Amazon Links:

Pocket Vlogging Camera (Insta360): https://geni.us/ZV0V8
Main Vlogging Camera (Sony): https://geni.us/XMLEO
Mid-Range Vlogging Lens (Laowa): https://geni.us/Dgx9Bb
High-End Vlogging Lens (Sony): https://geni.us/0KHR
Main Vlogging Microphone: https://geni.us/tICDaX
Main Vlogging Tripod: https://geni.us/1OjOnA
Quick Release Plate: https://geni.us/n5cLV
Vlogging Battery Packs: https://geni.us/rAxGM

Main Vlogging/Talking Camera (Sony): https://geni.us/XMLEO
Talking Head Microphone (Sony): https://geni.us/5HWMJ
Large Tripod (NEEWER): https://geni.us/STzK

Heavy Duty Desk Tripod (NEEWER): https://geni.us/DrepH
Small Tripod (Insta360): https://geni.us/gTXxB
iPhone Attachment (NEEWER): https://geni.us/lilWKQg

🛍️ B&H Links:

Pocket Vlogging Camera (Insta360): https://bhpho.to/44FhaJW
Main Vlogging Camera (Sony): https://bhpho.to/4wmEGYc
Mid-Range Vlogging Lens (Laowa): https://bhpho.to/4aZ1vsy
High-End Vlogging Lens (Sony): https://bhpho.to/4yANhbw
Main Vlogging Microphone: https://bhpho.to/44EPBjY
Quick Release Plate: https://bhpho.to/4eQ9TeW
Vlogging Tripod: https://bhpho.to/4eF9OvW

Main Vlogging/Talking Camera (Sony): https://bhpho.to/44FhaJW
Talking Head Microphone (Sony): https://bhpho.to/4v1Bpw7
Tripod (NEWEER): https://bhpho.to/44Cs6rI

♥️ Other Gear I Love!

Desktop/Podcast Microphone (Shure): https://geni.us/orLsU
iPhone Tripod Case: https://geni.us/PGC5L
Travel Camera (Fujifilm): https://geni.us/mqBFC
Travel Camera Lens (Fujifilm): https://geni.us/anXeGIe
Cinematic Camera: https://geni.us/g7YTd
High End Talking Head Lens (G-Master): https://geni.us/hcNNBiF
Close Up Shot Lens (G-Master - great for product videography/: https://geni.us/Wx5FBR

🛍️ Shop my outfits and beauty products: https://shopmy.us/shop/vanessalauco

♡ Favourite Content Software Tools I Use:

Shopify (E-Commerce Platform I use for Superboba): https://shopify.pxf.io/PzBnXN

AI Script Writer / Content Ideation: https://start.getpoppy.ai/vanessa (Use code “VANESSA” for $25 off Poppy.AI)

Video Editor: https://get.descript.com/vanessalau072025

Copyright-free Music: https://share.epidemicsound.com/mckk1g (Use code “VANESSA” for 50% OFF your first 3 paying months after the 30 day free trial!)

YouTube Optimization: https://www.tubebuddy.com/vanessalauco (Use “vanessasbuddy” to get 20% off all licenses)

♡ Stay Connected:

♥️ Subscribe to my channel for more:  https://www.youtube.com/vanessalau?sub_confirmation=1 
💛 Follow me on Instagram: https://www.instagram.com/vanessalau.co/
🧋Check out my Superfood Milk Tea business: https://www.instagram.com/getsuperboba/
💌 For business inquiries: partnerships@vanessalau.co', '2026-11-06T14:11:12Z', 3612, '[]'::jsonb, 'https://i.ytimg.com/vi/dJxlFgG7CrA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=dJxlFgG7CrA') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('dJxlFgG7CrA', 23934, 577, 65);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('f9c0e4c3-d8a1-53ca-a10c-9bbb1c94b2df', 'branding-marketing', 'youtube', 'Sunny Lenarduzzi', '@sunnylenarduzzi', 'https://www.youtube.com/@sunnylenarduzzi', 'UCnBTvMFhuvbE_dhw2mo0NaQ', 802000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('gSD9g40yT4I', 'f9c0e4c3-d8a1-53ca-a10c-9bbb1c94b2df', 'youtube', 'If You Don''t Want To Build A Personal Brand, Build This Instead', 'Don''t want to build a personal brand? What if you didn''t have to post every day, go viral, or turn your life into content to build a real business online? 👉 Get your plan here: https://www.authoritydotio.com/knowledgebank-lm?utm_source=YouTube&utm_medium=video&utm_campaign=Su…', 'Don''t want to build a personal brand? What if you didn''t have to post every day, go viral, or turn your life into content to build a real business online? 👉 Get your plan here: https://www.authoritydotio.com/knowledgebank-lm?utm_source=YouTube&utm_medium=video&utm_campaign=Sunny+Lenarduzzi+Channel&utm_content=If+you+Don%27t+Want+To+Build+A+Personal+Brand%2C+Build+This+Instead

I played the personal brand game. I chased visibility, grew the audience, and made myself the product. It worked, to a point. But when I looked at what was actually driving revenue in what is now a $35M+ business, it was never the brand. It was precision: getting specific about who I could help and what transformation I could deliver. In this video, I''m sharing the model that actually built our business, and that has helped thousands of experts generate over $200M collectively.

You''ll learn the difference between a personal brand and an authority business, why one keeps you stuck on the content hamster wheel while the other works when you''re not working, and the three things you need to build one: a specific transformation statement, a discoverable content strategy that targets buyers instead of browsers, and a simple funnel that turns viewers into clients automatically. You don''t need to be known. You need to be findable by the right person, with the right problem, at the right moment.

------------

Video Timestamps:
0:00 Why personal brand advice isn''t built for most experts
1:06 Personal brand vs. authority business: the key difference
2:16 What I learned playing both games (and building a $35M business)
5:19 Why the personal brand model keeps you on the content hamster wheel
7:48 Step 1: Your specific transformation statement
8:41 Step 2: Content that attracts buyers, not browsers
10:41 Step 3: The funnel that turns viewers into clients automatically
12:13 The full reframe: why your methodology is the product

------------

👉 FREE TRAINING (hosted by Sunny Lenarduzzi) - 4 SIMPLE STEPS TO TURN YOUR EXISTING SKILL SET INTO A 6-FIGURE BUSINESS (without Paid Ads!): https://www.authoritydotio.com/masterclass 

👉 READY TO APPLY? If you have an expertise to share and you''re ready to make a big impact by creating your highly scalable online course, click the link below to schedule a time to see if we''re a fit to work together inside of Ascent:
https://www.authoritydotio.com/now

------------

👀 WATCH OUR NEW CHANNEL: https://www.youtube.com/@authority-io?sub_confirmation=1

🤝 SEE OUR SUCCESS STORIES: https://www.youtube.com/@TheAuthorityioSuccess?sub_confirmation=1

👋 SAY HI:
▪ https://sunnylenarduzzi.com/
▪ https://authority.io/ 
▪ https://www.linkedin.com/in/sunnylenarduzzi/ 
▪ https://www.facebook.com/SunnyLenarduzzi/ 
▪ https://www.instagram.com/sunnylenarduzzi/ 
▪ https://www.youtube.com/c/SunnyLenarduzzi 
▪ https://www.youtube.com/@authority-io 

Thanks for watching and see you in the next one! 💛 - Sunny

------------

https://youtu.be/gSD9g40yT4I

How I Built an Online Course that Makes $5M/Yr - https://www.youtube.com/watch?v=UgWwnTrvm2w
How I Made $30M On YouTube Without Millions Of Views - https://www.youtube.com/watch?v=NWcQ63xHFmo
How I Make $500K/Month Without Social Media - https://www.youtube.com/watch?v=jQAxjKuJcBA 
Here’s How I would make 100k in 6 Months - https://www.youtube.com/watch?v=6aKiQUrIGuk 

#onlinecoaching  #coachingbusiness  #coursecreation  #onlinebusiness  #youtubestrategy  #authority  #Authorityio #personalbranding  #AuthorityBusiness #knowledgebusiness  #monetizeyourexpertise  #salesfunnel', '2026-10-06T13:00:24Z', 913, '[]'::jsonb, 'https://i.ytimg.com/vi/gSD9g40yT4I/maxresdefault.jpg', 'https://www.youtube.com/watch?v=gSD9g40yT4I') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('gSD9g40yT4I', 75388, 1281, 1015);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('6mUScq-6U3U', 'f9c0e4c3-d8a1-53ca-a10c-9bbb1c94b2df', 'youtube', 'How to Build a $1M YouTube Channel in 1 Hour a Day', 'Are you spending hours creating YouTube videos… but not seeing business results? Think you need to post every day or go viral to build a million-dollar business? 🚀 Get the FREE Guide Here - https://www.authoritydotio.com/monetized1?utm_source=YouTube&utm_medium=video&utm_camp…', 'Are you spending hours creating YouTube videos… but not seeing business results? Think you need to post every day or go viral to build a million-dollar business? 🚀 Get the FREE Guide Here - https://www.authoritydotio.com/monetized1?utm_source=YouTube&utm_medium=video&utm_campaign=Sunny+Lenarduzzi+Channel&utm_content=How+to+Build+a+%241M+YouTube+Channel+in+1+Hour+a+Day
 
For years, I believed growing a successful YouTube business meant creating more content, chasing more views, and hoping the algorithm would reward me.

I was wrong.

In this video, I''m breaking down the exact 5-hour-per-week YouTube system we''ve used to generate an average of $76,000 per video—not from AdSense, sponsorships, or millions of views, but by using YouTube as a tool to grow a real business. You''ll learn how to create content that attracts ideal clients, builds authority, and works for you long after you hit publish.

If you''re an expert, coach, consultant, or service provider who wants to stop trading time for money and build a scalable online education business, this is the roadmap you''ve been looking for.

In this video you''ll learn:

✅ The 5-hour weekly YouTube framework that builds a real business
✅ How to find high-converting video ideas in under an hour
✅ Why you don''t need expensive equipment or daily uploads
✅ The scripting structure that saves hours every week
✅ How to optimize your videos so the right people actually click
✅ The biggest mistake keeping business owners stuck on the content hamster wheel
✅ How to turn YouTube videos into evergreen business assets

⏱️ Timestamps

00:00 – The surprising revenue behind our YouTube videos
01:05 – The 5-hour weekly YouTube business framework
01:56 – Hour #1: Find content ideas that attract clients
05:52 – Hour #2: Script faster without sacrificing quality
07:46 – Hour #3 & #4: Simple filming and editing setup
08:46 – Hour #5: Optimize your title, thumbnail & description
09:33 – Why publishing one video a week is enough
10:25 – The business model that makes YouTube profitable
11:09 – Creator vs. business owner: Which game are you playing?

------------

👉 FREE TRAINING (hosted by Sunny Lenarduzzi) - 4 SIMPLE STEPS TO TURN YOUR EXISTING SKILL SET INTO A 6-FIGURE BUSINESS (without Paid Ads!): https://www.authoritydotio.com/masterclass  

👉 READY TO APPLY? If you have an expertise to share and you''re ready to make a big impact by creating your highly scalable online course, click the link below to schedule a time to see if we''re a fit to work together inside of Ascent:
https://www.authoritydotio.com/now

------------

👀 WATCH OUR NEW CHANNEL: https://www.youtube.com/@authority-io?sub_confirmation=1

🤝 SEE OUR SUCCESS STORIES: https://www.youtube.com/@TheAuthorityioSuccess?sub_confirmation=1

👋 SAY HI:
▪ https://sunnylenarduzzi.com/
▪ https://authority.io/ 
▪ https://www.linkedin.com/in/sunnylenarduzzi/ 
▪ https://www.facebook.com/SunnyLenarduzzi/ 
▪ https://www.instagram.com/sunnylenarduzzi/ 
▪ https://www.youtube.com/c/SunnyLenarduzzi 
▪ https://www.youtube.com/@authority-io 

Thanks for watching and see you in the next one! 💛 - Sunny

------------

https://youtu.be/6mUScq-6U3U

How I Built an Online Course that Makes $5M/Yr - https://www.youtube.com/watch?v=UgWwnTrvm2w
How I Made $30M On YouTube Without Millions Of Views - https://www.youtube.com/watch?v=NWcQ63xHFmo
How I Make $500K/Month Without Social Media - https://www.youtube.com/watch?v=jQAxjKuJcBA 
Here’s How I would make 100k in 6 Months - https://www.youtube.com/watch?v=6aKiQUrIGuk 

#OnlineCoaching #CoachingBusiness #CourseCreation #OnlineBusiness #YouTubeStrategy #authority #Authorityio', '2026-07-21T13:00:10Z', 1368, '[]'::jsonb, 'https://i.ytimg.com/vi/6mUScq-6U3U/maxresdefault.jpg', 'https://www.youtube.com/watch?v=6mUScq-6U3U') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('6mUScq-6U3U', 699729, 18846, 17917);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('76273aee-6ea8-5ead-a6ea-a228298010dc', 'branding-marketing', 'youtube', 'Think Media', '@thinkmediatv', 'https://www.youtube.com/@thinkmediatv', 'UCGxjDWAN1KwrkXYVi8CXtjQ', 3540000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('yPgl1yaYClg', '76273aee-6ea8-5ead-a6ea-a228298010dc', 'youtube', '5 Things I Wish I Knew Before Making 500+ Videos', 'Stop losing viewers in the first 30 seconds! Here is how to structure high-retention YouTube videos. 🎯 Take our free 2-minute quiz to find out what to focus on next to grow your channel: https://mycreatorquiz.com', 'Stop losing viewers in the first 30 seconds! Here is how to structure high-retention YouTube videos. 🎯 Take our free 2-minute quiz to find out what to focus on next to grow your channel: https://mycreatorquiz.com

⭐️ Our free YouTube growth class reveals 3 essential secrets we''re using to get more views, subscribers, and income—watch here ➡️ http://ThinkMasterclass.com

This video is NOT sponsored. Some of the links below are sponsored or affiliate links. This means I may earn a small commission if you buy something, or get paid when you click on them. 

=============================
All Products and Gear Mentioned in this video
=============================
🎯 Take the Free 2-Minute Creator Quiz: https://mycreatorquiz.com

🎬 Watch Next: https://www.youtube.com/watch?v=wZsXFNVGW7Y

===========================
Connect with us!   
=============================
Tik Tok: ➡︎ https://www.tiktok.com/@thinkmediaofficial/
IG: ➡︎ https://www.instagram.com/officialthinkmedia/

===========================
Subscribe and Listen to the Think Media Podcast HERE:📱 
===========================
➡︎YT:   @ThinkMediaPodcast  
➡︎Apple: https://apple.co/2F3tmIS
➡︎Spotify: https://spoti.fi/36qevE8


⏰ Timecodes ⏰
0:00 - Why More Editing Won''t Save Your Video
0:40 - The Critical First 30 Seconds Rule
1:43 - The 5-Part Video Retention Framework
1:57 - Part 1: Promise (One Clear Theme)
5:38 - Part 2: Attention (How to Hook Viewers)
10:25 - Part 3: Clarity (Cutting Fluff & Runtime)
12:09 - Part 4: Proof (Show, Don''t Just Tell)
12:57 - Part 5: Momentum (Retention Without Fast Cuts)
15:26 - Copy-Paste Video Outline Template
16:12 - Full 5-Step Framework Recap

===========================
Here are the ways to work with us here at Think Media: 
===========================
⚡️FREE CLASS: Watch our FREE YouTube class here: ➡︎ http://ThinkMasterclass.com 
⚡️BOOK: Check out the #1 best-selling book YouTube Secrets here:  ➡︎ https://ytsecrets.com/ 
⚡️For Support inquires, or Business inquiries, please go to ➡︎ http://ThinkMediaSupport.com
⚡️Join our YouTube Course & Community TODAY with this special limited-time bundle at: http://joinvra.com

===========================
Connect with Sean Cannell on Social Media:
===========================
➡︎https://www.linkedin.com/in/seancannell/
➡︎https://twitter.com/seancannell
➡︎https://instagram.com/seancannell

===========================
What We Use For Music:
===========================
🔥 Get a 7-day free trial for new personal and commercial plan here! ➡️  http://thinkmediasounds.com

===========================
In-Depth Channel Analytics and Ideas
===========================
Get a 30-Day trial of vidIQ''s MAX plan for just $1 here:  👉 http://vidiq.com/think
===========================
#thinkmedia #seancannell #thinkmediapodcast 

A great title and thumbnail get people to click—but your video structure is what makes them stay! After editing over 500 YouTube videos, Nate breaks down the exact 5-part framework (Promise, Attention, Clarity, Proof, and Momentum) he uses to plan, script, and edit high-retention videos.

You''ll learn how to build a central video theme, write curiosity hooks that survive the critical first 30 seconds, cut fluff that doesn''t earn its runtime, and keep viewer momentum rolling without relying on exhausting fast cuts!

Our mission here at Think Media is to help purpose-driven entrepreneurs go full-time doing what they love and making an impact through the power of video. 

Disclaimer: Please see the link for our disclaimer policy for all of our videos on the Think Media and Think Media Podcast YouTube channels. https://go.thinkmedia.com/youtube-disclaimer', '2026-11-23T13:00:25Z', 1041, '[]'::jsonb, 'https://i.ytimg.com/vi/yPgl1yaYClg/maxresdefault.jpg', 'https://www.youtube.com/watch?v=yPgl1yaYClg') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('yPgl1yaYClg', 8154, 159, 18);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('7b1d5c4e-5f4e-5907-a47e-6b64a483aa57', 'branding-marketing', 'youtube', 'Social Media Examiner', '@socialmediaexaminer', 'https://www.youtube.com/@socialmediaexaminer', 'UCS3lFRhXKfCZ8FvRqPjy9NA', 345000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('BaGm8w9M3N8', '7b1d5c4e-5f4e-5907-a47e-6b64a483aa57', 'youtube', 'The Science of Attention: Creating Short Form Videos People Won''t Skip', 'Do people stop and watch your short-form videos, or do they scroll right past them? Wonder how others consistently engineer short-form videos that get watched, shared, and remembered? Discover how to leverage three psychological principles that make people stop scrolling to wa…', 'Do people stop and watch your short-form videos, or do they scroll right past them? Wonder how others consistently engineer short-form videos that get watched, shared, and remembered? Discover how to leverage three psychological principles that make people stop scrolling to watch short-form videos.

⏰ *Timestamps*
00:00 Intro
08:25 Getting Started With the Science of Attention
16:10 Connection: The Two-Fold Foundation of Short-Form Video
23:30 Reputation: The Authenticity Formula for Short-Form Video
39:35 Emotion: The Engine That Makes Short-Form Video Spread

👤 *More From Hilary Billings*
– Free Offer https://www.attentioneers.com/smmp

🔗 *Resources From The Host*
– Show Notes https://www.socialmediaexaminer.com/the-science-of-attention-creating-short-form-videos-people-wont-skip
– Social Media Marketing Industry Report Download https://www.socialmediaexaminer.com/social-media-marketing-industry-report-2025
– Connect With Michael Stelzner on Facebook  https://www.facebook.com/stelzner 
– Connect With Michael Stelzner on X https://x.com/mike_stelzner

#SocialMediaExaminer #SocialMediaMarketingPodcast #ShortFormVideo', '2026-05-07T12:00:32Z', 2834, '[]'::jsonb, 'https://i.ytimg.com/vi/BaGm8w9M3N8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=BaGm8w9M3N8') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('BaGm8w9M3N8', 1759, 46, 4);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('FzITrLrvyDc', '7b1d5c4e-5f4e-5907-a47e-6b64a483aa57', 'youtube', 'How to Create Short-Form Video Content That Stops the Scroll', 'Are you struggling to cut through the noise on social media? Wondering how to make videos people will watch before they even think of scrolling?', 'Are you struggling to cut through the noise on social media? Wondering how to make videos people will watch before they even think of scrolling? 

You''ll discover hooks and transitions for short-form video content that stops the scroll and builds genuine connections with your audience.

🔔 Subscribe for More Marketing Insights 
– https://www.youtube.com/channel/UCS3lFRhXKfCZ8FvRqPjy9NA?sub_confirmation=1

👁️‍🗨️ About Eden Hazan
– Website https://www.thesocialdrop.ca/

🔗 Show Notes From This Episode
– Find other products, tools, and resources mentioned in this episode https://www.socialmediaexaminer.com/how-to-create-short-form-video-content-that-stops-the-scroll

🤝 Connect With Michael Stelzner 
– Michael Stelzner on Facebook https://www.facebook.com/stelzner
– Michael Stelzner on X https://x.com/mike_stelzner

⏰ Timestamps
00:00 Intro
06:28 How to Research and Ideate Short-Form Video Content Ideas
20:36 How to Develop Scroll-Stopping Hooks for Short-Form Video: 5 Examples
27:14 How to Use Transitions in Short-Form Video: 2 Examples
35:29 How to Apply the Three Ps for Engaging Short-Form Video Content

#SocialMediaExaminer #SocialMediaMarketingPodcast #VideoStrategy', '2025-11-27T13:00:38Z', 2998, '[]'::jsonb, 'https://i.ytimg.com/vi/FzITrLrvyDc/maxresdefault.jpg', 'https://www.youtube.com/watch?v=FzITrLrvyDc') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('FzITrLrvyDc', 4299, 111, 7);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('FlhiOFANbsE', '7b1d5c4e-5f4e-5907-a47e-6b64a483aa57', 'youtube', '4 Ways to Create Passionate Fans for Your Business', 'Wondering how to turn customers into loyal fans who stick with your business even when a cheaper competitor comes along? Want fan-building marketing tactics that work? Discover four ways to create passionate fans for your business using in-person experiences, behind-the-scenes…', 'Wondering how to turn customers into loyal fans who stick with your business even when a cheaper competitor comes along? Want fan-building marketing tactics that work? Discover four ways to create passionate fans for your business using in-person experiences, behind-the-scenes content, gamification, and your personal passions.

⏰ *Timestamps*
00:00 - How to Turn Customers into Passionate Fans
01:18 - Fandom Marketing & David Meerman Scott''s Story
04:02 - Biggest Mistake in Social Media Marketing
06:57 - Why Fandom Drives Repeat Business & Loyalty
08:14 - Neuroscience of Belonging: The 4 Proximity Zones
11:24 - Play 1: Ignite In-Person Connections
16:11 - Play 2: Go Behind the Curtain to Build Trust
28:27 - Play 3: Gamify Your Business Experience
40:02 - Play 4: Share Your Personal Passions
47:43 - Where to Get The Fandom Playbook

👤 *More From David Meerman Scott*
– Website https://www.davidmeermanscott.com

🔗 *Resources From The Host*
– Show Notes https://www.socialmediaexaminer.com/4-ways-to-create-passionate-fans-for-your-business
– Social Media Marketing Industry Report Download https://www.socialmediaexaminer.com/social-media-marketing-industry-report-2025
– Connect With Michael Stelzner on Facebook  https://www.facebook.com/stelzner 
– Connect With Michael Stelzner on X https://x.com/mike_stelzner

#SocialMediaExaminer #SocialMediaMarketingPodcast #MarketingStrategy', '2026-11-05T13:00:17Z', 2952, '[]'::jsonb, 'https://i.ytimg.com/vi/FlhiOFANbsE/maxresdefault.jpg', 'https://www.youtube.com/watch?v=FlhiOFANbsE') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('FlhiOFANbsE', 881, 14, 6);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('d08f7a18-d1a2-50ff-aebc-9aac2210852b', 'branding-marketing', 'youtube', 'Raj Shamani', '@rajshamani', 'https://www.youtube.com/@rajshamani', 'UCzwCEE_PchiBULMnAJqhGVg', 23000000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('n26Q0SA7z5c', 'd08f7a18-d1a2-50ff-aebc-9aac2210852b', 'youtube', 'How To Market Anything In 2027: Creators, Triggers & Communities | Kent Yoshimura |FO587 Raj Shamani', 'Neuro picks you up and locks you in. Get your Neuro focus gum & mints on Blinkit, Zepto or https://neurogumindia.com', 'Neuro picks you up and locks you in. Get your Neuro focus gum & mints on Blinkit, Zepto or https://neurogumindia.com

--------------

Get your hand-picked playbook here: https://www.figuringout.co/pdf/fo-587

--------------

Guest Suggestion Form: https://forms.gle/bnaeY3FpoFU9ZjA47

--------------

Design Your Own Podcast Episode: https://forms.gle/sx8iyUF9vnqhgvru7

--------------

Disclaimer: This video is intended solely for educational purposes and opinions shared by the guest are his personal views. We do not intent to defame or harm any person/ brand/ product/ country/ profession mentioned in the video. Our goal is to provide information to help audience make informed choices. The media used in this video are solely for informational purposes and belongs to their respective owners.

---------------

Order ''Build, Don''t Talk'' (in English) here: https://amzn.eu/d/eCfijRu
Order ''Build Don''t Talk'' (in Hindi) here: https://amzn.eu/d/4wZISO0

--------------

Follow Our WhatsApp Channel: https://www.whatsapp.com/channel/0029VaokF5x0bIdi3Qn9ef2J

--------------

Subscribe To Our Other YouTube Channels:-

https://www.youtube.com/@rajshamaniclips

https://www.youtube.com/@RajShamani.Shorts

🎧 Stream Figuring Out episodes on Spotify: 
https://open.spotify.com/show/736rhmW7vilNgkFFo8aDz4

📺 Watch Figuring Out episodes on YouTube:
https://youtube.com/playlist?list=PLE0Jo6NF_JYO5-phess8GKafKMtPv3tfZ

---------------

Timestamps - 

00:00 — Intro
03:39 — How Neurogum Built a Fast-Growing, Profitable D2C Brand
06:45 — How TikTok, Viral Marketing & Creator-Led Growth Changed Neurogum
15:23 — Building a Creator Army: Affiliate Marketing, Commissions & Brand Partnerships
30:42 — How to Launch Products & Create Marketing That Stands Out
46:08 — Micro vs. Mega Influencers: What Actually Drives Brand Growth?
55:43 — Celebrity Marketing, Experiential Campaigns & Building Brand Awareness
1:03:53 — The Foundations of a Memorable Brand: Identity, Voice & Customer Experience
1:25:11 — How to Build a Community That Turns Customers Into Brand Advocates
1:45:01 — Hiring, Leadership & Building a Strong Company Culture
1:56:56 — How Neurogum Expanded Globally & Why India Was a Key Market
2:04:40 — The Most Expensive Mistake He Made in His Career
2:10:14 — Spotting New Product Opportunities & Building the Next Big Category
2:15:47 — One Piece of Advice Nobody Should Follow
2:17:25 — The Most Extraordinary Thing He Wants to Do Next
2:18:26 — The Personal Cost of Becoming Kent
2:20:58 — Outro

---------------

In today''s episode, we sit down with Kent Yoshimura, co-founder and CEO of Neuro, to understand how he built a fast-growing D2C brand and turned influencer marketing into a powerful growth engine.

We discuss how NeuroGum cracked TikTok marketing, the 3 psychological triggers that make people buy, and how the company built an army of 2,500 creators to sell its products. Kent explains how influencers make up to $150,000 a month through affiliate marketing, why smaller creators can outperform celebrities, and how brands can turn content into a self-replicating sales machine.

The conversation also covers the biggest mistakes founders make, how a Shark Tank rejection turned into a second chance, why understanding your weaknesses is critical to building a business, and how to identify profitable product opportunities. Kent also shares why sex, stress and sleep are three markets that will always make money.

Subscribe for more such conversations.

Follow Kent Yoshimura Here:
Instagram: https://www.instagram.com/kentaro
X: https://x.com/kentyoshimura

---------------

About Raj Shamani
Raj Shamani is an entrepreneur and the host of the Figuring Out Podcast. He sits down with experts, athletes, celebrities, billionaires, and world leaders to break down how they actually win: money, business, mindset, relationships, and life. He''s also a bestselling author, speaker, and angel investor. His work sits at the intersection of business, psychology, and human behaviour.

To Know More,
Follow Raj Shamani On ⤵︎

Instagram @RajShamani
https://www.instagram.com/rajshamani/

Twitter @RajShamani
https://twitter.com/rajshamani

Facebook @ShamaniRaj
https://www.facebook.com/shamaniraj

LinkedIn - Raj Shamani
https://www.linkedin.com/in/rajshamani/

•   •   •

#podcast #FiguringOut #RajShamani #influencer #marketing #growth #tiktok #creator #content #sleep 
 
About Figuring Out
Figuring Out Podcast is a Candid Conversations University where Raj Shamani brings raw conversations with the Top 1% in India.', '2026-11-12T15:39:30Z', 8486, '[]'::jsonb, 'https://i.ytimg.com/vi/n26Q0SA7z5c/maxresdefault.jpg', 'https://www.youtube.com/watch?v=n26Q0SA7z5c') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('n26Q0SA7z5c', 789949, 6669, 362);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'branding-marketing', 'youtube', 'orenmeetsworld', '@orenmeetsworld', 'https://www.youtube.com/@orenmeetsworld', 'UC_tSQ6UQy2pROm-I0J7UBoA', 267000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('E-RHiBrU1KI', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'Why People Are Obsessed With Luxury Brands (Dior Case Study)', 'Get started with Bitly for tracking your marketing: https://bit.ly/orenbitlyyt #BitlyPartner #BitlyBuddy', 'Get started with Bitly for tracking your marketing: https://bit.ly/orenbitlyyt #BitlyPartner #BitlyBuddy

In this video Oren walks through the era''s of Dior, their creative direction and art direction tactics, and what new luxury brands and creatives can bring into their own brand strategy work.

Learn more about Runneth, the AI marketing brain for your brand: https://orenmeetsworld.com/4kgni4E

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us
Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com

00:00 The New Luxury Playbook: From Loewe to Dior
05:49 Sets, Social Media & Building a Brand World
13:02 How Dior Creates Viral Products
21:32 Dior’s Meta Ads & Influencer Seeding Strategy
25:28 Knowing Your Customer & Casting Your Brand', '2026-11-01T20:00:09Z', 1781, '[]'::jsonb, 'https://i.ytimg.com/vi/E-RHiBrU1KI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=E-RHiBrU1KI') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('E-RHiBrU1KI', 31629, 483, 16);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('tBySJTvEz6Q', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'it’s boring, but it’ll make you more money than anything else in marketing', 'Learn more about Hubspot Smart CRM: https://clickhubspot.com/5c1e85', 'Learn more about Hubspot Smart CRM: https://clickhubspot.com/5c1e85

Get the download
https://money.creativedirector.net/

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us

Marketers who stay close to revenue make the most money. This is the part of marketing nobody makes fun videos about: how sales actually works, what a CRM does, and where marketing fits in.
In about 20 minutes, I walk through the whole system for any business that sells through leads, whether that''s an agency, a high-ticket product, freelance services or an electrician:
• Sales life: leads, prospects, closed/won, onboarding and customer success
• The lead cycle: MQLs vs. SQLs, assignment, speed to first touch, and why one business I worked in took an average of 11 touches to close
• Three kinds of content your sales team needs: hype, tactical and useful
• Inside the CRM: pipelines, stages, templates, rules and automation
• Making the sale: one-to-one vs. one-to-many, sales collateral, and using AI call notes to improve your pitch
• Getting leads: what a lead is worth, then ads, organic, your customer list, LinkedIn and outbound

Grow your brand with our agency: https://www.darkroomagency.com/oren
About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com

0:00 Money marketing
1:06 01 Sales terms to know
4:05 02 What is a lead cycle
12:08 03 Three kinds of content to support sales
13:35 04 Inside the CRM
15:40 05 Making the sale
17:02 06 Getting leads', '2026-11-07T19:00:07Z', 1313, '[]'::jsonb, 'https://i.ytimg.com/vi/tBySJTvEz6Q/maxresdefault.jpg', 'https://www.youtube.com/watch?v=tBySJTvEz6Q') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('tBySJTvEz6Q', 31835, 496, 35);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('wBM6b4MRCv0', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'The Psychology Behind Why We Buy (Gen-Z vs Millennials)', 'Learn more about Runneth, the AI marketing brain for your brand: https://orenmeetsworld.com/4kgni4E', 'Learn more about Runneth, the AI marketing brain for your brand: https://orenmeetsworld.com/4kgni4E

In this video Oren breaks down marketing strategy for ads and content to Gen-Z, vs millenials vs Gen-X vs boomers and the psychology behind why each buy.

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us
Join the next Cut30 short form bootcamp: https://cut30.co
Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com

:00 Why every generation buys
1:43 Gen Z: the doom spend generation
5:57 Millennials: question everything you were sold
10:57 How I pulled every ad 
12:27 Gen X: you don’t sell to them
18:10 Boomers: they can’t discern it', '2026-11-14T20:00:08Z', 1418, '[]'::jsonb, 'https://i.ytimg.com/vi/wBM6b4MRCv0/maxresdefault.jpg', 'https://www.youtube.com/watch?v=wBM6b4MRCv0') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('wBM6b4MRCv0', 43466, 633, 47);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('DmDxZfTBFs0', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'Why Your Marketing Never Goes Viral (and How to Fix It)', 'Learn about Swap for your e-commerce store: https://www.swap-commerce.com/book-a-demo?utm_source=youtube&utm_medium=influencer&utm_campaign=evergreen-commerce-consolidation&utm_content=oren-john-youtube', 'Learn about Swap for your e-commerce store: https://www.swap-commerce.com/book-a-demo?utm_source=youtube&utm_medium=influencer&utm_campaign=evergreen-commerce-consolidation&utm_content=oren-john-youtube

I went inside Ladder HQ in Austin to sit down with Edsel, VP of Brand & Creative at Ladder, the strength training app that grew on TikTok and Instagram through its coaches.

We tour the content studio they rebuilt in their office, then break down two real campaigns side by side. The first is Sustain, a low-budget series they shot in Chicago with just the in-house team and coaches. The second is their biggest swing yet: Hilary Duff, from the pitch and the "Stronger, not smaller" New York Times back page to the TIME100 moment that went viral on its own.

Along the way Edsel gets into why marketing is now an operator''s job, why behind-the-scenes content is part of the campaign, the cheap plexiglass stage that beat their bigger stunts, when a celebrity deal is actually worth it, and why giving celebrity footage to creators for reaction videos worked almost as well as the campaign itself.

0:00 Intro
0:53 Becoming a Creative Director
4:21 Tour of the content studio
7:03 Swap for e-commerce
8:30 The low-budget campaign
17:07 The big swing: Hilary Duff
25:24 Lessons learned
27:15 What''s next + advice

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us
Join the next Cut30 short form bootcamp: https://cut30.co
Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com', '2026-11-18T20:00:08Z', 1769, '[]'::jsonb, 'https://i.ytimg.com/vi/DmDxZfTBFs0/maxresdefault.jpg', 'https://www.youtube.com/watch?v=DmDxZfTBFs0') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('DmDxZfTBFs0', 10928, 147, 9);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('M4Pre4GRX7Y', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'The New Era of Social Media Marketing', 'Oren live in San Francisco at the Chief Marketer event from Runneth.', 'Oren live in San Francisco at the Chief Marketer event from Runneth.

Upcoming live events: 
LA is next in January: https://runneth.com/events/chief-marketer/la/
Then London in February: https://runneth.com/events/chief-marketer/london/

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us
Join the next Cut30 short form bootcamp: https://cut30.co
Grow your brand with our agency: https://www.darkroomagency.com/oren

How do brands get noticed when every feed looks the same? In this talk I break down how modern brands build "worlds": the characters, content calendar, creators and formats that drive marketing now, versus the old "target market + ad campaign" playbook.

We cover the normie-to-fringe channel chart, why your owned account matters less than ever, how the best brands multiply one winning idea across demographics and generations (Gen Z, Millennials, Gen X, Boomers), why budgets should work like a gas pedal, and the Messages × Concepts × Hooks workshop I run with brands to turn ideas into 30–40 pieces of creative.

Brands and tools mentioned: Tarte, Ulta, Ridge, Ramp, Kosas, Buffer, Air, Ladder, Outer Signal, Trybe, SideShift, Muse, Morphe, ReelFarm, Runneth.

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com

Chapters
0:00 Intro: marketing in the noise era
1:21 Normie vs. fringe: picking your channels
2:33 Brand worlds start with characters
6:18 The content calendar and recruiting creators
10:16 New social media and demographic reach
12:29 Generational marketing: Gen Z to Boomers
16:30 Scale, budgets and real-time data
19:02 Workshop: messages, concepts and hooks', '2026-11-22T19:00:09Z', 1373, '[]'::jsonb, 'https://i.ytimg.com/vi/M4Pre4GRX7Y/maxresdefault.jpg', 'https://www.youtube.com/watch?v=M4Pre4GRX7Y') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('M4Pre4GRX7Y', 32959, 613, 37);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('PccrCJX5AuQ', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'The Art Direction of a Luxury Personal Brand', 'This video is brought to you by Framer, learn more about using Framer Agents to build websites here. Code: OREN2 https://framer.link/Oren2', 'This video is brought to you by Framer, learn more about using Framer Agents to build websites here. Code: OREN2
https://framer.link/Oren2

Join the next community call: https://www.creativedirector.net/webinar-luxury

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us
Join the next Cut30 short form bootcamp: https://cut30.co
Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com', '2026-10-03T19:00:11Z', 1606, '[]'::jsonb, 'https://i.ytimg.com/vi/PccrCJX5AuQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=PccrCJX5AuQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('PccrCJX5AuQ', 62300, 1027, 27);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('daCB1kVOtMA', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'The Most Valuable Marketing Training You''ll Ever Watch', 'Get all the free downloads and extras: https://marketing.creativedirector.net', 'Get all the free downloads and extras: https://marketing.creativedirector.net

Get started with ChatGPT: https://chatgpt.com/download/

Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com

0:00:00 Marketing in the AI Era
0:05:39 Brand Positioning & Differentiation
0:15:40 Mapping Your Brand World
0:24:43 Messaging, Copywriting & AI Workflows
0:38:22 Demand Generation & Organic Social Media
1:07:29 Paid Advertising Fundamentals
1:18:40 Meta Ads Walkthrough & Creative Strategy
1:30:58 Creators, Influencers & Creative Briefs
1:43:02 Turning Attention Into Leads & Sales
1:53:33 Landing Pages That Convert
2:02:48 Brand Narrative, Campaigns & PR
2:13:47 Email, SMS & Customer Retention
2:28:22 Sales Support & Marketing Alignment
2:39:02 Building a Marketing Campaign
2:42:35 Internal Communication & Proving Marketing’s Value', '2026-10-11T19:00:07Z', 10018, '[]'::jsonb, 'https://i.ytimg.com/vi/daCB1kVOtMA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=daCB1kVOtMA') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('daCB1kVOtMA', 325513, 5207, 170);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('W9EQVL5zUvk', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'What working in marketing is ACTUALLY like in 2026', 'Learn more about Lovable: https://link.lovable.dev/QwxjLNR', 'Learn more about Lovable: https://link.lovable.dev/QwxjLNR

In this video Oren and guest creative strategist Drew Barrett go through marketing tactics working right now, from street interviews and UGC to collabs and experientiall
About Drew: https://www.instagram.com/drewbarrettt/

Join the next community call: https://www.creativedirector.net/webinar-luxury

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us

Join the next Cut30 short form bootcamp: https://cut30.co

Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com

00:00 Intro
00:52 Street interviews 
04:05 Why brands are opening coffee shops
06:08 Social shows 
10:28 Employee-generated content
13:11 Internal tools for marketing teams
14:42 Trybe and UGC ads
18:25 TikTok Live shopping
19:50 Creators signing long-term  deals
23:17 Scaling content production
25:13 “Dark marketing” 
27:17 Astra: editing videos 
28:40 Creator clothing brands
29:49 Larry June × Adidas
32:03 Apple’s iPhone rollout
34:06 Cadence: athlete partnerships
37:39 Becoming a creator and a strategist', '2026-10-18T20:00:08Z', 2398, '[]'::jsonb, 'https://i.ytimg.com/vi/W9EQVL5zUvk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=W9EQVL5zUvk') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('W9EQVL5zUvk', 40131, 643, 25);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('Aq-saHaIlEw', '7149dde5-e0ce-58fb-a7cf-c0909c5d5162', 'youtube', 'How to become a one person content machine in 2026', 'This video is brought to you by Framer, learn more about using Framer Agents to build websites here. Code: OREN2 https://framer.link/Oren2', 'This video is brought to you by Framer, learn more about using Framer Agents to build websites here. Code: OREN2
https://framer.link/Oren2

Video editing: 
https://www.hyperstudios.us/p/the-new-rules-of-brand-marketing

Oren walks through the modern toolkit for creative teams: editing video with Tesseract, executing motion graphics with ChatGPT and Claude, design with Framer, and executing ads with Runneth.

00:00 How to Become a One-Person Creative Team
03:05 AI Video Editing with DaVinci Resolve and Tesseract
04:31 My AI Video Editing Workflow
10:08 AI Graphic Design with Framer
12:07 Framer Agent Skills (Sponsored)
13:51 AI Motion Graphics with Claude and Hyperframes
18:25 Runneth: AI Ad Research and Creative Briefs
20:50 Building Custom 3D Creative Tools

Sign up for my weekly brand strategy newsletter: https://hyperstudios.us
Join the next Cut30 short form bootcamp: https://cut30.co
Grow your brand with our agency: https://www.darkroomagency.com/oren

About Me: https://orenjohn.com/
For Brand Partnerships: oren@delucamediagroup.com', '2026-10-21T19:00:10Z', 1353, '[]'::jsonb, 'https://i.ytimg.com/vi/Aq-saHaIlEw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=Aq-saHaIlEw') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('Aq-saHaIlEw', 52720, 1122, 55);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('6c1f8651-f1de-583a-aae8-ca7cae2e11cc', 'branding-marketing', 'youtube', 'Omar Eddaoudi', '@omareddaoudi795', 'https://www.youtube.com/@omareddaoudi795', 'UC7ACBBjiLZEKSy47w8T35Lw', 34300, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('YbKV4_g9P3A', '6c1f8651-f1de-583a-aae8-ca7cae2e11cc', 'youtube', 'Don''t Start Black Friday Until You Watch This', 'Work with my team to scale your brand: https://www.ogrowthlabs.com/schedule-a-call?el=bf2026&htrafficsource=youtube', 'Work with my team to scale your brand: https://www.ogrowthlabs.com/schedule-a-call?el=bf2026&htrafficsource=youtube

Work with me 1 on 1: https://calendly.com/ogrowthlabs/scale-code?el=bf2026&htrafficsource=youtube

Sign-up to Victor: https://app.viktor.com/signin?ref=5rkqSjLUyRAAas22Wqky3U

Join my free Ecom Insights newsletter: https://o-growth-labss.kit.com/72fd2b1e61

Black Friday is less than 60 days away, and for ecommerce brands, it represents one of the biggest opportunities of the year to drive sales, acquire new customers, and generate significant revenue in a short period of time.

But most brands make the same mistake. They wait until the last minute to prepare their offers, creatives, and campaigns, leaving them scrambling to test new ads when competition is at its highest and advertising costs are rising.

In this video, I break down the exact Black Friday and Cyber Monday strategy we use internally to help ecommerce brands prepare for the biggest sales event of the year. 

You''ll learn:

✅ How to analyse your last 3 to 6 months of ad performance to identify winning products, angles, creatives, and customer avatars

✅ Why you should build your Black Friday strategy around proven winners instead of testing unproven concepts during the most competitive period of the year

✅ The five offer strategies that can increase perceived value while protecting your margins, including direct discounts, bundles, tiered discounts, free gifts, and quantity-based offers

✅ How to structure your offer around your average order value, unit economics, and customer retention strategy

✅ The three creative categories every ecommerce brand needs for Black Friday: problem-solving ads, offer-led creatives, and urgency-driven ads

✅ How to turn one winning advertising angle into multiple video and static variations to increase creative volume and combat ad fatigue

✅ How to structure Meta Ads campaigns using CBO, organise creatives by angle, and separate video ads from static ads to improve budget allocation

✅ How to identify and fix conversion bottlenecks across your website, checkout, mobile experience, inventory, and fulfilment before scaling traffic

The biggest lesson is that Black Friday changes the urgency to buy, not the reason someone wants your product.

The strongest brands don''t rely on discounts alone. They combine a compelling offer with proven creative, clear messaging, strong unit economics, and a conversion funnel that can handle increased demand.

If you''re running an ecommerce brand and want to maximise your performance this Black Friday, the key is to prepare early, test before the event, and enter the sales period ready to scale what already works.

If you want my team to help you build your BFCM strategy, develop winning creatives, optimise your acquisition funnel, and scale profitably, book a call below.

Work with my team to scale your brand: https://www.ogrowthlabs.com/schedule-a-call?el=bf2026&htrafficsource=youtube

Work with me 1 on 1: https://calendly.com/ogrowthlabs/scale-code?el=bf2026&htrafficsource=youtube

Connect with me / watch my reels:
https://www.instagram.com/_omareddaoudi/

I''m Omar Eddaoudi, founder of O Growth Labs, a growth incubator for DTC ecommerce brands. We partner with ecommerce businesses to build scalable customer acquisition systems through performance marketing, creative strategy, and conversion optimisation.

Behind me is a team of strategists and creatives focused on helping brands grow through:

Facebook, Instagram, and Google Ads
Full-funnel growth strategy and execution
High-performance video and static ad creatives
Premium brand positioning and creative strategy
Conversion rate optimisation and customer acquisition
Data-driven testing, campaign management, and scaling

Our approach combines data, creative execution, and systematic testing to help ecommerce brands improve acquisition efficiency, increase profitability, and build more valuable businesses.

If you''re preparing for Black Friday and want a clear roadmap for your brand, book a call below.

Book a call: https://www.ogrowthlabs.com/schedule-a-call?el=bf2026&htrafficsource=youtube

Join my free Ecom Insights newsletter: https://o-growth-labss.kit.com/72fd2b1e61

Chapters

0:00 Intro: Preparing for Black Friday
0:41 When to Start Preparing for BFCM
1:10 Analysing Your Historical Ad Performance
3:18 Fixing Your Funnel Before Scaling
4:47 How to Build an Irresistible Black Friday Offer
5:26 Five Offer Strategies to Maximise Value
7:56 Matching Your Offer to Your Business
9:03 Building Your Black Friday Creative Strategy
10:58 Why You Shouldn''t Copy Competitors
12:28 The Three Creative Buckets Every Brand Needs
13:37 Turning Winning Angles into Multiple Ads
14:59 Meta Ads Campaign Structure and Scaling
16:26 Separating Video and Static Ads
16:38 The Complete Black Friday Playbook', '2026-10-26T17:00:10Z', 1048, '[]'::jsonb, 'https://i.ytimg.com/vi/YbKV4_g9P3A/maxresdefault.jpg', 'https://www.youtube.com/watch?v=YbKV4_g9P3A') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('YbKV4_g9P3A', 803, 18, 2);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('N7NwvZ2tDzQ', '6c1f8651-f1de-583a-aae8-ca7cae2e11cc', 'youtube', 'The 7-Figure Ad Creative System (Full Breakdown)-', 'Work with my team to scale your brand: https://www.ogrowthlabs.com/schedule-a-call?el=adsystem&htrafficsource=youtube', 'Work with my team to scale your brand: https://www.ogrowthlabs.com/schedule-a-call?el=adsystem&htrafficsource=youtube

Work with me 1 on 1: https://calendly.com/ogrowthlabs/scale-code?el=adsystem&htrafficsource=youtube

Sign-up to Viktor: https://app.viktor.com/signin?ref=5rkqSjLUyRAAas22Wqky3U

Join my free Ecom Insights newsletter: https://o-growth-labss.kit.com/72fd2b1e61

Most ecommerce brands don''t struggle with scaling because they lack creative ideas. They struggle because they have no structured creative strategy or repeatable system for producing winning ads.

In this video, I break down the exact 8-step creative strategy SOP we use internally at O Growth Labs to help ecommerce brands scale to seven and eight figures in sales.

You''ll learn:

✅ How to research your customers using reviews, website behaviour, competitor ads and ad account data to understand their psychology, pain points and desires

✅ How to use AI to analyse thousands of customer reviews, extract emotional drivers, identify objections and uncover the insights that drive purchasing decisions

✅ How to build detailed customer avatars based on buyer psychology, awareness stages, emotional triggers, competitive positioning and purchase motivations

✅ How to implement a creative testing framework to identify winning ads, iterate on underperforming creatives and scale proven concepts

The biggest lesson is that successful creative strategy isn''t about copying competitors or constantly coming up with random ideas.

It''s about understanding your customers better than your competitors, developing a structured process for turning those insights into creatives, and building feedback loops that make every iteration better than the last.

The strongest brands don''t rely on guesswork. They combine deep customer research, buyer psychology, intentional creative development and systematic testing to consistently produce winning ads.

If you''re running an ecommerce brand and want to improve your creative strategy, increase your number of winning ads and scale your acquisition profitably, the key is to build a repeatable system rather than relying on individual creative ideas.

Work with my team to scale your brand: https://www.ogrowthlabs.com/schedule-a-call?el=adsystem&htrafficsource=youtube

Work with me 1 on 1: https://calendly.com/ogrowthlabs/scale-code?el=adsystem&htrafficsource=youtube

Connect with me:
https://www.instagram.com/_omareddaoudi/

I''m Omar Eddaoudi, founder of O Growth Labs, a growth incubator for DTC ecommerce brands. We partner with ecommerce businesses to build scalable customer acquisition systems through performance marketing, creative strategy and conversion optimisation.

Behind me is a team of strategists and creatives focused on helping brands grow through:

Facebook, Instagram and Google Ads
Full-funnel growth strategy and execution
High-performance video and static ad creatives
Premium brand positioning and creative strategy
Conversion rate optimisation and customer acquisition
Data-driven testing, campaign management and scaling

Our approach combines data, creative execution and systematic testing to help brands improve acquisition efficiency, increase profitability and build more valuable businesses.

If you''re looking to build a more structured creative strategy and consistently produce winning ads, book a call below.

Book a call: https://www.ogrowthlabs.com/schedule-a-call?el=adsystem&htrafficsource=youtube

Join my free Ecom Insights newsletter: https://o-growth-labss.kit.com/72fd2b1e61

Chapters

0:00 Intro: The importance of creative strategy
0:45 Why most brands have a weak creative strategy
3:14 The two-stage creative strategy process
4:14 The 8-step creative strategy SOP
4:59 Researching your customers
5:23 Review mining and buyer psychology
5:57 Using AI for customer research
6:52 Analysing website behaviour and funnel friction
7:42 Analysing positive and negative customer sentiment
8:38 Competitor positioning and identifying market gaps
10:12 Building detailed customer avatars
11:19 Creating your master insights document
13:14 Turning customer insights into creative angles
15:02 Mapping angles and developing hooks
15:52 Choosing the right creative formats
16:41 Writing effective creative briefs
18:09 The 10 questions every creative brief should answer
18:38 Creative quality control
18:55 When to scale, iterate and kill ads
21:18 Building daily, weekly and monthly feedback loops
22:32 The complete creative strategy process', '2026-11-10T23:00:09Z', 1442, '[]'::jsonb, 'https://i.ytimg.com/vi/N7NwvZ2tDzQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=N7NwvZ2tDzQ') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('N7NwvZ2tDzQ', 654, 23, 3);

insert into public.creators (id, niche_id, platform, display_name, handle, profile_url, channel_id, followers, followers_checked_on, criteria_checked, curated_by, curated_on, active) values ('8f3aa927-df39-505b-a6d2-c3698d209041', 'branding-marketing', 'youtube', 'Adam Erhart', '@adamerhartvideo', 'https://www.youtube.com/@adamerhartvideo', 'UCKU0u3VbuYn0wD3CUr-Yn6A', 735000, now(), array[]::text[], 'CreatorLab team (source lists)', '2026-11-25', true) on conflict (id) do update set niche_id = excluded.niche_id, platform = excluded.platform, display_name = excluded.display_name, handle = excluded.handle, profile_url = excluded.profile_url, channel_id = coalesce(excluded.channel_id, creators.channel_id), followers = coalesce(excluded.followers, creators.followers), followers_checked_on = coalesce(excluded.followers_checked_on, creators.followers_checked_on), active = true;
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('mDhkSDSnvOo', '8f3aa927-df39-505b-a6d2-c3698d209041', 'youtube', 'GoHighLevel Black Friday Deal 2026: Founder Plan 50% Off (What You Get)', '🔥 BLACK FRIDAY: 50% OFF HighLevel for 3 months + my $15,000+ in bonuses + FREE done-for-you setup: https://adamerhart.co/4tdJ4bH ⬆️ ALREADY ON HIGHLEVEL OR IN A TRIAL? See Founder Plan upgrades & other exclusive deals (up to 50% OFF): https://adamerhart.co/4iXCdj9', '🔥 BLACK FRIDAY: 50% OFF HighLevel for 3 months + my $15,000+ in bonuses + FREE done-for-you setup: https://adamerhart.co/4tdJ4bH
⬆️ ALREADY ON HIGHLEVEL OR IN A TRIAL? See Founder Plan upgrades & other exclusive deals (up to 50% OFF): https://adamerhart.co/4iXCdj9

---

⚡ 30-Day FREE HighLevel Trial + $15,000+ in Bonuses: https://adamerhart.co/4wlai0v
👉 FREE AI Agency Course + $15,000+ in Bonuses: https://adamerhart.co/44OPAdv
🔓 Already on HighLevel? Log in, then upgrade to unlock $15,000+ in bonuses: https://adamerhart.co/upgrade

When you start, you unlock my complete Agency OS, including:
• My proprietary snapshot + framework used to build three 7-figure agencies
• What to sell, who to target, what to charge, and how to land your first or next client
• Plug-and-play funnels, automations, follow-up, booking, and review systems
• Client-finding tools, outreach scripts, sales scripts, and templates
• A step-by-step 90-day roadmap so you always know what to do next
• Ongoing coaching, training, and private community support

Everything unlocks immediately.

⚠️ Disable ad blockers, VPNs, or incognito mode before clicking so bonuses unlock correctly.

I may earn a commission if you use my link, at no extra cost to you. It’s the exact platform and setup I use to run my own business.

---

📕 Free First Client Playbook (What to Sell + Who to Target + What to Say): https://adamerhart.co/getclients', '2026-11-23T15:30:50Z', 698, '[]'::jsonb, 'https://i.ytimg.com/vi/mDhkSDSnvOo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=mDhkSDSnvOo') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('mDhkSDSnvOo', 1965, 24, 10);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('LHgEUdWl9Tg', '8f3aa927-df39-505b-a6d2-c3698d209041', 'youtube', 'GoHighLevel Tutorial for Beginners 2026 (Get Your First Client, No Cold Calling)', '🔥 BLACK FRIDAY: 50% OFF HighLevel for 3 months + my $15,000+ in bonuses + FREE done-for-you setup: https://adamerhart.co/4l8ClNX ⬆️ ALREADY ON HIGHLEVEL OR IN A TRIAL? See Founder Plan upgrades & other exclusive deals (up to 50% OFF): https://adamerhart.co/4tioC9p', '🔥 BLACK FRIDAY: 50% OFF HighLevel for 3 months + my $15,000+ in bonuses + FREE done-for-you setup: https://adamerhart.co/4l8ClNX
⬆️ ALREADY ON HIGHLEVEL OR IN A TRIAL? See Founder Plan upgrades & other exclusive deals (up to 50% OFF): https://adamerhart.co/4tioC9p

---

⚡ 30-Day FREE HighLevel Trial + $15,000+ in Bonuses: https://adamerhart.co/4Chu40w
👉 FREE AI Agency Course + $15,000+ in Bonuses: https://adamerhart.co/4jq9BPt
🔓 Already on HighLevel? Log in, then upgrade to unlock $15,000+ in bonuses: https://adamerhart.co/upgrade

When you start, you unlock my complete Agency OS, including:
• My proprietary snapshot + framework used to build three 7-figure agencies
• What to sell, who to target, what to charge, and how to land your first or next client
• Plug-and-play funnels, automations, follow-up, booking, and review systems
• Client-finding tools, outreach scripts, sales scripts, and templates
• A step-by-step 90-day roadmap so you always know what to do next
• Ongoing coaching, training, and private community support

Everything unlocks immediately.

⚠️ Disable ad blockers, VPNs, or incognito mode before clicking so bonuses unlock correctly.

I may earn a commission if you use my link, at no extra cost to you. It’s the exact platform and setup I use to run my own business.

---

📕 Free First Client Playbook (What to Sell + Who to Target + What to Say): https://adamerhart.co/getclients

0:00 - New to GoHighLevel? Start Here
1:36 - Agency Accounts vs. Subaccounts: What You Need to Know
3:17 - The Only 2 Agency Settings You Need Right Now
4:23 - The Shortcut to Setting Up HighLevel in Minutes
5:38 - Create Your First Subaccount Step by Step
7:01 - The 6 HighLevel Features Every Beginner Should Know
7:31 - Manage All Your Contacts and Messages in One Place
8:23 - Automate Bookings and Track Every Potential Customer
9:17 - How HighLevel Automations Actually Work
10:23 - What You Can Safely Ignore as a Beginner
11:00 - Build a Google Review System Businesses Will Pay For
12:15 - 3 Simple Changes to Customize Your Review System
13:00 - Avoid These Mistakes Before Activating Automations
14:18 - Your First Week with HighLevel: What to Do Next
15:32 - How to Find Businesses That Need Your Services', '2026-11-20T13:00:38Z', 1087, '[]'::jsonb, 'https://i.ytimg.com/vi/LHgEUdWl9Tg/maxresdefault.jpg', 'https://www.youtube.com/watch?v=LHgEUdWl9Tg') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('LHgEUdWl9Tg', 2938, 56, 5);
insert into public.videos (video_id, creator_id, platform, title, description_summary, description_full, published_at, duration_seconds, chapters, thumbnail_url, video_url) values ('RjT4GtqzDag', '8f3aa927-df39-505b-a6d2-c3698d209041', 'youtube', 'I Rebuild Old Websites for Free. Then They Pay Me $297/Mo', '🔥 BLACK FRIDAY: 50% OFF HighLevel for 3 months + my $15,000+ in bonuses + FREE done-for-you setup: https://adamerhart.co/4zC5HYM ⬆️ ALREADY ON HIGHLEVEL OR IN A TRIAL? See Founder Plan upgrades & other exclusive deals (up to 50% OFF): https://adamerhart.co/49b3j0g', '🔥 BLACK FRIDAY: 50% OFF HighLevel for 3 months + my $15,000+ in bonuses + FREE done-for-you setup: https://adamerhart.co/4zC5HYM
⬆️ ALREADY ON HIGHLEVEL OR IN A TRIAL? See Founder Plan upgrades & other exclusive deals (up to 50% OFF): https://adamerhart.co/49b3j0g

---

⚡ 30-Day FREE HighLevel Trial + $15,000+ in Bonuses: https://adamerhart.co/4zMoDoB
👉 FREE AI Agency Course + $15,000+ in Bonuses: https://adamerhart.co/4kXktpf
🔓 Already on HighLevel? Log in, then upgrade to unlock $15,000+ in bonuses: https://adamerhart.co/upgrade

When you start, you unlock my complete Agency OS, including:
• My proprietary snapshot + framework used to build three 7-figure agencies
• What to sell, who to target, what to charge, and how to land your first or next client
• Plug-and-play funnels, automations, follow-up, booking, and review systems
• Client-finding tools, outreach scripts, sales scripts, and templates
• A step-by-step 90-day roadmap so you always know what to do next
• Ongoing coaching, training, and private community support

Everything unlocks immediately.

⚠️ Disable ad blockers, VPNs, or incognito mode before clicking so bonuses unlock correctly.

I may earn a commission if you use my link, at no extra cost to you. It’s the exact platform and setup I use to run my own business.

---

📕 Free First Client Playbook (What to Sell + Who to Target + What to Say): https://adamerhart.co/getclients

📘 FREE 5-Minute AI Website Prompt (Build a Local Business Website With AI, No Coding Required): https://playbook.adamerhart.com/5-minute-website-prompt

0:00 - The Easiest Way to Land Clients with Free AI Websites
1:00 - Why Giving Away Websites Can Make You More Money
2:28 - Step 1: Find Local Businesses That Need Your Help
3:32 - 5 Website Red Flags That Reveal Easy Opportunities
5:35 - The Shortcut to Finding High-Potential Clients
6:22 - Message #1: Get Business Owners to Say “Send It Over”
7:37 - Step 2: Build a Professional Website in Just 5 Minutes
8:59 - The Crucial Step Before Showing Clients Your Website
10:08 - Message #2: Turn Your Free Website into an Irresistible Offer
11:03 - How to Follow Up Without Sounding Desperate
11:54 - Step 3: Turn a Free Website into $297/Month
12:39 - How to Handle Domains Without Creating Headaches
13:09 - Message #4: The Exact Script to Get Paid
13:50 - The All-in-One Software Behind This Business Model
15:05 - Your Step-by-Step Plan to Land Your First Paying Client', '2026-11-18T13:00:30Z', 946, '[]'::jsonb, 'https://i.ytimg.com/vi/RjT4GtqzDag/maxresdefault.jpg', 'https://www.youtube.com/watch?v=RjT4GtqzDag') on conflict (video_id) do update set creator_id = excluded.creator_id, platform = excluded.platform, title = excluded.title, description_summary = excluded.description_summary, description_full = excluded.description_full, published_at = excluded.published_at, duration_seconds = case when excluded.duration_seconds > 0 then excluded.duration_seconds else videos.duration_seconds end, thumbnail_url = case when excluded.thumbnail_url <> '' then excluded.thumbnail_url else videos.thumbnail_url end, video_url = excluded.video_url;
insert into public.video_snapshots (video_id, views, likes, comments) values ('RjT4GtqzDag', 8874, 196, 23);

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