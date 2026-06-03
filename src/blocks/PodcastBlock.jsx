import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { resolveImageUrl } from '../utils/imageUrl'

const PLATFORM_CONFIG = {
  spotify:  { label: 'Spotify',         color: '#1DB954', bg: '#1DB95415' },
  apple:    { label: 'Apple Podcasts',   color: '#872EC4', bg: '#872EC415' },
  youtube:  { label: 'YouTube',          color: '#FF0000', bg: '#FF000015' },
  google:   { label: 'Google Podcasts',  color: '#4285F4', bg: '#4285F415' },
}

function EpisodeCard({ ep, accentColor, textColor }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = ep.description && ep.description.length > 100
  const displayText = expanded || !isLong
    ? ep.description
    : ep.description.slice(0, 100).trimEnd() + '…'

  return (
    <div className="flex gap-4 items-start py-4 border-b last:border-b-0" style={{ borderColor: `${textColor}15` }}>
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
        {ep.image ? (
          <img src={resolveImageUrl(ep.image)} alt={ep.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl">🎙️</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="text-sm font-bold leading-snug" style={{ color: textColor }}>{ep.title}</h3>
          {ep.duration && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              {ep.duration}
            </span>
          )}
        </div>
        {ep.description && (
          <div className="mt-1">
            <p className="text-xs leading-relaxed opacity-70">{displayText}</p>
            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="text-xs font-semibold mt-0.5 transition-opacity hover:opacity-70"
                style={{ color: accentColor }}
              >
                {expanded ? 'Leer menos ↑' : 'Leer más ↓'}
              </button>
            )}
          </div>
        )}
        {ep.link && (
          <a
            href={ep.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-75"
            style={{ color: accentColor }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Escuchar episodio
          </a>
        )}
      </div>
    </div>
  )
}

export default function PodcastBlock({ block }) {
  const { title, subtitle, bgColor, textColor, accentColor, platforms = {}, episodes = [] } = block
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')

  const activePlatforms = Object.entries(platforms).filter(([, url]) => url)

  return (
    <section ref={ref} style={{ backgroundColor: bgColor, color: textColor, ...animStyle }} className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-2xl shadow-sm"
            style={{ backgroundColor: `${accentColor}18` }}>
            🎙️
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: textColor }}>{title}</h2>
          {subtitle && <p className="text-base opacity-70 max-w-xl mx-auto">{subtitle}</p>}
        </div>

        {/* Platform buttons */}
        {activePlatforms.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {activePlatforms.map(([key, url]) => {
              const cfg = PLATFORM_CONFIG[key]
              if (!cfg) return null
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 shadow-sm"
                  style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1.5px solid ${cfg.color}40` }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
                  {cfg.label}
                </a>
              )
            })}
          </div>
        )}

        {/* Episodes */}
        {episodes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm px-6 py-2">
            {episodes.map(ep => (
              <EpisodeCard
                key={ep.id}
                ep={ep}
                accentColor={accentColor}
                textColor={textColor}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {episodes.length === 0 && activePlatforms.length === 0 && (
          <p className="text-center opacity-40 text-sm">Configura el podcast desde el editor</p>
        )}
      </div>
    </section>
  )
}
