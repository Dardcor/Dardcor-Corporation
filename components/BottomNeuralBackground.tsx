'use client'

import React, { useRef, useEffect, useCallback } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  pulseSpeed: number
  brightness: number
  z: number
}

interface Particle {
  fromNode: number
  toNode: number
  progress: number
  speed: number
  color: string
}

export default function BottomNeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const timeRef = useRef(0)

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = []
    // High density for a dense, beautiful network
    const count = Math.min(150, Math.floor((w * h) / 9000))

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        brightness: Math.random() * 0.8 + 0.2,
        z: Math.random() * 2 // for depth perception
      })
    }
    nodesRef.current = nodes

    const particles: Particle[] = []
    const colors = [
      'rgba(168,85,247,', // purple
      'rgba(139,92,246,', // violet
      'rgba(6,182,212,',  // cyan
      'rgba(56,189,248,', // sky blue
    ]
    for (let i = 0; i < 40; i++) {
      particles.push({
        fromNode: Math.floor(Math.random() * nodes.length),
        toNode: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initNodes(window.innerWidth, window.innerHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Adjust mouse position relative to the canvas in the viewport
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const maxConnectionDist = 200

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const t = timeRef.current
      timeRef.current += 0.016
      const nodes = nodesRef.current
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Clear with transparent background (so it layers nicely)
      ctx.clearRect(0, 0, w, h)

      // Add a very subtle deep purple ambient glow
      const glow = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w)
      glow.addColorStop(0, 'rgba(88, 28, 135, 0.05)')
      glow.addColorStop(1, 'rgba(4, 6, 12, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        // Wrap around edges softly
        if (node.x < -50) node.x = w + 50
        if (node.x > w + 50) node.x = -50
        if (node.y < -50) node.y = h + 50
        if (node.y > h + 50) node.y = -50

        // Mouse attraction/repulsion
        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const mouseDist = Math.sqrt(dx * dx + dy * dy)
        if (mouseDist < 200 && mouseDist > 0) {
          const force = (200 - mouseDist) / 200 * 0.2
          // Pull slightly, then push at close range
          if (mouseDist > 100) {
            node.vx -= (dx / mouseDist) * force * 0.5
            node.vy -= (dy / mouseDist) * force * 0.5
          } else {
            node.vx += (dx / mouseDist) * force
            node.vy += (dy / mouseDist) * force
          }
        }

        // Limit speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > 1) {
          node.vx = (node.vx / speed) * 1
          node.vy = (node.vy / speed) * 1
        }
      }

      // Draw connections
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxConnectionDist) {
            const alpha = Math.pow(1 - dist / maxConnectionDist, 2)
            const pulse = Math.sin(t * 2 + i * 0.1) * 0.5 + 0.5
            const finalAlpha = alpha * (0.15 + pulse * 0.15) * Math.max(a.brightness, b.brightness)

            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, `rgba(168, 85, 247, ${finalAlpha})`)
            grad.addColorStop(0.5, `rgba(139, 92, 246, ${finalAlpha * 0.8})`)
            grad.addColorStop(1, `rgba(6, 182, 212, ${finalAlpha})`)

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = grad
            ctx.stroke()
          }
        }
      }

      // Draw traveling particles
      for (const p of particles) {
        const from = nodes[p.fromNode]
        const to = nodes[p.toNode]
        if (!from || !to) {
          p.fromNode = Math.floor(Math.random() * nodes.length)
          p.toNode = Math.floor(Math.random() * nodes.length)
          continue
        }

        p.progress += p.speed
        if (p.progress >= 1) {
          p.progress = 0
          p.fromNode = p.toNode
          // Find a nearby node to travel to
          let closestDist = Infinity
          let nextNode = Math.floor(Math.random() * nodes.length)
          for(let i=0; i<nodes.length; i++) {
            if (i === p.toNode) continue
            const dx = nodes[i].x - to.x
            const dy = nodes[i].y - to.y
            const dist = Math.sqrt(dx*dx + dy*dy)
            if (dist < maxConnectionDist && dist < closestDist && Math.random() > 0.3) {
              closestDist = dist
              nextNode = i
            }
          }
          p.toNode = nextNode
        }

        const px = from.x + (to.x - from.x) * p.progress
        const py = from.y + (to.y - from.y) * p.progress

        // Glowing particle
        const pGlow = ctx.createRadialGradient(px, py, 0, px, py, 4)
        pGlow.addColorStop(0, p.color + '1)')
        pGlow.addColorStop(0.5, p.color + '0.5)')
        pGlow.addColorStop(1, p.color + '0)')
        ctx.fillStyle = pGlow
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(t * node.pulseSpeed + node.pulsePhase) * 0.3 + 0.7
        const alpha = node.brightness * pulse
        const size = node.radius * (1 + node.z * 0.2) * pulse

        const nGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4)
        nGlow.addColorStop(0, `rgba(168, 85, 247, ${alpha * 0.6})`)
        nGlow.addColorStop(1, `rgba(139, 92, 246, 0)`)
        ctx.fillStyle = nGlow
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [initNodes])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="sticky top-0 left-0 right-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        {/* Subtle vignette mask to blend with sections */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,6,12,0.8)_80%,#04060C_100%)]" />
      </div>
    </div>
  )
}
