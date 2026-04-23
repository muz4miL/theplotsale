'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, ArrowUpRight, Home } from 'lucide-react';
import ListingLogo from '@/components/ListingLogo';
import ProjectLuxuryShowcase from '@/components/projects/ProjectLuxuryShowcase';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';

export default function PropertyDetailPage() {
  const { formatPrice } = useDisplayCurrency();
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`/api/properties?region=UK`);
        const data = await response.json();
        
        if (data.success) {
          const foundProperty = data.data.find(p => p.slug === params.slug);
          if (foundProperty) {
            setProperty(foundProperty);
          } else {
            setError('Property not found');
          }
        } else {
          setError('Failed to load property');
        }
      } catch (err) {
        setError('An error occurred');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [params.slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error || 'Property not found'}</p>
          <Link href="/uk-properties" className="text-[#C5A880] hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const native = property.currency === 'PKR' ? 'PKR' : 'GBP';
  const priceLine = formatPrice(property.price, native);

  // Combine gallery arrays and remove duplicates
  const galleryMedia = property.galleryMedia || [];
  const galleryImages = property.galleryImages || [];
  
  console.log('🔍 UK Property Detail DEBUG:');
  console.log('property.mainImage:', property.mainImage);
  console.log('property.galleryMedia:', galleryMedia);
  console.log('property.galleryImages:', galleryImages);
  
  // Combine and deduplicate
  const allGalleryUrls = [...galleryMedia, ...galleryImages];
  const uniqueGalleryUrls = [...new Set(allGalleryUrls)];
  
  console.log('Combined gallery URLs:', uniqueGalleryUrls.length);
  
  const videoMedia = uniqueGalleryUrls.filter((url) => url.includes('/video/upload/'));

  const showcaseListing = {
    title: property.title,
    description: property.description,
    mainImage: property.mainImage,
    galleryMedia: uniqueGalleryUrls,
    primaryLogo: property.primaryLogo,
    totalArea: property.areaSqFt != null ? `${property.areaSqFt} sq. ft.` : null,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-[100] lg:hidden">
        <Link
          href="/uk-properties"
          className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 lux-animate-featured-in"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
          <span>Back</span>
        </Link>
      </div>

      <ProjectLuxuryShowcase
        project={showcaseListing}
        backHref="/uk-properties"
        priceLine={priceLine}
      />

      {/* Stat strip — luxury hotel-register band */}
      <section className="relative border-y border-white/[0.07] bg-[#050706] px-5 py-6 sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" aria-hidden />
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-5 sm:grid-cols-5 sm:gap-0">
          <StatCell icon={Bed} label="Bedrooms" value={property.beds != null ? property.beds : '—'} />
          <StatCell icon={Bath} label="Bathrooms" value={property.baths != null ? property.baths : '—'} />
          {property.receptions != null && <StatCell icon={Home} label="Receptions" value={property.receptions} />}
          <StatCell icon={Maximize2} label="Internal area" value={property.areaSqFt != null ? `${property.areaSqFt.toLocaleString()} sqft` : '—'} />
          <StatCell icon={MapPin} label="Location" value={property.location} last />
        </div>
      </section>

      {/* Editorial details */}
      <section className="relative px-5 py-20 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(197,168,128,0.05),transparent)]" />
        <div className="relative mx-auto max-w-[1200px]">

          {/* Description — magazine column */}
          <div className="lux-animate-featured-in grid grid-cols-1 gap-10 border-b border-white/[0.06] pb-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.4em] text-[#C5A880]/80">
                The residence
              </p>
              <h2 className="mt-3 font-playfair text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-tight text-white">
                About this <span className="italic text-[#e8dcc4]">property</span>
              </h2>
              <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#C5A880] to-transparent" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-manrope)] text-base font-light leading-[1.75] text-white/70 sm:text-[17px]">
                {property.description || 'Property details will be updated shortly.'}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="group/cta inline-flex items-center gap-3 rounded-full bg-[#f5f0e8] px-7 py-3 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a] transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_-14px_rgba(245,240,232,0.45)]"
                >
                  Enquire privately
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.75} />
                </Link>
                <span className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
                  London · by appointment
                </span>
              </div>
            </div>
          </div>

          {videoMedia.length > 0 && (
            <div className="lux-animate-featured-in mt-16 grid grid-cols-1 gap-10 border-b border-white/[0.06] pb-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.4em] text-[#C5A880]/80">
                  On camera
                </p>
                <h2 className="mt-3 font-playfair text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-tight text-white">
                  Walk the <span className="italic text-[#e8dcc4]">residence</span>
                </h2>
                <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#C5A880] to-transparent" />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {videoMedia.map((videoUrl) => (
                  <div
                    key={videoUrl}
                    className="group relative overflow-hidden rounded-[4px] border border-white/10 bg-black/40"
                  >
                    <video
                      src={videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#C5A880]/0 transition-all duration-500 group-hover:ring-[#C5A880]/30" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!property.floatingLogos?.length && (
            <div className="lux-animate-featured-in mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.4em] text-[#C5A880]/80">
                  Development partners
                </p>
                <h2 className="mt-3 font-playfair text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-tight text-white">
                  In good <span className="italic text-[#e8dcc4]">company</span>
                </h2>
                <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#C5A880] to-transparent" />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {property.floatingLogos.map((logoUrl) => (
                  <div
                    key={logoUrl}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md transition-colors hover:border-[#C5A880]/40"
                  >
                    <ListingLogo src={logoUrl} name={property.title} className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

function StatCell({ icon: Icon, label, value, last }) {
  return (
    <div
      className={`flex items-start gap-3 px-5 sm:px-6 sm:border-r sm:border-white/[0.07] ${last ? 'sm:border-r-0' : ''}`}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/25 bg-[#C5A880]/[0.06] text-[#C5A880]">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-manrope)] text-[9.5px] font-semibold uppercase tracking-[0.32em] text-[#C5A880]/70">
          {label}
        </p>
        <p className="mt-1 truncate font-[family-name:var(--font-playfair)] text-base font-light text-white sm:text-lg">
          {value}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-screen bg-white/5 animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="h-60 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}
