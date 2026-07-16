'use client'

import React from 'react'

interface DardcorLogoProps {
  className?: string
  variant?: 'white' | 'blue' | 'purple' | 'green' | 'default'
  size?: number | string
  animated?: boolean
  style?: React.CSSProperties
}

export default function DardcorLogo({
  className = '',
  variant = 'default',
  size = 40,
  animated = false,
  style = {},
}: DardcorLogoProps) {
  let gradientId = `logo-gradient-${variant}`

  let gradientStopStart = '#FFFFFF'
  let gradientStopEnd = '#A3A3A3'

  if (variant === 'blue') {
    gradientStopStart = '#60A5FA'
    gradientStopEnd = '#1D4ED8'
  } else if (variant === 'purple') {
    gradientStopStart = '#C084FC'
    gradientStopEnd = '#6D28D9'
  } else if (variant === 'green') {
    gradientStopStart = '#34D399'
    gradientStopEnd = '#047857'
  } else if (variant === 'white') {
    gradientStopStart = '#FFFFFF'
    gradientStopEnd = '#E5E5E5'
  } else {
    gradientStopStart = '#FFFFFF'
    gradientStopEnd = '#D4D4D4'
  }

  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : { width: size, height: size }
  const combinedStyle = { ...sizeStyle, ...style }

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={combinedStyle}
      className={`select-none ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="30" y1="10" x2="70" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientStopStart} />
          <stop offset="50%" stopColor={variant === 'default' ? '#F5F5F5' : gradientStopStart} />
          <stop offset="100%" stopColor={gradientStopEnd} />
        </linearGradient>
        
        {/* Glow filters for interactive states */}
        <filter id="glow-heavy" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-light" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Path 1: Top-Left to Bottom-Right */}
      <path
        d="M 32 12 C 32 36, 42 45, 50 50 C 58 55, 68 64, 68 88"
        stroke={`url(#${gradientId})`}
        strokeWidth="9"
        strokeLinecap="square"
        style={{
          filter: animated ? 'url(#glow-light)' : 'none',
          transition: 'all 0.3s ease',
        }}
        className={animated ? 'animate-pulse' : ''}
      />

      {/* Path 2: Top-Right to Bottom-Left */}
      <path
        d="M 68 12 C 68 36, 58 45, 50 50"
        stroke={`url(#${gradientId})`}
        strokeWidth="9"
        strokeLinecap="square"
      />
      <path
        d="M 50 50 C 42 55, 32 64, 32 88"
        stroke={`url(#${gradientId})`}
        strokeWidth="9"
        strokeLinecap="square"
        style={{
          filter: animated ? 'url(#glow-light)' : 'none',
          transition: 'all 0.3s ease',
        }}
        className={animated ? 'animate-pulse' : ''}
      />
      
      {/* Dynamic central intersection overlay for clean anti-aliasing */}
      <circle
        cx="50"
        cy="50"
        r="4.5"
        fill={`url(#${gradientId})`}
        style={{ mixBlendMode: 'normal' }}
      />
    </svg>
  )
}
