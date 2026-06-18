// Font library — a large, searchable dump of Google Fonts + Fontshare families.
//
// Names only (plus provider + category). Fonts are loaded on demand when a user
// selects one (see loadLibraryFont in loadGoogleFont.js), so bundling the full
// list is cheap. We reuse the richer existing catalogs (GOOGLE_FONT_CATALOG and
// CURATED_FREE_FONT_CATALOG) for the fonts they already describe, and append a
// broad supplemental list of real, accurately-named families below so search
// autocomplete feels complete without 404-ing on invented names.

import { GOOGLE_FONT_CATALOG } from './googleFontsCatalog.js'
import { CURATED_FREE_FONT_CATALOG } from './freeFontCatalog.js'

// --- Supplemental Google Fonts (real families, grouped by category) ----------

const GOOGLE_SANS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Nunito',
  'Nunito Sans', 'Work Sans', 'Mulish', 'Rubik', 'Manrope', 'DM Sans',
  'Plus Jakarta Sans', 'Sora', 'Outfit', 'Figtree', 'Onest', 'Hanken Grotesk',
  'Albert Sans', 'Lexend', 'Lexend Deca', 'Be Vietnam Pro', 'Schibsted Grotesk',
  'Instrument Sans', 'Geist', 'Bricolage Grotesque', 'Source Sans 3',
  'Noto Sans', 'PT Sans', 'Fira Sans', 'Karla', 'Heebo', 'Cabin', 'Oxygen',
  'Quicksand', 'Josefin Sans', 'Barlow', 'Barlow Condensed', 'Titillium Web',
  'Kanit', 'Prompt', 'Mukta', 'Hind', 'Assistant', 'Catamaran', 'Saira',
  'Saira Condensed', 'Encode Sans', 'Red Hat Display', 'Red Hat Text',
  'Public Sans', 'Proza Libre', 'Spline Sans', 'Epilogue', 'Sarabun', 'IBM Plex Sans',
  'Overpass', 'Jost', 'Urbanist', 'Archivo', 'Archivo Narrow', 'Chivo',
  'Libre Franklin', 'Maven Pro', 'Signika', 'Signika Negative', 'Dosis',
  'Comfortaa', 'Varela Round', 'Exo', 'Exo 2', 'Teko', 'Oswald', 'Anton',
  'Bebas Neue', 'Pathway Gothic One', 'Khand', 'Rajdhani', 'Yantramanav',
  'Asap', 'Asap Condensed', 'Cairo', 'Tajawal', 'Almarai', 'Readex Pro',
  'Space Grotesk', 'Syne', 'Unbounded', 'Gantari', 'Wix Madefor Text',
  'Wix Madefor Display', 'Darker Grotesque', 'Familjen Grotesk', 'Anybody',
  'Antonio', 'Big Shoulders Display', 'League Spartan', 'Sen', 'Gabarito',
  'Hubot Sans', 'Mona Sans',
]

const GOOGLE_SERIF = [
  'Playfair Display', 'Merriweather', 'Lora', 'PT Serif', 'Noto Serif',
  'Source Serif 4', 'Libre Baskerville', 'Bitter', 'Crimson Text',
  'Crimson Pro', 'EB Garamond', 'Cormorant', 'Cormorant Garamond',
  'Frank Ruhl Libre', 'Spectral', 'Domine', 'Zilla Slab', 'Arvo', 'Rokkitt',
  'Slabo 27px', 'Vollkorn', 'Cardo', 'Alegreya', 'Alegreya Sans', 'Newsreader',
  'Fraunces', 'Petrona', 'Literata', 'Bodoni Moda', 'DM Serif Display',
  'DM Serif Text', 'Marcellus', 'Cinzel', 'Prata', 'Italiana', 'Gilda Display',
  'Tinos', 'Noticia Text', 'Old Standard TT', 'Sorts Mill Goudy', 'Gelasio',
  'Besley', 'Roboto Slab', 'Josefin Slab', 'Bree Serif', 'Aleo', 'Esteban',
  'Yrsa', 'STIX Two Text', 'Instrument Serif', 'Young Serif', 'Gentium Plus',
]

const GOOGLE_DISPLAY = [
  'Abril Fatface', 'Pacifico', 'Lobster', 'Lobster Two', 'Righteous',
  'Fredoka', 'Bungee', 'Bungee Shade', 'Monoton', 'Alfa Slab One',
  'Black Ops One', 'Permanent Marker', 'Russo One', 'Staatliches', 'Yeseva One',
  'Passion One', 'Concert One', 'Bowlby One', 'Shrikhand', 'Climate Crisis',
  'Honk', 'Sigmar', 'Bagel Fat One', 'Rampart One', 'Bungee Spice',
  'Modak', 'Chango', 'Rye', 'Ultra', 'Fjalla One', 'Archivo Black',
  'Bricolage Grotesque', 'Familjen Grotesk', 'Climate Crisis', 'Tilt Warp',
  'Silkscreen', 'Press Start 2P', 'Pixelify Sans', 'Micro 5', 'Workbench',
]

const GOOGLE_HANDWRITING = [
  'Caveat', 'Dancing Script', 'Shadows Into Light', 'Indie Flower', 'Satisfy',
  'Great Vibes', 'Sacramento', 'Kalam', 'Patrick Hand', 'Amatic SC',
  'Gloria Hallelujah', 'Architects Daughter', 'Homemade Apple', 'Cookie',
  'Allura', 'Tangerine', 'Parisienne', 'Yellowtail', 'Marck Script',
  'Pinyon Script', 'Petit Formal Script', 'Birthstone', 'Cedarville Cursive',
]

const GOOGLE_MONO = [
  'JetBrains Mono', 'Roboto Mono', 'Source Code Pro', 'IBM Plex Mono',
  'Fira Code', 'Space Mono', 'Inconsolata', 'DM Mono', 'Ubuntu Mono',
  'PT Mono', 'Overpass Mono', 'Martian Mono', 'Red Hat Mono', 'Spline Sans Mono',
  'Geist Mono', 'Noto Sans Mono', 'Anonymous Pro', 'Cousine', 'Azeret Mono',
  'Fragment Mono', 'Victor Mono', 'Courier Prime', 'Nova Mono', 'Syne Mono',
]

// --- Fontshare families (real catalog — names map to api.fontshare.com slugs) -

const FONTSHARE_FAMILIES = [
  { family: 'Satoshi', category: 'sans-serif' },
  { family: 'General Sans', category: 'sans-serif' },
  { family: 'Switzer', category: 'sans-serif' },
  { family: 'Supreme', category: 'sans-serif' },
  { family: 'Author', category: 'serif' },
  { family: 'Clash Display', category: 'display' },
  { family: 'Clash Grotesk', category: 'sans-serif' },
  { family: 'Cabinet Grotesk', category: 'sans-serif' },
  { family: 'Bespoke Sans', category: 'sans-serif' },
  { family: 'Bespoke Serif', category: 'serif' },
  { family: 'Bespoke Slab', category: 'serif' },
  { family: 'Bespoke Stencil', category: 'display' },
  { family: 'Ranade', category: 'sans-serif' },
  { family: 'Sentient', category: 'serif' },
  { family: 'Zodiak', category: 'serif' },
  { family: 'Boska', category: 'serif' },
  { family: 'Gambetta', category: 'serif' },
  { family: 'Erode', category: 'serif' },
  { family: 'Synonym', category: 'sans-serif' },
  { family: 'Nippo', category: 'sans-serif' },
  { family: 'Panchang', category: 'sans-serif' },
  { family: 'Chillax', category: 'sans-serif' },
  { family: 'Pally', category: 'sans-serif' },
  { family: 'Quilon', category: 'sans-serif' },
  { family: 'Tabular', category: 'sans-serif' },
  { family: 'Stardom', category: 'display' },
  { family: 'Melodrama', category: 'serif' },
  { family: 'Bevellier', category: 'serif' },
  { family: 'Excon', category: 'sans-serif' },
  { family: 'Plein', category: 'serif' },
  { family: 'Britney', category: 'display' },
  { family: 'Comico', category: 'display' },
  { family: 'Sharpie', category: 'handwriting' },
  { family: 'Array', category: 'display' },
  { family: 'Pilcrow Rounded', category: 'sans-serif' },
  { family: 'Amulya', category: 'sans-serif' },
  { family: 'Hauora', category: 'sans-serif' },
  { family: 'Telma', category: 'display' },
  { family: 'Tanker', category: 'display' },
  { family: 'Khand', category: 'sans-serif' },
  { family: 'Pos', category: 'sans-serif' },
  { family: 'Outfit', category: 'sans-serif' },
]

// --- Build the merged, deduped library ---------------------------------------

function buildLibrary() {
  const byFamily = new Map()

  const add = (family, provider, category) => {
    if (!family) return
    const key = family.toLowerCase()
    if (byFamily.has(key)) return
    byFamily.set(key, { family, provider, category: category || 'sans-serif' })
  }

  // Seed from the existing rich catalogs first (they carry good categories).
  for (const f of GOOGLE_FONT_CATALOG) add(f.family, 'google', f.category)
  for (const f of CURATED_FREE_FONT_CATALOG) add(f.family, 'fontshare', f.category)

  // Supplemental Google families.
  for (const f of GOOGLE_SANS) add(f, 'google', 'sans-serif')
  for (const f of GOOGLE_SERIF) add(f, 'google', 'serif')
  for (const f of GOOGLE_DISPLAY) add(f, 'google', 'display')
  for (const f of GOOGLE_HANDWRITING) add(f, 'google', 'handwriting')
  for (const f of GOOGLE_MONO) add(f, 'google', 'monospace')

  // Fontshare families.
  for (const f of FONTSHARE_FAMILIES) add(f.family, 'fontshare', f.category)

  return Array.from(byFamily.values()).sort((a, b) => a.family.localeCompare(b.family))
}

export const FONT_LIBRARY = buildLibrary()

export const PROVIDER_LABELS = {
  google: 'Google',
  fontshare: 'Fontshare',
  curated: 'Fontshare',
}

/**
 * Case-insensitive search over the library. Prefix matches rank above
 * substring matches; ties break by shorter family name then alphabetical.
 * Returns up to `limit` { family, provider, category } records.
 */
export function searchFontLibrary(query, limit = 12) {
  const q = (query || '').trim().toLowerCase()
  if (q.length < 1) return []
  const prefix = []
  const substring = []
  for (const font of FONT_LIBRARY) {
    const name = font.family.toLowerCase()
    if (name.startsWith(q)) prefix.push(font)
    else if (name.includes(q)) substring.push(font)
  }
  const rank = (a, b) => a.family.length - b.family.length || a.family.localeCompare(b.family)
  prefix.sort(rank)
  substring.sort(rank)
  return [...prefix, ...substring].slice(0, limit)
}
