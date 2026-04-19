import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'UK Properties — London, Hounslow & Greater London Homes',
  description:
    'Handpicked London and Greater London homes — Hounslow, Isleworth, Feltham and beyond. 2-bed flats to 4-bed semi-detached houses, curated by ThePlotSale for overseas Pakistani investors and UK homebuyers.',
  path: '/uk-properties',
  keywords: [
    'property for sale London',
    'houses for sale Hounslow',
    'flats for sale London',
    'London property for overseas investors',
    'Pakistani real estate agent London',
    'Hounslow 2 bed flat',
    'Isleworth semi detached',
    'buy property London from Pakistan',
  ],
});

export default function UkPropertiesLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'UK Properties', path: '/uk-properties' },
        ])}
      />
      {children}
    </>
  );
}
