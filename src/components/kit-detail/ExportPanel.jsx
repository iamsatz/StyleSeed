import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  generateClaudePrompt,
  generateV0Config,
  generateCursorRules,
  generateReplitPrompt,
} from '../../lib/exportGenerators'
import './ExportPanel.css'

const TABS = [
  {
    id: 'claude',
    label: 'Claude',
    icon: '◆',
    outputType: 'System prompt · Paste into Project Instructions',
    filename: 'system-prompt.md',
    ext: 'md',
    description:
      'A markdown system prompt for Claude. Paste this into Claude\'s system prompt field to give it full context about your design system — colors, usage rules, typography, and spacing.',
    howTo: [
      'Go to Claude.ai and open or create a Project.',
      'Click "Project Instructions" in the project sidebar.',
      'Paste this file. Every chat in that project will now use your design system.',
    ],
    generate: generateClaudePrompt,
  },
  {
    id: 'v0',
    label: 'v0',
    icon: '▲',
    outputType: 'Tailwind config · Merge into tailwind.config.js',
    filename: 'tailwind.config.js',
    ext: 'js',
    description:
      'A Tailwind CSS config snippet for v0 by Vercel. Paste or merge this into your tailwind.config.js to make your brand tokens available as Tailwind utility classes.',
    howTo: [
      'In your project, open tailwind.config.js.',
      'Merge the theme.extend.colors block from this file.',
      'Use the color tokens in your v0 prompts (e.g. "use brand-primary").',
    ],
    generate: generateV0Config,
  },
  {
    id: 'cursor',
    label: 'Cursor',
    icon: '⬡',
    outputType: 'Rules file · Place at .cursor/rules',
    filename: '.cursor/rules',
    ext: 'md',
    description:
      'A Cursor rules file with design token context. Place this at .cursor/rules in your project so Cursor AI understands your color system and coding conventions.',
    howTo: [
      'In your project root, create the folder .cursor/ if it doesn\'t exist.',
      'Save this file as .cursor/rules.',
      'Cursor will reference it automatically when writing components.',
    ],
    generate: generateCursorRules,
  },
  {
    id: 'replit',
    label: 'Replit',
    icon: '◉',
    outputType: 'AI context block · Paste into Replit AI instructions',
    filename: 'replit-prompt.md',
    ext: 'md',
    description:
      'A Replit AI context block with CSS variable definitions and usage rules. Add this to your project so Replit AI generates on-brand components with the correct tokens.',
    howTo: [
      'Open Replit AI in your project.',
      'Click the context / instructions area.',
      'Paste this block so Replit AI generates on-brand components.',
    ],
    generate: generateReplitPrompt,
  },
]

export default function ExportPanel({ kit }) {
  const [activeTab, setActiveTab] = useState('claude')
  const [copied, setCopied] = useState(false)
  const [howToOpen, setHowToOpen] = useState(false)

  const tab = TABS.find((t) => t.id === activeTab)
  const output = tab && kit ? tab.generate(kit) : ''

  const handleTabChange = useCallback((id) => {
    setActiveTab(id)
    setHowToOpen(false)
    setCopied(false)
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = output
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [output])

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = tab.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, tab])

  if (!kit) return null

  return (
    <section className="export-panel" id="export-panel">
      <div className="export-panel-header">
        <h2 className="export-panel-title">Export for AI Tools</h2>
        <p className="export-panel-subtitle">
          Generate tool-specific output from your design tokens — ready to paste into Claude, v0, Cursor, or Replit.
        </p>
        <Link
          to={`/preview?kit=${encodeURIComponent(kit.id || 'saas-clarity')}&mode=light`}
          className="export-preview-handoff"
        >
          Preview pasted code with this kit →
        </Link>
      </div>

      <div className="export-target-grid" role="tablist" aria-label="AI tool selector">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={`export-target-card${activeTab === t.id ? ' export-target-card--active' : ''}`}
            onClick={() => handleTabChange(t.id)}
          >
            <span className="export-target-icon" aria-hidden="true">{t.icon}</span>
            <span className="export-target-name">{t.label}</span>
            <span className="export-target-output">{t.outputType}</span>
          </button>
        ))}
      </div>

      <div className="export-panel-body">
        <p className="export-usage-hint">{tab.description}</p>

        <div className="export-code-wrapper">
          <div className="export-code-toolbar">
            <span className="export-code-filename">{tab.filename}</span>
            <div className="export-code-actions">
              <button
                className={`export-action-btn${copied ? ' export-action-btn--copied' : ''}`}
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
              <button
                className="export-action-btn"
                onClick={handleDownload}
                title="Download file"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="export-code-block">
            <code>{output}</code>
          </pre>
        </div>

        <div className="export-how-to">
          <button
            className="export-how-to-toggle"
            onClick={() => setHowToOpen((o) => !o)}
            aria-expanded={howToOpen}
          >
            <span>How to use this</span>
            <span className={`export-how-to-chevron${howToOpen ? ' export-how-to-chevron--open' : ''}`}>↓</span>
          </button>
          {howToOpen && (
            <ol className="export-how-to-steps">
              {tab.howTo.map((step, i) => (
                <li key={i} className="export-how-to-step">
                  <span className="export-how-to-num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
