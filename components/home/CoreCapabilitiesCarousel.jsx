'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  MonogramTriangle,
  MonogramDiamond,
  MonogramArc,
  MonogramPill,
  MonogramGrid,
  MonogramOctagon,
} from '@/components/home/DisciplineMonograms';

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

const easeLux = [0.22, 1, 0.36, 1];

const secondaryGridClass = [
  'lg:col-start-2 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
  'lg:col-start-2 lg:row-start-3 lg:col-span-2 sm:mx-auto sm:max-w-xl lg:max-w-none lg:justify-self-stretch',
];

function DisciplineCard({ item, itemVariants, gridClassName = '' }) {
  const Monogram = item.Monogram;
  const isAnchor = item.anchor;

  return (
    <motion.article
      variants={itemVariants}
      className={`group relative flex flex-col overflow-hidden rounded-[2px] border border-[rgba(255,255,255,0.06)] bg-[#060809] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#C5A880]/22 hover:shadow-[0_28px_72px_-24px_rgba(0,0,0,0.58)] ${
        isAnchor
          ? 'p-9 sm:p-10 lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:min-h-[min(560px,calc(100svh-10rem))]'
          : 'min-h-[260px] p-7 sm:min-h-[280px]'
      } ${gridClassName}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_0%_0%,rgba(197,168,128,0.06),transparent_58%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-1 flex-col">
        <div className={`mb-6 flex items-start justify-between gap-4 ${isAnchor ? 'mb-8' : ''}`}>
          <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A880]">
            {item.eyebrow}
          </span>
          <div
            className={`flex shrink-0 items-center justify-center rounded-[2px] border border-[#C5A880]/22 text-[#C5A880] transition-colors duration-500 group-hover:border-[#C5A880]/40 group-hover:text-[#e8dcc4] ${
              isAnchor ? 'h-[5.5rem] w-[5.5rem]' : 'h-[4.25rem] w-[4.25rem]'
            }`}
          >
            <Monogram className={isAnchor ? 'h-12 w-12' : 'h-10 w-10'} />
          </div>
        </div>

        <h3
          className={`font-playfair font-light tracking-tight text-[#e8dcc4] ${isAnchor ? 'text-[clamp(1.85rem,4vw,3rem)] leading-[1.12] sm:text-4xl' : 'text-[1.35rem] leading-snug sm:text-xl'}`}
        >
          {item.title} <em className="italic text-white/58">{item.titleItalic}</em>
        </h3>

        <p
          className={`mt-4 font-[family-name:var(--font-manrope)] font-light leading-relaxed text-white/50 ${isAnchor ? 'max-w-md text-sm sm:text-base' : 'mt-3 flex-1 text-[13px] leading-[1.75]'}`}
        >
          {item.desc}
        </p>

        <ul className={`mt-auto flex flex-col gap-2.5 border-t border-white/[0.06] ${isAnchor ? 'pt-8' : 'pt-6'}`}>
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="discipline-hair-bullet font-[family-name:var(--font-manrope)] text-[11px] font-medium uppercase leading-snug tracking-[0.16em] text-white/42"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function CoreCapabilitiesCarousel() {
  const reduce = useReducedMotion();
  const [anchor, ...rest] = disciplines;

  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.88, ease: easeLux },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.85, ease: easeLux },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#030706] py-20 sm:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(197,168,128,0.075),transparent_52%)]" />

      <div className="relative z-10 lux-mobile-page-gutter mx-auto max-w-7xl">
        <motion.header
          className="mb-12 max-w-2xl lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={headerVariants}
        >
          <div className="mb-6 flex flex-wrap items-center gap-5">
            <div className="h-px w-14 bg-gradient-to-r from-[#C5A880] to-transparent" />
            <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C5A880]">
              What we do
            </span>
          </div>
          <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.08] text-balance text-white">
            Full-cycle execution.{' '}
            <span className="italic text-[#e8dcc4]/95">One standard.</span>
          </h2>
          <p className="mt-5 font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/45 sm:text-base">
            The Plot Sale — UK residential brokerage, Pakistan development access, and cross-border structuring without
            the noise.
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-3 lg:gap-5"
        >
          <DisciplineCard item={anchor} itemVariants={itemVariants} />
          {rest.map((item, i) => (
            <DisciplineCard
              key={item.eyebrow}
              item={item}
              itemVariants={itemVariants}
              gridClassName={secondaryGridClass[i] || ''}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
