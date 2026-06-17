import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette?.light || kit.palette || {}
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  if (kit.typography) {
    const headingFont = kit.typography.headingFont || kit.typography.displayFont
    const bodyFont = kit.typography.bodyFont || headingFont
    const displayFont = kit.typography.displayFont || headingFont
    const monoFont = kit.typography.monoFont || 'JetBrains Mono'
    if (displayFont) el.style.setProperty('--hp-display-font', `'${displayFont}', sans-serif`)
    if (headingFont) el.style.setProperty('--hp-heading-font', `'${headingFont}', sans-serif`)
    if (bodyFont) el.style.setProperty('--hp-body-font', `'${bodyFont}', sans-serif`)
    if (monoFont) el.style.setProperty('--hp-mono-font', `'${monoFont}', monospace`)
  }
}

const NAV_TREE = {
  'Getting Started': ['Introduction', 'Installation', 'Quick Start', 'Configuration'],
  'Core Concepts': ['Design Tokens', 'Color Roles', 'Typography', 'Spacing Scale'],
  'Guides': ['Theming', 'Dark Mode', 'Exporting', 'Customization'],
}

const NAV_COMPACT = ['Introduction', 'Installation', 'Design Tokens', 'Color Roles', 'Typography', 'Theming', 'Dark Mode']

const NAV_CATEGORIES = [
  { label: 'Getting Started', count: 4, icon: 'S' },
  { label: 'Core Concepts', count: 4, icon: 'C' },
  { label: 'Guides', count: 4, icon: 'G' },
  { label: 'API Reference', count: 12, icon: 'A' },
]

const TOC_ITEMS = ['Overview', 'Installation', 'Basic usage', 'Configuration options', 'Troubleshooting']

const CODE_SNIPPET = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--hp-primary)',
        surface: 'var(--hp-surface)',
      }
    }
  }
}`

const TERMINAL_LINES = [
  { type: 'cmd', text: '$ npm install @hueprint/tokens' },
  { type: 'out', text: 'added 12 packages in 1.4s' },
  { type: 'cmd', text: '$ npx hueprint init' },
  { type: 'out', text: 'Initializing HuePrint config...' },
  { type: 'success', text: 'Done. Config written to hueprint.config.js' },
]

function DocsSidebar({ variant }) {
  if (variant === 'full-tree') {
    return (
      <aside style={{ width: 200, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '20px 0', overflowY: 'auto' }}>
        <div style={{ padding: '0 16px 12px', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)' }}>Documentation</div>
        {Object.entries(NAV_TREE).map(([section, items]) => (
          <div key={section} style={{ marginBottom: 16 }}>
            <div style={{ padding: '4px 16px', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted)', marginBottom: 2 }}>{section}</div>
            {items.map((item, i) => (
              <a key={item} style={{
                display: 'block', padding: '5px 16px',
                fontFamily: 'var(--hp-body-font)', fontSize: 13,
                color: section === 'Getting Started' && i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)',
                background: section === 'Getting Started' && i === 0 ? 'var(--hp-background)' : 'transparent',
                borderLeft: section === 'Getting Started' && i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent',
                cursor: 'pointer', textDecoration: 'none'
              }}>{item}</a>
            ))}
          </div>
        ))}
      </aside>
    )
  }

  if (variant === 'compact') {
    return (
      <aside style={{ width: 168, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '16px 0', overflowY: 'auto' }}>
        <div style={{ padding: '0 12px 10px', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)' }}>Docs</div>
        {NAV_COMPACT.map((item, i) => (
          <a key={item} style={{
            display: 'block', padding: '4px 12px',
            fontFamily: 'var(--hp-body-font)', fontSize: 12,
            color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)',
            fontWeight: i === 0 ? 600 : 400,
            cursor: 'pointer', textDecoration: 'none'
          }}>{item}</a>
        ))}
      </aside>
    )
  }

  // categories
  return (
    <aside style={{ width: 188, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '16px 12px', overflowY: 'auto' }}>
      <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)', marginBottom: 12 }}>Categories</div>
      {NAV_CATEGORIES.map((cat, i) => (
        <div key={cat.label} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8,
          background: i === 0 ? 'var(--hp-background)' : 'transparent',
          border: i === 0 ? '1px solid var(--hp-border)' : '1px solid transparent',
          marginBottom: 4, cursor: 'pointer'
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: i === 0 ? 'var(--hp-primary)' : 'var(--hp-background)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 11, color: i === 0 ? '#fff' : 'var(--hp-textMuted)', flexShrink: 0 }}>{cat.icon}</div>
          <div>
            <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-text)' : 'var(--hp-textMuted)' }}>{cat.label}</div>
            <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 10, color: 'var(--hp-textMuted)' }}>{cat.count} articles</div>
          </div>
        </div>
      ))}
    </aside>
  )
}

function DocsContent({ variant }) {
  const baseContent = (
    <>
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-primary)', cursor: 'pointer' }}>Docs</span>
        <span style={{ margin: '0 6px', color: 'var(--hp-textMuted)', fontSize: 12 }}>›</span>
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-primary)', cursor: 'pointer' }}>Getting Started</span>
        <span style={{ margin: '0 6px', color: 'var(--hp-textMuted)', fontSize: 12 }}>›</span>
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-text)', fontWeight: 600 }}>Introduction</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0 8px' }}>
        <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 20, fontWeight: 700, color: 'var(--hp-text)', margin: 0 }}>Introduction</h2>
        <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: 'var(--hp-success)', fontSize: 11, fontFamily: 'var(--hp-body-font)', fontWeight: 600 }}>Updated</span>
      </div>
      <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.7, margin: '0 0 10px' }}>Welcome to the documentation. This guide will help you get up and running with our design system in under 5 minutes.</p>
      <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.7, margin: '0 0 14px' }}>Design tokens are the foundational building blocks of your visual language — the raw values of your design decisions expressed as named entities.</p>
    </>
  )

  if (variant === 'wide') {
    return (
      <main style={{ flex: 1, padding: '20px 28px', overflowY: 'auto' }}>
        {baseContent}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--hp-border)' }}>
          <button style={{ padding: '7px 14px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>← Previous</button>
          <button style={{ padding: '7px 14px', borderRadius: 6, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Next: Installation →</button>
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--hp-surface)', borderRadius: 10, border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Was this page helpful?</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '5px 12px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>Yes</button>
            <button style={{ padding: '5px 12px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>No</button>
          </div>
        </div>
      </main>
    )
  }

  // with-toc
  return (
    <main style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
        {baseContent}
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--hp-surface)', borderRadius: 8, border: '1px solid var(--hp-border)' }}>
          <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, color: 'var(--hp-primary)' }}>Tip: </span>
          <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Use CSS variables for runtime theming — swap themes without rebuilding your app.</span>
        </div>
      </div>
      <aside style={{ width: 148, flexShrink: 0, borderLeft: '1px solid var(--hp-border)', padding: '20px 14px', background: 'var(--hp-surface)' }}>
        <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)', marginBottom: 10 }}>On this page</div>
        {TOC_ITEMS.map((item, i) => (
          <a key={item} style={{ display: 'block', padding: '4px 0', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', cursor: 'pointer', textDecoration: 'none', borderLeft: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent', paddingLeft: 8, marginBottom: 2 }}>{item}</a>
        ))}
      </aside>
    </main>
  )
}

function CodeBlock({ variant }) {
  if (variant === 'highlighted') {
    return (
      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--hp-border)' }}>
          <div style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--hp-mono-font)', fontSize: 11, color: 'var(--hp-textMuted)' }}>tailwind.config.js</span>
            <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-primary)', cursor: 'pointer' }}>Copy</span>
          </div>
          <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--hp-background)', fontFamily: 'var(--hp-mono-font)', fontSize: 12, lineHeight: 1.7, color: 'var(--hp-text)', overflowX: 'auto' }}>
            <span style={{ color: 'var(--hp-textMuted)' }}>{'// tailwind.config.js\n'}</span>
            <span style={{ color: 'var(--hp-primary)', fontWeight: 600 }}>module</span>
            <span style={{ color: 'var(--hp-text)' }}>.exports = {'{\n'}</span>
            <span style={{ color: 'var(--hp-text)' }}>{'  '}</span>
            <span style={{ color: 'var(--hp-accent)' }}>theme</span>
            <span style={{ color: 'var(--hp-text)' }}>{': {\n    '}</span>
            <span style={{ color: 'var(--hp-accent)' }}>extend</span>
            <span style={{ color: 'var(--hp-text)' }}>{': { colors: {\n      '}</span>
            <span style={{ color: 'var(--hp-success)' }}>primary</span>
            <span style={{ color: 'var(--hp-text)' }}>{': '}</span>
            <span style={{ color: 'var(--hp-warning)' }}>'var(--hp-primary)'</span>
            <span style={{ color: 'var(--hp-text)' }}>{'\n    }}}}\n}'}</span>
          </pre>
        </div>
      </div>
    )
  }

  if (variant === 'terminal') {
    return (
      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--hp-border)' }}>
          <div style={{ background: '#1e1e2e', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            <span style={{ fontFamily: 'var(--hp-mono-font)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>Terminal</span>
          </div>
          <div style={{ background: '#1a1a2e', padding: '14px 16px' }}>
            {TERMINAL_LINES.map((line, i) => (
              <div key={i} style={{ fontFamily: 'var(--hp-mono-font)', fontSize: 12, lineHeight: 1.8, color: line.type === 'cmd' ? '#a78bfa' : line.type === 'success' ? '#34d399' : 'rgba(255,255,255,0.55)' }}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // tabbed
  return (
    <div style={{ padding: '0 24px 24px' }}>
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--hp-border)' }}>
        <div style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '0 14px', display: 'flex', alignItems: 'center', gap: 0 }}>
          {['npm', 'yarn', 'pnpm'].map((tab, i) => (
            <div key={tab} style={{ padding: '8px 14px', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', borderBottom: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: i === 0 ? 600 : 400 }}>{tab}</div>
          ))}
        </div>
        <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--hp-background)', fontFamily: 'var(--hp-mono-font)', fontSize: 12, lineHeight: 1.7, color: 'var(--hp-text)' }}>
          <span style={{ color: 'var(--hp-textMuted)' }}>$ </span>
          <span>npm install @hueprint/tokens</span>
          {'\n'}
          <span style={{ color: 'var(--hp-textMuted)' }}>$ </span>
          <span>npx hueprint init</span>
        </pre>
      </div>
    </div>
  )
}

export default function PreviewDocumentation({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const defaults = getDefaultSections('docs')
  const config = { ...defaults, ...sectionConfig }
  const sections = getPreviewSections('docs')

  function wrap(sectionKey, children) {
    const sectionDef = sections.find((s) => s.key === sectionKey)
    return (
      <SectionWrapper
        key={sectionKey}
        label={sectionDef?.label || sectionKey}
        sectionKey={sectionKey}
        variants={sectionDef?.variants || []}
        currentVariant={config[sectionKey]}
        onSectionChange={onSectionChange}
      >
        {children}
      </SectionWrapper>
    )
  }

  return (
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font)', background: 'var(--hp-background)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 800, fontSize: 15, color: 'var(--hp-text)' }}>Docs</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {['Guides', 'API Reference', 'Changelog'].map(lnk => (
            <a key={lnk} style={{ fontSize: 12, color: 'var(--hp-textMuted)', cursor: 'pointer', fontFamily: 'var(--hp-body-font)', textDecoration: 'none' }}>{lnk}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)', width: 130, outline: 'none' }} placeholder="Search docs..." readOnly />
          <span style={{ padding: '2px 7px', borderRadius: 4, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-textMuted)' }}>v2.4.1</span>
        </div>
      </nav>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {wrap('sidebar', <DocsSidebar variant={config.sidebar} />)}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {wrap('content', <DocsContent variant={config.content} />)}
          {wrap('code', <CodeBlock variant={config.code} />)}
        </div>
      </div>
    </div>
  )
}
