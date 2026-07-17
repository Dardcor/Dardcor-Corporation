'use client'

import { motion } from 'framer-motion'
import DardcorLogo from './DardcorLogo'

const nodes = [
  {
    label: 'Dardcor AI',
    desc: 'Artificial Intelligence',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    bg: 'bg-blue-500/[0.02]',
    variant: 'blue' as const,
  },
  {
    label: 'Dardcor Code',
    desc: 'Editor Agent IDE',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    bg: 'bg-purple-500/[0.02]',
    variant: 'purple' as const,
  },
  {
    label: 'Dardcor Agent',
    desc: 'Terminal CLI Agent',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    bg: 'bg-emerald-500/[0.02]',
    variant: 'green' as const,
  },
]

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-24 bg-transparent border-t border-white/5">
      
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-page relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Pipeline Integration
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">
            How They <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Connect</span>
          </h2>
          <p className="text-base text-[var(--color-gray)] leading-relaxed">
            The modules integrate smoothly, forming an end-to-end loop from architecture planning to live execution.
          </p>
        </div>

        {/* Integration Nodes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-16"
        >
          {nodes.map((node, i) => (
            <div key={node.label} className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
              
              {/* Connector Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex flex-col items-center gap-4 px-10 py-8 rounded-xl border ${node.border} ${node.bg} min-w-[200px] hover:scale-105 hover:bg-black/40 transition-all duration-300`}
              >
                <DardcorLogo size={48} variant={node.variant} animated={true} />
                <div className="text-center">
                  <div className="font-display text-base font-extrabold text-white">{node.label}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{node.desc}</div>
                </div>
              </motion.div>

              {/* Connecting arrows */}
              {i < nodes.length - 1 && (
                <div className="hidden md:flex text-gray-700 w-10 flex-shrink-0">
                  <svg viewBox="0 0 48 24" fill="none" className="w-full">
                    <path d="M4 12h38M32 4l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              {i < nodes.length - 1 && (
                <div className="md:hidden text-gray-700 h-10">
                  <svg viewBox="0 0 24 48" fill="none" className="h-full">
                    <path d="M12 4v36M4 32l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Description Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          <p className="mb-4">
            Use <strong className="text-white">Dardcor AI</strong> to discuss details and draft architectural blueprints.
            Let <strong className="text-white">Dardcor Code</strong> unpack those blueprints and build components autonomously inside your workspace.
            Automate deployment pipelines and checks from <strong className="text-white">Dardcor Agent</strong>.
          </p>
          <span className="text-cyan-400 font-semibold font-display tracking-wider">Three tools. One synchronized ecosystem. Infinite engineering possibilities.</span>
        </motion.div>
        
      </div>
    </section>
  )
}
