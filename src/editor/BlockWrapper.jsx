import { useState } from 'react'
import HeroEditor from './HeroEditor'
import AboutEditor from './AboutEditor'
import ServicesEditor from './ServicesEditor'

const EDITORS = {
  hero: HeroEditor,
  about: AboutEditor,
  services: ServicesEditor,
}

const BLOCK_LABELS = {
  hero: 'Bienvenida (Hero)',
  about: 'Sobre mí',
  services: 'Servicios',
}

export default function BlockWrapper({ block, onUpdate, onUpdateCard, onAddCard, onRemoveCard, onToggle, children }) {
  const [open, setOpen] = useState(false)
  const Editor = EDITORS[block.type]

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
