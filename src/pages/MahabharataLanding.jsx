import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { poems, mahabharataInfo } from '../data/poems'

function Mandala() {
  const outerRef = useRef(null); const innerRef = useRef(null)
  useEffect(() => {
    if (outerRef.current) for (let i=0;i<72;i++){const a=i*5*Math.PI/180,l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',Math.cos(a)*360);l.setAttribute('y1',Math.sin(a)*360);l.setAttribute('x2',Math.cos(a)*430);l.setAttribute('y2',Math.sin(a)*430);l.setAttribute('stroke','#e4b04a');l.setAttribute('stroke-width','.6');l.setAttribute('opacity','.35');outerRef.current.appendChild(l)}
    if (innerRef.current) for (let i=0;i<36;i++){const a=(i*10+5)*Math.PI/180,l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',Math.cos(a)*170);l.setAttribute('y1',Math.sin(a)*170);l.setAttribute('x2',Math.cos(a)*220);l.setAttribute('y2',Math.sin(a)*220);l.setAttribute('stroke','#e4b04a');l.setAttribute('stroke-width','.4');l.setAttribute('opacity','.4');innerRef.current.appendChild(l)}
  }, [])
  return (
    <div style={{ position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:'min(92vh,960px)',height:'min(92vh,960px)',zIndex:1,pointerEvents:'none' }}>
      <svg viewBox="-500 -500 1000 1000" style={{ width:'100%',height:'100%',overflow:'visible' }}>
        <defs><radialGradient id="sunCore2" cx="0" cy="0" r="1"><stop offset="0%" stopColor="#f6d57a" stopOpacity=".9"/><stop offset="30%" stopColor="#e4b04a" stopOpacity=".5"/><stop offset="70%" stopColor="#c0352a" stopOpacity=".15"/><stop offset="100%" stopColor="#0a0806" stopOpacity="0"/></radialGradient></defs>
        <circle r="340" fill="url(#sunCore2)"/>
        <circle r="120" fill="none" stroke="var(--gold)" strokeWidth=".5" opacity=".3"/>
        <circle r="170" fill="none" stroke="var(--gold)" strokeWidth=".3" opacity=".18"/>
        <circle r="220" fill="none" stroke="var(--gold)" strokeWidth=".5" strokeDasharray="2 6" opacity=".35"/>
        <circle r="300" fill="none" stroke="var(--gold)" strokeWidth=".5" opacity=".3"/>
        <circle r="360" fill="none" stroke="var(--gold)" strokeWidth=".3" opacity=".18"/>
        <circle r="430" fill="none" stroke="var(--gold)" strokeWidth=".5" strokeDasharray="2 6" opacity=".35"/>
        <g style={{transformOrigin:'center',animation:'spin 160s linear infinite'}}><g ref={outerRef}/></g>
        <g style={{transformOrigin:'center',animation:'spin 260s linear infinite reverse'}}><g ref={innerRef}/></g>
      </svg>
    </div>
  )
}

function KrishnaSilhouette() {
  return (
    <div style={{ position:'absolute',left:'50%',bottom:'6%',transform:'translateX(-50%)',zIndex:3,width:'min(46vh,460px)',height:'min(86vh,820px)',filter:'drop-shadow(0 10px 40px rgba(0,0,0,.6))' }}>
      <svg viewBox="-200 -400 400 800" preserveAspectRatio="xMidYMax meet" style={{width:'100%',height:'100%',overflow:'visible'}}>
        <defs>
          <linearGradient id="kGrad" x1="0" y1="-1" x2="0" y2="1"><stop offset="0%" stopColor="#1e1912"/><stop offset="40%" stopColor="#0d0a07"/><stop offset="100%" stopColor="#000"/></linearGradient>
          <radialGradient id="halo" cx="0" cy="0" r="1"><stop offset="0%" stopColor="#f6d57a" stopOpacity=".7"/><stop offset="100%" stopColor="#e4b04a" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="0" cy="-230" r="120" fill="url(#halo)"/>
        <circle cx="0" cy="-230" r="108" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".8"/>
        <circle cx="0" cy="-230" r="96" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".35"/>
        <g style={{animation:'float 8s ease-in-out infinite'}}><g transform="translate(0,-330) rotate(-18)"><path d="M 0 0 Q -6 -40 0 -80 Q 6 -40 0 0 Z" stroke="var(--gold)" strokeWidth=".6" fill="none" opacity=".6"/><ellipse cx="0" cy="-62" rx="4.5" ry="6.5" fill="var(--sindoor)" opacity=".7"/></g></g>
        <g style={{animation:'float 10s ease-in-out -2s infinite'}}><g transform="translate(0,-336)"><path d="M 0 0 Q -7 -50 0 -100 Q 7 -50 0 0 Z" stroke="var(--gold)" strokeWidth=".6" fill="none" opacity=".6"/><ellipse cx="0" cy="-78" rx="5" ry="7" fill="var(--sindoor)" opacity=".7"/></g></g>
        <g style={{animation:'float 8s ease-in-out infinite'}}><g transform="translate(0,-330) rotate(18)"><path d="M 0 0 Q -6 -40 0 -80 Q 6 -40 0 0 Z" stroke="var(--gold)" strokeWidth=".6" fill="none" opacity=".6"/><ellipse cx="0" cy="-62" rx="4.5" ry="6.5" fill="var(--sindoor)" opacity=".7"/></g></g>
        <ellipse fill="url(#kGrad)" cx="0" cy="-240" rx="52" ry="60"/>
        <path fill="url(#kGrad)" d="M -22 -190 Q 0 -175 22 -190 L 26 -170 Q 0 -155 -26 -170 Z"/>
        <path fill="url(#kGrad)" d="M -120 -160 Q -140 -120 -130 -60 Q -100 -20 -80 20 Q -60 90 -70 160 L 70 160 Q 60 90 80 20 Q 100 -20 130 -60 Q 140 -120 120 -160 Q 80 -180 0 -175 Q -80 -180 -120 -160 Z"/>
        <path fill="url(#kGrad)" d="M -110 -80 Q -150 -40 -160 20 Q -150 40 -110 30 Q -90 10 -80 -10 Z"/>
        <path fill="url(#kGrad)" d="M 110 -80 Q 150 -40 160 20 Q 150 40 110 30 Q 90 10 80 -10 Z"/>
        <rect x="-90" y="-215" width="180" height="4" rx="2" fill="#e4b04a" opacity=".9"/>
        <path fill="url(#kGrad)" d="M -70 160 L -90 340 Q 0 360 90 340 L 70 160 Z"/>
        <rect x="-72" y="145" width="144" height="12" fill="#7b1d1a" opacity=".75"/>
        <rect x="-72" y="145" width="144" height="2" fill="#e4b04a" opacity=".6"/>
      </svg>
    </div>
  )
}

function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    for (let i=0;i<28;i++){const s=document.createElement('span');s.style.cssText='position:absolute;width:3px;height:3px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px var(--gold),0 0 16px var(--ember);animation:drift 12s linear infinite;opacity:0;';s.style.left=(10+Math.random()*80)+'%';s.style.top=(60+Math.random()*40)+'%';s.style.setProperty('--dx',(Math.random()*80-40)+'px');s.style.setProperty('--dy',-(180+Math.random()*220)+'px');s.style.animationDelay=(Math.random()*12)+'s';s.style.animationDuration=(10+Math.random()*8)+'s';ref.current.appendChild(s)}
  }, [])
  return <div ref={ref} style={{position:'absolute',inset:0,zIndex:2,pointerEvents:'none'}} aria-hidden/>
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)} })
    }, { threshold:.15 })
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger').forEach(el=>io.observe(el))
    return () => io.disconnect()
  }, [])
}

const PARTS = [
  { num:'I',   title:'The Foundations',         desc:'Origins, ancestry, and the seeds of the great conflict that will cleave the house of Bharata in two.', range:'VIII', poems:'1–8',  status:'in progress' },
  { num:'II',  title:'The Birth of Rivals',      desc:'Dhṛtarāṣṭra, Pāṇḍu, and the two broods of princes whose rivalry will consume an age.',                range:'VI',   poems:'9–14', status:'awaited' },
  { num:'III', title:'Education & Exile',         desc:'Training at the feet of Droṇa, the lacquer-house, the early flights into the forest.',                  range:'VI',   poems:'15–20',status:'awaited' },
  { num:'IV',  title:'Marriage, Glory, Downfall', desc:'The winning of Draupadī, the city of Indraprastha, the fateful cast of the dice.',                      range:'VI',   poems:'21–26',status:'awaited' },
  { num:'V',   title:'The Years of Exile',        desc:'Thirteen years in the forest; the teachings received; the incognito year at Virāṭa\'s court.',          range:'IV',   poems:'27–30',status:'awaited' },
  { num:'VI',  title:'The Great War',             desc:'Preparations, the Gītā on the field, the eighteen-day conflagration of Kurukṣetra.',                    range:'VII',  poems:'31–37',status:'awaited' },
  { num:'VII', title:'Aftermath & Ascension',     desc:'The mourning of mothers, the lament of widows, the last long walk toward heaven.',                      range:'III',  poems:'38–40',status:'awaited' },
]

export default function MahabharataLanding() {
  useReveal()
  const navigate = useNavigate()
  const spineRef = useRef(null)
  const wrapRef = useRef(null)
  const completed = poems.filter(p=>p.status==='complete').length

  useEffect(() => {
    const fill = spineRef.current; const wrap = wrapRef.current
    if (!fill||!wrap) return
    const tick = () => {
      const r=wrap.getBoundingClientRect(),vh=window.innerHeight,total=r.height
      const prog=Math.min(Math.max(vh*.8-r.top,0),total)
      fill.style.height=prog+'px'
    }
    window.addEventListener('scroll',tick,{passive:true})
    window.addEventListener('resize',tick)
    tick()
    return()=>{window.removeEventListener('scroll',tick);window.removeEventListener('resize',tick)}
  }, [])

  return (
    <div style={{background:'var(--ink)',minHeight:'100vh'}}>

      {/* ── HERO ── */}
      <header style={{
        position:'relative',minHeight:'100vh',display:'grid',placeItems:'center',overflow:'hidden',
        background:`radial-gradient(60% 50% at 50% 55%, rgba(228,176,74,.2) 0%, rgba(228,176,74,.06) 45%, transparent 75%),
          radial-gradient(40% 50% at 80% 20%, rgba(192,53,42,.14), transparent 60%),
          radial-gradient(35% 40% at 15% 80%, rgba(192,53,42,.1), transparent 60%),
          var(--ink)`,
      }}>
        <div style={{position:'absolute',top:'50%',left:30,whiteSpace:'nowrap',zIndex:2,color:'var(--gold)',opacity:.18,fontFamily:'Cinzel',fontSize:14,letterSpacing:'1em',textTransform:'uppercase',pointerEvents:'none',transform:'translateY(-50%) rotate(-90deg)'}}>॥ Vyāsa · Ganesha · Sauti ॥</div>
        <div style={{position:'absolute',top:'50%',right:30,whiteSpace:'nowrap',zIndex:2,color:'var(--gold)',opacity:.18,fontFamily:'Cinzel',fontSize:14,letterSpacing:'1em',textTransform:'uppercase',pointerEvents:'none',transform:'translateY(-50%) rotate(90deg)'}}>॥ Mahābhārata · 1.00.000 · Śloka ॥</div>
        <Mandala/>
        <KrishnaSilhouette/>
        <Particles/>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center, transparent 30%, var(--ink) 88%)',pointerEvents:'none',zIndex:2}}/>
        <div style={{position:'relative',zIndex:4,textAlign:'center',padding:'0 24px',maxWidth:980}}>
          <div className="reveal" style={{color:'var(--gold)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.4em',textTransform:'uppercase',marginBottom:4}}>
            <span style={{display:'inline-block',width:26,height:1,background:'var(--gold)',verticalAlign:'middle',margin:'0 12px',opacity:.7}}/>
            Volume I · An Epic in Verse
            <span style={{display:'inline-block',width:26,height:1,background:'var(--gold)',verticalAlign:'middle',margin:'0 12px',opacity:.7}}/>
          </div>
          <h1 style={{fontFamily:'Cinzel',fontWeight:500,fontSize:'clamp(48px,8.4vw,140px)',lineHeight:.98,letterSpacing:'.04em',marginTop:26}}>
            <span style={{background:'linear-gradient(180deg, var(--vellum) 0%, var(--gold-lit) 55%, var(--gold-deep) 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>The Mahābhārata</span>
            <em style={{fontFamily:'"Cormorant Garamond"',fontWeight:300,fontStyle:'italic',fontSize:'.38em',letterSpacing:'.08em',display:'block',color:'var(--gold)',marginTop:18}}>a retelling in ottava rima</em>
          </h1>
          <p className="reveal" style={{margin:'32px auto 0',maxWidth:640,fontSize:19,lineHeight:1.65,color:'var(--vellum-dim)',fontStyle:'italic',fontWeight:300}}>
            "Forty poems spanning the complete saga of the Bharata dynasty, from cosmic origins to divine ascension."
          </p>
          <div className="reveal" style={{marginTop:44,display:'flex',justifyContent:'center',gap:60,flexWrap:'wrap'}}>
            {[{num:40,lbl:'Poems'},{num:'VII',lbl:'Parts'},{num:completed,lbl:'Complete'}].map((s,i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:'Cinzel',fontSize:48,color:'var(--gold)',letterSpacing:'.04em',lineHeight:1}}>{s.num}</div>
                <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:10,letterSpacing:'.28em',textTransform:'uppercase',color:'var(--vellum-mute)',marginTop:8}}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{marginTop:44}}>
            <Link to="/mahabharata/poems" className="cta"><span>Begin Reading</span><span>→</span></Link>
          </div>
        </div>
        <div style={{position:'absolute',left:'50%',bottom:28,transform:'translateX(-50%)',zIndex:4,display:'flex',flexDirection:'column',alignItems:'center',gap:8,color:'var(--gold)'}}>
          <div className="mono" style={{fontSize:10,letterSpacing:'.4em'}}>Explore</div>
          <div style={{width:1,height:40,background:'linear-gradient(to bottom, transparent, var(--gold))',animation:'drop 2.4s ease-in-out infinite'}}/>
        </div>
      </header>

      {/* ── INVOCATION ── */}
      <section style={{padding:'180px 44px',background:'linear-gradient(to bottom, var(--ink), var(--ink-2))',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:900,height:900,border:'1px solid var(--gold)',borderRadius:'50%',opacity:.06,pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,border:'1px dashed var(--gold)',borderRadius:'50%',opacity:.08,pointerEvents:'none'}}/>
        <div className="reveal" style={{maxWidth:980,margin:'0 auto',textAlign:'center',position:'relative'}}>
          <div style={{fontFamily:'Cinzel',fontSize:54,color:'var(--gold)',lineHeight:1,letterSpacing:'.1em',marginBottom:28}}>ॐ</div>
          <div className="mono" style={{color:'var(--gold)',marginBottom:36}}>I · Invocation</div>
          <div style={{fontFamily:'"Cormorant Garamond"',fontWeight:300,fontStyle:'italic',fontSize:'clamp(26px,3.2vw,42px)',lineHeight:1.55,color:'var(--vellum)'}}>
            "What is found <span style={{color:'var(--gold-lit)'}}>here</span> may be found elsewhere.<br/>
            What is <span style={{color:'var(--gold-lit)'}}>not here</span> exists not anywhere."
          </div>
          <div className="mono" style={{marginTop:34,color:'var(--vellum-mute)',textTransform:'none',letterSpacing:'.06em'}}>yad ihāsti tad anyatra · yan nehāsti na kutracit</div>
        </div>
      </section>

      {/* ── SEVEN PARTS ── */}
      <section id="parts" style={{padding:'180px 44px 160px',background:'var(--ink-2)',position:'relative',overflow:'hidden'}}>
        <div className="reveal" style={{maxWidth:1200,margin:'0 auto 90px',display:'grid',gridTemplateColumns:'1fr auto',gap:30,alignItems:'end'}}>
          <h2 style={{fontFamily:'Cinzel',fontWeight:500,fontSize:'clamp(40px,5vw,82px)',lineHeight:1,letterSpacing:'.03em',color:'var(--vellum)'}}>
            The Seven<br/>Parts of the Epic
            <em style={{fontFamily:'"Cormorant Garamond"',fontWeight:300,fontStyle:'italic',color:'var(--gold)',fontSize:'.55em',display:'block',marginTop:12,letterSpacing:'.04em'}}>Sapta-Parvāṇi</em>
          </h2>
          <div style={{color:'var(--vellum-mute)',maxWidth:320,textAlign:'right',lineHeight:1.7}}>
            <span className="mono" style={{color:'var(--gold)',display:'block',marginBottom:10}}>II · Architecture</span>
            Forty poems, arranged as seven movements — from the cosmic churning to the final ascent of the five brothers and their faithful hound.
          </div>
        </div>

        <div ref={wrapRef} style={{maxWidth:1200,margin:'0 auto',position:'relative'}}>
          {/* Spine */}
          <div style={{position:'absolute',left:60,top:0,bottom:0,width:1,background:'linear-gradient(to bottom, transparent, rgba(228,176,74,.2) 10%, rgba(228,176,74,.2) 90%, transparent)',pointerEvents:'none'}}>
            <div ref={spineRef} style={{position:'absolute',left:0,top:0,width:1,background:'linear-gradient(to bottom, var(--sindoor), var(--gold))',height:0,boxShadow:'0 0 10px var(--gold)'}}/>
          </div>

          {PARTS.map((p,i) => (
            <Link key={p.num} to={`/mahabharata/poems?part=${p.num}`} className="reveal" style={{
              display:'grid',gridTemplateColumns:'120px 1fr 1.2fr 180px 60px',gap:32,alignItems:'center',
              padding:'44px 0 44px 24px',borderBottom:'1px solid rgba(228,176,74,.14)',
              position:'relative',textDecoration:'none',color:'inherit',transition:'all .5s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='linear-gradient(to right, rgba(228,176,74,.06), transparent 70%)'}}
            onMouseLeave={e=>{e.currentTarget.style.background=''}}>
              <span style={{position:'absolute',left:60,top:'50%',transform:'translate(-50%,-50%)',width:12,height:12,background:'var(--ink-2)',border:'1px solid var(--gold)',borderRadius:'50%',zIndex:2}}/>
              <div style={{fontFamily:'Cinzel',fontSize:52,color:'var(--gold)',letterSpacing:'.04em',paddingLeft:60}}>{p.num}</div>
              <div style={{fontFamily:'"Cormorant Garamond"',fontWeight:500,fontSize:32,color:'var(--vellum)',lineHeight:1.1}}>{p.title}</div>
              <div style={{color:'var(--vellum-mute)',lineHeight:1.55,fontSize:16}}>{p.desc}</div>
              <div style={{color:'var(--vellum-dim)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',textAlign:'right'}}>
                <span style={{fontFamily:'Cinzel',fontSize:22,color:'var(--gold)',letterSpacing:'.04em',display:'block',marginBottom:4}}>{p.range}</span>
                poems {p.poems} · {p.status}
              </div>
              <div style={{textAlign:'right',color:'var(--gold)',fontSize:22}}>→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section style={{padding:'180px 44px',background:'var(--ink)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',left:-200,top:-200,width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle at center, rgba(192,53,42,.18), transparent 65%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',right:-300,bottom:-300,width:900,height:900,borderRadius:'50%',background:'radial-gradient(circle at center, rgba(228,176,74,.1), transparent 70%)',pointerEvents:'none'}}/>
        <div style={{maxWidth:1280,margin:'0 auto',position:'relative',display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:90,alignItems:'start'}}>
          {/* Crest */}
          <div className="reveal-left" style={{width:'100%',aspectRatio:'3/4',border:'1px solid rgba(228,176,74,.3)',position:'relative',background:'linear-gradient(135deg, rgba(228,176,74,.03), transparent 50%, rgba(192,53,42,.04))',overflow:'hidden'}}>
            {['tl','tr','bl','br'].map(c=>(
              <span key={c} style={{position:'absolute',width:40,height:40,border:'1px solid var(--gold)',opacity:.6,
                ...(c==='tl'?{top:12,left:12,borderRight:'none',borderBottom:'none'}:c==='tr'?{top:12,right:12,borderLeft:'none',borderBottom:'none'}:c==='bl'?{bottom:12,left:12,borderRight:'none',borderTop:'none'}:{bottom:12,right:12,borderLeft:'none',borderTop:'none'})
              }}/>
            ))}
            <svg viewBox="-100 -100 200 200" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
              <circle r="70" fill="none" stroke="#e4b04a" strokeWidth=".4" opacity=".5"/>
              <circle r="55" fill="none" stroke="#e4b04a" strokeWidth=".4" opacity=".4" strokeDasharray="2 4"/>
              <circle r="40" fill="none" stroke="#e4b04a" strokeWidth=".4" opacity=".35"/>
              <polygon points="0,-60 52,30 -52,30" fill="none" stroke="#e4b04a" strokeWidth=".5" opacity=".5"/>
              <polygon points="0,60 -52,-30 52,-30" fill="none" stroke="#c0352a" strokeWidth=".5" opacity=".5"/>
              <circle r="8" fill="#e4b04a" opacity=".7"/>
              <circle r="3" fill="#c0352a"/>
            </svg>
            <div style={{position:'absolute',left:'50%',bottom:30,transform:'translateX(-50%)',textAlign:'center'}}>
              <div className="mono" style={{color:'var(--vellum-mute)'}}>Canto</div>
              <div style={{fontFamily:'Cinzel',fontSize:44,color:'var(--gold)',letterSpacing:'.06em',margin:'6px 0'}}>I</div>
              <div style={{fontFamily:'"Cormorant Garamond"',fontStyle:'italic',color:'var(--vellum)',fontSize:20}}>The Sacred Telling</div>
            </div>
          </div>

          {/* Right content */}
          <div className="reveal-right">
            <div className="mono" style={{color:'var(--gold)'}}>III · Featured Reading</div>
            <h3 style={{fontFamily:'Cinzel',fontWeight:500,fontSize:'clamp(40px,4.6vw,68px)',lineHeight:1.05,letterSpacing:'.02em',margin:'22px 0 14px',color:'var(--vellum)'}}>Of Ink Divine<br/>and Words Eternal</h3>
            <div style={{fontFamily:'"Cormorant Garamond"',fontStyle:'italic',fontWeight:300,color:'var(--gold-lit)',fontSize:22,marginBottom:40}}>Canto I — an invocation, and the birth of the great tale.</div>
            <p style={{margin:'0 0 26px',fontSize:19,lineHeight:1.75,color:'var(--vellum)'}}>
              <span style={{float:'left',fontFamily:'Cinzel',fontWeight:500,fontSize:72,lineHeight:.85,color:'var(--gold)',margin:'6px 14px 0 0'}}>I</span>
              n ages past, when time was young and pure,<br/>
              When gods walked free upon the mortal earth,<br/>
              When every word a sage pronounced was sure<br/>
              To carry weight beyond all mortal worth,<br/>
              There lived a seer of most exalted birth,<br/>
              Whose wisdom spanned the breadth of sea and shore —
              <em style={{color:'var(--gold-lit)'}}> This sage was Vyāsa, dark of skin, whose bliss was knowing truth, and speaking it to men.</em>
            </p>
            <div style={{display:'flex',alignItems:'center',gap:14,margin:'34px 0'}}>
              <div style={{flex:1,height:1,background:'linear-gradient(to right, var(--gold), transparent)'}}/>
              <div style={{width:6,height:6,background:'var(--gold)',transform:'rotate(45deg)'}}/>
              <div style={{flex:1,height:1,background:'linear-gradient(to left, var(--gold), transparent)'}}/>
            </div>
            <Link to="/mahabharata/poems?part=I" className="cta" style={{marginTop:24}}><span>Read the Full Canto</span><span>→</span></Link>
          </div>
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
        <div><Link to="/" style={{display:'inline-flex',alignItems:'center',gap:10,color:'var(--vellum-dim)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',textDecoration:'none'}}>← Back to The Verse Sanctum</Link></div>
        <div style={{textAlign:'center',color:'var(--gold)',fontFamily:'Cinzel',letterSpacing:'.3em',textTransform:'uppercase',fontSize:11}}>Mahābhārata</div>
        <div style={{textAlign:'right'}}><a href="#top" style={{color:'var(--gold)',fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',textDecoration:'none'}}>Return to the top ↑</a></div>
      </footer>
    </div>
  )
}
