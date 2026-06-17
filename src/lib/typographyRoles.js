import { FONT_PAIRS, getDefaultPair } from './fontPairs.js'
import { FREE_FONT_CATALOG } from './freeFontCatalog.js'

export const TYPOGRAPHY_MODES = [
  {
    id: 'single',
    label: 'Single Font System',
    roleCount: 1,
    bestFor: 'MVPs, dashboards, utility apps',
    why: 'One family keeps the product consistent and easy to implement.',
  },
  {
    id: 'two',
    label: 'Two-Font Pair',
    roleCount: 2,
    bestFor: 'Most websites and SaaS products',
    why: 'Separates heading character from body readability without adding much complexity.',
  },
  {
    id: 'three',
    label: 'Three-Font Brand System',
    roleCount: 3,
    bestFor: 'Marketing sites, portfolios, editorial products',
    why: 'Adds a display role for hero and brand moments while keeping headings and body readable.',
  },
  {
    id: 'four',
    label: 'Four-Font Product System',
    roleCount: 4,
    bestFor: 'Mature products, docs, developer tools',
    why: 'Supports display, heading, body, and mono/UI roles for richer products with code or data.',
  },
]

export const TYPOGRAPHY_ROLES = [
  { key: 'displayFont', label: 'Display', hint: 'Hero and brand moments', minMode: 3 },
  { key: 'headingFont', label: 'Heading', hint: 'Page and section headings', minMode: 1 },
  { key: 'bodyFont', label: 'Body', hint: 'Paragraphs, forms, and UI copy', minMode: 2 },
  { key: 'monoFont', label: 'UI / Mono', hint: 'Code, data, and compact labels', minMode: 4 },
]

export const MONO_FONT_OPTIONS = [
  'JetBrains Mono',
  'IBM Plex Mono',
  'Roboto Mono',
  'Fira Code',
  'Source Code Pro',
  'Space Mono',
]

export const TYPOGRAPHY_PRESETS = [
  {
    id: 'product-neutral',
    label: 'Product Neutral',
    displayFont: 'Plus Jakarta Sans',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
  },
  {
    id: 'editorial-brand',
    label: 'Editorial Brand',
    displayFont: 'Playfair Display',
    headingFont: 'Playfair Display',
    bodyFont: 'Lora',
    monoFont: 'JetBrains Mono',
  },
  {
    id: 'technical-docs',
    label: 'Technical Docs',
    displayFont: 'Space Grotesk',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
  },
  {
    id: 'friendly-commerce',
    label: 'Friendly Commerce',
    displayFont: 'Outfit',
    headingFont: 'Outfit',
    bodyFont: 'DM Sans',
    monoFont: 'Roboto Mono',
  },
]

export function getFontOptions() {
  const names = new Set()
  FONT_PAIRS.forEach((pair) => {
    names.add(pair.heading)
    names.add(pair.body)
  })
  MONO_FONT_OPTIONS.forEach((font) => names.add(font))
  FREE_FONT_CATALOG.forEach((font) => names.add(font.family))
  return Array.from(names).sort((a, b) => a.localeCompare(b))
}

export function getDefaultTypography() {
  const pair = getDefaultPair()
  return {
    mode: 'two',
    displayFont: pair.heading,
    headingFont: pair.heading,
    bodyFont: pair.body,
    monoFont: 'JetBrains Mono',
    baseFontSize: '16px',
    lineHeight: '1.6',
    roles: {
      hero: 'displayFont',
      headings: 'headingFont',
      body: 'bodyFont',
      ui: 'bodyFont',
      code: 'monoFont',
    },
  }
}

export function normalizeTypography(input = getDefaultTypography()) {
  const mode = TYPOGRAPHY_MODES.find((item) => item.id === input.mode)?.id || 'two'
  let displayFont = input.displayFont || input.headingFont || 'Inter'
  let headingFont = input.headingFont || displayFont || 'Inter'
  let bodyFont = input.bodyFont || headingFont || 'Inter'
  let monoFont = input.monoFont || 'JetBrains Mono'

  if (mode === 'single') {
    bodyFont = headingFont
    displayFont = headingFont
    monoFont = headingFont
  }

  if (mode === 'two') {
    displayFont = headingFont
    monoFont = 'JetBrains Mono'
  }

  if (mode === 'three') {
    monoFont = input.monoFont || 'JetBrains Mono'
  }

  return {
    mode,
    displayFont,
    headingFont,
    bodyFont,
    monoFont,
    baseFontSize: input.baseFontSize || '16px',
    lineHeight: input.lineHeight || '1.6',
    roles: {
      hero: 'displayFont',
      headings: 'headingFont',
      body: 'bodyFont',
      ui: mode === 'four' ? 'bodyFont' : 'bodyFont',
      code: 'monoFont',
      ...(input.roles || {}),
    },
  }
}
