import React from 'react'

// Om Symbol
export const OmSymbol = ({ className = "", size = 48 }) => (
  <svg 
    viewBox="0 0 100 100" 
    width={size} 
    height={size} 
    className={className}
    fill="currentColor"
  >
    <path d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm0 82c-20.4 0-37-16.6-37-37s16.6-37 37-37 37 16.6 37 37-16.6 37-37 37z" opacity="0.3"/>
    <text x="50" y="68" textAnchor="middle" fontSize="50" fontFamily="serif">ॐ</text>
  </svg>
)

// Peacock Feather (Morpankh)
export const PeacockFeather = ({ className = "", size = 100 }) => (
  <svg 
    viewBox="0 0 60 120" 
    width={size * 0.5} 
    height={size} 
    className={className}
    fill="none"
    stroke="currentColor"
  >
    <defs>
      <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a84b" />
        <stop offset="50%" stopColor="#2d5a3d" />
        <stop offset="100%" stopColor="#1a365d" />
      </linearGradient>
    </defs>
    {/* Main stem */}
    <path d="M30 120 Q30 60 30 10" strokeWidth="1.5" stroke="url(#featherGradient)" />
    {/* Feather barbs - left */}
    <path d="M30 20 Q15 25 10 35" strokeWidth="0.8" opacity="0.7" />
    <path d="M30 30 Q12 38 8 50" strokeWidth="0.8" opacity="0.7" />
    <path d="M30 40 Q10 52 7 65" strokeWidth="0.8" opacity="0.7" />
    <path d="M30 50 Q12 65 10 80" strokeWidth="0.8" opacity="0.7" />
    {/* Feather barbs - right */}
    <path d="M30 20 Q45 25 50 35" strokeWidth="0.8" opacity="0.7" />
    <path d="M30 30 Q48 38 52 50" strokeWidth="0.8" opacity="0.7" />
    <path d="M30 40 Q50 52 53 65" strokeWidth="0.8" opacity="0.7" />
    <path d="M30 50 Q48 65 50 80" strokeWidth="0.8" opacity="0.7" />
    {/* Eye of the feather */}
    <ellipse cx="30" cy="45" rx="12" ry="18" strokeWidth="1" stroke="#d4a84b" fill="none" />
    <ellipse cx="30" cy="45" rx="8" ry="12" strokeWidth="1" stroke="#2d5a3d" fill="none" />
    <ellipse cx="30" cy="45" rx="4" ry="6" fill="#1a365d" stroke="none" />
    <circle cx="30" cy="43" r="2" fill="#d4a84b" />
  </svg>
)

// Bow and Arrow (Gandiva)
export const BowAndArrow = ({ className = "", size = 100 }) => (
  <svg 
    viewBox="0 0 100 100" 
    width={size} 
    height={size} 
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    {/* Bow */}
    <path d="M25 15 Q5 50 25 85" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bowstring */}
    <path d="M25 15 L50 50 L25 85" strokeWidth="1" opacity="0.6" />
    {/* Arrow shaft */}
    <line x1="50" y1="50" x2="95" y2="50" strokeWidth="1.5" />
    {/* Arrow head */}
    <path d="M95 50 L85 45 L87 50 L85 55 Z" fill="currentColor" />
    {/* Arrow feathers */}
    <path d="M55 50 L50 45 L52 50 L50 55 Z" fill="currentColor" opacity="0.6" />
    {/* Decorative elements on bow */}
    <circle cx="25" cy="15" r="2" fill="currentColor" />
    <circle cx="25" cy="85" r="2" fill="currentColor" />
    <circle cx="15" cy="50" r="1.5" fill="currentColor" opacity="0.5" />
  </svg>
)

// Chariot Wheel (Sudarshana Chakra / Dharma Wheel)
export const ChariotWheel = ({ className = "", size = 100, spinning = false }) => (
  <svg 
    viewBox="0 0 100 100" 
    width={size} 
    height={size} 
    className={`${className} ${spinning ? 'animate-spin-slow' : ''}`}
    fill="none"
    stroke="currentColor"
  >
    {/* Outer rim */}
    <circle cx="50" cy="50" r="45" strokeWidth="3" />
    <circle cx="50" cy="50" r="42" strokeWidth="1" opacity="0.5" />
    {/* Hub */}
    <circle cx="50" cy="50" r="8" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
    {/* Spokes - 12 spokes for dharma */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180
      const x1 = 50 + 10 * Math.cos(angle)
      const y1 = 50 + 10 * Math.sin(angle)
      const x2 = 50 + 42 * Math.cos(angle)
      const y2 = 50 + 42 * Math.sin(angle)
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" />
      )
    })}
    {/* Decorative dots on rim */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 + 15) * Math.PI / 180
      const x = 50 + 45 * Math.cos(angle)
      const y = 50 + 45 * Math.sin(angle)
      return (
        <circle key={i} cx={x} cy={y} r="2" fill="currentColor" />
      )
    })}
  </svg>
)

// Flute (Bansuri)
export const Flute = ({ className = "", size = 100 }) => (
  <svg 
    viewBox="0 0 120 40" 
    width={size * 1.2} 
    height={size * 0.4} 
    className={className}
    fill="none"
    stroke="currentColor"
  >
    {/* Main body */}
    <rect x="10" y="12" width="100" height="16" rx="8" strokeWidth="2" />
    {/* Finger holes */}
    <circle cx="35" cy="20" r="3" fill="currentColor" />
    <circle cx="50" cy="20" r="3" fill="currentColor" />
    <circle cx="65" cy="20" r="3" fill="currentColor" />
    <circle cx="80" cy="20" r="3" fill="currentColor" />
    <circle cx="95" cy="20" r="3" fill="currentColor" />
    {/* Blow hole */}
    <ellipse cx="20" cy="20" rx="4" ry="3" fill="currentColor" opacity="0.5" />
    {/* Decorative bands */}
    <line x1="28" y1="12" x2="28" y2="28" strokeWidth="1.5" />
    <line x1="102" y1="12" x2="102" y2="28" strokeWidth="1.5" />
    {/* Sound waves */}
    <path d="M5 15 Q0 20 5 25" strokeWidth="1" opacity="0.4" />
    <path d="M2 12 Q-5 20 2 28" strokeWidth="1" opacity="0.3" />
  </svg>
)

// Lotus
export const Lotus = ({ className = "", size = 100 }) => (
  <svg 
    viewBox="0 0 100 80" 
    width={size} 
    height={size * 0.8} 
    className={className}
    fill="none"
    stroke="currentColor"
  >
    {/* Center petal */}
    <path d="M50 10 Q55 30 50 50 Q45 30 50 10" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Left petals */}
    <path d="M50 50 Q30 35 25 15 Q35 30 50 50" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    <path d="M50 50 Q20 45 10 30 Q25 45 50 50" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Right petals */}
    <path d="M50 50 Q70 35 75 15 Q65 30 50 50" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    <path d="M50 50 Q80 45 90 30 Q75 45 50 50" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Base petals */}
    <path d="M50 50 Q35 55 20 55 Q35 60 50 55" strokeWidth="1" opacity="0.6" />
    <path d="M50 50 Q65 55 80 55 Q65 60 50 55" strokeWidth="1" opacity="0.6" />
    {/* Stem hint */}
    <path d="M50 55 Q50 65 50 75" strokeWidth="1.5" opacity="0.5" />
    {/* Center */}
    <circle cx="50" cy="50" r="5" fill="currentColor" fillOpacity="0.3" />
  </svg>
)

// Conch Shell (Shankha)
export const Conch = ({ className = "", size = 80 }) => (
  <svg 
    viewBox="0 0 80 100" 
    width={size * 0.8} 
    height={size} 
    className={className}
    fill="none"
    stroke="currentColor"
  >
    {/* Main spiral body */}
    <path d="M40 10 Q70 20 65 50 Q60 80 40 90 Q20 80 15 50 Q10 20 40 10" strokeWidth="2" />
    {/* Inner spirals */}
    <path d="M40 20 Q55 28 52 45 Q50 62 40 70 Q30 62 28 45 Q25 28 40 20" strokeWidth="1.5" />
    <path d="M40 30 Q48 36 46 45 Q44 54 40 58 Q36 54 34 45 Q32 36 40 30" strokeWidth="1" />
    {/* Opening */}
    <ellipse cx="40" cy="85" rx="15" ry="8" strokeWidth="1.5" />
    {/* Decorative lines */}
    <path d="M25 50 Q30 55 35 50" strokeWidth="1" opacity="0.5" />
    <path d="M45 50 Q50 55 55 50" strokeWidth="1" opacity="0.5" />
  </svg>
)

// Trident (Trishul)
export const Trident = ({ className = "", size = 100 }) => (
  <svg 
    viewBox="0 0 60 100" 
    width={size * 0.6} 
    height={size} 
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    {/* Main shaft */}
    <line x1="30" y1="35" x2="30" y2="98" />
    {/* Center prong */}
    <path d="M30 5 L30 35" strokeWidth="2.5" />
    <path d="M25 10 L30 2 L35 10" strokeWidth="2" strokeLinejoin="round" />
    {/* Left prong */}
    <path d="M30 35 Q20 30 15 15" strokeWidth="2" />
    <path d="M10 18 L15 10 L18 20" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Right prong */}
    <path d="M30 35 Q40 30 45 15" strokeWidth="2" />
    <path d="M42 20 L45 10 L50 18" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Decorative binding */}
    <ellipse cx="30" cy="38" rx="8" ry="3" strokeWidth="1.5" />
  </svg>
)

// Flame (Agni)
export const Flame = ({ className = "", size = 60 }) => (
  <svg 
    viewBox="0 0 40 60" 
    width={size * 0.67} 
    height={size} 
    className={className}
    fill="currentColor"
    fillOpacity="0.8"
  >
    <path d="M20 5 Q30 20 28 35 Q35 25 32 40 Q38 35 35 50 Q30 60 20 58 Q10 60 5 50 Q2 35 8 40 Q5 25 12 35 Q10 20 20 5" />
    <path d="M20 15 Q26 25 24 38 Q28 32 26 45 Q22 55 20 52 Q18 55 14 45 Q12 32 16 38 Q14 25 20 15" fill="currentColor" fillOpacity="0.5" />
  </svg>
)

// Decorative Border Element
export const BorderOrnament = ({ className = "", width = 200 }) => (
  <svg 
    viewBox="0 0 200 20" 
    width={width} 
    height={width * 0.1} 
    className={className}
    fill="none"
    stroke="currentColor"
  >
    <line x1="0" y1="10" x2="60" y2="10" strokeWidth="1" opacity="0.3" />
    <circle cx="70" cy="10" r="3" fill="currentColor" opacity="0.5" />
    <path d="M80 10 L90 5 L100 10 L90 15 Z" fill="currentColor" opacity="0.3" />
    <circle cx="100" cy="10" r="5" strokeWidth="1" />
    <path d="M100 5 L100 15 M95 10 L105 10" strokeWidth="1" opacity="0.5" />
    <path d="M110 10 L120 5 L130 10 L120 15 Z" fill="currentColor" opacity="0.3" />
    <circle cx="130" cy="10" r="3" fill="currentColor" opacity="0.5" />
    <line x1="140" y1="10" x2="200" y2="10" strokeWidth="1" opacity="0.3" />
  </svg>
)

// Decorative Corner
export const CornerOrnament = ({ className = "", size = 60, position = "top-left" }) => {
  const transforms = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }
  
  return (
    <svg 
      viewBox="0 0 60 60" 
      width={size} 
      height={size} 
      className={className}
      fill="none"
      stroke="currentColor"
      style={{ transform: transforms[position] }}
    >
      <path d="M5 55 L5 30 Q5 5 30 5 L55 5" strokeWidth="1.5" fill="none" />
      <path d="M10 50 L10 30 Q10 10 30 10 L50 10" strokeWidth="1" opacity="0.5" />
      <circle cx="5" cy="55" r="3" fill="currentColor" />
      <circle cx="55" cy="5" r="3" fill="currentColor" />
      <path d="M20 25 Q25 20 30 25 Q25 30 20 25" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export default {
  OmSymbol,
  PeacockFeather,
  BowAndArrow,
  ChariotWheel,
  Flute,
  Lotus,
  Conch,
  Trident,
  Flame,
  BorderOrnament,
  CornerOrnament,
}
