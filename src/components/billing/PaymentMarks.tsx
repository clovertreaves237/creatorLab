/**
 * Payment method marks shown at checkout: MTN Mobile Money and Orange Money (both collected through Fapshi).
 * Brand colours are the one place raw colours are used: they are the operators' own marks, not CreatorLab UI,
 * and must look the same in every site theme.
 */

const MTN_YELLOW = "#FFCB05";
const MTN_INK = "#000000";
const ORANGE = "#FF7900";

export function MtnMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} role="img" aria-label="MTN">
      <rect x="0" y="0" width="64" height="40" rx="8" fill={MTN_YELLOW} />
      <ellipse cx="32" cy="20" rx="25" ry="13.5" fill="none" stroke={MTN_INK} strokeWidth="2.6" />
      <text x="32" y="25" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="14" fill={MTN_INK} letterSpacing="0.5">
        MTN
      </text>
    </svg>
  );
}

export function OrangeMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Orange">
      <rect x="0" y="0" width="40" height="40" rx="3" fill={ORANGE} />
      <text x="4" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="9.5" fill="#FFFFFF">
        orange
      </text>
    </svg>
  );
}

/** "Pay with" row: both operators, labelled. `compact` hides the labels on very small spaces. */
export function PaymentMethods({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-ink ${className}`}>
        <span className="inline-flex items-center gap-2">
          <MtnMark className="h-6 w-auto" /> MTN MoMo
        </span>
        <span className="inline-flex items-center gap-2">
          <OrangeMark className="h-6 w-6" /> Orange Money
        </span>
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-2 min-[360px]:flex-row min-[360px]:items-stretch ${className}`}>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border-2 border-ink bg-white px-2.5 py-2 sm:gap-2.5 sm:px-3">
        <MtnMark className="h-7 w-auto shrink-0" />
        {!compact && (
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-bold text-ink">MTN MoMo</span>
            <span className="block truncate text-[11px] text-pencil">Mobile Money</span>
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border-2 border-ink bg-white px-2.5 py-2 sm:gap-2.5 sm:px-3">
        <OrangeMark className="h-7 w-7 shrink-0" />
        {!compact && (
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-bold text-ink">Orange Money</span>
            <span className="block truncate text-[11px] text-pencil">Cameroon</span>
          </span>
        )}
      </div>
    </div>
  );
}
