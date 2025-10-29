import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gtmManager from '../utils/gtm'

interface GTMProviderProps {
  children: React.ReactNode
  gtmId?: string
  gaId?: string
  debug?: boolean
}

const GTMProvider: React.FC<GTMProviderProps> = ({ 
  children, 
  gtmId, 
  gaId, 
  debug = false 
}) => {
  const location = useLocation()

  // Initialize GTM when component mounts
  useEffect(() => {
    if (gtmId) {
      gtmManager.initialize({
        gtmId,
        gaId,
        debug
      })

      // Load any saved consent preferences
      gtmManager.loadSavedConsent()
    }
  }, [gtmId, gaId, debug])

  // Track page views on route changes
  useEffect(() => {
    if (gtmId) {
      gtmManager.trackPageView(location.pathname + location.search)
    }
  }, [location, gtmId])

  return <>{children}</>
}

export default GTMProvider
