import React, { useRef, useEffect } from 'react'
import { DEFAULT_PORTFOLIO_SECTIONS, PORTFOLIO_SECTION_OPTIONS } from '../../../lib/portfolioPreviewOptions'
import SectionWrapper from './SectionWrapper'

const CLIENTS = ['Northstar', 'Atlas', 'Luma', 'Kite', 'Signal', 'Bento']
const CASE_STUDIES = [
  { title: 'Design system for an AI product suite', category: 'AI', summary: 'A reusable interface foundation for complex workflows, analytics, and onboarding.' },
  { title: 'Healthcare operations dashboard', category: 'Health', summary: 'A calmer daily workspace for teams reviewing high-volume patient activity.' },
  { title: 'Commerce workflow redesign', category: 'Retail', summary: 'Checkout, catalog, and internal tools shaped around faster decisions.' },
]
const PROJECTS = ['Figma Plugin', 'Compliance Portal', 'Insurance Quote Flow', 'Meeting Notes AI', 'Farm Ops', 'Voice Review']
const EXPLORATIONS = [
  { title: 'Design token auditor', tag: 'Developer Tools' },
  { title: 'Browser workflow assistant', tag: 'Productivity' },
  { title: 'Weather actions app', tag: 'Consumer App' },
  { title: 'AI learning companion', tag: 'EdTech' },
]

function applyPreviewTheme(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  if (kit.typography) {
    const headingFont = kit.typography.headingFont || kit.typography.displayFont
    const bodyFont = kit.typography.bodyFont || headingFont
    const displayFont = kit.typography.displayFont || headingFont
    const monoFont = kit.typography.monoFont || 'JetBrains Mono'
    if (displayFont) el.style.setProperty('--hp-display-font', `'${displayFont}', sans-serif`)
    if (headingFont) el.style.setProperty('--hp-heading-font', `'${headingFont}', sans-serif`)
    if (bodyFont) el.style.setProperty('--hp-body-font', `'${bodyFont}', sans-serif`)
    if (monoFont) el.style.setProperty('--hp-mono-font', `'${monoFont}', monospace`)
  }
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="lp-port-section-head">
      <div>
        <div className="lp-port-eyebrow">{eyebrow}</div>
        <h2 className="lp-port-section-title">{title}</h2>
      </div>
      {action && <button className="lp-btn lp-btn--ghost lp-btn--sm">{action}</button>}
    </div>
  )
}

function PortfolioHero({ variant }) {
  if (variant === 'statement') {
    return (
      <section className="lp-port-hero lp-port-hero--statement">
        <div className="lp-port-eyebrow">Independent product designer</div>
        <h1 className="lp-port-title">Designing useful products, durable systems, and thoughtful AI workflows.</h1>
        <p className="lp-port-sub">A portfolio structure for testing hierarchy, credibility, selected work, experiments, and contact flow with your kit.</p>
        <div className="lp-app-hero-ctas">
          <button className="lp-btn lp-btn--primary">View case studies</button>
          <button className="lp-btn lp-btn--ghost">Say hello</button>
        </div>
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section className="lp-port-hero lp-port-hero--split">
        <div>
          <div className="lp-port-eyebrow">Portfolio preview</div>
          <h1 className="lp-port-title">Product design for teams shipping complex tools.</h1>
          <p className="lp-port-sub">Use this structure to test personal-brand pages, agency sites, and portfolio systems without copying a third-party design.</p>
        </div>
        <div className="lp-port-profile-panel">
          <div className="lp-port-avatar">AK</div>
          <strong>Available for selected work</strong>
          <span>Design systems, dashboards, SaaS UX</span>
        </div>
      </section>
    )
  }

  return (
    <section className="lp-port-hero">
      <div className="lp-port-avatar">AK</div>
      <div className="lp-port-eyebrow">Product designer</div>
      <h1 className="lp-port-title">I shape interfaces, systems, and product stories.</h1>
      <p className="lp-port-sub">A structured portfolio preview with hero, clients, case studies, projects, explorations, contact, and footer sections.</p>
      <div className="lp-app-hero-ctas">
        <button className="lp-btn lp-btn--primary">View work</button>
        <button className="lp-btn lp-btn--ghost">Download profile</button>
      </div>
    </section>
  )
}

function ClientsSection({ variant }) {
  if (variant === 'metrics') {
    return (
      <section className="lp-port-section lp-port-section--surface">
        <SectionHeading eyebrow="Credibility" title="Selected proof points" />
        <div className="lp-port-metrics">
          {['12+ yrs', '40+ launches', '8 industries'].map((metric, index) => (
            <div className="lp-port-metric" key={metric}>
              <strong>{metric}</strong>
              <span>{['Product design', 'End-to-end work', 'Domain range'][index]}</span>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (variant === 'text-list') {
    return (
      <section className="lp-port-section lp-port-section--surface">
        <SectionHeading eyebrow="Clients" title="Teams and domains" />
        <div className="lp-port-text-list">
          {['AI personalization', 'Health operations', 'Commerce tooling', 'Financial workflows'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="lp-port-section lp-port-section--surface">
      <SectionHeading eyebrow="Clients" title="Teams I have worked with" />
      <div className="lp-port-client-strip">
        {CLIENTS.map((client) => <span key={client}>{client}</span>)}
      </div>
    </section>
  )
}

function CaseStudiesSection({ variant }) {
  if (variant === 'numbered-list') {
    return (
      <section className="lp-port-section">
        <SectionHeading eyebrow="Case studies" title="Detailed product stories" />
        <div className="lp-port-numbered">
          {CASE_STUDIES.map((item, index) => (
            <div className="lp-port-numbered-row" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.summary}</p>
              </div>
              <em>{item.category}</em>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const stacked = variant === 'stacked-stories'
  return (
    <section className="lp-port-section">
      <SectionHeading eyebrow="Case studies" title="Projects with deeper product thinking" />
      <div className={stacked ? 'lp-port-story-stack' : 'lp-port-case-grid'}>
        {CASE_STUDIES.map((item) => (
          <article className="lp-port-case-card" key={item.title}>
            <span className="lp-badge lp-badge--secondary">{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection({ variant }) {
  if (variant === 'index-list') {
    return (
      <section className="lp-port-section lp-port-section--surface">
        <SectionHeading eyebrow="Selected projects" title="Representative work" action="View archive" />
        <div className="lp-port-project-index">
          {PROJECTS.map((project, index) => (
            <div className="lp-port-project-row" key={project}>
              <span>{project}</span>
              <em>{index % 2 === 0 ? 'Product' : 'Systems'}</em>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="lp-port-section lp-port-section--surface">
      <SectionHeading eyebrow="Selected projects" title="A tighter project sample" action="View more" />
      <div className={variant === 'media-grid' ? 'lp-port-project-grid lp-port-project-grid--media' : 'lp-port-project-grid'}>
        {PROJECTS.map((project, index) => (
          <article className="lp-port-project-card" key={project}>
            <div className="lp-port-project-thumb">{index + 1}</div>
            <strong>{project}</strong>
            <span>{index % 2 === 0 ? 'Interface' : 'Workflow'}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExplorationsSection({ variant }) {
  if (variant === 'tag-cloud') {
    return (
      <section className="lp-port-section">
        <SectionHeading eyebrow="Explorations" title="Small concepts and experiments" />
        <div className="lp-port-tag-cloud">
          {EXPLORATIONS.flatMap((item) => [item.title, item.tag]).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>
    )
  }

  if (variant === 'timeline') {
    return (
      <section className="lp-port-section">
        <SectionHeading eyebrow="Explorations" title="Current thinking" />
        <div className="lp-port-timeline">
          {EXPLORATIONS.map((item, index) => (
            <div className="lp-port-timeline-item" key={item.title}>
              <span>{index + 1}</span>
              <div>
                <strong>{item.title}</strong>
                <em>{item.tag}</em>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="lp-port-section">
      <SectionHeading eyebrow="Explorations" title="Side experiments" />
      <div className="lp-port-explore-grid">
        {EXPLORATIONS.map((item) => (
          <article className="lp-port-explore-card" key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.tag}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactSection({ variant }) {
  if (variant === 'minimal') {
    return (
      <section className="lp-port-contact lp-port-contact--minimal">
        <strong>Have a project in mind?</strong>
        <span>hello@example.com</span>
      </section>
    )
  }

  if (variant === 'availability') {
    return (
      <section className="lp-port-contact">
        <div>
          <div className="lp-port-eyebrow">Availability</div>
          <h2>Selective collaborations through 2026.</h2>
          <p>Useful for portfolio pages that need a calmer consulting or freelance call-to-action.</p>
        </div>
        <button className="lp-btn lp-btn--primary">Start a conversation</button>
      </section>
    )
  }

  return (
    <section className="lp-port-contact">
      <div>
        <div className="lp-port-eyebrow">Contact</div>
        <h2>Have a product or design-system problem?</h2>
        <p>Use this section to test CTA color, email prominence, and compact conversion copy.</p>
      </div>
      <button className="lp-btn lp-btn--primary">hello@example.com</button>
    </section>
  )
}

function FooterSection({ variant }) {
  if (variant === 'social-row') {
    return (
      <footer className="lp-port-footer">
        <strong>Alex Kim</strong>
        <div className="lp-port-footer-links">
          <a>LinkedIn</a>
          <a>Portfolio</a>
          <a>Newsletter</a>
        </div>
      </footer>
    )
  }

  if (variant === 'minimal') {
    return <footer className="lp-port-footer"><span>Alex Kim - Portfolio preview</span></footer>
  }

  return (
    <footer className="lp-port-footer">
      <strong>Alex Kim</strong>
      <div className="lp-port-footer-links">
        <a>Home</a>
        <a>Case Studies</a>
        <a>Projects</a>
        <a>Explorations</a>
      </div>
      <span>Back to top</span>
    </footer>
  )
}

export default function PreviewPortfolio({ kit, sectionConfig = DEFAULT_PORTFOLIO_SECTIONS, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => {
    applyPreviewTheme(ref.current, kit)
  }, [kit])
  if (!kit) return null

  const config = { ...DEFAULT_PORTFOLIO_SECTIONS, ...sectionConfig }

  function wrap(sectionKey, children) {
    const sectionDef = PORTFOLIO_SECTION_OPTIONS.find((s) => s.key === sectionKey)
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

  return (
    <div className="lp-page lp-port-page" ref={ref}>
      <nav className="lp-app-nav lp-port-nav">
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text, #111827)' }}>Alex Kim</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Case Studies</a>
          <a className="lp-app-nav-link">Projects</a>
          <a className="lp-app-nav-link">Explorations</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Say hello</button>
      </nav>
      {wrap('hero', <PortfolioHero variant={config.hero} />)}
      {wrap('clients', <ClientsSection variant={config.clients} />)}
      {wrap('caseStudies', <CaseStudiesSection variant={config.caseStudies} />)}
      {wrap('projects', <ProjectsSection variant={config.projects} />)}
      {wrap('explorations', <ExplorationsSection variant={config.explorations} />)}
      {wrap('contact', <ContactSection variant={config.contact} />)}
      {wrap('footer', <FooterSection variant={config.footer} />)}
    </div>
  )
}
