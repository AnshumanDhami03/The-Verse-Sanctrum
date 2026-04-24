import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isPoemReader = location.pathname.startsWith('/mahabharata/poem/')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isPoemReader) return null

  const links = [
    { to: '/', label: 'Home' },
    { to: '/mahabharata', label: 'The Mahābhārata' },
    { to: '/mahabharata#parts', label: 'Parts' },
    { to: '/mahabharata/poems', label: 'Poems' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 44px',
      background: scrolled
        ? 'rgba(10,8,6,0.92)'
        : 'linear-gradient(to bottom, rgba(10,8,6,0.8), rgba(10,8,6,0))',
      backdropFilter: 'blur(6px)',
      transition: 'background 0.4s',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          width: 30, height: 30, border: '1px solid var(--gold)', borderRadius: '50%',
          display: 'grid', placeItems: 'center', color: 'var(--gold)',
          fontFamily: 'Cinzel', fontSize: 13, position: 'relative',
        }}>
          ॐ
          <span style={{
            position: 'absolute', inset: -5, border: '1px solid var(--gold)',
            borderRadius: '50%', opacity: .3,
          }} />
        </div>
        <span style={{ fontFamily: 'Cinzel', fontSize: 13, letterSpacing: '.22em', textTransform: 'uppercase' }}>
          The Verse Sanctum
        </span>
      </Link>

      {/* Desktop nav */}
      <ul style={{ display: 'flex', gap: 34, listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden md:flex">
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} style={{
              color: location.pathname === l.to ? 'var(--gold)' : 'var(--vellum-dim)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'color .3s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = location.pathname === l.to ? 'var(--gold)' : 'var(--vellum-dim)'}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Side badge */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'center',
        color: 'var(--vellum-dim)', fontFamily: '"JetBrains Mono",monospace',
        fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
      }} className="hidden md:flex">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)', animation: 'pulseDot 2s ease-in-out infinite', display: 'inline-block' }} />
        <span>Est. MMXXV</span>
      </div>

      {/* Mobile hamburger */}
      <Link to="/mahabharata/poems" className="md:hidden" style={{ color: 'var(--vellum-dim)', fontSize: 22 }}>☰</Link>
    </nav>
  )
}
