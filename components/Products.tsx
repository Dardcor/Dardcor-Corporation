'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DardcorLogo from './DardcorLogo'

type ActiveModule = 'ai' | 'code' | 'agent'

export default function Products() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('ai')
  
  // CLI State
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Dardcor Agent CLI v1.0.0',
    'Type "help" to see available commands.',
    '',
    'dardcor-agent> '
  ])
  const terminalBottomRef = useRef<HTMLDivElement>(null)

  // AI State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'user', text: 'Analyze the current project dependencies and recommend upgrades.' },
    { sender: 'ai', text: 'I have analyzed your package.json file. You are currently running Next.js v16 and React v19. Your dependencies look solid, but I recommend upgrading framer-motion to v12.4.5 to patch a known layout rendering bug.' }
  ])
  const [aiTyping, setAiTyping] = useState(false)
  const [aiInput, setAiInput] = useState('')

  // Code State
  const [editorFile, setEditorFile] = useState('app/page.tsx')
  const [agentProgress, setAgentProgress] = useState(0)
  const [editorCode, setEditorCode] = useState(`import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}`)

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminalHistory])

  // CLI Command Handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = terminalInput.trim().toLowerCase()
    if (!input) return

    let response: string[] = []
    
    switch (input) {
      case 'help':
        response = [
          'Available commands:',
          '  help          - Display this help message',
          '  status        - Show active agent and task statuses',
          '  run [agent]   - Start a autonomous code-generation pipeline',
          '  system-info   - Show details about LLM gateways and plugins',
          '  clear         - Clear terminal history'
        ]
        break
      case 'status':
        response = [
          'Dardcor Agent Status: ONLINE',
          'Active Task: Idle',
          'Memory Usage: 45MB / 512MB',
          'Active Gateway: Gemini 3.5 Flash',
          'API Endpoints: Connected (3/3)'
        ]
        break
      case 'system-info':
        response = [
          'Dardcor Agent Core v1.0.0',
          '-------------------------',
          'Gateways Configured: OpenAI, Anthropic, Google Gemini',
          'Plugin Engine: Enabled',
          'Workspace Root: c:/Users/Dardcor/Documents/My Project',
          'Terminal Emulator: Active TUI Mode'
        ]
        break
      case 'clear':
        setTerminalHistory(['dardcor-agent> '])
        setTerminalInput('')
        return
      case 'run':
      case 'run agent':
      case 'run code-agent':
        response = [
          'Initializing autonomous coding agent...',
          '  [✓] Scanning workspace files...',
          '  [✓] Creating execution plan (13 tasks identified)...',
          '  [✓] Generating component structures...',
          '  [!] Running lint and test validation suites...',
          '  [✓] Tests Passed! 12 unit tests, 4 integration tests.',
          '  [✓] Deployment payload packed.',
          'Agent successfully completed run in 4.2s.'
        ]
        break
      default:
        response = [`Command not found: "${input}". Type "help" for a list of commands.`]
    }

    setTerminalHistory(prev => [
      ...prev.slice(0, -1),
      `dardcor-agent> ${terminalInput}`,
      ...response,
      '',
      'dardcor-agent> '
    ])
    setTerminalInput('')
  }

  // AI Prompt Helper
  const triggerAiResponse = (userText: string) => {
    if (aiTyping) return
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }])
    setAiTyping(true)

    setTimeout(() => {
      let aiText = ''
      if (userText.includes('skills')) {
        aiText = 'The Dardcor Agent uses a dynamic skills system. You can define new skills in standard Markdown files placed in the `skills/` directory. Each skill is registered with frontmatter configuration specifying the execution patterns and CLI shortcuts.'
      } else if (userText.includes('generate')) {
        aiText = 'I am generating the SVG assets for your interface. I have initialized the layout, embedded appropriate gradient fills, and applied drop shadows to match the dark futuristic branding.'
      } else {
        aiText = `Sure! I have completed analyzing that task. I recommend setting up a modular routing layout in Next.js. I can auto-generate the file tree and template code for this module if you like.`
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiText }])
      setAiTyping(false)
    }, 1500)
  }

  // Simulated Code Writing loop
  useEffect(() => {
    if (activeModule !== 'code') return
    const codes = [
      `import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}`,
      `import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Products from '@/components/Products'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Products />
    </main>
  )
}`,
      `import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#04060C] text-white">
      <Navbar />
      <Hero />
      <Products />
      <Footer />
    </main>
  )
}`
    ]

    let codeIdx = 0
    const interval = setInterval(() => {
      codeIdx = (codeIdx + 1) % codes.length
      setEditorCode(codes[codeIdx])
      setAgentProgress(prev => (prev + 33) % 100)
    }, 3500)

    return () => clearInterval(interval)
  }, [activeModule])

  return (
    <section id="products" className="relative py-24 bg-[#04060C] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-page relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            The Suite
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400">Ecosystem</span>
          </h2>
          <p className="text-base text-[var(--color-gray)] leading-relaxed">
            Three core products engineering the future through artificial intelligence, autonomous coding, and terminal execution.
          </p>
        </div>

        {/* Modules Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: DARDCOR AI */}
          <div
            onClick={() => setActiveModule('ai')}
            className={`cursor-pointer group relative rounded-xl border p-8 flex flex-col justify-between transition-all duration-500 select-none ${
              activeModule === 'ai'
                ? 'bg-gradient-to-b from-blue-500/10 to-transparent border-blue-500/40 shadow-lg shadow-blue-500/10'
                : 'bg-black/40 border-white/5 hover:border-blue-500/20 hover:bg-black/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <DardcorLogo size={42} variant="blue" animated={activeModule === 'ai'} />
                <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">AI-MODULE</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white leading-none mb-1">DARDCOR AI</h3>
              <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-4 uppercase">ARTIFICIAL INTELLIGENCE</p>
              <p className="text-sm text-[var(--color-gray)] leading-relaxed mb-6">
                Intelligent conversational interface and context engine. Seamless multi-file analysis and high-fidelity asset generation.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
              Interactive Chat Simulator
            </span>
          </div>

          {/* Card 2: DARDCOR CODE */}
          <div
            onClick={() => setActiveModule('code')}
            className={`cursor-pointer group relative rounded-xl border p-8 flex flex-col justify-between transition-all duration-500 select-none ${
              activeModule === 'code'
                ? 'bg-gradient-to-b from-purple-500/10 to-transparent border-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'bg-black/40 border-white/5 hover:border-purple-500/20 hover:bg-black/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <DardcorLogo size={42} variant="purple" animated={activeModule === 'code'} />
                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">IDE-AGENT</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white leading-none mb-1">DARDCOR CODE</h3>
              <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-4 uppercase">EDITOR AGENT</p>
              <p className="text-sm text-[var(--color-gray)] leading-relaxed mb-6">
                An agent-first workspace context. Automate directory structures, draft source edits, and validate unit tests inline.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
              Interactive Code Editor Simulator
            </span>
          </div>

          {/* Card 3: DARDCOR AGENT */}
          <div
            onClick={() => setActiveModule('agent')}
            className={`cursor-pointer group relative rounded-xl border p-8 flex flex-col justify-between transition-all duration-500 select-none ${
              activeModule === 'agent'
                ? 'bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                : 'bg-black/40 border-white/5 hover:border-emerald-500/20 hover:bg-black/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <DardcorLogo size={42} variant="green" animated={activeModule === 'agent'} />
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">CLI-TOOL</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white leading-none mb-1">DARDCOR AGENT</h3>
              <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-4 uppercase">TERMINAL AGENT</p>
              <p className="text-sm text-[var(--color-gray)] leading-relaxed mb-6">
                Multi-provider LLM terminal gateway. Employs background execution loops, customizable skills configurations, and sandboxed runtimes.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
              Interactive Terminal CLI Simulator
            </span>
          </div>

        </div>

        {/* Sandbox Simulator Interface Console */}
        <div className="relative rounded-xl border border-white/10 bg-black/80 shadow-2xl overflow-hidden w-full max-w-5xl mx-auto h-[480px]">
          
          {/* Console Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-xs font-semibold text-gray-400 font-mono ml-4 select-none">
                dardcor_sandbox_{activeModule}_terminal.sh
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-ping ${
                activeModule === 'ai' ? 'bg-blue-400' : activeModule === 'code' ? 'bg-purple-400' : 'bg-emerald-400'
              }`} />
              <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">
                simulating_{activeModule}_runtime
              </span>
            </div>
          </div>

          {/* Console Body */}
          <div className="h-[400px] overflow-y-auto p-6 font-mono text-sm leading-relaxed text-gray-300">
            <AnimatePresence mode="wait">
              
              {/* DARDCOR AI SIMULATOR */}
              {activeModule === 'ai' && (
                <motion.div
                  key="ai-sim"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col justify-between h-full"
                >
                  <div className="space-y-4 overflow-y-auto pr-2 max-h-[300px]">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-gray-500 mb-1 font-bold tracking-wider">
                          {msg.sender === 'user' ? 'WORKSPACE USER' : 'DARDCOR AI ASSISTANT'}
                        </span>
                        <div className={`px-4 py-3 rounded-lg max-w-[80%] leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-blue-500/10 border border-blue-500/20 text-blue-200'
                            : 'bg-white/[0.04] border border-white/5 text-gray-200'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {aiTyping && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>Dardcor AI is reading workspace context...</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                      </div>
                    )}
                  </div>

                  {/* AI Sandbox Input Suggestions */}
                  <div className="border-t border-white/5 pt-4 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex flex-wrap gap-2 text-xs w-full md:w-auto">
                      <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center select-none">Quick Prompts:</span>
                      <button
                        onClick={() => triggerAiResponse('Tell me about active skill files in Gemini folder')}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/5 hover:border-blue-500/40 text-gray-400 hover:text-blue-300 transition-colors text-left"
                      >
                        /skills
                      </button>
                      <button
                        onClick={() => triggerAiResponse('Generate layout elements for the brand showcase')}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/5 hover:border-blue-500/40 text-gray-400 hover:text-blue-300 transition-colors text-left"
                      >
                        /generate-elements
                      </button>
                    </div>
                    <div className="flex-1 w-full relative">
                      <input
                        type="text"
                        placeholder="Type to chat with Dardcor AI..."
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && aiInput.trim()) {
                            triggerAiResponse(aiInput)
                            setAiInput('')
                          }
                        }}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                      <button 
                        onClick={() => {
                          if (aiInput.trim()) {
                            triggerAiResponse(aiInput)
                            setAiInput('')
                          }
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-blue-400 font-bold tracking-wider hover:text-white"
                      >
                        SEND
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DARDCOR CODE SIMULATOR */}
              {activeModule === 'code' && (
                <motion.div
                  key="code-sim"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-12 gap-4 h-full"
                >
                  {/* File tree sidebar */}
                  <div className="col-span-3 border-r border-white/5 pr-4 flex flex-col select-none">
                    <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-3">WORKSPACE FILES</div>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div 
                        onClick={() => setEditorFile('app/page.tsx')}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded transition-colors ${editorFile === 'app/page.tsx' ? 'bg-purple-500/10 text-purple-300' : 'hover:bg-white/5'}`}
                      >
                        📄 page.tsx
                      </div>
                      <div 
                        onClick={() => setEditorFile('components/Hero.tsx')}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded transition-colors ${editorFile === 'components/Hero.tsx' ? 'bg-purple-500/10 text-purple-300' : 'hover:bg-white/5'}`}
                      >
                        📄 Hero.tsx
                      </div>
                      <div 
                        onClick={() => setEditorFile('package.json')}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded transition-colors ${editorFile === 'package.json' ? 'bg-purple-500/10 text-purple-300' : 'hover:bg-white/5'}`}
                      >
                        ⚙️ package.json
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">AUTONOMOUS BUILDER</div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${agentProgress}%` }} />
                      </div>
                      <div className="text-[9px] text-purple-400 mt-1 select-none font-bold">LINT STATUS: PASSING (99%)</div>
                    </div>
                  </div>

                  {/* Code editor */}
                  <div className="col-span-9 flex flex-col justify-between bg-black/40 border border-white/5 rounded-lg p-4 overflow-hidden relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 select-none">
                      <span className="text-xs text-gray-500 font-bold">{editorFile} (editing...)</span>
                      <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
                        AI Agent active
                      </span>
                    </div>
                    <pre className="text-xs text-emerald-400/90 leading-relaxed overflow-x-auto overflow-y-auto flex-1 font-mono">
                      <code>{editorCode}</code>
                    </pre>
                    <div className="absolute right-4 bottom-4 w-48 p-3 rounded bg-black/90 border border-purple-500/20 shadow-xl flex items-center gap-3 select-none animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                      <span className="text-[10px] text-purple-300 font-bold tracking-wider">AGENT: WRITING DIFFS...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DARDCOR AGENT SIMULATOR (CLI TERMINAL) */}
              {activeModule === 'agent' && (
                <motion.div
                  key="agent-sim"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col justify-between h-full"
                >
                  <div className="flex-1 overflow-y-auto font-mono text-xs text-green-400 space-y-1 scrollbar-thin max-h-[310px]">
                    {terminalHistory.map((line, idx) => (
                      <div key={idx} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  {/* CLI Terminal Form */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <span className="text-xs font-bold text-green-500 font-mono select-none">dardcor-agent&gt;</span>
                    <input
                      type="text"
                      className="flex-1 bg-transparent border-none text-xs font-mono text-green-300 focus:outline-none focus:ring-0"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder='Type "help" for a list of commands...'
                      autoFocus
                    />
                    <button type="submit" className="text-[10px] font-bold text-green-400 hover:text-white px-3 py-1 bg-green-500/10 rounded border border-green-500/20">
                      EXECUTE
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
