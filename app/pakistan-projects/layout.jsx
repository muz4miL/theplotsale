import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pakistan Projects — Luxury Plots & Master-Planned Developments',
  description:
    'Current, upcoming and completed projects across Lahore, Islamabad, Murree and Sialkot. Luxury residential plots, gated communities and master-planned developments — sourced, vetted and brokered by ThePlotSale.',
  path: '/pakistan-projects',
  keywords: [
    'plots for sale Lahore',
    'plots for sale Pakistan',
    'Etihad Town plots',
    'DHA plots for sale',
    'Bahria Town plots for sale',
    'master planned community Pakistan',
    'residential projects Lahore',
    'real estate projects Pakistan',
    'luxury plots Pakistan',
  ],
});

export default function PakistanProjectsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Pakistan Projects', path: '/pakistan-projects' },
        ])}
      />
      {children}
    </>
  );
}
