'use client';

import { motion } from 'framer-motion';
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
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  },
  {
    id: 2,
    title: '4 Bed Semi-Detached House',
    location: 'Bassett Gardens, Isleworth TW7',
    sqft: '1920',
    beds: 4,
    baths: 3,
    priceGbp: 750000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 3,
    title: '2 Bed Flat',
    location: 'Selbourne Avenue, Hounslow TW3 London',
    sqft: '1920',
    beds: 2,
    baths: 2,
    priceGbp: 425000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
  },
  {
    id: 4,
    title: '3 Bed Flat',
    location: 'Great West Road, Isleworth TW7',
    sqft: '1920',
    beds: 3,
    baths: 1,
    priceGbp: 395000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function PropertiesPage() {
  const { formatPrice } = useDisplayCurrency();

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="text-[#C5A880] text-[10px] tracking-[0.3em] uppercase font-medium">
              Premium Portfolio
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]" />
          </motion.div>

          <h1 className="font-playfair text-5xl md:text-7xl text-white font-light mb-6 leading-tight">
            London Living,<br />
            <span className="italic text-[#C5A880]">Redefined</span>
          </h1>

          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Discover exceptional properties in London's most sought-after locations. 
            Each residence curated for discerning buyers seeking luxury and sophistication.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C5A880]/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-[320px] overflow-hidden">
                <SafeListingImage
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#C5A880] text-[#111111] px-4 py-2 rounded-full">
                  <span className="font-playfair text-lg font-semibold">{formatPrice(property.priceGbp, 'GBP')}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-white/60 text-xs tracking-wide">{property.location}</span>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl text-white mb-4 group-hover:text-[#C5A880] transition-colors duration-300">
                  {property.title}
                </h3>

                {/* Property Details */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-white/70 text-sm">{property.sqft} sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-white/70 text-sm">{property.beds} Bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-white/70 text-sm">{property.baths} Bath</span>
                  </div>
                </div>

                {/* Details Button */}
                <button className="w-full py-3 bg-transparent border border-[#C5A880]/30 text-[#C5A880] rounded-lg text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#C5A880] hover:text-[#111111] transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
      <div className="mt-20 -mx-6 md:-mx-0">
        <ExtraordinaryCta />
      </div>
    </main>
  );
}
