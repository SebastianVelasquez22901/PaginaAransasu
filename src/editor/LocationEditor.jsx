import ColorField from './ColorField'
import AnimationField from './AnimationField'

export default function LocationEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })
  const hours = block.hours || []

  function addHour() {
    onChange({ hours: [...hours, { id: `h${Date.now()}`, days: 'Lunes – Viernes', time: '9:00 – 18:00' }] })
  }
  function updateHour(id, changes) {
    onChange({ hours: hours.map(h => h.id === id ? { ...h, ...changes } : h) })
  }
  function removeHour(id) {
    onChange({ hours: hours.filter(h => h.id !== id) })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Texts */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.title || ''}
            onChange={e => set('title', e.target.value)}
            placeholder="Mi Consultorio"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.subtitle || ''}
            onChange={e => set('subtitle', e.target.value)}
            placeholder="Opcional"
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dirección completa</label>
        <textarea
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
          rows={3}
          value={block.address || ''}
          onChange={e => set('address', e.target.value)}
          placeholder="7a Av. 15-65, Zona 10&#10;Torre Médica, Piso 4, Of. 402&#10;Ciudad de Guatemala"
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Teléfono</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.phone || ''}
            onChange={e => set('phone', e.target.value)}
            placeholder="+502 1234 5678"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Correo</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.email || ''}
            onChange={e => set('email', e.target.value)}
            placeholder="tu@correo.com"
          />
        </div>
      </div>

      {/* Directions button */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Texto del botón</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.buttonText || ''}
            onChange={e => set('buttonText', e.target.value)}
            placeholder="Cómo llegar"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Enlace Google Maps</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={block.mapsLink || ''}
            onChange={e => set('mapsLink', e.target.value)}
            placeholder="https://maps.google.com/..."
          />
        </div>
      </div>

      {/* Schedule */}
      <div className="border-t pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horarios</span>
          <button
            type="button"
            onClick={addHour}
            className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700"
          >
            + Agregar
          </button>
        </div>
        {hours.map(row => (
          <div key={row.id} className="flex gap-2 items-center">
            <input
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm flex-1"
              value={row.days}
              onChange={e => updateHour(row.id, { days: e.target.value })}
              placeholder="Lunes – Viernes"
            />
            <input
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-32"
              value={row.time}
              onChange={e => updateHour(row.id, { time: e.target.value })}
              placeholder="9:00 – 18:00"
            />
            <button
              type="button"
              onClick={() => removeHour(row.id)}
              className="text-red-400 hover:text-red-600 text-lg leading-none px-1"
            >×</button>
          </div>
        ))}
      </div>

      {/* Map embed */}
      <div className="border-t pt-4 flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">URL del mapa (Google Maps embed)</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.mapUrl || ''}
          onChange={e => set('mapUrl', e.target.value)}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 leading-relaxed">
          <p className="font-semibold mb-1">¿Cómo obtener el enlace?</p>
          <ol className="list-decimal list-inside flex flex-col gap-0.5">
            <li>Abre <strong>Google Maps</strong> y busca tu dirección</li>
            <li>Haz clic en <strong>Compartir</strong> (ícono de compartir)</li>
            <li>Selecciona la pestaña <strong>"Incorporar un mapa"</strong></li>
            <li>Copia solo la URL que aparece dentro de <code className="bg-blue-100 px-1 rounded">src="..."</code></li>
            <li>Pégala aquí arriba</li>
          </ol>
        </div>
      </div>

      {/* Colors + animation */}
      <div className="border-t pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Colores y animación</span>
        <div className="grid grid-cols-3 gap-3">
          <ColorField label="Fondo" value={block.bgColor || '#ffffff'} onChange={v => set('bgColor', v)} />
          <ColorField label="Texto" value={block.textColor || '#2d2d2d'} onChange={v => set('textColor', v)} />
          <ColorField label="Acento" value={block.accentColor || '#7c3aed'} onChange={v => set('accentColor', v)} />
        </div>
        <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />
      </div>
    </div>
  )
}
