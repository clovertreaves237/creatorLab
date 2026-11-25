# Testing payments (Fapshi sandbox)

CreatorLab sells two plans, each paid once through Fapshi with **MTN Mobile Money** or **Orange Money**
(no automatic renewal). No real money moves while the sandbox keys are used (yellow "Test mode · no real money" badge).

| Plan | Default price | What the user gets |
|---|---|---|
| Free | 0 XAF | `free_scripts_per_day` scripts per rolling 24 hours (default **1**), 20 background sounds an hour |
| Creator | **5,000 XAF / 30 days** | up to `daily_script_limit` scripts a day (default 20), 20 sounds an hour |
| Agency & Academy | **50,000 XAF / 30 days** | up to `plan_agency_daily_scripts` a day (default 150, always more than Creator), 60 sounds an hour |

Curators and admins are not limited by the free plan (admins have no limit at all).
Prices, plan length and limits are set in the **admin portal → Settings → Plans & payments**. The price is always read
on the server; the browser never sends an amount. Paying again for the same plan adds days to its end date.

## Before you test (one time)

1. **Database**: apply `supabase/migrations/20261128000001_payments_subscriptions.sql`, then `20261129000001_creator_agency_plans.sql` (Supabase → SQL Editor → paste → Run). The last result row of each must be all `true`.
2. **Server secrets** in `.env.local` (local) and Vercel (live): `FAPSHI_API_USER`, `FAPSHI_API_KEY`, `FAPSHI_BASE_URL`,
   `FAPSHI_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`. None of them has `NEXT_PUBLIC_`.
3. **Fapshi dashboard** (your sandbox service): webhook URL `https://creator-lab-beta.vercel.app/api/payments/webhook`
   and webhook secret = the value of `FAPSHI_WEBHOOK_SECRET`. Fapshi sends the secret in the `x-wh-secret` header.
4. Use a **normal user account** (not a curator or admin, they are not limited).

## Sandbox phone numbers (from Fapshi's docs)

| Result | MTN Mobile Money | Orange Money |
|---|---|---|
| Payment succeeds | `670000000`, `670000002`, `650000000` | `690000000`, `690000002`, `656000000` |
| Payment fails | `670000001`, `670000003`, `650000001` | `690000001`, `690000003`, `656000001` |

Any other number gives a random result. Fapshi's docs do not say whether webhooks fire in the sandbox, so
CreatorLab does not depend on them: the return page asks Fapshi for the status itself.

## Test cases

### 1. Free script, then the paywall
1. Sign in as a new user, open **Creator Engine**. The line above the input says **"1 free script left today"**.
2. Write a script. It works. The line now says **"Free script used · next one <day, time>"**.
3. A large yellow banner says **"You've used today's free script"** with a **Subscribe** button. Trying to write another
   opens the same message with the exact unlock time. Your typed text is kept. Nothing is sent to Gemini.

### 2. Successful payment (MTN), Creator plan
1. Tap **Subscribe** → **Choose Creator**. The checkout page shows **5 000 XAF**, the Creator features and the test numbers.
2. Tap **Copy** next to **670000000**, then **Pay 5 000 XAF**. On Fapshi's test page choose MTN, paste the number, confirm.
3. You return to `/billing/return`. It shows "Confirming your payment", then **"You're on Creator"** with the end date.
4. **Continue writing scripts**: generation works again. The plan line shows **CREATOR · 1/20 today · until …**.
5. `/billing` lists the payment as **Creator · Paid · MTN MoMo**.

### 3. Successful payment (Orange), Agency & Academy plan
Same as 2, but choose **Agency & Academy** (checkout shows **50 000 XAF**) and use **690000000**. The plan line shows
**AGENCY & ACADEMY · …/150 today**; history shows **Orange Money**.

### 4. Failed payment
Use **670000001** (or **690000001**). The return page shows **"Payment didn't go through"** with **Try again**.
The user stays on the free plan. `/billing` shows **Failed**.

### 5. Cancelled / abandoned
Open the Fapshi page and close it (or press Back) without paying. Open `/billing`: the payment is **Pending · check**.
Fapshi links expire after 24 hours; checking after that shows **Expired**. The user stays on the free plan.

### 6. Slow confirmation
If the return page keeps checking for 3 minutes, it shows **"Still waiting for confirmation"** with **Check again**.
Pro switches on as soon as Fapshi confirms (webhook or the next check).

### 7. Reload after success
Reload `/billing/return?ref=…` after a successful payment. It shows the same success screen and does **not** add days
again (each payment can grant Pro only once).

### 8. Renewal and upgrade
On `/billing`, **Extend Creator** (or **Extend Agency & Academy**) adds `pro_days` days. A Creator user can buy
Agency & Academy at any time; the higher limits apply while it is active.

### Security checks (optional)
- Another user cannot open your `/billing/return?ref=…` (they get "Payment not found").
- A webhook call without the right `x-wh-secret` gets `401`. A webhook with a correct secret but a fake status
  changes nothing: CreatorLab always re-checks the status and amount with Fapshi before granting Pro.

## Going live checklist

1. In the Fapshi dashboard, activate the **live** service and copy its API user and API key (live keys start with `FAK_`, not `FAK_TEST_`).
2. In **Vercel → Settings → Environment Variables (Production)** set `FAPSHI_API_USER` and `FAPSHI_API_KEY` to the live values
   and `FAPSHI_BASE_URL=https://live.fapshi.com`. (The app refuses to start a payment if a live key is paired with the sandbox URL or the other way round.)
3. Set the **webhook URL and secret on the live service** too (webhooks are configured per service).
4. Set the real price in the admin portal → Settings → Plans & payments.
5. **Redeploy**, make one small real payment, and confirm: the return page shows Pro, `/billing` shows Paid, and the Vercel logs show the webhook arriving (`/api/payments/webhook` with status 200).
6. Fapshi keeps a 3% fee per payment. There is no refund API: refunds go through a Fapshi payout.
