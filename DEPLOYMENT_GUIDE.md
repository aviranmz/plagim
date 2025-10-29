# Railway Deployment Guide

## Quick Setup

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `aviranmz/plagim` repository

2. **Configure Environment Variables**
   - Go to your Railway project settings
   - Add the following environment variables (see `RAILWAY_ENV_TEMPLATE.md` for details):
     ```
     DATABASE_URL=postgresql://username:password@host:port/database
     JWT_SECRET=your-super-secure-jwt-secret-key-here
     NODE_ENV=production
     ```

3. **Add PostgreSQL Database**
   - In Railway dashboard, click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set the `DATABASE_URL` environment variable

4. **Deploy**
   - Railway will automatically detect the configuration and deploy
   - The backend will be available at your Railway domain

## Frontend Deployment (Optional)

For the frontend, you can either:

### Option A: Deploy Frontend Separately
1. Create a new Railway project for the frontend
2. Set `RAILPACK_SPA_OUTPUT_DIR=frontend/dist` environment variable
3. Set build command: `npm run build:frontend`

### Option B: Use Static Hosting
- Deploy frontend to Vercel, Netlify, or GitHub Pages
- Update `CORS_ORIGIN` in backend environment variables

## Database Setup

After deployment, run database migrations:

```bash
# Connect to your Railway project via Railway CLI
railway login
railway link
railway run npm run db:migrate
```

## Health Check

The backend includes a health check endpoint at `/health` that Railway will use to monitor the service.

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **Database connection fails**: Verify `DATABASE_URL` is set correctly
- **CORS errors**: Update `CORS_ORIGIN` with your frontend domain
- **Port issues**: Railway automatically sets the `PORT` environment variable

## Monitoring

- Check Railway logs for any errors
- Monitor the `/health` endpoint
- Set up alerts in Railway dashboard
