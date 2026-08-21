import React from 'react'
import { FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const TermsConditions: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-primary pt-32 pb-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 topo-pattern text-white/5 z-0" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container relative z-10 px-5">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif italic mb-6 text-white animate-fade-in"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          >
            Rules and guidelines for using the XINRM website.
          </motion.p>
        </div>
      </section>

      <section className="section-padding max-w-4xl mx-auto px-5 py-16 md:py-24">
        <div className="space-y-10 text-gray-600 leading-relaxed font-light">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-accent font-bold mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">2. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and documents, is the property of XINRM and the Social Centre and is protected by intellectual property laws. You may view and download materials for personal, non-commercial use only.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">3. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the downloadable materials (e.g. syllabus, forms) on XINRM's website for personal, non-commercial transitory viewing only. You must not modify the materials, use them for commercial purposes, or republish them without written permission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">4. Disclaimer</h2>
            <p>
              The materials on XINRM's website are provided on an 'as is' basis. While we strive to provide accurate and up-to-date information, XINRM makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">5. Limitations of Liability</h2>
            <p>
              In no event shall XINRM or its partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">6. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 flex items-center gap-3">
            <FileText className="text-accent" size={24} />
            <span className="text-sm text-gray-400 font-medium">Last updated: July 2026</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsConditions
