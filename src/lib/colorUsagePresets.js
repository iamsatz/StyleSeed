export const COLOR_USAGE_PRESETS = [
  {
    id: 'classic-balance',
    label: 'Classic Balance',
    ratio: '60 / 30 / 10',
    bestFor: 'General websites, MVPs, simple apps',
    why: 'A simple dominant, support, and accent model that keeps brand color from taking over the whole interface.',
    ratios: [
      { role: 'backgroundCanvas', label: 'Background / canvas', percent: 60 },
      { role: 'surfaceSupport', label: 'Surface / support', percent: 30 },
      { role: 'accentCta', label: 'Accent / CTA', percent: 10 },
    ],
    inspiredBy: ['Traditional 60/30/10 composition'],
  },
  {
    id: 'material-role-based',
    label: 'Material Role-Based',
    ratio: '75 / 10 / 10 / 5',
    bestFor: 'Mobile apps, web apps, design-system-driven products',
    why: 'Most of the UI stays on surfaces while primary, secondary, tertiary, and status colors carry meaning.',
    ratios: [
      { role: 'surfaceBackground', label: 'Surface / background', percent: 75 },
      { role: 'primary', label: 'Primary', percent: 10 },
      { role: 'secondaryTertiary', label: 'Secondary / tertiary', percent: 10 },
      { role: 'status', label: 'Status', percent: 5 },
    ],
    inspiredBy: ['Material Design color roles'],
  },
  {
    id: 'enterprise-neutral',
    label: 'Enterprise Neutral',
    ratio: '85 / 8 / 5 / 2',
    bestFor: 'Dashboards, admin tools, fintech, legal, B2B SaaS',
    why: 'Keeps dense product UI calm and scannable, with strong color reserved for actions and state changes.',
    ratios: [
      { role: 'neutralLayers', label: 'Neutral layers', percent: 85 },
      { role: 'primaryAction', label: 'Primary action', percent: 8 },
      { role: 'status', label: 'Status colors', percent: 5 },
      { role: 'accent', label: 'Accent', percent: 2 },
    ],
    inspiredBy: ['IBM Carbon neutral layering'],
  },
  {
    id: 'product-workflow',
    label: 'Product Workflow',
    ratio: '80 / 8 / 7 / 5',
    bestFor: 'CRMs, task apps, project tools, productivity products',
    why: 'Uses neutral UI as the base, brand color for key actions, and semantic color for workflow states.',
    ratios: [
      { role: 'neutralUi', label: 'Neutral UI', percent: 80 },
      { role: 'brandAction', label: 'Brand / action', percent: 8 },
      { role: 'infoDiscovery', label: 'Info / discovery', percent: 7 },
      { role: 'status', label: 'Status', percent: 5 },
    ],
    inspiredBy: ['Atlassian role-based tokens'],
  },
  {
    id: 'marketing-bold',
    label: 'Marketing Bold',
    ratio: '50 / 25 / 15 / 10',
    bestFor: 'Landing pages, launches, creator sites, portfolios',
    why: 'Allows more brand expression for persuasive pages while keeping readable structure.',
    ratios: [
      { role: 'background', label: 'Background', percent: 50 },
      { role: 'brand', label: 'Brand', percent: 25 },
      { role: 'secondary', label: 'Secondary', percent: 15 },
      { role: 'accent', label: 'Accent', percent: 10 },
    ],
    inspiredBy: ['Launch and creator-site composition'],
  },
  {
    id: 'luxury-editorial',
    label: 'Luxury Editorial',
    ratio: '75 / 20 / 5',
    bestFor: 'Premium brands, fashion, hospitality, editorial layouts',
    why: 'Preserves whitespace and restraint so accent color feels selective and high-end.',
    ratios: [
      { role: 'neutralBackground', label: 'Neutral / background', percent: 75 },
      { role: 'supportingTone', label: 'Supporting tone', percent: 20 },
      { role: 'accent', label: 'Accent', percent: 5 },
    ],
    inspiredBy: ['Editorial art direction'],
  },
  {
    id: 'creative-gaming',
    label: 'Creative / Gaming',
    ratio: '45 / 35 / 20',
    bestFor: 'Games, music, events, experimental brands',
    why: 'Makes room for saturated contrast and higher visual energy.',
    ratios: [
      { role: 'dominantVisual', label: 'Dominant visual color', percent: 45 },
      { role: 'secondaryVisual', label: 'Secondary color', percent: 35 },
      { role: 'accent', label: 'Accent', percent: 20 },
    ],
    inspiredBy: ['Expressive digital products'],
  },
  {
    id: 'custom',
    label: 'Custom',
    ratio: 'User-defined',
    bestFor: 'Strict brand systems or unusual visual directions',
    why: 'Use this when a product has specific brand, accessibility, or art-direction rules.',
    ratios: [
      { role: 'base', label: 'Base', percent: 60 },
      { role: 'support', label: 'Support', percent: 30 },
      { role: 'accent', label: 'Accent', percent: 10 },
    ],
    inspiredBy: [],
  },
]

export function getColorUsagePreset(id) {
  return COLOR_USAGE_PRESETS.find((preset) => preset.id === id) || COLOR_USAGE_PRESETS[0]
}

export function getDefaultColorUsageForIndustry(industry = '') {
  const normalized = industry.toLowerCase()
  if (/finance|fintech|legal|saas|enterprise/.test(normalized)) return getColorUsagePreset('enterprise-neutral')
  if (/gaming|creative|music|event/.test(normalized)) return getColorUsagePreset('creative-gaming')
  if (/retail|e-?commerce|portfolio|startup/.test(normalized)) return getColorUsagePreset('marketing-bold')
  if (/travel|food|restaurant|hospitality|luxury/.test(normalized)) return getColorUsagePreset('luxury-editorial')
  return getColorUsagePreset('classic-balance')
}

export function normalizeColorUsage(presetId, customRatios) {
  const preset = getColorUsagePreset(presetId)
  if (preset.id !== 'custom') return preset

  const ratios = Array.isArray(customRatios) && customRatios.length > 0
    ? customRatios.map((item) => ({
        role: item.role,
        label: item.label,
        percent: Number(item.percent) || 0,
      }))
    : preset.ratios

  return { ...preset, ratios }
}
