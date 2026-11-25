import { NextRequest, NextResponse } from "next/server";
import { isValidNiche, isLiveNiche } from "@/lib/constants/niches";
import { getNicheTrainingPack } from "@/lib/training/rules";
import {
  generate120sScript,
  streamScriptFromGemini,
  finalizeStreamedScript,
  type ScriptGenerationResult,
} from "@/lib/scripts/gemini";
import { createClient } from "@/lib/supabase/server";
import { requireRole, hasRole } from "@/lib/auth/roles";
import { getAllowance, releaseScriptSlot, reserveScriptSlot, settlePendingPayments } from "@/lib/payments/server";
import {
  saveGeneratedScript,
  getRecentScriptsForNiche,
  pruneOldScripts,
  getUserGeneratedScripts,
} from "@/lib/scripts/storage";

/**
 * Section 3.5 Notes & Script Generation (FR-28 to FR-37)
 *
 * FR-28: Notes box accepting up to 5,000 characters.
 * FR-29: Choose niche before generating script (selects training pack).
 * FR-30: Script generated from 3 inputs only: niche training rules, user topic, user notes.
 * FR-31: Capped at 120 seconds spoken time.
 * FR-32: Defined sections by niche rules with bracketed timing marks.
 * FR-33: Zero storage of user notes (sent to Gemini and immediately discarded).
 * FR-35: Record script request (user ID, niche, topic, timestamp), but not the notes.
 * FR-36: Retry once on failure. If it fails again, show clear error and do not record.
 * FR-37: Script produced only from rules + user input (no side-by-side comparison).
 */
export async function POST(request: NextRequest) {
  try {
    // Signed-in users only (protects the Gemini quota)
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;

    const body = await request.json();
    const { niche_id, topic, notes } = body;
    const api_key = body.api_key;
    const headerApiKey = request.headers.get("x-gemini-api-key");
    const resolvedApiKey =
      (typeof api_key === "string" && api_key.trim().length > 10 ? api_key.trim() : null) ||
      (headerApiKey && headerApiKey.trim().length > 10 ? headerApiKey.trim() : null) ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    // FR-29: Validate niche
    if (!niche_id || !isValidNiche(niche_id)) {
      return NextResponse.json(
        { error: "A valid niche must be chosen before writing a script." },
        { status: 400 }
      );
    }
    if (!isLiveNiche(niche_id)) {
      return NextResponse.json({ error: "This niche is coming soon. Pick one of your live niches." }, { status: 400 });
    }

    // FR-28: Validate notes (up to 5,000 characters)
    const sanitizedNotes = typeof notes === "string" ? notes.trim() : "";
    if (sanitizedNotes.length > 5000) {
      return NextResponse.json(
        { error: "Notes exceed the 5,000 character limit." },
        { status: 400 }
      );
    }

    // Topic is optional if context notes are provided; reject only if both topic and notes are empty
    const rawTopic = typeof topic === "string" ? topic.trim() : "";
    if (!rawTopic && !sanitizedNotes) {
      return NextResponse.json(
        { error: "A topic or context notes are required to generate a script." },
        { status: 400 }
      );
    }

    // Derive effective topic: user topic if provided, otherwise summary title from user context notes
    const effectiveTopic =
      rawTopic ||
      sanitizedNotes.split("\n")[0].slice(0, 80).replace(/[^\w\s-]/g, "").trim() ||
      "Creative Concept";

    // 14-Day Deduplication check (Script Creation Flow & user specs):
    // Retrieve past 14-day generated scripts for this niche to prevent repeating hooks/structures
    const pastNicheScripts = await getRecentScriptsForNiche(niche_id, 14, gate.account.userId);
    const pastHooks = pastNicheScripts.map((s) => s.hook).filter(Boolean);
    const matchingTopicCount = pastNicheScripts.filter(
      (s) => s.topic.trim().toLowerCase() === effectiveTopic.trim().toLowerCase()
    ).length;
    const targetDuration = typeof body.duration_seconds === "number" ? body.duration_seconds : 120;

    // Plans: free = free_scripts_per_day per rolling 24h; Pro (paid via Fapshi) and staff = daily_script_limit (NFR-20).
    // Admins are not limited. Enforced here on the server, whatever the browser shows.
    const isAdmin = hasRole(gate.account.role, "admin");
    let allowance: Awaited<ReturnType<typeof getAllowance>> | null = null;
    const blockedResponse = (a: typeof allowance) =>
      NextResponse.json(
        {
          error: a?.blocked?.message || "You have reached your script limit for now.",
          code: a?.blocked?.code || "FREE_LIMIT_REACHED",
          nextAt: a?.blocked?.nextAt ?? null,
          nextAvailableAt: a?.blocked?.nextAt ?? null,
          plan: a?.plan ?? "free",
          limit: a ? (a.plan === "free" ? a.free.limit : a.dailyLimit) : null,
        },
        { status: 429 }
      );
    if (!isAdmin) {
      allowance = await getAllowance(gate.account.userId, gate.account.role).catch(() => null);
      // Just paid? Confirm any pending payment with Fapshi before refusing.
      if (allowance?.blocked && allowance.plan === "free" && (await settlePendingPayments(gate.account.userId)) > 0) {
        allowance = await getAllowance(gate.account.userId, gate.account.role).catch(() => null);
      }
      if (allowance?.blocked) return blockedResponse(allowance);
    }

    // Load Niche Training Pack (FR-29, FR-30, lessons + rules)
    const trainingPack = await getNicheTrainingPack(niche_id);

    // Database client + user captured now, while the request is active (used to save the script later)
    const db = await createClient();

    // Atomic limit: count + record this request in one locked step (two tabs cannot both pass). Gemini is not
    // called when the slot is refused.
    const slot = await reserveScriptSlot(db, allowance, isAdmin, niche_id, effectiveTopic);
    if (!slot.ok) {
      const fresh = await getAllowance(gate.account.userId, gate.account.role).catch(() => null);
      return blockedResponse(fresh?.blocked ? fresh : allowance);
    }
    const saveCtx = { supabase: db, userId: gate.account.userId, requestId: slot.requestId };

    // Streaming mode (Creator Engine chat): words are sent to the browser as Gemini writes them.
    if (body.stream === true) {
      if (!resolvedApiKey) {
        await releaseScriptSlot(db, slot.requestId);
        return NextResponse.json({ error: "Gemini API key is not configured on the server." }, { status: 500 });
      }
      return streamScriptResponse({
        saveCtx,
        request,
        apiKey: resolvedApiKey,
        rules: trainingPack.combinedRulesText,
        niche_id,
        effectiveTopic,
        notes: sanitizedNotes,
        pastHooks,
        targetDuration,
        repeatCount: matchingTopicCount,
      });
    }

    // Generate 120s script with 1 retry on failure & 14-day deduplication constraints (FR-36, FR-30, FR-31, FR-32)
    let result: Awaited<ReturnType<typeof generate120sScript>>;
    try {
      result = await generate120sScript({
        rules: trainingPack,
        topic: effectiveTopic,
        notes: sanitizedNotes,
        pastHooks,
        apiKey: resolvedApiKey,
        targetDuration,
        repeatCount: matchingTopicCount,
      });
    } catch (genError) {
      await releaseScriptSlot(db, slot.requestId); // failed generations do not use up the allowance
      throw genError;
    }

    // Notes are now discarded and will NOT be persisted (FR-33)

    const { generatedHook, savedRecord } = await recordAndSaveScript(niche_id, effectiveTopic, result, saveCtx);

    return NextResponse.json({
      success: true,
      script: result.script,
      totalSpokenSeconds: result.totalSpokenSeconds,
      wordCount: result.wordCount,
      sections: result.sections,
      nicheId: niche_id,
      topic: effectiveTopic,
      hook: generatedHook,
      scriptId: savedRecord?.id ?? null,
      retried: result.retried,
    });
  } catch (error: any) {
    console.error("Script generation route error:", error);
    // FR-36: Show clear error and do not record
    return NextResponse.json(
      {
        error: error?.message || "Failed to generate script after retry. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * Streams the script as newline-delimited JSON events:
 *   {"type":"delta","text":"..."}            repeated while Gemini writes
 *   {"type":"done", script, sections, ...}   once finished and saved
 *   {"type":"error","error":"..."}           if Gemini fails (FR-36: nothing is recorded)
 * Notes are only used for the Gemini request and are never stored (FR-33).
 */
function streamScriptResponse(args: {
  saveCtx: { supabase: Awaited<ReturnType<typeof createClient>>; userId: string; requestId?: string | null };
  request: NextRequest;
  apiKey: string;
  rules: string;
  niche_id: string;
  effectiveTopic: string;
  notes: string;
  pastHooks: string[];
  targetDuration: number;
  repeatCount: number;
}) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      let raw = "";
      try {
        const generator = streamScriptFromGemini({
          apiKey: args.apiKey,
          rules: args.rules,
          topic: args.effectiveTopic,
          notes: args.notes,
          pastHooks: args.pastHooks,
          targetDuration: args.targetDuration,
          repeatCount: args.repeatCount,
          signal: args.request.signal,
        });
        for await (const event of generator) {
          if (event.type === "rewind") {
            // Gemini restarted a passage after a dropped stream: drop the duplicated tail.
            raw = raw.slice(0, Math.max(0, raw.length - event.chars));
            send({ type: "rewind", chars: event.chars });
          } else {
            raw += event.text;
            send({ type: "delta", text: event.text });
          }
        }

        const result = finalizeStreamedScript(raw, args.targetDuration);
        const { generatedHook, savedRecord } = await recordAndSaveScript(args.niche_id, args.effectiveTopic, result, args.saveCtx);
        send({
          type: "done",
          success: true,
          script: result.script,
          totalSpokenSeconds: result.totalSpokenSeconds,
          wordCount: result.wordCount,
          sections: result.sections,
          nicheId: args.niche_id,
          topic: args.effectiveTopic,
          hook: generatedHook,
          scriptId: savedRecord?.id ?? null,
        });
      } catch (error: any) {
        if (!args.request.signal.aborted) {
          // A real failure gives the slot back (stopping a script on purpose does not)
          await releaseScriptSlot(args.saveCtx.supabase, args.saveCtx.requestId ?? null);
          console.error("Script stream error:", error?.message || error);
          send({ type: "error", error: error?.message || "Failed to generate script. Please try again." });
        }
      } finally {
        try {
          controller.close();
        } catch {
          // client already disconnected
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

/**
 * GET: Retrieves past generated script history for the active user.
 * "the history is only created when there have been past generation"
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let history = await getUserGeneratedScripts(user?.id);

    // Apply duration filter if specified
    if (filter !== "all") {
      const now = Date.now();
      const days = filter === "7d" ? 7 : filter === "14d" ? 14 : filter === "30d" ? 30 : 0;
      if (days > 0) {
        const cutoff = new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
        history = history.filter((h) => h.created_at >= cutoff);
      }
    }

    return NextResponse.json({
      history,
      hasHistory: history.length > 0,
      filter,
    });
  } catch (error: any) {
    return NextResponse.json({ history: [], hasHistory: false });
  }
}

/** FR-35 request record (WITHOUT notes) + 14-day script registry used for hook de-duplication. */
/**
 * The database client and user are captured at the START of the request and passed in, so saving still
 * works after a streamed response has begun (no late cookie lookups).
 */
async function recordAndSaveScript(
  niche_id: string,
  effectiveTopic: string,
  result: ScriptGenerationResult,
  ctx: { supabase: Awaited<ReturnType<typeof createClient>>; userId: string; requestId?: string | null }
) {
  // Extract hook from generated script for 14-day deduplication registry
  const hookMatch = result.script.match(/\[\d+:\d+\s*-\s*\d+:\d+\][^\n:]*:?\s*([^\n]+)/i);
  const generatedHook = hookMatch ? hookMatch[1].trim() : result.script.slice(0, 100);
  const { supabase } = ctx;
  const currentUserId: string | undefined = ctx.userId || undefined;

  // FR-35: Record script request in Supabase (WITHOUT notes). Already recorded when the slot was reserved.
  if (!ctx.requestId) {
    const { error: requestError } = await supabase.from("script_requests").insert({
      user_id: ctx.userId,
      niche_id,
      topic: effectiveTopic,
      // STRICT FR-33 & FR-35: notes column does NOT exist in table and is never passed
    });
    if (requestError) console.error("[scripts] script_requests insert failed:", requestError.message);
  }

  // Save generated script with 14-day retention cycle for deduplication & user history
  const savedRecord = await saveGeneratedScript({
    userId: currentUserId,
    nicheId: niche_id,
    topic: effectiveTopic,
    script: result.script,
    hook: generatedHook,
    totalSpokenSeconds: result.totalSpokenSeconds,
    wordCount: result.wordCount,
    client: supabase,
  });

  // Activity timeline on the user profile (topic only; research notes are never stored, FR-33)
  if (currentUserId) {
    try {
      await supabase.from("activity_events").insert({
        user_id: currentUserId,
        event_type: "script_generated",
        niche_id,
        target: effectiveTopic.slice(0, 300),
        metadata: { words: result.wordCount, seconds: result.totalSpokenSeconds, script_id: savedRecord?.id ?? null },
      });
    } catch {
      // tracking must never break generation
    }
  }

  // History is permanent; the 14-day window only applies to hook de-duplication


  return { generatedHook, savedRecord };
}

