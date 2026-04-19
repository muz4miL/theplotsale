import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Property from '@/models/Property';
import { SITE_URL } from '@/lib/seo';

/**
 * Generates a live sitemap.xml at /sitemap.xml — Google reads this to
 * discover every published project and property the CMS currently holds.
 *
 * Revalidates hourly so new CMS entries appear without a redeploy.
 * If the DB is unreachable we still ship the static routes so Search Console
 * never ends up 500ing (which silently demotes the whole site).
 */

export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pakistan-projects', changeFrequency: 'daily', priority: 0.9 },
  { path: '/uk-properties', changeFrequency: 'daily', priority: 0.9 },
];

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let projectEntries = [];
  let propertyEntries = [];

  try {
    await connectDB();

    const [projects, properties] = await Promise.all([
      Project.find({}, 'slug updatedAt').lean(),
      Property.find({}, 'slug updatedAt').lean(),
    ]);

    projectEntries = projects.map((p) => ({
      url: `${SITE_URL}/pakistan-projects/${p.slug}`,
      lastModified: p.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

    propertyEntries = properties.map((p) => ({
      url: `${SITE_URL}/uk-properties/${p.slug}`,
      lastModified: p.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));
  } catch (err) {
    console.error('[sitemap] DB fetch failed, serving static routes only:', err?.message);
  }

  return [...staticEntries, ...projectEntries, ...propertyEntries];
}
