import { normalizeTypography } from './typographyRoles.js'

const TYPOGRAPHY_BY_CATEGORY = {
  SaaS: {
    mode: 'four',
    displayFont: 'Satoshi',
    headingFont: 'Satoshi',
    bodyFont: 'General Sans',
    monoFont: 'Geist Mono',
  },
  Fintech: {
    mode: 'four',
    displayFont: 'IBM Plex Sans',
    headingFont: 'IBM Plex Sans',
    bodyFont: 'Inter',
    monoFont: 'IBM Plex Mono',
  },
  Productivity: {
    mode: 'four',
    displayFont: 'Manrope',
    headingFont: 'Manrope',
    bodyFont: 'Inter',
    monoFont: 'Roboto Mono',
  },
  Ecommerce: {
    mode: 'three',
    displayFont: 'Outfit',
    headingFont: 'Outfit',
    bodyFont: 'DM Sans',
    monoFont: 'Roboto Mono',
  },
  Healthcare: {
    mode: 'three',
    displayFont: 'Nunito',
    headingFont: 'Nunito',
    bodyFont: 'Open Sans',
    monoFont: 'Source Code Pro',
  },
  Retail: {
    mode: 'three',
    displayFont: 'Outfit',
    headingFont: 'Outfit',
    bodyFont: 'DM Sans',
    monoFont: 'Roboto Mono',
  },
  'Design Tools': {
    mode: 'four',
    displayFont: 'Cabinet Grotesk',
    headingFont: 'Cabinet Grotesk',
    bodyFont: 'DM Sans',
    monoFont: 'Geist Mono',
  },
  Developer: {
    mode: 'four',
    displayFont: 'Geist',
    headingFont: 'Geist',
    bodyFont: 'Inter',
    monoFont: 'Geist Mono',
  },
  Portfolio: {
    mode: 'four',
    displayFont: 'Clash Display',
    headingFont: 'Satoshi',
    bodyFont: 'General Sans',
    monoFont: 'Geist Mono',
  },
}

const COLOR_USAGE_BY_CATEGORY = {
  SaaS: 'enterprise-neutral',
  Fintech: 'enterprise-neutral',
  Productivity: 'product-workflow',
  Ecommerce: 'marketing-bold',
  Healthcare: 'classic-balance',
  Retail: 'marketing-bold',
  'Design Tools': 'marketing-bold',
  Developer: 'enterprise-neutral',
  Portfolio: 'marketing-bold',
}

const PREVIEW_BY_CATEGORY = {
  SaaS: 'saas',
  Fintech: 'pricing',
  Productivity: 'dashboard',
  Ecommerce: 'ecommerce',
  Healthcare: 'saas',
  Retail: 'product',
  'Design Tools': 'saas',
  Developer: 'docs',
  Portfolio: 'portfolio',
}

function normalizeHex(hex) {
  if (typeof hex !== 'string') return null
  const raw = hex.trim().replace('#', '')
  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    return raw.split('').map((char) => char + char).join('').toLowerCase()
  }
  if (/^[0-9a-fA-F]{6}$/.test(raw)) return raw.toLowerCase()
  return null
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b]
    .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0'))
    .join('')
}

function mixHex(a, b, amount = 0.85) {
  const rgbA = hexToRgb(a)
  const rgbB = hexToRgb(b)
  if (!rgbA && !rgbB) return '#7c3aed'
  if (!rgbA) return rgbToHex(rgbB)
  if (!rgbB) return rgbToHex(rgbA)

  return rgbToHex({
    r: rgbA.r * amount + rgbB.r * (1 - amount),
    g: rgbA.g * amount + rgbB.g * (1 - amount),
    b: rgbA.b * amount + rgbB.b * (1 - amount),
  })
}

function luminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 1
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 255000
}

function nudgeHex(hex, seed = 0) {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#7c3aed'
  const delta = (seed % 2 === 0) ? 6 : -6
  return rgbToHex({
    r: rgb.r + delta,
    g: rgb.g + (delta > 0 ? -3 : 4),
    b: rgb.b + (delta > 0 ? 5 : -4),
  })
}

function adaptColor(referenceColor, fallback, amount, seed) {
  return nudgeHex(mixHex(referenceColor, fallback, amount), seed)
}

function findByLuminance(palette, direction) {
  const sorted = [...palette].sort((a, b) => luminance(a) - luminance(b))
  return direction === 'light' ? sorted[sorted.length - 1] : sorted[0]
}

function colorfulness(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  return Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)
}

function findBrandColor(palette) {
  const colorful = palette
    .filter((hex) => {
      const value = luminance(hex)
      return colorfulness(hex) > 35 && value > 0.05 && value < 0.92
    })
    .sort((a, b) => colorfulness(b) - colorfulness(a))

  return colorful[0] || palette[0] || '#7c3aed'
}

function hasDarkDirection(reference) {
  const tags = [...(reference.styleTags || []), ...(reference.matchNotes || [])].join(' ').toLowerCase()
  return /\bdark\b|high contrast|monochrome/.test(tags)
}

export function deriveInspirationUpdate(reference, currentValues = {}) {
  const palette = reference?.palette || []
  const primaryReference = findBrandColor(palette)
  const secondaryReference = palette.find((hex) => hex !== primaryReference && colorfulness(hex) > 20) || palette[3] || palette[1] || primaryReference
  const lightReference = findByLuminance(palette, 'light') || '#ffffff'
  const darkReference = findByLuminance(palette, 'dark') || '#111827'
  const darkDirection = hasDarkDirection(reference)

  const background = darkDirection
    ? adaptColor(darkReference, currentValues.background || '#111827', 0.84, reference.id.length)
    : adaptColor(lightReference, currentValues.background || '#ffffff', 0.86, reference.id.length)

  const surfaceFallback = darkDirection ? '#1f2937' : '#f9fafb'
  const surfaceReference = darkDirection ? palette[1] || darkReference : palette[2] || lightReference
  const text = darkDirection
    ? '#f9fafb'
    : adaptColor(darkReference, currentValues.text || '#111827', 0.72, reference.name.length)

  return {
    colors: {
      primary: adaptColor(primaryReference, currentValues.primary || '#7c3aed', 0.82, reference.name.length),
      secondary: adaptColor(secondaryReference, currentValues.secondary || primaryReference, 0.74, reference.id.length),
      background,
      surface: adaptColor(surfaceReference, currentValues.surface || surfaceFallback, 0.74, reference.category.length),
      text,
    },
    typography: normalizeTypography(TYPOGRAPHY_BY_CATEGORY[reference.category] || TYPOGRAPHY_BY_CATEGORY.SaaS),
    colorUsagePresetId: COLOR_USAGE_BY_CATEGORY[reference.category] || 'classic-balance',
    previewPage: PREVIEW_BY_CATEGORY[reference.category] || 'components',
    summary: {
      sourceName: reference.name,
      category: reference.category,
      styleTags: reference.styleTags || [],
      matchNotes: reference.matchNotes || [],
      note: 'Palette and type suggestions were adapted from reference metadata without copying site text, assets, or exact layouts.',
    },
  }
}
