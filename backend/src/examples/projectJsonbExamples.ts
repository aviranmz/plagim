// Test file demonstrating JSONB functionality for pool projects
// This file shows how to use the new JSONB endpoints

import axios from 'axios'

const API_BASE_URL = 'http://localhost:9045/api'

// Example usage of JSONB functionality
export class ProjectJsonbExamples {
  
  // Example 1: Create a project with comprehensive specifications
  static async createPoolProjectWithSpecifications() {
    const projectData = {
      title: 'Luxury Infinity Pool - Herzliya',
      description: 'Custom infinity pool with spa and water features',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      clientPhone: '+972-50-1234567',
      poolType: 'infinity',
      poolSize: '12x6 meters',
      budget: 150000,
      location: 'Herzliya, Israel',
      specifications: {
        dimensions: {
          length: 12,
          width: 6,
          depth: {
            shallow: 1.2,
            deep: 2.5
          },
          volume: 180
        },
        materials: {
          poolShell: 'concrete',
          finish: 'tile',
          coping: 'stone',
          decking: 'stone'
        },
        equipment: {
          pump: {
            brand: 'Pentair',
            model: 'IntelliFlo VSF',
            horsepower: 3
          },
          filter: {
            type: 'sand',
            brand: 'Pentair',
            model: 'Tagelus TA-100D'
          },
          heater: {
            type: 'heat_pump',
            brand: 'AquaCal',
            model: 'SQ166',
            capacity: 166000
          },
          cleaner: {
            type: 'robotic',
            brand: 'Dolphin',
            model: 'Nautilus CC Plus'
          },
          lighting: {
            type: 'led',
            color: 'multi_color',
            count: 8
          }
        },
        waterFeatures: {
          waterfalls: 2,
          fountains: 1,
          jets: 6,
          infinityEdge: true,
          spa: true,
          slide: false
        },
        safety: {
          fence: true,
          alarm: true,
          cover: true,
          handrails: true,
          steps: true,
          compliance: ['Israeli Building Code', 'Pool Safety Standards']
        },
        environmental: {
          solarHeating: true,
          energyEfficientPump: true,
          saltWaterSystem: true,
          ozoneSystem: false,
          uvSystem: true
        }
      },
      images: {
        gallery: [
          {
            id: 'img_001',
            url: '/images/infinity-pool-1.jpg',
            alt: 'Infinity pool view',
            caption: 'Main pool area with infinity edge',
            category: 'gallery',
            uploadedAt: new Date().toISOString(),
            uploadedBy: 1
          }
        ],
        progress: [],
        plans: []
      },
      documents: {
        contracts: [],
        permits: [],
        technical: [],
        financial: []
      },
      notes: {
        internal: [],
        communication: [],
        milestones: [
          {
            id: 'milestone_001',
            title: 'Site Preparation',
            description: 'Excavation and site preparation',
            plannedDate: '2024-01-15',
            priority: 'high',
            status: 'pending',
            createdAt: new Date().toISOString(),
            createdBy: 1
          },
          {
            id: 'milestone_002',
            title: 'Pool Shell Construction',
            description: 'Concrete shell construction',
            plannedDate: '2024-02-01',
            priority: 'high',
            status: 'pending',
            createdAt: new Date().toISOString(),
            createdBy: 1
          }
        ],
        issues: []
      }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
        headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` }
      })
      console.log('Project created:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error creating project:', error.response?.data)
      throw error
    }
  }

  // Example 2: Update project specifications
  static async updateProjectSpecifications(projectId: number) {
    const specificationsUpdate = {
      equipment: {
        pump: {
          brand: 'Pentair',
          model: 'IntelliFlo VSF',
          horsepower: 3
        },
        filter: {
          type: 'sand',
          brand: 'Pentair',
          model: 'Tagelus TA-100D'
        },
        heater: {
          type: 'heat_pump',
          brand: 'AquaCal',
          model: 'SQ166',
          capacity: 166000
        },
        cleaner: {
          type: 'robotic',
          brand: 'Dolphin',
          model: 'Nautilus CC Plus'
        },
        lighting: {
          type: 'led',
          color: 'multi_color',
          count: 12 // Updated count
        }
      },
      waterFeatures: {
        waterfalls: 3, // Added one more waterfall
        fountains: 1,
        jets: 8, // Added more jets
        infinityEdge: true,
        spa: true,
        slide: true // Added slide
      }
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/projects/${projectId}/specifications`, 
        specificationsUpdate,
        { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
      )
      console.log('Specifications updated:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error updating specifications:', error.response?.data)
      throw error
    }
  }

  // Example 3: Add images to project gallery
  static async addProjectImages(projectId: number) {
    const images = [
      {
        url: '/images/infinity-pool-2.jpg',
        alt: 'Pool with spa area',
        caption: 'Infinity pool with integrated spa',
        category: 'gallery'
      },
      {
        url: '/images/infinity-pool-3.jpg',
        alt: 'Pool at night',
        caption: 'Pool with LED lighting at night',
        category: 'gallery'
      },
      {
        url: '/images/infinity-pool-progress-1.jpg',
        alt: 'Construction progress',
        caption: 'Pool shell construction in progress',
        category: 'progress'
      }
    ]

    const results = []
    for (const image of images) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/projects/${projectId}/images/gallery`,
          image,
          { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
        )
        results.push(response.data)
        console.log('Image added:', response.data.image)
      } catch (error: any) {
        console.error('Error adding image:', error.response?.data)
      }
    }
    return results
  }

  // Example 4: Add project milestones
  static async addProjectMilestones(projectId: number) {
    const milestones = [
      {
        title: 'Equipment Installation',
        description: 'Install pump, filter, heater, and lighting systems',
        plannedDate: '2024-03-01',
        priority: 'high'
      },
      {
        title: 'Water Features Installation',
        description: 'Install waterfalls, fountains, and jets',
        plannedDate: '2024-03-15',
        priority: 'medium'
      },
      {
        title: 'Final Inspection',
        description: 'Final safety and quality inspection',
        plannedDate: '2024-04-01',
        priority: 'high'
      }
    ]

    const results = []
    for (const milestone of milestones) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/projects/${projectId}/milestones`,
          milestone,
          { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
        )
        results.push(response.data)
        console.log('Milestone added:', response.data.milestone)
      } catch (error: any) {
        console.error('Error adding milestone:', error.response?.data)
      }
    }
    return results
  }

  // Example 5: Add project issues
  static async addProjectIssues(projectId: number) {
    const issues = [
      {
        title: 'Weather Delay',
        description: 'Heavy rain delayed excavation by 3 days',
        priority: 'medium',
        category: 'weather'
      },
      {
        title: 'Material Delivery Delay',
        description: 'Stone coping delivery delayed by supplier',
        priority: 'high',
        category: 'supply'
      }
    ]

    const results = []
    for (const issue of issues) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/projects/${projectId}/issues`,
          issue,
          { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
        )
        results.push(response.data)
        console.log('Issue added:', response.data.issue)
      } catch (error: any) {
        console.error('Error adding issue:', error.response?.data)
      }
    }
    return results
  }

  // Example 6: Update milestone status
  static async updateMilestoneStatus(projectId: number, milestoneId: string) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projects/${projectId}/milestones/${milestoneId}`,
        {
          status: 'completed',
          actualDate: '2024-01-18'
        },
        { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
      )
      console.log('Milestone updated:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error updating milestone:', error.response?.data)
      throw error
    }
  }

  // Example 7: Resolve project issue
  static async resolveProjectIssue(projectId: number, issueId: string) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projects/${projectId}/issues/${issueId}/resolve`,
        {
          resolution: 'Worked with supplier to expedite delivery. New delivery date confirmed for next week.'
        },
        { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
      )
      console.log('Issue resolved:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error resolving issue:', error.response?.data)
      throw error
    }
  }

  // Example 8: Get project analytics
  static async getProjectAnalytics(projectId: number) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/projects/${projectId}/analytics`,
        { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
      )
      console.log('Project analytics:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error getting analytics:', error.response?.data)
      throw error
    }
  }

  // Example 9: Search projects by JSONB criteria
  static async searchProjectsByCriteria() {
    const searchCriteria = {
      poolType: 'concrete',
      equipment: 'heater',
      waterFeatures: 'waterfall',
      hasIssues: true,
      progressRange: {
        min: 0,
        max: 50
      }
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/projects/search`,
        searchCriteria,
        { headers: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } }
      )
      console.log('Search results:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error searching projects:', error.response?.data)
      throw error
    }
  }

  // Example 10: Complete workflow demonstration
  static async demonstrateCompleteWorkflow() {
    try {
      console.log('🚀 Starting JSONB functionality demonstration...')
      
      // 1. Create a project with comprehensive data
      console.log('\n1. Creating project with specifications...')
      const project = await this.createPoolProjectWithSpecifications()
      const projectId = project.id

      // 2. Update specifications
      console.log('\n2. Updating project specifications...')
      await this.updateProjectSpecifications(projectId)

      // 3. Add images
      console.log('\n3. Adding project images...')
      await this.addProjectImages(projectId)

      // 4. Add milestones
      console.log('\n4. Adding project milestones...')
      const milestones = await this.addProjectMilestones(projectId)

      // 5. Add issues
      console.log('\n5. Adding project issues...')
      const issues = await this.addProjectIssues(projectId)

      // 6. Update milestone status
      console.log('\n6. Updating milestone status...')
      if (milestones.length > 0) {
        await this.updateMilestoneStatus(projectId, milestones[0].milestone.id)
      }

      // 7. Resolve issue
      console.log('\n7. Resolving project issue...')
      if (issues.length > 0) {
        await this.resolveProjectIssue(projectId, issues[0].issue.id)
      }

      // 8. Get analytics
      console.log('\n8. Getting project analytics...')
      const analytics = await this.getProjectAnalytics(projectId)

      // 9. Search projects
      console.log('\n9. Searching projects by criteria...')
      await this.searchProjectsByCriteria()

      console.log('\n✅ JSONB functionality demonstration completed successfully!')
      console.log('\n📊 Final Analytics:', analytics)

    } catch (error: any) {
      console.error('❌ Error in workflow demonstration:', error)
    }
  }
}

// Export for use in other files
export default ProjectJsonbExamples

// Example usage:
// ProjectJsonbExamples.demonstrateCompleteWorkflow()
