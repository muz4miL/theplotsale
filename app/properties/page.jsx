'use client';

import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import ExtraordinaryCta from '@/components/shared/ExtraordinaryCta';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';

const properties = [
  {
    id: 1,
    title: '3 Bed Semi-Detached Bungalow',
    location: 'Willow Gardens, Hounslow TW3',
    sqft: '1920',
    beds: 3,
    baths: 1,
    priceGbp: 595000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 2,
    title: '4 Bed Semi-Detached House',
    location: 'Bassett Gardens, Isleworth TW7',
    sqft: '1920',
    beds: 4,
    baths: 3,
    priceGbp: 750000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 3,
    title: '2 Bed Flat',
    location: 'Selbourne Avenue, Hounslow TW3 London',
    sqft: '1920',
    beds: 2,
    baths: 2,
    priceGbp: 425000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: 4,
    title: '3 Bed Flat',
    location: 'Great West Road, Isleworth TW7',
    sqft: '1920',
    beds: 3,
    baths: 1,
    priceGbp: 395000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
];

export default function PropertiesPage() {
  const { formatPrice } = useDisplayCurrency();

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C5A880]">
              Premium Portfolio
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A880]" />
          </div>

          <h1 className="mb-6 font-playfair text-5xl font-light leading-tight text-white md:text-7xl">
            London Living,
            <br />
            <span className="italic text-[#C5A880]">Redefined</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-white/50 md:text-base">
            Discover exceptional properties in London&apos;s most sought-after locations. Each residence curated for
            discerning buyers seeking luxury and sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111111] transition-all duration-500 hover:border-[#C5A880]/30"
            >
              <div className="relative h-[320px] overflow-hidden">
                <SafeListingImage
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />

                <div className="absolute right-4 top-4 rounded-full bg-[#C5A880] px-4 py-2 text-[#111111]">
                  <span className="font-playfair text-lg font-semibold">
                    {formatPrice(property.priceGbp, 'GBP')}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C5A880]" />
                  <span className="text-xs tracking-wide text-white/60">{property.location}</span>
                </div>

                <h3 className="mb-4 font-playfair text-2xl text-white transition-colors duration-300 group-hover:text-[#C5A880]">
                  {property.title}
                </h3>

                <div className="mb-6 flex items-center gap-6 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-[#C5A880]" />
                    <span className="text-sm text-white/70">{property.sqft} sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-[#C5A880]" />
                    <span className="text-sm text-white/70">{property.beds} Bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-[#C5A880]" />
                    <span className="text-sm text-white/70">{property.baths} Bath</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg border border-[#C5A880]/30 bg-transparent py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#C5A880] transition-all duration-300 hover:bg-[#C5A880] hover:text-[#111111]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="-mx-6 mt-20 md:mx-0">
        <ExtraordinaryCta />
      </div>
    </main>
  );
}
