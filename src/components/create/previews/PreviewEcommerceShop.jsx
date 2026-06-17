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

const PRODUCTS = [
  { name: 'Leather Tote Bag', price: '$129', original: '$159', emoji: '👜', badge: 'Sale', rating: '★★★★☆', reviews: 42 },
  { name: 'Wireless Headphones', price: '$89', original: null, emoji: '🎧', badge: null, rating: '★★★★★', reviews: 128 },
  { name: 'Running Sneakers', price: '$110', original: null, emoji: '👟', badge: 'New', rating: '★★★★☆', reviews: 67 },
  { name: 'Analog Watch', price: '$249', original: null, emoji: '⌚', badge: null, rating: '★★★★★', reviews: 31 },
  { name: 'Aviator Sunglasses', price: '$65', original: null, emoji: '🕶️', badge: null, rating: '★★★★☆', reviews: 55 },
  { name: 'Canvas Backpack', price: '$74', original: '$90', emoji: '🎒', badge: 'Sale', rating: '★★★★★', reviews: 88 },
  { name: 'Linen Blazer', price: '$195', original: null, emoji: '🧥', badge: 'New', rating: '★★★★☆', reviews: 19 },
  { name: 'Ceramic Mug Set', price: '$38', original: '$48', emoji: '☕', badge: 'Sale', rating: '★★★★★', reviews: 204 },
]

const CATEGORIES = [
  { name: 'Bags & Accessories', count: 24, emoji: '👜' },
  { name: 'Electronics', count: 18, emoji: '🎧' },
  { name: 'Footwear', count: 31, emoji: '👟' },
  { name: 'Clothing', count: 45, emoji: '🧥' },
]

function ShopNav() {
  return (
    <nav style={{ background: 'var(--hp-background, #fff)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 46, flexShrink: 0 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)', marginRight: 8 }}>◈ Shop</div>
      {['All', 'Bags', 'Tech', 'Apparel', 'Accessories'].map((item, i) => (
        <div key={item} style={{ fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)', cursor: 'pointer', borderBottom: i === 0 ? '2px solid var(--hp-primary, #7c3aed)' : '2px solid transparent', padding: '2px 0' }}>{item}</div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input style={{ padding: '4px 10px', fontSize: '0.75rem', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-text, #111827)', width: 120 }} placeholder="Search…" readOnly />
        <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-surface, #f9fafb)', fontSize: '0.75rem', color: 'var(--hp-text, #111827)', cursor: 'pointer' }}>🛒 Cart (2)</button>
      </div>
    </nav>
  )
}

function BannerPromo() {
  return (
    <div style={{ background: `linear-gradient(135deg, var(--hp-primary, #7c3aed) 0%, var(--hp-secondary, #a855f7) 100%)`, padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Limited time offer</div>
        <h2 style={{ margin: '0 0 6px', fontSize: '1.375rem', fontWeight: 900, color: '#fff', lineHeight: 1.15, fontFamily: 'var(--hp-heading-font)' }}>Up to 40% off<br />summer essentials</h2>
        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>Free shipping on orders over $75. Ends Sunday.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '7px 16px', borderRadius: 6, border: 'none', background: '#fff', color: 'var(--hp-primary, #7c3aed)', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer' }}>Shop the sale</button>
          <button style={{ padding: '7px 16px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#fff', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>View all</button>
        </div>
      </div>
      <div style={{ fontSize: '4rem', opacity: 0.5 }}>🏷️</div>
    </div>
  )
}

function BannerCategories() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', padding: '14px 20px' }}>
      <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-textMuted, #9ca3af)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Browse categories</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.name} style={{ background: 'var(--hp-background, #fff)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', borderTop: i === 0 ? '2px solid var(--hp-primary, #7c3aed)' : '2px solid transparent' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: 4 }}>{cat.emoji}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)', lineHeight: 1.2 }}>{cat.name}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 2 }}>{cat.count} items</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BannerSale() {
  return (
    <div style={{ background: 'var(--hp-warning, #f59e0b)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: '1.25rem' }}>🏷️</div>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#000', lineHeight: 1 }}>Summer Sale — Up to 40% off</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.65)', marginTop: 2 }}>Free shipping on orders over $75 · Ends Sunday</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#000' }}>Ends in: <span style={{ fontVariantNumeric: 'tabular-nums' }}>02:14:38</span></div>
        <button style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: '#000', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Shop now</button>
      </div>
    </div>
  )
}

function FiltersChips() {
  return (
    <div style={{ padding: '10px 20px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', fontWeight: 600, marginRight: 4 }}>Filter:</span>
      {['All Items', 'Under $100', '$100–$200', 'Sale', 'New Arrivals', 'Top Rated'].map((chip, i) => (
        <button key={chip} style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 500, cursor: 'pointer', border: i === 0 ? 'none' : '1px solid var(--hp-border, #e5e7eb)', background: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-background, #fff)', color: i === 0 ? '#fff' : 'var(--hp-textMuted, #6b7280)' }}>{chip}</button>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>48 products</span>
        <select style={{ padding: '3px 8px', fontSize: '0.75rem', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-background, #fff)', color: 'var(--hp-text, #111827)' }}>
          <option>Sort: Featured</option>
          <option>Price: Low–High</option>
          <option>Best sellers</option>
        </select>
      </div>
    </div>
  )
}

function FiltersSidebarFilters({ products, gridCols }) {
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      <div style={{ width: 150, background: 'var(--hp-surface, #f9fafb)', borderRight: '1px solid var(--hp-border, #e5e7eb)', padding: '12px', flexShrink: 0 }}>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted, #9ca3af)', marginBottom: 10 }}>Filters</div>
        {[
          { label: 'Category', opts: ['All', 'Bags', 'Tech', 'Apparel'] },
          { label: 'Price range', opts: ['Under $50', '$50–$100', '$100–$200', '$200+'] },
          { label: 'Rating', opts: ['★★★★★', '★★★★+', 'Any'] },
        ].map((group) => (
          <div key={group.label} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 5 }}>{group.label}</div>
            {group.opts.map((opt, i) => (
              <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 0' }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, border: `2px solid ${i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-border, #d1d5db)'}`, background: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'transparent', flexShrink: 0 }} />
                <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #6b7280)' }}>{opt}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '12px', minWidth: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: 8 }}>
          {products.slice(0, gridCols * 2).map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FiltersDropdown() {
  return (
    <div style={{ padding: '10px 20px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', fontWeight: 600 }}>Filter by:</span>
      {['Category', 'Price', 'Brand', 'Rating', 'Availability'].map((label) => (
        <select key={label} style={{ padding: '4px 8px', fontSize: '0.75rem', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-background, #fff)', color: 'var(--hp-text, #111827)' }}>
          <option>{label}</option>
        </select>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>48 products</span>
        <select style={{ padding: '4px 8px', fontSize: '0.75rem', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-background, #fff)', color: 'var(--hp-text, #111827)' }}>
          <option>Sort: Featured</option>
        </select>
      </div>
    </div>
  )
}

function ProductCard({ product: p }) {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
      {p.badge && (
        <div style={{ position: 'absolute', top: 6, left: 6, padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: p.badge === 'Sale' ? 'var(--hp-warning, #f59e0b)' : 'var(--hp-success, #059669)', color: '#fff', zIndex: 1 }}>{p.badge}</div>
      )}
      <div style={{ height: 72, background: 'var(--hp-background, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>{p.emoji}</div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 3, lineHeight: 1.2 }}>{p.name}</div>
        <div style={{ fontSize: '0.6rem', color: 'var(--hp-warning, #f59e0b)', marginBottom: 4 }}>{p.rating} <span style={{ color: 'var(--hp-textMuted, #9ca3af)' }}>({p.reviews})</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)' }}>{p.price}</span>
          {p.original && <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)', textDecoration: 'line-through' }}>{p.original}</span>}
        </div>
        <button style={{ width: '100%', padding: '4px 0', borderRadius: 6, border: 'none', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}>Add to cart</button>
      </div>
    </div>
  )
}

function ProductListRow({ product: p }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--hp-border, #e5e7eb)', alignItems: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: 8, background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{p.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 3 }}>{p.name}</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #6b7280)', marginBottom: 4 }}>Free shipping · In stock</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--hp-warning, #f59e0b)' }}>{p.rating}</span>
          <span style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted, #9ca3af)' }}>({p.reviews} reviews)</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)', marginBottom: p.original ? 0 : 6 }}>{p.price}</div>
        {p.original && <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', textDecoration: 'line-through', marginBottom: 4 }}>{p.original}</div>}
        <button style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Add to cart</button>
      </div>
    </div>
  )
}

export default function PreviewEcommerceShop({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('ecommerce')
  const defaults = getDefaultSections('ecommerce')
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

  const bannerVariant = config.banner
  const filtersVariant = config.filters
  const productsVariant = config.products

  const gridCols = productsVariant === 'four-col' ? 4 : 3
  const isList = productsVariant === 'list'
  const isSidebarFilters = filtersVariant === 'sidebar-filters'

  return (
    <div className="lp-page" ref={ref} style={{ display: 'flex', flexDirection: 'column', background: 'var(--hp-background, #fff)' }}>
      <ShopNav />
      {wrap('banner',
        bannerVariant === 'categories' ? <BannerCategories /> :
        bannerVariant === 'sale' ? <BannerSale /> :
        <BannerPromo />
      )}
      {isSidebarFilters
        ? wrap('filters', null)
        : wrap('filters',
            filtersVariant === 'dropdown' ? <FiltersDropdown /> : <FiltersChips />
          )
      }
      {isSidebarFilters
        ? wrap('products',
            <FiltersSidebarFilters products={PRODUCTS} gridCols={gridCols} />
          )
        : (
          <div style={{ padding: '14px 20px', background: 'var(--hp-background, #fff)' }}>
            {wrap('products',
              isList
                ? <div>{PRODUCTS.map((p, i) => <ProductListRow key={i} product={p} />)}</div>
                : <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: 10 }}>
                    {PRODUCTS.slice(0, gridCols === 4 ? 8 : 6).map((p, i) => <ProductCard key={i} product={p} />)}
                  </div>
            )}
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button style={{ padding: '6px 20px', borderRadius: 6, border: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.8125rem', cursor: 'pointer' }}>Load more products</button>
            </div>
          </div>
        )
      }
    </div>
  )
}
