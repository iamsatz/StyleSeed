import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const DEFAULT_SECTIONS = getDefaultSections('signup')
const SECTION_OPTIONS = getPreviewSections('signup')

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
  btnGhost: { display: 'block', width: '100%', padding: '10px', borderRadius: 9, border: '1px solid var(--hp-border, #d1d5db)', background: 'transparent', color: 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  field: { marginBottom: 12 },
  divider: { display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0', color: 'var(--hp-textMuted, #9ca3af)', fontSize: 12, fontFamily: 'var(--hp-body-font, sans-serif)' },
  dividerLine: { flex: 1, height: 1, background: 'var(--hp-border, #e5e7eb)' },
  link: { color: 'var(--hp-primary, #6366f1)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' },
  muted: { fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' },
  footnote: { textAlign: 'center', fontSize: 13, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', marginTop: 14 },
}

function TrustBadges() {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      {[['SSL secure', '🔒'], ['No card needed', '✓'], ['Free forever', '★']].map(([txt, icon]) => (
        <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, padding: '6px 8px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)' }}>
          <span style={{ fontSize: 11 }}>{icon}</span>
          <span style={{ fontSize: 11, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{txt}</span>
        </div>
      ))}
    </div>
  )
}

function FormBasic() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div>
          <label style={S.label}>First name</label>
          <input style={S.input} placeholder="Jane" readOnly />
        </div>
        <div>
          <label style={S.label}>Last name</label>
          <input style={S.input} placeholder="Doe" readOnly />
        </div>
      </div>
      <div style={S.field}>
        <label style={S.label}>Email address</label>
        <input style={S.input} type="email" placeholder="jane@example.com" readOnly />
      </div>
      <div style={{ ...S.field, marginBottom: 16 }}>
        <label style={S.label}>Password</label>
        <input style={S.input} type="password" placeholder="Min. 8 characters" readOnly />
      </div>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', marginBottom: 16, fontFamily: 'var(--hp-body-font, sans-serif)', cursor: 'pointer' }}>
        <input type="checkbox" readOnly style={{ marginTop: 1, flexShrink: 0 }} />
        I agree to the <a style={S.link}>Terms</a> and <a style={S.link}>Privacy Policy</a>
      </label>
      <button style={S.btnPrimary}>Create account</button>
      <TrustBadges />
    </>
  )
}

function FormDetailed() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div>
          <label style={S.label}>First name</label>
          <input style={S.input} placeholder="Jane" readOnly />
        </div>
        <div>
          <label style={S.label}>Last name</label>
          <input style={S.input} placeholder="Doe" readOnly />
        </div>
      </div>
      <div style={S.field}>
        <label style={S.label}>Work email</label>
        <input style={S.input} type="email" placeholder="jane@company.com" readOnly />
      </div>
      <div style={S.field}>
        <label style={S.label}>Company name</label>
        <input style={S.input} placeholder="Acme Corp" readOnly />
      </div>
      <div style={S.field}>
        <label style={S.label}>Role</label>
        <select style={S.input}>
          <option>Designer</option>
          <option>Engineer</option>
          <option>Product Manager</option>
          <option>Founder</option>
        </select>
      </div>
      <div style={{ ...S.field, marginBottom: 16 }}>
        <label style={S.label}>Password</label>
        <input style={S.input} type="password" placeholder="Min. 8 characters" readOnly />
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          {[1, 2, 3, 4].map((i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 2 ? 'var(--hp-primary, #6366f1)' : 'var(--hp-border, #e5e7eb)' }} />)}
        </div>
        <div style={{ ...S.muted, marginTop: 4 }}>Password strength: Fair</div>
      </div>
      <button style={S.btnPrimary}>Create account</button>
      <TrustBadges />
    </>
  )
}

function FormSocialFirst() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { icon: 'G', label: 'Sign up with Google', bg: '#fff', border: '1px solid var(--hp-border, #d1d5db)', color: 'var(--hp-text, #111827)' },
          { icon: '⬡', label: 'Sign up with GitHub', bg: 'var(--hp-text, #111827)', color: '#fff' },
        ].map(({ icon, label, bg, color, border }) => (
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
        <label style={S.label}>Email address</label>
        <input style={S.input} type="email" placeholder="jane@example.com" readOnly />
      </div>
      <div style={{ ...S.field, marginBottom: 16 }}>
        <label style={S.label}>Password</label>
        <input style={S.input} type="password" placeholder="Create a password" readOnly />
      </div>
      <button style={S.btnPrimary}>Create account</button>
      <TrustBadges />
    </>
  )
}

function StepIndicator({ steps, active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, background: i <= active ? 'var(--hp-primary, #6366f1)' : 'var(--hp-surface, #f9fafb)', color: i <= active ? '#fff' : 'var(--hp-textMuted, #9ca3af)', border: `2px solid ${i <= active ? 'var(--hp-primary, #6366f1)' : 'var(--hp-border, #e5e7eb)'}`, fontFamily: 'var(--hp-body-font, sans-serif)' }}>{i + 1}</div>
            <div style={{ fontSize: 10, color: i === active ? 'var(--hp-primary, #6366f1)' : 'var(--hp-textMuted, #9ca3af)', fontWeight: i === active ? 700 : 400, fontFamily: 'var(--hp-body-font, sans-serif)' }}>{step}</div>
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < active ? 'var(--hp-primary, #6366f1)' : 'var(--hp-border, #e5e7eb)', margin: '0 6px 14px' }} />}
        </React.Fragment>
      ))}
    </div>
  )
}

function LayoutSingle({ formVariant }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)', padding: '32px 24px', background: 'var(--hp-background, #fff)' }}>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 420, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 4 }}>Create your account</div>
          <div style={S.muted}>Join 12,000+ designers and engineers</div>
        </div>
        {formVariant === 'basic' && <FormBasic />}
        {formVariant === 'detailed' && <FormDetailed />}
        {formVariant === 'social-first' && <FormSocialFirst />}
        <p style={S.footnote}>Already have an account? <a style={S.link}>Sign in</a></p>
      </div>
    </div>
  )
}

function LayoutMultiStep({ formVariant }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)', padding: '32px 24px', background: 'var(--hp-background, #fff)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 4 }}>Get started</div>
          <div style={S.muted}>Step 1 of 3 — Create your account</div>
        </div>
        <StepIndicator steps={['Account', 'Plan', 'Finish']} active={0} />
        <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 16, padding: '28px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          {formVariant === 'basic' && <FormBasic />}
          {formVariant === 'detailed' && <FormDetailed />}
          {formVariant === 'social-first' && <FormSocialFirst />}
        </div>
        <p style={S.footnote}>Already have an account? <a style={S.link}>Sign in</a></p>
      </div>
    </div>
  )
}

function LayoutSplit({ formVariant }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ background: 'var(--hp-primary, #6366f1)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-display-font, sans-serif)', lineHeight: 1.2, marginBottom: 16 }}>Build beautiful products with your brand</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--hp-body-font, sans-serif)', lineHeight: 1.65, marginBottom: 32 }}>Join thousands of designers and engineers who build and ship design systems faster with Acme.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['Export CSS variables, Tailwind tokens, and JSON', 'Preview every component with your color kit live', 'Ship accessible color palettes in minutes'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>
              <span style={{ color: 'var(--hp-accent, #34d399)', fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 12 }}>Trusted by teams at</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Stripe', 'Linear', 'Vercel', 'Figma'].map((co) => (
              <span key={co} style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{co}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 36px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ maxWidth: 360, width: '100%' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 4 }}>Create your account</div>
          <div style={{ ...S.muted, marginBottom: 22 }}>Join 12,000+ designers and engineers</div>
          {formVariant === 'basic' && <FormBasic />}
          {formVariant === 'detailed' && <FormDetailed />}
          {formVariant === 'social-first' && <FormSocialFirst />}
          <p style={S.footnote}>Already have an account? <a style={S.link}>Sign in</a></p>
        </div>
      </div>
    </div>
  )
}

export default function PreviewSignUp({ kit, sectionConfig = {}, onSectionChange }) {
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

  const layoutEl = config.layout === 'multi-step'
    ? <LayoutMultiStep formVariant={config.form} />
    : config.layout === 'split'
      ? <LayoutSplit formVariant={config.form} />
      : <LayoutSingle formVariant={config.form} />

  return (
    <div ref={ref} style={S.page}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-background, #fff)' }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)' }}>Acme</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>Already have an account?</span>
          <button style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)', background: 'transparent', color: 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' }}>Sign in</button>
        </div>
      </nav>
      {wrap('layout', wrap('form', layoutEl))}
    </div>
  )
}
