'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({
  position,
  shape,
  color,
  speed = 1,
  distort = 0.2,
}: {
  position: [number, number, number]
  shape: 'octahedron' | 'torus' | 'icosahedron'
  color: string
  speed?: number
  distort?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.position.x = initialPos.x + Math.sin(t * 0.5) * 0.4
    ref.current.position.y = initialPos.y + Math.cos(t * 0.7) * 0.4
    ref.current.position.z = initialPos.z + Math.sin(t * 0.3) * 0.3
    ref.current.rotation.x += 0.005 * speed
    ref.current.rotation.y += 0.008 * speed
  })

  let geometry: React.ReactNode
  switch (shape) {
    case 'octahedron':
      geometry = <octahedronGeometry args={[1, 0]} />
      break
    case 'torus':
      geometry = <torusGeometry args={[0.8, 0.3, 16, 32]} />
      break
    case 'icosahedron':
      geometry = <icosahedronGeometry args={[1, 0]} />
      break
  }

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 200 }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.02
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#7C3AED"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#7C3AED" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#06B6D4" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />

      <FloatingShape
        position={[-3, 1, -2]}
        shape="octahedron"
        color="#7C3AED"
        speed={0.8}
        distort={0.3}
      />
      <FloatingShape
        position={[3.5, -0.5, -1.5]}
        shape="torus"
        color="#06B6D4"
        speed={1.2}
        distort={0.15}
      />
      <FloatingShape
        position={[0, -2, -3.5]}
        shape="icosahedron"
        color="#A78BFA"
        speed={1}
        distort={0.25}
      />

      <ParticleField count={300} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <ringGeometry args={[8, 12, 64]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
