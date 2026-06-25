import { normalizeTypography } from './typographyRoles'
import { getFontRecordByFamily } from './freeFontCatalog'

export const COLOR_ROLES = [
  'background',
  'surface',
  'primary',
  'secondary',
  'accent',
  'text',
  'textMuted',
  'border',
  'success',
  'warning',
]

/** @param {object} kit @param {'light'|'dark'} mode */
export function getKitPalette(kit, mode = 'light') {
  return kit?.palette?.[mode] || kit?.palette?.light || {}
}

/** @param {object} kit */
export function getKitTypography(kit) {
  return normalizeTypography(kit?.typography || {})
}

/**
 * Map kit tokens to --hp-* CSS custom properties.
 * @param {object} kit
 * @param {'light'|'dark'} mode
 * @returns {Record<string, string>}
 */
export function kitToCssVars(kit, mode = 'light') {
  const palette = getKitPalette(kit, mode)
  const typography = getKitTypography(kit)
  /** @type {Record<string, string>} */
  const vars = {}

  COLOR_ROLES.forEach((role) => {
    if (palette[role]) vars[`--hp-${role}`] = palette[role]
  })

  const headingFont = typography.headingFont || typography.displayFont
  const bodyFont = typography.bodyFont || headingFont
  const displayFont = typography.displayFont || headingFont
  const monoFont = typography.monoFont || 'JetBrains Mono'

  if (displayFont) vars['--hp-display-font'] = `'${displayFont}', sans-serif`
  if (headingFont) vars['--hp-heading-font'] = `'${headingFont}', sans-serif`
  if (bodyFont) vars['--hp-body-font'] = `'${bodyFont}', sans-serif`
  if (monoFont) vars['--hp-mono-font'] = `'${monoFont}', monospace`
  if (typography.baseFontSize) vars['--hp-font-size'] = typography.baseFontSize
  if (typography.lineHeight) vars['--hp-line-height'] = typography.lineHeight

  if (kit?.borderRadius) {
    vars['--hp-radius-sm'] = kit.borderRadius.sm
    vars['--hp-radius-md'] = kit.borderRadius.md
    vars['--hp-radius-lg'] = kit.borderRadius.lg
    vars['--hp-radius-full'] = kit.borderRadius.full
  }

  if (kit?.shadow) {
    vars['--hp-shadow-sm'] = kit.shadow.sm
    vars['--hp-shadow-md'] = kit.shadow.md
    vars['--hp-shadow-lg'] = kit.shadow.lg
  }

  return vars
}

/** @param {object} kit @param {'light'|'dark'} mode */
export function kitToCssVarDeclarations(kit, mode = 'light') {
  return Object.entries(kitToCssVars(kit, mode))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}

/** Tailwind color keys mapped to CSS variables (live re-theme on mode switch). */
export function kitToTailwindColors(useCssVars = true) {
  if (!useCssVars) return {}
  return Object.fromEntries(COLOR_ROLES.map((role) => [role, `var(--hp-${role})`]))
}

/**
 * Tailwind theme.extend object for preview sandbox.
 * @param {object} kit
 * @param {{ useCssVars?: boolean }} [options]
 */
export function kitToTailwindThemeExtend(kit, options = {}) {
  const { useCssVars = true } = options
  const typography = getKitTypography(kit)
  const radius = kit?.borderRadius || {}

  return {
    colors: kitToTailwindColors(useCssVars),
    fontFamily: {
      sans: [`'${typography.bodyFont}'`, 'ui-sans-serif', 'system-ui', 'sans-serif'],
      display: [`'${typography.displayFont}'`, 'ui-sans-serif', 'system-ui', 'sans-serif'],
      heading: [`'${typography.headingFont}'`, 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: [`'${typography.monoFont}'`, 'ui-monospace', 'monospace'],
    },
    borderRadius: {
      sm: radius.sm || '4px',
      DEFAULT: radius.md || '8px',
      md: radius.md || '8px',
      lg: radius.lg || '12px',
      xl: '16px',
      full: radius.full || '9999px',
    },
  }
}

/** @param {object} kit @returns {string[]} */
export function getFontStylesheetHrefs(kit) {
  const typography = getKitTypography(kit)
  const fonts = Array.from(new Set(
    [typography.displayFont, typography.headingFont, typography.bodyFont, typography.monoFont].filter(Boolean)
  ))
  return fonts.map((font) => {
    const record = getFontRecordByFamily(font)
    return record?.cssEmbedUrl
      || `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;500;600;700;800&display=swap`
  })
}

/** Apply kit CSS variables to a DOM element (used by useKitTheme). */
export function applyKitCssVars(el, kit, mode = 'light') {
  if (!el || !kit) return
  const vars = kitToCssVars(kit, mode)
  Object.entries(vars).forEach(([key, value]) => {
    el.style.setProperty(key, value)
  })
}
