import ColorField from './ColorField'
import ImagePickerField from './ImagePickerField'

export default function NavbarEditor({ navbar, onChange, gallery, content, password, onAddGalleryImage, onRemoveGalleryImage }) {
  const set = (key, val) => onChange({ [key]: val })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Logo</label>
        {/* fit="contain": el hack de recorte de altura fija en Navbar.jsx se deja intacto, no aplica punto focal/zoom */}
        <ImagePickerField
          field="logoUrl"
          data={navbar}
          onChange={onChange}
          fit="contain"
          shape="rect"
          gallery={gallery}
          content={content}
          password={password}
          onAddGalleryImage={onAddGalleryImage}
          onRemoveGalleryImage={onRemoveGalleryImage}
        />
        <div className="flex flex-col gap-1 mt-1">
          <label className="text-xs text-gray-400">Tamaño del logo (px)</label>
          <input
            type="range"
            min={32}
            max={120}
            step={4}
            value={navbar.logoHeight || 80}
            onChange={e => set('logoHeight', Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <span className="text-xs text-gray-400 text-right">{navbar.logoHeight || 80} px</span>
        </div>
        <p className="text-xs text-gray-400">Cuando hay logo, se muestra la imagen en lugar del nombre de texto.</p>
      </div>

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
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hover de enlaces</span>
        <ColorField
          label="Color de línea al pasar el cursor"
          value={navbar.hoverLineColor || navbar.accentColor || '#7c3aed'}
          onChange={v => set('hoverLineColor', v)}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Grosor de la línea (px)</label>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={navbar.hoverLineWidth || 2}
            onChange={e => set('hoverLineWidth', Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <span className="text-xs text-gray-400 text-right">{navbar.hoverLineWidth || 2} px</span>
        </div>
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
