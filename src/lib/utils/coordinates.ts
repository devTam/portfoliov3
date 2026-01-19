/**
 * Convert latitude and longitude to 3D coordinates on a Three.js Sphere
 * 
 * Three.js SphereGeometry generates vertices as:
 *   x = -radius * cos(phi) * sin(theta)
 *   y = radius * cos(theta)
 *   z = radius * sin(phi) * sin(theta)
 * 
 * Where theta goes from 0 to π (pole to pole) and phi goes from 0 to 2π (around).
 * 
 * For standard equirectangular Earth texture:
 * - U=0 corresponds to longitude -180° (left edge)
 * - U=0.5 corresponds to longitude 0° (center/Prime Meridian)
 * - U=1 corresponds to longitude +180° (right edge)
 * 
 * The mapping is:
 * - phi (horizontal angle) = (longitude + 180) * π / 180
 * - theta (vertical angle, colatitude) = (90 - latitude) * π / 180
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = 1
): [number, number, number] {
  // Convert latitude to colatitude (theta): 0 at north pole, π at south pole
  const theta = (90 - lat) * (Math.PI / 180)
  
  // Convert longitude to phi: matches Three.js SphereGeometry UV mapping
  const phi = (lng + 180) * (Math.PI / 180)

  // Spherical to Cartesian (matching Three.js SphereGeometry exactly)
  const sinTheta = Math.sin(theta)
  const x = -radius * Math.cos(phi) * sinTheta
  const y = radius * Math.cos(theta)
  const z = radius * Math.sin(phi) * sinTheta

  return [x, y, z]
}

/**
 * Get the normal vector pointing outward from a position on the globe
 * For a sphere centered at origin, this is just the normalized position vector
 */
export function getOutwardNormal(
  position: [number, number, number]
): [number, number, number] {
  const [x, y, z] = position
  const length = Math.sqrt(x * x + y * y + z * z)
  if (length === 0) return [0, 1, 0] // fallback
  return [x / length, y / length, z / length]
}

/**
 * Calculate great-circle distance between two points on Earth (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
