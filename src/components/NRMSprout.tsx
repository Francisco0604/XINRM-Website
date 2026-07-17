import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NRMSprout: React.FC = () => {
  const { scrollYProgress } = useScroll()
  
  // Transform scroll progress into animation states
  const sproutHeight = useTransform(scrollYProgress, [0, 0.3], [0, 40])
  const leafScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const rootOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.3])

  return (
    <div className="absolute top-0 right-4 h-full w-12 pointer-events-none opacity-40 lg:opacity-100">
      <svg viewBox="0 0 100 400" className="w-full h-full overflow-visible">
        {/* Soil Line */}
        <motion.line 
          x1="20" y1="350" x2="80" y2="350" 
          stroke="#7F5539" strokeWidth="2" strokeLinecap="round" 
        />
        
        {/* Roots */}
        <motion.path 
          d="M50 350 Q40 370 30 390 M50 350 Q60 370 70 390 M50 350 Q50 380 50 400"
          stroke="#7F5539" strokeWidth="1.5" fill="none"
          style={{ opacity: rootOpacity }}
        />

        {/* Stem */}
        <motion.path 
          d="M50 350 Q50 250 50 150"
          stroke="#52B788" strokeWidth="3" fill="none" strokeLinecap="round"
          style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
        />

        {/* Leaves */}
        {[
          { cx: 50, cy: 300, rotate: -45, delay: 0.2 },
          { cx: 50, cy: 250, rotate: 45, delay: 0.4 },
          { cx: 50, cy: 200, rotate: -45, delay: 0.6 },
          { cx: 50, cy: 150, rotate: 0, delay: 0.8, isTop: true }
        ].map((leaf, i) => (
          <motion.path
            key={i}
            d={leaf.isTop 
              ? "M50 150 Q40 130 50 110 Q60 130 50 150" 
              : "M50 " + leaf.cy + " Q" + (leaf.rotate < 0 ? "30" : "70") + " " + (leaf.cy - 20) + " " + (leaf.rotate < 0 ? "20" : "80") + " " + (leaf.cy - 10)}
            fill="#2D6A4F"
            style={{ 
              scale: useTransform(scrollYProgress, [leaf.delay, leaf.delay + 0.2], [0, 1]),
              opacity: useTransform(scrollYProgress, [leaf.delay, leaf.delay + 0.1], [0, 1])
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default NRMSprout
