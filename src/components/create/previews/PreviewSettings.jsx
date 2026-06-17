import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const DEFAULT_SECTIONS = getDefaultSections('settings')
const SECTION_OPTIONS = getPreviewSections('settings')

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

const S = {
  page: { fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background, #fff)', minHeight: '100vh' },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 5, fontFamily: 'var(--hp-body-font, sans-serif)' },
  input: { display: 'block', width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--hp-border, #d1d5db)', background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-text, #111827)', fontSize: 13, boxSizing: 'border-box', fontFamily: 'var(--hp-body-font, sans-serif)', outline: 'none' },
  btnPrimary: { padding: '8px 18px', borderRadius: 8, border: 'none', background: 'var(--hp-primary, #6366f1)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnGhost: { padding: '8px 18px', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)', background: 'transparent', color: 'var(--hp-text, #111827)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnDanger: { padding: '7px 14px', borderRadius: 8, border: '1px solid var(--hp-warning, #ef4444)', background: 'transparent', color: 'var(--hp-warning, #ef4444)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--hp-textMuted, #9ca3af)', marginBottom: 12, fontFamily: 'var(--hp-body-font, sans-serif)' },
  field: { marginBottom: 14 },
  muted: { fontSize: 12, color: 'var(--hp-textMuted, #6b7280)', fontFamily: 'var(--hp-body-font, sans-serif)' },
}

function Toggle({ on }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? 'var(--hp-primary, #6366f1)' : 'var(--hp-border, #d1d5db)', position: 'relative', flexShrink: 0, cursor: 'pointer' }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.15s' }} />
    </div>
  )
}

function Avatar({ initials, size = 52 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--hp-primary, #6366f1)', color: '#fff', fontSize: size * 0.3, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--hp-heading-font, sans-serif)' }}>{initials}</div>
  )
}

function SectionProfile() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={S.sectionLabel}>Public profile</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <Avatar initials="JD" />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 4 }}>Jane Doe</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={S.btnGhost}>Upload photo</button>
              <button style={S.btnDanger}>Remove</button>
            </div>
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Display name</label>
          <input style={{ ...S.input, maxWidth: 280 }} placeholder="Jane Doe" readOnly />
        </div>
        <div style={S.field}>
          <label style={S.label}>Username</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, maxWidth: 280 }}>
            <span style={{ padding: '8px 10px', borderRadius: '8px 0 0 8px', border: '1px solid var(--hp-border, #d1d5db)', borderRight: 'none', background: 'var(--hp-surface, #f9fafb)', fontSize: 13, color: 'var(--hp-textMuted, #9ca3af)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>acme.io/</span>
            <input style={{ ...S.input, borderRadius: '0 8px 8px 0', flex: 1 }} placeholder="janedoe" readOnly />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Bio</label>
          <textarea style={{ ...S.input, height: 68, resize: 'none' }} placeholder="A short bio about yourself…" readOnly />
        </div>
        <div style={S.field}>
          <label style={S.label}>Website</label>
          <input style={{ ...S.input, maxWidth: 280 }} placeholder="https://janedoe.com" readOnly />
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--hp-border, #e5e7eb)', paddingTop: 16, marginBottom: 20 }}>
        <div style={S.sectionLabel}>Contact info</div>
        <div style={S.field}>
          <label style={S.label}>Email address</label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input style={{ ...S.input, maxWidth: 240 }} type="email" placeholder="jane@example.com" readOnly />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--hp-success, #059669)', background: 'rgba(5,150,105,0.1)', padding: '3px 10px', borderRadius: 20, fontFamily: 'var(--hp-body-font, sans-serif)', whiteSpace: 'nowrap' }}>Verified</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(239,68,68,0.2)', paddingTop: 16 }}>
        <div style={{ ...S.sectionLabel, color: 'var(--hp-warning, #ef4444)' }}>Danger zone</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, background: 'rgba(239,68,68,0.03)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 2 }}>Delete account</div>
            <div style={S.muted}>Permanently remove your account and all data.</div>
          </div>
          <button style={S.btnDanger}>Delete</button>
        </div>
      </div>
      <div style={{ paddingTop: 20, display: 'flex', gap: 10 }}>
        <button style={S.btnPrimary}>Save changes</button>
        <button style={S.btnGhost}>Cancel</button>
      </div>
    </div>
  )
}

function SectionAccount() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={S.sectionLabel}>Plan & billing</div>
        <div style={{ border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 12, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', marginBottom: 2 }}>Pro Plan</div>
              <div style={S.muted}>$29/month · Renews Jan 15, 2027</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--hp-primary, #6366f1)', background: 'rgba(99,102,241,0.1)', padding: '3px 10px', borderRadius: 20, fontFamily: 'var(--hp-body-font, sans-serif)' }}>Active</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={S.btnPrimary}>Upgrade</button>
            <button style={S.btnGhost}>Manage billing</button>
          </div>
        </div>
        <div style={{ ...S.field }}>
          <label style={S.label}>Payment method</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, background: 'var(--hp-surface, #f9fafb)', maxWidth: 280 }}>
            <span style={{ fontSize: 18 }}>💳</span>
            <span style={{ fontSize: 13, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>Visa ending in 4242</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--hp-border, #e5e7eb)', paddingTop: 18, marginBottom: 20 }}>
        <div style={S.sectionLabel}>Security</div>
        <div style={S.field}>
          <label style={S.label}>Current password</label>
          <input style={{ ...S.input, maxWidth: 280 }} type="password" placeholder="••••••••" readOnly />
        </div>
        <div style={S.field}>
          <label style={S.label}>New password</label>
          <input style={{ ...S.input, maxWidth: 280 }} type="password" placeholder="••••••••" readOnly />
        </div>
        <div style={S.field}>
          <label style={S.label}>Confirm new password</label>
          <input style={{ ...S.input, maxWidth: 280 }} type="password" placeholder="••••••••" readOnly />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 10, background: 'var(--hp-surface, #f9fafb)', maxWidth: 420 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 2 }}>Two-factor authentication</div>
            <div style={S.muted}>Add an extra layer of security to your account.</div>
          </div>
          <Toggle on={false} />
        </div>
      </div>
      <div style={{ paddingTop: 4, display: 'flex', gap: 10 }}>
        <button style={S.btnPrimary}>Save changes</button>
        <button style={S.btnGhost}>Cancel</button>
      </div>
    </div>
  )
}

function SectionNotifications() {
  const groups = [
    {
      label: 'Activity', items: [
        { title: 'Comments and mentions', desc: 'When someone mentions you or replies to your comment', on: true },
        { title: 'Project updates', desc: 'When a project you collaborate on is updated', on: true },
        { title: 'New followers', desc: 'When someone starts following your profile', on: false },
      ]
    },
    {
      label: 'Email digest', items: [
        { title: 'Weekly summary', desc: 'A weekly recap of your activity and highlights', on: true },
        { title: 'Product news', desc: 'Tips, new features, and platform updates', on: false },
        { title: 'Marketing emails', desc: 'Promotions, offers, and events', on: false },
      ]
    },
    {
      label: 'Push notifications', items: [
        { title: 'Browser notifications', desc: 'Show desktop notifications for new activity', on: true },
        { title: 'Mobile push', desc: 'Receive push notifications on your mobile device', on: false },
      ]
    },
  ]

  return (
    <div>
      {groups.map((group, gi) => (
        <div key={group.label} style={{ marginBottom: gi < groups.length - 1 ? 24 : 0 }}>
          <div style={{ ...S.sectionLabel, ...(gi > 0 ? { borderTop: '1px solid var(--hp-border, #e5e7eb)', paddingTop: 16 } : {}) }}>{group.label}</div>
          {group.items.map((item) => (
            <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--hp-border, #f3f4f6)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-body-font, sans-serif)', marginBottom: 2 }}>{item.title}</div>
                <div style={S.muted}>{item.desc}</div>
              </div>
              <Toggle on={item.on} />
            </div>
          ))}
        </div>
      ))}
      <div style={{ paddingTop: 20, display: 'flex', gap: 10 }}>
        <button style={S.btnPrimary}>Save preferences</button>
        <button style={S.btnGhost}>Reset to defaults</button>
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  { key: 'account', group: 'Account', items: ['Profile', 'Account', 'Notifications'] },
  { key: 'workspace', group: 'Workspace', items: ['Security', 'Billing', 'Integrations', 'Team Members'] },
]

const TOP_TABS = ['Profile', 'Account', 'Notifications', 'Security', 'Billing', 'Integrations']

function SettingsContent({ section }) {
  if (section === 'account') return <SectionAccount />
  if (section === 'notifications') return <SectionNotifications />
  return <SectionProfile />
}

function LayoutSidebarTabs({ section }) {
  const activeLabel = section === 'account' ? 'Account' : section === 'notifications' ? 'Notifications' : 'Profile'
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <aside style={{ borderRight: '1px solid var(--hp-border, #e5e7eb)', padding: '24px 0', background: 'var(--hp-surface, #f9fafb)' }}>
        {NAV_ITEMS.map(({ key, group, items }) => (
          <div key={key} style={{ marginBottom: 20 }}>
            <div style={{ ...S.sectionLabel, padding: '0 16px' }}>{group}</div>
            {items.map((item) => (
              <a key={item} style={{ display: 'block', padding: '8px 16px', fontSize: 14, fontWeight: item === activeLabel ? 600 : 400, color: item === activeLabel ? 'var(--hp-primary, #6366f1)' : 'var(--hp-text, #111827)', background: item === activeLabel ? 'rgba(99,102,241,0.08)' : 'transparent', borderLeft: item === activeLabel ? '3px solid var(--hp-primary, #6366f1)' : '3px solid transparent', cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)', textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
        ))}
      </aside>
      <div style={{ padding: '32px 40px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', margin: '0 0 24px' }}>{activeLabel} Settings</h2>
        <SettingsContent section={section} />
      </div>
    </div>
  )
}

function LayoutTopTabs({ section }) {
  const activeLabel = section === 'account' ? 'Account' : section === 'notifications' ? 'Notifications' : 'Profile'
  return (
    <div style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ borderBottom: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-surface, #f9fafb)', padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {TOP_TABS.map((tab) => (
            <a key={tab} style={{ display: 'block', padding: '14px 16px', fontSize: 14, fontWeight: tab === activeLabel ? 600 : 400, color: tab === activeLabel ? 'var(--hp-primary, #6366f1)' : 'var(--hp-textMuted, #6b7280)', borderBottom: tab === activeLabel ? '2px solid var(--hp-primary, #6366f1)' : '2px solid transparent', cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{tab}</a>
          ))}
        </div>
      </div>
      <div style={{ padding: '32px 40px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', margin: '0 0 24px' }}>{activeLabel}</h2>
        <SettingsContent section={section} />
      </div>
    </div>
  )
}

function LayoutAccordion({ section }) {
  const sections = [
    { key: 'profile', label: 'Profile', content: <SectionProfile /> },
    { key: 'account', label: 'Account & Security', content: <SectionAccount /> },
    { key: 'notifications', label: 'Notifications', content: <SectionNotifications /> },
  ]
  return (
    <div style={{ padding: '32px 40px', minHeight: 'calc(100vh - 56px)' }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)', margin: '0 0 24px' }}>Settings</h2>
      {sections.map((sec) => {
        const isOpen = (sec.key === 'profile' && section === 'profile') || (sec.key === 'account' && section === 'account') || (sec.key === 'notifications' && section === 'notifications')
        return (
          <div key={sec.key} style={{ border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: isOpen ? 'var(--hp-surface, #f9fafb)' : 'var(--hp-background, #fff)', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: isOpen ? 'var(--hp-primary, #6366f1)' : 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)' }}>{sec.label}</span>
              <span style={{ color: isOpen ? 'var(--hp-primary, #6366f1)' : 'var(--hp-textMuted, #9ca3af)', fontSize: 18, fontWeight: 700 }}>{isOpen ? '−' : '+'}</span>
            </div>
            {isOpen && (
              <div style={{ padding: '18px 18px 20px', borderTop: '1px solid var(--hp-border, #e5e7eb)' }}>
                {sec.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function PreviewSettings({ kit, sectionConfig = {}, onSectionChange }) {
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

  const layoutEl = config.layout === 'top-tabs'
    ? <LayoutTopTabs section={config.section} />
    : config.layout === 'accordion'
      ? <LayoutAccordion section={config.section} />
      : <LayoutSidebarTabs section={config.section} />

  return (
    <div ref={ref} style={S.page}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-background, #fff)' }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--hp-text, #111827)', fontFamily: 'var(--hp-heading-font, sans-serif)' }}>Acme</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Dashboard', 'Projects', 'Team'].map((link) => (
            <a key={link} style={{ fontSize: 14, color: 'var(--hp-textMuted, #6b7280)', textDecoration: 'none', cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' }}>{link}</a>
          ))}
        </div>
        <Avatar initials="JD" size={32} />
      </nav>
      {wrap('layout', wrap('section', layoutEl))}
    </div>
  )
}
