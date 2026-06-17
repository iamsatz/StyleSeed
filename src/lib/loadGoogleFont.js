const loadedFonts = new Set()

export function loadFont(fontName) {
  if (!fontName || loadedFonts.has(fontName)) return
  loadedFonts.add(fontName)
  const encoded = fontName.replace(/ /g, '+')
  const href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700;800&display=swap`
  const existing = document.querySelector(`link[href="${href}"]`)
  if (existing) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

export function loadFontPair(headingFont, bodyFont) {
  if (headingFont) loadFont(headingFont)
  if (bodyFont && bodyFont !== headingFont) loadFont(bodyFont)
}

export function loadFontRecord(font) {
  if (!font?.family) return
  if (!font.cssEmbedUrl) {
    loadFont(font.family)
    return
  }
  const key = `${font.family}:${font.cssEmbedUrl}`
  if (loadedFonts.has(key)) return
  loadedFonts.add(key)
  const existing = document.querySelector(`link[href="${font.cssEmbedUrl}"]`)
  if (existing) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = font.cssEmbedUrl
  document.head.appendChild(link)
}
