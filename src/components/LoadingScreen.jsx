import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8 }}
      style={{ position:'fixed', inset:0, background:'var(--ink)', display:'grid', placeItems:'center', zIndex:100 }}>
      <div style={{ textAlign:'center' }}>
        <motion.div initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:1 }}
          style={{ fontFamily:'Cinzel', fontSize:72, color:'var(--gold)', lineHeight:1, marginBottom:24 }}>ॐ</motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.5 }}
          style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.4em', textTransform:'uppercase', color:'var(--vellum-mute)' }}>
          The Verse Sanctum
        </motion.div>
      </div>
    </motion.div>
  )
}
