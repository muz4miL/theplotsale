'use client';

import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
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

// ✨ Luxury easing curves
const easeLux = [0.22, 1, 0.36, 1];
const easeWhisper = [0.16, 1, 0.3, 1];

// ✨ Refined spring config
const springLux = { stiffness: 180, damping: 28, mass: 0.9 };

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
      <div className="absolute -top-1/4 -right-1/4 h-64 w-64 rounded-full bg-[#C5A880]/5 blur-3xl" />
    </div>
  );
}

function MonogramFrame({ children, isActive, isAnchor }) {
  const frameRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // ✨ Fixed: Proper useTransform usage
  const rotateX = useTransform(mouseY, [0, 1], [1.5, -1.5]);
  const rotateY = useTransform(mouseX, [0, 1], [-1.5, 1.5]);
  const scaleValue = useMotionValue(isActive ? 1.03 : 1);
  const scale = useSpring(scaleValue, springLux);

  // Update scale when isActive changes
  useState(() => {
    scaleValue.set(isActive ? 1.03 : 1);
  });

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      className={`relative flex items-center justify-center rounded-[3px] border transition-colors duration-700 ${
        isActive
          ? 'border-[#C5A880]/45 bg-[#C5A880]/[0.03] shadow-[0_0_48px_-12px_rgba(197,168,128,0.25)]'
          : 'border-[#C5A880]/18 bg-white/[0.01] hover:border-[#C5A880]/32'
      } ${isAnchor ? 'h-[6.25rem] w-[6.25rem]' : 'h-[4.75rem] w-[4.75rem]'}`}
    >
      <div className="absolute inset-[1px] rounded-[2px] border border-white/[0.04]" />
      
      <motion.div
        className="relative z-10"
        animate={{ 
          filter: isActive ? 'drop-shadow(0 0 12px rgba(197,168,128,0.35))' : 'drop-shadow(0 0 0 transparent)'
        }}
        transition={{ duration: 0.6, ease: easeLux }}
      >
        {children}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1 left-1 h-1.5 w-1.5 border-l border-t border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-1 right-1 h-1.5 w-1.5 border-r border-t border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-1 left-1 h-1.5 w-1.5 border-l border-b border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-1 right-1 h-1.5 w-1.5 border-r border-b border-[#C5A880]/40 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </motion.div>
  );
}

function DisciplineCard({ item, itemVariants, gridClassName = '', index }) {
  const Monogram = item.Monogram;
  const isAnchor = item.anchor;
  const [isHovered, setIsHovered] = useState(false);
  const entranceDelay = index * 0.06;

  return (
    <motion.article
      variants={itemVariants}
      custom={entranceDelay}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-[3px] border border-[rgba(255,255,255,0.05)] bg-gradient-to-b from-[#080a0b] to-[#060809] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#C5A880]/28 hover:shadow-[0_32px_80px_-28px_rgba(0,0,0,0.72),0_0_0_1px_rgba(197,168,128,0.08)] ${
        isAnchor
          ? 'p-10 sm:p-12 lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:min-h-[min(620px,calc(100svh-12rem))]'
          : 'min-h-[280px] p-8 sm:min-h-[300px]'
      } ${gridClassName || ''}`}
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
          <motion.span 
            className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C5A880]"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: entranceDelay + 0.1, ease: easeWhisper }}
          >
            {item.eyebrow}
          </motion.span>
          
          <MonogramFrame isActive={isHovered} isAnchor={isAnchor}>
            <Monogram className={isAnchor ? 'h-14 w-14' : 'h-11 w-11'} />
          </MonogramFrame>
        </div>

        <motion.h3
          className={`font-playfair font-light tracking-tight text-[#e8dcc4] ${
            isAnchor 
              ? 'text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] sm:text-5xl' 
              : 'text-[1.45rem] leading-snug sm:text-2xl'
          }`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: entranceDelay + 0.15, ease: easeLux }}
        >
          {item.title}{' '}
          <em className="italic text-[#c9b89a]/85 not-italic font-playfair-light">
            <span className="italic">{item.titleItalic}</span>
          </em>
        </motion.h3>

        <motion.p
          className={`mt-5 font-[family-name:var(--font-manrope)] font-light leading-relaxed text-white/55 ${
            isAnchor ? 'max-w-xl text-base sm:text-lg' : 'mt-4 flex-1 text-[13.5px] leading-[1.8]'
          }`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: entranceDelay + 0.25, ease: easeWhisper }}
        >
          {item.desc}
        </motion.p>

        <motion.ul 
          className={`mt-auto flex flex-col gap-3 border-t border-white/[0.07] ${isAnchor ? 'pt-10' : 'pt-7'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: entranceDelay + 0.35 } }
          }}
        >
          {item.bullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              variants={{
                hidden: { opacity: 0, x: -6 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeWhisper } }
              }}
              className="group/bullet relative flex items-center gap-3 font-[family-name:var(--font-manrope)] text-[11px] font-medium uppercase leading-snug tracking-[0.18em] text-white/45"
            >
              <span className="discipline-hair-bullet relative flex h-4 w-4 items-center justify-center">
                <span className="absolute h-px w-2.5 bg-[#C5A880]/60 transition-all duration-300 group-hover/bullet:w-3.5 group-hover/bullet:bg-[#C5A880]" />
                <span className="h-1 w-1 rounded-full bg-[#C5A880]/40 opacity-0 transition-opacity duration-300 group-hover/bullet:opacity-100" />
              </span>
              <span className="transition-colors duration-300 group-hover/bullet:text-[#e8dcc4]/90">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>

        {isAnchor && (
          <motion.div
            className="mt-8 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#C5A880]/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: entranceDelay + 0.5, duration: 0.6 }}
          >
            <span>Explore capability</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="transition-transform duration-500 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </div>

      <div className="absolute inset-0 rounded-[3px] ring-1 ring-[#C5A880]/0 transition-ring duration-300 focus-within:ring-[#C5A880]/35 pointer-events-none" />
    </motion.article>
  );
}

export default function CoreCapabilitiesCarousel() {
  const reduce = useReducedMotion();
  const [anchor, ...rest] = disciplines;

  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 32, filter: 'blur(4px)' },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: reduce ? 0.01 : 0.92, 
        ease: easeLux,
        delay: custom || 0
      },
    }),
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.12,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.95, ease: easeLux },
    },
  };

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

      <div className="relative z-10 lux-mobile-page-gutter mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.header
          className="mb-16 max-w-3xl lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
          variants={headerVariants}
        >
          <div className="mb-8 flex flex-wrap items-center gap-6">
            <div className="relative h-px w-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A880] via-[#C5A880]/80 to-transparent" />
            </div>
            <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C5A880]">
              Capabilities
            </span>
          </div>
          
          <h2 className="font-playfair text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.06] text-balance text-white">
            Full-cycle execution.{' '}
            <span className="italic text-[#e8dcc4]/92">One standard.</span>
          </h2>
          
          <p className="mt-6 font-[family-name:var(--font-manrope)] text-base font-light leading-relaxed text-white/50 sm:text-lg">
            The Plot Sale — UK residential brokerage, Pakistan development access, and cross-border structuring without
            the noise. Precision, discretion, delivery.
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6"
        >
          <DisciplineCard item={anchor} itemVariants={itemVariants} index={0} />
          {rest && rest.length > 0 && rest.map((item, i) => (
            <DisciplineCard
              key={item.eyebrow}
              item={item}
              itemVariants={itemVariants}
              gridClassName={gridClasses[i] || ''}
              index={i + 1}
            />
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 flex justify-center lg:mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}