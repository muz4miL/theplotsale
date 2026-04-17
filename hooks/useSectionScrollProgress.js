'use client';

import { useEffect, useState } from 'react';

/** Linear interpolation between breakpoints (piecewise, like Framer useTransform). */
export function lerpBreakpoints(p, xs, ys) {
  if (!xs?.length || xs.length !== ys.length) return 0;
  if (p <= xs[0]) return ys[0];
  for (let i = 0; i < xs.length - 1; i += 1) {
    if (p <= xs[i + 1]) {
      const span = xs[i + 1] - xs[i] || 1;
      const t = (p - xs[i]) / span;
      return ys[i] + t * (ys[i + 1] - ys[i]);
    }
  }
  return ys[ys.length - 1];
}

/**
 * Scroll progress 0→1 while the element crosses the viewport (same feel as Framer
 * useScroll offset ["start end", "end start"] on the scroll root).
 */
export function useSectionScrollProgress(surfaceRef) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = surfaceRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = typeof window !== 'undefined' ? window.innerHeight || 1 : 1;
      const range = vh + rect.height;
      const scrolled = vh - rect.top;
      setP(Math.max(0, Math.min(1, scrolled / Math.max(1, range))));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [surfaceRef]);

  return p;
}

/**
 * Scroll progress 0→1 **locked to the sticky pin range** of a tall section.
 *
 * For a section of height H that contains a `position: sticky; top: 0; h-screen`
 * child, the child stays pinned while the scroll travels (H - vh). This hook returns
 *   0 at the moment pinning starts (section top hits viewport top)
 *   1 at the moment pinning ends   (section bottom hits viewport bottom)
 *
 * Use this (not the viewport-crossing progress) to drive horizontal scroll tracks
 * inside a pinned section — otherwise the animation keeps running after the sticky
 * child has already released, producing a "last card cut off / next section bleeds
 * in underneath" feel.
 */
export function useStickyPinProgress(surfaceRef) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = surfaceRef.current;
      if (!el) return;
      const vh = typeof window !== 'undefined' ? window.innerHeight || 1 : 1;
      const rect = el.getBoundingClientRect();
      const pinTravel = Math.max(1, rect.height - vh);
      const raw = -rect.top / pinTravel;
      setP(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [surfaceRef]);

  return p;
}
