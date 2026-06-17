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

const POSTS = [
  { title: 'Getting Started with Design Tokens', date: 'Apr 3, 2025', tag: 'Design', author: 'Maya Chen', readTime: '5 min', emoji: '🎨', excerpt: 'A foundational guide to naming, grouping, and applying design tokens in modern product teams.' },
  { title: 'How to Build a Color System from Scratch', date: 'Mar 21, 2025', tag: 'Tutorial', author: 'Alex Park', readTime: '8 min', emoji: '🔤', excerpt: 'Start with primitives, define semantics, and ship a color system your whole team can maintain.' },
  { title: 'Typography Hierarchy That Actually Works', date: 'Mar 10, 2025', tag: 'Typography', author: 'Sam Rivera', readTime: '6 min', emoji: '🛠️', excerpt: 'The practical approach to type scales, pairing, and responsive sizing without endless debate.' },
]
const TAGS = ['Design', 'Tutorial', 'Typography', 'Systems', 'Color', 'Tokens']
const RECENT = ['Design token architecture', 'Figma variables deep dive', 'Semantic spacing systems']

function BlogNav() {
  return (
    <nav style={{ background: 'var(--hp-background, #fff)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 46, flexShrink: 0 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary, #7c3aed)', marginRight: 8 }}>◈ Blog</div>
      {['Articles', 'Topics', 'Newsletter', 'About'].map((item, i) => (
        <div key={item} style={{ fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)', cursor: 'pointer' }}>{item}</div>
      ))}
      <input style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: '0.75rem', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 6, background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-text, #111827)', width: 130 }} placeholder="Search articles…" readOnly />
    </nav>
  )
}

function HeaderHero() {
  return (
    <div style={{ background: 'var(--hp-primary, #7c3aed)', padding: '32px 24px 28px', textAlign: 'center' }}>
      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Design & Development</div>
      <h1 style={{ margin: '0 0 10px', fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1.15, fontFamily: 'var(--hp-heading-font)' }}>Thoughts on craft,<br />design & code</h1>
      <p style={{ margin: '0 0 16px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>In-depth articles on design systems, typography, color theory, and developer workflows.</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['All', 'Design', 'Tutorial', 'Typography', 'Systems'].map((tag, i) => (
          <button key={tag} style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: i === 0 ? '#fff' : 'rgba(255,255,255,0.18)', color: i === 0 ? 'var(--hp-primary, #7c3aed)' : '#fff' }}>{tag}</button>
        ))}
      </div>
    </div>
  )
}

function HeaderMasthead() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', borderBottom: '2px solid var(--hp-text, #111827)', padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900, color: 'var(--hp-text, #111827)', letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'var(--hp-heading-font)' }}>The Design Brief</h1>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Vol. 12 · Apr 2025</div>
      </div>
      <div style={{ height: 2, background: 'var(--hp-text, #111827)', marginBottom: 10 }} />
      <div style={{ display: 'flex', gap: 12 }}>
        {['All Topics', 'Design', 'Tutorial', 'Typography', 'Systems'].map((tag, i) => (
          <div key={tag} style={{ fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--hp-text, #111827)' : 'var(--hp-textMuted, #6b7280)', cursor: 'pointer', borderBottom: i === 0 ? '2px solid var(--hp-primary, #7c3aed)' : '2px solid transparent', paddingBottom: 2 }}>{tag}</div>
        ))}
      </div>
    </div>
  )
}

function HeaderFeatured() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>
      <div style={{ background: 'var(--hp-text, #111827)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-primary, #a78bfa)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Featured story</div>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 800, color: '#fff', lineHeight: 1.25, fontFamily: 'var(--hp-heading-font)' }}>The Complete Guide to Design Token Architecture</h2>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>Maya Chen · Apr 10 · 12 min read</div>
      </div>
      <div style={{ padding: '20px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 10 }}>Latest</div>
        {POSTS.slice(0, 3).map((p, i) => (
          <div key={i} style={{ padding: '6px 0', borderBottom: i < 2 ? '1px solid var(--hp-border, #e5e7eb)' : 'none' }}>
            <div style={{ fontSize: '0.625rem', color: 'var(--hp-primary, #7c3aed)', fontWeight: 600, marginBottom: 2 }}>{p.tag}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)', lineHeight: 1.3 }}>{p.title}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 2 }}>{p.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GridThreeCol() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {POSTS.map((post, i) => (
        <div key={i} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ height: 72, background: 'var(--hp-primary, #7c3aed)', opacity: 0.15 + i * 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{post.emoji}</div>
          <div style={{ padding: '10px 12px' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
              <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: 'rgba(124,58,237,0.1)', color: 'var(--hp-primary, #7c3aed)' }}>{post.tag}</span>
              <span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{post.readTime} read</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text, #111827)', lineHeight: 1.3, marginBottom: 6, fontFamily: 'var(--hp-heading-font)' }}>{post.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5, marginBottom: 8 }}>{post.excerpt}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{post.author}</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-primary, #7c3aed)', fontWeight: 600, cursor: 'pointer' }}>Read →</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function GridFeaturedList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ height: 110, background: 'var(--hp-primary, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', opacity: 0.9 }}>✍️</div>
        <div style={{ padding: '12px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: 'var(--hp-primary, #7c3aed)', color: '#fff' }}>Featured</span>
            <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: 'rgba(124,58,237,0.1)', color: 'var(--hp-primary, #7c3aed)' }}>Design</span>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1.25, marginBottom: 6, fontFamily: 'var(--hp-heading-font)' }}>The Complete Guide to Design Token Architecture</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5 }}>A deep dive into how top companies structure their design tokens — from naming conventions to multi-brand theming.</div>
          <div style={{ marginTop: 10, fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Maya Chen · Apr 10 · 12 min read</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {POSTS.map((post, i) => (
          <div key={i} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--hp-primary, #7c3aed)', opacity: 0.2 + i * 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{post.emoji}</div>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-primary, #7c3aed)', fontWeight: 600, marginBottom: 2 }}>{post.tag}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)', lineHeight: 1.3 }}>{post.title}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 2 }}>{post.author} · {post.readTime} read</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GridMagazine() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
      <div>
        <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ height: 100, background: `linear-gradient(135deg, var(--hp-primary, #7c3aed), var(--hp-secondary, #a855f7))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>✍️</div>
          <div style={{ padding: '12px' }}>
            <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-primary, #7c3aed)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Cover Story · Design</div>
            <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--hp-text, #111827)', lineHeight: 1.25, marginBottom: 6, fontFamily: 'var(--hp-heading-font)' }}>The Complete Guide to Design Token Architecture</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5 }}>A deep dive into how top companies structure their design tokens — from naming conventions to multi-brand theming strategies.</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {POSTS.slice(0, 2).map((post, i) => (
            <div key={i} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '10px' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-primary, #7c3aed)', fontWeight: 600, marginBottom: 3 }}>{post.tag}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text, #111827)', lineHeight: 1.3 }}>{post.title}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 4 }}>{post.readTime} read</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted, #9ca3af)', padding: '0 0 6px', borderBottom: '2px solid var(--hp-text, #111827)', marginBottom: 8 }}>Editor's picks</div>
        {[...POSTS, { title: 'Semantic spacing systems', date: 'Feb 18, 2025', tag: 'Systems', author: 'Priya N.', readTime: '7 min' }].map((post, i) => (
          <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>
            <div style={{ fontSize: '0.625rem', color: 'var(--hp-primary, #7c3aed)', fontWeight: 600, marginBottom: 1 }}>{post.tag}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)', lineHeight: 1.3 }}>{post.title}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 2 }}>{post.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarTagsRecent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 8 }}>Topics</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {TAGS.map((tag) => (
            <span key={tag} style={{ padding: '2px 8px', borderRadius: 20, fontSize: '0.6875rem', background: 'var(--hp-background, #fff)', border: '1px solid var(--hp-border, #e5e7eb)', color: 'var(--hp-textMuted, #6b7280)', cursor: 'pointer' }}>{tag}</span>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '12px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 8 }}>Recent articles</div>
        {RECENT.map((title, i) => (
          <div key={i} style={{ padding: '5px 0', borderBottom: i < RECENT.length - 1 ? '1px solid var(--hp-border, #e5e7eb)' : 'none', fontSize: '0.75rem', color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer', lineHeight: 1.4 }}>{title}</div>
        ))}
      </div>
    </div>
  )
}

function SidebarNewsletter() {
  return (
    <div style={{ background: `linear-gradient(135deg, var(--hp-primary, #7c3aed), var(--hp-secondary, #a855f7))`, borderRadius: 8, padding: '16px 14px', textAlign: 'center' }}>
      <div style={{ fontSize: '1rem', marginBottom: 6 }}>📬</div>
      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fff', marginBottom: 4, fontFamily: 'var(--hp-heading-font)' }}>Stay in the loop</div>
      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginBottom: 12 }}>Weekly articles on design, systems, and craft. No spam.</div>
      <input style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: 'none', fontSize: '0.75rem', marginBottom: 8, boxSizing: 'border-box' }} placeholder="your@email.com" readOnly />
      <button style={{ width: '100%', padding: '6px 0', borderRadius: 6, border: 'none', background: '#fff', color: 'var(--hp-primary, #7c3aed)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Subscribe free</button>
      <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>Join 4,200+ subscribers</div>
    </div>
  )
}

function SidebarAuthor() {
  return (
    <div style={{ background: 'var(--hp-surface, #f9fafb)', border: '1px solid var(--hp-border, #e5e7eb)', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: '#fff', fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>MC</div>
      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-text, #111827)', marginBottom: 2 }}>Maya Chen</div>
      <div style={{ fontSize: '0.6875rem', color: 'var(--hp-primary, #7c3aed)', fontWeight: 600, marginBottom: 8 }}>Design systems lead</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', lineHeight: 1.5, marginBottom: 10 }}>Writing about design tokens, color theory, and the craft of scalable systems. 10+ years in product design.</div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {['Twitter', 'LinkedIn', 'Portfolio'].map((link) => (
          <span key={link} style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--hp-border, #e5e7eb)', color: 'var(--hp-textMuted, #6b7280)', cursor: 'pointer' }}>{link}</span>
        ))}
      </div>
    </div>
  )
}

export default function PreviewBlog({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('blog')
  const defaults = getDefaultSections('blog')
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

  const headerVariant = config.header
  const gridVariant = config.grid
  const sidebarVariant = config.sidebar

  return (
    <div className="lp-page" ref={ref} style={{ display: 'flex', flexDirection: 'column', background: 'var(--hp-background, #fff)' }}>
      <BlogNav />
      {wrap('header',
        headerVariant === 'masthead' ? <HeaderMasthead /> :
        headerVariant === 'featured' ? <HeaderFeatured /> :
        <HeaderHero />
      )}
      <div style={{ display: 'flex', gap: 16, padding: '16px 20px', flex: 1 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {wrap('grid',
            gridVariant === 'featured-list' ? <GridFeaturedList /> :
            gridVariant === 'magazine' ? <GridMagazine /> :
            <GridThreeCol />
          )}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button style={{ padding: '6px 20px', borderRadius: 6, border: '1px solid var(--hp-border, #e5e7eb)', background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.8125rem', cursor: 'pointer' }}>Load more articles</button>
          </div>
        </div>
        <div style={{ width: 180, flexShrink: 0 }}>
          {wrap('sidebar',
            sidebarVariant === 'newsletter' ? <SidebarNewsletter /> :
            sidebarVariant === 'author' ? <SidebarAuthor /> :
            <SidebarTagsRecent />
          )}
        </div>
      </div>
    </div>
  )
}
