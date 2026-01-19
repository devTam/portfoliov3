'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Cone, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Company } from '@/lib/data/companies'

interface LocationMarkerProps {
  position: [number, number, number]
  company: Company
  onClick: () => void
  isSelected: boolean
}

export default function LocationMarker({
  position,
  company,
  onClick,
  isSelected,
}: LocationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Calculate rotation to point outward from globe center
  const rotation = useMemo(() => {
    // Create a vector from the origin to the position
    const posVec = new THREE.Vector3(...position)
    
    // The pin should point outward (away from center)
    // Default cone points along Y axis, we need to rotate it to point along the position vector
    const up = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(up, posVec.clone().normalize())
    
    const euler = new THREE.Euler()
    euler.setFromQuaternion(quaternion)
    
    return euler
  }, [position])

  // Pulsing glow animation
  useFrame((state) => {
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      glowRef.current.scale.setScalar(pulse)
    }
  })

  const markerColor = isSelected ? '#00d4ff' : '#00ff41'
  const baseSize = 0.04
  const size = hovered || isSelected ? baseSize * 1.3 : baseSize

  // Position the marker slightly above the surface
  const markerPosition = useMemo(() => {
    const vec = new THREE.Vector3(...position)
    vec.normalize().multiplyScalar(1.02) // Slightly above surface
    return [vec.x, vec.y, vec.z] as [number, number, number]
  }, [position])

  return (
    <group
      ref={groupRef}
      position={markerPosition}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {/* Pin body (cone pointing outward) */}
      <Cone
        args={[size * 0.6, size * 2, 8]}
        position={[0, size * 1.2, 0]}
      >
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={0.5}
        />
      </Cone>

      {/* Pin head (sphere on top) */}
      <Sphere
        args={[size * 0.8, 16, 16]}
        position={[0, size * 2.6, 0]}
      >
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={0.6}
        />
      </Sphere>

      {/* Glow ring at base */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.8, size * 1.5, 32]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hover tooltip */}
      {hovered && (
        <Text
          position={[0, size * 4, 0]}
          fontSize={0.06}
          color="#00ff41"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.004}
          outlineColor="#000000"
        >
          {company.name}
        </Text>
      )}
    </group>
  )
}
