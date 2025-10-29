import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import poolTracking from '../utils/poolTracking'

const Contact: React.FC = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    poolType: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track contact form submission
    poolTracking.trackContactForm({
      contactType: 'form',
      source: 'contact_page',
      poolType: formData.poolType,
      location: 'Israel' // You can make this dynamic
    })
    
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing bg-neutral-50">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-section mb-8">{t('contact.title')}</h1>
            <p className="text-luxury">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-spacing">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card-luxury">
              <h2 className="text-3xl font-semibold mb-8">{t('contact.sendMessage')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder={t('contact.fullName')}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('contact.phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder={t('contact.phoneNumber')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder={t('contact.emailAddress')}
                  />
                </div>

                <div>
                  <label htmlFor="poolType" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.poolType')}
                  </label>
                  <select
                    id="poolType"
                    name="poolType"
                    value={formData.poolType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">{t('contact.poolType')}</option>
                    <option value="home">{t('poolTypes.home')}</option>
                    <option value="infinity">{t('poolTypes.infinity')}</option>
                    <option value="fiberglass">{t('poolTypes.fiberglass')}</option>
                    <option value="concrete">{t('poolTypes.concrete')}</option>
                    <option value="commercial">{t('poolTypes.commercial')}</option>
                    <option value="spa">{t('poolTypes.spa')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder={t('contact.message')}
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  {t('contact.submit')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-luxury">
                <h3 className="text-2xl font-semibold mb-6">{t('contact.contactInfo')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{t('contact.phoneLabel')}</h4>
                      <p className="text-neutral-600">{t('contact.phoneNumber')}</p>
                      <p className="text-sm text-neutral-500">{t('contact.phoneHours')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{t('contact.emailLabel')}</h4>
                      <p className="text-neutral-600">{t('contact.emailAddress')}</p>
                      <p className="text-sm text-neutral-500">{t('contact.emailResponse')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{t('contact.addressLabel')}</h4>
                      <p className="text-neutral-600">{t('contact.address')}</p>
                      <p className="text-sm text-neutral-500">{t('contact.mailingAddress')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-pool">
                <h3 className="text-xl font-semibold mb-4">{t('contact.customerService')}</h3>
                <p className="text-neutral-600 mb-4">
                  {t('contact.customerServiceDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:073-7761900" 
                    className="btn-primary flex-1 text-center"
                    onClick={() => poolTracking.trackPhoneCall('contact_page')}
                  >
                    {t('contact.callNow')}
                  </a>
                  <a 
                    href="mailto:plagim1@gmail.com" 
                    className="btn-secondary flex-1 text-center"
                    onClick={() => poolTracking.trackEmailClick('contact_page')}
                  >
                    {t('contact.sendEmail')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
