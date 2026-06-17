export const PORTFOLIO_SECTION_OPTIONS = [
  {
    key: 'hero',
    label: 'Intro hero',
    variants: [
      { id: 'profile', label: 'Profile lead' },
      { id: 'statement', label: 'Statement lead' },
      { id: 'split', label: 'Split summary' },
    ],
  },
  {
    key: 'clients',
    label: 'Credibility',
    variants: [
      { id: 'logo-strip', label: 'Logo strip' },
      { id: 'metrics', label: 'Metric proof' },
      { id: 'text-list', label: 'Text list' },
    ],
  },
  {
    key: 'caseStudies',
    label: 'Case studies',
    variants: [
      { id: 'feature-cards', label: 'Feature cards' },
      { id: 'stacked-stories', label: 'Stacked stories' },
      { id: 'numbered-list', label: 'Numbered list' },
    ],
  },
  {
    key: 'projects',
    label: 'Selected projects',
    variants: [
      { id: 'compact-grid', label: 'Compact grid' },
      { id: 'media-grid', label: 'Media grid' },
      { id: 'index-list', label: 'Index list' },
    ],
  },
  {
    key: 'explorations',
    label: 'Explorations',
    variants: [
      { id: 'cards', label: 'Idea cards' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'tag-cloud', label: 'Tag cloud' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact CTA',
    variants: [
      { id: 'email-card', label: 'Email card' },
      { id: 'availability', label: 'Availability note' },
      { id: 'minimal', label: 'Minimal line' },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    variants: [
      { id: 'sitemap', label: 'Sitemap' },
      { id: 'social-row', label: 'Social row' },
      { id: 'minimal', label: 'Minimal' },
    ],
  },
]

export const DEFAULT_PORTFOLIO_SECTIONS = PORTFOLIO_SECTION_OPTIONS.reduce((acc, section) => {
  acc[section.key] = section.variants[0].id
  return acc
}, {})

export function getPortfolioVariantLabel(sectionKey, variantId) {
  const section = PORTFOLIO_SECTION_OPTIONS.find((item) => item.key === sectionKey)
  return section?.variants.find((variant) => variant.id === variantId)?.label || variantId
}
