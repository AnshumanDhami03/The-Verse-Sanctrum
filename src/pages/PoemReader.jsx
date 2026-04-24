import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { poems } from '../data/poems'

function renderPoem(content) {
  const sections = content.split('---SECTION_BREAK---')
  return sections.map((section, sIdx) => {
    const stanzas = section.split('---STANZA_BREAK---')
    return (
      <div key={sIdx}>
        {stanzas.map((stanza, stIdx) => {
          const lines = stanza.trim().split('\n').filter(l => l.trim())
          if (!lines.length) return null
          return (
            <div key={stIdx} className="stanza" style={{ marginBottom:'2rem' }}>
              {lines.map((line, lIdx) => (
                <span key={lIdx} className="stanza-line" style={{ display:'block', fontSize:'clamp(17px,1.6vw,21px)', lineHeight:1.8, color:'var(--vellum)', fontFamily:'"Cormorant Garamond", serif', fontWeight:400 }}>
                  {line.trim()}
                </span>
              ))}
            </div>
          )
        })}
        {sIdx < sections.length - 1 && (
          <div style={{ textAlign:'center', color:'var(--gold)', opacity:.5, margin:'3rem 0', letterSpacing:'.5em', fontSize:18 }}>* * *</div>
        )}
      </div>
    )
  })
}

export default function PoemReader() {
  const { poemId } = useParams()
  const navigate = useNavigate()
  const poem = poems.find(p => p.id === parseInt(poemId))
  const [showNav, setShowNav] = useState(true)
  const lastScroll = useRef(0)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0,1], ['0%','100%'])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setShowNav(y < 80 || y < lastScroll.current)
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!poem) return (
    <div style={{ minHeight:'100vh', display:'grid', placeItems:'center', background:'var(--ink)', color:'var(--vellum)', fontFamily:'Cinzel' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:64, color:'var(--gold)', marginBottom:24 }}>ॐ</div>
        <div>Poem not found</div>
        <Link to="/mahabharata/poems" style={{ display:'block', marginTop:20, color:'var(--gold)' }}>← Return to Library</Link>
      </div>
    </div>
  )

  const prevPoem = poems.find(p => p.id === poem.id - 1 && p.status === 'complete')
  const nextPoem = poems.find(p => p.id === poem.id + 1 && p.status === 'complete')

  return (
    <div style={{ background:'var(--ink)', minHeight:'100vh' }}>

      {/* Progress bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:2, background:'rgba(228,176,74,.1)', zIndex:60, pointerEvents:'none' }}>
        <motion.div style={{ height:'100%', background:'linear-gradient(to right, var(--sindoor), var(--gold), var(--gold-lit))', width:progressWidth, boxShadow:'0 0 12px var(--gold)' }}/>
      </div>

      {/* Top nav */}
      <AnimatePresence>
        {showNav && (
          <motion.nav initial={{y:-70,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-70,opacity:0}} transition={{duration:.3}}
            style={{
              position:'fixed',top:0,left:0,right:0,zIndex:50,
              display:'flex',alignItems:'center',justifyContent:'space-between',
              padding:'0 clamp(16px,4vw,44px)',height:56,
              background:'rgba(10,8,6,.92)',backdropFilter:'blur(6px)',
              borderBottom:'1px solid rgba(228,176,74,.1)',
            }}>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', color:'inherit', flexShrink:0 }}>
              <div style={{ width:26, height:26, border:'1px solid var(--gold)', borderRadius:'50%', display:'grid', placeItems:'center', color:'var(--gold)', fontFamily:'Cinzel', fontSize:12 }}>ॐ</div>
            </Link>
            <div style={{ display:'flex', alignItems:'center', gap:12, minWidth:0, flex:1, justifyContent:'center' }}>
              <span style={{ fontFamily:'Cinzel', color:'var(--gold)', fontSize:13, flexShrink:0, opacity:.7 }}>{poem.number}</span>
              <div style={{ width:1, height:14, background:'rgba(228,176,74,.25)', flexShrink:0 }}/>
              <span style={{ fontFamily:'"Cormorant Garamond"', color:'var(--vellum-dim)', fontSize:15, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{poem.title}</span>
            </div>
            <div style={{ display:'flex', gap:24, flexShrink:0 }}>
              {[{to:'/',l:'Home'},{to:'/mahabharata',l:'Mahābhārata'},{to:'/mahabharata/poems',l:'All Poems'}].map(lk=>(
                <Link key={lk.to} to={lk.to} style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vellum-mute)', textDecoration:'none', transition:'color .3s' }}
                  onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--vellum-mute)'}
                  className="hidden md:block">{lk.l}</Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero */}
      <header style={{
        position:'relative', minHeight:'55vh', display:'grid', placeItems:'center', overflow:'hidden', paddingTop:56,
        background:`radial-gradient(60% 50% at 50% 55%, rgba(228,176,74,.15) 0%, rgba(228,176,74,.04) 45%, transparent 75%),
          radial-gradient(40% 50% at 80% 20%, rgba(192,53,42,.1), transparent 60%), var(--ink)`,
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 30%, var(--ink) 90%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 clamp(16px,4vw,44px)', maxWidth:900 }}>
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.4em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16, opacity:.7 }}>
            Poem {poem.number} · Part {poem.part}
          </div>
          <h1 style={{ fontFamily:'Cinzel', fontWeight:500, fontSize:'clamp(36px,6vw,80px)', lineHeight:1.05, letterSpacing:'.02em', color:'var(--vellum)', marginBottom:16 }}>
            {poem.title}
          </h1>
          {poem.subtitle && (
            <div style={{ fontFamily:'"Cormorant Garamond"', fontStyle:'italic', fontWeight:300, color:'var(--gold-lit)', fontSize:'clamp(16px,2vw,24px)' }}>
              {poem.subtitle}
            </div>
          )}
          {poem.fullSubtitle && (
            <div style={{ marginTop:8, fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--vellum-mute)' }}>
              {poem.fullSubtitle}
            </div>
          )}
          <div style={{ marginTop:24, width:1, height:60, background:'linear-gradient(to bottom, transparent, var(--gold))', margin:'24px auto 0', animation:'drop 2.4s ease-in-out infinite' }}/>
        </div>
      </header>

      {/* Poem content */}
      <main style={{ padding:'clamp(40px,6vw,80px) clamp(16px,4vw,44px) clamp(60px,8vw,120px)', maxWidth:860, margin:'0 auto' }}>
        <div style={{ marginBottom:40, paddingBottom:32, borderBottom:'1px solid rgba(228,176,74,.15)', display:'flex', gap:40 }}>
          <div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--vellum-mute)', marginBottom:6 }}>Stanzas</div>
            <div style={{ fontFamily:'Cinzel', fontSize:22, color:'var(--gold)' }}>{poem.stanzaCount || '—'}</div>
          </div>
          <div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--vellum-mute)', marginBottom:6 }}>Form</div>
            <div style={{ fontFamily:'"Cormorant Garamond"', fontStyle:'italic', color:'var(--vellum-dim)', fontSize:16 }}>Ottava Rima</div>
          </div>
          <div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--vellum-mute)', marginBottom:6 }}>Part</div>
            <div style={{ fontFamily:'Cinzel', fontSize:22, color:'var(--gold)' }}>{poem.part}</div>
          </div>
        </div>

        {poem.content && renderPoem(poem.content)}

        {/* End ornament */}
        <div style={{ textAlign:'center', marginTop:60, paddingTop:40, borderTop:'1px solid rgba(228,176,74,.15)' }}>
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.4em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12, opacity:.6 }}>Canto Complete</div>
          <div style={{ fontFamily:'Cinzel', fontSize:32, color:'var(--gold)' }}>ॐ</div>
          <div style={{ marginTop:12, fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--vellum-mute)' }}>
            ───────────── ॐ ─────────────
          </div>
        </div>
      </main>

      {/* Prev / Next */}
      <footer style={{ padding:'clamp(40px,5vw,60px) clamp(16px,4vw,44px) clamp(50px,6vw,80px)', borderTop:'1px solid rgba(228,176,74,.1)', background:'var(--ink-2)' }}>
        <div style={{ maxWidth:860, margin:'0 auto', display:'flex', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
          {prevPoem ? (
            <Link to={`/mahabharata/poem/${prevPoem.id}`} style={{ flex:1, border:'1px solid rgba(228,176,74,.2)', padding:'28px 32px', textDecoration:'none', color:'inherit', transition:'all .4s', display:'block' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(228,176,74,.2)'}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--vellum-mute)', marginBottom:12 }}>← Previous</div>
              <div style={{ fontFamily:'Cinzel', fontSize:13, color:'var(--gold)', marginBottom:6 }}>{prevPoem.number}</div>
              <div style={{ fontFamily:'"Cormorant Garamond"', fontWeight:500, fontSize:20, color:'var(--vellum)' }}>{prevPoem.title}</div>
            </Link>
          ) : <div style={{ flex:1 }}/>}

          <Link to="/mahabharata/poems" style={{ display:'flex', alignItems:'center', justifyContent:'center', width:56, border:'1px solid rgba(228,176,74,.2)', color:'var(--gold)', fontFamily:'Cinzel', fontSize:20, textDecoration:'none', flexShrink:0, transition:'all .4s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.background='rgba(228,176,74,.05)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(228,176,74,.2)';e.currentTarget.style.background=''}}>
            ⊞
          </Link>

          {nextPoem ? (
            <Link to={`/mahabharata/poem/${nextPoem.id}`} style={{ flex:1, border:'1px solid rgba(228,176,74,.2)', padding:'28px 32px', textDecoration:'none', color:'inherit', transition:'all .4s', display:'block', textAlign:'right' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(228,176,74,.2)'}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--vellum-mute)', marginBottom:12 }}>Next →</div>
              <div style={{ fontFamily:'Cinzel', fontSize:13, color:'var(--gold)', marginBottom:6 }}>{nextPoem.number}</div>
              <div style={{ fontFamily:'"Cormorant Garamond"', fontWeight:500, fontSize:20, color:'var(--vellum)' }}>{nextPoem.title}</div>
            </Link>
          ) : <div style={{ flex:1 }}/>}
        </div>
      </footer>
    </div>
  )
}
