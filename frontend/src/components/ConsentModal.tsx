import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ConsentPreferences } from '../utils/gtm'

interface ConsentModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: (preferences: ConsentPreferences) => void
}

const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onAccept }) => {
  const { i18n } = useTranslation()
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
    functional: false,
    necessary: true
  })

  const isRTL = i18n.language === 'he'

  const handlePreferenceChange = (key: keyof ConsentPreferences, value: boolean) => {
    if (key === 'necessary') return // Cannot change necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      analytics: true,
      marketing: true,
      functional: true,
      necessary: true
    }
    setPreferences(allAccepted)
    onAccept(allAccepted)
  }

  const handleAcceptSelected = () => {
    onAccept(preferences)
  }

  const handleRejectAll = () => {
    const minimalConsent = {
      analytics: false,
      marketing: false,
      functional: false,
      necessary: true
    }
    setPreferences(minimalConsent)
    onAccept(minimalConsent)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isRTL ? 'הסכמה לשימוש בעוגיות' : 'Cookie Consent'}
            </h2>
            <p className="text-gray-600">
              {isRTL 
                ? 'אנו משתמשים בעוגיות כדי לשפר את החוויה שלכם באתר שלנו'
                : 'We use cookies to improve your experience on our website'
              }
            </p>
          </div>

          {/* Cookie Types */}
          <div className="space-y-6 mb-8">
            {/* Necessary Cookies */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isRTL ? 'עוגיות נדרשות' : 'Necessary Cookies'}
                </h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    {isRTL ? 'תמיד פעיל' : 'Always Active'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'עוגיות אלה נדרשות לפעולת האתר הבסיסית ולא ניתן לבטל אותן'
                  : 'These cookies are essential for the website to function and cannot be disabled'
                }
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isRTL ? 'עוגיות אנליטיקה' : 'Analytics Cookies'}
                </h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'עוגיות אלה עוזרות לנו להבין איך המבקרים משתמשים באתר'
                  : 'These cookies help us understand how visitors use our website'
                }
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isRTL ? 'עוגיות פונקציונליות' : 'Functional Cookies'}
                </h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'עוגיות אלה מאפשרות פונקציות משופרות ואישיות'
                  : 'These cookies enable enhanced functionality and personalization'
                }
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isRTL ? 'עוגיות שיווק' : 'Marketing Cookies'}
                </h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'עוגיות אלה משמשות לפרסום ממוקד ושיווק'
                  : 'These cookies are used for targeted advertising and marketing'
                }
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRejectAll}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 transition-colors font-medium"
            >
              {isRTL ? 'דחה הכל' : 'Reject All'}
            </button>
            <button
              onClick={handleAcceptSelected}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium"
            >
              {isRTL ? 'שמור העדפות' : 'Save Preferences'}
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-colors font-medium"
            >
              {isRTL ? 'קבל הכל' : 'Accept All'}
            </button>
          </div>

          {/* Privacy Policy Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {isRTL ? 'לקריאת מדיניות הפרטיות המלאה, ' : 'For our full privacy policy, '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                {isRTL ? 'לחץ כאן' : 'click here'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsentModal
