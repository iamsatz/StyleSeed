import {
  kitToCssVarDeclarations,
  kitToTailwindThemeExtend,
  getFontStylesheetHrefs,
} from './kitThemeTokens'

export const DEFAULT_HTML_SAMPLE = `<section class="bg-background text-text font-sans min-h-screen p-10">
  <div class="max-w-xl mx-auto bg-surface border border-border rounded-lg p-8 shadow-md">
    <p class="text-primary text-sm font-semibold uppercase tracking-wide mb-2">Design system check</p>
    <h1 class="text-3xl font-bold font-heading text-text mb-3">Your kit is applied</h1>
    <p class="text-textMuted mb-6">If this hero uses your brand colors and fonts, the tokens are working.</p>
    <div class="flex gap-3">
      <button class="bg-primary text-white px-5 py-2.5 rounded-md font-semibold">Primary action</button>
      <button class="bg-surface text-text border border-border px-5 py-2.5 rounded-md font-semibold">Secondary</button>
    </div>
  </div>
</section>`

export const DEFAULT_JSX_SAMPLE = `<section className="bg-background text-text font-sans min-h-screen p-10">
  <div className="max-w-xl mx-auto bg-surface border border-border rounded-lg p-8">
    <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-2">Design system check</p>
    <h1 className="text-3xl font-bold font-heading text-text mb-3">Your kit is applied</h1>
    <p className="text-textMuted mb-6">If this hero uses your brand colors and fonts, the tokens are working.</p>
    <button className="bg-primary text-white px-5 py-2.5 rounded-md font-semibold">Primary action</button>
  </div>
</section>`

/** @param {string} str */
function escapeScriptClosingTag(str) {
  return String(str).replace(/<\/script/gi, '<\\/script')
}

/**
 * Build a sandboxed iframe srcdoc with kit tokens + Tailwind.
 * @param {{ kit: object, mode?: 'light'|'dark', code?: string, format?: 'html'|'jsx' }} options
 */
export function buildPreviewSrcDoc({ kit, mode = 'light', code = '', format = 'html' }) {
  if (!kit) return '<!DOCTYPE html><html><body><p>No kit selected</p></body></html>'

  const cssVars = kitToCssVarDeclarations(kit, mode)
  const fontHrefs = getFontStylesheetHrefs(kit)
  const themeExtend = kitToTailwindThemeExtend(kit, { useCssVars: true })
  const fontLinks = fontHrefs.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n')
  const tailwindConfig = JSON.stringify({ theme: { extend: themeExtend } }).replace(/</g, '\\u003c')

  const baseStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; font-family: var(--hp-body-font, system-ui, sans-serif); font-size: var(--hp-font-size, 16px); line-height: var(--hp-line-height, 1.6); background: var(--hp-background); color: var(--hp-text); }
  :root {
${cssVars}
  }`

  if (format === 'jsx') {
    const jsxBody = escapeScriptClosingTag(code.trim() || DEFAULT_JSX_SAMPLE)
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${fontLinks}
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = ${tailwindConfig}</script>
<style>${baseStyles}</style>
</head>
<body>
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel" data-presets="react">
function PreviewApp() {
  return (
    ${jsxBody}
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PreviewApp />);
</script>
</body>
</html>`
  }

  const htmlBody = code.trim() || DEFAULT_HTML_SAMPLE

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${fontLinks}
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = ${tailwindConfig}</script>
<style>${baseStyles}</style>
</head>
<body>
${htmlBody}
</body>
</html>`
}

export const TOKEN_LEGEND = [
  { token: 'bg-primary, text-primary', role: 'Primary brand / CTAs' },
  { token: 'bg-secondary', role: 'Secondary actions' },
  { token: 'bg-accent', role: 'Highlights & badges' },
  { token: 'bg-background', role: 'Page background' },
  { token: 'bg-surface', role: 'Cards & panels' },
  { token: 'text-text', role: 'Primary copy' },
  { token: 'text-textMuted', role: 'Captions & labels' },
  { token: 'border-border', role: 'Dividers & outlines' },
  { token: 'font-sans, font-heading, font-display', role: 'Typography roles' },
]
