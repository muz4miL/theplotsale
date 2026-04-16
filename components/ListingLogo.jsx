'use client';

import { useState } from 'react';
import Image from 'next/image';

function initialsFromName(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'LG';
}

export default function ListingLogo({ src, name, className = 'h-12 w-12', imageClassName = 'p-1.5' }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className={`flex items-center justify-center rounded-xl border border-[#C5A880]/25 bg-black/40 ${className}`}>
        <span className="text-xs font-semibold tracking-[0.15em] text-[#DCC39E]">{initialsFromName(name)}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#C5A880]/25 bg-black/30 ${className}`}>
      <Image
        src={src}
        alt={`${name} logo`}
        fill
        className={`object-contain ${imageClassName}`}
        sizes="80px"
        onError={() => setBroken(true)}
      />
    </div>
  );
}
