export default function BooksBlock({ block }) {
  const { title, subtitle, bgColor, textColor, accentColor, books = [] } = block

  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: textColor }}>{title}</h2>
          {subtitle && (
            <p className="text-base opacity-70 max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <div key={book.id} className="flex flex-col group">
              {/* Cover */}
              <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md mb-3 bg-gray-100">
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
                  <p className="text-xs opacity-70 leading-relaxed line-clamp-3 flex-1">{book.description}</p>
                )}
                {book.link && (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs font-semibold transition-opacity hover:opacity-70 inline-flex items-center gap-1"
                    style={{ color: accentColor }}
                  >
                    Ver más →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
