'use client';

/**
 * /properties — Unified editorial register.
 *
 * Pulls the complete catalogue (UK + Pakistan) from /api/properties and presents
 * it with an award-grade asymmetric editorial grid, a region filter rail, a
 * currency-aware price plate, and a pure-CSS magnetic card (no Framer on hover).
 *
 * Why the rewrite:
 *  - The old /properties was 4 hardcoded units with stock Unsplash photos.
 *  - The admin CMS now owns the inventory; the public register has to read from it.
 *  - /uk-properties already does this for UK only. This page is the "everything" view
 *    — London register + Pakistan flagship residences in one premium surface.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bath, Bed, MapPin, Maximize, Home } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ListingLogo from '@/components/ListingLogo';
import FadeIn from '@/components/shared/FadeIn';
import PropertyFilters from '@/components/properties/PropertyFilters';
import ExtraordinaryCta from '@/components/shared/ExtraordinaryCta';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';

const REGION_TABS = [
  { id: 'all', label: 'All Regions' },
  { id: 'UK', label: 'London · UK' },
  { id: 'Pakistan', label: 'Pakistan' },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRegion, setActiveRegion] = useState('all');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    async function fetchProperties() {
      try {
        console.log('1. Component mounted, starting fetch...');
        const response = await fetch('/api/properties', { 
          cache: 'no-store',
          signal: controller.signal 
        });
        
        console.log('2. Got response:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('3. Got data:', data);
        
        if (isMounted) {
          if (response.ok && data.success) {
            const allProps = Array.isArray(data.data) ? data.data : [];
            setProperties(allProps);
            setFilteredProperties(allProps);
          } else {
            setError(data?.message || data?.error || 'Failed to load properties');
          }
        }
      } catch (err) {
        console.error('❌ FETCH FAILED:', err);
        if (isMounted) {
          setError(err.name === 'AbortError' ? 'Request timed out' : 'Unable to reach the inventory service. Please try again shortly.');
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProperties();

    // Emergency fallback - force exit loading after 15s
    const emergencyTimeout = setTimeout(() => {
      console.warn('⏰ EMERGENCY: Forcing loading false after 15s');
      if (isMounted) {
        setLoading(false);
        setError('Request timed out');
      }
    }, 15000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(emergencyTimeout);
      controller.abort();
    };
  }, []);

  // Properties filtered by region tab
  const regionFilteredProperties = useMemo(() => {
    if (activeRegion === 'all') return properties;
    return properties.filter((p) => p.region === activeRegion);
  }, [properties, activeRegion]);

  // Final properties after both region and filter controls
  const displayProperties = useMemo(() => {
    if (activeRegion === 'all') {
      // When "All Regions" is selected, show the filtered results
      return filteredProperties;
    }
    // When a specific region is selected, filter the already-filtered results by region
    return filteredProperties.filter((p) => p.region === activeRegion);
  }, [filteredProperties, activeRegion]);

  const counts = useMemo(() => {
    const by = { all: properties.length, UK: 0, Pakistan: 0 };
    for (const p of properties) {
      if (p.region === 'UK') by.UK += 1;
      else if (p.region === 'Pakistan') by.Pakistan += 1;
    }
    return by;
  }, [properties]);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030706]">
        <div className="mx-4 max-w-xl rounded-2xl border border-[#C5A880]/25 bg-white/[0.04] p-8 text-center backdrop-blur-md">
          <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.32em] text-[#C5A880]">
            Inventory Service Notice
          </p>
          <p className="mt-4 text-lg text-red-300/90">{error}</p>
          <p className="mt-3 font-[family-name:var(--font-manrope)] text-sm text-white/45">
            If this is production, verify Vercel environment variables and MongoDB network access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen min-w-0 overflow-x-hidden bg-[#030706]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-8%,rgba(197,168,128,0.07),transparent)]" />

      {/* Editorial header */}
      <section className="relative px-5 pb-12 pt-32 sm:px-8 lg:px-10 lg:pt-36">
        <div className="relative mx-auto max-w-[1240px]">
          <FadeIn className="text-center">
            <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.42em] text-[#C5A880]/90">
              Premium Register · 2026
            </p>
            <h1 className="mt-5 font-playfair text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.04] tracking-tight text-white">
              Properties <span className="italic text-[#e8dcc4]">curated</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/55 sm:text-base">
              A single register for the full ThePlotSale portfolio — London residences, Pakistan flagships and the private
              opportunities in between.
            </p>
            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C5A880]/60" />
              <span className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.32em] text-[#C5A880]/85">
                {counts.all} active listing{counts.all === 1 ? '' : 's'}
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C5A880]/60" />
            </div>
          </FadeIn>

          {/* Region filter rail */}
          <FadeIn delay={140} className="mt-10 flex justify-center lg:mt-12">
            <div className="inline-flex rounded-full border border-white/[0.09] bg-black/30 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] supports-[backdrop-filter]:backdrop-blur-md">
              {REGION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveRegion(tab.id)}
                  aria-pressed={activeRegion === tab.id}
                  className={`relative rounded-full px-5 py-2.5 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors sm:px-7 sm:py-3 sm:text-[11px] ${
                    activeRegion === tab.id
                      ? 'bg-[#C5A880] text-[#111111] shadow-[0_8px_24px_rgba(197,168,128,0.2)]'
                      : 'text-white/45 hover:text-white/85'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`ml-2 rounded-full px-1.5 py-0.5 text-[9px] tabular-nums ${
                      activeRegion === tab.id ? 'bg-black/15 text-[#111111]/70' : 'bg-white/[0.06] text-white/40'
                    }`}
                  >
                    {counts[tab.id] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Asymmetric editorial grid */}
      <section className="relative px-5 pb-24 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-[1240px]">
          {/* Luxury Filters */}
          {properties.length > 0 && (
            <PropertyFilters
              properties={regionFilteredProperties}
              onFilteredChange={setFilteredProperties}
            />
          )}

          {displayProperties.length === 0 ? (
            <FadeIn className="py-24 text-center">
              <p className="font-playfair text-xl italic text-white/55">
                {properties.length === 0
                  ? 'No listings on the register in this region yet.'
                  : 'No properties match your filters.'}
              </p>
              <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-manrope)] text-sm text-white/40">
                {properties.length === 0
                  ? 'Switch region above, or contact concierge for off-market opportunities.'
                  : 'Try adjusting your filters or switch regions to see more properties.'}
              </p>
            </FadeIn>
          ) : (
            <div
              key={activeRegion}
              className={[
                'grid gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16',
                /* Editorial asymmetry — stagger even / middle columns */
                'sm:[&>*:nth-child(even)]:mt-8',
                'lg:[&>*:nth-child(even)]:mt-0',
                'lg:[&>*:nth-child(3n+2)]:mt-14',
              ].join(' ')}
            >
              {displayProperties.map((property, i) => (
                <FadeIn key={property._id ?? property.id ?? property.slug} delay={Math.min(i * 75, 420)}>
                  <PropertyCard property={property} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <ExtraordinaryCta />
    </div>
  );
}

function PropertyCard({ property }) {
  const navFallbackTimeoutRef = useRef(null);
  const { formatPrice } = useDisplayCurrency();
  const nativeCurrency =
    property.currency === 'PKR' || property.region === 'Pakistan' ? 'PKR' : 'GBP';
  const priceLabel = property.price != null ? formatPrice(property.price, nativeCurrency) : null;

  const regionTag = property.region === 'UK' ? 'London · UK' : 'Pakistan';
  const detailsHref = property.region === 'UK'
    ? `/uk-properties/${property.slug}`
    : `/pakistan-projects/${property.slug}`;

  useEffect(() => {
    return () => {
      if (navFallbackTimeoutRef.current) {
        window.clearTimeout(navFallbackTimeoutRef.current);
      }
    };
  }, []);

  const handleCardNavigate = (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    if (navFallbackTimeoutRef.current) {
      window.clearTimeout(navFallbackTimeoutRef.current);
    }
    navFallbackTimeoutRef.current = window.setTimeout(() => {
      if (window.location.pathname !== detailsHref) {
        window.location.assign(detailsHref);
      }
    }, 1200);
  };

  return (
    <Link
      href={detailsHref}
      onClick={handleCardNavigate}
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[2px]',
        'border border-white/[0.07] bg-[#050807] outline-none',
        'transition-[transform,border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-1 hover:border-[#C5A880]/40',
        'hover:shadow-[0_28px_60px_-18px_rgba(0,0,0,0.65),0_0_40px_-6px_rgba(197,168,128,0.18)]',
        'focus-visible:ring-2 focus-visible:ring-[#C5A880]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      ].join(' ')}
    >
      {/* Image field — slow camera drift on hover, GPU only */}
      <div className="relative aspect-[4/5] overflow-hidden">
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

        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#050807] via-black/[0.45] to-black/[0.15] transition-[background] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:via-black/[0.55] group-hover:to-black/[0.2]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] bg-gradient-to-t from-[#050807] to-transparent" />

        {/* Shimmer sweep */}
        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden>
          <div className="absolute top-[-15%] h-[130%] w-[40%] -skew-x-6 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 translate-x-[-95%] transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-[260%] group-hover:opacity-100 group-hover:duration-[1.55s] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>

        {/* Top rail */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
          <div className="flex flex-col gap-2">
            <ListingLogo src={property.primaryLogo} name={property.title} className="h-11 w-11 sm:h-12 sm:w-12" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-black/40 px-2.5 py-1 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-[#C5A880]" />
              {regionTag}
            </span>
          </div>
          {priceLabel ? (
            <span className="inline-flex items-center rounded-full border border-[#C5A880]/55 bg-[#C5A880]/[0.12] px-3.5 py-1.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold tracking-[0.08em] text-[#f0e6d4] backdrop-blur-md transition-colors duration-500 group-hover:border-[#C5A880] group-hover:bg-[#C5A880]/[0.22]">
              {priceLabel}
            </span>
          ) : null}
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
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
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
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-5 h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mx-auto h-12 max-w-md animate-pulse rounded bg-white/10" />
            <div className="mx-auto mt-4 h-4 w-2/3 max-w-lg animate-pulse rounded bg-white/5" />
          </div>
          <div className="mb-14 flex justify-center">
            <div className="h-12 w-80 animate-pulse rounded-full bg-white/10" />
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
