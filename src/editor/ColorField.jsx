import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function ColorField({ label, value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 w-full hover:border-gray-400 transition"
        >
          <span
            className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm font-mono">{value}</span>
        </button>
        {open && (
          <div className="absolute z-50 mt-2 shadow-xl rounded-xl overflow-hidden">
            <HexColorPicker color={value} onChange={onChange} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full bg-gray-800 text-white text-sm py-2 hover:bg-gray-700"
            >
              Listo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
