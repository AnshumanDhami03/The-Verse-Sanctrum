import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }
    
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const hideCursor = () => setIsVisible(false)
    
    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true)
      }
    }
    
    const handleHoverEnd = () => setIsHovering(false)
    
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', hideCursor)
    window.addEventListener('mouseover', handleHoverStart)
    window.addEventListener('mouseout', handleHoverEnd)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', hideCursor)
      window.removeEventListener('mouseover', handleHoverStart)
      window.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [cursorX, cursorY])
  
  // Don't show on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Outer ring */}
          <motion.div
            animate={{
              scale: isHovering ? 1.2 : 1,
              borderColor: isHovering ? 'rgba(212, 168, 75, 0.8)' : 'rgba(212, 168, 75, 0.5)',
            }}
            className="w-8 h-8 rounded-full border-2 border-sanctum-gold/50"
          />
          
          {/* Inner dot */}
          <motion.div
            animate={{
              scale: isClicking ? 1.5 : 1,
              backgroundColor: isHovering ? '#d4a84b' : '#d4a84b',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sanctum-gold"
          />
        </motion.div>
      </motion.div>
      
      {/* Trailing glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 0.5 : 0,
        }}
      >
        <div 
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(212, 168, 75, 0.08) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  )
}

export default CursorGlow