'use client';

/**
 * /uk-properties listing — Awwwards-grade editorial layout.
 *
 * Constraints honoured:
 *   • Zero Framer Motion (React 19 / Next 16 hydration safety).
 *   • All hover motion is pure CSS (GPU-accelerated transform/opacity).
 *   • FadeIn wrapper is isolated in its own "use client" component.
 *
 * Layout: asymmetric 3-column grid on lg — the middle column is pushed down so
 * the register reads like a print magazine spread, not a CMS template.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bed, Bath, Maximize, ArrowUpRight, MapPin, Home } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import FadeIn from '@/components/shared/FadeIn';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';

export default function UKPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties?region=UK', { cache: 'no-store' });
        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
        } else {
          setError('Failed to load properties');
        }
      } catch (err) {
        setError('An error occurred while fetching properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030706]">
        <div className="mx-4 max-w-xl rounded-2xl border border-[#C5A880]/25 bg-white/[0.04] p-8 text-center backdrop-blur-md">
          <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.32em] text-[#C5A880]">
            Inventory Service Notice
          </p>
          <p className="mt-4 text-lg text-red-300/90">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen min-w-0 overflow-x-hidden bg-[#030706]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-8%,rgba(197,168,128,0.06),transparent)]" />

      {/* Editorial header */}
      <section className="relative px-5 pb-12 pt-32 sm:px-8 lg:px-10 lg:pt-36">
        <div className="relative mx-auto max-w-[1200px]">
          <FadeIn className="text-center">
            <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.42em] text-[#C5A880]/90">
              London Register · Private Client
            </p>
            <h1 className="mt-5 font-playfair text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.04] tracking-tight text-white">
              UK <span className="italic text-[#e8dcc4]">residences</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/55 sm:text-base">
              A discreet portfolio of prime homes across London&rsquo;s most desirable postcodes — hand-curated by our
              UK managing office.
            </p>
            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C5A880]/60" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.32em] text-[#C5A880]/85">
                {properties.length} active listing{properties.length === 1 ? '' : 's'}
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C5A880]/60" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Asymmetric editorial grid */}
      <section className="relative px-5 pb-24 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-[1200px]">
          {properties.length === 0 ? (
            <FadeIn className="py-24 text-center">
              <p className="font-playfair text-xl italic text-white/55">No listings on the London register right now.</p>
              <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-manrope)] text-sm text-white/40">
                Please check back shortly, explore our{' '}
                <Link href="/pakistan-projects" className="text-[#C5A880] underline-offset-4 hover:underline">
                  Pakistan developments
                </Link>
                , or contact concierge for off-market opportunities.
              </p>
            </FadeIn>
          ) : (
            <div
              className={[
                'grid gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16',
                /* Editorial asymmetry — on sm/md (2-col) push even; on lg (3-col) push the middle */
                'sm:[&>*:nth-child(even)]:mt-8',
                'lg:[&>*:nth-child(even)]:mt-0',
                'lg:[&>*:nth-child(3n+2)]:mt-14',
              ].join(' ')}
            >
              {properties.map((property, i) => (
                <FadeIn key={property._id} delay={Math.min(i * 80, 420)}>
                  <PropertyCard property={property} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function PropertyCard({ property }) {
  const { formatPrice } = useDisplayCurrency();
  const native = property.currency === 'PKR' ? 'PKR' : 'GBP';
  const priceLabel = formatPrice(property.price, native);

  return (
    <Link
      href={`/uk-properties/${property.slug}`}
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[2px]',
        'border border-white/[0.07] bg-[#050807] outline-none',
        /* Magnetic depth: amber glow + lift, CSS only */
        'transition-[transform,border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-1 hover:border-[#C5A880]/40',
        'hover:shadow-[0_28px_60px_-18px_rgba(0,0,0,0.65),0_0_40px_-6px_rgba(197,168,128,0.18)]',
        'focus-visible:ring-2 focus-visible:ring-[#C5A880]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      ].join(' ')}
    >
      {/* Image field — slow camera drift on hover, running on the GPU via transform */}
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/5]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <div className="relative h-full w-full origin-[50%_62%] scale-100 transform-gpu transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.06]">
            <SafeListingImage
              src={property.mainImage}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="lux-listing-grain" aria-hidden />

        {/* Base gradient (always readable) + softens on hover */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#050807] via-black/[0.45] to-black/[0.15] transition-[background] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:via-black/[0.55] group-hover:to-black/[0.2]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] bg-gradient-to-t from-[#050807] to-transparent" />

        {/* Golden shimmer sweep on hover */}
        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden>
          <div className="absolute top-[-15%] h-[130%] w-[40%] -skew-x-6 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 translate-x-[-95%] transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-[260%] group-hover:opacity-100 group-hover:duration-[1.55s] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>

        {/* Top rail */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
          <ListingLogo src={property.primaryLogo} name={property.title} className="h-11 w-11 sm:h-12 sm:w-12" />

          {/* Price plate — pure CSS; converts live with the £/Rs toggle */}
          <span className="inline-flex items-center rounded-full border border-[#C5A880]/55 bg-[#C5A880]/[0.12] px-3.5 py-1.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold tracking-[0.08em] text-[#f0e6d4] backdrop-blur-md transition-colors duration-500 group-hover:border-[#C5A880] group-hover:bg-[#C5A880]/[0.22]">
            {priceLabel}
          </span>
        </div>

        {/* Title block — sits on the image */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 pt-12 sm:px-5">
          <h2 className="max-w-[95%] font-playfair text-[1.55rem] font-light leading-[1.1] tracking-tight text-white sm:text-[1.7rem]">
            <span className="block transition-colors duration-500 group-hover:text-[#f5f0e8]">{property.title}</span>
          </h2>
          <div className="mt-3 flex items-center gap-2 font-[family-name:var(--font-manrope)] text-[11px] font-light tracking-[0.12em] text-white/55">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A880]/80" strokeWidth={1.5} />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
      </div>

      {/* Editorial panel */}
      <div className="relative flex flex-1 flex-col border-t border-white/[0.06] bg-[#050807] px-4 py-5 sm:px-5">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#C5A880]/50 via-[#C5A880]/15 to-transparent opacity-60" />

        {/* Technical specs — ultra-thin sans with wide tracking */}
        <div className="grid grid-cols-3 gap-3 font-[family-name:var(--font-manrope)]">
          <Spec icon={Bed} label="Beds" value={property.beds} />
          <Spec icon={Bath} label="Baths" value={property.baths} />
          {property.receptions != null ? (
            <Spec icon={Home} label="Recep" value={property.receptions} />
          ) : (
            <Spec icon={Maximize} label="Sq Ft" value={property.areaSqFt} />
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C5A880] transition-colors duration-300 group-hover:text-[#e8dcc4]">
            View details
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/35 bg-[#C5A880]/[0.06] text-[#C5A880] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#111111] group-hover:shadow-[0_12px_28px_rgba(197,168,128,0.28)]">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.28em] text-[#C5A880]/80">
        <Icon className="h-3 w-3" strokeWidth={1.5} />
        {label}
      </span>
      <span className="text-[15px] font-light tabular-nums text-white/85 sm:text-base">
        {value != null && value !== '' ? value : <span className="text-white/30">&mdash;</span>}
      </span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#030706]">
      <section className="relative px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-5 h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mx-auto h-12 max-w-md animate-pulse rounded bg-white/10" />
            <div className="mx-auto mt-4 h-4 w-2/3 max-w-lg animate-pulse rounded bg-white/5" />
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-[2px] border border-white/10 bg-white/[0.03] ${i % 3 === 2 ? 'lg:mt-12' : ''}`}
              >
                <div className="aspect-[4/5] animate-pulse bg-white/10" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />
                  <div className="h-10 w-full animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
