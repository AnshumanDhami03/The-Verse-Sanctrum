import React from 'react'
import { motion } from 'framer-motion'
import { ChariotWheel } from './Illustrations'

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-sanctum-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-sanctum-gold"
      >
        <ChariotWheel size={80} spinning={true} />
      </motion.div>
      
      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="font-display text-2xl text-sanctum-gold tracking-widest">
          The Verse Sanctum
        </h2>
        <p className="mt-2 text-sanctum-cream/50 text-sm tracking-wider">
          Loading...
        </p>
      </motion.div>
      
      {/* Animated dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-sanctum-gold"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default LoadingScreen
