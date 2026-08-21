import React from 'react'
import { Shield, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PrivacyPolicy: React.FC = () => {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          >
            How we collect, use, and protect your information.
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
            <h2 className="text-2xl md:text-3xl font-bold text-primary">1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you fill out forms on our website (such as admission forms, inquiry forms, and contact forms). This may include your name, email address, phone number, and academic background details.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">2. How We Use Your Information</h2>
            <p>
              The information we collect is used solely for academic admissions, responding to your inquiries, providing updates, and enhancing your browsing experience. We do not sell, rent, or trade your personal information to third parties.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">4. Cookies and Analytics</h2>
            <p>
              Our website may use cookies to optimize performance and analyze site traffic (e.g., via Google Analytics). You can configure your browser to reject cookies, though some features of the site may function differently as a result.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">5. Changes to This Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 flex items-center gap-3">
            <Shield className="text-accent" size={24} />
            <span className="text-sm text-gray-400 font-medium">Last updated: July 2026</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
