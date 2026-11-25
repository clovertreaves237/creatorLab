"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Clock, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { TestModeBadge } from "@/components/billing/UpgradeModal";
import { formatXaf, useCheckout } from "@/components/billing/useCheckout";

type Phase = "checking" | "successful" | "failed" | "expired" | "waiting" | "error";

const POLL_MS = 4000; // the server only asks Fapshi every 10 s (Fapshi rate limit)
const GIVE_UP_MS = 3 * 60 * 1000;

function ReturnContent() {
  const ref = useSearchParams().get("ref") || "";
  const [phase, setPhase] = useState<Phase>("checking");
  const [info, setInfo] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { startCheckout, starting, error: checkoutError } = useCheckout();

  const check = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      const res = await fetch(`/api/payments/status?ref=${encodeURIComponent(ref)}`, { cache: "no-store" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(json.error || "We could not find this payment.");
        setPhase("error");
        return;
      }
      setInfo(json);
      if (json.status === "successful" || json.status === "failed" || json.status === "expired") {
        setPhase(json.status);
        return;
      }
      if (Date.now() - startedAt.current > GIVE_UP_MS) {
        setPhase("waiting");
        return;
      }
      setPhase("checking");
      timer.current = setTimeout(check, POLL_MS);
    } catch {
      if (Date.now() - startedAt.current > GIVE_UP_MS) setPhase("waiting");
      else timer.current = setTimeout(check, POLL_MS);
    }
  }, [ref]);

  useEffect(() => {
    if (!ref) {
      setMessage("This page needs a payment reference.");
      setPhase("error");
      return;
    }
    check();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [ref, check]);

  const checkAgain = () => {
    startedAt.current = Date.now();
    setPhase("checking");
    check();
  };

  const medium = info?.medium === "orange money" ? "Orange Money" : info?.medium === "mobile money" ? "MTN Mobile Money" : null;

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:py-20">
      <div className="sk-card bg-white p-6 text-center sm:p-9">
        {info?.testMode && <TestModeBadge className="mb-5" />}

        {phase === "checking" && (
          <div className="py-4">
            <MobiusLoader size="md" label="Confirming your payment" sublabel="Approve the request on your phone if you haven't yet." />
          </div>
        )}

        {phase === "successful" && (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-score" strokeWidth={1.75} />
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              You&apos;re on <span className="hl-mint">Pro</span>
            </h1>
            <p className="mt-3 text-sm text-pencil">
              Payment of {formatXaf(info.amount)} received{medium ? ` with ${medium}` : ""}.
              {info.proUntil && (
                <>
                  {" "}
                  Pro is active until{" "}
                  <span className="font-bold text-ink">
                    {new Date(info.proUntil).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  .
                </>
              )}
            </p>
            <Link href="/script-generator" className="sk-btn-ink mt-7 w-full justify-center py-3.5 text-base sm:w-auto sm:px-8">
              Continue writing scripts <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        )}

        {(phase === "failed" || phase === "expired") && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-red-700" strokeWidth={1.75} />
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">
              {phase === "failed" ? "Payment didn't go through" : "Payment link expired"}
            </h1>
            <p className="mt-3 text-sm text-pencil">
              {phase === "failed"
                ? "No money was taken. Check your balance or number and try again."
                : "This payment was not completed in time. No money was taken."}
            </p>
            {checkoutError && <p className="mt-4 text-xs font-medium text-red-700">{checkoutError}</p>}
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button type="button" onClick={startCheckout} disabled={starting} className="sk-btn-ink justify-center py-3 sm:px-7">
                {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                Try again
              </button>
              <Link href="/script-generator" className="sk-btn justify-center py-3 sm:px-7">
                Back to Creator Engine
              </Link>
            </div>
          </>
        )}

        {phase === "waiting" && (
          <>
            <Clock className="mx-auto h-14 w-14 text-ink" strokeWidth={1.75} />
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Still waiting for confirmation</h1>
            <p className="mt-3 text-sm text-pencil">
              If you approved the payment on your phone, it can take a moment to arrive. Pro switches on automatically once it
              does. You can leave this page.
            </p>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button type="button" onClick={checkAgain} className="sk-btn-ink justify-center py-3 sm:px-7">
                <RotateCcw className="h-4 w-4" /> Check again
              </button>
              <Link href="/billing" className="sk-btn justify-center py-3 sm:px-7">
                View my plan
              </Link>
            </div>
          </>
        )}

        {phase === "error" && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-pencil" strokeWidth={1.75} />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">We couldn&apos;t check this payment</h1>
            <p className="mt-3 text-sm text-pencil">{message}</p>
            <Link href="/billing" className="sk-btn mt-7 justify-center py-3 sm:px-7">
              View my plan
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function BillingReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24">
          <MobiusLoader size="md" label="Confirming your payment" />
        </div>
      }
    >
      <ReturnContent />
    </Suspense>
  );
}
