/** GET /api/entitlement: same data as /api/billing (plan, expiresAt, scriptsUsedToday, scriptsLimit, nextAvailableAt, outliersUnlocked, ...). */
export const dynamic = "force-dynamic";
export { GET } from "../billing/route";
