import { getButtonProps } from '../utils/buttonAction'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { resolveImageUrl } from '../utils/imageUrl'
import { getPreviewUrl } from '../utils/gallery'
import AmbientBackground from '../components/AmbientBackground'

const ALIGN_MAP = {
  left:   { flex: 'items-start', text: 'text-left' },
  center: { flex: 'items-center', text: 'text-center' },
  right:  { flex: 'items-end', text: 'text-right' },
}

const TEXT_ANIM = {
  none:     null,
  fall:     (delay) => ({ animation: `hero-fall 0.8s ease ${delay}s both` }),
  rise:     (delay) => ({ animation: `hero-rise 0.85s cubic-bezier(0.34,1.4,0.64,1) ${delay}s both` }),
  'blur-in':(delay) => ({ animation: `hero-blur-in 0.9s ease ${delay}s both` }),
  cascade:  (delay) => ({ animation: `hero-cascade 0.7s ease ${delay}s both` }),
  paint:    (delay) => ({ animation: `hero-paint 1s ease ${delay}s both` }),
  expand:   (delay) => ({ animation: `hero-expand 0.9s ease ${delay}s both` }),
}

export default function HeroBlock({ block, onCtaClick }) {
  const btnProps = getButtonProps(block, onCtaClick)
  const [ref, animStyle] = useScrollAnimation(block.blockAnimation || 'none')

  const align = ALIGN_MAP[block.textAlign] || ALIGN_MAP.center
  const fontFamily = block.fontFamily || 'Inter, sans-serif'
  const entrance = block.textEntrance || 'none'
  const makeAnim = TEXT_ANIM[entrance]

  const hasAmbient = block.ambientBg && block.ambientBg !== 'none'

  return (
    <section
      ref={ref}
      style={{ backgroundColor: block.bgColor, color: block.textColor, fontFamily, ...animStyle }}
      className="relative min-h-[90vh] flex flex-col justify-center px-6 py-20 overflow-hidden"
    >
      {hasAmbient && (
        <AmbientBackground
          type={block.ambientBg}
          color1={block.ambientColor1 || block.textColor || '#5BB8A8'}
          color2={block.ambientColor2 || block.bgColor || '#a8e6df'}
          intensity={block.ambientIntensity ?? 0.3}
        />
      )}

      <div className={`relative z-10 flex flex-col ${align.flex} ${align.text} gap-0`}>
        {block.image && (
          <div
            style={makeAnim ? makeAnim(0) : undefined}
            className="w-32 h-32 rounded-full overflow-hidden mb-8 shadow-lg"
          >
            <img
              src={getPreviewUrl(block.image) || resolveImageUrl(block.image)}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
              style={{
                objectPosition: `${block.imageFocalX ?? 50}% ${block.imageFocalY ?? 50}%`,
                transform: block.imageZoom && block.imageZoom !== 1 ? `scale(${block.imageZoom})` : undefined,
              }}
            />
          </div>
        )}
        <h1
          className="text-3xl sm:text-5xl font-bold mb-4 leading-tight"
          style={makeAnim ? makeAnim(0.1) : undefined}
        >
          {block.title}
        </h1>
        <p
          className="text-base sm:text-xl mb-8 max-w-xl opacity-80"
          style={makeAnim ? makeAnim(0.4) : undefined}
        >
          {block.subtitle}
        </p>
        {block.buttonText && (
          <a
            {...btnProps}
            style={{ backgroundColor: block.textColor, color: block.bgColor, ...(makeAnim ? makeAnim(0.7) : {}) }}
            className="px-6 py-3 rounded-full font-semibold text-base sm:text-lg transition hover:opacity-80"
          >
            {block.buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
