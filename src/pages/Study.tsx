import React, { useState } from 'react'
import { BookOpen, Map, Microscope, GraduationCap, CheckCircle, Play, Users, Camera, Download, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuickLinks from '../components/QuickLinks'
import { motion, AnimatePresence } from 'framer-motion'
import SoilProfile from '../components/SoilProfile'
import studyData from '../data/study.json'

const Study: React.FC = () => {
  const { hero, sidebar, programme, curriculum, soil_science, facilities, support, scholarship, activities } = studyData
  const [activeTab, setActiveTab] = useState<string>('farewell-2026')
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(-1)

  const currentCategory = activities?.categories?.find((cat: any) => cat.id === activeTab)
  const currentImages = currentCategory?.images || []

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIndex < 0) return
      if (e.key === 'ArrowLeft') {
        setSelectedImgIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setSelectedImgIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
      } else if (e.key === 'Escape') {
        setSelectedImgIndex(-1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImgIndex, currentImages])

  return (
    <div>
      <section className="bg-primary pt-32 pb-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container relative z-10 px-5">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif italic mb-6 text-white"
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
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
              <div id="ma-programme" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <BookOpen className="text-accent" size={28} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">{programme.title}</h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 md:mb-12 font-light">
                  {programme.description}
                </p>

                <div className="glass-card card-padding rounded-[2rem] bg-primary/5">
                  <h4 className="font-bold text-xl md:text-2xl mb-6 text-primary">{programme.highlights.title}</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {programme.highlights.items.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="text-accent" size={16} />
                        <span className="text-gray-600 font-medium text-sm md:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="curriculum" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Map className="text-accent" size={28} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary">{curriculum.title}</h2>
                </div>
                
                <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-sm">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead>
                      <tr className="bg-primary/5 text-primary border-b border-gray-100">
                        {curriculum.headers.map((h: string, i: number) => (
                          <th key={i} className="px-6 md:px-8 py-4 md:py-6 text-xs md:text-sm font-black uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {curriculum.table.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 md:px-8 py-4 md:py-6 font-bold text-sm md:text-base text-primary">{row.component}</td>
                          <td className="px-6 md:px-8 py-4 md:py-6 text-gray-500 text-sm md:text-base font-light">{row.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Semester-wise Syllabus */}
                <div className="mt-12 md:mt-16 space-y-6 md:space-y-8">
                  <h3 className="text-xl md:text-2xl font-bold text-primary">Semester-wise Course Syllabus</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {curriculum.semesters?.map((sem: any, i: number) => (
                      <div 
                        key={i}
                        className="glass-card card-padding rounded-3xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
                            <span className="text-accent text-sm font-bold uppercase tracking-widest">{sem.name}</span>
                            <span className="text-[10px] bg-primary/5 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">{sem.courses.length} Courses</span>
                          </div>
                          <ul className="space-y-3">
                            {sem.courses.map((course: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
                                <span className="text-gray-600 text-sm md:text-base leading-snug font-light">{course}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 card-padding rounded-[2rem] md:rounded-[3.5rem] border border-primary/5">
                <div className="flex flex-col lg:flex-row gap-10 md:gap-12 items-center">
                  <div className="lg:w-1/2">
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">{soil_science.title}</h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 font-light">
                      {soil_science.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {soil_science.tags.map((tag: string, i: number) => (
                        <div key={i} className="px-4 py-2 bg-white rounded-full border border-gray-100 text-[10px] font-bold text-primary shadow-sm uppercase tracking-widest">{tag}</div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <SoilProfile />
                  </div>
                </div>
              </div>

              <div id="facilities" className="scroll-mt-32">
                 <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Microscope className="text-accent" size={28} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary">{facilities.title}</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                   {facilities.items.map((item, i) => {
                     const Icon = i === 0 ? Map : Microscope
                     return (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="bg-white card-padding rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                      >
                          <Icon size={40} className="text-accent mb-6 md:mb-8 md:w-12 md:h-12 group-hover:rotate-12 transition-transform" />
                          <h4 className="font-bold text-xl md:text-2xl mb-4 text-primary">{item.title}</h4>
                          <p className="text-gray-500 text-sm md:text-lg leading-relaxed font-light mb-8">{item.description}</p>
                          <img src={`https://images.unsplash.com/photo-${i === 0 ? '1526772662000-3f88f10405ff' : '1579152276502-542301b759ed'}?auto=format&fit=crop&q=80`} alt={item.title} className="w-full h-40 md:h-48 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </motion.div>
                     )
                   })}
                </div>

                <div className="relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" alt="Campus Tour" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 md:p-12">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center mb-4 md:mb-6 shadow-2xl cursor-pointer"
                    >
                      <Play size={28} className="text-primary fill-primary ml-1" />
                    </motion.div>
                    <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">{facilities.tour.title}</h3>
                    <p className="text-gray-200 text-sm md:text-xl font-light">{facilities.tour.description}</p>
                  </div>
                </div>
              </div>

              <div id="support" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary">{support.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                   <div className="glass-card card-padding rounded-[2rem] md:rounded-[2.5rem]">
                      <h4 className="font-bold text-xl md:text-2xl mb-6 text-primary">{support.placement.title}</h4>
                      <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 font-light">{support.placement.description}</p>
                      <ul className="space-y-4">
                         {support.placement.items.map((item, i) => (
                           <li key={i} className="flex items-center gap-3">
                              <CheckCircle className="text-accent" size={16} />
                              <span className="text-gray-600 font-medium text-sm md:text-base">{item}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="glass-card card-padding rounded-[2rem] md:rounded-[2.5rem]">
                      <h4 className="font-bold text-xl md:text-2xl mb-6 text-primary">{support.alumni.title}</h4>
                      <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 font-light">{support.alumni.description}</p>
                      <div className="flex -space-x-3 md:-space-x-4 mb-8">
                         {[1, 2, 3, 4].map(i => (
                           <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white shadow-lg" alt="Alumni" />
                         ))}
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-[10px] md:text-xs border-4 border-white shadow-lg">{support.alumni.count}</div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Student Activities Section */}
              <div id="activities" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10 md:mb-12">
                  <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Camera className="text-accent" size={28} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary">{activities.title}</h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 md:mb-12 font-light">
                  {activities.description}
                </p>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-8 border-b border-gray-100 pb-6">
                  {activities.categories.map((cat: any) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveTab(cat.id)
                        setSelectedImgIndex(-1)
                      }}
                      className={`px-5 py-3 rounded-full text-[10px] md:text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                        activeTab === cat.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Category Details & Images */}
                {currentCategory && (
                  <div className="space-y-8">
                    <div className="glass-card card-padding rounded-[2rem] bg-primary/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-gray-100">
                      <div className="space-y-2 max-w-xl">
                        <h4 className="font-bold text-xl md:text-2xl text-primary">{currentCategory.name}</h4>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light">{currentCategory.desc}</p>
                      </div>
                      
                      {currentCategory.report_url && (
                        <a
                          href={currentCategory.report_url}
                          download
                          className="btn btn-accent flex items-center gap-2 px-6 py-3 text-xs md:text-sm shadow-md cursor-pointer shrink-0"
                        >
                          <Download size={16} /> Download Field Report
                        </a>
                      )}
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {currentImages.map((img: any, idx: number) => (
                        <motion.div
                          key={img.url}
                          layoutId={`activity-gallery-${img.url}`}
                          whileHover={{ scale: 1.03, zIndex: 10 }}
                          onClick={() => setSelectedImgIndex(idx)}
                          className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer border border-gray-100 bg-gray-50"
                        >
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn className="text-white" size={28} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lightbox for Student Activities */}
                <AnimatePresence>
                  {selectedImgIndex >= 0 && currentImages[selectedImgIndex] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                      onClick={() => setSelectedImgIndex(-1)}
                    >
                      <button
                        className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50"
                        onClick={(e) => { e.stopPropagation(); setSelectedImgIndex(-1); }}
                      >
                        <X size={40} />
                      </button>

                      {/* Left Arrow */}
                      <button
                        className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImgIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
                        }}
                      >
                        <ChevronLeft size={36} />
                      </button>

                      <motion.div
                        layoutId={`activity-gallery-${currentImages[selectedImgIndex].url}`}
                        className="max-w-5xl w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={currentImages[selectedImgIndex].url}
                          alt={currentImages[selectedImgIndex].caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                          <p className="text-white text-lg md:text-2xl font-bold italic tracking-wide">{currentImages[selectedImgIndex].caption}</p>
                          <p className="text-gray-400 text-xs md:text-sm mt-1">{selectedImgIndex + 1} of {currentImages.length}</p>
                        </div>
                      </motion.div>

                      {/* Right Arrow */}
                      <button
                        className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImgIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
                        }}
                      >
                        <ChevronRight size={36} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Tool Section */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        </div>
        
        <div className="container relative z-10 px-5">
          <div className="glass-card card-padding rounded-[2.5rem] md:rounded-[4rem] border-white/10 bg-white/5 backdrop-blur-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">{scholarship.badge}</span>
              <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-white">{scholarship.title}</h2>
              <p className="text-gray-300 text-lg md:text-xl mb-10 md:mb-12 font-light leading-relaxed">
                {scholarship.description}
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
                {scholarship.criteria.map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <CheckCircle className="text-accent" size={20} />
                    </div>
                    <h4 className="font-bold mb-2 text-sm md:text-base">{item.label}</h4>
                    <p className="text-[10px] text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/admission" className="btn btn-accent px-10 md:px-12 py-4 md:py-5 text-sm md:text-lg shadow-2xl shadow-accent/20 w-full sm:w-auto inline-block">
                {scholarship.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Study
