"use client";

import React, { useState, useEffect, useRef } from 'react';

interface NodePos {
  x: number;
  y: number;
  ring: number;
  id: string;
  hasAnswer: boolean;
}

// Compute positions in concentric rings around center
function computeNodePositions(width: number, height: number, totalNodes = 56): NodePos[] {
  const cx = width / 2;
  const cy = height / 2;
  const rings = [0, 8, 20, 36, 56]; // max nodes per ring (cumulative)
  const radii = [0, 90, 160, 230, 300];
  const positions: NodePos[] = [];

  for (let idx = 0; idx < totalNodes; idx++) {
    let ring = 1;
    if (idx >= rings[3]) ring = 4;
    else if (idx >= rings[2]) ring = 3;
    else if (idx >= rings[1]) ring = 2;
    else ring = 1;

    const ringStart = rings[ring - 1] ?? 0;
    const ringEnd = rings[ring] ?? totalNodes;
    const countInRing = ringEnd - ringStart;
    const posInRing = idx - ringStart;
    const angleOffset = ring % 2 === 0 ? Math.PI / countInRing : 0;
    const angle = (2 * Math.PI * posInRing) / countInRing + angleOffset;
    
    // Calculate radius ensuring it fits in canvas
    const r = Math.min(radii[ring] ?? 300, Math.min(cx, cy) - 20);

    positions.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      ring,
      id: `node-${idx}`,
      hasAnswer: idx % 3 === 0 || idx % 7 === 0,
    });
  }
  return positions;
}

export default function NeuralVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<NodePos[]>([]);
  const [canvasSize, setCanvasSize] = useState({ w: 600, h: 420 });

  useEffect(() => {
    const recalc = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width || 600;
      const h = rect.height || 420;
      setCanvasSize({ w, h });
      setNodePositions(computeNodePositions(w, h, 56));
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  const nodeColor = (ring: number, hasAnswer: boolean) => {
    if (hasAnswer) return { fill: '#7c3aed', glow: '#c084fc', border: '#a855f7' };
    const palette = [
      { fill: '#4c1d95', glow: '#a855f7', border: '#7c3aed' },
      { fill: '#3b0764', glow: '#9333ea', border: '#6b21a8' },
      { fill: '#2e1065', glow: '#7e22ce', border: '#581c87' },
      { fill: '#171033', glow: '#6b21a8', border: '#4c1d95' },
    ];
    return palette[Math.min(ring - 1, 3)];
  };

  const cx = canvasSize.w / 2;
  const cy = canvasSize.h / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#050508] overflow-hidden rounded-xl border border-blue-500/10 shadow-[0_0_50px_rgba(168,85,247,0.1)] flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0d0a1f 0%, #030305 80%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-[60px]"></div>
      </div>

      {/* SVG Animation Canvas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_120s_linear_infinite]"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {nodePositions.map((np, i) => (
            <linearGradient key={`lg-${i}`} id={`lg-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.5" />
              <stop offset="100%" stopColor={np.hasAnswer ? '#c084fc' : '#6b21a8'} stopOpacity="0.1" />
            </linearGradient>
          ))}
        </defs>

        {/* Orbit track rings */}
        {[90, 160, 230, 300].map((r, i) => {
           const actualR = Math.min(r, Math.min(cx, cy) - 20);
           return (
             <circle
               key={`orbit-${i}`}
               cx={cx} cy={cy} r={actualR}
               fill="none"
               stroke="#7c3aed"
               strokeWidth="0.5"
               strokeOpacity="0.3"
             />
           );
        })}
        
        {/* Orbit track rings (dashed) */}
        {[125, 195, 265].map((r, i) => {
           const actualR = Math.min(r, Math.min(cx, cy) - 20);
           return (
             <circle
               key={`dashed-orbit-${i}`}
               cx={cx} cy={cy} r={actualR}
               fill="none"
               stroke="#9333ea"
               strokeWidth="0.5"
               strokeDasharray="4 8"
               strokeOpacity="0.4"
               className="animate-[spin_40s_linear_infinite_reverse]"
               style={{ transformOrigin: `${cx}px ${cy}px` }}
             />
           );
        })}

        {/* Core ambient glow */}
        <circle cx={cx} cy={cy} r="65" fill="url(#coreGlow)" />
        <circle cx={cx} cy={cy} r="35" fill="#f0abfc" filter="url(#glowStrong)" />
        <circle cx={cx} cy={cy} r="20" fill="#ffffff" filter="url(#glow)" />

        {/* Connection lines: center to each node */}
        {nodePositions.map((np, i) => (
          <line
            key={`line-${i}`}
            x1={cx} y1={cy}
            x2={np.x} y2={np.y}
            stroke={`url(#lg-${i})`}
            strokeWidth={0.8}
            style={{ opacity: 0.6 }}
          />
        ))}

        {/* Cross-ring lines (spider-web connections) */}
        {nodePositions.map((np, i) => {
          let next = nodePositions.find((n, j) => j > i && n.ring === np.ring);
          if (!next) {
            // Close the loop
            next = nodePositions.find(n => n.ring === np.ring);
          }
          if (!next || next === np) return null;
          return (
            <line
              key={`ring-line-${i}`}
              x1={np.x} y1={np.y}
              x2={next.x} y2={next.y}
              stroke="#a855f7"
              strokeWidth="0.8"
              strokeOpacity="0.5"
              filter="url(#glow)"
            />
          );
        })}
        
        {/* Inner cross-ring connections (linking ring N to ring N+1) */}
        {nodePositions.map((np, i) => {
          if (np.ring === 4) return null; // highest ring
          // Find closest node in next ring
          const nextRingNodes = nodePositions.filter(n => n.ring === np.ring + 1);
          if (nextRingNodes.length === 0) return null;
          
          // Connect to the one that is closest in angle roughly, 
          // or just pick the one with matching index offset
          const closest = nextRingNodes.reduce((prev, curr) => {
            const distP = Math.pow(prev.x - np.x, 2) + Math.pow(prev.y - np.y, 2);
            const distC = Math.pow(curr.x - np.x, 2) + Math.pow(curr.y - np.y, 2);
            return distC < distP ? curr : prev;
          });
          
          return (
             <line
              key={`inter-ring-line-${i}`}
              x1={np.x} y1={np.y}
              x2={closest.x} y2={closest.y}
              stroke="#9333ea"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          )
        })}

        {/* Nodes */}
        {nodePositions.map((np, i) => {
          const c = nodeColor(np.ring, np.hasAnswer);
          const r = np.hasAnswer ? 5 : 4;
          return (
            <g key={`node-${i}`}>
              {/* Outer ring */}
              <circle
                cx={np.x} cy={np.y} r={r + 3}
                fill="none"
                stroke={c.border}
                strokeWidth={1}
                strokeOpacity={0.7}
              />
              {/* Core */}
              <circle
                cx={np.x} cy={np.y} r={r}
                fill={c.fill}
                stroke={c.glow}
                strokeWidth={1.5}
                filter="url(#glow)"
              />
              {/* Inner dot */}
              <circle
                cx={np.x} cy={np.y} r={r * 0.4}
                fill="#ffffff"
                fillOpacity={0.9}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none"></div>
    </div>
  );
}
