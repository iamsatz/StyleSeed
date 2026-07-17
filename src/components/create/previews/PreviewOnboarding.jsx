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

const STEPS = ['Set up profile', 'Invite your team', 'Connect tools', 'Go live']
const CHECKLIST = [
  { label: 'Create your account', done: true },
  { label: 'Complete your profile', done: true },
  { label: 'Invite team members', done: false, active: true },
  { label: 'Connect your first tool', done: false },
  { label: 'Launch your workspace', done: false },
]
const SIDEBAR_TIPS = [
  { title: 'Invite early', body: 'Teams that invite members in the first session retain 2x better.' },
  { title: 'Set permissions', body: 'Granular roles help you control access as you grow.' },
  { title: 'Connect tools', body: 'Integrations unlock automation and reduce manual work.' },
]

function OnboardingProgress({ variant }) {
  if (variant === 'steps-bar') {
    return (
      <div style={{ padding: '20px 24px 0', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, maxWidth: 480, margin: '0 auto' }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: '0 0 auto' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: i === 2 ? 'var(--hp-primary)' : i < 2 ? 'var(--hp-success)' : 'var(--hp-surface)',
                  border: i === 2 ? '2px solid var(--hp-primary)' : i < 2 ? '2px solid var(--hp-success)' : '2px solid var(--hp-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 11,
                  color: i <= 2 ? '#fff' : 'var(--hp-textMuted)'
                }}>{i < 2 ? '✓' : i + 1}</div>
                <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 10, color: i === 2 ? 'var(--hp-text)' : 'var(--hp-textMuted)', fontWeight: i === 2 ? 600 : 400, whiteSpace: 'nowrap' }}>{step}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < 2 ? 'var(--hp-success)' : 'var(--hp-border)', marginBottom: 18 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'checklist') {
    return (
      <div style={{ padding: '16px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
        <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, color: 'var(--hp-textMuted)', marginBottom: 10 }}>Setup checklist — 2 of 5 complete</div>
        <div style={{ height: 5, borderRadius: 99, background: 'var(--hp-border)', marginBottom: 12, overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: 'var(--hp-primary)', borderRadius: 99 }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CHECKLIST.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 10px', borderRadius: 6, background: item.active ? 'var(--hp-background)' : 'transparent', border: item.active ? '1px solid var(--hp-border)' : '1px solid transparent' }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: item.done ? 'var(--hp-success)' : item.active ? 'var(--hp-primary)' : 'var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.done ? <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>✓</span> : item.active ? <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>→</span> : null}
              </div>
              <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: item.done ? 'var(--hp-textMuted)' : 'var(--hp-text)', textDecoration: item.done ? 'line-through' : 'none', fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ring
  const pct = 40
  const r = 26
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width={68} height={68} viewBox="0 0 68 68">
        <circle cx={34} cy={34} r={r} fill="none" stroke="var(--hp-border)" strokeWidth={5} />
        <circle cx={34} cy={34} r={r} fill="none" stroke="var(--hp-primary)" strokeWidth={5} strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" transform="rotate(-90 34 34)" />
        <text x={34} y={38} textAnchor="middle" fontFamily="var(--hp-heading-font)" fontWeight={700} fontSize={13} fill="var(--hp-text)">{pct}%</text>
      </svg>
      <div>
        <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 15, color: 'var(--hp-text)', marginBottom: 3 }}>Setup in progress</div>
        <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)', marginBottom: 8 }}>2 of 5 steps completed</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {STEPS.map((step, i) => (
            <div key={step} style={{ width: 32, height: 4, borderRadius: 99, background: i < 2 ? 'var(--hp-primary)' : 'var(--hp-border)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function OnboardingContent({ variant }) {
  const fields = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, color: 'var(--hp-textMuted)', marginBottom: 4 }}>First name</label>
          <input style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-text)', outline: 'none' }} placeholder="Jane" readOnly />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, color: 'var(--hp-textMuted)', marginBottom: 4 }}>Last name</label>
          <input style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-text)', outline: 'none' }} placeholder="Doe" readOnly />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, color: 'var(--hp-textMuted)', marginBottom: 4 }}>Your role</label>
        <input style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-text)', outline: 'none' }} placeholder="e.g. Product Designer" readOnly />
      </div>
      <div>
        <label style={{ display: 'block', fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, color: 'var(--hp-textMuted)', marginBottom: 4 }}>Company</label>
        <input style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-text)', outline: 'none' }} placeholder="e.g. Acme Inc." readOnly />
      </div>
    </div>
  )

  if (variant === 'single-focus') {
    return (
      <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 14 }}>👋</div>
        <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 20, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 8px' }}>Set up your profile</h2>
        <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', margin: '0 0 24px', maxWidth: 380 }}>Help your team find and recognize you. This only takes a minute.</p>
        <div style={{ width: '100%', maxWidth: 380, textAlign: 'left' }}>{fields}</div>
      </div>
    )
  }

  if (variant === 'split') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 300 }}>
        <div style={{ background: 'linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-accent) 100%)', padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>Your workspace is almost ready.</div>
          <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 0 20px' }}>Just a few details and you will be collaborating with your team in minutes.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Fast setup', 'Free 14-day trial', 'No credit card needed'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</div>
                <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 17, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 16px' }}>Tell us about yourself</h2>
          {fields}
        </div>
      </div>
    )
  }

  // with-sidebar
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 0 }}>
      <div style={{ padding: '28px 24px' }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>👤</div>
        <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 18, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 6px' }}>Set up your profile</h2>
        <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', margin: '0 0 20px' }}>Help your team find and recognize you.</p>
        {fields}
      </div>
      <aside style={{ background: 'var(--hp-surface)', borderLeft: '1px solid var(--hp-border)', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)', marginBottom: 2 }}>Tips</div>
        {SIDEBAR_TIPS.map(tip => (
          <div key={tip.title} style={{ padding: '10px 12px', background: 'var(--hp-background)', borderRadius: 8, border: '1px solid var(--hp-border)' }}>
            <div style={{ fontFamily: 'var(--hp-body-font)', fontWeight: 600, fontSize: 12, color: 'var(--hp-text)', marginBottom: 3 }}>{tip.title}</div>
            <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-textMuted)', lineHeight: 1.5 }}>{tip.body}</div>
          </div>
        ))}
      </aside>
    </div>
  )
}

function OnboardingCta({ variant }) {
  if (variant === 'big-primary') {
    return (
      <div style={{ padding: '20px 24px', borderTop: '1px solid var(--hp-border)', background: 'var(--hp-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <button style={{ width: '100%', maxWidth: 380, padding: '13px 0', borderRadius: 8, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.01em' }}>Continue to team setup</button>
        <a style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)', cursor: 'pointer', textDecoration: 'none' }}>Skip for now</a>
      </div>
    )
  }

  // dual-action
  return (
    <div style={{ padding: '18px 24px', borderTop: '1px solid var(--hp-border)', background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
      <a style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)', cursor: 'pointer', textDecoration: 'none' }}>← Back</a>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{ padding: '9px 20px', borderRadius: 7, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 13, cursor: 'pointer' }}>Save draft</button>
        <button style={{ padding: '9px 22px', borderRadius: 7, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Continue</button>
      </div>
    </div>
  )
}

export default function PreviewOnboarding({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const defaults = getDefaultSections('onboarding')
  const config = { ...defaults, ...sectionConfig }
  const sections = getPreviewSections('onboarding')

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
        <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 800, fontSize: 15, color: 'var(--hp-text)' }}>StyleSeed</div>
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Step 3 of 5</span>
        <a style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)', cursor: 'pointer', textDecoration: 'none' }}>Save and exit</a>
      </nav>
      {wrap('progress', <OnboardingProgress variant={config.progress} />)}
      {wrap('content', <OnboardingContent variant={config.content} />)}
      {wrap('cta', <OnboardingCta variant={config.cta} />)}
    </div>
  )
}
