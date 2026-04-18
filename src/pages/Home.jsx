import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  OmSymbol, 
  Lotus, 
  ChariotWheel, 
  PeacockFeather,
  BorderOrnament,
  CornerOrnament 
} from '../components/Illustrations'

const Home = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating illustrations */}
          <motion.div 
            className="absolute top-20 left-10 text-sanctum-gold/10"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lotus size={120} />
          </motion.div>
          
          <motion.div 
            className="absolute top-40 right-20 text-sanctum-gold/10"
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <ChariotWheel size={100} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-40 left-20 text-sanctum-gold/10"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <PeacockFeather size={140} />
          </motion.div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-radial from-sanctum-burgundy/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sanctum-black" />
        </div>
        
        {/* Hero content */}
        <motion.div 
          className="relative z-10 text-center px-6"
          style={{ y: heroY, scale: heroScale }}
        >
          {/* Om symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="text-sanctum-gold"
            >
              <OmSymbol size={60} />
            </motion.div>
          </motion.div>
          
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-sanctum-cream tracking-wider"
          >
            <span className="block">The Verse</span>
            <span className="block mt-2 text-shimmer">Sanctum</span>
          </motion.h1>
          
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <BorderOrnament className="text-sanctum-gold" width={250} />
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
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Works Section */}
      <section className="relative py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-display text-3xl md:text-4xl text-sanctum-cream mb-4">
                Epic Works
              </h2>
              <div className="flex justify-center">
                <BorderOrnament className="text-sanctum-gold/50" width={150} />
              </div>
            </div>
          </ScrollReveal>
          
          {/* Epic cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Mahabharata Card - Active */}
            <ScrollReveal delay={0.1}>
              <EpicCard 
                title="The Mahabharata"
                subtitle="An Epic in Verse"
                description="Forty poems spanning the complete saga of the Bharata dynasty, from cosmic origins to divine ascension."
                status="In Progress"
                progress={15}
                link="/mahabharata"
                active={true}
              />
            </ScrollReveal>
            
            {/* Placeholder cards for future epics */}
            <ScrollReveal delay={0.2}>
              <EpicCard 
                title="Coming Soon"
                subtitle=""
                description="A new epic journey awaits..."
                status="Planned"
                active={false}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <EpicCard 
                title="Coming Soon"
                subtitle=""
                description="Another tale from the ages..."
                status="Planned"
                active={false}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 border-t border-sanctum-gold/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sanctum-gold"
          >
            <OmSymbol size={40} />
          </motion.div>
          <p className="mt-6 text-sanctum-cream/40 text-sm tracking-wider">
            The Verse Sanctum
          </p>
        </div>
      </footer>
    </div>
  )
}

// Scroll reveal wrapper component
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Epic card component with 3D tilt effect
const EpicCard = ({ title, subtitle, description, status, progress, link, active }) => {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = React.useState(0)
  const [rotateY, setRotateY] = React.useState(0)
  
  const handleMouseMove = (e) => {
    if (!cardRef.current || !active) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    setRotateY(mouseX / 20)
    setRotateX(-mouseY / 20)
  }
  
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }
  
  const CardWrapper = active ? Link : 'div'
  const cardProps = active ? { to: link } : {}
  
  return (
    <CardWrapper {...cardProps}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={active ? { scale: 1.02 } : {}}
        className={`relative group h-[320px] sm:h-[400px] rounded-lg overflow-hidden ${
          active ? 'cursor-pointer' : 'cursor-default opacity-50'
        }`}
      >
        {/* Card background */}
        <div className="absolute inset-0 bg-sanctum-darker border border-sanctum-gold/20 rounded-lg transition-colors group-hover:border-sanctum-gold/40" />
        
        {/* Corner ornaments */}
        {active && (
          <>
            <div className="absolute top-2 left-2 text-sanctum-gold/30 group-hover:text-sanctum-gold/50 transition-colors">
              <CornerOrnament size={40} position="top-left" />
            </div>
            <div className="absolute top-2 right-2 text-sanctum-gold/30 group-hover:text-sanctum-gold/50 transition-colors">
              <CornerOrnament size={40} position="top-right" />
            </div>
            <div className="absolute bottom-2 left-2 text-sanctum-gold/30 group-hover:text-sanctum-gold/50 transition-colors">
              <CornerOrnament size={40} position="bottom-left" />
            </div>
            <div className="absolute bottom-2 right-2 text-sanctum-gold/30 group-hover:text-sanctum-gold/50 transition-colors">
              <CornerOrnament size={40} position="bottom-right" />
            </div>
          </>
        )}
        
        {/* Card content */}
        <div className="relative h-full flex flex-col justify-between p-8" style={{ transform: "translateZ(50px)" }}>
          {/* Status badge */}
          <div className="flex justify-between items-start">
            <span className={`text-xs tracking-wider uppercase px-3 py-1 rounded-full border ${
              active 
                ? 'border-sanctum-gold/50 text-sanctum-gold' 
                : 'border-sanctum-cream/20 text-sanctum-cream/40'
            }`}>
              {status}
            </span>
            
            {active && (
              <motion.div
                className="text-sanctum-gold"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <ChariotWheel size={40} />
              </motion.div>
            )}
          </div>
          
          {/* Title area */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className={`font-display text-2xl md:text-3xl ${
              active ? 'text-sanctum-cream group-hover:text-sanctum-gold transition-colors' : 'text-sanctum-cream/40'
            }`}>
              {title}
            </h3>
            {subtitle && (
              <p className="mt-2 font-display text-lg text-sanctum-gold/70 italic">
                {subtitle}
              </p>
            )}
            <p className="mt-4 text-sanctum-cream/60 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Progress bar (if active) */}
          {active && progress !== undefined && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-sanctum-cream/40 mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-sanctum-dark rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-sanctum-burgundy to-sanctum-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          )}
          
          {/* Enter button */}
          {active && (
            <motion.div
              className="mt-6 flex items-center gap-2 text-sanctum-gold opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <span className="text-sm tracking-wider uppercase">Enter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          )}
        </div>
        
        {/* Hover glow effect */}
        {active && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-sanctum-gold/5 via-transparent to-transparent" />
          </div>
        )}
      </motion.div>
    </CardWrapper>
  )
}

export default Home