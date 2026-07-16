'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M16 4L4 12v8l12 8 12-8v-8L16 4z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 16L4 8M16 16l12-8M16 16v12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Multi-Model',
    desc: 'Connect to OpenAI, Claude, Gemini, and more — all from one unified interface with hot-swappable providers.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 4v24M4 16h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Agent-First',
    desc: 'Autonomous agents that plan, code, test, and ship. Your development team, multiplied by AI.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 14l4 4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Skills Ecosystem',
    desc: 'Extend capabilities with a rich skills system. Plug in specialized expertise when you need it.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <rect x="3" y="6" width="26" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 12h20M6 18h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Multi-Platform',
    desc: 'Desktop apps for Windows, macOS, and Linux. CLI tools. Web interfaces. Wherever you work.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M8 24l4-4 4 4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 24V8a2 2 0 00-2-2H6a2 2 0 00-2 2v16" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Deployed on Vercel',
    desc: 'Blazing-fast edge deployment with auto-scaling, zero configuration, and global distribution.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 10v6l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Real-Time',
    desc: 'Streaming responses, live collaboration, and instant feedback loops. Zero waiting, maximum velocity.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <div className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Capabilities
          </div>
          <h2 className="section-title">
            Why <span className="text-gradient">Dardcor</span>?
          </h2>
          <p className="section-desc">
            Built for developers who want to move faster with AI, without sacrificing control or quality.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] hover:border-violet-500/20 transition-all duration-300"
            >
              <div className="w-9 h-9 text-violet-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="font-display text-base font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-[var(--color-gray)] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
