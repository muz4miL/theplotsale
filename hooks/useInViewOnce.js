'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based visibility — no Framer Motion (React 19 DOM safety).
 * @param {{ once?: boolean; threshold?: number | number[]; rootMargin?: string }} [opts]
 * @returns {[React.RefObject<HTMLElement | null>, boolean]}
 */
export function useInViewOnce(opts = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { once = true, threshold = 0.15, rootMargin = '0px' } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
