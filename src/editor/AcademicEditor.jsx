import ColorField from './ColorField'
import AnimationField from './AnimationField'

const TYPE_OPTIONS = [
  { value: 'degree', label: '🎓 Título / Maestría' },
  { value: 'certification', label: '📜 Certificación' },
  { value: 'course', label: '📚 Curso / Diplomado' },
  { value: 'award', label: '🏆 Reconocimiento' },
]

export default function AcademicEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })
  const items = block.items || []

  function addItem() {
    onChange({
      items: [...items, {
        id: `ac${Date.now()}`,
        type: 'degree',
        title: 'Nuevo logro académico',
        institution: '',
        year: '',
        description: '',
      }],
    })
  }

  function updateItem(id, changes) {
    onChange({ items: items.map(i => i.id === id ? { ...i, ...changes } : i) })
  }

  function removeItem(id) {
    onChange({ items: items.filter(i => i.id !== id) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.title || ''}
            onChange={e => set('title', e.target.value)}
            placeholder="Historial Académico"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.subtitle || ''}
            onChange={e => set('subtitle', e.target.value)}
            placeholder="Formación y certificaciones"
          />
        </div>
      </div>

      <div className="border-t pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Logros académicos ({items.length})
          </span>
          <button
            type="button"
            onClick={addItem}
            className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700"
          >
            + Agregar
          </button>
        </div>

        {items.map(item => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 bg-gray-50">
            <div className="flex items-center justify-between gap-2">
              <select
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs bg-white flex-1"
                value={item.type || 'degree'}
                onChange={e => updateItem(item.id, { type: e.target.value })}
              >
                {TYPE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 text-xl leading-none px-1"
              >×</button>
            </div>
            <input
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm bg-white"
              value={item.title || ''}
              onChange={e => updateItem(item.id, { title: e.target.value })}
              placeholder="Nombre del título o certificación"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm bg-white"
                value={item.institution || ''}
                onChange={e => updateItem(item.id, { institution: e.target.value })}
                placeholder="Institución"
              />
              <input
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm bg-white"
                value={item.year || ''}
                onChange={e => updateItem(item.id, { year: e.target.value })}
                placeholder="Año (ej: 2020)"
              />
            </div>
            <textarea
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm resize-none bg-white"
              rows={2}
              value={item.description || ''}
              onChange={e => updateItem(item.id, { description: e.target.value })}
              placeholder="Descripción breve (opcional)"
            />
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Colores y animación</span>
        <div className="grid grid-cols-3 gap-3">
          <ColorField label="Fondo" value={block.bgColor || '#ffffff'} onChange={v => set('bgColor', v)} />
          <ColorField label="Texto" value={block.textColor || '#2d2d2d'} onChange={v => set('textColor', v)} />
          <ColorField label="Acento" value={block.accentColor || '#5BB8A8'} onChange={v => set('accentColor', v)} />
        </div>
        <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />
      </div>
    </div>
  )
}
