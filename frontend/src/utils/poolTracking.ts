// Pool business specific tracking utilities
import gtmManager from './gtm'

export interface PoolProjectData {
  projectId?: string
  projectType?: 'home' | 'infinity' | 'fiberglass' | 'concrete' | 'commercial' | 'spa'
  budget?: number
  location?: string
  features?: string[]
}

export interface ContactData {
  contactType: 'phone' | 'email' | 'form' | 'whatsapp'
  source: string // Which page/form the contact came from
  poolType?: string
  budget?: number
  location?: string
}

export interface QuoteData {
  poolType: string
  budget: number
  location: string
  features: string[]
  contactMethod: string
}

class PoolTracking {
  // Track project page views
  trackProjectView(projectData: PoolProjectData): void {
    gtmManager.trackEvent('project_view', {
      project_id: projectData.projectId,
      project_type: projectData.projectType,
      budget_range: this.getBudgetRange(projectData.budget),
      location: projectData.location,
      features: projectData.features,
      page_path: window.location.pathname
    })
  }

  // Track quote requests
  trackQuoteRequest(quoteData: QuoteData): void {
    gtmManager.trackConversion('quote_request', quoteData.budget, 'ILS')
    
    gtmManager.trackEvent('quote_request', {
      pool_type: quoteData.poolType,
      budget_range: this.getBudgetRange(quoteData.budget),
      location: quoteData.location,
      features: quoteData.features,
      contact_method: quoteData.contactMethod,
      timestamp: new Date().toISOString()
    })
  }

  // Track contact form submissions
  trackContactForm(contactData: ContactData): void {
    gtmManager.trackEvent('contact_form_submit', {
      contact_type: contactData.contactType,
      source: contactData.source,
      pool_type: contactData.poolType,
      budget_range: this.getBudgetRange(contactData.budget),
      location: contactData.location,
      page_path: window.location.pathname
    })
  }

  // Track phone calls
  trackPhoneCall(source: string, poolType?: string): void {
    gtmManager.trackEvent('phone_call', {
      source,
      pool_type: poolType,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    })
  }

  // Track email clicks
  trackEmailClick(source: string, poolType?: string): void {
    gtmManager.trackEvent('email_click', {
      source,
      pool_type: poolType,
      page_path: window.location.pathname
    })
  }

  // Track gallery interactions
  trackGalleryInteraction(interactionType: 'view' | 'download' | 'share', imageId: string, projectId?: string): void {
    gtmManager.trackEvent('gallery_interaction', {
      interaction_type: interactionType,
      image_id: imageId,
      project_id: projectId,
      page_path: window.location.pathname
    })
  }

  // Track service page views
  trackServiceView(serviceType: 'home_pools' | 'infinity_pools' | 'pool_covers' | 'swimming_systems'): void {
    gtmManager.trackEvent('service_view', {
      service_type: serviceType,
      page_path: window.location.pathname
    })
  }

  // Track about page engagement
  trackAboutEngagement(engagementType: 'scroll' | 'video_play' | 'team_view' | 'history_view'): void {
    gtmManager.trackEvent('about_engagement', {
      engagement_type: engagementType,
      page_path: window.location.pathname
    })
  }

  // Track language switching
  trackLanguageSwitch(fromLang: string, toLang: string, page: string): void {
    gtmManager.trackEvent('language_switch', {
      from_language: fromLang,
      to_language: toLang,
      page,
      timestamp: new Date().toISOString()
    })
  }

  // Track mobile vs desktop usage
  trackDeviceUsage(): void {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    
    gtmManager.trackEvent('device_usage', {
      device_type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      user_agent: navigator.userAgent
    })
  }

  // Track scroll depth
  trackScrollDepth(depth: number): void {
    gtmManager.trackEvent('scroll_depth', {
      depth_percentage: depth,
      page_path: window.location.pathname
    })
  }

  // Track time on page
  trackTimeOnPage(timeInSeconds: number): void {
    gtmManager.trackEvent('time_on_page', {
      time_seconds: timeInSeconds,
      page_path: window.location.pathname
    })
  }

  // Track external link clicks
  trackExternalLink(url: string, linkText: string): void {
    gtmManager.trackEvent('external_link_click', {
      url,
      link_text: linkText,
      page_path: window.location.pathname
    })
  }

  // Track social media clicks
  trackSocialClick(platform: 'facebook' | 'instagram' | 'linkedin' | 'youtube', source: string): void {
    gtmManager.trackEvent('social_click', {
      platform,
      source,
      page_path: window.location.pathname
    })
  }

  // Track search functionality (if implemented)
  trackSearch(query: string, resultsCount: number): void {
    gtmManager.trackEvent('search', {
      search_query: query,
      results_count: resultsCount,
      page_path: window.location.pathname
    })
  }

  // Track newsletter signup
  trackNewsletterSignup(source: string): void {
    gtmManager.trackEvent('newsletter_signup', {
      source,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    })
  }

  // Track error events
  trackError(errorType: string, errorMessage: string, page: string): void {
    gtmManager.trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      page_path: page,
      timestamp: new Date().toISOString()
    })
  }

  // Helper function to categorize budget ranges
  private getBudgetRange(budget?: number): string {
    if (!budget) return 'unknown'
    
    if (budget < 50000) return 'under_50k'
    if (budget < 100000) return '50k_100k'
    if (budget < 200000) return '100k_200k'
    if (budget < 500000) return '200k_500k'
    return 'over_500k'
  }

  // Track user journey milestones
  trackUserJourney(milestone: 'first_visit' | 'service_view' | 'project_view' | 'contact_form' | 'quote_request'): void {
    gtmManager.trackEvent('user_journey', {
      milestone,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    })
  }

  // Track A/B test variations (if implemented)
  trackABTest(testName: string, variant: string): void {
    gtmManager.trackEvent('ab_test', {
      test_name: testName,
      variant,
      page_path: window.location.pathname
    })
  }
}

// Create singleton instance
export const poolTracking = new PoolTracking()

// Export for use in components
export default poolTracking
