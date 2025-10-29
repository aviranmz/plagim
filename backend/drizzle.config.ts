import type { Config } from 'drizzle-kit'

export default {
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/plagim',
  },
} satisfies Config
