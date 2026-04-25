'use client';

import { useEffect, useRef } from 'react';

export default function LuxuryCursor() {
  const mainRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const trail = trailRef.current;
    if (!main || !trail) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      main.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animate = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    const id = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      <div
        ref={mainRef}
        className="fixed top-0 left-0 z-[200] h-[10px] w-[10px] rounded-full bg-[#C5A880] pointer-events-none mix-blend-difference hidden lg:block"
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[199] h-[40px] w-[40px] rounded-full border border-[#C5A880]/40 pointer-events-none hidden lg:block transition-[width,height] duration-300"
      />
    </>
  );
}