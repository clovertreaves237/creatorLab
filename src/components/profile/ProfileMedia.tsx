"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { recordUpload } from "@/lib/uploads/record";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Uploads to profile-media/<user id>/<kind>-<time>.<ext> and saves the public URL on the profile. */
async function uploadAndSave(kind: "avatar" | "cover", file: File): Promise<string> {
  if (!TYPES.includes(file.type)) throw new Error("Use a JPG, PNG or WebP image.");
  if (file.size > MAX_BYTES) throw new Error("The image must be 5 MB or smaller.");
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Please sign in again.");

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${user.id}/${kind}-${Date.now()}.${ext}`;
  const { error: upErr } = await supabase.storage.from("profile-media").upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) {
    throw new Error(
      /bucket/i.test(upErr.message) ? "Picture storage is not set up yet. Ask an admin to run the latest database update." : upErr.message
    );
  }
  const url = supabase.storage.from("profile-media").getPublicUrl(path).data.publicUrl;
  await recordUpload({ bucket: "profile-media", path, publicUrl: url, kind, file });
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mediaOnly: true, [kind === "avatar" ? "avatarUrl" : "coverUrl"]: url }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Could not save the picture.");
  return url;
}

async function clearMedia(kind: "avatar" | "cover") {
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mediaOnly: true, [kind === "avatar" ? "avatarUrl" : "coverUrl"]: null }),
  });
  if (!res.ok) throw new Error("Could not remove the picture.");
}

function useUpload(kind: "avatar" | "cover", onChange: (url: string | null) => void) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pick = () => input.current?.click();
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await uploadAndSave(kind, file));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const remove = async () => {
    setBusy(true);
    setError(null);
    try {
      await clearMedia(kind);
      onChange(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const fileInput = <input ref={input} type="file" accept={TYPES.join(",")} className="hidden" onChange={onFile} />;
  return { pick, remove, busy, error, fileInput };
}

/** Cover picture across the top of the profile card. */
export function ProfileCover({ url, onChange }: { url: string | null; onChange: (url: string | null) => void }) {
  const up = useUpload("cover", onChange);
  return (
    <div className="relative -mx-6 -mt-6 mb-6 h-32 overflow-hidden border-b-2 border-ink sm:-mx-8 sm:-mt-8 sm:h-44">
      {url ? (
        <img src={url} alt="Cover" className="h-full w-full object-cover" />
      ) : (
        <div className="paper-grid h-full w-full bg-paper-deep" />
      )}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button type="button" onClick={up.pick} disabled={up.busy} className="sk-btn bg-white px-3 py-1.5 text-xs">
          {up.busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
          {url ? "Change cover" : "Add cover picture"}
        </button>
        {url && (
          <button type="button" onClick={up.remove} disabled={up.busy} className="sk-btn bg-white px-2 py-1.5 text-xs" title="Remove cover">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {up.error && <p className="absolute bottom-3 left-3 rounded bg-white px-2 py-1 text-xs text-red-700">{up.error}</p>}
      {up.fileInput}
    </div>
  );
}

/** Profile picture (falls back to initials) with a change button. */
export function ProfileAvatar({ url, initials, onChange }: { url: string | null; initials: string; onChange: (url: string | null) => void }) {
  const up = useUpload("avatar", onChange);
  return (
    <div className="relative shrink-0">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-ink bg-ink text-xl font-black text-white sm:h-20 sm:w-20 sm:text-2xl">
        {url ? <img src={url} alt="Profile" className="h-full w-full object-cover" /> : <span>{initials}</span>}
      </div>
      <button
        type="button"
        onClick={up.pick}
        disabled={up.busy}
        title={url ? "Change profile picture" : "Add a profile picture"}
        className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-white text-ink hover:bg-hl-yellow"
      >
        {up.busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
      </button>
      {url && (
        <button type="button" onClick={up.remove} disabled={up.busy} className="mt-3 block text-[11px] text-pencil hover:text-ink hover:underline">
          Remove photo
        </button>
      )}
      {up.error && <p className="mt-2 max-w-[10rem] text-[11px] text-red-700">{up.error}</p>}
      {up.fileInput}
    </div>
  );
}
