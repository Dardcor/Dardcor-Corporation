'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import DardcorLogo from './DardcorLogo'
export default function Products() {

  const [chatMessages, setChatMessages] = useState([
    { sender: 'user', text: 'Analyze the current project dependencies and recommend upgrades.' },
    { sender: 'ai', text: 'I have analyzed your package.json file. You are currently running Next.js v16 and React v19. Your dependencies look solid, but I recommend upgrading framer-motion to v12.4.5 to patch a known layout rendering bug.' }
  ])
  const [aiTyping, setAiTyping] = useState(false)
  const [aiInput, setAiInput] = useState('')

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

  useEffect(() => {
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
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // ==========================================
  // STATE 3: DARDCOR AGENT CLI SIMULATOR
  // ==========================================
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Dardcor Agent CLI v1.0.0',
    'Type "help" to see available commands.',
    '',
    'dardcor-agent> '
  ])
  const terminalBottomRef = useRef<HTMLDivElement>(null)
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [terminalHistory])

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

  return (
    <section id="products" className="relative py-32 bg-transparent overflow-hidden">
      
      {/* Background radial overlays */}
      <div className="absolute top-[15%] right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-1/4 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-page relative z-10 space-y-40">
        
        {/* ========================================================
            SECTION 1: DARDCOR AI
            ======================================================== */}
        <div id="dardcor-ai" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <DardcorLogo size={64} variant="purple" animated={true} />
              <div className="flex flex-col gap-0.5">
                <h2 className="flex items-center gap-2.5 m-0 p-0">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">DARDCOR</span>
                  <span className="font-display text-3xl sm:text-4xl font-black text-purple-400 tracking-tight">AI</span>
                </h2>
                <span className="font-mono text-[10px] font-bold text-gray-500 tracking-[0.25em] uppercase">ARTIFICIAL INTELLIGENCE</span>
              </div>
            </div>
            
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Sistem obrolan AI multi-modal dengan kemampuan analisis file mendalam, pencarian web real-time, dan generator gambar terintegrasi. Dirancang untuk mempercepat pemahaman basis kode yang kompleks.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Multi-file drag & drop untuk analisis massal
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Integrasi mesin pencari web untuk konteks terbaru
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Pembuatan aset desain visual instan lewat chat
              </li>
            </ul>

            <div className="pt-6">
              <a
                href="https://dardcor-ai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Launch App
              </a>
            </div>
          </div>

          {/* Right Column: Original Product Render Image with Orbits */}
          <div className="lg:col-span-6 flex justify-center items-center h-[500px]">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center perspective-[1000px]">
              {/* Central Glow */}
              <div className="absolute inset-0 bg-purple-900/30 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
              
              {/* Orbit Rings (Wide Ellipses) */}
              <div className="absolute w-[120%] h-[120%] md:w-[130%] md:h-[130%] rounded-full border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-orbit-1 border-t-transparent border-l-transparent pointer-events-none"></div>
              <div className="absolute w-[140%] h-[110%] md:w-[150%] md:h-[110%] rounded-[50%] border border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.3)] animate-orbit-2 border-b-transparent border-r-transparent pointer-events-none" style={{ transform: 'rotate(30deg)' }}></div>
              <div className="absolute w-[110%] h-[140%] md:w-[110%] md:h-[150%] rounded-[50%] border border-violet-500/50 animate-orbit-3 border-t-transparent border-r-transparent pointer-events-none" style={{ transform: 'rotate(60deg)' }}></div>
              <div className="absolute w-[130%] h-[130%] md:w-[140%] md:h-[140%] rounded-full border border-indigo-500/40 animate-orbit-4 border-b-transparent border-l-transparent pointer-events-none"></div>
              <div className="absolute w-[150%] h-[120%] md:w-[160%] md:h-[130%] rounded-[50%] border border-pink-500/40 animate-orbit-5 border-l-transparent border-r-transparent pointer-events-none" style={{ transform: 'rotate(-45deg)' }}></div>
              <div className="absolute w-[120%] h-[150%] md:w-[130%] md:h-[160%] rounded-[50%] border border-cyan-500/40 animate-orbit-6 border-t-transparent border-b-transparent pointer-events-none" style={{ transform: 'rotate(45deg)' }}></div>
              
              {/* Central Image (Planet Core) */}
              <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border-2 border-purple-400/30 bg-[#050508] relative z-10 shadow-[0_0_60px_rgba(147,51,234,0.4)]">
                <img 
                  src="/Dardcor-AI.png" 
                  alt="Dardcor AI Core" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 scale-[1.1]"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            SECTION 2: DARDCOR CODE (Alternating layout)
            ======================================================== */}
        <div id="dardcor-code" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Code IDE Simulator (Zig-zag swap) */}
          <div className="lg:col-span-6 order-last lg:order-first">
            <div className="relative rounded-xl border border-purple-500/20 bg-black/80 shadow-2xl overflow-hidden h-[420px] grid grid-cols-12">
              
              {/* IDE Sidebar Tree */}
              <div className="col-span-3 border-r border-white/5 p-4 flex flex-col justify-between font-mono text-xs select-none">
                <div>
                  <div className="text-[9px] font-bold text-gray-500 tracking-wider uppercase mb-4">FILES</div>
                  <div className="space-y-2 text-gray-400">
                    <div 
                      onClick={() => setEditorFile('app/page.tsx')}
                      className={`flex items-center gap-1.5 cursor-pointer p-1 rounded transition-colors ${editorFile === 'app/page.tsx' ? 'bg-purple-500/10 text-purple-300' : 'hover:bg-white/5'}`}
                    >
                      📄 page.tsx
                    </div>
                    <div 
                      onClick={() => setEditorFile('components/Hero.tsx')}
                      className={`flex items-center gap-1.5 cursor-pointer p-1 rounded transition-colors ${editorFile === 'components/Hero.tsx' ? 'bg-purple-500/10 text-purple-300' : 'hover:bg-white/5'}`}
                    >
                      📄 Hero.tsx
                    </div>
                    <div 
                      onClick={() => setEditorFile('package.json')}
                      className={`flex items-center gap-1.5 cursor-pointer p-1 rounded transition-colors ${editorFile === 'package.json' ? 'bg-purple-500/10 text-purple-300' : 'hover:bg-white/5'}`}
                    >
                      ⚙️ package.json
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">BUILD PROCESS</div>
                  <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${agentProgress}%` }} />
                  </div>
                  <span className="text-[8px] text-purple-400 font-bold block">TEST SUITE: OK</span>
                </div>
              </div>

              {/* IDE Main Editor */}
              <div className="col-span-9 flex flex-col justify-between p-4 bg-black/40 relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 select-none">
                  <span className="text-xs text-gray-500 font-mono font-bold">{editorFile} (writing...)</span>
                  <span className="text-[8px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase font-mono">
                    IDE Agent Active
                  </span>
                </div>
                <pre className="text-xs text-purple-300/90 leading-relaxed overflow-auto flex-1 font-mono">
                  <code>{editorCode}</code>
                </pre>
                
                {/* Writing diff notification overlay */}
                <div className="absolute right-4 bottom-4 w-44 p-2.5 rounded bg-black/95 border border-purple-500/20 shadow-xl flex items-center gap-2.5 select-none animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                  <span className="text-[9px] text-purple-300 font-bold tracking-wider font-mono">WRITING DIFF CODES...</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <DardcorLogo size={64} variant="purple" animated={true} />
              <div className="flex flex-col gap-0.5">
                <h2 className="flex items-center gap-2.5 m-0 p-0">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">DARDCOR</span>
                  <span className="font-display text-3xl sm:text-4xl font-black text-violet-400 tracking-tight">CODE</span>
                </h2>
                <span className="font-mono text-[10px] font-bold text-gray-500 tracking-[0.25em] uppercase">EDITOR AGENT</span>
              </div>
            </div>
            
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Editor kode berbasis agen otonom. Berinteraksi langsung dengan editor Anda untuk melakukan penulisan berkas baru, modifikasi kode non-kontigu, pengujian unit test secara otomatis, hingga perbaikan bug secara cepat.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Penulisan kode otomatis secara modular & terstruktur
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Pendeteksian & perbaikan error tipe TypeScript
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Pengoperasian unit test otomatis sebelum commit
              </li>
            </ul>

            <div className="pt-6">
              <a
                href="https://dardcor-code.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Launch App
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================
            SECTION 3: DARDCOR AGENT
            ======================================================== */}
        <div id="dardcor-agent" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <DardcorLogo size={64} variant="green" animated={true} />
              <div className="flex flex-col gap-0.5">
                <h2 className="flex items-center gap-2.5 m-0 p-0">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">DARDCOR</span>
                  <span className="font-display text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">AGENT</span>
                </h2>
                <span className="font-mono text-[10px] font-bold text-gray-500 tracking-[0.25em] uppercase">TERMINAL AGENT</span>
              </div>
            </div>
            
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Gerbang (gateway) LLM multi-provider berbasis terminal. Menyediakan lingkungan pengerjaan tugas di latar belakang (background execution), sistem kustomisasi *Skills* berbasis Markdown, serta integrasi ekosistem terpadu.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Interaksi multi-model (OpenAI, Claude, Gemini, dll)
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Sistem kustomisasi kapabilitas lewat modul Skills
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Eksekusi task latar belakang (background worker task)
              </li>
            </ul>

            <div className="pt-6 flex gap-4">
              <a
                href="https://github.com/Dardcor/Dardcor-Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Install Agent
              </a>
              <a
                href="https://www.npmjs.com/package/dardcor-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-bold border border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/30 transition-all duration-300"
              >
                npm package
              </a>
            </div>
          </div>

          {/* Right Column: Terminal CLI Simulator */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl border border-emerald-500/20 bg-black/80 shadow-2xl overflow-hidden h-[420px] flex flex-col justify-between">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-3.5 bg-emerald-500/5 border-b border-emerald-500/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400/80 uppercase tracking-widest">
                  dardcor_agent_cli.sh
                </span>
              </div>

              {/* CLI Body */}
              <div className="flex-1 overflow-y-auto p-6 font-mono text-xs text-green-400 space-y-1.5 scrollbar-thin max-h-[310px]">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* CLI Terminal Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/5 p-4 bg-white/[0.005]">
                <span className="text-xs font-bold text-green-500 font-mono select-none">dardcor-agent&gt;</span>
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none text-xs font-mono text-green-300 focus:outline-none focus:ring-0 p-0"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder='Ketik "help" untuk melihat perintah...'
                />
                <button type="submit" className="text-[10px] font-bold text-green-400 hover:text-white px-3 py-1.5 bg-green-500/10 rounded border border-green-500/20 font-mono">
                  ENTER
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
