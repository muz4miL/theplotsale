/** Default hero/card image when CMS URL is missing or fails to load (allowed in next.config remotePatterns). */
export const LISTING_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

export function resolveListingImageSrc(src, fallback = LISTING_IMAGE_FALLBACK) {
  if (typeof src === 'string' && src.trim().length > 0) {
    return src.trim();
  }
  return fallback;
}
