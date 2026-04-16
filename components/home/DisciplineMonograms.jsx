/**
 * Bespoke monoline monograms (triangle, diamond, arc, pill, grid, octagon).
 * Stroke draw uses .discipline-mono-stroke + group-hover (see globals.css).
 */

function MonoSvg({ className = 'h-10 w-10 text-[#C5A880]', children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** 01 — Off-plan / launch peak */
export function MonogramTriangle({ className }) {
  return (
    <MonoSvg className={className}>
      <path pathLength={1} d="M20 6 L34 34 H6 Z" className="discipline-mono-stroke" />
    </MonoSvg>
  );
}

/** 02 — UK / facets & corridors */
export function MonogramDiamond({ className }) {
  return (
    <MonoSvg className={className}>
      <path pathLength={1} d="M20 6 L34 20 L20 34 L6 20 Z" className="discipline-mono-stroke" />
    </MonoSvg>
  );
}

/** 03 — Pakistan horizon / geography */
export function MonogramArc({ className }) {
  return (
    <MonoSvg className={className}>
      <path pathLength={1} d="M6 32 C10 12 30 12 34 32" className="discipline-mono-stroke" />
      <path pathLength={1} d="M20 8 v9" className="discipline-mono-stroke" />
    </MonoSvg>
  );
}

/** 04 — Portfolio curve inside pill */
export function MonogramPill({ className }) {
  return (
    <MonoSvg className={className}>
      <path
        pathLength={1}
        d="M14 9h12a7 7 0 017 7v8a7 7 0 01-7 7h-12a7 7 0 01-7-7v-8a7 7 0 017-7z"
        className="discipline-mono-stroke"
      />
      <path pathLength={1} d="M11 23c3.8-7.2 14.2-7.2 18 0" className="discipline-mono-stroke" />
    </MonoSvg>
  );
}

/** 05 — Milestones / capital rhythm */
export function MonogramGrid({ className }) {
  return (
    <MonoSvg className={className}>
      <path pathLength={1} d="M10 10 V30 M20 8 V32 M30 10 V30" className="discipline-mono-stroke" />
      <path pathLength={1} d="M8 20 H32" className="discipline-mono-stroke" />
    </MonoSvg>
  );
}

/** 06 — Integrity / seal */
export function MonogramOctagon({ className }) {
  return (
    <MonoSvg className={className}>
      <path
        pathLength={1}
        d="M14 6 H26 L34 14 V26 L26 34 H14 L6 26 V14 Z"
        className="discipline-mono-stroke"
      />
      <path pathLength={1} d="M14 20 L18 24 L28 14" className="discipline-mono-stroke" />
    </MonoSvg>
  );
}
