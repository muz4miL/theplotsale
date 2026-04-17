'use client';

import { useEffect, useRef, useState } from 'react';
import { useInViewOnce } from '@/hooks/useInViewOnce';

/**
 * Counts from 0 to `end` when scrolled into view. Respects reduced motion via CSS media query.
 * @param {number} end - The target number to count up to
 * @param {string} suffix - Optional suffix (e.g., '+', '%', ' sqft', 'K', 'M')
 * @param {string} prefix - Optional prefix (e.g., '£', '$', 'PKR ')
 * @param {number} decimals - Number of decimal places (default: 0)
 * @param {number} duration - Animation duration in milliseconds (default: 2200)
 * @param {string} className - Additional CSS classes
 */
export default function CountUpNumber({ 
  end, 
  suffix = '', 
  prefix = '', 
  decimals = 0,
  duration = 2200,
  className = '' 
}) {
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

    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - (1 - t) ** 3;
      const current = eased * end;
      setDisplay(decimals > 0 ? current : Math.round(current));
      if (t < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isInView, end, duration, decimals]);

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.round(num).toLocaleString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(display)}{suffix}
    </span>
  );
}
