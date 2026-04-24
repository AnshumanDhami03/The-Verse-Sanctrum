import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    setIsTouchDevice(isTouch)
    if (isTouch) return
    const moveCursor = e => { cursorX.set(e.clientX); cursorY.set(e.clientY); setIsVisible(true) }
    const hideCursor = () => setIsVisible(false)
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)
    return () => { window.removeEventListener('mousemove', moveCursor); window.removeEventListener('mouseleave', hideCursor) }
  }, [cursorX, cursorY])

  if (isTouchDevice) return null

  return (
    <>
      {/* Dot */}
      <motion.div className="pointer-events-none" style={{ position:'fixed', top:0, left:0, zIndex:9999, x:cursorXSpring, y:cursorYSpring, opacity:isVisible?1:0 }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--gold)', transform:'translate(-50%,-50%)', boxShadow:'0 0 6px rgba(228,176,74,.8)' }}/>
      </motion.div>
      {/* Glow aura */}
      <motion.div className="pointer-events-none" style={{ position:'fixed', top:0, left:0, zIndex:9998, mixBlendMode:'screen', x:cursorXSpring, y:cursorYSpring, opacity:isVisible?1:0 }}>
        <div style={{ width:400, height:400, transform:'translate(-50%,-50%)', background:'radial-gradient(circle, rgba(228,176,74,0.06) 0%, rgba(228,176,74,0.02) 30%, transparent 70%)' }}/>
      </motion.div>
    </>
  )
}
