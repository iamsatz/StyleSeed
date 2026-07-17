const FETCH_TIMEOUT_MS = 5000
const MAX_CSS_FILES = 5

const PRIVATE_IP_RE = /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|169\.254\.|::1$|fc00:|fd|fe80:)/i

function getUrlAccessMode(options = {}) {
  return options.allowPrivateNetwork ? 'local-dev' : 'public'
}

function privateUrlMessage(accessMode) {
  if (accessMode === 'local-dev') {
    return 'This local URL is only allowed while StyleSeed is running in local developer mode.'
  }
  return 'This URL points to localhost or a private network. Hosted StyleSeed can only extract public websites.'
}

function hostedLocalAlternatives() {
  return [
    {
      id: 'deployed-url',
      label: 'Use a deployed URL',
      description: 'Deploy the app to Vercel, Netlify, Replit, or another public host and paste that public URL.',
    },
    {
      id: 'tunnel-url',
      label: 'Use a temporary tunnel',
      description: 'Expose your local app with a tunnel URL, then paste the HTTPS tunnel address.',
    },
    {
      id: 'html-css-upload',
      label: 'HTML/CSS upload',
      description: 'A future StyleSeed flow will inspect uploaded local files without needing network access.',
    },
  ]
}

function isLocalHostname(hostname) {
  const normalized = hostname.replace(/^\[|\]$/g, '')
  return normalized === 'localhost' || normalized === '0.0.0.0' || normalized.endsWith('.localhost')
}

function isPrivateAddress(hostname) {
  const normalized = hostname.replace(/^\[|\]$/g, '')
  return isLocalHostname(normalized) || PRIVATE_IP_RE.test(normalized)
}

async function validateUrlAccess(urlStr, options = {}) {
  const accessMode = getUrlAccessMode(options)
  let parsed
  try {
    parsed = new URL(urlStr)
  } catch {
    return { allowed: false, accessMode, reason: 'invalid' }
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { allowed: false, accessMode, reason: 'protocol' }
  }

  const hostname = parsed.hostname.toLowerCase()
  if (isPrivateAddress(hostname)) {
    return {
      allowed: Boolean(options.allowPrivateNetwork),
      accessMode,
      reason: 'private-host',
      isPrivateNetwork: true,
    }
  }

  try {
    const dns = (await import('dns')).default.promises
    const addresses = await dns.resolve4(hostname).catch(() => [])
    const v6 = await dns.resolve6(hostname).catch(() => [])
    const all = [...addresses, ...v6]
    for (const addr of all) {
      if (isPrivateAddress(addr)) {
        return {
          allowed: Boolean(options.allowPrivateNetwork),
          accessMode,
          reason: 'private-resolution',
          isPrivateNetwork: true,
        }
      }
    }
  } catch {}

  return { allowed: true, accessMode, reason: 'public', isPrivateNetwork: false }
}

function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer))
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

function hslToHex(h, s, l) {
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return '#' + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('')
}

function extractColorsFromCss(cssText) {
  const colors = {}
  const hexRe = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g
  let m
  while ((m = hexRe.exec(cssText)) !== null) {
    const raw = m[0]
    const hex = raw.length === 4
      ? '#' + raw[1] + raw[1] + raw[2] + raw[2] + raw[3] + raw[3]
      : raw.toLowerCase()
    colors[hex] = (colors[hex] || 0) + 1
  }
  const rgbRe = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/gi
  while ((m = rgbRe.exec(cssText)) !== null) {
    const r = parseInt(m[1])
    const g = parseInt(m[2])
    const b = parseInt(m[3])
    if (r > 255 || g > 255 || b > 255) continue
    const hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
    colors[hex] = (colors[hex] || 0) + 1
  }
  const hslRe = /hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/gi
  while ((m = hslRe.exec(cssText)) !== null) {
    const h = parseInt(m[1]) / 360
    const s = parseInt(m[2]) / 100
    const l = parseInt(m[3]) / 100
    const hex = hslToHex(h, s, l)
    if (hex) colors[hex] = (colors[hex] || 0) + 1
  }
  return colors
}

function extractSemanticVars(cssText) {
  const semanticKeywords = ['primary', 'secondary', 'brand', 'accent', 'background', 'surface', 'text', 'foreground']
  const varRe = /--([\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|hsl\([^)]+\))/gi
  const semantic = {}
  let m
  while ((m = varRe.exec(cssText)) !== null) {
    const name = m[1].toLowerCase()
    const value = m[2]
    if (semanticKeywords.some((kw) => name.includes(kw))) {
      semantic[name] = value
    }
  }
  return semantic
}

function confidenceFromCount(count, high = 8, medium = 3) {
  if (count >= high) return 'high'
  if (count >= medium) return 'medium'
  return 'low'
}

function increment(map, value) {
  const normalized = String(value || '').trim().replace(/\s+/g, ' ')
  if (!normalized) return
  map[normalized] = (map[normalized] || 0) + 1
}

function topEntries(map, limit, high, medium) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({
      value,
      count,
      confidence: confidenceFromCount(count, high, medium),
    }))
}

function stripCssComments(cssText) {
  return cssText.replace(/\/\*[\s\S]*?\*\//g, '')
}

function extractFontFamilies(cssText) {
  const fonts = {}
  const familyRe = /font-family\s*:\s*([^;{}]+)/gi
  let match
  while ((match = familyRe.exec(cssText)) !== null) {
    const stack = match[1].trim()
    const firstFamily = stack
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .find((item) => item && !/^(inherit|initial|unset|var\()/i.test(item))
    if (firstFamily) increment(fonts, firstFamily)
  }

  // Capture each @font-face block body first (no nested braces), then read its
  // font-family — avoids the catastrophic backtracking of a single lazy regex.
  const faceRe = /@font-face\s*\{([^{}]*)\}/gi
  while ((match = faceRe.exec(cssText)) !== null) {
    const familyMatch = /font-family\s*:\s*([^;{}]+)/i.exec(match[1])
    if (!familyMatch) continue
    const family = familyMatch[1].trim().replace(/^['"]|['"]$/g, '')
    increment(fonts, family)
  }

  return topEntries(fonts, 6, 8, 3)
}

function extractDeclarationValues(cssText, propertyPattern, valuePattern, limit, high, medium) {
  const values = {}
  const declarationRe = new RegExp(`${propertyPattern}\\s*:\\s*(${valuePattern})`, 'gi')
  let match
  while ((match = declarationRe.exec(cssText)) !== null) {
    increment(values, match[1])
  }
  return topEntries(values, limit, high, medium)
}

function extractSpacingTokens(cssText) {
  const spacing = {}
  const spacingRe = /\b(?:margin|padding|gap|row-gap|column-gap)\s*:\s*([^;{}]+)/gi
  let match
  while ((match = spacingRe.exec(cssText)) !== null) {
    // Dedup within a single declaration so `padding: 10px 20px 10px 20px`
    // counts each unique value once, not by number of shorthand sides.
    const seen = new Set()
    match[1].trim().split(/\s+/).forEach((value) => {
      if (/^-?\d*\.?\d+(px|rem|em|%)$/.test(value) && !seen.has(value)) {
        seen.add(value)
        increment(spacing, value)
      }
    })
  }
  return topEntries(spacing, 8, 12, 4)
}

function extractButtonStyles(cssText) {
  const cleaned = stripCssComments(cssText)
  const buttonBlocks = []
  const blockRe = /([^{}]+)\{([^{}]+)\}/g
  let match
  while ((match = blockRe.exec(cleaned)) !== null) {
    const selector = match[1].trim()
    const body = match[2]
    if (!/(^|[\s.,:#>+~[])(button|\.btn|\.button|\.cta|\.primary|button\[)/i.test(selector)) continue

    const declarations = {}
    const declarationRe = /\b(background(?:-color)?|color|border(?:-color|-radius)?|font-weight|padding|box-shadow)\s*:\s*([^;{}]+)/gi
    let dm
    while ((dm = declarationRe.exec(body)) !== null) {
      declarations[dm[1].toLowerCase()] = dm[2].trim().replace(/\s+/g, ' ')
    }

    if (Object.keys(declarations).length >= 2) {
      buttonBlocks.push({
        selector: selector.slice(0, 100),
        declarations,
        confidence: selector.includes('button') || /\.btn|\.button/i.test(selector) ? 'high' : 'medium',
      })
    }
  }

  return buttonBlocks.slice(0, 4)
}

function extractDesignTokens(cssText) {
  const cleaned = stripCssComments(cssText)
  const lengthValue = '-?\\d*\\.?\\d+(?:px|rem|em|%)|clamp\\([^;{}]+\\)'
  const shadowLength = '(?:0|-?\\d*\\.?\\d+(?:px|rem|em))'
  const shadowValue = `(?:none|(?:inset\\s+)?${shadowLength}\\s+${shadowLength}[^;{}]*)`

  const fontFamilies = extractFontFamilies(cleaned)
  const fontSizes = extractDeclarationValues(cleaned, 'font-size', lengthValue, 8, 12, 4)
  const radii = extractDeclarationValues(cleaned, 'border-radius', lengthValue, 8, 10, 3)
  const shadows = extractDeclarationValues(cleaned, 'box-shadow', shadowValue, 6, 8, 2)
  const spacing = extractSpacingTokens(cleaned)
  const buttonStyles = extractButtonStyles(cleaned)

  return {
    typography: {
      fontFamilies,
      fontSizes,
    },
    radii,
    shadows,
    spacing,
    buttonStyles,
    summary: {
      confidence: [fontFamilies, fontSizes, radii, shadows, spacing, buttonStyles]
        .flat()
        .some((item) => item?.confidence === 'high') ? 'medium' : 'low',
      source: 'static-css',
      note: 'Token suggestions are inferred from static CSS frequency and selector patterns. Review before applying.',
    },
  }
}

// ── Component pattern detection ──────────────────────────────────────────────

const COMPONENT_PATTERNS = [
  {
    id: 'navbar',
    label: 'Navbar',
    icon: '🧭',
    html: [/<nav[\s>]/i, /class="[^"]*\b(navbar|nav-bar|site-nav|top-nav|header-nav)\b/i],
    css: [/\.(navbar|nav-bar|site-nav|top-nav|header-nav)\b/i],
  },
  {
    id: 'hero',
    label: 'Hero',
    icon: '🦸',
    html: [/class="[^"]*\b(hero|banner|jumbotron|splash|masthead|page-hero)\b/i, /<h1[\s>]/i],
    css: [/\.(hero|banner|jumbotron|splash|masthead|page-hero)\b/i],
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: '🃏',
    html: [/class="[^"]*\b(card|tile|product-card|item-card|feature-card)\b/i],
    css: [/\.(card|tile|product-card|item-card|feature-card)\b/i],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: '💳',
    html: [/class="[^"]*\b(pricing|price|plan|tier|subscription)\b/i, /\$\d+\s*\/\s*(mo|month|yr|year)/i],
    css: [/\.(pricing|price-card|plan-card|pricing-table)\b/i],
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: '📝',
    html: [/<form[\s>]/i, /<input\s[^>]*type="(text|email|password)"/i, /class="[^"]*\b(form|signup-form|login-form|contact-form)\b/i],
    css: [],
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: '💬',
    html: [/class="[^"]*\b(testimonial|review|quote|feedback|customer-story)\b/i, /blockquote/i],
    css: [/\.(testimonial|review-card|quote-block)\b/i],
  },
  {
    id: 'navigation-tabs',
    label: 'Tabs',
    icon: '🗂️',
    html: [/role="tablist"/i, /class="[^"]*\b(tabs|tab-list|tab-nav|tabbed)\b/i],
    css: [/\.(tab-list|tab-nav|tabs-nav)\b/i],
  },
  {
    id: 'data-table',
    label: 'Table',
    icon: '📊',
    html: [/<table[\s>]/i, /class="[^"]*\b(data-table|table-wrap|results-table)\b/i],
    css: [],
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: '🔻',
    html: [/<footer[\s>]/i, /class="[^"]*\b(site-footer|page-footer|footer-nav)\b/i],
    css: [/\.(site-footer|page-footer|footer-wrap)\b/i],
  },
  {
    id: 'social-proof',
    label: 'Logos',
    icon: '🏷️',
    html: [/class="[^"]*\b(logo-strip|trusted-by|partner-logos|clients|social-proof)\b/i],
    css: [/\.(logo-strip|trusted-by|partner-logos)\b/i],
  },
  {
    id: 'cta-section',
    label: 'CTA',
    icon: '📣',
    html: [/class="[^"]*\b(cta|call-to-action|cta-section|cta-block|cta-banner)\b/i],
    css: [/\.(cta|cta-section|cta-banner|cta-block)\b/i],
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: '❓',
    html: [/class="[^"]*\b(faq|accordion|q-and-a|questions)\b/i, /frequently asked questions/i],
    css: [/\.(faq|accordion)\b/i],
  },
  {
    id: 'filters',
    label: 'Filters',
    icon: '🔎',
    html: [/class="[^"]*\b(filter|filters|facet|facets|refine|sidebar-filter|filter-bar)\b/i, /<input\s[^>]*type="(checkbox|range)"/i],
    css: [/\.(filter|filters|facet|refine|filter-bar)\b/i],
  },
]

// Maps detected component sets to the most appropriate preview template
const COMPONENT_TO_PREVIEW = [
  { components: ['pricing', 'hero', 'testimonials'], must: ['pricing'], preview: 'pricing', label: 'Pricing Page' },
  { components: ['pricing', 'hero'], must: ['pricing'], preview: 'pricing', label: 'Pricing Page' },
  { components: ['forms', 'hero', 'cards'], must: ['forms'], preview: 'signup', label: 'Sign-up Flow' },
  { components: ['forms'], preview: 'signin', label: 'Sign-in / Auth' },
  { components: ['data-table', 'navbar'], must: ['data-table'], preview: 'admin', label: 'Admin Table' },
  { components: ['cards', 'filters', 'hero'], must: ['filters'], preview: 'ecommerce', label: 'E-commerce Shop' },
  { components: ['cards', 'navbar', 'hero', 'footer'], preview: 'saas', label: 'SaaS Landing' },
  { components: ['hero', 'testimonials', 'pricing'], preview: 'saas', label: 'SaaS Landing' },
  { components: ['cards', 'hero'], preview: 'blog', label: 'Blog' },
]

function detectScore(component, html, css) {
  const htmlScore = component.html.filter((re) => re.test(html)).length
  const cssScore = component.css.filter((re) => re.test(css)).length
  const total = htmlScore + cssScore
  if (total === 0) return null
  const maxSignals = component.html.length + component.css.length
  return {
    id: component.id,
    label: component.label,
    icon: component.icon,
    // Require at least two corroborating signals for "high" so a single lone
    // <table>/<footer> match (maxSignals === 1) can't read as high confidence.
    confidence: total >= 2 && total >= Math.ceil(maxSignals * 0.5) ? 'high' : 'medium',
  }
}

function suggestPreviewTemplate(detectedIds) {
  const set = new Set(detectedIds)
  for (const mapping of COMPONENT_TO_PREVIEW) {
    // Mandatory components must all be present, otherwise this rule is skipped.
    if (mapping.must && !mapping.must.every((c) => set.has(c))) continue
    const matchCount = mapping.components.filter((c) => set.has(c)).length
    if (matchCount >= Math.ceil(mapping.components.length * 0.6)) {
      return { previewId: mapping.preview, label: mapping.label }
    }
  }
  return null
}

export function extractComponentPatterns(html, cssText) {
  const detected = []
  for (const pattern of COMPONENT_PATTERNS) {
    const result = detectScore(pattern, html, cssText)
    if (result) detected.push(result)
  }
  const suggestion = suggestPreviewTemplate(detected.map((d) => d.id))
  return { detected, suggestion }
}

function isGrayish(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return (max - min) < 30
}

function resolveUrl(base, relative) {
  try {
    return new URL(relative, base).href
  } catch {
    return null
  }
}

export async function extractUrlColors(inputUrl, options = {}) {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return { error: true, message: 'Please provide a valid URL.' }
  }

  let targetUrl = inputUrl.trim()
  if (!/^[a-z][a-z\d+.-]*:\/\//i.test(targetUrl)) {
    targetUrl = /^(localhost|0\.0\.0\.0|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(targetUrl)
      ? 'http://' + targetUrl
      : 'https://' + targetUrl
  }

  const access = await validateUrlAccess(targetUrl, options)
  if (!access.allowed) {
    const message = access.reason === 'protocol'
      ? 'Only HTTP and HTTPS URLs are supported.'
      : access.isPrivateNetwork
        ? privateUrlMessage(access.accessMode)
        : 'This URL is not allowed. Only public websites are supported.'
    return {
      error: true,
      message,
      accessMode: access.accessMode,
      privateNetworkBlocked: Boolean(access.isPrivateNetwork),
      alternatives: access.isPrivateNetwork ? hostedLocalAlternatives() : [],
    }
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; StyleSeed/1.0; +https://style-seed.vercel.app)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  }

  let html
  try {
    const response = await fetchWithTimeout(targetUrl, { headers })
    if (!response.ok) {
      if (response.status === 403) {
        return { error: true, message: `This site blocks automated requests (HTTP ${response.status}). Try a different URL or use the Color Picker instead.` }
      }
      return { error: true, message: `The site returned an error (HTTP ${response.status}). Check the URL and try again.` }
    }
    html = await response.text()
  } catch (err) {
    if (err.name === 'AbortError') {
      return { error: true, message: 'The request timed out. The site may be slow or blocking automated access.' }
    }
    return { error: true, message: "Could not reach this URL. Check that it's correct and publicly accessible." }
  }

  const cssTexts = []
  const inlineRe = /<style[^>]*>([\s\S]*?)<\/style>/gi
  let im
  while ((im = inlineRe.exec(html)) !== null) {
    cssTexts.push(im[1])
  }

  const linkRe = /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi
  const linkRe2 = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']stylesheet["']/gi
  const cssHrefs = []
  let lm
  while ((lm = linkRe.exec(html)) !== null) {
    const resolved = resolveUrl(targetUrl, lm[1])
    if (resolved) cssHrefs.push(resolved)
  }
  while ((lm = linkRe2.exec(html)) !== null) {
    const resolved = resolveUrl(targetUrl, lm[1])
    if (resolved && !cssHrefs.includes(resolved)) cssHrefs.push(resolved)
  }

  const fetches = cssHrefs.slice(0, MAX_CSS_FILES).map(async (href) => {
    try {
      const cssAccess = await validateUrlAccess(href, options)
      if (!cssAccess.allowed) return ''
      const r = await fetchWithTimeout(href, { headers })
      if (r.ok) return await r.text()
    } catch {}
    return ''
  })
  const fetchedCss = await Promise.all(fetches)
  cssTexts.push(...fetchedCss)

  const allCss = cssTexts.join('\n')

  if (!allCss.trim()) {
    return { error: true, message: "No CSS found on this page. The site may use JavaScript-rendered styles, which we can't extract." }
  }

  const colorMap = extractColorsFromCss(allCss)
  const semantic = extractSemanticVars(allCss)
  const tokens = extractDesignTokens(allCss)
  const components = extractComponentPatterns(html, allCss)

  const blacklist = new Set(['#ffffff', '#000000', '#fff', '#000'])
  const filtered = Object.entries(colorMap)
    .filter(([hex]) => !blacklist.has(hex) && hex.length === 7)
    .sort((a, b) => b[1] - a[1])

  const colorful = filtered.filter(([hex]) => !isGrayish(hex)).slice(0, 10)
  const grays = filtered.filter(([hex]) => isGrayish(hex)).slice(0, 10)
  const merged = [...colorful, ...grays]
  const top20 = merged.slice(0, 20).map(([hex]) => hex)

  if (top20.length === 0) {
    return { error: true, message: "We found CSS but couldn't extract any distinct colors. The site may use very few colors or dynamic theming." }
  }

  let domain
  try {
    domain = new URL(targetUrl).hostname
  } catch {
    domain = targetUrl
  }

  return {
    colors: top20,
    semantic,
    domain,
    count: top20.length,
    tokens,
    components,
    accessMode: access.accessMode,
    privateNetwork: Boolean(access.isPrivateNetwork),
  }
}
