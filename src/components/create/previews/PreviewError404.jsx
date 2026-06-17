import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  if (kit.typography) {
    const heading = kit.typography.headingFont || kit.typography.displayFont
    const body = kit.typography.bodyFont || heading
    if (heading) el.style.setProperty('--hp-heading-font', `'${heading}', sans-serif`)
    if (body) el.style.setProperty('--hp-body-font', `'${body}', sans-serif`)
    if (kit.typography.displayFont) el.style.setProperty('--hp-display-font', `'${kit.typography.displayFont}', sans-serif`)
    if (kit.typography.monoFont) el.style.setProperty('--hp-mono-font', `'${kit.typography.monoFont}', monospace`)
  }
}

const QUICK_LINKS = [
  { label: 'Dashboard', icon: '⚡' },
  { label: 'Documentation', icon: '📚' },
  { label: 'Pricing', icon: '💰' },
  { label: 'Blog', icon: '✍' },
  { label: 'Community', icon: '💬' },
]

// ── Layout variants ───────────────────────────────────────────────────────────

function LayoutCentered({ recoveryVariant }) {
  return (
    <div style={{ padding: '40px 24px 32px', textAlign: 'center', background: 'var(--hp-background)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)', lineHeight: 1, letterSpacing: '-0.04em' }}>404</div>
        <div style={{ fontSize: '2.5rem', marginTop: -8 }}>🔍</div>
      </div>
      <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 10 }}>Page not found</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)', maxWidth: 400, lineHeight: 1.6, marginBottom: 20 }}>
        Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or you may have mistyped the URL.
      </p>
      <RecoverySection variant={recoveryVariant} />
    </div>
  )
}

function LayoutLeft({ recoveryVariant }) {
  return (
    <div style={{ padding: '40px 32px 32px', background: 'var(--hp-background)' }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)', lineHeight: 1, letterSpacing: '-0.04em' }}>404</div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 10 }}>Page not found</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)', lineHeight: 1.6, marginBottom: 20 }}>
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or you may have mistyped the URL.
          </p>
          <RecoverySection variant={recoveryVariant} />
        </div>
      </div>
    </div>
  )
}

function LayoutFullScreen({ recoveryVariant }) {
  return (
    <div style={{ padding: '0', background: 'var(--hp-primary)', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
      <div style={{ padding: '40px 32px' }}>
        <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--hp-background)', fontFamily: 'var(--hp-heading-font)', lineHeight: 1, letterSpacing: '-0.05em', opacity: 0.9 }}>404</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--hp-background)', fontFamily: 'var(--hp-heading-font)', marginBottom: 10, marginTop: 4 }}>Page not found</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--hp-background)', opacity: 0.75, maxWidth: 380, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>
        <RecoverySectionInverted variant={recoveryVariant} />
      </div>
    </div>
  )
}

// ── Recovery variants ────────────────────────────────────────────────────────

function RecoverySection({ variant }) {
  if (variant === 'back-home') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="lp-btn lp-btn--primary">← Go Back</button>
          <button className="lp-btn lp-btn--ghost">Home</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--hp-success)', fontWeight: 700 }}>●</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>All systems operational</span>
          <a style={{ fontSize: '0.8125rem', color: 'var(--hp-primary)', cursor: 'pointer', fontWeight: 600, marginLeft: 8 }}>Check status →</a>
        </div>
      </div>
    )
  }

  if (variant === 'contact') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: '16px 20px', background: 'var(--hp-surface)', borderRadius: 10, border: '1px solid var(--hp-border)', textAlign: 'center', maxWidth: 360 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 4 }}>Need help? Contact support</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginBottom: 12 }}>Our team is available 9am–6pm Mon–Fri</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Email support</button>
            <button className="lp-btn lp-btn--ghost lp-btn--sm">Open chat</button>
          </div>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">← Back to home</button>
      </div>
    )
  }

  // search-links (default)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ display: 'flex', gap: 6, width: '100%', maxWidth: 380 }}>
        <input className="lp-input" placeholder="Search for a page…" readOnly style={{ flex: 1, fontSize: '0.875rem' }} />
        <button className="lp-btn lp-btn--primary">Search</button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {QUICK_LINKS.map((item, i) => (
          <a key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: '0.8125rem', color: 'var(--hp-text)', cursor: 'pointer', fontWeight: 500 }}>
            <span>{item.icon}</span><span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function RecoverySectionInverted({ variant }) {
  if (variant === 'back-home') {
    return (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button className="lp-btn lp-btn--sm" style={{ background: 'var(--hp-background)', color: 'var(--hp-primary)', fontWeight: 700 }}>← Go Back</button>
        <button className="lp-btn lp-btn--sm" style={{ background: 'transparent', border: '1.5px solid var(--hp-background)', color: 'var(--hp-background)' }}>Home</button>
      </div>
    )
  }

  if (variant === 'contact') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--hp-background)', opacity: 0.85 }}>Need help? Reach our support team</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="lp-btn lp-btn--sm" style={{ background: 'var(--hp-background)', color: 'var(--hp-primary)', fontWeight: 700 }}>Email support</button>
          <button className="lp-btn lp-btn--sm" style={{ background: 'transparent', border: '1.5px solid var(--hp-background)', color: 'var(--hp-background)' }}>Open chat</button>
        </div>
      </div>
    )
  }

  // search-links
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 6, maxWidth: 380, width: '100%' }}>
        <input className="lp-input" placeholder="Search for a page…" readOnly style={{ flex: 1, fontSize: '0.875rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }} />
        <button className="lp-btn lp-btn--sm" style={{ background: 'var(--hp-background)', color: 'var(--hp-primary)', fontWeight: 700 }}>Search</button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {QUICK_LINKS.slice(0, 4).map((item, i) => (
          <a key={i} style={{ padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', fontSize: '0.8125rem', color: 'var(--hp-background)', cursor: 'pointer' }}>
            {item.icon} {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function PreviewError404({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('error')
  const defaults = getDefaultSections('error')
  const config = { ...defaults, ...sectionConfig }

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

  const recoveryVariant = config.recovery

  const layoutNode =
    config.layout === 'left' ? <LayoutLeft recoveryVariant={recoveryVariant} /> :
    config.layout === 'full-screen' ? <LayoutFullScreen recoveryVariant={recoveryVariant} /> :
    <LayoutCentered recoveryVariant={recoveryVariant} />

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text)' }}>Brand</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Home</a>
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link">Docs</a>
          <a className="lp-app-nav-link">Blog</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Sign In</button>
      </nav>

      {wrap('layout', layoutNode)}

      <div style={{ padding: '10px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Error code: 404 · URL: /missing-page</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'Status', 'Help'].map((l, i) => (
            <a key={i} style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', cursor: 'pointer' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
