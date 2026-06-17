export const WEBSITE_REFERENCE_CATEGORIES = [
  'All',
  'SaaS',
  'Fintech',
  'Productivity',
  'Ecommerce',
  'Healthcare',
  'Retail',
  'Design Tools',
  'Developer',
  'Portfolio',
]

function screenshotFor(url) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=900`
}

export const WEBSITE_REFERENCES = [
  {
    id: 'linear',
    name: 'Linear',
    url: 'https://linear.app/',
    category: 'SaaS',
    screenshot: screenshotFor('https://linear.app/'),
    palette: ['#5e6ad2', '#08090a', '#f7f8f8', '#d0d6ff'],
    typographyNotes: 'Tight modern product typography with restrained UI density.',
    styleTags: ['dark UI', 'product', 'high contrast', 'minimal accent'],
    matchNotes: ['dark surface system', 'restrained accent color', 'dense product feel'],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    url: 'https://stripe.com/',
    category: 'Fintech',
    screenshot: screenshotFor('https://stripe.com/'),
    palette: ['#635bff', '#0a2540', '#f6f9fc', '#00d4ff'],
    typographyNotes: 'Clear technical hierarchy with bright but disciplined color.',
    styleTags: ['fintech', 'technical', 'trust', 'gradient accents'],
    matchNotes: ['blue-violet primary', 'technical trust cues', 'clean documentation tone'],
  },
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so/',
    category: 'Productivity',
    screenshot: screenshotFor('https://www.notion.so/'),
    palette: ['#000000', '#ffffff', '#f7f6f3', '#e03e3e'],
    typographyNotes: 'Editorial utility with simple contrast and sparse accent use.',
    styleTags: ['neutral', 'workspace', 'editorial', 'low color'],
    matchNotes: ['neutral-first palette', 'small accent moments', 'content-heavy layouts'],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    url: 'https://www.shopify.com/',
    category: 'Ecommerce',
    screenshot: screenshotFor('https://www.shopify.com/'),
    palette: ['#008060', '#004c3f', '#f3fcf4', '#111111'],
    typographyNotes: 'Commercial clarity with a grounded green brand system.',
    styleTags: ['commerce', 'green', 'merchant', 'trust'],
    matchNotes: ['commerce-friendly green', 'trustworthy dark text', 'balanced brand usage'],
  },
  {
    id: 'calm',
    name: 'Calm',
    url: 'https://www.calm.com/',
    category: 'Healthcare',
    screenshot: screenshotFor('https://www.calm.com/'),
    palette: ['#173a5e', '#88d4f2', '#f7f4ef', '#ffffff'],
    typographyNotes: 'Soft wellness language with low-stress contrast.',
    styleTags: ['wellness', 'blue', 'soft', 'calm'],
    matchNotes: ['soft blues', 'low visual noise', 'wellness-oriented tone'],
  },
  {
    id: 'apple',
    name: 'Apple',
    url: 'https://www.apple.com/',
    category: 'Retail',
    screenshot: screenshotFor('https://www.apple.com/'),
    palette: ['#000000', '#f5f5f7', '#ffffff', '#0071e3'],
    typographyNotes: 'System typography, generous spacing, and minimal blue actions.',
    styleTags: ['premium', 'minimal', 'retail', 'product'],
    matchNotes: ['premium neutral base', 'selective action blue', 'product-focused restraint'],
  },
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/',
    category: 'Design Tools',
    screenshot: screenshotFor('https://www.figma.com/'),
    palette: ['#a259ff', '#0acf83', '#1abcfe', '#ffffff'],
    typographyNotes: 'Creative product system with expressive secondary colors.',
    styleTags: ['creative', 'design tools', 'multi-color', 'collaboration'],
    matchNotes: ['colorful creative accents', 'tool-focused UI', 'collaboration energy'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com/',
    category: 'Developer',
    screenshot: screenshotFor('https://vercel.com/'),
    palette: ['#000000', '#ffffff', '#666666', '#fafafa'],
    typographyNotes: 'Developer-focused minimalism with strong contrast and sparse color.',
    styleTags: ['developer', 'minimal', 'monochrome', 'technical'],
    matchNotes: ['black-and-white foundation', 'developer credibility', 'high contrast'],
  },
  {
    id: 'superhuman',
    name: 'Superhuman',
    url: 'https://superhuman.com/',
    category: 'SaaS',
    screenshot: screenshotFor('https://superhuman.com/'),
    palette: ['#725cff', '#0b1020', '#f9fafb', '#9ee7ff'],
    typographyNotes: 'Premium productivity styling with violet action moments.',
    styleTags: ['premium SaaS', 'productivity', 'violet', 'sharp'],
    matchNotes: ['violet action color', 'premium product tone', 'dark contrast moments'],
  },
  {
    id: 'sateesh-kumar',
    name: 'Sateesh Kumar',
    url: 'https://sateeshkumar.vercel.app/',
    category: 'Portfolio',
    screenshot: screenshotFor('https://sateeshkumar.vercel.app/'),
    palette: ['#080808', '#f4f3ef', '#b7ff43', '#8a8a8a'],
    typographyNotes: 'Portfolio structure with strong intro, work sections, explorations, and contact flow.',
    styleTags: ['portfolio', 'personal brand', 'dark', 'structured sections'],
    matchNotes: ['portfolio information architecture', 'clear work-section rhythm', 'high-contrast personality'],
  },
]

export function getWebsiteReferencesByCategory(category = 'All') {
  if (category === 'All') return WEBSITE_REFERENCES
  return WEBSITE_REFERENCES.filter((reference) => reference.category === category)
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

function colorDistance(a, b) {
  const rgbA = hexToRgb(a)
  const rgbB = hexToRgb(b)
  if (!rgbA || !rgbB) return Number.POSITIVE_INFINITY
  const redMean = (rgbA.r + rgbB.r) / 2
  const redDelta = rgbA.r - rgbB.r
  const greenDelta = rgbA.g - rgbB.g
  const blueDelta = rgbA.b - rgbB.b

  return Math.sqrt(
    (2 + redMean / 256) * redDelta * redDelta +
    4 * greenDelta * greenDelta +
    (2 + (255 - redMean) / 256) * blueDelta * blueDelta
  )
}

function relativeLuminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 1
  const channels = [rgb.r, rgb.g, rgb.b].map((value) => {
    const normalized = value / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrastMood(background) {
  const luminance = relativeLuminance(background)
  if (luminance < 0.14) return 'dark'
  if (luminance > 0.78) return 'light'
  return 'balanced'
}

function nearestPaletteDistance(color, palette) {
  if (!color) return Number.POSITIVE_INFINITY
  return Math.min(...palette.map((paletteColor) => colorDistance(color, paletteColor)))
}

function distanceScore(distance, maxDistance = 520) {
  if (!Number.isFinite(distance)) return 0
  return Math.max(0, 1 - distance / maxDistance)
}

function extractColorSignal(input = {}) {
  const lightPalette = input.palette?.light || input.light || {}
  return {
    primary: input.primary || lightPalette.primary || input.palette?.primary,
    secondary: input.secondary || lightPalette.secondary || input.palette?.secondary,
    background: input.background || lightPalette.background || input.palette?.background,
    surface: input.surface || lightPalette.surface || input.palette?.surface,
    category: input.category || input.industry || 'All',
  }
}

function categoryMatches(referenceCategory, category) {
  if (!category || category === 'All' || category === 'Custom') return false
  return referenceCategory.toLowerCase() === category.toLowerCase()
}

function categoryReason(reference, category) {
  if (categoryMatches(reference.category, category)) {
    return `${reference.category} category match`
  }
  return `${reference.category} reference style`
}

export function matchWebsiteReferences(input = {}, category = 'All', limit = 5) {
  const signal = extractColorSignal(input)
  const targetCategory = category === 'All' ? signal.category : category
  const sourceMood = contrastMood(signal.background || signal.surface || '#ffffff')

  return WEBSITE_REFERENCES
    .map((reference) => {
      const primaryDistance = nearestPaletteDistance(signal.primary, reference.palette)
      const backgroundDistance = nearestPaletteDistance(signal.background || signal.surface, reference.palette)
      const referenceBackground = reference.palette[2] || reference.palette[1] || reference.palette[0]
      const referenceMood = contrastMood(referenceBackground)
      const primaryScore = distanceScore(primaryDistance) * 48
      const backgroundScore = distanceScore(backgroundDistance) * 24
      const moodScore = sourceMood === referenceMood ? 14 : 4
      const categoryScore = categoryMatches(reference.category, targetCategory) ? 14 : 0
      const score = Math.round(primaryScore + backgroundScore + moodScore + categoryScore)

      const reasons = []
      if (primaryDistance < 145) reasons.push('Similar primary/accent color')
      else if (primaryDistance < 245) reasons.push('Compatible accent direction')

      if (backgroundDistance < 115) reasons.push(`Similar ${sourceMood} foundation`)
      else if (sourceMood === referenceMood) reasons.push(`Matching ${sourceMood} contrast mood`)

      reasons.push(categoryReason(reference, targetCategory))
      if (reference.matchNotes[0]) reasons.push(reference.matchNotes[0])

      return {
        ...reference,
        score,
        reasons: reasons.slice(0, 4),
        matchDetails: {
          primaryDistance,
          backgroundDistance,
          contrastMood: referenceMood,
        },
      }
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit)
}
