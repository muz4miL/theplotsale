'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LISTING_IMAGE_FALLBACK, resolveListingImageSrc } from '@/lib/listing-images';

/**
 * Adds watermark to Cloudinary images via URL transformation
 */
function addCloudinaryWatermark(url, options = {}) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) {
    return url;
  }

  const { 
    opacity = 75, 
    gravity = 'south_east', 
    x = 20, 
    y = 20,
    width = 120 
  } = options;

  // Extract cloud name and path
  const match = url.match(/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(.*)/);
  if (!match) return url;

  const [, cloudName, path] = match;
  
  // Add watermark transformation using watermark_logo from Cloudinary
  const transformation = `l_watermark_logo,w_${width},o_${opacity},g_${gravity},x_${x},y_${y}`;
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${path}`;
}

/**
 * Next/Image wrapper with automatic Cloudinary watermark
 * - Never leaves a blank tile — invalid src resolves to fallback
 * - Load errors swap to fallback
 * - Adds The Plot Sale logo watermark via Cloudinary transformation
 */
export default function SafeListingImage({
  src,
  alt,
  fallback = LISTING_IMAGE_FALLBACK,
  onError,
  showWatermark = true,
  watermarkSize = 'medium',
  watermarkPosition = 'bottom-right',
  fill,
  className,
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(() => {
    const resolved = resolveListingImageSrc(src, fallback);
    return showWatermark ? addCloudinaryWatermark(resolved, {
      width: watermarkSize === 'small' ? 80 : watermarkSize === 'large' ? 160 : 120,
      gravity: watermarkPosition === 'bottom-left' ? 'south_west' : watermarkPosition === 'center' ? 'center' : 'south_east',
    }) : resolved;
  });

  useEffect(() => {
    const resolved = resolveListingImageSrc(src, fallback);
    const withWatermark = showWatermark ? addCloudinaryWatermark(resolved, {
      width: watermarkSize === 'small' ? 80 : watermarkSize === 'large' ? 160 : 120,
      gravity: watermarkPosition === 'bottom-left' ? 'south_west' : watermarkPosition === 'center' ? 'center' : 'south_east',
    }) : resolved;
    setCurrentSrc(withWatermark);
  }, [src, fallback, showWatermark, watermarkSize, watermarkPosition]);

  if (fill) {
    return (
      <Image
        {...props}
        src={currentSrc}
        alt={alt || ''}
        fill
        className={className}
        onError={(e) => {
          if (currentSrc !== fallback) {
            setCurrentSrc(fallback);
          }
          onError?.(e);
        }}
      />
    );
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || ''}
      className={className}
      onError={(e) => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
        onError?.(e);
      }}
    />
  );
}


