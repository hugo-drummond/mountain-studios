'use client'

import { useState } from 'react'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

export interface PageSection {
  id: string
  title: string
  content: string
  image_description: string
}

interface PageEditorModalProps {
  pageName: string
  sections: PageSection[]
  onSave: (sections: PageSection[]) => void
  onClose: () => void
}

const COMMON_SECTIONS = [
  'Hero Banner',
  'About Preview',
  'Services Overview',
  'Testimonials',
  'Call to Action',
  'Gallery',
  'Stats',
]

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

export default function PageEditorModal({
  pageName,
  sections: initialSections,
  onSave,
  onClose,
}: PageEditorModalProps) {
  const [sections, setSections] = useState<PageSection[]>(
    initialSections.length > 0
      ? initialSections
      : [{ id: genId(), title: '', content: '', image_description: '' }],
  )
  const [showCommon, setShowCommon] = useState(false)

  const addSection = (title = '') => {
    setSections((prev) => [
      ...prev,
      { id: genId(), title, content: '', image_description: '' },
    ])
  }

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  const updateSection = (id: string, field: keyof PageSection, value: string | boolean) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    )
  }

  const handleSave = () => {
    onSave(sections)
    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '700px',
          maxHeight: '85vh',
          overflowY: 'auto',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          backgroundColor: 'rgba(15,15,20,0.95)',
          backdropFilter: 'blur(12px)',
          padding: '2.5rem',
          fontFamily: font,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontWeight: 200, fontSize: '1.75rem', color: '#fff', margin: 0 }}>
            {pageName}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Add Common Sections */}
        <div style={{ marginBottom: '2rem', position: 'relative' }}>
          <button
            onClick={() => setShowCommon(!showCommon)}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '9999px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.25rem',
              cursor: 'pointer',
              fontFamily: font,
            }}
          >
            Add Common Sections ▾
          </button>
          {showCommon && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '0.5rem',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                backgroundColor: 'rgba(20,20,25,0.98)',
                backdropFilter: 'blur(12px)',
                padding: '0.5rem',
                zIndex: 10,
                minWidth: '220px',
              }}
            >
              {COMMON_SECTIONS.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    addSection(name)
                    setShowCommon(false)
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    padding: '0.6rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    fontFamily: font,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sections List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {sections.map((section, i) => (
            <div
              key={section.id}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 200, color: 'rgba(255,255,255,0.3)', minWidth: '28px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  placeholder="Section title"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 300,
                    padding: '0.4rem 0',
                    outline: 'none',
                    fontFamily: font,
                  }}
                />
                <button
                  onClick={() => removeSection(section.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,100,100,0.6)',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  ✕
                </button>
              </div>

              <textarea
                value={section.content}
                onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                placeholder="Describe what this section should include..."
                rows={3}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.9rem',
                  padding: '0.5rem 0',
                  outline: 'none',
                  fontFamily: font,
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
              />

              {/* Image direction */}
              <div style={{ marginTop: '1rem' }}>
                <label style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'block',
                  marginBottom: '0.35rem',
                  fontFamily: font,
                }}>
                  Image Direction
                </label>
                <input
                  type="text"
                  value={section.image_description}
                  onChange={(e) => updateSection(section.id, 'image_description', e.target.value)}
                  placeholder="e.g. team photo, aerial shot of venue, product flat-lay..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.85rem',
                    padding: '0.4rem 0',
                    outline: 'none',
                    fontFamily: font,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Blank Section */}
        <button
          onClick={() => addSection()}
          style={{
            display: 'block',
            width: '100%',
            marginTop: '1.5rem',
            background: 'none',
            border: '1px dashed rgba(255,255,255,0.15)',
            borderRadius: '12px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            padding: '1rem',
            cursor: 'pointer',
            fontFamily: font,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          + Add Blank Section
        </button>

        {/* Save / Cancel */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '9999px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.5rem',
              cursor: 'pointer',
              fontFamily: font,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: 'rgba(100,140,255,0.15)',
              border: '1px solid rgba(100,140,255,0.4)',
              borderRadius: '9999px',
              color: 'rgba(200,220,255,0.9)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.5rem',
              cursor: 'pointer',
              fontFamily: font,
            }}
          >
            Save Sections
          </button>
        </div>
      </div>
    </div>
  )
}
