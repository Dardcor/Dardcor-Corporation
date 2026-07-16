'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import DardcorLogo from './DardcorLogo'

export default function BrandShowcase() {
  const [activeTab, setActiveTab] = useState<'stationery' | 'building' | 'appicon'>('stationery')
  const [neonOn, setNeonOn] = useState(true)

  // Card Parallax/Reflection States
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 })
  const [cardLight, setCardLight] = useState({ x: 50, y: 50 })

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Relative position inside the card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Convert to percentage
    const xp = (x / rect.width) * 100
    const yp = (y / rect.height) * 100
    
    // Rotate values (-15 to 15 deg)
    const rx = ((y / rect.height) - 0.5) * -20
    const ry = ((x / rect.width) - 0.5) * 20
    
    setCardRotate({ x: rx, y: ry })
    setCardLight({ x: xp, y: yp })
  }

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 })
    setCardLight({ x: 50, y: 50 })
  }

  // App Icon Parallax States
  const iconRef = useRef<HTMLDivElement>(null)
  const [iconRotate, setIconRotate] = useState({ x: 0, y: 0 })
  const [iconLight, setIconLight] = useState({ x: 50, y: 50 })

  const handleIconMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconRef.current) return
    const icon = iconRef.current
    const rect = icon.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xp = (x / rect.width) * 100
    const yp = (y / rect.height) * 100
    const rx = ((y / rect.height) - 0.5) * -25
    const ry = ((x / rect.width) - 0.5) * 25
    
    setIconRotate({ x: rx, y: ry })
    setIconLight({ x: xp, y: yp })
  }

  const handleIconMouseLeave = () => {
    setIconRotate({ x: 0, y: 0 })
    setIconLight({ x: 50, y: 50 })
  }

  return (
    <section id="mockups" className="relative py-24 bg-[#080A14] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-page relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Assets & Showcase
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">
            Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Applications</span>
          </h2>
          <p className="text-base text-[var(--color-gray)] leading-relaxed">
            Experience the tactile design execution of Dardcor branding through interactive digital mockups.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-16 select-none">
          <button
            onClick={() => setActiveTab('stationery')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 ${
              activeTab === 'stationery'
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            Matte Business Card
          </button>
          <button
            onClick={() => setActiveTab('building')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 ${
              activeTab === 'building'
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            Headquarters Facade
          </button>
          <button
            onClick={() => setActiveTab('appicon')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 ${
              activeTab === 'appicon'
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            3D App Icon
          </button>
        </div>

        {/* Tab Contents Showcase */}
        <div className="flex justify-center items-center w-full min-h-[480px]">
          
          {/* TAB 1: BUSINESS CARD STATIONERY */}
          {activeTab === 'stationery' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <div 
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  perspective: 1000,
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
                className="relative w-[340px] md:w-[480px] h-[200px] md:h-[280px] rounded-xl bg-[#090D1A] border border-white/10 shadow-2xl overflow-hidden cursor-crosshair"
              >
                {/* Metallic Speckles Background Texture */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Simulated Specular Reflection Highlight */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-60"
                  style={{
                    background: `radial-gradient(circle 180px at ${cardLight.x}% ${cardLight.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`
                  }}
                />

                {/* Content Container (Card Details) */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between" style={{ transform: 'translateZ(40px)' }}>
                  
                  {/* Embossed Logo with metallic shine offset */}
                  <div className="flex justify-between items-start">
                    <DardcorLogo 
                      size={52} 
                      variant="white"
                      className="transition-transform duration-300 hover:scale-105"
                      style={{
                        filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.4))`,
                      }}
                    />
                    <span className="text-[9px] font-bold text-gray-500 tracking-[0.25em] select-none font-mono">DARDCOR CORP</span>
                  </div>

                  {/* Card Owner Info */}
                  <div className="flex flex-col select-none">
                    <span className="font-display text-base md:text-lg font-black text-white tracking-[0.1em] leading-none mb-1">DARDCOR SYSTEMS</span>
                    <span className="text-[8px] md:text-[9px] text-gray-500 tracking-[0.3em] font-bold uppercase leading-none">AI CORE INFRASTRUCTURE</span>
                  </div>

                </div>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest select-none animate-pulse">
                Hover cursor to reflect light off the card
              </p>
            </motion.div>
          )}

          {/* TAB 2: BUILDING NEON FACADE */}
          {activeTab === 'building' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8 w-full max-w-4xl"
            >
              <div className="relative w-full h-[400px] rounded-xl bg-black overflow-hidden border border-white/5 shadow-2xl">
                
                {/* Architectural Building Facade Dark Panels */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex">
                  <div className="w-1/4 border-r border-black/30 h-full bg-zinc-900/60" />
                  <div className="w-1/4 border-r border-black/30 h-full bg-zinc-900/40" />
                  <div className="w-1/4 border-r border-black/30 h-full bg-zinc-900/50" />
                  <div className="w-1/4 h-full bg-zinc-900/30" />
                </div>

                {/* Building Window Reflections (Glow effect backdrop) */}
                <div className="absolute top-[20%] right-[10%] w-48 h-32 bg-cyan-900/10 blur-[80px] pointer-events-none" />

                {/* Interactive Neon Logo Sign */}
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 select-none">
                  
                  {/* Double Helix Logo Neon Wireframe */}
                  <div className="relative flex justify-center items-center w-40 h-40">
                    {/* Shadow wire under-layer */}
                    <DardcorLogo size={120} variant="white" className="absolute opacity-10 blur-[1px]" />
                    
                    {/* Glowing active layer */}
                    <DardcorLogo 
                      size={120} 
                      variant="white"
                      className={`transition-all duration-300 ${
                        neonOn ? 'opacity-100 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.85)] drop-shadow-[0_0_30px_rgba(255,255,255,0.45)]' : 'opacity-20 blur-[1px]'
                      }`}
                    />
                  </div>

                  {/* Corporate Branding Text */}
                  <div className="flex flex-col items-center font-display">
                    <span className={`text-xl md:text-2xl font-black tracking-[0.3em] transition-all duration-500 ${
                      neonOn ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]' : 'text-zinc-700'
                    }`}>DARDCOR</span>
                    <span className={`text-[9px] md:text-[10px] tracking-[0.4em] font-bold mt-2 transition-all duration-500 ${
                      neonOn ? 'text-gray-400 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]' : 'text-zinc-800'
                    }`}>CORPORATION</span>
                  </div>

                </div>

                {/* Ambient Soft Neon Reflection Overlay on concrete panels */}
                <div 
                  className={`absolute inset-0 bg-[radial-gradient(circle_300px_at_center,rgba(255,255,255,0.06),transparent_100%)] transition-opacity duration-500 pointer-events-none ${
                    neonOn ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Neon Power Switch overlay */}
                <button
                  onClick={() => setNeonOn(!neonOn)}
                  className="absolute bottom-6 right-6 px-4 py-2 text-[10px] font-bold tracking-widest text-white border border-white/20 bg-black/60 rounded-md hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-mono"
                >
                  NEON POWER: {neonOn ? 'ON' : 'OFF'}
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: 3D APP ICON */}
          {activeTab === 'appicon' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <div 
                ref={iconRef}
                onMouseMove={handleIconMouseMove}
                onMouseLeave={handleIconMouseLeave}
                style={{
                  perspective: 1000,
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${iconRotate.x}deg) rotateY(${iconRotate.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-[48px] bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] border border-black/40 overflow-hidden cursor-pointer flex justify-center items-center group"
              >
                {/* Glass sheen backdrop */}
                <div className="absolute inset-2 rounded-[40px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                {/* Dynamic specular light reflection across the icon dome */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-75 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 120px at ${iconLight.x}% ${iconLight.y}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 80%)`
                  }}
                />

                {/* Logo inside icon (offset for 3D parallax depth) */}
                <div className="transition-transform duration-300 group-hover:scale-105" style={{ transform: 'translateZ(30px)' }}>
                  <DardcorLogo 
                    size={100} 
                    variant="white"
                    style={{
                      filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.65))',
                    }}
                  />
                </div>

                {/* App icon border highlight (simulated refraction ring) */}
                <div className="absolute inset-0 rounded-[48px] border-2 border-white/5 pointer-events-none" />
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest select-none animate-pulse">
                Tilt the icon to see 3D parallax depth
              </p>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  )
}
