# Railway Environment Variables Template
# Copy these to your Railway project settings

# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Node Environment
NODE_ENV=production

# Port (Railway will set this automatically)
PORT=3000

# CORS Origins (add your frontend domain)
CORS_ORIGIN=https://your-frontend-domain.railway.app

# Email Configuration (if using contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (if using caching)
REDIS_URL=redis://username:password@host:port

# Google Tag Manager (optional)
GTM_ID=GTM-XXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX
