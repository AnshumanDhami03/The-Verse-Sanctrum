import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  BorderOrnament,
  OmSymbol,
  ChariotWheel,
  Lotus
} from '../components/Illustrations'
import { poems } from '../data/poems'

const PoemReader = () => {
  const { poemId } = useParams()
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const contentRef = useRef(null)
  
  const poem = poems.find(p => p.id === parseInt(poemId))
  const prevPoem = poems.find(p => p.id === parseInt(poemId) - 1 && p.status === 'complete')
  const nextPoem = poems.find(p => p.id === parseInt(poemId) + 1 && p.status === 'complete')
  
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  
  // Hide/show nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowNav(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  // Scroll to top on poem change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [poemId])
  
  if (!poem || poem.status !== 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-sanctum-cream mb-4">Poem not found</h2>
          <Link to="/mahabharata/poems" className="text-sanctum-gold hover:underline">
            ← Back to all poems
          </Link>
        </div>
      </div>
    )
  }
  
  // Parse poem content into sections and stanzas
  const parseContent = (content) => {
    if (!content) return []
    
    // Split by section breaks (various formats)
    const sections = content.split(/---SECTION_BREAK---|─{3,}|═{3,}|\n\s*\*\s*\*\s*\*\s*\n/)
    
    return sections.map(section => {
      // Split by stanza breaks (various formats) and clean up
      const stanzas = section
        .split(/---STANZA_BREAK---|\n{3,}/)
        .map(s => s.trim())
        .filter(s => s && !s.match(/^[-─═*\s]+$/)) // Remove empty or decoration-only blocks
      return stanzas
    }).filter(section => section.length > 0)
  }
  
  const sections = parseContent(poem.content)
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Progress bar - always visible at very top regardless of nav state */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-sanctum-gold/10 z-[60]">
        <motion.div
          className="h-full bg-gradient-to-r from-sanctum-burgundy to-sanctum-gold"
          style={{ width: progressWidth }}
        />
      </div>
      
      {/* Top navigation bar */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-40 bg-sanctum-black/90 backdrop-blur-md border-b border-sanctum-gold/10"
          >
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
              
              {/* Left — Om logo home link */}
              <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                <svg width="22" height="22" viewBox="0 0 100 100" className="text-sanctum-gold" fill="currentColor">
                  <text y="78" fontSize="80" fontFamily="serif">ॐ</text>
                </svg>
              </Link>

              {/* Centre — current poem identifier */}
              <div className="flex items-center gap-3 min-w-0 flex-1 justify-center">
                <span className="font-display text-sanctum-gold text-sm shrink-0 opacity-70">
                  {poem.number}
                </span>
                <div className="w-px h-3.5 bg-sanctum-gold/25 shrink-0" />
                <span className="font-display text-sanctum-cream/75 text-sm truncate">
                  {poem.title}
                </span>
              </div>

              {/* Right — site nav links */}
              <div className="hidden md:flex items-center gap-6 shrink-0">
                <Link to="/" className="font-sans text-xs tracking-widest uppercase text-sanctum-cream/50 hover:text-sanctum-gold transition-colors">
                  Home
                </Link>
                <Link to="/mahabharata" className="font-sans text-xs tracking-widest uppercase text-sanctum-cream/50 hover:text-sanctum-gold transition-colors">
                  Mahabharata
                </Link>
                <Link to="/mahabharata/poems" className="font-sans text-xs tracking-widest uppercase text-sanctum-cream/50 hover:text-sanctum-gold transition-colors">
                  All Poems
                </Link>
              </div>

              {/* Mobile — just the list icon */}
              <Link to="/mahabharata/poems" className="md:hidden text-sanctum-cream/50 hover:text-sanctum-gold transition-colors shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero header */}
      <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 text-sanctum-gold/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <ChariotWheel size={200} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 text-sanctum-gold/5"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lotus size={150} />
          </motion.div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-sanctum-black via-transparent to-sanctum-black" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          {/* Part indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sanctum-cream/40 text-sm tracking-widest uppercase mb-4"
          >
            Part {poem.part} · Poem {poem.number}
          </motion.p>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-sanctum-cream"
          >
            {poem.title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 font-display text-xl md:text-2xl text-sanctum-gold/80 italic"
          >
            {poem.fullSubtitle || poem.subtitle}
          </motion.p>
          
          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <BorderOrnament className="text-sanctum-gold/50" width={200} />
          </motion.div>
          
          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex justify-center gap-8 text-sanctum-cream/40 text-sm"
          >
            <span>{poem.stanzaCount} stanzas</span>
            <span>•</span>
            <span>Ottava Rima</span>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sanctum-gold/30"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </header>
      
      {/* Poem content */}
      <main ref={contentRef} className="relative px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {sections.map((stanzas, sectionIndex) => (
            <div key={sectionIndex}>
              {stanzas.map((stanza, stanzaIndex) => (
                <StanzaBlock 
                  key={`${sectionIndex}-${stanzaIndex}`}
                  stanza={stanza}
                  index={sectionIndex * 100 + stanzaIndex}
                />
              ))}
              
              {/* Section break ornament */}
              {sectionIndex < sections.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="my-16 flex justify-center"
                >
                  <div className="section-break">
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </main>
      
      {/* Navigation footer */}
      <footer className="px-6 py-16 border-t border-sanctum-gold/10">
        <div className="max-w-4xl mx-auto">
          {/* End ornament */}
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-sanctum-gold/50"
            >
              <OmSymbol size={50} />
            </motion.div>
          </div>
          
          {/* Prev/Next navigation */}
          <div className="flex justify-between items-center gap-4">
            {prevPoem ? (
              <Link 
                to={`/mahabharata/poem/${prevPoem.id}`}
                className="group flex-1"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  className="p-6 bg-sanctum-darker/50 border border-sanctum-gold/10 rounded-lg hover:border-sanctum-gold/30 transition-colors"
                >
                  <span className="text-sanctum-cream/40 text-sm">← Previous</span>
                  <h3 className="mt-2 font-display text-lg text-sanctum-cream group-hover:text-sanctum-gold transition-colors">
                    {prevPoem.title}
                  </h3>
                </motion.div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            <Link 
              to="/mahabharata/poems"
              className="px-6 py-3 text-sanctum-gold/70 hover:text-sanctum-gold transition-colors"
            >
              All Poems
            </Link>
            
            {nextPoem ? (
              <Link 
                to={`/mahabharata/poem/${nextPoem.id}`}
                className="group flex-1 text-right"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-6 bg-sanctum-darker/50 border border-sanctum-gold/10 rounded-lg hover:border-sanctum-gold/30 transition-colors"
                >
                  <span className="text-sanctum-cream/40 text-sm">Next →</span>
                  <h3 className="mt-2 font-display text-lg text-sanctum-cream group-hover:text-sanctum-gold transition-colors">
                    {nextPoem.title}
                  </h3>
                </motion.div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

// Stanza block with reveal animation
const StanzaBlock = ({ stanza, index }) => {
  const ref = useRef(null)
  
  // Parse stanza into lines
  const lines = stanza.split('\n').filter(line => line.trim())
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="stanza"
    >
      {lines.map((line, lineIndex) => (
        <motion.span
          key={lineIndex}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: lineIndex * 0.05 }}
          className="stanza-line text-lg md:text-xl text-sanctum-cream/90 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: formatLine(line) 
          }}
        />
      ))}
    </motion.div>
  )
}

// Format line with special styling for emphasized text
const formatLine = (line) => {
  // Handle **bold** text
  let formatted = line.replace(
    /\*\*(.*?)\*\*/g, 
    '<strong class="text-sanctum-gold font-semibold">$1</strong>'
  )
  
  // Handle *italic* text
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    '<em class="text-sanctum-cream">$1</em>'
  )
  
  return formatted
}

export default PoemReader