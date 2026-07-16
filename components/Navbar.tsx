'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import DardcorLogo from './DardcorLogo'

const navLinks = [
  { href: '#products', label: 'Products' },
  { href: '#ecosystem', label: 'Ecosystem' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.3 }
    )

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] bg-transparent border-transparent"
    >
      <div className="container-page h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group relative">
          <div className="relative">
            <DardcorLogo 
              size={30} 
              variant="white" 
              className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]" 
            />
          </div>
          <div className="flex flex-col font-display text-white select-none">
            <span className="text-[13px] font-black tracking-[0.25em] leading-none transition-all duration-300 group-hover:tracking-[0.35em]">DARDCOR</span>
            <span className="text-[7px] text-gray-500 tracking-[0.3em] leading-none mt-1 transition-colors duration-300 group-hover:text-gray-400">CORPORATION</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-5 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg group"
            >
              {/* Active indicator background */}
              <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                activeLink === link.href 
                  ? 'bg-white/[0.06]' 
                  : 'bg-transparent group-hover:bg-white/[0.04]'
              }`} />
              
              {/* Text */}
              <span className={`relative z-10 transition-colors duration-300 ${
                activeLink === link.href 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-white'
              }`}>
                {link.label}
              </span>
              
              {/* Active dot */}
              <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                activeLink === link.href 
                  ? 'bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)] scale-100' 
                  : 'scale-0'
              }`} />
            </a>
          ))}


        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-none border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-white rounded"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[2px] bg-white rounded"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-white rounded"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[rgba(4,6,12,0.98)] backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="container-page py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://github.com/Dardcor"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-violet-600/20 border border-violet-500/30 rounded-lg mt-2 hover:bg-violet-600/30 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
