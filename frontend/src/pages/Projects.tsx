import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import poolTracking from '../utils/poolTracking'
import { realProjects } from '../data/realProjects'

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const projects = realProjects

  const handleProjectClick = (projectId: number) => {
    // Track project click
    poolTracking.trackProjectView({
      projectId: projectId.toString(),
      projectType: 'infinity', // You can make this dynamic based on project data
      location: 'Israel'
    })
    
    // Navigate to project detail page
    navigate(`/project/${projectId}`)
  }

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/8.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-cyan-700/70"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-5xl mx-auto animate-slide-up">
            <h1 className="heading-hero mb-8">
              {t('projects.title')}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {t('projects.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/contact" className="btn-luxury animate-glow">
                {t('navigation.getQuote')}
              </Link>
              <Link to="/contact" className="btn-secondary">
                {t('cta.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Projects Grid */}
      <section className="section-spacing bg-gradient-to-b from-gray-50 to-white relative">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/about.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-20">
            <h2 className="heading-section mb-8">{t('projects.title')}</h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                id={`project-${project.id}`}
                className="card-luxury group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="relative mb-6 overflow-hidden rounded-3xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {i18n.language === 'he' ? project.type : project.typeEn}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="heading-modern text-gray-900 group-hover:text-blue-600 transition-colors">
                    {i18n.language === 'he' ? project.title : project.titleEn}
                  </h3>
                  <p className="text-modern text-gray-700 leading-relaxed">
                    {i18n.language === 'he' ? project.description : project.descriptionEn}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {(i18n.language === 'he' ? project.features : project.featuresEn).slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <button className="btn-primary w-full group-hover:bg-blue-700 transition-colors">
                      {t('common.viewMore')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury text-center text-white relative z-10">
          <h2 className="heading-section mb-8">{t('projects.wantToSeeMore')}</h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {t('projects.wantToSeeMoreDesc')}
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

export default Projects