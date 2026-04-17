'use client';

import OfficeMapCard from '@/components/shared/OfficeMapCard';
import { officeMapSites } from '@/lib/office-locations';

export default function OfficeLocations() {
  return (
    <section className="relative overflow-hidden bg-[#050708] pb-[max(5rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-14 md:pb-24 md:pl-8 md:pr-8 md:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-60 w-[65rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(197,168,128,0.12),_transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#C5A880]">Global Presence</p>
          <h3 className="mt-4 font-serif text-3xl font-light text-white md:text-5xl">
            Visit Our <span className="italic text-[#C5A880]">Office Network</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            Strategic presence across Pakistan and the UK to support premium property advisory.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {officeMapSites.map((office) => (
            <OfficeMapCard
              key={office.key}
              office={office}
              className="transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A880]/40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
