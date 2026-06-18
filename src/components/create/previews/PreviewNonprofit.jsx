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
  }
}

const CAMPAIGNS = [
  { title: 'Clean Water Initiative', location: 'Sub-Saharan Africa', raised: '$84,200', goal: '$100,000', pct: 84, donors: 1243, icon: '💧' },
  { title: 'Forest Restoration', location: 'Amazon Basin', raised: '$52,600', goal: '$75,000', pct: 70, donors: 891, icon: '🌳' },
  { title: 'Education for All', location: 'Southeast Asia', raised: '$31,400', goal: '$50,000', pct: 63, donors: 612, icon: '📚' },
]

const IMPACT_STATS = [
  { value: '2.4M', label: 'Lives impacted', icon: '🌍' },
  { value: '48', label: 'Countries reached', icon: '🤝' },
  { value: '$12M', label: 'Funds raised', icon: '💚' },
  { value: '94%', label: 'To programs', icon: '✅' },
]

const TESTIMONIALS = [
  { name: 'Amara K.', location: 'Kenya', quote: 'Clean water changed everything for our village. Our kids no longer miss school.' },
  { name: 'Lior M.', location: 'Israel', quote: "I've donated monthly for 3 years. The transparency here is unlike any other org." },
]

// ── Hero variants ─────────────────────────────────────────────────────────────

function HeroImpact() {
  return (
    <div style={{ background: 'var(--hp-primary)', padding: '28px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Fighting poverty since 2009</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', marginBottom: 8, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        Together, we change<br />what the world looks like
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: 20, maxWidth: 440, margin: '0 auto 20px', lineHeight: 1.65 }}>
        We work with local communities to build lasting solutions to hunger, disease, and inequality.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button style={{ padding: '10px 24px', borderRadius: 9999, background: '#ffffff', border: 'none', color: 'var(--hp-primary)', fontSize: '0.875rem', fontWeight: 800, cursor: 'pointer' }}>Donate now</button>
        <button style={{ padding: '10px 24px', borderRadius: 9999, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Our work</button>
      </div>
    </div>
  )
}

function HeroCause() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 12, width: 'fit-content', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Est. 2009 · Nonprofit 501(c)(3)</div>
        <div style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Real change starts with clean water
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', lineHeight: 1.65, marginBottom: 16 }}>
          Every $35 you give provides safe drinking water to one person for a year.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="lp-btn lp-btn--primary">Donate now</button>
          <button className="lp-btn lp-btn--ghost">Learn more</button>
        </div>
      </div>
      <div style={{ width: 110, flexShrink: 0, background: 'var(--hp-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div style={{ fontSize: '2.5rem' }}>💧</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>2.4M</div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>LIVES CHANGED</div>
        </div>
      </div>
    </div>
  )
}

function HeroCampaign() {
  const camp = CAMPAIGNS[0]
  return (
    <div style={{ padding: '20px 20px', background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: '1.5rem' }}>{camp.icon}</div>
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-primary)' }}>Active campaign</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{camp.title}</div>
        </div>
      </div>
      <div style={{ marginBottom: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-text)' }}>{camp.raised}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>of {camp.goal}</span>
        </div>
        <div style={{ height: 8, background: 'var(--hp-surface)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${camp.pct}%`, height: '100%', background: 'var(--hp-primary)', borderRadius: 4 }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginTop: 4 }}>{camp.pct}% funded · {camp.donors.toLocaleString()} donors</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="lp-btn lp-btn--primary" style={{ flex: 1 }}>Donate to this campaign</button>
        <button className="lp-btn lp-btn--ghost">Share</button>
      </div>
    </div>
  )
}

// ── Stats variants ────────────────────────────────────────────────────────────

function StatsCounter() {
  return (
    <div style={{ padding: '16px 20px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted)', textAlign: 'center', marginBottom: 14 }}>Our global impact</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {IMPACT_STATS.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1rem', marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)' }}>{s.value}</div>
            <div style={{ fontSize: '0.5625rem', color: 'var(--hp-textMuted)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatsProgress() {
  return (
    <div style={{ padding: '16px 20px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>2025 goals progress</div>
      {[
        { label: 'Families with clean water', pct: 78, target: '50,000 families' },
        { label: 'Schools built', pct: 54, target: '120 schools' },
        { label: 'Meals provided', pct: 91, target: '1M meals' },
      ].map((g, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text)' }}>{g.label}</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{g.target}</span>
          </div>
          <div style={{ height: 6, background: 'var(--hp-border)', borderRadius: 4 }}>
            <div style={{ width: `${g.pct}%`, height: '100%', background: 'var(--hp-primary)', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{g.pct}% reached</div>
        </div>
      ))}
    </div>
  )
}

function StatsTestimonials() {
  return (
    <div style={{ padding: '16px 20px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted)', marginBottom: 12 }}>From the people we serve</div>
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className="lp-card" style={{ padding: '10px 12px', marginBottom: 8 }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--hp-text)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 8 }}>"{t.quote}"</p>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)' }}>{t.name}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{t.location}</div>
        </div>
      ))}
    </div>
  )
}

// ── CTA variants ──────────────────────────────────────────────────────────────

function CtaDonateForm() {
  const amounts = ['$10', '$25', '$50', '$100']
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>Make a difference today</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {amounts.map((a, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: 8, background: i === 1 ? 'var(--hp-primary)' : 'var(--hp-surface)', border: `1px solid ${i === 1 ? 'var(--hp-primary)' : 'var(--hp-border)'}`, cursor: 'pointer' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: i === 1 ? '#ffffff' : 'var(--hp-text)' }}>{a}</div>
            <div style={{ fontSize: '0.5625rem', color: i === 1 ? 'rgba(255,255,255,0.7)' : 'var(--hp-textMuted)' }}>/ month</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input className="lp-input" placeholder="Email address" readOnly style={{ flex: 1 }} />
        <button className="lp-btn lp-btn--primary">Donate $25</button>
      </div>
      <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', textAlign: 'center' }}>Tax-deductible · Secure · Cancel anytime</div>
    </div>
  )
}

function CtaCampaignGrid() {
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>Active campaigns</div>
      {CAMPAIGNS.map((c, i) => (
        <div key={i} className="lp-card" style={{ padding: '12px 14px', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ fontSize: '1.25rem' }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{c.title}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{c.location}</div>
            </div>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Give</button>
          </div>
          <div style={{ height: 4, background: 'var(--hp-border)', borderRadius: 2 }}>
            <div style={{ width: `${c.pct}%`, height: '100%', background: 'var(--hp-primary)', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-text)' }}>{c.raised} raised</span>
            <span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)' }}>{c.donors} donors</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CtaVolunteer() {
  const ways = [
    { icon: '💰', title: 'Donate', desc: 'Give monthly or one-time', action: 'Start giving' },
    { icon: '🤝', title: 'Volunteer', desc: 'Join us on the ground', action: 'Apply now' },
    { icon: '📢', title: 'Spread the word', desc: 'Share our mission', action: 'Share' },
  ]
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>How you can help</div>
      {ways.map((w, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < ways.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{w.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{w.title}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{w.desc}</div>
          </div>
          <button className="lp-btn lp-btn--ghost lp-btn--sm">{w.action}</button>
        </div>
      ))}
    </div>
  )
}

export default function PreviewNonprofit({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('nonprofit')
  const defaults = getDefaultSections('nonprofit')
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
    config.hero === 'cause' ? <HeroCause /> :
    config.hero === 'campaign' ? <HeroCampaign /> :
    <HeroImpact />

  const statsNode =
    config.stats === 'progress' ? <StatsProgress /> :
    config.stats === 'testimonials' ? <StatsTestimonials /> :
    <StatsCounter />

  const ctaNode =
    config.cta === 'campaigns' ? <CtaCampaignGrid /> :
    config.cta === 'volunteer' ? <CtaVolunteer /> :
    <CtaDonateForm />

  return (
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)', minHeight: '100%' }}>
      <nav style={{ height: 44, background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)' }}>HopeFoundation</div>
        <div style={{ flex: 1, display: 'flex', gap: 16 }}>
          {['About','Programs','Donate','Volunteer'].map((l, i) => (
            <span key={l} style={{ fontSize: '0.75rem', fontWeight: i === 2 ? 700 : 500, color: i === 2 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Donate</button>
      </nav>
      {wrap('hero', heroNode)}
      {wrap('stats', statsNode)}
      {wrap('cta', ctaNode)}
    </div>
  )
}
