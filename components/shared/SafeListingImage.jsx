'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [imageFrame, setImageFrame] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const wrapperRef = useRef(null);
  const resizeFrameRef = useRef(() => {});

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

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const computeFrame = () => {
      const img = wrapper.querySelector('img');
      if (!img) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperWidth = wrapperRect.width;
      const wrapperHeight = wrapperRect.height;
      if (!wrapperWidth || !wrapperHeight) return;

      const naturalWidth = img.naturalWidth || wrapperWidth;
      const naturalHeight = img.naturalHeight || wrapperHeight;
      if (!naturalWidth || !naturalHeight) return;

      const fit = window.getComputedStyle(img).objectFit || 'cover';
      const imageRatio = naturalWidth / naturalHeight;
      const wrapperRatio = wrapperWidth / wrapperHeight;

      let renderedWidth = wrapperWidth;
      let renderedHeight = wrapperHeight;

      if (fit === 'contain') {
        if (imageRatio > wrapperRatio) {
          renderedWidth = wrapperWidth;
          renderedHeight = wrapperWidth / imageRatio;
        } else {
          renderedHeight = wrapperHeight;
          renderedWidth = wrapperHeight * imageRatio;
        }
      } else if (fit === 'none') {
        renderedWidth = Math.min(naturalWidth, wrapperWidth);
        renderedHeight = Math.min(naturalHeight, wrapperHeight);
      } else if (fit === 'scale-down') {
        const containWidth = imageRatio > wrapperRatio ? wrapperWidth : wrapperHeight * imageRatio;
        const containHeight = imageRatio > wrapperRatio ? wrapperWidth / imageRatio : wrapperHeight;
        renderedWidth = Math.min(naturalWidth, containWidth);
        renderedHeight = Math.min(naturalHeight, containHeight);
      }
      // For 'cover' and 'fill' we intentionally anchor to full wrapper.

      setImageFrame({
        left: Math.max((wrapperWidth - renderedWidth) / 2, 0),
        top: Math.max((wrapperHeight - renderedHeight) / 2, 0),
        width: renderedWidth,
        height: renderedHeight,
      });
    };

    resizeFrameRef.current = computeFrame;
    computeFrame();

    const observer = new ResizeObserver(computeFrame);
    observer.observe(wrapper);

    const img = wrapper.querySelector('img');
    if (img) {
      img.addEventListener('load', computeFrame);
    }

    return () => {
      observer.disconnect();
      if (img) {
        img.removeEventListener('load', computeFrame);
      }
    };
  }, [currentSrc, fill, className]);

  const handleImageError = (e) => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
    onError?.(e);
  };

  const wrapperStyle = fill
    ? { position: 'relative', width: '100%', height: '100%' }
    : { position: 'relative', display: 'inline-block', width: '100%', height: '100%' };

  const watermarkStyle = {
    position: 'absolute',
    zIndex: 10,
    pointerEvents: 'none',
    opacity: 0.7,
    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
    ...(watermarkPosition === 'center'
      ? {
          top: imageFrame.top + imageFrame.height / 2,
          left: imageFrame.left + imageFrame.width / 2,
          transform: 'translate(-50%, -50%)',
        }
      : watermarkPosition === 'bottom-left'
      ? {
          left: imageFrame.left + 12,
          bottom: Math.max(0, (imageFrame.top || 0) + 12),
        }
      : {
          right: Math.max(0, imageFrame.left + 12),
          bottom: Math.max(0, (imageFrame.top || 0) + 12),
        }),
  };

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <Image
        {...props}
        src={currentSrc}
        alt={alt || ''}
        fill={fill}
        className={className}
        onError={handleImageError}
        onLoad={(e) => {
          resizeFrameRef.current?.();
          props.onLoad?.(e);
        }}
      />
      {showWatermark && (
        <div style={watermarkStyle}>
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


