/**
 * Bespoke luxury monoline monograms — VSG Collection
 * Crafted with refined geometry, subtle flourishes & intentional negative space.
 * Stroke animation: .discipline-mono-stroke + group-hover (globals.css)
 * Design principles: golden-ratio spacing, tapered terminals, delicate intersections
 */

function MonoSvg({ className = 'h-12 w-12 text-[#C5A880]', children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** 
 * 01 — APEX V 
 * Refined triangular form with subtle inner V-counterform & delicate baseline serif.
 * Evokes: vision, ascent, bespoke craftsmanship
 */
export function MonogramTriangle({ className }) {
  return (
    <MonoSvg className={className}>
      {/* Outer elegant triangle with softened apex */}
      <path 
        pathLength={1} 
        d="M22 9.5 L35.2 33.8 Q22 31.5 8.8 33.8 Z" 
        className="discipline-mono-stroke" 
      />
      {/* Inner V counterform - subtle luxury detail */}
      <path 
        pathLength={1} 
        d="M22 14.2 L27.8 24.6 Q22 23.1 16.2 24.6" 
        className="discipline-mono-stroke opacity-80" 
      />
      {/* Delicate baseline serif dots */}
      <circle cx="8.8" cy="33.8" r="0.7" fill="currentColor" className="opacity-60" />
      <circle cx="35.2" cy="33.8" r="0.7" fill="currentColor" className="opacity-60" />
    </MonoSvg>
  );
}

/** 
 * 02 — FACET S 
 * Diamond form with flowing S-curve through geometric facets.
 * Evokes: sophistication, fluidity, UK heritage corridors
 */
export function MonogramDiamond({ className }) {
  return (
    <MonoSvg className={className}>
      {/* Refined diamond with softened corners */}
      <path 
        pathLength={1} 
        d="M22 9.2 Q34.5 20 33.8 22 Q34.5 24 22 34.8 Q9.5 24 10.2 22 Q9.5 20 22 9.2 Z" 
        className="discipline-mono-stroke" 
      />
      {/* Elegant S-curve flowing through facets */}
      <path 
        pathLength={1} 
        d="M16.5 18.2 Q19.8 20.5 19.8 22 T16.5 25.8 M27.5 18.2 Q24.2 20.5 24.2 22 T27.5 25.8" 
        className="discipline-mono-stroke opacity-90" 
      />
      {/* Subtle facet intersection accent */}
      <circle cx="22" cy="22" r="0.8" fill="currentColor" className="opacity-70" />
    </MonoSvg>
  );
}

/** 
 * 03 — HORIZON G 
 * Graceful arc with G-inspired terminal flourish & refined horizon line.
 * Evokes: Pakistan landscapes, global perspective, elegant closure
 */
/** 
 * 03 — HORIZON G (FIXED)
 * Architectural horizon with development markers & geographic flow.
 * Represents: Pakistan landscape, project pipelines, growth trajectory
 */
export function MonogramArc({ className }) {
  return (
    <MonoSvg className={className}>
      {/* Horizon line representing Pakistan landscape */}
      <path 
        pathLength={1} 
        d="M8 28 Q22 22 36 28" 
        className="discipline-mono-stroke" 
      />
      {/* Development peak/mountain silhouette */}
      <path 
        pathLength={1} 
        d="M14 28 L20 18 L26 28" 
        className="discipline-mono-stroke opacity-90" 
      />
      {/* Growth trajectory line */}
      <path 
        pathLength={1} 
        d="M18 24 L22 16 L26 20" 
        className="discipline-mono-stroke opacity-75" 
      />
      {/* Pipeline markers - representing phases */}
      <circle cx="12" cy="28" r="0.8" fill="currentColor" className="opacity-60" />
      <circle cx="22" cy="26" r="0.8" fill="currentColor" className="opacity-60" />
      <circle cx="32" cy="28" r="0.8" fill="currentColor" className="opacity-60" />
    </MonoSvg>
  );
}

/** 
 * 04 — PILLED MONOGRAM LOCKUP 
 * Elegant pill container with intertwined VSG abstract initials.
 * Evokes: portfolio cohesion, bespoke initials, curated collection
 */
export function MonogramPill({ className }) {
  return (
    <MonoSvg className={className}>
      {/* Refined pill frame with subtle corner softening */}
      <path
        pathLength={1}
        d="M15.5 8.5h13a7.2 7.2 0 017.2 7.2v12.6a7.2 7.2 0 01-7.2 7.2h-13a7.2 7.2 0 01-7.2-7.2V15.7a7.2 7.2 0 017.2-7.2z"
        className="discipline-mono-stroke opacity-90"
      />
      {/* Abstract VSG monogram flow - minimal luxury line art */}
      <path 
        pathLength={1} 
        d="M13.2 24.8 Q16.8 17.5 22 19.2 Q27.2 17.5 30.8 24.8" 
        className="discipline-mono-stroke" 
      />
      {/* Subtle connecting accent for depth */}
      <path 
        pathLength={1} 
        d="M19.8 22.5 Q22 24.1 24.2 22.5" 
        className="discipline-mono-stroke opacity-70" 
      />
      {/* Delicate corner accents */}
      <circle cx="15.5" cy="15.7" r="0.5" fill="currentColor" className="opacity-40" />
      <circle cx="28.5" cy="28.3" r="0.5" fill="currentColor" className="opacity-40" />
    </MonoSvg>
  );
}

/** 
 * 05 — CAPITAL RHYTHM GRID 
 * Refined vertical rhythm with golden-ratio spacing & elegant intersections.
 * Evokes: milestones, financial precision, architectural harmony
 */
export function MonogramGrid({ className }) {
  return (
    <MonoSvg className={className}>
      {/* Vertical strokes with intentional golden-ratio spacing */}
      <path pathLength={1} d="M12.4 11.2 V32.8" className="discipline-mono-stroke" />
      <path pathLength={1} d="M22 9.5 V34.5" className="discipline-mono-stroke opacity-95" />
      <path pathLength={1} d="M31.6 11.2 V32.8" className="discipline-mono-stroke" />
      
      {/* Elegant horizontal accent with subtle curve */}
      <path 
        pathLength={1} 
        d="M9.8 22 Q22 23.2 34.2 22" 
        className="discipline-mono-stroke" 
      />
      
      {/* Refined intersection accents - luxury detail */}
      <circle cx="22" cy="22" r="0.9" fill="currentColor" className="opacity-80" />
      <circle cx="22" cy="11.2" r="0.5" fill="currentColor" className="opacity-40" />
      <circle cx="22" cy="32.8" r="0.5" fill="currentColor" className="opacity-40" />
    </MonoSvg>
  );
}

/** 
 * 06 — INTEGRITY SEAL 
 * Octagonal seal with refined checkmark forming subtle G-terminal.
 * Evokes: trust, heritage, bespoke certification
 */
export function MonogramOctagon({ className }) {
  return (
    <MonoSvg className={className}>
      {/* Elegant octagon with softened geometric precision */}
      <path
        pathLength={1}
        d="M15.2 7.8 H28.8 Q35.2 11.5 36.2 15.2 V28.8 Q32.5 35.2 28.8 36.2 H15.2 Q7.8 32.5 7.8 28.8 V15.2 Q11.5 7.8 15.2 7.8 Z"
        className="discipline-mono-stroke"
      />
      
      {/* Refined checkmark with G-inspired terminal flourish */}
      <path 
        pathLength={1} 
        d="M16.8 22.5 L20.2 25.8 L29.5 17.2 Q31.2 18.8 29.8 20.5 Q28.5 19.2 27.2 20.8" 
        className="discipline-mono-stroke" 
      />
      
      {/* Subtle seal accent dots - heritage detail */}
      <circle cx="22" cy="14.5" r="0.7" fill="currentColor" className="opacity-60" />
      <circle cx="22" cy="29.5" r="0.7" fill="currentColor" className="opacity-60" />
    </MonoSvg>
  );
}