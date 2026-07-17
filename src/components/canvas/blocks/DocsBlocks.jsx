import React from 'react'

const NAV_TREE = {
  'Getting Started': ['Introduction', 'Installation', 'Quick Start'],
  'Core Concepts': ['Design Tokens', 'Color Roles', 'Typography'],
  'Guides': ['Theming', 'Dark Mode', 'Exporting'],
}

const CODE = `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--hp-primary)',
        surface: 'var(--hp-surface)',
      }
    }
  }
}`

export function DocsSidebarBlock({ variant = 'full-tree' }) {
  if (variant === 'compact') {
    return (
      <div className="cv-block" style={{ display: 'flex', background: 'var(--hp-background)' }}>
        <aside style={{ width: 168, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '16px 0' }}>
          <div style={{ padding: '0 12px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)' }}>Docs</div>
          {['Introduction', 'Installation', 'Design Tokens', 'Theming'].map((item, i) => (
            <div key={item} style={{ padding: '4px 12px', fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)' }}>{item}</div>
          ))}
        </aside>
        <div style={{ flex: 1, padding: 20, fontSize: 13, color: 'var(--hp-textMuted)' }}>Content area →</div>
      </div>
    )
  }
  if (variant === 'categories') {
    return (
      <div className="cv-block" style={{ display: 'flex', background: 'var(--hp-background)' }}>
        <aside style={{ width: 188, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '16px 12px' }}>
          {[
            { label: 'Getting Started', count: 4, icon: 'S' },
            { label: 'Core Concepts', count: 4, icon: 'C' },
            { label: 'Guides', count: 4, icon: 'G' },
          ].map((cat, i) => (
            <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: i === 0 ? 'var(--hp-background)' : 'transparent', border: i === 0 ? '1px solid var(--hp-border)' : '1px solid transparent', marginBottom: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: i === 0 ? 'var(--hp-primary)' : 'var(--hp-background)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: i === 0 ? '#fff' : 'var(--hp-textMuted)' }}>{cat.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-text)' : 'var(--hp-textMuted)' }}>{cat.label}</div>
                <div style={{ fontSize: 10, color: 'var(--hp-textMuted)' }}>{cat.count} articles</div>
              </div>
            </div>
          ))}
        </aside>
        <div style={{ flex: 1, padding: 20, fontSize: 13, color: 'var(--hp-textMuted)' }}>Content area →</div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ display: 'flex', background: 'var(--hp-background)', minHeight: 280 }}>
      <aside style={{ width: 200, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '20px 0' }}>
        <div style={{ padding: '0 16px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)' }}>Documentation</div>
        {Object.entries(NAV_TREE).map(([section, items]) => (
          <div key={section} style={{ marginBottom: 14 }}>
            <div style={{ padding: '4px 16px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--hp-textMuted)' }}>{section}</div>
            {items.map((item, i) => (
              <div key={item} style={{ padding: '5px 16px', fontSize: 13, color: section === 'Getting Started' && i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', background: section === 'Getting Started' && i === 0 ? 'var(--hp-background)' : 'transparent', borderLeft: section === 'Getting Started' && i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent' }}>{item}</div>
            ))}
          </div>
        ))}
      </aside>
      <div style={{ flex: 1, padding: 24 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>Introduction</h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--hp-textMuted)', lineHeight: 1.6 }}>StyleSeed helps you build, preview, and export design systems for AI coding tools.</p>
      </div>
    </div>
  )
}

export function DocsContentBlock({ variant = 'wide', config }) {
  const title = config?.title?.trim()
  const pad = 'var(--cv-block-pad, 24px)'
  if (variant === 'with-toc') {
    return (
      <div className="cv-block" style={{ display: 'flex', gap: 'var(--cv-block-gap, 24px)', padding: pad, background: 'var(--hp-background)' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 'calc(1.125rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{title || 'Installation'}</h2>
          <p style={{ margin: '0 0 16px', fontSize: '0.875rem', color: 'var(--hp-textMuted)', lineHeight: 1.65 }}>Install StyleSeed tokens in your project and configure your design kit.</p>
          <div style={{ padding: '12px 14px', background: 'var(--hp-text)', borderRadius: 8, fontFamily: 'var(--hp-mono-font)', fontSize: '0.75rem', color: '#e5e7eb' }}>npm install @styleseed/tokens</div>
        </div>
        <aside style={{ width: 140, flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', marginBottom: 10 }}>On this page</div>
          {['Overview', 'Installation', 'Configuration', 'Next steps'].map((item, i) => (
            <div key={item} style={{ fontSize: 12, padding: '4px 0', color: i === 1 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', fontWeight: i === 1 ? 600 : 400 }}>{item}</div>
          ))}
        </aside>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: `${pad} 32px`, background: 'var(--hp-background)', maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 'calc(1.25rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{title || 'Quick Start'}</h2>
      <p style={{ margin: '0 0 16px', fontSize: '0.875rem', color: 'var(--hp-textMuted)', lineHeight: 1.65 }}>Get up and running with StyleSeed in under five minutes. Browse a kit, customize colors, and export to your AI tool.</p>
      <ol style={{ margin: 0, paddingLeft: 20, fontSize: '0.875rem', color: 'var(--hp-text)', lineHeight: 1.8 }}>
        <li>Browse curated kits by industry</li>
        <li>Customize palette and typography</li>
        <li>Export for Claude, v0, or Cursor</li>
      </ol>
    </div>
  )
}

export function DocsCodeBlock({ variant = 'highlighted' }) {
  if (variant === 'terminal') {
    return (
      <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
        <div style={{ background: '#0f172a', borderRadius: 10, padding: '14px 16px', fontFamily: 'var(--hp-mono-font)', fontSize: '0.8125rem' }}>
          {[
            { type: 'cmd', text: '$ npm install @styleseed/tokens' },
            { type: 'out', text: 'added 12 packages in 1.4s' },
            { type: 'cmd', text: '$ npx styleseed init' },
            { type: 'success', text: 'Done. Config written.' },
          ].map((line, i) => (
            <div key={i} style={{ color: line.type === 'cmd' ? '#94a3b8' : line.type === 'success' ? 'var(--hp-success)' : '#64748b', marginBottom: 4 }}>{line.text}</div>
          ))}
        </div>
      </div>
    )
  }
  if (variant === 'tabbed') {
    return (
      <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
        <div style={{ border: '1px solid var(--hp-border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--hp-border)', background: 'var(--hp-surface)' }}>
            {['tailwind.config.js', 'tokens.css'].map((tab, i) => (
              <div key={tab} style={{ padding: '8px 14px', fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', borderBottom: i === 0 ? '2px solid var(--hp-primary)' : 'none' }}>{tab}</div>
            ))}
          </div>
          <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--hp-text)', color: '#e5e7eb', fontFamily: 'var(--hp-mono-font)', fontSize: '0.75rem', overflow: 'auto' }}>{CODE}</pre>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', marginBottom: 8 }}>Example</div>
      <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 10, fontFamily: 'var(--hp-mono-font)', fontSize: '0.75rem', color: 'var(--hp-text)', overflow: 'auto' }}>{CODE}</pre>
    </div>
  )
}
