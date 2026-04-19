import { pageMetadata } from '@/lib/seo';

/**
 * /properties is a legacy alias — canonical lives at /uk-properties.
 */
export const metadata = pageMetadata({
  title: 'Properties — UK Homes by ThePlotSale',
  description:
    'Explore our UK property register — London and Greater London homes curated by ThePlotSale.',
  path: '/uk-properties',
});

export default function PropertiesLayout({ children }) {
  return children;
}
