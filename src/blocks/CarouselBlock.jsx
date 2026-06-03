import { useState, useEffect, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { resolveImageUrl } from '../utils/imageUrl'

export default function CarouselBlock({ block }) {
  const photos = block.photos || []
  const [current, setCurrent] = useState(0)
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')

  const prev = useCallback(() => setCurrent(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    if (!block.autoPlay || photos.length < 2) return
    const ms = (block.interval || 4) * 1000
    const t = setInterval(next, ms)
    return () => clearInterval(t)
  }, [block.autoPlay, block.interval, next, photos.length])

  // Reset index if photos shrink
  useEffect(() => {
    if (current >= photos.length && photos.length > 0) setCurrent(0)
  }, [photos.length, current])

  return (
    <section
      ref={ref}
      style={{ backgroundColor: block.bgColor, ...animStyle }}
    >
      {(block.title || block.subtitle) && (
        <div className="text-center pt-12 pb-6 px-6">
          {block.title && (
            <h2 className="text-3xl font-bold mb-2" style={{ color: block.textColor }}>
              {block.title}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-base opacity-70 max-w-xl mx-auto" style={{ color: block.textColor }}>
              {block.subtitle}
            </p>
          )}
        </div>
      )}

      {photos.length === 0 ? (
        <div className="flex items-center justify-center py-24 px-6">
          <p className="text-sm opacity-40" style={{ color: block.textColor }}>
            Agrega fotos desde el editor para mostrar el carrusel
          </p>
        </div>
      ) : (
        <div className="relative overflow-hidden" style={{ paddingBottom: block.title || block.subtitle ? '0' : '0' }}>
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {photos.map((photo, i) => (
              <div key={photo.id} className="w-full flex-shrink-0 relative">
                <div
                  className="w-full"
                  style={{ height: block.height || '480px' }}
                >
                  {photo.url ? (
                    <img
                      src={resolveImageUrl(photo.url)}
                      alt={photo.caption || `Foto ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center opacity-30"
                      style={{ backgroundColor: block.accentColor || '#7c3aed' }}
                    >
                      <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Caption overlay */}
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
                      <p className="text-white text-sm font-medium">{photo.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition backdrop-blur-sm"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition backdrop-blur-sm"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === current
                      ? (block.accentColor || '#7c3aed')
                      : 'rgba(255,255,255,0.6)',
                  }}
                  aria-label={`Ir a foto ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
