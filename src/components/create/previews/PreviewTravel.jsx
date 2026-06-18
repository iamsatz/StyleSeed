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

const DESTINATIONS = [
  { name: 'Kyoto', country: 'Japan', price: '$1,240', nights: '7 nights', flag: '🇯🇵', rating: '4.9', reviews: '2.4k' },
  { name: 'Santorini', country: 'Greece', price: '$1,890', nights: '5 nights', flag: '🇬🇷', rating: '4.8', reviews: '3.1k' },
  { name: 'Lisbon', country: 'Portugal', price: '$980', nights: '6 nights', flag: '🇵🇹', rating: '4.7', reviews: '1.8k' },
  { name: 'Bali', country: 'Indonesia', price: '$1,120', nights: '8 nights', flag: '🇮🇩', rating: '4.9', reviews: '4.2k' },
]

const TRIP = { from: 'New York', to: 'Tokyo', dates: 'Jul 12 → Jul 20', travelers: '2 adults', type: 'Round trip' }

// ── Search variants ───────────────────────────────────────────────────────────

function SearchFullWidth() {
  return (
    <div style={{ background: 'var(--hp-primary)', padding: '24px 20px' }}>
      <h1 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', marginBottom: 4, textAlign: 'center', letterSpacing: '-0.02em' }}>Where to next?</h1>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: 16 }}>Find flights, hotels, and experiences worldwide</p>
      <div style={{ background: '#ffffff', borderRadius: 12, padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>From</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>New York</div>
        </div>
        <div>
          <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>To</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>Tokyo</div>
        </div>
        <div>
          <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Dates</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)' }}>Jul 12 – 20</div>
        </div>
        <button className="lp-btn lp-btn--primary" style={{ whiteSpace: 'nowrap' }}>Search</button>
      </div>
    </div>
  )
}

function SearchSplit() {
  return (
    <div style={{ display: 'flex', minHeight: 160 }}>
      <div style={{ width: '45%', background: 'var(--hp-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 6 }}>
          Explore the world your way
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)' }}>500+ destinations · Best price guarantee</div>
      </div>
      <div style={{ flex: 1, background: 'var(--hp-surface)', padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['From', 'New York, USA'],['To', 'Tokyo, Japan'],['Check in', 'Jul 12, 2025'],['Check out', 'Jul 20, 2025']].map(([lbl, val]) => (
            <div key={lbl} style={{ background: 'var(--hp-background)', border: '1px solid var(--hp-border)', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 1 }}>{lbl}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{val}</div>
            </div>
          ))}
        </div>
        <button className="lp-btn lp-btn--primary" style={{ width: '100%' }}>Find flights & hotels</button>
      </div>
    </div>
  )
}

function SearchCompact() {
  return (
    <div style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '12px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--hp-background)', border: '1px solid var(--hp-border)', borderRadius: 10, padding: '10px 14px' }}>
        <span style={{ fontSize: '0.875rem' }}>✈️</span>
        <span style={{ flex: 1, fontSize: '0.875rem', color: 'var(--hp-text)', fontWeight: 600 }}>New York → Tokyo</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', padding: '3px 8px', background: 'var(--hp-surface)', borderRadius: 6, border: '1px solid var(--hp-border)' }}>Jul 12 – 20</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', padding: '3px 8px', background: 'var(--hp-surface)', borderRadius: 6, border: '1px solid var(--hp-border)' }}>2 adults</span>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search</button>
      </div>
    </div>
  )
}

// ── Results variants ──────────────────────────────────────────────────────────

function ResultsGrid() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Popular destinations</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-primary)', fontWeight: 600, cursor: 'pointer' }}>View all</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {DESTINATIONS.map((d, i) => (
          <div key={i} className="lp-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: 64, background: `var(--hp-${['primary','secondary','accent','success'][i]})`, display: 'flex', alignItems: 'flex-end', padding: '8px 10px' }}>
              <div style={{ fontSize: '1.25rem' }}>{d.flag}</div>
              <div style={{ marginLeft: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '2px 8px', fontSize: '0.625rem', color: '#ffffff', fontWeight: 700 }}>⭐ {d.rating}</div>
            </div>
            <div style={{ padding: '10px 10px' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--hp-text)' }}>{d.name}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 4 }}>{d.country} · {d.nights}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-primary)' }}>{d.price} <span style={{ fontSize: '0.6rem', fontWeight: 500, color: 'var(--hp-textMuted)' }}>/ person</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResultsList() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Available packages</div>
      {DESTINATIONS.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < DESTINATIONS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 56, height: 44, borderRadius: 10, background: `var(--hp-${['primary','secondary','accent','success'][i]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{d.flag}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{d.name}, {d.country}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{d.nights} · ⭐ {d.rating} ({d.reviews})</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-primary)' }}>{d.price}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted)' }}>per person</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ResultsMap() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Results map</div>
      <div style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 12, overflow: 'hidden', position: 'relative', height: 100 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', opacity: 0.15 }}>
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} style={{ border: '1px solid var(--hp-border)' }} />
          ))}
        </div>
        {[{ top: '30%', left: '22%', d: DESTINATIONS[0] }, { top: '55%', left: '45%', d: DESTINATIONS[1] }, { top: '25%', left: '68%', d: DESTINATIONS[2] }, { top: '60%', left: '75%', d: DESTINATIONS[3] }].map(({ top, left, d }, i) => (
          <div key={i} style={{ position: 'absolute', top, left, transform: 'translate(-50%,-50%)' }}>
            <div style={{ background: i === 0 ? 'var(--hp-primary)' : 'var(--hp-surface)', color: i === 0 ? '#ffffff' : 'var(--hp-text)', border: `1px solid ${i === 0 ? 'var(--hp-primary)' : 'var(--hp-border)'}`, borderRadius: 12, padding: '3px 8px', fontSize: '0.625rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{d.price}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: 'auto' }}>
        {DESTINATIONS.slice(0, 3).map((d, i) => (
          <div key={i} className="lp-card" style={{ padding: '8px 10px', flexShrink: 0, minWidth: 100 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)' }}>{d.name} {d.flag}</div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-primary)' }}>{d.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Card variants ─────────────────────────────────────────────────────────────

function CardFull() {
  const d = DESTINATIONS[0]
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Top pick for you</div>
      <div className="lp-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ height: 80, background: 'var(--hp-primary)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '12px 14px' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', lineHeight: 1 }}>{d.name} {d.flag}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>{d.country}</div>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '4px 10px', fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>⭐ {d.rating}</div>
        </div>
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              {[d.nights, 'All-inclusive', 'Free cancellation'].map((t) => (
                <span key={t} style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: 12, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', color: 'var(--hp-textMuted)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>From <strong style={{ fontSize: '1.125rem', color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{d.price}</strong> per person</div>
          </div>
          <button className="lp-btn lp-btn--primary" style={{ marginLeft: 'auto' }}>Book now</button>
        </div>
      </div>
    </div>
  )
}

function CardCompact() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 8 }}>Quick picks</div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {DESTINATIONS.map((d, i) => (
          <div key={i} style={{ flexShrink: 0, width: 100, background: `var(--hp-${['primary','secondary','accent','success'][i]})`, borderRadius: 10, padding: '10px 10px', cursor: 'pointer' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: 4 }}>{d.flag}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>{d.name}</div>
            <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{d.nights}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>{d.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CardDeal() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ background: 'var(--hp-warning)', borderRadius: 10, padding: '10px 14px', marginBottom: 10 }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Flash Deal — 48h only</div>
        <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.9)' }}>Save up to 35% on Bali packages this week</div>
      </div>
      <div className="lp-card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: '2rem' }}>🇮🇩</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-text)' }}>Bali, Indonesia</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginBottom: 4 }}>8 nights · All-inclusive · -35%</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', textDecoration: 'line-through' }}>$1,720</span>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--hp-primary)' }}>$1,120</span>
          </div>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Grab deal</button>
      </div>
    </div>
  )
}

export default function PreviewTravel({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('travel')
  const defaults = getDefaultSections('travel')
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
    config.search === 'split' ? <SearchSplit /> :
    config.search === 'compact' ? <SearchCompact /> :
    <SearchFullWidth />

  const resultsNode =
    config.results === 'list' ? <ResultsList /> :
    config.results === 'map' ? <ResultsMap /> :
    <ResultsGrid />

  const cardNode =
    config.card === 'compact' ? <CardCompact /> :
    config.card === 'deal' ? <CardDeal /> :
    <CardFull />

  return (
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)', minHeight: '100%' }}>
      <nav style={{ height: 44, background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)' }}>Roamr</div>
        <div style={{ flex: 1, display: 'flex', gap: 16 }}>
          {['Flights','Hotels','Packages','Experiences'].map((l, i) => (
            <span key={l} style={{ fontSize: '0.75rem', fontWeight: i === 2 ? 700 : 500, color: i === 2 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Sign in</button>
      </nav>
      {wrap('search', searchNode)}
      {wrap('results', resultsNode)}
      {wrap('card', cardNode)}
    </div>
  )
}
