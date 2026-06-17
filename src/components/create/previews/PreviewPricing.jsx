import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const DEFAULT_SECTIONS = getDefaultSections('pricing')
const SECTION_OPTIONS = getPreviewSections('pricing')

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

const PLANS = [
  {
    name: 'Starter', price: '$0', period: '/mo',
    description: 'Perfect for individuals exploring the platform.',
    cta: 'Get started free', featured: false,
    features: ['5 projects', '1 GB storage', 'Basic analytics', 'Community support'],
  },
  {
    name: 'Pro', price: '$29', period: '/mo',
    description: 'Built for growing teams who need more power.',
    cta: 'Start free trial', featured: true,
    features: ['Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support', 'Custom domains', 'API access'],
  },
  {
    name: 'Enterprise', price: '$99', period: '/mo',
    description: 'For large organizations with advanced needs.',
    cta: 'Contact sales', featured: false,
    features: ['Everything in Pro', 'Unlimited storage', 'SSO & SAML', 'Dedicated manager', 'SLA guarantee', 'Custom contracts'],
  },
]

const TABLE_FEATURES = [
  { name: 'Projects', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Storage', starter: '1 GB', pro: '50 GB', enterprise: 'Unlimited' },
  { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
  { name: 'API access', starter: false, pro: true, enterprise: true },
  { name: 'SSO / SAML', starter: false, pro: false, enterprise: true },
  { name: 'Priority support', starter: false, pro: true, enterprise: true },
  { name: 'Custom domains', starter: false, pro: true, enterprise: true },
  { name: 'Dedicated manager', starter: false, pro: false, enterprise: true },
]

const FAQS = [
  { q: 'Can I switch plans anytime?', a: 'Yes. You can upgrade or downgrade at any time. Changes take effect at the next billing cycle.' },
  { q: 'Do you offer a free trial?', a: 'Pro plans come with a 14-day free trial. No credit card required to start.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, ACH transfers, and invoicing for enterprise customers.' },
  { q: 'Is there a discount for annual billing?', a: 'Yes — annual billing saves you 20% compared to month-to-month pricing.' },
  { q: 'How does the team seat model work?', a: 'Each seat is one named user. Add or remove seats anytime from your account settings.' },
  { q: 'What happens to my data if I cancel?', a: 'Your data is retained for 30 days after cancellation, giving you time to export everything.' },
]

const S = {
  page: { fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background, #fff)', minHeight: '100vh' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-background, #fff)' },
  logo: { fontWeight: 800, fontSize: 18, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)' },
  navLink: { fontSize: 14, color: 'var(--hp-textMuted, #6b7280)', textDecoration: 'none', cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  navLinkActive: { fontSize: 14, color: 'var(--hp-primary, #6366f1)', textDecoration: 'none', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnPrimary: { padding: '7px 16px', borderRadius: 8, border: 'none', background: 'var(--hp-primary, #6366f1)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnGhost: { padding: '7px 16px', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)', background: 'transparent', color: 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hp-primary, #6366f1)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 10 },
  h1: { fontSize: 36, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-display-font, sans-serif)', margin: 0, lineHeight: 1.15 },
  sub: { color: 'var(--hp-textMuted, #6b7280)', fontSize: 14, lineHeight: 1.65, fontFamily: 'var(--hp-body-font, sans-serif)', margin: 0 },
}

function PricingHeader({ variant }) {
  const toggleRow = (
    <div style={{ display: 'inline-flex', gap: 4, background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 10, padding: 4 }}>
      <button style={{ ...S.btnPrimary, padding: '6px 18px' }}>Monthly</button>
      <button style={{ ...S.btnGhost, border: 'none', color: 'var(--hp-textMuted, #6b7280)', background: 'transparent', padding: '6px 18px' }}>Annual — save 20%</button>
    </div>
  )

  if (variant === 'split') {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '48px 40px 32px', gap: 32, borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>
        <div>
          <div style={S.eyebrow}>Pricing</div>
          <h1 style={S.h1}>Simple, transparent pricing</h1>
        </div>
        <div style={{ maxWidth: 340, textAlign: 'right' }}>
          <p style={{ ...S.sub, marginBottom: 14 }}>No hidden fees. Choose the plan that fits your team and scale as you grow.</p>
          {toggleRow}
        </div>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', padding: '52px 40px 28px' }}>
      <div style={{ ...S.eyebrow, display: 'inline-block' }}>Pricing</div>
      <h1 style={{ ...S.h1, marginBottom: 12, marginTop: 6 }}>Simple, transparent pricing</h1>
      <p style={{ ...S.sub, maxWidth: 460, margin: '0 auto 22px' }}>No hidden fees. No surprise bills. Choose the plan that fits your team.</p>
      {toggleRow}
    </div>
  )
}

function TableCheck({ val }) {
  if (val === false) return <span style={{ color: 'var(--hp-border, #d1d5db)', fontSize: 15 }}>—</span>
  if (val === true) return <span style={{ color: 'var(--hp-primary, #6366f1)', fontWeight: 700, fontSize: 15 }}>✓</span>
  return <span style={{ color: 'var(--hp-text, #111827)', fontSize: 13, fontFamily: 'var(--hp-body-font, sans-serif)' }}>{val}</span>
}

function PlansSection({ variant }) {
  if (variant === 'table') {
    return (
      <div style={{ padding: '32px 40px 48px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--hp-body-font, sans-serif)' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '14px 16px', color: 'var(--hp-textMuted, #6b7280)', fontSize: 13, fontWeight: 600, borderBottom: '2px solid var(--hp-border, #e5e7eb)', width: '34%' }}>Features</th>
                {PLANS.map((plan) => (
                  <th key={plan.name} style={{ padding: '14px 16px', textAlign: 'center', borderBottom: `2px solid ${plan.featured ? 'var(--hp-primary, #6366f1)' : 'var(--hp-border, #e5e7eb)'}`, background: plan.featured ? 'var(--hp-primary, #6366f1)' : 'transparent' }}>
                    <div style={{ color: plan.featured ? '#fff' : 'var(--hp-text, #111827)', fontSize: 15, fontWeight: 700 }}>{plan.name}</div>
                    <div style={{ color: plan.featured ? 'rgba(255,255,255,0.8)' : 'var(--hp-textMuted, #6b7280)', fontSize: 12, marginTop: 2 }}>{plan.price}{plan.period}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_FEATURES.map((feat, i) => (
                <tr key={feat.name} style={{ background: i % 2 === 0 ? 'var(--hp-surface, #f9fafb)' : 'transparent' }}>
                  <td style={{ padding: '11px 16px', color: 'var(--hp-text, #111827)', fontSize: 13, borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>{feat.name}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'center', borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}><TableCheck val={feat.starter} /></td>
                  <td style={{ padding: '11px 16px', textAlign: 'center', borderBottom: '1px solid var(--hp-border, #e5e7eb)', background: 'rgba(99,102,241,0.05)' }}><TableCheck val={feat.pro} /></td>
                  <td style={{ padding: '11px 16px', textAlign: 'center', borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}><TableCheck val={feat.enterprise} /></td>
                </tr>
              ))}
              <tr>
                <td style={{ padding: '14px 16px' }} />
                {PLANS.map((plan) => (
                  <td key={plan.name} style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <button style={{ ...S.btnPrimary, width: '100%', background: plan.featured ? 'var(--hp-primary, #6366f1)' : 'transparent', color: plan.featured ? '#fff' : 'var(--hp-text, #111827)', border: plan.featured ? 'none' : '1px solid var(--hp-border, #e5e7eb)' }}>{plan.cta}</button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (variant === 'two-col') {
    return (
      <div style={{ padding: '32px 40px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 720, margin: '0 auto' }}>
          {PLANS.slice(1).map((plan) => (
            <div key={plan.name} style={{ border: plan.featured ? '2px solid var(--hp-primary, #6366f1)' : '1px solid var(--hp-border, #e5e7eb)', borderRadius: 16, padding: '32px 28px', background: plan.featured ? 'var(--hp-primary, #6366f1)' : 'var(--hp-surface, #f9fafb)', position: 'relative' }}>
              {plan.featured && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--hp-accent, #f59e0b)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap', fontFamily: 'var(--hp-body-font, sans-serif)' }}>MOST POPULAR</div>}
              <div style={{ fontSize: 18, fontWeight: 700, color: plan.featured ? '#fff' : 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 6 }}>{plan.name}</div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: plan.featured ? '#fff' : 'var(--hp-text, #111827)', fontFamily: 'var(--hp-display-font, sans-serif)' }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: plan.featured ? 'rgba(255,255,255,0.7)' : 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{plan.period}</span>
              </div>
              <p style={{ fontSize: 13, color: plan.featured ? 'rgba(255,255,255,0.8)' : 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 20, lineHeight: 1.6 }}>{plan.description}</p>
              <ul style={{ listStyle: 'none', margin: '0 0 22px', padding: 0 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, color: plan.featured ? 'rgba(255,255,255,0.9)' : 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>
                    <span style={{ color: plan.featured ? '#fff' : 'var(--hp-primary, #6366f1)', fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: '11px', borderRadius: 10, border: plan.featured ? 'none' : '1px solid var(--hp-primary, #6366f1)', background: plan.featured ? '#fff' : 'var(--hp-primary, #6366f1)', color: plan.featured ? 'var(--hp-primary, #6366f1)' : '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{plan.cta}</button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', marginTop: 20 }}>Looking for a free plan? <a style={{ color: 'var(--hp-primary, #6366f1)', cursor: 'pointer' }}>Start with Starter — it's free forever.</a></p>
      </div>
    )
  }

  // three-col default
  return (
    <div style={{ padding: '32px 40px 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {PLANS.map((plan) => (
        <div key={plan.name} style={{ border: plan.featured ? '2px solid var(--hp-primary, #6366f1)' : '1px solid var(--hp-border, #e5e7eb)', borderRadius: 14, padding: '26px 20px', background: 'var(--hp-surface, #f9fafb)', position: 'relative' }}>
          {plan.featured && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'var(--hp-primary, #6366f1)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap', fontFamily: 'var(--hp-body-font, sans-serif)' }}>MOST POPULAR</div>}
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 6 }}>{plan.name}</div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-display-font, sans-serif)' }}>{plan.price}</span>
            <span style={{ fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{plan.period}</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 16, lineHeight: 1.6 }}>{plan.description}</p>
          <ul style={{ listStyle: 'none', margin: '0 0 18px', padding: 0 }}>
            {plan.features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6, fontSize: 12, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>
                <span style={{ color: 'var(--hp-primary, #6366f1)', fontWeight: 700 }}>✓</span>{f}
              </li>
            ))}
          </ul>
          <button style={{ width: '100%', padding: '9px', borderRadius: 8, border: plan.featured ? 'none' : '1px solid var(--hp-border, #e5e7eb)', background: plan.featured ? 'var(--hp-primary, #6366f1)' : 'transparent', color: plan.featured ? '#fff' : 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{plan.cta}</button>
        </div>
      ))}
    </div>
  )
}

function FaqSection({ variant }) {
  if (variant === 'grid') {
    return (
      <div style={{ padding: '40px 40px 56px', background: 'var(--hp-surface, #f9fafb)', borderTop: '1px solid var(--hp-border, #e5e7eb)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 24, textAlign: 'center' }}>Frequently asked questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {FAQS.map((faq) => (
            <div key={faq.q} style={{ background: 'var(--hp-background, #fff)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 6 }}>{faq.q}</div>
              <div style={{ fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', lineHeight: 1.6 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // accordion default
  return (
    <div style={{ padding: '40px 40px 56px', borderTop: '1px solid var(--hp-border, #e5e7eb)' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 22, textAlign: 'center' }}>Frequently asked questions</h2>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        {FAQS.map((faq, i) => (
          <div key={faq.q} style={{ borderBottom: '1px solid var(--hp-border, #e5e7eb)', padding: '15px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{faq.q}</span>
              <span style={{ color: 'var(--hp-primary, #6366f1)', fontWeight: 700, fontSize: 18, flexShrink: 0, marginLeft: 12 }}>{i === 0 ? '−' : '+'}</span>
            </div>
            {i === 0 && <div style={{ fontSize: 13, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)', lineHeight: 1.6, marginTop: 10 }}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PreviewPricing({ kit, sectionConfig = {}, onSectionChange }) {
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

  return (
    <div ref={ref} style={S.page}>
      <nav style={S.nav}>
        <div style={S.logo}>Acme</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Product', 'Features', 'Pricing', 'Docs'].map((link) => (
            <a key={link} style={link === 'Pricing' ? S.navLinkActive : S.navLink}>{link}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={S.btnGhost}>Sign in</button>
          <button style={S.btnPrimary}>Get started</button>
        </div>
      </nav>
      {wrap('header', <PricingHeader variant={config.header} />)}
      {wrap('plans', <PlansSection variant={config.plans} />)}
      {wrap('faq', <FaqSection variant={config.faq} />)}
    </div>
  )
}
