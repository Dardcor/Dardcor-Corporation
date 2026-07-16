'use client'

import React from 'react'

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle starfield via CSS */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 40% 15%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 35%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 10%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 25%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 55%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 5%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 33% 8%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 42%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 28%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 18%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 18% 38%, rgba(255,255,255,0.3) 0%, transparent 100%)
          `,
        }}
      />
    </div>
  )
}
