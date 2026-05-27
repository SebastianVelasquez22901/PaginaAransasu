import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function LocationBlock({ block }) {
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')
  const hours = block.hours || []

  return (
    <section
      ref={ref}
      style={{ backgroundColor: block.bgColor, color: block.textColor, ...animStyle }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        {(block.title || block.subtitle) && (
          <div className="text-center mb-10">
            {block.title && (
              <h2 className="text-3xl font-bold mb-2" style={{ color: block.textColor }}>
                {block.title}
              </h2>
            )}
            {block.subtitle && (
              <p className="text-base opacity-70 max-w-lg mx-auto" style={{ color: block.textColor }}>
                {block.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Two columns */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left: info card */}
          <div
            className="flex flex-col gap-6 bg-white rounded-2xl shadow-sm p-7 md:w-80 flex-shrink-0"
            style={{ borderLeft: `4px solid ${block.accentColor || '#7c3aed'}` }}
          >
            {/* Address */}
            {block.address && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${block.accentColor}20`, color: block.accentColor }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide opacity-50" style={{ color: block.textColor }}>
                    Dirección
                  </span>
                </div>
                <p className="text-sm leading-relaxed pl-9 whitespace-pre-line" style={{ color: block.textColor }}>
                  {block.address}
                </p>
              </div>
            )}

            {/* Hours */}
            {hours.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${block.accentColor}20`, color: block.accentColor }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide opacity-50" style={{ color: block.textColor }}>
                    Horarios
                  </span>
                </div>
                <div className="flex flex-col gap-1 pl-9">
                  {hours.map(row => (
                    <div key={row.id} className="flex justify-between text-sm gap-4">
                      <span className="opacity-70" style={{ color: block.textColor }}>{row.days}</span>
                      <span className="font-medium" style={{ color: block.accentColor }}>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phone */}
            {block.phone && (
              <a
                href={`tel:${block.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm hover:opacity-80 transition pl-0"
                style={{ color: block.textColor }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${block.accentColor}20`, color: block.accentColor }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {block.phone}
              </a>
            )}

            {/* Email */}
            {block.email && (
              <a
                href={`mailto:${block.email}`}
                className="flex items-center gap-3 text-sm hover:opacity-80 transition"
                style={{ color: block.textColor }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${block.accentColor}20`, color: block.accentColor }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                {block.email}
              </a>
            )}

            {/* Directions button */}
            {block.mapsLink && (
              <a
                href={block.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: block.accentColor || '#7c3aed' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {block.buttonText || 'Cómo llegar'}
              </a>
            )}
          </div>

          {/* Right: map */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-sm min-h-64" style={{ minHeight: '380px' }}>
            {block.mapUrl ? (
              <iframe
                src={block.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del consultorio"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-30"
                style={{ backgroundColor: `${block.accentColor}15`, minHeight: '380px' }}
              >
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-sm font-medium" style={{ color: block.textColor }}>
                  Agrega el enlace del mapa desde el editor
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
