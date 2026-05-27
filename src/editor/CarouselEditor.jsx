import ColorField from './ColorField'
import AnimationField from './AnimationField'

export default function CarouselEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })

  function addPhoto() {
    onChange({
      photos: [...(block.photos || []), { id: `ph${Date.now()}`, url: '', caption: '' }],
    })
  }

  function updatePhoto(id, changes) {
    onChange({
      photos: block.photos.map(p => p.id === id ? { ...p, ...changes } : p),
    })
  }

  function removePhoto(id) {
    onChange({ photos: block.photos.filter(p => p.id !== id) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título (opcional)</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.title || ''}
            onChange={e => set('title', e.target.value)}
            placeholder="Ej: Galería"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo (opcional)</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.subtitle || ''}
            onChange={e => set('subtitle', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ColorField label="Color de fondo" value={block.bgColor || '#ffffff'} onChange={v => set('bgColor', v)} />
        <ColorField label="Color de texto" value={block.textColor || '#2d2d2d'} onChange={v => set('textColor', v)} />
        <ColorField label="Color de acento (puntos)" value={block.accentColor || '#7c3aed'} onChange={v => set('accentColor', v)} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Altura de las fotos</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={200}
            max={700}
            step={20}
            value={parseInt(block.height) || 480}
            onChange={e => set('height', `${e.target.value}px`)}
            className="flex-1 accent-violet-600"
          />
          <span className="text-sm text-gray-500 w-14 text-right">{block.height || '480px'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
        <div>
          <p className="text-sm font-semibold text-gray-700">Avance automático</p>
          <p className="text-xs text-gray-400">Las fotos cambian solas</p>
        </div>
        <button
          type="button"
          onClick={() => set('autoPlay', !block.autoPlay)}
          className={`relative w-11 h-6 rounded-full transition-colors ${block.autoPlay ? 'bg-violet-600' : 'bg-gray-300'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${block.autoPlay ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      {block.autoPlay && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Intervalo entre fotos</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={2}
              max={10}
              step={1}
              value={block.interval || 4}
              onChange={e => set('interval', Number(e.target.value))}
              className="flex-1 accent-violet-600"
            />
            <span className="text-sm text-gray-500 w-14 text-right">{block.interval || 4}s</span>
          </div>
        </div>
      )}

      <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />

      <div className="border-t pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Fotos</span>
          <button
            type="button"
            onClick={addPhoto}
            className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700"
          >
            + Agregar foto
          </button>
        </div>
        <p className="text-xs text-gray-400 -mt-1">Pega la URL directa de cada imagen.</p>

        {(block.photos || []).map((photo, i) => (
          <div key={photo.id} className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2.5 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Foto {i + 1}</span>
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="text-red-400 hover:text-red-600 text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">URL de la imagen</label>
              <input
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                value={photo.url}
                onChange={e => updatePhoto(photo.id, { url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Pie de foto (opcional)</label>
              <input
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                value={photo.caption || ''}
                onChange={e => updatePhoto(photo.id, { caption: e.target.value })}
                placeholder="Descripción breve..."
              />
            </div>
            {photo.url && (
              <img
                src={photo.url}
                alt=""
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
