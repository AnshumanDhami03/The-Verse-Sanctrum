import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { poems, mahabharataInfo } from '../data/poems'

/* ── Mandala SVG ─────────────────────────────────────────── */
function Mandala() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  useEffect(() => {
    if (outerRef.current) {
      for (let i = 0; i < 72; i++) {
        const a = i * 5 * Math.PI / 180
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        l.setAttribute('x1', Math.cos(a) * 360); l.setAttribute('y1', Math.sin(a) * 360)
        l.setAttribute('x2', Math.cos(a) * 430); l.setAttribute('y2', Math.sin(a) * 430)
        l.setAttribute('stroke', '#e4b04a'); l.setAttribute('stroke-width', '.6'); l.setAttribute('opacity', '.35')
        outerRef.current.appendChild(l)
      }
    }
    if (innerRef.current) {
      for (let i = 0; i < 36; i++) {
        const a = (i * 10 + 5) * Math.PI / 180
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        l.setAttribute('x1', Math.cos(a) * 170); l.setAttribute('y1', Math.sin(a) * 170)
        l.setAttribute('x2', Math.cos(a) * 220); l.setAttribute('y2', Math.sin(a) * 220)
        l.setAttribute('stroke', '#e4b04a'); l.setAttribute('stroke-width', '.4'); l.setAttribute('opacity', '.4')
        innerRef.current.appendChild(l)
      }
    }
  }, [])
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(90vh,900px)', height: 'min(90vh,900px)', zIndex: 1, pointerEvents: 'none' }}>
      <svg viewBox="-500 -500 1000 1000" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="sunCore" cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="#f6d57a" stopOpacity=".9" />
            <stop offset="30%" stopColor="#e4b04a" stopOpacity=".5" />
            <stop offset="70%" stopColor="#c0352a" stopOpacity=".15" />
            <stop offset="100%" stopColor="#0a0806" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="340" fill="url(#sunCore)" />
        <circle r="120" fill="none" stroke="var(--gold)" strokeWidth=".5" opacity=".3" />
        <circle r="170" fill="none" stroke="var(--gold)" strokeWidth=".3" opacity=".18" />
        <circle r="220" fill="none" stroke="var(--gold)" strokeWidth=".5" strokeDasharray="2 6" opacity=".35" />
        <circle r="300" fill="none" stroke="var(--gold)" strokeWidth=".5" opacity=".3" />
        <circle r="360" fill="none" stroke="var(--gold)" strokeWidth=".3" opacity=".18" />
        <circle r="430" fill="none" stroke="var(--gold)" strokeWidth=".5" strokeDasharray="2 6" opacity=".35" />
        <g style={{ transformOrigin: 'center', animation: 'spin 160s linear infinite' }}><g ref={outerRef} /></g>
        <g style={{ transformOrigin: 'center', animation: 'spin 260s linear infinite reverse' }}><g ref={innerRef} /></g>
      </svg>
    </div>
  )
}

/* ── Particles ───────────────────────────────────────────── */
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('span')
      s.style.cssText = `position:absolute;width:3px;height:3px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px var(--gold),0 0 16px var(--ember);animation:drift 12s linear infinite;opacity:0;`
      s.style.left = (10 + Math.random() * 80) + '%'
      s.style.top = (60 + Math.random() * 40) + '%'
      s.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px')
      s.style.setProperty('--dy', -(180 + Math.random() * 220) + 'px')
      s.style.animationDelay = (Math.random() * 12) + 's'
      s.style.animationDuration = (10 + Math.random() * 8) + 's'
      ref.current.appendChild(s)
    }
  }, [])
  return <div ref={ref} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} aria-hidden />
}

/* ── Scroll Reveal hook ──────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: .15 })
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Main Home ───────────────────────────────────────────── */
export default function Home() {
  useReveal()
  const completed = poems.filter(p => p.status === 'complete').length
  const pct = Math.round(completed / 40 * 100)

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <header style={{
        position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', overflow: 'hidden',
        background: `radial-gradient(60% 45% at 50% 55%, rgba(228,176,74,.16) 0%, rgba(228,176,74,.05) 40%, transparent 70%),
          radial-gradient(40% 50% at 80% 20%, rgba(192,53,42,.1), transparent 60%),
          radial-gradient(35% 40% at 15% 80%, rgba(192,53,42,.08), transparent 60%),
          var(--ink)`,
      }}>
        {/* Side banners */}
        <div className="side-banner" style={{ position:'absolute', top:'50%', left:30, whiteSpace:'nowrap', zIndex:2, color:'var(--gold)', opacity:.18, fontFamily:'Cinzel', fontSize:14, letterSpacing:'1em', textTransform:'uppercase', pointerEvents:'none', transform:'translateY(-50%) rotate(-90deg)' }}>॥ Vyāsa · Ganesha · Sauti ॥</div>
        <div className="side-banner" style={{ position:'absolute', top:'50%', right:30, whiteSpace:'nowrap', zIndex:2, color:'var(--gold)', opacity:.18, fontFamily:'Cinzel', fontSize:14, letterSpacing:'1em', textTransform:'uppercase', pointerEvents:'none', transform:'translateY(-50%) rotate(90deg)' }}>॥ Mahābhārata · 1.00.000 · Śloka ॥</div>

        <Mandala />
        <Particles />

        {/* Vignette */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 30%, var(--ink) 85%)', pointerEvents:'none', zIndex:2 }} />

        {/* Hero copy */}
        <div style={{ position:'relative', zIndex:4, textAlign:'center', padding:'0 24px', maxWidth:980 }}>
          <div className="reveal" style={{ color:'var(--gold)', fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.4em', textTransform:'uppercase', marginBottom:4 }}>
            <span style={{ display:'inline-block', width:26, height:1, background:'var(--gold)', verticalAlign:'middle', margin:'0 12px', opacity:.7 }} />
            Epics in Verse
            <span style={{ display:'inline-block', width:26, height:1, background:'var(--gold)', verticalAlign:'middle', margin:'0 12px', opacity:.7 }} />
          </div>
          <h1 style={{ fontFamily:'Cinzel', fontWeight:500, fontSize:'clamp(52px,9vw,150px)', lineHeight:.95, letterSpacing:'.04em', marginTop:26 }}>
            <span style={{ background:'linear-gradient(180deg, var(--vellum) 0%, var(--gold-lit) 55%, var(--gold-deep) 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>The Verse</span>
            <br />
            <span style={{ background:'linear-gradient(180deg, var(--vellum) 0%, var(--gold-lit) 55%, var(--gold-deep) 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>Sanctum</span>
            <em style={{ fontFamily:'"Cormorant Garamond"', fontWeight:300, fontStyle:'italic', fontSize:'.45em', letterSpacing:'.08em', display:'block', color:'var(--vellum-dim)', marginTop:18 }}>
              — ancient epics, retold in ottava rima, by a single hand —
            </em>
          </h1>
          <p className="reveal" style={{ margin:'28px auto 0', maxWidth:620, fontSize:19, lineHeight:1.65, color:'var(--vellum-dim)', fontStyle:'italic', fontWeight:300 }}>
            <span style={{ color:'var(--gold)', margin:'0 10px', fontStyle:'normal' }}>—</span>
            A sanctum for long poems. The first volume — the Mahābhārata — is under the pen; others wait their turn.
            <span style={{ color:'var(--gold)', margin:'0 10px', fontStyle:'normal' }}>—</span>
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', left:'50%', bottom:28, transform:'translateX(-50%)', zIndex:4, display:'flex', flexDirection:'column', alignItems:'center', gap:8, color:'var(--gold)' }}>
          <div className="mono" style={{ fontSize:10, letterSpacing:'.4em' }}>Scroll · Śravaṇa</div>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, transparent, var(--gold))', animation:'drop 2.4s ease-in-out infinite' }} />
        </div>
      </header>

      {/* ── EPICS GRID ── */}
      <section style={{ padding:'clamp(80px,12vw,180px) clamp(20px,4vw,44px) clamp(60px,10vw,160px)', background:'var(--ink-2)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'10%', left:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(192,53,42,.1), transparent 60%)', pointerEvents:'none' }} />

        {/* Section head */}
        <div className="reveal" style={{ maxWidth:1200, margin:'0 auto 40px', display:'grid', gridTemplateColumns:'1fr', gap:16, alignItems:'end' }}>
          <h2 style={{ fontFamily:'Cinzel', fontWeight:500, fontSize:'clamp(40px,5vw,82px)', lineHeight:1, letterSpacing:'.03em', color:'var(--vellum)' }}>
            The Library
            <em style={{ fontFamily:'"Cormorant Garamond"', fontWeight:300, fontStyle:'italic', color:'var(--gold)', fontSize:'.55em', display:'block', marginTop:12, letterSpacing:'.04em' }}>Granthālaya</em>
          </h2>
          <div style={{ color:'var(--vellum-mute)', maxWidth:320, textAlign:'left', lineHeight:1.7 }}>
            <span className="mono" style={{ color:'var(--gold)', display:'block', marginBottom:10 }}>I · The Works</span>
            Each volume is a complete epic retold — eight-line stanzas, iambic pentameter, rhyming ab ab ab cc. One is in progress.
          </div>
        </div>

        {/* Cards */}
        <div className="stagger" style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap:20 }}>
          {/* Mahabharata — active */}
          <Link to="/mahabharata" style={{ textDecoration:'none', color:'inherit', position:'relative', aspectRatio:'3/4', border:'1px solid rgba(228,176,74,.2)', background:'var(--ink)', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:34, transition:'all .6s cubic-bezier(.2,.7,.2,1)' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 30px 60px -30px rgba(228,176,74,.3)' }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(228,176,74,.2)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
            {/* Corner decorations */}
            {['tl','tr','bl','br'].map(c => (
              <span key={c} style={{ position:'absolute', width:30, height:30, border:'1px solid var(--gold)', opacity:.5,
                ...(c==='tl'?{top:8,left:8,borderRight:'none',borderBottom:'none'}:c==='tr'?{top:8,right:8,borderLeft:'none',borderBottom:'none'}:c==='bl'?{bottom:8,left:8,borderRight:'none',borderTop:'none'}:{bottom:8,right:8,borderLeft:'none',borderTop:'none'})
              }} />
            ))}
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(70% 70% at 50% 100%, rgba(228,176,74,.18), transparent 70%)', pointerEvents:'none' }} />
            <div style={{ position:'relative', zIndex:2, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--gold)', padding:'6px 12px' }}>In Progress</div>
              <svg width="42" height="42" viewBox="-50 -50 100 100" fill="none" stroke="var(--gold)" strokeWidth="1.2" style={{ animation:'spin 30s linear infinite' }}>
                <circle r="42"/><circle r="8"/>
                <line x1="-42" y1="0" x2="-10" y2="0"/><line x1="42" y1="0" x2="10" y2="0"/>
                <line x1="0" y1="-42" x2="0" y2="-10"/><line x1="0" y1="42" x2="0" y2="10"/>
                <line x1="-30" y1="-30" x2="-8" y2="-8"/><line x1="30" y1="30" x2="8" y2="8"/>
                <line x1="-30" y1="30" x2="-8" y2="8"/><line x1="30" y1="-30" x2="8" y2="-8"/>
              </svg>
            </div>
            <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'20px 0' }}>
              <div style={{ fontFamily:'Cinzel', fontSize:14, color:'var(--gold)', letterSpacing:'.4em', marginBottom:16 }}>VOLUME · I</div>
              <h3 style={{ fontFamily:'Cinzel', fontWeight:500, fontSize:'clamp(28px,3vw,44px)', lineHeight:1.05, color:'var(--vellum)', letterSpacing:'.03em' }}>The<br/>Mahābhārata</h3>
              <div style={{ fontFamily:'"Cormorant Garamond"', fontStyle:'italic', fontWeight:300, color:'var(--gold-lit)', fontSize:18, marginTop:10 }}>An Epic in Verse</div>
              <p style={{ color:'var(--vellum-mute)', fontSize:15, lineHeight:1.6, marginTop:18 }}>Forty poems spanning the complete saga of the Bharata dynasty — from the cosmic churning to the final ascension.</p>
            </div>
            <div style={{ position:'relative', zIndex:2 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.2em', color:'var(--vellum-mute)', marginBottom:8, textTransform:'uppercase' }}>
                <span>{completed === 8 ? 'VIII' : completed} of XL Complete</span>
                <span style={{ color:'var(--gold)' }}>{pct}%</span>
              </div>
              <div style={{ height:1, background:'rgba(228,176,74,.15)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:'0 auto 0 0', background:'linear-gradient(to right, var(--sindoor), var(--gold))', width: pct + '%' }} />
              </div>
              <div style={{ marginTop:18, display:'flex', justifyContent:'space-between', alignItems:'center', color:'var(--gold)', fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.25em', textTransform:'uppercase' }}>
                <span>Enter the Tale</span><span>→</span>
              </div>
            </div>
          </Link>

          {/* Ramayana — ghost */}
          {[{ vol:'II', title:'The\nRāmāyaṇa', sub:'The Path of the Prince', desc:'The exile, the abduction, the bridge of stones, the bowed ocean, the return. A tale awaiting its first stanza.' },
            { vol:'III', title:'An Epic\nYet to Choose', sub:'Purāṇa, Upākhyāna, or Elsewhere', desc:'The third volume is not yet spoken for. Perhaps the Bhāgavata; perhaps the Kumārasambhava; perhaps something farther still.' }
          ].map((card, i) => (
            <div key={i} style={{ position:'relative', aspectRatio:'3/4', border:'1px solid rgba(228,176,74,.2)', background:'var(--ink)', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:34, opacity:.38 }}>
              {['tl','tr','bl','br'].map(c => (
                <span key={c} style={{ position:'absolute', width:30, height:30, border:'1px solid var(--gold)', opacity:.5,
                  ...(c==='tl'?{top:8,left:8,borderRight:'none',borderBottom:'none'}:c==='tr'?{top:8,right:8,borderLeft:'none',borderBottom:'none'}:c==='bl'?{bottom:8,left:8,borderRight:'none',borderTop:'none'}:{bottom:8,right:8,borderLeft:'none',borderTop:'none'})
                }} />
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--vellum-mute)', border:'1px solid rgba(228,176,74,.25)', padding:'6px 12px' }}>Awaited</div>
                <div style={{ width:42, height:42, border:'1px solid var(--vellum-mute)', borderRadius:'50%', display:'grid', placeItems:'center', color:'var(--vellum-mute)', fontFamily:'Cinzel', fontSize:18 }}>॥</div>
              </div>
              <div style={{ textAlign:'center', padding:'20px 0' }}>
                <div style={{ fontFamily:'Cinzel', fontSize:14, color:'var(--gold)', letterSpacing:'.4em', marginBottom:16 }}>VOLUME · {card.vol}</div>
                <h3 style={{ fontFamily:'Cinzel', fontWeight:500, fontSize:'clamp(28px,3vw,44px)', lineHeight:1.05, color:'var(--vellum)', letterSpacing:'.03em' }}>{card.title.split('\n').map((l,i) => <span key={i}>{l}{i<1&&<br/>}</span>)}</h3>
                <div style={{ fontFamily:'"Cormorant Garamond"', fontStyle:'italic', fontWeight:300, color:'var(--gold-lit)', fontSize:18, marginTop:10 }}>{card.sub}</div>
                <p style={{ color:'var(--vellum-mute)', fontSize:15, lineHeight:1.6, marginTop:18 }}>{card.desc}</p>
              </div>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.2em', color:'var(--vellum-mute)', marginBottom:8, textTransform:'uppercase' }}>
                  <span>Not Yet Begun</span><span>—</span>
                </div>
                <div style={{ height:1, background:'rgba(228,176,74,.15)' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE RAIL ── */}
      <section style={{ padding:'clamp(80px,10vw,160px) clamp(20px,4vw,44px)', textAlign:'center', background:'var(--ink)', position:'relative' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:700, height:700, border:'1px solid var(--gold)', borderRadius:'50%', opacity:.06 }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, border:'1px dashed var(--gold)', borderRadius:'50%', opacity:.08 }} />
        <div className="reveal" style={{ maxWidth:900, margin:'0 auto', position:'relative' }}>
          <div style={{ fontFamily:'Cinzel', fontSize:48, color:'var(--gold)', marginBottom:30 }}>ॐ</div>
          <blockquote style={{ fontFamily:'"Cormorant Garamond"', fontWeight:300, fontStyle:'italic', fontSize:'clamp(28px,3.4vw,44px)', lineHeight:1.5, color:'var(--vellum)' }}>
            "What is found <span style={{ color:'var(--gold-lit)' }}>here</span> may be found elsewhere.<br/>
            What is <span style={{ color:'var(--gold-lit)' }}>not here</span> exists not anywhere."
          </blockquote>
          <cite style={{ display:'block', marginTop:30, fontStyle:'normal', color:'var(--vellum-mute)', fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.3em', textTransform:'uppercase' }}>
            yad ihāsti tad anyatra · yan nehāsti na kutracit
          </cite>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ padding:'40px 0', borderTop:'1px solid rgba(228,176,74,.15)', borderBottom:'1px solid rgba(228,176,74,.15)', overflow:'hidden', background:'var(--ink-2)' }} aria-hidden>
        <div className="marquee-track">
          {['Bhīṣma','Draupadī','Arjuna','Krishna','Karṇa','Yudhiṣṭhira','Duryodhana','Bhīṣma','Draupadī','Arjuna','Krishna','Karṇa','Yudhiṣṭhira','Duryodhana'].map((name, i) => (
            <span key={i}>{name}<span className="alt">{['The Oath-Bound','The Flame-Born','The Left-Handed','The Charioteer','Son of the Sun','The Truth-Speaker','The Hard-to-Conquer','The Oath-Bound','The Flame-Born','The Left-Handed','The Charioteer','Son of the Sun','The Truth-Speaker','The Hard-to-Conquer'][i]}</span></span>
          ))}
        </div>
      </div>

      {/* ── COLOPHON ── */}
      <section style={{ padding:'clamp(70px,10vw,140px) clamp(20px,4vw,44px) 60px', background:'var(--ink-2)', position:'relative', overflow:'hidden' }}>
        <div className="reveal" style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontFamily:'Cinzel', color:'var(--gold)', fontSize:42, marginBottom:24 }}>ॐ</div>
          <h3 style={{ fontFamily:'Cinzel', fontSize:'clamp(32px,4vw,56px)', fontWeight:500, color:'var(--vellum)', letterSpacing:'.04em', lineHeight:1.1 }}>
            "Who hears this tale<br/>shall never be afraid."
          </h3>
          <p style={{ marginTop:24, color:'var(--vellum-mute)', fontSize:18, lineHeight:1.7, maxWidth:640, marginLeft:'auto', marginRight:'auto', fontStyle:'italic', fontWeight:300 }}>
            The sanctum is open. Walk through the first gate to the Mahābhārata; or wait at the door for the others.
          </p>
          <div style={{ marginTop:40, fontFamily:'"Cormorant Garamond"', fontStyle:'italic', color:'var(--gold)', fontSize:22 }}>
            — Anshuman Dhami, scribe
          </div>
        </div>
        <footer style={{ maxWidth:1280, margin:'80px auto 0', padding:'40px 0', borderTop:'1px solid rgba(228,176,74,.15)', display:'grid', gridTemplateColumns:'1fr', gap:12, alignItems:'center', color:'var(--vellum-mute)', fontSize:13, textAlign:'center' }}>
          <div>© Anshuman Dhami · MMXXV</div>
          <div style={{ textAlign:'center', color:'var(--gold)', fontFamily:'Cinzel', letterSpacing:'.3em', textTransform:'uppercase', fontSize:11 }}>The Verse Sanctum</div>
          <div style={{ textAlign:'right' }}><a href="#top" style={{ color:'var(--gold)', fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', textDecoration:'none' }}>Return to the top ↑</a></div>
        </footer>
      </section>
    </div>
  )
}
