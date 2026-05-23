import { useContent } from '../hooks/useContent'
import HeroBlock from '../blocks/HeroBlock'
import AboutBlock from '../blocks/AboutBlock'
import ServicesBlock from '../blocks/ServicesBlock'

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  about: AboutBlock,
  services: ServicesBlock,
}

export default function HomePage() {
  const { content, loading } = useContent()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main>
      {content.blocks
        .filter(b => b.visible)
        .map(block => {
          const Component = BLOCK_COMPONENTS[block.type]
          if (!Component) return null
          return <Component key={block.id} block={block} />
        })}
    </main>
  )
}
