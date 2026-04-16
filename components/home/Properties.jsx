'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bed, Bath, Maximize } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';

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
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            }
        }
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#0A0A0A] py-16 lg:py-24"
        >
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />

            <div className="mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-12 lg:mb-16"
                >
                    {/* Eyebrow */}
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A880]" />
                        <span className="text-[#C5A880] text-[10px] tracking-[0.35em] uppercase font-medium">
                            UK Properties
                        </span>
                        <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
                    </div>

                    {/* Main Title */}
                    <h2 className="mb-4 lg:mb-5">
                        <span className="block text-3xl md:text-5xl lg:text-6xl font-playfair font-light tracking-tight leading-[1.1] text-white">
                            Featured Properties
                        </span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-white/60 text-sm md:text-base font-light mb-0 max-w-2xl mx-auto">
                        Exclusive residential opportunities in prime London locations.
                    </p>
                </motion.div>

                {/* Properties Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {propertiesData.map((property) => (
                        <motion.div
                            key={property.id}
                            variants={fadeInUp}
                            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden hover:border-[#C5A880]/30 transition-all duration-500"
                        >
                            {/* Property Image */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <SafeListingImage
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                
                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 bg-[#C5A880] text-black px-4 py-2 rounded-sm">
                                    <span className="text-sm font-bold font-[family-name:var(--font-manrope)]">
                                        {formatPrice(property.priceGbp, 'GBP')}
                                    </span>
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="p-5">
                                {/* Title */}
                                <h3 className="text-white text-lg font-semibold font-[family-name:var(--font-manrope)] mb-2 group-hover:text-[#C5A880] transition-colors duration-300">
                                    {property.title}
                                </h3>

                                {/* Location */}
                                <p className="text-white/60 text-xs font-[family-name:var(--font-manrope)] mb-4">
                                    {property.location}
                                </p>

                                {/* Specs */}
                                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-1.5">
                                        <Bed className="w-4 h-4 text-[#C5A880]" strokeWidth={1.5} />
                                        <span className="text-white/80 text-xs font-[family-name:var(--font-manrope)]">
                                            {property.beds}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Bath className="w-4 h-4 text-[#C5A880]" strokeWidth={1.5} />
                                        <span className="text-white/80 text-xs font-[family-name:var(--font-manrope)]">
                                            {property.baths}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Maximize className="w-4 h-4 text-[#C5A880]" strokeWidth={1.5} />
                                        <span className="text-white/80 text-xs font-[family-name:var(--font-manrope)]">
                                            {property.sqft} sqft
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover CTA */}
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <button
                                    type="button"
                                    className="min-h-[48px] rounded-full bg-[#C5A880] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-white active:scale-[0.98]"
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <a
                        href="/properties"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C5A880]/30 rounded-sm bg-[#C5A880]/5 hover:bg-[#C5A880]/10 hover:border-[#C5A880]/50 transition-colors"
                    >
                        <span className="text-white text-xs tracking-[0.12em] uppercase font-medium">
                            View All Properties
                        </span>
                        <svg
                            className="w-4 h-4 text-[#C5A880] transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
