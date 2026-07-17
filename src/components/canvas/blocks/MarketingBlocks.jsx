import React from 'react'

const PLANS = [
  { name: 'Starter', price: '$0', period: '/mo', cta: 'Get started', featured: false, features: ['5 projects', '1 GB storage', 'Basic analytics'] },
  { name: 'Pro', price: '$29', period: '/mo', cta: 'Start trial', featured: true, features: ['Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support'] },
  { name: 'Enterprise', price: '$99', period: '/mo', cta: 'Contact sales', featured: false, features: ['Everything in Pro', 'SSO & SAML', 'Dedicated manager', 'SLA guarantee'] },
]

const TESTIMONIALS = [
  { name: 'Jane D.', role: 'Design Lead', quote: 'This is exactly what our team needed.' },
  { name: 'Mark R.', role: 'Founder', quote: 'The preview quality is insane.' },
  { name: 'Sarah K.', role: 'Product Designer', quote: 'Finally a tool that treats design systems seriously.' },
]

const FEATURES = [
  { icon: '⚡', title: 'Instant export', desc: 'CSS variables, Tailwind, and JSON in one click' },
  { icon: '🎨', title: 'Visual builder', desc: 'Real-time preview across page types' },
  { icon: '🔒', title: 'Team collaboration', desc: 'Share kits and export to Figma' },
  { icon: '📊', title: 'Analytics', desc: 'Track usage and adoption metrics' },
]

export function MarketingHeroBlock({ variant = 'bold', config }) {
  const headline = config?.title?.trim()
  const pad = 'var(--cv-block-pad, 48px)'
  if (variant === 'split') {
    return (
      <div className="cv-block cv-block--hero" style={{ display: 'flex', background: 'var(--hp-background)' }}>
        <div style={{ flex: 1, padding: `${pad} 28px` }}>
          <div style={{ display: 'inline-block', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 20, padding: '3px 12px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 14, textTransform: 'uppercase' }}>New Release</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 10, lineHeight: 1.2 }}>{headline || 'Build faster with design systems'}</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)', lineHeight: 1.6, marginBottom: 16 }}>Pick a kit, preview on real components, export to your AI tools.</p>
          <button style={{ padding: '10px 20px', background: 'var(--hp-primary)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem' }}>Get started free</button>
        </div>
        <div style={{ width: 200, flexShrink: 0, background: 'var(--hp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--hp-display-font)' }}>12K+</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Teams using StyleSeed</div>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'centered') {
    return (
      <div className="cv-block cv-block--hero" style={{ padding: `${pad} 24px`, textAlign: 'center', background: 'var(--hp-background)' }}>
        <div style={{ display: 'inline-block', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 20, padding: '4px 14px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 16, textTransform: 'uppercase' }}>Design tokens for AI</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-display-font)', marginBottom: 12, lineHeight: 1.15 }}>{headline || <>Give your AI tools<br />a design system</>}</h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--hp-textMuted)', maxWidth: 440, margin: '0 auto 20px', lineHeight: 1.65 }}>Pick an industry kit. Preview on real components. Export in the exact format Claude, v0, or Cursor expects.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button style={{ padding: '10px 20px', background: 'var(--hp-primary)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>Browse kits</button>
          <button style={{ padding: '10px 20px', background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', borderRadius: 8, fontWeight: 600 }}>Create custom</button>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--hero" style={{ padding: `${pad} 24px`, textAlign: 'center', background: 'var(--hp-background)' }}>
      <div style={{ display: 'inline-block', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 20, padding: '4px 14px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-primary)', marginBottom: 16, textTransform: 'uppercase' }}>Early Access</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 12, lineHeight: 1.15 }}>{headline || <>Something big<br />is coming</>}</h1>
      <p style={{ fontSize: '0.9375rem', color: 'var(--hp-textMuted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.65 }}>We're putting the finishing touches on a tool that changes how teams ship design systems.</p>
    </div>
  )
}

export function MarketingFeaturesBlock({ variant = 'grid', config }) {
  const cols = Math.max(1, config?.columns || 2)
  const pad = 'var(--cv-block-pad, 32px)'
  if (variant === 'list') {
    return (
      <div className="cv-block cv-block--features" style={{ padding: pad, background: 'var(--hp-background)' }}>
        <h2 style={{ fontSize: 'calc(1.25rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 20 }}>{config?.title?.trim() || 'Why teams choose us'}</h2>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--hp-border)' }}>
            <span style={{ fontSize: '1.25rem' }}>{f.icon}</span>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>{f.title}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (variant === 'icons') {
    const cols = Math.max(1, config?.columns || 4)
    return (
      <div className="cv-block cv-block--features" style={{ padding: pad, background: 'var(--hp-surface)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'calc(1.25rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 24 }}>{config?.title?.trim() || 'Everything you need'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 16px)' }}>
          {FEATURES.map((f) => (
            <div key={f.title}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--hp-primary)', opacity: 0.12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '1.25rem' }}>{f.icon}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{f.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--features" style={{ padding: pad, background: 'var(--hp-background)' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 20, textAlign: 'center' }}>{config?.title?.trim() || 'Why teams choose us'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 16px)' }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: 8 }}>{f.icon}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>{f.title}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 4 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarketingPricingBlock({ variant = 'three-col', config }) {
  const cols = Math.max(1, config?.columns || (variant === 'two-col' ? 2 : 3))
  const pad = 'var(--cv-block-pad, 32px)'
  if (variant === 'two-col') {
    return (
      <div className="cv-block cv-block--pricing" style={{ padding: `${pad} 24px`, background: 'var(--hp-background)' }}>
        <h2 style={{ fontSize: 'calc(1.25rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 20, textAlign: 'center' }}>Simple pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 16px)', maxWidth: 560, margin: '0 auto' }}>
          {PLANS.filter((p) => p.name !== 'Enterprise').map((plan) => (
            <div key={plan.name} style={{ background: plan.featured ? 'var(--hp-primary)' : 'var(--hp-surface)', border: plan.featured ? 'none' : '1px solid var(--hp-border)', borderRadius: 12, padding: '20px 18px', color: plan.featured ? '#fff' : 'var(--hp-text)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--hp-display-font)' }}>{plan.price}<span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{plan.period}</span></div>
              <button style={{ width: '100%', marginTop: 14, padding: '8px', borderRadius: 8, border: 'none', background: plan.featured ? '#fff' : 'var(--hp-primary)', color: plan.featured ? 'var(--hp-primary)' : '#fff', fontWeight: 700, fontSize: '0.8125rem' }}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (variant === 'table') {
    return (
      <div className="cv-block cv-block--pricing" style={{ padding: `${pad} 24px`, background: 'var(--hp-background)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 20, textAlign: 'center' }}>Compare plans</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--hp-border)' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: 'var(--hp-textMuted)' }}>Feature</th>
              {PLANS.map((p) => <th key={p.name} style={{ padding: '8px', color: 'var(--hp-text)', fontWeight: 700 }}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {['Projects', 'Storage', 'Analytics', 'Support'].map((feat, i) => (
              <tr key={feat} style={{ borderBottom: '1px solid var(--hp-border)' }}>
                <td style={{ padding: '8px', color: 'var(--hp-text)' }}>{feat}</td>
                {PLANS.map((p) => <td key={p.name} style={{ padding: '8px', textAlign: 'center', color: 'var(--hp-textMuted)' }}>{p.features[i] || '—'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--pricing" style={{ padding: `${pad} 24px`, background: 'var(--hp-background)' }}>
      <h2 style={{ fontSize: 'calc(1.25rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 20, textAlign: 'center' }}>Simple pricing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 14px)' }}>
        {PLANS.map((plan) => (
          <div key={plan.name} style={{ background: plan.featured ? 'var(--hp-primary)' : 'var(--hp-surface)', border: plan.featured ? 'none' : '1px solid var(--hp-border)', borderRadius: 12, padding: '18px 16px', color: plan.featured ? '#fff' : 'var(--hp-text)', transform: plan.featured ? 'scale(1.02)' : 'none' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--hp-display-font)' }}>{plan.price}<span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{plan.period}</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0', fontSize: '0.75rem', opacity: plan.featured ? 0.9 : 1 }}>
              {plan.features.map((f) => <li key={f} style={{ padding: '3px 0', color: plan.featured ? 'rgba(255,255,255,0.9)' : 'var(--hp-textMuted)' }}>✓ {f}</li>)}
            </ul>
            <button style={{ width: '100%', padding: '8px', borderRadius: 8, border: 'none', background: plan.featured ? '#fff' : 'var(--hp-primary)', color: plan.featured ? 'var(--hp-primary)' : '#fff', fontWeight: 700, fontSize: '0.8125rem' }}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarketingTestimonialsBlock({ variant = 'grid', config }) {
  const cols = Math.max(1, config?.columns || 3)
  const pad = 'var(--cv-block-pad, 32px)'
  if (variant === 'single') {
    const t = TESTIMONIALS[0]
    return (
      <div className="cv-block cv-block--testimonials" style={{ padding: `${pad} 24px`, background: 'var(--hp-surface)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--hp-text)', fontStyle: 'italic', maxWidth: 480, margin: '0 auto 16px', lineHeight: 1.6 }}>"{t.quote}"</div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{t.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{t.role}</div>
      </div>
    )
  }
  if (variant === 'carousel') {
    return (
      <div className="cv-block cv-block--testimonials" style={{ padding: `${pad} 24px`, background: 'var(--hp-background)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 16, textAlign: 'center' }}>Loved by teams</h2>
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ flex: '0 0 280px', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--hp-text)', lineHeight: 1.55, marginBottom: 12 }}>"{t.quote}"</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)' }}>{t.name}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--testimonials" style={{ padding: `${pad} 24px`, background: 'var(--hp-background)' }}>
      <h2 style={{ fontSize: 'calc(1.125rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 16, textAlign: 'center' }}>Loved by teams</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 12px)' }}>
        {TESTIMONIALS.map((t) => (
          <div key={t.name} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--hp-text)', lineHeight: 1.55, marginBottom: 12 }}>"{t.quote}"</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)' }}>{t.name}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarketingCtaBlock({ variant = 'banner' }) {
  if (variant === 'split') {
    return (
      <div className="cv-block cv-block--cta" style={{ display: 'flex', background: 'var(--hp-primary)', color: '#fff' }}>
        <div style={{ flex: 1, padding: '32px 28px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--hp-heading-font)', marginBottom: 8 }}>Ready to get started?</h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: 16 }}>Join thousands of teams building with design tokens.</p>
          <button style={{ padding: '10px 20px', background: '#fff', color: 'var(--hp-primary)', border: 'none', borderRadius: 8, fontWeight: 700 }}>Start free trial</button>
        </div>
        <div style={{ width: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '2.5rem' }}>🚀</div>
        </div>
      </div>
    )
  }
  if (variant === 'minimal') {
    return (
      <div className="cv-block cv-block--cta" style={{ padding: '24px', textAlign: 'center', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted)', marginRight: 12 }}>Ready to build?</span>
        <button style={{ padding: '8px 16px', background: 'var(--hp-primary)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.8125rem' }}>Get started</button>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--cta" style={{ padding: '40px 24px', textAlign: 'center', background: 'var(--hp-primary)', color: '#fff' }}>
      <h2 style={{ fontSize: '1.375rem', fontWeight: 800, fontFamily: 'var(--hp-heading-font)', marginBottom: 8 }}>Ready to get started?</h2>
      <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: 20 }}>Join thousands of teams building with design tokens.</p>
      <button style={{ padding: '10px 24px', background: '#fff', color: 'var(--hp-primary)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem' }}>Start free trial</button>
    </div>
  )
}

export function MarketingFooterBlock({ variant = 'simple' }) {
  if (variant === 'columns') {
    return (
      <footer className="cv-block cv-block--footer" style={{ padding: '32px 24px', background: 'var(--hp-text)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 24 }}>
          {[['Product', ['Features', 'Pricing', 'Changelog']], ['Company', ['About', 'Blog', 'Careers']], ['Resources', ['Docs', 'Support', 'Status']], ['Legal', ['Privacy', 'Terms']]].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 10 }}>{title}</div>
              {links.map((l) => <div key={l} style={{ padding: '3px 0', cursor: 'pointer' }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, fontSize: '0.75rem' }}>© 2025 Acme Inc. All rights reserved.</div>
      </footer>
    )
  }
  if (variant === 'minimal') {
    return (
      <footer className="cv-block cv-block--footer" style={{ padding: '16px 24px', background: 'var(--hp-background)', borderTop: '1px solid var(--hp-border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>
        <span>© 2025 Acme Inc.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'Contact'].map((l) => <span key={l} style={{ cursor: 'pointer' }}>{l}</span>)}
        </div>
      </footer>
    )
  }
  return (
    <footer className="cv-block cv-block--footer" style={{ padding: '24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>
      <div style={{ fontWeight: 800, color: 'var(--hp-primary)', marginBottom: 8, fontSize: '1rem' }}>◈ Acme</div>
      <div>© 2025 Acme Inc. All rights reserved.</div>
    </footer>
  )
}
