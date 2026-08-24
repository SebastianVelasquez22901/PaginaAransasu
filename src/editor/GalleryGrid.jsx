import { useState } from 'react'
import { findGalleryImageUsage, formatBytes, getPreviewUrl, deleteImage } from '../utils/gallery'

export default function GalleryGrid({ gallery, content, onSelect, onDelete, password }) {
  const [confirmId, setConfirmId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  const confirmTarget = gallery?.find(g => g.id === confirmId)
  const usedIn = confirmTarget ? findGalleryImageUsage(content, confirmTarget.url) : []

  function openConfirm(img) {
    setError(null)
    setConfirmId(img.id)
  }

  function cancel() {
    setConfirmId(null)
    setError(null)
  }

  async function confirmDelete() {
    if (!confirmTarget) return
    setDeleting(true)
    setError(null)
    try {
      await deleteImage(confirmTarget.url, password)
      onDelete(confirmTarget.id)
      setConfirmId(null)
    } catch (err) {
      setError(err.message || 'No se pudo borrar la imagen.')
    }
    setDeleting(false)
  }

  if (!gallery || gallery.length === 0) {
    return <p className="text-xs text-gray-400 text-center py-6">Todavía no hay imágenes subidas.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {confirmTarget && (
        <div className="rounded-lg border p-2 text-xs" style={{ borderColor: usedIn.length ? '#fbbf24' : '#f87171' }}>
          {usedIn.length > 0 ? (
            <>
              <p className="font-semibold text-amber-700">No se puede borrar</p>
              <p className="text-gray-500 mt-0.5">
                Esta imagen se está usando en: <strong>{usedIn.join(', ')}</strong>. Quitala de ahí primero si querés borrarla.
              </p>
              <button
                type="button"
                onClick={cancel}
                className="mt-2 text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 font-medium"
              >
                Entendido
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-red-700">¿Borrar esta imagen?</p>
              <p className="text-gray-500 mt-0.5">Se elimina permanentemente de la galería y del repositorio.</p>
              {error && <p className="text-red-500 mt-1">{error}</p>}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={cancel}
                  disabled={deleting}
                  className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="text-xs bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50"
                >
                  {deleting ? 'Borrando...' : 'Sí, borrar'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
        {gallery.map(img => (
          <div key={img.id} className="relative group">
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(img.url)}
                className="block w-full aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-violet-400 transition bg-gray-50"
                title={img.filename}
              >
                <img src={getPreviewUrl(img.url) || img.url} alt={img.filename} className="w-full h-full object-cover" />
              </button>
            ) : (
              <div className="block w-full aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50" title={img.filename}>
                <img src={getPreviewUrl(img.url) || img.url} alt={img.filename} className="w-full h-full object-cover" />
              </div>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => openConfirm(img)}
                title="Borrar"
                className={`absolute top-1 right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition ${
                  confirmId === img.id
                    ? 'bg-red-500 text-white'
                    : 'bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500'
                }`}
              >
                ✕
              </button>
            )}
            <p className="text-[10px] text-gray-400 truncate mt-0.5">{formatBytes(img.sizeBytes)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
