// TypeScript interfaces for JSONB fields in projects table

export interface PoolSpecifications {
  // Basic pool details
  dimensions?: {
    length: number
    width: number
    depth: {
      shallow: number
      deep: number
    }
    volume?: number
  }
  
  // Materials and construction
  materials?: {
    poolShell: 'concrete' | 'fiberglass' | 'vinyl' | 'steel' | 'composite'
    finish: 'tile' | 'plaster' | 'pebble' | 'glass' | 'paint'
    coping: 'stone' | 'concrete' | 'brick' | 'tile' | 'composite'
    decking: 'concrete' | 'stone' | 'wood' | 'composite' | 'pavers'
  }
  
  // Equipment and systems
  equipment?: {
    pump: {
      brand?: string
      model?: string
      horsepower: number
    }
    filter: {
      type: 'sand' | 'cartridge' | 'diatomaceous' | 'zeolite'
      brand?: string
      model?: string
    }
    heater?: {
      type: 'gas' | 'electric' | 'heat_pump' | 'solar'
      brand?: string
      model?: string
      capacity?: number
    }
    cleaner?: {
      type: 'manual' | 'automatic' | 'robotic'
      brand?: string
      model?: string
    }
    lighting?: {
      type: 'led' | 'halogen' | 'fiber_optic'
      color?: 'white' | 'blue' | 'multi_color'
      count: number
    }
  }
  
  // Water features
  waterFeatures?: {
    waterfalls?: number
    fountains?: number
    jets?: number
    infinityEdge?: boolean
    spa?: boolean
    slide?: boolean
  }
  
  // Safety and compliance
  safety?: {
    fence?: boolean
    alarm?: boolean
    cover?: boolean
    handrails?: boolean
    steps?: boolean
    compliance?: string[] // Building codes, safety standards
  }
  
  // Environmental features
  environmental?: {
    solarHeating?: boolean
    energyEfficientPump?: boolean
    saltWaterSystem?: boolean
    ozoneSystem?: boolean
    uvSystem?: boolean
  }
}

export interface ProjectImages {
  // Main project images
  gallery?: Array<{
    id: string
    url: string
    alt: string
    caption?: string
    category: 'overview' | 'construction' | 'finished' | 'detail' | 'before' | 'after'
    order: number
    uploadedAt: string
    uploadedBy: number // user ID
  }>
  
  // Before/after comparisons
  beforeAfter?: Array<{
    id: string
    beforeUrl: string
    afterUrl: string
    caption?: string
    order: number
  }>
  
  // Construction progress
  progress?: Array<{
    id: string
    url: string
    caption: string
    phase: 'excavation' | 'structure' | 'plumbing' | 'electrical' | 'finishing' | 'landscaping'
    date: string
    order: number
  }>
  
  // 3D renderings or plans
  plans?: Array<{
    id: string
    url: string
    type: '3d_rendering' | 'blueprint' | 'sketch' | 'concept'
    description?: string
    order: number
  }>
}

export interface ProjectDocuments {
  // Contracts and agreements
  contracts?: Array<{
    id: string
    name: string
    url: string
    type: 'contract' | 'agreement' | 'proposal' | 'quote'
    signedAt?: string
    signedBy?: string
    version: string
  }>
  
  // Permits and approvals
  permits?: Array<{
    id: string
    name: string
    url: string
    type: 'building_permit' | 'electrical_permit' | 'plumbing_permit' | 'zoning_approval'
    issuedBy: string
    issuedAt: string
    expiresAt?: string
    status: 'pending' | 'approved' | 'rejected' | 'expired'
  }>
  
  // Technical documents
  technical?: Array<{
    id: string
    name: string
    url: string
    type: 'specification' | 'manual' | 'warranty' | 'certificate'
    category: 'equipment' | 'materials' | 'installation' | 'maintenance'
    version?: string
  }>
  
  // Financial documents
  financial?: Array<{
    id: string
    name: string
    url: string
    type: 'invoice' | 'receipt' | 'payment_proof' | 'budget'
    amount?: number
    currency?: string
    date: string
  }>
}

export interface ProjectNotes {
  // Internal notes
  internal?: Array<{
    id: string
    content: string
    category: 'general' | 'technical' | 'client_communication' | 'issue' | 'milestone'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    createdAt: string
    createdBy: number // user ID
    updatedAt?: string
    updatedBy?: number
    tags?: string[]
  }>
  
  // Client communication log
  communication?: Array<{
    id: string
    type: 'email' | 'phone' | 'meeting' | 'site_visit' | 'text'
    subject?: string
    content: string
    direction: 'inbound' | 'outbound'
    clientName?: string
    clientEmail?: string
    clientPhone?: string
    createdAt: string
    createdBy: number
    attachments?: string[] // URLs to attached files
  }>
  
  // Project milestones and timeline
  milestones?: Array<{
    id: string
    title: string
    description?: string
    plannedDate: string
    actualDate?: string
    status: 'pending' | 'in_progress' | 'completed' | 'delayed' | 'cancelled'
    dependencies?: string[] // IDs of other milestones
    createdAt: string
    createdBy: number
  }>
  
  // Issues and resolutions
  issues?: Array<{
    id: string
    title: string
    description: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    status: 'open' | 'in_progress' | 'resolved' | 'closed'
    reportedAt: string
    reportedBy: number
    assignedTo?: number
    resolvedAt?: string
    resolvedBy?: number
    resolution?: string
    tags?: string[]
  }>
}

// Extended project type with typed JSONB fields
export interface ProjectWithDetails {
  id: number
  title: string
  description?: string
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  status: string
  poolType?: string
  poolSize?: string
  budget?: string
  location?: string
  startDate?: Date
  completionDate?: Date
  specifications?: PoolSpecifications
  images?: ProjectImages
  documents?: ProjectDocuments
  notes?: ProjectNotes
  slug?: string
  isPublic: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
  createdBy?: number
}

// Contact notes type
export interface ContactNotes {
  // Lead qualification
  qualification?: {
    budget?: number
    timeline?: string
    decisionMaker?: string
    competition?: string[]
    painPoints?: string[]
    requirements?: string[]
  }
  
  // Communication history
  communication?: Array<{
    id: string
    type: 'email' | 'phone' | 'meeting' | 'site_visit'
    subject?: string
    content: string
    direction: 'inbound' | 'outbound'
    createdAt: string
    createdBy: number
    attachments?: string[]
  }>
  
  // Follow-up tasks
  followUps?: Array<{
    id: string
    task: string
    dueDate: string
    status: 'pending' | 'completed' | 'overdue'
    assignedTo: number
    createdAt: string
    completedAt?: string
    notes?: string
  }>
  
  // Custom fields
  customFields?: Record<string, any>
}
