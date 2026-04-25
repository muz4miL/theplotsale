import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * API: /api/download-image
 * 
 * Burns The Plot Sale watermark into any image and returns it.
 * Works with Cloudinary, external URLs, and local images.
 * Caches results for performance.
 * 
 * Query params:
 * - url: Image URL to watermark (REQUIRED, URL encoded)
 * - filename: Output filename (optional, default: image.jpg)
 * - size: Watermark size (small, medium, large - default: medium)
 * - position: Watermark position (bottom-right, bottom-left, center, top-right, top-left)
 * - format: Output format (jpeg, png, webp - default: jpeg)
 */

// In-memory cache for watermarked images (1 hour TTL)
const watermarkCache = new Map();

async function getWatermarkLogo() {
  try {
    const logoPath = join(process.cwd(), 'public', 'newLogo2.png');
    return await readFile(logoPath);
  } catch (err) {
    console.error('Watermark logo not found:', err.message);
    throw new Error('Watermark logo missing at /public/newLogo2.png');
  }
}

async function fetchImageBuffer(imageUrl) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; The Plot Sale)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Image fetch timed out after 10s');
    }
    console.error('Error fetching image:', err.message);
    throw new Error(`Failed to fetch image: ${err.message}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function burnWatermarkIntoImage(imageBuffer, watermarkBuffer, options = {}) {
  const {
    watermarkSize = 'medium',
    position = 'bottom-right',
    format = 'jpeg',
  } = options;

  // Size mappings
  const sizeMap = {
    small: 80,
    medium: 120,
    large: 160,
    fullscreen: 300,
  };
  const sizeScaleMap = {
    small: 0.05,
    medium: 0.08,
    large: 0.12,
    fullscreen: 0.2,
  };

  const watermarkPixelSize = sizeMap[watermarkSize] || sizeMap.medium;

  try {
    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error('Invalid image dimensions');
    }

    // Calculate watermark size relative to image
    const scaledSize = Math.max(
      watermarkPixelSize,
      Math.round(width * (sizeScaleMap[watermarkSize] || sizeScaleMap.medium))
    );

    // Resize watermark to fit image
    const resizedWatermark = await sharp(watermarkBuffer)
      .resize(scaledSize, scaledSize, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .png() // Ensure PNG for transparency support
      .toBuffer();

    // Calculate position
    const padding = Math.max(15, Math.round(width * 0.03)); // 3% padding or 15px
    let left = width - scaledSize - padding;
    let top = height - scaledSize - padding;

    switch (position) {
      case 'bottom-left':
        left = padding;
        break;
      case 'center':
        left = (width - scaledSize) / 2;
        top = (height - scaledSize) / 2;
        break;
      case 'top-right':
        top = padding;
        break;
      case 'top-left':
        left = padding;
        top = padding;
        break;
      case 'bottom-right':
      default:
        // Already set above
        break;
    }

    // Composite watermark onto image with opacity
    const watermarkedBuffer = await sharp(imageBuffer)
      .composite([
        {
          input: resizedWatermark,
          left: Math.round(left),
          top: Math.round(top),
          blend: 'over',
        },
      ])
      .toFormat(format, {
        mozjpeg: format === 'jpeg', // Use mozjpeg for better compression
        quality: 85,
      })
      .toBuffer();

    return watermarkedBuffer;
  } catch (err) {
    console.error('Error burning watermark:', err.message);
    throw new Error(`Watermark processing failed: ${err.message}`);
  }
}

function validateUrl(urlString) {
  try {
    const url = new URL(urlString);

    // Whitelist of allowed domains
    const allowedDomains = [
      'res.cloudinary.com', // Cloudinary
      'lid.zoocdn.com', // UK listing images
      'images.unsplash.com', // Fallback listing images
      'theplotsale.com',
      'www.theplotsale.com',
      'localhost',
      'localhost:3000',
    ];

    // Add Vercel domains if in production
    if (process.env.VERCEL_URL) {
      allowedDomains.push(process.env.VERCEL_URL);
      allowedDomains.push(`*.${process.env.VERCEL_URL}`);
    }

    // Check if hostname matches any allowed domain
    const hostname = url.hostname.toLowerCase();
    const isAllowed = allowedDomains.some(domain => {
      if (domain.startsWith('*.')) {
        return hostname.endsWith(domain.slice(1));
      }
      return hostname === domain || hostname.endsWith(`.${domain}`);
    });

    if (!isAllowed) {
      throw new Error(`Domain not whitelisted: ${hostname}`);
    }

    return url;
  } catch (err) {
    throw new Error(`Invalid URL: ${err.message}`);
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    const filename = searchParams.get('filename') || 'image.jpg';
    const size = searchParams.get('size') || 'medium';
    const position = searchParams.get('position') || 'bottom-right';
    const format = searchParams.get('format') || 'jpeg';

    // Validation
    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameter: url' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL
    validateUrl(imageUrl);

    // Check cache
    const cacheKey = `${imageUrl}:${size}:${position}:${format}`;
    if (watermarkCache.has(cacheKey)) {
      const { buffer, timestamp } = watermarkCache.get(cacheKey);
      // Cache valid for 1 hour
      if (Date.now() - timestamp < 3600000) {
        return new Response(buffer, {
          status: 200,
          headers: {
            'Content-Type': `image/${format === 'jpeg' ? 'jpeg' : format}`,
            'Content-Length': buffer.length,
            'Content-Disposition': `inline; filename="${filename}"`,
            'Cache-Control': 'public, max-age=3600',
            'X-Cache': 'HIT',
          },
        });
      } else {
        watermarkCache.delete(cacheKey);
      }
    }

    // Get watermark logo
    const watermarkLogo = await getWatermarkLogo();

    // Fetch image
    const imageBuffer = await fetchImageBuffer(imageUrl);

    // Burn watermark
    const watermarkedBuffer = await burnWatermarkIntoImage(imageBuffer, watermarkLogo, {
      watermarkSize: size,
      position,
      format,
    });

    // Cache result
    watermarkCache.set(cacheKey, {
      buffer: watermarkedBuffer,
      timestamp: Date.now(),
    });

    return new Response(watermarkedBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${format === 'jpeg' ? 'jpeg' : format}`,
        'Content-Length': watermarkedBuffer.length,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'MISS',
      },
    });
  } catch (err) {
    console.error('Download image error:', err);

    const statusCode = err.message.includes('Invalid') ? 400 : err.message.includes('not whitelisted') ? 403 : 500;

    return new Response(
      JSON.stringify({
        error: err.message || 'Internal server error',
        timestamp: new Date().toISOString(),
      }),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
