'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Building2 } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import {
  getExxsnHeightsEditorialSpecs,
  projectUsesExxsnEditorialSpecs,
} from '@/lib/featured-flagship';

/**
 * Real client-delivered EXXNS Heights hero asset. Used whenever the editorial
 * match is active and either the CMS mainImage is missing OR still set to the
 * model's Unsplash default. If an admin uploads a genuine hero in the portal,
 * that custom image wins — preserving the CMS-first contract.
 */
const EXXSN_EDITORIAL_HERO = '/images/ExxnsHeight.png';

function isStockDefaultImage(url) {
  if (!url) return true;
  const value = String(url);
  return (
    value.includes('images.unsplash.com') ||
    value.includes('source.unsplash.com') ||
    value.includes('placeholder')
  );
}

export default function FeaturedExxensSpotlight({ project }) {
  if (!project) return null;

  const href = `/pakistan-projects/${project.slug}`;
  const isExxsnEditorial = projectUsesExxsnEditorialSpecs(project);
  const editorial = isExxsnEditorial ? getExxsnHeightsEditorialSpecs() : null;

  // Prefer the real EXXNS hero asset for the editorial case, unless admin has
  // explicitly uploaded a custom, non-default image through the CMS.
  const heroImage = isExxsnEditorial && isStockDefaultImage(project.mainImage)
    ? EXXSN_EDITORIAL_HERO
    : project.mainImage || EXXSN_EDITORIAL_HERO;

  return (
    <section
      className="relative z-[1] w-full min-w-0 overflow-hidden bg-black"
      aria-labelledby="featured-flagship-heading"
    >
      {/* Full viewport hero with minimal overlays */}
      <div className="relative min-h-[100svh] w-full">
        {/* Hero Image */}
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

        {/* Minimal, elegant overlays */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/80" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/40 via-transparent to-black/20" aria-hidden />

        {/* Subtle frame - only corners */}
        <div className="pointer-events-none absolute inset-8 z-[2] lg:inset-12" aria-hidden>
          <div className="absolute left-0 top-0 h-12 w-12 border-l-[1.5px] border-t-[1.5px] border-[#C5A880]/30" />
          <div className="absolute right-0 top-0 h-12 w-12 border-r-[1.5px] border-t-[1.5px] border-[#C5A880]/30" />
          <div className="absolute bottom-0 left-0 h-12 w-12 border-b-[1.5px] border-l-[1.5px] border-[#C5A880]/30" />
          <div className="absolute bottom-0 right-0 h-12 w-12 border-b-[1.5px] border-r-[1.5px] border-[#C5A880]/30" />
        </div>

        {/* Content - Minimal and Elegant */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-8 py-8 lg:px-16 lg:py-12">
          {/* Top Bar - Minimal */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.6)]" />
              <span className="font-manrope text-[9px] font-medium uppercase tracking-[0.4em] text-[#C5A880]">
                Flagship
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 font-manrope text-[9px] font-medium uppercase tracking-[0.25em] text-white/70 backdrop-blur-xl">
                {project.status}
              </span>
              <ListingLogo src={project.primaryLogo} name={project.title} className="h-14 w-14 lg:h-16 lg:w-16" />
            </div>
          </div>

          {/* Bottom Content - Clean Typography */}
          <div className="max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
              {/* Left - Title */}
              <div className="space-y-6">
                <div>
                  <h1
                    id="featured-flagship-heading"
                    className="font-playfair text-[clamp(3rem,8vw,6rem)] font-light leading-[0.95] tracking-tight text-white"
                  >
                    {project.title}
                  </h1>
                  <p className="mt-4 flex items-center gap-2 font-manrope text-sm font-light text-white/50">
                    <MapPin className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                    {project.location}
                  </p>
                </div>

                <div className="h-px w-20 bg-gradient-to-r from-[#C5A880] to-transparent" />

                <p className="max-w-lg font-manrope text-base font-light leading-relaxed text-white/70 lg:text-lg">
                  Premium mixed-use stack — retail, workspace, and residences in one silhouette.
                </p>
              </div>

              {/* Right - Stats & CTA */}
              <div className="flex flex-col justify-end space-y-8">
                {/* Stats - Minimal Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="font-manrope text-[8px] font-medium uppercase tracking-[0.3em] text-[#C5A880]/70">
                      Floors
                    </p>
                    <p className="font-playfair text-4xl font-light text-white">10</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-manrope text-[8px] font-medium uppercase tracking-[0.3em] text-[#C5A880]/70">
                      Commercial
                    </p>
                    <p className="font-playfair text-4xl font-light text-white">2</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-manrope text-[8px] font-medium uppercase tracking-[0.3em] text-[#C5A880]/70">
                      Residential
                    </p>
                    <p className="font-playfair text-4xl font-light text-white">6</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-6">
                  <Link
                    href={href}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-manrope text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all duration-500 hover:bg-[#C5A880] hover:shadow-[0_20px_60px_rgba(197,168,128,0.4)]"
                  >
                    <span className="relative z-10">View Project</span>
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>
                  <a
                    href="#portfolio-grid"
                    className="font-manrope text-[9px] font-medium uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
                  >
                    All Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
