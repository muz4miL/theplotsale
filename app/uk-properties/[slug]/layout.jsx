import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbLd, propertyListingLd, BRAND } from '@/lib/seo';

/**
 * Dynamic metadata + JSON-LD for a single UK property page.
 * Fetched at request-time from Mongo so the OG card, <title> and the
 * schema.org Product node always reflect the current CMS state.
 */

export const dynamic = 'force-dynamic';

async function fetchProperty(slug) {
  try {
    await connectDB();
    const doc = await Property.findOne({ slug: slug.toLowerCase() }).lean();
    return doc;
  } catch {
    return null;
  }
}

function formatPriceLine(property) {
  if (typeof property.price !== 'number' || property.price <= 0) return '';
  const cur = property.currency === 'PKR' ? 'Rs' : '£';
  return ` · ${cur}${property.price.toLocaleString('en-GB')}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = await fetchProperty(slug);

  if (!property) {
    return pageMetadata({
      title: 'Property Not Found',
      description: 'This property is no longer available.',
      path: `/uk-properties/${slug}`,
      noindex: true,
    });
  }

  const bedBath = [
    property.beds != null ? `${property.beds} bed` : null,
    property.baths != null ? `${property.baths} bath` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const title = `${property.title} · ${property.location}${formatPriceLine(property)}`;
  const desc =
    (property.description && property.description.slice(0, 180)) ||
    `${property.title} — ${bedBath ? `${bedBath}, ` : ''}${
      property.location
    }. Represented for sale by ${BRAND.name}, London & Lahore.`;

  return pageMetadata({
    title,
    description: desc,
    path: `/uk-properties/${slug}`,
    image: property.mainImage || undefined,
    type: 'article',
    keywords: [
      property.title,
      `${property.location} property for sale`,
      `${property.location} homes`,
      property.beds ? `${property.beds} bedroom ${property.location}` : null,
      'London property',
      'ThePlotSale UK',
    ].filter(Boolean),
  });
}

export default async function UkPropertySlugLayout({ children, params }) {
  const { slug } = await params;
  const property = await fetchProperty(slug);

  const ld = [
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'UK Properties', path: '/uk-properties' },
      { name: property?.title || 'Property', path: `/uk-properties/${slug}` },
    ]),
    property && propertyListingLd(JSON.parse(JSON.stringify(property)), slug),
  ];

  return (
    <>
      <JsonLd data={ld} />
      {children}
    </>
  );
}
