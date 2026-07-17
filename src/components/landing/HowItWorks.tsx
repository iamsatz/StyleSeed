import { LayoutGrid, MonitorPlay, Download } from 'lucide-react'
import './landing.css'

const STEPS = [
  {
    icon: LayoutGrid,
    num: '01',
    title: 'Pick your industry',
    body: 'Choose from 8 opinionated kits across SaaS, Finance, Health, Retail, and Creative. Each one is built for the visual language of its space — not a generic color wheel.',
  },
  {
    icon: MonitorPlay,
    num: '02',
    title: 'See it on real components',
    body: 'Your kit renders live on buttons, cards, inputs, navs, alerts, and typography. Toggle light and dark. Hover the 12-step Radix color scales. Know it works before you export.',
  },
  {
    icon: Download,
    num: '03',
    title: 'Export in your AI tool\'s format',
    body: 'Choose Claude, v0, Cursor, or Replit. Each export is formatted for that tool — not a generic JSON dump. Paste it once, stay on-brand forever.',
  },
]

const EXPORTS = [
  {
    file: 'Claude',
    label: 'system-prompt.md',
    desc: 'A design brief with color usage rules, typography guidance, and spacing constraints — written for an AI to read, not a human to skim.',
    color: '#f97316',
  },
  {
    file: 'v0',
    label: 'tailwind.config.js',
    desc: 'Your brand palette as a Tailwind color extension, ready to drop into any shadcn/ui or Tailwind project. Zero configuration needed.',
    color: '#e5e7eb',
  },
  {
    file: 'Cursor',
    label: '.cursor/rules',
    desc: 'CSS custom properties + usage table, formatted as Cursor AI instructions. It reads your design language and applies it while it codes.',
    color: '#6366f1',
  },
  {
    file: 'Replit',
    label: 'replit-prompt.md',
    desc: 'A context block with variable definitions and usage examples, structured for Replit AI to apply your brand in every file it touches.',
    color: '#f15a24',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="hp-hiw">

      {/* Problem banner */}
      <div className="hp-problem-bar">
        <div className="hp-inner hp-problem-bar-inner">
          <div className="hp-problem-col hp-problem-col--bad">
            <span className="hp-problem-tag hp-problem-tag--bad">Without StyleSeed</span>
            <p className="hp-problem-text">AI picks whatever blue looks decent. Your prompt says "modern dashboard" — you get the same slate-600 every other app uses.</p>
          </div>
          <div className="hp-problem-divider" />
          <div className="hp-problem-col hp-problem-col--good">
            <span className="hp-problem-tag hp-problem-tag--good">With StyleSeed</span>
            <p className="hp-problem-text">AI knows your primary is #2563EB for CTAs, your surface is #F8FAFC for cards, and your border is #E2E8F0 for separators. It uses them correctly.</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="hp-inner hp-hiw-steps-section">
        <div className="hp-section-eyebrow">How it works</div>
        <h2 className="hp-section-h2">Three steps. Zero guessing.</h2>
        <p className="hp-section-sub">You bring the product. We bring the design system. Your AI tools bring everything together.</p>

        <div className="hp-steps-grid">
          {STEPS.map(({ icon: Icon, num, title, body }) => (
            <div key={num} className="hp-step-card">
              <div className="hp-step-num-row">
                <div className="hp-step-icon-wrap">
                  <Icon size={18} />
                </div>
                <span className="hp-step-num">{num}</span>
              </div>
              <h3 className="hp-step-title">{title}</h3>
              <p className="hp-step-body">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Export breakdown */}
      <div className="hp-exports-section">
        <div className="hp-inner">
          <div className="hp-section-eyebrow hp-section-eyebrow--light">What you get</div>
          <h2 className="hp-section-h2 hp-section-h2--light">One kit. Four AI-ready formats.</h2>
          <p className="hp-section-sub hp-section-sub--light">Every tool speaks a different language. StyleSeed generates the right one.</p>

          <div className="hp-exports-grid">
            {EXPORTS.map(({ file, label, desc, color }) => (
              <div key={file} className="hp-export-card">
                <div className="hp-export-card-top">
                  <span className="hp-export-tool-name" style={{ color }}>{file}</span>
                  <code className="hp-export-filename">{label}</code>
                </div>
                <p className="hp-export-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
