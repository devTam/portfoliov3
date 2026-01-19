'use client'

import { Suspense, useRef, useCallback } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { companies, Company } from '@/lib/data/companies'
import { latLngToVector3 } from '@/lib/utils/coordinates'
import LocationMarker from './LocationMarker'
import AnimatedBeam from './AnimatedBeam'

interface GlobeSceneProps {
  onMarkerClick: (company: Company) => void
  selectedCompanyId: string | null
}

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null)
  
  // Load Earth texture from a reliable source
  const textureUrl = 'https://unpkg.com/three-globe@2.31.0/example/img/earth-day.jpg'
  const texture = useLoader(THREE.TextureLoader, textureUrl)
  
  // Configure texture
  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <Sphere ref={globeRef} args={[1, 64, 64]}>
      <meshStandardMaterial
        map={texture}
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  )
}

function GlobeFallback() {
  return (
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial
        color="#1a3a5c"
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  )
}

function GlobeScene({
  onMarkerClick,
  selectedCompanyId,
}: GlobeSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} />

      {/* Stars background */}
      <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} />

      {/* Main globe mesh */}
      <Suspense fallback={<GlobeFallback />}>
        <GlobeMesh />
      </Suspense>

      {/* Subtle grid overlay */}
      <Sphere args={[1.002, 36, 36]}>
        <meshBasicMaterial
          color="#00ff41"
          wireframe
          transparent
          opacity={0.04}
        />
      </Sphere>

      {/* Location markers */}
      {companies.map((company) => {
        // Skip companies with placeholder coordinates
        if (
          company.location.coordinates.lat === 0 &&
          company.location.coordinates.lng === 0
        ) {
          return null
        }

        const position = latLngToVector3(
          company.location.coordinates.lat,
          company.location.coordinates.lng,
          1.0 // On the surface
        )

        return (
          <group key={company.id}>
            <LocationMarker
              position={position}
              company={company}
              onClick={() => onMarkerClick(company)}
              isSelected={selectedCompanyId === company.id}
            />
            {selectedCompanyId === company.id && (
              <AnimatedBeam
                position={position}
                height={0.8}
              />
            )}
          </group>
        )
      })}

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={1.5}
        maxDistance={4}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI - 0.1}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </>
  )
}

interface Globe3DProps {
  onMarkerClick?: (company: Company) => void
  selectedCompanyId?: string | null
}

export default function Globe3D({
  onMarkerClick,
  selectedCompanyId = null,
}: Globe3DProps) {
  const handleMarkerClick = useCallback((company: Company) => {
    if (onMarkerClick) {
      onMarkerClick(company)
    }
  }, [onMarkerClick])

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <GlobeScene
            onMarkerClick={handleMarkerClick}
            selectedCompanyId={selectedCompanyId}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
