'use client'

import { useRef, useState, useMemo } from 'react'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { Sphere, Cone, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Company } from '@/lib/data/companies'

interface LocationMarkerProps {
  position: [number, number, number]
  company: Company
  onClick: () => void
  isSelected: boolean
  isFeatured?: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

function HoverChatbox({ company, onClick }: { company: Company; onClick: () => void }) {
  return (
    <div 
      className="select-none cursor-pointer"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <div className="relative animate-fadeIn hover:scale-105 transition-transform">
        <div className="bg-bg-tertiary/95 backdrop-blur-sm border border-accent-primary/50 rounded-lg px-3 py-2 min-w-[140px] shadow-lg shadow-accent-primary/20 hover:border-accent-primary transition-colors">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
          
          <p className="font-mono text-xs text-accent-primary font-bold tracking-wide truncate max-w-[180px]">
            {company.name}
          </p>
          
          <p className="font-mono text-[10px] text-text-secondary mt-0.5">
            📍 {company.location.city}, {company.location.country}
          </p>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-accent-primary/50" />
      </div>
    </div>
  )
}

export default function LocationMarker({
  position,
  company,
  onClick,
  isSelected,
  isFeatured = false,
  onHoverStart,
  onHoverEnd,
}: LocationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const rotation = useMemo(() => {
    const posVec = new THREE.Vector3(...position)
    const up = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(up, posVec.clone().normalize())
    const euler = new THREE.Euler()
    euler.setFromQuaternion(quaternion)
    return euler
  }, [position])

  useFrame((state) => {
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      glowRef.current.scale.setScalar(pulse)
    }
  })

  const markerColor = isSelected || isFeatured ? '#00d4ff' : '#00ff41'
  const baseSize = 0.025
  const size = hovered || isSelected || isFeatured ? baseSize * 1.4 : baseSize
  const showChatbox = hovered || isFeatured

  const markerPosition = useMemo(() => {
    const vec = new THREE.Vector3(...position)
    vec.normalize().multiplyScalar(1.015)
    return [vec.x, vec.y, vec.z] as [number, number, number]
  }, [position])

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    if (onHoverStart) onHoverStart()
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
    if (onHoverEnd) onHoverEnd()
  }

  return (
    <group
      ref={groupRef}
      position={markerPosition}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Cone
        args={[size * 0.5, size * 1.8, 8]}
        position={[0, size * 1, 0]}
      >
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={0.6}
        />
      </Cone>

      <Sphere
        args={[size * 0.7, 16, 16]}
        position={[0, size * 2.2, 0]}
      >
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={0.7}
        />
      </Sphere>

      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.6, size * 1.2, 32]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {showChatbox && (
        <Html
          position={[0, size * 4, 0]}
          center
          distanceFactor={3}
        >
          <HoverChatbox company={company} onClick={onClick} />
        </Html>
      )}
    </group>
  )
}
