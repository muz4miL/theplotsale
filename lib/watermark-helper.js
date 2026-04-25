/**
 * Watermark Helper Utilities
 * 
 * Provides functions to transform image URLs to watermarked versions
 * Uses server-side watermarking for images that will be downloaded
 */

/**
 * Transform an image URL to use the watermark API
 * @param {string} imageUrl - Original image URL
 * @param {object} options - Configuration options
 * @param {string} options.size - Watermark size: 'small', 'medium', 'large'
 * @param {string} options.position - Watermark position: 'bottom-right', 'bottom-left', 'center', 'top-right', 'top-left'
 * @param {string} options.format - Output format: 'jpeg', 'png', 'webp'
 * @param {string} options.filename - Output filename
 * @returns {string} - URL to watermarked image endpoint
 */
export function getWatermarkedImageUrl(imageUrl, options = {}) {
  if (!imageUrl) return imageUrl;

  const {
    size = 'medium',
    position = 'bottom-right',
    format = 'jpeg',
    filename = 'image.jpg',
  } = options;

  // Build query string
  const params = new URLSearchParams({
    url: imageUrl,
    size,
    position,
    format,
    filename,
  });

  return `/api/download-image?${params.toString()}`;
}

/**
 * Check if an image is from Cloudinary
 * @param {string} url - Image URL
 * @returns {boolean}
 */
export function isCloudinaryImage(url) {
  if (!url || typeof url !== 'string') return false;
  return url.includes('res.cloudinary.com');
}

/**
 * Check if URL is external (not a local path)
 * @param {string} url - Image URL
 * @returns {boolean}
 */
export function isExternalUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Get the appropriate watermarked image URL for a given image
 * Automatically handles different image sources
 * @param {string} imageUrl - Image URL
 * @param {object} options - Configuration options
 * @returns {string} - Watermarked image URL (or original if local)
 */
export function getDisplayImageUrl(imageUrl, options = {}) {
  // For local images or falsy URLs, return as-is
  // (they'll use CSS watermark overlay)
  if (!imageUrl || !isExternalUrl(imageUrl)) {
    return imageUrl;
  }

  // For external images, use watermark API
  // This ensures watermark is burned-in for downloads
  return getWatermarkedImageUrl(imageUrl, {
    size: options.watermarkSize || 'medium',
    position: options.watermarkPosition || 'bottom-right',
    format: options.format || 'jpeg',
    filename: options.filename || 'image.jpg',
  });
}

/**
 * Generate a cache-busting query string
 * Useful for forcing fresh watermark processing
 * @returns {string} - Query string with timestamp
 */
export function getCacheBustingQuery() {
  return `_t=${Date.now()}`;
}

/**
 * Preload watermarked image (for performance)
 * @param {string} imageUrl - Original image URL
 * @param {object} options - Configuration options
 * @returns {Promise<void>}
 */
export async function preloadWatermarkedImage(imageUrl, options = {}) {
  try {
    const watermarkedUrl = getWatermarkedImageUrl(imageUrl, options);
    const img = new Image();
    img.src = watermarkedUrl;

    return new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to preload image'));
      // Timeout after 30 seconds
      setTimeout(() => reject(new Error('Preload timeout')), 30000);
    });
  } catch (err) {
    console.error('Preload error:', err);
    // Don't throw - preload is optional
  }
}

/**
 * Get multiple watermarked URLs
 * @param {array} imageUrls - Array of image URLs
 * @param {object} options - Configuration options
 * @returns {array} - Array of watermarked image URLs
 */
export function getWatermarkedImageUrls(imageUrls, options = {}) {
  if (!Array.isArray(imageUrls)) return [];
  return imageUrls.map(url => getWatermarkedImageUrl(url, options));
}
