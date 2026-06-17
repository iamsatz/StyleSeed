import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const BAR_A = [40, 65, 50, 80, 60, 90, 75]
const BAR_B = [30, 50, 45, 70, 55, 80, 65]
const LINE_POINTS = BAR_A

const KPI_METRICS = [
  { label: 'Page Views', value: '128.4K', trend: '+18.2%', up: true, spark: [40, 50, 45, 65, 60, 80, 90] },
  { label: 'Unique Visitors', value: '42.1K', trend: '+7.4%', up: true, spark: [30, 40, 38, 52, 55, 60, 65] },
  { label: 'Avg Session', value: '3m 42s', trend: '+0.8%', up: true, spark: [55, 60, 58, 62, 65, 63, 70] },
  { label: 'Bounce Rate', value: '36.7%', trend: '−2.1%', up: false, spark: [50, 48, 45, 42, 40, 38, 37] },
]

const TRANSACTIONS = [
  { id: 'TXN-0041', desc: 'Pro plan upgrade', amount: '+$99.00', status: 'Completed', date: 'Jun 17' },
  { id: 'TXN-0040', desc: 'Enterprise renewal', amount: '+$499.00', status: 'Completed', date: 'Jun 16' },
  { id: 'TXN-0039', desc: 'Team seat addon', amount: '+$29.00', status: 'Pending', date: 'Jun 16' },
  { id: 'TXN-0038', desc: 'Starter plan', amount: '+$19.00', status: 'Completed', date: 'Jun 15' },
]

const EVENTS = [
  { type: 'signup', user: 'jane@acme.com', meta: 'via Google', time: '2 min ago' },
  { type: 'upgrade', user: 'mark@luma.co', meta: 'Pro → Enterprise', time: '14 min ago' },
  { type: 'export', user: 'sarah@signal.io', meta: 'CSS tokens', time: '32 min ago' },
  { type: 'invite', user: 'alex@kite.dev', meta: '3 teammates', time: '1 hr ago' },
]

const TOP_PAGES = [
  { page: '/dashboard', views: '24,812', change: '+8.4%', up: true },
  { page: '/pricing', views: '18,391', change: '+12.1%', up: true },
  { page: '/docs/intro', views: '11,204', change: '−3.2%', up: false },
  { page: '/blog', views: '9,847', change: '+5.7%', up: true },
]

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

// ── KPI variants ─────────────────────────────────────────────────────────────

function KpiMetricCards() {
  return (
    <div className="lp-dash-stats" style={{ padding: '16px 24px', background: 'var(--hp-background)', gap: 10 }}>
      {KPI_METRICS.map((m, i) => (
        <div key={i} className={`lp-stat${i === 0 ? ' lp-stat--primary' : ''}`} style={{ padding: '12px 14px' }}>
          <div className="lp-stat-label">{m.label}</div>
          <div className="lp-stat-value">{m.value}</div>
          <div className={`lp-stat-trend${m.up ? '' : ' lp-stat-trend--down'}`}>{m.up ? '↑' : '↓'} {m.trend}</div>
        </div>
      ))}
    </div>
  )
}

function Sparkline({ data, color }) {
  const max = Math.max(...data)
  const w = 60, h = 24
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color || 'var(--hp-primary)'} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function KpiSparklines() {
  const colors = ['var(--hp-primary)', 'var(--hp-secondary)', 'var(--hp-accent)', 'var(--hp-success)']
  return (
    <div style={{ padding: '12px 24px', background: 'var(--hp-background)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {KPI_METRICS.map((m, i) => (
        <div key={i} className="lp-card" style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text)', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: m.up ? 'var(--hp-success)' : 'var(--hp-warning)', marginTop: 2 }}>{m.up ? '↑' : '↓'} {m.trend}</div>
          </div>
          <Sparkline data={m.spark} color={colors[i]} />
        </div>
      ))}
    </div>
  )
}

function KpiProgress() {
  const totals = [128400, 42100, 222, 36.7]
  const maxes = [200000, 80000, 400, 100]
  return (
    <div style={{ padding: '14px 24px', background: 'var(--hp-background)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {KPI_METRICS.map((m, i) => {
        const pct = Math.round((totals[i] / maxes[i]) * 100)
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--hp-text)', fontWeight: 600 }}>{m.label}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-text)' }}>{m.value}</span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: m.up ? 'var(--hp-success)' : 'var(--hp-warning)' }}>{m.up ? '↑' : '↓'} {m.trend}</span>
              </div>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: 'var(--hp-surface)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, borderRadius: 4, background: i === 0 ? 'var(--hp-primary)' : i === 1 ? 'var(--hp-secondary)' : i === 2 ? 'var(--hp-accent)' : 'var(--hp-success)' }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Chart variants ───────────────────────────────────────────────────────────

function ChartBar() {
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-background)' }}>
      <div className="lp-analytics-charts">
        <div className="lp-analytics-chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="lp-comp-label" style={{ margin: 0 }}>Page Views</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>Last 7 days</span>
          </div>
          <div className="lp-chart-bars">
            {BAR_A.map((h, i) => (
              <div key={i} className="lp-chart-bar-col">
                <div className="lp-chart-bar" style={{ height: `${h}%`, background: 'var(--hp-primary)' }} />
                <div className="lp-chart-bar-label">{DAYS[i].slice(0, 1)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lp-analytics-chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="lp-comp-label" style={{ margin: 0 }}>Unique Visitors</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>Last 7 days</span>
          </div>
          <div className="lp-chart-bars">
            {BAR_B.map((h, i) => (
              <div key={i} className="lp-chart-bar-col">
                <div className="lp-chart-bar" style={{ height: `${h}%`, background: 'var(--hp-secondary)' }} />
                <div className="lp-chart-bar-label">{DAYS[i].slice(0, 1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChartLine() {
  const w = 260, h = 100
  const max = Math.max(...LINE_POINTS)
  const pts = LINE_POINTS.map((v, i) => `${(i / (LINE_POINTS.length - 1)) * w},${h - (v / max) * (h - 10) - 5}`).join(' ')
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-background)' }}>
      <div className="lp-analytics-chart-card" style={{ display: 'block' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="lp-comp-label" style={{ margin: 0 }}>Page Views — Trend</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['7d', '30d', '90d'].map((opt, i) => (
              <button key={i} className={`lp-chip${i === 0 ? ' lp-chip--active' : ''}`} style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>{opt}</button>
            ))}
          </div>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--hp-primary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--hp-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#lineGrad)" />
          <polyline points={pts} fill="none" stroke="var(--hp-primary)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {LINE_POINTS.map((v, i) => (
            <circle key={i} cx={(i / (LINE_POINTS.length - 1)) * w} cy={h - (v / max) * (h - 10) - 5} r="3.5" fill="var(--hp-primary)" />
          ))}
          {DAYS.map((d, i) => (
            <text key={i} x={(i / (DAYS.length - 1)) * w} y={h + 12} textAnchor="middle" fontSize="9" fill="var(--hp-textMuted)">{d.slice(0, 1)}</text>
          ))}
        </svg>
      </div>
    </div>
  )
}

function ChartDonut() {
  const segments = [
    { label: 'Direct', pct: 38, color: 'var(--hp-primary)' },
    { label: 'Organic', pct: 29, color: 'var(--hp-secondary)' },
    { label: 'Referral', pct: 19, color: 'var(--hp-accent)' },
    { label: 'Social', pct: 14, color: 'var(--hp-success)' },
  ]
  const r = 40, cx = 55, cy = 55, stroke = 18
  const circumference = 2 * Math.PI * r
  let offset = 0
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-background)' }}>
      <div className="lp-analytics-chart-card" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <div>
          <div className="lp-comp-label" style={{ margin: '0 0 12px' }}>Traffic Sources</div>
          <svg width="110" height="110" viewBox="0 0 110 110">
            {segments.map((seg, i) => {
              const dashArray = (seg.pct / 100) * circumference
              const dashOffset = -(offset / 100) * circumference
              offset += seg.pct
              return (
                <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={stroke}
                  strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                  strokeDashoffset={dashOffset + circumference * 0.25}
                  style={{ transition: 'none' }}
                />
              )
            })}
            <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--hp-text)">38%</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="var(--hp-textMuted)">Direct</text>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          {segments.map((seg, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--hp-text)', flex: 1 }}>{seg.label}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Table variants ───────────────────────────────────────────────────────────

function TableTransactions() {
  return (
    <div style={{ padding: '0 24px 16px', background: 'var(--hp-background)' }}>
      <div className="lp-comp-label" style={{ marginBottom: 8 }}>Recent Transactions</div>
      <div className="lp-card">
        <table className="lp-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((row, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{row.id}</td>
                <td style={{ fontSize: '0.8125rem', color: 'var(--hp-text)' }}>{row.desc}</td>
                <td style={{ fontWeight: 700, color: 'var(--hp-success)', fontSize: '0.875rem' }}>{row.amount}</td>
                <td>
                  <span className="lp-badge" style={{ background: row.status === 'Completed' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: row.status === 'Completed' ? 'var(--hp-success)' : 'var(--hp-warning)', fontSize: '0.6875rem' }}>{row.status}</span>
                </td>
                <td style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TableEvents() {
  const iconMap = { signup: '👤', upgrade: '⬆', export: '📦', invite: '✉' }
  return (
    <div style={{ padding: '0 24px 16px', background: 'var(--hp-background)' }}>
      <div className="lp-comp-label" style={{ marginBottom: 8 }}>Event Log</div>
      <div className="lp-card" style={{ padding: 0 }}>
        {EVENTS.map((ev, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', borderBottom: i < EVENTS.length - 1 ? '1px solid var(--hp-border)' : 'none', alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', flexShrink: 0 }}>{iconMap[ev.type]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)' }}>{ev.user}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{ev.meta}</div>
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', flexShrink: 0 }}>{ev.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TablePages() {
  return (
    <div style={{ padding: '0 24px 16px', background: 'var(--hp-background)' }}>
      <div className="lp-comp-label" style={{ marginBottom: 8 }}>Top Pages</div>
      <div className="lp-card">
        <table className="lp-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PAGES.map((row, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--hp-primary)', fontSize: '0.8125rem', fontFamily: 'monospace' }}>{row.page}</td>
                <td style={{ fontWeight: 600, color: 'var(--hp-text)' }}>{row.views}</td>
                <td>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: row.up ? 'var(--hp-success)' : 'var(--hp-warning)' }}>{row.change}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function PreviewAnalytics({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('analytics')
  const defaults = getDefaultSections('analytics')
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

  const kpisNode =
    config.kpis === 'sparklines' ? <KpiSparklines /> :
    config.kpis === 'progress' ? <KpiProgress /> :
    <KpiMetricCards />

  const chartNode =
    config.chart === 'line' ? <ChartLine /> :
    config.chart === 'donut' ? <ChartDonut /> :
    <ChartBar />

  const tableNode =
    config.table === 'events' ? <TableEvents /> :
    config.table === 'pages' ? <TablePages /> :
    <TableTransactions />

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text)' }}>Analytics</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Overview</a>
          <a className="lp-app-nav-link">Reports</a>
          <a className="lp-app-nav-link">Funnels</a>
          <a className="lp-app-nav-link">Audiences</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Export</button>
      </nav>

      <div style={{ padding: '10px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Date range:</span>
        {['7 days', '30 days', '90 days', 'Custom'].map((opt, i) => (
          <button key={i} className={`lp-chip${i === 0 ? ' lp-chip--active' : ''}`}>{opt}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--hp-success)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Live · 142 active now</span>
        </div>
      </div>

      {wrap('kpis', kpisNode)}
      {wrap('chart', chartNode)}
      {wrap('table', tableNode)}
    </div>
  )
}
