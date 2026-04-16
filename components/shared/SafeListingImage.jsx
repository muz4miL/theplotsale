'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LISTING_IMAGE_FALLBACK, resolveListingImageSrc } from '@/lib/listing-images';

/**
 * Next/Image wrapper: never leaves a blank tile — invalid src resolves to fallback;
 * load errors swap to fallback.
 */
export default function SafeListingImage({
  src,
  alt,
  fallback = LISTING_IMAGE_FALLBACK,
  onError,
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveListingImageSrc(src, fallback));

  useEffect(() => {
    setCurrentSrc(resolveListingImageSrc(src, fallback));
  }, [src, fallback]);

  return (
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
  );
}
