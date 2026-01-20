'use client'

import { Suspense, useRef, useCallback, useEffect } from 'react'
import { useLoader, useThree, Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { companies, Company } from '@/lib/data/companies'
import { latLngToVector3 } from '@/lib/utils/coordinates'
import LocationMarker from './LocationMarker'
import AnimatedBeam from './AnimatedBeam'

interface GlobeSceneProps {
  onMarkerClick: (company: Company) => void
  selectedCompanyId: string | null
  featuredCompanyId: string | null
  isPaused: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null)
  const textureUrl = 'https://unpkg.com/three-globe@2.31.0/example/img/earth-day.jpg'
  const texture = useLoader(THREE.TextureLoader, textureUrl)
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
      <meshStandardMaterial color="#1a3a5c" roughness={0.8} metalness={0.1} />
    </Sphere>
  )
}

function CameraController({ 
  targetPosition, 
}: { 
  targetPosition: [number, number, number] | null
}) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (targetPosition) {
      // Calculate camera position to look at the marker
      const [x, y, z] = targetPosition
      const markerVec = new THREE.Vector3(x, y, z).normalize()
      const cameraDistance = 2.8 
      const targetPos = markerVec.multiplyScalar(cameraDistance)
      
      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          camera.lookAt(0, 0, 0)
        }
      })
    }
  }, [targetPosition, camera])

  return null
}

function GlobeScene({
  onMarkerClick,
  selectedCompanyId,
  featuredCompanyId,
  isPaused: _isPaused,
  onHoverStart,
  onHoverEnd,
}: GlobeSceneProps) {
  // Get the featured company's position for camera
  const featuredPosition = featuredCompanyId 
    ? (() => {
        const company = companies.find(c => c.id === featuredCompanyId)
        if (company && !(company.location.coordinates.lat === 0 && company.location.coordinates.lng === 0)) {
          return latLngToVector3(
            company.location.coordinates.lat,
            company.location.coordinates.lng,
            1.0
          )
        }
        return null
      })()
    : null

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} />

      {/* Stars background */}
      <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} />

      {/* Camera animation controller */}
      <CameraController targetPosition={featuredPosition} />

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
        if (
          company.location.coordinates.lat === 0 &&
          company.location.coordinates.lng === 0
        ) {
          return null
        }

        const position = latLngToVector3(
          company.location.coordinates.lat,
          company.location.coordinates.lng,
          1.0
        )

        const isFeatured = featuredCompanyId === company.id
        const isSelected = selectedCompanyId === company.id

        return (
          <group key={company.id}>
            <LocationMarker
              position={position}
              company={company}
              onClick={() => onMarkerClick(company)}
              isSelected={isSelected}
              isFeatured={isFeatured}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
            {(isSelected || isFeatured) && (
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
        minDistance={1.8}
        maxDistance={5}
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
  featuredCompanyId?: string | null
  isPaused?: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

export default function Globe3D({
  onMarkerClick,
  selectedCompanyId = null,
  featuredCompanyId = null,
  isPaused = false,
  onHoverStart,
  onHoverEnd,
}: Globe3DProps) {
  const handleMarkerClick = useCallback((company: Company) => {
    if (onMarkerClick) {
      onMarkerClick(company)
    }
  }, [onMarkerClick])

  const handleHoverStart = useCallback(() => {
    if (onHoverStart) onHoverStart()
  }, [onHoverStart])

  const handleHoverEnd = useCallback(() => {
    if (onHoverEnd) onHoverEnd()
  }, [onHoverEnd])

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <GlobeScene
            onMarkerClick={handleMarkerClick}
            selectedCompanyId={selectedCompanyId}
            featuredCompanyId={featuredCompanyId}
            isPaused={isPaused}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
