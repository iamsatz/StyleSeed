import { useEffect, useRef } from 'react'
import { applyKitCssVars } from './kitThemeTokens'

export { COLOR_ROLES } from './kitThemeTokens'

export function useKitTheme(kit, mode) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    applyKitCssVars(ref.current, kit, mode)
  }, [kit, mode])

  return ref
}
