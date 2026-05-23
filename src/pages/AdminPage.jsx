import { useState } from 'react'
import { useContent } from '../hooks/useContent'
import BlockWrapper from '../editor/BlockWrapper'
import HeroBlock from '../blocks/HeroBlock'
import AboutBlock from '../blocks/AboutBlock'
import ServicesBlock from '../blocks/ServicesBlock'

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  about: AboutBlock,
  services: ServicesBlock,
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState(null)

  const {
    content,
    loading,
    updateBlock,
    updateServiceCard,
    addServiceCard,
    removeServiceCard,
    toggleBlock,
  } = useContent()

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setLoginError(false)
    } else {
      setLoginError(true)
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top admin bar */}
      <div className="sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-violet-400 font-bold text-lg">✦ Editor</span>
          <span className="text-gray-400 text-sm hidden sm:inline">Modo edición — los clientes no ven esta barra</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-xs text-gray-400 hover:text-white transition"
          >
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

      {/* Publish status */}
      {publishStatus && (
        <div className={`px-6 py-3 text-sm text-center font-medium ${
          publishStatus.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {publishStatus.msg}
        </div>
      )}

      {/* Blocks with editors */}
      <div className="pb-20">
        {content.blocks.map(block => {
          const Component = BLOCK_COMPONENTS[block.type]
          if (!Component) return null
          return (
            <BlockWrapper
              key={block.id}
              block={block}
              onUpdate={changes => updateBlock(block.id, changes)}
              onToggle={() => toggleBlock(block.id)}
              onUpdateCard={(cardId, changes) => updateServiceCard(block.id, cardId, changes)}
              onAddCard={() => addServiceCard(block.id)}
              onRemoveCard={cardId => removeServiceCard(block.id, cardId)}
            >
              <Component block={block} />
            </BlockWrapper>
          )
        })}
      </div>
    </div>
  )
}
