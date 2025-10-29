import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3045,
    host: true,
  },
  preview: {
    port: 3045,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // API URL will be set via environment variable at build time
  // If not set, defaults to relative /api for same-domain deployment
})
