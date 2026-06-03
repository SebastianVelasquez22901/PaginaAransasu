import ColorField from './ColorField'
import ButtonActionEditor from './ButtonActionEditor'
import AnimationField from './AnimationField'
import TextAlignField from './TextAlignField'
import FontField from './FontField'

const TEXT_ENTRANCES = [
  { value: 'none',     emoji: '⬜', label: 'Sin anim.' },
  { value: 'fall',     emoji: '⬇️', label: 'Caída' },
  { value: 'rise',     emoji: '⬆️', label: 'Rebote' },
  { value: 'blur-in',  emoji: '🌫️', label: 'Desenfoque' },
  { value: 'cascade',  emoji: '◀️', label: 'Cascada' },
  { value: 'paint',    emoji: '🖌️', label: 'Pintura' },
  { value: 'expand',   emoji: '🔍', label: 'Expansión' },
]

const AMBIENT_TYPES = [
  { value: 'none',       emoji: '⬜', label: 'Sin fondo' },
  { value: 'particles',  emoji: '✦',  label: 'Partículas' },
  { value: 'blobs',      emoji: '💧', label: 'Líquido' },
  { value: 'waves',      emoji: '🌊', label: 'Ondas' },
  { value: 'aurora',     emoji: '🌅', label: 'Aurora' },
  { value: 'bubbles',    emoji: '🫧', label: 'Burbujas' },
  { value: 'geometric',  emoji: '◇',  label: 'Geométrico' },
]

export default function HeroEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })
  const hasAmbient = block.ambientBg && block.ambientBg !== 'none'

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

      {/* Text & scroll animation */}
      <div className="border-t pt-4 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estilo y animación</p>
        <TextAlignField value={block.textAlign || 'center'} onChange={v => set('textAlign', v)} />
        <FontField value={block.fontFamily} onChange={v => set('fontFamily', v)} />
        <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />

        {/* Text entrance */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Animación de texto al cargar</label>
          <div className="grid grid-cols-3 gap-1.5">
            {TEXT_ENTRANCES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => set('textEntrance', t.value)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-medium transition ${
                  (block.textEntrance || 'none') === t.value
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-600'
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient background */}
      <div className="border-t pt-4 flex flex-col gap-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fondo ambiental</p>
        <p className="text-xs text-gray-400 -mt-1">Partículas, gradientes y flujos sutiles que dan profundidad sin distraer.</p>

        <div className="grid grid-cols-3 gap-1.5">
          {AMBIENT_TYPES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => set('ambientBg', t.value)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-medium transition ${
                (block.ambientBg || 'none') === t.value
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-600'
              }`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {hasAmbient && (
          <div className="flex flex-col gap-3 mt-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label="Color principal"
                value={block.ambientColor1 || block.textColor || '#5BB8A8'}
                onChange={v => set('ambientColor1', v)}
              />
              <ColorField
                label="Color secundario"
                value={block.ambientColor2 || block.bgColor || '#a8e6df'}
                onChange={v => set('ambientColor2', v)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Intensidad del efecto</label>
              <input
                type="range"
                min={5}
                max={80}
                step={5}
                value={Math.round((block.ambientIntensity ?? 0.3) * 100)}
                onChange={e => set('ambientIntensity', Number(e.target.value) / 100)}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Sutil</span>
                <span>{Math.round((block.ambientIntensity ?? 0.3) * 100)}%</span>
                <span>Intenso</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
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
