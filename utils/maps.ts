"use client";

/**
 * Generates a valid Google Maps link based on latitude and longitude.
 * @param lat - Latitude coordinate
 * @param lng - Longitude coordinate
 * @param usePin - If true, forces Google Maps to place a search marker drop-pin at the exact spot.
 */
export function generateGoogleMapLink(lat: number, lng: number, usePin: boolean = true): string {
  if (usePin) {
    // Recommeneded: Opens map with a strict marker dropped right on the coordinates
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  // Alternative: Simply centers the map camera view over the position without an active pin marker
  return `https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lng}&zoom=15`;
}

export function generateGoogleMapLinkByAddress(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${address}`;
}

export function generateLinkForPhotoFromGoogleMapsByAddress(address: string) {
  // this should be photos, but google don't support this
  return `https://www.google.com/maps/place/${address}/photos/`;
}