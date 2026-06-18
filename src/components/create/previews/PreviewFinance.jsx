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

const ACCOUNTS = [
  { name: 'Checking', number: '•••• 4821', balance: '$12,480.50', change: '+$340.00', up: true },
  { name: 'Savings', number: '•••• 2293', balance: '$48,200.00', change: '+$1,200.00', up: true },
  { name: 'Investment', number: '•••• 9902', balance: '$94,320.88', change: '-$1,040.12', up: false },
]

const TRANSACTIONS = [
  { icon: '🛒', label: 'Whole Foods Market', category: 'Groceries', date: 'Today', amount: '-$84.32' },
  { icon: '⚡', label: 'Electric Co.', category: 'Utilities', date: 'Yesterday', amount: '-$142.00' },
  { icon: '💸', label: 'Direct Deposit', category: 'Income', date: 'Jun 14', amount: '+$4,200.00', positive: true },
  { icon: '🎵', label: 'Spotify', category: 'Entertainment', date: 'Jun 12', amount: '-$9.99' },
  { icon: '🚗', label: 'Shell Gas Station', category: 'Transport', date: 'Jun 11', amount: '-$52.40' },
]

const SPEND_BARS = [
  { label: 'Housing', pct: 72, amt: '$1,800' },
  { label: 'Food', pct: 38, amt: '$940' },
  { label: 'Transport', pct: 22, amt: '$540' },
  { label: 'Entertainment', pct: 12, amt: '$300' },
]

// ── Nav variants ─────────────────────────────────────────────────────────────

function NavSidebarDark() {
  return (
    <div style={{ width: 52, flexShrink: 0, background: 'var(--hp-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 6 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', marginBottom: 8 }}>₿</div>
      {['🏠','💳','📈','📊','⚙️'].map((ico, i) => (
        <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: i === 0 ? 'rgba(255,255,255,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', cursor: 'pointer' }}>{ico}</div>
      ))}
    </div>
  )
}

function NavSidebarLight() {
  return (
    <div style={{ width: 160, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', display: 'flex', flexDirection: 'column', padding: '16px 12px', gap: 2 }}>
      <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--hp-primary)', marginBottom: 16, paddingLeft: 8, fontFamily: 'var(--hp-heading-font)' }}>NovaBanq</div>
      {[['🏠','Overview','true'],['💳','Accounts',''],['📈','Investments',''],['📊','Analytics',''],['⚙️','Settings','']].map(([ico, lbl, active]) => (
        <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 7, background: active ? 'var(--hp-primary)' : 'transparent', cursor: 'pointer' }}>
          <span style={{ fontSize: '0.75rem' }}>{ico}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: active ? 700 : 500, color: active ? 'var(--hp-background)' : 'var(--hp-textMuted)' }}>{lbl}</span>
        </div>
      ))}
    </div>
  )
}

function NavTopbar() {
  return (
    <div style={{ height: 44, borderBottom: '1px solid var(--hp-border)', background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16 }}>
      <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)' }}>NovaBanq</div>
      <div style={{ flex: 1, display: 'flex', gap: 16 }}>
        {['Overview','Accounts','Cards','Transfers','Investments'].map((l, i) => (
          <span key={l} style={{ fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', cursor: 'pointer', borderBottom: i === 0 ? '2px solid var(--hp-primary)' : 'none', paddingBottom: 2 }}>{l}</span>
        ))}
      </div>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary)', color: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 800 }}>AK</div>
    </div>
  )
}

// ── Account variants ──────────────────────────────────────────────────────────

function AccountCards() {
  return (
    <div style={{ padding: '16px 20px', display: 'flex', gap: 12 }}>
      {ACCOUNTS.map((acc, i) => (
        <div key={i} className="lp-card" style={{ flex: 1, padding: '14px 16px' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted)', marginBottom: 4 }}>{acc.name}</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 2 }}>{acc.balance}</div>
          <div style={{ fontSize: '0.6875rem', color: acc.up ? 'var(--hp-success)' : 'var(--hp-warning)', fontWeight: 600 }}>{acc.change} this month</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginTop: 4 }}>{acc.number}</div>
        </div>
      ))}
    </div>
  )
}

function AccountList() {
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Your accounts</div>
      {ACCOUNTS.map((acc, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: i < ACCOUNTS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', marginRight: 12 }}>🏦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{acc.name}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{acc.number}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>{acc.balance}</div>
            <div style={{ fontSize: '0.6875rem', color: acc.up ? 'var(--hp-success)' : 'var(--hp-warning)', fontWeight: 600 }}>{acc.change}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AccountCompact() {
  const total = '$154,001.38'
  return (
    <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 20, background: 'var(--hp-primary)', borderRadius: 12, margin: '16px 20px' }}>
      <div>
        <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total net worth</div>
        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', lineHeight: 1.1 }}>{total}</div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>+$1,459.88 this month</div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        {['Send','Receive','Pay'].map((a) => (
          <button key={a} style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>{a}</button>
        ))}
      </div>
    </div>
  )
}

// ── Transaction variants ──────────────────────────────────────────────────────

function TransactionsFull() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Recent transactions</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-primary)', fontWeight: 600, cursor: 'pointer' }}>View all</div>
      </div>
      {TRANSACTIONS.map((tx, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', marginRight: 10 }}>{tx.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)' }}>{tx.label}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{tx.category} · {tx.date}</div>
          </div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: tx.positive ? 'var(--hp-success)' : 'var(--hp-text)' }}>{tx.amount}</div>
        </div>
      ))}
    </div>
  )
}

function TransactionsCompact() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 8 }}>Transactions</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {TRANSACTIONS.slice(0, 4).map((tx, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', background: 'var(--hp-surface)', borderRadius: 8, gap: 10 }}>
            <span style={{ fontSize: '0.75rem' }}>{tx.icon}</span>
            <span style={{ flex: 1, fontSize: '0.75rem', color: 'var(--hp-text)', fontWeight: 500 }}>{tx.label}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: tx.positive ? 'var(--hp-success)' : 'var(--hp-textMuted)' }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TransactionsGrouped() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 8 }}>Spending by category</div>
      {SPEND_BARS.map((s, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--hp-text)', fontWeight: 500 }}>{s.label}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{s.amt}</span>
          </div>
          <div style={{ height: 6, background: 'var(--hp-surface)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${s.pct}%`, height: '100%', background: 'var(--hp-primary)', borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Chart variants ────────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun']
const SPEND_DATA = [2100, 1800, 2400, 1900, 2200, 1760]
const INCOME_DATA = [4200, 4200, 4500, 4200, 4200, 4200]
const PORT_DATA = [88000, 86000, 91000, 89000, 93000, 94320]
const PORT_MAX = Math.max(...PORT_DATA)
const PORT_MIN = Math.min(...PORT_DATA)

function ChartSpending() {
  const max = Math.max(...SPEND_DATA)
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Monthly spending</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
        {SPEND_DATA.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: Math.round((v / max) * 64), background: i === SPEND_DATA.length - 1 ? 'var(--hp-primary)' : 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 4 }} />
            <span style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted)' }}>{MONTHS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartIncome() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Income vs Spending</div>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 }}>
        {MONTHS.map((m, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: 64 }}>
              <div style={{ flex: 1, height: Math.round((INCOME_DATA[i] / 5000) * 64), background: 'var(--hp-success)', opacity: 0.7, borderRadius: '3px 3px 0 0' }} />
              <div style={{ flex: 1, height: Math.round((SPEND_DATA[i] / 5000) * 64), background: 'var(--hp-primary)', borderRadius: '3px 3px 0 0' }} />
            </div>
            <span style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted)' }}>{m}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--hp-success)', opacity: 0.7 }} /><span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)' }}>Income</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--hp-primary)' }} /><span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)' }}>Spending</span></div>
      </div>
    </div>
  )
}

function ChartPortfolio() {
  const range = PORT_MAX - PORT_MIN
  const pts = PORT_DATA.map((v, i) => {
    const x = (i / (PORT_DATA.length - 1)) * 260
    const y = 60 - Math.round(((v - PORT_MIN) / range) * 50)
    return `${x},${y}`
  }).join(' ')
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Portfolio value</div>
        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-success)' }}>+7.2%</div>
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 6 }}>$94,320</div>
      <svg width="100%" viewBox="0 0 260 65" preserveAspectRatio="none" style={{ display: 'block' }}>
        <polyline points={pts} fill="none" stroke="var(--hp-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`0,65 ${pts} 260,65`} fill="var(--hp-primary)" opacity="0.1" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {MONTHS.map((m) => <span key={m} style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted)' }}>{m}</span>)}
      </div>
    </div>
  )
}

export default function PreviewFinance({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('finance')
  const defaults = getDefaultSections('finance')
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

  const navNode = config.nav === 'sidebar-light' ? <NavSidebarLight /> : config.nav === 'topbar' ? null : <NavSidebarDark />
  const isTopbar = config.nav === 'topbar'

  const accountsNode =
    config.accounts === 'list' ? <AccountList /> :
    config.accounts === 'compact' ? <AccountCompact /> :
    <AccountCards />

  const txNode =
    config.transactions === 'compact' ? <TransactionsCompact /> :
    config.transactions === 'grouped' ? <TransactionsGrouped /> :
    <TransactionsFull />

  const chartNode =
    config.chart === 'income' ? <ChartIncome /> :
    config.chart === 'portfolio' ? <ChartPortfolio /> :
    <ChartSpending />

  return (
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {isTopbar && wrap('nav', <NavTopbar />)}
      <div style={{ display: 'flex', flex: 1 }}>
        {!isTopbar && wrap('nav', navNode)}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {!isTopbar && (
            <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Good morning,</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>Alex Kim</div>
              </div>
              <button className="lp-btn lp-btn--primary lp-btn--sm">+ New transfer</button>
            </div>
          )}
          {wrap('accounts', accountsNode)}
          {wrap('chart', chartNode)}
          {wrap('transactions', txNode)}
        </div>
      </div>
    </div>
  )
}
