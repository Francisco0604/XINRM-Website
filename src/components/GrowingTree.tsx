import React from 'react'
import { motion } from 'framer-motion'

const GrowingTree: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Trunk */}
        <motion.path
          d="M100 180 L100 140"
          stroke="#7F5539"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        
        {/* Branches */}
        <motion.path
          d="M100 140 L70 110"
          stroke="#7F5539"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M100 140 L130 110"
          stroke="#7F5539"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        
        {/* Leaves */}
        <motion.circle
          cx="70" cy="110" r="25"
          fill="#2D6A4F"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 1.5, type: "spring" }}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="130" cy="110" r="25"
          fill="#2D6A4F"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 1.8, type: "spring" }}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="100" cy="90" r="30"
          fill="#1B4332"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 1.5, delay: 2.1, type: "spring" }}
          viewport={{ once: true }}
        />

        {/* Decorative small leaves */}
        {[
          { cx: 85, cy: 75, r: 8 },
          { cx: 115, cy: 75, r: 8 },
          { cx: 100, cy: 60, r: 10 }
        ].map((leaf, i) => (
          <motion.circle
            key={i}
            cx={leaf.cx}
            cy={leaf.cy}
            r={leaf.r}
            fill="#52B788"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 + (i * 0.2) }}
            viewport={{ once: true }}
          />
        ))}
      </svg>
    </div>
  )
}

export default GrowingTree
