/**
 * Maps a Figma variable name to a StyleSeed palette role.
 * Returns null if no mapping is found.
 * @param {string} name - Raw variable name from Figma export
 * @returns {string|null} - StyleSeed role key or null
 */
function mapVariableToRole(name) {
  const normalized = name.toLowerCase().replace(/[\s_/\\-]+/g, '-')

  const patterns = [
    { roles: ['background', 'bg'], match: /\bbg\b|\bbackground\b/ },
    { roles: ['surface', 'surface'], match: /\bsurface\b|\bcard\b|\bpanel\b/ },
    { roles: ['primary'], match: /\bprimary\b|\bbrand\b/ },
    { roles: ['secondary'], match: /\bsecondary\b/ },
    { roles: ['accent'], match: /\baccent\b|\bhighlight\b/ },
    { roles: ['text'], match: /\bforeground\b|\btext\b(?!-muted)/ },
    { roles: ['textMuted'], match: /\btext-muted\b|\bmuted\b|\bforeground-muted\b|\bsubtle\b/ },
    { roles: ['border'], match: /\bborder\b|\bdivider\b|\boutline\b/ },
    { roles: ['success'], match: /\bsuccess\b|\bpositive\b/ },
    { roles: ['warning'], match: /\bwarning\b|\bcaution\b/ },
  ]

  for (const { roles, match } of patterns) {
    if (match.test(normalized)) {
      return roles[0]
    }
  }

  return null
}

/**
 * Extracts a hex color value from a Figma variable value object.
 * Handles both raw hex strings and Figma RGBA objects.
 * @param {*} value
 * @returns {string|null}
 */
function extractHex(value) {
  if (typeof value === 'string') {
    const hex = value.trim()
    if (/^#[0-9a-fA-F]{3,8}$/.test(hex)) return hex.substring(0, 7)
    return null
  }
  if (value && typeof value === 'object') {
    if ('r' in value && 'g' in value && 'b' in value) {
      const r = Math.round((value.r ?? 0) * 255)
      const g = Math.round((value.g ?? 0) * 255)
      const b = Math.round((value.b ?? 0) * 255)
      return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
    }
    if ('hex' in value) {
      const hex = String(value.hex).trim()
      if (/^#[0-9a-fA-F]{3,8}$/.test(hex)) return hex.substring(0, 7)
    }
  }
  return null
}

/**
 * Parses a Figma variables export JSON and maps variable names to StyleSeed token roles.
 *
 * Supports two common Figma export shapes:
 *   1. { variables: [ { name, value, ... }, ... ] }
 *   2. { [collectionName]: { [variableName]: value } }
 *
 * @param {string|object} json - Raw JSON string or parsed object
 * @returns {{ palette: object, unmapped: Array<{name: string, value: string|null}> }}
 */
export function parseFigmaJson(json) {
  let data
  try {
    data = typeof json === 'string' ? JSON.parse(json) : json
  } catch {
    throw new Error('Invalid JSON')
  }

  const palette = {}
  const unmapped = []

  function processEntry(name, rawValue) {
    const hex = extractHex(rawValue)
    const role = mapVariableToRole(name)
    if (role) {
      if (!(role in palette)) {
        palette[role] = hex
      }
    } else {
      unmapped.push({ name, value: hex })
    }
  }

  if (Array.isArray(data.variables)) {
    for (const variable of data.variables) {
      const name = variable.name ?? variable.key ?? ''
      const rawValue = variable.value ?? variable.resolvedValue ?? variable.resolvedType
      processEntry(name, rawValue)
    }
  } else if (data.collections && typeof data.collections === 'object') {
    for (const collection of Object.values(data.collections)) {
      const modes = collection.modes ?? {}
      const firstMode = Object.values(modes)[0] ?? {}
      for (const [varName, varData] of Object.entries(firstMode)) {
        processEntry(varName, varData?.value ?? varData)
      }
    }
  } else if (typeof data === 'object') {
    for (const [key, val] of Object.entries(data)) {
      if (typeof val === 'string' || (typeof val === 'object' && val !== null && !Array.isArray(val))) {
        processEntry(key, val)
      } else if (typeof val === 'object' && val !== null) {
        for (const [subKey, subVal] of Object.entries(val)) {
          processEntry(`${key}/${subKey}`, subVal)
        }
      }
    }
  }

  return { palette, unmapped }
}
