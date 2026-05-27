const OPTIONS = [
  {
    value: 'left',
    label: 'Izquierda',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <rect x="2" y="4" width="16" height="2" rx="1"/>
        <rect x="2" y="9" width="10" height="2" rx="1"/>
        <rect x="2" y="14" width="14" height="2" rx="1"/>
      </svg>
    ),
  },
  {
    value: 'center',
    label: 'Centro',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <rect x="2" y="4" width="16" height="2" rx="1"/>
        <rect x="5" y="9" width="10" height="2" rx="1"/>
        <rect x="3" y="14" width="14" height="2" rx="1"/>
      </svg>
    ),
  },
  {
    value: 'right',
    label: 'Derecha',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <rect x="2" y="4" width="16" height="2" rx="1"/>
        <rect x="8" y="9" width="10" height="2" rx="1"/>
        <rect x="4" y="14" width="14" height="2" rx="1"/>
      </svg>
    ),
  },
]

export default function TextAlignField({ value = 'left', onChange, label = 'Alineación de texto' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="flex gap-1.5">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            title={opt.label}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2 rounded-lg border flex items-center justify-center transition ${
              value === opt.value
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'bg-white border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600'
            }`}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
