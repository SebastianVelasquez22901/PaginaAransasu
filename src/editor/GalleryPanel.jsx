import { useState, useRef } from 'react'
import GalleryGrid from './GalleryGrid'
import GalleryUsageBar from './GalleryUsageBar'
import { uploadImage } from '../utils/gallery'

export default function GalleryPanel({ content, gallery, password, onAddGalleryImage, onRemoveGalleryImage }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  async function handleFiles(files) {
    setError(null)
    const file = files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const entry = await uploadImage(file, password)
      onAddGalleryImage(entry)
    } catch (err) {
      setError(err.message || 'No se pudo subir la imagen.')
    }
    setUploading(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <GalleryUsageBar gallery={gallery} />

      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 hover:border-violet-400 rounded-xl py-6 text-center text-sm text-gray-400 cursor-pointer transition"
      >
        {uploading ? 'Subiendo...' : 'Arrastra una imagen aquí o haz clic para elegir un archivo'}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}

      <p className="text-xs text-gray-400">Recuerda hacer clic en "Publicar cambios" después de subir imágenes.</p>

      <GalleryGrid gallery={gallery} content={content} onDelete={onRemoveGalleryImage} password={password} />
    </div>
  )
}
