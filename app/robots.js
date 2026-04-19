import { SITE_URL } from '@/lib/seo';

/**
 * /robots.txt — lets crawlers in on every public route and points them at
 * the dynamic sitemap. Admin and API are blocked from indexing.
 */

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/admin',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
