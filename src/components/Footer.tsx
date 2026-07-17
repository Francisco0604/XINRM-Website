import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Globe, Users, Share2, Award } from 'lucide-react'
import globalData from '../data/global.json'

const Footer: React.FC = () => {
  const { footer } = globalData
  
  return (
    <footer className="bg-primary text-white pt-20 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 md:mb-24">
          {/* Brand and Mission */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 group">
              <img 
                src="/assets/logo/xinrm-logo.png" 
                alt="XINRM Logo" 
                className="h-12 md:h-16 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] brightness-110"
              />
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                XINRM<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-md font-light">
              {footer.description}
            </p>
            
            <div className="flex items-center gap-6 md:gap-8 mb-8 md:mb-10">
               <img src="/assets/logo/social-centre-logo.jpg" alt="Social Centre" className="h-10 md:h-12 w-auto brightness-110 rounded-lg shadow-lg" />
               <img src="/assets/logo/pune-jesuits-logo.png" alt="Pune Jesuits" className="h-10 md:h-12 w-auto brightness-110" />
            </div>

            <div className="flex gap-4">
              {[Globe, Users, Share2, Award].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all duration-500">
                  <Icon size={18} className="md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-8 md:mb-10">{footer.quickLinksTitle}</h4>
            <ul className="space-y-4 md:space-y-6">
              {[
                { name: 'Our Legacy', path: '/about' },
                { name: 'MA Admissions', path: '/study' },
                { name: 'Impact Stories', path: '/impact' },
                { name: 'Latest Notices', path: '/news' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-base md:text-lg font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-8 md:mb-10">{footer.contactTitle}</h4>
            <ul className="space-y-6 md:space-y-8 mb-10 md:mb-12">
              <li className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mr-4 md:mr-6 shrink-0">
                  <MapPin size={20} className="text-accent md:w-6 md:h-6" />
                </div>
                <span className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {footer.address}
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mr-4 md:mr-6 shrink-0">
                  <Mail size={20} className="text-accent md:w-6 md:h-6" />
                </div>
                <span className="text-gray-300 text-base md:text-lg break-all">{footer.email}</span>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mr-4 md:mr-6 shrink-0">
                  <Phone size={20} className="text-accent md:w-6 md:h-6" />
                </div>
                <span className="text-gray-300 text-base md:text-lg">{footer.phone}</span>
              </li>
            </ul>
            
            <form className="flex flex-col sm:flex-row p-2 bg-white/5 rounded-2xl border border-white/10 focus-within:border-accent transition-colors gap-2">
              <input 
                type="email" 
                placeholder={footer.newsletter.placeholder} 
                className="bg-transparent px-4 md:px-6 py-3 md:py-4 w-full text-base md:text-lg focus:outline-none"
              />
              <button className="btn btn-accent px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto text-sm">
                {footer.newsletter.button}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {footer.legalLinks.map((link, i) => (
              <a key={i} href={link.path} className="text-gray-500 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">{link.name}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
