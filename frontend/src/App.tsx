import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import ProfessionalInfo from './pages/ProfessionalInfo'
import HomePools from './pages/HomePools'
import Architects from './pages/Architects'
import Videos from './pages/Videos'
import Articles from './pages/Articles'
import Accessibility from './pages/Accessibility'
import Contact from './pages/Contact'
import PoolTypes from './pages/PoolTypes'
import InfinityPool from './pages/pool-types/InfinityPool'
import HomePool from './pages/pool-types/HomePool'
import AdminApp from './pages/admin/AdminApp'
import GTMProvider from './components/GTMProvider'
import ConsentModal from './components/ConsentModal'
import ScrollToTop from './components/ScrollToTop'
import { useConsent } from './hooks/useConsent'
import poolTracking from './utils/poolTracking'

function App() {
  const { i18n } = useTranslation()
  const { 
    showConsentModal, 
    consentGiven, 
    handleConsentAccept, 
    handleConsentClose 
  } = useConsent()
  
  // Set HTML direction based on language
  useEffect(() => {
    const isRTL = i18n.language === 'he'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  // Track language switching
  useEffect(() => {
    if (consentGiven) {
      poolTracking.trackLanguageSwitch('initial', i18n.language, window.location.pathname)
    }
  }, [i18n.language, consentGiven])

  // Track device usage on mount
  useEffect(() => {
    if (consentGiven) {
      poolTracking.trackDeviceUsage()
    }
  }, [consentGiven])

  // Get GTM configuration from environment variables
  const gtmId = import.meta.env.VITE_GTM_ID
  const gaId = import.meta.env.VITE_GA_ID
  const debug = import.meta.env.VITE_GTM_DEBUG === 'true'

  return (
    <Router>
      <ScrollToTop />
      <GTMProvider gtmId={gtmId} gaId={gaId} debug={debug}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/projects" element={
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <Projects />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/project/:id" element={
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <ProjectDetail />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/professional-info" element={
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <ProfessionalInfo />
              </main>
              <Footer />
            </div>
          } />
              <Route path="/professional-info/:category" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <ProfessionalInfo />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/home-pools" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <HomePools />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/architects" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <Architects />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/videos" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <Videos />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/articles" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <Articles />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/accessibility" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <Accessibility />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/contact" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <Contact />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/pool-types" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <PoolTypes />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/pool-types/infinity" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <InfinityPool />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/pool-types/home" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <main>
                    <HomePool />
                  </main>
                  <Footer />
                </div>
              } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
        
        {/* Consent Modal */}
        <ConsentModal
          isOpen={showConsentModal}
          onClose={handleConsentClose}
          onAccept={handleConsentAccept}
        />
      </GTMProvider>
    </Router>
  )
}

export default App
