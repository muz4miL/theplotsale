'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * WatermarkedImage - Adds The Plot Sale logo watermark to all images
 * 
 * Features:
 * - CSS overlay watermark (immediate, client-side)
 * - Positioned at bottom-right corner
 * - Semi-transparent for subtle branding
 * - Responsive sizing
 * - Works with Next.js Image component
 * - Prevents right-click save (optional)
 */

export default function WatermarkedImage({
  src,
  alt,
  fill,
  className = '',
  sizes,
  priority = false,
  quality = 75,
  watermarkPosition = 'bottom-right', // 'bottom-right', 'bottom-left', 'center'
  watermarkSize = 'medium', // 'small', 'medium', 'large'
  preventRightClick = true,
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  // Watermark size classes
  const sizeClasses = {
    small: 'w-16 h-16 sm:w-20 sm:h-20',
    medium: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
    large: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40',
  };

  // Watermark position classes
  const positionClasses = {
    'bottom-right': 'bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6',
    'bottom-left': 'bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6',
    'top-left': 'top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6',
  };

  const handleContextMenu = (e) => {
    if (preventRightClick) {
      e.preventDefault();
      return false;
    }
  };

  const handleDragStart = (e) => {
    if (preventRightClick) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div 
      className="relative overflow-hidden"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Main Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onError={() => setImageError(true)}
        {...props}
      />

      {/* Watermark Overlay - Only show if image loaded successfully */}
      {!imageError && (
        <div
          className={`pointer-events-none absolute z-10 ${positionClasses[watermarkPosition]}`}
          style={{
            mixBlendMode: 'normal',
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
          }}
        >
          <div className="relative">
            {/* Logo with opacity */}
            <Image
              src="/newLogo2.png"
              alt="The Plot Sale"
              width={120}
              height={120}
              className={`${sizeClasses[watermarkSize]} object-contain opacity-70`}
              style={{
                filter: 'brightness(1.1) contrast(1.1)',
              }}
              priority
            />
            
            {/* Optional: Add text below logo for extra branding */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p 
                className="font-[family-name:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[0.15em] text-white/80 sm:text-[9px]"
                style={{
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                }}
              >
                ThePlotSale.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Anti-screenshot overlay (very subtle) */}
      <div 
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(197, 168, 128, 0.01) 10px, rgba(197, 168, 128, 0.01) 11px)',
        }}
      />
    </div>
  );
}
