import ColorField from './ColorField'

export default function ServicesEditor({ block, onChange, onAddCard, onRemoveCard, onUpdateCard }) {
  const set = (key, val) => onChange({ [key]: val })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título de sección</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>
      <ColorField label="Color de fondo" value={block.bgColor} onChange={v => set('bgColor', v)} />
      <ColorField label="Color de texto" value={block.textColor} onChange={v => set('textColor', v)} />
      <ColorField label="Color de acento" value={block.accentColor} onChange={v => set('accentColor', v)} />

      <div className="border-t pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tarjetas de servicios</span>
          <button
            type="button"
            onClick={onAddCard}
            className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700"
          >
            + Agregar
          </button>
        </div>
        {block.cards.map(card => (
          <div key={card.id} className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 bg-gray-50">
            <div className="flex gap-2">
              <input
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-14 text-center"
                value={card.icon}
                onChange={e => onUpdateCard(card.id, { icon: e.target.value })}
                placeholder="🧠"
              />
              <input
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm flex-1"
                value={card.title}
                onChange={e => onUpdateCard(card.id, { title: e.target.value })}
                placeholder="Título"
              />
              <button
                type="button"
                onClick={() => onRemoveCard(card.id)}
                className="text-red-400 hover:text-red-600 px-2 text-lg"
              >
                ×
              </button>
            </div>
            <textarea
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm resize-none"
              rows={2}
              value={card.description}
              onChange={e => onUpdateCard(card.id, { description: e.target.value })}
              placeholder="Descripción"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
