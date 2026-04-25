'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';

const statusTokens = {
  Completed: {
    border: 'border-emerald-400/35',
    text: 'text-emerald-100/90',
    bg: 'bg-emerald-500/[0.07]',
  },
  Current: {
    border: 'border-[#C5A880]/50',
    text: 'text-[#f0e6d4]',
    bg: 'bg-[#C5A880]/[0.1]',
  },
  Upcoming: {
    border: 'border-amber-400/40',
    text: 'text-amber-100/85',
    bg: 'bg-amber-400/[0.06]',
  },
};

export default function ProjectListingCard({ project, index }) {
  const router = useRouter();
  const [wrapRef, visible] = useInViewOnce({ threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  const status = statusTokens[project.status] || statusTokens.Current;
  const num = String(index + 1).padStart(2, '0');

  // 3D tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt (max 8 degrees)
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;

    setTilt({ x: tiltX, y: tiltY });
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  const projectHref = `/pakistan-projects/${project.slug}`;

  const handleCardClick = (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    router.push(projectHref);
  };

  return (
    <div
      ref={wrapRef}
      className={`h-full transition-all duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ 
        transitionDelay: `${Math.min(index * 70, 350)}ms`,
        perspective: '1200px',
      }}
    >
      <Link
        ref={cardRef}
        href={projectHref}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[2px] border border-white/[0.07] bg-[#050807] outline-none transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[2px] after:opacity-0 after:shadow-[0_0_0_1px_rgba(197,168,128,0.35),0_32px_64px_-12px_rgba(0,0,0,0.65)] after:transition-opacity after:duration-700 hover:border-[#C5A880]/30 hover:after:opacity-100 focus-visible:ring-2 focus-visible:ring-[#C5A880]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-[500px] lg:min-h-[520px] will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Cursor-following gold glare */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0"
          style={{
            background: `radial-gradient(circle 400px at ${glarePos.x}% ${glarePos.y}%, rgba(197,168,128,0.12) 0%, transparent 60%)`,
          }}
        />
        {/* Image field — scale lives on an inner layer so motion reads as camera drift, not a UI pop */}
        <div className="relative min-h-[280px] flex-1 overflow-hidden sm:min-h-[300px] lg:min-h-[340px]">
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="relative h-full w-full origin-[50%_68%] scale-100 transform-gpu transition-transform duration-[1.75s] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.032]">
              <SafeListingImage
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="lux-listing-grain" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#050807] via-black/[0.52] to-black/[0.22] transition-[background] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:via-black/[0.48] group-hover:to-black/[0.12]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-2/5 bg-gradient-to-t from-[#050807] to-transparent opacity-90 transition-opacity duration-[1s] group-hover:opacity-[0.97]" />
          <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden>
            <div className="absolute top-[-15%] h-[130%] w-[42%] -skew-x-6 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 translate-x-[-95%] transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-[260%] group-hover:opacity-100 group-hover:duration-[1.55s] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_0_100px_rgba(0,0,0,0.42)] opacity-70 transition-[opacity,box-shadow] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" aria-hidden />

          {/* Top rail */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 p-5 sm:p-6">
            <span
              className="select-none font-playfair text-4xl font-light tabular-nums text-white/[0.12] transition-colors duration-500 group-hover:text-[#C5A880]/25 sm:text-5xl"
              aria-hidden
            >
              {num}
            </span>
            <div className="flex flex-col items-end gap-3">
              <span
                className={`inline-flex items-center border px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] backdrop-blur-md ${status.border} ${status.text} ${status.bg}`}
              >
                {project.status}
              </span>
              <ListingLogo src={project.primaryLogo} name={project.title} className="h-11 w-11 sm:h-12 sm:w-12" />
            </div>
          </div>

          {/* Title block — on image */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-12 sm:px-6 sm:pb-6">
            <h2 className="max-w-[95%] font-playfair text-[1.65rem] font-light leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-[1.85rem]">
              <span className="block transition-colors duration-500 group-hover:text-[#f5f0e8]">{project.title}</span>
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-[family-name:var(--font-manrope)] text-xs font-light text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A880]/80" strokeWidth={1.5} />
                {project.location}
              </span>
              {project.totalArea ? (
                <span className="inline-flex items-center gap-1.5 text-white/45">
                  <Maximize2 className="h-3.5 w-3.5 shrink-0 text-[#C5A880]/70" strokeWidth={1.5} />
                  {project.totalArea}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Editorial panel */}
        <div className="relative flex flex-1 flex-col border-t border-white/[0.06] bg-[#050807] px-5 py-5 sm:px-6 sm:py-6">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#C5A880]/50 via-[#C5A880]/15 to-transparent opacity-60" />

          <p className="line-clamp-3 font-[family-name:var(--font-manrope)] text-[13px] font-light leading-[1.75] text-white/45 sm:text-sm">
            {project.description || 'Curated development — full brief and gallery on the project page.'}
          </p>

          {project.paymentPlan ? (
            <p className="mt-4 border-l-2 border-[#C5A880]/40 pl-3 font-[family-name:var(--font-manrope)] text-[11px] font-medium uppercase tracking-[0.2em] text-[#C5A880]/75">
              Plan ·{' '}
              <span className="font-normal normal-case tracking-normal text-white/50">{project.paymentPlan}</span>
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C5A880] transition-colors duration-300 group-hover:text-[#e8dcc4]">
              Open dossier
            </span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/35 bg-[#C5A880]/[0.06] text-[#C5A880] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#111111] group-hover:shadow-[0_12px_28px_rgba(197,168,128,0.25)]">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
