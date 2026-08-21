import React, { useState } from 'react'
import { Rocket, Network, Share2, MapPin, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import QuickLinks from '../components/QuickLinks'
import { motion, AnimatePresence } from 'framer-motion'
import impactData from '../data/impact.json'
import mpsmData from '../data/mpsm.json'
import FieldMap from '../components/FieldMap'

const Impact: React.FC = () => {
  const { hero, sidebar, research, field_visits, projects, network } = impactData
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex < 0) return
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev === 0 ? mpsmData.gallery.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev === mpsmData.gallery.length - 1 ? 0 : prev + 1))
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(-1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  const mpsmMapData = {
    coordinates: mpsmData.location.coordinates as [number, number],
    name: mpsmData.location.name,
    details: mpsmData.summary,
    stats: mpsmData.stats
  }

  return (
    <div className="relative">
      {/* Floating Decorative NRM Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         <motion.div 
           animate={{ 
             y: [0, -20, 0],
             rotate: [0, 5, 0]
           }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-[20%] -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
         />
         <motion.div 
           animate={{ 
             y: [0, 30, 0],
             rotate: [0, -5, 0]
           }}
           transition={{ duration: 7, repeat: Infinity }}
           className="absolute top-[60%] -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
         />
      </div>

      {/* Lightbox for Gallery */}
      <AnimatePresence>
        {selectedImageIndex >= 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            onClick={() => setSelectedImageIndex(-1)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(-1); }}
            >
              <X size={40} />
            </button>

            {/* Left Arrow */}
            <button 
              className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev === 0 ? mpsmData.gallery.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft size={36} />
            </button>

            <motion.div 
              layoutId={`gallery-${mpsmData.gallery[selectedImageIndex].url}`}
              className="max-w-5xl w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={mpsmData.gallery[selectedImageIndex].url} 
                alt={mpsmData.gallery[selectedImageIndex].caption} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                 <p className="text-white text-lg md:text-2xl font-bold italic tracking-wide">{mpsmData.gallery[selectedImageIndex].caption}</p>
                 <p className="text-gray-400 text-xs md:text-sm mt-1">{selectedImageIndex + 1} of {mpsmData.gallery.length}</p>
              </div>
            </motion.div>

            {/* Right Arrow */}
            <button 
              className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev === mpsmData.gallery.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-primary pt-32 pb-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
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
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:w-1/4 w-full relative">
              <div className="sticky top-32">
                <QuickLinks links={sidebar} />
              </div>
            </aside>

            {/* Content Panel */}
            <div className="lg:w-3/4 w-full space-y-20 md:space-y-32">
              <div className="lg:hidden">
                <QuickLinks links={sidebar} />
              </div>
              <div id="action-research" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Rocket className="text-accent" size={28} />
                  </div>
                  <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{research.title}</h2>
                </div>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 italic font-light border-l-4 border-accent pl-6 py-2"
                >
                  {research.quote}
                </motion.p>
                <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg font-light">
                  {research.description}
                </p>
              </div>

              <div id="field-visits" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <MapPin className="text-accent" size={28} />
                  </div>
                  <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{mpsmData.title}</h2>
                </div>
                
                {/* Map Section */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 md:gap-12 mb-16 md:mb-24">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="xl:col-span-7 h-[300px] sm:h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden"
                  >
                    <FieldMap data={mpsmMapData} />
                  </motion.div>
                  
                  <div className="xl:col-span-5 flex flex-col justify-center">
                    <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{field_visits.badge}</span>
                    <h3 className="font-bold text-primary mb-6 md:mb-8 leading-tight text-2xl md:text-4xl">{mpsmData.location.name}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed mb-8 md:mb-10 font-light italic">
                      "{mpsmData.summary}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mpsmData.stats.map((stat, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -5 }}
                          className="bg-gray-50 p-6 rounded-2xl md:rounded-3xl border border-gray-100"
                        >
                          <span className="block text-accent font-black text-2xl mb-1">{stat.value}</span>
                          <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative Phases */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
                  {mpsmData.phases.map((phase, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="card-padding rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-sm md:text-base shrink-0">
                          {phase.day}
                        </div>
                        <h4 className="font-bold text-lg md:text-xl text-primary leading-tight">{phase.title}</h4>
                      </div>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light">{phase.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Authentic Gallery */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                  {mpsmData.gallery.slice(0, 5).map((img, i) => {
                    const isLast = i === 4;
                    const remainingCount = mpsmData.gallery.length - 5;
                    return (
                      <motion.div 
                        layoutId={`gallery-${img.url}`}
                        key={i}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedImageIndex(i)}
                        className="aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-md relative group cursor-pointer"
                      >
                        <img 
                          src={img.url} 
                          alt={img.caption} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        {isLast && remainingCount > 0 ? (
                          <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center transition-all group-hover:bg-primary/95">
                            <span className="text-white text-3xl md:text-4xl font-black">+{remainingCount}</span>
                            <span className="text-accent text-[10px] md:text-xs font-bold mt-2 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              View More Images
                            </span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn className="text-white" size={32} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div id="projects" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Share2 className="text-accent" size={28} />
                  </div>
                  <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{projects.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {projects.items.map((project, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="h-56 sm:h-72 overflow-hidden relative">
                         <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />
                         <h4 className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white text-xl md:text-2xl font-bold">{project.title}</h4>
                      </div>
                      <div className="card-padding !pt-6">
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light">{project.desc}</p>
                        <button className="mt-6 text-accent font-bold flex items-center gap-2 group/btn cursor-pointer">
                          {projects.cta} <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div id="network" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Network className="text-accent" size={28} />
                  </div>
                  <h2 className="font-bold text-primary leading-tight text-3xl md:text-5xl">{network.title}</h2>
                </div>
                <div className="glass-card card-padding rounded-[2rem] md:rounded-[3rem] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                   <p className="text-gray-600 text-lg md:text-xl mb-10 md:mb-16 leading-relaxed text-center max-w-2xl mx-auto font-light">
                     {network.description}
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
                      {network.items.map((text, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/50 p-6 rounded-2xl shadow-sm text-center border border-white/50 hover:shadow-xl transition-all"
                        >
                           <div className="text-accent font-bold text-2xl md:text-3xl mb-3 font-serif italic">0{i+1}</div>
                           <p className="text-gray-700 font-bold text-sm md:text-base leading-snug">{text}</p>
                        </motion.div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Impact

