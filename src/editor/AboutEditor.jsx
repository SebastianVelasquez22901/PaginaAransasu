import ColorField from './ColorField'
import AnimationField from './AnimationField'
import TextAlignField from './TextAlignField'
import FontField from './FontField'
import ImagePickerField from './ImagePickerField'

export default function AboutEditor({ block, onChange, gallery, content, password, onAddGalleryImage, onRemoveGalleryImage }) {
  const set = (key, val) => onChange({ [key]: val })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Texto</label>
        <textarea
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
          rows={6}
          value={block.body}
          onChange={e => set('body', e.target.value)}
        />
      </div>

      <div className="border-t pt-4 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estilo y animación</p>
        <TextAlignField value={block.textAlign || 'left'} onChange={v => set('textAlign', v)} />
        <FontField value={block.fontFamily} onChange={v => set('fontFamily', v)} />
        <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />
      </div>

      <div className="border-t pt-4 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Colores</p>
        <ColorField label="Color de fondo" value={block.bgColor} onChange={v => set('bgColor', v)} />
        <ColorField label="Color de texto" value={block.textColor} onChange={v => set('textColor', v)} />
        <ColorField label="Color de acento" value={block.accentColor} onChange={v => set('accentColor', v)} />
      </div>

      <ImagePickerField
        label="Imagen"
        field="image"
        data={block}
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
    </div>
  )
}
