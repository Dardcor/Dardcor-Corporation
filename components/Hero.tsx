'use client'

import React from 'react'
import { motion as motionHtml } from 'framer-motion'
import HeroThreeScene from './HeroThreeScene'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[var(--nav-height)] pb-12 overflow-hidden bg-[#04060C]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Branding Slogans & Action */}
          <motionHtml.div
            className="lg:col-span-6 text-left flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Version Badge */}
            <motionHtml.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-3 py-1 self-start rounded-full border border-cyan-500/10 bg-cyan-500/5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-300">
                Dardcor Ecosystem v1.0
              </span>
            </motionHtml.div>

            {/* Slogan Stack */}
            <motionHtml.div variants={itemVariants} className="flex flex-col font-display leading-[1.08] mb-6">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                Intelligence.
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                Engineering.
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Automation.
              </span>
            </motionHtml.div>

            {/* Sub-slogan */}
            <motionHtml.p 
              variants={itemVariants} 
              className="text-lg md:text-xl font-medium text-[var(--color-gray)] tracking-wide mb-10 max-w-md"
            >
              One corporation.<br />Infinite possibilities.
            </motionHtml.p>

            {/* CTA Button */}
            <motionHtml.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="group relative px-8 py-3.5 rounded-lg text-sm font-semibold text-white overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 flex items-center gap-3.5"
              >
                <span className="relative flex items-center gap-2">
                  Explore Ecosystem
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </a>
              <a
                href="#mockups"
                className="px-8 py-3.5 rounded-lg text-sm font-semibold text-[var(--color-gray)] border border-transparent bg-transparent hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                Brand Showcase
              </a>
            </motionHtml.div>
          </motionHtml.div>

          {/* Right Column: 3D interactive Scene */}
          <motionHtml.div
            className="lg:col-span-6 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroThreeScene />
          </motionHtml.div>

        </div>
      </div>
    </section>
  )
}
