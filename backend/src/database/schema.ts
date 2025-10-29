import { pgTable, serial, text, timestamp, boolean, integer, jsonb, varchar, decimal } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table for admin authentication
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Pool projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  clientName: varchar('client_name', { length: 255 }),
  clientEmail: varchar('client_email', { length: 255 }),
  clientPhone: varchar('client_phone', { length: 50 }),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, in_progress, completed, cancelled
  poolType: varchar('pool_type', { length: 100 }), // home, infinity, fiberglass, concrete, commercial, spa
  poolSize: varchar('pool_size', { length: 100 }), // dimensions
  budget: decimal('budget', { precision: 12, scale: 2 }),
  location: varchar('location', { length: 255 }),
  startDate: timestamp('start_date'),
  completionDate: timestamp('completion_date'),
  // Flexible content using JSONB
  specifications: jsonb('specifications'), // Pool specifications, materials, etc.
  images: jsonb('images'), // Array of image URLs and metadata
  documents: jsonb('documents'), // Contracts, permits, etc.
  notes: jsonb('notes'), // Internal notes and updates
  // SEO and public content
  slug: varchar('slug', { length: 255 }).unique(),
  isPublic: boolean('is_public').notNull().default(false),
  featured: boolean('featured').notNull().default(false),
  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  createdBy: integer('created_by').references(() => users.id),
})

// Project updates/logs table
export const projectUpdates = pgTable('project_updates', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull().references(() => projects.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }), // status change
  images: jsonb('images'), // Update images
  createdAt: timestamp('created_at').notNull().defaultNow(),
  createdBy: integer('created_by').references(() => users.id),
})

// Contact form submissions
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  poolType: varchar('pool_type', { length: 100 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, contacted, qualified, converted
  assignedTo: integer('assigned_to').references(() => users.id),
  notes: jsonb('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  projectUpdates: many(projectUpdates),
  contacts: many(contacts),
}))

export const projectsRelations = relations(projects, ({ one, many }) => ({
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),
  updates: many(projectUpdates),
}))

export const projectUpdatesRelations = relations(projectUpdates, ({ one }) => ({
  project: one(projects, {
    fields: [projectUpdates.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [projectUpdates.createdBy],
    references: [users.id],
  }),
}))

export const contactsRelations = relations(contacts, ({ one }) => ({
  assignedUser: one(users, {
    fields: [contacts.assignedTo],
    references: [users.id],
  }),
}))

// Types for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type ProjectUpdate = typeof projectUpdates.$inferSelect
export type NewProjectUpdate = typeof projectUpdates.$inferInsert
export type Contact = typeof contacts.$inferSelect
export type NewContact = typeof contacts.$inferInsert

// Re-export JSONB types for convenience
export type {
  PoolSpecifications,
  ProjectImages,
  ProjectDocuments,
  ProjectNotes,
  ProjectWithDetails,
  ContactNotes
} from '../types/project'

// Re-export content management types
export type {
  ProfessionalInfoPage,
  ContentSection,
  ContentCategory,
  ContentTag,
  SectionContent,
  GalleryImage,
  ListItem,
  TableHeader,
  TableRow,
  TableCell
} from '../types/content'
