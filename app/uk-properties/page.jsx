'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeListingImage from '@/components/shared/SafeListingImage';
import { Bed, Bath, Maximize, ArrowUpRight } from 'lucide-react';
import ListingLogo from '@/components/ListingLogo';
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

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="lux-animate-featured-in mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              UK Properties
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover premium residential properties in London's most sought-after locations
            </p>
            <div className="mt-4 inline-block px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <span className="text-[#C5A880] font-semibold">{properties.length} Properties Available</span>
            </div>
          </div>

          {/* Properties Grid */}
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No properties available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property, i) => (
                <PropertyCard key={property._id} property={property} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function PropertyCard({ property, index = 0 }) {
  const { formatPrice } = useDisplayCurrency();
  const native = property.currency === 'PKR' ? 'PKR' : 'GBP';
  const priceLabel = formatPrice(property.price, native);

  return (
    <div
      className="group relative lux-animate-featured-in"
      style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-black/35 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A880]/55 hover:shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <SafeListingImage
            src={property.mainImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4">
            <ListingLogo src={property.primaryLogo} name={property.title} />
          </div>
          
          {/* Price Badge */}
          <div className="absolute right-4 top-4 rounded-full bg-[#C5A880] px-4 py-2 shadow-[0_8px_20px_rgba(197,168,128,0.35)]">
            <span className="text-black font-bold text-lg">{priceLabel}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-[#C5A880]">
            {property.title}
          </h3>
          <p className="text-gray-400 mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {property.location}
          </p>

          {/* Property Stats */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center space-x-1 text-gray-300">
              <Bed className="w-5 h-5 text-[#C5A880]" />
              <span className="ml-1">{property.beds ?? '-'}</span>
          </div>
            <div className="flex items-center space-x-1 text-gray-300">
              <Bath className="w-5 h-5 text-[#C5A880]" />
              <span className="ml-1">{property.baths ?? '-'}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-300">
              <Maximize className="w-5 h-5 text-[#C5A880]" />
              <span className="ml-1">{property.areaSqFt ? `${property.areaSqFt} sqft` : '-'}</span>
            </div>
          </div>

          <Link
            href={`/uk-properties/${property.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 font-semibold text-white transition-all duration-300 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-black"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-16 w-96 bg-white/5 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-6 w-[600px] bg-white/5 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                <div className="h-64 bg-white/10 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-8 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                  <div className="flex justify-between pt-4">
                    <div className="h-6 w-16 bg-white/10 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-white/10 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                  </div>
                  <div className="h-12 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
