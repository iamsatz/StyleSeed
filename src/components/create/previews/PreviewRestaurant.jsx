import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const MENU = {
  Starters: [
    { name: 'Burrata & Tomato', desc: 'Fresh burrata, heirloom tomatoes, basil oil', price: '$14', popular: true },
    { name: 'Soup du Jour', desc: "Chef's daily creation with house-baked bread", price: '$10', popular: false },
    { name: 'Charcuterie Board', desc: 'Cured meats, seasonal pickles, grain mustard', price: '$18', popular: false },
  ],
  Mains: [
    { name: 'Grilled Salmon', desc: 'Lemon caper butter, seasonal vegetables, potato gratin', price: '$28', popular: true },
    { name: 'Truffle Risotto', desc: 'Arborio rice, black truffle, aged parmesan', price: '$24', popular: false },
    { name: 'NY Strip Steak', desc: '8oz prime cut, hand-cut fries, chimichurri', price: '$38', popular: false },
  ],
  Desserts: [
    { name: 'Crème Brûlée', desc: 'Classic French custard with fresh berries', price: '$12', popular: false },
    { name: 'Chocolate Fondant', desc: 'Warm dark chocolate, vanilla ice cream', price: '$14', popular: true },
  ],
}

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

// ── Header variants ──────────────────────────────────────────────────────────

function HeaderHero() {
  return (
    <div style={{ background: 'var(--hp-primary)', padding: '40px 24px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--hp-background)', fontFamily: 'var(--hp-heading-font)' }}>La Maison</div>
      <p style={{ fontSize: '0.875rem', color: 'var(--hp-background)', opacity: 0.8, margin: '6px 0 4px' }}>Fine dining · Downtown · Open until 10 pm</p>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '10px 0 18px' }}>
        <span style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--hp-background)', fontSize: '0.7rem', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>4.8 (312 reviews)</span>
        <span style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--hp-background)', fontSize: '0.7rem', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Michelin Bib</span>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button className="lp-btn lp-btn--sm" style={{ background: 'var(--hp-background)', color: 'var(--hp-primary)', fontWeight: 700 }}>Reserve a Table</button>
        <button className="lp-btn lp-btn--sm" style={{ background: 'transparent', border: '1.5px solid var(--hp-background)', color: 'var(--hp-background)' }}>View Menu</button>
      </div>
    </div>
  )
}

function HeaderCover() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ height: 140, background: 'linear-gradient(135deg, var(--hp-surface) 0%, var(--hp-border) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '4rem', opacity: 0.4 }}>🍽</span>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)', padding: '20px 24px 14px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-heading-font)' }}>La Maison</div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Fine dining · Downtown · Open until 10 pm</div>
      </div>
      <div style={{ padding: '10px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', fontWeight: 600 }}>4.8 · 312 reviews · Michelin Bib</span>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Reserve</button>
      </div>
    </div>
  )
}

function HeaderCompact() {
  return (
    <div style={{ padding: '10px 24px', background: 'var(--hp-surface)', borderBottom: '1.5px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', lineHeight: 1.2 }}>La Maison</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>Fine dining · Open until 10 pm · 4.8</div>
      </div>
      <button className="lp-btn lp-btn--primary lp-btn--sm">Reserve</button>
    </div>
  )
}

// ── Menu layout variants ─────────────────────────────────────────────────────

function MenuTabs({ activeCategory, onCategory }) {
  return (
    <div style={{ padding: '10px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 6, overflowX: 'auto' }}>
      {[...Object.keys(MENU), 'Wine List', 'Cocktails'].map((cat, i) => (
        <button key={i} className={`lp-chip${cat === activeCategory ? ' lp-chip--active' : ''}`} onClick={() => onCategory && onCategory(cat)}>{cat}</button>
      ))}
    </div>
  )
}

function MenuSections() {
  return (
    <div style={{ padding: '16px 24px 0', background: 'var(--hp-background)' }}>
      {Object.entries(MENU).map(([cat]) => (
        <div key={cat} style={{ padding: '8px 0 4px', borderBottom: '1.5px solid var(--hp-border)', marginBottom: 4 }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--hp-primary)', marginBottom: 2 }}>{cat}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{MENU[cat].length} items</div>
        </div>
      ))}
    </div>
  )
}

// ── Items variants ───────────────────────────────────────────────────────────

function ItemsCards({ category }) {
  const items = MENU[category] || MENU['Mains']
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-background)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} className="lp-card" style={{ padding: 10, position: 'relative' }}>
          {item.popular && (
            <span style={{ position: 'absolute', top: 8, right: 8, background: 'var(--hp-warning)', color: 'var(--hp-text)', fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>Chef's Pick</span>
          )}
          <div style={{ height: 56, background: 'var(--hp-surface)', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🍴</div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{item.name}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--hp-textMuted)', marginBottom: 8, lineHeight: 1.4 }}>{item.desc}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: 'var(--hp-primary)', fontSize: '0.875rem' }}>{item.price}</span>
            <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>+ Add</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function ItemsList({ category }) {
  const items = MENU[category] || MENU['Mains']
  return (
    <div style={{ padding: '12px 24px', background: 'var(--hp-background)' }}>
      {items.map((item, i) => (
        <div key={i} className="lp-menu-item" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--hp-border)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>{item.name}</span>
              {item.popular && <span className="lp-badge" style={{ background: 'var(--hp-warning)', color: 'var(--hp-text)', fontSize: '0.6rem', padding: '1px 6px' }}>Chef's Pick</span>}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{item.desc}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
            <span style={{ fontWeight: 800, color: 'var(--hp-primary)', fontSize: '0.875rem' }}>{item.price}</span>
            <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>+ Add</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function ItemsLargeImage({ category }) {
  const items = MENU[category] || MENU['Mains']
  return (
    <div style={{ padding: '12px 24px', background: 'var(--hp-background)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--hp-border)', background: 'var(--hp-surface)' }}>
          <div style={{ height: 100, background: 'linear-gradient(135deg, var(--hp-surface) 0%, var(--hp-border) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🍴</div>
          <div style={{ padding: '10px 14px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>{item.desc}</div>
              </div>
              {item.popular && <span className="lp-badge" style={{ background: 'var(--hp-warning)', color: 'var(--hp-text)', fontSize: '0.6rem', flexShrink: 0, marginLeft: 8 }}>Chef's Pick</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <span style={{ fontWeight: 800, color: 'var(--hp-primary)', fontSize: '1rem' }}>{item.price}</span>
              <button className="lp-btn lp-btn--primary lp-btn--sm">+ Add to Order</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PreviewRestaurant({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('restaurant')
  const defaults = getDefaultSections('restaurant')
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

  const activeCategory = 'Mains'

  const headerNode =
    config.header === 'cover' ? <HeaderCover /> :
    config.header === 'compact' ? <HeaderCompact /> :
    <HeaderHero />

  const menuNode =
    config.menu === 'sections' ? <MenuSections /> :
    <MenuTabs activeCategory={activeCategory} />

  const itemsNode =
    config.items === 'list' ? <ItemsList category={activeCategory} /> :
    config.items === 'large-image' ? <ItemsLargeImage category={activeCategory} /> :
    <ItemsCards category={activeCategory} />

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text)' }}>La Maison</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Menu</a>
          <a className="lp-app-nav-link">Reserve</a>
          <a className="lp-app-nav-link">About</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Order Online</button>
      </nav>

      {wrap('header', headerNode)}
      {wrap('menu', menuNode)}
      {wrap('items', itemsNode)}

      <div style={{ position: 'sticky', bottom: 0, background: 'var(--hp-surface)', borderTop: '1.5px solid var(--hp-border)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Your order (3 items)</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Subtotal: $66.00</div>
        </div>
        <button className="lp-btn lp-btn--primary">View Cart</button>
      </div>
    </div>
  )
}
