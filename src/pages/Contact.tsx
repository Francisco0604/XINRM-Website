import React from 'react'
import { MapPin, Mail, Phone, Send, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import contactData from '../data/contact.json'

const Contact: React.FC = () => {
  const { hero, info, form } = contactData
  const iconMap: Record<string, any> = { MapPin, Mail, Phone }

  return (
    <div>
      <section className="bg-primary pt-32 pb-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="lg:col-span-5 space-y-12 md:space-y-16">
              <div>
                <div className="flex items-center gap-6 mb-8 md:mb-10">
                   <div className="p-3 bg-accent/10 rounded-2xl shrink-0">
                      <MessageCircle className="text-accent" size={28} />
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold text-primary">{info.title}</h2>
                </div>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-light">
                  {info.description}
                </p>
                
                <div className="space-y-8 md:space-y-10">
                  {info.items.map((item, i) => {
                    const Icon = iconMap[item.title] || MapPin
                    return (
                      <div key={i} className="flex items-start gap-5 md:gap-8 group">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                          <Icon size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg md:text-xl mb-1 md:mb-2 text-primary">{item.title}</h4>
                          <p className="text-gray-500 text-sm md:text-lg leading-relaxed font-light break-all">{item.content}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl h-64 md:h-80 border-4 md:border-8 border-gray-50 relative group">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d74.7!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzAwLjAiTiA3NMKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={true} 
                   loading="lazy"
                   className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                 ></iframe>
                 <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5 rounded-[2.2rem] md:rounded-[2.5rem]" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-card card-padding rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 relative z-10">{form.title}</h3>
                <form className="space-y-6 md:space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{form.fields.name.label}</label>
                      <input type="text" className="w-full px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm md:text-lg font-medium" placeholder={form.fields.name.placeholder} required />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{form.fields.email.label}</label>
                      <input type="email" className="w-full px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm md:text-lg font-medium" placeholder={form.fields.email.placeholder} required />
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{form.fields.subject.label}</label>
                    <select className="w-full px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm md:text-lg font-medium appearance-none cursor-pointer">
                      {form.options.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{form.fields.message.label}</label>
                    <textarea rows={4} className="w-full px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm md:text-lg font-medium" placeholder={form.fields.message.placeholder} required></textarea>
                  </div>

                  <div className="flex items-start md:items-center gap-3 md:gap-4 ml-1">
                    <input type="checkbox" id="consent" className="w-5 h-5 md:w-6 md:h-6 accent-primary rounded-lg shrink-0 mt-1 md:mt-0" required />
                    <label htmlFor="consent" className="text-xs md:text-base text-gray-500 font-light">{form.consent} <a href="#" className="text-primary font-bold hover:text-accent transition-colors">Privacy Policy</a>.</label>
                  </div>

                  <button type="submit" className="w-full btn btn-primary py-5 md:py-6 text-lg flex items-center justify-center gap-4 group shadow-xl shadow-primary/20 cursor-pointer">
                    {form.cta} <Send size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
