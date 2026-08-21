import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { History, Award, Shield, Users, ChevronDown } from 'lucide-react'
import QuickLinks from '../components/QuickLinks'
import aboutData from '../data/about.json'

interface LeadershipMember {
  name: string
  role: string
  image: string
}

const About: React.FC = () => {
  const { hero, sidebar, background, leadership, milestones, legal } = aboutData as {
    hero: any
    sidebar: any
    background: any
    leadership: {
      title: string
      members: LeadershipMember[]
    }
    milestones: {
      title: string
      items: { year: string; title: string; text: string }[]
    }
    legal: any
  }

  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({})
  const [allExpanded, setAllExpanded] = useState<boolean>(false)

  const toggleMilestone = (index: number) => {
    setExpandedIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedIndices({})
      setAllExpanded(false)
    } else {
      const expanded: Record<number, boolean> = {}
      milestones.items.forEach((_, idx) => {
        expanded[idx] = true
      })
      setExpandedIndices(expanded)
      setAllExpanded(true)
    }
  }

  return (
    <div className="relative">
      {/* Floating Decorative NRM Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         <motion.div 
           animate={{ 
             y: [0, 40, 0],
             rotate: [0, -10, 0]
           }}
           transition={{ duration: 8, repeat: Infinity }}
           className="absolute top-[30%] -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
         />
         <motion.div 
           animate={{ 
             y: [0, -30, 0],
             rotate: [0, 10, 0]
           }}
           transition={{ duration: 6, repeat: Infinity }}
           className="absolute top-[70%] -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
         />
      </div>

      {/* Inner Hero */}
      <section className="bg-primary pt-32 pb-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif italic mb-6 text-white text-4xl md:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto px-4"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 relative">
              <div className="sticky top-32">
                <QuickLinks links={sidebar} />
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-20 md:space-y-32">
              {/* Mobile QuickLinks Trigger - rendered outside the grid flow */}
              <div className="lg:hidden">
                <QuickLinks links={sidebar} />
              </div>
              <div id="background" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <History className="text-accent" size={28} />
                  </div>
                  <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{background.title}</h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 md:mb-12 italic font-light border-l-4 border-accent pl-6 py-2">
                  {background.quote}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                   <div className="order-2 md:order-1 space-y-6">
                      <h4 className="font-bold text-xl md:text-2xl text-primary">{background.vision_fr_bacher.title}</h4>
                      {background.vision_fr_bacher.text.map((p: string, i: number) => (
                        <p key={i} className="text-gray-500 text-base md:text-lg leading-relaxed font-light">{p}</p>
                      ))}
                      <div className="pt-4">
                        <span className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-sm border-l-4 border-accent pl-4">{background.vision_fr_bacher.overlay}</span>
                      </div>
                   </div>
                   <div className="order-1 md:order-2 glass-card aspect-square rounded-[2rem] md:rounded-[3rem] p-3">
                      <div className="w-full h-full bg-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                         <img 
                           src={background.vision_fr_bacher.image} 
                           alt={background.vision_fr_bacher.overlay} 
                           className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                         />
                      </div>
                   </div>
                </div>

                <div className="mt-16 md:mt-24 glass-card card-padding rounded-[2rem] bg-primary/5">
                  <h4 className="font-bold text-xl md:text-2xl mb-6 text-primary">{background.mission.title}</h4>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
                    {background.mission.text}
                  </p>
                </div>
              </div>

              <div id="leadership" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12 md:mb-16">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{leadership.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                  {leadership.members.map((p, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      className="text-center group"
                    >
                      <div className="w-32 h-32 md:w-48 md:h-48 bg-white p-2 rounded-full mx-auto mb-6 md:mb-8 shadow-lg md:shadow-xl transition-all border border-gray-100 overflow-hidden relative">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full rounded-full object-cover transition-all duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <h4 className="font-bold text-lg md:text-xl mb-1 md:mb-2 text-primary">{p.name}</h4>
                      <p className="text-accent text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">{p.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div id="milestones" className="scroll-mt-32">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 md:mb-12">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                      <Award className="text-accent" size={28} />
                    </div>
                    <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{milestones.title}</h2>
                  </div>
                  <button 
                    onClick={toggleExpandAll}
                    className="px-6 py-2.5 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer w-fit shrink-0"
                  >
                    {allExpanded ? 'Collapse All' : 'Expand All'}
                  </button>
                </div>
                
                <div className="relative border-l-2 border-accent/20 ml-4 pl-8 md:pl-12 space-y-6">
                  {milestones.items.map((m: any, i: number) => (
                    <div 
                      key={i} 
                      className="relative group cursor-pointer select-none"
                      onClick={() => toggleMilestone(i)}
                    >
                      {/* Timeline dot */}
                      <div className={`absolute -left-[41px] md:-left-[49px] top-4 w-5 h-5 rounded-full border-4 border-white shadow-xl transition-all duration-300 ${
                        expandedIndices[i] 
                          ? 'bg-accent scale-110 shadow-accent/40' 
                          : 'bg-gray-300 group-hover:bg-accent/70'
                      }`}></div>

                      <div className={`glass-card p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                        expandedIndices[i]
                          ? 'border-accent/40 bg-accent/5 shadow-md shadow-accent/5'
                          : 'border-gray-100 hover:border-accent/30 hover:shadow-md'
                      }`}>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <span className="text-accent text-lg md:text-xl font-black mb-1 block font-serif italic">{m.year}</span>
                            <h4 className="text-base md:text-lg font-bold text-primary leading-tight">{m.title}</h4>
                          </div>
                          <motion.div 
                            animate={{ rotate: expandedIndices[i] ? 180 : 0 }}
                            className="text-gray-400 group-hover:text-primary transition-colors shrink-0"
                          >
                            <ChevronDown size={20} />
                          </motion.div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ 
                            height: expandedIndices[i] ? 'auto' : 0, 
                            opacity: expandedIndices[i] ? 1 : 0 
                          }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light mt-4 pt-4 border-t border-gray-100">
                            {m.text}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="legal" className="scroll-mt-32">
                <div className="glass-dark card-padding rounded-[2rem] md:rounded-[3rem] text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                   <div className="flex items-center gap-4 mb-8 md:mb-10">
                    <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                      <Shield className="text-accent" size={32} />
                    </div>
                    <h2 className="font-bold text-white leading-tight text-2xl md:text-5xl">{legal.title}</h2>
                  </div>
                  <p className="text-white/90 leading-relaxed text-base md:text-xl font-light">
                    {legal.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
