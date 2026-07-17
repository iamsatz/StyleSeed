import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './landing.css'

export default function Footer() {
  return (
    <>
      {/* CTA section */}
      <section className="hp-cta-section">
        <div className="hp-inner hp-cta-inner">
          <h2 className="hp-cta-h2">
            Stop starting from<br />a blank prompt.
          </h2>
          <p className="hp-cta-sub">
            Every AI generation should start with your brand, not someone else's defaults.
            Pick a kit. Export. Ship.
          </p>
          <div className="hp-cta-btns">
            <Link to="/browse" className="hp-btn hp-btn-primary">
              Browse Kits
              <ArrowRight size={16} />
            </Link>
            <Link to="/create" className="hp-btn hp-btn-ghost">
              Import Your Colors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hp-footer">
        <div className="hp-inner hp-footer-inner">
          <div className="hp-footer-brand">
            <span className="hp-footer-wordmark">StyleSeed</span>
            <span className="hp-footer-tagline">Design tokens for AI builders.</span>
          </div>
          <div className="hp-footer-links">
            <Link to="/browse" className="hp-footer-link">Browse Kits</Link>
            <Link to="/create" className="hp-footer-link">Create Kit</Link>
          </div>
          <p className="hp-footer-copy">© {new Date().getFullYear()} StyleSeed</p>
        </div>
      </footer>
    </>
  )
}
