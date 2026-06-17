import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  if (kit.typography) {
    if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
    if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const BAR_HEIGHTS = [55, 70, 45, 85, 65, 95, 80, 60, 75, 90, 50, 88]
const SPARK_DATA = [30, 50, 40, 70, 55, 80, 65]
const ACTIVITY = [
  { text: 'User signed up', badge: '✓', type: 'primary', time: '1h ago' },
  { text: 'Plan upgraded to Pro', badge: '✓', type: 'success', time: '2h ago' },
  { text: 'New support ticket opened', badge: '!', type: 'warning', time: '3h ago' },
  { text: 'Invoice paid — $204', badge: '✓', type: 'primary', time: '4h ago' },
  { text: 'New integration connected', badge: '✓', type: 'success', time: '5h ago' },
]
const ORDERS = [
  ['Alice M.', '$120', 'Paid'],
  ['Bob K.', '$89', 'Pending'],
  ['Carol L.', '$204', 'Paid'],
  ['David S.', '$55', 'Refunded'],
  ['Eve T.', '$310', 'Paid'],
]
const QUICK_ACTIONS = [
  { label: 'Create invoice', icon: '📄', desc: 'Send a new invoice to a client' },
  { label: 'Add user', icon: '👤', desc: 'Invite a team member or customer' },
  { label: 'Run report', icon: '📊', desc: 'Generate a revenue or usage report' },
  { label: 'Export data', icon: '📦', desc: 'Download CSV of current data set' },
]

function NavSidebarDark() {
  return (
    <aside style={{ width: 160, background: 'var(--hp-text, #111827)', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '14px 0' }}>
      <div style={{ padding: '0 14px 12px', fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>◈ Acme</div>
      <nav style={{ flex: 1 }}>
        {['Dashboard', 'Analytics', 'Users', 'Projects', 'Billing', 'Settings'].map((item, i) => (
          <div key={item} style={{
            padding: '7px 14px', fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
            background: i === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)',
            borderLeft: i === 0 ? '3px solid var(--hp-primary, #7c3aed)' : '3px solid transparent',
            cursor: 'pointer',
          }}>{item}</div>
        ))}
      </nav>
      <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JD</div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>Jane Doe</div>
          <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.45)' }}>Pro Plan</div>
        </div>
      </div>
    </aside>
  )
}

function NavSidebarLight() {
  return (
    <aside style={{ width: 160, background: 'var(--hp-surface, #f9fafb)', borderRight: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '14px 0' }}>
      <div style={{ padding: '0 14px 12px', fontSize: '1rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)', letterSpacing: '-0.02em' }}>◈ Acme</div>
      <nav style={{ flex: 1 }}>
        {['Dashboard', 'Analytics', 'Users', 'Projects', 'Billing', 'Settings'].map((item, i) => (
          <div key={item} style={{
            padding: '7px 14px', fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
            background: i === 0 ? 'var(--hp-background, #fff)' : 'transparent',
            color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)',
            borderLeft: i === 0 ? '3px solid var(--hp-primary, #7c3aed)' : '3px solid transparent',
            cursor: 'pointer',
          }}>{item}</div>
        ))}
      </nav>
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JD</div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)' }}>Jane Doe</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Pro Plan</div>
        </div>
      </div>
    </aside>
  )
}

function NavTopbar() {
  return (
    <div style={{ background: 'var(--hp-background, #fff)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 48, flexShrink: 0 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)', letterSpacing: '-0.02em', marginRight: 8 }}>◈ Acme</div>
      {['Dashboard', 'Analytics', 'Users', 'Projects', 'Billing'].map((item, i) => (
        <div key={item} style={{
          fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
          color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)',
          borderBottom: i === 0 ? '2px solid var(--hp-primary, #7c3aed)' : '2px solid transparent',
          padding: '0 4px', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer',
        }}>{item}</div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <input style={{ padding: '4px 8px', fontSize: '0.75rem', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-text, #111827)', width: 120 }} placeholder="Search…" readOnly />
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JD</div>
      </div>
    </div>
  )
}

function StatsMetricCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
      {[
        { label: 'Revenue', value: '$48,295', trend: '↑ +12.4%', up: true },
        { label: 'Users', value: '8,431', trend: '↑ +5.2%', up: true },
        { label: 'Sessions', value: '24.1K', trend: '↑ +3.1%', up: true },
        { label: 'Bounce Rate', value: '38.2%', trend: '↓ −1.4%', up: false },
      ].map((s) => (
        <div key={s.label} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)', fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: '0.6875rem', color: s.up ? 'var(--hp-success, #059669)' : '#ef4444', marginTop: 4, fontWeight: 600 }}>{s.trend}</div>
        </div>
      ))}
    </div>
  )
}

function StatsSparklines() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
      {[
        { label: 'Revenue', value: '$48,295', color: 'var(--hp-primary, #7c3aed)', data: [40, 55, 45, 70, 60, 80, 75] },
        { label: 'Users', value: '8,431', color: 'var(--hp-secondary, #a855f7)', data: [60, 50, 65, 55, 70, 65, 80] },
        { label: 'Sessions', value: '24.1K', color: 'var(--hp-accent, #06b6d4)', data: [30, 45, 35, 60, 50, 65, 55] },
        { label: 'Bounce', value: '38.2%', color: '#ef4444', data: [55, 50, 48, 52, 45, 42, 38] },
      ].map((s) => (
        <div key={s.label} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)', fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text, #111827)', marginBottom: 6 }}>{s.value}</div>
          <svg viewBox={`0 0 56 20`} width="100%" height={20} style={{ display: 'block', overflow: 'visible' }}>
            <polyline
              points={s.data.map((v, i) => `${i * (56/6)},${20 - (v / 80) * 18}`).join(' ')}
              fill="none" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

function StatsInline() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 0, marginBottom: 14 }}>
      {[
        { label: 'Revenue', value: '$48,295', trend: '+12.4%' },
        { label: 'Users', value: '8,431', trend: '+5.2%' },
        { label: 'Sessions', value: '24.1K', trend: '+3.1%' },
        { label: 'Bounce', value: '38.2%', trend: '−1.4%' },
        { label: 'Conversion', value: '3.8%', trend: '+0.4%' },
      ].map((s, i, arr) => (
        <div key={s.label} style={{ flex: 1, padding: '4px 12px', borderRight: i < arr.length - 1 ? '1px solid var(--hp-border, #e5e7eb)' : 'none' }}>
          <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1.2 }}>{s.value}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success, #059669)', fontWeight: 600 }}>{s.trend}</div>
        </div>
      ))}
    </div>
  )
}

function ChartBar() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px 14px', marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)' }}>Revenue — 2025</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Bar chart</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 72 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 2 }}>
            <div style={{ width: '100%', height: `${h}%`, background: i === 11 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-primary, #7c3aed)', opacity: i === 11 ? 1 : 0.55, borderRadius: '2px 2px 0 0' }} />
            <div style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{MONTHS[i].slice(0, 1)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartLine() {
  const w = 320, h = 72
  const pts = SPARK_DATA.concat([BAR_HEIGHTS[11] / 100 * 80]).concat([70, 80, 85, 78, 88])
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const ys = pts.map((v) => h - (v / 100) * (h - 8))
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ')
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px 14px', marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)' }}>Revenue trend — 2025</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Line chart</div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block', overflow: 'visible' }}>
        <polyline points={polyline} fill="none" stroke="var(--hp-primary, #7c3aed)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {xs.map((x, i) => <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="var(--hp-primary, #7c3aed)" />)}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m) => (
          <div key={m} style={{ fontSize: '0.55rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{m}</div>
        ))}
      </div>
    </div>
  )
}

function ChartArea() {
  const w = 320, h = 72
  const pts = [28, 42, 35, 58, 50, 72, 65, 80, 70, 85, 78, 88]
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const ys = pts.map((v) => h - (v / 100) * (h - 8))
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ')
  const area = `${xs[0]},${h} ` + polyline + ` ${xs[xs.length - 1]},${h}`
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px 14px', marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)' }}>Sessions — 2025</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Area chart</div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--hp-primary, #7c3aed)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--hp-primary, #7c3aed)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#areaGrad)" />
        <polyline points={polyline} fill="none" stroke="var(--hp-primary, #7c3aed)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {MONTHS.map((m) => <div key={m} style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{m.slice(0, 1)}</div>)}
      </div>
    </div>
  )
}

function ActivityFeed() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 10 }}>Activity Feed</div>
      {ACTIVITY.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--hp-border, #e5e7eb)' : 'none' }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', fontWeight: 700,
            background: item.type === 'success' ? 'var(--hp-success, #059669)' : item.type === 'warning' ? 'var(--hp-warning, #f59e0b)' : 'var(--hp-primary, #7c3aed)',
            color: '#fff',
          }}>{item.badge}</div>
          <span style={{ flex: 1, fontSize: '0.75rem', color: 'var(--hp-text, #111827)' }}>{item.text}</span>
          <span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)', whiteSpace: 'nowrap' }}>{item.time}</span>
        </div>
      ))}
    </div>
  )
}

function ActivityTable() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 10 }}>Recent Orders</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>
            {['Customer', 'Amount', 'Status'].map((h) => (
              <th key={h} style={{ textAlign: 'left', padding: '4px 6px', fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-textMuted, #9ca3af)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ORDERS.map(([name, amt, status], i) => (
            <tr key={i} style={{ borderBottom: i < ORDERS.length - 1 ? '1px solid var(--hp-border, #e5e7eb)' : 'none' }}>
              <td style={{ padding: '5px 6px', fontWeight: 600, color: 'var(--hp-text, #111827)' }}>{name}</td>
              <td style={{ padding: '5px 6px', color: 'var(--hp-textMuted, #6b7280)' }}>{amt}</td>
              <td style={{ padding: '5px 6px' }}>
                <span style={{
                  padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700,
                  background: status === 'Paid' ? 'rgba(5,150,105,0.12)' : status === 'Pending' ? 'rgba(245,158,11,0.12)' : 'var(--hp-surface, #f3f4f6)',
                  color: status === 'Paid' ? 'var(--hp-success, #059669)' : status === 'Pending' ? 'var(--hp-warning, #f59e0b)' : 'var(--hp-textMuted, #6b7280)',
                }}>{status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ActivityActions() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 10 }}>Quick Actions</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {QUICK_ACTIONS.map((action) => (
          <div key={action.label} style={{ background: 'var(--hp-background, #fff)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 7, padding: '8px 10px', cursor: 'pointer' }}>
            <div style={{ fontSize: '1rem', marginBottom: 3 }}>{action.icon}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)' }}>{action.label}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 1 }}>{action.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PreviewDashboard({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('dashboard')
  const defaults = getDefaultSections('dashboard')
  const config = { ...defaults, ...sectionConfig }

  function wrap(sectionKey, children) {
    const def = sections.find((s) => s.key === sectionKey)
    return (
      <SectionWrapper
        key={sectionKey}
        label={def?.label || sectionKey}
        sectionKey={sectionKey}
        variants={def?.variants || []}
        currentVariant={config[sectionKey]}
        onSectionChange={onSectionChange}
      >
        {children}
      </SectionWrapper>
    )
  }

  const navVariant = config.nav
  const statsVariant = config.stats
  const chartVariant = config.chart
  const activityVariant = config.activity

  const isTopbar = navVariant === 'topbar'

  return (
    <div className="lp-page" ref={ref} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {isTopbar && wrap('nav', <NavTopbar />)}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {!isTopbar && wrap('nav', navVariant === 'sidebar-light' ? <NavSidebarLight /> : <NavSidebarDark />)}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: 'var(--hp-background, #fff)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font)' }}>Dashboard</h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 2 }}>Apr 1 – Apr 7, 2025</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select style={{ fontSize: '0.75rem', padding: '4px 8px', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-text, #111827)' }}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
              <button style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--hp-primary, #7c3aed)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>+ New</button>
            </div>
          </div>

          {wrap('stats', statsVariant === 'sparklines' ? <StatsSparklines /> : statsVariant === 'inline' ? <StatsInline /> : <StatsMetricCards />)}
          {wrap('chart', chartVariant === 'line' ? <ChartLine /> : chartVariant === 'area' ? <ChartArea /> : <ChartBar />)}
          {wrap('activity', activityVariant === 'table' ? <ActivityTable /> : activityVariant === 'actions' ? <ActivityActions /> : <ActivityFeed />)}
        </div>
      </div>
    </div>
  )
}
