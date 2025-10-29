import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import * as contentSchema from './contentSchema'

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/plagim'

// Create postgres client
const client = postgres(connectionString)

// Create drizzle instance with all schemas
export const db = drizzle(client, { 
  schema: { 
    ...schema, 
    ...contentSchema 
  } 
})

// Export the client for direct queries if needed
export { client }
