import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Scroll progress bar
window.addEventListener('scroll', () => {
  const bar = document.querySelector('.scroll-progress .bar')
  if (!bar) return
  const h = document.documentElement
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
  bar.style.width = (pct * 100) + '%'
}, { passive: true })

// Drift animation keyframe for particles
const style = document.createElement('style')
style.textContent = `
@keyframes drift {
  0%   { transform: translate(0,0) scale(.6); opacity: 0 }
  15%  { opacity: .9 }
  85%  { opacity: .7 }
  100% { transform: translate(var(--dx,40px),var(--dy,-220px)) scale(1.1); opacity: 0 }
}
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
