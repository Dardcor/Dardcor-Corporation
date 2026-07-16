'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Logo3D() {
  const groupRef = useRef<THREE.Group>(null)

  // Define paths for the crossing curves in 3D space
  const curve1 = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.9, 1.6, 0),
      new THREE.Vector3(-0.9, 0.9, 0.15),
      new THREE.Vector3(-0.5, 0.4, 0.25),
      new THREE.Vector3(0, 0, 0.3), // Slightly forward
      new THREE.Vector3(0.5, -0.4, 0.25),
      new THREE.Vector3(0.9, -0.9, 0.15),
      new THREE.Vector3(0.9, -1.6, 0),
    ]
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const curve2 = useMemo(() => {
    const points = [
      new THREE.Vector3(0.9, 1.6, 0),
      new THREE.Vector3(0.9, 0.9, -0.15),
      new THREE.Vector3(0.5, 0.4, -0.25),
      new THREE.Vector3(0, 0, -0.3), // Slightly backward
      new THREE.Vector3(-0.5, -0.4, -0.25),
      new THREE.Vector3(-0.9, -0.9, -0.15),
      new THREE.Vector3(-0.9, -1.6, 0),
    ]
    return new THREE.CatmullRomCurve3(points)
  }, [])

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return
    
    // Slow rotation
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.3
    groupRef.current.rotation.x = Math.cos(elapsed * 0.1) * 0.15
    
    // Interactive tilt from mouse
    groupRef.current.rotation.y += mouse.x * 0.25
    groupRef.current.rotation.x -= mouse.y * 0.2
  })

  return (
    <group ref={groupRef}>
      {/* First Strand */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve1, 64, 0.16, 16, false]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
          emissive="#222222"
        />
      </mesh>

      {/* Second Strand */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve2, 64, 0.16, 16, false]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
          emissive="#222222"
        />
      </mesh>

      {/* Overlapping intersection element (smooth transition node) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.95}
          clearcoat={1.0}
          reflectivity={1.0}
        />
      </mesh>
    </group>
  )
}

function PlanetHorizon() {
  const planetRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = clock.getElapsedTime() * 0.015
    }
  })

  return (
    <group position={[0, -5.5, 0]}>
      {/* Dark Planet Body */}
      <mesh ref={planetRef} receiveShadow>
        <sphereGeometry args={[4.8, 64, 64]} />
        <meshStandardMaterial
          color="#04060C"
          roughness={0.9}
          metalness={0.2}
          bumpScale={0.05}
        />
      </mesh>

      {/* Atmosphere Glow Outer Ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0.1]}>
        <ringGeometry args={[4.8, 5.1, 64]} />
        <meshBasicMaterial
          color="#06B6D4"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Atmosphere Glow Ring (Faded Cyan-Blue) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[4.75, 5.3, 64]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Main direction light casting metallic highlights */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={2.5} 
        color="#ffffff" 
        castShadow 
      />

      {/* Blue point light representing the planet atmosphere reflection */}
      <pointLight 
        position={[0, -3.5, 2]} 
        intensity={4.0} 
        distance={10} 
        color="#06B6D4" 
      />

      {/* Purple back light for depth color contrast */}
      <pointLight 
        position={[-4, 4, -2]} 
        intensity={3.0} 
        distance={15} 
        color="#8B5CF6" 
      />

      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.3}>
        <Logo3D />
      </Float>

      <PlanetHorizon />
    </>
  )
}

export default function HeroThreeScene() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] select-none">
      {/* Background space/atmosphere radial glow overlay (CSS side) */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90%] h-[40%] bg-gradient-to-t from-cyan-500/15 via-blue-600/5 to-transparent rounded-full blur-[80px] pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
