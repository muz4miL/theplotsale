/**
 * Shared office data for the map cards (home + contact).
 *
 * Coordinates are verified against the published office addresses:
 *  - Lahore:  Plot 2, Block C, Etihad Town, Main Raiwind Road, Lahore, 54000
 *             (Etihad Town Phase 1, Block C — south Raiwind Road corridor)
 *  - London:  Vista Centre, 50 Salisbury Road, Hounslow TW4 6JQ, Office A4-16
 *             (lat/lng pinpointed from the Vista Centre building itself)
 *
 * The embed URL uses the precise lat/lng with a near-street zoom so the pin
 * sits exactly on the building. The "Open in Google Maps" CTA launches the
 * DIRECTIONS intent, so one click from a visitor's phone/desktop starts
 * turn-by-turn navigation from their current location — zero typing.
 */

export const officeMapSites = [
  {
    key: 'lahore',
    city: 'Lahore Office',
    region: 'Pakistan',
    address: 'Plot 2, Block C, Etihad Town, Main Raiwind Road, Lahore 54000',
    phone: '+92 321 1222999',
    lat: 31.3867,
    lng: 74.1852,
    placeLabel: 'ThePlotSale · Etihad Town, Lahore',
  },
  {
    key: 'uk',
    city: 'London Office',
    region: 'United Kingdom',
    address: 'Vista Centre, 50 Salisbury Road, Office A4-16, Hounslow TW4 6JQ',
    phone: '+44 20 8538 0100',
    lat: 51.4703676,
    lng: -0.3978567,
    placeLabel: 'ThePlotSale · Vista Centre, Hounslow',
  },
];

/** Precise pinned embed — lat/lng + label, zoomed to building level. */
export function mapEmbedUrl(office) {
  if (!office) return '';
  const { lat, lng, placeLabel } = office;
  const q = `${lat},${lng}(${placeLabel || ''})`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=17&hl=en&output=embed`;
}

/**
 * Single-click → live directions from the visitor's current location.
 * Google Maps honours `dir_action=navigate` on mobile to jump straight
 * into turn-by-turn navigation in the native app.
 */
export function mapDirectionsUrl(office) {
  if (!office) return '';
  const { lat, lng } = office;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&dir_action=navigate`;
}

/** Kept for backwards compatibility with any old callers. */
export function mapOpenUrl(office) {
  return mapDirectionsUrl(office);
}
