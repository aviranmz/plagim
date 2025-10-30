# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
ENV NODE_ENV=production \
    HUSKY=0 \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

# OS deps for native modules like sharp
RUN apk add --no-cache libc6-compat

# Copy minimal manifests first for better caching
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json

# Install all workspace deps in one shot (uses npm workspaces)
RUN npm ci --include=dev --ignore-scripts

# Copy backend first so image copy can target existing folder, then build frontend
WORKDIR /app/backend
COPY backend .

# Build frontend and copy images into backend/public/images (backend now exists)
WORKDIR /app/frontend
COPY frontend .
RUN npm run build && node scripts/copy-images.js

# Build backend (tsc)
WORKDIR /app/backend
RUN npm run build || true

# Runtime image
FROM node:24-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production

# Copy built backend and public assets (including copied images)
COPY --from=base /app/backend/dist ./dist
COPY --from=base /app/backend/public ./public
COPY --from=base /app/backend/package.json ./package.json

# Install only production deps (no backend lockfile available)
RUN npm install --omit=dev --no-audit --no-fund

EXPOSE 9045
CMD ["node", "dist/server.js"]
