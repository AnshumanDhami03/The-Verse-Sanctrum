import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { poems, mahabharataInfo } from '../data/poems'

const toRoman = n => {
  const vals = [40,10,9,5,4,1]; const syms = ['XL','X','IX','V','IV','I']
  let r = ''; let num = n
  vals.forEach((v,i) => { while(num >= v) { r += syms[i]; num -= v } })
  return r
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)} })
    }, { threshold:.1 })
    document.querySelectorAll('.reveal,.stagger').forEach(el=>io.observe(el))
    return () => io.disconnect()
  }, [])
}

const PARTS_LIST = ['all','I','II','III','IV','V','VI','VII']
const PART_POEM_COUNTS = { all: 40, I:8, II:6, III:6, IV:6, V:4, VI:7, VII:3 }

export default function PoemsIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedPart = searchParams.get('part') || 'all'
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const navigate = useNavigate()
  useReveal()

  const handlePartChange = part => {
    const p = new URLSearchParams(searchParams)
    if (part === 'all') p.delete('part')
    else p.set('part', part)
    setSearchParams(p)
  }

  const filtered = poems.filter(p => {
    const matchPart = selectedPart === 'all' || p.part === selectedPart
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.subtitle.toLowerCase().includes(search.toLowerCase())
    return matchPart && matchSearch
  })

  const complete = filtered.filter(p => p.status === 'complete').length

  const cornerStyle = (pos) => {
    const base = { position:'absolute', width:18, height:18, border:'1px solid var(--gold)', opacity:0, transition:'opacity .4s', pointerEvents:'none' }
    if (pos==='tl') return {...base, top:6, left:6, borderRight:'none', borderBottom:'none'}
    if (pos==='tr') return {...base, top:6, right:6, borderLeft:'none', borderBottom:'none'}
    if (pos==='bl') return {...base, bottom:6, left:6, borderRight:'none', borderTop:'none'}
    return {...base, bottom:6, right:6, borderLeft:'none', borderTop:'none'}
  }

  return (
    <div style={{background:'var(--ink)',minHeight:'100vh'}}>

      {/* ── PAGE HERO ── */}
      <header id="top" style={{
        position:'relative', padding:'180px 44px 80px', overflow:'hidden',
        background:`radial-gradient(50% 60% at 80% 30%, rgba(228,176,74,.1), transparent 60%),
          radial-gradient(45% 55% at 10% 70%, rgba(192,53,42,.08), transparent 65%), var(--ink)`,
      }}>
        {/* Background mandala */}
        <div style={{position:'absolute',right:-200,top:-100,width:700,height:700,opacity:.5,pointerEvents:'none'}} aria-hidden>
          <svg viewBox="-200 -200 400 400" style={{width:'100%',height:'100%'}}>
            <circle r="180" fill="none" stroke="#e4b04a" strokeWidth=".4" opacity=".25"/>
            <circle r="140" fill="none" stroke="#e4b04a" strokeWidth=".3" opacity=".2" strokeDasharray="2 5"/>
            <circle r="100" fill="none" stroke="#e4b04a" strokeWidth=".4" opacity=".2"/>
            <circle r="60" fill="none" stroke="#c0352a" strokeWidth=".4" opacity=".3"/>
          </svg>
        </div>

        <div style={{maxWidth:1280,margin:'0 auto',position:'relative',zIndex:2}}>
          {/* Breadcrumb */}
          <div className="reveal" style={{display:'flex',alignItems:'center',gap:12,marginBottom:60,fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--vellum-mute)'}}>
            <Link to="/" style={{color:'var(--vellum-dim)',textDecoration:'none',transition:'color .3s'}} onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--vellum-dim)'}>The Verse Sanctum</Link>
            <span style={{color:'var(--gold-deep)'}}>/</span>
            <Link to="/mahabharata" style={{color:'var(--vellum-dim)',textDecoration:'none',transition:'color .3s'}} onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--vellum-dim)'}>Mahābhārata</Link>
            <span style={{color:'var(--gold-deep)'}}>/</span>
            <span style={{color:'var(--gold)'}}>Poems</span>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:60,alignItems:'end'}}>
            <div>
              <h1 className="reveal" style={{fontFamily:'Cinzel',fontWeight:500,fontSize:'clamp(56px,9vw,150px)',lineHeight:.95,letterSpacing:'.04em'}}>
                <span style={{background:'linear-gradient(180deg, var(--vellum) 0%, var(--gold-lit) 55%, var(--gold-deep) 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Poems</span>
                <em style={{fontFamily:'"Cormorant Garamond"',fontWeight:300,fontStyle:'italic',fontSize:'.4em',color:'var(--gold)',letterSpacing:'.06em',display:'block',marginTop:18}}>The Mahābhārata in Verse</em>
              </h1>
            </div>
            <div className="reveal" style={{display:'flex',gap:40,paddingBottom:12}}>
              {[{n:40,l:'Poems'},{n:mahabharataInfo.parts.length,l:'Parts'},{n:poems.filter(p=>p.status==='complete').length,l:'Complete'}].map((s,i)=>(
                <div key={i} style={{textAlign:'right'}}>
                  <div style={{fontFamily:'Cinzel',fontSize:44,color:'var(--gold)',lineHeight:1,letterSpacing:'.02em'}}>{s.n}</div>
                  <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--vellum-mute)',marginTop:8}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="reveal" style={{marginTop:50,maxWidth:680,color:'var(--vellum-dim)',fontSize:18,lineHeight:1.7,fontWeight:300}}>
            Forty poems retelling the complete Mahābhārata in ottava rima — the eight-line stanza of Ariosto and Tasso. Nine are complete. Thirty-one await their turn.
          </p>
        </div>
      </header>

      {/* ── CONTROLS BAR ── */}
      <div style={{
        position:'sticky',top:0,zIndex:30,
        background:'rgba(10,8,6,.92)',backdropFilter:'blur(14px)',
        borderTop:'1px solid rgba(228,176,74,.14)',borderBottom:'1px solid rgba(228,176,74,.14)',
        padding:'22px 44px',
      }}>
        <div style={{maxWidth:1280,margin:'0 auto',display:'flex',alignItems:'center',gap:20,flexWrap:'wrap'}}>
          <span style={{fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.28em',textTransform:'uppercase',color:'var(--vellum-mute)'}}>Filter</span>
          {/* Part chips */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {PARTS_LIST.map(p => (
              <button key={p} onClick={()=>handlePartChange(p)} style={{
                background: selectedPart===p ? 'var(--gold)' : 'transparent',
                border: selectedPart===p ? '1px solid var(--gold)' : '1px solid rgba(228,176,74,.25)',
                color: selectedPart===p ? 'var(--ink)' : 'var(--vellum-dim)',
                padding:'10px 18px', fontFamily:'"JetBrains Mono",monospace', fontSize:10,
                letterSpacing:'.22em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s',
              }}
              onMouseEnter={e=>{ if(selectedPart!==p){e.currentTarget.style.color='var(--gold)';e.currentTarget.style.borderColor='var(--gold)'} }}
              onMouseLeave={e=>{ if(selectedPart!==p){e.currentTarget.style.color='var(--vellum-dim)';e.currentTarget.style.borderColor='rgba(228,176,74,.25)'} }}>
                {p === 'all' ? 'All' : `Part ${p}`}
                <span style={{fontFamily:'Cinzel',fontSize:11,marginLeft:8,opacity:.7}}>{PART_POEM_COUNTS[p]}</span>
              </button>
            ))}
          </div>
          <div style={{flex:1}}/>
          {/* Search */}
          <input type="text" placeholder="Search poems..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{background:'var(--ink-2)',border:'1px solid rgba(228,176,74,.2)',color:'var(--vellum)',padding:'10px 16px',fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.15em',outline:'none',width:200,transition:'border .3s'}}
            onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='rgba(228,176,74,.2)'}/>
          {/* View toggle */}
          <div style={{display:'flex',border:'1px solid rgba(228,176,74,.25)'}}>
            {['grid','list'].map(v=>(
              <button key={v} onClick={()=>setView(v)} style={{
                padding:'10px 14px',background:view===v?'var(--gold)':'transparent',border:'none',
                color:view===v?'var(--ink)':'var(--vellum-dim)',cursor:'pointer',
                fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.22em',textTransform:'uppercase'
              }}>{v==='grid'?'⊞':'≡'}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIBRARY ── */}
      <section style={{padding:'80px 44px 140px',background:'var(--ink)',minHeight:'80vh'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          {/* Count */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',color:'var(--vellum-mute)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',marginBottom:30}}>
            <span>Showing <span style={{color:'var(--gold)'}}>{filtered.length}</span> poems</span>
            <span><span style={{color:'var(--gold)'}}>{complete}</span> complete</span>
          </div>

          {/* Grid view */}
          <AnimatePresence mode="wait">
            {view === 'grid' && (
              <motion.div key={selectedPart + search}
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}}
                style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
                {filtered.map((poem,i) => {
                  const isComplete = poem.status === 'complete'
                  return (
                    <motion.div key={poem.id}
                      initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:Math.min(i*.04,.4),duration:.6,ease:[.2,.7,.2,1]}}
                      onClick={()=>isComplete&&navigate(`/mahabharata/poem/${poem.id}`)}
                      style={{
                        position:'relative',border:'1px solid rgba(228,176,74,.18)',
                        background:'linear-gradient(180deg, rgba(255,255,255,.018), transparent)',
                        padding:'34px 32px 30px',display:'flex',flexDirection:'column',minHeight:320,
                        cursor:isComplete?'pointer':'default',overflow:'hidden',
                        opacity:isComplete?1:.45,
                        transition:'border .5s, transform .5s, box-shadow .5s',
                      }}
                      whileHover={isComplete?{y:-6,borderColor:'var(--gold)',boxShadow:'0 30px 60px -30px rgba(228,176,74,.25)'}:{}}>
                      {/* Corners */}
                      {isComplete && ['tl','tr','bl','br'].map(c=><span key={c} style={cornerStyle(c)}/>)}
                      {/* Glow */}
                      {isComplete && <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(70% 80% at 50% 100%, rgba(228,176,74,.16), transparent 70%)',opacity:0,transition:'opacity .5s'}}/>}

                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:30,position:'relative'}}>
                        <div style={{fontFamily:'Cinzel',fontSize:44,color:'var(--gold)',lineHeight:1,letterSpacing:'.02em',transition:'transform .4s'}}>{poem.number}</div>
                        <div style={{color:'var(--vellum-mute)',fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.22em',textTransform:'uppercase'}}>Part {poem.part}</div>
                      </div>
                      <h4 style={{fontFamily:'Cinzel',fontWeight:500,fontSize:24,color:'var(--vellum)',letterSpacing:'.02em',lineHeight:1.15,marginBottom:8}}>{poem.title}</h4>
                      <div style={{fontFamily:'"Cormorant Garamond"',fontStyle:'italic',fontWeight:400,color:'var(--gold-lit)',fontSize:17,lineHeight:1.35,marginBottom:20}}>{poem.subtitle}</div>
                      <p style={{color:'var(--vellum-mute)',fontSize:15,lineHeight:1.6,flex:1}}>{isComplete?poem.summary:'Awaited.'}</p>
                      <div style={{marginTop:26,paddingTop:20,borderTop:'1px solid rgba(228,176,74,.14)',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:10,fontFamily:'"JetBrains Mono",monospace',letterSpacing:'.22em',textTransform:'uppercase'}}>
                        <span style={{color:'var(--gold)'}}>{isComplete?`${poem.stanzaCount} stanzas · complete`:'Awaited'}</span>
                        <span style={{color:isComplete?'var(--vellum-mute)':'var(--vellum-mute)',transition:'color .3s, transform .3s'}}>{isComplete?'Read →':'—'}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}

            {/* List view */}
            {view === 'list' && (
              <motion.div key={'list-'+selectedPart+search}
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}}>
                {filtered.map((poem,i) => {
                  const isComplete = poem.status === 'complete'
                  return (
                    <motion.div key={poem.id}
                      initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:Math.min(i*.03,.3)}}
                      onClick={()=>isComplete&&navigate(`/mahabharata/poem/${poem.id}`)}
                      style={{
                        display:'grid',gridTemplateColumns:'80px 1.5fr 2fr 160px 80px',gap:30,alignItems:'center',
                        padding:'28px 10px',borderBottom:'1px solid rgba(228,176,74,.12)',
                        cursor:isComplete?'pointer':'default',transition:'all .4s',
                        opacity:isComplete?1:.45,
                      }}
                      whileHover={isComplete?{backgroundColor:'rgba(228,176,74,.03)',paddingLeft:20}:{}}>
                      <div style={{fontFamily:'Cinzel',fontSize:32,color:'var(--gold)',letterSpacing:'.02em'}}>{poem.number}</div>
                      <div>
                        <h4 style={{fontFamily:'Cinzel',fontSize:22,fontWeight:500,color:'var(--vellum)',lineHeight:1.1,marginBottom:6}}>{poem.title}</h4>
                        <div style={{fontFamily:'"Cormorant Garamond"',fontStyle:'italic',color:'var(--gold-lit)',fontSize:15}}>{poem.subtitle}</div>
                      </div>
                      <div style={{color:'var(--vellum-mute)',fontSize:14,lineHeight:1.55}}>{isComplete?poem.summary:'Awaited.'}</div>
                      <div style={{color:'var(--vellum-dim)',fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',textAlign:'right'}}>
                        {isComplete&&<span style={{fontFamily:'Cinzel',fontSize:16,color:'var(--gold)',display:'block',marginBottom:4}}>{poem.stanzaCount}</span>}
                        {isComplete?'stanzas · complete':'awaited'}
                      </div>
                      <div style={{textAlign:'right',color:'var(--gold)',fontSize:20,opacity:isComplete?1:0}}>→</div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{padding:'40px 0',borderTop:'1px solid rgba(228,176,74,.15)',borderBottom:'1px solid rgba(228,176,74,.15)',overflow:'hidden',background:'var(--ink-2)'}} aria-hidden>
        <div className="marquee-track">
          {['Bhīṣma','Draupadī','Arjuna','Krishna','Karṇa','Yudhiṣṭhira','Duryodhana','Bhīṣma','Draupadī','Arjuna','Krishna','Karṇa','Yudhiṣṭhira','Duryodhana'].map((name,i)=>(
            <span key={i}>{name}<span className="alt">{['The Oath-Bound','The Flame-Born','The Left-Handed','The Charioteer','Son of the Sun','The Truth-Speaker','The Hard-to-Conquer','The Oath-Bound','The Flame-Born','The Left-Handed','The Charioteer','Son of the Sun','The Truth-Speaker','The Hard-to-Conquer'][i]}</span></span>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{maxWidth:1280,margin:'0 auto',padding:'40px 44px',borderTop:'1px solid rgba(228,176,74,.15)',display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:30,alignItems:'center',color:'var(--vellum-mute)',fontSize:13}}>
        <div><Link to="/mahabharata" style={{display:'inline-flex',alignItems:'center',gap:10,color:'var(--vellum-dim)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',textDecoration:'none'}}>← Back to the Mahābhārata</Link></div>
        <div style={{textAlign:'center',color:'var(--gold)',fontFamily:'Cinzel',letterSpacing:'.3em',textTransform:'uppercase',fontSize:11}}>The Verse Sanctum · Library</div>
        <div style={{textAlign:'right'}}><a href="#top" style={{color:'var(--gold)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',textDecoration:'none'}}>Return to the top ↑</a></div>
      </footer>
    </div>
  )
}
