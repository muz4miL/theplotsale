'use client';

import { useEffect, useRef, useState } from 'react';
import { useInViewOnce } from '@/hooks/useInViewOnce';

/**
 * Counts from 0 to `end` when scrolled into view. Respects reduced motion via CSS media query.
 */
export default function CountUpNumber({ end, className = '' }) {
  const [ref, isInView] = useInViewOnce({ threshold: 0.45, rootMargin: '0px' });
  const [display, setDisplay] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotionRef.current) {
      setDisplay(end);
      return;
    }

    const durationMs = 2200;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(eased * end));
      if (t < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isInView, end]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
    </span>
  );
}
