import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const PROPERTIES = [
  { name: '12 Oak Lane', price: '$849,000', beds: '4 bd', baths: '3 ba', sqft: '2,400 sqft', emoji: '🏠', tag: 'New', neighborhood: 'Pacific Heights' },
  { name: '5 River View Dr', price: '$1.2M', beds: '5 bd', baths: '4 ba', sqft: '3,100 sqft', emoji: '🏡', tag: 'Featured', neighborhood: 'Marina District' },
  { name: 'Apt 3B Maple St', price: '$425,000', beds: '2 bd', baths: '2 ba', sqft: '980 sqft', emoji: '🏢', tag: null, neighborhood: 'Mission' },
  { name: '88 Hillcrest Ave', price: '$695,000', beds: '3 bd', baths: '2 ba', sqft: '1,620 sqft', emoji: '🏘', tag: 'Reduced', neighborhood: 'Noe Valley' },
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

// ── Search variants ──────────────────────────────────────────────────────────

function SearchProminent() {
  return (
    <div style={{ padding: '28px 24px', background: 'var(--hp-primary)', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--hp-background)', fontFamily: 'var(--hp-heading-font)', marginBottom: 16, letterSpacing: '-0.02em' }}>
        Find Your Perfect Home
      </h1>
      <div style={{ display: 'flex', gap: 6, maxWidth: 560, margin: '0 auto', flexWrap: 'wrap' }}>
        <input className="lp-input" placeholder="City, ZIP, or address" readOnly style={{ flex: 3, minWidth: 180, background: 'var(--hp-background)', border: 'none', fontSize: '0.875rem' }} />
        <select className="lp-input" style={{ flex: 1, minWidth: 100, background: 'var(--hp-background)', border: 'none' }}>
          <option>Any price</option>
          <option>Under $500K</option>
          <option>$500K–$1M</option>
        </select>
        <button className="lp-btn lp-btn--sm" style={{ background: 'var(--hp-background)', color: 'var(--hp-primary)', fontWeight: 700, flex: '0 0 auto' }}>Search</button>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
        {['For Sale', 'For Rent', 'New Build'].map((opt, i) => (
          <button key={i} style={{ background: i === 0 ? 'var(--hp-background)' : 'transparent', color: 'var(--hp-background)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '4px 14px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

function SearchFilterBar() {
  return (
    <div style={{ padding: '10px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
        <input className="lp-input" placeholder="City, ZIP, or address" readOnly style={{ flex: 2, minWidth: 160, fontSize: '0.8125rem' }} />
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search</button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['For Sale', 'Price', 'Beds', 'Baths', 'More filters'].map((opt, i) => (
          <button key={i} className={`lp-chip${i === 0 ? ' lp-chip--active' : ''}`}>{opt}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--hp-textMuted)', fontWeight: 600, alignSelf: 'center' }}>132 results</span>
      </div>
    </div>
  )
}

// ── Listings layout variants ─────────────────────────────────────────────────

function TagBadge({ tag }) {
  if (!tag) return null
  const bg = tag === 'New' ? 'var(--hp-success)' : tag === 'Reduced' ? 'var(--hp-warning)' : 'var(--hp-primary)'
  return (
    <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 1, background: bg, color: tag === 'Reduced' ? 'var(--hp-text)' : 'var(--hp-background)', fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
      {tag}
    </div>
  )
}

function ListingsThreeCol({ cardVariant }) {
  const show = PROPERTIES.slice(0, 3)
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-background)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
      {show.map((p, i) => <PropertyCard key={i} p={p} variant={cardVariant} />)}
    </div>
  )
}

function ListingsTwoCol({ cardVariant }) {
  const show = PROPERTIES.slice(0, 4)
  return (
    <div style={{ padding: '16px 24px', background: 'var(--hp-background)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {show.map((p, i) => <PropertyCard key={i} p={p} variant={cardVariant} />)}
    </div>
  )
}

function ListingsList({ cardVariant }) {
  return (
    <div style={{ padding: '12px 24px', background: 'var(--hp-background)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {PROPERTIES.map((p, i) => <PropertyCardRow key={i} p={p} variant={cardVariant} />)}
    </div>
  )
}

// ── Property card variants ───────────────────────────────────────────────────

function PropertyCard({ p, variant }) {
  if (variant === 'minimal') {
    return (
      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', position: 'relative' }}>
        <TagBadge tag={p.tag} />
        <div style={{ height: 72, background: 'var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{p.emoji}</div>
        <div style={{ padding: '8px 10px 10px' }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary)', marginBottom: 2 }}>{p.price}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-text)', fontWeight: 600 }}>{p.name}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{p.beds} · {p.baths}</div>
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '2px solid var(--hp-primary)', background: 'var(--hp-surface)', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <TagBadge tag={p.tag} />
        <div style={{ height: 90, background: 'linear-gradient(135deg, var(--hp-surface), var(--hp-border))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', position: 'relative' }}>
          {p.emoji}
          <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.6rem', padding: '2px 6px', borderRadius: 6 }}>8 photos</div>
        </div>
        <div style={{ padding: '10px 12px 12px' }}>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--hp-primary)', marginBottom: 2 }}>{p.price}</div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{p.name}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 8 }}>{p.neighborhood} · {p.beds} · {p.baths} · {p.sqft}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ flex: 1, fontSize: '0.75rem' }}>View Details</button>
            <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ fontSize: '0.75rem' }}>♡</button>
          </div>
        </div>
      </div>
    )
  }

  // full (default)
  return (
    <div className="lp-re-card" style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--hp-border)', background: 'var(--hp-surface)' }}>
      <TagBadge tag={p.tag} />
      <div style={{ height: 80, background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', borderBottom: '1px solid var(--hp-border)' }}>{p.emoji}</div>
      <div style={{ padding: '10px 10px 12px' }}>
        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary)', marginBottom: 2 }}>{p.price}</div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)', marginBottom: 2 }}>{p.name}</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 8 }}>{p.beds} · {p.baths} · {p.sqft}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ flex: 1, fontSize: '0.75rem' }}>View</button>
          <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ fontSize: '0.75rem' }}>♡</button>
        </div>
      </div>
    </div>
  )
}

function PropertyCardRow({ p, variant }) {
  const isFeatured = variant === 'featured'
  const isMinimal = variant === 'minimal'
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', border: `${isFeatured ? '2px' : '1px'} solid ${isFeatured ? 'var(--hp-primary)' : 'var(--hp-border)'}`, borderRadius: 10, padding: '10px', background: 'var(--hp-surface)', position: 'relative' }}>
      <TagBadge tag={p.tag} />
      <div style={{ width: 80, height: 64, flexShrink: 0, borderRadius: 6, background: 'var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{p.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary)' }}>{p.price}</div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)', marginBottom: 2 }}>{p.name}</div>
        {!isMinimal && <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{p.neighborhood} · {p.beds} · {p.baths} · {p.sqft}</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
        <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.75rem' }}>View</button>
        <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ fontSize: '0.75rem' }}>♡</button>
      </div>
    </div>
  )
}

export default function PreviewRealEstate({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('realestate')
  const defaults = getDefaultSections('realestate')
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

  const searchNode =
    config.search === 'filter-bar' ? <SearchFilterBar /> :
    <SearchProminent />

  const cardVariant = config.card

  const listingsNode =
    config.listings === 'two-col' ? <ListingsTwoCol cardVariant={cardVariant} /> :
    config.listings === 'list' ? <ListingsList cardVariant={cardVariant} /> :
    <ListingsThreeCol cardVariant={cardVariant} />

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text)' }}>Estates</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Buy</a>
          <a className="lp-app-nav-link">Rent</a>
          <a className="lp-app-nav-link">Sell</a>
          <a className="lp-app-nav-link">Agents</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Sign In</button>
      </nav>

      {wrap('search', searchNode)}

      <div style={{ padding: '8px 24px', background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', fontWeight: 600 }}>Sort:</span>
        {['Best match', 'Price ↑', 'Price ↓', 'Newest'].map((opt, i) => (
          <button key={i} className={`lp-chip${i === 0 ? ' lp-chip--active' : ''}`}>{opt}</button>
        ))}
        <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ marginLeft: 'auto' }}>Map View</button>
      </div>

      {wrap('listings', listingsNode)}

      <div style={{ padding: '14px 24px', background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Mortgage Calculator</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Est. $3,840/mo at 6.8% APR on $849K</div>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Calculate</button>
      </div>
    </div>
  )
}
