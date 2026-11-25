-- CreatorLab import, part 1 of 3. Run the parts in order.

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

commit;
