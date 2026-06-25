import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Monitor, Moon, Smartphone, Sun, Tablet } from 'lucide-react'
import { loadKits } from '../lib/loadKits'
import { useCustomKit } from '../context/CustomKitContext'
import { loadFontPair } from '../lib/loadGoogleFont'
import { getKitTypography } from '../lib/kitThemeTokens'
import { VIEWPORTS } from '../lib/canvasInspector'
import {
  buildPreviewSrcDoc,
  DEFAULT_HTML_SAMPLE,
  DEFAULT_JSX_SAMPLE,
  TOKEN_LEGEND,
} from '../lib/previewSandbox'
import './CodePreviewPage.css'

const STORAGE_KEY = 'hueprint_code_preview'
const VIEWPORT_ICONS = { monitor: Monitor, tablet: Tablet, smartphone: Smartphone }

function loadStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveStoredState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export default function CodePreviewPage() {
  const [searchParams] = useSearchParams()
  const { customKit } = useCustomKit()
  const [kits, setKits] = useState([])
  const [loading, setLoading] = useState(true)

  const stored = loadStoredState()
  const urlKitId = searchParams.get('kit')
  const urlMode = searchParams.get('mode')

  const [kitRef, setKitRef] = useState(() => ({
    source: urlKitId === 'custom' ? 'custom' : 'curated',
    id: urlKitId || stored?.kitId || 'saas-clarity',
  }))
  const [mode, setMode] = useState(() => (urlMode === 'dark' ? 'dark' : stored?.mode || 'light'))
  const [viewport, setViewport] = useState(() => stored?.viewport || 'desktop')
  const [format, setFormat] = useState(() => stored?.format || 'html')
  const [code, setCode] = useState(() => stored?.code || '')
  const [debouncedCode, setDebouncedCode] = useState(code)

  useEffect(() => {
    loadKits().then(setKits).catch(() => setKits([])).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (urlKitId) {
      setKitRef({
        source: urlKitId === 'custom' ? 'custom' : 'curated',
        id: urlKitId,
      })
    }
    if (urlMode === 'dark' || urlMode === 'light') setMode(urlMode)
  }, [urlKitId, urlMode])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCode(code), 300)
    return () => clearTimeout(t)
  }, [code])

  useEffect(() => {
    saveStoredState({ kitId: kitRef.id, kitSource: kitRef.source, mode, viewport, format, code })
  }, [kitRef, mode, viewport, format, code])

  const resolvedKit = useMemo(() => {
    if (kitRef.source === 'custom' && customKit) return customKit
    return kits.find((k) => k.id === kitRef.id) || kits[0] || null
  }, [kitRef, customKit, kits])

  useEffect(() => {
    if (!resolvedKit?.typography) return
    const typo = getKitTypography(resolvedKit)
    loadFontPair(typo.headingFont, typo.bodyFont)
    if (typo.displayFont && typo.displayFont !== typo.headingFont) loadFontPair(typo.displayFont, null)
    if (typo.monoFont) loadFontPair(typo.monoFont, null)
  }, [resolvedKit])

  const srcDoc = useMemo(
    () => buildPreviewSrcDoc({ kit: resolvedKit, mode, code: debouncedCode, format }),
    [resolvedKit, mode, debouncedCode, format]
  )

  const viewportWidth = VIEWPORTS.find((v) => v.id === viewport)?.width ?? null

  const handleKitChange = useCallback((e) => {
    const value = e.target.value
    if (value === 'custom') {
      if (customKit) setKitRef({ source: 'custom', id: customKit.id || 'custom' })
      return
    }
    setKitRef({ source: 'curated', id: value })
  }, [customKit])

  const handleFormatChange = useCallback((next) => {
    setFormat(next)
    if (!code.trim()) {
      setCode(next === 'jsx' ? DEFAULT_JSX_SAMPLE : DEFAULT_HTML_SAMPLE)
    }
  }, [code])

  const handleLoadSample = useCallback(() => {
    setCode(format === 'jsx' ? DEFAULT_JSX_SAMPLE : DEFAULT_HTML_SAMPLE)
  }, [format])

  const currentKitValue = kitRef.source === 'custom' ? 'custom' : kitRef.id

  return (
    <div className="cpv-page">
      <header className="cpv-header">
        <div>
          <h1 className="cpv-title">Code Preview</h1>
          <p className="cpv-sub">
            Paste AI-generated HTML or JSX — validate your kit tokens on real output before handoff.
          </p>
        </div>
      </header>

      <div className="cpv-controls">
        <div className="cpv-controls-left">
          <span className="cpv-label">Kit</span>
          <select
            className="cpv-select"
            value={currentKitValue}
            onChange={handleKitChange}
            disabled={loading}
            aria-label="Select design kit"
          >
            {kits.map((kit) => (
              <option key={kit.id} value={kit.id}>{kit.name}</option>
            ))}
            {customKit && (
              <option value="custom">{customKit.name || 'Custom Kit'}</option>
            )}
          </select>
          {resolvedKit && (
            <span className="cpv-kit-meta">{resolvedKit.industry}</span>
          )}
        </div>

        <div className="cpv-controls-right">
          <div className="cpv-format" role="group" aria-label="Code format">
            <button
              type="button"
              className={`cpv-mode-btn${format === 'html' ? ' cpv-mode-btn--active' : ''}`}
              onClick={() => handleFormatChange('html')}
              aria-pressed={format === 'html'}
            >
              HTML / Tailwind
            </button>
            <button
              type="button"
              className={`cpv-mode-btn${format === 'jsx' ? ' cpv-mode-btn--active' : ''}`}
              onClick={() => handleFormatChange('jsx')}
              aria-pressed={format === 'jsx'}
            >
              JSX
            </button>
          </div>

          <div className="cpv-viewport" role="group" aria-label="Preview viewport">
            {VIEWPORTS.map((vp) => {
              const Icon = VIEWPORT_ICONS[vp.icon] || Monitor
              return (
                <button
                  key={vp.id}
                  type="button"
                  className={`cpv-mode-btn${viewport === vp.id ? ' cpv-mode-btn--active' : ''}`}
                  onClick={() => setViewport(vp.id)}
                  aria-pressed={viewport === vp.id}
                  title={vp.label}
                >
                  <Icon size={14} />
                  {vp.label}
                </button>
              )
            })}
          </div>

          <div className="cpv-theme" role="group" aria-label="Color mode">
            <button
              type="button"
              className={`cpv-mode-btn${mode === 'light' ? ' cpv-mode-btn--active' : ''}`}
              onClick={() => setMode('light')}
              aria-pressed={mode === 'light'}
            >
              <Sun size={14} />
              Light
            </button>
            <button
              type="button"
              className={`cpv-mode-btn${mode === 'dark' ? ' cpv-mode-btn--active' : ''}`}
              onClick={() => setMode('dark')}
              aria-pressed={mode === 'dark'}
            >
              <Moon size={14} />
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="cpv-workspace">
        <aside className="cpv-editor">
          <div className="cpv-editor-toolbar">
            <span className="cpv-editor-label">Paste code</span>
            <button type="button" className="cpv-sample-btn" onClick={handleLoadSample}>
              Load sample
            </button>
          </div>
          <textarea
            className="cpv-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={format === 'jsx' ? 'Paste JSX (fragment inside PreviewApp return)…' : 'Paste HTML with Tailwind classes…'}
            spellCheck={false}
            aria-label="Code to preview"
          />
          <div className="cpv-legend">
            <div className="cpv-legend-title">Available Tailwind tokens</div>
            <ul className="cpv-legend-list">
              {TOKEN_LEGEND.map((item) => (
                <li key={item.token}>
                  <code>{item.token}</code>
                  <span>{item.role}</span>
                </li>
              ))}
            </ul>
            <p className="cpv-legend-hint">
              Hardcoded hex values won&apos;t re-theme — that&apos;s useful feedback that your AI output ignored the design system.
            </p>
          </div>
        </aside>

        <div className={`cpv-preview-wrap${viewport !== 'desktop' ? ` cpv-preview-wrap--${viewport}` : ''}`}>
          <div
            className="cpv-preview-frame"
            style={viewportWidth ? { maxWidth: viewportWidth, margin: '0 auto' } : undefined}
          >
            {resolvedKit ? (
              <iframe
                title="Kit-themed code preview"
                className="cpv-iframe"
                sandbox="allow-scripts"
                srcDoc={srcDoc}
              />
            ) : (
              <div className="cpv-empty">Select a kit to preview</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
