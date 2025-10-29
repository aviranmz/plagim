// Utility functions for working with JSONB project data

import type {
  PoolSpecifications,
  ProjectImages,
  ProjectDocuments,
  ProjectNotes,
  ContactNotes
} from '../types/project'

/**
 * Utility functions for managing JSONB project data
 */
export class ProjectDataManager {
  
  // Specifications utilities
  static createSpecifications(data: Partial<PoolSpecifications>): PoolSpecifications {
    return {
      ...data,
      dimensions: data.dimensions,
      materials: data.materials,
      equipment: data.equipment,
      waterFeatures: data.waterFeatures,
      safety: data.safety,
      environmental: data.environmental
    } as PoolSpecifications
  }

  static updateSpecifications(current: PoolSpecifications | null, updates: Partial<PoolSpecifications>): PoolSpecifications {
    return {
      ...current,
      ...updates
    } as PoolSpecifications
  }

  // Images utilities
  static addImageToGallery(
    currentImages: ProjectImages | null,
    image: NonNullable<ProjectImages['gallery']>[0]
  ): ProjectImages {
    const images = currentImages || { gallery: [] }
    return {
      ...images,
      gallery: [...(images.gallery || []), image]
    }
  }

  static removeImageFromGallery(
    currentImages: ProjectImages | null,
    imageId: string
  ): ProjectImages | null {
    if (!currentImages?.gallery) return currentImages
    
    const updatedImages = {
      ...currentImages,
      gallery: currentImages.gallery.filter(img => img.id !== imageId)
    }
    
    return updatedImages.gallery.length > 0 ? updatedImages : null
  }

  static addProgressImage(
    currentImages: ProjectImages | null,
    progressImage: NonNullable<ProjectImages['progress']>[0]
  ): ProjectImages {
    const images = currentImages || { progress: [] }
    return {
      ...images,
      progress: [...(images.progress || []), progressImage]
    }
  }

  // Documents utilities
  static addDocument(
    currentDocuments: ProjectDocuments | null,
    category: keyof ProjectDocuments,
    document: any
  ): ProjectDocuments {
    const documents = currentDocuments || {}
    const categoryArray = documents[category] || []
    
    return {
      ...documents,
      [category]: [...categoryArray, document]
    }
  }

  static removeDocument(
    currentDocuments: ProjectDocuments | null,
    category: keyof ProjectDocuments,
    documentId: string
  ): ProjectDocuments | null {
    if (!currentDocuments?.[category]) return currentDocuments
    
    const updatedDocuments = {
      ...currentDocuments,
      [category]: currentDocuments[category]!.filter((doc: any) => doc.id !== documentId)
    }
    
    return updatedDocuments
  }

  // Notes utilities
  static addInternalNote(
    currentNotes: ProjectNotes | null,
    note: NonNullable<ProjectNotes['internal']>[0]
  ): ProjectNotes {
    const notes = currentNotes || { internal: [] }
    return {
      ...notes,
      internal: [...(notes.internal || []), note]
    }
  }

  static addCommunicationLog(
    currentNotes: ProjectNotes | null,
    communication: NonNullable<ProjectNotes['communication']>[0]
  ): ProjectNotes {
    const notes = currentNotes || { communication: [] }
    return {
      ...notes,
      communication: [...(notes.communication || []), communication]
    }
  }

  static addMilestone(
    currentNotes: ProjectNotes | null,
    milestone: NonNullable<ProjectNotes['milestones']>[0]
  ): ProjectNotes {
    const notes = currentNotes || { milestones: [] }
    return {
      ...notes,
      milestones: [...(notes.milestones || []), milestone]
    }
  }

  static updateMilestoneStatus(
    currentNotes: ProjectNotes | null,
    milestoneId: string,
    status: NonNullable<ProjectNotes['milestones']>[0]['status'],
    actualDate?: string
  ): ProjectNotes | null {
    if (!currentNotes?.milestones) return currentNotes
    
    return {
      ...currentNotes,
      milestones: currentNotes.milestones.map(milestone => 
        milestone.id === milestoneId 
          ? { 
              ...milestone, 
              status, 
              ...(actualDate && { actualDate })
            }
          : milestone
      )
    }
  }

  static addIssue(
    currentNotes: ProjectNotes | null,
    issue: NonNullable<ProjectNotes['issues']>[0]
  ): ProjectNotes {
    const notes = currentNotes || { issues: [] }
    return {
      ...notes,
      issues: [...(notes.issues || []), issue]
    }
  }

  static resolveIssue(
    currentNotes: ProjectNotes | null,
    issueId: string,
    resolution: string,
    resolvedBy: number
  ): ProjectNotes | null {
    if (!currentNotes?.issues) return currentNotes
    
    return {
      ...currentNotes,
      issues: currentNotes.issues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              status: 'resolved' as const,
              resolvedAt: new Date().toISOString(),
              resolvedBy,
              resolution
            }
          : issue
      )
    }
  }
}

// Contact notes utilities
export class ContactDataManager {
  static addCommunication(
    currentNotes: ContactNotes | null,
    communication: NonNullable<ContactNotes['communication']>[0]
  ): ContactNotes {
    const notes = currentNotes || { communication: [] }
    return {
      ...notes,
      communication: [...(notes.communication || []), communication]
    }
  }

  static addFollowUp(
    currentNotes: ContactNotes | null,
    followUp: NonNullable<ContactNotes['followUps']>[0]
  ): ContactNotes {
    const notes = currentNotes || { followUps: [] }
    return {
      ...notes,
      followUps: [...(notes.followUps || []), followUp]
    }
  }

  static updateQualification(
    currentNotes: ContactNotes | null,
    qualification: Partial<ContactNotes['qualification']>
  ): ContactNotes {
    const notes = currentNotes || {}
    return {
      ...notes,
      qualification: {
        ...notes.qualification,
        ...qualification
      }
    }
  }
}

// Query helpers for JSONB data
export class ProjectQueryHelpers {
  // Search projects by specifications
  static searchByPoolType(specifications: PoolSpecifications | null, poolType: string): boolean {
    if (!specifications?.materials?.poolShell) return false
    return specifications.materials.poolShell.toLowerCase().includes(poolType.toLowerCase())
  }

  // Search projects by equipment
  static searchByEquipment(specifications: PoolSpecifications | null, equipmentType: string): boolean {
    if (!specifications?.equipment) return false
    
    const equipment = specifications.equipment
    return Object.values(equipment).some(eq => 
      eq && typeof eq === 'object' && 'type' in eq && 
      eq.type.toLowerCase().includes(equipmentType.toLowerCase())
    )
  }

  // Search projects by water features
  static hasWaterFeature(specifications: PoolSpecifications | null, feature: string): boolean {
    if (!specifications?.waterFeatures) return false
    
    const features = specifications.waterFeatures
    return Object.entries(features).some(([key, value]) => 
      key.toLowerCase().includes(feature.toLowerCase()) && value
    )
  }

  // Get project progress percentage based on milestones
  static getProgressPercentage(notes: ProjectNotes | null): number {
    if (!notes?.milestones || notes.milestones.length === 0) return 0
    
    const completed = notes.milestones.filter(m => m.status === 'completed').length
    return Math.round((completed / notes.milestones.length) * 100)
  }

  // Get active issues count
  static getActiveIssuesCount(notes: ProjectNotes | null): number {
    if (!notes?.issues) return 0
    return notes.issues.filter(issue => 
      issue.status === 'open' || issue.status === 'in_progress'
    ).length
  }

  // Get upcoming milestones
  static getUpcomingMilestones(notes: ProjectNotes | null, days: number = 7): NonNullable<ProjectNotes['milestones']> {
    if (!notes?.milestones) return []
    
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() + days)
    
    return notes.milestones.filter(milestone => {
      if (milestone.status !== 'pending') return false
      const plannedDate = new Date(milestone.plannedDate)
      return plannedDate <= cutoffDate
    })
  }
}

// Validation helpers
export class ProjectValidation {
  static validateSpecifications(specs: any): specs is PoolSpecifications {
    if (!specs || typeof specs !== 'object') return false
    
    // Add specific validation logic here
    return true
  }

  static validateImages(images: any): images is ProjectImages {
    if (!images || typeof images !== 'object') return false
    
    // Add specific validation logic here
    return true
  }

  static validateDocuments(documents: any): documents is ProjectDocuments {
    if (!documents || typeof documents !== 'object') return false
    
    // Add specific validation logic here
    return true
  }

  static validateNotes(notes: any): notes is ProjectNotes {
    if (!notes || typeof notes !== 'object') return false
    
    // Add specific validation logic here
    return true
  }
}