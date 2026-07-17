import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutGrid, Moon, Sun, Code2 } from 'lucide-react'
import { useTheme } from '../../lib/useTheme'
import './TopNav.css'

export default function TopNav() {
  const { isDark, toggle } = useTheme()

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link to="/" className="top-nav-wordmark">StyleSeed</Link>

        <nav className="top-nav-links">
          <NavLink
            to="/browse"
            className={({ isActive }) => 'top-nav-link' + (isActive ? ' active' : '')}
          >
            Browse Kits
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => 'top-nav-link top-nav-link--cta' + (isActive ? ' active' : '')}
          >
            Create Kit
          </NavLink>
          <NavLink
            to="/preview"
            className={({ isActive }) => 'top-nav-link' + (isActive ? ' active' : '')}
          >
            <Code2 size={15} style={{ marginRight: 5, verticalAlign: -2 }} />
            Preview
          </NavLink>
          <NavLink
            to="/canvas"
            className={({ isActive }) => 'top-nav-link' + (isActive ? ' active' : '')}
          >
            <LayoutGrid size={15} style={{ marginRight: 5, verticalAlign: -2 }} />
            Canvas
          </NavLink>
        </nav>

        <button
          className="top-nav-theme-btn"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
