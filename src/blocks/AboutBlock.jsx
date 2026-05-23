export default function AboutBlock({ block }) {
  return (
    <section
      style={{ backgroundColor: block.bgColor, color: block.textColor }}
      className="py-20 px-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {block.image && (
          <img
            src={block.image}
            alt="Sobre mí"
            className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover shadow-lg flex-shrink-0"
          />
        )}
        <div>
          <h2
            style={{ color: block.accentColor }}
            className="text-2xl sm:text-4xl font-bold mb-4 md:mb-6"
          >
            {block.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed opacity-90 whitespace-pre-line">
            {block.body}
          </p>
        </div>
      </div>
    </section>
  )
}
