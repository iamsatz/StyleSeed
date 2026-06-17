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

const THUMBS = ['👜', '🔍', '📦', '🏷️']
const SPECS = [
  { label: 'Material', value: 'Full-grain leather' },
  { label: 'Dimensions', value: '14" × 11" × 5"' },
  { label: 'Ships in', value: '2–3 business days' },
  { label: 'Stock', value: 'In stock (8 left)', highlight: true },
]
const REVIEWS_DATA = [
  { author: 'Sarah K.', rating: '★★★★★', date: 'Apr 2, 2025', text: 'Absolutely beautiful bag. The leather quality is outstanding and the craftsmanship is top-notch. Worth every penny.' },
  { author: 'Michael R.', rating: '★★★★☆', date: 'Mar 18, 2025', text: 'Great bag, very spacious. Shipping was fast and packaging was excellent. Slight break-in period but softened up nicely.' },
  { author: 'Priya N.', rating: '★★★★★', date: 'Mar 5, 2025', text: 'I bought this as a gift and the recipient loved it. The leather has a beautiful smell and looks premium in person.' },
]

function ProductNav() {
  return (
    <nav style={{ background: 'var(--hp-background, #fff)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 46, flexShrink: 0 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)', marginRight: 8 }}>◈ Shop</div>
      {['All Products', 'Bags', 'Tech', 'Apparel'].map((item, i) => (
        <div key={item} style={{ fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)', cursor: 'pointer' }}>{item}</div>
      ))}
      <button style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-surface, #f9fafb)', fontSize: '0.75rem', color: 'var(--hp-text, #111827)', cursor: 'pointer' }}>🛒 Cart (1)</button>
    </nav>
  )
}

function Breadcrumb() {
  return (
    <div style={{ padding: '6px 20px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>
      <span style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Home</span>
      <span style={{ margin: '0 5px' }}>›</span>
      <span style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Bags</span>
      <span style={{ margin: '0 5px' }}>›</span>
      <span>Premium Leather Tote</span>
    </div>
  )
}

function GalleryStack() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 160, background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>👜</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {THUMBS.map((emoji, i) => (
          <div key={i} style={{ height: 48, background: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-surface, #f9fafb)', border: `2px solid ${i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-border, #e5e7eb)'}`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', cursor: 'pointer', opacity: i === 0 ? 1 : 0.75 }}>{emoji}</div>
        ))}
      </div>
    </div>
  )
}

function GalleryHero() {
  return (
    <div style={{ background: `linear-gradient(135deg, var(--hp-surface, #f9fafb), var(--hp-background, #fff))`, border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 10, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>👜</div>
  )
}

function GalleryThumbnails() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {THUMBS.map((emoji, i) => (
          <div key={i} style={{ width: 44, height: 44, background: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-surface, #f9fafb)', border: `2px solid ${i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-border, #e5e7eb)'}`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', cursor: 'pointer', opacity: i === 0 ? 1 : 0.7 }}>{emoji}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>👜</div>
    </div>
  )
}

function ColorSelector() {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 5 }}>Color: <span style={{ fontWeight: 400, color: 'var(--hp-textMuted, #6b7280)' }}>Tan</span></div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['#c9a97a', '#1a1a1a', '#8b4513', '#2d5a3d', '#7c3aed'].map((color, i) => (
          <div key={color} style={{ width: 22, height: 22, borderRadius: '50%', background: color, cursor: 'pointer', border: i === 0 ? '2px solid var(--hp-text, #111827)' : '2px solid transparent', outline: i === 0 ? '1px solid var(--hp-border, #e5e7eb)' : 'none', outlineOffset: 1 }} />
        ))}
      </div>
    </div>
  )
}

function SizeSelector() {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 5 }}>Style</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['Tan', 'Black', 'Cognac'].map((opt, i) => (
          <button key={opt} style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-border, #e5e7eb)'}`, background: i === 0 ? 'rgba(124,58,237,0.08)' : 'var(--hp-background, #fff)', color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)', fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 400, cursor: 'pointer' }}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

function PriceBlock() {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--hp-primary, #7c3aed)' }}>$129.00</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted, #9ca3af)', textDecoration: 'line-through' }}>$159.00</span>
      <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.6875rem', fontWeight: 700, background: 'rgba(245,158,11,0.15)', color: 'var(--hp-warning, #b45309)' }}>19% OFF</span>
    </div>
  )
}

function RatingBlock() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <span style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.875rem' }}>★★★★☆</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>4.2 · 42 reviews</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>See reviews</span>
    </div>
  )
}

function SpecsBlock() {
  return (
    <div style={{ margin: '10px 0', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--hp-border, #e5e7eb)' }}>
      {SPECS.map((spec, i) => (
        <div key={spec.label} style={{ display: 'flex', padding: '6px 10px', borderBottom: i < SPECS.length - 1 ? '1px solid var(--hp-border, #e5e7eb)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', width: 90, flexShrink: 0 }}>{spec.label}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: spec.highlight ? 'var(--hp-success, #059669)' : 'var(--hp-text, #111827)' }}>{spec.value}</span>
        </div>
      ))}
    </div>
  )
}

function AddToCartBlock() {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button style={{ flex: 1, padding: '8px 0', borderRadius: 7, border: 'none', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>Add to Cart</button>
        <button style={{ padding: '8px 12px', borderRadius: 7, border: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-surface, #f9fafb)', fontSize: '0.875rem', cursor: 'pointer' }}>♡</button>
      </div>
      <div style={{ marginTop: 8, padding: '7px 10px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 7, border: '1px solid var(--hp-border, #e5e7eb)', fontSize: '0.6875rem', color: 'var(--hp-textMuted, #6b7280)', display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ color: 'var(--hp-success, #059669)' }}>✓</span> Free returns within 30 days
      </div>
    </div>
  )
}

function InfoStacked() {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-primary, #7c3aed)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Bags / Leather</div>
      <h2 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1.2, fontFamily: 'var(--hp-heading-font)' }}>Premium Leather Tote</h2>
      <PriceBlock />
      <RatingBlock />
      <ColorSelector />
      <SizeSelector />
      <SpecsBlock />
      <AddToCartBlock />
    </div>
  )
}

function InfoSideBySide() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-primary, #7c3aed)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Bags / Leather</div>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1.2, fontFamily: 'var(--hp-heading-font)' }}>Premium Leather Tote</h2>
        <PriceBlock />
        <RatingBlock />
        <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.6, marginBottom: 10 }}>
          Handcrafted from full-grain leather sourced from Italian tanneries. Develops a beautiful patina with use. Fits a 13" laptop, daily essentials, and more.
        </div>
        <SpecsBlock />
      </div>
      <div>
        <ColorSelector />
        <SizeSelector />
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 5 }}>Quantity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 7, width: 'fit-content', overflow: 'hidden' }}>
            <button style={{ padding: '5px 12px', border: 'none', background: 'var(--hp-surface, #f9fafb)', fontSize: '1rem', cursor: 'pointer', color: 'var(--hp-text, #111827)' }}>−</button>
            <span style={{ padding: '5px 14px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text, #111827)', borderLeft: '1px solid var(--hp-border, #e5e7eb)', borderRight: '1px solid var(--hp-border, #e5e7eb)' }}>1</span>
            <button style={{ padding: '5px 12px', border: 'none', background: 'var(--hp-surface, #f9fafb)', fontSize: '1rem', cursor: 'pointer', color: 'var(--hp-text, #111827)' }}>+</button>
          </div>
        </div>
        <AddToCartBlock />
      </div>
    </div>
  )
}

function InfoCompact() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: 2, minWidth: 160 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1.2, fontFamily: 'var(--hp-heading-font)' }}>Premium Leather Tote</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: 'var(--hp-primary, #7c3aed)' }}>$129</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', textDecoration: 'line-through' }}>$159</span>
          <span style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.75rem' }}>★★★★☆</span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>(42)</span>
        </div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
          {['Tan', 'Black', 'Cognac'].map((opt, i) => (
            <button key={opt} style={{ padding: '2px 8px', borderRadius: 5, border: `1px solid ${i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-border, #e5e7eb)'}`, background: i === 0 ? 'rgba(124,58,237,0.08)' : 'transparent', color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)', fontSize: '0.6875rem', fontWeight: i === 0 ? 700 : 400, cursor: 'pointer' }}>{opt}</button>
          ))}
        </div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5 }}>Full-grain leather · 14" × 11" · Ships in 2–3 days · <span style={{ color: 'var(--hp-success, #059669)', fontWeight: 700 }}>In stock</span></div>
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>
        <button style={{ width: '100%', padding: '7px 0', borderRadius: 7, border: 'none', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer', marginBottom: 6 }}>Add to Cart</button>
        <button style={{ width: '100%', padding: '6px 0', borderRadius: 7, border: '1px solid var(--hp-border, #e5e7eb)', background: 'transparent', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.8125rem', cursor: 'pointer' }}>♡ Save</button>
      </div>
    </div>
  )
}

function ReviewsFull() {
  return (
    <div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 12 }}>Customer Reviews</div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 14, padding: '10px 14px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)' }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--hp-text, #111827)', lineHeight: 1 }}>4.2</div>
          <div style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.875rem' }}>★★★★☆</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)' }}>42 reviews</div>
        </div>
        <div style={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted, #9ca3af)', width: 8 }}>{star}</span>
              <div style={{ flex: 1, height: 5, background: 'var(--hp-border, #e5e7eb)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${[70, 18, 7, 3, 2][5 - star]}%`, background: 'var(--hp-warning, #f59e0b)', borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted, #9ca3af)', width: 20, textAlign: 'right' }}>{[70, 18, 7, 3, 2][5 - star]}%</span>
            </div>
          ))}
        </div>
      </div>
      {REVIEWS_DATA.map((rev, i) => (
        <div key={i} style={{ padding: '10px 0', borderBottom: i < REVIEWS_DATA.length - 1 ? '1px solid var(--hp-border, #e5e7eb)' : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{rev.author.slice(0, 2)}</div>
              <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--hp-text, #111827)' }}>{rev.author}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.75rem' }}>{rev.rating}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{rev.date}</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5 }}>{rev.text}</p>
        </div>
      ))}
    </div>
  )
}

function ReviewsSummary() {
  return (
    <div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 10 }}>Ratings summary</div>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '14px', display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--hp-primary, #7c3aed)', lineHeight: 1 }}>4.2</div>
          <div style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '1rem', margin: '4px 0' }}>★★★★☆</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Based on 42 reviews</div>
        </div>
        <div style={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)', width: 10 }}>{star}★</span>
              <div style={{ flex: 1, height: 8, background: 'var(--hp-border, #e5e7eb)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${[70, 18, 7, 3, 2][5 - star]}%`, background: 'var(--hp-primary, #7c3aed)', borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)', width: 28, textAlign: 'right' }}>{Math.round([70, 18, 7, 3, 2][5 - star] * 0.42)}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 8 }}>Most helpful review</div>
        <div style={{ padding: '10px 12px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--hp-text, #111827)' }}>{REVIEWS_DATA[0].author}</span>
            <span style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.75rem' }}>{REVIEWS_DATA[0].rating}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5 }}>{REVIEWS_DATA[0].text}</p>
        </div>
      </div>
    </div>
  )
}

function ReviewsTestimonials() {
  return (
    <div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 12, textAlign: 'center' }}>What customers are saying</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {REVIEWS_DATA.map((rev, i) => (
          <div key={i} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.75rem', marginBottom: 6 }}>{rev.rating}</div>
            <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5, fontStyle: 'italic' }}>"{rev.text.slice(0, 80)}..."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{rev.author.slice(0, 2)}</div>
              <div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-text, #111827)' }}>{rev.author}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{rev.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PreviewProductPage({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('product')
  const defaults = getDefaultSections('product')
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

  const galleryVariant = config.gallery
  const infoVariant = config.info
  const reviewsVariant = config.reviews

  const isSideBySide = infoVariant === 'side-by-side'

  return (
    <div className="lp-page" ref={ref} style={{ display: 'flex', flexDirection: 'column', background: 'var(--hp-background, #fff)' }}>
      <ProductNav />
      <Breadcrumb />
      <div style={{ padding: '14px 20px', background: 'var(--hp-background, #fff)' }}>
        {isSideBySide
          ? wrap('gallery', galleryVariant === 'hero' ? <GalleryHero /> : galleryVariant === 'thumbnails' ? <GalleryThumbnails /> : <GalleryStack />)
          : (
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ width: '45%', flexShrink: 0 }}>
                {wrap('gallery', galleryVariant === 'hero' ? <GalleryHero /> : galleryVariant === 'thumbnails' ? <GalleryThumbnails /> : <GalleryStack />)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {wrap('info', infoVariant === 'compact' ? <InfoCompact /> : <InfoStacked />)}
              </div>
            </div>
          )
        }
        {isSideBySide && (
          <div style={{ marginBottom: 16 }}>
            {wrap('info', <InfoSideBySide />)}
          </div>
        )}
        <div style={{ borderTop: '1px solid var(--hp-border, #e5e7eb)', paddingTop: 16 }}>
          {wrap('reviews',
            reviewsVariant === 'summary' ? <ReviewsSummary /> :
            reviewsVariant === 'testimonials' ? <ReviewsTestimonials /> :
            <ReviewsFull />
          )}
        </div>
      </div>
    </div>
  )
}
