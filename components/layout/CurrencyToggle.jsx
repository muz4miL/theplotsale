'use client';

import { useDisplayCurrency } from '@/contexts/DisplayCurrencyContext';

export default function CurrencyToggle({ className = '' }) {
  const { displayCurrency, setDisplayCurrency } = useDisplayCurrency();

  return (
    <div
      role="group"
      aria-label="Display prices in pounds or Pakistani rupees (indicative conversion)"
      className={`inline-flex rounded-full border border-white/[0.12] bg-black/35 p-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] supports-[backdrop-filter]:backdrop-blur-md ${className}`}
    >
      <button
        type="button"
        onClick={() => setDisplayCurrency('GBP')}
        className={`rounded-full px-2.5 py-1.5 font-[family-name:var(--font-manrope)] text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 xl:px-3 xl:text-[0.65rem] ${
          displayCurrency === 'GBP'
            ? 'bg-[#C5A880]/20 text-[#f5f0e6] ring-1 ring-[#C5A880]/40'
            : 'text-white/55 hover:text-white/85'
        }`}
      >
        £ GBP
      </button>
      <button
        type="button"
        onClick={() => setDisplayCurrency('PKR')}
        className={`rounded-full px-2.5 py-1.5 font-[family-name:var(--font-manrope)] text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 xl:px-3 xl:text-[0.65rem] ${
          displayCurrency === 'PKR'
            ? 'bg-[#C5A880]/20 text-[#f5f0e6] ring-1 ring-[#C5A880]/40'
            : 'text-white/55 hover:text-white/85'
        }`}
      >
        Rs PKR
      </button>
    </div>
  );
}
