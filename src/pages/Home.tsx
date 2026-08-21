import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Droplets, Leaf, Users, ArrowRight, CheckCircle, GraduationCap, Play, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import GrowingTree from '../components/GrowingTree'
import FallingLeaves from '../components/FallingLeaves'
import homeData from '../data/home.json'

const iconMap: Record<string, any> = { Globe, Droplets, Leaf, Users }

const Home: React.FC = () => {
  const { hero, marquee, stats, sdgs, academic, impact } = homeData
  const [showVideo, setShowVideo] = useState<boolean>(false)

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center bg-primary overflow-hidden py-20">
        <FallingLeaves />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/40 to-primary/95 z-10" />
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" 
            alt="Sustainability" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 text-center text-white px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-2 rounded-full border border-white/30 backdrop-blur-md text-[10px] font-bold tracking-[0.3em] uppercase mb-6 animate-pulse text-accent">
              {hero.badge}
            </span>
            <h1 className="font-bold mb-6 leading-[1.05] tracking-tighter text-white">
              {hero.title.split(' ').slice(0, -1).join(' ')} <br/>
              <span className="text-accent italic font-serif">{hero.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-base md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto text-gray-200 font-light leading-relaxed px-2">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 max-w-md mx-auto sm:max-w-none">
              <Link to="/about" className="btn btn-accent px-8 py-4 md:py-5 text-sm md:text-lg group">
                {hero.cta_primary} <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/study" className="btn btn-outline-white px-8 py-4 md:py-5 text-sm md:text-lg">
                {hero.cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating scroll indicator - Hidden on very small screens */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Ticker Ribbon */}
      <Link to="/admission" className="block bg-accent py-4 md:py-6 overflow-hidden whitespace-nowrap border-y border-accent/20 relative z-30 shadow-2xl hover:bg-accent/90 transition-colors group/marquee">
        <div className="flex animate-marquee">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              {marquee.map((text, idx) => (
                <span key={idx} className="text-primary font-black text-[10px] md:text-sm mx-8 md:mx-12 uppercase tracking-[0.2em] flex items-center group-hover/marquee:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 md:mr-3 group-hover/marquee:bg-white transition-colors" />
                  {text}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Link>

      {/* SDGs Section */}
      <section className="section-padding bg-white relative overflow-hidden topo-pattern text-primary/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 translate-x-1/2" />
        
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">{sdgs.badge}</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">{sdgs.title}</h2>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed font-light">
                {sdgs.description}
              </p>
              <GrowingTree className="w-32 h-32 hidden lg:block text-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sdgs.items.map((item, index) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="bg-white card-padding rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className={`${item.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 group-hover:rotate-6 transition-transform duration-500`}>
                    {Icon && <Icon size={32} className="md:w-10 md:h-10" />}
                  </div>
                  <h4 className="font-bold text-xl md:text-2xl mb-4 md:mb-6 text-primary">{item.label}</h4>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Split Feature Section */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        <div className="absolute inset-0 topo-pattern text-white/5" />
        
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="w-full lg:w-1/2">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">{academic.badge}</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-10 leading-tight text-white">{academic.title}</h2>
              <p className="text-gray-300 text-xl md:text-2xl mb-10 md:mb-12 leading-relaxed font-light italic border-l-2 border-accent/30 pl-6">
                "{academic.quote}"
              </p>
              <ul className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                {academic.features.map((text, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent/20 flex items-center justify-center mr-4 md:mr-6 shrink-0">
                      <CheckCircle className="text-accent" size={16} />
                    </div>
                    <span className="text-gray-200 font-medium text-lg md:text-xl">{text}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/study" className="btn btn-accent px-8 md:px-10 py-4 md:py-5 group w-full sm:w-auto">
                {academic.cta} <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            
            <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="aspect-[4/5] bg-white/5 p-3 md:p-4 rounded-[2rem] md:rounded-[3rem] backdrop-blur-sm border border-white/10 shadow-2xl relative"
              >
                <div 
                  onClick={() => setShowVideo(true)}
                  className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative group cursor-pointer"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" 
                    alt="Students in Field" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center mb-6 md:mb-8 shadow-2xl"
                      >
                        <Play size={32} className="text-primary fill-primary ml-1" />
                      </motion.div>
                      <p className="text-2xl md:text-3xl font-serif italic text-white drop-shadow-lg">{academic.video_label}</p>
                  </div>
                </div>
              </motion.div>

              {/* Video Modal Lightbox */}
              <AnimatePresence>
                {showVideo && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-6"
                    onClick={() => setShowVideo(false)}
                  >
                    <button 
                      className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50 animate-bounce"
                      onClick={() => setShowVideo(false)}
                    >
                      <X size={40} />
                    </button>
                    <motion.div 
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 20 }}
                      className="max-w-5xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative bg-black border border-white/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <video 
                        src="/assets/videos/Watch_our_students_in_action.mp4" 
                        controls 
                        autoPlay 
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Floating Stat Card - Repositioned for mobile */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-4 sm:-bottom-12 sm:-left-12 glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-white/20 bg-white/10 backdrop-blur-xl"
              >
                <div className="text-accent text-4xl md:text-6xl font-bold mb-1 md:mb-2 font-serif italic drop-shadow-md">300+</div>
                <div className="text-white font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em]">Villages Impacted</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Section */}
      <section className="section-padding bg-white text-primary relative overflow-hidden topo-pattern text-primary/5">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-black uppercase text-[10px] tracking-widest mb-6">
                {impact.badge}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-10 leading-tight">{impact.title}</h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 md:mb-12 font-light">
                {impact.description}
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <Link to="/impact" className="btn btn-primary px-8 md:px-10 py-4 text-sm w-full sm:w-auto">
                  {impact.cta}
                </Link>
                <div className="flex items-center gap-3 text-emerald-600 font-bold">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  {impact.status}
                </div>
                <GrowingTree className="w-16 h-16 md:w-20 md:h-20 text-primary hidden sm:block" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, backgroundColor: '#ffffff' }}
                  className="p-4 md:p-10 rounded-[1.5rem] md:rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col justify-center text-center shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-accent text-3xl md:text-6xl font-serif italic mb-2 md:mb-4"
                  >
                    {stat.num}<span className="text-lg md:text-2xl not-italic font-sans text-primary/30 ml-1">{stat.suffix}</span>
                  </motion.div>
                  <div className="text-gray-400 uppercase tracking-[0.2em] font-black text-[8px] md:text-[10px]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
