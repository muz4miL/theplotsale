// app/layout.jsx

import { Playfair_Display, Manrope } from 'next/font/google';
import PublicChrome from '@/components/layout/PublicChrome';
import { DisplayCurrencyProvider } from '@/contexts/DisplayCurrencyContext';
import JsonLd from '@/components/seo/JsonLd';
import {
  baseMetadata,
  organizationLd,
  localBusinessesLd,
  websiteLd,
} from '@/lib/seo';
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * Root metadata. Everything route-specific inherits from here via the
 * `title.template` pattern and the `pageMetadata()` factory in lib/seo.js.
 */
export const metadata = baseMetadata;

/** Notch / home-indicator aware layout; pairs with safe-area padding in chrome + sections */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  // Global JSON-LD graph: Organization + WebSite + both LocalBusiness offices.
  // Per-page schemas (BreadcrumbList, Product/Residence) are injected at the
  // route level on top of this — Google merges the graph correctly.
  const globalLd = [organizationLd(), websiteLd(), ...localBusinessesLd()];

  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        {/* Pre-warm the two biggest third-party origins we depend on for LCP. */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="antialiased selection:bg-[#C5A880]/35 selection:text-white">
        <DisplayCurrencyProvider>
          <PublicChrome>{children}</PublicChrome>
        </DisplayCurrencyProvider>
        {/* Premium Film Grain Noise Texture Overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.026] max-md:opacity-[0.014]"
          aria-hidden="true"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.80"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        <JsonLd data={globalLd} />
      </body>
    </html>
  );
}
