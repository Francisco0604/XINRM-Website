import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Impact from './pages/Impact'
import Study from './pages/Study'
import News from './pages/News'
import Contact from './pages/Contact'
import Admission from './pages/Admission'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import AdmissionsNotice from './pages/AdmissionsNotice'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/study" element={<Study />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/news/admissions-open" element={<AdmissionsNotice />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
