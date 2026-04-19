import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us — 25+ Years Cultivating Futures',
  description:
    'Established 1998. ThePlotSale is a cross-border real estate consultancy with offices in London and Lahore, trusted for luxury residential plots, master-planned developments and investment-grade properties. Meet the team and philosophy behind the brand.',
  path: '/about',
  keywords: [
    'ThePlotSale about',
    'real estate consultancy Lahore London',
    'luxury real estate agency Pakistan UK',
    'ThePlotSale team',
    'real estate since 1998',
  ],
});

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      {children}
    </>
  );
}
