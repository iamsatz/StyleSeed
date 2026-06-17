import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

const JOBS = [
  { role: 'Senior Product Designer', company: 'Stripe', initials: 'ST', location: 'Remote', salary: '$140–$180K', tags: ['Full-time', 'Design', 'Remote'], featured: true, posted: '2d ago', type: 'Design' },
  { role: 'Frontend Engineer', company: 'Linear', initials: 'LN', location: 'SF / Remote', salary: '$160–$200K', tags: ['Full-time', 'React'], featured: false, posted: '3d ago', type: 'Engineering' },
  { role: 'Product Manager', company: 'Figma', initials: 'FG', location: 'San Francisco', salary: '$150–$190K', tags: ['Full-time', 'Product'], featured: false, posted: '1d ago', type: 'Product' },
  { role: 'Brand Designer', company: 'Vercel', initials: 'VC', location: 'Remote', salary: '$120–$150K', tags: ['Full-time', 'Brand', 'Remote'], featured: false, posted: '5d ago', type: 'Design' },
  { role: 'Staff Engineer', company: 'Notion', initials: 'NT', location: 'NYC / Remote', salary: '$200–$250K', tags: ['Full-time', 'Leadership'], featured: false, posted: '1d ago', type: 'Engineering' },
]

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  if (kit.typography) {
    const heading = kit.typography.headingFont || kit.typography.displayFont
    const body = kit.typography.bodyFont || heading
    if (heading) el.style.setProperty('--hp-heading-font', `'${heading}', sans-serif`)
    if (body) el.style.setProperty('--hp-body-font', `'${body}', sans-serif`)
    if (kit.typography.displayFont) el.style.setProperty('--hp-display-font', `'${kit.typography.displayFont}', sans-serif`)
    if (kit.typography.monoFont) el.style.setProperty('--hp-mono-font', `'${kit.typography.monoFont}', monospace`)
  }
}

// ── Search variants ──────────────────────────────────────────────────────────

function SearchTopBar() {
  return (
    <div style={{ padding: '14px 24px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <input className="lp-input" placeholder="Job title, skill, or company" readOnly style={{ flex: 2, minWidth: 160, fontSize: '0.875rem' }} />
        <input className="lp-input" placeholder="Location or Remote" readOnly style={{ flex: 1, minWidth: 120, fontSize: '0.875rem' }} />
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search Jobs</button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', fontWeight: 600 }}>Filter:</span>
        {['All', 'Remote', 'Full-time', 'Design', 'Engineering'].map((chip, i) => (
          <button key={i} className={`lp-chip${i === 0 ? ' lp-chip--active' : ''}`}>{chip}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>284 positions</span>
      </div>
    </div>
  )
}

function SearchSidebar({ children }) {
  return (
    <div style={{ display: 'flex', gap: 0, background: 'var(--hp-background)' }}>
      <div style={{ width: 180, flexShrink: 0, background: 'var(--hp-surface)', borderRight: '1px solid var(--hp-border)', padding: '14px 14px' }}>
        <input className="lp-input" placeholder="Search jobs…" readOnly style={{ marginBottom: 14, fontSize: '0.8125rem' }} />
        {[
          { label: 'Job Type', options: ['Full-time', 'Contract', 'Part-time'] },
          { label: 'Category', options: ['Design', 'Engineering', 'Product', 'Marketing'] },
          { label: 'Location', options: ['Remote', 'On-site', 'Hybrid'] },
        ].map((group, gi) => (
          <div key={gi} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hp-textMuted)', marginBottom: 6 }}>{group.label}</div>
            {group.options.map((opt, oi) => (
              <label key={oi} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--hp-text)', marginBottom: 4, cursor: 'pointer' }}>
                <input type="checkbox" readOnly checked={oi === 0} style={{ accentColor: 'var(--hp-primary)' }} />
                {opt}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

// ── Job list variants ────────────────────────────────────────────────────────

function JobCardFull({ job }) {
  return (
    <div style={{ border: `${job.featured ? '2' : '1'}px solid ${job.featured ? 'var(--hp-primary)' : 'var(--hp-border)'}`, borderRadius: 10, padding: '12px 14px', background: 'var(--hp-surface)', position: 'relative' }}>
      {job.featured && (
        <div style={{ position: 'absolute', top: -8, right: 12, background: 'var(--hp-primary)', color: 'var(--hp-background)', fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>Featured</div>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0, background: job.featured ? 'var(--hp-primary)' : 'var(--hp-border)', color: job.featured ? 'var(--hp-background)' : 'var(--hp-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', border: '1.5px solid var(--hp-border)' }}>
          {job.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{job.role}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginBottom: 6 }}>{job.company} · {job.location} · {job.posted}</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {job.tags.map((tag, j) => (
              <span key={j} className={j === 0 ? 'lp-badge lp-badge--secondary' : 'lp-badge'} style={{ fontSize: '0.6875rem', background: j > 0 ? 'var(--hp-surface)' : undefined }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{job.salary}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success)', fontWeight: 600, marginBottom: 6 }}>● Active</div>
          <button className="lp-btn lp-btn--primary lp-btn--sm">Apply</button>
        </div>
      </div>
    </div>
  )
}

function JobCardSummary({ job }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', border: '1px solid var(--hp-border)', borderRadius: 8, background: 'var(--hp-surface)' }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0, background: 'var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>
        {job.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.role}</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{job.company} · {job.location}</div>
      </div>
      <div style={{ flexShrink: 0, textAlign: 'right' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-primary)' }}>{job.salary}</div>
        <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.65rem', padding: '2px 8px', marginTop: 4 }}>Apply</button>
      </div>
    </div>
  )
}

function JobListList({ cardVariant }) {
  return (
    <div style={{ padding: '14px 24px', background: 'var(--hp-background)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {JOBS.map((job, i) =>
        cardVariant === 'summary'
          ? <JobCardSummary key={i} job={job} />
          : <JobCardFull key={i} job={job} />
      )}
    </div>
  )
}

function JobListGrid({ cardVariant }) {
  return (
    <div style={{ padding: '14px 24px', background: 'var(--hp-background)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {JOBS.slice(0, 4).map((job, i) => (
        <div key={i} style={{ border: `${job.featured ? '2' : '1'}px solid ${job.featured ? 'var(--hp-primary)' : 'var(--hp-border)'}`, borderRadius: 10, padding: '12px', background: 'var(--hp-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.7rem', color: 'var(--hp-textMuted)' }}>{job.initials}</div>
            {job.featured && <span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.6rem' }}>Featured</span>}
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{job.role}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginBottom: 8 }}>{job.company} · {job.location}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-primary)' }}>{job.salary}</span>
            <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.7rem' }}>Apply</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function JobListCompact({ cardVariant }) {
  return (
    <div style={{ padding: '8px 24px', background: 'var(--hp-background)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1.5px solid var(--hp-border)' }}>
            {['Role', 'Company', 'Location', 'Salary', ''].map((h, i) => (
              <th key={i} style={{ textAlign: 'left', padding: '6px 8px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {JOBS.map((job, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--hp-border)', background: job.featured ? 'rgba(var(--hp-primary-rgb,124,58,237),0.04)' : 'transparent' }}>
              <td style={{ padding: '8px 8px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{job.role}</td>
              <td style={{ padding: '8px 8px', fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>{job.company}</td>
              <td style={{ padding: '8px 8px', fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>{job.location}</td>
              <td style={{ padding: '8px 8px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-primary)' }}>{job.salary}</td>
              <td style={{ padding: '8px 8px', textAlign: 'right' }}><button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>Apply</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PreviewJobBoard({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('jobs')
  const defaults = getDefaultSections('jobs')
  const config = { ...defaults, ...sectionConfig }

  function wrap(sectionKey, children) {
    const sectionDef = sections.find((s) => s.key === sectionKey)
    return (
      <SectionWrapper
        key={sectionKey}
        label={sectionDef?.label || sectionKey}
        sectionKey={sectionKey}
        variants={sectionDef?.variants || []}
        currentVariant={config[sectionKey]}
        onSectionChange={onSectionChange}
      >
        {children}
      </SectionWrapper>
    )
  }

  const cardVariant = config.card

  const listNode =
    config.list === 'grid' ? <JobListGrid cardVariant={cardVariant} /> :
    config.list === 'compact' ? <JobListCompact cardVariant={cardVariant} /> :
    <JobListList cardVariant={cardVariant} />

  const mainContent = (
    <div>
      {wrap('list', listNode)}
    </div>
  )

  const searchAndBody =
    config.search === 'sidebar'
      ? (
        <>
          {wrap('search', <SearchSidebar>{mainContent}</SearchSidebar>)}
        </>
      )
      : (
        <>
          {wrap('search', <SearchTopBar />)}
          {mainContent}
        </>
      )

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text)' }}>WorkBoards</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Browse</a>
          <a className="lp-app-nav-link">Companies</a>
          <a className="lp-app-nav-link">Salary</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Post a Job</button>
      </nav>
      {searchAndBody}
    </div>
  )
}
