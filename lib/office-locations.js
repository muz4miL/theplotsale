/** Shared office map data (home + contact). Peshawar removed per site direction. */

export const officeMapSites = [
  {
    key: 'lahore',
    city: 'Lahore Office',
    region: 'Pakistan',
    address: 'DHA Phase 6, Main Boulevard, Lahore',
    mapsQuery: 'DHA Phase 6 Main Boulevard Lahore Pakistan',
  },
  {
    key: 'uk',
    city: 'UK Desk',
    region: 'United Kingdom',
    address: 'London Service Area (By Appointment)',
    mapsQuery: 'London United Kingdom',
  },
];

export function mapEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapOpenUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
