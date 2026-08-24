import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { resolveImageUrl } from '../utils/imageUrl'
import { getPreviewUrl } from '../utils/gallery'

export default function AboutBlock({ block }) {
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')

  const textAlign = block.textAlign || 'left'
  const fontFamily = block.fontFamily || 'Inter, sans-serif'

  return (
    <section
      ref={ref}
      style={{ backgroundColor: block.bgColor, color: block.textColor, fontFamily, ...animStyle }}
      className="py-20 px-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {block.image && (
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
            <img
              src={getPreviewUrl(block.image) || resolveImageUrl(block.image)}
              alt="Sobre mí"
              className="w-full h-full object-cover"
              style={{
                objectPosition: `${block.imageFocalX ?? 50}% ${block.imageFocalY ?? 50}%`,
                transform: block.imageZoom && block.imageZoom !== 1 ? `scale(${block.imageZoom})` : undefined,
              }}
            />
          </div>
        )}
        <div style={{ textAlign }}>
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
