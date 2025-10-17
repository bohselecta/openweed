// Geographic utilities for OpenWeed

export interface Coordinates {
  lat: number
  lng: number
}

export interface Zone {
  id: string
  name: string
  zipCodes: string[]
  centerLat: number
  centerLng: number
  radius: number
}

// Austin area ZIP codes and their approximate coordinates
const ZIP_COORDINATES: Record<string, Coordinates> = {
  '78701': { lat: 30.2672, lng: -97.7431 }, // Downtown Austin
  '78702': { lat: 30.2672, lng: -97.7431 }, // East Austin
  '78703': { lat: 30.2672, lng: -97.7431 }, // West Austin
  '78704': { lat: 30.2303, lng: -97.7717 }, // South Austin
  '78705': { lat: 30.2672, lng: -97.7431 }, // University of Texas
  '78712': { lat: 30.2672, lng: -97.7431 }, // East Austin
  '78721': { lat: 30.2672, lng: -97.7431 }, // East Austin
  '78722': { lat: 30.2672, lng: -97.7431 }, // East Austin
  '78723': { lat: 30.2672, lng: -97.7431 }, // Northeast Austin
  '78724': { lat: 30.2672, lng: -97.7431 }, // Northeast Austin
  '78725': { lat: 30.2672, lng: -97.7431 }, // Northeast Austin
  '78726': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78727': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78728': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78729': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78730': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78731': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78732': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78733': { lat: 30.2672, lng: -97.7431 }, // West Austin
  '78734': { lat: 30.2672, lng: -97.7431 }, // West Austin
  '78735': { lat: 30.2672, lng: -97.7431 }, // Southwest Austin
  '78736': { lat: 30.2672, lng: -97.7431 }, // Southwest Austin
  '78737': { lat: 30.2672, lng: -97.7431 }, // Southwest Austin
  '78738': { lat: 30.2672, lng: -97.7431 }, // West Austin
  '78739': { lat: 30.2672, lng: -97.7431 }, // Southwest Austin
  '78741': { lat: 30.2672, lng: -97.7431 }, // Southeast Austin
  '78742': { lat: 30.2672, lng: -97.7431 }, // Southeast Austin
  '78744': { lat: 30.2672, lng: -97.7431 }, // Southeast Austin
  '78745': { lat: 30.2672, lng: -97.7431 }, // South Austin
  '78746': { lat: 30.2672, lng: -97.7431 }, // West Austin
  '78747': { lat: 30.2672, lng: -97.7431 }, // Southeast Austin
  '78748': { lat: 30.2672, lng: -97.7431 }, // Southeast Austin
  '78749': { lat: 30.2672, lng: -97.7431 }, // Southwest Austin
  '78750': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
  '78751': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78752': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78753': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78754': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78756': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78757': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78758': { lat: 30.2672, lng: -97.7431 }, // North Austin
  '78759': { lat: 30.2672, lng: -97.7431 }, // Northwest Austin
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(coord2.lat - coord1.lat)
  const dLng = toRadians(coord2.lng - coord1.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Get coordinates for a ZIP code
export function getZipCoordinates(zipCode: string): Coordinates | null {
  return ZIP_COORDINATES[zipCode] || null
}

// Find which zone a ZIP code belongs to
export function findZoneForZip(zipCode: string): string | null {
  // For MVP, all Austin ZIP codes are in the Austin Central zone
  if (ZIP_COORDINATES[zipCode]) {
    return 'austin-central'
  }
  return null
}

// Get all ZIP codes in a region
export function getZipCodesInRegion(region: string): string[] {
  if (region === 'Austin Central') {
    return Object.keys(ZIP_COORDINATES)
  }
  return []
}

// Validate ZIP code format
export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode)
}

// Format ZIP code (remove +4 if present)
export function formatZipCode(zipCode: string): string {
  return zipCode.split('-')[0]
}

// Get nearby drivers within radius
export function getDriversInRadius(
  center: Coordinates,
  drivers: Array<{ lat: number; lng: number; id: string }>,
  radiusMiles: number
): Array<{ lat: number; lng: number; id: string; distance: number }> {
  return drivers
    .map(driver => ({
      ...driver,
      distance: calculateDistance(center, { lat: driver.lat, lng: driver.lng })
    }))
    .filter(driver => driver.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance)
}

// Generate map bounds for a list of coordinates
export function getMapBounds(coordinates: Coordinates[]): {
  north: number
  south: number
  east: number
  west: number
} {
  if (coordinates.length === 0) {
    return {
      north: 30.3,
      south: 30.2,
      east: -97.7,
      west: -97.8,
    }
  }

  const lats = coordinates.map(coord => coord.lat)
  const lngs = coordinates.map(coord => coord.lng)

  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  }
}
