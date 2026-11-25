import { NextRequest, NextResponse } from "next/server";
import { publicMessage } from "@/lib/http/errors";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getPlan } from "@/lib/payments/server";
import { getUserGeneratedScripts, getOperationsAnalytics } from "@/lib/scripts/storage";
import { ALLOWED_NICHES } from "@/lib/constants/niches";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. User profile data
    const email = user.email || "";
    const meta = user.user_metadata || {};
    const firstName = meta.first_name || "";
    const lastName = meta.last_name || "";
    const displayName =
      meta.display_name ||
      (firstName ? `${firstName} ${lastName}`.trim() : email.split("@")[0]) ||
      "Creator";

    // 2. Fetch saved niches (FR-9, FR-10)
    let savedNicheIds: string[] = [];
    try {
      const { data: nicheData } = await supabase
        .from("user_niches")
        .select("niche_id")
        .eq("user_id", user.id);

      savedNicheIds = (nicheData || []).map((n) => n.niche_id);
    } catch {
      savedNicheIds = [];
    }

    // Profile picture, cover picture and bio (columns added by the portal migration)
    let media: { avatar_url: string | null; cover_url: string | null; bio: string | null } = { avatar_url: null, cover_url: null, bio: null };
    {
      const { data: row, error: mediaErr } = await supabase.from("profiles").select("avatar_url, cover_url, bio").eq("id", user.id).maybeSingle();
      if (mediaErr) console.error("[profile] media columns:", mediaErr.message);
      else if (row) media = row as typeof media;
    }

    // 3. Fetch past script history
    const pastScripts = await getUserGeneratedScripts(user.id);

    // 4. Operations Analytics
    const analytics = await getOperationsAnalytics(user.id);

    // 5. Recommendations tailored to saved niches
    // Recommendations from real data only: curated creators and their newest videos in the user's niches
    const nicheFilter = savedNicheIds.length ? savedNicheIds : ["__none__"];
    const { data: recommendedCreators } = await supabase
      .from("creators")
      .select("id, niche_id, platform, display_name, handle, profile_url, followers")
      .in("niche_id", nicheFilter)
      .eq("active", true)
      .order("followers", { ascending: false, nullsFirst: false })
      .limit(6);
    // Videos are outlier data: read on the server and limited by plan (free plan: 1).
    let videoDb: any = supabase;
    try {
      videoDb = createServiceClient();
    } catch {
      /* service key missing: falls back to the user's own access */
    }
    const role = (await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()).data?.role;
    const { plan } = await getPlan(user.id, user.email_confirmed_at ? role : "user");
    const { data: recentVideosAll } = await videoDb
      .from("videos")
      .select("video_id, title, video_url, thumbnail_url, published_at, platform, creators!inner(display_name, niche_id, active)")
      .in("creators.niche_id", nicheFilter)
      .eq("creators.active", true)
      .order("published_at", { ascending: false })
      .limit(6);
    const recentVideos = plan === "free" ? (recentVideosAll || []).slice(0, 1) : recentVideosAll || [];
    const lockedTopics = plan === "free" ? Math.max(0, (recentVideosAll || []).length - recentVideos.length) : 0;
    const recommendedTopics = recentVideos.map((v: any) => ({
      niche: v.creators?.niche_id,
      title: v.title,
      creator: v.creators?.display_name,
      platform: v.platform,
      url: v.video_url,
      thumbnailUrl: v.thumbnail_url || null,
      publishedAt: v.published_at,
    }));

    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        email,
        firstName,
        lastName,
        displayName,
        isVerified: Boolean(user.email_confirmed_at),
        createdAt: user.created_at,
        avatarUrl: media.avatar_url,
        coverUrl: media.cover_url,
        bio: media.bio,
      },
      savedNiches: savedNicheIds,
      analytics,
      history: pastScripts,
      recommendations: {
        creators: recommendedCreators || [],
        topics: recommendedTopics,
        lockedTopics,
      },
    });
  } catch (error: any) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: publicMessage(error, "Failed to load profile", "profile") }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Pictures and bio only (sent on their own by the upload buttons)
    if (body && body.mediaOnly) {
      // Only images uploaded to this person's own folder in the profile-media bucket are accepted
      const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-media/${user.id}/`;
      const okUrl = (v: unknown) => v === null || (typeof v === "string" && v.startsWith(base) && v.length < 600);
      const patch: Record<string, string | null> = {};
      if ("avatarUrl" in body) {
        if (!okUrl(body.avatarUrl)) return NextResponse.json({ error: "Upload the picture again." }, { status: 400 });
        patch.avatar_url = body.avatarUrl;
      }
      if ("coverUrl" in body) {
        if (!okUrl(body.coverUrl)) return NextResponse.json({ error: "Upload the cover again." }, { status: 400 });
        patch.cover_url = body.coverUrl;
      }
      if ("bio" in body) patch.bio = typeof body.bio === "string" && body.bio.trim() ? body.bio.trim().slice(0, 280) : null;
      const { error } = await supabase.from("profiles").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", user.id);
      if (error) {
        console.error("[profile] media update:", error.message);
        return NextResponse.json({ error: "Could not save. Ask an admin to run the latest database update." }, { status: 500 });
      }
      return NextResponse.json({ success: true, ...patch });
    }

    const { firstName, lastName, displayName } = body;

    // Update Supabase Auth user metadata
    const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
      },
    });

    if (updateError) {
      const bioTooLong = /profiles_bio_length/.test(updateError.message);
      return NextResponse.json(
        { error: bioTooLong ? "Your bio can be at most 280 characters." : publicMessage(updateError, "Could not save your profile.", "profile") },
        { status: 400 }
      );
    }

    // Also update public.profiles if exists
    try {
      await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          display_name: displayName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        displayName,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: publicMessage(error, "Failed to update profile", "profile") }, { status: 500 });
  }
}
