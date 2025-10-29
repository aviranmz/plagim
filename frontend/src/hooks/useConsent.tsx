import { useState, useEffect } from 'react'
import gtmManager, { ConsentPreferences } from '../utils/gtm'

export const useConsent = () => {
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
    functional: false,
    necessary: true
  })

  // Check if consent has been given on mount
  useEffect(() => {
    const hasConsent = gtmManager.hasConsent()
    const savedPreferences = gtmManager.getConsentPreferences()
    
    setConsentGiven(hasConsent)
    setPreferences(savedPreferences)

    // If no consent given, show modal after a short delay
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setShowConsentModal(true)
      }, 2000) // Show after 2 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  // Handle consent acceptance
  const handleConsentAccept = (newPreferences: ConsentPreferences) => {
    gtmManager.updateConsent(newPreferences)
    setPreferences(newPreferences)
    setConsentGiven(true)
    setShowConsentModal(false)
  }

  // Handle consent modal close
  const handleConsentClose = () => {
    setShowConsentModal(false)
  }

  // Update consent preferences
  const updateConsent = (newPreferences: Partial<ConsentPreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences }
    gtmManager.updateConsent(updatedPreferences)
    setPreferences(updatedPreferences)
  }

  // Reset consent (for testing or user request)
  const resetConsent = () => {
    localStorage.removeItem('gtm-consent')
    setConsentGiven(false)
    setPreferences({
      analytics: false,
      marketing: false,
      functional: false,
      necessary: true
    })
    setShowConsentModal(true)
  }

  return {
    showConsentModal,
    consentGiven,
    preferences,
    handleConsentAccept,
    handleConsentClose,
    updateConsent,
    resetConsent
  }
}
