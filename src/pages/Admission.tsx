import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  Upload,
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import admissionData from '../data/admission.json'

const Admission: React.FC = () => {
  const { hero, success, sections, fields, academic_section, experience_section, statement_section, physical_apply } = admissionData as any

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({
    // Step 1: Personal
    name: '',
    surname: '',
    fatherName: '',
    motherName: '',
    dob: '',
    age: '',
    sex: '',
    maritalStatus: '',
    nationality: '',
    hostelRequired: '',
    contactNumber: '',
    aadharNo: '',
    email: '',
    abcId: '',
    presentAddress: '',
    permanentAddress: '',
    category: '',
    
    // Step 2: Education
    qualifications: [{ exam: '', institute: '', board: '', year: '', percentage: '' }],
    additionalQualification: '',
    honors: '',
    extracurriculars: '',
    languages: {
      english: { speak: false, read: false, write: false },
      hindi: { speak: false, read: false, write: false },
      marathi: { speak: false, read: false, write: false }
    },

    // Step 3: Employment & Extras
    isEmployed: '',
    employmentDetails: {
      period: '',
      orgName: '',
      designation: '',
      responsibility: '',
      achievements: '',
      reference: ''
    },
    hobbies: '',
    sourceOfInfo: '',

    // Step 4: Statement & Declaration
    statementOfIntent: '',
    careerIntent: '',
    declarationAccepted: false,
    date: new Date().toISOString().split('T')[0],
    place: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }))
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxChange = (category: string, field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [category]: {
          ...prev.languages[category],
          [field]: !prev.languages[category][field]
        }
      }
    }))
  }

  const addQualification = () => {
    setFormData((prev: any) => ({
      ...prev,
      qualifications: [...prev.qualifications, { exam: '', institute: '', board: '', year: '', percentage: '' }]
    }))
  }

  const handleQualChange = (index: number, field: string, value: string) => {
    const newQuals = [...formData.qualifications]
    newQuals[index][field] = value
    setFormData((prev: any) => ({ ...prev, qualifications: newQuals }))
  }

  const validateStep = (currentStep: number): { valid: boolean; error: string | null } => {
    if (currentStep === 1) {
      const requiredFields = [
        { key: 'name', label: fields.name.label },
        { key: 'surname', label: fields.surname.label },
        { key: 'fatherName', label: fields.fatherName.label },
        { key: 'motherName', label: fields.motherName.label },
        { key: 'dob', label: fields.dob.label },
        { key: 'sex', label: fields.sex.label },
        { key: 'maritalStatus', label: fields.maritalStatus.label },
        { key: 'nationality', label: fields.nationality.label },
        { key: 'email', label: fields.email.label },
        { key: 'contactNumber', label: fields.contactNumber.label },
        { key: 'aadharNo', label: fields.aadharNo.label },
        { key: 'presentAddress', label: fields.presentAddress.label },
        { key: 'category', label: fields.category.label },
        { key: 'hostelRequired', label: fields.hostelRequired.label }
      ]
      
      for (const field of requiredFields) {
        if (!formData[field.key] || formData[field.key].trim() === '') {
          return { valid: false, error: `${field.label} is required.` }
        }
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        return { valid: false, error: 'Please enter a valid email address.' }
      }
    }
    
    if (currentStep === 2) {
      const q = formData.qualifications[0]
      if (!q || !q.exam || !q.institute || !q.board || !q.year || !q.percentage) {
        return { valid: false, error: 'Please enter at least one complete academic qualification.' }
      }
    }
    
    if (currentStep === 3) {
      if (!formData.isEmployed) {
        return { valid: false, error: 'Please select whether you are presently employed.' }
      }
      if (formData.isEmployed === 'Yes') {
        const details = formData.employmentDetails
        if (!details.orgName || details.orgName.trim() === '') {
          return { valid: false, error: `${experience_section.orgName.label} is required for employment details.` }
        }
        if (!details.designation || details.designation.trim() === '') {
          return { valid: false, error: `${experience_section.designation.label} is required for employment details.` }
        }
        if (!details.period || details.period.trim() === '') {
          return { valid: false, error: `${experience_section.period.label} is required for employment details.` }
        }
      }
    }
    
    return { valid: true, error: null }
  }

  const nextStep = () => {
    setValidationError(null)
    const validation = validateStep(step)
    if (validation.valid) {
      setStep(s => Math.min(s + 1, 4))
    } else {
      setValidationError(validation.error)
    }
  }

  const prevStep = () => {
    setValidationError(null)
    setStep(s => Math.max(s - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    setSubmitError(null)

    // Final check for Step 4
    if (!formData.statementOfIntent.trim()) {
      setValidationError('Statement of Intent is required.')
      return
    }
    if (!formData.careerIntent.trim()) {
      setValidationError('Career Intent is required.')
      return
    }
    if (!formData.place.trim()) {
      setValidationError('Place is required.')
      return
    }
    if (!formData.declarationAccepted) {
      setValidationError('You must accept the declaration to submit.')
      return
    }

    setIsSubmitting(true)

    const payload: Record<string, string> = {
      "form-name": "admission",
      name: formData.name,
      surname: formData.surname,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      sex: formData.sex,
      maritalStatus: formData.maritalStatus,
      nationality: formData.nationality,
      email: formData.email,
      contactNumber: formData.contactNumber,
      aadharNo: formData.aadharNo,
      abcId: formData.abcId,
      category: formData.category,
      hostelRequired: formData.hostelRequired,
      presentAddress: formData.presentAddress,
      
      qualifications: formData.qualifications.map((q: any, idx: number) => 
        `#${idx+1}: Exam: ${q.exam || 'N/A'}, Institute: ${q.institute || 'N/A'}, Board/Univ: ${q.board || 'N/A'}, Year: ${q.year || 'N/A'}, %: ${q.percentage || 'N/A'}`
      ).join('\n'),
      
      languages: Object.entries(formData.languages).map(([lang, abilities]: [string, any]) => {
        const list = Object.entries(abilities).filter(([_, checked]) => checked).map(([ability]) => ability)
        return list.length > 0 ? `${lang.toUpperCase()} (${list.join(', ')})` : null
      }).filter(Boolean).join('\n'),
      
      isEmployed: formData.isEmployed,
      employmentDetails: formData.isEmployed === 'Yes' ? (
        `Org: ${formData.employmentDetails.orgName || 'N/A'}
Designation: ${formData.employmentDetails.designation || 'N/A'}
Period: ${formData.employmentDetails.period || 'N/A'}
Reference: ${formData.employmentDetails.reference || 'N/A'}
Responsibilities/Achievements: ${formData.employmentDetails.responsibility || 'N/A'}`
      ) : 'Not Employed',
      
      hobbies: formData.hobbies,
      extracurriculars: formData.extracurriculars,
      sourceOfInfo: formData.sourceOfInfo,
      statementOfIntent: formData.statementOfIntent,
      careerIntent: formData.careerIntent,
      date: formData.date,
      place: formData.place
    }

    const encode = (data: Record<string, string>) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form. Please check your internet connection and try again.")
        }
        setIsSubmitted(true)
        window.scrollTo(0, 0)
      })
      .catch((error) => {
        console.error('Submission error:', error)
        setSubmitError(error.message || "An unexpected error occurred. Please try again.")
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const stepIcons = [User, GraduationCap, Briefcase, FileText]
  const steps = admissionData.steps.map((s: any, idx: number) => ({
    ...s,
    icon: stepIcons[idx]
  }))

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">{success.title}</h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            {success.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'} 
              className="btn btn-primary px-10 py-4"
            >
              {success.cta_home}
            </button>
            <button 
              onClick={() => window.print()} 
              className="btn btn-outline-primary px-10 py-4"
            >
              {success.cta_print}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-black uppercase text-[10px] tracking-widest mb-4">
            {hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">{hero.title}</h1>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
            {hero.description}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between mb-12 relative px-4 sm:px-10">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0 mx-10 hidden sm:block" />
          {steps.map((s: any) => {
            const Icon = s.icon
            const isActive = step === s.id
            const isCompleted = step > s.id
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center group">
                <motion.div 
                  animate={{ 
                    backgroundColor: isActive ? 'var(--color-primary)' : (isCompleted ? 'var(--color-accent)' : '#fff'),
                    borderColor: isActive ? 'var(--color-primary)' : (isCompleted ? 'var(--color-accent)' : '#e5e7eb'),
                    scale: isActive ? 1.1 : 1
                  }}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center transition-colors shadow-sm`}
                >
                  <Icon className={isActive || isCompleted ? 'text-white' : 'text-gray-400'} size={24} />
                </motion.div>
                <span className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden p-8 md:p-16">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/5 rounded-2xl">
                      <User className="text-primary" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.personal}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.name.label}</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" placeholder={fields.name.placeholder} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.surname.label}</label>
                      <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required className="form-input" placeholder={fields.surname.placeholder} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.fatherName.label}</label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.motherName.label}</label>
                      <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} required className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.dob.label}</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.sex.label}</label>
                      <select name="sex" value={formData.sex} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.sex.placeholder}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.maritalStatus.label}</label>
                      <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.maritalStatus.placeholder}</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.nationality.label}</label>
                      <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} required className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.email.label}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder={fields.email.placeholder} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.contactNumber.label}</label>
                      <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required className="form-input" placeholder={fields.contactNumber.placeholder} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.aadharNo.label}</label>
                      <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleInputChange} required className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.abcId.label}</label>
                      <input type="text" name="abcId" value={formData.abcId} onChange={handleInputChange} className="form-input" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.presentAddress.label}</label>
                    <textarea name="presentAddress" value={formData.presentAddress} onChange={handleInputChange} required className="form-input min-h-[100px]" />
                  </div>

                  <div className="space-y-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev: any) => ({ ...prev, permanentAddress: prev.presentAddress }))
                          } else {
                            setFormData((prev: any) => ({ ...prev, permanentAddress: '' }))
                          }
                        }}
                        className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-bold text-primary">{fields.sameAddress.label}</span>
                    </label>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.permanentAddress.label}</label>
                      <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} required className="form-input min-h-[100px]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.category.label}</label>
                      <select name="category" value={formData.category} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.category.placeholder}</option>
                        <option value="General">General</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="NT">NT</option>
                        <option value="Person with Disability">Person with Disability</option>
                        <option value="Deputed Candidate">Deputed Candidate</option>
                        <option value="Foreign Student">Foreign Student</option>
                        <option value="Minority">Minority</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{fields.hostelRequired.label}</label>
                      <select name="hostelRequired" value={formData.hostelRequired} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.hostelRequired.placeholder}</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/5 rounded-2xl">
                      <GraduationCap className="text-primary" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.academic}</h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {academic_section.headers.map((h: string, idx: number) => (
                            <th key={idx} className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {formData.qualifications.map((q: any, i: number) => (
                          <tr key={i} className="border-b border-gray-50 group">
                            <td className="py-3 px-1"><input type="text" value={q.exam} onChange={(e) => handleQualChange(i, 'exam', e.target.value)} className="form-input text-sm border-transparent bg-transparent focus:bg-white" placeholder="SSC/HSC/Degree" /></td>
                            <td className="py-3 px-1"><input type="text" value={q.institute} onChange={(e) => handleQualChange(i, 'institute', e.target.value)} className="form-input text-sm border-transparent bg-transparent focus:bg-white" /></td>
                            <td className="py-3 px-1"><input type="text" value={q.board} onChange={(e) => handleQualChange(i, 'board', e.target.value)} className="form-input text-sm border-transparent bg-transparent focus:bg-white" /></td>
                            <td className="py-3 px-1"><input type="text" value={q.year} onChange={(e) => handleQualChange(i, 'year', e.target.value)} className="form-input text-sm border-transparent bg-transparent focus:bg-white" /></td>
                            <td className="py-3 px-1"><input type="text" value={q.percentage} onChange={(e) => handleQualChange(i, 'percentage', e.target.value)} className="form-input text-sm border-transparent bg-transparent focus:bg-white" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button type="button" onClick={addQualification} className="text-accent font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    + {academic_section.add_btn}
                  </button>

                  <div className="space-y-8">
                    <h3 className="font-bold text-primary uppercase tracking-widest text-xs">{academic_section.languages.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {['english', 'hindi', 'marathi'].map((lang) => (
                        <div key={lang} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                          <h4 className="font-bold text-primary mb-4 capitalize">{lang}</h4>
                          <div className="space-y-3">
                            {['speak', 'read', 'write'].map((ability) => (
                              <label key={ability} className="flex items-center gap-3 cursor-pointer group">
                                <div 
                                  onClick={() => handleCheckboxChange(lang, ability)}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData.languages[lang][ability] ? 'bg-accent border-accent' : 'bg-white border-gray-300 group-hover:border-accent'}`}
                                >
                                  {formData.languages[lang][ability] && <CheckCircle size={12} className="text-white" />}
                                </div>
                                <span className="text-sm font-medium text-gray-600 capitalize">{academic_section.languages[ability] || ability}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{academic_section.honors.label}</label>
                    <textarea name="honors" value={formData.honors} onChange={handleInputChange} className="form-input" />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/5 rounded-2xl">
                      <Briefcase className="text-primary" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.experience}</h2>
                  </div>

                  <div className="space-y-6">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider block">{experience_section.employed.label}</label>
                    <div className="flex gap-6">
                      {['Yes', 'No'].map(opt => (
                        <button 
                          key={opt}
                          type="button"
                          onClick={() => setFormData((prev: any) => ({ ...prev, isEmployed: opt }))}
                          className={`px-8 py-3 rounded-2xl font-bold transition-all ${formData.isEmployed === opt ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.isEmployed === 'Yes' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50 rounded-[2rem] border border-gray-100"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{experience_section.orgName.label}</label>
                        <input type="text" name="employmentDetails.orgName" value={formData.employmentDetails.orgName} onChange={handleInputChange} className="form-input" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{experience_section.designation.label}</label>
                        <input type="text" name="employmentDetails.designation" value={formData.employmentDetails.designation} onChange={handleInputChange} className="form-input" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{experience_section.period.label}</label>
                        <input type="text" name="employmentDetails.period" value={formData.employmentDetails.period} onChange={handleInputChange} className="form-input" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{experience_section.reference.label}</label>
                        <input type="text" name="employmentDetails.reference" value={formData.employmentDetails.reference} onChange={handleInputChange} className="form-input" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{experience_section.responsibility.label}</label>
                        <textarea name="employmentDetails.responsibility" value={formData.employmentDetails.responsibility} onChange={handleInputChange} className="form-input" />
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{experience_section.hobbies.label}</label>
                      <input type="text" name="hobbies" value={formData.hobbies} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{experience_section.extracurriculars.label}</label>
                      <textarea name="extracurriculars" value={formData.extracurriculars} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{experience_section.source.label}</label>
                      <input type="text" name="sourceOfInfo" value={formData.sourceOfInfo} onChange={handleInputChange} className="form-input" placeholder={experience_section.source.placeholder} />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/5 rounded-2xl">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.statement}</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        {statement_section.intent.label} <Info size={14} className="text-accent" />
                      </label>
                      <p className="text-xs text-gray-400 mb-2 italic">{statement_section.intent.note}</p>
                      <textarea name="statementOfIntent" value={formData.statementOfIntent} onChange={handleInputChange} required className="form-input min-h-[150px]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{statement_section.career.label}</label>
                      <p className="text-xs text-gray-400 mb-2 italic">{statement_section.career.note}</p>
                      <textarea name="careerIntent" value={formData.careerIntent} onChange={handleInputChange} required className="form-input min-h-[150px]" />
                    </div>
                  </div>

                  <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 space-y-6">
                    <div className="flex items-start gap-4">
                      <ShieldCheck className="text-primary shrink-0 mt-1" size={24} />
                      <div className="space-y-4">
                        <h4 className="font-bold text-primary uppercase tracking-widest text-xs">{statement_section.declaration.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed italic">
                          I, {formData.name || '[Name]'} {statement_section.declaration.text}
                        </p>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={formData.declarationAccepted} 
                            onChange={() => setFormData((prev: any) => ({ ...prev, declarationAccepted: !prev.declarationAccepted }))}
                            className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                            required
                          />
                          <span className="text-sm font-bold text-primary">{statement_section.declaration.accept}</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-primary/10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{statement_section.date}</label>
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="form-input bg-transparent border-b border-primary/20 rounded-none focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{statement_section.place}</label>
                        <input type="text" name="place" value={formData.place} onChange={handleInputChange} required className="form-input bg-transparent border-b border-primary/20 rounded-none focus:border-primary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {validationError && (
              <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-3xl text-rose-700 text-sm font-medium animate-pulse">
                ⚠️ {validationError}
              </div>
            )}

            {submitError && (
              <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-3xl text-rose-700 text-sm font-medium">
                ⚠️ {submitError}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-16 flex flex-col sm:flex-row justify-between gap-4">
              <button 
                type="button" 
                onClick={prevStep} 
                disabled={step === 1 || isSubmitting}
                className={`btn flex items-center justify-center gap-2 px-10 py-4 ${step === 1 ? 'opacity-0 pointer-events-none' : 'btn-outline-primary'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronLeft size={20} /> Previous
              </button>
              
              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="btn btn-primary flex items-center justify-center gap-2 px-10 py-4 shadow-xl shadow-primary/20"
                >
                  Next Step <ChevronRight size={20} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!formData.declarationAccepted || isSubmitting}
                  className={`btn btn-accent flex items-center justify-center gap-2 px-12 py-5 text-lg shadow-2xl shadow-accent/20 ${(!formData.declarationAccepted || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'} <ArrowRight size={22} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Note about official document */}
        <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 flex gap-6 items-start">
           <div className="p-3 bg-white rounded-xl shadow-sm">
             <Upload className="text-blue-500" size={24} />
           </div>
           <div>
             <h4 className="font-bold text-blue-900 mb-1">{physical_apply.title}</h4>
             <p className="text-blue-700/70 text-sm">
               {physical_apply.description}
               <a href="/assets/XINRM APPLICATION.docx" download className="ml-2 font-bold text-blue-600 underline">{physical_apply.cta}</a>
             </p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Admission
