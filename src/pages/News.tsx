import React from 'react'
import { Calendar, Newspaper, Video, ArrowRight, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import newsData from '../data/news.json'

const News: React.FC = () => {
  const { hero, notices, media, journal } = newsData

  return (
    <div>
      <section className="bg-primary pt-32 pb-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
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
           <div className="mb-20 md:mb-32">
              <div className="flex items-center gap-4 mb-10 md:mb-16">
                 <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Bell className="text-accent" size={28} />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">{notices.title}</h2>
              </div>
              
              <div className="grid gap-6 md:gap-12">
                 {notices.items.map((notice, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.01 }}
                      className="flex flex-col md:flex-row gap-6 md:gap-10 glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group transition-all"
                    >
                       <div className="bg-primary text-white p-6 md:p-8 rounded-2xl md:rounded-3xl text-center md:w-32 shrink-0 h-fit shadow-xl shadow-primary/10 flex md:flex-col items-center justify-center gap-2 md:gap-1">
                          <span className="text-3xl md:text-4xl font-black">{notice.date.split(' ')[0]}</span>
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent">{notice.date.split(' ')[1]}</span>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-500 leading-tight">{notice.title}</h4>
                          <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">{notice.desc}</p>
                          <a href="#" className="inline-flex items-center gap-3 font-bold text-primary group-hover:gap-5 transition-all duration-500 text-sm">
                             {notices.cta} <ArrowRight size={18} className="text-accent" />
                          </a>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           <div className="mb-20 md:mb-32">
              <div className="flex items-center gap-4 mb-10 md:mb-16">
                 <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                    <Newspaper className="text-accent" size={28} />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">{media.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                 {media.items.map((item, i) => {
                    const Icon = item.type === 'Article' ? Newspaper : Video
                    return (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -10 }}
                        className="bg-gray-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-gray-100 group"
                      >
                        <Icon size={40} className="text-accent mb-6 md:mb-8 md:w-12 md:h-12" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4 block">{item.type}</span>
                        <h4 className="text-xl md:text-2xl font-bold mb-4 text-primary leading-tight">{item.title}</h4>
                        <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed font-light">{item.desc}</p>
                        <a href="#" className="btn btn-outline px-8 py-3 text-[10px] md:text-xs">
                            {item.link_text}
                        </a>
                      </motion.div>
                    )
                 })}
              </div>
           </div>

           <div className="mt-24 md:mt-32">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                 <div className="max-w-xl">
                    <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{journal.badge}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">{journal.title}</h2>
                 </div>
                 <p className="text-gray-500 text-lg md:text-xl max-w-sm font-light leading-relaxed">
                    {journal.description}
                 </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                 {journal.entries.map((entry, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                    >
                       <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-6 shadow-xl">
                          <img src={entry.img} alt={entry.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                             <span className="text-accent font-bold text-[10px] md:text-xs tracking-widest uppercase mb-2 block">{entry.date}</span>
                             <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{entry.title}</h4>
                             <p className="text-gray-300 text-[10px] md:text-xs font-medium">By {entry.author}</p>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
              
              <div className="mt-12 md:mt-16 text-center">
                 <button className="btn btn-outline px-10 md:px-12 py-4 text-xs md:text-sm w-full sm:w-auto">
                    {journal.cta}
                 </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

export default News
