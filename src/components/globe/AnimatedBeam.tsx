'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedBeamProps {
  position: [number, number, number]
  height?: number
  color?: string
}

export default function AnimatedBeam({
  position,
  height = 0.8,
  color = '#00d4ff',
}: AnimatedBeamProps) {
  const beamRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Calculate rotation to point outward from globe center
  const { rotation, beamPosition } = useMemo(() => {
    const posVec = new THREE.Vector3(...position)
    const normal = posVec.clone().normalize()
    
    // Calculate position for beam (starts at the marker, extends outward)
    const beamStart = normal.clone().multiplyScalar(1.1) // Start above surface
    const beamCenter = beamStart.add(normal.clone().multiplyScalar(height / 2))
    
    // Rotation to align beam with outward direction
    const up = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(up, normal)
    const euler = new THREE.Euler()
    euler.setFromQuaternion(quaternion)
    
    return {
      rotation: euler,
      beamPosition: [beamCenter.x, beamCenter.y, beamCenter.z] as [number, number, number]
    }
  }, [position, height])

  // Animate the beam
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (beamRef.current) {
      // Pulse opacity
      const material = beamRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.4 + Math.sin(time * 4) * 0.2
    }
    
    if (glowRef.current) {
      // Pulse glow
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.15 + Math.sin(time * 4 + 0.5) * 0.1
    }
  })

  return (
    <group position={beamPosition} rotation={rotation}>
      {/* Main beam */}
      <Cylinder ref={beamRef} args={[0.015, 0.015, height, 8]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
        />
      </Cylinder>

      {/* Outer glow */}
      <Cylinder ref={glowRef} args={[0.03, 0.03, height, 8]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </Cylinder>

      {/* Top cap glow */}
      <mesh position={[0, height / 2, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
