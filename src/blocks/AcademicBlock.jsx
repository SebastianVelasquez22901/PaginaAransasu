import { useScrollAnimation } from '../hooks/useScrollAnimation'

const TYPE_ICONS = {
  degree: '🎓',
  certification: '📜',
  course: '📚',
  award: '🏆',
}

export default function AcademicBlock({ block }) {
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation)
  const items = block.items || []

  return (
    <div ref={ref} style={{ ...animStyle, backgroundColor: block.bgColor, color: block.textColor }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {(block.title || block.subtitle) && (
          <div className="text-center mb-12">
            {block.title && (
              <h2 className="text-3xl font-bold mb-2" style={{ color: block.textColor }}>
                {block.title}
              </h2>
            )}
            {block.subtitle && (
              <p className="text-base opacity-60">{block.subtitle}</p>
            )}
            <div className="mt-4 mx-auto h-1 w-16 rounded-full" style={{ backgroundColor: block.accentColor }} />
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-16 opacity-40">
            <span className="text-5xl block mb-3">🎓</span>
            <p className="text-sm">Agrega tu formación académica desde el editor</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-2 bottom-2 w-0.5"
              style={{ backgroundColor: `${block.accentColor}30` }}
            />

            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="relative flex gap-5">
                  {/* Icon circle */}
                  <div
                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm"
                    style={{
                      backgroundColor: `${block.accentColor}15`,
                      border: `2px solid ${block.accentColor}`,
                    }}
                  >
                    {TYPE_ICONS[item.type] || '🎓'}
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 bg-white rounded-xl p-5 shadow-sm"
                    style={{ border: `1px solid ${block.accentColor}20` }}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-semibold text-base leading-tight" style={{ color: block.textColor }}>
                        {item.title}
                      </h3>
                      {item.year && (
                        <span
                          className="flex-shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${block.accentColor}15`, color: block.accentColor }}
                        >
                          {item.year}
                        </span>
                      )}
                    </div>
                    {item.institution && (
                      <p className="text-sm mt-1 font-medium" style={{ color: block.accentColor }}>
                        {item.institution}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-sm mt-2 leading-relaxed opacity-60">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
