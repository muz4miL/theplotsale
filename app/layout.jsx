import { Playfair_Display, Manrope } from 'next/font/google';
import PublicChrome from '@/components/layout/PublicChrome';
import { DisplayCurrencyProvider } from '@/contexts/DisplayCurrencyContext';
import LuxuryCursor from '@/components/shared/LuxuryCursor';
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

export const metadata = baseMetadata;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  const globalLd = [organizationLd(), websiteLd(), ...localBusinessesLd()];

  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="bg-[#030706] text-white cursor-none lg:cursor-none antialiased selection:bg-[#C5A880]/35 selection:text-white">
        <LuxuryCursor />
        <DisplayCurrencyProvider>
          <div className="animate-[pageEntry_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards]">
            <PublicChrome>{children}</PublicChrome>
          </div>
        </DisplayCurrencyProvider>
        {/* Noise overlay — z-0 so it can NEVER compete with UI */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.026] max-md:opacity-[0.014]"
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