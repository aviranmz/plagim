import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ContentSectionsAdmin from '../../components/admin/ContentSectionsAdmin'
import type { ProfessionalInfoPage, ProfessionalInfoPagesResponse, ProfessionalInfoPageResponse } from '../../types/content'

const ProfessionalInfoAdmin: React.FC = () => {
  const { i18n } = useTranslation()
  const [pages, setPages] = useState<ProfessionalInfoPage[]>([])
  const [selectedPage, setSelectedPage] = useState<ProfessionalInfoPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showNewPageForm, setShowNewPageForm] = useState(false)
  const isRTL = i18n.language === 'he'

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/professional-info/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data: ProfessionalInfoPagesResponse = await response.json()
      
      if (data.success && data.data) {
        setPages(data.data)
      } else {
        setError(data.error || 'Failed to load pages')
      }
    } catch (err) {
      setError('Failed to load pages')
      console.error('Error fetching pages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageSelect = async (pageId: number) => {
    try {
      const page = pages.find(p => p.id === pageId)
      if (page) {
        setSelectedPage(page)
        setIsEditing(false)
      }
    } catch (err) {
      console.error('Error selecting page:', err)
    }
  }

  const handleSavePage = async (pageData: Partial<ProfessionalInfoPage>) => {
    try {
      const url = selectedPage?.id 
        ? `/api/professional-info/${selectedPage.id}`
        : '/api/professional-info'
      
      const method = selectedPage?.id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pageData)
      })
      
      const data: ProfessionalInfoPageResponse = await response.json()
      
      if (data.success) {
        await fetchPages()
        setSelectedPage(data.data || null)
        setIsEditing(false)
        setShowNewPageForm(false)
      } else {
        setError(data.error || 'Failed to save page')
      }
    } catch (err) {
      setError('Failed to save page')
      console.error('Error saving page:', err)
    }
  }

  const handleDeletePage = async (pageId: number) => {
    if (!confirm(isRTL ? 'האם אתה בטוח שברצונך למחוק דף זה?' : 'Are you sure you want to delete this page?')) {
      return
    }

    try {
      const response = await fetch(`/api/professional-info/${pageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      const data: ProfessionalInfoPageResponse = await response.json()
      
      if (data.success) {
        await fetchPages()
        setSelectedPage(null)
      } else {
        setError(data.error || 'Failed to delete page')
      }
    } catch (err) {
      setError('Failed to delete page')
      console.error('Error deleting page:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-neutral-600">
            {isRTL ? 'טוען...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-luxury py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isRTL ? 'ניהול מידע מקצועי' : 'Professional Info Management'}
          </h1>
          <button
            onClick={() => setShowNewPageForm(true)}
            className="btn-primary"
          >
            {isRTL ? 'דף חדש' : 'New Page'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {isRTL ? 'רשימת דפים' : 'Pages List'}
              </h2>
              <div className="space-y-2">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPage?.id === page.id
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handlePageSelect(page.id!)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {isRTL ? page.title : page.titleEn}
                        </h3>
                        <p className="text-sm text-gray-600">{page.slug}</p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            page.isActive ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className="text-xs text-gray-500">
                            {page.isActive ? (isRTL ? 'פעיל' : 'Active') : (isRTL ? 'לא פעיל' : 'Inactive')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePage(page.id!)
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        {isRTL ? 'מחק' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Page Editor */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {isRTL ? 'עריכת דף' : 'Edit Page'}
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary"
                  >
                    {isEditing ? (isRTL ? 'שמור' : 'Save') : (isRTL ? 'ערוך' : 'Edit')}
                  </button>
                </div>

                {isEditing ? (
                  <PageEditorForm
                    page={selectedPage}
                    onSave={handleSavePage}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <div className="space-y-6">
                    <PageViewer page={selectedPage} />
                    {selectedPage.id && (
                      <ContentSectionsAdmin pageId={selectedPage.id} />
                    )}
                  </div>
                )}
              </div>
            ) : showNewPageForm ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">
                  {isRTL ? 'דף חדש' : 'New Page'}
                </h2>
                <PageEditorForm
                  page={null}
                  onSave={handleSavePage}
                  onCancel={() => setShowNewPageForm(false)}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">
                  {isRTL ? 'בחר דף לעריכה או צור דף חדש' : 'Select a page to edit or create a new page'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Page Editor Form Component
const PageEditorForm: React.FC<{
  page: ProfessionalInfoPage | null
  onSave: (pageData: Partial<ProfessionalInfoPage>) => void
  onCancel: () => void
}> = ({ page, onSave, onCancel }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const [formData, setFormData] = useState({
    slug: page?.slug || '',
    title: page?.title || '',
    titleEn: page?.titleEn || '',
    description: page?.description || '',
    descriptionEn: page?.descriptionEn || '',
    metaTitle: page?.metaTitle || '',
    metaTitleEn: page?.metaTitleEn || '',
    metaDescription: page?.metaDescription || '',
    metaDescriptionEn: page?.metaDescriptionEn || '',
    isActive: page?.isActive ?? true,
    sortOrder: page?.sortOrder || 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'מזהה דף (URL)' : 'Page Slug (URL)'}
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'סדר תצוגה' : 'Sort Order'}
          </label>
          <input
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'כותרת (עברית)' : 'Title (Hebrew)'}
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'כותרת (אנגלית)' : 'Title (English)'}
          </label>
          <input
            type="text"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'תיאור (עברית)' : 'Description (Hebrew)'}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'תיאור (אנגלית)' : 'Description (English)'}
          </label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          {isRTL ? 'דף פעיל' : 'Active Page'}
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          {isRTL ? 'ביטול' : 'Cancel'}
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {isRTL ? 'שמור' : 'Save'}
        </button>
      </div>
    </form>
  )
}

// Page Viewer Component
const PageViewer: React.FC<{ page: ProfessionalInfoPage }> = ({ page }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isRTL ? 'פרטי הדף' : 'Page Details'}
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                {isRTL ? 'מזהה דף:' : 'Page Slug:'}
              </p>
              <p className="font-medium">{page.slug}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {isRTL ? 'סטטוס:' : 'Status:'}
              </p>
              <p className="font-medium">
                {page.isActive ? (isRTL ? 'פעיל' : 'Active') : (isRTL ? 'לא פעיל' : 'Inactive')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {isRTL ? 'כותרת (עברית):' : 'Title (Hebrew):'}
              </p>
              <p className="font-medium">{page.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {isRTL ? 'כותרת (אנגלית):' : 'Title (English):'}
              </p>
              <p className="font-medium">{page.titleEn}</p>
            </div>
          </div>
        </div>
      </div>

      {page.description && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isRTL ? 'תיאור' : 'Description'}
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{isRTL ? page.description : page.descriptionEn}</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isRTL ? 'תוכן הדף' : 'Page Content'}
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            {isRTL ? 'מספר קטעי תוכן:' : 'Number of content sections:'} {page.content?.length || 0}
          </p>
          {page.content && page.content.length > 0 && (
            <div className="mt-4 space-y-2">
              {page.content.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">
                    {index + 1}. {section.sectionType} - {isRTL ? section.title : section.titleEn}
                  </span>
                  <span className="text-xs text-gray-500">
                    {section.isActive ? (isRTL ? 'פעיל' : 'Active') : (isRTL ? 'לא פעיל' : 'Inactive')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalInfoAdmin
