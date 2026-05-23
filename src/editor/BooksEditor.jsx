import { useState } from 'react'
import ColorField from './ColorField'

function ImageHelp() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50 text-xs">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-violet-700 font-semibold"
      >
        <span>¿Cómo consigo el link de la portada?</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-3 text-gray-600">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Opción 1 — Google Books (recomendado)</p>
            <ol className="list-decimal list-inside flex flex-col gap-0.5 leading-relaxed">
              <li>Entrá a <a href="https://books.google.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">books.google.com</a></li>
              <li>Buscá el nombre del libro</li>
              <li>Hacé clic en la portada del libro</li>
              <li>Clic derecho sobre la imagen grande → <strong>"Copiar dirección de imagen"</strong></li>
              <li>Pegá el link en el campo de abajo</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Opción 2 — Goodreads</p>
            <ol className="list-decimal list-inside flex flex-col gap-0.5 leading-relaxed">
              <li>Entrá a <a href="https://www.goodreads.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">goodreads.com</a></li>
              <li>Buscá el libro y abrí su página</li>
              <li>Clic derecho sobre la portada → <strong>"Copiar dirección de imagen"</strong></li>
              <li>Pegá el link en el campo de abajo</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Opción 3 — Amazon</p>
            <ol className="list-decimal list-inside flex flex-col gap-0.5 leading-relaxed">
              <li>Buscá el libro en <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">amazon.com</a></li>
              <li>Abrí la página del libro</li>
              <li>Clic derecho sobre la portada → <strong>"Copiar dirección de imagen"</strong></li>
              <li>Pegá el link en el campo de abajo</li>
            </ol>
          </div>
          <p className="text-gray-400 italic">Tip: si la imagen no aparece después de pegar el link, probá con otra fuente.</p>
        </div>
      )}
    </div>
  )
}

function BookCard({ book, onUpdate, onRemove }) {
  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Libro</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 text-sm font-medium"
        >
          Eliminar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Título</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={book.title}
            onChange={e => onUpdate({ title: e.target.value })}
            placeholder="Ej: El cuerpo lleva la cuenta"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Autor/a</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={book.author}
            onChange={e => onUpdate({ author: e.target.value })}
            placeholder="Ej: Bessel van der Kolk"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ImageHelp />
        <label className="text-xs text-gray-400">URL de la portada</label>
        <input
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-mono"
          value={book.image}
          onChange={e => onUpdate({ image: e.target.value })}
          placeholder="https://..."
        />
        {book.image && (
          <img
            src={book.image}
            alt="Vista previa"
            className="h-20 w-14 object-cover rounded-lg border border-gray-200 mt-1"
            onError={e => { e.target.style.display = 'none' }}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Descripción breve</label>
        <textarea
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm resize-none"
          rows={2}
          value={book.description}
          onChange={e => onUpdate({ description: e.target.value })}
          placeholder="¿Por qué recomendás este libro?"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Enlace opcional (Amazon, librería, etc.)</label>
        <input
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-mono"
          value={book.link}
          onChange={e => onUpdate({ link: e.target.value })}
          placeholder="https://..."
        />
      </div>
    </div>
  )
}

export default function BooksEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })

  function updateBook(bookId, changes) {
    onChange({ books: block.books.map(b => b.id === bookId ? { ...b, ...changes } : b) })
  }

  function addBook() {
    const newBook = {
      id: `b${Date.now()}`,
      title: 'Nuevo libro',
      author: '',
      description: '',
      image: '',
      link: '',
    }
    onChange({ books: [...block.books, newBook] })
  }

  function removeBook(bookId) {
    onChange({ books: block.books.filter(b => b.id !== bookId) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título de sección</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.subtitle || ''}
          onChange={e => set('subtitle', e.target.value)}
          placeholder="Opcional"
        />
      </div>
      <ColorField label="Color de fondo" value={block.bgColor} onChange={v => set('bgColor', v)} />
      <ColorField label="Color de texto" value={block.textColor} onChange={v => set('textColor', v)} />
      <ColorField label="Color de acento" value={block.accentColor} onChange={v => set('accentColor', v)} />

      <div className="border-t pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Libros ({block.books.length})
          </span>
          <button
            type="button"
            onClick={addBook}
            className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700"
          >
            + Agregar libro
          </button>
        </div>
        {block.books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onUpdate={changes => updateBook(book.id, changes)}
            onRemove={() => removeBook(book.id)}
          />
        ))}
      </div>
    </div>
  )
}
