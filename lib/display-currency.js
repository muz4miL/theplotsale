/** Client + server: GBP ↔ PKR conversion for display (indicative; set rate in env). */

export const DISPLAY_CURRENCY_STORAGE_KEY = 'lavita-display-currency';

export function getGbpToPkrRate() {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GBP_TO_PKR_RATE) {
    const n = Number(process.env.NEXT_PUBLIC_GBP_TO_PKR_RATE);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 350;
}

/**
 * @param {number} amount
 * @param {'GBP' | 'PKR'} from
 * @param {'GBP' | 'PKR'} to
 */
export function convertBetweenCurrencies(amount, from, to) {
  const a = Number(amount);
  if (!Number.isFinite(a)) return 0;
  if (from === to) return a;
  const rate = getGbpToPkrRate();
  if (from === 'GBP' && to === 'PKR') return a * rate;
  if (from === 'PKR' && to === 'GBP') return a / rate;
  return a;
}

/**
 * @param {number} amount
 * @param {'GBP' | 'PKR'} currency
 */
export function formatMoneyAmount(amount, currency) {
  const c = currency === 'PKR' ? 'PKR' : 'GBP';
  return new Intl.NumberFormat(c === 'PKR' ? 'en-PK' : 'en-GB', {
    style: 'currency',
    currency: c,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * @param {number | null | undefined} amount
 * @param {'GBP' | 'PKR'} nativeCurrency — stored currency for this listing
 * @param {'GBP' | 'PKR'} displayCurrency — user preference
 */
export function formatPriceForDisplay(amount, nativeCurrency, displayCurrency) {
  if (amount === undefined || amount === null) return 'Price on request';
  const native = nativeCurrency === 'PKR' ? 'PKR' : 'GBP';
  const display = displayCurrency === 'PKR' ? 'PKR' : 'GBP';
  const converted = convertBetweenCurrencies(Number(amount), native, display);
  return formatMoneyAmount(converted, display);
}
