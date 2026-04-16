/**
 * Custom monoline marks for disciplines — gold on dark, no stock “icon pack” fill.
 * Stroke-only, consistent optical weight for luxury UI.
 */
export function IconOffPlan({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M8 32V14L20 6l12 8v18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 18h12M14 23h12M14 28h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="29" cy="11" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconUkCorridor({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M6 28 L12 22 L18 24 L24 18 L30 20 L34 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 28h22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M22 10v6M18 13h8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconLahoreArc({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M8 30c6-10 18-10 24 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M20 8v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14 14l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPortfolioCurve({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M8 28c4-12 10-18 24-20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="26" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="22" cy="16" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="10" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 32h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

export function IconMilestoneBars({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M10 32V22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18 32V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M26 32V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 32h22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M28 12l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconIntegritySeal({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 6l12 4v10c0 6.5-5 12-12 14-7-2-12-7.5-12-14V10l12-4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
