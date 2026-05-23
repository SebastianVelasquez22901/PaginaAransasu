import ColorField from './ColorField'

export default function HeroEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título principal</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.subtitle}
          onChange={e => set('subtitle', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Texto del botón</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.buttonText}
          onChange={e => set('buttonText', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Link del botón</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.buttonLink}
          onChange={e => set('buttonLink', e.target.value)}
          placeholder="#contacto o https://..."
        />
      </div>
      <ColorField label="Color de fondo" value={block.bgColor} onChange={v => set('bgColor', v)} />
      <ColorField label="Color de texto" value={block.textColor} onChange={v => set('textColor', v)} />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Imagen de perfil (URL)</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.image}
          onChange={e => set('image', e.target.value)}
          placeholder="https://... o deja vacío"
        />
      </div>
    </div>
  )
}
