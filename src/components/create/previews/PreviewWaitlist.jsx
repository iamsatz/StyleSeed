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

const TESTIMONIALS = [
  { name: 'Jane D.', role: 'Design Lead at Stripe', quote: "This is exactly what our team needed. Can't wait for launch." },
  { name: 'Mark R.', role: 'Founder, Luma', quote: 'The preview quality is insane. Already saving hours every week.' },
  { name: 'Sarah K.', role: 'Product Designer', quote: 'Finally a tool that treats design systems seriously.' },
]

const LOGOS = ['Stripe', 'Linear', 'Figma', 'Vercel', 'Notion', 'Loom']

const PERKS = [
  { icon: '⚡', title: 'Instant token export', desc: 'CSS variables, Tailwind, and JSON in one click' },
  { icon: '🎨', title: 'Visual color builder', desc: 'Real-time preview across 20 page types' },
  { icon: '🔒', title: 'Team collaboration', desc: 'Share kits and export directly to Figma' },
]

const AVATARS = [
  { init: 'JD', role: 'primary' },
  { init: 'SK', role: 'secondary' },
  { init: 'MR', role: 'accent' },
  { init: 'AL', role: 'success' },
]

// ── Hero variants ────────────────────────────────────────────────────────────

function HeroBold() {
  return (
    <div style={{ padding: '48px 24px 36px', textAlign: 'center', background: 'var(--hp-background)' }}>
      <div style={{ display: 'inline-block', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 20, padding: '4px 14px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Early Access — Limited Spots
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.15 }}>
        Something big<br />is coming
      </h1>
      <p style={{ fontSize: '0.9375rem', color: 'var(--hp-textMuted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.65 }}>
        We're putting the finishing touches on a tool that changes how teams ship design systems. Be first in line.
      </p>
    </div>
  )
}

function HeroSplit() {
  return (
    <div style={{ display: 'flex', gap: 0, background: 'var(--hp-background)' }}>
      <div style={{ flex: 1, padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'inline-block', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 20, padding: '3px 12px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 14, letterSpacing: '0.04em', textTransform: 'uppercase', width: 'fit-content' }}>
          Early Access
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.2 }}>
          Something big is coming
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)', lineHeight: 1.6 }}>
          We're putting the finishing touches on a tool that changes how teams ship design systems.
        </p>
      </div>
      <div style={{ width: 180, flexShrink: 0, background: 'var(--hp-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 20px', gap: 8 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-background)', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Launching in</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[['12', 'Days'], ['04', 'Hrs']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 10px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--hp-background)', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--hp-background)', opacity: 0.7 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroCountdown() {
  return (
    <div style={{ padding: '36px 24px 28px', textAlign: 'center', background: 'var(--hp-background)' }}>
      <div style={{ display: 'inline-block', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 20, padding: '3px 12px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 14, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Early Access — Limited Spots
      </div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.15 }}>
        Something big is coming
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)', maxWidth: 420, margin: '0 auto 20px', lineHeight: 1.65 }}>
        We're putting the finishing touches on a tool that changes how teams ship design systems.
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['12', 'Days'], ['04', 'Hours'], ['32', 'Mins'], ['08', 'Secs']].map(([val, lbl]) => (
          <div key={lbl} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 10, padding: '10px 14px', textAlign: 'center', minWidth: 54 }}>
            <div style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--hp-primary)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Social proof variants ────────────────────────────────────────────────────

function ProofCounter() {
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
      <div style={{ display: 'flex' }}>
        {AVATARS.map(({ init, role }, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: `var(--hp-${role})`, color: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.6875rem', border: '2px solid var(--hp-surface)', marginLeft: i > 0 ? -8 : 0 }}>{init}</div>
        ))}
      </div>
      <span style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)' }}>
        <strong style={{ color: 'var(--hp-text)' }}>1,847 people</strong> already on the waitlist
      </span>
    </div>
  )
}

function ProofTestimonials() {
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)', textAlign: 'center', marginBottom: 14 }}>What early testers say</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="lp-card" style={{ padding: '10px 12px' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--hp-text)', lineHeight: 1.5, fontStyle: 'italic', marginBottom: 8 }}>"{t.quote}"</p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)' }}>{t.name}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProofLogos() {
  return (
    <div style={{ padding: '14px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)', textAlign: 'center' }}>
      <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)', marginBottom: 12 }}>Trusted by teams from</div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {LOGOS.map((logo, i) => (
          <div key={i} style={{ padding: '5px 16px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-textMuted)' }}>{logo}</div>
        ))}
      </div>
    </div>
  )
}

// ── Form variants ────────────────────────────────────────────────────────────

function FormEmailOnly() {
  return (
    <div style={{ padding: '20px 24px', background: 'var(--hp-background)' }}>
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="lp-input" type="email" placeholder="you@company.com" readOnly style={{ flex: 1 }} />
          <button className="lp-btn lp-btn--primary">Join waitlist</button>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', textAlign: 'center', marginTop: 8 }}>No spam, ever. Unsubscribe anytime.</div>
      </div>
    </div>
  )
}

function FormFull() {
  return (
    <div style={{ padding: '20px 24px', background: 'var(--hp-background)' }}>
      <div style={{ maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input className="lp-input" placeholder="First name" readOnly />
          <input className="lp-input" placeholder="Last name" readOnly />
        </div>
        <input className="lp-input" type="email" placeholder="Work email" readOnly />
        <select className="lp-input">
          <option>Role (optional)</option>
          <option>Designer</option>
          <option>Engineer</option>
          <option>Product Manager</option>
          <option>Founder</option>
        </select>
        <button className="lp-btn lp-btn--primary" style={{ width: '100%' }}>Join the waitlist</button>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', textAlign: 'center' }}>No spam, ever. Unsubscribe anytime.</div>
      </div>
    </div>
  )
}

function FormWithPerks() {
  return (
    <div style={{ padding: '20px 24px', background: 'var(--hp-background)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>What you'll get early access to:</div>
          {PERKS.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 8, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>{p.icon}</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 1 }}>{p.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input className="lp-input" type="email" placeholder="you@company.com" readOnly />
            <button className="lp-btn lp-btn--primary" style={{ width: '100%' }}>Join the waitlist</button>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', textAlign: 'center' }}>No spam, ever.</div>
          </div>
          <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {AVATARS.slice(0, 3).map(({ init, role }, i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: `var(--hp-${role})`, color: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.6rem', border: '2px solid var(--hp-surface)', marginLeft: i > 0 ? -6 : 0 }}>{init}</div>
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}><strong style={{ color: 'var(--hp-text)' }}>1,847</strong> already joined</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PreviewWaitlist({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('waitlist')
  const defaults = getDefaultSections('waitlist')
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

  const heroNode =
    config.hero === 'split' ? <HeroSplit /> :
    config.hero === 'countdown' ? <HeroCountdown /> :
    <HeroBold />

  const proofNode =
    config.proof === 'testimonials' ? <ProofTestimonials /> :
    config.proof === 'logos' ? <ProofLogos /> :
    <ProofCounter />

  const formNode =
    config.form === 'full' ? <FormFull /> :
    config.form === 'with-perks' ? <FormWithPerks /> :
    <FormEmailOnly />

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text)' }}>LaunchKit</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link">Pricing</a>
          <a className="lp-app-nav-link">Blog</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Sign In</button>
      </nav>

      {wrap('hero', heroNode)}
      {wrap('proof', proofNode)}
      {wrap('form', formNode)}

      <div style={{ padding: '12px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>© 2025 LaunchKit Inc. — No spam, ever.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms'].map((l, i) => (
            <a key={i} style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', cursor: 'pointer' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
