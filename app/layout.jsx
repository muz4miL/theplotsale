// app/layout.jsx

import { Playfair_Display, Manrope } from 'next/font/google';
import PublicChrome from '@/components/layout/PublicChrome';
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

// The metadata block now correctly follows the font definitions
export const metadata = {
  title: "The Plot Sale",
  description: "Premium real estate consultancy. Expert guidance for luxury property investments and land acquisitions.",
  keywords: "real estate, property investment, land acquisition, luxury properties, plot sale",

  // Logo and Favicon
  icons: {
    icon: '/newLogo.png',
    shortcut: '/newLogo.png',
    apple: '/newLogo.png',
  },
};

/** Notch / home-indicator aware layout; pairs with safe-area padding in chrome + sections */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="antialiased selection:bg-[#C5A880]/35 selection:text-white">
        <PublicChrome>{children}</PublicChrome>
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
      </body>
    </html>
  );
}