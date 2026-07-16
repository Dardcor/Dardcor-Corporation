'use client'

import React from 'react'
import DardcorLogo from './DardcorLogo'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#04060C] border-t border-white/5 py-16">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Logo, Name, & Slogan */}
          <div className="md:col-span-7 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <DardcorLogo size={36} variant="white" />
              <div className="flex flex-col font-display text-white select-none">
                <span className="text-sm font-black tracking-[0.25em] leading-none">DARDCOR</span>
                <span className="text-[7px] text-gray-500 tracking-[0.3em] leading-none mt-1">CORPORATION</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-400 max-w-md leading-relaxed">
              Dardcor Corporation builds intelligent solutions that empower the future through AI, code, and automation.
            </p>
          </div>

          {/* Right Column: Sub-brand Rounded Icons */}
          <div className="md:col-span-5 flex justify-start md:justify-end items-center gap-6">
            
            {/* Brain Icon (Dardcor AI) */}
            <a 
              href="#products"
              className="flex items-center justify-center w-12 h-12 rounded-lg border border-blue-500/20 bg-blue-500/[0.02] text-blue-400 hover:text-white hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
              title="Dardcor AI"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </a>

            {/* Code Tags Icon (Dardcor Code) */}
            <a 
              href="#products"
              className="flex items-center justify-center w-12 h-12 rounded-lg border border-purple-500/20 bg-purple-500/[0.02] text-purple-400 hover:text-white hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
              title="Dardcor Code"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </a>

            {/* Terminal Window Icon (Dardcor Agent) */}
            <a 
              href="#products"
              className="flex items-center justify-center w-12 h-12 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-400 hover:text-white hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group"
              title="Dardcor Agent"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </a>

          </div>

        </div>

        {/* Footer Base Copy */}
        <div className="w-full mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono select-none">
          <span>&copy; {new Date().getFullYear()} DARDCOR CORPORATION. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="https://github.com/Dardcor" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
            <a href="https://www.npmjs.com/package/dardcor-agent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">NPM</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
