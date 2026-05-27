import { useState, useEffect, useRef } from 'react'

const EMOJI_CATALOG = [
  // Mente y bienestar
  '🧠', '💆', '🌱', '🌿', '☮️', '🕊️', '💫', '✨',
  // Corazón y emociones
  '❤️', '💜', '💚', '💙', '🧡', '💛', '🤍', '💗',
  // Personas y apoyo
  '🤝', '👐', '🙏', '🫂', '👥', '🧑‍⚕️', '🌸', '🦋',
  // Naturaleza y paz
  '🌺', '🌻', '🍃', '🌊', '🏔️', '🌅', '🌙', '🌈',
  // Crecimiento y logros
  '📚', '✍️', '🎯', '🌟', '⭐', '💡', '🔑', '🚀',
  // Herramientas de bienestar
  '🎧', '🎶', '🧘', '☀️', '🕯️', '📖', '💭', '🪷',
]

export default function EmojiPickerField({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState('')
  const popoverRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function handleCustom() {
    const trimmed = custom.trim()
    if (trimmed) { onChange(trimmed); setCustom(''); setOpen(false) }
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-12 h-10 border border-gray-200 rounded-lg text-2xl flex items-center justify-center hover:border-violet-400 transition bg-white shadow-sm"
        title="Cambiar emoji"
      >
        {value || '⭐'}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-40 bg-white border border-gray-200 rounded-2xl shadow-2xl p-3 w-64">
          <p className="text-xs text-gray-400 mb-2 font-medium">Selecciona un emoji</p>
          <div className="grid grid-cols-8 gap-0.5 mb-3">
            {EMOJI_CATALOG.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => { onChange(emoji); setOpen(false) }}
                className={`text-xl rounded-lg p-1 hover:bg-violet-50 transition leading-none ${
                  value === emoji ? 'bg-violet-100 ring-1 ring-violet-400' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex gap-1 border-t border-gray-100 pt-2">
            <input
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCustom()}
              placeholder="Emoji personalizado..."
              maxLength={4}
            />
            <button
              type="button"
              onClick={handleCustom}
              className="px-3 py-1 bg-violet-600 text-white rounded-lg text-xs font-medium hover:bg-violet-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
