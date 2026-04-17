'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Bed, Bath, MapPin, ArrowLeft } from 'lucide-react';
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

  const galleryUrls = [...(property.galleryMedia || []), ...(property.galleryImages || [])];
  const videoMedia = galleryUrls.filter((url) => url.includes('/video/upload/'));

  const showcaseListing = {
    title: property.title,
    description: property.description,
    mainImage: property.mainImage,
    galleryMedia: galleryUrls,
    primaryLogo: property.primaryLogo,
    totalArea: property.areaSqFt != null ? `${property.areaSqFt} sq. ft.` : null,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-[100]">
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

      <section className="border-b border-white/10 bg-black px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 sm:text-base">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-[#C5A880]" />
              <span>{property.beds != null ? `${property.beds} bed` : '—'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-[#C5A880]" />
              <span>{property.baths != null ? `${property.baths} bath` : '—'}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 shrink-0 text-[#C5A880]" />
              {property.location}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Description */}
          <div className="lux-animate-featured-in mb-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-white mb-6">About This Property</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {property.description || 'Property details will be updated shortly.'}
            </p>
          </div>

          {videoMedia.length > 0 && (
            <div className="lux-animate-featured-in rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="mb-2 text-3xl font-bold text-white">Property film</h2>
              <p className="mb-6 text-sm text-white/50">Video tours and walkthroughs.</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {videoMedia.map((videoUrl) => (
                  <video
                    key={videoUrl}
                    src={videoUrl}
                    controls
                    playsInline
                    className="h-64 w-full rounded-xl border border-white/10 bg-black/40 object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {!!property.floatingLogos?.length && (
            <div className="lux-animate-featured-in mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="mb-6 text-3xl font-bold text-white">Brand Partners</h2>
              <div className="flex flex-wrap gap-4">
                {property.floatingLogos.map((logoUrl) => (
                  <ListingLogo key={logoUrl} src={logoUrl} name={property.title} className="h-14 w-14" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

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
