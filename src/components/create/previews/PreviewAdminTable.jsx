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

const ROWS = [
  { checked: true,  name: 'Alice Martin', email: 'alice@co.com',  role: 'Admin',  status: 'Active',   joined: 'Jan 12, 2024', dept: 'Engineering' },
  { checked: false, name: 'Bob Kumar',    email: 'bob@co.com',    role: 'Editor', status: 'Active',   joined: 'Feb 3, 2024',  dept: 'Design' },
  { checked: false, name: 'Carol Li',     email: 'carol@co.com',  role: 'Viewer', status: 'Inactive', joined: 'Mar 8, 2024',  dept: 'Marketing' },
  { checked: true,  name: 'Dave Osei',   email: 'dave@co.com',   role: 'Editor', status: 'Active',   joined: 'Apr 22, 2024', dept: 'Product' },
  { checked: false, name: 'Emma Hall',   email: 'emma@co.com',   role: 'Viewer', status: 'Pending',  joined: 'May 1, 2024',  dept: 'Sales' },
]

function statusStyle(status) {
  if (status === 'Active') return { background: 'rgba(16,185,129,0.12)', color: 'var(--hp-success)', border: '1px solid rgba(16,185,129,0.2)' }
  if (status === 'Pending') return { background: 'rgba(245,158,11,0.12)', color: 'var(--hp-warning)', border: '1px solid rgba(245,158,11,0.2)' }
  return { background: 'var(--hp-surface)', color: 'var(--hp-textMuted)', border: '1px solid var(--hp-border)' }
}

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 10, color: '#fff', flexShrink: 0 }}>{initials}</div>
  )
}

function AdminToolbar({ variant }) {
  if (variant === 'search-filters') {
    return (
      <div style={{ padding: '16px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 17, color: 'var(--hp-text)', margin: '0 0 2px' }}>Users</h2>
          <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>24 total members</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-text)', width: 180, outline: 'none' }} placeholder="Search users..." readOnly />
          <select style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-text)', outline: 'none' }}>
            <option>All roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
          <select style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-text)', outline: 'none' }}>
            <option>All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
          <button style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Invite</button>
        </div>
      </div>
    )
  }

  // bulk-actions
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 17, color: 'var(--hp-text)', margin: '0 0 2px' }}>Users</h2>
          <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>24 total · 2 selected</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-text)', width: 160, outline: 'none' }} placeholder="Search..." readOnly />
          <button style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Invite</button>
        </div>
      </div>
      <div style={{ padding: '8px 12px', background: 'var(--hp-background)', border: '1px solid var(--hp-border)', borderRadius: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="checkbox" readOnly defaultChecked style={{ cursor: 'pointer' }} />
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>2 selected</span>
        <span style={{ color: 'var(--hp-border)', margin: '0 4px' }}>|</span>
        <button style={{ padding: '4px 10px', borderRadius: 5, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 11, cursor: 'pointer' }}>Change role</button>
        <button style={{ padding: '4px 10px', borderRadius: 5, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 11, cursor: 'pointer' }}>Deactivate</button>
        <button style={{ padding: '4px 10px', borderRadius: 5, background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', fontFamily: 'var(--hp-body-font)', fontSize: 11, cursor: 'pointer' }}>Remove</button>
      </div>
    </div>
  )
}

function AdminTable({ variant }) {
  if (variant === 'full-data') {
    return (
      <div style={{ padding: '0 24px 16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--hp-body-font)', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', width: 32 }}><input type="checkbox" readOnly /></th>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Name</th>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</th>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Role</th>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dept</th>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</th>
              <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Joined</th>
              <th style={{ padding: '10px 8px', width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--hp-border)', background: row.checked ? 'rgba(var(--hp-primary-rgb, 124,58,237), 0.04)' : 'transparent' }}>
                <td style={{ padding: '10px 8px' }}><input type="checkbox" readOnly defaultChecked={row.checked} /></td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={row.name} />
                    <span style={{ fontWeight: 600, color: 'var(--hp-text)' }}>{row.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 8px', color: 'var(--hp-textMuted)', fontSize: 12 }}>{row.email}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-text)' }}>{row.role}</span>
                </td>
                <td style={{ padding: '10px 8px', color: 'var(--hp-textMuted)', fontSize: 12 }}>{row.dept}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--hp-body-font)', fontSize: 11, ...statusStyle(row.status) }}>{row.status}</span>
                </td>
                <td style={{ padding: '10px 8px', color: 'var(--hp-textMuted)', fontSize: 11 }}>{row.joined}</td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ padding: '3px 8px', borderRadius: 4, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                    <button style={{ padding: '3px 7px', borderRadius: 4, background: 'transparent', color: 'var(--hp-textMuted)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 11, cursor: 'pointer' }}>...</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div style={{ padding: '0 24px 16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--hp-body-font)', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
              {['', 'Name', 'Role', 'Status', 'Joined', ''].map((h, i) => (
                <th key={i} style={{ padding: '7px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--hp-textMuted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--hp-border)' }}>
                <td style={{ padding: '6px 8px' }}><input type="checkbox" readOnly defaultChecked={row.checked} /></td>
                <td style={{ padding: '6px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Avatar name={row.name} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--hp-text)', fontSize: 12 }}>{row.name}</div>
                      <div style={{ color: 'var(--hp-textMuted)', fontSize: 10 }}>{row.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '6px 8px', color: 'var(--hp-textMuted)', fontSize: 11 }}>{row.role}</td>
                <td style={{ padding: '6px 8px' }}>
                  <span style={{ padding: '2px 7px', borderRadius: 4, fontFamily: 'var(--hp-body-font)', fontSize: 10, ...statusStyle(row.status) }}>{row.status}</span>
                </td>
                <td style={{ padding: '6px 8px', color: 'var(--hp-textMuted)', fontSize: 10 }}>{row.joined}</td>
                <td style={{ padding: '6px 8px' }}>
                  <button style={{ padding: '2px 6px', borderRadius: 4, background: 'transparent', color: 'var(--hp-textMuted)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 10, cursor: 'pointer' }}>...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // card-view
  return (
    <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {ROWS.map((row, i) => (
        <div key={i} style={{ background: 'var(--hp-surface)', borderRadius: 10, border: row.checked ? '1.5px solid var(--hp-primary)' : '1px solid var(--hp-border)', padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={row.name} />
              <div>
                <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 600, fontSize: 13, color: 'var(--hp-text)' }}>{row.name}</div>
                <div style={{ fontFamily: 'var(--hp-body-font)', fontSize: 11, color: 'var(--hp-textMuted)' }}>{row.email}</div>
              </div>
            </div>
            <span style={{ padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--hp-body-font)', fontSize: 10, ...statusStyle(row.status) }}>{row.status}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--hp-background)', border: '1px solid var(--hp-border)', fontSize: 10, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>{row.role}</span>
              <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--hp-background)', border: '1px solid var(--hp-border)', fontSize: 10, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>{row.dept}</span>
            </div>
            <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 10, color: 'var(--hp-textMuted)' }}>{row.joined}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function AdminPagination({ variant }) {
  if (variant === 'simple') {
    return (
      <div style={{ padding: '12px 24px', borderTop: '1px solid var(--hp-border)', background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Showing 5 of 24 users</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ padding: '5px 12px', borderRadius: 6, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer' }}>Previous</button>
          <button style={{ padding: '5px 12px', borderRadius: 6, background: 'var(--hp-primary)', color: '#fff', border: 'none', fontFamily: 'var(--hp-body-font)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Next</button>
        </div>
      </div>
    )
  }

  // page-selector
  return (
    <div style={{ padding: '12px 24px', borderTop: '1px solid var(--hp-border)', background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Showing 1–5 of 24 users</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <button style={{ width: 28, height: 28, borderRadius: 5, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        {[1, 2, 3, '...', 5].map((pg, i) => (
          <button key={i} style={{ width: 28, height: 28, borderRadius: 5, background: pg === 1 ? 'var(--hp-primary)' : 'transparent', color: pg === 1 ? '#fff' : 'var(--hp-text)', border: pg === 1 ? 'none' : '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pg}</button>
        ))}
        <button style={{ width: 28, height: 28, borderRadius: 5, background: 'transparent', color: 'var(--hp-text)', border: '1px solid var(--hp-border)', fontFamily: 'var(--hp-body-font)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-textMuted)' }}>Rows:</span>
        <select style={{ padding: '3px 8px', borderRadius: 5, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font)', fontSize: 12, color: 'var(--hp-text)', outline: 'none' }}>
          <option>5</option>
          <option>10</option>
          <option>25</option>
        </select>
      </div>
    </div>
  )
}

export default function PreviewAdminTable({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const defaults = getDefaultSections('admin')
  const config = { ...defaults, ...sectionConfig }
  const sections = getPreviewSections('admin')

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
      <nav style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--hp-heading-font)', fontWeight: 800, fontSize: 15, color: 'var(--hp-text)' }}>Admin</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Dashboard', 'Users', 'Roles', 'Audit Log'].map((lnk, i) => (
            <a key={lnk} style={{ fontSize: 12, color: i === 1 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', cursor: 'pointer', fontFamily: 'var(--hp-body-font)', textDecoration: 'none', fontWeight: i === 1 ? 600 : 400 }}>{lnk}</a>
          ))}
        </div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hp-heading-font)', fontWeight: 700, fontSize: 11, color: '#fff' }}>AK</div>
      </nav>
      {wrap('toolbar', <AdminToolbar variant={config.toolbar} />)}
      {wrap('table', <AdminTable variant={config.table} />)}
      {wrap('pagination', <AdminPagination variant={config.pagination} />)}
    </div>
  )
}
