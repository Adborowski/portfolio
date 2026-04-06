import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const HASH_LINKS = [
  ['Projects', '/#projects'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isCV = location.pathname === '/cv'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={scrolled ? 'nav-scrolled' : ''}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid transparent',
        transition: 'background 0.2s, border-color 0.2s, backdrop-filter 0.2s',
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link
          to="/"
          style={{ fontWeight: 500, color: 'var(--text-h)', fontSize: 15, letterSpacing: '-0.01em', textDecoration: 'none' }}
        >
          Adam Borowski
        </Link>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {HASH_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: 14, color: 'var(--text)', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-h)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
            >
              {label}
            </a>
          ))}
          <Link
            to="/cv"
            style={{
              fontSize: 14,
              fontWeight: isCV ? 500 : 400,
              color: isCV ? 'var(--accent)' : 'var(--text)',
              transition: 'color 0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = isCV ? 'var(--accent)' : 'var(--text-h)')}
            onMouseLeave={e => (e.currentTarget.style.color = isCV ? 'var(--accent)' : 'var(--text)')}
          >
            CV
          </Link>
        </nav>
      </div>
    </header>
  )
}
