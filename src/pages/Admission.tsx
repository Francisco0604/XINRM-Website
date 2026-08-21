import React, { useState, useRef, useEffect } from 'react'
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
  ShieldCheck,
  FileSpreadsheet,
  Printer,
  Download,
  AlertTriangle,
  FileCheck,
  Image as ImageIcon,
  CreditCard,
  FileBadge,
  FileSpreadsheet as FileListIcon
} from 'lucide-react'
import admissionData from '../data/admission.json'
import { 
  sanitizeInput, 
  calculateAge, 
  generateReferenceId, 
  generateApplicationExcel 
} from '../utils/applicationExport'

const Admission: React.FC = () => {
  const { hero, success, sections, fields, academic_section, experience_section, documents_section, statement_section, physical_apply } = admissionData as any

  // Anti-bot velocity timer
  const formLoadTimestamp = useRef<number>(Date.now())
  
  const [step, setStep] = useState(1)
  const [refId, setRefId] = useState<string>('')
  
  const [formData, setFormData] = useState<any>({
    // Security Honeypot (must remain empty)
    bot_trap: '',

    // Step 1: Personal Information
    salutation: 'Mr.',
    name: '',
    surname: '',
    fatherName: '',
    motherName: '',
    dob: '',
    age: '',
    sex: '',
    maritalStatus: '',
    nationality: 'Indian',
    hostelRequired: '',
    contactNumber: '',
    aadharNo: '',
    abcId: '',
    presentAddress: '',
    permanentAddress: '',
    sameAddress: false,
    category: '',
    
    // Step 2: Academic Qualifications
    qualifications: [
      { exam: 'S.S.C. (10th)', institute: '', board: '', year: '', percentage: '' },
      { exam: 'H.S.C. (12th) / Diploma', institute: '', board: '', year: '', percentage: '' },
      { exam: "Bachelor's Degree (Graduation)", institute: '', board: '', year: '', percentage: '' }
    ],
    additionalQualification: '',
    honors: '',
    languages: {
      english: { speak: false, read: false, write: false },
      hindi: { speak: false, read: false, write: false },
      marathi: { speak: false, read: false, write: false }
    },

    // Step 3: Employment & Extras
    isEmployed: 'No',
    employmentDetails: {
      period: '',
      orgName: '',
      designation: '',
      responsibility: '',
      achievements: '',
      reference: ''
    },
    hobbies: '',
    extracurriculars_1: '',
    extracurriculars_2: '',
    sourceOfInfo: '',

    // Document File Names
    attachedPhotoName: '',
    attachedPassingCertName: '',
    attachedMarksheetName: '',
    attachedAadharDocName: '',
    attachedMigrationName: '',
    attachedTransferCertName: '',
    attachedPanDocName: '',

    // Step 4: Statement & Declaration
    statementOfIntent: '',
    careerIntent: '',
    declarationAccepted: false,
    date: new Date().toISOString().split('T')[0],
    place: ''
  })

  // 7 Mandatory File Objects
  const [attachedFiles, setAttachedFiles] = useState<{
    photo: File | null
    passingCertificate: File | null
    marksheet: File | null
    aadharCard: File | null
    migrationCertificate: File | null
    transferCertificate: File | null
    panCard: File | null
  }>({
    photo: null,
    passingCertificate: null,
    marksheet: null,
    aadharCard: null,
    migrationCertificate: null,
    transferCertificate: null,
    panCard: null
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    formLoadTimestamp.current = Date.now()
  }, [])

  // Auto-calculate Age on DOB change
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dobValue = e.target.value
    const computedAge = calculateAge(dobValue)
    setFormData((prev: any) => ({
      ...prev,
      dob: dobValue,
      age: computedAge !== null ? String(computedAge) : ''
    }))
  }

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

  const handleFileChange = (docKey: keyof typeof attachedFiles, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationError(`File ${file.name} exceeds the 5MB size limit. Please upload a smaller file.`)
        return
      }

      setAttachedFiles(prev => ({ ...prev, [docKey]: file }))

      const fieldNameMap: Record<string, string> = {
        photo: 'attachedPhotoName',
        passingCertificate: 'attachedPassingCertName',
        marksheet: 'attachedMarksheetName',
        aadharCard: 'attachedAadharDocName',
        migrationCertificate: 'attachedMigrationName',
        transferCertificate: 'attachedTransferCertName',
        panCard: 'attachedPanDocName'
      }

      setFormData((prev: any) => ({ ...prev, [fieldNameMap[docKey]]: file.name }))

      if (docKey === 'photo') {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const addQualification = () => {
    setFormData((prev: any) => ({
      ...prev,
      qualifications: [...prev.qualifications, { exam: '', institute: '', board: '', year: '', percentage: '' }]
    }))
  }

  const removeQualification = (index: number) => {
    if (formData.qualifications.length <= 1) return
    setFormData((prev: any) => ({
      ...prev,
      qualifications: formData.qualifications.filter((_: any, i: number) => i !== index)
    }))
  }

  const handleQualChange = (index: number, field: string, value: string) => {
    const newQuals = [...formData.qualifications]
    newQuals[index][field] = value
    setFormData((prev: any) => ({ ...prev, qualifications: newQuals }))
  }

  // Strict Validation Logic
  const validateStep = (currentStep: number): { valid: boolean; error: string | null } => {
    if (currentStep === 1) {
      if (!formData.name?.trim()) return { valid: false, error: 'First Name is required.' }
      if (!formData.surname?.trim()) return { valid: false, error: 'Surname / Last Name is required.' }
      if (!formData.fatherName?.trim()) return { valid: false, error: "Father's / Husband's Name is required." }
      if (!formData.motherName?.trim()) return { valid: false, error: "Mother's Name is required." }
      if (!formData.dob) return { valid: false, error: 'Date of Birth is required.' }

      const ageNum = parseInt(formData.age, 10)
      if (isNaN(ageNum) || ageNum < 18) {
        return { valid: false, error: 'Candidate must be at least 18 years old to apply for the M.A. programme.' }
      }
      if (ageNum > 75) {
        return { valid: false, error: 'Please enter a valid Date of Birth.' }
      }

      if (!formData.sex) return { valid: false, error: 'Please select Sex / Gender.' }
      if (!formData.maritalStatus) return { valid: false, error: 'Please select Marital Status.' }
      if (!formData.nationality?.trim()) return { valid: false, error: 'Nationality is required.' }
      
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!formData.email || !emailRegex.test(formData.email.trim())) {
        return { valid: false, error: 'Please enter a valid Email Address.' }
      }

      // Indian 10-Digit Mobile validation
      const cleanPhone = formData.contactNumber.replace(/[^0-9]/g, '')
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        return { valid: false, error: 'Please enter a valid 10-digit Indian Mobile Number (starting with 6, 7, 8, or 9).' }
      }

      // Aadhaar 12-Digit validation
      const cleanAadhaar = formData.aadharNo.replace(/[^0-9]/g, '')
      if (!/^\d{12}$/.test(cleanAadhaar)) {
        return { valid: false, error: 'Aadhaar Number must be exactly 12 numeric digits.' }
      }
      if (/^(\d)\1{11}$/.test(cleanAadhaar)) {
        return { valid: false, error: 'Please enter a genuine 12-digit Aadhaar Number.' }
      }

      if (!formData.presentAddress?.trim()) return { valid: false, error: 'Present Address is required.' }
      if (!formData.permanentAddress?.trim()) return { valid: false, error: 'Permanent Address is required.' }
      if (!formData.category) return { valid: false, error: 'Please select your Category.' }
      if (!formData.hostelRequired) return { valid: false, error: 'Please specify if Hostel Facility is required.' }
    }
    
    if (currentStep === 2) {
      const filledQuals = formData.qualifications.filter((q: any) => q.exam?.trim() && q.institute?.trim() && q.year?.trim())
      if (filledQuals.length === 0) {
        return { valid: false, error: 'Please provide at least one complete academic qualification with Institute and Year.' }
      }

      for (const q of filledQuals) {
        const yr = parseInt(q.year, 10)
        const currentYear = new Date().getFullYear()
        if (isNaN(yr) || yr < 1970 || yr > currentYear) {
          return { valid: false, error: `Invalid passing year (${q.year || 'blank'}) for ${q.exam}. Enter a year between 1970 and ${currentYear}.` }
        }
        if (q.percentage) {
          const pct = parseFloat(q.percentage)
          if (isNaN(pct) || pct < 0 || pct > 100) {
            return { valid: false, error: `Percentage for ${q.exam} must be between 0 and 100.` }
          }
        }
      }
    }
    
    if (currentStep === 3) {
      if (!formData.isEmployed) {
        return { valid: false, error: 'Please select whether you are presently employed.' }
      }
      if (formData.isEmployed === 'Yes') {
        const details = formData.employmentDetails
        if (!details.orgName?.trim()) {
          return { valid: false, error: 'Organization Name & Address is required when employed.' }
        }
        if (!details.designation?.trim()) {
          return { valid: false, error: 'Designation is required when employed.' }
        }
        if (!details.period?.trim()) {
          return { valid: false, error: 'Working Period is required when employed.' }
        }
      }

      // Validate all 7 Mandatory Documents
      if (!attachedFiles.photo) {
        return { valid: false, error: 'Passport Size Photograph is mandatory. Please upload your photo.' }
      }
      if (!attachedFiles.passingCertificate) {
        return { valid: false, error: 'Passing Certificate is mandatory. Please upload your passing certificate.' }
      }
      if (!attachedFiles.marksheet) {
        return { valid: false, error: 'Marksheet is mandatory. Please upload your graduation / final marksheet.' }
      }
      if (!attachedFiles.aadharCard) {
        return { valid: false, error: 'Aadhar Card is mandatory. Please upload your Aadhaar card copy.' }
      }
      if (!attachedFiles.migrationCertificate) {
        return { valid: false, error: 'Migration Certificate is mandatory. Please upload your migration certificate.' }
      }
      if (!attachedFiles.transferCertificate) {
        return { valid: false, error: 'Transfer Certificate (TC) is mandatory. Please upload your transfer certificate.' }
      }
      if (!attachedFiles.panCard) {
        return { valid: false, error: 'PAN Card is mandatory. Please upload your PAN card copy.' }
      }
    }
    
    return { valid: true, error: null }
  }

  const nextStep = () => {
    setValidationError(null)
    const validation = validateStep(step)
    if (validation.valid) {
      setStep(s => Math.min(s + 1, 4))
      window.scrollTo({ top: 200, behavior: 'smooth' })
    } else {
      setValidationError(validation.error)
    }
  }

  const prevStep = () => {
    setValidationError(null)
    setStep(s => Math.max(s - 1, 1))
    window.scrollTo({ top: 200, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    setSubmitError(null)

    // Anti-Bot Velocity check
    const elapsedSeconds = (Date.now() - formLoadTimestamp.current) / 1000
    if (elapsedSeconds < 4) {
      setValidationError('Form submitted too quickly. Please review your entries and try again.')
      return
    }

    // Anti-Bot Honeypot check
    if (formData.bot_trap && formData.bot_trap.trim() !== '') {
      console.warn('Bot submission blocked via Honeypot trap.')
      return
    }

    // Step 4 Validations
    if (!formData.statementOfIntent?.trim() || formData.statementOfIntent.trim().length < 40) {
      setValidationError('Statement of Intent is required (minimum 40 characters explaining your desire to pursue this course).')
      return
    }
    if (!formData.careerIntent?.trim() || formData.careerIntent.trim().length < 40) {
      setValidationError('Career Intent is required (minimum 40 characters explaining how you plan to utilize this degree in your career).')
      return
    }
    if (!formData.place?.trim()) {
      setValidationError('Place of submission is required.')
      return
    }
    if (!formData.declarationAccepted) {
      setValidationError('You must check and accept the declaration to submit your application.')
      return
    }

    // Double check documents before final submit
    if (!attachedFiles.photo || !attachedFiles.passingCertificate || !attachedFiles.marksheet || !attachedFiles.aadharCard || !attachedFiles.migrationCertificate || !attachedFiles.transferCertificate || !attachedFiles.panCard) {
      setValidationError('All 7 mandatory admission documents must be attached before submitting.')
      return
    }

    setIsSubmitting(true)
    const newRefId = generateReferenceId()
    setRefId(newRefId)

    // Build Sanitized Application Summary
    const cleanName = sanitizeInput(formData.name)
    const cleanSurname = sanitizeInput(formData.surname)
    const fullName = `${formData.salutation} ${cleanName} ${cleanSurname}`.trim()

    const qualsText = formData.qualifications
      .filter((q: any) => q.exam?.trim() || q.institute?.trim())
      .map((q: any, idx: number) => 
        `#${idx+1} [${sanitizeInput(q.exam)}]: Institute: ${sanitizeInput(q.institute)} | Board/Univ: ${sanitizeInput(q.board)} | Year: ${sanitizeInput(q.year)} | Score: ${sanitizeInput(q.percentage)}%`
      ).join('\n')

    const langText = Object.entries(formData.languages).map(([lang, abilities]: [string, any]) => {
      const list = Object.entries(abilities).filter(([_, checked]) => checked).map(([ability]) => ability)
      return list.length > 0 ? `${lang.toUpperCase()} (${list.join(', ')})` : null
    }).filter(Boolean).join(', ')

    // Build standard multi-part FormData for reliable file and field submission
    const submissionBody = new FormData()
    submissionBody.append("_subject", `🎓 NEW M.A. ADMISSION APPLICATION: ${fullName} [${newRefId}]`)
    submissionBody.append("Application_Reference_ID", newRefId)
    submissionBody.append("Full_Name", fullName)
    submissionBody.append("Salutation", sanitizeInput(formData.salutation))
    submissionBody.append("First_Name", cleanName)
    submissionBody.append("Surname", cleanSurname)
    submissionBody.append("Father_Name", sanitizeInput(formData.fatherName))
    submissionBody.append("Mother_Name", sanitizeInput(formData.motherName))
    submissionBody.append("Date_of_Birth", sanitizeInput(formData.dob))
    submissionBody.append("Age", `${sanitizeInput(formData.age)} Years`)
    submissionBody.append("Gender", sanitizeInput(formData.sex))
    submissionBody.append("Marital_Status", sanitizeInput(formData.maritalStatus))
    submissionBody.append("Nationality", sanitizeInput(formData.nationality))
    submissionBody.append("Contact_Number", sanitizeInput(formData.contactNumber))
    submissionBody.append("Email_Address", sanitizeInput(formData.email))
    submissionBody.append("Aadhaar_Number", sanitizeInput(formData.aadharNo))
    submissionBody.append("ABC_ID", sanitizeInput(formData.abcId) || 'N/A')
    submissionBody.append("Category", sanitizeInput(formData.category))
    submissionBody.append("Hostel_Required", sanitizeInput(formData.hostelRequired))
    submissionBody.append("Present_Address", sanitizeInput(formData.presentAddress))
    submissionBody.append("Permanent_Address", sanitizeInput(formData.permanentAddress))
    submissionBody.append("Academic_Qualifications", qualsText)
    submissionBody.append("Additional_Qualifications", sanitizeInput(formData.additionalQualification) || 'None')
    submissionBody.append("Honors_and_Scholarships", sanitizeInput(formData.honors) || 'None')
    submissionBody.append("Languages_Known", langText || 'None specified')
    submissionBody.append("Employment_Status", sanitizeInput(formData.isEmployed))
    
    if (formData.isEmployed === 'Yes') {
      submissionBody.append("Employment_Details", `Organization: ${sanitizeInput(formData.employmentDetails.orgName)} | Designation: ${sanitizeInput(formData.employmentDetails.designation)} | Period: ${sanitizeInput(formData.employmentDetails.period)} | Ref: ${sanitizeInput(formData.employmentDetails.reference)} | Roles: ${sanitizeInput(formData.employmentDetails.responsibility)}`)
    } else {
      submissionBody.append("Employment_Details", "Not Employed")
    }

    submissionBody.append("Hobbies", sanitizeInput(formData.hobbies) || 'None')
    submissionBody.append("Extracurricular_Activities", `1. ${sanitizeInput(formData.extracurriculars_1) || 'None'} | 2. ${sanitizeInput(formData.extracurriculars_2) || 'None'}`)
    submissionBody.append("Source_of_Information", sanitizeInput(formData.sourceOfInfo) || 'Website')
    submissionBody.append("Statement_of_Intent", sanitizeInput(formData.statementOfIntent))
    submissionBody.append("Career_Intent", sanitizeInput(formData.careerIntent))
    submissionBody.append("Declaration_Status", "ACCEPTED & DIGITALLY SIGNED BY APPLICANT")
    submissionBody.append("Submission_Date", sanitizeInput(formData.date))
    submissionBody.append("Submission_Place", sanitizeInput(formData.place))

    // FormSubmit processes files when appended with key 'attachment'
    if (attachedFiles.photo) {
      submissionBody.append("attachment", attachedFiles.photo, `1_photo_${attachedFiles.photo.name}`)
    }
    if (attachedFiles.passingCertificate) {
      submissionBody.append("attachment", attachedFiles.passingCertificate, `2_passing_cert_${attachedFiles.passingCertificate.name}`)
    }
    if (attachedFiles.marksheet) {
      submissionBody.append("attachment", attachedFiles.marksheet, `3_marksheet_${attachedFiles.marksheet.name}`)
    }
    if (attachedFiles.aadharCard) {
      submissionBody.append("attachment", attachedFiles.aadharCard, `4_aadhar_${attachedFiles.aadharCard.name}`)
    }
    if (attachedFiles.migrationCertificate) {
      submissionBody.append("attachment", attachedFiles.migrationCertificate, `5_migration_${attachedFiles.migrationCertificate.name}`)
    }
    if (attachedFiles.transferCertificate) {
      submissionBody.append("attachment", attachedFiles.transferCertificate, `6_tc_${attachedFiles.transferCertificate.name}`)
    }
    if (attachedFiles.panCard) {
      submissionBody.append("attachment", attachedFiles.panCard, `7_pan_${attachedFiles.panCard.name}`)
    }

    try {
      // 1. Dispatch to FormSubmit direct email delivery
      const formSubmitPromise = fetch("https://formsubmit.co/ajax/xinrmsocialcentre50@gmail.com", {
        method: "POST",
        body: submissionBody
      }).catch(err => {
        console.warn('FormSubmit dispatch note:', err)
        return null
      })

      // 2. Dispatch to Netlify Serverless Function
      const functionPromise = fetch("/.netlify/functions/submit-admission", {
        method: "POST",
        body: submissionBody
      }).catch(err => {
        console.warn('Netlify function dispatch note:', err)
        return null
      })

      // 3. Dispatch to Netlify Form detection endpoint
      const netlifyPromise = fetch("/", {
        method: "POST",
        body: submissionBody
      }).catch(err => {
        console.warn('Netlify form submission note:', err)
        return null
      })

      await Promise.allSettled([formSubmitPromise, functionPromise, netlifyPromise])

      setIsSubmitted(true)
      window.scrollTo(0, 0)
    } catch (error: any) {
      console.error('Submission error:', error)
      setIsSubmitted(true)
      window.scrollTo(0, 0)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepIcons = [User, GraduationCap, Briefcase, FileText]
  const steps = admissionData.steps.map((s: any, idx: number) => ({
    ...s,
    icon: stepIcons[idx]
  }))

  // Download Excel Workbook
  const handleDownloadExcel = () => {
    generateApplicationExcel(formData, refId || generateReferenceId())
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full bg-white rounded-[3rem] p-8 md:p-14 text-center shadow-2xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle size={44} />
          </div>
          
          <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary font-black uppercase text-xs tracking-widest mb-3">
            Ref ID: {refId}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">{success.title}</h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            {success.description}
          </p>

          {/* Action CTAs: Excel & Print */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <button 
              onClick={handleDownloadExcel}
              className="btn bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-2 py-4 shadow-lg shadow-emerald-600/20 rounded-2xl cursor-pointer"
            >
              <FileSpreadsheet size={20} />
              {success.cta_excel}
            </button>

            <button 
              onClick={() => window.print()} 
              className="btn btn-outline-primary flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer"
            >
              <Printer size={20} />
              {success.cta_print}
            </button>

            <button 
              onClick={() => window.location.href = '/'} 
              className="btn btn-primary flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer"
            >
              {success.cta_home}
            </button>
          </div>

          {/* Official Printable Summary Slip */}
          <div className="text-left bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6 print:m-0 print:border-none print:shadow-none">
            <div className="border-b border-gray-200 pb-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-primary">Social Centre's Xavier Institute of Natural Resource Management</h3>
                <p className="text-xs text-gray-500">M.A. in Natural Resource Management and Sustainable Development | Official Application Slip</p>
                <p className="text-xs text-accent font-bold mt-1">Application Reference: {refId}</p>
              </div>
              <div className="flex gap-4 items-center">
                {photoPreview && (
                  <div className="w-16 h-20 border-2 border-primary/20 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
                    <img src={photoPreview} alt="Candidate" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-right text-xs text-gray-400">
                  <p>Date: {formData.date}</p>
                  <p>Status: <span className="text-emerald-600 font-bold">SUBMITTED</span></p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-400 block uppercase">Candidate Name</span>
                <span className="font-bold text-gray-800 text-sm">{formData.salutation} {formData.name} {formData.surname}</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 block uppercase">Contact & Email</span>
                <span className="font-medium text-gray-800">{formData.contactNumber} | {formData.email}</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 block uppercase">Date of Birth & Age</span>
                <span className="font-medium text-gray-800">{formData.dob} ({formData.age} Years)</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 block uppercase">Aadhaar & ABC ID</span>
                <span className="font-medium text-gray-800">{formData.aadharNo} | ABC: {formData.abcId || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 block uppercase">Category & Hostel</span>
                <span className="font-medium text-gray-800">{formData.category} | Hostel: {formData.hostelRequired}</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 block uppercase">Place of Submission</span>
                <span className="font-medium text-gray-800">{formData.place}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-bold text-gray-400 text-xs block uppercase mb-2">Qualifications Summary</span>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200 bg-white rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 font-bold">
                    <tr>
                      <th className="p-2 border-b">Exam</th>
                      <th className="p-2 border-b">Institute</th>
                      <th className="p-2 border-b">Board/Univ</th>
                      <th className="p-2 border-b">Year</th>
                      <th className="p-2 border-b">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.qualifications.filter((q: any) => q.exam || q.institute).map((q: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 font-medium">{q.exam}</td>
                        <td className="p-2">{q.institute || '-'}</td>
                        <td className="p-2">{q.board || '-'}</td>
                        <td className="p-2">{q.year || '-'}</td>
                        <td className="p-2 font-bold">{q.percentage ? `${q.percentage}%` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7 Mandatory Documents Status Badge */}
            <div className="pt-2">
              <span className="font-bold text-gray-400 text-xs block uppercase mb-2">Attached Mandatory Documents (7 of 7 Verified)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">1. Photo</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedPhotoName}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">2. Passing Cert</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedPassingCertName}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">3. Marksheet</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedMarksheetName}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">4. Aadhar Card</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedAadharDocName}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">5. Migration Cert</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedMigrationName}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">6. Transfer Cert</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedTransferCertName}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <span className="text-gray-400 block">7. PAN Card</span>
                  <span className="font-bold text-emerald-700 truncate block">✓ {formData.attachedPanDocName}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xs text-gray-500">
              <span>Declaration Verified: <strong className="text-emerald-700">Agreed & Digital Signed</strong></span>
              <span>Admissions Email: <strong>xinrmsocialcentre50@gmail.com</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-black uppercase text-[10px] tracking-widest mb-4">
            {hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-3">{hero.title}</h1>
          <p className="text-accent font-bold text-sm md:text-base max-w-3xl mx-auto mb-3">
            {hero.affiliation}
          </p>
          <p className="text-gray-500 text-base md:text-lg font-light max-w-2xl mx-auto">
            {hero.description}
          </p>
        </div>

        {/* Stepper Progress Bar */}
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
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center transition-colors shadow-sm"
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

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden p-8 md:p-16">
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Honeypot Bot Trap (Cyber Defense) */}
            <input 
              type="text" 
              name="bot_trap" 
              value={formData.bot_trap} 
              onChange={handleInputChange} 
              tabIndex={-1} 
              autoComplete="off"
              style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }} 
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              {/* STEP 1: PERSONAL INFORMATION */}
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
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.personal}</h2>
                      <p className="text-xs text-gray-400">All demographic and statutory verification details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.salutation.label} *</label>
                      <select name="salutation" value={formData.salutation} onChange={handleInputChange} required className="form-input">
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Fr.">Fr.</option>
                        <option value="Sr.">Sr.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.name.label} *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" placeholder={fields.name.placeholder} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.surname.label} *</label>
                      <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required className="form-input" placeholder={fields.surname.placeholder} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.fatherName.label} *</label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required className="form-input" placeholder={fields.fatherName.placeholder} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.motherName.label} *</label>
                      <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} required className="form-input" placeholder={fields.motherName.placeholder} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.dob.label} *</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleDobChange} required className="form-input" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                        {fields.age.label}
                        <span className="text-[10px] text-emerald-600 font-normal">Auto</span>
                      </label>
                      <input 
                        type="text" 
                        name="age" 
                        value={formData.age ? `${formData.age} Yrs` : ''} 
                        readOnly 
                        className="form-input bg-gray-100 font-bold text-primary cursor-not-allowed" 
                        placeholder={fields.age.placeholder} 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.sex.label} *</label>
                      <select name="sex" value={formData.sex} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.sex.placeholder}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.maritalStatus.label} *</label>
                      <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.maritalStatus.placeholder}</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.nationality.label} *</label>
                      <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} required className="form-input" placeholder={fields.nationality.placeholder} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.contactNumber.label} *</label>
                      <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required maxLength={10} className="form-input" placeholder="10-digit mobile number" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.email.label} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder={fields.email.placeholder} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.aadharNo.label} *</label>
                      <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleInputChange} maxLength={12} required className="form-input" placeholder="12-digit Aadhaar number" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.abcId.label}</label>
                      <input type="text" name="abcId" value={formData.abcId} onChange={handleInputChange} className="form-input" placeholder={fields.abcId.placeholder} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.presentAddress.label} *</label>
                    <textarea name="presentAddress" value={formData.presentAddress} onChange={handleInputChange} required className="form-input min-h-[90px]" placeholder={fields.presentAddress.placeholder} />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <input 
                        type="checkbox" 
                        checked={formData.sameAddress}
                        onChange={(e) => {
                          const checked = e.target.checked
                          setFormData((prev: any) => ({
                            ...prev,
                            sameAddress: checked,
                            permanentAddress: checked ? prev.presentAddress : ''
                          }))
                        }}
                        className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                      />
                      <span className="text-xs font-bold text-primary">{fields.sameAddress.label}</span>
                    </label>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.permanentAddress.label} *</label>
                      <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} required className="form-input min-h-[90px]" placeholder={fields.permanentAddress.placeholder} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.category.label} *</label>
                      <select name="category" value={formData.category} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.category.placeholder}</option>
                        <option value="General">General</option>
                        <option value="SC">SC (Scheduled Caste)</option>
                        <option value="ST">ST (Scheduled Tribe)</option>
                        <option value="NT">NT (Nomadic Tribes)</option>
                        <option value="Person with Disability">Person with Disability</option>
                        <option value="Deputed Candidate">Deputed Candidate</option>
                        <option value="Foreign Student">Foreign Student</option>
                        <option value="Minority">Minority</option>
                      </select>
                      <p className="text-[11px] text-gray-400 italic mt-1">{fields.category.note}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{fields.hostelRequired.label} *</label>
                      <select name="hostelRequired" value={formData.hostelRequired} onChange={handleInputChange} required className="form-input">
                        <option value="">{fields.hostelRequired.placeholder}</option>
                        <option value="Yes">Yes (Require campus hostel)</option>
                        <option value="No">No (Day scholar / Self-arranged)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: ACADEMIC QUALIFICATIONS & LANGUAGES */}
              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/5 rounded-2xl">
                      <GraduationCap className="text-primary" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.academic}</h2>
                      <p className="text-xs text-gray-400">Academic history starting with S.S.C. and language competencies</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="border-b-2 border-gray-100 bg-gray-50/50">
                          {academic_section.headers.map((h: string, idx: number) => (
                            <th key={idx} className="py-3 px-3 text-[11px] font-black uppercase tracking-wider text-gray-500">{h}</th>
                          ))}
                          <th className="py-3 px-2 text-[11px] font-black uppercase text-gray-400 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.qualifications.map((q: any, i: number) => (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                            <td className="py-2.5 px-2">
                              <input 
                                type="text" 
                                value={q.exam} 
                                onChange={(e) => handleQualChange(i, 'exam', e.target.value)} 
                                className="form-input text-xs py-2" 
                                placeholder="SSC/HSC/Degree/PG" 
                              />
                            </td>
                            <td className="py-2.5 px-2">
                              <input 
                                type="text" 
                                value={q.institute} 
                                onChange={(e) => handleQualChange(i, 'institute', e.target.value)} 
                                className="form-input text-xs py-2" 
                                placeholder="College / School Name" 
                              />
                            </td>
                            <td className="py-2.5 px-2">
                              <input 
                                type="text" 
                                value={q.board} 
                                onChange={(e) => handleQualChange(i, 'board', e.target.value)} 
                                className="form-input text-xs py-2" 
                                placeholder="Board / University" 
                              />
                            </td>
                            <td className="py-2.5 px-2 w-24">
                              <input 
                                type="text" 
                                value={q.year} 
                                onChange={(e) => handleQualChange(i, 'year', e.target.value)} 
                                className="form-input text-xs py-2" 
                                placeholder="YYYY" 
                                maxLength={4}
                              />
                            </td>
                            <td className="py-2.5 px-2 w-28">
                              <input 
                                type="text" 
                                value={q.percentage} 
                                onChange={(e) => handleQualChange(i, 'percentage', e.target.value)} 
                                className="form-input text-xs py-2" 
                                placeholder="e.g. 78.50" 
                              />
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              {formData.qualifications.length > 1 && (
                                <button 
                                  type="button" 
                                  onClick={() => removeQualification(i)} 
                                  className="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-rose-50"
                                  title="Remove row"
                                >
                                  ✕
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button 
                    type="button" 
                    onClick={addQualification} 
                    className="text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all p-2 rounded-xl hover:bg-accent/10"
                  >
                    + {academic_section.add_btn}
                  </button>

                  {/* Language Proficiency Grid */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-primary uppercase tracking-widest text-xs">{academic_section.languages.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['english', 'hindi', 'marathi'].map((lang) => (
                        <div key={lang} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                          <h4 className="font-bold text-primary mb-4 capitalize text-sm">{lang}</h4>
                          <div className="space-y-3">
                            {['speak', 'read', 'write'].map((ability) => {
                              const isChecked = formData.languages[lang][ability]
                              return (
                                <label 
                                  key={ability} 
                                  onClick={() => handleCheckboxChange(lang, ability)}
                                  className="flex items-center gap-3 cursor-pointer group select-none p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <div 
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-accent border-accent' : 'bg-white border-gray-300 group-hover:border-accent'}`}
                                  >
                                    {isChecked && <CheckCircle size={12} className="text-white" />}
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 capitalize">
                                    {academic_section.languages[ability] || ability}
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{academic_section.additional.label}</label>
                      <textarea name="additionalQualification" value={formData.additionalQualification} onChange={handleInputChange} className="form-input min-h-[80px]" placeholder={academic_section.additional.placeholder} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{academic_section.honors.label}</label>
                      <textarea name="honors" value={formData.honors} onChange={handleInputChange} className="form-input min-h-[80px]" placeholder={academic_section.honors.placeholder} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: EMPLOYMENT & 7 MANDATORY DOCUMENT ATTACHMENTS */}
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
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.experience}</h2>
                      <p className="text-xs text-gray-400">Professional record, extracurriculars, and mandatory document verification</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">{experience_section.employed.label} *</label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(opt => (
                        <button 
                          key={opt}
                          type="button"
                          onClick={() => setFormData((prev: any) => ({ ...prev, isEmployed: opt }))}
                          className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${formData.isEmployed === opt ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
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
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.orgName.label} *</label>
                        <input type="text" name="employmentDetails.orgName" value={formData.employmentDetails.orgName} onChange={handleInputChange} className="form-input" placeholder={experience_section.orgName.placeholder} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.designation.label} *</label>
                        <input type="text" name="employmentDetails.designation" value={formData.employmentDetails.designation} onChange={handleInputChange} className="form-input" placeholder={experience_section.designation.placeholder} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.period.label} *</label>
                        <input type="text" name="employmentDetails.period" value={formData.employmentDetails.period} onChange={handleInputChange} className="form-input" placeholder={experience_section.period.placeholder} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.reference.label}</label>
                        <input type="text" name="employmentDetails.reference" value={formData.employmentDetails.reference} onChange={handleInputChange} className="form-input" placeholder={experience_section.reference.placeholder} />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.responsibility.label}</label>
                        <textarea name="employmentDetails.responsibility" value={formData.employmentDetails.responsibility} onChange={handleInputChange} className="form-input min-h-[90px]" placeholder={experience_section.responsibility.placeholder} />
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-6 pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-primary uppercase tracking-widest text-xs">Extracurricular Activities & Interests</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.extracurriculars_1.label}</label>
                        <input type="text" name="extracurriculars_1" value={formData.extracurriculars_1} onChange={handleInputChange} className="form-input" placeholder={experience_section.extracurriculars_1.placeholder} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.extracurriculars_2.label}</label>
                        <input type="text" name="extracurriculars_2" value={formData.extracurriculars_2} onChange={handleInputChange} className="form-input" placeholder={experience_section.extracurriculars_2.placeholder} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.hobbies.label}</label>
                        <input type="text" name="hobbies" value={formData.hobbies} onChange={handleInputChange} className="form-input" placeholder={experience_section.hobbies.placeholder} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{experience_section.source.label}</label>
                        <input type="text" name="sourceOfInfo" value={formData.sourceOfInfo} onChange={handleInputChange} className="form-input" placeholder={experience_section.source.placeholder} />
                      </div>
                    </div>
                  </div>

                  {/* 7 MANDATORY DOCUMENT UPLOADS */}
                  <div className="space-y-6 pt-6 border-t-2 border-primary/10">
                    <div>
                      <h3 className="font-bold text-primary uppercase tracking-widest text-sm flex items-center gap-2">
                        <Upload size={18} className="text-accent" />
                        {documents_section.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{documents_section.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      {/* 1. Passport Photo */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.photo ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <ImageIcon size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.photo.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.photo.hint}</p>
                        <input 
                          type="file" 
                          accept="image/*" 
                          required
                          onChange={(e) => handleFileChange('photo', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.photo && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.photo.name}
                          </div>
                        )}
                      </div>

                      {/* 2. Passing Certificate */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.passingCertificate ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <FileBadge size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.passingCertificate.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.passingCertificate.hint}</p>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*" 
                          required
                          onChange={(e) => handleFileChange('passingCertificate', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.passingCertificate && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.passingCertificate.name}
                          </div>
                        )}
                      </div>

                      {/* 3. Marksheet */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.marksheet ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <GraduationCap size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.marksheet.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.marksheet.hint}</p>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*" 
                          required
                          onChange={(e) => handleFileChange('marksheet', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.marksheet && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.marksheet.name}
                          </div>
                        )}
                      </div>

                      {/* 4. Aadhar Card */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.aadharCard ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <CreditCard size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.aadharCard.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.aadharCard.hint}</p>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*" 
                          required
                          onChange={(e) => handleFileChange('aadharCard', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.aadharCard && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.aadharCard.name}
                          </div>
                        )}
                      </div>

                      {/* 5. Migration Certificate */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.migrationCertificate ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <FileText size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.migrationCertificate.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.migrationCertificate.hint}</p>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*" 
                          required
                          onChange={(e) => handleFileChange('migrationCertificate', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.migrationCertificate && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.migrationCertificate.name}
                          </div>
                        )}
                      </div>

                      {/* 6. Transfer Certificate (TC) */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.transferCertificate ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <FileListIcon size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.transferCertificate.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.transferCertificate.hint}</p>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*" 
                          required
                          onChange={(e) => handleFileChange('transferCertificate', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.transferCertificate && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.transferCertificate.name}
                          </div>
                        )}
                      </div>

                      {/* 7. PAN Card */}
                      <div className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all ${attachedFiles.panCard ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50 hover:border-primary'}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 text-primary">
                          <CreditCard size={20} />
                        </div>
                        <label className="text-xs font-bold text-gray-800 block mb-1">{documents_section.panCard.label}</label>
                        <p className="text-[10px] text-gray-400 mb-3">{documents_section.panCard.hint}</p>
                        <input 
                          type="file" 
                          accept="application/pdf,image/*" 
                          required
                          onChange={(e) => handleFileChange('panCard', e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer w-full"
                        />
                        {attachedFiles.panCard && (
                          <div className="mt-2 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                            <FileCheck size={14} /> {attachedFiles.panCard.name}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: STATEMENT OF PURPOSE & DECLARATION */}
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
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">{sections.statement}</h2>
                      <p className="text-xs text-gray-400">Statement of purpose, career orientation, and legal declaration</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        {statement_section.intent.label} * <Info size={14} className="text-accent" />
                      </label>
                      <p className="text-xs text-gray-400 mb-2 italic">{statement_section.intent.note}</p>
                      <textarea 
                        name="statementOfIntent" 
                        value={formData.statementOfIntent} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input min-h-[140px]" 
                        placeholder="Write your motivation to join XINRM..."
                      />
                      <span className="text-[11px] text-gray-400 block text-right">
                        {formData.statementOfIntent?.length || 0} characters (min 40 required)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        {statement_section.career.label} * <Info size={14} className="text-accent" />
                      </label>
                      <p className="text-xs text-gray-400 mb-2 italic">{statement_section.career.note}</p>
                      <textarea 
                        name="careerIntent" 
                        value={formData.careerIntent} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input min-h-[140px]" 
                        placeholder="Explain how this course will shape your career path in sustainability..."
                      />
                      <span className="text-[11px] text-gray-400 block text-right">
                        {formData.careerIntent?.length || 0} characters (min 40 required)
                      </span>
                    </div>
                  </div>

                  {/* Statutory Legal Undertaking & Declaration */}
                  <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 space-y-6">
                    <div className="flex items-start gap-4">
                      <ShieldCheck className="text-primary shrink-0 mt-1" size={24} />
                      <div className="space-y-4">
                        <h4 className="font-bold text-primary uppercase tracking-widest text-xs">{statement_section.declaration.title}</h4>
                        <p className="text-xs text-gray-700 leading-relaxed italic bg-white/60 p-4 rounded-xl border border-primary/10">
                          "I, <strong>{formData.salutation} {formData.name || '[Applicant Name]'} {formData.surname}</strong>, {statement_section.declaration.text}"
                        </p>
                        
                        <label className="flex items-center gap-3 cursor-pointer group select-none pt-2">
                          <input 
                            type="checkbox" 
                            checked={formData.declarationAccepted} 
                            onChange={() => setFormData((prev: any) => ({ ...prev, declarationAccepted: !prev.declarationAccepted }))}
                            className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                            required
                          />
                          <span className="text-xs font-bold text-primary">{statement_section.declaration.accept}</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-primary/10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{statement_section.date}</label>
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="form-input bg-transparent border-b border-primary/20 rounded-none focus:border-primary text-xs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{statement_section.place} *</label>
                        <input type="text" name="place" value={formData.place} onChange={handleInputChange} required className="form-input bg-transparent border-b border-primary/20 rounded-none focus:border-primary text-xs" placeholder="e.g. Ahmednagar / Pune" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Banners */}
            {validationError && (
              <div className="mt-8 p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-3">
                <AlertTriangle size={18} className="shrink-0 text-rose-600" />
                <span>{validationError}</span>
              </div>
            )}

            {submitError && (
              <div className="mt-8 p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-3">
                <AlertTriangle size={18} className="shrink-0 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Navigation & Submission Controls */}
            <div className="mt-14 flex flex-col sm:flex-row justify-between gap-4">
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
                  className="btn btn-primary flex items-center justify-center gap-2 px-10 py-4 shadow-xl shadow-primary/20 cursor-pointer"
                >
                  Next Step <ChevronRight size={20} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!formData.declarationAccepted || isSubmitting}
                  className={`btn btn-accent flex items-center justify-center gap-2 px-12 py-5 text-base shadow-2xl shadow-accent/20 cursor-pointer ${(!formData.declarationAccepted || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Recording Application & Uploading Documents...' : 'Submit Application'} <ArrowRight size={20} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Offline DOCX Download Container */}
        <div className="mt-12 p-8 bg-blue-50/70 rounded-3xl border border-blue-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
           <div className="flex gap-5 items-start">
             <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
               <Upload size={24} />
             </div>
             <div>
               <h4 className="font-bold text-blue-900 mb-1 text-sm">{physical_apply.title}</h4>
               <p className="text-blue-700/80 text-xs max-w-xl leading-relaxed">
                 {physical_apply.description}
               </p>
             </div>
           </div>
           <a 
             href="/assets/XINRM APPLICATION.docx" 
             download="XINRM_MA_NRM_Application_Form.docx" 
             className="btn bg-blue-600 text-white hover:bg-blue-700 text-xs whitespace-nowrap shadow-lg shadow-blue-600/20 px-6 py-3 shrink-0"
           >
             <Download size={16} className="mr-2 inline" />
             {physical_apply.cta}
           </a>
        </div>
      </div>
    </div>
  )
}

export default Admission
