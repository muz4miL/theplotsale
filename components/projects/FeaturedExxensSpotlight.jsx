'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Building2 } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import {
  getExxsnHeightsEditorialSpecs,
  projectUsesExxsnEditorialSpecs,
} from '@/lib/featured-flagship';

const easeLux = [0.22, 1, 0.36, 1];

export default function FeaturedExxensSpotlight({ project }) {
  if (!project) return null;

  const href = `/pakistan-projects/${project.slug}`;
  const editorial = projectUsesExxsnEditorialSpecs(project) ? getExxsnHeightsEditorialSpecs() : null;

  const blurb =
    project.description && project.description.length > 220
      ? `${project.description.slice(0, 220).trim()}…`
      : project.description ||
        'Master-planned vertical living — architecture, amenities, and investment narrative in one dossier.';

  const specPrimary = editorial?.primaryStat || project.totalArea || 'Flagship';
  const specPrimaryLabel = editorial?.primaryLabel || 'Scale';
  const specStack = editorial?.stackLine || `${project.status} phase`;
  const specCorridor = editorial?.corridor || project.location;

  return (
    <section
      className="relative z-[1] w-full min-w-0 overflow-hidden bg-[#030706]"
      aria-labelledby="featured-flagship-heading"
    >
      {/* One viewport — no sticky tunnel, no scroll-linked text opacity */}
      <div className="relative min-h-[max(640px,100svh)] w-full">
        <div className="absolute inset-0 z-0">
          <SafeListingImage
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>

        <div className="lux-listing-grain absolute inset-0 z-[1] opacity-[0.18]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-black/50 via-black/25 to-[#030706]/90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#030706] via-transparent to-black/40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-gradient-to-t from-[#030706] via-[#030706]/80 to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-4 z-[1] rounded-sm border border-white/[0.06] sm:inset-5 lg:inset-8" aria-hidden>
          <div className="absolute left-0 top-0 h-7 w-7 border-l border-t border-[#C5A880]/40 sm:h-9 sm:w-9" />
          <div className="absolute right-0 top-0 h-7 w-7 border-r border-t border-[#C5A880]/40 sm:h-9 sm:w-9" />
          <div className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-[#C5A880]/40 sm:h-9 sm:w-9" />
          <div className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-[#C5A880]/40 sm:h-9 sm:w-9" />
        </div>

        <div className="relative z-10 flex min-h-[max(640px,100svh)] flex-col px-5 pb-12 pt-[max(5.5rem,calc(env(safe-area-inset-top,0px)+4.5rem))] sm:px-8 sm:pb-16 sm:pt-[max(6rem,calc(env(safe-area-inset-top,0px)+4.75rem))] lg:px-12 lg:pb-20 lg:pt-[max(6.5rem,calc(env(safe-area-inset-top,0px)+5rem))]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeLux }}
            className="flex flex-1 flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-[18rem] space-y-2">
                <p className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C5A880]">
                  Portfolio · flagship
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-white/50">
                  Signature development — full brief below.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-3">
                <span className="rounded-full border border-white/[0.12] bg-black/50 px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
                  {project.status}
                </span>
                <ListingLogo src={project.primaryLogo} name={project.title} className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>
            </div>

            <div className="mt-10 grid flex-1 grid-cols-1 items-end gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
              <div className="min-w-0 lg:pr-4">
                {editorial ? (
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.08] px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.24em] text-[#e8dcc4]">
                    <Building2 className="h-3.5 w-3.5 opacity-90" strokeWidth={1.5} />
                    Exxsn Heights · Etihad Town
                  </p>
                ) : null}
                <h2
                  id="featured-flagship-heading"
                  className="font-playfair text-[clamp(2.25rem,7vw,4.5rem)] font-light leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
                >
                  {project.title}
                </h2>
                <p className="mt-5 max-w-xl font-playfair text-[clamp(1rem,2.2vw,1.35rem)] font-light italic leading-snug text-[#e8dcc4]/90">
                  {editorial?.context || 'Where the portfolio opens — presence on the skyline, clarity in the dossier.'}
                </p>
                <p className="mt-5 flex items-center gap-2 font-[family-name:var(--font-manrope)] text-sm font-light text-white/60">
                  <MapPin className="h-4 w-4 shrink-0 text-[#C5A880]" strokeWidth={1.5} />
                  {project.location}
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-6 border-t border-white/[0.1] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.1] bg-black/40 p-4 backdrop-blur-md sm:col-span-1">
                    <p className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.26em] text-[#C5A880]/85">
                      {specPrimaryLabel}
                    </p>
                    <p className="mt-1.5 font-playfair text-2xl font-light text-white sm:text-3xl">{specPrimary}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.1] bg-black/40 p-4 backdrop-blur-md sm:col-span-2 lg:col-span-1 xl:col-span-1">
                    <p className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.26em] text-[#C5A880]/85">
                      Programme
                    </p>
                    <p className="mt-1.5 font-[family-name:var(--font-manrope)] text-[13px] font-light leading-relaxed text-white/75">
                      {specStack}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.1] bg-black/40 p-4 backdrop-blur-md sm:col-span-3 lg:col-span-1 xl:col-span-1">
                    <p className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.26em] text-[#C5A880]/85">
                      Corridor
                    </p>
                    <p className="mt-1.5 font-[family-name:var(--font-manrope)] text-[13px] font-light leading-relaxed text-white/70">
                      {specCorridor}
                    </p>
                  </div>
                </div>

                <p className="font-[family-name:var(--font-manrope)] text-sm font-light leading-[1.85] text-white/45">
                  {blurb}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <Link
                    href={href}
                    className="group/cta inline-flex items-center gap-3 border-b border-[#C5A880]/40 pb-1 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C5A880] transition-colors hover:border-[#C5A880] hover:text-[#f5f0e8]"
                  >
                    Open dossier
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A880]/40 text-[#C5A880] transition-all duration-500 group-hover/cta:border-[#C5A880] group-hover/cta:bg-[#C5A880] group-hover/cta:text-[#111111]">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </Link>
                  <a
                    href="#portfolio-grid"
                    className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.26em] text-white/40 underline-offset-4 hover:text-white/65 hover:underline"
                  >
                    All developments
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center lg:mt-12">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
