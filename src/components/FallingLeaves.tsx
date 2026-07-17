import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const FallingLeaves: React.FC = () => {
  const leaves = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
      size: 10 + Math.random() * 20,
      rotation: Math.random() * 360,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          viewBox="0 0 24 24"
          className="absolute text-emerald-900/10 fill-current"
          style={{
            width: leaf.size,
            height: leaf.size,
            left: `${leaf.x}%`,
            top: -50,
          }}
          initial={{ y: -50, x: `${leaf.x}%`, rotate: leaf.rotation }}
          animate={{
            y: ['0vh', '110vh'],
            x: [`${leaf.x}%`, `${leaf.x + (Math.random() * 10 - 5)}%`],
            rotate: leaf.rotation + 360,
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path d="M17,8C17,11 15.19,13.67 12.83,14.63C11.83,15.03 10.5,15.15 9.17,14.85C6.17,14.17 4.14,10.74 5.37,7.85C6.17,6 8.5,5.15 10.17,5.15C12.17,5.15 14.17,6 16.17,7.15C16.67,7.4 17,7.65 17,8M12.83,14.63C13.83,16.63 13.5,19 12,21M12.83,14.63C15.19,13.67 17,11 17,8" />
        </motion.svg>
      ))}
    </div>
  )
}

export default FallingLeaves
