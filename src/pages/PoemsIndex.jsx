import React, { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  BorderOrnament,
  ChariotWheel,
  BowAndArrow,
  PeacockFeather,
  Lotus
} from '../components/Illustrations'
import { mahabharataInfo, poems } from '../data/poems'

const PoemsIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPart = searchParams.get('part') || 'all'
  const [selectedPart, setSelectedPart] = useState(initialPart)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Update URL when part changes
  const handlePartChange = (part) => {
    setSelectedPart(part)
    if (part === 'all') {
      searchParams.delete('part')
    } else {
      searchParams.set('part', part)
    }
    setSearchParams(searchParams)
  }
  
  // Sync with URL on mount
  useEffect(() => {
    const partFromUrl = searchParams.get('part')
    if (partFromUrl && partFromUrl !== selectedPart) {
      setSelectedPart(partFromUrl)
    }
  }, [searchParams])
  
  const filteredPoems = poems.filter(poem => {
    const matchesPart = selectedPart === 'all' || poem.part === selectedPart
    const matchesSearch = poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          poem.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPart && matchesSearch
  })
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Header */}
      <header className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/mahabharata" className="inline-block text-sanctum-gold/50 hover:text-sanctum-gold transition-colors mb-6">
              ← Back to Overview
            </Link>
            
            <h1 className="font-display text-4xl md:text-5xl text-sanctum-cream">
              All Poems
            </h1>
            <p className="mt-4 text-sanctum-cream/60 max-w-xl mx-auto">
              Forty poems spanning the complete saga of the Bharata dynasty
            </p>
            
            <div className="flex justify-center mt-6">
              <BorderOrnament className="text-sanctum-gold/50" width={200} />
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* Filters */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 items-center justify-between"
          >
            {/* Part filter tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              <FilterTab 
                active={selectedPart === 'all'} 
                onClick={() => handlePartChange('all')}
              >
                All
              </FilterTab>
              {mahabharataInfo.parts.map(part => (
                <FilterTab 
                  key={part.number}
                  active={selectedPart === part.number} 
                  onClick={() => handlePartChange(part.number)}
                >
                  Part {part.number}
                </FilterTab>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search poems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 bg-sanctum-darker border border-sanctum-gold/20 rounded-lg text-sanctum-cream placeholder:text-sanctum-cream/30 focus:outline-none focus:border-sanctum-gold/50 transition-colors"
              />
              <svg 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sanctum-cream/30"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
          
          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-sanctum-cream/40 text-sm"
          >
            Showing {filteredPoems.length} of {poems.length} poems
          </motion.p>
        </div>
      </section>
      
      {/* Poems Grid */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPoems.map((poem, index) => (
                <PoemGridCard key={poem.id} poem={poem} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredPoems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-sanctum-cream/50">No poems found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Legend */}
      <section className="px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-8 text-sm text-sanctum-cream/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sanctum-gold/50" />
              <span>Available to read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-transparent border border-sanctum-cream/20" />
              <span>In progress</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

// Filter tab component
const FilterTab = ({ active, onClick, children }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 text-sm tracking-wider uppercase rounded-lg border transition-all ${
      active 
        ? 'bg-sanctum-burgundy border-sanctum-gold/50 text-sanctum-gold' 
        : 'bg-transparent border-sanctum-gold/20 text-sanctum-cream/50 hover:border-sanctum-gold/40 hover:text-sanctum-cream'
    }`}
  >
    {children}
  </motion.button>
)

// Poem grid card with stagger animation
const PoemGridCard = ({ poem, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isComplete = poem.status === 'complete'
  
  const icons = [BowAndArrow, ChariotWheel, PeacockFeather, Lotus]
  const Icon = icons[poem.id % icons.length]
  
  const CardContent = () => (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.05, 0.3),
        ease: "easeOut" 
      }}
      whileHover={isComplete ? { y: -8, scale: 1.02 } : {}}
      className={`group relative h-[280px] p-5 rounded-lg border transition-all ${
        isComplete 
          ? 'bg-sanctum-darker border-sanctum-gold/20 hover:border-sanctum-gold/50 cursor-pointer' 
          : 'bg-sanctum-darker/30 border-sanctum-gold/5 cursor-default'
      }`}
    >
      {/* Background decoration */}
      <div className={`absolute top-4 right-4 transition-opacity ${
        isComplete ? 'text-sanctum-gold/10 group-hover:text-sanctum-gold/20' : 'text-sanctum-cream/5'
      }`}>
        <Icon size={60} />
      </div>
      
      {/* Poem number */}
      <div className={`font-display text-4xl ${
        isComplete ? 'text-sanctum-gold/60 group-hover:text-sanctum-gold' : 'text-sanctum-cream/15'
      } transition-colors`}>
        {poem.number}
      </div>
      
      {/* Content */}
      <div className="mt-4 relative z-10">
        <h3 className={`font-display text-lg leading-tight ${
          isComplete ? 'text-sanctum-cream group-hover:text-sanctum-gold' : 'text-sanctum-cream/30'
        } transition-colors`}>
          {poem.title}
        </h3>
        
        {isComplete && poem.subtitle && poem.subtitle !== 'Coming Soon' && (
          <p className="mt-1 text-sm italic text-sanctum-gold/60">
            {poem.subtitle}
          </p>
        )}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <span className={`text-xs tracking-wider uppercase ${
          isComplete ? 'text-sanctum-cream/30' : 'text-sanctum-cream/15'
        }`}>
          Part {poem.part}
        </span>
        
        {isComplete ? (
          <>
            <span className="text-xs text-sanctum-cream/30">
              {poem.stanzaCount} stanzas
            </span>
            <motion.div
              className="text-sanctum-gold opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </>
        ) : (
          <span className="text-xs text-sanctum-cream/20 italic">
            In progress
          </span>
        )}
      </div>
      
      {/* Status indicator - only for complete poems */}
      {isComplete && (
        <div className="absolute top-5 left-5 w-2 h-2 rounded-full bg-sanctum-gold/50" />
      )}
      
      {/* Hover glow */}
      {isComplete && (
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-radial from-sanctum-gold/5 via-transparent to-transparent" />
      )}
    </motion.div>
  )
  
  if (isComplete) {
    return (
      <Link to={`/mahabharata/poem/${poem.id}`}>
        <CardContent />
      </Link>
    )
  }
  
  return <CardContent />
}

export default PoemsIndex
