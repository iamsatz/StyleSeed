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

const SKILLS = ['Product Strategy', 'System Design', 'Figma', 'React', 'Design Tokens', 'User Research']
const PROJECTS = [
  { name: 'Atlas Design System', role: 'Lead Designer', year: '2024', tag: 'Systems' },
  { name: 'Fintrack Dashboard', role: 'Product Designer', year: '2023', tag: 'Analytics' },
  { name: 'Onboard AI', role: 'UX Lead', year: '2023', tag: 'AI' },
  { name: 'Signal Mobile', role: 'UI Designer', year: '2022', tag: 'Mobile' },
]
const CASE_STUDIES = [
  { title: 'Redesigning enterprise onboarding from scratch', category: 'UX Strategy', time: '8 min read', img: '01' },
  { title: 'A design system that scaled across six products', category: 'Systems', time: '12 min read', img: '02' },
  { title: 'Rethinking data density in a financial dashboard', category: 'Data / UI', time: '6 min read', img: '03' },
]
const SERVICES = [
  { name: 'Product Design', desc: 'End-to-end product design from discovery through ship.', price: 'From $8,000' },
  { name: 'Design System Audit', desc: 'Evaluate and improve your component library and tokens.', price: 'From $3,500' },
  { name: 'Design Leadership', desc: 'Embedded or fractional design leadership for growing teams.', price: 'Custom' },
]

function ProfileHeader({ variant }) {
  if (variant === 'cover') {
    return (
      <div style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
        <div style={{ height: 120, background: 'linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-accent) 100%)', position: 'relative' }}>
          <div style={{
            position: 'absolute', bottom: -36, left: 28,
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--hp-primary)', border: '3px solid var(--hp-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 24, color: '#fff'
          }}>AK</div>
        </div>
        <div style={{ paddingTop: 44, paddingBottom: 20, paddingLeft: 28, paddingRight: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 22, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 4px' }}>Alex Kim</h1>
              <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', margin: 0 }}>Product Designer · San Francisco, CA</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '7px 16px', borderRadius: 6, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Hire me</button>
              <button style={{ padding: '7px 14px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>Portfolio</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            {[['142', 'Projects'], ['4.8k', 'Followers'], ['38', 'Following']].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 16, color: 'var(--hp-text)' }}>{val}</div>
                <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-textMuted)' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'centered') {
    return (
      <div style={{ background: 'var(--hp-surface)', textAlign: 'center', padding: '40px 24px 28px', borderBottom: '1px solid var(--hp-border)' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: 'var(--hp-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 28, color: '#fff',
          margin: '0 auto 14px'
        }}>AK</div>
        <h1 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 20, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 4px' }}>Alex Kim</h1>
        <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', margin: '0 0 10px' }}>Product Designer · Open to work</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Product Design', 'Systems', 'AI'].map(tag => (
            <span key={tag} style={{ padding: '3px 10px', borderRadius: 99, background: 'var(--hp-background)', border: '1px solid var(--hp-border)', fontSize: 11, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
          <button style={{ padding: '8px 20px', borderRadius: 6, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Contact</button>
          <button style={{ padding: '8px 16px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>Resume</button>
        </div>
      </div>
    )
  }

  // minimal
  return (
    <div style={{ background: 'var(--hp-surface)', padding: '18px 24px', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--hp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#fff', fontFamily: 'var(--hp-heading-font)', flexShrink: 0 }}>AK</div>
        <div>
          <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 15, color: 'var(--hp-text)' }}>Alex Kim</div>
          <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Product Designer · Available</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <a style={{ fontSize: 12, color: 'var(--hp-primary)', fontFamily: 'var(--hp-body-font)', cursor: 'pointer', textDecoration: 'none' }}>Portfolio</a>
        <span style={{ color: 'var(--hp-border)' }}>·</span>
        <a style={{ fontSize: 12, color: 'var(--hp-primary)', fontFamily: 'var(--hp-body-font)', cursor: 'pointer', textDecoration: 'none' }}>Contact</a>
      </div>
    </div>
  )
}

function AboutSection({ variant }) {
  if (variant === 'bio-skills') {
    return (
      <section style={{ padding: '28px 24px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: 28, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-primary)', marginBottom: 8 }}>About</div>
          <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 18, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 10px' }}>Designing products people actually use.</h2>
          <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.65, margin: '0 0 10px' }}>I have spent the last 8 years shipping products at the intersection of data, AI, and enterprise SaaS. I care about systems thinking and meaningful interface decisions.</p>
          <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.65, margin: 0 }}>Formerly at Stripe, Linear, and Vercel. Now independent — working on selected engagements.</p>
        </div>
        <div style={{ background: 'var(--hp-surface)', borderRadius: 10, border: '1px solid var(--hp-border)', padding: 16 }}>
          <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-textMuted)', marginBottom: 10 }}>Skills</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SKILLS.map(s => (
              <span key={s} style={{ padding: '4px 10px', borderRadius: 99, background: 'var(--hp-background)', border: '1px solid var(--hp-border)', fontSize: 11, color: 'var(--hp-text)', fontFamily: 'var(--hp-body-font)' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'stats') {
    return (
      <section style={{ padding: '28px 24px' }}>
        <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-primary)', marginBottom: 8 }}>About</div>
        <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.65, margin: '0 0 22px', maxWidth: 560 }}>Product designer with 8 years of experience building enterprise SaaS, AI tools, and design systems for high-growth teams.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[['8 yrs', 'Experience'], ['40+', 'Products shipped'], ['3', 'Design systems'], ['6', 'Industries']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: 'var(--hp-surface)', borderRadius: 10, border: '1px solid var(--hp-border)', padding: '14px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 22, color: 'var(--hp-primary)', marginBottom: 2 }}>{val}</div>
              <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-textMuted)' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // no-sidebar
  return (
    <section style={{ padding: '28px 24px', maxWidth: 620 }}>
      <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-primary)', marginBottom: 8 }}>About me</div>
      <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 20, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 12px' }}>Designing products people actually use.</h2>
      <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.7, margin: '0 0 10px' }}>I have spent 8 years shipping products in enterprise SaaS, fintech, and AI. My focus is systems thinking, clarity, and execution that holds up at scale.</p>
      <p style={{ fontFamily: 'var(--hp-body-font)', fontSize: 13, color: 'var(--hp-textMuted)', lineHeight: 1.7, margin: '0 0 18px' }}>Formerly at Stripe, Linear, and Vercel. Now independent.</p>
      <button style={{ padding: '8px 20px', borderRadius: 6, background: 'transparent', color: 'var(--hp-primary)', border: '1px solid var(--hp-primary)', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Download resume</button>
    </section>
  )
}

function WorkSection({ variant }) {
  if (variant === 'project-grid') {
    return (
      <section style={{ padding: '28px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-primary)', marginBottom: 4 }}>Selected work</div>
            <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 18, fontWeight: 700, color: 'var(--hp-text)', margin: 0 }}>Recent projects</h2>
          </div>
          <button style={{ padding: '6px 14px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>View all</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {PROJECTS.map((p, i) => (
            <article key={p.name} style={{ background: 'var(--hp-background)', borderRadius: 10, border: '1px solid var(--hp-border)', overflow: 'hidden' }}>
              <div style={{ height: 80, background: i % 2 === 0 ? 'linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-secondary) 100%)' : 'linear-gradient(135deg, var(--hp-accent) 0%, var(--hp-primary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 20, color: 'rgba(255,255,255,0.6)' }}>0{i + 1}</div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontFamily: 'var(--hp-body-font)', fontWeight: 600, fontSize: 13, color: 'var(--hp-text)', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-textMuted)' }}>{p.role} · {p.year}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (variant === 'case-studies') {
    return (
      <section style={{ padding: '28px 24px', borderTop: '1px solid var(--hp-border)' }}>
        <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-primary)', marginBottom: 4 }}>Case studies</div>
        <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 18, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 18px' }}>Work with context</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CASE_STUDIES.map((cs, i) => (
            <article key={cs.title} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', background: 'var(--hp-surface)', borderRadius: 10, border: '1px solid var(--hp-border)', overflow: 'hidden' }}>
              <div style={{ background: i % 2 === 0 ? 'linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-accent) 100%)' : 'linear-gradient(135deg, var(--hp-secondary) 0%, var(--hp-primary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>{cs.img}</div>
              <div style={{ padding: '14px 14px 14px 12px' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--hp-background)', border: '1px solid var(--hp-border)', fontSize: 10, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>{cs.category}</span>
                  <span style={{ fontSize: 10, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>{cs.time}</span>
                </div>
                <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 600, fontSize: 13, color: 'var(--hp-text)', lineHeight: 1.4 }}>{cs.title}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  // services
  return (
    <section style={{ padding: '28px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)' }}>
      <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hp-primary)', marginBottom: 4 }}>Services</div>
      <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontSize: 18, fontWeight: 700, color: 'var(--hp-text)', margin: '0 0 18px' }}>What I offer</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SERVICES.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'var(--hp-background)', borderRadius: 10, border: '1px solid var(--hp-border)', padding: '14px 16px' }}>
            <div>
              <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 600, fontSize: 14, color: 'var(--hp-text)', marginBottom: 3 }}>{s.name}</div>
              <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>{s.desc}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 13, color: 'var(--hp-primary)', whiteSpace: 'nowrap' }}>{s.price}</div>
              <a style={{ fontSize: 11, color: 'var(--hp-primary)', fontFamily: 'var(--hp-body-font)', cursor: 'pointer' }}>Enquire</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function PreviewProfile({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const defaults = getDefaultSections('profile')
  const config = { ...defaults, ...sectionConfig }
  const sections = getPreviewSections('profile')

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
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font)', background: 'var(--hp-background)', minHeight: '100%' }}>
      <nav style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 800, fontSize: 15, color: 'var(--hp-text)' }}>Portfolio</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {['About', 'Work', 'Services', 'Contact'].map(lnk => (
            <a key={lnk} style={{ fontSize: 12, color: 'var(--hp-textMuted)', cursor: 'pointer', fontFamily: 'var(--hp-body-font)', textDecoration: 'none' }}>{lnk}</a>
          ))}
        </div>
      </nav>
      {wrap('header', <ProfileHeader variant={config.header} />)}
      {wrap('about', <AboutSection variant={config.about} />)}
      {wrap('work', <WorkSection variant={config.work} />)}
    </div>
  )
}
