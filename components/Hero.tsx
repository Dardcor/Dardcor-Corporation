'use client'

import React from 'react'
import { motion as motionHtml } from 'framer-motion'
import DardcorLogo from './DardcorLogo'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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
    <section className="relative min-h-screen flex flex-col pt-[var(--nav-height)] overflow-hidden">

      {/* ===== Main Hero Content ===== */}
      <div className="relative z-[20] flex-1 flex items-center">
        <div className="container-page w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text */}
            <motionHtml.div
              className="lg:col-span-6 text-left flex flex-col justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motionHtml.div variants={itemVariants} className="flex flex-col font-display leading-[1.08] mb-6">
                <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                  Intelligence.
                </span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                  Engineering.
                </span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                  Automation.
                </span>
              </motionHtml.div>

              <motionHtml.p 
                variants={itemVariants} 
                className="text-lg md:text-xl font-medium text-[var(--color-gray)] tracking-wide mb-6 max-w-md"
              >
                One corporation.<br />Infinite possibilities.
              </motionHtml.p>

              <motionHtml.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
                <a
                  href="#products"
                  className="group relative px-8 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden border border-white/20 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/5 flex items-center gap-3"
                >
                  Explore Ecosystem
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com/Dardcor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-[1px]"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/80 to-violet-700/80 transition-all duration-300 group-hover:from-violet-500/90 group-hover:to-violet-600/90" />
                  <span className="absolute inset-[1px] rounded-[9999px] bg-[#0d0f18] transition-all duration-300 group-hover:bg-[#13152a]" />
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
                  <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="relative z-10">GitHub</span>
                </a>

                {/* Discord Button */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-[1px]"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/80 to-indigo-700/80 transition-all duration-300 group-hover:from-blue-500/90 group-hover:to-indigo-600/90" />
                  <span className="absolute inset-[1px] rounded-[9999px] bg-[#0d0f18] transition-all duration-300 group-hover:bg-[#13152a]" />
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]" />
                  <svg className="relative z-10 w-4 h-4" viewBox="0 0 127.14 96.36" fill="currentColor">
                    <path d="M107.7 8.07A105.15 105.15 0 0081.47 0a72.06 72.06 0 00-3.36 6.83 97.68 97.68 0 00-29.08 0A72.37 72.37 0 0045.67 0 105.15 105.15 0 0019.44 8.07C2.79 33.12-1.69 57.5 0.52 81.69a105.73 105.73 0 0032.14 16.32 77.7 77.7 0 006.89-11.2 67.42 67.42 0 01-10.85-5.18c.91-.71 1.8-1.45 2.67-2.22a75.54 75.54 0 0064.4 0c.87.77 1.76 1.51 2.68 2.22a67.42 67.42 0 01-10.87 5.18 77.7 77.7 0 006.89 11.2 105.73 105.73 0 0032.14-16.32c2.61-28.16-3.8-51.52-19.12-73.62zM42.63 65.65c-6.19 0-11.31-5.64-11.31-12.56S36.3 40.54 42.63 40.54c6.26 0 11.39 5.71 11.31 12.55 0 6.92-5.06 12.56-11.31 12.56zm41.88 0c-6.19 0-11.31-5.64-11.31-12.56S78.26 40.54 84.51 40.54c6.26 0 11.39 5.71 11.31 12.55 0 6.92-5.06 12.56-11.31 12.56z"/>
                  </svg>
                  <span className="relative z-10">Discord</span>
                </a>
              </motionHtml.div>
            </motionHtml.div>

            {/* Right Column: Large Dardcor Logo */}
            <motionHtml.div
              className="lg:col-span-6 flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <DardcorLogo
                size={320}
                variant="white"
                animated={false}
                style={{
                  filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.15)) drop-shadow(0 0 120px rgba(139,92,246,0.1))',
                }}
                className="w-[200px] h-[200px] md:w-[320px] md:h-[320px]"
              />
            </motionHtml.div>

          </div>
        </div>
      </div>

      {/* ===== Earth Background Image ===== */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none"
      >
        {/* Earth image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/earth-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* ===== Product Cards Row ===== */}
      <div className="relative z-[20] pb-8">
        <motionHtml.div
          className="container-page"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Dardcor AI */}
            <a href="#dardcor-ai" className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] bg-black/10 backdrop-blur-sm hover:border-purple-500/30 hover:bg-white/[0.03] transition-all duration-300">
              <DardcorLogo size={36} variant="purple" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white tracking-wide">DARDCOR</span>
                  <span className="font-display text-sm font-bold text-purple-400 tracking-wide">AI</span>
                </div>
                <span className="text-xs text-gray-500">Artificial Intelligence</span>
              </div>
            </a>

            {/* Dardcor Code */}
            <a href="#dardcor-code" className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] bg-black/10 backdrop-blur-sm hover:border-blue-500/30 hover:bg-white/[0.03] transition-all duration-300">
              <DardcorLogo size={36} variant="blue" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white tracking-wide">DARDCOR</span>
                  <span className="font-display text-sm font-bold text-blue-400 tracking-wide">CODE</span>
                </div>
                <span className="text-xs text-gray-500">Editor Agent</span>
              </div>
            </a>

            {/* Dardcor Agent */}
            <a href="#dardcor-agent" className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] bg-black/10 backdrop-blur-sm hover:border-green-500/30 hover:bg-white/[0.03] transition-all duration-300">
              <DardcorLogo size={36} variant="green" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white tracking-wide">DARDCOR</span>
                  <span className="font-display text-sm font-bold text-emerald-400 tracking-wide">AGENT</span>
                </div>
                <span className="text-xs text-gray-500">Terminal Agent</span>
              </div>
            </a>
          </div>


        </motionHtml.div>
      </div>

    </section>
  )
}
