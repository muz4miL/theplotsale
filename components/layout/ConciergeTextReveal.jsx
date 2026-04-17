'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Staggered reveal for concierge copy. Children should mark animatable blocks with data-concierge-reveal.
 */
export default function ConciergeTextReveal({ children, className = '' }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (reduce) return;

      const nodes = root.current.querySelectorAll('[data-concierge-reveal]');
      if (!nodes.length) return;

      gsap.set(nodes, { opacity: 0, y: 22, filter: 'blur(6px)' });

      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.08,
        clearProps: 'filter',
      });
    },
    { scope: root, dependencies: [] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
