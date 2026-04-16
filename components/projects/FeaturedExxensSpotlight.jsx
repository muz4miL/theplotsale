'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, MapPin, Building2 } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import {
  getExxsnHeightsEditorialSpecs,
  projectUsesExxsnEditorialSpecs,
} from '@/lib/featured-flagship';

export default function FeaturedExxensSpotlight({ project }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const source = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 8000 : 40,
    damping: reduceMotion ? 100 : 29,
    restDelta: 0.001,
  });

  const imageY = useTransform(source, [0, 1], [0, reduceMotion ? 0 : -13]);
  const imageScale = useTransform(source, [0, 0.4, 1], [1, 1.03, 1.055]);
  const vignetteOpacity = useTransform(source, [0, 0.5, 1], [0.5, 0.68, 0.9]);
  const headlineY = useTransform(source, [0, 1], [0, reduceMotion ? 0 : -36]);
  const headlineOpacity = useTransform(source, [0, 0.32, 0.88, 1], [1, 1, 0.9, 0.72]);
  const kickerOpacity = useTransform(source, [0, 0.15, 0.7, 1], [1, 1, 0.55, 0.35]);
  const frameOpacity = useTransform(source, [0, 0.45, 1], [0.28, 0.52, 0.68]);
  const sheenOpacity = useTransform(source, [0, 0.5, 1], [0.1, 0.34, 0.16]);
  const sheenX = useTransform(source, [0, 1], ['-22%', '28%']);
  const watermarkOpacity = useTransform(source, [0, 0.25, 0.75, 1], [0.14, 0.1, 0.06, 0.03]);
  const ringScale = useTransform(source, [0, 1], [1, reduceMotion ? 1 : 1.08]);

  if (!project) return null;

  const href = `/pakistan-projects/${project.slug}`;
  const editorial = projectUsesExxsnEditorialSpecs(project) ? getExxsnHeightsEditorialSpecs() : null;

  const blurb =
    project.description && project.description.length > 200
      ? `${project.description.slice(0, 200).trim()}…`
      : project.description ||
        'Master-planned vertical living — architecture, amenities, and investment narrative in one dossier.';

  const specPrimary = editorial?.primaryStat || project.totalArea || 'Flagship';
  const specPrimaryLabel = editorial?.primaryLabel || 'Scale';
  const specStack = editorial?.stackLine || `${project.status} phase`;
  const specCorridor = editorial?.corridor || project.location;

  return (
    <section
      ref={containerRef}
      className="relative z-[1] min-h-[270vh] w-full min-w-0 overflow-x-hidden bg-[#010403]"
      aria-labelledby="featured-flagship-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(197,168,128,0.12),transparent_55%)]" />

      <div className="sticky top-0 h-[100dvh] min-h-[580px] w-full overflow-hidden pt-[max(6.85rem,calc(env(safe-area-inset-top,0px)+5.65rem))] sm:pt-[max(7.35rem,calc(env(safe-area-inset-top,0px)+5.9rem))] lg:pt-[max(8.1rem,calc(env(safe-area-inset-top,0px)+6.15rem))]">
        {/* Orbital — slow, almost subliminal */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(118vmin,820px)] w-[min(118vmin,820px)] -translate-x-1/2 -translate-y-1/2 motion-reduce:animate-none animate-[spin_220s_linear_infinite] rounded-full border border-[#C5A880]/[0.09] shadow-[0_0_80px_rgba(197,168,128,0.04)]"
          style={{ scale: ringScale }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(95vmin,640px)] w-[min(95vmin,640px)] -translate-x-1/2 -translate-y-1/2 motion-reduce:animate-none animate-[spin_320s_linear_infinite_reverse] rounded-full border border-white/[0.04]"
          style={{ scale: ringScale }}
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 z-[1] scale-[1.12] transform-gpu"
          style={{ y: imageY, scale: imageScale }}
        >
          <SafeListingImage
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        <div className="lux-listing-grain !z-[2] opacity-[0.26]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-black/60 via-transparent to-[#020805]/90" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#010403] via-[#010403]/82 to-black/35" aria-hidden />
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_95%_75%_at_50%_110%,rgba(1,4,3,0.97),transparent_50%)]"
          style={{ opacity: vignetteOpacity }}
          aria-hidden
        />

        <motion.span
          style={{ opacity: watermarkOpacity }}
          className="pointer-events-none absolute -right-[6%] top-[8%] z-[3] select-none font-playfair text-[clamp(8rem,36vw,24rem)] font-extralight leading-none tracking-tighter text-white/[0.055] sm:-right-[4%]"
          aria-hidden
        >
          {editorial ? '10' : '01'}
        </motion.span>

        <motion.div
          className="pointer-events-none absolute inset-4 z-[4] rounded-[4px] border border-white/[0.07] sm:inset-6 lg:inset-8"
          style={{ opacity: frameOpacity }}
          aria-hidden
        >
          <div className="absolute left-0 top-0 h-9 w-9 border-l-2 border-t-2 border-[#C5A880]/50 sm:h-11 sm:w-11" />
          <div className="absolute right-0 top-0 h-9 w-9 border-r-2 border-t-2 border-[#C5A880]/50 sm:h-11 sm:w-11" />
          <div className="absolute bottom-0 left-0 h-9 w-9 border-b-2 border-l-2 border-[#C5A880]/50 sm:h-11 sm:w-11" />
          <div className="absolute bottom-0 right-0 h-9 w-9 border-b-2 border-r-2 border-[#C5A880]/50 sm:h-11 sm:w-11" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
          style={{ opacity: sheenOpacity }}
          aria-hidden
        >
          <motion.div
            className="absolute top-0 h-full w-[58%] -skew-x-11 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
            style={{ left: sheenX }}
          />
        </motion.div>

        {/* Vertical scale line — architectural read */}
        <div
          className="pointer-events-none absolute bottom-24 left-5 top-40 z-[5] hidden w-px bg-gradient-to-b from-[#C5A880]/50 via-white/10 to-transparent md:block lg:left-8 lg:top-44"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-24 left-3 top-40 z-[5] hidden flex-col gap-6 font-[family-name:var(--font-manrope)] text-[8px] font-medium uppercase tracking-[0.35em] text-white/25 md:flex lg:left-5 lg:top-44"
          aria-hidden
        >
          <span className="-rotate-90 whitespace-nowrap">Crown</span>
          <span className="-rotate-90 whitespace-nowrap">Mid</span>
          <span className="-rotate-90 whitespace-nowrap">Base</span>
        </div>

        {/* Top scrim: keeps kicker legible until nav goes solid on scroll */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-36 bg-gradient-to-b from-[#010403]/92 via-[#010403]/35 to-transparent sm:h-40 lg:h-44"
          aria-hidden
        />

        <div className="relative z-[6] flex h-full flex-col px-5 pb-28 sm:px-8 lg:px-12 lg:pb-32">
          <div className="flex items-start justify-between gap-6 md:pl-8 lg:pl-10">
            <motion.div
              style={{ opacity: kickerOpacity }}
              className="max-w-[20rem] space-y-3 drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]"
            >
              <p className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.42em] text-[#C5A880]">
                Portfolio · flagship
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase leading-[2] tracking-[0.28em] text-white/55">
                Scroll the scene — pressure, light, and mass respond to your movement.
              </p>
            </motion.div>
            <div className="flex shrink-0 flex-col items-end gap-3 drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]">
              <span className="rounded-full border border-white/[0.1] bg-black/45 px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60 backdrop-blur-md">
                {project.status}
              </span>
              <ListingLogo src={project.primaryLogo} name={project.title} className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>
          </div>

          <div className="mt-auto grid flex-1 items-end gap-12 pb-4 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:pb-6">
            <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="md:pl-8 lg:pl-10">
              {editorial ? (
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C5A880]/25 bg-[#C5A880]/[0.06] px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.26em] text-[#e8dcc4]/90">
                  <Building2 className="h-3.5 w-3.5 opacity-80" strokeWidth={1.5} />
                  Exxsn Heights · Etihad Town
                </p>
              ) : null}
              <h2
                id="featured-flagship-heading"
                className="font-playfair text-[clamp(3rem,11.5vw,6.25rem)] font-light leading-[0.92] tracking-[-0.02em] text-white"
              >
                <span className="block">{project.title}</span>
              </h2>
              <p className="mt-5 max-w-xl font-playfair text-[clamp(1.05rem,2.4vw,1.5rem)] font-light italic leading-snug text-[#e8dcc4]/85">
                {editorial?.context ||
                  'Where the portfolio opens — engineered presence on the skyline.'}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-[family-name:var(--font-manrope)] text-sm font-light text-white/50">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-[#C5A880]/80" strokeWidth={1.5} />
                  {project.location}
                </span>
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: headlineOpacity }}
              className="flex flex-col gap-8 border-t border-white/[0.08] pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.08] bg-black/35 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                  <p className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C5A880]/80">
                    {specPrimaryLabel}
                  </p>
                  <p className="mt-2 font-playfair text-3xl font-light text-white sm:text-4xl">{specPrimary}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-black/35 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:col-span-2 lg:col-span-1">
                  <p className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C5A880]/80">
                    Programme
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-manrope)] text-[13px] font-light leading-relaxed text-white/70">
                    {specStack}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-black/35 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:col-span-3 lg:col-span-1">
                  <p className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C5A880]/80">
                    Corridor
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-manrope)] text-[13px] font-light leading-relaxed text-white/65">
                    {specCorridor}
                  </p>
                </div>
              </div>

              <p className="font-[family-name:var(--font-manrope)] text-sm font-light leading-[1.9] text-white/42">
                {blurb}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href={href}
                  className="group/cta inline-flex items-center gap-4 border-b border-[#C5A880]/45 pb-1.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C5A880] transition-colors duration-500 hover:border-[#C5A880] hover:text-[#f5f0e8]"
                >
                  Open dossier
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A880]/45 text-[#C5A880] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:border-[#C5A880] group-hover/cta:bg-[#C5A880] group-hover/cta:text-[#111111] group-hover/cta:shadow-[0_16px_40px_rgba(197,168,128,0.28)]">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.5} />
                  </span>
                </Link>
                <a
                  href="#portfolio-grid"
                  className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.28em] text-white/35 underline-offset-4 transition-colors hover:text-white/60 hover:underline"
                >
                  All developments
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-7 left-0 right-0 z-[7] flex flex-col items-center gap-3 sm:bottom-9">
          <span className="font-[family-name:var(--font-manrope)] text-[9px] font-medium uppercase tracking-[0.38em] text-white/28">
            Scene depth
          </span>
          <div className="h-[3px] w-36 overflow-hidden rounded-full bg-white/[0.07] sm:w-44">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#C5A880]/25 via-[#C5A880] to-[#f5f0e8]/90"
              style={{ scaleX: source }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
