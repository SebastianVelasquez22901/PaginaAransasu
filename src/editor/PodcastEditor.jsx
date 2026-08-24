import ImagePickerField from './ImagePickerField'

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 w-full'

function EpisodeRow({ ep, index, onChange, onRemove, gallery, content, password, onAddGalleryImage, onRemoveGalleryImage }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Episodio {index + 1}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-red-400 hover:text-red-600 font-semibold transition"
        >
          Eliminar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Field label="Título">
            <input className={inputCls} value={ep.title} onChange={e => onChange({ title: e.target.value })} placeholder="Nombre del episodio" />
          </Field>
        </div>
        <Field label="Duración">
          <input className={inputCls} value={ep.duration || ''} onChange={e => onChange({ duration: e.target.value })} placeholder="32 min" />
        </Field>
        <Field label="Link del episodio">
          <input className={inputCls} value={ep.link || ''} onChange={e => onChange({ link: e.target.value })} placeholder="https://..." />
        </Field>
        <div className="col-span-2">
          <Field label="Descripción">
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              value={ep.description || ''}
              onChange={e => onChange({ description: e.target.value })}
              placeholder="Breve descripción del episodio..."
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Imagen (opcional)">
            <ImagePickerField
              field="image"
              data={ep}
              onChange={onChange}
              fit="cover"
              shape="rounded"
              aspectRatio={1}
              gallery={gallery}
              content={content}
              password={password}
              onAddGalleryImage={onAddGalleryImage}
              onRemoveGalleryImage={onRemoveGalleryImage}
            />
          </Field>
        </div>
      </div>
    </div>
  )
}

export default function PodcastEditor({ block, onChange, gallery, content, password, onAddGalleryImage, onRemoveGalleryImage }) {
  const platforms = block.platforms || {}
  const episodes = block.episodes || []

  function updatePlatform(key, value) {
    onChange({ platforms: { ...platforms, [key]: value } })
  }

  function addEpisode() {
    const ep = { id: `ep${Date.now()}`, title: 'Nuevo episodio', description: '', duration: '', link: '', image: '' }
    onChange({ episodes: [...episodes, ep] })
  }

  function updateEpisode(id, changes) {
    onChange({ episodes: episodes.map(ep => ep.id === id ? { ...ep, ...changes } : ep) })
  }

  function removeEpisode(id) {
    onChange({ episodes: episodes.filter(ep => ep.id !== id) })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Basic info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label="Título del podcast">
            <input className={inputCls} value={block.title || ''} onChange={e => onChange({ title: e.target.value })} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Descripción">
            <textarea className={`${inputCls} resize-none`} rows={2} value={block.subtitle || ''} onChange={e => onChange({ subtitle: e.target.value })} placeholder="Breve descripción del podcast..." />
          </Field>
        </div>
        <Field label="Color de fondo">
          <div className="flex gap-2 items-center">
            <input type="color" value={block.bgColor || '#f5f0ff'} onChange={e => onChange({ bgColor: e.target.value })} className="w-10 h-9 rounded cursor-pointer border border-gray-200" />
            <input className={inputCls} value={block.bgColor || ''} onChange={e => onChange({ bgColor: e.target.value })} />
          </div>
        </Field>
        <Field label="Color de texto">
          <div className="flex gap-2 items-center">
            <input type="color" value={block.textColor || '#2d2d2d'} onChange={e => onChange({ textColor: e.target.value })} className="w-10 h-9 rounded cursor-pointer border border-gray-200" />
            <input className={inputCls} value={block.textColor || ''} onChange={e => onChange({ textColor: e.target.value })} />
          </div>
        </Field>
        <Field label="Color de acento">
          <div className="flex gap-2 items-center">
            <input type="color" value={block.accentColor || '#7c3aed'} onChange={e => onChange({ accentColor: e.target.value })} className="w-10 h-9 rounded cursor-pointer border border-gray-200" />
            <input className={inputCls} value={block.accentColor || ''} onChange={e => onChange({ accentColor: e.target.value })} />
          </div>
        </Field>
      </div>

      {/* Platforms */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Plataformas (deja vacío para ocultar)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/show/...' },
            { key: 'apple',   label: 'Apple Podcasts', placeholder: 'https://podcasts.apple.com/...' },
            { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
            { key: 'google',  label: 'Google Podcasts', placeholder: 'https://podcasts.google.com/...' },
          ].map(({ key, label, placeholder }) => (
            <Field key={key} label={label}>
              <input
                className={inputCls}
                value={platforms[key] || ''}
                onChange={e => updatePlatform(key, e.target.value)}
                placeholder={placeholder}
              />
            </Field>
          ))}
        </div>
      </div>

      {/* Episodes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Episodios</p>
          <button
            type="button"
            onClick={addEpisode}
            className="text-xs font-semibold text-violet-600 hover:text-violet-800 border border-violet-300 hover:border-violet-500 px-3 py-1 rounded-lg transition"
          >
            + Agregar episodio
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {episodes.map((ep, i) => (
            <EpisodeRow
              key={ep.id}
              ep={ep}
              index={i}
              onChange={changes => updateEpisode(ep.id, changes)}
              onRemove={() => removeEpisode(ep.id)}
              gallery={gallery}
              content={content}
              password={password}
              onAddGalleryImage={onAddGalleryImage}
              onRemoveGalleryImage={onRemoveGalleryImage}
            />
          ))}
          {episodes.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">No hay episodios. Agrega el primero.</p>
          )}
        </div>
      </div>
    </div>
  )
}
