import * as XLSX from 'xlsx'

/**
 * Strips HTML tags and harmful injection characters to prevent Stored XSS.
 */
export function sanitizeInput(input: string | undefined | null): string {
  if (!input) return ''
  return String(input)
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .trim()
}

/**
 * Calculates current age from a Date of Birth string (YYYY-MM-DD).
 */
export function calculateAge(dobString: string): number | null {
  if (!dobString) return null
  const dob = new Date(dobString)
  if (isNaN(dob.getTime())) return null
  
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age >= 0 ? age : null
}

/**
 * Generates a unique, trackable Application Reference ID.
 */
export function generateReferenceId(): string {
  const year = new Date().getFullYear()
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `XINRM-${year}-${randomSuffix}`
}

/**
 * Builds and downloads a formatted multi-sheet Excel (.xlsx) workbook for the application.
 */
export function generateApplicationExcel(formData: any, refNumber: string): void {
  try {
    const wb = XLSX.utils.book_new()
    
    const fullName = `${formData.salutation || ''} ${formData.name || ''} ${formData.surname || ''}`.trim()

    // Sheet 1: Personal & Identification Information
    const personalRows = [
      ["XAVIER INSTITUTE OF NATURAL RESOURCE MANAGEMENT (XINRM)"],
      ["Recognized by Savitribai Phule Pune University (Maharashtra Public Universities Act 2016, Sec 111)"],
      ["M.A. IN NATURAL RESOURCE MANAGEMENT & SUSTAINABLE DEVELOPMENT"],
      ["OFFICIAL ADMISSION APPLICATION DOSSIER"],
      [],
      ["METADATA FIELD", "VALUE / RECORD"],
      ["Application Reference ID", refNumber],
      ["Submission Date", formData.date || new Date().toISOString().split('T')[0]],
      ["Submission Place", formData.place || "Online Portal"],
      ["Applicant Full Name", fullName],
      ["Salutation / Title", formData.salutation || ""],
      ["First Name", formData.name || ""],
      ["Surname / Last Name", formData.surname || ""],
      ["Father's / Husband's Name", formData.fatherName || ""],
      ["Mother's Name", formData.motherName || ""],
      ["Date of Birth", formData.dob || ""],
      ["Age (Years)", formData.age ? `${formData.age} Years` : ""],
      ["Sex / Gender", formData.sex || ""],
      ["Marital Status", formData.maritalStatus || ""],
      ["Nationality", formData.nationality || ""],
      ["Social Category / Reservation", formData.category || ""],
      ["Hostel Accommodation Required", formData.hostelRequired || ""],
      ["Contact Mobile Number", formData.contactNumber || ""],
      ["Email Address", formData.email || ""],
      ["Aadhaar Identity Number", formData.aadharNo || ""],
      ["Academic Bank of Credits (ABC ID)", formData.abcId || "N/A"],
      ["Present Address", formData.presentAddress || ""],
      ["Permanent Address", formData.permanentAddress || ""]
    ]
    const wsPersonal = XLSX.utils.aoa_to_sheet(personalRows)
    wsPersonal['!cols'] = [{ wch: 32 }, { wch: 60 }]
    XLSX.utils.book_append_sheet(wb, wsPersonal, "1. Personal Profile")

    // Sheet 2: Academic Qualifications
    const academicRows: any[][] = [
      ["ACADEMIC QUALIFICATIONS RECORD (Starting with SSC)"],
      [],
      ["Exam / Degree", "School / College / Institute", "Board / University", "Passing Year", "Percentage / CGPA (%)"],
      ...formData.qualifications.map((q: any) => [
        q.exam || "",
        q.institute || "",
        q.board || "",
        q.year || "",
        q.percentage ? `${q.percentage}%` : ""
      ]),
      [],
      ["SUPPLEMENTARY ACADEMIC DETAILS", ""],
      ["Additional Qualifications / Certifications", formData.additionalQualification || "None"],
      ["Prizes, Honors, Scholarships & Awards", formData.honors || "None"]
    ]
    const wsAcademic = XLSX.utils.aoa_to_sheet(academicRows)
    wsAcademic['!cols'] = [{ wch: 25 }, { wch: 35 }, { wch: 30 }, { wch: 15 }, { wch: 20 }]
    XLSX.utils.book_append_sheet(wb, wsAcademic, "2. Academic Record")

    // Sheet 3: Languages & Employment
    const expRows: any[][] = [
      ["LANGUAGE PROFICIENCY MATRIX"],
      ["Language", "Speak", "Read", "Write"],
      ...Object.entries(formData.languages || {}).map(([lang, abilities]: [string, any]) => [
        lang.toUpperCase(),
        abilities.speak ? "YES" : "NO",
        abilities.read ? "YES" : "NO",
        abilities.write ? "YES" : "NO"
      ]),
      [],
      ["PROFESSIONAL EMPLOYMENT RECORD", ""],
      ["Presently Employed", formData.isEmployed || "No"]
    ]

    if (formData.isEmployed === 'Yes') {
      expRows.push(
        ["Organization Name & Address", formData.employmentDetails?.orgName || "N/A"],
        ["Designation / Role", formData.employmentDetails?.designation || "N/A"],
        ["Working Period / Experience", formData.employmentDetails?.period || "N/A"],
        ["Official Reference", formData.employmentDetails?.reference || "N/A"],
        ["Key Responsibilities & Achievements", formData.employmentDetails?.responsibility || "N/A"]
      )
    }

    expRows.push(
      [],
      ["EXTRACURRICULARS & PERSONAL INTERESTS", ""],
      ["Extracurricular Activity 1", formData.extracurriculars_1 || formData.extracurriculars || "None stated"],
      ["Extracurricular Activity 2", formData.extracurriculars_2 || "None stated"],
      ["Hobbies & Personal Interests", formData.hobbies || "None stated"],
      ["Information Source for this Course", formData.sourceOfInfo || "Website"]
    )

    const wsExp = XLSX.utils.aoa_to_sheet(expRows)
    wsExp['!cols'] = [{ wch: 35 }, { wch: 50 }]
    XLSX.utils.book_append_sheet(wb, wsExp, "3. Experience & Languages")

    // Sheet 4: Statements & Statutory Declaration
    const stmtRows = [
      ["STATEMENTS OF PURPOSE & LEGAL DECLARATION"],
      [],
      ["SECTION", "CANDIDATE STATEMENT"],
      ["Desire to Pursue this Course (Statement of Intent)", formData.statementOfIntent || ""],
      ["Career Utilization Intent", formData.careerIntent || ""],
      [],
      ["STATUTORY DECLARATION STATUS", formData.declarationAccepted ? "ACCEPTED & CONFIRMED BY APPLICANT" : "NOT ACCEPTED"],
      ["Declaration Text", `I, ${fullName}, hereby declare that the information furnished in this Application Form is complete and true. I have also noted that I will be called for tests and/or personal interview based on the information provided therein, as above. I also agree that the institute has the right to cancel my candidature, if the institute finds that any information provided therein is incomplete, false or misleading or ineligibility being detected before or after the admission.`],
      ["Applicant Digital Signature Name", fullName],
      ["Date of Submission", formData.date || ""],
      ["Place of Submission", formData.place || ""]
    ]
    const wsStmt = XLSX.utils.aoa_to_sheet(stmtRows)
    wsStmt['!cols'] = [{ wch: 35 }, { wch: 75 }]
    XLSX.utils.book_append_sheet(wb, wsStmt, "4. Statements & Undertaking")

    // Export file
    const sanitizedCandidateName = (formData.name || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_')
    XLSX.writeFile(wb, `XINRM_Application_${refNumber}_${sanitizedCandidateName}.xlsx`)
  } catch (error) {
    console.error('Failed to generate Excel file:', error)
  }
}
