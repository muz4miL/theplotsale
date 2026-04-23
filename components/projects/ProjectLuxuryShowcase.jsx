'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import CountUpNumber from '@/components/projects/CountUpNumber';
import { parseAreaForStat } from '@/lib/parse-area-stat';

function buildImageSlides(project) {
  const mainImg = project?.mainImage;
  const galleryMedia = project?.galleryMedia || [];
  
  // Filter out videos and empty strings
  const validGalleryImages = galleryMedia.filter(
    (url) => typeof url === 'string' && 
    url.trim() !== '' &&
    !url.includes('/video/upload/')
  );
  
  // Start with main image, then add gallery images
  // Use Set to remove duplicates, then convert back to array
  const allImages = [mainImg, ...validGalleryImages].filter(Boolean);
  const uniqueImages = [...new Set(allImages)];
  
  return uniqueImages;
}

/**
 * CarouselImage — the full-bleed main image with touch-swipe + keyboard navigation.
 * Renders the thumbnail rail beneath when there are multiple images.
 */
function CarouselImage({ slides, activeIndex, onGo, onFullscreen }) {
  const touchStartX = useRef(null);
  const activeSrc = slides[activeIndex];
  const isCloudinaryAsset = typeof activeSrc === 'string' && activeSrc.includes('res.cloudinary.com');

  const prev = useCallback(() => onGo((activeIndex - 1 + slides.length) % slides.length), [activeIndex, slides.length, onGo]);
  const next = useCallback(() => onGo((activeIndex + 1) % slides.length), [activeIndex, slides.length, onGo]);

  /* Touch swipe */
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    delta < 0 ? next() : prev();
  };

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <div className="relative flex min-h-[52vh] flex-col lg:min-h-full">
      {/* Main image area */}
      <div
        className="relative min-h-[42vh] flex-1 cursor-grab overflow-hidden bg-neutral-950 lg:min-h-0 active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
        aria-label="Project images"
      >
        {/* Animated image transition */}
        <div
          key={activeSrc}
          className="absolute inset-0 animate-[luxury-slide-fade_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <div className="absolute inset-0 transform-gpu">
            <SafeListingImage
              src={activeSrc}
              alt={`Project image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 68vw"
              quality={100}
              unoptimized={isCloudinaryAsset}
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/40 lg:to-black/60"
          aria-hidden
        />

        {/* Image counter badge — top right */}
        {slides.length > 1 ? (
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold tabular-nums text-white">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="font-[family-name:var(--font-manrope)] text-[10px] tabular-nums text-white/50">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        ) : null}

        {/* Fullscreen button — top left */}
        <button
          type="button"
          onClick={() => onFullscreen(activeIndex)}
          aria-label="View fullscreen"
          className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/55 px-3.5 py-2 text-white/85 backdrop-blur-md transition-all hover:border-[#C5A880]/60 hover:bg-black/70 hover:text-[#E8DCC4] active:scale-[0.97] sm:bottom-5 lg:bottom-5"
        >
          <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.7} />
          <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.2em]">
            Full screen
          </span>
        </button>

        {/* Prev / Next arrows — only on multi-image; large hit targets for mobile */}
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="group absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:border-[#C5A880]/60 hover:bg-black/60 hover:text-white active:scale-[0.94] lg:left-5 lg:h-12 lg:w-12"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="group absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:border-[#C5A880]/60 hover:bg-black/60 hover:text-white active:scale-[0.94] lg:right-5 lg:h-12 lg:w-12"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </>
        ) : null}

        {/* Dot indicators — bottom of image on mobile */}
        {slides.length > 1 ? (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 lg:hidden">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onGo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-5 bg-[#C5A880]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Thumbnail rail — desktop only, not shown on mobile (dot indicators cover it) */}
      {slides.length > 1 ? (
        <div className="hidden border-t border-white/10 bg-black/80 px-3 py-3 backdrop-blur-md lg:block lg:px-4 lg:py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
            {slides.map((url, index) => (
              <button
                key={url}
                type="button"
                onClick={() => onGo(index)}
                className={`relative h-14 w-[4.5rem] shrink-0 snap-start overflow-hidden rounded-md border-2 transition-all duration-300 sm:h-16 sm:w-[5.25rem] ${
                  index === activeIndex
                    ? 'border-[#C5A880] shadow-[0_0_0_1px_rgba(197,168,128,0.35)]'
                    : 'border-white/12 opacity-70 hover:border-white/35 hover:opacity-100'
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
  );
}

/**
 * FullscreenLightbox — immersive fullscreen image viewer with navigation
 */
function FullscreenLightbox({ slides, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);
  const currentSrc = slides[currentIndex];
  const isCurrentCloudinaryAsset =
    typeof currentSrc === 'string' && currentSrc.includes('res.cloudinary.com');

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  /* Touch swipe */
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    delta < 0 ? next() : prev();
  };

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/98 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close fullscreen"
        className="absolute right-[max(0.9rem,env(safe-area-inset-right))] top-[max(0.9rem,env(safe-area-inset-top))] z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:border-[#C5A880]/60 hover:bg-black/80 hover:text-white active:scale-[0.94]"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {/* Image counter */}
      <div className="absolute left-1/2 top-[max(0.95rem,env(safe-area-inset-top))] z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-md">
        <span className="font-[family-name:var(--font-manrope)] text-xs font-semibold tabular-nums text-white">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-white/30">/</span>
        <span className="font-[family-name:var(--font-manrope)] text-xs tabular-nums text-white/50">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Main image */}
      <div
        className="relative h-full w-full p-4 sm:p-12"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full w-full">
          <SafeListingImage
            key={currentSrc}
            src={currentSrc}
            alt={`Fullscreen image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            quality={100}
            unoptimized={isCurrentCloudinaryAsset}
          />
        </div>
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:border-[#C5A880]/60 hover:bg-black/80 hover:text-white active:scale-[0.94] sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:border-[#C5A880]/60 hover:bg-black/80 hover:text-white active:scale-[0.94] sm:right-6"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </>
      )}
    </div>
  );
}

function FullscreenLightboxPortal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}

export default function ProjectLuxuryShowcase({
  project,
  backHref = '/pakistan-projects',
  priceLine = null,
}) {
  const slides = useMemo(() => buildImageSlides(project), [project]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setActiveIndex(0);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [project.title, project.mainImage, slides.length]);

  const areaStat = useMemo(() => parseAreaForStat(project.totalArea), [project.totalArea]);

  const descriptionExcerpt =
    project.description && project.description.length > 320
      ? `${project.description.slice(0, 317).trim()}…`
      : project.description || '';

  return (
    <>
      {fullscreenIndex !== null && (
        <FullscreenLightboxPortal>
          <FullscreenLightbox
            slides={slides}
            initialIndex={fullscreenIndex}
            onClose={() => setFullscreenIndex(null)}
          />
        </FullscreenLightboxPortal>
      )}
      
      <section
        className="relative bg-black pt-24 lg:pt-28"
        aria-label={`${project.title} showcase`}
      >
        {/* Framed, right-sized showcase. Desktop is a refined editorial band — not a full viewport. */}
        <div className="grid min-h-[calc(100dvh-5.5rem)] lg:min-h-0 lg:h-[min(78vh,780px)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,36%)]">

          {/* —— Visual column — carousel —— */}
          <CarouselImage 
            slides={slides} 
            activeIndex={activeIndex} 
            onGo={setActiveIndex}
            onFullscreen={setFullscreenIndex}
          />

        {/* —— Editorial panel — right-column dossier —— */}
        <aside className="relative flex flex-col border-t border-white/10 bg-[#050505] px-6 py-9 sm:px-8 sm:py-11 lg:h-full lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-9 lg:py-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(197,168,128,0.07),transparent_50%)]" />

          <div className="relative flex items-start justify-between gap-4">
            <p className="font-[family-name:var(--font-playfair)] text-base tracking-[0.2em] text-white sm:text-lg">
              The Plot Sale
            </p>
            <Link
              href={backHref}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-[#C5A880] hover:text-[#C5A880]"
              aria-label="Close and return to listing"
            >
              <X className="h-4 w-4" strokeWidth={1.25} />
            </Link>
          </div>

          {project.primaryLogo ? (
            <div className="relative mt-6">
              <ListingLogo src={project.primaryLogo} name={project.title} className="h-11 w-11 sm:h-12 sm:w-12" />
            </div>
          ) : null}

          <h1 className="relative mt-5 font-[family-name:var(--font-playfair)] text-[clamp(1.65rem,2.8vw,2.25rem)] font-light italic leading-[1.08] text-white">
            {project.title}
          </h1>

          {project.location ? (
            <p className="relative mt-2.5 font-[family-name:var(--font-manrope)] text-[11px] font-light tracking-[0.18em] text-[#C5A880]/70">
              {project.location}
            </p>
          ) : null}

          <p className="relative mt-4 font-[family-name:var(--font-manrope)] text-[13.5px] font-light leading-relaxed text-white/62 sm:text-sm">
            {descriptionExcerpt || 'Premium development curated by The Plot Sale. Full details below.'}
          </p>

          {priceLine ? (
            <p className="relative mt-5 inline-flex rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-4 py-1.5 font-[family-name:var(--font-manrope)] text-[13px] font-semibold tracking-wide text-[#E8DCC4]">
              {priceLine}
            </p>
          ) : null}

          <div className="relative mt-6">
            <Link
              href="/contact"
              className="lux-button inline-flex w-full items-center justify-center rounded-full bg-[#f5f0e8] py-3 font-[family-name:var(--font-manrope)] text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a] transition-colors hover:bg-white sm:w-auto sm:min-w-[200px] sm:px-9"
            >
              Book appointment
            </Link>
          </div>

          {areaStat ? (
            <div className="relative mt-8 border-t border-white/10 pt-6">
              <p className="font-[family-name:var(--font-playfair)] text-[13px] italic text-white/80">Development scale</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <CountUpNumber
                  end={areaStat.value}
                  className="font-[family-name:var(--font-manrope)] text-[2.75rem] font-semibold tabular-nums tracking-tight text-white sm:text-[3rem]"
                />
                {areaStat.suffix ? (
                  <span className="font-[family-name:var(--font-manrope)] text-base font-light text-white/55 sm:text-lg">
                    {areaStat.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-manrope)] text-[9.5px] uppercase tracking-[0.28em] text-white/35">
                As listed for this project
              </p>
            </div>
          ) : (
            <div className="relative mt-8 border-t border-white/10 pt-6">
              <p className="font-[family-name:var(--font-playfair)] text-[13px] italic text-white/80">Location</p>
              <p className="mt-2 font-[family-name:var(--font-manrope)] text-sm text-white/80">
                {project.location}
              </p>
            </div>
          )}

          {/* Gallery count indicator — compact */}
          {slides.length > 1 ? (
            <div className="relative mt-5 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(slides.length, 8) }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-5 bg-[#C5A880]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
                {slides.length > 8 ? (
                  <span className="ml-1 font-[family-name:var(--font-manrope)] text-[10px] text-white/30">
                    +{slides.length - 8}
                  </span>
                ) : null}
              </div>
              <span className="font-[family-name:var(--font-manrope)] text-[10px] text-white/30">
                {slides.length} images
              </span>
            </div>
          ) : null}

          <div className="relative mt-auto hidden pt-8 font-[family-name:var(--font-manrope)] text-[9.5px] uppercase tracking-[0.25em] text-white/25 lg:block">
            Scroll for full brief
          </div>
        </aside>
      </div>
    </section>
    </>
  );
}
