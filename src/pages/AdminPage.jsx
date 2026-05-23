import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useContent } from '../hooks/useContent'
import BlockWrapper from '../editor/BlockWrapper'
import BlocksSidebar from '../editor/BlocksSidebar'
import NavbarEditor from '../editor/NavbarEditor'
import HeroBlock from '../blocks/HeroBlock'
import AboutBlock from '../blocks/AboutBlock'
import ServicesBlock from '../blocks/ServicesBlock'
import PricingBlock from '../blocks/PricingBlock'
import BooksBlock from '../blocks/BooksBlock'

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  about: AboutBlock,
  services: ServicesBlock,
  pricing: PricingBlock,
  books: BooksBlock,
}

const BLOCK_LABELS = {
  hero: 'Bienvenida (Hero)',
  about: 'Sobre mí',
  services: 'Servicios',
  pricing: 'Precios',
  books: 'Libros recomendados',
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
const MAINTENANCE_MODE = import.meta.env.VITE_ADMIN_MAINTENANCE === 'true'

function SortableBlock({ block, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id: block.id,
    data: { source: 'list', block },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drop indicator line shown when a sidebar template is dragged over this block */}
      {isOver && (
        <div className="h-1 bg-violet-400 rounded-full mx-4 mb-1 animate-pulse" />
      )}
      {/* Drag handle — only for reordering existing blocks */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 cursor-grab active:cursor-grabbing py-1.5 select-none transition"
        title="Arrastrar para reordenar"
      >
        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
        <span className="text-xs text-gray-500 font-medium">{BLOCK_LABELS[block.type]}</span>
      </div>
      {children}
    </div>
  )
}

export default function AdminPage() {
  if (MAINTENANCE_MODE) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
          <span className="text-5xl mb-4 block">🔧</span>
          <h1 className="text-2xl font-bold text-amber-700 mb-2">Panel en mantenimiento</h1>
          <p className="text-gray-500 text-sm">
            Estamos mejorando el editor. Vuelve en unos minutos.
          </p>
        </div>
      </div>
    )
  }

  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [activeDragData, setActiveDragData] = useState(null)
  const [navbarEditorOpen, setNavbarEditorOpen] = useState(false)

  const {
    content,
    loading,
    updateBlock,
    updateServiceCard,
    addServiceCard,
    removeServiceCard,
    toggleBlock,
    moveBlock,
    addBlock,
    removeBlock,
    updateNavbar,
  } = useContent()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  function handleDragStart({ active }) {
    setActiveId(active.id)
    setActiveDragData(active.data.current)
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    setActiveDragData(null)

    const source = active.data.current?.source

    if (source === 'sidebar') {
      // Dropped from sidebar → add new block
      const template = active.data.current.template
      const overBlockId = over?.data?.current?.source === 'list' ? over.id : null
      addBlock(template, overBlockId)
    } else if (source === 'list') {
      // Reordering existing blocks
      if (over && active.id !== over.id) {
        moveBlock(active.id, over.id)
      }
    }
  }

  async function handlePublish() {
    setPublishing(true)
    setPublishStatus(null)
    try {
      const res = await fetch('/.netlify/functions/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, content }),
      })
      const data = await res.json()
      if (res.ok) {
        setPublishStatus({ ok: true, msg: 'Publicado correctamente. Los cambios estarán visibles en 2-3 minutos.' })
      } else {
        setPublishStatus({ ok: false, msg: data.error || 'Error al publicar.' })
      }
    } catch {
      setPublishStatus({ ok: false, msg: 'No se pudo conectar. Intenta de nuevo.' })
    }
    setPublishing(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-violet-700 mb-2 text-center">Panel de edición</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Ingresa tu contraseña para editar el sitio</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && (
              <p className="text-red-500 text-sm text-center">Contraseña incorrecta</p>
            )}
            <button
              type="submit"
              className="bg-violet-600 text-white rounded-xl py-3 font-semibold hover:bg-violet-700 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
      </div>
    )
  }

  const isDraggingFromSidebar = activeDragData?.source === 'sidebar'
  const isDraggingFromList = activeDragData?.source === 'list'

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top admin bar */}
      <div className="sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-violet-400 font-bold text-lg">✦ Editor</span>
          <span className="text-gray-400 text-sm hidden sm:inline">
            {isDraggingFromSidebar ? '↓ Suelta el bloque en la posición que quieras' : 'Arrastra bloques para reordenar'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNavbarEditorOpen(o => !o)}
            className={`text-xs px-3 py-2 rounded-lg font-medium transition ${
              navbarEditorOpen
                ? 'bg-white text-gray-900'
                : 'text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400'
            }`}
          >
            ☰ Navbar
          </button>
          <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-white transition">
            Ver sitio →
          </a>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
          >
            {publishing ? 'Publicando...' : 'Publicar cambios'}
          </button>
        </div>
      </div>

      {/* Navbar editor panel */}
      {navbarEditorOpen && content.navbar && (
        <div className="bg-white border-b border-gray-200 px-6 py-5 shadow-inner">
          <div className="max-w-lg">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Editar navbar</p>
            <NavbarEditor navbar={content.navbar} onChange={updateNavbar} />
          </div>
        </div>
      )}

      {/* Publish status */}
      {publishStatus && (
        <div className={`px-6 py-3 text-sm text-center font-medium ${
          publishStatus.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {publishStatus.msg}
        </div>
      )}

      {/* Two-column layout */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => { setActiveId(null); setActiveDragData(null) }}
      >
        <div className="flex flex-1">
          {/* Main blocks area */}
          <main className="flex-1 pb-20 min-w-0">
            <SortableContext
              items={content.blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {content.blocks.map(block => {
                const Component = BLOCK_COMPONENTS[block.type]
                if (!Component) return null
                return (
                  <SortableBlock key={block.id} block={block}>
                    <BlockWrapper
                      block={block}
                      onUpdate={changes => updateBlock(block.id, changes)}
                      onToggle={() => toggleBlock(block.id)}
                      onDelete={() => removeBlock(block.id)}
                      onUpdateCard={(cardId, changes) => updateServiceCard(block.id, cardId, changes)}
                      onAddCard={() => addServiceCard(block.id)}
                      onRemoveCard={cardId => removeServiceCard(block.id, cardId)}
                    >
                      <Component block={block} />
                    </BlockWrapper>
                  </SortableBlock>
                )
              })}
            </SortableContext>

            {/* Drop zone at the bottom when dragging from sidebar */}
            {isDraggingFromSidebar && (
              <div className="mx-4 mt-2 border-2 border-dashed border-violet-300 rounded-xl py-8 text-center text-violet-400 text-sm">
                Suelta aquí para agregar al final
              </div>
            )}
          </main>

          {/* Right sidebar */}
          <BlocksSidebar />
        </div>

        {/* Drag overlay ghost */}
        <DragOverlay>
          {isDraggingFromList && activeDragData?.block && (
            <div className="bg-violet-100 border-2 border-violet-400 border-dashed rounded-xl opacity-80 py-8 text-center">
              <span className="text-violet-600 font-semibold">
                {BLOCK_LABELS[activeDragData.block.type]}
              </span>
            </div>
          )}
          {isDraggingFromSidebar && activeDragData?.template && (
            <div className="bg-white border-2 border-violet-500 rounded-xl shadow-xl px-5 py-4 w-56 opacity-90">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeDragData.template.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{activeDragData.template.label}</p>
                  <p className="text-xs text-violet-500">Soltando aquí se agrega</p>
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
