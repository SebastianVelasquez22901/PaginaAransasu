import { useState } from 'react'
import HeroEditor from './HeroEditor'
import AboutEditor from './AboutEditor'
import ServicesEditor from './ServicesEditor'
import PricingEditor from './PricingEditor'
import BooksEditor from './BooksEditor'
import PodcastEditor from './PodcastEditor'
import CarouselEditor from './CarouselEditor'
import LocationEditor from './LocationEditor'
import AcademicEditor from './AcademicEditor'

const EDITORS = {
  hero: HeroEditor,
  about: AboutEditor,
  services: ServicesEditor,
  pricing: PricingEditor,
  books: BooksEditor,
  podcast: PodcastEditor,
  carousel: CarouselEditor,
  location: LocationEditor,
  academic: AcademicEditor,
}

const BLOCK_LABELS = {
  hero: 'Bienvenida (Hero)',
  about: 'Sobre mí',
  services: 'Servicios',
  pricing: 'Precios',
  books: 'Libros recomendados',
  podcast: 'Podcast',
  carousel: 'Carrusel de fotos',
  location: 'Ubicación',
  academic: 'Historial Académico',
}

export default function BlockWrapper({ block, onUpdate, onUpdateCard, onAddCard, onRemoveCard, onToggle, onDelete, children, gallery, content, password, onAddGalleryImage, onRemoveGalleryImage }) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const Editor = EDITORS[block.type]

  function handleDelete() {
    if (confirmDelete) {
      onDelete()
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <div className="relative group">
      {/* Edit bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-violet-700 text-white px-4 py-2 shadow">
        <span className="text-sm font-semibold">{BLOCK_LABELS[block.type]}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className={`text-xs px-3 py-1 rounded-full border border-white/40 transition ${
              block.visible ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500/60 hover:bg-red-500/80'
            }`}
          >
            {block.visible ? 'Visible' : 'Oculto'}
          </button>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="text-xs px-3 py-1 rounded-full bg-white text-violet-700 font-semibold hover:bg-violet-100 transition"
          >
            {open ? 'Cerrar editor' : 'Editar bloque'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`text-xs px-3 py-1 rounded-full border transition font-semibold ${
              confirmDelete
                ? 'bg-red-500 border-red-400 text-white hover:bg-red-600 animate-pulse'
                : 'border-white/40 text-white/70 hover:bg-red-500/60 hover:text-white'
            }`}
            title={confirmDelete ? 'Haz clic de nuevo para confirmar' : 'Borrar bloque'}
          >
            {confirmDelete ? '¿Confirmar borrado?' : '✕ Borrar'}
          </button>
        </div>
      </div>

      {/* Inline editor panel */}
      {open && Editor && (
        <div className="bg-white border-b border-violet-200 px-6 py-5 shadow-inner">
          <Editor
            block={block}
            onChange={onUpdate}
            onAddCard={onAddCard}
            onRemoveCard={(cardId) => onRemoveCard(cardId)}
            onUpdateCard={(cardId, changes) => onUpdateCard(cardId, changes)}
            gallery={gallery}
            content={content}
            password={password}
            onAddGalleryImage={onAddGalleryImage}
            onRemoveGalleryImage={onRemoveGalleryImage}
          />
        </div>
      )}

      {/* Block content — dimmed when hidden */}
      <div className={block.visible ? '' : 'opacity-30 pointer-events-none select-none'}>
        {children}
      </div>
    </div>
  )
}
