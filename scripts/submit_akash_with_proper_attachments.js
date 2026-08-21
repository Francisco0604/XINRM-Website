import fs from 'fs';

async function submitAkashWithAttachments() {
  const photoBuf = fs.readFileSync('scripts/test_assets/test_passport_photo.png');
  const degreeBuf = fs.readFileSync('scripts/test_assets/test_degree_marksheet.pdf');
  const categoryBuf = fs.readFileSync('scripts/test_assets/test_category_certificate.pdf');

  const formData = new FormData();
  
  formData.append("_subject", "🎓 NEW M.A. ADMISSION APPLICATION (WITH ATTACHMENTS): Akash Gaikwad [XINRM-2026-AG772]");
  formData.append("Application_Reference_ID", "XINRM-2026-AG772");
  formData.append("Full_Name", "Mr. Akash Gaikwad");
  formData.append("Salutation", "Mr.");
  formData.append("First_Name", "Akash");
  formData.append("Surname", "Gaikwad");
  formData.append("Father_Name", "Suresh Gaikwad");
  formData.append("Mother_Name", "Rekha Gaikwad");
  formData.append("Date_of_Birth", "2000-08-14");
  formData.append("Age", "25 Years");
  formData.append("Gender", "Male");
  formData.append("Marital_Status", "Single");
  formData.append("Nationality", "Indian");
  formData.append("Contact_Number", "+91 9822334455");
  formData.append("Email_Address", "akash.gaikwad.demo@gmail.com");
  formData.append("Aadhaar_Number", "8765 4321 0987");
  formData.append("ABC_ID", "123456789012");
  formData.append("Category", "SC (Scheduled Caste)");
  formData.append("Hostel_Required", "Yes (Campus Accommodation Required)");
  formData.append("Present_Address", "House No. 42, Anand Nagar, Savedi, Ahmednagar, Maharashtra - 414003");
  formData.append("Permanent_Address", "House No. 42, Anand Nagar, Savedi, Ahmednagar, Maharashtra - 414003");
  
  formData.append("Academic_Qualifications", [
    "#1 [S.S.C. (10th)]: Sacred Heart High School, Ahmednagar | Maharashtra State Board | Year: 2016 | 89.20%",
    "#2 [H.S.C. (12th)]: New Arts, Commerce & Science College, Ahmednagar | State Board | Year: 2018 | 85.60%",
    "#3 [B.Sc. Botany & Environmental Science]: Savitribai Phule Pune University (SPPU) | Year: 2022 | 81.40%"
  ].join("\n"));
  
  formData.append("Additional_Qualifications", "Certificate Course in Watershed Hydrology, Soil Conservation & GIS Mapping (MPKV Rahuri)");
  formData.append("Honors_and_Scholarships", "Government of Maharashtra Social Welfare Post-Matric Merit Scholarship (2020)");
  formData.append("Languages_Known", "English (Speak, Read, Write), Marathi (Speak, Read, Write), Hindi (Speak, Read, Write)");
  formData.append("Employment_Status", "Presently Employed (Yes)");
  formData.append("Employment_Details", "Organization: Social Centre Watershed Field Unit, Ahmednagar | Designation: Assistant Field Coordinator | Period: July 2022 - Present (3+ Years) | Supervisor / Reference: Fr. Siju Varghese (Director) | Responsibilities: Community mobilization for participatory check-dam desiltation, farm pond construction, and training women Self-Help Groups in organic vermicomposting.");
  formData.append("Extracurricular_Activities", "1. SPPU NSS Camp Team Leader (2021) | 2. Ahmednagar District Environmental Science Exhibition Winner");
  formData.append("Hobbies", "Trekking in Sahyadri, Traditional Agro-ecology, Documentary Photography");
  formData.append("Source_of_Information", "Social Centre Campus Notice & XINRM Website");
  formData.append("Statement_of_Intent", "Having worked closely with rural farming communities facing acute seasonal water stress in Ahmednagar, I have seen first-hand the vital role of grassroots watershed restoration initiated by Fr. Hermann Bacher. I wish to pursue the M.A. in Natural Resource Management and Sustainable Development at XINRM to gain advanced scientific mastery in hydrology, GIS mapping, and participatory policy to lead sustainable climate resilience programs across rural Maharashtra.");
  formData.append("Career_Intent", "Following the completion of my M.A. degree, I aim to work as a Senior Project Officer in rural development institutions, CSR foundations, and research centers to implement decentralized rainwater harvesting models and sustainable land stewardship.");
  formData.append("Declaration_Status", "ACCEPTED & DIGITALLY SIGNED BY APPLICANT");
  formData.append("Submission_Date", "2026-08-21");
  formData.append("Submission_Place", "Ahmednagar");

  // FormSubmit requires the key to be "attachment" or "attachment[]"
  const photoBlob = new Blob([photoBuf], { type: 'image/png' });
  formData.append("attachment", photoBlob, "akash_gaikwad_passport_photo.png");

  const degreeBlob = new Blob([degreeBuf], { type: 'application/pdf' });
  formData.append("attachment", degreeBlob, "bsc_degree_marksheet_sppu.pdf");

  const categoryBlob = new Blob([categoryBuf], { type: 'application/pdf' });
  formData.append("attachment", categoryBlob, "category_caste_certificate_self_attested.pdf");

  console.log("Submitting Akash Gaikwad application with real 'attachment' files...");

  try {
    const res = await fetch("https://formsubmit.co/ajax/xinrmsocialcentre50@gmail.com", {
      method: "POST",
      body: formData,
      headers: {
        "Origin": "https://xinrm.edu.in",
        "Referer": "https://xinrm.edu.in/admission",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    const data = await res.json();
    console.log("=== SUBMISSION RESPONSE ===");
    console.log("HTTP Status:", res.status);
    console.log("Response Body:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Submission Request Error:", err);
  }
}

submitAkashWithAttachments();
