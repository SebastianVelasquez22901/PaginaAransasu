import { ANIMATIONS } from '../utils/animations'

export default function AnimationField({ value = 'none', onChange, label = 'Animación de entrada' }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="grid grid-cols-3 gap-1.5">
        {ANIMATIONS.map(anim => (
          <button
            key={anim.value}
            type="button"
            onClick={() => onChange(anim.value)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-medium transition ${
              value === anim.value
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'bg-white border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600'
            }`}
          >
            <span>{anim.emoji}</span>
            <span>{anim.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
