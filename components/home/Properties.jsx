'use client';

/**
 * Home → Featured Properties.
 *
 * End-to-end CMS contract:
 *   • Client component fetches `/api/properties?region=UK` (no-store).
 *   • Renders the latest 4 live properties; each card links to `/uk-properties/[slug]`.
 *   • If the CMS returns nothing (first deploy / empty DB), falls back to curated
 *     editorial samples so the page never looks broken — they still link to the
 *     UK register so the CTA is honest.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bed, Bath, Maximize } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import CountUpNumber from '@/components/projects/CountUpNumber';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';
import { useInViewOnce } from '@/hooks/useInViewOnce';

/** Editorial fallback — only used when the CMS returns zero UK records. */
const FALLBACK_PROPERTIES = [
  {
    _id: 'fb-1',
    slug: 'selbourne-avenue-hounslow',
    title: '2 Bed Flat',
    location: 'Selbourne Avenue, Hounslow TW3 London',
    price: 425000,
    currency: 'GBP',
    beds: 2,
    baths: 2,
    areaSqFt: 1920,
    mainImage: '/amenities/wellness-vertical.png',
  },
  {
    _id: 'fb-2',
    slug: 'bassett-gardens-isleworth',
    title: '4 Bed Semi-Detached House',
    location: 'Bassett Gardens, Isleworth TW7',
    price: 750000,
    currency: 'GBP',
    beds: 4,
    baths: 3,
    areaSqFt: 1920,
    mainImage: '/amenities/panorama-dining.png',
  },
  {
    _id: 'fb-3',
    slug: 'willow-gardens-hounslow',
    title: '3 Bed Semi-Detached Bungalow',
    location: 'Willow Gardens, Hounslow TW3',
    price: 595000,
    currency: 'GBP',
    beds: 3,
    baths: 1,
    areaSqFt: 1920,
    mainImage: '/amenities/sky-pool-portrait.png',
  },
  {
    _id: 'fb-4',
    slug: 'great-west-road-isleworth',
    title: '3 Bed Flat',
    location: 'Great West Road, Isleworth TW7',
    price: 395000,
    currency: 'GBP',
    beds: 3,
    baths: 1,
    areaSqFt: 1920,
    mainImage: '/amenities/events-vertical.png',
  },
];

export default function Properties() {
  const { formatPrice } = useDisplayCurrency();
  const [sectionRef, inView] = useInViewOnce({ once: true, threshold: 0.08, rootMargin: '-80px 0px' });

  const [liveProperties, setLiveProperties] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/properties?region=UK', { cache: 'no-store' });
        const json = await res.json();
        if (!active) return;
        if (json?.success && Array.isArray(json.data)) {
          setLiveProperties(json.data);
        } else {
          setLiveProperties([]);
        }
      } catch {
        if (active) setLiveProperties([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // While loading: render the fallback so the skeleton doesn't flash blank.
  // After load: use live records if any, otherwise fallback.
  const source =
    liveProperties === null
      ? FALLBACK_PROPERTIES
      : liveProperties.length > 0
        ? liveProperties.slice(0, 4)
        : FALLBACK_PROPERTIES;

  const reveal = () =>
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
        <div className={`mb-12 text-center lg:mb-16 ${reveal()}`} style={{ transitionDelay: '0ms' }}>
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
          {source.map((property, i) => {
            const priceCurrency = property.currency === 'PKR' ? 'PKR' : 'GBP';
            const priceLine = property.price != null ? formatPrice(property.price, priceCurrency) : null;
            const beds = Number.isFinite(property.beds) ? property.beds : null;
            const baths = Number.isFinite(property.baths) ? property.baths : null;
            const sqft = Number.isFinite(property.areaSqFt) ? property.areaSqFt : null;
            const href = `/uk-properties/${property.slug}`;

            return (
              <Link
                key={property._id ?? property.slug}
                href={href}
                className={`group relative block overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A880]/45 hover:shadow-[0_30px_60px_-30px_rgba(197,168,128,0.35)] ${reveal()}`}
                style={{ transitionDelay: `${120 + i * 90}ms` }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <SafeListingImage
                    src={property.mainImage}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  {priceLine ? (
                    <div className="absolute right-4 top-4 rounded-sm bg-[#C5A880] px-4 py-2 text-black shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                      <span className="font-[family-name:var(--font-manrope)] text-sm font-bold tabular-nums">
                        {priceLine}
                      </span>
                    </div>
                  ) : null}

                  {/* Gold arrow chip — lives in the corner, scales on hover */}
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#C5A880]/50 bg-black/45 text-[#C5A880] backdrop-blur-md transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#111111]">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 font-[family-name:var(--font-manrope)] text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#C5A880]">
                    {property.title}
                  </h3>

                  <p className="mb-4 font-[family-name:var(--font-manrope)] text-xs text-white/55">{property.location}</p>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                    {beds !== null ? (
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                        <span className="font-[family-name:var(--font-manrope)] text-xs text-white/80">
                          <CountUpNumber end={beds} duration={1800} />
                        </span>
                      </div>
                    ) : null}
                    {baths !== null ? (
                      <div className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                        <span className="font-[family-name:var(--font-manrope)] text-xs text-white/80">
                          <CountUpNumber end={baths} duration={1800} />
                        </span>
                      </div>
                    ) : null}
                    {sqft !== null ? (
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4 text-[#C5A880]" strokeWidth={1.5} />
                        <span className="font-[family-name:var(--font-manrope)] text-xs text-white/80">
                          <CountUpNumber end={sqft} suffix=" sqft" duration={2000} />
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <p className="mt-4 flex items-center gap-2 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C5A880]/90 transition-colors duration-300 group-hover:text-[#C5A880]">
                    View details
                    <span className="inline-block h-px w-6 bg-[#C5A880] transition-all duration-500 group-hover:w-10" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={`mt-12 text-center ${reveal()}`} style={{ transitionDelay: '520ms' }}>
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 rounded-sm border border-[#C5A880]/30 bg-[#C5A880]/5 px-8 py-4 transition-colors hover:border-[#C5A880]/50 hover:bg-[#C5A880]/10"
          >
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-white">View All Properties</span>
            <ArrowUpRight className="h-4 w-4 text-[#C5A880] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
