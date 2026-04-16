/**
 * Extract a leading numeric value from free-text area strings (e.g. "1,620 sq. ft.", "500 Kanal").
 * Returns null if no number is found.
 */
export function parseAreaForStat(totalArea) {
  if (totalArea == null || typeof totalArea !== 'string') return null;
  const trimmed = totalArea.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/([\d][\d,]*(?:\.\d+)?)/);
  if (!match) return null;

  const raw = match[1].replace(/,/g, '');
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return null;

  const suffix = trimmed.slice(match.index + match[1].length).trim() || '';

  return {
    value: Math.round(value),
    suffix,
    original: trimmed,
  };
}
