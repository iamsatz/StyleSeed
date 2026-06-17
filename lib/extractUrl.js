const FETCH_TIMEOUT_MS = 5000
const MAX_CSS_FILES = 5

const PRIVATE_IP_RE = /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|169\.254\.|::1$|fc00:|fd|fe80:)/i

function getUrlAccessMode(options = {}) {
  return options.allowPrivateNetwork ? 'local-dev' : 'public'
}

function privateUrlMessage(accessMode) {
  if (accessMode === 'local-dev') {
    return 'This local URL is only allowed while HuePrint is running in local developer mode.'
  }
  return 'This URL points to localhost or a private network. Hosted HuePrint can only extract public websites.'
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
      description: 'A future HuePrint flow will inspect uploaded local files without needing network access.',
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
    'User-Agent': 'Mozilla/5.0 (compatible; HuePrint/1.0; +https://hueprint.app)',
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
    accessMode: access.accessMode,
    privateNetwork: Boolean(access.isPrivateNetwork),
  }
}
