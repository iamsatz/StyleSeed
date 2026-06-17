export const FONT_SUGGESTION_CONTEXTS = [
  {
    id: 'saas-product',
    label: 'SaaS / Product',
    context: 'B2B tools, dashboards, startups',
    systems: [
      { name: 'Crisp Product', displayFont: 'Plus Jakarta Sans', headingFont: 'Plus Jakarta Sans', bodyFont: 'Inter', monoFont: 'JetBrains Mono', reason: 'Friendly headings with highly readable UI text.' },
      { name: 'Modern Operator', displayFont: 'Satoshi', headingFont: 'Satoshi', bodyFont: 'General Sans', monoFont: 'Geist Mono', reason: 'A contemporary free stack for clean product surfaces.' },
      { name: 'Quiet Dashboard', displayFont: 'Manrope', headingFont: 'Manrope', bodyFont: 'Inter', monoFont: 'Roboto Mono', reason: 'Calm hierarchy for dense screens and repeated workflows.' },
      { name: 'Technical SaaS', displayFont: 'Space Grotesk', headingFont: 'Space Grotesk', bodyFont: 'DM Sans', monoFont: 'JetBrains Mono', reason: 'Adds a technical edge without hurting body readability.' },
    ],
  },
  {
    id: 'fintech-legal',
    label: 'Fintech / Legal',
    context: 'Finance, compliance, law, enterprise',
    systems: [
      { name: 'Measured Trust', displayFont: 'Merriweather', headingFont: 'Merriweather', bodyFont: 'Inter', monoFont: 'IBM Plex Mono', reason: 'Serif authority paired with neutral, reliable UI text.' },
      { name: 'Enterprise Precision', displayFont: 'IBM Plex Sans', headingFont: 'IBM Plex Sans', bodyFont: 'Inter', monoFont: 'IBM Plex Mono', reason: 'A restrained system for compliance-heavy product UI.' },
      { name: 'Editorial Finance', displayFont: 'Libre Baskerville', headingFont: 'Libre Baskerville', bodyFont: 'Source Sans Pro', monoFont: 'Source Code Pro', reason: 'Works for trust-led pages with serious reading moments.' },
    ],
  },
  {
    id: 'healthcare-wellness',
    label: 'Healthcare / Wellness',
    context: 'Medical, therapy, wellness products',
    systems: [
      { name: 'Soft Clinical', displayFont: 'Lora', headingFont: 'DM Sans', bodyFont: 'Inter', monoFont: 'Roboto Mono', reason: 'A human feel with crisp, accessible UI body text.' },
      { name: 'Approachable Care', displayFont: 'Nunito', headingFont: 'Nunito', bodyFont: 'Open Sans', monoFont: 'Source Code Pro', reason: 'Rounded forms for a warm and calm product voice.' },
      { name: 'Modern Wellness', displayFont: 'Bricolage Grotesque', headingFont: 'Manrope', bodyFont: 'DM Sans', monoFont: 'Geist Mono', reason: 'Expressive enough for wellness, steady enough for apps.' },
    ],
  },
  {
    id: 'ecommerce-retail',
    label: 'Ecommerce / Retail',
    context: 'Product browsing and checkout',
    systems: [
      { name: 'Retail Clarity', displayFont: 'Outfit', headingFont: 'Outfit', bodyFont: 'DM Sans', monoFont: 'Roboto Mono', reason: 'Clear product cards, prices, and promo hierarchy.' },
      { name: 'Premium Shop', displayFont: 'Playfair Display', headingFont: 'Playfair Display', bodyFont: 'Inter', monoFont: 'JetBrains Mono', reason: 'High-end display type grounded by practical UI text.' },
      { name: 'Marketplace Friendly', displayFont: 'Montserrat', headingFont: 'Montserrat', bodyFont: 'Open Sans', monoFont: 'Roboto Mono', reason: 'Familiar shopping-page rhythm with lots of styles.' },
    ],
  },
  {
    id: 'luxury-editorial',
    label: 'Luxury / Editorial',
    context: 'Premium, fashion, hospitality, publishing',
    systems: [
      { name: 'Editorial Reserve', displayFont: 'Playfair Display', headingFont: 'Playfair Display', bodyFont: 'Lora', monoFont: 'JetBrains Mono', reason: 'Classic high-contrast display with literary body texture.' },
      { name: 'Gallery Modern', displayFont: 'Clash Display', headingFont: 'Satoshi', bodyFont: 'General Sans', monoFont: 'Geist Mono', reason: 'A more modern portfolio/editorial free-font system.' },
      { name: 'Fashion Quiet', displayFont: 'Cormorant Garamond', headingFont: 'Cormorant Garamond', bodyFont: 'Karla', monoFont: 'Space Mono', reason: 'Elegant display forms with light, readable supporting text.' },
    ],
  },
  {
    id: 'gaming-creative',
    label: 'Gaming / Creative',
    context: 'Games, events, music, creator brands',
    systems: [
      { name: 'Neon Interface', displayFont: 'Clash Display', headingFont: 'Space Grotesk', bodyFont: 'Inter', monoFont: 'Space Mono', reason: 'Sharp, expressive display type with technical support.' },
      { name: 'Creator System', displayFont: 'Cabinet Grotesk', headingFont: 'Cabinet Grotesk', bodyFont: 'DM Sans', monoFont: 'Geist Mono', reason: 'Distinctive but still usable across portfolio sections.' },
      { name: 'Bold Launch', displayFont: 'Bebas Neue', headingFont: 'Oswald', bodyFont: 'Open Sans', monoFont: 'Roboto Mono', reason: 'Condensed impact for event and campaign pages.' },
    ],
  },
  {
    id: 'documentation-developer',
    label: 'Documentation / Developer',
    context: 'Docs, SDKs, technical products',
    systems: [
      { name: 'Readable Docs', displayFont: 'Geist', headingFont: 'Geist', bodyFont: 'Inter', monoFont: 'Geist Mono', reason: 'Modern docs stack with strong code/readability balance.' },
      { name: 'API Studio', displayFont: 'Space Grotesk', headingFont: 'Space Grotesk', bodyFont: 'Source Sans Pro', monoFont: 'Source Code Pro', reason: 'Technical brand voice with proven long-form support.' },
      { name: 'Developer Precision', displayFont: 'IBM Plex Sans', headingFont: 'IBM Plex Sans', bodyFont: 'IBM Plex Sans', monoFont: 'IBM Plex Mono', reason: 'Consistent, enterprise-friendly documentation typography.' },
    ],
  },
  {
    id: 'portfolio-creative',
    label: 'Portfolio / Creative',
    context: 'Personal sites, agencies, creative portfolios',
    systems: [
      { name: 'Designer Portfolio', displayFont: 'Clash Display', headingFont: 'Satoshi', bodyFont: 'General Sans', monoFont: 'Geist Mono', reason: 'Expressive hero type with practical project-card text.' },
      { name: 'Editorial Portfolio', displayFont: 'Fraunces', headingFont: 'Fraunces', bodyFont: 'Karla', monoFont: 'Space Mono', reason: 'Personality for case studies and crisp supporting metadata.' },
      { name: 'Minimal Studio', displayFont: 'Switzer', headingFont: 'Switzer', bodyFont: 'Inter', monoFont: 'Geist Mono', reason: 'Quiet, polished typography for image-led portfolios.' },
    ],
  },
]

const PAIRING_SETS = [
  { match: ['Inter', 'Geist', 'Switzer'], systems: ['Crisp Product', 'Readable Docs', 'Minimal Studio'] },
  { match: ['Satoshi', 'General Sans'], systems: ['Modern Operator', 'Gallery Modern', 'Designer Portfolio'] },
  { match: ['Playfair Display', 'Lora', 'Fraunces'], systems: ['Premium Shop', 'Editorial Reserve', 'Editorial Portfolio'] },
  { match: ['JetBrains Mono', 'Geist Mono', 'Source Code Pro'], systems: ['Readable Docs', 'API Studio', 'Technical SaaS'] },
  { match: ['Clash Display', 'Cabinet Grotesk', 'Space Grotesk'], systems: ['Neon Interface', 'Creator System', 'Designer Portfolio'] },
]

export function getSuggestionContext(id) {
  return FONT_SUGGESTION_CONTEXTS.find((context) => context.id === id) || FONT_SUGGESTION_CONTEXTS[0]
}

export function getSuggestedPairings(fontFamily) {
  if (!fontFamily) return []
  const family = fontFamily.toLowerCase()
  const matchedNames = PAIRING_SETS
    .filter((set) => set.match.some((name) => name.toLowerCase() === family))
    .flatMap((set) => set.systems)

  const systems = FONT_SUGGESTION_CONTEXTS.flatMap((context) => context.systems)
  const direct = systems.filter((system) => (
    system.displayFont === fontFamily ||
    system.headingFont === fontFamily ||
    system.bodyFont === fontFamily ||
    system.monoFont === fontFamily
  ))
  const adjacent = systems.filter((system) => matchedNames.includes(system.name))

  const seen = new Set()
  return [...direct, ...adjacent].filter((system) => {
    if (seen.has(system.name)) return false
    seen.add(system.name)
    return true
  }).slice(0, 5)
}
