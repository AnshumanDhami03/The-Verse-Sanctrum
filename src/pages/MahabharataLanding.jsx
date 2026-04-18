import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  BowAndArrow, 
  ChariotWheel, 
  PeacockFeather, 
  Flute,
  Lotus,
  Conch,
  Trident,
  Flame,
  BorderOrnament,
  CornerOrnament 
} from '../components/Illustrations'
import { mahabharataInfo, poems } from '../data/poems'

const MahabharataLanding = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  
  const completedPoems = poems.filter(p => p.status === 'complete')
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background illustrations */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          {/* Floating Mahabharata motifs */}
          <motion.div 
            className="absolute top-32 left-[10%] text-sanctum-gold/20"
            animate={{ y: [0, -30, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <BowAndArrow size={120} />
          </motion.div>
          
          <motion.div 
            className="absolute top-48 right-[15%] text-sanctum-gold/15"
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <ChariotWheel size={140} spinning={false} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-48 left-[15%] text-sanctum-gold/15"
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <PeacockFeather size={160} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-32 right-[10%] text-sanctum-gold/20"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Flute size={100} />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-[5%] text-sanctum-burgundy/20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Lotus size={80} />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/3 right-[5%] text-sanctum-burgundy/15"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Conch size={70} />
          </motion.div>
        </motion.div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-sanctum-burgundy/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-sanctum-black/50 via-transparent to-sanctum-black" />
        
        {/* Hero content */}
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ opacity: heroOpacity, y: titleY }}
        >
          {/* Top ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="text-sanctum-gold"
            >
              <ChariotWheel size={70} />
            </motion.div>
          </motion.div>
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-sanctum-cream tracking-wide">
              The Mahabharata
            </h1>
            <p className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-sanctum-gold italic">
              An Epic in Verse
            </p>
          </motion.div>
          
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center my-8"
          >
            <BorderOrnament className="text-sanctum-gold" width={300} />
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sanctum-cream/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            {mahabharataInfo.description}
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex justify-center gap-6 sm:gap-12"
          >
            <Stat number={mahabharataInfo.totalPoems} label="Poems" />
            <Stat number={mahabharataInfo.parts.length} label="Parts" />
            <Stat number={mahabharataInfo.completedPoems} label="Complete" />
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12"
          >
            <Link to="/mahabharata/poems">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Begin Reading
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-sanctum-gold/50"
          >
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Parts Overview Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-sanctum-cream mb-4">
                Seven Parts of the Epic
              </h2>
              <div className="flex justify-center">
                <BorderOrnament className="text-sanctum-gold/50" width={200} />
              </div>
            </div>
          </ScrollReveal>
          
          <div className="space-y-6">
            {mahabharataInfo.parts.map((part, index) => (
              <ScrollReveal key={part.number} delay={index * 0.1}>
                <PartCard part={part} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Poems Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 bg-sanctum-darker/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-sanctum-cream mb-4">
                Latest Poems
              </h2>
              <div className="flex justify-center">
                <BorderOrnament className="text-sanctum-gold/50" width={200} />
              </div>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {completedPoems.slice(0, 6).map((poem, index) => (
              <ScrollReveal key={poem.id} delay={index * 0.1}>
                <PoemCard poem={poem} />
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link to="/mahabharata/poems">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  View All Poems
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 border-t border-sanctum-gold/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-8 text-sanctum-gold/30">
            <BowAndArrow size={40} />
            <ChariotWheel size={40} />
            <PeacockFeather size={50} />
            <Flute size={50} />
            <Lotus size={40} />
          </div>
          <Link to="/" className="text-sanctum-cream/40 text-sm tracking-wider hover:text-sanctum-gold transition-colors">
            ← Back to The Verse Sanctum
          </Link>
        </div>
      </footer>
    </motion.div>
  )
}

// Stat component
const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="font-display text-4xl text-sanctum-gold">{number}</div>
    <div className="mt-1 text-sanctum-cream/50 text-sm tracking-wider uppercase">{label}</div>
  </div>
)

// Scroll reveal component
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Part card component - now clickable
const PartCard = ({ part, index }) => {
  const icons = [BowAndArrow, ChariotWheel, PeacockFeather, Flute, Lotus, Trident, Flame]
  const Icon = icons[index % icons.length]
  
  return (
    <Link to={`/mahabharata/poems?part=${part.number}`}>
      <motion.div
        whileHover={{ x: 10 }}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 bg-sanctum-darker/50 border border-sanctum-gold/10 rounded-lg hover:border-sanctum-gold/30 transition-colors cursor-pointer"
      >
        <div className="text-sanctum-gold/50 group-hover:text-sanctum-gold transition-colors">
          <Icon size={50} />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="font-display text-2xl text-sanctum-gold">Part {part.number}</span>
            <span className="font-display text-xl text-sanctum-cream group-hover:text-sanctum-gold transition-colors">{part.title}</span>
          </div>
          <p className="mt-1 text-sanctum-cream/50">{part.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sanctum-cream/30 text-sm">
            Poems {part.poems}
          </span>
          <motion.div
            className="text-sanctum-gold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

// Poem card component
const PoemCard = ({ poem }) => (
  <Link to={`/mahabharata/poem/${poem.id}`}>
    <motion.div
      whileHover={{ y: -5 }}
      className="group h-full p-6 bg-sanctum-darker border border-sanctum-gold/10 rounded-lg hover:border-sanctum-gold/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-display text-3xl text-sanctum-gold/70 group-hover:text-sanctum-gold transition-colors">
          {poem.number}
        </span>
        <span className="text-xs text-sanctum-cream/30 tracking-wider uppercase">
          Part {poem.part}
        </span>
      </div>
      
      <h3 className="font-display text-xl text-sanctum-cream group-hover:text-sanctum-gold transition-colors">
        {poem.title}
      </h3>
      <p className="mt-1 text-sanctum-gold/60 italic text-sm">
        {poem.subtitle}
      </p>
      <p className="mt-4 text-sanctum-cream/50 text-sm line-clamp-3">
        {poem.summary}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-sanctum-cream/30">
          {poem.stanzaCount} stanzas
        </span>
        <motion.span
          className="text-sanctum-gold opacity-0 group-hover:opacity-100 transition-opacity text-sm"
        >
          Read →
        </motion.span>
      </div>
    </motion.div>
  </Link>
)

export default MahabharataLanding