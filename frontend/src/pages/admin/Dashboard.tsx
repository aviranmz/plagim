import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

interface DashboardStats {
  projects: {
    total: number
    pending: number
    inProgress: number
    completed: number
    cancelled: number
    public: number
    featured: number
  }
  contacts: {
    total: number
    new: number
    contacted: number
    qualified: number
    converted: number
  }
  recentProjects: Array<{
    id: number
    title: string
    clientName: string
    status: string
    createdAt: string
  }>
  recentContacts: Array<{
    id: number
    name: string
    email: string
    poolType: string
    status: string
    createdAt: string
  }>
  projectsByType: Array<{
    poolType: string
    count: number
  }>
  monthlyStats: Array<{
    month: string
    count: number
  }>
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, logout } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getStats()
        setStats(response.data)
      } catch (error: any) {
        setError(error.response?.data?.error || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'in_progress': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      case 'new': return 'text-purple-600 bg-purple-50'
      case 'contacted': return 'text-blue-600 bg-blue-50'
      case 'qualified': return 'text-orange-600 bg-orange-50'
      case 'converted': return 'text-green-600 bg-green-50'
      default: return 'text-neutral-600 bg-neutral-50'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'ממתין',
      in_progress: 'בביצוע',
      completed: 'הושלם',
      cancelled: 'בוטל',
      new: 'חדש',
      contacted: 'נוצר קשר',
      qualified: 'מוכשר',
      converted: 'הומר'
    }
    return statusMap[status] || status
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-neutral-600">טוען נתונים...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            נסה שוב
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-10 h-10 pool-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">פ</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">מערכת ניהול פלגים</h1>
                <p className="text-sm text-neutral-600">בריכות שחייה</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-sm text-neutral-600">שלום, {user?.name}</span>
              <button
                onClick={logout}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                התנתק
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Projects Stats */}
          <div className="card-luxury">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">פרויקטים</h3>
              <div className="w-10 h-10 pool-gradient rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">סה&quot;כ:</span>
                <span className="font-semibold">{stats?.projects.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">בביצוע:</span>
                <span className="font-semibold text-blue-600">{stats?.projects.inProgress || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">הושלמו:</span>
                <span className="font-semibold text-green-600">{stats?.projects.completed || 0}</span>
              </div>
            </div>
          </div>

          {/* Contacts Stats */}
          <div className="card-luxury">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">פניות</h3>
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">סה&quot;כ:</span>
                <span className="font-semibold">{stats?.contacts.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">חדשות:</span>
                <span className="font-semibold text-purple-600">{stats?.contacts.new || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">הומרו:</span>
                <span className="font-semibold text-green-600">{stats?.contacts.converted || 0}</span>
              </div>
            </div>
          </div>

          {/* Public Projects */}
          <div className="card-luxury">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">פרויקטים ציבוריים</h3>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">ציבוריים:</span>
                <span className="font-semibold">{stats?.projects.public || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">מומלצים:</span>
                <span className="font-semibold text-accent-600">{stats?.projects.featured || 0}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-luxury">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">פעולות מהירות</h3>
              <div className="w-10 h-10 bg-neutral-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <a href="/admin/projects/new" className="block text-sm text-primary-600 hover:text-primary-700">
                + פרויקט חדש
              </a>
              <a href="/admin/contacts" className="block text-sm text-primary-600 hover:text-primary-700">
                ניהול פניות
              </a>
              <a href="/admin/users" className="block text-sm text-primary-600 hover:text-primary-700">
                ניהול משתמשים
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="card-luxury">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">פרויקטים אחרונים</h3>
            <div className="space-y-4">
              {stats?.recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">{project.title}</h4>
                    <p className="text-sm text-neutral-600">{project.clientName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                    <p className="text-xs text-neutral-500 mt-1">
                      {new Date(project.createdAt).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/admin/projects" className="text-primary-600 hover:text-primary-700 text-sm">
                צפה בכל הפרויקטים →
              </a>
            </div>
          </div>

          {/* Recent Contacts */}
          <div className="card-luxury">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">פניות אחרונות</h3>
            <div className="space-y-4">
              {stats?.recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">{contact.name}</h4>
                    <p className="text-sm text-neutral-600">{contact.email}</p>
                    <p className="text-xs text-neutral-500">{contact.poolType}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                      {getStatusText(contact.status)}
                    </span>
                    <p className="text-xs text-neutral-500 mt-1">
                      {new Date(contact.createdAt).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/admin/contacts" className="text-primary-600 hover:text-primary-700 text-sm">
                צפה בכל הפניות →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
