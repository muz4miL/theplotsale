/**
 * Central SEO / brand identity config.
 *
 * Every page in the app pulls its title, description, canonical, OG + Twitter
 * cards and JSON-LD from this file so the entity shape Google indexes is
 * consistent — which is how you out-rank generic classified portals like
 * zameen.com on *intent* keywords (brand + location + asset class).
 *
 * Set NEXT_PUBLIC_SITE_URL in your deploy environment to your real domain
 * (e.g. https://theplotsale.com). Everything else derives from it.
 */

import { officeMapSites } from './office-locations';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://theplotsale.com'
).replace(/\/$/, '');

export const BRAND = {
  name: 'ThePlotSale',
  legalName: 'The Plot Sale',
  tagline: 'Cultivating Futures — London & Lahore Real Estate Consultancy',
  description:
    'ThePlotSale is a premier cross-border real estate consultancy established in 1998. Luxury residential plots, master-planned developments and investment-grade properties across Pakistan and the United Kingdom — advised end-to-end from London and Lahore.',
  shortDescription:
    'Luxury real estate consultancy — residential plots, land acquisition and investment properties across Pakistan & the UK. Est. 1998.',
  logo: `${SITE_URL}/newLogo2.png`,
  ogImage: `${SITE_URL}/lifestyle-hero.png`,
  email: 'contact@theplotsale.com',
  whatsapp: '+92 321 1222999',
  twitterHandle: '@theplotsale',
  foundingYear: 1998,
  keywords: [
    'real estate Pakistan',
    'real estate UK',
    'luxury properties Lahore',
    'plots for sale Lahore',
    'plots for sale Islamabad',
    'real estate investment Pakistan',
    'overseas Pakistani property',
    'London real estate consultancy',
    'Hounslow property',
    'Etihad Town Lahore',
    'DHA Lahore plots',
    'Bahria Town plots',
    'land acquisition Pakistan',
    'master planned community Pakistan',
    'property investment UK Pakistan',
    'ThePlotSale',
    'The Plot Sale',
  ],
};

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/**
 * Default metadata used by the root layout. Per-route metadata extends this
 * via `title: { default, template }` + route-specific openGraph/twitter.
 */
export const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.legalName} · ${BRAND.tagline}`,
    template: `%s · ${BRAND.legalName}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  keywords: BRAND.keywords,
  authors: [{ name: BRAND.legalName, url: SITE_URL }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  category: 'Real Estate',
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
      'en-PK': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['en_PK'],
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name} · ${BRAND.tagline}`,
    description: BRAND.description,
    images: [
      {
        url: BRAND.ogImage,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — Luxury Real Estate Consultancy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} · ${BRAND.tagline}`,
    description: BRAND.shortDescription,
    site: BRAND.twitterHandle,
    creator: BRAND.twitterHandle,
    images: [BRAND.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
    shortcut: '/logo/favicon.ico',
    apple: '/logo/apple-touch-icon.png',
  },
  manifest: '/logo/site.webmanifest',
  verification: {
    // Fill these in from Search Console / Bing Webmaster once the domain is live.
    // google: 'GOOGLE_SITE_VERIFICATION_CODE',
    // other: { 'msvalidate.01': 'BING_VERIFICATION_CODE' },
  },
};

/**
 * Factory for per-page metadata. Pass what's unique; inherit the rest.
 * Using this keeps OG/Twitter in sync with <title> without copy-paste.
 */
export function pageMetadata({
  title,
  description,
  path = '/',
  image,
  noindex = false,
  type = 'website',
  keywords,
} = {}) {
  const canonical = absoluteUrl(path);
  const desc = description || BRAND.description;
  const img = image || BRAND.ogImage;

  return {
    title,
    description: desc,
    keywords: keywords || BRAND.keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: canonical,
      siteName: BRAND.name,
      title: title ? `${title} · ${BRAND.name}` : `${BRAND.name} · ${BRAND.tagline}`,
      description: desc,
      images: [{ url: img, width: 1200, height: 630, alt: title || BRAND.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} · ${BRAND.name}` : `${BRAND.name}`,
      description: desc,
      images: [img],
    },
    robots: noindex
      ? { index: false, follow: false }
      : undefined,
  };
}

/* ──────────────────────────────────────────────────────────────────────────
 * JSON-LD builders — consumed by <JsonLd> in layouts & detail pages.
 * Entity graph:
 *   Organization (RealEstateAgent) ──┐
 *                                    ├── WebSite (SearchAction)
 *   LocalBusiness x2 (London, Lahore)┘
 *
 * Listing pages add Product / Residence / RealEstateListing nodes.
 * Detail breadcrumbs added via breadcrumbLd().
 * ──────────────────────────────────────────────────────────────────────── */

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'RealEstateAgent'],
    '@id': `${SITE_URL}#organization`,
    name: BRAND.legalName,
    alternateName: BRAND.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BRAND.logo,
      width: 512,
      height: 512,
    },
    image: BRAND.ogImage,
    description: BRAND.description,
    foundingDate: String(BRAND.foundingYear),
    email: BRAND.email,
    telephone: BRAND.whatsapp,
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    knowsAbout: [
      'Luxury Real Estate',
      'Residential Plots',
      'Land Acquisition',
      'Master-Planned Developments',
      'Cross-border Property Investment',
      'Overseas Pakistani Real Estate',
    ],
    sameAs: [
      'https://www.instagram.com/theplotsale',
      'https://www.facebook.com/theplotsale',
      `https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, '')}`,
    ],
    contactPoint: officeMapSites.map((o) => ({
      '@type': 'ContactPoint',
      contactType: `${o.city} · Sales`,
      telephone: o.phone,
      email: BRAND.email,
      areaServed: o.region,
      availableLanguage: ['en', 'ur'],
    })),
  };
}

export function localBusinessesLd() {
  return officeMapSites.map((o) => ({
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    '@id': `${SITE_URL}#office-${o.key}`,
    name: `${BRAND.name} — ${o.city}`,
    parentOrganization: { '@id': `${SITE_URL}#organization` },
    url: SITE_URL,
    image: BRAND.ogImage,
    logo: BRAND.logo,
    priceRange: '$$$$',
    telephone: o.phone,
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.address,
      addressLocality: o.city.replace(' Office', ''),
      addressCountry: o.region === 'Pakistan' ? 'PK' : 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: o.lat,
      longitude: o.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    areaServed: o.region,
  }));
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: BRAND.name,
    description: BRAND.description,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/uk-properties?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** Product / RealEstateListing for a UK property (uk-properties/[slug]). */
export function propertyListingLd(property, slug) {
  if (!property) return null;
  const url = absoluteUrl(`/uk-properties/${slug}`);
  const images = []
    .concat(property.mainImage ? [property.mainImage] : [])
    .concat(Array.isArray(property.galleryImages) ? property.galleryImages : [])
    .filter(Boolean)
    .slice(0, 8);

  const offer =
    typeof property.price === 'number' && property.price > 0
      ? {
          '@type': 'Offer',
          price: property.price,
          priceCurrency: property.currency || 'GBP',
          availability: 'https://schema.org/InStock',
          url,
          seller: { '@id': `${SITE_URL}#organization` },
        }
      : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Residence'],
    '@id': `${url}#listing`,
    name: property.title,
    description:
      property.description ||
      `${property.title} in ${property.location} — represented by ${BRAND.name}.`,
    url,
    image: images.length ? images : [BRAND.ogImage],
    brand: { '@id': `${SITE_URL}#organization` },
    category: 'Residential Real Estate',
    additionalProperty: [
      property.beds != null && {
        '@type': 'PropertyValue',
        name: 'Bedrooms',
        value: property.beds,
      },
      property.baths != null && {
        '@type': 'PropertyValue',
        name: 'Bathrooms',
        value: property.baths,
      },
      property.areaSqFt != null && {
        '@type': 'PropertyValue',
        name: 'Internal Area (sq ft)',
        value: property.areaSqFt,
      },
      property.location && {
        '@type': 'PropertyValue',
        name: 'Location',
        value: property.location,
      },
    ].filter(Boolean),
    offers: offer,
  };
}

/** Project schema for pakistan-projects/[slug] — a development, not a single residence. */
export function projectLd(project, slug) {
  if (!project) return null;
  const url = absoluteUrl(`/pakistan-projects/${slug}`);
  const images = []
    .concat(project.mainImage ? [project.mainImage] : [])
    .concat(Array.isArray(project.galleryMedia) ? project.galleryMedia : [])
    .filter(Boolean)
    .slice(0, 8);

  return {
    '@context': 'https://schema.org',
    '@type': ['Place', 'ApartmentComplex'],
    '@id': `${url}#project`,
    name: project.title,
    description:
      project.description ||
      `${project.title} — a ${project.status?.toLowerCase() || 'flagship'} development in ${project.location}, brokered by ${BRAND.name}.`,
    url,
    image: images.length ? images : [BRAND.ogImage],
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location,
      addressCountry: 'PK',
    },
    brand: { '@id': `${SITE_URL}#organization` },
    additionalProperty: [
      project.totalArea && {
        '@type': 'PropertyValue',
        name: 'Total Area',
        value: project.totalArea,
      },
      project.status && {
        '@type': 'PropertyValue',
        name: 'Status',
        value: project.status,
      },
      project.paymentPlan && {
        '@type': 'PropertyValue',
        name: 'Payment Plan',
        value: project.paymentPlan,
      },
    ].filter(Boolean),
  };
}
