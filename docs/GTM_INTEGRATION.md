# Google Tag Manager Integration Documentation

## Overview

This document describes the Google Tag Manager (GTM) integration implemented for the Plagim luxury swimming pool website. The integration includes consent management, analytics tracking, and pool business-specific event tracking.

## Features Implemented

### 1. **GTM Setup with Consent Management**

- ✅ Google Tag Manager initialization with consent mode
- ✅ Cookie consent modal with Hebrew/English support
- ✅ Consent preferences storage in localStorage
- ✅ GDPR-compliant consent management

### 2. **Analytics Configuration**

- ✅ Page view tracking
- ✅ Custom event tracking
- ✅ Conversion tracking for pool business
- ✅ User interaction tracking

### 3. **Consent Management**

- ✅ Granular consent options (Analytics, Marketing, Functional, Necessary)
- ✅ Consent persistence across sessions
- ✅ RTL/LTR support for Hebrew/English
- ✅ Modern UI with glassmorphism design

### 4. **Pool Business Tracking**

- ✅ Project view tracking
- ✅ Quote request tracking
- ✅ Contact form submissions
- ✅ Phone call tracking
- ✅ Email click tracking
- ✅ Gallery interactions
- ✅ Service page views
- ✅ Language switching tracking
- ✅ Device usage tracking

## Files Created/Modified

### New Files:

- `frontend/src/utils/gtm.ts` - Core GTM manager class
- `frontend/src/components/ConsentModal.tsx` - Consent management UI
- `frontend/src/components/GTMProvider.tsx` - GTM provider wrapper
- `frontend/src/hooks/useConsent.tsx` - Consent management hook
- `frontend/src/utils/poolTracking.ts` - Pool business specific tracking

### Modified Files:

- `frontend/src/App.tsx` - Integrated GTM and consent management
- `frontend/src/pages/Contact.tsx` - Added tracking to contact interactions
- `frontend/env.example` - Added GTM environment variables

## Environment Variables

Add these to your `.env` file:

```env
# Google Tag Manager Configuration
VITE_GTM_ID=GTM-XXXXXXX
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_DEBUG=false
```

## Usage Examples

### 1. **Basic Event Tracking**

```typescript
import poolTracking from "../utils/poolTracking";

// Track a quote request
poolTracking.trackQuoteRequest({
  poolType: "infinity",
  budget: 150000,
  location: "Tel Aviv",
  features: ["waterfall", "lighting"],
  contactMethod: "form",
});
```

### 2. **Contact Form Tracking**

```typescript
// Track contact form submission
poolTracking.trackContactForm({
  contactType: "form",
  source: "contact_page",
  poolType: "home",
  location: "Israel",
});
```

### 3. **Phone Call Tracking**

```typescript
// Track phone call clicks
poolTracking.trackPhoneCall("contact_page", "infinity");
```

### 4. **Project View Tracking**

```typescript
// Track project page views
poolTracking.trackProjectView({
  projectId: "project-1",
  projectType: "infinity",
  budget: 200000,
  location: "Herzliya",
  features: ["spa", "waterfall"],
});
```

## Consent Management

### Consent Types:

- **Necessary**: Always active (required for site functionality)
- **Analytics**: For Google Analytics and performance tracking
- **Functional**: For enhanced features and personalization
- **Marketing**: For targeted advertising and marketing

### Consent Flow:

1. User visits site for first time
2. Consent modal appears after 2 seconds
3. User can accept all, reject all, or customize preferences
4. Preferences are stored in localStorage
5. GTM consent is updated accordingly

## GTM Data Layer Events

The integration sends the following events to GTM:

### Standard Events:

- `page_view` - Page navigation tracking
- `conversion` - Business conversions
- `user_interaction` - User engagement

### Pool Business Events:

- `pool_event` - Pool-specific events
- `project_view` - Project page views
- `quote_request` - Quote requests
- `contact_form_submit` - Contact form submissions
- `phone_call` - Phone call clicks
- `email_click` - Email link clicks
- `gallery_interaction` - Image gallery interactions
- `service_view` - Service page views
- `language_switch` - Language changes
- `device_usage` - Device type tracking

## Testing

### 1. **Development Testing**

Set `VITE_GTM_DEBUG=true` in your `.env` file to enable debug mode.

### 2. **Consent Testing**

- Clear localStorage to reset consent
- Test different consent combinations
- Verify GTM consent updates

### 3. **Event Testing**

- Use browser dev tools to verify data layer events
- Check GTM preview mode for event firing
- Test all tracking functions

## GTM Container Setup

### Required Tags:

1. **Google Analytics 4** - For analytics tracking
2. **Google Ads Conversion** - For conversion tracking
3. **Facebook Pixel** - For social media tracking (optional)

### Required Triggers:

1. **Page View** - All pages
2. **Custom Events** - Pool business events
3. **Form Submissions** - Contact forms
4. **Link Clicks** - Phone and email links

### Required Variables:

1. **Page Path** - Current page path
2. **Page Title** - Current page title
3. **Pool Type** - Type of pool (from events)
4. **Budget Range** - Customer budget range
5. **Location** - Customer location

## Privacy Compliance

### GDPR Compliance:

- ✅ Explicit consent before tracking
- ✅ Granular consent options
- ✅ Easy consent withdrawal
- ✅ Clear privacy information

### Data Minimization:

- Only tracks necessary business metrics
- No personal data collection
- Anonymous user tracking only

## Next Steps

1. **Provide GTM Container ID**: Add your actual GTM container ID to environment variables
2. **Configure GTM Tags**: Set up GA4, conversion tracking, and other tags
3. **Test in Production**: Verify all tracking works in production environment
4. **Monitor Performance**: Check GTM dashboard for data collection
5. **Optimize Events**: Refine tracking based on business needs

## Support

For questions about the GTM integration:

- Check browser console for error messages
- Verify environment variables are set correctly
- Test consent flow in incognito mode
- Use GTM preview mode for debugging

## Files Structure

```
frontend/src/
├── utils/
│   ├── gtm.ts              # Core GTM manager
│   └── poolTracking.ts     # Pool business tracking
├── components/
│   ├── ConsentModal.tsx    # Consent UI
│   └── GTMProvider.tsx    # GTM wrapper
├── hooks/
│   └── useConsent.tsx     # Consent management hook
└── pages/
    └── Contact.tsx        # Example tracking implementation
```
