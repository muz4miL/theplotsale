/**
 * Built-in marquee brands shown on the homepage when the database has no active rows.
 * Keep this in sync with admin "seed defaults" so CRUD and the live marquee match expectations.
 *
 * These defaults now reflect the real ThePlotSale family of brands, using the logo
 * assets the client delivered (public/newLogo.png + public/images/*Logo*.png).
 * The admin portal can override / extend this list from MongoDB at any time.
 */
export const MARQUEE_DEFAULT_BRANDS = [
  {
    name: 'ThePlotSale',
    detail: 'Luxury Real Estate Advisory',
    logoUrl: '/newLogo.png',
  },
  {
    name: 'Union Developers',
    detail: 'Master-Planned Communities · Pakistan',
    logoUrl: '/images/UnionDevelopersLogo.png',
  },
  {
    name: 'Union Town',
    detail: 'Flagship Community · Sialkot',
    logoUrl: '/images/UnionTownLogo.png',
  },
  {
    name: 'Siddique Estates',
    detail: 'Family Heritage · London & Lahore',
    logoUrl: '/newLogo.png',
  },
  {
    name: 'Private Client Desk',
    detail: 'Cross-Border Investment Access',
    logoUrl: '',
  },
];
