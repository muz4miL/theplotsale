'use client';

import { mapEmbedUrl, mapOpenUrl } from '@/lib/office-locations';

/**
 * Map preview + copy — used on home (Office Network) and contact (under studio names).
 * Stable iframe `key` avoids React re-attaching embeds during parent updates.
 */
export default function OfficeMapCard({ office, className = '' }) {
  if (!office) return null;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl ${className}`}
    >
      <div className="relative h-52 overflow-hidden border-b border-white/10 sm:h-56">
        <iframe
          key={office.mapsQuery}
          title={`${office.city} map`}
          src={mapEmbedUrl(office.mapsQuery)}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">{office.region}</p>
        <h4 className="mt-2 font-serif text-xl font-light text-white sm:text-2xl">{office.city}</h4>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{office.address}</p>

        <a
          href={mapOpenUrl(office.mapsQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#C5A880] transition-colors hover:text-[#e3caa4]"
        >
          Open in Google Maps
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
