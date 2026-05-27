import ColorField from './ColorField'
import ButtonActionEditor from './ButtonActionEditor'
import AnimationField from './AnimationField'
import TextAlignField from './TextAlignField'
import FontField from './FontField'

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
      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
        <ButtonActionEditor config={block} onChange={onChange} />
      </div>

      <div className="border-t pt-4 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estilo y animación</p>
        <TextAlignField value={block.textAlign || 'center'} onChange={v => set('textAlign', v)} />
        <FontField value={block.fontFamily} onChange={v => set('fontFamily', v)} />
        <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />
      </div>

      <div className="border-t pt-4 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Colores</p>
        <ColorField label="Color de fondo" value={block.bgColor} onChange={v => set('bgColor', v)} />
        <ColorField label="Color de texto" value={block.textColor} onChange={v => set('textColor', v)} />
      </div>

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
