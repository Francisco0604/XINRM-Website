import React from 'react'
import { motion } from 'framer-motion'

const horizons = [
  { 
    id: 'O', 
    name: 'Organic Layer', 
    desc: 'Leaf litter and decomposed organic matter.', 
    color: 'bg-[#3E2723]', 
    textColor: 'text-amber-200',
    height: 'h-16'
  },
  { 
    id: 'A', 
    name: 'Topsoil', 
    desc: 'Mineral matter mixed with humus. Fertile ground.', 
    color: 'bg-[#5D4037]', 
    textColor: 'text-amber-100',
    height: 'h-24'
  },
  { 
    id: 'B', 
    name: 'Subsoil', 
    desc: 'Accumulated minerals like iron and aluminum.', 
    color: 'bg-[#8D6E63]', 
    textColor: 'text-orange-100',
    height: 'h-32'
  },
  { 
    id: 'C', 
    name: 'Parent Material', 
    desc: 'Partially weathered rock and mineral deposits.', 
    color: 'bg-[#BCAAA4]', 
    textColor: 'text-stone-800',
    height: 'h-40'
  },
  { 
    id: 'R', 
    name: 'Bedrock', 
    desc: 'Solid rock layer underlying all other horizons.', 
    color: 'bg-[#A1887F]', 
    textColor: 'text-stone-900',
    height: 'h-20'
  }
]

const SoilProfile: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-full max-w-md mx-auto py-12">
      {horizons.map((h, i) => (
        <motion.div
          key={h.id}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`${h.color} ${h.height} rounded-lg p-6 flex flex-col justify-center relative group overflow-hidden border border-white/10`}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h4 className={`font-bold text-lg ${h.textColor} flex items-center gap-2`}>
                <span className="opacity-50 font-serif italic">{h.id} Horizon:</span> {h.name}
              </h4>
              <p className={`text-sm ${h.textColor} opacity-80 mt-1 max-w-[80%]`}>{h.desc}</p>
            </div>
            <motion.div 
              whileHover={{ rotate: 90 }}
              className={`w-8 h-8 rounded-full border border-current flex items-center justify-center ${h.textColor} opacity-30`}
            >
              <span className="text-xs font-bold">{h.id}</span>
            </motion.div>
          </div>
          
          {/* Animated root/vein decorative elements */}
          {i < 3 && (
            <svg className="absolute right-0 bottom-0 w-24 h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
              <motion.path 
                d="M50 0 Q60 50 40 100" 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              <motion.path 
                d="M45 30 Q30 50 45 70" 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default SoilProfile
