import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages
import Home from './pages/Home'
import MahabharataLanding from './pages/MahabharataLanding'
import PoemsIndex from './pages/PoemsIndex'
import PoemReader from './pages/PoemReader'

// Components
import Navbar from './components/Navbar'
import CursorGlow from './components/CursorGlow'
import MusicPlayer from './components/MusicPlayer'
import LoadingScreen from './components/LoadingScreen'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/mahabharata" element={<MahabharataLanding />} />
        <Route path="/mahabharata/poems" element={<PoemsIndex />} />
        <Route path="/mahabharata/poem/:poemId" element={<PoemReader />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppShell() {
  const location = useLocation()
  const isPoemReader = location.pathname.startsWith('/mahabharata/poem/')

  return (
    <div className="min-h-screen bg-sanctum-black noise-overlay">
      <CursorGlow />
      {!isPoemReader && <Navbar />}
      <MusicPlayer />
      <AnimatedRoutes />
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return <LoadingScreen />
  }
  
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App