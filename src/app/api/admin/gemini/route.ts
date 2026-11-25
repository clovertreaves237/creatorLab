import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

/**
 * Admin Gemini API Management Route
 * Allows admins to view masked key, test key live with Google API, and update key.
 */
export async function GET() {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const rawKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      "";

    const isConfigured = Boolean(rawKey.trim());
    const maskedKey = isConfigured
      ? `${rawKey.slice(0, 8)}...${rawKey.slice(-4)}`
      : "Not configured";

    return NextResponse.json({
      configured: isConfigured,
      maskedKey,
      quotaTier: "Free Tier (RPM: 15, RPD: 1,500)",
      recommendedModels: ["gemini-flash-latest", "gemini-3.8-flash", "gemini-pro-latest"],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load Gemini config" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("admin");
    if ("response" in gate) return gate.response;
    const body = await request.json().catch(() => ({}));
    const testKey =
      body.api_key?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      "";

    if (!testKey) {
      return NextResponse.json(
        { error: "No Gemini API key provided or found in environment." },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    let listModelsStatus = 0;
    let listModelsData: any = null;
    let generateStatus = 0;
    let generateMessage = "";
    let isWorking = false;

    // 1. Test ListModels endpoint
    try {
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${testKey}`
      );
      listModelsStatus = listRes.status;
      listModelsData = await listRes.json();
    } catch (e: any) {
      return NextResponse.json({
        success: false,
        status: "network_error",
        message: `Network failure connecting to generativelanguage.googleapis.com: ${e?.message || String(e)}`,
      });
    }

    if (listModelsStatus === 200) {
      isWorking = true;
    }

    // 2. Test Content Generation with gemini-flash-latest or gemini-3.8-flash
    const candidateModels = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-pro-latest"];
    for (const m of candidateModels) {
      try {
        const genRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${testKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: "Respond in 2 words: Connected successfully" }] }],
            }),
          }
        );
        generateStatus = genRes.status;
        const genData = await genRes.json();
        if (genRes.ok) {
          generateMessage = genData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "OK";
          isWorking = true;
          break;
        } else {
          generateMessage = genData?.error?.message || `HTTP ${genRes.status}`;
        }
      } catch (err: any) {
        generateMessage = err?.message || "Generation error";
      }
    }

    const latencyMs = Date.now() - startTime;
    const modelNames = Array.isArray(listModelsData?.models)
      ? listModelsData.models.slice(0, 8).map((m: any) => m.name.replace("models/", ""))
      : [];

    return NextResponse.json({
      success: isWorking,
      listModelsStatus,
      generateStatus,
      latencyMs,
      message: generateStatus === 200
        ? "Google Gemini API key verified and working! Live synthesis active."
        : listModelsStatus === 200
        ? `API key authentic on Google AI Studio. Note: Content generation endpoint returned: ${generateMessage}`
        : `Google API rejected the key: ${listModelsData?.error?.message || "Invalid API key"}`,
      models: modelNames,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to test Gemini API key." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Changing a server secret: super admin only
    const gate = await requireRole("super_admin");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();

    // On Vercel the server cannot keep a changed secret (no writable .env file, instances restart),
    // so the key must be changed in the Vercel project settings instead.
    if (process.env.VERCEL) {
      return NextResponse.json(
        {
          error:
            "On the live site the Gemini key is set in Vercel: Project → Settings → Environment Variables → GEMINI_API_KEY, then redeploy.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const newKey = typeof body.api_key === "string" ? body.api_key.trim() : "";

    // A Google API key is a single token. Rejecting anything else also stops a value with line breaks
    // from injecting other settings into .env.local.
    if (!/^[A-Za-z0-9_-]{30,100}$/.test(newKey)) {
      return NextResponse.json({ error: "That does not look like a Gemini API key." }, { status: 400 });
    }

    await supabase.from("audit_log").insert({
      actor_id: gate.account.userId,
      action: "gemini_key_changed",
      target: "GEMINI_API_KEY",
      details: { masked: `${newKey.slice(0, 4)}...${newKey.slice(-4)}` },
    });

    // Save key to process.env and update .env.local
    process.env.GEMINI_API_KEY = newKey;

    try {
      const envPath = path.join(process.cwd(), ".env.local");
      let envContent = "";
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, "utf8");
      }

      if (envContent.includes("GEMINI_API_KEY=")) {
        envContent = envContent.replace(/GEMINI_API_KEY=.*$/m, `GEMINI_API_KEY=${newKey}`);
      } else {
        envContent += `\nGEMINI_API_KEY=${newKey}\n`;
      }

      fs.writeFileSync(envPath, envContent, "utf8");
    } catch (e) {
      console.warn("Could not write to .env.local file directly:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Gemini API key updated successfully in Admin Portal.",
      maskedKey: `${newKey.slice(0, 8)}...${newKey.slice(-4)}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to save key" }, { status: 500 });
  }
}
