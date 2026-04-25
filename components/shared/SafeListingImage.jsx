'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LISTING_IMAGE_FALLBACK, resolveListingImageSrc } from '@/lib/listing-images';

/**
 * Next/Image wrapper with CSS watermark overlay
 * - Never leaves a blank tile — invalid src resolves to fallback
 * - Load errors swap to fallback
 * - Adds The Plot Sale logo watermark via CSS overlay (works everywhere)
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
  const [currentSrc, setCurrentSrc] = useState(() => resolveListingImageSrc(src, fallback));

  useEffect(() => {
    setCurrentSrc(resolveListingImageSrc(src, fallback));
  }, [src, fallback]);

  // Watermark size
  const sizeMap = {
    small: 60,
    medium: 100,
    large: 140,
  };
  const logoSize = sizeMap[watermarkSize] || 100;

  // Watermark position
  const positionStyles = {
    'bottom-right': { bottom: '12px', right: '12px' },
    'bottom-left': { bottom: '12px', left: '12px' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };
  const posStyle = positionStyles[watermarkPosition] || positionStyles['bottom-right'];

  // For fill images, need wrapper
  if (fill) {
    return (
      <>
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
        {showWatermark && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              pointerEvents: 'none',
              opacity: 0.7,
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              ...posStyle,
            }}
          >
            <Image
              src="/newLogo2.png"
              alt=""
              width={logoSize}
              height={logoSize}
              style={{ width: logoSize, height: 'auto' }}
            />
          </div>
        )}
      </>
    );
  }

  // For non-fill images
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
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
      {showWatermark && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            pointerEvents: 'none',
            opacity: 0.7,
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
            ...posStyle,
          }}
        >
          <Image
            src="/newLogo2.png"
            alt=""
            width={logoSize}
            height={logoSize}
            style={{ width: logoSize, height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
}


