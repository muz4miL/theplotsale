'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scrolls the window to the top on every client-side navigation (e.g. mobile drawer links).
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Defer past layout so we don’t fight React commit / Framer exit animations
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
