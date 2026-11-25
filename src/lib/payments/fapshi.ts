import "server-only";
import { detectTestMode, isFapshiId, type FapshiStatus } from "./logic";

/**
 * Minimal Fapshi client (https://docs.fapshi.com). Server only: the API user and key never reach the browser.
 * Auth: headers `apiuser` + `apikey` on every request. JSON bodies. Base URL from FAPSHI_BASE_URL.
 */

const SANDBOX_URL = "https://sandbox.fapshi.com";
const LIVE_URL = "https://live.fapshi.com";

export class FapshiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "FapshiError";
    this.status = status;
  }
}

export interface FapshiTransaction {
  transId: string;
  status: FapshiStatus;
  amount: number;
  medium?: string | null;
  externalId?: string | null;
  userId?: string | null;
  dateInitiated?: string;
  dateConfirmed?: string | null;
}

let modeLogged = false;

function config() {
  const apiUser = (process.env.FAPSHI_API_USER || "").trim();
  const apiKey = (process.env.FAPSHI_API_KEY || "").trim();
  if (!apiUser || !apiKey) {
    throw new FapshiError("Payments are not set up yet (FAPSHI_API_USER / FAPSHI_API_KEY missing on the server).");
  }

  const configured = (process.env.FAPSHI_BASE_URL || "").trim().replace(/\/+$/, "");
  const baseUrl = configured || SANDBOX_URL; // never fall back to live
  if (baseUrl !== SANDBOX_URL && baseUrl !== LIVE_URL) {
    throw new FapshiError("FAPSHI_BASE_URL must be https://sandbox.fapshi.com or https://live.fapshi.com.");
  }

  const testKey = apiKey.startsWith("FAK_TEST_");
  const sandboxUrl = baseUrl === SANDBOX_URL;
  if (testKey !== sandboxUrl) {
    throw new FapshiError(
      testKey
        ? "Fapshi configuration mismatch: a sandbox key (FAK_TEST_) is set but FAPSHI_BASE_URL points to live."
        : "Fapshi configuration mismatch: a live key is set but FAPSHI_BASE_URL points to the sandbox."
    );
  }

  if (!modeLogged) {
    modeLogged = true;
    console.info(`[fapshi] ${sandboxUrl ? "SANDBOX (test mode, no real money)" : "LIVE"} mode${configured ? "" : " (FAPSHI_BASE_URL not set, defaulting to sandbox)"}`);
  }
  return { apiUser, apiKey, baseUrl };
}

/** True when payments run against the Fapshi sandbox (no real money). */
export function isFapshiTestMode(): boolean {
  return detectTestMode(process.env.FAPSHI_API_KEY, process.env.FAPSHI_BASE_URL || SANDBOX_URL);
}

async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const { apiUser, apiKey, baseUrl } = config();
  let res: Response;
  try {
    res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        apiuser: apiUser,
        apikey: apiKey,
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch (err: any) {
    const timedOut = err?.name === "TimeoutError" || err?.name === "AbortError";
    throw new FapshiError(timedOut ? "Fapshi did not answer in time. Please try again." : "Could not reach Fapshi. Please try again.");
  }

  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    const reason = typeof json?.message === "string" ? json.message.slice(0, 200) : "";
    const hint =
      res.status === 403 ? " (check the Fapshi API user/key, or IP whitelisting on the Fapshi dashboard)" : res.status === 429 ? " (too many requests, wait a moment)" : "";
    throw new FapshiError(`Fapshi request failed (${res.status})${reason ? `: ${reason}` : ""}${hint}`, res.status);
  }
  return json as T;
}

/** POST /initiate-pay: creates a hosted payment link (valid 24 hours). */
export async function initiatePay(input: {
  amount: number;
  userId: string;
  externalId: string;
  redirectUrl: string;
  email?: string | null;
  message?: string;
}): Promise<{ link: string; transId: string; dateInitiated?: string }> {
  if (!Number.isInteger(input.amount) || input.amount < 100) throw new FapshiError("Amount must be a whole number of at least 100 XAF.");
  if (!isFapshiId(input.userId) || !isFapshiId(input.externalId)) throw new FapshiError("Invalid payment reference.");

  const body: Record<string, unknown> = {
    amount: input.amount,
    userId: input.userId,
    externalId: input.externalId,
    redirectUrl: input.redirectUrl,
  };
  if (input.email) body.email = input.email;
  if (input.message) body.message = input.message.slice(0, 200);

  const res = await call<{ link?: string; transId?: string; dateInitiated?: string }>("POST", "/initiate-pay", body);
  if (!res.link || !res.transId) throw new FapshiError("Fapshi did not return a payment link.");
  return { link: res.link, transId: res.transId, dateInitiated: res.dateInitiated };
}

/** GET /payment-status/{transId}: the authoritative status. */
export async function getPaymentStatus(transId: string): Promise<FapshiTransaction> {
  if (!isFapshiId(transId)) throw new FapshiError("Invalid transaction id.");
  const tx = await call<FapshiTransaction>("GET", `/payment-status/${encodeURIComponent(transId)}`);
  return { ...tx, amount: Number(tx.amount) };
}

/** POST /expire-pay: invalidates an unpaid payment link. */
export async function expirePay(transId: string): Promise<FapshiTransaction> {
  if (!isFapshiId(transId)) throw new FapshiError("Invalid transaction id.");
  return call<FapshiTransaction>("POST", "/expire-pay", { transId });
}
