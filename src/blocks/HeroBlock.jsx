import { getButtonProps } from '../utils/buttonAction'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { resolveImageUrl } from '../utils/imageUrl'

const ALIGN_MAP = {
  left:   { flex: 'items-start', text: 'text-left' },
  center: { flex: 'items-center', text: 'text-center' },
  right:  { flex: 'items-end', text: 'text-right' },
}

export default function HeroBlock({ block, onCtaClick }) {
  const btnProps = getButtonProps(block, onCtaClick)
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')

  const align = ALIGN_MAP[block.textAlign] || ALIGN_MAP.center
  const fontFamily = block.fontFamily || 'Inter, sans-serif'

  return (
    <section
      ref={ref}
      style={{ backgroundColor: block.bgColor, color: block.textColor, fontFamily, ...animStyle }}
      className={`min-h-[90vh] flex flex-col ${align.flex} justify-center ${align.text} px-6 py-20`}
    >
      {block.image && (
        <img
          src={resolveImageUrl(block.image)}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full object-cover mb-8 shadow-lg"
        />
      )}
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">{block.title}</h1>
      <p className="text-base sm:text-xl mb-8 max-w-xl opacity-80">{block.subtitle}</p>
      {block.buttonText && (
        <a
          {...btnProps}
          style={{ backgroundColor: block.textColor, color: block.bgColor }}
          className="px-6 py-3 rounded-full font-semibold text-base sm:text-lg transition hover:opacity-80"
        >
          {block.buttonText}
        </a>
      )}
    </section>
  )
}
