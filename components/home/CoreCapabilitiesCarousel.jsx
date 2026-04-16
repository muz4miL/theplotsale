'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  IconOffPlan,
  IconUkCorridor,
  IconLahoreArc,
  IconPortfolioCurve,
  IconMilestoneBars,
  IconIntegritySeal,
} from '@/components/home/DisciplineMonograms';

const disciplines = [
  {
    tag: 'Intelligence at scale',
    title: 'Off-plan & launch intelligence',
    desc: 'Early tranche access and on-the-ground credibility work before narratives get loud and good inventory thins.',
    Icon: IconOffPlan,
    points: ['Developer & scheme vetting', 'Launch-phase positioning', 'Noise filtering'],
  },
  {
    tag: 'London & Thames corridor',
    title: 'UK premium brokerage',
    desc: 'Residential sourcing across prime Hounslow and Isleworth stock — from first viewing through negotiation, structuring, and completion.',
    Icon: IconUkCorridor,
    points: ['Prime inventory', 'Offer architecture', 'Completion stewardship'],
  },
  {
    tag: 'Lahore vertical & land',
    title: 'Pakistan project desk',
    desc: 'Curated access to current pipelines, upcoming phases, and delivered benchmarks your overseas desk can underwrite with confidence.',
    Icon: IconLahoreArc,
    points: ['Live developments', 'Upcoming releases', 'Delivered proof'],
  },
  {
    tag: 'Portfolio fit',
    title: 'Investment matchmaking',
    desc: 'Goal-based alignment across yield, growth, liquidity, and entry timing — not generic “deals,” but positions that match the mandate.',
    Icon: IconPortfolioCurve,
    points: ['Yield mapping', 'Risk profiling', 'Exit sequencing'],
  },
  {
    tag: 'Capital rhythm',
    title: 'Payment-plan engineering',
    desc: 'Clear instalment routes for domestic and overseas buyers with milestones and cashflow you can actually model.',
    Icon: IconMilestoneBars,
    points: ['Milestone design', 'Buyer clarity', 'Flexible routing'],
  },
  {
    tag: 'Closing discipline',
    title: 'Transaction integrity',
    desc: 'Compliance-first coordination and documentation oversight so capital releases and handovers land without drama.',
    Icon: IconIntegritySeal,
    points: ['Document control', 'Compliance checkpoints', 'Stress-tested closings'],
  },
];

function DisciplineCard({ item, index, scrollYProgress }) {
  const Icon = item.Icon;
  const start = 0.06 + index * 0.055;
  const mid = start + 0.12;
  const end = start + 0.26;

  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.04, 1, 1]);
  const y = useTransform(scrollYProgress, [start, mid, end], [32, 0, 0]);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.96, 1, 1]);

  return (
    <motion.article
      style={{ opacity, y, scale }}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[2px] border border-white/[0.07] bg-[#060809] p-7 transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-700 hover:before:opacity-100 before:bg-[radial-gradient(ellipse_120%_80%_at_10%_0%,rgba(197,168,128,0.07),transparent_55%)] hover:border-[#C5A880]/25 hover:shadow-[0_24px_64px_-20px_rgba(0,0,0,0.55)] md:min-h-[300px]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-[2px] border border-[#C5A880]/20 text-[#C5A880] transition-colors duration-500 group-hover:border-[#C5A880]/40 group-hover:text-[#e8dcc4]">
            <Icon className="h-10 w-10" />
          </div>
          <span className="max-w-[11rem] text-right font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-[#C5A880]/75">
            {item.tag}
          </span>
        </div>

        <h3 className="mb-3 font-playfair text-[1.35rem] font-light leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#f5f0e8] sm:text-2xl">
          {item.title}
        </h3>
        <p className="flex-1 font-[family-name:var(--font-manrope)] text-[13px] font-light leading-[1.75] text-white/48">
          {item.desc}
        </p>

        <ul className="relative z-10 mt-6 space-y-2 border-t border-white/[0.06] pt-6">
          {item.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 font-[family-name:var(--font-manrope)] text-[11px] font-medium uppercase tracking-[0.18em] text-white/40"
            >
              <span className="mt-[0.35rem] h-px w-5 shrink-0 bg-[#C5A880]/50" aria-hidden />
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function CoreCapabilitiesCarousel() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 88%', 'end 22%'],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [0, 1, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.14], [24, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#030706] py-20 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgba(197,168,128,0.07),transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[min(70vw,520px)] w-[min(70vw,520px)] translate-x-1/4 translate-y-1/4 rounded-full bg-[#C5A880]/[0.03] blur-3xl" aria-hidden />

      <div className="relative z-10">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="lux-mobile-page-gutter mx-auto mb-14 max-w-6xl lg:mb-20"
        >
          <div className="mb-8 flex flex-wrap items-center gap-5">
            <div className="h-px w-14 bg-gradient-to-r from-[#C5A880] to-transparent" />
            <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C5A880]">
              What we do
            </span>
            <span className="hidden h-px flex-1 min-w-[4rem] bg-gradient-to-r from-white/[0.08] to-transparent sm:block" />
          </div>
          <h2 className="max-w-4xl font-playfair text-[clamp(2rem,5.5vw,3.75rem)] font-light leading-[1.08] tracking-tight text-balance text-white">
            Six disciplines.{' '}
            <span className="italic text-[#e8dcc4]/95">One standard.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/45 sm:text-base">
            The Plot Sale — advisory depth, execution discipline, and cross-border fluency across UK residential and
            Pakistan development without the noise.
          </p>
        </motion.div>

        <div className="lux-mobile-page-gutter mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {disciplines.map((item, index) => (
            <DisciplineCard key={item.title} item={item} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
