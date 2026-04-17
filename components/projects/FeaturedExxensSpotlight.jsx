'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import {
  getExxsnHeightsEditorialSpecs,
  projectUsesExxsnEditorialSpecs,
} from '@/lib/featured-flagship';

/**
 * Real client-delivered EXXNS Heights hero asset. Used when the project
 * matches editorial specs AND the CMS mainImage is still a stock default.
 * A genuine admin-uploaded image always wins — preserving the CMS-first contract.
 */
const EXXSN_EDITORIAL_HERO = '/images/ExxnsHeight.png';

function isStockDefaultImage(url) {
  if (!url) return true;
  const v = String(url);
  return (
    v.includes('images.unsplash.com') ||
    v.includes('source.unsplash.com') ||
    v.includes('placeholder')
  );
}

/** Editorial stat block — three numbers in a clean column. */
function StatPill({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-[family-name:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[0.35em] text-[#C5A880]/65">
        {label}
      </span>
      <span className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-none text-white">
        {value}
      </span>
    </div>
  );
}

export default function FeaturedExxensSpotlight({ project }) {
  if (!project) return null;

  const href = `/pakistan-projects/${project.slug}`;
  const isExxsnEditorial = projectUsesExxsnEditorialSpecs(project);
  const editorial = isExxsnEditorial ? getExxsnHeightsEditorialSpecs() : null;

  const heroImage =
    isExxsnEditorial && isStockDefaultImage(project.mainImage)
      ? EXXSN_EDITORIAL_HERO
      : project.mainImage || EXXSN_EDITORIAL_HERO;

  /** Use editorial fallbacks for the EXXNS stats, otherwise derive from project fields. */
  const statFloors   = project.floors   ?? (isExxsnEditorial ? '10' : null);
  const statCommercial = project.commercialUnits ?? (isExxsnEditorial ? '2' : null);
  const statResidential = project.residentialUnits ?? (isExxsnEditorial ? '6' : null);

  const descriptionText =
    project.description && project.description.length > 10
      ? project.description.length > 200
        ? `${project.description.slice(0, 197).trim()}…`
        : project.description
      : editorial?.context ?? 'A vertical landmark — retail, corporate offices, and residences in one silhouette.';

  const locationText = project.location || editorial?.corridor || '';

  return (
    <section
      className="relative z-[1] w-full min-w-0 overflow-hidden bg-black"
      aria-labelledby="featured-flagship-heading"
    >
      <div className="relative min-h-[100svh] w-full">

        {/* ── Full-bleed hero image ── */}
        <div className="absolute inset-0 z-0">
          <SafeListingImage
            src={heroImage}
            alt={project.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>

        {/* ── Grading layers — cinematic, not heavy ── */}
        {/* Top dark gradient: nav area + top content legibility */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[38%] bg-gradient-to-b from-black/75 via-black/30 to-transparent"
          aria-hidden
        />
        {/* Bottom gradient: title + stats area */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[70%] bg-gradient-to-t from-black/92 via-black/55 to-transparent"
          aria-hidden
        />
        {/* Subtle left shadow for typography legibility */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/2 bg-gradient-to-r from-black/35 to-transparent"
          aria-hidden
        />
        {/* Radial vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.42)_100%)]"
          aria-hidden
        />

        {/* ── Corner brackets — editorial framing ── */}
        <div className="pointer-events-none absolute inset-6 z-[2] lg:inset-10" aria-hidden>
          <div className="absolute left-0 top-0 h-10 w-10 border-l border-t border-[#C5A880]/25" />
          <div className="absolute right-0 top-0 h-10 w-10 border-r border-t border-[#C5A880]/25" />
          <div className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-[#C5A880]/25" />
          <div className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[#C5A880]/25" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-[max(1.5rem,calc(env(safe-area-inset-left,0px)+1rem))] py-8 lg:px-14 lg:py-12">

          {/* ── Top bar ── breadcrumb-style, no status badge ── */}
          <div className="flex items-center justify-between">
            {/* Left: category pill */}
            <div className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C5A880] shadow-[0_0_10px_rgba(197,168,128,0.55)]" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C5A880]">
                Flagship · Pakistan Portfolio
              </span>
            </div>

            {/* Right: status + area (elegant text, no cheap badge) */}
            <div className="hidden flex-col items-end gap-1 sm:flex">
              <span className="font-[family-name:var(--font-manrope)] text-[9px] font-medium uppercase tracking-[0.3em] text-white/40">
                {project.status}
              </span>
              {project.totalArea ? (
                <span className="font-[family-name:var(--font-manrope)] text-[9px] tracking-[0.2em] text-white/30">
                  {project.totalArea}
                </span>
              ) : null}
            </div>
          </div>

          {/* ── Bottom content ── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">

            {/* Left: title + location + description */}
            <div className="max-w-2xl space-y-5 lg:space-y-6">
              {/* Location */}
              {locationText ? (
                <p className="flex items-center gap-2 font-[family-name:var(--font-manrope)] text-[11px] font-light tracking-[0.22em] text-white/45">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A880]" strokeWidth={1.5} />
                  {locationText}
                </p>
              ) : null}

              {/* Title — main event */}
              <h1
                id="featured-flagship-heading"
                className="font-[family-name:var(--font-playfair)] text-[clamp(2.8rem,7.5vw,5.8rem)] font-light leading-[0.93] tracking-[-0.01em] text-white"
              >
                {project.title}
              </h1>

              {/* Gold rule */}
              <div className="h-px w-16 bg-gradient-to-r from-[#C5A880] to-transparent" />

              {/* Description */}
              <p className="max-w-[52ch] font-[family-name:var(--font-manrope)] text-[0.88rem] font-light leading-relaxed text-white/60 sm:text-[0.95rem]">
                {descriptionText}
              </p>
            </div>

            {/* Right: stats + CTA */}
            <div className="flex flex-col gap-8 lg:items-end lg:gap-10">
              {/* Stats — only rendered when we have actual values */}
              {(statFloors || statCommercial || statResidential) ? (
                <div className="flex items-end gap-8 sm:gap-12 lg:justify-end">
                  {statFloors      ? <StatPill label="Floors"      value={statFloors}      /> : null}
                  {statCommercial  ? <StatPill label="Commercial"  value={statCommercial}  /> : null}
                  {statResidential ? <StatPill label="Residential" value={statResidential} /> : null}
                </div>
              ) : null}

              {/* CTA row */}
              <div className="flex items-center gap-6">
                {/* Primary: pill button with shimmer + arrow chip */}
                <Link
                  href={href}
                  className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#C5A880]/55 bg-[#C5A880]/[0.08] py-3 pl-6 pr-2.5 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e8dcc4] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#111111] hover:shadow-[0_16px_34px_-14px_rgba(197,168,128,0.55)]"
                >
                  {/* Shimmer sweep on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-full" />
                  <span className="relative z-[1]">View Project</span>
                  <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/55 bg-black/30 text-[#C5A880] transition-all duration-500 group-hover/cta:border-[#111111]/20 group-hover/cta:bg-[#111111]/30 group-hover/cta:text-[#e8dcc4]">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.75} />
                  </span>
                </Link>

                {/* Secondary: ghost text link */}
                <a
                  href="#portfolio-grid"
                  className="font-[family-name:var(--font-manrope)] text-[9px] font-medium uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white/80"
                >
                  All Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
