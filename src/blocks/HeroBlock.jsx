export default function HeroBlock({ block, onCtaClick }) {
  return (
    <section
      style={{ backgroundColor: block.bgColor, color: block.textColor }}
      className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20"
    >
      {block.image && (
        <img
          src={block.image}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full object-cover mb-8 shadow-lg"
        />
      )}
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">{block.title}</h1>
      <p className="text-base sm:text-xl mb-8 max-w-xl opacity-80">{block.subtitle}</p>
      {block.buttonText && (
        <a
          href={block.buttonLink || '#'}
          onClick={onCtaClick}
          style={{ backgroundColor: block.textColor, color: block.bgColor }}
          className="px-6 py-3 rounded-full font-semibold text-base sm:text-lg transition hover:opacity-80"
        >
          {block.buttonText}
        </a>
      )}
    </section>
  )
}
