/**
 * Export generators for AI tools.
 * Each function takes a Kit object (from kit JSON) and returns a formatted string.
 */
import { getDefaultColorUsageForIndustry } from './colorUsagePresets.js'
import { normalizeTypography } from './typographyRoles.js'
import { getKitTypography } from './kitThemeTokens.js'
import { getFontRecordByFamily } from './freeFontCatalog.js'

function toCssVarName(key) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function paletteEntries(kit, mode = 'light') {
  const palette = kit.palette?.[mode] || {}
  return Object.entries(palette)
}

function colorUsageForKit(kit) {
  return kit.colorUsage || getDefaultColorUsageForIndustry(kit.industry)
}

function colorUsageMarkdown(kit) {
  const usage = colorUsageForKit(kit)
  const ratios = (usage.ratios || [])
    .map((ratio) => `- ${ratio.label}: ${ratio.percent}%`)
    .join('\n')
  const inspiredBy = usage.inspiredBy?.length
    ? `\n- Reference principle: ${usage.inspiredBy.join(', ')}`
    : ''

  return `### Usage Preset: ${usage.label} (${usage.ratio})
- Best for: ${usage.bestFor}
- Why: ${usage.why}${inspiredBy}
${ratios}

Use these ratios as visual guidance, not exact pixel rules. Keep strong brand colors focused on actions, meaningful states, and emphasis.`
}

function colorUsageJsComment(kit) {
  const usage = colorUsageForKit(kit)
  const ratios = (usage.ratios || [])
    .map((ratio) => `${ratio.label} ${ratio.percent}%`)
    .join(', ')
  return `/* Color usage guidance: ${usage.label} (${usage.ratio}) - ${ratios}. ${usage.why} */`
}

function inspirationMarkdown(kit) {
  if (!kit.inspiration) return ''
  const tags = kit.inspiration.styleTags?.length
    ? `\n- Style cues: ${kit.inspiration.styleTags.join(', ')}`
    : ''
  const notes = kit.inspiration.matchNotes?.length
    ? `\n- Direction notes: ${kit.inspiration.matchNotes.join(', ')}`
    : ''

  return `## Inspiration Direction
- Reference direction: ${kit.inspiration.sourceName} (${kit.inspiration.category})
- Use this as mood and system guidance only. Do not copy site text, assets, screenshots, or exact layouts.${tags}${notes}
`
}

function inspirationJsComment(kit) {
  if (!kit.inspiration) return ''
  return `  /* Inspiration direction: adapted from ${kit.inspiration.sourceName}. Use as mood guidance only; do not copy site text, assets, or exact layouts. */\n`
}

function typographyForKit(kit) {
  return normalizeTypography(kit.typography || {})
}

function googleFontsImport(fonts) {
  const uniqueFonts = Array.from(new Set(fonts.filter(Boolean)))
  const imports = uniqueFonts.map((font) => {
    const record = getFontRecordByFamily(font)
    const href = record?.cssEmbedUrl || `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`
    return `@import url('${href}');`
  })
  return imports.join(' ')
}

function typographyMarkdown(kit) {
  const typography = typographyForKit(kit)
  return `- Mode: ${typography.mode}
- Display font: ${typography.displayFont} - use for hero headlines and brand moments
- Heading font: ${typography.headingFont} - use for h1-h4 and section hierarchy
- Body font: ${typography.bodyFont} - use for body copy, labels, inputs, and standard UI text
- UI / Mono font: ${typography.monoFont} - use for code, data, compact labels, and technical metadata
- Role map: hero -> displayFont, headings -> headingFont, body -> bodyFont, ui -> bodyFont, code -> monoFont
- CSS font imports: ${googleFontsImport([typography.displayFont, typography.headingFont, typography.bodyFont, typography.monoFont])}
- Base font size: ${typography.baseFontSize}
- Line height: ${typography.lineHeight}`
}

/**
 * Generate a Claude system-prompt.md for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateClaudePrompt(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const name = kit.name || 'Design System'
  const industry = kit.industry || 'Product'
  const description = kit.description || ''

  return `# Design System: ${name}

## Brand Overview
${description}
Industry: ${industry}

${inspirationMarkdown(kit)}

## Color Usage Rules

${colorUsageMarkdown(kit)}

### Light Mode
- **Primary** (\`${light.primary}\`): Use for CTAs, primary buttons, links, and key interactive elements.
- **Secondary** (\`${light.secondary}\`): Use for secondary actions, tags, and supporting UI elements.
- **Accent** (\`${light.accent}\`): Use for highlights, badges, and attention-grabbing micro-elements.
- **Background** (\`${light.background}\`): Page-level background. Keep it clean and uncluttered.
- **Surface** (\`${light.surface}\`): Card backgrounds, panels, and elevated containers.
- **Text** (\`${light.text}\`): Primary body copy and headings.
- **Text Muted** (\`${light.textMuted}\`): Secondary labels, placeholders, captions.
- **Border** (\`${light.border}\`): Dividers, input outlines, and subtle separators.
- **Success** (\`${light.success}\`): Confirmation states, positive indicators, and success banners.
- **Warning** (\`${light.warning}\`): Alerts, degraded states, and cautionary feedback.

### Dark Mode
- **Primary** (\`${dark.primary}\`): Same role as light — CTAs and key actions.
- **Secondary** (\`${dark.secondary}\`): Secondary actions adapted for dark backgrounds.
- **Accent** (\`${dark.accent}\`): Highlights on dark surfaces.
- **Background** (\`${dark.background}\`): Page-level dark background.
- **Surface** (\`${dark.surface}\`): Elevated cards and panels on dark background.
- **Text** (\`${dark.text}\`): Primary readable text on dark.
- **Text Muted** (\`${dark.textMuted}\`): Subdued labels on dark.
- **Border** (\`${dark.border}\`): Subtle separators for dark UI.
- **Success** (\`${dark.success}\`): Positive feedback in dark mode.
- **Warning** (\`${dark.warning}\`): Cautionary feedback in dark mode.

## Typography
${typographyMarkdown(kit)}

## Spacing Guidelines
- Use a consistent 8px base spacing unit.
- Padding within components: 8px (tight), 16px (default), 24px (spacious).
- Section gaps: 32px–64px depending on content density.
- Never mix arbitrary values — always use multiples of 4 or 8.

## General Rules
- Maintain a minimum contrast ratio of 4.5:1 for text on backgrounds (WCAG AA).
- Use primary color sparingly — it should draw the eye to the most important action.
- Destructive actions (delete, remove) should use red tones, not the primary color.
- Disabled states should use muted/border colors at reduced opacity.
`
}

/**
 * Generate a v0 tailwind.config.js snippet for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateV0Config(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const typography = getKitTypography(kit)
  const radius = kit.borderRadius || {}

  const colorEntries = (palette, prefix) =>
    Object.entries(palette)
      .map(([key, val]) => `          '${prefix}${key}': '${val}',`)
      .join('\n')

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
${inspirationJsComment(kit)}  ${colorUsageJsComment(kit)}
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
${colorEntries(light, '')}
        },
        'brand-dark': {
${colorEntries(dark, '')}
        },
      },
      fontFamily: {
        sans: ['${typography.bodyFont}', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['${typography.displayFont}', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['${typography.headingFont}', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['${typography.monoFont}', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '${radius.sm || '4px'}',
        DEFAULT: '${radius.md || '8px'}',
        md: '${radius.md || '8px'}',
        lg: '${radius.lg || '12px'}',
        xl: '16px',
        full: '${radius.full || '9999px'}',
      },
    },
  },
  plugins: [],
}
`
}

/**
 * Generate a .cursor/rules markdown file for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateCursorRules(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const name = kit.name || 'Design System'
  const typography = typographyForKit(kit)

  const cssVarBlock = (palette, suffix) =>
    Object.entries(palette)
      .map(([key, val]) => `  --color-${toCssVarName(key)}${suffix}: ${val};`)
      .join('\n')

  return `# Cursor Rules — ${name} Design System

## Overview
This project uses the **${name}** design system. Always reference the design tokens below when writing or reviewing UI code. Do not hardcode hex values — use CSS variables or Tailwind \`brand-*\` classes.

${inspirationMarkdown(kit)}

## CSS Custom Properties

\`\`\`css
:root {
${cssVarBlock(light, '')}
  --font-display: '${typography.displayFont}', sans-serif;
  --font-heading: '${typography.headingFont}', sans-serif;
  --font-body: '${typography.bodyFont}', sans-serif;
  --font-mono: '${typography.monoFont}', monospace;
}

[data-theme="dark"] {
${cssVarBlock(dark, '-dark')}
}
\`\`\`

## Color Usage Rules

${colorUsageMarkdown(kit)}

| Token | Light | Dark | When to use |
|-------|-------|------|-------------|
| primary | \`${light.primary}\` | \`${dark.primary}\` | CTAs, primary buttons, key links |
| secondary | \`${light.secondary}\` | \`${dark.secondary}\` | Secondary actions, tags |
| accent | \`${light.accent}\` | \`${dark.accent}\` | Highlights, badges |
| background | \`${light.background}\` | \`${dark.background}\` | Page background |
| surface | \`${light.surface}\` | \`${dark.surface}\` | Cards, panels, modals |
| text | \`${light.text}\` | \`${dark.text}\` | Body copy, headings |
| textMuted | \`${light.textMuted}\` | \`${dark.textMuted}\` | Labels, captions, placeholders |
| border | \`${light.border}\` | \`${dark.border}\` | Dividers, input borders |
| success | \`${light.success}\` | \`${dark.success}\` | Positive states, confirmations |
| warning | \`${light.warning}\` | \`${dark.warning}\` | Alerts, degraded states |

## Component Guidelines
- Use \`var(--color-primary)\` for all CTA buttons.
- Use \`var(--color-surface)\` for card and panel backgrounds.
- Use \`var(--color-text-muted)\` for secondary labels and captions.
- Never use \`color: black\` or \`color: white\` directly — use token variables.
- Destructive actions must use a red tone, not the primary color.
- Disabled elements should use \`var(--color-border)\` with 60% opacity.
- Use \`var(--font-display)\` for hero headlines and brand moments.
- Always use \`var(--font-heading)\` for h1-h4 elements.
- Always use \`var(--font-body)\` for body text, labels, and UI copy.
- Use \`var(--font-mono)\` for code, data, and compact metadata.

## Typography
${typographyMarkdown(kit)}

## Spacing
- Base unit: 8px
- Use multiples: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Never use arbitrary pixel values outside this scale.

## Accessibility
- Minimum contrast ratio: 4.5:1 (WCAG AA) for normal text.
- All interactive elements must have visible focus states.
- Do not rely on color alone to convey meaning.
`
}

/**
 * Generate a replit-prompt.md for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateReplitPrompt(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const name = kit.name || 'Design System'
  const industry = kit.industry || 'Product'
  const description = kit.description || ''
  const typography = typographyForKit(kit)
  const fontImports = Array.from(new Set([
    typography.displayFont,
    typography.headingFont,
    typography.bodyFont,
    typography.monoFont,
  ].filter(Boolean)))
    .map((font) => {
      const record = getFontRecordByFamily(font)
      const href = record?.cssEmbedUrl || `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`
      return `@import url('${href}');`
    })
    .join('\n')

  const cssVarLines = (palette, suffix) =>
    Object.entries(palette)
      .map(([key, val]) => `  --color-${toCssVarName(key)}${suffix}: ${val};`)
      .join('\n')

  return `# Replit AI Context: ${name} Design System

## Project Context
${description}
Industry: ${industry}

${inspirationMarkdown(kit)}

This file provides the design system context for Replit AI. When generating or editing UI components, always use the CSS variables and color tokens defined below.

## Google Fonts Import

Add the following to the top of your global CSS:

\`\`\`css
${fontImports}
\`\`\`

## CSS Variables

Add the following to your global CSS (e.g., \`index.css\` or \`globals.css\`):

\`\`\`css
:root {
${cssVarLines(light, '')}
  --font-display: '${typography.displayFont}', sans-serif;
  --font-heading: '${typography.headingFont}', sans-serif;
  --font-body: '${typography.bodyFont}', sans-serif;
  --font-mono: '${typography.monoFont}', monospace;
}

[data-theme="dark"] {
${cssVarLines(dark, '-dark')}
}
\`\`\`

## How to Use These Variables

${colorUsageMarkdown(kit)}

Reference variables in your styles like this:

\`\`\`css
h1, h2, h3, h4 {
  font-family: var(--font-heading);
}

.hero-title, .display-title {
  font-family: var(--font-display);
}

body, p, label, input {
  font-family: var(--font-body);
}

code, pre, kbd, .data-label {
  font-family: var(--font-mono);
}

.button-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.body-text {
  color: var(--color-text);
}

.muted-label {
  color: var(--color-text-muted);
}
\`\`\`

## Color Token Reference

| Token | Light Value | Dark Value | Purpose |
|-------|-------------|------------|---------|
| \`--color-primary\` | \`${light.primary}\` | \`${dark.primary}\` | Primary actions and CTAs |
| \`--color-secondary\` | \`${light.secondary}\` | \`${dark.secondary}\` | Secondary actions |
| \`--color-accent\` | \`${light.accent}\` | \`${dark.accent}\` | Highlights and badges |
| \`--color-background\` | \`${light.background}\` | \`${dark.background}\` | Page background |
| \`--color-surface\` | \`${light.surface}\` | \`${dark.surface}\` | Cards and panels |
| \`--color-text\` | \`${light.text}\` | \`${dark.text}\` | Primary text |
| \`--color-text-muted\` | \`${light.textMuted}\` | \`${dark.textMuted}\` | Secondary / muted text |
| \`--color-border\` | \`${light.border}\` | \`${dark.border}\` | Borders and dividers |
| \`--color-success\` | \`${light.success}\` | \`${dark.success}\` | Success states |
| \`--color-warning\` | \`${light.warning}\` | \`${dark.warning}\` | Warning states |

## Typography

| Token | Value | Purpose |
|-------|-------|---------|
| \`--font-display\` | \`'${typography.displayFont}', sans-serif\` | Hero and brand headlines |
| \`--font-heading\` | \`'${typography.headingFont}', sans-serif\` | h1-h4 headings |
| \`--font-body\` | \`'${typography.bodyFont}', sans-serif\` | Body text and UI labels |
| \`--font-mono\` | \`'${typography.monoFont}', monospace\` | Code, data, and compact labels |

## Design Rules for Replit AI
1. Always use CSS variables instead of hardcoded hex values.
2. Use \`var(--color-primary)\` for the main call-to-action button.
3. Use \`var(--color-surface)\` as the background for cards, modals, and sidebars.
4. Use \`var(--color-text-muted)\` for labels, captions, and helper text.
5. Use \`var(--font-display)\` for hero headlines and brand moments.
6. Use \`var(--font-body)\` for all body text, labels, inputs, and UI copy.
7. Use \`var(--font-heading)\` for section headings and page hierarchy.
8. Use \`var(--font-mono)\` for code, data, and metadata.
9. Spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px — avoid arbitrary values.
10. Border radius: small=4px, default=8px, large=12px, pill=9999px.
11. Ensure WCAG AA contrast (4.5:1) between text and background tokens.
`
}
