'use client';

/**
 * Lenis was disabled site-wide: with React 19 + client navigations it could contribute
 * to DOM/reconciliation timing issues alongside animated sections. Native scroll only.
 */
export default function SmoothScroll({ children }) {
  return <>{children}</>;
}
