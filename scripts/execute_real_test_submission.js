import fs from 'fs';

async function runTestSubmission() {
  const photoBuf = fs.readFileSync('scripts/test_assets/test_passport_photo.png');
  const degreeBuf = fs.readFileSync('scripts/test_assets/test_degree_marksheet.pdf');
  const categoryBuf = fs.readFileSync('scripts/test_assets/test_category_certificate.pdf');

  const formData = new FormData();
  
  formData.append("access_key", "0c11516f-d748-43bb-bb85-021c4355ec6b");
  formData.append("subject", "🎓 Real Candidate Test Application: Mr. Rahul Sharma [XINRM-2026-T89B2]");
  formData.append("from_name", "XINRM Official Admissions Portal");
  formData.append("to", "xinrmsocialcentre50@gmail.com");
  formData.append("form-name", "admission");
  formData.append("applicationRefId", "XINRM-2026-T89B2");
  formData.append("fullName", "Mr. Rahul Sharma");
  formData.append("salutation", "Mr.");
  formData.append("name", "Rahul");
  formData.append("surname", "Sharma");
  formData.append("fatherName", "Rajesh Sharma");
  formData.append("motherName", "Sunita Sharma");
  formData.append("dob", "2001-05-15");
  formData.append("age", "25 Years");
  formData.append("sex", "Male");
  formData.append("maritalStatus", "Single");
  formData.append("nationality", "Indian");
  formData.append("email", "xinrmsocialcentre50@gmail.com");
  formData.append("contactNumber", "9876543210");
  formData.append("aadharNo", "987654321098");
  formData.append("abcId", "123456789012");
  formData.append("category", "General");
  formData.append("hostelRequired", "Yes (Require campus hostel)");
  formData.append("presentAddress", "Flat 204, Green Meadows, Savedi, Ahmednagar, Maharashtra - 414003");
  formData.append("permanentAddress", "Flat 204, Green Meadows, Savedi, Ahmednagar, Maharashtra - 414003");
  
  formData.append("qualifications", [
    "#1 [S.S.C. (10th)]: Institute: St. Xavier High School | Board: Maharashtra State Board | Year: 2017 | Score: 88.40%",
    "#2 [H.S.C. (12th)]: Institute: Fergusson College Pune | Board: State Board | Year: 2019 | Score: 84.20%",
    "#3 [Bachelor of Science (Agriculture)]: Institute: MPKV Rahuri | Board: SPPU | Year: 2023 | Score: 82.50%"
  ].join("\n"));
  
  formData.append("additionalQualification", "Certificate Course in Remote Sensing, GIS & Watershed Mapping (ISRO IIRS, Dehradun)");
  formData.append("honors", "State Government Merit Scholarship for Academic Distinction in Agriculture (2022)");
  formData.append("languages", "ENGLISH (speak, read, write), HINDI (speak, read, write), MARATHI (speak, read, write)");
  formData.append("isEmployed", "Yes");
  formData.append("employmentDetails", "Organization: Watershed Organization Trust (WOTR) | Designation: Junior Field Associate | Period: June 2023 - Present (2 Years) | Ref: Dr. A. Patil, Project Coordinator (9822001122) | Roles: Supervised participatory groundwater monitoring, micro-irrigation trials, and farmer self-help group capacity building.");
  formData.append("hobbies", "Trekking in Western Ghats, Native Agroforestry, Documentary Photography");
  formData.append("extracurriculars", "1. National Service Scheme (NSS) Camp Coordinator (2022) | 2. State-level Inter-collegiate Environmental Debate (First Prize)");
  formData.append("sourceOfInfo", "XINRM Official Website & Social Centre Alumni Network");
  formData.append("statementOfIntent", "I possess a dedicated commitment to community-driven natural resource governance and climate adaptation. Having witnessed the transformative 50-year watershed legacy initiated by Fr. Hermann Bacher and Social Centre across Ahmednagar, I wish to undertake rigorous multidisciplinary training under XINRM to advance decentralized water management and sustainable land practices in semi-arid ecosystems.");
  formData.append("careerIntent", "Following the completion of my M.A. in Natural Resource Management and Sustainable Development, I intend to lead field research and project implementation for international developmental foundations, CSR rural initiatives, and state agricultural departments to foster climate-resilient farming communities.");
  formData.append("declarationAccepted", "YES (Confirmed by Applicant)");
  formData.append("date", "2026-08-21");
  formData.append("place", "Ahmednagar");

  // Attach real blank mock documents
  const photoBlob = new Blob([photoBuf], { type: 'image/png' });
  formData.append("attachment", photoBlob, "applicant_passport_photo.png");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    console.log("=== SUBMISSION RESULT ===");
    console.log("Status Code:", res.status);
    const text = await res.text();
    console.log("Raw Response:", text);
  } catch (err) {
    console.error("Submission Error:", err);
  }
}

runTestSubmission();
