'use client';

import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import { LuxuryGlobalAmbient } from '@/components/shared/LuxuryMotionAccents';

export default function PublicChrome({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  return (
    <SmoothScroll>
      <ScrollToTop />
      <Preloader />
      <Navbar />
      <LuxuryGlobalAmbient />
      <main className="relative z-10 min-w-0 overflow-x-clip">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
