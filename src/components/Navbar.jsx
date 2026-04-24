import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isPoemReader = location.pathname.startsWith('/mahabharata/poem/')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  if (isPoemReader) return null

  const links = [
    { to: '/', label: 'Home' },
    { to: '/mahabharata', label: 'The Mahābhārata' },
    { to: '/mahabharata#parts', label: 'Parts' },
    { to: '/mahabharata/poems', label: 'Poems' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(14px,2vw,22px) clamp(16px,4vw,44px)',
        background: scrolled || menuOpen
          ? 'rgba(10,8,6,0.96)'
          : 'linear-gradient(to bottom, rgba(10,8,6,0.8), rgba(10,8,6,0))',
        backdropFilter: 'blur(8px)',
        transition: 'background 0.4s',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', color:'inherit', flexShrink:0 }}>
          <div style={{ width:28, height:28, border:'1px solid var(--gold)', borderRadius:'50%', display:'grid', placeItems:'center', color:'var(--gold)', fontFamily:'Cinzel', fontSize:12, position:'relative', flexShrink:0 }}>
            ॐ
            <span style={{ position:'absolute', inset:-4, border:'1px solid var(--gold)', borderRadius:'50%', opacity:.3 }}/>
          </div>
          <span style={{ fontFamily:'Cinzel', fontSize:'clamp(10px,1.5vw,13px)', letterSpacing:'.18em', textTransform:'uppercase' }}>
            The Verse Sanctum
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul style={{ display:'flex', gap:28, listStyle:'none', margin:0, padding:0 }}
            className="hidden md:flex">
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} style={{
                color: location.pathname === l.to ? 'var(--gold)' : 'var(--vellum-dim)',
                fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.18em',
                textTransform:'uppercase', textDecoration:'none', transition:'color .3s',
              }}
              onMouseEnter={e=>e.target.style.color='var(--gold)'}
              onMouseLeave={e=>e.target.style.color=location.pathname===l.to?'var(--gold)':'var(--vellum-dim)'}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop badge */}
        <div style={{ display:'flex', gap:10, alignItems:'center', color:'var(--vellum-dim)', fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase' }}
             className="hidden md:flex">
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)', boxShadow:'0 0 8px var(--gold)', animation:'pulseDot 2s ease-in-out infinite', display:'inline-block' }}/>
          <span>Est. MMXXV</span>
        </div>

        {/* Mobile hamburger */}
        <button onClick={()=>setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ background:'none', border:'none', color:'var(--gold)', fontSize:22, lineHeight:1, padding:'4px 8px' }}
          aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position:'fixed', top:'56px', left:0, right:0, zIndex:49,
          background:'rgba(10,8,6,0.97)', backdropFilter:'blur(12px)',
          borderBottom:'1px solid rgba(228,176,74,.15)',
          padding:'24px clamp(16px,4vw,44px) 32px',
        }}>
          {links.map((l, i) => (
            <Link key={l.to} to={l.to} onClick={()=>setMenuOpen(false)}
              style={{
                display:'block', padding:'14px 0',
                borderBottom: i < links.length-1 ? '1px solid rgba(228,176,74,.08)' : 'none',
                color: location.pathname === l.to ? 'var(--gold)' : 'var(--vellum-dim)',
                fontFamily:'"JetBrains Mono",monospace', fontSize:12, letterSpacing:'.22em',
                textTransform:'uppercase', textDecoration:'none',
              }}>
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop:24, fontFamily:'Cinzel', fontSize:11, color:'var(--gold)', opacity:.4, letterSpacing:'.3em' }}>
            Est. MMXXV
          </div>
        </div>
      )}
    </>
  )
}
