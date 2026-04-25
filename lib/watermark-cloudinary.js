/**
 * Cloudinary Watermark Utilities
 * 
 * Adds The Plot Sale logo watermark to Cloudinary images permanently
 * Watermark is burned into the image - cannot be removed
 */

/**
 * Add watermark transformation to Cloudinary URL
 * 
 * @param {string} cloudinaryUrl - Original Cloudinary image URL
 * @param {object} options - Watermark options
 * @returns {string} - Watermarked image URL
 */
export function addWatermarkToCloudinaryUrl(cloudinaryUrl, options = {}) {
  const {
    position = 'south_east', // south_east, south_west, center, north_east, north_west
    opacity = 70, // 0-100
    width = 120, // watermark width in pixels
    gravity = 'south_east',
    x = 20, // horizontal offset
    y = 20, // vertical offset
  } = options;

  // Check if it's a Cloudinary URL
  if (!cloudinaryUrl || !cloudinaryUrl.includes('cloudinary.com')) {
    return cloudinaryUrl;
  }

  // Extract the upload path
  const uploadIndex = cloudinaryUrl.indexOf('/upload/');
  if (uploadIndex === -1) return cloudinaryUrl;

  const baseUrl = cloudinaryUrl.substring(0, uploadIndex + 8);
  const imagePath = cloudinaryUrl.substring(uploadIndex + 8);

  // Watermark transformation string
  // l_newLogo2 = layer overlay with newLogo2.png from your Cloudinary account
  // w_120 = width 120px
  // o_70 = opacity 70%
  // g_south_east = gravity (position)
  // x_20,y_20 = offset from edge
  const watermarkTransform = `l_newLogo2,w_${width},o_${opacity},g_${gravity},x_${x},y_${y}/fl_layer_apply`;

  return `${baseUrl}${watermarkTransform}/${imagePath}`;
}

/**
 * Add watermark to multiple Cloudinary URLs
 */
export function addWatermarkToUrls(urls, options = {}) {
  if (!Array.isArray(urls)) return urls;
  return urls.map(url => addWatermarkToCloudinaryUrl(url, options));
}

/**
 * Check if URL is a Cloudinary image (not video)
 */
export function isCloudinaryImage(url) {
  if (!url || typeof url !== 'string') return false;
  return url.includes('cloudinary.com') && url.includes('/image/upload/');
}

/**
 * Check if URL is a Cloudinary video
 */
export function isCloudinaryVideo(url) {
  if (!url || typeof url !== 'string') return false;
  return url.includes('cloudinary.com') && url.includes('/video/upload/');
}

/**
 * Watermark configuration presets
 */
export const WATERMARK_PRESETS = {
  // Subtle watermark for property listings
  subtle: {
    opacity: 50,
    width: 100,
    gravity: 'south_east',
    x: 15,
    y: 15,
  },
  
  // Standard watermark for general use
  standard: {
    opacity: 70,
    width: 120,
    gravity: 'south_east',
    x: 20,
    y: 20,
  },
  
  // Prominent watermark for featured properties
  prominent: {
    opacity: 85,
    width: 150,
    gravity: 'south_east',
    x: 25,
    y: 25,
  },
  
  // Center watermark for hero images
  center: {
    opacity: 40,
    width: 200,
    gravity: 'center',
    x: 0,
    y: 0,
  },
};

/**
 * Example usage:
 * 
 * import { addWatermarkToCloudinaryUrl, WATERMARK_PRESETS } from '@/lib/watermark-cloudinary';
 * 
 * const watermarkedUrl = addWatermarkToCloudinaryUrl(
 *   'https://res.cloudinary.com/your-cloud/image/upload/v123/property.jpg',
 *   WATERMARK_PRESETS.standard
 * );
 */
