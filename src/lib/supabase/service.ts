import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses Row Level Security, so it is used ONLY by the payment code
 * (recording payments and granting Pro after Fapshi confirmed them). Never import this in client code.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Payments are not set up yet (SUPABASE_SERVICE_ROLE_KEY missing on the server).");
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
