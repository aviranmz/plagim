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

# Install root (if needed by workspaces) and workspace deps
RUN npm ci --ignore-scripts
WORKDIR /app/frontend
RUN npm ci --include=dev --ignore-scripts
WORKDIR /app/backend
RUN npm ci --include=dev --ignore-scripts

# Build frontend and copy images into backend/public/images
WORKDIR /app/frontend
COPY frontend .
RUN npm run build && node scripts/copy-images.js

# Build backend
WORKDIR /app/backend
COPY backend .
RUN npm run build

# Runtime image
FROM node:24-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production

# Copy built backend and public assets (including copied images)
COPY --from=base /app/backend/dist ./dist
COPY --from=base /app/backend/public ./public
COPY --from=base /app/backend/package.json ./package.json

# Install only production deps
RUN npm ci --omit=dev

EXPOSE 9045
CMD ["node", "dist/server.js"]
