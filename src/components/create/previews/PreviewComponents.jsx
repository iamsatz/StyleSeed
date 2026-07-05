import React, { useRef, useEffect } from 'react'
import { normalizeTypography } from '../../../lib/typographyRoles'

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => {
    if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role])
  })
  if (kit.typography) {
    const typography = normalizeTypography(kit.typography)
    el.style.setProperty('--hp-display-font', `'${typography.displayFont}', sans-serif`)
    el.style.setProperty('--hp-heading-font', `'${typography.headingFont}', sans-serif`)
    el.style.setProperty('--hp-body-font', `'${typography.bodyFont}', sans-serif`)
    el.style.setProperty('--hp-ui-font', `'${typography.uiFont || typography.bodyFont}', sans-serif`)
    el.style.setProperty('--hp-mono-font', `'${typography.monoFont}', monospace`)
  }
}

const TABLE_ROWS = [
  ['Alice Martin', 'alice@acme.io', 'Admin', 'Active'],
  ['Bob Keller', 'bob@acme.io', 'Editor', 'Active'],
  ['Carol Lopez', 'carol@acme.io', 'Viewer', 'Pending'],
  ['David Singh', 'david@acme.io', 'Editor', 'Inactive'],
]

const FAQ_ITEMS = [
  { q: 'Can I change my plan later?', a: '', open: false },
  { q: 'How does billing work?', a: 'Plans are billed monthly or yearly. You can switch cycles anytime and we prorate the difference automatically.', open: true },
  { q: 'Do you offer refunds?', a: '', open: false },
]

export default function PreviewComponents({ kit }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    applyKit(ref.current, kit)
  }, [kit])

  if (!kit) return null

  return (
    <div className="lp-components" ref={ref}>
      {/* ============ Existing sections ============ */}
      <div className="lp-comp-section">
        <div className="lp-comp-label">Auth Form</div>
        <div className="lp-auth-card">
          <div className="lp-auth-logo">◈ Acme</div>
          <div className="lp-auth-title">Create an account</div>
          <div className="lp-auth-sub">Sign up to get started today</div>
          <div className="lp-field">
            <label className="lp-label">Email</label>
            <input className="lp-input" type="email" placeholder="you@example.com" readOnly />
          </div>
          <div className="lp-field">
            <label className="lp-label">Password</label>
            <input className="lp-input" type="password" placeholder="••••••••" readOnly />
          </div>
          <button className="lp-btn lp-btn--primary lp-btn--full">Create account</button>
          <button className="lp-btn lp-btn--ghost lp-btn--full">Continue with GitHub</button>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Buttons</div>
        <div className="lp-btn-row">
          <button className="lp-btn lp-btn--primary">Primary</button>
          <button className="lp-btn lp-btn--secondary">Secondary</button>
          <button className="lp-btn lp-btn--ghost">Ghost</button>
        </div>
        <div className="lp-comp-label" style={{ marginTop: 16 }}>Badges</div>
        <div className="lp-badge-row">
          <span className="lp-badge lp-badge--primary">Primary</span>
          <span className="lp-badge lp-badge--secondary">Secondary</span>
          <span className="lp-badge lp-badge--success">Success</span>
          <span className="lp-badge lp-badge--warning">Warning</span>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Stat Cards</div>
        <div className="lp-stats">
          <div className="lp-stat lp-stat--primary">
            <div className="lp-stat-label">Revenue</div>
            <div className="lp-stat-value">$48,295</div>
            <div className="lp-stat-trend">↑ +12.4%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Users</div>
            <div className="lp-stat-value">8,431</div>
            <div className="lp-stat-trend">↑ +5.2%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Conversion</div>
            <div className="lp-stat-value">3.68%</div>
            <div className="lp-stat-trend lp-stat-trend--down">↓ −0.8%</div>
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Card</div>
        <div className="lp-card">
          <div className="lp-card-header">
            <span className="lp-card-title">Card Title</span>
            <span className="lp-badge lp-badge--primary">New</span>
          </div>
          <div className="lp-card-body">
            Cards use surface color and border tokens from the kit for consistent theming.
          </div>
          <div className="lp-card-footer">
            <button className="lp-btn lp-btn--ghost lp-btn--sm">Cancel</button>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Confirm</button>
          </div>
        </div>
      </div>

      {/* ============ New sections ============ */}
      <div className="lp-comp-section">
        <div className="lp-comp-label">Form Controls</div>
        <div className="lp-ui-form-grid">
          <div className="lp-field">
            <label className="lp-label">Text input</label>
            <input className="lp-input" type="text" placeholder="Your name" readOnly />
          </div>
          <div className="lp-field">
            <label className="lp-label">Select</label>
            <div className="lp-ui-select">
              <span>Design Engineer</span>
              <span className="lp-ui-select-chevron">▾</span>
            </div>
          </div>
          <div className="lp-field lp-ui-form-full">
            <label className="lp-label">Textarea</label>
            <div className="lp-ui-textarea">Tell us a bit about your project…</div>
          </div>
        </div>
        <div className="lp-ui-control-row">
          <label className="lp-ui-check">
            <span className="lp-ui-checkbox lp-ui-checkbox--checked">✓</span>
            Email updates
          </label>
          <label className="lp-ui-check">
            <span className="lp-ui-checkbox" />
            SMS alerts
          </label>
          <label className="lp-ui-check">
            <span className="lp-ui-radio lp-ui-radio--checked" />
            Monthly
          </label>
          <label className="lp-ui-check">
            <span className="lp-ui-radio" />
            Yearly
          </label>
          <span className="lp-ui-switch lp-ui-switch--on"><span className="lp-ui-switch-knob" /></span>
          <span className="lp-ui-switch"><span className="lp-ui-switch-knob" /></span>
        </div>
        <div className="lp-ui-slider">
          <div className="lp-ui-slider-track"><div className="lp-ui-slider-fill" /></div>
          <div className="lp-ui-slider-thumb" />
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Tabs &amp; Segmented Control</div>
        <div className="lp-ui-tabs">
          {['Overview', 'Analytics', 'Reports', 'Settings'].map((tab, i) => (
            <span key={tab} className={`lp-ui-tab${i === 0 ? ' lp-ui-tab--active' : ''}`}>{tab}</span>
          ))}
        </div>
        <div className="lp-ui-segmented">
          {['Day', 'Week', 'Month', 'Year'].map((seg, i) => (
            <span key={seg} className={`lp-ui-segment${i === 1 ? ' lp-ui-segment--active' : ''}`}>{seg}</span>
          ))}
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Alerts</div>
        <div className="lp-ui-alerts">
          <div className="lp-ui-alert lp-ui-alert--info">
            <span className="lp-ui-alert-icon">ℹ</span>
            <span>A new version is available. Refresh to update.</span>
            <span className="lp-ui-alert-close">✕</span>
          </div>
          <div className="lp-ui-alert lp-ui-alert--success">
            <span className="lp-ui-alert-icon">✓</span>
            <span>Your changes have been saved successfully.</span>
            <span className="lp-ui-alert-close">✕</span>
          </div>
          <div className="lp-ui-alert lp-ui-alert--warning">
            <span className="lp-ui-alert-icon">⚠</span>
            <span>Your trial ends in 3 days. Add billing to continue.</span>
            <span className="lp-ui-alert-close">✕</span>
          </div>
          <div className="lp-ui-alert lp-ui-alert--error">
            <span className="lp-ui-alert-icon">✕</span>
            <span>Payment failed. Please check your card details.</span>
            <span className="lp-ui-alert-close">✕</span>
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Table</div>
        <div className="lp-ui-table-card">
          <table className="lp-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(([name, email, role, status]) => (
                <tr key={email}>
                  <td className="lp-ui-td-strong">{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>
                    <span className={`lp-ui-status lp-ui-status--${status.toLowerCase()}`}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Navigation</div>
        <div className="lp-ui-breadcrumbs">
          <span className="lp-ui-crumb-link">Home</span>
          <span className="lp-ui-crumb-sep">/</span>
          <span className="lp-ui-crumb-link">Projects</span>
          <span className="lp-ui-crumb-sep">/</span>
          <span className="lp-ui-crumb-current">Brand Kit</span>
        </div>
        <div className="lp-ui-pagination">
          <span className="lp-ui-page-btn">←</span>
          <span className="lp-ui-page-btn lp-ui-page-btn--active">1</span>
          <span className="lp-ui-page-btn">2</span>
          <span className="lp-ui-page-btn">3</span>
          <span className="lp-ui-page-ellipsis">…</span>
          <span className="lp-ui-page-btn">12</span>
          <span className="lp-ui-page-btn">→</span>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Avatars &amp; Tooltip</div>
        <div className="lp-ui-avatar-row">
          <span className="lp-ui-avatar">AM</span>
          <span className="lp-ui-avatar lp-ui-avatar--secondary">BK</span>
          <div className="lp-ui-avatar-stack">
            <span className="lp-ui-avatar lp-ui-avatar--sm">AM</span>
            <span className="lp-ui-avatar lp-ui-avatar--sm lp-ui-avatar--secondary">BK</span>
            <span className="lp-ui-avatar lp-ui-avatar--sm lp-ui-avatar--muted">CL</span>
            <span className="lp-ui-avatar lp-ui-avatar--sm lp-ui-avatar--count">+5</span>
          </div>
          <div className="lp-ui-tooltip-demo">
            <div className="lp-ui-tooltip">Copy to clipboard<span className="lp-ui-tooltip-arrow" /></div>
            <button className="lp-btn lp-btn--ghost lp-btn--sm">Hover me</button>
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Progress &amp; Loading</div>
        <div className="lp-ui-progress-wrap">
          <div className="lp-ui-progress-head">
            <span>Uploading assets…</span>
            <span className="lp-ui-progress-pct">65%</span>
          </div>
          <div className="lp-ui-progress"><div className="lp-ui-progress-fill" style={{ width: '65%' }} /></div>
        </div>
        <div className="lp-ui-loading-row">
          <div className="lp-ui-skeleton-group">
            <span className="lp-ui-skeleton lp-ui-skeleton--circle" />
            <div className="lp-ui-skeleton-lines">
              <span className="lp-ui-skeleton" style={{ width: '70%' }} />
              <span className="lp-ui-skeleton" style={{ width: '45%' }} />
            </div>
          </div>
          <span className="lp-ui-spinner" />
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Dropdown Menu</div>
        <div className="lp-ui-dropdown">
          <div className="lp-ui-dropdown-item">
            <span className="lp-ui-dropdown-icon">✎</span> Edit kit
          </div>
          <div className="lp-ui-dropdown-item lp-ui-dropdown-item--hover">
            <span className="lp-ui-dropdown-icon">⧉</span> Duplicate
            <span className="lp-ui-dropdown-kbd">⌘D</span>
          </div>
          <div className="lp-ui-dropdown-item">
            <span className="lp-ui-dropdown-icon">↗</span> Share…
          </div>
          <div className="lp-ui-dropdown-sep" />
          <div className="lp-ui-dropdown-item lp-ui-dropdown-item--danger">
            <span className="lp-ui-dropdown-icon">🗑</span> Delete kit
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Dialog</div>
        <div className="lp-ui-dialog-backdrop">
          <div className="lp-ui-dialog">
            <div className="lp-ui-dialog-title">Delete this kit?</div>
            <div className="lp-ui-dialog-body">
              This will permanently remove “Brand Kit” and all its exports. This action cannot be undone.
            </div>
            <div className="lp-ui-dialog-actions">
              <button className="lp-btn lp-btn--ghost lp-btn--sm">Cancel</button>
              <button className="lp-btn lp-btn--primary lp-btn--sm">Delete kit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Toasts</div>
        <div className="lp-ui-toasts">
          <div className="lp-ui-toast">
            <span className="lp-ui-toast-icon lp-ui-toast-icon--success">✓</span>
            <div className="lp-ui-toast-text">
              <span className="lp-ui-toast-title">Kit exported</span>
              <span className="lp-ui-toast-sub">tokens.json copied to clipboard</span>
            </div>
            <span className="lp-ui-toast-close">✕</span>
          </div>
          <div className="lp-ui-toast">
            <span className="lp-ui-toast-icon">↑</span>
            <div className="lp-ui-toast-text">
              <span className="lp-ui-toast-title">Syncing changes</span>
              <span className="lp-ui-toast-sub">Last saved 2 minutes ago</span>
            </div>
            <span className="lp-ui-toast-close">✕</span>
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Accordion</div>
        <div className="lp-ui-accordion">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className={`lp-ui-accordion-item${item.open ? ' lp-ui-accordion-item--open' : ''}`}>
              <div className="lp-ui-accordion-head">
                <span>{item.q}</span>
                <span className="lp-ui-accordion-chevron">{item.open ? '−' : '+'}</span>
              </div>
              {item.open && <div className="lp-ui-accordion-body">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Code Block</div>
        <div className="lp-ui-code">
          <div className="lp-ui-code-head">
            <span className="lp-ui-code-file">theme.css</span>
            <span className="lp-ui-code-copy">Copy</span>
          </div>
          <pre className="lp-ui-code-body">{`:root {
  --primary: `}<span className="lp-ui-code-accent">{kit.palette.light.primary}</span>{`;
  --background: ${kit.palette.light.background || '#ffffff'};
  --radius: 8px;
}`}</pre>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Empty State &amp; Tags</div>
        <div className="lp-ui-empty">
          <span className="lp-ui-empty-icon">◫</span>
          <span className="lp-ui-empty-title">No projects yet</span>
          <span className="lp-ui-empty-sub">Create your first project to get started.</span>
          <button className="lp-btn lp-btn--primary lp-btn--sm">New project</button>
        </div>
        <div className="lp-ui-tags">
          {['branding', 'web design', 'mobile'].map((tag) => (
            <span key={tag} className="lp-ui-tag">{tag}<span className="lp-ui-tag-x">✕</span></span>
          ))}
          <span className="lp-ui-tag lp-ui-tag--add">+ Add tag</span>
        </div>
      </div>
    </div>
  )
}
