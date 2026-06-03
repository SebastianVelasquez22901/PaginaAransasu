import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const DESCRIPTION_LIMIT = 80

function BookCard({ book, accentColor, textColor }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = book.description && book.description.length > DESCRIPTION_LIMIT
  const displayText = expanded || !isLong
    ? book.description
    : book.description.slice(0, DESCRIPTION_LIMIT).trimEnd() + '…'

  return (
    <div className="flex flex-col group">
      {/* Cover */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md mb-3 bg-gray-100">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            📚
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-bold leading-snug mb-0.5" style={{ color: textColor }}>
          {book.title}
        </h3>
        {book.author && (
          <p className="text-xs opacity-60 mb-1.5">{book.author}</p>
        )}
        {book.description && (
          <div className="flex-1">
            <p className="text-xs opacity-70 leading-relaxed">
              {displayText}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="mt-1 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: accentColor }}
              >
                {expanded ? 'Leer menos ↑' : 'Leer más ↓'}
              </button>
            )}
          </div>
        )}
        {book.link && (
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-semibold transition-opacity hover:opacity-70 inline-flex items-center gap-1"
            style={{ color: accentColor }}
          >
            Ver libro →
          </a>
        )}
      </div>
    </div>
  )
}

export default function BooksBlock({ block }) {
  const { title, subtitle, bgColor, textColor, accentColor, books = [] } = block
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')

  return (
    <section ref={ref} style={{ backgroundColor: bgColor, color: textColor, ...animStyle }} className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: textColor }}>{title}</h2>
          {subtitle && (
            <p className="text-base opacity-70 max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              accentColor={accentColor}
              textColor={textColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
