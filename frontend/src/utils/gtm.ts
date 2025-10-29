// Google Tag Manager configuration and consent management
import TagManager from 'react-gtm-module'

export interface ConsentPreferences {
  analytics: boolean
  marketing: boolean
  functional: boolean
  necessary: boolean
}

export interface GTMConfig {
  gtmId: string
  gaId?: string
  debug?: boolean
}

class GTMManager {
  private gtmId: string | null = null
  private isInitialized = false
  private consentGiven = false
  private consentPreferences: ConsentPreferences = {
    analytics: false,
    marketing: false,
    functional: false,
    necessary: true // Always true - necessary cookies
  }

  // Initialize GTM with configuration
  initialize(config: GTMConfig): void {
    if (this.isInitialized) {
      console.warn('GTM already initialized')
      return
    }

    this.gtmId = config.gtmId

    // Initialize GTM with consent mode
    const gtmConfig = {
      gtmId: this.gtmId,
      dataLayer: {
        // Initial consent state
        'gtm.consent': {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'functionality_storage': 'denied',
          'personalization_storage': 'denied',
          'security_storage': 'granted'
        }
      },
      auth: config.debug ? 'debug' : undefined,
      preview: config.debug ? 'env-1' : undefined
    }

    try {
      TagManager.initialize(gtmConfig)
      this.isInitialized = true
      console.log('GTM initialized successfully')
    } catch (error) {
      console.error('Failed to initialize GTM:', error)
    }
  }

  // Update consent preferences
  updateConsent(preferences: Partial<ConsentPreferences>): void {
    this.consentPreferences = { ...this.consentPreferences, ...preferences }
    this.consentGiven = true

    // Update GTM consent
    const consentData = {
      'gtm.consent': {
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'ad_storage': preferences.marketing ? 'granted' : 'denied',
        'functionality_storage': preferences.functional ? 'granted' : 'denied',
        'personalization_storage': preferences.marketing ? 'granted' : 'denied',
        'security_storage': 'granted' // Always granted
      }
    }

    try {
      TagManager.dataLayer(consentData as any)
      console.log('Consent updated:', consentData)
    } catch (error) {
      console.error('Failed to update consent:', error)
    }

    // Store consent preferences in localStorage
    localStorage.setItem('gtm-consent', JSON.stringify(this.consentPreferences))
  }

  // Get current consent preferences
  getConsentPreferences(): ConsentPreferences {
    return { ...this.consentPreferences }
  }

  // Check if consent has been given
  hasConsent(): boolean {
    return this.consentGiven
  }

  // Load saved consent preferences
  loadSavedConsent(): void {
    try {
      const saved = localStorage.getItem('gtm-consent')
      if (saved) {
        const preferences = JSON.parse(saved) as ConsentPreferences
        this.updateConsent(preferences)
      }
    } catch (error) {
      console.error('Failed to load saved consent:', error)
    }
  }

  // Track custom events
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('GTM not initialized')
      return
    }

    if (!this.consentPreferences.analytics) {
      console.log('Analytics consent not given, skipping event:', eventName)
      return
    }

    try {
      TagManager.dataLayer({
        event: eventName,
        ...parameters
      } as any)
      console.log('Event tracked:', eventName, parameters)
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }

  // Track page views
  trackPageView(pagePath: string, pageTitle?: string): void {
    if (!this.isInitialized) {
      console.warn('GTM not initialized')
      return
    }

    if (!this.consentPreferences.analytics) {
      console.log('Analytics consent not given, skipping page view')
      return
    }

    try {
      TagManager.dataLayer({
        event: 'page_view',
        page_path: pagePath,
        page_title: pageTitle || document.title
      } as any)
      console.log('Page view tracked:', pagePath)
    } catch (error) {
      console.error('Failed to track page view:', error)
    }
  }

  // Track conversions (for pool business)
  trackConversion(conversionType: string, value?: number, currency?: string): void {
    if (!this.isInitialized) {
      console.warn('GTM not initialized')
      return
    }

    if (!this.consentPreferences.analytics) {
      console.log('Analytics consent not given, skipping conversion')
      return
    }

    try {
      TagManager.dataLayer({
        event: 'conversion',
        conversion_type: conversionType,
        value: value,
        currency: currency || 'ILS',
        timestamp: new Date().toISOString()
      } as any)
      console.log('Conversion tracked:', conversionType, value)
    } catch (error) {
      console.error('Failed to track conversion:', error)
    }
  }

  // Track pool-specific events
  trackPoolEvent(eventType: 'quote_request' | 'project_view' | 'contact_form' | 'phone_call', details?: Record<string, any>): void {
    this.trackEvent('pool_event', {
      event_type: eventType,
      ...details
    })
  }

  // Track user interactions
  trackInteraction(interactionType: string, element?: string, page?: string): void {
    this.trackEvent('user_interaction', {
      interaction_type: interactionType,
      element: element,
      page: page || window.location.pathname
    })
  }

  // Get GTM status
  getStatus(): { initialized: boolean; consentGiven: boolean; preferences: ConsentPreferences } {
    return {
      initialized: this.isInitialized,
      consentGiven: this.consentGiven,
      preferences: this.getConsentPreferences()
    }
  }
}

// Create singleton instance
export const gtmManager = new GTMManager()

// Export for use in components
export default gtmManager
