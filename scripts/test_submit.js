import https from 'https';

const payload = {
  access_key: "0c11516f-d748-43bb-bb85-021c4355ec6b",
  subject: "🎓 TEST APPLICATION: Rahul Sharma [XINRM-2026-TEST1]",
  from_name: "XINRM Admissions Portal (Verification Test)",
  to: "xinrmsocialcentre50@gmail.com",
  applicationRefId: "XINRM-2026-TEST1",
  fullName: "Mr. Rahul Sharma",
  salutation: "Mr.",
  name: "Rahul",
  surname: "Sharma",
  fatherName: "Rajesh Sharma",
  motherName: "Sunita Sharma",
  dob: "2001-05-15",
  age: "25 Years",
  sex: "Male",
  maritalStatus: "Single",
  nationality: "Indian",
  email: "xinrmsocialcentre50@gmail.com",
  contactNumber: "9876543210",
  aadharNo: "987654321098",
  abcId: "123456789012",
  category: "General",
  hostelRequired: "Yes",
  presentAddress: "Flat 204, Green Meadows, Ahmednagar, Maharashtra - 414001",
  permanentAddress: "Flat 204, Green Meadows, Ahmednagar, Maharashtra - 414001",
  qualifications: "#1 [S.S.C. (10th)]: Institute: St. Xavier High School | Board: State Board | Year: 2017 | Score: 88.40%\n#2 [H.S.C. (12th)]: Institute: Fergusson College | Board: State Board | Year: 2019 | Score: 84.20%\n#3 [B.Sc. Agriculture]: Institute: MPKV Rahuri | Board: SPPU | Year: 2023 | Score: 82.50%",
  additionalQualification: "Certificate in GIS and Watershed Mapping (ISRO IIRS)",
  honors: "State Merit Scholarship for Academic Excellence (2021)",
  languages: "ENGLISH (speak, read, write), HINDI (speak, read, write), MARATHI (speak, read, write)",
  isEmployed: "Yes",
  employmentDetails: "Organization: Watershed Organization Trust (WOTR) | Designation: Junior Field Associate | Period: 2023 - 2025 | Ref: Dr. Patil (9822001122) | Roles: Managed soil moisture monitoring and farmer SHG training.",
  hobbies: "Trekking in Western Ghats, Organic Farming, Nature Photography",
  extracurriculars: "1. NSS Camp Leader (2022) | 2. Inter-college Environmental Debate Winner",
  sourceOfInfo: "XINRM Official Website & Alumni Recommendation",
  statementOfIntent: "I have a deep commitment to sustainable water harvesting and community-led natural resource management. Having observed Social Centre pioneering 50-year grassroots legacy in Ahmednagar, I wish to gain advanced scientific and policy training under XINRM to lead watershed rejuvenation programs in drought-prone regions.",
  careerIntent: "Post completion of my M.A. in Natural Resource Management, I intend to work with leading rural development agencies, CSR foundations, and research institutions to design decentralized water conservation policies and climate-resilient agriculture.",
  declarationAccepted: "YES (Confirmed by Applicant)",
  date: "2026-08-21",
  place: "Ahmednagar"
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'api.web3forms.com',
  port: 443,
  path: '/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://xinrm.edu.in',
    'Referer': 'https://xinrm.edu.in/admission',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log('HTTP STATUS:', res.statusCode);
    console.log('RESPONSE:', body);
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e);
});

req.write(data);
req.end();
