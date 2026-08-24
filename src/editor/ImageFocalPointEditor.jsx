import { useRef } from 'react'

const SHAPE_CLASS = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
  rect: 'rounded-lg',
}

export default function ImageFocalPointEditor({ url, focalX = 50, focalY = 50, zoom = 1, shape = 'rounded', aspectRatio = 1, onChange, onDone }) {
  const boxRef = useRef(null)

  function handleClick(e) {
    const rect = boxRef.current.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100))
    onChange({ focalX: x, focalY: y })
  }

  const boxWidth = 220
  const ratio = shape === 'circle' ? 1 : (aspectRatio || 1)
  const boxHeight = boxWidth / ratio

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-gray-500">Haz clic en la imagen para elegir qué parte se ve.</p>

      <div
        ref={boxRef}
        onClick={handleClick}
        style={{ width: boxWidth, height: boxHeight }}
        className={`relative mx-auto overflow-hidden border-2 border-violet-300 cursor-crosshair ${SHAPE_CLASS[shape] || SHAPE_CLASS.rounded}`}
      >
        <img
          src={url}
          alt="Vista previa"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: `${focalX}% ${focalY}%`, transform: zoom !== 1 ? `scale(${zoom})` : undefined }}
        />
        <div
          className="absolute w-3 h-3 rounded-full bg-white border-2 border-violet-600 shadow pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${focalX}%`, top: `${focalY}%` }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Zoom</label>
        <input
          type="range"
          min={1}
          max={2.5}
          step={0.05}
          value={zoom}
          onChange={e => onChange({ zoom: Number(e.target.value) })}
          className="w-full accent-violet-600"
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        <button
          type="button"
          onClick={() => onChange({ focalX: 50, focalY: 50, zoom: 1 })}
          className="text-xs text-gray-500 hover:text-gray-700 font-medium"
        >
          Restablecer
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-xs bg-violet-600 text-white px-4 py-1.5 rounded-lg hover:bg-violet-700 font-semibold"
        >
          Listo
        </button>
      </div>
    </div>
  )
}
