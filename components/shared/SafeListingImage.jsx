'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LISTING_IMAGE_FALLBACK, resolveListingImageSrc } from '@/lib/listing-images';

/**
 * Next/Image wrapper with automatic watermark overlay
 * - Never leaves a blank tile — invalid src resolves to fallback
 * - Load errors swap to fallback
 * - Adds The Plot Sale logo watermark for brand protection
 */
export default function SafeListingImage({
  src,
  alt,
  fallback = LISTING_IMAGE_FALLBACK,
  onError,
  showWatermark = true, // Enable/disable watermark
  watermarkSize = 'medium', // 'small', 'medium', 'large'
  watermarkPosition = 'bottom-right', // 'bottom-right', 'bottom-left', 'center'
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveListingImageSrc(src, fallback));

  useEffect(() => {
    setCurrentSrc(resolveListingImageSrc(src, fallback));
  }, [src, fallback]);

  // Watermark size classes
  const sizeClasses = {
    small: 'w-12 h-12 sm:w-16 sm:h-16',
    medium: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24',
    large: 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32',
  };

  // Watermark position classes
  const positionClasses = {
    'bottom-right': 'bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4',
    'bottom-left': 'bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div className="relative overflow-hidden">
      <Image
        {...props}
        src={currentSrc}
        alt={alt || ''}
        onError={(e) => {
          if (currentSrc !== fallback) {
            setCurrentSrc(fallback);
          }
          onError?.(e);
        }}
      />

      {/* Watermark Overlay */}
      {showWatermark && (
        <div
          className={`pointer-events-none absolute z-10 ${positionClasses[watermarkPosition]}`}
          style={{
            filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
          }}
        >
          <Image
            src="/newLogo2.png"
            alt="The Plot Sale"
            width={100}
            height={100}
            className={`${sizeClasses[watermarkSize]} object-contain opacity-75`}
            style={{
              filter: 'brightness(1.1)',
            }}
          />
        </div>
      )}
    </div>
  );
}

