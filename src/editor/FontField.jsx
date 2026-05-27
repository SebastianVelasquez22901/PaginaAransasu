import { FONTS } from '../utils/fonts'

export default function FontField({ value, onChange }) {
  const current = value || FONTS[0].value

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipografía</label>
      <div className="grid grid-cols-2 gap-1.5">
        {FONTS.map(font => (
          <button
            key={font.value}
            type="button"
            onClick={() => onChange(font.value)}
            className={`px-3 py-2 rounded-lg border text-left transition flex flex-col gap-0.5 ${
              current === font.value
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-violet-400'
            }`}
            style={{ fontFamily: font.value }}
          >
            <span className="text-base font-bold leading-none">Aa</span>
            <span className="text-xs opacity-75 leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              {font.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
