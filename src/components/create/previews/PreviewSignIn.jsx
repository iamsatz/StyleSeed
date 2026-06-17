import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const DEFAULT_SECTIONS = getDefaultSections('signin')
const SECTION_OPTIONS = getPreviewSections('signin')

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
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

const S = {
  page: { fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background, #fff)', minHeight: '100vh' },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 5, fontFamily: 'var(--hp-body-font, sans-serif)' },
  input: { display: 'block', width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--hp-border, #d1d5db)', background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-text, #111827)', fontSize: 13, boxSizing: 'border-box', fontFamily: 'var(--hp-body-font, sans-serif)', outline: 'none' },
  btnPrimary: { display: 'block', width: '100%', padding: '11px', borderRadius: 9, border: 'none', background: 'var(--hp-primary, #6366f1)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnGhost: { padding: '9px 0', borderRadius: 8, border: '1px solid var(--hp-border, #d1d5db)', background: 'transparent', color: 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)', flex: 1 },
  divider: { display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0', color: 'var(--hp-textMuted, #9ca3af)', fontSize: 12, fontFamily: 'var(--hp-body-font, sans-serif)' },
  dividerLine: { flex: 1, height: 1, background: 'var(--hp-border, #e5e7eb)' },
  field: { marginBottom: 12 },
  link: { color: 'var(--hp-primary, #6366f1)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' },
  muted: { fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' },
  footnote: { textAlign: 'center', fontSize: 13, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', marginTop: 14 },
}

function FormStandard() {
  return (
    <>
      <div style={S.field}>
        <label style={S.label}>Email address</label>
        <input style={S.input} type="email" placeholder="you@example.com" readOnly />
      </div>
      <div style={{ ...S.field, marginBottom: 4 }}>
        <label style={S.label}>Password</label>
        <input style={S.input} type="password" placeholder="••••••••" readOnly />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0 16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', cursor: 'pointer' }}>
          <input type="checkbox" readOnly /> Remember me
        </label>
        <a style={{ ...S.link, fontSize: 12, fontWeight: 500 }}>Forgot password?</a>
      </div>
      <button style={S.btnPrimary}>Sign in</button>
    </>
  )
}

function FormMagicLink() {
  return (
    <>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 3 }}>No password needed</div>
        <div style={S.muted}>We'll email you a secure sign-in link.</div>
      </div>
      <div style={S.field}>
        <label style={S.label}>Email address</label>
        <input style={S.input} type="email" placeholder="you@example.com" readOnly />
      </div>
      <button style={{ ...S.btnPrimary, marginBottom: 14 }}>Send magic link</button>
      <div style={S.divider}>
        <div style={S.dividerLine} />
        <span>or use password instead</span>
        <div style={S.dividerLine} />
      </div>
      <button style={{ ...S.btnGhost, width: '100%', padding: '9px' }}>Sign in with password</button>
    </>
  )
}

function FormSocialFirst() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { icon: 'G', label: 'Continue with Google', bg: '#fff', border: '1px solid var(--hp-border, #d1d5db)' },
          { icon: '⬡', label: 'Continue with GitHub', bg: 'var(--hp-text, #111827)', color: '#fff', border: 'none' },
          { icon: '▲', label: 'Continue with Microsoft', bg: '#0078d4', color: '#fff', border: 'none' },
        ].map(({ icon, label, bg, color = 'var(--hp-text, #111827)', border }) => (
          <button key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '10px', borderRadius: 9, border: border || 'none', background: bg, color, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' }}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>
      <div style={S.divider}>
        <div style={S.dividerLine} />
        <span>or with email</span>
        <div style={S.dividerLine} />
      </div>
      <div style={S.field}>
        <label style={S.label}>Email</label>
        <input style={S.input} type="email" placeholder="you@example.com" readOnly />
      </div>
      <button style={S.btnPrimary}>Continue</button>
    </>
  )
}

function AuthFormCard({ variant, title, sub }) {
  return (
    <div style={{ maxWidth: 360, width: '100%' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 4 }}>{title}</div>
      <div style={{ ...S.muted, marginBottom: 20 }}>{sub}</div>
      {variant === 'standard' && <FormStandard />}
      {variant === 'magic-link' && <FormMagicLink />}
      {variant === 'social-first' && <FormSocialFirst />}
      <p style={S.footnote}>Don't have an account? <a style={S.link}>Sign up free</a></p>
    </div>
  )
}

function BrandPanel() {
  return (
    <div style={{ background: 'var(--hp-primary, #6366f1)', padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 480 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-heading-font, sans-serif)' }}>Acme</div>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-display-font, sans-serif)', lineHeight: 1.25, margin: '0 0 12px' }}>Design systems that feel alive</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--hp-body-font, sans-serif)', lineHeight: 1.6, margin: '0 0 28px' }}>Build, preview, and export your color kit in minutes. Trusted by 12,000+ designers and engineers.</p>
        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
          {[['12K+', 'Users'], ['200+', 'Kits'], ['99.9%', 'Uptime']].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-display-font, sans-serif)' }}>{val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--hp-body-font, sans-serif)' }}>Recent activity</div>
          {['Alice joined the Pro plan', 'Carlos exported a dark kit', '3 new kits trending'].map((evt) => (
            <div key={evt} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 6, fontFamily: 'var(--hp-body-font, sans-serif)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--hp-accent, #34d399)', flexShrink: 0, display: 'inline-block' }} />
              {evt}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LayoutCentered({ formVariant }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)', padding: '40px 24px', background: 'var(--hp-background, #fff)' }}>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <AuthFormCard variant={formVariant} title="Welcome back" sub="Sign in to your account to continue" />
      </div>
    </div>
  )
}

function LayoutSplit({ formVariant }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <BrandPanel />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 36px', background: 'var(--hp-background, #fff)' }}>
        <AuthFormCard variant={formVariant} title="Welcome back" sub="Sign in to your account to continue" />
      </div>
    </div>
  )
}

function LayoutFullBleed({ formVariant }) {
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 56px)', background: 'var(--hp-primary, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--hp-primary, #6366f1) 0%, var(--hp-secondary, #8b5cf6) 100%)', opacity: 0.9 }} />
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--hp-background, #fff)', borderRadius: 18, padding: '40px 36px', width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--hp-primary, #6366f1)', fontFamily: 'var(--hp-heading-font, sans-serif)' }}>Acme</div>
        </div>
        <AuthFormCard variant={formVariant} title="Sign in" sub="Enter your credentials to access your account" />
      </div>
    </div>
  )
}

export default function PreviewSignIn({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const config = { ...DEFAULT_SECTIONS, ...sectionConfig }

  function wrap(sectionKey, children) {
    const sectionDef = SECTION_OPTIONS.find((s) => s.key === sectionKey)
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

  const layoutEl = config.layout === 'split'
    ? <LayoutSplit formVariant={config.form} />
    : config.layout === 'full-bleed'
      ? <LayoutFullBleed formVariant={config.form} />
      : <LayoutCentered formVariant={config.form} />

  return (
    <div ref={ref} style={S.page}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-background, #fff)' }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)' }}>Acme</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)', background: 'transparent', color: 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' }}>Sign up free</button>
        </div>
      </nav>
      {wrap('layout', wrap('form', layoutEl))}
    </div>
  )
}
