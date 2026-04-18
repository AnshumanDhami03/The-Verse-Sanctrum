import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef(null)
  
  // Using a more reliable royalty-free Indian flute audio
  // This is a meditation flute track
  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25
      audioRef.current.loop = true
      
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true)
      })
    }
  }, [])
  
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(e => {
          console.log('Audio play failed:', e)
        })
        setIsPlaying(true)
      }
    }
  }
  
  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      <motion.button
        onClick={toggleMusic}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm border rounded-full transition-all ${
          isPlaying 
            ? 'bg-sanctum-burgundy/80 border-sanctum-gold/50' 
            : 'bg-sanctum-darker/80 border-sanctum-gold/20 hover:border-sanctum-gold/40'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Play/Pause Icon */}
        <div className="w-6 h-6 flex items-center justify-center text-sanctum-gold">
          {isPlaying ? (
            // Pause icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            // Play icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14.72a1 1 0 001.53.85l11.25-7.36a1 1 0 000-1.7L9.53 4.29A1 1 0 008 5.14z" />
            </svg>
          )}
        </div>
        
        {/* Music wave visualizer */}
        <div className={`music-wave ${!isPlaying ? 'paused' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 px-3 py-1.5 bg-sanctum-dark border border-sanctum-gold/20 rounded text-sm text-sanctum-cream/70 whitespace-nowrap"
            >
              {isPlaying ? 'Pause Music' : 'Play Ambient Music'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {/* Pulsing ring when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border border-sanctum-gold/30 pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  )
}

export default MusicPlayer