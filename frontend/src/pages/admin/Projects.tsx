import React, { useState, useEffect } from 'react'
import { projectsAPI } from '../../services/api'

interface Project {
  id: number
  title: string
  clientName: string
  clientEmail: string
  status: string
  poolType: string
  budget: string
  location: string
  startDate: string
  completionDate: string
  isPublic: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  creator: {
    id: number
    name: string
    email: string
  }
}

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProjects()
  }, [currentPage, searchTerm, statusFilter])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter })
      }
      
      const response = await projectsAPI.getAll(params)
      setProjects(response.data.projects)
      setTotalPages(response.data.pagination.pages)
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'in_progress': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-neutral-600 bg-neutral-50'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'ממתין',
      in_progress: 'בביצוע',
      completed: 'הושלם',
      cancelled: 'בוטל'
    }
    return statusMap[status] || status
  }

  const handleDelete = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הפרויקט?')) {
      return
    }

    try {
      await projectsAPI.delete(id)
      fetchProjects()
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to delete project')
    }
  }

  const handleTogglePublic = async (id: number, isPublic: boolean) => {
    try {
      await projectsAPI.update(id, { isPublic: !isPublic })
      fetchProjects()
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to update project')
    }
  }

  const handleToggleFeatured = async (id: number, featured: boolean) => {
    try {
      await projectsAPI.update(id, { featured: !featured })
      fetchProjects()
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to update project')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <a href="/admin/dashboard" className="text-primary-600 hover:text-primary-700">
                ← חזרה לדשבורד
              </a>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">ניהול פרויקטים</h1>
                <p className="text-sm text-neutral-600">בריכות שחייה</p>
              </div>
            </div>
            <a href="/admin/projects/new" className="btn-primary">
              פרויקט חדש
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="card-luxury mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                חיפוש
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="חיפוש לפי שם, לקוח או אימייל..."
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                סטטוס
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">כל הסטטוסים</option>
                <option value="pending">ממתין</option>
                <option value="in_progress">בביצוע</option>
                <option value="completed">הושלם</option>
                <option value="cancelled">בוטל</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('')
                  setCurrentPage(1)
                }}
                className="btn-secondary w-full"
              >
                נקה מסננים
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Projects Table */}
        <div className="card-luxury">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 pool-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-neutral-600">טוען פרויקטים...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-600">לא נמצאו פרויקטים</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-right py-3 px-4 font-medium text-neutral-700">שם הפרויקט</th>
                    <th className="text-right py-3 px-4 font-medium text-neutral-700">לקוח</th>
                    <th className="text-right py-3 px-4 font-medium text-neutral-700">סטטוס</th>
                    <th className="text-right py-3 px-4 font-medium text-neutral-700">סוג בריכה</th>
                    <th className="text-right py-3 px-4 font-medium text-neutral-700">תאריך יצירה</th>
                    <th className="text-right py-3 px-4 font-medium text-neutral-700">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-neutral-900">{project.title}</div>
                          <div className="text-sm text-neutral-600">{project.location}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-neutral-900">{project.clientName}</div>
                          <div className="text-sm text-neutral-600">{project.clientEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {project.poolType}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {new Date(project.createdAt).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <a
                            href={`/admin/projects/${project.id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm"
                          >
                            ערוך
                          </a>
                          <button
                            onClick={() => handleTogglePublic(project.id, project.isPublic)}
                            className={`text-xs px-2 py-1 rounded ${
                              project.isPublic 
                                ? 'text-green-600 bg-green-50' 
                                : 'text-neutral-600 bg-neutral-50'
                            }`}
                          >
                            {project.isPublic ? 'ציבורי' : 'פרטי'}
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(project.id, project.featured)}
                            className={`text-xs px-2 py-1 rounded ${
                              project.featured 
                                ? 'text-accent-600 bg-accent-50' 
                                : 'text-neutral-600 bg-neutral-50'
                            }`}
                          >
                            {project.featured ? 'מומלץ' : 'רגיל'}
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            מחק
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
              >
                הקודם
              </button>
              <span className="px-3 py-2 text-sm text-neutral-600">
                {currentPage} מתוך {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
              >
                הבא
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsManagement
