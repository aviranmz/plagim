import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Modern Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/1-14.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-cyan-700/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Modern Geometric Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full animate-float"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 border-2 border-cyan-300/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-white/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Content with Modern Typography */}
        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-5xl mx-auto animate-slide-up">
            <h1 className="heading-hero mb-8">
              <span className="block">{t('hero.title')}</span>
              <span className="block text-cyan-300 mt-4">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto opacity-90">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/contact" className="btn-luxury animate-glow">
                {t('hero.getQuote')}
              </Link>
              <Link to="/projects" className="btn-secondary">
                {t('hero.viewProjects')}
              </Link>
            </div>
          </div>
        </div>

        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-4 bg-white rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Modern Features Section with Glass Cards */}
      <section className="section-spacing bg-gradient-to-b from-blue-50 to-gray-100 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'url(/images/about.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}></div>
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-20">
            <h2 className="heading-section mb-8">{t('about.whyChooseUs')}</h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {t('about.whyDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="card-glass text-center group">
              <div className="relative mb-8">
                <img 
                  src="/images/about.png" 
                  alt="Professionalism" 
                  className="w-40 h-40 mx-auto image-modern object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl"></div>
              </div>
              <h3 className="heading-modern mb-6 text-gray-900">{t('about.professionalism')}</h3>
              <p className="text-modern text-gray-700 leading-relaxed">
                {t('about.professionalismDesc')}
              </p>
            </div>

            <div className="card-glass text-center group">
              <div className="relative mb-8">
                <img 
                  src="/images/more-than.png" 
                  alt="Personal Service" 
                  className="w-40 h-40 mx-auto image-modern object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-3xl"></div>
              </div>
              <h3 className="heading-modern mb-6 text-gray-900">{t('about.personalService')}</h3>
              <p className="text-modern text-gray-700 leading-relaxed">
                {t('about.personalServiceDesc')}
              </p>
            </div>

            <div className="card-glass text-center group">
              <div className="relative mb-8">
                <img 
                  src="/images/slogan.png" 
                  alt="Green Technology" 
                  className="w-40 h-40 mx-auto image-modern object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl"></div>
              </div>
              <h3 className="heading-modern mb-6 text-gray-900">{t('about.greenTechnology')}</h3>
              <p className="text-modern text-gray-700 leading-relaxed">
                {t('about.greenTechnologyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Section with Image Backgrounds */}
      <section className="section-spacing bg-gradient-to-br from-blue-900 to-cyan-800 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/images/2-20.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-20">
            <h2 className="heading-section text-white mb-8">{t('services.title')}</h2>
            <p className="text-luxury text-white/90 max-w-4xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center">
              <div className="relative mb-8 overflow-hidden rounded-3xl">
                <img 
                  src="/images/1.png" 
                  alt="Home Pools" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 image-modern"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">{t('services.homePools')}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{t('services.homePoolsDesc')}</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8 overflow-hidden rounded-3xl">
                <img 
                  src="/images/2.png" 
                  alt="Infinity Pools" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 image-modern"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">{t('services.infinityPools')}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{t('services.infinityPoolsDesc')}</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8 overflow-hidden rounded-3xl">
                <img 
                  src="/images/3.png" 
                  alt="Pool Covers" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 image-modern"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">{t('services.poolCovers')}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{t('services.poolCoversDesc')}</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8 overflow-hidden rounded-3xl">
                <img 
                  src="/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg" 
                  alt="Swimming Systems" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 image-modern"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">{t('services.swimmingSystems')}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{t('services.swimmingSystemsDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Gallery Preview Section */}
      <section className="section-spacing bg-gradient-to-br from-gray-50 to-blue-50 relative">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/images/1-h-1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-8">{t('projects.title')}</h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="/images/1-14.jpg" 
                  alt="Pool Project 1" 
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-bold mb-2">Luxury Home Pool</h3>
                  <p className="text-white/90">Custom designed swimming pool with modern features</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="/images/1-h-1.jpg" 
                  alt="Pool Project 2" 
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-bold mb-2">Infinity Pool Design</h3>
                  <p className="text-white/90">Stunning infinity edge pool with panoramic views</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="/images/2-20.jpg" 
                  alt="Pool Project 3" 
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-bold mb-2">Modern Pool Installation</h3>
                  <p className="text-white/90">Contemporary pool design with advanced technology</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/projects" className="btn-luxury">
              {t('projects.viewMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Modern CTA Section with Image Background */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(/images/8.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury text-center text-white relative z-10">
          <h2 className="heading-section mb-8">{t('cta.readyToStart')}</h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            {t('cta.readyToStartDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/contact" className="btn-luxury animate-glow">
              {t('cta.contactUs')}
            </Link>
            <a href="tel:073-7761900" className="btn-secondary">
              {t('cta.callUs')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
