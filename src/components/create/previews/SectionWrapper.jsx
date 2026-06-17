import React from 'react'

export default function SectionWrapper({ label, sectionKey, variants, currentVariant, onSectionChange, children }) {
  if (!onSectionChange || !variants || variants.length <= 1) return children
  return (
    <div className="lp-sect-wrap">
      <div className="lp-sect-bar">
        <span className="lp-sect-bar-label">{label}</span>
        <div className="lp-sect-bar-chips">
          {variants.map((v) => (
            <button
              key={v.id}
              className={`lp-sect-chip${v.id === currentVariant ? ' lp-sect-chip--active' : ''}`}
              onClick={() => onSectionChange(sectionKey, v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}
