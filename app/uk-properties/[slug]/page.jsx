'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, ArrowLeft, X } from 'lucide-react';
import ListingLogo from '@/components/ListingLogo';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'Price on request';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const allMedia = [
    property.mainImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    ...(property.galleryMedia || property.galleryImages || []),
  ];
  const imageMedia = allMedia.filter((url) => !url.includes('/video/upload/'));
  const videoMedia = allMedia.filter((url) => url.includes('/video/upload/'));

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40">
        <Link href="/uk-properties">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Back</span>
          </motion.button>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative h-screen">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 bg-[#C5A880] rounded-full mb-6">
                <span className="text-black font-bold text-2xl">{formatPrice(property.price)}</span>
              </div>
              <div className="mb-6">
                <ListingLogo src={property.primaryLogo} name={property.title} className="h-16 w-16" imageClassName="p-2" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                {property.title}
              </h1>
              <div className="flex items-center text-xl text-gray-300">
                <MapPin className="w-6 h-6 mr-2 text-[#C5A880]" />
                {property.location}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center">
              <Bed className="w-12 h-12 text-[#C5A880] mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2">{property.beds ?? '-'}</p>
              <p className="text-gray-400">Bedrooms</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center">
              <Bath className="w-12 h-12 text-[#C5A880] mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2">{property.baths ?? '-'}</p>
              <p className="text-gray-400">Bathrooms</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center">
              <Maximize className="w-12 h-12 text-[#C5A880] mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2">{property.areaSqFt ?? '-'}</p>
              <p className="text-gray-400">Square Feet</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">About This Property</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {property.description || 'Property details will be updated shortly.'}
            </p>
          </motion.div>

          {/* Gallery */}
          {allMedia.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Property Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imageMedia.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>

              {videoMedia.length > 0 && (
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {videoMedia.map((videoUrl) => (
                    <video
                      key={videoUrl}
                      src={videoUrl}
                      controls
                      className="h-64 w-full rounded-xl border border-white/10 bg-black/40 object-cover"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {!!property.floatingLogos?.length && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            >
              <h2 className="mb-6 text-3xl font-bold text-white">Brand Partners</h2>
              <div className="flex flex-wrap gap-4">
                {property.floatingLogos.map((logoUrl) => (
                  <ListingLogo key={logoUrl} src={logoUrl} name={property.title} className="h-14 w-14" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={imageMedia}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#C5A880] w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
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
