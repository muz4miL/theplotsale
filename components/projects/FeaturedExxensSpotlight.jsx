'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';

/** Slug or title match — resilient if CMS uses variations */
export function pickFeaturedExxensProject(projects) {
  if (!Array.isArray(projects) || projects.length === 0) return null;
  const bySlug = projects.find((p) => {
    const s = String(p.slug || '').toLowerCase();
    return s === 'exxens' || s.includes('exxens');
  });
  if (bySlug) return bySlug;
  return projects.find((p) => /exxens/i.test(String(p.title || ''))) || null;
}

export default function FeaturedExxensSpotlight({ project }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const source = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 8000 : 42,
    damping: reduceMotion ? 100 : 30,
    restDelta: 0.001,
  });

  const imageY = useTransform(source, [0, 1], [0, reduceMotion ? 0 : -11]);
  const imageScale = useTransform(source, [0, 0.45, 1], [1, 1.02, 1.045]);
  const vignetteOpacity = useTransform(source, [0, 0.55, 1], [0.55, 0.72, 0.88]);
  const headlineY = useTransform(source, [0, 1], [0, reduceMotion ? 0 : -28]);
  const headlineOpacity = useTransform(source, [0, 0.35, 0.92, 1], [1, 1, 0.92, 0.78]);
  const kickerOpacity = useTransform(source, [0, 0.2, 0.75, 1], [1, 1, 0.65, 0.45]);
  const frameOpacity = useTransform(source, [0, 0.5, 1], [0.35, 0.55, 0.7]);
  const sheenOpacity = useTransform(source, [0, 0.5, 1], [0.12, 0.32, 0.18]);
  const sheenX = useTransform(source, [0, 1], ['-18%', '22%']);

  if (!project) return null;

  const href = `/pakistan-projects/${project.slug}`;
  const blurb =
    project.description && project.description.length > 220
      ? `${project.description.slice(0, 220).trim()}…`
      : project.description ||
        'A curated master plan — architecture, amenities, and investment narrative in one dossier.';

  return (
    <section
      ref={containerRef}
      className="relative z-0 min-h-[220vh] w-full"
      aria-labelledby="featured-exxens-heading"
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-[1.08] transform-gpu will-change-transform"
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

        <div className="lux-listing-grain !z-[1] opacity-[0.22]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-black/50 via-transparent to-[#050807]/80" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#030706] via-[#030706]/75 to-transparent" aria-hidden />
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(3,7,6,0.95),transparent)]"
          style={{ opacity: vignetteOpacity }}
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute inset-5 z-[4] rounded-[3px] border border-white/[0.06] sm:inset-7 lg:inset-10"
          style={{ opacity: frameOpacity }}
          aria-hidden
        >
          <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#C5A880]/45 sm:h-10 sm:w-10" />
          <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#C5A880]/45 sm:h-10 sm:w-10" />
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#C5A880]/45 sm:h-10 sm:w-10" />
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#C5A880]/45 sm:h-10 sm:w-10" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
          style={{ opacity: sheenOpacity }}
          aria-hidden
        >
          <motion.div
            className="absolute top-0 h-full w-[55%] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
            style={{ left: sheenX }}
          />
        </motion.div>

        <div className="relative z-[6] flex h-full flex-col justify-between px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12">
          <div className="flex items-start justify-between gap-6">
            <motion.p
              style={{ opacity: kickerOpacity }}
              className="max-w-[14rem] font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase leading-[1.9] tracking-[0.38em] text-[#C5A880]/95"
            >
              Signature
              <span className="mt-2 block tracking-[0.28em] text-white/40">Scroll to reveal</span>
            </motion.p>
            <ListingLogo src={project.primaryLogo} name={project.title} className="h-12 w-12 sm:h-14 sm:w-14" />
          </div>

          <div className="grid flex-1 items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.55fr)] lg:gap-16">
            <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
              <p className="mb-4 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35">
                Flagship · {project.status}
              </p>
              <h2
                id="featured-exxens-heading"
                className="font-playfair text-[clamp(2.75rem,10vw,5.5rem)] font-light leading-[0.95] tracking-tight text-white"
              >
                <span className="block">{project.title}</span>
                <span className="mt-2 block font-playfair text-[clamp(1.1rem,2.8vw,1.65rem)] font-light italic text-[#e8dcc4]/90">
                  Where the portfolio opens
                </span>
              </h2>
              <p className="mt-6 flex items-center gap-2 font-[family-name:var(--font-manrope)] text-sm font-light text-white/50">
                <MapPin className="h-4 w-4 shrink-0 text-[#C5A880]/75" strokeWidth={1.5} />
                {project.location}
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: headlineOpacity }}
              className="flex flex-col justify-end gap-6 lg:border-l lg:border-white/[0.08] lg:pl-12"
            >
              <p className="font-[family-name:var(--font-manrope)] text-sm font-light leading-[1.85] text-white/45 lg:max-w-sm">
                {blurb}
              </p>
              <Link
                href={href}
                className="group/cta inline-flex items-center gap-4 self-start border-b border-[#C5A880]/40 pb-1 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C5A880] transition-colors duration-500 hover:border-[#C5A880] hover:text-[#f0e6d4]"
              >
                Open full dossier
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A880]/40 text-[#C5A880] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:border-[#C5A880] group-hover/cta:bg-[#C5A880] group-hover/cta:text-[#111111]">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-[7] flex flex-col items-center gap-3 sm:bottom-10">
          <span className="font-[family-name:var(--font-manrope)] text-[9px] font-medium uppercase tracking-[0.35em] text-white/30">
            Scene
          </span>
          <div className="h-[3px] w-28 overflow-hidden rounded-full bg-white/[0.08] sm:w-36">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#C5A880]/30 via-[#C5A880] to-[#e8dcc4]/90"
              style={{ scaleX: source }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
