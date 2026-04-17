'use client';

import { Bed, Bath, Maximize } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import CountUpNumber from '@/components/projects/CountUpNumber';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const propertiesData = [
  {
    id: 1,
    title: '3 Bed Semi-Detached Bungalow',
    location: 'Willow Gardens, Hounslow TW3',
    priceGbp: 595000,
    beds: 3,
    baths: 1,
    sqft: 1920,
    image: '/amenities/sky-pool-portrait.png',
  },
  {
    id: 2,
    title: '4 Bed Semi-Detached House',
    location: 'Bassett Gardens, Isleworth TW7',
    priceGbp: 750000,
    beds: 4,
    baths: 3,
    sqft: 1920,
    image: '/amenities/panorama-dining.png',
  },
  {
    id: 3,
    title: '2 Bed Flat',
    location: 'Selbourne Avenue, Hounslow TW3 London',
    priceGbp: 425000,
    beds: 2,
    baths: 2,
    sqft: 1920,
    image: '/amenities/wellness-vertical.png',
  },
  {
    id: 4,
    title: '3 Bed Flat',
    location: 'Great West Road, Isleworth TW7',
    priceGbp: 395000,
    beds: 3,
    baths: 1,
    sqft: 1920,
    image: '/amenities/events-vertical.png',
  },
];

export default function Properties() {
  const { formatPrice } = useDisplayCurrency();
  const [sectionRef, inView] = useInViewOnce({ once: true, threshold: 0.08, rootMargin: '-80px 0px' });

  const reveal = (delayMs = 0) =>
    `transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
      inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0A0A] py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
        <div className={`mb-12 text-center lg:mb-16 ${reveal(0)}`} style={{ transitionDelay: '0ms' }}>
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">UK Properties</span>
            <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
          </div>

          <h2 className="mb-4 lg:mb-5">
            <span className="block font-playfair text-3xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Featured Properties
            </span>
          </h2>

          <p className="mx-auto mb-0 max-w-2xl text-sm font-light text-white/60 md:text-base">
            Exclusive residential opportunities in prime London locations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {propertiesData.map((property, i) => (
            <div
              key={property.id}
              className={`group relative overflow-hidden rounded-sm border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-[#C5A880]/30 ${reveal()}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <SafeListingImage
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute right-4 top-4 rounded-sm bg-[#C5A880] px-4 py-2 text-black">
                  <span className="text-sm font-bold font-[family-name:var(--font-manrope)]">
                    {formatPrice(property.priceGbp, 'GBP')}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 font-[family-name:var(--font-manrope)] text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#C5A880]">
                  {property.title}
                </h3>

                <p className="mb-4 font-[family-name:var(--font-manrope)] text-xs text-white/60">{property.location}</p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                    <span className="font-[family-name:var(--font-manrope)] text-xs text-white/80">
                      <CountUpNumber end={property.beds} duration={1800} />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                    <span className="font-[family-name:var(--font-manrope)] text-xs text-white/80">
                      <CountUpNumber end={property.baths} duration={1800} />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                    <span className="font-[family-name:var(--font-manrope)] text-xs text-white/80">
                      <CountUpNumber end={property.sqft} suffix=" sqft" duration={2000} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <button
                  type="button"
                  className="min-h-[48px] rounded-full bg-[#C5A880] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-white active:scale-[0.98]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center ${reveal()}`} style={{ transitionDelay: '520ms' }}>
          <a
            href="/properties"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#C5A880]/30 bg-[#C5A880]/5 px-8 py-4 transition-colors hover:border-[#C5A880]/50 hover:bg-[#C5A880]/10"
          >
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-white">View All Properties</span>
            <svg
              className="h-4 w-4 text-[#C5A880] transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
