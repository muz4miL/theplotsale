'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

function shouldSkipLenis() {
  if (typeof window === 'undefined') return true;
  // Touch / coarse pointer: native scroll avoids Lenis crashes on iOS Safari and keeps UX natural.
  const coarse =
    window.matchMedia?.('(pointer: coarse)').matches ||
    window.matchMedia?.('(hover: none)').matches ||
    'ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
  return Boolean(coarse);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (shouldSkipLenis()) {
      return undefined;
    }

    let rafId;
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (e) {
      console.warn('Lenis init skipped:', e?.message || e);
      return undefined;
    }
  }, []);

  return <>{children}</>;
}
