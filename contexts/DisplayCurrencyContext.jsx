'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DISPLAY_CURRENCY_STORAGE_KEY,
  formatPriceForDisplay,
} from '@/lib/display-currency';

/** @typedef {'GBP' | 'PKR'} DisplayCurrency */

const DisplayCurrencyContext = createContext(null);

export function DisplayCurrencyProvider({ children }) {
  const [displayCurrency, setDisplayCurrencyState] = useState(
    /** @type {DisplayCurrency} */ ('GBP')
  );

  useEffect(() => {
    try {
      const v = localStorage.getItem(DISPLAY_CURRENCY_STORAGE_KEY);
      if (v === 'GBP' || v === 'PKR') setDisplayCurrencyState(v);
    } catch {
      /* ignore */
    }
  }, []);

  const setDisplayCurrency = useCallback((next) => {
    const v = next === 'PKR' ? 'PKR' : 'GBP';
    setDisplayCurrencyState(v);
    try {
      localStorage.setItem(DISPLAY_CURRENCY_STORAGE_KEY, v);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleDisplayCurrency = useCallback(() => {
    setDisplayCurrencyState((prev) => {
      const n = prev === 'GBP' ? 'PKR' : 'GBP';
      try {
        localStorage.setItem(DISPLAY_CURRENCY_STORAGE_KEY, n);
      } catch {
        /* ignore */
      }
      return n;
    });
  }, []);

  const formatPrice = useCallback(
    (amount, nativeCurrency = 'GBP') => {
      return formatPriceForDisplay(amount, nativeCurrency, displayCurrency);
    },
    [displayCurrency]
  );

  const value = useMemo(
    () => ({
      displayCurrency,
      setDisplayCurrency,
      toggleDisplayCurrency,
      formatPrice,
    }),
    [displayCurrency, formatPrice, setDisplayCurrency, toggleDisplayCurrency]
  );

  return (
    <DisplayCurrencyContext.Provider value={value}>
      {children}
    </DisplayCurrencyContext.Provider>
  );
}

/** Fallback for SSR / prerender edge cases (must match provider shape). */
const FALLBACK_DISPLAY_CURRENCY = /** @type {const} */ ('GBP');

export function useDisplayCurrency() {
  const ctx = useContext(DisplayCurrencyContext);
  if (!ctx) {
    return {
      displayCurrency: FALLBACK_DISPLAY_CURRENCY,
      setDisplayCurrency: () => {},
      toggleDisplayCurrency: () => {},
      formatPrice: (amount, nativeCurrency = 'GBP') =>
        formatPriceForDisplay(amount, nativeCurrency, FALLBACK_DISPLAY_CURRENCY),
    };
  }
  return ctx;
}
