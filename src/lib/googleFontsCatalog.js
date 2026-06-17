export const GOOGLE_FONT_CATEGORIES = [
  'all',
  'sans-serif',
  'serif',
  'display',
  'monospace',
  'handwriting',
]

export const GOOGLE_FONT_POPULARITY = [
  'all',
  'popular',
  'rising',
  'specialized',
]

export const GOOGLE_FONT_CATALOG = [
  { family: 'Inter', category: 'sans-serif', popularity: 'popular', styles: 18, variable: true, tags: ['ui', 'product', 'dashboard', 'neutral'] },
  { family: 'Roboto', category: 'sans-serif', popularity: 'popular', styles: 12, variable: true, tags: ['android', 'system', 'utility', 'body'] },
  { family: 'Open Sans', category: 'sans-serif', popularity: 'popular', styles: 10, variable: true, tags: ['readable', 'body', 'friendly'] },
  { family: 'Lato', category: 'sans-serif', popularity: 'popular', styles: 10, variable: false, tags: ['warm', 'body', 'corporate'] },
  { family: 'Montserrat', category: 'sans-serif', popularity: 'popular', styles: 18, variable: true, tags: ['geometric', 'landing', 'heading'] },
  { family: 'Poppins', category: 'sans-serif', popularity: 'popular', styles: 18, variable: false, tags: ['geometric', 'friendly', 'startup'] },
  { family: 'Nunito', category: 'sans-serif', popularity: 'popular', styles: 14, variable: true, tags: ['rounded', 'education', 'wellness'] },
  { family: 'Raleway', category: 'sans-serif', popularity: 'popular', styles: 18, variable: true, tags: ['elegant', 'portfolio', 'heading'] },
  { family: 'Merriweather Sans', category: 'sans-serif', popularity: 'specialized', styles: 8, variable: false, tags: ['readable', 'editorial', 'trust'] },
  { family: 'Source Sans Pro', category: 'sans-serif', popularity: 'popular', styles: 12, variable: false, tags: ['adobe', 'ui', 'body'] },
  { family: 'DM Sans', category: 'sans-serif', popularity: 'popular', styles: 18, variable: true, tags: ['modern', 'friendly', 'commerce'] },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', popularity: 'rising', styles: 14, variable: true, tags: ['product', 'startup', 'heading'] },
  { family: 'Manrope', category: 'sans-serif', popularity: 'rising', styles: 7, variable: true, tags: ['fintech', 'modern', 'dashboard'] },
  { family: 'Outfit', category: 'sans-serif', popularity: 'rising', styles: 9, variable: true, tags: ['geometric', 'creator', 'product'] },
  { family: 'Space Grotesk', category: 'sans-serif', popularity: 'rising', styles: 5, variable: true, tags: ['technical', 'ai', 'creative'] },
  { family: 'Work Sans', category: 'sans-serif', popularity: 'popular', styles: 18, variable: true, tags: ['ui', 'readable', 'product'] },
  { family: 'IBM Plex Sans', category: 'sans-serif', popularity: 'specialized', styles: 14, variable: false, tags: ['enterprise', 'technical', 'trust'] },
  { family: 'Noto Sans', category: 'sans-serif', popularity: 'popular', styles: 18, variable: true, tags: ['global', 'body', 'system'] },
  { family: 'Archivo', category: 'sans-serif', popularity: 'rising', styles: 18, variable: true, tags: ['strong', 'editorial', 'product'] },
  { family: 'Karla', category: 'sans-serif', popularity: 'popular', styles: 8, variable: true, tags: ['friendly', 'body', 'minimal'] },
  { family: 'Playfair Display', category: 'serif', popularity: 'popular', styles: 12, variable: true, tags: ['luxury', 'editorial', 'display'] },
  { family: 'Lora', category: 'serif', popularity: 'popular', styles: 8, variable: true, tags: ['editorial', 'body', 'warm'] },
  { family: 'Merriweather', category: 'serif', popularity: 'popular', styles: 8, variable: false, tags: ['trust', 'finance', 'education'] },
  { family: 'Libre Baskerville', category: 'serif', popularity: 'popular', styles: 3, variable: false, tags: ['classic', 'legal', 'editorial'] },
  { family: 'Cormorant Garamond', category: 'serif', popularity: 'specialized', styles: 10, variable: false, tags: ['luxury', 'fashion', 'editorial'] },
  { family: 'DM Serif Display', category: 'serif', popularity: 'rising', styles: 2, variable: false, tags: ['display', 'brand', 'editorial'] },
  { family: 'Roboto Slab', category: 'serif', popularity: 'popular', styles: 9, variable: true, tags: ['slab', 'technical', 'heading'] },
  { family: 'Fraunces', category: 'serif', popularity: 'rising', styles: 18, variable: true, tags: ['expressive', 'display', 'editorial'] },
  { family: 'Bebas Neue', category: 'display', popularity: 'popular', styles: 1, variable: false, tags: ['condensed', 'bold', 'poster'] },
  { family: 'Oswald', category: 'display', popularity: 'popular', styles: 7, variable: true, tags: ['condensed', 'heading', 'impact'] },
  { family: 'Anton', category: 'display', popularity: 'popular', styles: 1, variable: false, tags: ['bold', 'marketing', 'display'] },
  { family: 'Righteous', category: 'display', popularity: 'specialized', styles: 1, variable: false, tags: ['retro', 'gaming', 'creative'] },
  { family: 'Syne', category: 'display', popularity: 'rising', styles: 5, variable: true, tags: ['creative', 'portfolio', 'brand'] },
  { family: 'JetBrains Mono', category: 'monospace', popularity: 'popular', styles: 8, variable: true, tags: ['developer', 'code', 'docs'] },
  { family: 'Roboto Mono', category: 'monospace', popularity: 'popular', styles: 14, variable: true, tags: ['code', 'data', 'technical'] },
  { family: 'Fira Code', category: 'monospace', popularity: 'popular', styles: 6, variable: true, tags: ['code', 'ligatures', 'developer'] },
  { family: 'Source Code Pro', category: 'monospace', popularity: 'popular', styles: 14, variable: true, tags: ['code', 'adobe', 'docs'] },
  { family: 'IBM Plex Mono', category: 'monospace', popularity: 'specialized', styles: 14, variable: false, tags: ['enterprise', 'code', 'data'] },
  { family: 'Space Mono', category: 'monospace', popularity: 'popular', styles: 4, variable: false, tags: ['retro', 'technical', 'creative'] },
  { family: 'Caveat', category: 'handwriting', popularity: 'popular', styles: 4, variable: true, tags: ['casual', 'creator', 'accent'] },
  { family: 'Pacifico', category: 'handwriting', popularity: 'popular', styles: 1, variable: false, tags: ['script', 'playful', 'brand'] },
]

export function searchGoogleFonts({
  query = '',
  category = 'all',
  popularity = 'all',
  minStyles = 0,
  variableOnly = false,
} = {}) {
  const q = query.trim().toLowerCase()
  return GOOGLE_FONT_CATALOG.filter((font) => {
    const text = [font.family, font.category, font.popularity, ...font.tags].join(' ').toLowerCase()
    if (q && !text.includes(q)) return false
    if (category !== 'all' && font.category !== category) return false
    if (popularity !== 'all' && font.popularity !== popularity) return false
    if (Number(minStyles) > 0 && font.styles < Number(minStyles)) return false
    if (variableOnly && !font.variable) return false
    return true
  })
}
