import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import poolTracking from '../utils/poolTracking'
import { realProjects } from '../data/realProjects'
import PhotoGalleryModal from '../components/PhotoGalleryModal'

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const project = realProjects.find(p => p.id === parseInt(id || '0'))
  const isRTL = i18n.language === 'he'

  // Track project view
  useEffect(() => {
    if (project) {
      poolTracking.trackProjectView({
        projectId: project.id.toString(),
        projectType: project.category as 'home' | 'infinity' | 'fiberglass' | 'concrete' | 'commercial' | 'spa',
        budget: project.specifications.budget ? parseInt(project.specifications.budget.replace(/[^\d]/g, '')) / 1000 : undefined,
        location: project.specifications.locationEn,
        features: project.featuresEn
      })
    }
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isRTL ? 'פרויקט לא נמצא' : 'Project Not Found'}
          </h1>
          <Link to="/projects" className="btn-primary">
            {isRTL ? 'חזור לפרויקטים' : 'Back to Projects'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${project.image})`,
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
              {isRTL ? project.title : project.titleEn}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL ? project.description : project.descriptionEn}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/contact" className="btn-luxury animate-glow">
                {t('navigation.getQuote')}
              </Link>
              <Link to="/projects" className="btn-secondary">
                {isRTL ? 'חזור לפרויקטים' : 'Back to Projects'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-spacing bg-gradient-to-b from-gray-50 to-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Info */}
            <div className="space-y-8">
              <div className="card-luxury">
                <h2 className="heading-section mb-6">
                  {isRTL ? 'פרטי הפרויקט' : 'Project Details'}
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      {isRTL ? 'סוג בריכה:' : 'Pool Type:'}
                    </span>
                    <span className="text-gray-900">
                      {isRTL ? project.type : project.typeEn}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      {isRTL ? 'מיקום:' : 'Location:'}
                    </span>
                    <span className="text-gray-900">
                      {isRTL ? project.specifications.location : project.specifications.locationEn}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      {isRTL ? 'תקציב:' : 'Budget:'}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {project.specifications.budget || 'לא צוין'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      {isRTL ? 'הושלם:' : 'Completed:'}
                    </span>
                    <span className="text-gray-900">
                      {project.specifications.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="card-luxury">
                <h3 className="heading-modern mb-6">
                  {isRTL ? 'מפרטים טכניים' : 'Technical Specifications'}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isRTL ? 'גודל:' : 'Size:'}</span>
                    <span className="font-semibold">{project.specifications.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isRTL ? 'עומק:' : 'Depth:'}</span>
                    <span className="font-semibold">{project.specifications.depth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isRTL ? 'נפח:' : 'Volume:'}</span>
                    <span className="font-semibold">{project.specifications.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isRTL ? 'חומרים:' : 'Materials:'}</span>
                    <span className="font-semibold">{project.specifications.materials}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="card-luxury">
                <h3 className="heading-modern mb-6">
                  {isRTL ? 'תכונות מיוחדות' : 'Special Features'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(isRTL ? project.features : project.featuresEn).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="card-luxury">
                <h3 className="heading-modern mb-6">
                  {isRTL ? 'גלריית תמונות' : 'Photo Gallery'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative group cursor-pointer"
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setIsGalleryOpen(true)
                        poolTracking.trackServiceView('photo_gallery' as any)
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`${isRTL ? project.title : project.titleEn} - ${index + 1}`}
                        className="w-full h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => {
                      setCurrentImageIndex(0)
                      setIsGalleryOpen(true)
                      poolTracking.trackServiceView('photo_gallery' as any)
                    }}
                    className="btn-secondary"
                  >
                    {isRTL ? 'צפה בכל התמונות' : 'View All Photos'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury text-center text-white relative z-10">
          <h2 className="heading-section mb-8">
            {isRTL ? 'רוצה בריכה דומה?' : 'Want a Similar Pool?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'צור איתנו קשר לקבלת הצעת מחיר מותאמת אישית לבריכת החלומות שלך'
              : 'Contact us for a personalized quote for your dream pool'
            }
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

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={project.gallery}
        currentIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
        projectTitle={isRTL ? project.title : project.titleEn}
      />
    </div>
  )
}

export default ProjectDetail
