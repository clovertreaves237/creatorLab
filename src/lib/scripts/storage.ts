import { createClient } from "@/lib/supabase/server";

/**
 * Script history (table generated_scripts).
 *
 * - Every script a signed-in creator writes is saved permanently in THEIR history.
 * - Only the owner can read, edit or delete it (Row Level Security: auth.uid() = user_id). Admins see counts only
 *   (from script_requests), never the scripts.
 * - Research notes are never stored (FR-33): only topic, script, hook and length.
 * - There is no shared in-memory fallback: if the database is unavailable, nothing is shown rather than
 *   another person's scripts.
 */

export interface GeneratedScriptRecord {
  id: string;
  user_id?: string;
  niche_id: string;
  topic: string;
  script: string;
  hook: string;
  total_spoken_seconds: number;
  word_count: number;
  created_at: string;
  updated_at?: string | null;
}

type Db = Awaited<ReturnType<typeof createClient>>;

/** Saves a newly generated script to the creator's own history. */
export async function saveGeneratedScript(data: {
  userId?: string;
  nicheId: string;
  topic: string;
  script: string;
  hook: string;
  totalSpokenSeconds: number;
  wordCount: number;
  /** Database client created at the start of the request (needed when saving after a streamed response). */
  client?: Db;
}): Promise<GeneratedScriptRecord | null> {
  if (!data.userId) return null;
  try {
    const supabase = data.client || (await createClient());
    const { data: inserted, error } = await supabase
      .from("generated_scripts")
      .insert({
        user_id: data.userId,
        niche_id: data.nicheId,
        topic: data.topic,
        script: data.script,
        hook: data.hook,
        total_spoken_seconds: data.totalSpokenSeconds,
        word_count: data.wordCount,
      })
      .select()
      .single();
    if (error) {
      console.error("[scripts] could not save generated script to the database:", error.message);
      return null;
    }
    return inserted as GeneratedScriptRecord;
  } catch (err) {
    console.error("[scripts] save failed:", err);
    return null;
  }
}

/**
 * The creator's own scripts in a niche from the last `days` days, used so new hooks do not repeat the
 * creator's recent ones (14-day de-duplication window). Never reads other people's scripts.
 */
export async function getRecentScriptsForNiche(nicheId: string, days = 14, userId?: string): Promise<GeneratedScriptRecord[]> {
  if (!userId) return [];
  const cutoffTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("generated_scripts")
      .select("*")
      .eq("user_id", userId)
      .eq("niche_id", nicheId)
      .gte("created_at", cutoffTime)
      .order("created_at", { ascending: false });
    if (error) console.error("[scripts] recent scripts:", error.message);
    return (data || []) as GeneratedScriptRecord[];
  } catch {
    return [];
  }
}

/**
 * Kept for compatibility: history is now permanent, so nothing is pruned.
 * (The 14-day rule only limits which past hooks are used for de-duplication.)
 */
export async function pruneOldScripts(_days = 14): Promise<number> {
  return 0;
}

/** The creator's full script history, newest first. Only their own rows (RLS). */
export async function getUserGeneratedScripts(userId?: string): Promise<GeneratedScriptRecord[]> {
  if (!userId) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("generated_scripts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) console.error("[scripts] history:", error.message);
    return (data || []) as GeneratedScriptRecord[];
  } catch {
    return [];
  }
}

/** Dashboard numbers for the creator, from their own history and the admin-set daily limit. */
export async function getOperationsAnalytics(userId?: string) {
  const scripts = await getUserGeneratedScripts(userId);

  let dailyLimit = 10;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("app_settings").select("value").eq("key", "daily_script_limit").maybeSingle();
    const v = Number((data as any)?.value);
    if (Number.isFinite(v) && v >= 0) dailyLimit = v;
  } catch {}

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  const todayScripts = scripts.filter((s) => new Date(s.created_at).getTime() >= startOfToday);
  const weekScripts = scripts.filter((s) => new Date(s.created_at).getTime() >= sevenDaysAgo);

  const totalSpokenSeconds = scripts.reduce((acc, curr) => acc + (curr.total_spoken_seconds || 0), 0);
  const totalWords = scripts.reduce((acc, curr) => acc + (curr.word_count || 0), 0);

  const quotaUsedToday = todayScripts.length;
  const quotaRemaining = dailyLimit === 0 ? null : Math.max(0, dailyLimit - quotaUsedToday);

  const nicheCounts: Record<string, number> = {};
  scripts.forEach((s) => {
    nicheCounts[s.niche_id] = (nicheCounts[s.niche_id] || 0) + 1;
  });
  let topNiche: string | null = null;
  let maxCount = 0;
  for (const [niche, count] of Object.entries(nicheCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topNiche = niche;
    }
  }

  return {
    totalScripts: scripts.length,
    todayScriptsCount: todayScripts.length,
    weekScriptsCount: weekScripts.length,
    totalSpokenSeconds,
    totalWords,
    dailyQuotaLimit: dailyLimit,
    quotaUsedToday,
    quotaRemaining,
    topNiche,
    nicheCounts,
  };
}
