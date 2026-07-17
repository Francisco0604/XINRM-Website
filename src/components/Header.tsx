import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

import navData from '../data/navigation.json'
import globalData from '../data/global.json'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = navData.navigation
  const { header } = globalData

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'py-8 bg-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />
      
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <img 
                src="/assets/logo/xinrm-logo.png" 
                alt="XINRM Logo" 
                className={`h-10 md:h-12 w-auto transition-all duration-500 ${scrolled ? 'brightness-100' : 'brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'}`}
              />
              <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white drop-shadow-sm'}`}>
                XINRM<span className="text-accent">.</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative group py-2">
                {item.submenu ? (
                  <>
                    <button className={`flex items-center font-bold text-sm uppercase tracking-widest transition-colors duration-500 ${
                      scrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-200 hover:text-white'
                    }`}>
                      {item.name} <ChevronDown size={14} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                    {/* Invisible bridge to prevent dropdown from closing when moving mouse */}
                    <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
                    <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-64 bg-white shadow-2xl rounded-2xl overflow-hidden hidden group-hover:block border border-gray-100 p-2 animate-in fade-in slide-in-from-top-4 duration-300">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-6 py-4 text-sm font-semibold text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-bold text-sm uppercase tracking-widest transition-colors duration-500 ${
                      scrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-200 hover:text-white'
                    } ${location.pathname === item.path ? (scrolled ? 'text-primary' : 'text-accent') : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              to="/admission" 
              className={`btn px-8 py-3 text-sm transition-all duration-500 ${
                scrolled 
                  ? 'bg-primary text-white hover:bg-primary-hover shadow-primary/20 shadow-xl' 
                  : 'bg-white text-primary hover:bg-accent hover:text-white shadow-2xl'
              }`}
            >
              {header.cta}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl transition-all duration-500 ${
                scrolled 
                  ? 'text-primary hover:bg-primary/5' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 w-full h-[100dvh] z-[100] bg-white md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-50">
               <span className="text-2xl font-black tracking-tighter text-primary">XINRM<span className="text-accent">.</span></span>
               <button 
                onClick={() => setIsOpen(false)} 
                className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-primary hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Close menu"
               >
                  <X size={28} />
               </button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-6 py-10 space-y-8">
              {navItems.map((item, i) => (
                <motion.div 
                  key={item.name} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-4"
                >
                  <Link
                    to={item.path}
                    className="block text-3xl font-black text-primary tracking-tight hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-5 space-y-4 border-l-2 border-accent/30 ml-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block text-lg font-bold text-gray-400 hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-50 bg-gray-50/50">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Link
                  to="/admission"
                  className="btn btn-primary w-full py-5 text-lg shadow-xl shadow-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  {header.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
