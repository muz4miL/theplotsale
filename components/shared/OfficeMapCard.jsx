'use client';

import { MapPin } from 'lucide-react';

/**
 * OfficeMapCard — luxury map link card.
 * Opens the exact Google Maps location in a new tab.
 */
export default function OfficeMapCard({ office }) {
  if (!office?.mapUrl) return null;

  return (
    <a
      href={office.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent transition-all duration-500 hover:border-[#C5A880]/30"
      aria-label={`Open ${office.city} studio location in Google Maps`}
    >
      {/* Decorative map placeholder / illustration */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0a1412]">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(197,168,128,0.35), transparent 60%),
                              radial-gradient(circle at 70% 60%, rgba(197,168,128,0.15), transparent 50%)`,
          }}
        />
        {/* Grid lines suggesting a map */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Center pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 shadow-[0_0_24px_rgba(197,168,128,0.25)] transition-transform duration-500 group-hover:scale-110">
              <MapPin className="h-5 w-5 text-[#C5A880]" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#C5A880]/80">
              {office.city}
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#C5A880]/0 transition-colors duration-500 group-hover:bg-[#C5A880]/5" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          Google Maps
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C5A880] transition-colors group-hover:text-white">
          Open →
        </span>
      </div>
    </a>
  );
}