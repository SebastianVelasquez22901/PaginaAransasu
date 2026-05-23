import { useEffect } from 'react'

export default function ProximamenteModal({ visible, onClose }) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onClose, 2000)
    return () => clearTimeout(timer)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl px-12 py-8 flex flex-col items-center gap-3 animate-fade-in">
        <span className="text-4xl">🚀</span>
        <p className="text-xl font-bold text-gray-800 tracking-tight">Próximamente</p>
        <p className="text-sm text-gray-400">Esta función estará disponible muy pronto</p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
          <div className="h-full bg-violet-500 rounded-full animate-progress-bar" />
        </div>
      </div>
    </div>
  )
}
