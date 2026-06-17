import React from 'react'
import { matchWebsiteReferences } from '../../lib/websiteReferences'
import './SimilarWebsitesPanel.css'

export default function SimilarWebsitesPanel({
  kit,
  category = 'All',
  title = 'Similar Websites',
  description = 'Ranked references based on your selected palette and contrast mood.',
  limit = 4,
  variant = 'default',
  onUseReference,
  actionLabel = 'Use as inspiration',
}) {
  if (!kit) return null

  const matches = matchWebsiteReferences(kit, category, limit)

  return (
    <section className={`similar-sites similar-sites--${variant}`} aria-label={title}>
      <div className="similar-sites__head">
        <div>
          <span className="similar-sites__kicker">Palette match</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="similar-sites__grid">
        {matches.map((reference) => (
          <article key={reference.id} className="similar-sites__card">
            <a
              className="similar-sites__shot"
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${reference.name}`}
            >
              <img src={reference.screenshot} alt={`${reference.name} website screenshot`} loading="lazy" />
            </a>
            <div className="similar-sites__body">
              <div className="similar-sites__title-row">
                <div>
                  <h3>{reference.name}</h3>
                  <span>{reference.category}</span>
                </div>
                <strong>{reference.score}%</strong>
              </div>
              <div className="similar-sites__palette" aria-label={`${reference.name} palette`}>
                {reference.palette.map((hex) => (
                  <span key={hex} style={{ background: hex }} title={hex} />
                ))}
              </div>
              <ul className="similar-sites__reasons">
                {reference.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              {onUseReference && (
                <button
                  className="similar-sites__action"
                  type="button"
                  onClick={() => onUseReference(reference)}
                >
                  {actionLabel}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
