import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NRMVines: React.FC = () => {
  const { scrollYProgress } = useScroll()

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Background organic noise/texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Left Vine - More complex and wrapping */}
      <svg className="absolute -left-8 top-0 h-[120%] w-24 overflow-visible opacity-40 group-hover:opacity-80 transition-opacity duration-1000" viewBox="0 0 100 800" preserveAspectRatio="none">
        <motion.path
          d="M50 0 C70 100 20 200 50 300 C80 400 30 500 50 600 C70 700 20 800 50 900"
          stroke="#1B4332"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: useTransform(scrollYProgress, [0, 0.6], [0, 1]) }}
        />
        <motion.path
          d="M50 0 C70 100 20 200 50 300 C80 400 30 500 50 600 C70 700 20 800 50 900"
          stroke="#52B788"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="opacity-50"
          style={{ pathLength: useTransform(scrollYProgress, [0.1, 0.7], [0, 1]) }}
        />
        
        {/* Dynamic Leaves on Left Vine */}
        {[100, 250, 400, 550, 700].map((y, i) => (
          <motion.path
            key={`leaf-l-${i}`}
            d={`M50 ${y} Q${i % 2 === 0 ? '10' : '90'} ${y - 20} ${i % 2 === 0 ? '0' : '100'} ${y - 40}`}
            fill={i % 2 === 0 ? "#40916C" : "#2D6A4F"}
            style={{ 
              scale: useTransform(scrollYProgress, [0.1 + i * 0.1, 0.2 + i * 0.1], [0, 1]),
              opacity: useTransform(scrollYProgress, [0.1 + i * 0.1, 0.15 + i * 0.1], [0, 1]),
              rotate: useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? -10 : 10])
            }}
          />
        ))}
      </svg>

      {/* Right Vine - Thinner and more "tendril" like */}
      <svg className="absolute -right-8 top-0 h-[120%] w-24 overflow-visible opacity-30 group-hover:opacity-60 transition-opacity duration-1000" viewBox="0 0 100 800" preserveAspectRatio="none">
        <motion.path
          d="M50 0 C30 150 70 300 50 450 C30 600 70 750 50 900"
          stroke="#2D6A4F"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]) }}
        />
        
        {/* Dynamic Tendrils */}
        {[150, 350, 550, 750].map((y, i) => (
          <motion.path
            key={`tendril-r-${i}`}
            d={`M50 ${y} C${i % 2 !== 0 ? '20' : '80'} ${y + 30} ${i % 2 !== 0 ? '0' : '100'} ${y + 60} ${i % 2 !== 0 ? '-20' : '120'} ${y + 40}`}
            stroke="#74C69D"
            strokeWidth="1"
            fill="none"
            style={{ 
              pathLength: useTransform(scrollYProgress, [0.3 + i * 0.1, 0.4 + i * 0.1], [0, 1]),
              opacity: useTransform(scrollYProgress, [0.3 + i * 0.1, 0.35 + i * 0.1], [0, 1])
            }}
          />
        ))}
      </svg>

      {/* Innovative: Blooming Spores */}
      {[...Array(6)].map((_, i) => (
        <motion.div 
          key={`spore-${i}`}
          style={{ 
            left: `${15 + Math.random() * 70}%`,
            top: useTransform(scrollYProgress, [0, 1], [`${10 + i * 15}%`, `${20 + i * 15}%`]),
            opacity: useTransform(scrollYProgress, [0.1 + i * 0.1, 0.2 + i * 0.1, 0.8, 0.9], [0, 1, 1, 0]),
            scale: useTransform(scrollYProgress, [0.1 + i * 0.1, 0.2 + i * 0.1], [0.5, 1])
          }}
          className="absolute w-1.5 h-1.5 bg-accent/40 rounded-full blur-[1px] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
        />
      ))}

      {/* Glowing "Energy" Pulse that moves down the vine on scroll */}
      <motion.div 
        style={{ 
          top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
        }}
        className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"
      />
    </div>
  )
}

export default NRMVines
