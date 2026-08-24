import { useState, useRef, useEffect } from 'react'
import GalleryGrid from './GalleryGrid'
import GalleryUsageBar from './GalleryUsageBar'
import ImageFocalPointEditor from './ImageFocalPointEditor'
import { uploadImage, getPreviewUrl } from '../utils/gallery'
import { resolveImageUrl } from '../utils/imageUrl'

const SHAPE_CLASS = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
  rect: 'rounded-lg',
}

const TABS = [
  { key: 'gallery', label: 'Galería' },
  { key: 'upload', label: 'Subir' },
  { key: 'url', label: 'URL' },
]

export default function ImagePickerField({
  label,
  field,
  data,
  onChange,
  fit = 'cover',
  shape = 'rounded',
  aspectRatio = 1,
  gallery = [],
  content,
  password,
  onAddGalleryImage,
  onRemoveGalleryImage,
}) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('gallery')
  const [urlDraft, setUrlDraft] = useState(data[field] || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [focalMode, setFocalMode] = useState(false)
  const popoverRef = useRef(null)
  const fileInputRef = useRef(null)

  const focalXKey = `${field}FocalX`
  const focalYKey = `${field}FocalY`
  const zoomKey = `${field}Zoom`

  const currentUrl = data[field] || ''
  const focalX = data[focalXKey] ?? 50
  const focalY = data[focalYKey] ?? 50
  const zoom = data[zoomKey] ?? 1

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false)
        setFocalMode(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    setUrlDraft(currentUrl)
  }, [currentUrl])

  function applyUrl(url) {
    setError(null)
    if (fit === 'cover') {
      onChange({ [field]: url, [focalXKey]: 50, [focalYKey]: 50, [zoomKey]: 1 })
      setFocalMode(true)
    } else {
      onChange({ [field]: url })
      setOpen(false)
    }
  }

  async function handleFiles(files) {
    setError(null)
    const file = files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const entry = await uploadImage(file, password)
      onAddGalleryImage(entry)
      applyUrl(entry.url)
    } catch (err) {
      setError(err.message || 'No se pudo subir la imagen.')
    }
    setUploading(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  function handleFocalChange(changes) {
    const mapped = {}
    if ('focalX' in changes) mapped[focalXKey] = changes.focalX
    if ('focalY' in changes) mapped[focalYKey] = changes.focalY
    if ('zoom' in changes) mapped[zoomKey] = changes.zoom
    onChange(mapped)
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>}
      <div className="relative" ref={popoverRef}>
        <button
          type="button"
          onClick={() => { setOpen(o => !o); setFocalMode(false); setTab('gallery') }}
          className={`relative w-20 h-20 border border-gray-200 hover:border-violet-400 transition bg-gray-50 overflow-hidden flex items-center justify-center ${SHAPE_CLASS[shape] || SHAPE_CLASS.rounded}`}
        >
          {currentUrl ? (
            <img
              src={getPreviewUrl(currentUrl) || resolveImageUrl(currentUrl)}
              alt="Vista previa"
              className="w-full h-full object-cover"
              style={fit === 'cover' ? { objectPosition: `${focalX}% ${focalY}%`, transform: zoom !== 1 ? `scale(${zoom})` : undefined } : undefined}
              onError={e => { e.target.style.display = 'none' }}
            />
          ) : (
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-1 z-40 bg-white border border-gray-200 rounded-2xl shadow-2xl p-3 w-72">
            {focalMode ? (
              <ImageFocalPointEditor
                url={getPreviewUrl(currentUrl) || resolveImageUrl(currentUrl)}
                focalX={focalX}
                focalY={focalY}
                zoom={zoom}
                shape={shape}
                aspectRatio={aspectRatio}
                onChange={handleFocalChange}
                onDone={() => { setFocalMode(false); setOpen(false) }}
              />
            ) : (
              <>
                <div className="flex gap-1 mb-3 border-b border-gray-100 pb-2">
                  {TABS.map(t => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                        tab === t.key ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {tab === 'gallery' && (
                  <div className="flex flex-col gap-2">
                    <GalleryUsageBar gallery={gallery} />
                    <GalleryGrid gallery={gallery} content={content} onSelect={applyUrl} onDelete={onRemoveGalleryImage} />
                  </div>
                )}

                {tab === 'upload' && (
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-violet-400 rounded-xl py-6 text-center text-xs text-gray-400 cursor-pointer transition"
                  >
                    {uploading ? 'Subiendo...' : 'Arrastra una imagen o haz clic para elegir'}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={e => handleFiles(e.target.files)}
                    />
                  </div>
                )}

                {tab === 'url' && (
                  <div className="flex flex-col gap-2">
                    <input
                      className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-mono"
                      value={urlDraft}
                      onChange={e => setUrlDraft(e.target.value)}
                      placeholder="https://..."
                    />
                    {urlDraft && (
                      <img
                        src={resolveImageUrl(urlDraft)}
                        alt="Vista previa"
                        className="h-20 w-full object-contain rounded-lg border border-gray-200 bg-gray-50"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => applyUrl(urlDraft)}
                      disabled={!urlDraft}
                      className="text-xs bg-violet-600 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 font-semibold"
                    >
                      Usar esta URL
                    </button>
                  </div>
                )}

                {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
