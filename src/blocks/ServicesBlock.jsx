export default function ServicesBlock({ block }) {
  return (
    <section
      style={{ backgroundColor: block.bgColor, color: block.textColor }}
      className="py-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          style={{ color: block.accentColor }}
          className="text-4xl font-bold text-center mb-12"
        >
          {block.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {block.cards.map(card => (
            <div
              key={card.id}
              style={{ borderColor: block.accentColor }}
              className="bg-white rounded-2xl p-8 shadow-sm border-t-4 flex flex-col gap-3"
            >
              <span className="text-4xl">{card.icon}</span>
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="opacity-75 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
