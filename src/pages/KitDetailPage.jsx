import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import ColorPalette from '../components/kit/ColorPalette'
import ComponentGallery from '../components/kit/ComponentGallery'
import TokenTable from '../components/kit/TokenTable'
import ExportPanel from '../components/kit-detail/ExportPanel'
import SimilarWebsitesPanel from '../components/inspiration/SimilarWebsitesPanel'
import { useCustomKit } from '../context/CustomKitContext'
import { loadFontPair } from '../lib/loadGoogleFont'
import './KitDetailPage.css'

function ColorInput({ label, hex, onChange }) {
  const pickerRef = useRef(null)
  const [inputVal, setInputVal] = useState(hex ? hex.replace('#', '').toUpperCase() : '')

  useEffect(() => {
    setInputVal(hex ? hex.replace('#', '').toUpperCase() : '')
  }, [hex])

  function handleSwatchClick() {
    pickerRef.current?.click()
  }

  function handlePickerChange(e) {
    const val = e.target.value
    onChange(val)
  }

  function handleHexChange(e) {
    const raw = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)
    setInputVal(raw.toUpperCase())
    if (raw.length === 6) {
      onChange('#' + raw)
    } else if (raw.length === 3) {
      const full = raw.split('').map(c => c + c).join('')
      onChange('#' + full)
    }
  }

  return (
    <div className="kd-color-input-group">
      <span className="kd-color-input-label">{label}</span>
      <div className="kd-color-field kd-color-field--editable">
        <div
          className="kd-color-swatch kd-color-swatch--clickable"
          style={{ background: hex || '#ccc' }}
          onClick={handleSwatchClick}
          role="button"
          aria-label={`Pick color for ${label}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleSwatchClick()}
        />
        <input
          ref={pickerRef}
          type="color"
          value={hex || '#cccccc'}
          onChange={handlePickerChange}
          className="kd-color-picker-input"
          tabIndex={-1}
          aria-hidden="true"
        />
        <input
          className="kd-color-hex"
          value={inputVal}
          onChange={handleHexChange}
          spellCheck={false}
          maxLength={6}
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  )
}

function CustomKitDetail({ kit }) {
  const { palette } = kit
  const light = palette?.light ?? {}
  const dark = palette?.dark ?? {}

  const roles = [
    'background', 'surface', 'primary', 'secondary', 'accent',
    'text', 'textMuted', 'border', 'success', 'warning',
  ]

  return (
    <div className="kit-detail-custom">
      <div className="kit-detail-custom-header">
        <h1 className="kit-detail-custom-name">{kit.name}</h1>
        <span className="kit-detail-custom-badge">{kit.industry}</span>
      </div>
      <p className="kit-detail-custom-desc">{kit.description}</p>

      <div className="kit-detail-palettes">
        <div className="kit-palette-block">
          <h2 className="kit-palette-title">Light Mode</h2>
          <div className="kit-palette-swatches">
            {roles.map((role) =>
              light[role] ? (
                <div key={role} className="kit-palette-swatch">
                  <div
                    className="kit-palette-dot"
                    style={{ background: light[role] }}
                    title={light[role]}
                  />
                  <span className="kit-palette-role">{role}</span>
                  <span className="kit-palette-hex">{light[role]}</span>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="kit-palette-block">
          <h2 className="kit-palette-title">Dark Mode</h2>
          <div className="kit-palette-swatches">
            {roles.map((role) =>
              dark[role] ? (
                <div key={role} className="kit-palette-swatch">
                  <div
                    className="kit-palette-dot"
                    style={{ background: dark[role] }}
                    title={dark[role]}
                  />
                  <span className="kit-palette-role">{role}</span>
                  <span className="kit-palette-hex">{dark[role]}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      <SimilarWebsitesPanel
        kit={kit}
        category={kit.industry}
        title="Similar Websites"
        description="References ranked against this kit's primary color, background, contrast mood, and category."
        limit={3}
        variant="detail"
      />

      <div className="kit-detail-export">
        <h2 className="kit-export-title">Export Tokens</h2>
        <p className="kit-export-desc">
          Full token export and component previews are coming soon. Your custom kit is saved in this
          session — you can always go back to <Link to="/create">Edit Kit</Link> to make changes.
        </p>
      </div>
    </div>
  )
}

function FontSpecimen({ kit }) {
  const headingFont = kit?.typography?.headingFont
  const bodyFont = kit?.typography?.bodyFont
  if (!headingFont && !bodyFont) return null

  return (
    <div className="kd-font-specimen-row">
      {headingFont && (
        <div className="kd-font-specimen-card">
          <div
            className="kd-font-specimen-sample kd-font-specimen-sample--heading"
            style={{ fontFamily: `'${headingFont}', serif` }}
          >
            Aa
          </div>
          <div className="kd-font-specimen-meta">
            <span className="kd-font-specimen-name">{headingFont}</span>
            <span className="kd-font-specimen-role">Heading font</span>
          </div>
        </div>
      )}
      {bodyFont && (
        <div className="kd-font-specimen-card">
          <div
            className="kd-font-specimen-sample kd-font-specimen-sample--body"
            style={{ fontFamily: `'${bodyFont}', sans-serif` }}
          >
            The quick brown fox jumps over the lazy dog.
          </div>
          <div className="kd-font-specimen-meta">
            <span className="kd-font-specimen-name">{bodyFont}</span>
            <span className="kd-font-specimen-role">Body font</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function KitDetailPage() {
  const { id } = useParams()
  const { customKit } = useCustomKit()
  const [kit, setKit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mode, setMode] = useState('light')
  const [overrides, setOverrides] = useState({ light: {}, dark: {} })

  const isCustom = id === 'custom'

  useEffect(() => {
    if (isCustom) {
      setLoading(false)
      return
    }
    setLoading(true)
    setNotFound(false)
    setOverrides({ light: {}, dark: {} })
    fetch(`/kits/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => {
        setKit(data)
        if (data.typography) {
          loadFontPair(data.typography.headingFont, data.typography.bodyFont)
        }
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [id, isCustom])

  const modeOverrides = overrides[mode] || {}
  const hasOverrides = Object.keys(modeOverrides).length > 0

  function handleColorChange(role, value) {
    setOverrides((prev) => ({
      ...prev,
      [mode]: { ...prev[mode], [role]: value },
    }))
  }

  function handleReset() {
    setOverrides((prev) => ({ ...prev, [mode]: {} }))
  }

  if (isCustom) {
    return (
      <div className="kd-page">
        <div className="kd-inner">
          <Link to="/create" className="kd-back">← Back to create</Link>
          {customKit ? (
            <CustomKitDetail kit={customKit} />
          ) : (
            <div className="kd-not-found">
              <span className="kd-not-found-icon">🎨</span>
              <h1>No Custom Kit Found</h1>
              <p>
                It looks like your custom kit session has expired or was never created.
                Head back to the create page to build your kit.
              </p>
              <Link to="/create" className="kd-btn kd-btn--primary">Create a Kit →</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="kd-page">
        <div className="kd-inner">
          <Link to="/browse" className="kd-back">← Browse kits</Link>
          <div className="kd-loading">
            <div className="kd-loading-spinner" />
            <p>Loading kit…</p>
          </div>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="kd-page">
        <div className="kd-inner">
          <Link to="/browse" className="kd-back">← Browse kits</Link>
          <div className="kd-not-found">
            <span className="kd-not-found-icon">🔍</span>
            <h1>Kit not found</h1>
            <p>We couldn't find a kit with the ID <code>{id}</code>.</p>
            <Link to="/browse" className="kd-btn kd-btn--primary">Browse all kits</Link>
          </div>
        </div>
      </div>
    )
  }

  const basePalette = kit.palette?.[mode] || {}
  const effectivePalette = { ...basePalette, ...modeOverrides }

  const mergedKit = {
    ...kit,
    palette: {
      ...kit.palette,
      [mode]: effectivePalette,
    },
  }

  const colorKeys = ['primary', 'secondary', 'accent', 'background', 'surface']

  return (
    <div className="kd-page">
      <div className="kd-inner">
        <Link to="/browse" className="kd-back">← Browse kits</Link>

        <div className="kd-hero">
          <div className="kd-hero-text">
            <div className="kd-industry-badge">{kit.industry}</div>
            <h1 className="kd-kit-name">{kit.name}</h1>
            <p className="kd-kit-desc">{kit.description}</p>
          </div>

          {/* Light / Dark pill toggle + Export shortcut */}
          <div className="kd-hero-actions">
            <div className="kd-mode-toggle" role="group" aria-label="Color mode">
              <button
                className={`kd-toggle-btn${mode === 'light' ? ' kd-toggle-btn--active' : ''}`}
                onClick={() => setMode('light')}
              >
                ☀ Light
              </button>
              <button
                className={`kd-toggle-btn${mode === 'dark' ? ' kd-toggle-btn--active' : ''}`}
                onClick={() => setMode('dark')}
              >
                ◑ Dark
              </button>
            </div>
            <a
              className="kd-export-shortcut"
              href="#export-panel"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('export-panel')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Export for AI →
            </a>
          </div>
        </div>

        <div className="kd-color-inputs">
          {colorKeys.map((role) => (
            <ColorInput
              key={role}
              label={role.charAt(0).toUpperCase() + role.slice(1)}
              hex={effectivePalette[role]}
              onChange={(val) => handleColorChange(role, val)}
            />
          ))}
          {hasOverrides && (
            <button className="kd-reset-btn" onClick={handleReset} aria-label="Reset colors to original">
              Reset to original
            </button>
          )}
        </div>

        {kit.typography && (
          <section className="kd-section kd-section--typography">
            <div className="kd-section-header">
              <h2 className="kd-section-title">Typography</h2>
              <p className="kd-section-desc">The font pair used in this kit.</p>
            </div>
            <FontSpecimen kit={kit} />
          </section>
        )}

        <section className="kd-section">
          <SimilarWebsitesPanel
            kit={mergedKit}
            category={kit.industry}
            title="Similar Websites"
            description="References ranked against this kit's current colors, contrast mood, and category."
            limit={3}
            variant="detail"
          />
        </section>

        <section className="kd-section">
          <ColorPalette kit={mergedKit} mode={mode} />
        </section>

        <section className="kd-section">
          <div className="kd-section-header">
            <h2 className="kd-section-title">Component Preview</h2>
            <p className="kd-section-desc">Live UI components rendered with this kit's tokens. Toggle light/dark to see both modes.</p>
          </div>
          <ComponentGallery kit={mergedKit} mode={mode} />
        </section>

        <section className="kd-section">
          <div className="kd-section-header">
            <h2 className="kd-section-title">Design Tokens</h2>
            <p className="kd-section-desc">Raw token values for typography, spacing, border radius, and shadows.</p>
          </div>
          <TokenTable kit={mergedKit} />
        </section>

        <ExportPanel kit={mergedKit} />
      </div>
    </div>
  )
}
