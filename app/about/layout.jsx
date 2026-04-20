import ReactDOM from 'react-dom';
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
  /* Kick off the cinematic /About_Hero_Cinematic.mp4 fetch during SSR so the
     preload scanner starts it in parallel with JS/CSS. The module-scope
     ReactDOM.preload() inside AboutHero.jsx only fires after hydration, which
     is too late on cold loads — this closes that gap. */
  ReactDOM.preload('/About_Hero_Cinematic.mp4', { as: 'video', fetchPriority: 'high' });
  ReactDOM.preload('/images/architecture.png', { as: 'image', fetchPriority: 'high' });

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
