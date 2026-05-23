import ColorField from './ColorField'

export default function NavbarEditor({ navbar, onChange }) {
  const set = (key, val) => onChange({ [key]: val })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre del sitio</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={navbar.brandName}
          onChange={e => set('brandName', e.target.value)}
          placeholder="Ej: Aransasu"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ColorField label="Fondo navbar" value={navbar.bgColor} onChange={v => set('bgColor', v)} />
        <ColorField label="Color de texto" value={navbar.textColor} onChange={v => set('textColor', v)} />
        <ColorField label="Color de acento" value={navbar.accentColor} onChange={v => set('accentColor', v)} />
      </div>

      <div className="border-t pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Botón CTA</span>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Texto del botón</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={navbar.ctaText}
              onChange={e => set('ctaText', e.target.value)}
              placeholder="Ej: Agendar consulta"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Enlace</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={navbar.ctaLink}
              onChange={e => set('ctaLink', e.target.value)}
              placeholder="Ej: #contacto"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
        Los enlaces del menú se generan automáticamente según los bloques visibles en la página.
      </p>
    </div>
  )
}
