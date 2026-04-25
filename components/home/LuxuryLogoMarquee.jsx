'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { MARQUEE_DEFAULT_BRANDS } from '@/lib/marquee-defaults';

const fallbackItems = MARQUEE_DEFAULT_BRANDS.map((item) => ({
  name: item.name,
  detail: item.detail,
  logo: item.logoUrl || '',
}));

function FloatingLogo({ item, index }) {
  const [broken, setBroken] = useState(false);

  return (
    <div 
      className="group relative flex shrink-0 items-center justify-center transition-transform duration-300 will-change-transform hover:scale-105"
      style={{
        animationDelay: `${index * 0.15}s`,
        width: '280px',
        height: '280px',
      }}
    >
      {/* Simplified glow effect - only on hover, no blur */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[#C5A880]/0 opacity-0 transition-opacity duration-300 group-hover:bg-[#C5A880]/10 group-hover:opacity-100" />
      
      {/* Logo - optimized with will-change */}
      <div className="relative z-10 h-full w-full will-change-transform">
        {!broken && item.logo ? (
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            fill
            className="object-contain p-6"
            sizes="280px"
            priority={index < 4}
            quality={85}
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-semibold tracking-[0.15em] text-[#C5A880]">
              {item.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'LG'}
            </span>
          </div>
        )}
      </div>

      {/* Simplified tooltip - no blur */}
      <div className="pointer-events-none absolute -bottom-16 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black/95 px-4 py-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <p className="font-[family-name:var(--font-manrope)] text-sm font-medium text-white">
          {item.name}
        </p>
        <p className="font-[family-name:var(--font-manrope)] text-xs text-white/60">
          {item.detail}
        </p>
      </div>
    </div>
  );
}

export default function LuxuryLogoMarquee() {
  const [brandItems, setBrandItems] = useState(fallbackItems);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadLogoItems() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        // Add timestamp to bust cache
        const timestamp = Date.now();
        const response = await fetch(`/api/marquee-logos?t=${timestamp}`, { 
          cache: 'no-store',
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
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
      } finally {
        setIsLoaded(true);
      }
    }
    loadLogoItems();
  }, []);

  // Only duplicate once for seamless loop, with proper spacing
  const marqueeItems = useMemo(() => [...brandItems, ...brandItems], [brandItems]);

  return (
    <section className="relative overflow-hidden bg-[#030706] py-16 sm:py-20">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(197,168,128,0.03),transparent)]" />

      {/* Header */}
      <div className="relative mx-auto mb-12 max-w-7xl px-6 text-center sm:mb-16">
        <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.4em] text-[#C5A880]/80">
          Trusted by Industry Leaders
        </p>
        
        <h3 className="mt-4 font-playfair text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-tight text-white">
          Trusted by <span className="italic text-[#e8dcc4]">Elite Property Networks</span>
        </h3>
        
        <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/40">
          Strategic partnerships with the world's most distinguished developers, advisors, and luxury real estate authorities.
        </p>
      </div>

      {/* Floating logos marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#030706] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#030706] to-transparent sm:w-40" />

        {/* Marquee animation - consistent spacing */}
        <div 
          className={`marquee-lane w-max transition-opacity duration-1000 hover:[animation-play-state:paused] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="marquee-track flex w-max items-center gap-40 py-12">
            {marqueeItems.map((item, index) => (
              <FloatingLogo key={`${item.name}-${index}`} item={item} index={index} />
            ))}
          </div>
          <div className="marquee-track flex w-max items-center gap-40 py-12" aria-hidden="true">
            {marqueeItems.map((item, index) => (
              <FloatingLogo key={`${item.name}-clone-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
