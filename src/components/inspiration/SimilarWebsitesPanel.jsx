import React from 'react'
import { matchWebsiteReferences } from '../../lib/websiteReferences'
import './SimilarWebsitesPanel.css'

function ColorPair({ label, userHex, refHex }) {
  if (!userHex || !refHex) return null
  return (
    <div className="swp-color-pair">
      <span className="swp-color-pair-label">{label}</span>
      <div className="swp-color-pair-swatches">
        <span className="swp-swatch" style={{ background: userHex }} title={`Your ${label}: ${userHex}`} />
        <span className="swp-color-pair-arrow">→</span>
        <span className="swp-swatch" style={{ background: refHex }} title={`Their closest: ${refHex}`} />
      </div>
    </div>
  )
}

function ScoreRing({ score }) {
  const color = score >= 70 ? '#7c3aed' : score >= 45 ? '#6b7280' : '#d1d5db'
  return (
    <span className="swp-score" style={{ color, borderColor: color }}>
      {score}%
    </span>
  )
}

export default function SimilarWebsitesPanel({
  kit,
  category = 'All',
  title = 'Inspirations',
  description = 'Ranked by your palette, contrast mood, and typeface.',
  limit = 24,
  variant = 'default',
  onUseReference,
  actionLabel = 'Apply to kit',
}) {
  if (!kit) return null

  const matches = matchWebsiteReferences(kit, category, limit)

  return (
    <section className={`swp swp--${variant}`} aria-label={title}>
      <div className="swp-head">
        <span className="swp-kicker">Palette match</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="swp-count">{matches.length} sites</span>
      </div>

      <div className="swp-grid">
        {matches.map((ref) => {
          const md = ref.matchDetails || {}
          return (
            <article key={ref.id} className="swp-card">
              <a
                className="swp-shot"
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${ref.name}`}
              >
                <img src={ref.screenshot} alt={`${ref.name} screenshot`} loading="lazy" />
              </a>

              <div className="swp-body">
                <div className="swp-title-row">
                  <div className="swp-title-info">
                    <h3>{ref.name}</h3>
                    <span className="swp-category">{ref.category}</span>
                  </div>
                  <ScoreRing score={ref.score} />
                </div>

                <div className="swp-section">
                  <span className="swp-section-label">Color match</span>
                  <div className="swp-color-pairs">
                    <ColorPair label="Primary" userHex={md.userPrimary} refHex={md.primaryMatchHex} />
                    <ColorPair label="Background" userHex={md.userBg} refHex={md.bgMatchHex} />
                  </div>
                  <div className="swp-ref-palette">
                    {ref.palette.map((hex) => (
                      <span key={hex} className="swp-swatch swp-swatch--sm" style={{ background: hex }} title={hex} />
                    ))}
                  </div>
                </div>

                {md.refFonts?.heading && (
                  <div className="swp-section">
                    <span className="swp-section-label">Typography</span>
                    <div className="swp-font-info">
                      <span
                        className="swp-font-name"
                        style={{ fontFamily: `'${md.refFonts.heading}', sans-serif` }}
                      >
                        {md.refFonts.heading}
                      </span>
                      {md.refFonts.classification && (
                        <span className="swp-font-class">{md.refFonts.classification.replace(/-/g, ' ')}</span>
                      )}
                      {md.headingFont && md.headingFont === md.refFonts.heading && (
                        <span className="swp-font-match">same as yours</span>
                      )}
                    </div>
                  </div>
                )}

                {ref.reasons.length > 0 && (
                  <ul className="swp-reasons">
                    {ref.reasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}

                {onUseReference && (
                  <button
                    className="swp-apply"
                    type="button"
                    onClick={() => onUseReference(ref)}
                  >
                    {actionLabel}
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
