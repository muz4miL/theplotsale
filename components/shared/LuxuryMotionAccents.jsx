'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Soft drifting light fields — Resend-adjacent depth without 3D assets.
 * Keep opacity low; luxury is restraint.
 */
export function LuxurySectionOrbs({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`absolute -left-[18%] top-[12%] h-[min(380px,70vw)] w-[min(380px,70vw)] rounded-full bg-[#C5A880] opacity-[0.09] blur-[100px] ${
          reduceMotion ? '' : 'motion-safe:animate-[luxury-drift_24s_ease-in-out_infinite]'
        }`}
      />
      <div
        className={`absolute -right-[20%] bottom-[8%] h-[min(340px,65vw)] w-[min(340px,65vw)] rounded-full bg-[#1e3d36] opacity-[0.14] blur-[90px] ${
          reduceMotion ? '' : 'motion-safe:animate-[luxury-drift-alt_30s_ease-in-out_infinite]'
        }`}
      />
    </div>
  );
}

/**
 * Abstract skyline / tower strokes — on-brand, not emoji.
 */
export function LuxurySkylineGlyph({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 120 48"
      className={`shrink-0 text-[#C5A880] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <motion.g
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        animate={reduceMotion ? {} : { opacity: [0.22, 0.5, 0.22] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="4" y="22" width="9" height="22" rx="0.5" />
        <rect x="20" y="14" width="11" height="30" rx="0.5" />
        <rect x="37" y="26" width="7" height="18" rx="0.5" />
        <rect x="50" y="8" width="13" height="36" rx="0.5" />
        <rect x="69" y="20" width="9" height="24" rx="0.5" />
        <rect x="84" y="16" width="16" height="28" rx="0.5" />
        <rect x="104" y="24" width="12" height="20" rx="0.5" />
      </motion.g>
    </motion.svg>
  );
}

/** Shimmer band for section tops (marquee, dividers). */
export function LuxuryEdgeShimmer({ className = '' }) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className={`pointer-events-none h-px w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`h-full w-[40%] bg-gradient-to-r from-transparent via-[#C5A880]/70 to-transparent ${
          reduceMotion ? 'mx-auto opacity-40' : 'motion-safe:animate-[luxury-edge-shimmer_4.5s_ease-in-out_infinite]'
        }`}
      />
    </div>
  );
}

/**
 * Site-wide ambient: fixed, behind main content. Skip admin.
 */
export function LuxuryGlobalAmbient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      <div
        className={`absolute -left-[25%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-[#C5A880] opacity-[0.055] blur-[130px] ${
          reduceMotion ? '' : 'motion-safe:animate-[luxury-drift_36s_ease-in-out_infinite]'
        }`}
      />
      <div
        className={`absolute -right-[20%] bottom-[12%] h-[45vh] w-[45vh] rounded-full bg-[#0f2520] opacity-[0.11] blur-[110px] ${
          reduceMotion ? '' : 'motion-safe:animate-[luxury-drift-alt_32s_ease-in-out_infinite]'
        }`}
      />
    </div>
  );
}
