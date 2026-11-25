"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Records a finished upload in the media_uploads table (who uploaded which file, where, when).
 * The file itself lives in Supabase Storage. Never throws: a failed record must not undo the upload.
 */
export async function recordUpload(u: {
  bucket: "thumbnails" | "profile-media";
  path: string;
  publicUrl: string;
  kind: "tiktok_thumbnail" | "avatar" | "cover";
  file: File;
  relatedId?: string | null;
}): Promise<void> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("media_uploads").insert({
      user_id: user.id,
      bucket: u.bucket,
      path: u.path,
      public_url: u.publicUrl,
      kind: u.kind,
      mime_type: u.file.type || null,
      size_bytes: u.file.size,
      related_id: u.relatedId || null,
    });
    if (error) console.error("[uploads] could not record upload:", error.message);
  } catch (e) {
    console.error("[uploads] could not record upload:", e);
  }
}
