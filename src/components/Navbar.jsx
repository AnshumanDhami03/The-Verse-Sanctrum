import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { OmSymbol } from './Illustrations'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])
  
  const isHome = location.pathname === '/'
  const isMahabharata = location.pathname.startsWith('/mahabharata')
  
  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-sanctum-black/90 backdrop-blur-md border-b border-sanctum-gold/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="text-sanctum-gold"
              >
                <OmSymbol size={32} />
              </motion.div>
              <span className="font-display text-xl text-sanctum-cream tracking-wider group-hover:text-sanctum-gold transition-colors">
                The Verse Sanctum
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" active={isHome}>Home</NavLink>
              {isMahabharata && (
                <>
                  <NavLink to="/mahabharata" active={location.pathname === '/mahabharata'}>
                    Mahabharata
                  </NavLink>
                  <NavLink to="/mahabharata/poems" active={location.pathname === '/mahabharata/poems'}>
                    All Poems
                  </NavLink>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <motion.span
                className="w-6 h-0.5 bg-sanctum-gold"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-sanctum-gold"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-sanctum-gold"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-sanctum-black/95 backdrop-blur-lg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              {isMahabharata && (
                <>
                  <MobileNavLink to="/mahabharata" onClick={() => setIsMobileMenuOpen(false)}>
                    Mahabharata
                  </MobileNavLink>
                  <MobileNavLink to="/mahabharata/poems" onClick={() => setIsMobileMenuOpen(false)}>
                    All Poems
                  </MobileNavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`relative font-sans text-sm tracking-wider uppercase transition-colors ${
      active ? 'text-sanctum-gold' : 'text-sanctum-cream/70 hover:text-sanctum-cream'
    }`}
  >
    {children}
    {active && (
      <motion.div
        layoutId="navbar-indicator"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sanctum-gold"
      />
    )}
  </Link>
)

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="font-display text-2xl text-sanctum-cream hover:text-sanctum-gold transition-colors"
  >
    {children}
  </Link>
)

export default Navbar
