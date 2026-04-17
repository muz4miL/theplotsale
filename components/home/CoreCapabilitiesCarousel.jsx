'use client';

import { useRef, useState } from 'react';
import {
  MonogramTriangle,
  MonogramDiamond,
  MonogramArc,
  MonogramPill,
  MonogramGrid,
  MonogramOctagon,
} from '@/components/home/DisciplineMonograms';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const disciplines = [
  {
    Monogram: MonogramTriangle,
    eyebrow: '01 — Intelligence',
    title: 'Off-plan & launch',
    titleItalic: 'intelligence',
    desc: 'Early tranche access and on-the-ground credibility work before narratives get loud and strong inventory thins.',
    bullets: ['Developer & scheme vetting', 'Launch-phase positioning', 'Noise filtering'],
    anchor: true,
  },
  {
    Monogram: MonogramDiamond,
    eyebrow: '02 — UK desk',
    title: 'Premium brokerage',
    titleItalic: 'London corridor',
    desc: 'Residential sourcing across Hounslow and Isleworth stock — viewing through negotiation, structuring, and completion.',
    bullets: ['Prime inventory', 'Offer architecture', 'Completion stewardship'],
    anchor: false,
  },
  {
    Monogram: MonogramArc,
    eyebrow: '03 — Pakistan',
    title: 'Project desk',
    titleItalic: 'Lahore & beyond',
    desc: 'Curated access to current pipelines, upcoming phases, and delivered benchmarks an overseas desk can underwrite with confidence.',
    bullets: ['Live developments', 'Upcoming releases', 'Delivered proof'],
    anchor: false,
  },
  {
    Monogram: MonogramPill,
    eyebrow: '04 — Mandate',
    title: 'Investment',
    titleItalic: 'matchmaking',
    desc: 'Goal-based alignment across yield, growth, liquidity, and entry timing — positions that match the mandate, not generic deals.',
    bullets: ['Yield mapping', 'Risk profiling', 'Exit sequencing'],
    anchor: false,
  },
  {
    Monogram: MonogramGrid,
    eyebrow: '05 — Capital',
    title: 'Payment-plan',
    titleItalic: 'engineering',
    desc: 'Instalment routes for domestic and overseas buyers with milestones and cashflow you can model without ambiguity.',
    bullets: ['Milestone design', 'Buyer clarity', 'Flexible routing'],
    anchor: false,
  },
  {
    Monogram: MonogramOctagon,
    eyebrow: '06 — Integrity',
    title: 'Transaction',
    titleItalic: 'discipline',
    desc: 'Compliance-first coordination and documentation oversight so releases and handovers land without drama.',
    bullets: ['Document control', 'Compliance checkpoints', 'Stress-tested closings'],
    anchor: false,
  },
];

function LuxuryGlow({ isActive = false }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,168,128,0.12),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_100%,transparent_40%,rgba(6,8,9,0.92)_100%)]" />
      <div className="absolute -right-1/4 -top-1/4 h-64 w-64 rounded-full bg-[#C5A880]/5 blur-3xl" />
    </div>
  );
}

function MonogramFrame({ children, isActive, isAnchor }) {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (mx - 0.5) * 3.2,
      y: (my - 0.5) * -3.2,
    });
  };

  const scale = isActive ? 1.03 : 1;

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
      className={`relative flex items-center justify-center rounded-[3px] border transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out ${
        isActive
          ? 'border-[#C5A880]/45 bg-[#C5A880]/[0.03] shadow-[0_0_48px_-12px_rgba(197,168,128,0.25)]'
          : 'border-[#C5A880]/18 bg-white/[0.01] hover:border-[#C5A880]/32'
      } ${isAnchor ? 'h-[6.25rem] w-[6.25rem]' : 'h-[4.75rem] w-[4.75rem]'}`}
    >
      <div className="absolute inset-[1px] rounded-[2px] border border-white/[0.04]" />

      <div
        className="relative z-10 transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          filter: isActive ? 'drop-shadow(0 0 12px rgba(197,168,128,0.35))' : 'none',
        }}
      >
        {children}
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1 top-1 h-1.5 w-1.5 border-l border-t border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-1 top-1 h-1.5 w-1.5 border-r border-t border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-1 left-1 h-1.5 w-1.5 border-b border-l border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
}

function DisciplineCard({ item, gridClassName = '', index, inView, reduce }) {
  const Monogram = item.Monogram;
  const isAnchor = item.anchor;
  const [isHovered, setIsHovered] = useState(false);
  const delayMs = 80 + index * 70;
  const shown = reduce || inView;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={reduce ? undefined : { transitionDelay: `${delayMs}ms` }}
      className={`group relative flex flex-col overflow-hidden rounded-[3px] border border-[rgba(255,255,255,0.05)] bg-gradient-to-b from-[#080a0b] to-[#060809] transition-all duration-[920ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C5A880]/28 hover:shadow-[0_32px_80px_-28px_rgba(0,0,0,0.72),0_0_0_1px_rgba(197,168,128,0.08)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        isAnchor
          ? 'p-10 sm:p-12 lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:min-h-[min(620px,calc(100svh-12rem))]'
          : 'min-h-[280px] p-8 sm:min-h-[300px]'
      } ${gridClassName || ''} ${shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <LuxuryGlow isActive={isHovered} />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-1 flex-col">
        <div className={`mb-7 flex items-start justify-between gap-5 ${isAnchor ? 'mb-10' : ''}`}>
          <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C5A880]">
            {item.eyebrow}
          </span>

          <MonogramFrame isActive={isHovered} isAnchor={isAnchor}>
            <Monogram className={isAnchor ? 'h-14 w-14' : 'h-11 w-11'} />
          </MonogramFrame>
        </div>

        <h3
          className={`font-playfair font-light tracking-tight text-[#e8dcc4] ${
            isAnchor ? 'text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] sm:text-5xl' : 'text-[1.45rem] leading-snug sm:text-2xl'
          }`}
        >
          {item.title}{' '}
          <em className="font-playfair-light not-italic italic text-[#c9b89a]/85">
            <span className="italic">{item.titleItalic}</span>
          </em>
        </h3>

        <p
          className={`mt-5 font-[family-name:var(--font-manrope)] font-light leading-relaxed text-white/55 ${
            isAnchor ? 'max-w-xl text-base sm:text-lg' : 'mt-4 flex-1 text-[13.5px] leading-[1.8]'
          }`}
        >
          {item.desc}
        </p>

        <ul className={`mt-auto flex flex-col gap-3 border-t border-white/[0.07] ${isAnchor ? 'pt-10' : 'pt-7'}`}>
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="group/bullet relative flex items-center gap-3 font-[family-name:var(--font-manrope)] text-[11px] font-medium uppercase leading-snug tracking-[0.18em] text-white/45"
            >
              <span className="discipline-hair-bullet relative flex h-4 w-4 items-center justify-center">
                <span className="absolute h-px w-2.5 bg-[#C5A880]/60 transition-all duration-300 group-hover/bullet:w-3.5 group-hover/bullet:bg-[#C5A880]" />
                <span className="h-1 w-1 rounded-full bg-[#C5A880]/40 opacity-0 transition-opacity duration-300 group-hover/bullet:opacity-100" />
              </span>
              <span className="transition-colors duration-300 group-hover/bullet:text-[#e8dcc4]/90">{bullet}</span>
            </li>
          ))}
        </ul>

        {isAnchor ? (
          <div className="mt-8 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#C5A880]/70">
            <span>Explore capability</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="transition-transform duration-500 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[3px] ring-1 ring-[#C5A880]/0 transition-[box-shadow] duration-300 focus-within:ring-[#C5A880]/35" />
    </article>
  );
}

export default function CoreCapabilitiesCarousel() {
  const reduce = usePrefersReducedMotion();
  const [anchor, ...rest] = disciplines;
  const [wrapRef, inView] = useInViewOnce({ once: true, threshold: 0.06, rootMargin: '-8% 0px' });
  const headerShown = reduce || inView;

  const gridClasses = [
    'lg:col-start-2 lg:row-start-1',
    'lg:col-start-3 lg:row-start-1',
    'lg:col-start-2 lg:row-start-2',
    'lg:col-start-3 lg:row-start-2',
    'lg:col-start-2 lg:row-start-3 lg:col-span-2 sm:mx-auto sm:max-w-xl lg:max-w-none lg:justify-self-stretch',
  ];

  return (
    <section className="relative overflow-hidden bg-[#020403] py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='lux-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23lux-noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(197,168,128,0.09),transparent_58%)]" />
        <div className="absolute top-1/4 -right-1/4 h-96 w-96 rounded-full bg-[#C5A880]/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 h-80 w-80 rounded-full bg-[#C5A880]/[0.03] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,transparent_35%,rgba(2,4,3,0.96)_100%)]" />
      </div>

      <div ref={wrapRef} className="relative z-10 lux-mobile-page-gutter mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header
          className={`mb-16 max-w-3xl transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:mb-24 ${
            headerShown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="mb-8 flex flex-wrap items-center gap-6">
            <div className="relative h-px w-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A880] via-[#C5A880]/80 to-transparent" />
            </div>
            <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C5A880]">
              Capabilities
            </span>
          </div>

          <h2 className="text-balance font-playfair text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.06] text-white">
            Full-cycle execution. <span className="italic text-[#e8dcc4]/92">One standard.</span>
          </h2>

          <p className="mt-6 font-[family-name:var(--font-manrope)] text-base font-light leading-relaxed text-white/50 sm:text-lg">
            The Plot Sale — UK residential brokerage, Pakistan development access, and cross-border structuring without the
            noise. Precision, discretion, delivery.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6">
          <DisciplineCard item={anchor} index={0} inView={inView} reduce={reduce} />
          {rest.map((item, i) => (
            <DisciplineCard
              key={item.eyebrow}
              item={item}
              gridClassName={gridClasses[i] || ''}
              index={i + 1}
              inView={inView}
              reduce={reduce}
            />
          ))}
        </div>

        <div
          className={`mt-20 flex justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:mt-28 ${
            headerShown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={reduce ? undefined : { transitionDelay: '420ms' }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
