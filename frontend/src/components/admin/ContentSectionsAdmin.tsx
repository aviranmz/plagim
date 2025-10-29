import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { ContentSection, ContentSectionsResponse, ContentSectionResponse } from '../../types/content'

const ContentSectionsAdmin: React.FC<{ pageId: number }> = ({ pageId }) => {
  const { i18n } = useTranslation()
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showNewSectionForm, setShowNewSectionForm] = useState(false)
  const isRTL = i18n.language === 'he'

  useEffect(() => {
    fetchSections()
  }, [pageId])

  const fetchSections = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/content-sections/page/${pageId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data: ContentSectionsResponse = await response.json()
      
      if (data.success && data.data) {
        setSections(data.data)
      } else {
        setError(data.error || 'Failed to load sections')
      }
    } catch (err) {
      setError('Failed to load sections')
      console.error('Error fetching sections:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSectionSelect = (section: ContentSection) => {
    setSelectedSection(section)
    setIsEditing(false)
  }

  const handleSaveSection = async (sectionData: Partial<ContentSection>) => {
    try {
      const url = selectedSection?.id 
        ? `/api/content-sections/${selectedSection.id}`
        : '/api/content-sections'
      
      const method = selectedSection?.id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...sectionData,
          pageId
        })
      })
      
      const data: ContentSectionResponse = await response.json()
      
      if (data.success) {
        await fetchSections()
        setSelectedSection(data.data || null)
        setIsEditing(false)
        setShowNewSectionForm(false)
      } else {
        setError(data.error || 'Failed to save section')
      }
    } catch (err) {
      setError('Failed to save section')
      console.error('Error saving section:', err)
    }
  }

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm(isRTL ? 'האם אתה בטוח שברצונך למחוק קטע זה?' : 'Are you sure you want to delete this section?')) {
      return
    }

    try {
      const response = await fetch(`/api/content-sections/${sectionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      const data: ContentSectionResponse = await response.json()
      
      if (data.success) {
        await fetchSections()
        setSelectedSection(null)
      } else {
        setError(data.error || 'Failed to delete section')
      }
    } catch (err) {
      setError('Failed to delete section')
      console.error('Error deleting section:', err)
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">
            {isRTL ? 'טוען קטעי תוכן...' : 'Loading content sections...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {isRTL ? 'קטעי תוכן' : 'Content Sections'}
        </h3>
        <button
          onClick={() => setShowNewSectionForm(true)}
          className="btn-primary"
        >
          {isRTL ? 'קטע חדש' : 'New Section'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sections List */}
        <div>
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="text-lg font-medium mb-4">
              {isRTL ? 'רשימת קטעים' : 'Sections List'}
            </h4>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedSection?.id === section.id
                      ? 'bg-blue-100 border border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSectionSelect(section)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        <h5 className="font-medium text-gray-900">
                          {isRTL ? section.title : section.titleEn || section.sectionType}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-600 capitalize">{section.sectionType}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          section.isActive ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-xs text-gray-500">
                          {section.isActive ? (isRTL ? 'פעיל' : 'Active') : (isRTL ? 'לא פעיל' : 'Inactive')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteSection(section.id!)
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

        {/* Section Editor */}
        <div>
          {selectedSection ? (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">
                  {isRTL ? 'עריכת קטע' : 'Edit Section'}
                </h4>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary"
                >
                  {isEditing ? (isRTL ? 'שמור' : 'Save') : (isRTL ? 'ערוך' : 'Edit')}
                </button>
              </div>

              {isEditing ? (
                <SectionEditorForm
                  section={selectedSection}
                  onSave={handleSaveSection}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <SectionViewer section={selectedSection} />
              )}
            </div>
          ) : showNewSectionForm ? (
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="text-lg font-medium mb-4">
                {isRTL ? 'קטע חדש' : 'New Section'}
              </h4>
              <SectionEditorForm
                section={null}
                onSave={handleSaveSection}
                onCancel={() => setShowNewSectionForm(false)}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-gray-600">
                {isRTL ? 'בחר קטע לעריכה או צור קטע חדש' : 'Select a section to edit or create a new section'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Section Editor Form Component
const SectionEditorForm: React.FC<{
  section: ContentSection | null
  onSave: (sectionData: Partial<ContentSection>) => void
  onCancel: () => void
}> = ({ section, onSave, onCancel }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const [formData, setFormData] = useState({
    sectionType: section?.sectionType || 'text',
    title: section?.title || '',
    titleEn: section?.titleEn || '',
    content: section?.content || {},
    sortOrder: section?.sortOrder || 0,
    isActive: section?.isActive ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? 'סוג קטע' : 'Section Type'}
        </label>
        <select
          value={formData.sectionType}
          onChange={(e) => setFormData({ ...formData, sectionType: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="hero">{isRTL ? 'כותרת ראשית' : 'Hero'}</option>
          <option value="text">{isRTL ? 'טקסט' : 'Text'}</option>
          <option value="image">{isRTL ? 'תמונה' : 'Image'}</option>
          <option value="gallery">{isRTL ? 'גלריה' : 'Gallery'}</option>
          <option value="list">{isRTL ? 'רשימה' : 'List'}</option>
          <option value="cta">{isRTL ? 'קריאה לפעולה' : 'Call to Action'}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'כותרת (עברית)' : 'Title (Hebrew)'}
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {isRTL ? 'קטע פעיל' : 'Active Section'}
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

// Section Viewer Component
const SectionViewer: React.FC<{ section: ContentSection }> = ({ section }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  return (
    <div className="space-y-4">
      <div>
        <h5 className="text-sm font-medium text-gray-700">
          {isRTL ? 'פרטי הקטע' : 'Section Details'}
        </h5>
        <div className="bg-gray-50 p-3 rounded-lg mt-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">
                {isRTL ? 'סוג:' : 'Type:'}
              </span>
              <span className="ml-2 font-medium capitalize">{section.sectionType}</span>
            </div>
            <div>
              <span className="text-gray-600">
                {isRTL ? 'סטטוס:' : 'Status:'}
              </span>
              <span className="ml-2 font-medium">
                {section.isActive ? (isRTL ? 'פעיל' : 'Active') : (isRTL ? 'לא פעיל' : 'Inactive')}
              </span>
            </div>
            <div>
              <span className="text-gray-600">
                {isRTL ? 'כותרת (עברית):' : 'Title (Hebrew):'}
              </span>
              <span className="ml-2 font-medium">{section.title || '-'}</span>
            </div>
            <div>
              <span className="text-gray-600">
                {isRTL ? 'כותרת (אנגלית):' : 'Title (English):'}
              </span>
              <span className="ml-2 font-medium">{section.titleEn || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 className="text-sm font-medium text-gray-700">
          {isRTL ? 'תוכן' : 'Content'}
        </h5>
        <div className="bg-gray-50 p-3 rounded-lg mt-2">
          <pre className="text-xs text-gray-600 overflow-auto max-h-32">
            {JSON.stringify(section.content, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default ContentSectionsAdmin
