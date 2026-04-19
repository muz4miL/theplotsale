'use client';

import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { mapEmbedUrl, mapDirectionsUrl } from '@/lib/office-locations';

/**
 * Office card — used on /home (Office Network) and /contact (under studio names).
 *
 * Entire card is now an anchor to Google Maps directions, so a single tap from
 * any device starts turn-by-turn navigation from the visitor's current location
 * to the exact office pin. Keyboard users land on the same anchor naturally.
 */
export default function OfficeMapCard({ office, className = '' }) {
  if (!office) return null;

  const directions = mapDirectionsUrl(office);
  const embed = mapEmbedUrl(office);

  return (
    <a
      href={directions}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get directions to ${office.city}`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A880]/40 hover:shadow-[0_32px_64px_-24px_rgba(197,168,128,0.28)] ${className}`}
    >
      <div className="relative h-56 overflow-hidden border-b border-white/10 sm:h-60">
        <iframe
          key={`${office.lat},${office.lng}`}
          title={`${office.city} map`}
          src={embed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Transparent click-catcher so the iframe never swallows the link tap
            on mobile — the whole card routes to directions. */}
        <span className="absolute inset-0 z-10 block" aria-hidden />

        {/* Gold corner pin — subtle brand mark, not a control */}
        <span
          className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[#C5A880]/45 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E8DCC4] backdrop-blur-md"
          aria-hidden
        >
          <MapPin className="h-3 w-3" strokeWidth={1.75} />
          {office.region}
        </span>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-[family-name:var(--font-playfair)] text-xl font-light text-white sm:text-2xl">
              {office.city}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">
              {office.address}
            </p>
            {office.phone ? (
              <p className="mt-3 font-[family-name:var(--font-manrope)] text-[11px] uppercase tracking-[0.24em] text-white/40">
                {office.phone}
              </p>
            ) : null}
          </div>

          {/* Gold arrow chip — lifts on hover, signals the whole card is clickable */}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/40 bg-[#C5A880]/[0.08] text-[#C5A880] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#111111] group-hover:shadow-[0_12px_32px_-12px_rgba(197,168,128,0.55)]">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
          <Navigation className="h-3.5 w-3.5 text-[#C5A880]" strokeWidth={2} />
          <span className="font-[family-name:var(--font-manrope)] text-[10.5px] font-semibold uppercase tracking-[0.26em] text-[#C5A880] transition-colors group-hover:text-[#E8DCC4]">
            Get directions
          </span>
          <span
            className="ml-auto h-px w-8 bg-gradient-to-r from-[#C5A880]/60 to-transparent transition-all duration-500 group-hover:w-16"
            aria-hidden
          />
        </div>
      </div>
    </a>
  );
}
