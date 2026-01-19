'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

function GlobeMesh() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00ff41" />
      
      <Sphere args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#0a1a2e"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.5}
          metalness={0.3}
        />
      </Sphere>
      
      {/* Grid lines overlay */}
      <Sphere args={[1.51, 32, 32]} scale={1.5}>
        <meshBasicMaterial
          color="#00ff41"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
    </>
  )
}

export default function GlobePreview() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <GlobeMesh />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
