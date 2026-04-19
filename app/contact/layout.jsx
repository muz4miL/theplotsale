import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact · Concierge Private Client Desk',
  description:
    'Speak with our concierge private client desk in London or Lahore. A discreet line for acquisitions, developments and cross-border mandates. WhatsApp, email and on-site visits — we respond with clarity, not noise.',
  path: '/contact',
  keywords: [
    'ThePlotSale contact',
    'real estate consultant Lahore contact',
    'real estate consultant London contact',
    'Etihad Town Lahore office',
    'Hounslow property consultant',
    'real estate concierge Pakistan',
  ],
});

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      {children}
    </>
  );
}
