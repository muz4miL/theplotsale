'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll breaks `position: fixed` (e.g. navbar) when a transformed
 * scroll root is involved — common on mobile + Chrome DevTools device mode still
 * reports a "fine" pointer. Skip on narrow viewports and touch-like environments.
 */
function shouldSkipLenis() {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(max-width: 1023px)').matches) return true;

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
    let rafId;
    const mq = window.matchMedia('(max-width: 1023px)');

    const teardown = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch {
          /* noop */
        }
        lenisRef.current = null;
      }
    };

    const setup = () => {
      teardown();

      if (shouldSkipLenis()) {
        return;
      }

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
      } catch (e) {
        console.warn('Lenis init skipped:', e?.message || e);
      }
    };

    setup();
    mq.addEventListener('change', setup);
    window.addEventListener('resize', setup);

    return () => {
      mq.removeEventListener('change', setup);
      window.removeEventListener('resize', setup);
      teardown();
    };
  }, []);

  return <>{children}</>;
}
