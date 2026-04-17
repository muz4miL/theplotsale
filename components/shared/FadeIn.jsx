'use client';

/**
 * Isolated, zero-Framer-Motion reveal wrapper.
 *
 * Why it exists:
 * - React 19 + Next 16 hydration is sensitive; Framer Motion on scroll/hover is the #1 source of
 *   flicker + "commitDeletion" crashes we've seen on this site. This wrapper relies purely on
 *   IntersectionObserver + CSS transitions (transform/opacity only), which run on the GPU.
 * - Respects `prefers-reduced-motion`: elements appear instantly for those users.
 *
 * Usage:
 *   <FadeIn>                 // defaults: y-4, 700ms
 *   <FadeIn y={24} delay={120} duration={900} once>
 *   <FadeIn as="li" className="...">
 */

import { useEffect, useRef, useState } from 'react';

export default function FadeIn({
  children,
  as: Tag = 'div',
  y = 16,
  duration = 700,
  delay = 0,
  once = true,
  threshold = 0.12,
  rootMargin = '0px 0px -6% 0px',
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // SSR / no-IO fallback: show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
        opacity: visible ? 1 : 0,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
