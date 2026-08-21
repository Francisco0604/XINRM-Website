import React from 'react'
import { Calendar, User, ArrowLeft, BookOpen, CheckCircle, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AdmissionsNotice: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero section */}
      <section className="bg-primary pt-32 pb-20 md:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container relative z-10 px-5 max-w-4xl mx-auto">
          <Link to="/news" className="inline-flex items-center gap-2 text-accent font-bold mb-6 hover:gap-3 transition-all text-sm">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif italic mb-6 text-white leading-tight"
          >
            M.A. Admissions Open (2026–2027)
          </motion.h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-light border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <span>Published: May 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-accent" />
              <span>Written by: Siju</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Notice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Details section */}
      <section className="section-padding max-w-4xl mx-auto px-5 py-12 md:py-20">
        <div className="space-y-10 text-gray-600 leading-relaxed font-light">
          
          {/* Main announcement */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-primary font-medium leading-relaxed">
              Applications are officially open for the Master of Arts in Natural Resource Management & Sustainable Development (M.A. NRM & SD) for the academic batch of 2026–2027. 
            </p>
            <p>
              This specialized interdisciplinary program is jointly supported by the Social Centre, Ahmednagar, and Jesuit educational networks. It bridges advanced environmental science, hydrology, and agricultural planning with hands-on social work, watershed management, and community-led action.
            </p>
          </div>

          {/* Program highlights card */}
          <div className="bg-primary/5 p-6 md:p-8 rounded-3xl border border-primary/5 space-y-4">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              Why study M.A. NRM & SD at XINRM?
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Direct field exposure in 300+ villages",
                "Advanced Soil & Water Testing lab practicals",
                "GIS mapping and remote sensing curriculum",
                "Full placement support in leading NGOs & CSR units",
                "Scholarships available for deserving students"
              ].map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base">
                  <CheckCircle size={16} className="text-accent mt-1 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Eligibility Criteria</h3>
            <p>
              Candidates must hold a Bachelor's degree in any discipline (Science, Commerce, Arts, Social Work, Agriculture, or Engineering) from a recognized university. Students awaiting their final year graduation results are also eligible to apply provisionally.
            </p>
          </div>

          {/* Selection process */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Selection Process</h3>
            <p>
              Admission to the M.A. program is based on:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Review of academic records and bachelor's degree performance.</li>
              <li>A statement of purpose (SOP) submitted along with the application form.</li>
              <li>A personal interview (conducted on-campus or online) to assess social sector interest.</li>
            </ol>
          </div>

          {/* Key deadlines */}
          <div className="space-y-4 bg-accent/5 p-6 rounded-3xl border border-accent/20">
            <h3 className="text-xl font-bold text-primary">Application Deadline</h3>
            <p className="mb-0">
              There is <strong>no strict or formal deadline</strong> for the current cycle. Admissions are processed on a rolling basis starting in May. However, candidates are advised to apply early, as seat numbers are capped to maintain high quality research mentorship.
            </p>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-gray-100 space-y-6">
            <h3 className="text-2xl font-bold text-primary">How to Apply & Contact</h3>
            <p>
              Interested candidates can download the application packet directly from our Admissions section or visit the campus office. For quick inquiries, feel free to contact the admissions cell directly.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <Mail className="text-accent" size={20} />
                <div>
                  <span className="text-xs text-gray-400 block font-medium uppercase">Email Inquiry</span>
                  <span className="text-sm font-bold text-primary">xinrmsocialcentre50@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <Phone className="text-accent" size={20} />
                <div>
                  <span className="text-xs text-gray-400 block font-medium uppercase">Phone Inquiry</span>
                  <span className="text-sm font-bold text-primary">+91 94222 20120</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 text-center sm:text-left">
              <Link to="/admission" className="btn btn-accent px-8 py-3 text-sm inline-block">
                Go to Admission Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdmissionsNotice
