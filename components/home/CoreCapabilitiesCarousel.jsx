'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Building2,
  Handshake,
  Landmark,
  LineChart,
  MapPinned,
  ShieldCheck,
} from 'lucide-react';

const disciplines = [
  {
    title: 'Off-Plan Intelligence',
    desc: 'Launch-phase access and project credibility filtering before public saturation.',
    icon: Building2,
    tag: 'Intelligence At Scale',
    points: ['Developer Vetting', 'Early Access', 'Launch Strategy'],
  },
  {
    title: 'UK Brokerage',
    desc: 'Premium residential sourcing, negotiation strategy, and completion management.',
    icon: Landmark,
    tag: 'Engineered For Confidence',
    points: ['Prime Inventory', 'Offer Structuring', 'Completion Support'],
  },
  {
    title: 'Pakistan Project Access',
    desc: 'Curated partnerships across current, upcoming, and delivered communities.',
    icon: MapPinned,
    tag: 'Cross-Border Coverage',
    points: ['Current Pipeline', 'Upcoming Phases', 'Delivered Projects'],
  },
  {
    title: 'Investment Matchmaking',
    desc: 'Goal-based portfolio alignment across yield, growth, liquidity, and entry timing.',
    icon: LineChart,
    tag: 'Portfolio Precision',
    points: ['Yield Mapping', 'Risk Profiling', 'Exit Planning'],
  },
  {
    title: 'Payment Plan Structuring',
    desc: 'Clear route design for local and overseas buyers with predictable cashflow cadence.',
    icon: Handshake,
    tag: 'Structured Execution',
    points: ['Milestone Planning', 'Buyer Clarity', 'Flexible Routing'],
  },
  {
    title: 'Transaction Integrity',
    desc: 'Compliance-first coordination and documentation oversight for stress-free closings.',
    icon: ShieldCheck,
    tag: 'Defense In Depth',
    points: ['Document Control', 'Compliance Checks', 'Closing Oversight'],
  },
];

function DisciplineCard({ item, index, scrollYProgress }) {
  const Icon = item.icon;
  const start = 0.16 + index * 0.08;
  const mid = start + 0.14;
  const end = start + 0.3;

  // Build on scroll-down, reverse on scroll-up.
  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.05, 1, 1]);
  const y = useTransform(scrollYProgress, [start, mid, end], [36, 0, 0]);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.94, 1, 1]);

  return (
    <motion.article
      style={{ opacity, y, scale }}
      className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C5A880]/35"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(197,168,128,0.08) 0%, transparent 62%)' }}
      />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/70 transition-all duration-300 group-hover:border-[#C5A880]/30 group-hover:bg-[#C5A880]/[0.06] group-hover:text-[#E4D3B4]">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <span className="rounded-full border border-[#C5A880]/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#C5A880]/80">
            {item.tag}
          </span>
        </div>
        <h3 className="mb-2.5 text-[18px] font-semibold text-white transition-colors duration-300 group-hover:text-[#f4e1c1]">
          {item.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#94a3b8]/80">{item.desc}</p>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
        {item.points.map((point) => (
          <span key={point} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/60">
            {point}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function CoreCapabilitiesCarousel() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 25%'],
  });
  const headerOpacity = useTransform(scrollYProgress, [0.02, 0.18, 0.24], [0, 1, 1]);
  const headerY = useTransform(scrollYProgress, [0.02, 0.18], [28, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050507] py-24 lg:py-28">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[580px] w-[580px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #f4e1c1, transparent 70%)' }} />
      <div className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #C5A880, transparent 70%)' }} />

      <div className="relative z-10">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mx-auto mb-14 max-w-6xl px-6"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-[#C5A880] to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">What We Do</span>
          </div>
          <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Six Disciplines. One Standard.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 xl:grid-cols-3">
          {disciplines.map((item, index) => (
            <DisciplineCard key={item.title} item={item} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
