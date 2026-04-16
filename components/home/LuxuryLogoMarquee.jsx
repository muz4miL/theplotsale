'use client';

import { useEffect, useMemo, useState } from 'react';
import ListingLogo from '@/components/ListingLogo';
import { MARQUEE_DEFAULT_BRANDS } from '@/lib/marquee-defaults';
import { LuxuryEdgeShimmer, LuxurySectionOrbs } from '@/components/shared/LuxuryMotionAccents';

const fallbackItems = MARQUEE_DEFAULT_BRANDS.map((item) => ({
  name: item.name,
  detail: item.detail,
  logo: item.logoUrl || '',
}));

function MarqueeCard({ item }) {
  return (
    <div className="group mx-6 flex h-28 w-64 shrink-0 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C5A880]/55 hover:bg-white/[0.08]">
      <div className="mr-4">
        <ListingLogo src={item.logo} name={item.name} className="h-14 w-14" />
      </div>
      <div>
        <p className="text-sm font-semibold tracking-[0.05em] text-white">{item.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-[#DCC39E]">
          {item.detail}
        </p>
      </div>
    </div>
  );
}

export default function LuxuryLogoMarquee() {
  const [brandItems, setBrandItems] = useState(fallbackItems);

  useEffect(() => {
    async function loadLogoItems() {
      try {
        const response = await fetch('/api/marquee-logos', { cache: 'no-store' });
        const result = await response.json();
        if (!response.ok || !result?.success) return;

        const mapped = (result?.data || []).map((item) => ({
          name: item.name,
          detail: item.detail || 'Trusted Brand Partner',
          logo: item.logoUrl || '',
        }));

        if (mapped.length > 0) {
          setBrandItems(mapped);
        }
      } catch (_error) {
        // Keep fallback set when APIs are not available.
      }
    }
    loadLogoItems();
  }, []);

  const marqueeItems = useMemo(() => [...brandItems, ...brandItems], [brandItems]);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-neutral-950 py-14">
      <LuxurySectionOrbs />
      <div className="relative mx-auto mb-10 max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] text-center md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A880]">Global Confidence Layer</p>
        <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Trusted by Elite Property Networks</h3>
        <LuxuryEdgeShimmer className="mx-auto mt-6 max-w-xs md:max-w-sm" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-neutral-950 to-transparent" />

        <div className="marquee-lane w-max hover:[animation-play-state:paused]">
          <div className="marquee-track flex w-max items-center">
            {marqueeItems.map((item, index) => (
              <MarqueeCard key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
          <div className="marquee-track flex w-max items-center" aria-hidden="true">
            {marqueeItems.map((item, index) => (
              <MarqueeCard key={`${item.name}-clone-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
