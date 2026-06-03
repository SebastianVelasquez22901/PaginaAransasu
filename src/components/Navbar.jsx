import { useState } from 'react'

function NavLink({ label, anchor, textColor, hoverLineColor, hoverLineWidth, onClick }) {
  const [hovered, setHovered] = useState(false)
  const lineColor = hoverLineColor || textColor
  const lineH = hoverLineWidth || 2

  return (
    <a
      href={`#${anchor}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-sm font-medium pb-0.5"
      style={{ color: textColor }}
    >
      {label}
      <span
        style={{
          display: 'block',
          height: `${lineH}px`,
          background: lineColor,
          borderRadius: '9999px',
          transformOrigin: 'left',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.25s ease',
        }}
      />
    </a>
  )
}

const BLOCK_ANCHORS = {
  hero: 'inicio',
  about: 'sobre-mi',
  services: 'servicios',
  pricing: 'precios',
  books: 'libros',
  podcast: 'podcast',
  academic: 'historial',
  location: 'ubicacion',
}

const BLOCK_NAV_LABELS = {
  hero: 'Inicio',
  about: 'Sobre mí',
  services: 'Servicios',
  pricing: 'Precios',
  books: 'Libros',
  podcast: 'Podcast',
  academic: 'Historial',
  location: 'Ubicación',
}

export { BLOCK_ANCHORS, BLOCK_NAV_LABELS }

export default function Navbar({ navbar, blocks }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = blocks
    .filter(b => b.visible && BLOCK_ANCHORS[b.type])
    .filter((b, i, arr) => arr.findIndex(x => x.type === b.type) === i)
    .map(b => ({ label: BLOCK_NAV_LABELS[b.type], anchor: BLOCK_ANCHORS[b.type] }))

  function handleNavClick(e, anchor) {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="sticky top-0 z-40 shadow-sm"
      style={{ backgroundColor: navbar.bgColor, color: navbar.textColor }}
    >
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={e => handleNavClick(e, links[0]?.anchor || 'inicio')}
          className="flex items-center gap-2 shrink-0"
        >
          {navbar.logoUrl && (() => {
            const h = navbar.logoHeight || 80
            const w = Math.round(h * 2)
            const imgH = Math.round(w * 1.25)   // 960/768 ≈ 1.25
            const mt = -Math.round(imgH * 0.3)  // recorta espacio superior
            return (
              <div style={{ height: `${h}px`, width: `${w}px`, overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={navbar.logoUrl}
                  alt={navbar.brandName}
                  style={{ width: `${w}px`, height: 'auto', marginTop: `${mt}px` }}
                />
              </div>
            )
          })()}
          {!navbar.logoUrl && (
            <span className="text-lg font-bold tracking-tight" style={{ color: navbar.accentColor }}>
              {navbar.brandName}
            </span>
          )}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <NavLink
              key={link.anchor}
              label={link.label}
              anchor={link.anchor}
              textColor={navbar.textColor}
              hoverLineColor={navbar.hoverLineColor}
              hoverLineWidth={navbar.hoverLineWidth}
              onClick={e => handleNavClick(e, link.anchor)}
            />
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          {navbar.ctaText && (
            <a
              href={navbar.ctaLink || '#'}
              className="hidden md:inline-block text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: navbar.accentColor }}
            >
              {navbar.ctaText}
            </a>
          )}

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition"
            style={{ color: navbar.textColor }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menú"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: navbar.bgColor, borderColor: `${navbar.textColor}20` }}
        >
          {links.map(link => (
            <a
              key={link.anchor}
              href={`#${link.anchor}`}
              onClick={e => handleNavClick(e, link.anchor)}
              className="text-sm font-medium"
              style={{ color: navbar.textColor }}
            >
              {link.label}
            </a>
          ))}
          {navbar.ctaText && (
            <a
              href={navbar.ctaLink || '#'}
              className="text-sm font-semibold px-4 py-2.5 rounded-lg text-white text-center"
              style={{ backgroundColor: navbar.accentColor }}
            >
              {navbar.ctaText}
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
