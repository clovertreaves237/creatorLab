import fs from "fs";
import path from "path";
import { NicheId, isValidNiche } from "@/lib/constants/niches";

export interface NicheTrainingPack {
  nicheId: NicheId;
  coreStructure: string;
  hookFrameworks: string;
  connectorRules: string;
  ctaRules: string;
  nicheRules: string;
  nicheLessons: string;
  combinedRulesText: string;
}

/**
 * Loads the consolidated training rules and lessons for a chosen niche (FR-29, FR-30).
 * Combines core script structure (120s cap, timing marks), hook frameworks,
 * connector transition rules (connectors.md), niche training lessons (training.md),
 * and niche rules (rules.md).
 * NOTE: source.md is internal system-only and strictly omitted from AI context.
 */
// Training packs are read from disk once per niche and kept in memory.
// The text is identical on every request, which also lets Gemini reuse its prompt cache.
const packCache = new Map<NicheId, NicheTrainingPack>();

export async function getNicheTrainingPack(nicheId: string): Promise<NicheTrainingPack> {
  const safeNicheId: NicheId = isValidNiche(nicheId) ? nicheId : "branding-marketing";
  const cached = packCache.get(safeNicheId);
  if (cached && process.env.NODE_ENV === "production") return cached;
  const pack = await loadNicheTrainingPack(safeNicheId);
  packCache.set(safeNicheId, pack);
  return pack;
}

async function loadNicheTrainingPack(safeNicheId: NicheId): Promise<NicheTrainingPack> {

  let coreStructure = "";
  let hookFrameworks = "";
  let connectorRules = "";
  let nicheRules = "";
  let nicheLessons = "";

  const rootDir = process.cwd();

  // 1. Core 120s timing marks & script structure
  try {
    const coreStructPath = path.join(rootDir, "training-rules", "core", "script-structure.md");
    if (fs.existsSync(coreStructPath)) {
      coreStructure = fs.readFileSync(coreStructPath, "utf-8");
    }
  } catch (e) {
    // fallback
  }

  // 2. Core Hook retention frameworks
  try {
    const hooksPath = path.join(rootDir, "training-rules", "core", "hook-frameworks.md");
    if (fs.existsSync(hooksPath)) {
      hookFrameworks = fs.readFileSync(hooksPath, "utf-8");
    }
  } catch (e) {
    // fallback
  }

  // 2b. Core Call-to-Action rules & examples (applies to all niches)
  let ctaRules = "";
  try {
    const ctaPath = path.join(rootDir, "training-rules", "core", "cta.md");
    if (fs.existsSync(ctaPath)) {
      ctaRules = fs.readFileSync(ctaPath, "utf-8");
    }
  } catch (e) {
    // fallback
  }

  // 3. Core Connector Rules & Transition Language (applies to all niches)
  try {
    const connPath = path.join(rootDir, "training-rules", "core", "connectors.md");
    const nicheConnPath = path.join(rootDir, "training-rules", safeNicheId, "connectors.md");
    if (fs.existsSync(connPath)) {
      connectorRules = fs.readFileSync(connPath, "utf-8");
    } else if (fs.existsSync(nicheConnPath)) {
      connectorRules = fs.readFileSync(nicheConnPath, "utf-8");
    }
  } catch (e) {
    // fallback
  }

  // 4 + 5. ALL of the niche's training documents, not only rules.md / training.md.
  //   Rules documents (hooks, re-hooks, formats, CTAs): rules.md first, then every *rule*/*hook* file.
  //   Lessons documents (pillars, positioning, transcripts): training.md first, then the other .md files.
  //   source*.md files are curator reference lists and are NEVER sent to Gemini (FR-30, FR-37).
  const docs = collectNicheDocs(rootDir, safeNicheId);
  nicheRules = fitToBudget(docs.rules, RULES_BUDGET);
  nicheLessons = fitToBudget(docs.lessons, LESSONS_BUDGET);

  // Robust fallback defaults if files unavailable
  if (!coreStructure) {
    coreStructure = `# Core 120s Script Structure
- [0:00 - 0:03] Hook: 3-second retention lock. Zero introductory greetings.
- [0:03 - 0:25] Context / Problem Setup & Viewer Contract.
- [0:25 - 1:15] Core Value Breakdown (3 actionable pillars).
- [1:15 - 1:45] Practical Example / Local Proof.
- [1:45 - 2:00] Closing Call to Action (comment velocity prompt).`;
  }

  if (!hookFrameworks) {
    hookFrameworks = `# 3-Second Hook Retention Rules
1. Negative Angle / Costly Mistake: "Stop doing X if you want Y..."
2. Counter-Intuitive Truth: "Everyone thinks X works, but here is what actually happens..."
3. High-Stakes Question: "How did this creator scale from $0 to $10,000 without ads?"`;
  }

  if (!connectorRules) {
    connectorRules = `# Connector & Transition Rules
- The Three Jobs: Open a question, create an information gap, or signal immediate payoff.
- Approved Patterns: The Question Bridge, The Contrast Shift, The Specific Promise, The Reframe Bridge.`;
  }

  if (!nicheRules) {
    nicheRules = `# Niche Rules for ${safeNicheId}
Tone: Authoritative, practical, authentic African & global creator context. 120s max.`;
  }

  if (!nicheLessons) {
    nicheLessons = `# Niche Lessons for ${safeNicheId}
Core focus on cultural authenticity, actionable takeaways, and viral retention loops.`;
  }

  // Assemble comprehensive rules text for Gemini context
  // Intelligently cap maximum payload to ensure prompt stays within model token rate limits
  // (already fitted to their budgets by fitToBudget)
  const safeLessons = nicheLessons;
  const safeRules = nicheRules;
  const safeConnectors = connectorRules.length > 20000 ? connectorRules.slice(0, 20000) + "\n...[truncated]" : connectorRules;

  const combinedRulesText = `--- NICHE TRAINING LESSONS & CURATION PLAYBOOK (${safeNicheId.toUpperCase()}) ---
${coreStructure}

--- CALL TO ACTION (CTA) RULES & EXAMPLES: EVERY SCRIPT MUST END WITH ONE ---
${ctaRules}

--- HOOK RETENTION FRAMEWORKS ---
${hookFrameworks}

--- CONNECTOR RULES & TRANSITION LANGUAGE ---
${safeConnectors}

--- LESSONS & FOUNDATIONAL PILLARS (training.md) ---
${safeLessons}

--- FORMATS, HOOKS & EXECUTION RULES (rules.md) ---
${safeRules}
-----------------------------------------------------------------------------------`;

  return {
    nicheId: safeNicheId,
    coreStructure,
    hookFrameworks,
    connectorRules,
    ctaRules,
    nicheRules,
    nicheLessons,
    combinedRulesText,
  };
}

// ---------------------------------------------------------------------------------------------
// Niche document discovery + size budget
// ---------------------------------------------------------------------------------------------

// Total characters per request (~50k tokens with the core rules), sized for the Gemini free tier.
const RULES_BUDGET = 120000;
const LESSONS_BUDGET = 80000;

interface NicheDoc {
  name: string;
  text: string;
  curated: boolean; // the short hand-written rules.md / training.md (persona rules live here)
}

/** Root-level training files that belong to a niche (e.g. Intro_hooksandrehoks_brandingandmarket.md). */
const ROOT_FILE_NICHE: Array<[RegExp, NicheId]> = [
  [/branding|marketing/i, "branding-marketing"],
  [/content.?creat/i, "content-creation"],
  [/tech.?news/i, "tech-news"],
  [/faceless/i, "faceless-content"],
  [/startup|founder/i, "startups-founders"],
];

// Source lists and sound.md (sound composer only) never reach the script writer
const isSourceList = (name: string) =>
  /source/i.test(name) || /^tiktok_creators/i.test(name) || /^sound\.md$/i.test(name);
const isRulesDoc = (name: string) => /rule|hook/i.test(name);

function collectNicheDocs(rootDir: string, nicheId: NicheId): { rules: NicheDoc[]; lessons: NicheDoc[] } {
  const rules: NicheDoc[] = [];
  const lessons: NicheDoc[] = [];
  const base = path.join(rootDir, "training-rules");
  const add = (file: string, name: string) => {
    try {
      const text = fs.readFileSync(file, "utf-8").trim();
      if (!text) return;
      const lower = name.toLowerCase();
      const doc = { name, text, curated: lower === "rules.md" || lower === "training.md" };
      if (lower === "rules.md" || (lower !== "training.md" && isRulesDoc(name))) rules.push(doc);
      else lessons.push(doc);
    } catch {
      // unreadable file: skip
    }
  };

  const nicheDir = path.join(base, nicheId);
  if (fs.existsSync(nicheDir)) {
    for (const name of fs.readdirSync(nicheDir).sort()) {
      // connectors.md is loaded once as the core connector rules; source lists never reach Gemini
      if (!/\.md$/i.test(name) || isSourceList(name) || name.toLowerCase() === "connectors.md") continue;
      add(path.join(nicheDir, name), name);
    }
  }
  if (fs.existsSync(base)) {
    for (const name of fs.readdirSync(base)) {
      const full = path.join(base, name);
      if (!/\.md$/i.test(name) || isSourceList(name) || !fs.statSync(full).isFile()) continue;
      const owner = ROOT_FILE_NICHE.find(([re]) => re.test(name))?.[1];
      if (owner === nicheId) add(full, name);
    }
  }

  // Curated files first (they carry the persona / business-owner rules)
  const order = (a: NicheDoc, b: NicheDoc) => Number(b.curated) - Number(a.curated);
  return { rules: rules.sort(order), lessons: lessons.sort(order) };
}

/**
 * Fits several documents into one character budget: the curated file is kept whole (it is short),
 * and the remaining budget is shared equally by the other documents, each contributing its opening part.
 */
function fitToBudget(docs: NicheDoc[], budget: number): string {
  if (docs.length === 0) return "";
  const parts: string[] = [];
  let remaining = budget;
  const curated = docs.filter((d) => d.curated);
  const others = docs.filter((d) => !d.curated);
  // The curated file leads (persona rules sit at its top) but may use at most half the budget
  // when other documents exist, so every document of the niche is represented.
  const curatedCap = others.length ? Math.floor(budget / 2) : budget;
  for (const d of curated) {
    const text = d.text.slice(0, Math.min(remaining, curatedCap));
    parts.push(`=== DOCUMENT: ${d.name} ===\n${text}`);
    remaining -= text.length;
  }
  if (others.length && remaining > 0) {
    let share = Math.floor(remaining / others.length);
    // Short documents give their unused share to the longer ones
    const sorted = [...others].sort((a, b) => a.text.length - b.text.length);
    let left = others.length;
    const allowance = new Map<NicheDoc, number>();
    for (const d of sorted) {
      share = Math.floor(remaining / left);
      const take = Math.min(d.text.length, share);
      allowance.set(d, take);
      remaining -= take;
      left--;
    }
    for (const d of others) {
      const take = allowance.get(d) || 0;
      if (take <= 0) continue;
      const cut = d.text.length > take;
      parts.push(`=== DOCUMENT: ${d.name} ===\n${d.text.slice(0, take)}${cut ? "\n...[document continues; opening section included]" : ""}`);
    }
  }
  return parts.join("\n\n");
}
