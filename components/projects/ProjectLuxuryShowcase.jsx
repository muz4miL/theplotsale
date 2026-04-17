'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import CountUpNumber from '@/components/projects/CountUpNumber';
import { parseAreaForStat } from '@/lib/parse-area-stat';

function buildImageSlides(project) {
  const raw = [project?.mainImage, ...(project?.galleryMedia || [])].filter(Boolean);
  const images = raw.filter((url) => typeof url === 'string' && !url.includes('/video/upload/'));
  return [...new Set(images)];
}

export default function ProjectLuxuryShowcase({
  project,
  backHref = '/pakistan-projects',
  priceLine = null,
}) {
  const slides = useMemo(() => buildImageSlides(project), [project]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = slides[activeIndex] || project.mainImage;

  useEffect(() => {
    setActiveIndex(0);
  }, [project.title, project.mainImage, slides.length]);

  const areaStat = useMemo(() => parseAreaForStat(project.totalArea), [project.totalArea]);

  const descriptionExcerpt =
    project.description && project.description.length > 320
      ? `${project.description.slice(0, 317).trim()}…`
      : project.description || '';

  return (
    <section
      className="relative min-h-[100dvh] bg-black pt-24 lg:min-h-screen lg:pt-28"
      aria-label={`${project.title} showcase`}
    >
      <div className="grid min-h-[calc(100dvh-5.5rem)] lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,38%)]">
        {/* —— Visual column —— */}
        <div className="relative flex min-h-[52vh] flex-col lg:min-h-full">
          <div className="relative min-h-[42vh] flex-1 overflow-hidden bg-neutral-950 lg:min-h-0">
            <div
              key={activeSrc}
              className="absolute inset-0 animate-[luxury-slide-fade_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              <SafeListingImage
                src={activeSrc}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/65 lg:to-black/85"
              aria-hidden
            />
          </div>

          {slides.length > 1 ? (
            <div className="border-t border-white/10 bg-black/80 px-3 py-3 backdrop-blur-md lg:px-4 lg:py-4">
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {slides.map((url, index) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-14 w-[4.5rem] shrink-0 snap-start overflow-hidden rounded-md border-2 transition-all duration-300 sm:h-16 sm:w-[5.25rem] ${
                      index === activeIndex
                        ? 'border-white shadow-[0_0_0_1px_rgba(255,255,255,0.4)]'
                        : 'border-white/15 opacity-80 hover:border-white/40 hover:opacity-100'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  >
                    <SafeListingImage src={url} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* —— Editorial panel —— */}
        <aside className="relative flex flex-col border-t border-white/10 bg-[#050505] px-6 py-10 sm:px-8 sm:py-12 lg:border-l lg:border-t-0 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(197,168,128,0.07),transparent_50%)]" />

          <div className="relative flex items-start justify-between gap-4">
            <p className="font-playfair text-lg tracking-[0.2em] text-white sm:text-xl">The Plot Sale</p>
            <Link
              href={backHref}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-[#C5A880] hover:text-[#C5A880]"
              aria-label="Close and return to listing"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </Link>
          </div>

          <div className="relative mt-8">
            <ListingLogo src={project.primaryLogo} name={project.title} className="h-12 w-12 sm:h-14 sm:w-14" />
          </div>

          <h1 className="relative mt-6 font-playfair text-[clamp(1.75rem,4vw,2.75rem)] font-light italic leading-[1.1] text-white">
            {project.title}
          </h1>

          <p className="relative mt-5 font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/65 sm:text-[15px]">
            {descriptionExcerpt || 'Premium development curated by The Plot Sale. Full details below.'}
          </p>

          {priceLine ? (
            <p className="relative mt-6 inline-flex rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-4 py-2 font-[family-name:var(--font-manrope)] text-sm font-semibold tracking-wide text-[#E8DCC4]">
              {priceLine}
            </p>
          ) : null}

          <div className="relative mt-8">
            <Link
              href="/contact"
              className="lux-button inline-flex w-full items-center justify-center rounded-full bg-[#f5f0e8] py-3.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a] transition-colors hover:bg-white sm:w-auto sm:min-w-[220px] sm:px-10"
            >
              Book appointment
            </Link>
          </div>

          {areaStat ? (
            <div className="relative mt-12 border-t border-white/10 pt-10">
              <p className="font-playfair text-sm italic text-white/80">Development scale</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <CountUpNumber
                  end={areaStat.value}
                  className="font-[family-name:var(--font-manrope)] text-5xl font-semibold tabular-nums tracking-tight text-white sm:text-6xl"
                />
                {areaStat.suffix ? (
                  <span className="font-[family-name:var(--font-manrope)] text-lg font-light text-white/55 sm:text-xl">
                    {areaStat.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-2 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.28em] text-white/35">
                As listed for this project
              </p>
            </div>
          ) : (
            <div className="relative mt-12 border-t border-white/10 pt-10">
              <p className="font-playfair text-sm italic text-white/80">Location</p>
              <p className="mt-3 font-[family-name:var(--font-manrope)] text-lg text-white/80">{project.location}</p>
            </div>
          )}

          <div className="relative mt-auto hidden pt-10 text-[10px] uppercase tracking-[0.25em] text-white/25 lg:block">
            Scroll for full brief
          </div>
        </aside>
      </div>
    </section>
  );
}
