import { useEffect, useRef } from 'react'

const COLOR_ROLES = [
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

export function useKitTheme(kit, mode) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette[mode] || kit.palette.light

    COLOR_ROLES.forEach((role) => {
      if (palette[role]) {
        el.style.setProperty(`--hp-${role}`, palette[role])
      }
    })

    if (kit.typography) {
      const headingFont = kit.typography.headingFont || kit.typography.displayFont
      const bodyFont = kit.typography.bodyFont || headingFont
      const displayFont = kit.typography.displayFont || headingFont
      const monoFont = kit.typography.monoFont || 'JetBrains Mono'
      if (displayFont) el.style.setProperty('--hp-display-font', `'${displayFont}', sans-serif`)
      if (headingFont) el.style.setProperty('--hp-heading-font', `'${headingFont}', sans-serif`)
      if (bodyFont) el.style.setProperty('--hp-body-font', `'${bodyFont}', sans-serif`)
      if (monoFont) el.style.setProperty('--hp-mono-font', `'${monoFont}', monospace`)
      if (kit.typography.baseFontSize) el.style.setProperty('--hp-font-size', kit.typography.baseFontSize)
      if (kit.typography.lineHeight) el.style.setProperty('--hp-line-height', kit.typography.lineHeight)
    }

    if (kit.borderRadius) {
      el.style.setProperty('--hp-radius-sm', kit.borderRadius.sm)
      el.style.setProperty('--hp-radius-md', kit.borderRadius.md)
      el.style.setProperty('--hp-radius-lg', kit.borderRadius.lg)
      el.style.setProperty('--hp-radius-full', kit.borderRadius.full)
    }

    if (kit.shadow) {
      el.style.setProperty('--hp-shadow-sm', kit.shadow.sm)
      el.style.setProperty('--hp-shadow-md', kit.shadow.md)
      el.style.setProperty('--hp-shadow-lg', kit.shadow.lg)
    }
  }, [kit, mode])

  return ref
}
