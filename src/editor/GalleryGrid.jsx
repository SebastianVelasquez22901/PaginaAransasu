import { useState } from 'react'
import { findGalleryImageUsage, formatBytes, getPreviewUrl } from '../utils/gallery'

export default function GalleryGrid({ gallery, content, onSelect, onDelete }) {
  const [confirmId, setConfirmId] = useState(null)

  function handleDeleteClick(img) {
    if (confirmId === img.id) {
      onDelete(img.id)
      setConfirmId(null)
    } else {
      setConfirmId(img.id)
      setTimeout(() => setConfirmId(c => (c === img.id ? null : c)), 3000)
    }
  }

  if (!gallery || gallery.length === 0) {
    return <p className="text-xs text-gray-400 text-center py-6">Todavía no hay imágenes subidas.</p>
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
      {gallery.map(img => {
        const inUse = content ? findGalleryImageUsage(content, img.url) : false
        const Wrapper = onSelect ? 'button' : 'div'
        return (
          <div key={img.id} className="relative group">
            <Wrapper
              type={onSelect ? 'button' : undefined}
              onClick={onSelect ? () => onSelect(img.url) : undefined}
              className="block w-full aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-violet-400 transition bg-gray-50"
              title={img.filename}
            >
              <img src={getPreviewUrl(img.url) || img.url} alt={img.filename} className="w-full h-full object-cover" />
            </Wrapper>
            {onDelete && (
              <button
                type="button"
                onClick={() => handleDeleteClick(img)}
                title={inUse && confirmId !== img.id ? 'Esta imagen está en uso — clic de nuevo para borrar' : 'Borrar'}
                className={`absolute top-1 right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition ${
                  confirmId === img.id
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500'
                }`}
              >
                ✕
              </button>
            )}
            <p className="text-[10px] text-gray-400 truncate mt-0.5">{formatBytes(img.sizeBytes)}</p>
          </div>
        )
      })}
    </div>
  )
}
