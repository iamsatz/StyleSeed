import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { parseFigmaJson } from '../lib/parseFigmaJson'
import { BRAND_GUIDELINES, SUGGESTED_BRANDS } from '../lib/brandGuidelines'
import {
  generateClaudePrompt,
  generateV0Config,
  generateCursorRules,
  generateReplitPrompt,
} from '../lib/exportGenerators'
import { loadFont, loadFontRecord, loadLibraryFont } from '../lib/loadGoogleFont'
import { COLOR_USAGE_PRESETS, normalizeColorUsage } from '../lib/colorUsagePresets'
import { DEFAULT_PORTFOLIO_SECTIONS } from '../lib/portfolioPreviewOptions'
import { PREVIEW_SECTION_OPTIONS, getDefaultSections } from '../lib/previewSectionOptions'
import { getFontRecordByFamily } from '../lib/freeFontCatalog'
import { searchFontLibrary, PROVIDER_LABELS } from '../lib/fontLibrary'
import { generateScale } from '../lib/colorScale'
import { deriveInspirationUpdate } from '../lib/inspirationAdapters'
import {
  getDefaultTypography,
  normalizeTypography,
} from '../lib/typographyRoles'
import PreviewDashboard from '../components/create/previews/PreviewDashboard'
import PreviewPortfolio from '../components/create/previews/PreviewPortfolio'
import PreviewBlog from '../components/create/previews/PreviewBlog'
import PreviewEcommerceShop from '../components/create/previews/PreviewEcommerceShop'
import PreviewProductPage from '../components/create/previews/PreviewProductPage'
import PreviewPricing from '../components/create/previews/PreviewPricing'
import PreviewSignIn from '../components/create/previews/PreviewSignIn'
import PreviewSignUp from '../components/create/previews/PreviewSignUp'
import PreviewSettings from '../components/create/previews/PreviewSettings'
import PreviewProfile from '../components/create/previews/PreviewProfile'
import PreviewDocumentation from '../components/create/previews/PreviewDocumentation'
import PreviewAdminTable from '../components/create/previews/PreviewAdminTable'
import PreviewOnboarding from '../components/create/previews/PreviewOnboarding'
import PreviewRestaurant from '../components/create/previews/PreviewRestaurant'
import PreviewRealEstate from '../components/create/previews/PreviewRealEstate'
import PreviewJobBoard from '../components/create/previews/PreviewJobBoard'
import PreviewAnalytics from '../components/create/previews/PreviewAnalytics'
import PreviewError404 from '../components/create/previews/PreviewError404'
import PreviewWaitlist from '../components/create/previews/PreviewWaitlist'
import PreviewFinance from '../components/create/previews/PreviewFinance'
import PreviewHealth from '../components/create/previews/PreviewHealth'
import PreviewEducation from '../components/create/previews/PreviewEducation'
import PreviewTravel from '../components/create/previews/PreviewTravel'
import PreviewNonprofit from '../components/create/previews/PreviewNonprofit'
import SimilarWebsitesPanel from '../components/inspiration/SimilarWebsitesPanel'
import './CreatePage.css'

const PREVIEW_PAGES = [
  { id: 'components', icon: '🧩', label: 'Components', component: null },
  { id: 'saas', icon: '🚀', label: 'SaaS Landing', component: null },
  { id: 'dashboard', icon: '📊', label: 'Dashboard', component: PreviewDashboard },
  { id: 'portfolio', icon: '🎨', label: 'Portfolio', component: PreviewPortfolio },
  { id: 'blog', icon: '📝', label: 'Blog', component: PreviewBlog },
  { id: 'ecommerce', icon: '🛍', label: 'E-commerce Shop', component: PreviewEcommerceShop },
  { id: 'product', icon: '📦', label: 'Product Page', component: PreviewProductPage },
  { id: 'pricing', icon: '💳', label: 'Pricing Page', component: PreviewPricing },
  { id: 'signin', icon: '🔑', label: 'Sign-in / Auth', component: PreviewSignIn },
  { id: 'signup', icon: '📋', label: 'Sign-up Flow', component: PreviewSignUp },
  { id: 'settings', icon: '⚙️', label: 'Settings', component: PreviewSettings },
  { id: 'profile', icon: '👤', label: 'Profile', component: PreviewProfile },
  { id: 'docs', icon: '📖', label: 'Documentation', component: PreviewDocumentation },
  { id: 'admin', icon: '🗂', label: 'Admin Table', component: PreviewAdminTable },
  { id: 'onboarding', icon: '🎯', label: 'Onboarding', component: PreviewOnboarding },
  { id: 'restaurant', icon: '🍽', label: 'Restaurant / Menu', component: PreviewRestaurant },
  { id: 'realestate', icon: '🏠', label: 'Real Estate', component: PreviewRealEstate },
  { id: 'jobs', icon: '💼', label: 'Job Board', component: PreviewJobBoard },
  { id: 'analytics', icon: '📈', label: 'Analytics', component: PreviewAnalytics },
  { id: 'error', icon: '⚠️', label: '404 / Error', component: PreviewError404 },
  { id: 'waitlist', icon: '⏳', label: 'Waitlist / Coming Soon', component: PreviewWaitlist },
  { id: 'finance', icon: '🏦', label: 'Finance / Banking', component: PreviewFinance },
  { id: 'health', icon: '🩺', label: 'Healthcare Portal', component: PreviewHealth },
  { id: 'education', icon: '🎓', label: 'Education / LMS', component: PreviewEducation },
  { id: 'travel', icon: '✈️', label: 'Travel Booking', component: PreviewTravel },
  { id: 'nonprofit', icon: '💚', label: 'Nonprofit / Cause', component: PreviewNonprofit },
]

const PREVIEW_REFERENCE_CATEGORIES = {
  saas: 'SaaS',
  dashboard: 'SaaS',
  analytics: 'SaaS',
  pricing: 'SaaS',
  waitlist: 'SaaS',
  portfolio: 'Portfolio',
  docs: 'Developer',
  ecommerce: 'Ecommerce',
  product: 'Retail',
  restaurant: 'Retail',
  signin: 'Productivity',
  signup: 'Productivity',
  onboarding: 'Productivity',
  finance: 'Finance',
  health: 'Health',
  education: 'Education',
  travel: 'Travel',
  nonprofit: 'Non-profit',
}

function getPreviewReferenceCategory(previewPage) {
  return PREVIEW_REFERENCE_CATEGORIES[previewPage] || 'All'
}

const ROLES = [
  { key: 'primary', label: 'Primary', required: true, hint: 'CTAs, buttons, links' },
  { key: 'secondary', label: 'Secondary', required: false, hint: 'Auto-derived from primary' },
  { key: 'background', label: 'Background', required: true, hint: 'Page-level background' },
  { key: 'surface', label: 'Surface', required: false, hint: 'Auto-derived from background' },
  { key: 'text', label: 'Text', required: true, hint: 'Body copy, headings' },
]

const DEFAULT_COLORS = {
  primary: '#7c3aed',
  secondary: '',
  background: '#ffffff',
  surface: '',
  text: '#111827',
}

function isValidHex(val) {
  return /^#[0-9a-fA-F]{3,8}$/.test((val || '').trim())
}

function normalizeHex(val) {
  if (!val || !isValidHex(val)) return null
  let hex = val.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length > 6) {
    hex = hex.slice(0, 6)
  }
  return hex
}

function deriveSecondary(primary) {
  const hex = normalizeHex(primary)
  if (!hex) return '#a855f7'
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)
  r = Math.min(255, Math.round(r + (255 - r) * 0.25))
  g = Math.min(255, Math.round(g + (255 - g) * 0.25))
  b = Math.min(255, Math.round(b + (255 - b) * 0.25))
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function deriveSurface(background) {
  const hex = normalizeHex(background)
  if (!hex) return '#f9fafb'
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)
  const isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128
  if (isDark) {
    r = Math.min(255, r + 20)
    g = Math.min(255, g + 20)
    b = Math.min(255, b + 20)
  } else {
    r = Math.max(0, r - 12)
    g = Math.max(0, g - 10)
    b = Math.max(0, b - 8)
  }
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function buildKitFromColors(values, kitName, typography, colorUsage) {
  const primary = values.primary || '#7c3aed'
  const secondary = (values.secondary && isValidHex(values.secondary))
    ? values.secondary
    : deriveSecondary(primary)
  const background = values.background || '#ffffff'
  const surface = (values.surface && isValidHex(values.surface))
    ? values.surface
    : deriveSurface(background)
  const text = values.text || '#111827'

  const bgHex = normalizeHex(background) || 'ffffff'
  let bgR = parseInt(bgHex.slice(0, 2), 16)
  let bgG = parseInt(bgHex.slice(2, 4), 16)
  let bgB = parseInt(bgHex.slice(4, 6), 16)
  const isDark = (bgR * 299 + bgG * 587 + bgB * 114) / 1000 < 128

  const normalizedTypography = normalizeTypography(typography)

  return {
    id: 'custom',
    name: kitName || 'My Custom Kit',
    industry: 'Custom',
    description: 'Your custom brand kit.',
    typography: normalizedTypography,
    colorUsage,
    palette: {
      light: {
        background,
        surface,
        primary,
        secondary,
        accent: secondary,
        text,
        textMuted: isDark ? '#9ca3af' : '#6b7280',
        border: isDark ? '#374151' : '#e5e7eb',
        success: '#10b981',
        warning: '#f59e0b',
      },
      dark: {
        background: isDark ? background : '#111827',
        surface: isDark ? surface : '#1f2937',
        primary,
        secondary,
        accent: secondary,
        text: isDark ? text : '#f9fafb',
        textMuted: '#9ca3af',
        border: '#374151',
        success: '#34d399',
        warning: '#fcd34d',
      },
    },
  }
}

function applyKitPreviewVars(el, kit) {
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

function LivePreviewComponents({ kit }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    applyKitPreviewVars(ref.current, kit)
  }, [kit])

  if (!kit) return null

  return (
    <div className="lp-components" ref={ref}>
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
    </div>
  )
}

function LivePreviewApp({ kit }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    applyKitPreviewVars(ref.current, kit)
  }, [kit])

  if (!kit) return null

  return (
    <div className="lp-app" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Brand</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Home</a>
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link">Pricing</a>
          <a className="lp-app-nav-link">Docs</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Get Started</button>
      </nav>

      <section className="lp-app-hero">
        <div className="lp-app-hero-eyebrow">Introducing v2.0</div>
        <h1 className="lp-app-hero-h1">Build faster with your brand</h1>
        <p className="lp-app-hero-sub">
          The design system that keeps your product on-brand from day one. Every component, every token, every export — yours.
        </p>
        <div className="lp-app-hero-ctas">
          <button className="lp-btn lp-btn--primary">Start for free</button>
          <button className="lp-btn lp-btn--ghost">See demo →</button>
        </div>
      </section>

      <section className="lp-app-features">
        <div className="lp-app-feature-card">
          <div className="lp-app-feature-icon">⚡</div>
          <div className="lp-app-feature-title">Instant Tokens</div>
          <div className="lp-app-feature-body">Generate CSS variables, Tailwind configs, and more from your brand palette.</div>
        </div>
        <div className="lp-app-feature-card">
          <div className="lp-app-feature-icon">🎨</div>
          <div className="lp-app-feature-title">Live Preview</div>
          <div className="lp-app-feature-body">See every component update in real time as you pick your colors.</div>
        </div>
        <div className="lp-app-feature-card">
          <div className="lp-app-feature-icon">🤖</div>
          <div className="lp-app-feature-title">AI-Ready Export</div>
          <div className="lp-app-feature-body">Export for Claude, v0, Cursor, and Replit with a single click.</div>
        </div>
      </section>

      <footer className="lp-app-footer">
        <div className="lp-app-footer-logo">◈ Brand</div>
        <div className="lp-app-footer-copy">© 2025 Brand Inc. All rights reserved.</div>
        <div className="lp-app-footer-links">
          <a className="lp-app-footer-link">Privacy</a>
          <a className="lp-app-footer-link">Terms</a>
          <a className="lp-app-footer-link">Contact</a>
        </div>
      </footer>
    </div>
  )
}

const EXPORT_TABS = [
  { id: 'claude', label: 'Claude', filename: 'system-prompt.md', generate: generateClaudePrompt },
  { id: 'v0', label: 'v0', filename: 'tailwind.config.js', generate: generateV0Config },
  { id: 'cursor', label: 'Cursor', filename: '.cursor/rules', generate: generateCursorRules },
  { id: 'replit', label: 'Replit', filename: 'replit-prompt.md', generate: generateReplitPrompt },
]

function ExportPanel({ kit, onClose }) {
  const [activeTab, setActiveTab] = useState('claude')
  const [copied, setCopied] = useState(false)

  const tab = EXPORT_TABS.find((t) => t.id === activeTab)
  const output = tab && kit ? tab.generate(kit) : ''

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = output
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [output])

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = tab.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, tab])

  return (
    <div className="cp-export-panel">
      <div className="cp-export-header">
        <div>
          <h3 className="cp-export-title">Export for AI Tools</h3>
          <p className="cp-export-sub">Generate design token context for your AI coding assistant.</p>
        </div>
        <button className="cp-export-close" onClick={onClose} aria-label="Close export panel">✕</button>
      </div>
      <div className="cp-export-tabs">
        {EXPORT_TABS.map((t) => (
          <button
            key={t.id}
            className={`cp-export-tab ${activeTab === t.id ? 'cp-export-tab--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <pre className="cp-export-code">{output}</pre>
      <div className="cp-export-actions">
        <button className="cp-export-btn" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        <button className="cp-export-btn" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  )
}

function ColorInput({ roleKey, label, hint, required, value, onChange }) {
  const pickerRef = useRef(null)

  function handlePickerChange(e) {
    onChange(roleKey, e.target.value)
  }

  function handleTextChange(e) {
    onChange(roleKey, e.target.value)
  }

  function openPicker() {
    pickerRef.current?.click()
  }

  const valid = value && isValidHex(value)

  return (
    <div className="cp-color-row">
      <button
        className="cp-swatch-btn"
        type="button"
        onClick={openPicker}
        style={valid ? { background: value, borderColor: value } : {}}
        aria-label={`Pick color for ${label}`}
        title="Click to open color picker"
      >
        {!valid && <span className="cp-swatch-empty-icon">+</span>}
      </button>
      <input
        ref={pickerRef}
        type="color"
        className="cp-picker-hidden"
        value={valid ? value : '#7c3aed'}
        onChange={handlePickerChange}
        tabIndex={-1}
      />
      <div className="cp-color-info">
        <div className="cp-color-label-row">
          <span className="cp-color-label">{label}</span>
          {required && <span className="cp-color-required">*</span>}
          {!required && <span className="cp-color-optional">auto</span>}
        </div>
        <span className="cp-color-hint">{hint}</span>
      </div>
      <input
        type="text"
        className={`cp-hex-input ${value && !valid ? 'cp-hex-input--error' : ''}`}
        value={value}
        onChange={handleTextChange}
        placeholder="#7c3aed"
        maxLength={9}
        spellCheck={false}
      />
    </div>
  )
}



const TYPE_ROLES = [
  { key: 'displayFont', label: 'Display' },
  { key: 'headingFont', label: 'Heading' },
  { key: 'bodyFont', label: 'Body' },
  { key: 'uiFont', label: 'Action / UI' },
  { key: 'monoFont', label: 'Code' },
]

function SuggestionList({ suggestions, onSelect }) {
  if (!suggestions.length) return null
  return (
    <div className="cp-type-suggestions">
      {suggestions.map((font) => (
        <button
          key={font.family}
          type="button"
          className="cp-type-suggestion"
          onClick={() => onSelect(font)}
        >
          <span className="cp-type-suggestion-name" style={{ fontFamily: `'${font.family}', sans-serif` }}>
            {font.family}
          </span>
          <span className="cp-type-suggestion-badge">{PROVIDER_LABELS[font.provider] || font.provider}</span>
        </button>
      ))}
    </div>
  )
}

function TypographyTab({ typography, onTypographyChange }) {
  const normalized = normalizeTypography(typography)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [addingTo, setAddingTo] = useState(null) // null | 'new' | family-string
  const [pendingFont, setPendingFont] = useState(null) // { family, provider } — added but no roles yet

  useEffect(() => {
    if (query.length >= 3) {
      const results = searchFontLibrary(query, 12)
      setSuggestions(results)
      results.forEach((f) => loadLibraryFont(f))
    } else {
      setSuggestions([])
    }
  }, [query])

  function deriveCards() {
    const map = new Map()
    for (const role of TYPE_ROLES) {
      const family = normalized[role.key]
      if (!family) continue
      if (!map.has(family)) map.set(family, { family, roles: [] })
      map.get(family).roles.push(role.key)
    }
    return Array.from(map.values())
  }

  const cards = deriveCards()
  const allCards = pendingFont && !cards.find((c) => c.family === pendingFont.family)
    ? [...cards, { family: pendingFont.family, provider: pendingFont.provider, roles: [] }]
    : cards

  function emitChange(patch) {
    const next = { ...normalized, ...patch }
    // mode 'four' has no collapsing constraints in normalizeTypography,
    // so all independent role assignments are preserved.
    next.mode = 'four'
    onTypographyChange(next)
  }

  function assignRole(targetFamily, roleKey) {
    if (pendingFont?.family === targetFamily) {
      emitChange({ [roleKey]: targetFamily })
      setPendingFont(null)
    } else {
      emitChange({ [roleKey]: targetFamily })
    }
  }

  function changeFontFamily(oldFamily, newFont) {
    loadLibraryFont(newFont)
    const patch = {}
    for (const role of TYPE_ROLES) {
      if (normalized[role.key] === oldFamily) patch[role.key] = newFont.family
    }
    emitChange(patch)
    closeSearch()
  }

  function addNewTypeface(font) {
    loadLibraryFont(font)
    setPendingFont({ family: font.family, provider: font.provider })
    closeSearch()
  }

  function removeCard(family) {
    if (allCards.length <= 1) return
    if (pendingFont?.family === family) { setPendingFont(null); return }
    const card = allCards.find((c) => c.family === family)
    const remaining = allCards.filter((c) => c.family !== family)
    const fallback = remaining[0]?.family
    if (!card || !fallback) return
    const patch = {}
    for (const roleKey of card.roles) patch[roleKey] = fallback
    emitChange(patch)
  }

  function closeSearch() {
    setAddingTo(null); setQuery(''); setSuggestions([])
  }

  return (
    <div className="cp-typography-studio">
      <div className="cp-type-cards">
        {allCards.map((card) => {
          const isPending = pendingFont?.family === card.family
          return (
            <div key={card.family} className="cp-type-card">
              <div className="cp-type-card-head">
                <span className="cp-type-card-family" style={{ fontFamily: `'${card.family}', sans-serif` }}>
                  {card.family}
                </span>
                <div className="cp-type-card-meta">
                  {card.provider && (
                    <span className="cp-type-card-provider">{PROVIDER_LABELS[card.provider] || card.provider}</span>
                  )}
                  <button
                    type="button"
                    className="cp-type-card-change"
                    onClick={() => { setAddingTo(card.family); setQuery(''); setSuggestions([]) }}
                  >
                    Change
                  </button>
                  {allCards.length > 1 && (
                    <button type="button" className="cp-type-card-remove" onClick={() => removeCard(card.family)}>
                      ×
                    </button>
                  )}
                </div>
              </div>

              {isPending && (
                <p className="cp-type-card-hint">Click a role to assign this typeface:</p>
              )}

              <div className="cp-type-role-chips">
                {TYPE_ROLES.map((role) => {
                  const active = normalized[role.key] === card.family
                  return (
                    <button
                      key={role.key}
                      type="button"
                      className={`cp-type-role-chip${active ? ' cp-type-role-chip--active' : ''}`}
                      onClick={() => assignRole(card.family, role.key)}
                      title={active ? `${role.label} — click to move this role` : `Assign ${role.label} to ${card.family}`}
                    >
                      {role.label}
                    </button>
                  )
                })}
              </div>

              {addingTo === card.family && (
                <div className="cp-type-search-inline">
                  <div className="cp-type-search-row">
                    <input
                      autoFocus
                      type="search"
                      className="cp-type-search-input"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Type 3+ letters…"
                    />
                    <button type="button" className="cp-type-search-cancel" onClick={closeSearch}>Cancel</button>
                  </div>
                  <SuggestionList suggestions={suggestions} onSelect={(font) => changeFontFamily(card.family, font)} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {addingTo === 'new' ? (
        <div className="cp-type-add-search">
          <div className="cp-type-search-row">
            <input
              autoFocus
              type="search"
              className="cp-type-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fonts — type 3+ letters…"
            />
            <button type="button" className="cp-type-search-cancel" onClick={closeSearch}>Cancel</button>
          </div>
          <SuggestionList suggestions={suggestions} onSelect={addNewTypeface} />
        </div>
      ) : (
        allCards.length < 5 && (
          <button
            type="button"
            className="cp-type-add-btn"
            onClick={() => setAddingTo('new')}
          >
            + Add typeface
          </button>
        )
      )}

      <div className="cp-type-specimen">
        <div className="cp-type-display" style={{ fontFamily: `'${normalized.displayFont}', sans-serif` }}>
          Build faster with your brand
        </div>
        <div className="cp-type-heading" style={{ fontFamily: `'${normalized.headingFont}', sans-serif` }}>
          Product teams use this heading style for section hierarchy.
        </div>
        <p className="cp-type-body" style={{ fontFamily: `'${normalized.bodyFont}', sans-serif` }}>
          Body text needs a calm rhythm, useful contrast, and enough personality to carry repeated product screens.
        </p>
        <code className="cp-type-mono" style={{ fontFamily: `'${normalized.monoFont}', monospace` }}>
          --font-code: {normalized.monoFont}
        </code>
      </div>
    </div>
  )
}

function PortfolioSectionControls({ value, onChange }) {
  return (
    <div className="cp-portfolio-controls">
      <div className="cp-portfolio-controls-head">
        <div>
          <span className="cp-portfolio-controls-kicker">Portfolio structure</span>
          <strong>Section components</strong>
        </div>
        <span>Structure inspired by common designer portfolios, using HuePrint placeholder content.</span>
      </div>
      <div className="cp-portfolio-control-grid">
        {PORTFOLIO_SECTION_OPTIONS.map((section) => (
          <label key={section.key} className="cp-portfolio-control">
            <span>{section.label}</span>
            <select
              value={value[section.key] || section.variants[0].id}
              onChange={(e) => onChange(section.key, e.target.value)}
              aria-label={`${section.label} component`}
            >
              {section.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>{variant.label}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  )
}

function ColorUsageSection({ presetId, customRatios, onPresetChange, onCustomRatioChange }) {
  const selectedPreset = COLOR_USAGE_PRESETS.find((preset) => preset.id === presetId) || COLOR_USAGE_PRESETS[0]
  const ratios = presetId === 'custom' ? customRatios : selectedPreset.ratios

  return (
    <div className="cp-color-usage-section">
      <div className="cp-section-divider">
        <span className="cp-section-label">Color Usage</span>
      </div>
      <div className="cp-color-usage-note">
        HuePrint presets guide composition for AI-generated UI. They are practical usage guidance, not official fixed ratios from Material, Carbon, or Atlassian.
      </div>
      <div className="cp-usage-preset-grid">
        {COLOR_USAGE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`cp-usage-card ${presetId === preset.id ? 'cp-usage-card--active' : ''}`}
            onClick={() => onPresetChange(preset.id)}
          >
            <span className="cp-usage-card-title">{preset.label}</span>
            <span className="cp-usage-card-ratio">{preset.ratio}</span>
            <span className="cp-usage-card-fit">{preset.bestFor}</span>
            <span className="cp-usage-card-why">{preset.why}</span>
          </button>
        ))}
      </div>

      <div className="cp-usage-ratio-list">
        {ratios.map((ratio, index) => (
          <div key={`${ratio.role}-${index}`} className="cp-usage-ratio-row">
            <div className="cp-usage-ratio-info">
              <span className="cp-usage-ratio-label">{ratio.label}</span>
              <span className="cp-usage-ratio-role">{ratio.role}</span>
            </div>
            {presetId === 'custom' ? (
              <input
                className="cp-usage-ratio-input"
                type="number"
                min="0"
                max="100"
                value={ratio.percent}
                onChange={(e) => onCustomRatioChange(index, e.target.value)}
                aria-label={`${ratio.label} percentage`}
              />
            ) : (
              <span className="cp-usage-ratio-percent">{ratio.percent}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ScalePicker({ baseColor, values, onChange }) {
  const [scaleBase, setScaleBase] = useState(baseColor || '#7c3aed')
  const [selectedStep, setSelectedStep] = useState(null)

  const scale = useMemo(() => {
    if (isValidHex(scaleBase)) return generateScale(scaleBase)
    return null
  }, [scaleBase])

  const selectedHex = selectedStep !== null && scale ? scale[selectedStep] : null

  return (
    <div className="cp-scale-picker">
      <div className="cp-scale-input-row">
        <label className="cp-scale-input-label">Base color</label>
        <div className="cp-scale-input-wrap">
          {isValidHex(scaleBase) && (
            <div className="cp-scale-input-swatch" style={{ background: scaleBase }} />
          )}
          <input
            type="text"
            className={`cp-scale-input ${scaleBase && !isValidHex(scaleBase) ? 'cp-scale-input--error' : ''}`}
            value={scaleBase}
            onChange={(e) => { setScaleBase(e.target.value); setSelectedStep(null) }}
            placeholder="#7c3aed"
            maxLength={9}
            spellCheck={false}
          />
        </div>
      </div>

      {scale ? (
        <>
          <div className="cp-scale-swatches">
            {scale.map((hex, i) => (
              <button
                key={i}
                type="button"
                className={`cp-scale-swatch${selectedStep === i ? ' cp-scale-swatch--selected' : ''}`}
                style={{ background: hex }}
                onClick={() => setSelectedStep(selectedStep === i ? null : i)}
                title={`Step ${i + 1} — ${hex}`}
              />
            ))}
          </div>
          <div className="cp-scale-labels">
            {scale.map((_, i) => <span key={i}>{i + 1}</span>)}
          </div>

          {selectedHex ? (
            <div className="cp-scale-assign">
              <div className="cp-scale-assign-head">
                <div className="cp-scale-assign-swatch" style={{ background: selectedHex }} />
                <span className="cp-scale-assign-hex">{selectedHex}</span>
                <span className="cp-scale-assign-hint">Assign to role:</span>
              </div>
              <div className="cp-scale-assign-roles">
                {ROLES.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    className={`cp-scale-assign-role${values[role.key] === selectedHex ? ' cp-scale-assign-role--active' : ''}`}
                    onClick={() => { onChange(role.key, selectedHex); setSelectedStep(null) }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="cp-scale-hint">Click a step to assign it to a role.</p>
          )}
        </>
      ) : (
        <p className="cp-scale-hint">Enter a valid hex color above to generate a scale.</p>
      )}
    </div>
  )
}

function BuilderTab({
  values,
  onChange,
  colorUsagePresetId,
  customColorRatios,
  onColorUsagePresetChange,
  onCustomColorRatioChange,
}) {
  return (
    <div className="cp-builder-colors">
      {ROLES.map((role) => (
        <ColorInput
          key={role.key}
          roleKey={role.key}
          label={role.label}
          hint={role.hint}
          required={role.required}
          value={values[role.key] || ''}
          onChange={onChange}
        />
      ))}
      <ColorUsageSection
        presetId={colorUsagePresetId}
        customRatios={customColorRatios}
        onPresetChange={onColorUsagePresetChange}
        onCustomRatioChange={onCustomColorRatioChange}
      />
    </div>
  )
}

function ImportTab({ onImport }) {
  const [jsonText, setJsonText] = useState('')
  const [parseError, setParseError] = useState('')
  const [parsed, setParsed] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function handleParse() {
    if (!jsonText.trim()) {
      setParseError('Paste or drop a Figma variables JSON file.')
      return
    }
    try {
      const result = parseFigmaJson(jsonText)
      setParsed(result)
      setParseError('')
      onImport(result.palette)
    } catch (e) {
      setParseError('Could not parse JSON: ' + e.message)
      setParsed(null)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setJsonText(ev.target.result)
    reader.readAsText(file)
  }

  return (
    <div className="cp-import-tab">
      <div
        className={`cp-drop-zone ${isDragOver ? 'cp-drop-zone--active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <p className="cp-drop-hint">Drop a <code>.json</code> file here or paste below</p>
        <textarea
          className="cp-json-textarea"
          placeholder={'Paste Figma variables JSON here…\n\nExample:\n{\n  "variables": [\n    { "name": "color/primary", "value": "#7c3aed" },\n    { "name": "color/background", "value": "#ffffff" }\n  ]\n}'}
          value={jsonText}
          onChange={(e) => { setJsonText(e.target.value); setParseError(''); setParsed(null) }}
          rows={8}
        />
      </div>
      <button className="cp-parse-btn" type="button" onClick={handleParse}>Parse JSON</button>
      {parseError && <p className="cp-parse-error">{parseError}</p>}
      {parsed && (
        <div className="cp-parse-success">
          <span>✓</span> Detected {Object.keys(parsed.palette).length} color roles — live preview updated
        </div>
      )}
    </div>
  )
}

const ROLE_LABELS = {
  background: 'Background',
  surface: 'Surface',
  primary: 'Primary',
  secondary: 'Secondary',
  text: 'Text',
}

const TOKEN_GROUP_LABELS = {
  fontFamilies: 'Font families',
  fontSizes: 'Font sizes',
  radii: 'Border radius',
  shadows: 'Shadows',
  spacing: 'Spacing rhythm',
}

function TokenConfidenceBadge({ confidence }) {
  return <span className={`cp-token-confidence cp-token-confidence--${confidence || 'low'}`}>{confidence || 'low'}</span>
}

function TokenList({ title, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="cp-token-card">
      <div className="cp-token-card-title">{title}</div>
      <div className="cp-token-list">
        {items.slice(0, 6).map((item) => (
          <div className="cp-token-row" key={`${title}-${item.value}`}>
            <code>{item.value}</code>
            <span>{item.count}×</span>
            <TokenConfidenceBadge confidence={item.confidence} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ExtractedTokens({ tokens, onUseFonts }) {
  if (!tokens) return null
  const fontFamilies = tokens.typography?.fontFamilies || []
  const groups = [
    { key: 'fontFamilies', title: TOKEN_GROUP_LABELS.fontFamilies, items: fontFamilies },
    { key: 'fontSizes', title: TOKEN_GROUP_LABELS.fontSizes, items: tokens.typography?.fontSizes },
    { key: 'radii', title: TOKEN_GROUP_LABELS.radii, items: tokens.radii },
    { key: 'shadows', title: TOKEN_GROUP_LABELS.shadows, items: tokens.shadows },
    { key: 'spacing', title: TOKEN_GROUP_LABELS.spacing, items: tokens.spacing },
  ].filter((group) => group.items?.length)

  const hasButtonStyles = tokens.buttonStyles?.length > 0
  if (groups.length === 0 && !hasButtonStyles) return null

  const canApplyFonts = onUseFonts && fontFamilies.length >= 1

  function handleApplyFonts() {
    const heading = fontFamilies[0]?.value
    const body = fontFamilies[1]?.value || fontFamilies[0]?.value
    if (heading) onUseFonts({ headingFont: heading, bodyFont: body })
  }

  return (
    <div className="cp-extract-section">
      <div className="cp-extract-section-label">
        Token Suggestions <span className="cp-semantic-badge">V4.0</span>
      </div>
      {tokens.summary?.note && <p className="cp-token-note">{tokens.summary.note}</p>}
      <div className="cp-token-grid">
        {groups.map((group) => (
          <TokenList key={group.key} title={group.title} items={group.items} />
        ))}
      </div>
      {canApplyFonts && (
        <button className="cp-token-apply-fonts-btn" type="button" onClick={handleApplyFonts}>
          Apply detected fonts to kit →
        </button>
      )}
      {hasButtonStyles && (
        <div className="cp-token-card cp-token-card--wide">
          <div className="cp-token-card-title">Button styles</div>
          <div className="cp-button-token-list">
            {tokens.buttonStyles.slice(0, 3).map((button) => (
              <div className="cp-button-token" key={button.selector}>
                <div className="cp-button-token-head">
                  <code>{button.selector}</code>
                  <TokenConfidenceBadge confidence={button.confidence} />
                </div>
                <div className="cp-button-token-decls">
                  {Object.entries(button.declarations || {}).slice(0, 5).map(([name, value]) => (
                    <span key={name}>{name}: {value}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const CONFIDENCE_ICON = { high: '●', medium: '◐' }

function DetectedComponents({ components, onSuggestPreview }) {
  if (!components || !components.detected?.length) return null
  const { detected, suggestion } = components
  return (
    <div className="cp-extract-section">
      <div className="cp-extract-section-label">
        Detected Components <span className="cp-semantic-badge">V4.1</span>
      </div>
      <div className="cp-component-chips">
        {detected.map((c) => (
          <div key={c.id} className={`cp-component-chip cp-component-chip--${c.confidence}`} title={`${c.confidence} confidence`}>
            <span className="cp-component-chip-icon">{c.icon}</span>
            <span className="cp-component-chip-label">{c.label}</span>
            <span className="cp-component-chip-conf">{CONFIDENCE_ICON[c.confidence]}</span>
          </div>
        ))}
      </div>
      {suggestion && onSuggestPreview && (
        <div className="cp-component-suggestion">
          <span className="cp-component-suggestion-text">Looks like a <strong>{suggestion.label}</strong></span>
          <button className="cp-component-suggestion-btn" type="button" onClick={() => onSuggestPreview(suggestion.previewId)}>
            Switch preview →
          </button>
        </div>
      )}
    </div>
  )
}

function autoMapColors(colors) {
  if (!colors || colors.length === 0) return {}
  const mapping = {}
  const sorted = [...colors]

  function luminance(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  function saturation(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    return max === 0 ? 0 : (max - min) / max
  }

  const colorful = sorted.filter((h) => saturation(h) > 0.2)
  const light = sorted.filter((h) => luminance(h) > 0.7)
  const dark = sorted.filter((h) => luminance(h) < 0.15)

  mapping.primary = colorful[0] || sorted[0]
  mapping.background = light[0] || '#ffffff'
  mapping.text = dark[0] || '#111827'
  mapping.secondary = colorful[1] || colorful[0] || sorted[1] || sorted[0]
  mapping.surface = light[1] || light[0] || '#f9fafb'

  return mapping
}

function UrlExtractTab({ onUseColors, onApplyColorsOnly, onUseTypography, onSuggestPreview, onGenerateKit, onSwitchToColorPicker }) {
  const [urlInput, setUrlInput] = useState('')
  const [status, setStatus] = useState('idle')
  const [extractedColors, setExtractedColors] = useState([])
  const [semantic, setSemantic] = useState({})
  const [extractedTokens, setExtractedTokens] = useState(null)
  const [extractedComponents, setExtractedComponents] = useState(null)
  const [domain, setDomain] = useState('')
  const [accessMode, setAccessMode] = useState('public')
  const [roleMapping, setRoleMapping] = useState({})
  const [selectedRole, setSelectedRole] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [errorAlternatives, setErrorAlternatives] = useState([])
  const [privateNetworkBlocked, setPrivateNetworkBlocked] = useState(false)
  const abortRef = useRef(null)

  const brandSuggestion = urlInput.trim().toLowerCase().replace(/\s+/g, '')
  const matchedBrand = Object.keys(BRAND_GUIDELINES).find((b) => b === brandSuggestion)
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : ''
  const isLocalHuePrint = currentHost === 'localhost' || currentHost === '127.0.0.1' || currentHost === '0.0.0.0'

  async function handleExtractWithUrl(targetUrl) {
    const url = (targetUrl || urlInput).trim()
    if (!url) return
    setStatus('loading')
    setErrorMsg('')
    setErrorAlternatives([])
    setPrivateNetworkBlocked(false)
    setExtractedColors([])
    setSemantic({})
    setExtractedTokens(null)
    setExtractedComponents(null)
    setRoleMapping({})
    setSelectedRole(null)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const resp = await fetch('/api/extract-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      })
      const data = await resp.json()
      if (data.error) {
        setErrorMsg(data.message)
        setErrorAlternatives(data.alternatives || [])
        setPrivateNetworkBlocked(Boolean(data.privateNetworkBlocked))
        setStatus('error')
      } else {
        setExtractedColors(data.colors || [])
        setSemantic(data.semantic || {})
        setExtractedTokens(data.tokens || null)
        setExtractedComponents(data.components || null)
        setDomain(data.domain || url)
        setAccessMode(data.accessMode || 'public')
        setRoleMapping(autoMapColors(data.colors || []))
        setStatus('success')
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('idle')
      } else {
        setErrorMsg('Something went wrong. Please try again.')
        setStatus('error')
      }
    }
  }

  function handleExtract() {
    handleExtractWithUrl(urlInput)
  }

  function handleCancel() {
    abortRef.current?.abort()
    setStatus('idle')
  }

  function handleReset() {
    setStatus('idle')
    setUrlInput('')
    setExtractedColors([])
    setSemantic({})
    setExtractedTokens(null)
    setExtractedComponents(null)
    setRoleMapping({})
    setSelectedRole(null)
    setAccessMode('public')
    setErrorMsg('')
    setErrorAlternatives([])
    setPrivateNetworkBlocked(false)
  }

  function handleRoleMappingSwatchClick(role) {
    setSelectedRole(selectedRole === role ? null : role)
  }

  function handleUse() {
    // Use the dedicated "colors only" callback if provided so the extract panel
    // stays open; otherwise fall back to the full onUseColors which may close it.
    if (onApplyColorsOnly) {
      onApplyColorsOnly(roleMapping)
    } else {
      onUseColors(roleMapping)
    }
  }

  function handleGenerateKit() {
    onUseColors(roleMapping)
    if (onUseTypography && extractedTokens) {
      const families = extractedTokens.typography?.fontFamilies || []
      if (families.length >= 1) {
        const heading = families[0]?.value
        const body = (families[1]?.value || families[0]?.value)
        if (heading) onUseTypography({ headingFont: heading, bodyFont: body })
      }
    }
    if (onSuggestPreview && extractedComponents?.suggestion) {
      onSuggestPreview(extractedComponents.suggestion.previewId)
    }
    // Always name the kit from whatever domain/URL we have, so the "name +
    // switch to manual" transition can't half-apply when `domain` is empty.
    if (onGenerateKit) {
      onGenerateKit(domain || urlInput)
    }
  }

  function handleBrandChip(brand) {
    const url = BRAND_GUIDELINES[brand]
    setUrlInput(url)
    handleExtractWithUrl(url)
  }

  function handleMatchedBrandClick() {
    const url = BRAND_GUIDELINES[matchedBrand]
    setUrlInput(url)
    handleExtractWithUrl(url)
  }

  const displayDomain = domain || urlInput

  return (
    <div className="cp-extract-tab cp-url-extract-tab">
      {status === 'idle' && (
        <>
          <div className="cp-url-input-wrap">
            <input
              className="cp-url-input"
              type="text"
              placeholder="Paste a URL, brand name or app name"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && urlInput.trim() && handleExtract()}
              autoComplete="off"
              spellCheck={false}
            />
            {matchedBrand && (
              <button className="cp-url-brand-suggestion" onClick={handleMatchedBrandClick}>
                Use {matchedBrand.charAt(0).toUpperCase() + matchedBrand.slice(1)}'s brand guidelines →
              </button>
            )}
          </div>
          <button
            className="cp-url-extract-btn"
            type="button"
            disabled={!urlInput.trim()}
            onClick={handleExtract}
          >
            Extract Colors & Tokens →
          </button>
          <div className={`cp-url-devmode ${isLocalHuePrint ? 'cp-url-devmode--local' : ''}`}>
            <strong>{isLocalHuePrint ? 'Local developer mode' : 'Hosted/public mode'}</strong>
            <span>
              {isLocalHuePrint
                ? 'Localhost, 127.0.0.1, and private LAN URLs are allowed while HuePrint runs locally.'
                : 'Hosted HuePrint can only extract public websites. Localhost and private LAN URLs stay blocked.'}
            </span>
          </div>
          {!isLocalHuePrint && (
            <div className="cp-url-alternatives">
              <span className="cp-url-alternatives-title">For local apps</span>
              <ul>
                <li>Paste a deployed URL from Vercel, Netlify, Replit, or similar.</li>
                <li>Use an HTTPS tunnel URL from your local development server.</li>
                <li>HTML/CSS upload is planned for offline local projects.</li>
              </ul>
            </div>
          )}
          <div className="cp-url-brands">
            <span className="cp-url-brands-label">Or try a brand</span>
            <div className="cp-url-brand-chips">
              {SUGGESTED_BRANDS.map((brand) => (
                <button
                  key={brand}
                  className="cp-url-brand-chip"
                  type="button"
                  onClick={() => handleBrandChip(brand)}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {status === 'loading' && (
        <div className="cp-url-loading">
          <div className="cp-url-spinner" />
          <p className="cp-url-loading-text">Fetching colors from <strong>{(() => { try { return new URL(urlInput.trim().startsWith('http') ? urlInput.trim() : 'https://' + urlInput.trim()).hostname } catch { return urlInput.trim() } })()}</strong>...</p>
          <button className="cp-url-cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {status === 'error' && (
        <div className="cp-url-error">
          <div className="cp-url-error-icon">⚠️</div>
          <p className="cp-url-error-title">We couldn't extract colors from this URL.</p>
          <p className="cp-url-error-sub">{errorMsg}</p>
          {privateNetworkBlocked && (
            <div className="cp-url-blocked-help">
              <strong>Hosted HuePrint cannot reach your machine-local app.</strong>
              <span>Try one of these instead:</span>
              <ul>
                {(errorAlternatives.length > 0 ? errorAlternatives : [
                  { id: 'deployed-url', label: 'Use a deployed URL', description: 'Deploy the app and paste its public URL.' },
                  { id: 'tunnel-url', label: 'Use a temporary tunnel', description: 'Expose your local app with an HTTPS tunnel URL.' },
                  { id: 'html-css-upload', label: 'HTML/CSS upload', description: 'A future HuePrint flow will inspect uploaded local files.' },
                ]).map((item) => (
                  <li key={item.id}>
                    <b>{item.label}</b>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="cp-url-error-actions">
            <button className="cp-url-try-again-btn" type="button" onClick={handleReset}>Try another URL</button>
            <button className="cp-url-picker-btn" type="button" onClick={onSwitchToColorPicker}>Use Color Picker instead</button>
          </div>
        </div>
      )}

      {status === 'success' && (
        <>
          <div className="cp-extract-section">
            <div className="cp-url-success-header">
              <span className="cp-url-success-count">
                Found {extractedColors.length} colors from <strong>{displayDomain}</strong>
                {accessMode === 'local-dev' && <em>Local dev</em>}
              </span>
              <button className="cp-url-reset-link" onClick={handleReset}>Try another URL</button>
            </div>
            <div className="cp-extract-swatches">
              {extractedColors.map((hex) => (
                <button
                  key={hex}
                  className={`cp-extract-swatch ${selectedRole ? 'cp-extract-swatch--selectable' : ''}`}
                  style={{ background: hex }}
                  title={selectedRole ? `Assign ${hex} to ${ROLE_LABELS[selectedRole]}` : hex}
                  onClick={() => {
                    if (selectedRole) {
                      setRoleMapping((prev) => ({ ...prev, [selectedRole]: hex }))
                      setSelectedRole(null)
                    }
                  }}
                />
              ))}
            </div>
            {selectedRole && (
              <p className="cp-extract-pick-hint">Click a swatch above to assign it to <strong>{ROLE_LABELS[selectedRole]}</strong></p>
            )}
          </div>

          {Object.keys(semantic).length > 0 && (
            <div className="cp-extract-section">
              <div className="cp-extract-section-label">
                Semantic CSS Variables <span className="cp-semantic-badge">Semantic</span>
              </div>
              <div className="cp-semantic-vars">
                {Object.entries(semantic).slice(0, 8).map(([name, value]) => (
                  <div key={name} className="cp-semantic-var-row">
                    <div className="cp-semantic-var-swatch" style={{ background: value }} />
                    <code className="cp-semantic-var-name">--{name}</code>
                    <span className="cp-semantic-var-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DetectedComponents components={extractedComponents} onSuggestPreview={onSuggestPreview} />
          <ExtractedTokens tokens={extractedTokens} onUseFonts={onUseTypography} />

          <div className="cp-extract-section">
            <div className="cp-extract-section-label">Role Mapping</div>
            <div className="cp-extract-roles">
              {Object.entries(ROLE_LABELS).map(([role, label]) => {
                const hex = roleMapping[role]
                const isActive = selectedRole === role
                return (
                  <div
                    key={role}
                    className={`cp-extract-role-row ${isActive ? 'cp-extract-role-row--active' : ''}`}
                    onClick={() => handleRoleMappingSwatchClick(role)}
                    title={`Click to reassign ${label}`}
                  >
                    <div
                      className="cp-extract-role-swatch"
                      style={hex ? { background: hex } : { background: '#e5e7eb' }}
                    />
                    <div className="cp-extract-role-info">
                      <span className="cp-extract-role-label">{label}</span>
                      <span className="cp-extract-role-hex">{hex || '—'}</span>
                    </div>
                    <span className="cp-extract-role-edit">✏</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="cp-generate-kit-wrap">
            <div className="cp-generate-kit-preview">
              {Object.entries(ROLE_LABELS).map(([role, label]) => {
                const hex = roleMapping[role]
                if (!hex) return null
                return <div key={role} className="cp-generate-kit-swatch" style={{ background: hex }} title={label} />
              })}
            </div>
            <button className="cp-generate-kit-btn" type="button" onClick={handleGenerateKit}>
              {domain ? `Generate Kit from ${domain} →` : 'Generate Kit →'}
            </button>
            <button className="cp-apply-colors-only-btn" type="button" onClick={handleUse}>
              Apply colors only
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('build')
  const [colorInputMode, setColorInputMode] = useState('manual')
  const [colorPickerSubTab, setColorPickerSubTab] = useState('custom')
  const [previewPage, setPreviewPage] = useState('components')
  const [rightTab, setRightTab] = useState('preview')
  const [values, setValues] = useState({ ...DEFAULT_COLORS })
  const [kitName, setKitName] = useState('')
  const [showExport, setShowExport] = useState(false)
  const [typography, setTypography] = useState(() => getDefaultTypography())
  const [pageSections, setPageSections] = useState(() => {
    const state = { portfolio: { ...DEFAULT_PORTFOLIO_SECTIONS } }
    Object.keys(PREVIEW_SECTION_OPTIONS).forEach((id) => {
      state[id] = getDefaultSections(id)
    })
    return state
  })
  const [colorUsagePresetId, setColorUsagePresetId] = useState('classic-balance')
  const [customColorRatios, setCustomColorRatios] = useState(() => (
    COLOR_USAGE_PRESETS.find((preset) => preset.id === 'custom')?.ratios || []
  ))
  const [appliedInspiration, setAppliedInspiration] = useState(null)

  const selectedTypography = normalizeTypography(typography)
  const selectedColorUsage = normalizeColorUsage(colorUsagePresetId, customColorRatios)
  const referenceCategory = getPreviewReferenceCategory(previewPage)

  useEffect(() => {
    const fonts = [
      selectedTypography.displayFont,
      selectedTypography.headingFont,
      selectedTypography.bodyFont,
      selectedTypography.monoFont,
    ]
    Array.from(new Set(fonts.filter(Boolean))).forEach((font) => {
      const record = getFontRecordByFamily(font)
      if (record) {
        loadFontRecord(record)
      } else {
        loadFont(font)
      }
    })
  }, [selectedTypography])

  const hasRequiredColors = isValidHex(values.primary) && isValidHex(values.background) && isValidHex(values.text)
  const baseKit = hasRequiredColors ? buildKitFromColors(values, kitName, selectedTypography, selectedColorUsage) : null
  const kit = baseKit && appliedInspiration
    ? { ...baseKit, inspiration: appliedInspiration }
    : baseKit

  function handleColorChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  function handleImport(palette) {
    // Only overwrite roles the palette actually provides; keep the user's
    // current value for any unmapped role rather than resetting to defaults.
    setValues((prev) => {
      const next = { ...prev }
      for (const role of ROLES) {
        if (palette[role.key]) next[role.key] = palette[role.key]
      }
      return next
    })
    setActiveTab('build')
  }

  function handleApplyInspiration(reference) {
    const update = deriveInspirationUpdate(reference, values)
    setValues((prev) => ({ ...prev, ...update.colors }))
    setTypography(update.typography)
    setColorUsagePresetId(update.colorUsagePresetId)
    setPreviewPage(update.previewPage)
    setAppliedInspiration(update.summary)
    setActiveTab('build')
  }

  function handleTypographyChange(nextTypography) {
    setTypography(normalizeTypography(nextTypography))
  }

  function handleColorUsagePresetChange(id) {
    setColorUsagePresetId(id)
  }

  function handleCustomColorRatioChange(index, percent) {
    setCustomColorRatios((prev) => prev.map((ratio, i) => (
      i === index ? { ...ratio, percent } : ratio
    )))
  }

  function handleSectionChange(previewId, sectionKey, variantId) {
    setPageSections((prev) => ({
      ...prev,
      [previewId]: { ...prev[previewId], [sectionKey]: variantId },
    }))
  }

  return (
    <div className="cp-page">
      <div className="cp-layout">
        <div className="cp-left">
          <div className="cp-left-header">
            <Link to="/" className="cp-back">← Back</Link>
            <h1 className="cp-title">Build Your Kit</h1>
            <p className="cp-subtitle">Pick colors and see your UI update live.</p>
          </div>

          <div className="cp-tabs">
            <button
              className={`cp-tab ${activeTab === 'build' ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab('build')}
              type="button"
            >
              Color Picker
            </button>
            <button
              className={`cp-tab ${activeTab === 'typography' ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab('typography')}
              type="button"
            >
              Typography
            </button>
            <button
              className={`cp-tab ${activeTab === 'import' ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab('import')}
              type="button"
            >
              Import JSON
            </button>
          </div>

          <div className="cp-left-body">
            {activeTab === 'build' ? (
              colorInputMode === 'extract' ? (
                <UrlExtractTab
                  onUseColors={(data) => { handleImport(data); setColorInputMode('manual') }}
                  onApplyColorsOnly={(data) => { handleImport(data) }}
                  onUseTypography={(fonts) => {
                    setTypography((prev) => {
                      // In modes where displayFont is a distinct role ('three'/'four'),
                      // it keeps the stale value unless we reset it. If it was tracking
                      // headingFont (not customized), update it with the new heading.
                      const displayWasTracking = !prev.displayFont || prev.displayFont === prev.headingFont
                      return normalizeTypography({
                        ...prev,
                        ...(displayWasTracking && fonts.headingFont ? { displayFont: fonts.headingFont } : {}),
                        ...fonts,
                      })
                    })
                  }}
                  onSuggestPreview={(previewId) => setPreviewPage(previewId)}
                  onGenerateKit={(name) => { setKitName(name); setColorInputMode('manual') }}
                  onSwitchToColorPicker={() => setColorInputMode('manual')}
                />
              ) : (
                <>
                  <div className="cp-kit-name-row">
                    <label className="cp-kit-name-label">Kit Name</label>
                    <input
                      className="cp-kit-name-input"
                      type="text"
                      placeholder="My Brand Kit"
                      value={kitName}
                      onChange={(e) => setKitName(e.target.value)}
                    />
                  </div>
                  <button
                    className="cp-extract-from-url-btn"
                    type="button"
                    onClick={() => setColorInputMode('extract')}
                  >
                    ↗ Extract from URL
                  </button>
                  <div className="cp-color-subtabs">
                    <button
                      type="button"
                      className={`cp-color-subtab${colorPickerSubTab === 'custom' ? ' cp-color-subtab--active' : ''}`}
                      onClick={() => setColorPickerSubTab('custom')}
                    >
                      Custom
                    </button>
                    <button
                      type="button"
                      className={`cp-color-subtab${colorPickerSubTab === 'scale' ? ' cp-color-subtab--active' : ''}`}
                      onClick={() => setColorPickerSubTab('scale')}
                    >
                      Auto Scale
                    </button>
                  </div>
                  {colorPickerSubTab === 'scale' ? (
                    <ScalePicker
                      baseColor={values.primary}
                      values={values}
                      onChange={handleColorChange}
                    />
                  ) : (
                    <BuilderTab
                      values={values}
                      onChange={handleColorChange}
                      colorUsagePresetId={colorUsagePresetId}
                      customColorRatios={customColorRatios}
                      onColorUsagePresetChange={handleColorUsagePresetChange}
                      onCustomColorRatioChange={handleCustomColorRatioChange}
                    />
                  )}
                </>
              )
            ) : activeTab === 'typography' ? (
              <TypographyTab
                typography={selectedTypography}
                onTypographyChange={handleTypographyChange}
              />
            ) : (
              <ImportTab onImport={handleImport} />
            )}
          </div>

          <div className="cp-left-footer">
            {showExport && kit ? (
              <ExportPanel kit={kit} onClose={() => setShowExport(false)} />
            ) : (
              <button
                className="cp-save-btn"
                type="button"
                onClick={() => setShowExport(true)}
                disabled={!hasRequiredColors}
                title={!hasRequiredColors ? 'Set Primary, Background, and Text colors first' : ''}
              >
                Save &amp; Export
              </button>
            )}
          </div>
        </div>

        <div className="cp-right">
          <div className="cp-right-tabs cp-tabs">
            <button
              className={`cp-tab ${rightTab === 'preview' ? 'cp-tab--active' : ''}`}
              onClick={() => setRightTab('preview')}
              type="button"
            >
              Preview
            </button>
            <button
              className={`cp-tab ${rightTab === 'inspirations' ? 'cp-tab--active' : ''}`}
              onClick={() => setRightTab('inspirations')}
              type="button"
            >
              Inspirations
            </button>
          </div>

          {rightTab === 'preview' ? (
            <>
              <div className="cp-preview-header">
                <div className="cp-preview-dropdown-wrap">
                  <select
                    className="cp-preview-dropdown"
                    value={previewPage}
                    onChange={(e) => setPreviewPage(e.target.value)}
                    aria-label="Select preview page type"
                  >
                    {PREVIEW_PAGES.map((p) => (
                      <option key={p.id} value={p.id}>{p.icon} {p.label}</option>
                    ))}
                  </select>
                </div>
                {!hasRequiredColors && (
                  <span className="cp-preview-hint">Set Primary, Background &amp; Text to see preview</span>
                )}
              </div>
              <div className={`cp-preview-body${previewPage === 'components' || previewPage === 'saas' ? ' cp-preview-body--padded' : ''}`}>
                {!hasRequiredColors ? (
                  <div className="cp-preview-empty">
                    <div className="cp-preview-empty-icon">🎨</div>
                    <p>Set your Primary, Background, and Text colors to see a live preview of your kit.</p>
                  </div>
                ) : previewPage === 'components' ? (
                  <LivePreviewComponents kit={kit} />
                ) : previewPage === 'saas' ? (
                  <LivePreviewApp kit={kit} />
                ) : previewPage === 'portfolio' ? (
                  <PreviewPortfolio
                    kit={kit}
                    sectionConfig={pageSections.portfolio || {}}
                    onSectionChange={(key, val) => handleSectionChange('portfolio', key, val)}
                  />
                ) : (() => {
                  const page = PREVIEW_PAGES.find((p) => p.id === previewPage)
                  const PageComponent = page?.component
                  return PageComponent ? (
                    <PageComponent
                      kit={kit}
                      sectionConfig={pageSections[previewPage] || {}}
                      onSectionChange={(key, val) => handleSectionChange(previewPage, key, val)}
                    />
                  ) : null
                })()}
              </div>
            </>
          ) : (
            <div className="cp-inspirations-tab">
              {!hasRequiredColors ? (
                <div className="cp-preview-empty">
                  <div className="cp-preview-empty-icon">✨</div>
                  <p>Set your Primary, Background, and Text colors to discover real websites that match your palette.</p>
                </div>
              ) : (
                <>
                  <SimilarWebsitesPanel
                    kit={kit}
                    category={referenceCategory}
                    title="Inspirations"
                    description="Real websites ranked by your palette, contrast mood, and the selected preview type."
                    limit={8}
                    variant="preview"
                    onUseReference={handleApplyInspiration}
                  />
                  {appliedInspiration && (
                    <div className="cp-inspiration-applied">
                      <strong>Inspired by {appliedInspiration.sourceName}</strong>
                      <span>{appliedInspiration.note}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
