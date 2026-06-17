import { GOOGLE_FONT_CATALOG } from './googleFontsCatalog.js'

export const FONT_PROVIDERS = [
  { id: 'all', label: 'All sources' },
  { id: 'google', label: 'Google Fonts' },
  { id: 'curated', label: 'Curated free fonts' },
]

export const CURATED_FREE_FONT_CATALOG = [
  {
    family: 'Satoshi',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'sans-serif',
    popularity: 'rising',
    styles: 10,
    variable: true,
    license: 'Free for personal and commercial use where available',
    recommendedUse: 'Contemporary product branding, SaaS UI, and editorial headings',
    cssEmbedUrl: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap',
    tags: ['modern', 'product', 'brand', 'ui'],
  },
  {
    family: 'Clash Display',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'display',
    popularity: 'rising',
    styles: 6,
    variable: false,
    license: 'Free for personal and commercial use where available',
    recommendedUse: 'Expressive display headlines and portfolio hero sections',
    cssEmbedUrl: 'https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap',
    tags: ['display', 'creative', 'portfolio', 'bold'],
  },
  {
    family: 'General Sans',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'sans-serif',
    popularity: 'rising',
    styles: 12,
    variable: true,
    license: 'Free for personal and commercial use where available',
    recommendedUse: 'Neutral brand systems, body text, and interface typography',
    cssEmbedUrl: 'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
    tags: ['neutral', 'brand', 'body', 'ui'],
  },
  {
    family: 'Cabinet Grotesk',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'sans-serif',
    popularity: 'specialized',
    styles: 8,
    variable: false,
    license: 'Free for personal and commercial use where available',
    recommendedUse: 'Creative portfolios, agencies, and editorial product pages',
    cssEmbedUrl: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap',
    tags: ['creative', 'portfolio', 'editorial', 'heading'],
  },
  {
    family: 'Switzer',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'sans-serif',
    popularity: 'rising',
    styles: 18,
    variable: true,
    license: 'Free for personal and commercial use where available',
    recommendedUse: 'Swiss-inspired interfaces, dashboards, and quiet B2B products',
    cssEmbedUrl: 'https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap',
    tags: ['swiss', 'dashboard', 'enterprise', 'ui'],
  },
  {
    family: 'Bricolage Grotesque',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'display',
    popularity: 'specialized',
    styles: 8,
    variable: true,
    license: 'Open Font License',
    recommendedUse: 'Friendly display systems, education, creator brands, and playful SaaS',
    cssEmbedUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap',
    tags: ['playful', 'display', 'education', 'creator'],
  },
  {
    family: 'Geist',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'sans-serif',
    popularity: 'rising',
    styles: 9,
    variable: true,
    license: 'Open Font License',
    recommendedUse: 'Developer products, dashboards, docs, and minimal SaaS',
    cssEmbedUrl: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap',
    tags: ['developer', 'minimal', 'docs', 'product'],
  },
  {
    family: 'Geist Mono',
    provider: 'curated',
    providerLabel: 'Curated free fonts',
    category: 'monospace',
    popularity: 'rising',
    styles: 9,
    variable: true,
    license: 'Open Font License',
    recommendedUse: 'Code, data tables, technical labels, and developer documentation',
    cssEmbedUrl: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap',
    tags: ['mono', 'developer', 'code', 'data'],
  },
]

export const FREE_FONT_CATALOG = [
  ...GOOGLE_FONT_CATALOG.map((font) => ({
    ...font,
    provider: 'google',
    providerLabel: 'Google Fonts',
    license: 'Open Font License',
    recommendedUse: font.tags.join(', '),
    cssEmbedUrl: `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:wght@400;500;600;700;800&display=swap`,
  })),
  ...CURATED_FREE_FONT_CATALOG,
]

export function getFontRecordByFamily(family) {
  return FREE_FONT_CATALOG.find((font) => font.family === family)
}

export function searchFreeFonts({
  query = '',
  provider = 'all',
  category = 'all',
  popularity = 'all',
  minStyles = 0,
  variableOnly = false,
} = {}) {
  const q = query.trim().toLowerCase()
  return FREE_FONT_CATALOG.filter((font) => {
    const text = [
      font.family,
      font.providerLabel,
      font.category,
      font.popularity,
      font.license,
      font.recommendedUse,
      ...font.tags,
    ].join(' ').toLowerCase()
    if (q && !text.includes(q)) return false
    if (provider !== 'all' && font.provider !== provider) return false
    if (category !== 'all' && font.category !== category) return false
    if (popularity !== 'all' && font.popularity !== popularity) return false
    if (Number(minStyles) > 0 && font.styles < Number(minStyles)) return false
    if (variableOnly && !font.variable) return false
    return true
  })
}
