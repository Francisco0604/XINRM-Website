import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Leaf, Map, List } from 'lucide-react'
import globalData from '../data/global.json'
import NRMSprout from './NRMSprout'
import NRMVines from './NRMVines'

interface QuickLink {
  label: string
  href: string
}

interface QuickLinksProps {
  links: QuickLink[]
  title?: string
}

const QuickLinks: React.FC<QuickLinksProps> = ({ links, title }) => {
  const { quickLinks } = globalData.components
  const displayTitle = title || quickLinks.defaultTitle
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Mobile Floating "Jump to Section" Trigger */}
      <div className="lg:hidden fixed bottom-8 right-8 z-[60]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-accent/20 backdrop-blur-xl"
        >
          {isExpanded ? <Leaf size={28} className="animate-pulse" /> : <List size={28} />}
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="lg:hidden fixed inset-0 bg-primary/40 backdrop-blur-md z-[70]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 z-[80] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-accent/10"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              <h3 className="font-bold text-primary mb-8 uppercase tracking-[0.3em] text-[10px] flex items-center">
                <span className="w-8 h-px bg-accent mr-3"></span>
                {displayTitle}
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      onClick={() => setIsExpanded(false)}
                      className="flex items-center p-5 rounded-2xl bg-gray-50 border border-gray-100 active:bg-accent/5 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent mr-4" />
                      <span className="text-gray-600 font-bold text-sm tracking-tight">{link.label}</span>
                      <ChevronRight size={18} className="ml-auto text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar (Unchanged but refined) */}
      <div className="hidden lg:block lg:sticky lg:top-32 z-20 glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] relative group border-white/40 hover:border-accent/50 transition-all duration-700 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] hover:shadow-accent/20 overflow-hidden backdrop-blur-2xl">
        <NRMVines />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
        <div className="absolute inset-0 topo-pattern opacity-[0.05] pointer-events-none rounded-[3.5rem]" />
        <NRMSprout />

        {/* Floating Leaves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                scale: [0.5, 1, 0.5],
                x: [Math.random() * 300, Math.random() * 300],
                y: [Math.random() * 600, Math.random() * 600],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              className="absolute text-accent/20"
            >
              <Leaf size={24 + Math.random() * 24} />
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10">
          <h3 className="font-bold text-primary mb-8 md:mb-12 uppercase tracking-[0.3em] text-[10px] flex items-center">
            <span className="w-8 md:w-12 h-px bg-accent mr-3 md:mr-4"></span>
            {displayTitle}
          </h3>
          
          <ul className="space-y-3 md:space-y-5">
            {links.map((link, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={link.href} 
                  className="flex items-center group/link py-4 px-6 rounded-2xl md:rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 hover:border-accent/30 transition-all duration-500"
                >
                  <div className="w-2 h-2 rounded-full bg-accent mr-4 md:mr-6 scale-0 group-hover/link:scale-100 transition-transform duration-500 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  <span className="text-gray-500 group-hover/link:text-primary group-hover/link:font-black text-xs md:text-sm tracking-tight transition-all duration-500">
                    {link.label}
                  </span>
                  <div className="ml-auto opacity-0 group-hover/link:opacity-100 -translate-x-4 group-hover/link:translate-x-0 transition-all duration-500">
                    <ChevronRight size={18} className="text-accent" />
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-12 pt-10 border-t border-primary/5 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black">
                {quickLinks.footerNote}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      </div>
    </>
  )
}

export default QuickLinks
