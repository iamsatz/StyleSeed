import React from 'react'

const TABLE_ROWS = [
  ['Alice M.', 'alice@acme.io', 'Admin', 'Active'],
  ['Bob K.', 'bob@acme.io', 'Editor', 'Active'],
  ['Carol L.', 'carol@acme.io', 'Viewer', 'Pending'],
  ['David S.', 'david@acme.io', 'Editor', 'Active'],
]

export function PrimitiveDataTableBlock({ variant = 'full-data', config }) {
  const title = config?.title?.trim() || 'Team members'
  const pad = 'var(--cv-block-pad, 16px)'
  if (variant === 'compact') {
    return (
      <div className="cv-block" style={{ padding: pad, background: 'var(--hp-background)' }}>
        <div style={{ fontSize: 'calc(0.875rem * var(--cv-block-scale, 1))', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>{title}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--hp-border)' }}>
              {['Name', 'Role', 'Status'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--hp-textMuted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.625rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(([name, , role, status], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--hp-border)' }}>
                <td style={{ padding: '6px 8px', fontWeight: 600, color: 'var(--hp-text)' }}>{name}</td>
                <td style={{ padding: '6px 8px', color: 'var(--hp-textMuted)' }}>{role}</td>
                <td style={{ padding: '6px 8px' }}>
                  <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: status === 'Active' ? 'rgba(5,150,105,0.12)' : 'rgba(245,158,11,0.12)', color: status === 'Active' ? 'var(--hp-success)' : 'var(--hp-warning)' }}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (variant === 'card-view') {
    return (
      <div className="cv-block" style={{ padding: pad, background: 'var(--hp-background)' }}>
        <div style={{ fontSize: 'calc(0.875rem * var(--cv-block-scale, 1))', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>{title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--cv-block-gap, 10px)' }}>
        {TABLE_ROWS.map(([name, email, role, status]) => (
          <div key={name} style={{ padding: '12px 14px', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)' }}>{name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{email}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{role}</span>
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: status === 'Active' ? 'var(--hp-success)' : 'var(--hp-warning)' }}>{status}</span>
            </div>
          </div>
        ))}
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: pad, background: 'var(--hp-background)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 'calc(0.875rem * var(--cv-block-scale, 1))', fontWeight: 700, color: 'var(--hp-text)' }}>{title}</div>
        <button style={{ padding: '5px 12px', borderRadius: 7, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>+ Add</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--hp-border)' }}>
            {['Name', 'Email', 'Role', 'Status'].map((h) => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--hp-textMuted)', fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(([name, email, role, status], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--hp-border)' }}>
              <td style={{ padding: '8px 10px', fontWeight: 600, color: 'var(--hp-text)' }}>{name}</td>
              <td style={{ padding: '8px 10px', color: 'var(--hp-textMuted)' }}>{email}</td>
              <td style={{ padding: '8px 10px', color: 'var(--hp-text)' }}>{role}</td>
              <td style={{ padding: '8px 10px' }}>
                <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.6875rem', fontWeight: 700, background: status === 'Active' ? 'rgba(5,150,105,0.12)' : 'rgba(245,158,11,0.12)', color: status === 'Active' ? 'var(--hp-success)' : 'var(--hp-warning)' }}>{status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PrimitivePaginationBlock({ variant = 'simple' }) {
  if (variant === 'page-selector') {
    return (
      <div className="cv-block" style={{ padding: '12px 16px', background: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--hp-border)' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>Showing 1–10 of 48</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <button style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: '0.75rem' }}>Prev</button>
          {[1, 2, 3, '…', 5].map((p, i) => (
            <button key={i} style={{ width: 32, height: 32, borderRadius: 6, border: p === 1 ? 'none' : '1px solid var(--hp-border)', background: p === 1 ? 'var(--hp-primary)' : 'var(--hp-surface)', color: p === 1 ? '#fff' : 'var(--hp-text)', fontSize: '0.75rem', fontWeight: p === 1 ? 700 : 400 }}>{p}</button>
          ))}
          <button style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: '0.75rem' }}>Next</button>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: '12px 16px', background: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderTop: '1px solid var(--hp-border)' }}>
      <button style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>← Previous</button>
      <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>Page 1 of 5</span>
      <button style={{ padding: '6px 14px', borderRadius: 7, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.8125rem', fontWeight: 600 }}>Next →</button>
    </div>
  )
}

export function PrimitiveAccordionBlock({ variant = 'default', config }) {
  const title = config?.title?.trim() || 'Frequently asked questions'
  const pad = 'var(--cv-block-pad, 16px)'
  const items = variant === 'bordered'
    ? [{ q: 'What is included?', open: true }, { q: 'Can I cancel anytime?', open: false }, { q: 'Do you offer refunds?', open: false }]
    : [{ q: 'How do design tokens work?', open: true }, { q: 'Which AI tools are supported?', open: false }, { q: 'Can I import from Figma?', open: false }]

  return (
    <div className="cv-block" style={{ padding: pad, background: 'var(--hp-background)' }}>
      <div style={{ fontSize: 'calc(0.875rem * var(--cv-block-scale, 1))', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 12 }}>{title}</div>
      {items.map((item, i) => (
        <div key={item.q} style={{ border: variant === 'bordered' ? '1px solid var(--hp-border)' : 'none', borderBottom: variant === 'bordered' ? undefined : '1px solid var(--hp-border)', borderRadius: variant === 'bordered' ? 8 : 0, marginBottom: variant === 'bordered' ? 8 : 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)', display: 'flex', justifyContent: 'space-between', background: item.open ? 'var(--hp-surface)' : 'transparent' }}>
            {item.q}
            <span style={{ color: 'var(--hp-textMuted)' }}>{item.open ? '−' : '+'}</span>
          </div>
          {item.open && (
            <div style={{ padding: '0 16px 14px', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', lineHeight: 1.55, background: 'var(--hp-surface)' }}>
              StyleSeed lets you browse curated kits, customize colors and typography, preview on real UI components, and export AI-ready design context.
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function PrimitiveBreadcrumbBlock({ variant = 'default' }) {
  const items = variant === 'with-icon'
    ? ['Home', 'Products', 'Accessories', 'Leather Tote']
    : ['Dashboard', 'Settings', 'Notifications']

  return (
    <div className="cv-block" style={{ padding: '10px 16px', background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
        {items.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && <span style={{ color: 'var(--hp-textMuted)' }}>/</span>}
            <span style={{ color: i === items.length - 1 ? 'var(--hp-text)' : 'var(--hp-textMuted)', fontWeight: i === items.length - 1 ? 600 : 400 }}>{item}</span>
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}

export function PrimitiveModalBlock({ variant = 'centered' }) {
  if (variant === 'drawer') {
    return (
      <div className="cv-block" style={{ position: 'relative', minHeight: 200, background: 'rgba(15,23,42,0.4)', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: 320, height: '100%', minHeight: 200, background: 'var(--hp-background)', borderLeft: '1px solid var(--hp-border)', padding: 20, boxShadow: '-8px 0 24px rgba(0,0,0,0.12)' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 8 }}>Edit profile</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginBottom: 16 }}>Update your public profile information.</div>
          <input style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', marginBottom: 12, fontSize: 13 }} placeholder="Display name" readOnly />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button style={{ padding: '7px 14px', borderRadius: 7, border: '1px solid var(--hp-border)', background: 'transparent', fontSize: 12 }}>Cancel</button>
            <button style={{ padding: '7px 14px', borderRadius: 7, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: 12, fontWeight: 600 }}>Save</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ position: 'relative', minHeight: 220, background: 'rgba(15,23,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360, background: 'var(--hp-background)', borderRadius: 12, padding: '24px 22px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 6 }}>Delete project?</div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginBottom: 20, lineHeight: 1.5 }}>This action cannot be undone. All data will be permanently removed.</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'transparent', fontSize: 13 }}>Cancel</button>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 600 }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export function PrimitiveToastBlock({ variant = 'success' }) {
  const styles = {
    success: { bg: 'rgba(5,150,105,0.12)', border: 'var(--hp-success)', icon: '✓', title: 'Changes saved', msg: 'Your kit was updated successfully.' },
    error: { bg: 'rgba(239,68,68,0.1)', border: '#ef4444', icon: '✕', title: 'Export failed', msg: 'Could not generate export file. Try again.' },
    info: { bg: 'rgba(59,130,246,0.1)', border: 'var(--hp-primary)', icon: 'ℹ', title: 'New kits available', msg: '3 industry kits were added this week.' },
  }
  const s = styles[variant] || styles.success

  return (
    <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 10, background: s.bg, border: `1px solid ${s.border}`, maxWidth: 380 }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: s.border, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.icon}</span>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)' }}>{s.title}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{s.msg}</div>
        </div>
      </div>
    </div>
  )
}

export function PrimitiveStepperBlock({ variant = 'horizontal' }) {
  const steps = ['Account', 'Profile', 'Preferences', 'Done']
  const current = 1

  if (variant === 'vertical') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
        {steps.map((step, i) => (
          <div key={step} style={{ display: 'flex', gap: 12, marginBottom: i < steps.length - 1 ? 0 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= current ? 'var(--hp-primary)' : 'var(--hp-surface)', border: i <= current ? 'none' : '1px solid var(--hp-border)', color: i <= current ? '#fff' : 'var(--hp-textMuted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</div>
              {i < steps.length - 1 && <div style={{ width: 2, height: 24, background: i < current ? 'var(--hp-primary)' : 'var(--hp-border)' }} />}
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: i === current ? 600 : 400, color: i <= current ? 'var(--hp-text)' : 'var(--hp-textMuted)' }}>{step}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: '16px 20px', background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: i <= current ? 'var(--hp-primary)' : 'var(--hp-surface)', border: i <= current ? 'none' : '1px solid var(--hp-border)', color: i <= current ? '#fff' : 'var(--hp-textMuted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
              <div style={{ fontSize: '0.6875rem', fontWeight: i === current ? 600 : 400, color: i <= current ? 'var(--hp-primary)' : 'var(--hp-textMuted)' }}>{step}</div>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < current ? 'var(--hp-primary)' : 'var(--hp-border)', margin: '0 8px', marginBottom: 20, minWidth: 24 }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function PrimitiveButtonsBlock({ variant = 'primary-set' }) {
  if (variant === 'sizes') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {[{ label: 'Small', pad: '5px 12px', fs: '0.75rem' }, { label: 'Medium', pad: '8px 16px', fs: '0.8125rem' }, { label: 'Large', pad: '11px 22px', fs: '0.875rem' }].map((b) => (
          <button key={b.label} style={{ padding: b.pad, borderRadius: 8, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: b.fs, fontWeight: 600 }}>{b.label}</button>
        ))}
      </div>
    )
  }
  if (variant === 'ghost-outline') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.8125rem', fontWeight: 600 }}>Primary</button>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'transparent', color: 'var(--hp-text)', fontSize: '0.8125rem', fontWeight: 500 }}>Outline</button>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--hp-textMuted)', fontSize: '0.8125rem', fontWeight: 500 }}>Ghost</button>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--hp-primary)', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'underline' }}>Link</button>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 20, background: 'var(--hp-surface)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <button style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.8125rem', fontWeight: 600 }}>Primary</button>
      <button style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: 'var(--hp-secondary)', color: '#fff', fontSize: '0.8125rem', fontWeight: 600 }}>Secondary</button>
      <button style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: 'var(--hp-accent)', color: '#fff', fontSize: '0.8125rem', fontWeight: 600 }}>Accent</button>
      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.6875rem', fontWeight: 700, background: 'rgba(5,150,105,0.12)', color: 'var(--hp-success)' }}>Success</span>
      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.6875rem', fontWeight: 700, background: 'rgba(245,158,11,0.12)', color: 'var(--hp-warning)' }}>Warning</span>
    </div>
  )
}

const COMMAND_ITEMS = [
  { icon: '⌘', label: 'Create new kit', hint: 'Canvas' },
  { icon: '◈', label: 'Browse kits', hint: 'Navigate' },
  { icon: '🎨', label: 'Open color picker', hint: 'Create' },
  { icon: '⬇', label: 'Export to Cursor', hint: 'Export' },
]

const LUCIDE_ICONS = ['LayoutGrid', 'Palette', 'Type', 'Sparkles', 'Settings', 'Search', 'Bell', 'User', 'Home', 'ChartBar']

export function PrimitiveDatePickerBlock({ variant = 'single' }) {
  if (variant === 'range') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hp-text)', marginBottom: 8 }}>Date range</label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: 13 }} value="Apr 1, 2025" readOnly />
          <span style={{ color: 'var(--hp-textMuted)', fontSize: 12 }}>to</span>
          <input style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: 13 }} value="Apr 7, 2025" readOnly />
        </div>
        <div style={{ marginTop: 12, padding: 12, border: '1px solid var(--hp-border)', borderRadius: 10, background: 'var(--hp-surface)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 11, textAlign: 'center', color: 'var(--hp-textMuted)', marginBottom: 6 }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 12, textAlign: 'center' }}>
            {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
              <span key={d} style={{
                padding: '6px 0', borderRadius: 6,
                background: d >= 1 && d <= 7 ? 'var(--hp-primary)' : 'transparent',
                color: d >= 1 && d <= 7 ? '#fff' : 'var(--hp-text)',
                fontWeight: d === 1 || d === 7 ? 700 : 400,
              }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'inline') {
    return (
      <div className="cv-block" style={{ padding: 16, background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--hp-text)' }}>Schedule for</span>
        <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontSize: 13, color: 'var(--hp-text)' }}>📅 Apr 7, 2025</button>
        <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: 13, fontWeight: 600 }}>Apply</button>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)', maxWidth: 320 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hp-text)', marginBottom: 8 }}>Select date</label>
      <input style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: 13, marginBottom: 10 }} value="April 7, 2025" readOnly />
      <div style={{ padding: 12, border: '1px solid var(--hp-border)', borderRadius: 10, background: 'var(--hp-surface)' }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 13, color: 'var(--hp-text)', marginBottom: 10 }}>April 2025</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 12, textAlign: 'center' }}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
            <span key={d} style={{ padding: '6px 0', borderRadius: 6, background: d === 7 ? 'var(--hp-primary)' : 'transparent', color: d === 7 ? '#fff' : 'var(--hp-text)', fontWeight: d === 7 ? 700 : 400 }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PrimitiveCommandMenuBlock({ variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid var(--hp-border)', borderRadius: 10, background: 'var(--hp-surface)' }}>
          <span style={{ color: 'var(--hp-textMuted)', fontSize: 13 }}>⌘K</span>
          <span style={{ color: 'var(--hp-textMuted)', fontSize: 13 }}>Search commands…</span>
        </div>
      </div>
    )
  }
  if (variant === 'grouped') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
        <div style={{ border: '1px solid var(--hp-border)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', maxWidth: 400 }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--hp-border)', fontSize: 13, color: 'var(--hp-textMuted)' }}>⌘ Search anything…</div>
          {['Actions', 'Navigation'].map((group) => (
            <div key={group}>
              <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', background: 'var(--hp-surface)' }}>{group}</div>
              {COMMAND_ITEMS.slice(0, 2).map((item) => (
                <div key={item.label} style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--hp-text)', background: 'var(--hp-background)' }}>
                  <span>{item.icon}</span><span style={{ flex: 1 }}>{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
      <div style={{ border: '1px solid var(--hp-border)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', maxWidth: 400 }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--hp-border)', fontSize: 13, color: 'var(--hp-textMuted)' }}>⌘ Type a command or search…</div>
        {COMMAND_ITEMS.map((item, i) => (
          <div key={item.label} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, background: i === 0 ? 'var(--hp-surface)' : 'var(--hp-background)', borderLeft: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent' }}>
            <span style={{ width: 24, textAlign: 'center' }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: 'var(--hp-text)' }}>{item.label}</span>
            <span style={{ fontSize: 11, color: 'var(--hp-textMuted)' }}>{item.hint}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PrimitiveChartBlock({ variant = 'donut' }) {
  if (variant === 'radial') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)', display: 'flex', alignItems: 'center', gap: 24 }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--hp-border)" strokeWidth="10" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--hp-primary)" strokeWidth="10" strokeDasharray="188 251" strokeLinecap="round" transform="rotate(-90 50 50)" />
        </svg>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--hp-text)' }}>75%</div>
          <div style={{ fontSize: 13, color: 'var(--hp-textMuted)' }}>Goal completion</div>
        </div>
      </div>
    )
  }
  if (variant === 'bar-horizontal') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--hp-text)', marginBottom: 14 }}>Traffic sources</div>
        {[['Direct', 42], ['Organic', 28], ['Referral', 18], ['Social', 12]].map(([label, pct]) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--hp-textMuted)', marginBottom: 4 }}>
              <span>{label}</span><span>{pct}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--hp-surface)' }}>
              <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: 'var(--hp-primary)' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)', display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--hp-primary)" strokeWidth="20" strokeDasharray="157 157" transform="rotate(-90 60 60)" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--hp-secondary)" strokeWidth="20" strokeDasharray="94 314" strokeDashoffset="-157" transform="rotate(-90 60 60)" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--hp-accent)" strokeWidth="20" strokeDasharray="63 314" strokeDashoffset="-251" transform="rotate(-90 60 60)" />
      </svg>
      <div style={{ fontSize: 12, color: 'var(--hp-textMuted)', lineHeight: 1.8 }}>
        <div><span style={{ color: 'var(--hp-primary)', fontWeight: 700 }}>●</span> Direct 50%</div>
        <div><span style={{ color: 'var(--hp-secondary)', fontWeight: 700 }}>●</span> Organic 30%</div>
        <div><span style={{ color: 'var(--hp-accent)', fontWeight: 700 }}>●</span> Referral 20%</div>
      </div>
    </div>
  )
}

export function PrimitiveIconGridBlock({ variant = 'outline' }) {
  const icons = ['⊞', '◈', 'Aa', '⚙', '🔍', '🔔', '👤', '🏠', '📊', '✦']
  return (
    <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', marginBottom: 12 }}>Icon set · Lucide</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {icons.map((icon) => (
          <div key={icon} style={{
            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 10, fontSize: '1.125rem',
            background: variant === 'filled' ? 'var(--hp-primary)' : 'var(--hp-surface)',
            color: variant === 'filled' ? '#fff' : 'var(--hp-text)',
            border: variant === 'filled' ? 'none' : '1px solid var(--hp-border)',
          }}>{icon}</div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--hp-textMuted)' }}>{LUCIDE_ICONS.slice(0, 5).join(', ')}… +1,400 icons</div>
    </div>
  )
}

export function PrimitiveLoaderBlock({ variant = 'spinner' }) {
  if (variant === 'skeleton') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <div className="cv-skeleton-pulse" style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--hp-surface)' }} />
          <div style={{ flex: 1 }}>
            <div className="cv-skeleton-pulse" style={{ height: 12, borderRadius: 6, background: 'var(--hp-surface)', marginBottom: 8, width: '60%' }} />
            <div className="cv-skeleton-pulse" style={{ height: 10, borderRadius: 6, background: 'var(--hp-surface)', width: '40%' }} />
          </div>
        </div>
        <div className="cv-skeleton-pulse" style={{ height: 80, borderRadius: 8, background: 'var(--hp-surface)', marginBottom: 8 }} />
        <div className="cv-skeleton-pulse" style={{ height: 12, borderRadius: 6, background: 'var(--hp-surface)', width: '75%' }} />
      </div>
    )
  }
  if (variant === 'shimmer') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="cv-shimmer-bar" style={{ height: 14, borderRadius: 6, marginBottom: 10, background: 'linear-gradient(90deg, var(--hp-surface) 25%, var(--hp-border) 50%, var(--hp-surface) 75%)', backgroundSize: '200% 100%', animation: 'cv-shimmer 1.4s ease infinite' }} />
        ))}
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 32, background: 'var(--hp-background)', textAlign: 'center' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid var(--hp-border)', borderTopColor: 'var(--hp-primary)', margin: '0 auto 12px', animation: 'cv-spin 0.8s linear infinite' }} />
      <div style={{ fontSize: 13, color: 'var(--hp-textMuted)' }}>Loading…</div>
    </div>
  )
}
