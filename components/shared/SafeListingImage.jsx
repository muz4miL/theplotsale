'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LISTING_IMAGE_FALLBACK, resolveListingImageSrc } from '@/lib/listing-images';
import { getWatermarkedImageUrl, isExternalUrl } from '@/lib/watermark-helper';

/**
 * Next/Image wrapper with server-side watermark burning
 * 
 * Features:
 * - Never leaves a blank tile — invalid src resolves to fallback
 * - Load errors swap to fallback
 * - External images use server-side watermark API (burned into image for downloads)
 * - Local/internal images use CSS overlay watermark (fallback)
 * - Performance optimized with caching
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
  useServerWatermark = true, // New option to enable/disable server watermarking
  ...props
}) {
  const resolvedSrc = resolveListingImageSrc(src, fallback);
  const isExternal = isExternalUrl(resolvedSrc);
  
  // Use server watermark API for external images if enabled
  const imageUrl = useServerWatermark && isExternal && showWatermark
    ? getWatermarkedImageUrl(resolvedSrc, {
        size: watermarkSize,
        position: watermarkPosition,
        format: 'jpeg',
        filename: 'theplotsale-image.jpg',
      })
    : resolvedSrc;

  const [currentSrc, setCurrentSrc] = useState(() => imageUrl);
  const [imageFrame, setImageFrame] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isFrameReady, setIsFrameReady] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showCssWatermark, setShowCssWatermark] = useState(false); // Only show CSS watermark for local images
  const wrapperRef = useRef(null);
  const resizeFrameRef = useRef(() => {});
  const isWatermarkApiSrc =
    typeof currentSrc === 'string' && currentSrc.startsWith('/api/download-image?');

  useEffect(() => {
    const newUrl = useServerWatermark && isExternalUrl(resolvedSrc) && showWatermark
      ? getWatermarkedImageUrl(resolvedSrc, {
          size: watermarkSize,
          position: watermarkPosition,
          format: 'jpeg',
          filename: 'theplotsale-image.jpg',
        })
      : resolvedSrc;

    setCurrentSrc(newUrl);
    setShowCssWatermark(!isExternal || !useServerWatermark); // Show CSS watermark only for local images
    setIsFrameReady(false);
    setIsImageLoaded(false);
  }, [resolvedSrc, useServerWatermark, isExternal, showWatermark, watermarkSize, watermarkPosition]);

  useEffect(() => {
    if (!isWatermarkApiSrc || isImageLoaded) return undefined;

    // Avoid an endless blank hero if remote fetch hangs in dev/prod.
    const timeoutId = window.setTimeout(() => {
      setCurrentSrc(resolvedSrc);
      setShowCssWatermark(true);
    }, 6500);

    return () => window.clearTimeout(timeoutId);
  }, [isWatermarkApiSrc, isImageLoaded, resolvedSrc]);

  // Watermark size
  const sizeMap = {
    small: 95,
    medium: 160,
    large: 230,
    fullscreen: 400,
  };
  const baseLogoSize = sizeMap[watermarkSize] || 160;
  const frameScaleMap = {
    small: 0.12,
    medium: 0.2,
    large: 0.26,
    fullscreen: 0.5,
  };
  const maxSizeMap = {
    small: 180,
    medium: 320,
    large: 520,
    fullscreen: 1000,
  };
  const frameAwareSize = imageFrame.width
    ? imageFrame.width * (frameScaleMap[watermarkSize] || 0.2)
    : baseLogoSize;
  const logoSize = Math.round(
    isFrameReady
      ? Math.min(Math.max(baseLogoSize, frameAwareSize), maxSizeMap[watermarkSize] || 320)
      : baseLogoSize
  );

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const computeFrame = () => {
      const img = wrapper.querySelector('img[data-safe-listing-main-image="true"]');
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
      setIsFrameReady(renderedWidth > 0 && renderedHeight > 0);
    };

    resizeFrameRef.current = computeFrame;
    computeFrame();

    const observer = new ResizeObserver(computeFrame);
    observer.observe(wrapper);

    const img = wrapper.querySelector('img[data-safe-listing-main-image="true"]');
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
    if (isWatermarkApiSrc && currentSrc !== resolvedSrc) {
      // If watermark API fails, try the original source directly before final fallback.
      setCurrentSrc(resolvedSrc);
      setShowCssWatermark(true);
      onError?.(e);
      return;
    }

    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
    setShowCssWatermark(true);
    onError?.(e);
  };

  const shouldBypassOptimization =
    props.unoptimized || isWatermarkApiSrc || isExternalUrl(currentSrc);

  const wrapperStyle = fill
    ? { position: 'relative', width: '100%', height: '100%' }
    : { position: 'relative', display: 'inline-block', width: '100%', height: '100%' };

  const watermarkStyle = {
    position: 'absolute',
    zIndex: 60,
    pointerEvents: 'none',
    opacity: isFrameReady ? 0.7 : 0,
    transition: 'opacity 160ms ease-out',
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
        unoptimized={shouldBypassOptimization}
        data-safe-listing-main-image="true"
        className={className}
        onError={handleImageError}
        onLoad={(e) => {
          setIsImageLoaded(true);
          resizeFrameRef.current?.();
          props.onLoad?.(e);
        }}
      />
      {showCssWatermark && showWatermark && (
        <div style={watermarkStyle}>
          <img src="/newLogo2.png" alt="" style={{ width: logoSize, height: 'auto', display: 'block' }} />
        </div>
      )}
    </div>
  );
}


