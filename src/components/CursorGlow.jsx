import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }
    
    const hideCursor = () => {
      setIsVisible(false)
    }
    
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [cursorX, cursorY])
  
  if (isTouchDevice) return null
  
  return (
    <>
      {/* Cursor dot — sharp visible point */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#d4a84b',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px rgba(212, 168, 75, 0.8)',
          }}
        />
      </motion.div>

      {/* Glow aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          style={{
            width: '400px',
            height: '400px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(212, 168, 75, 0.06) 0%, rgba(212, 168, 75, 0.02) 30%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  )
}

export default CursorGlow