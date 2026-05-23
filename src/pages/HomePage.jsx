import { useContent } from '../hooks/useContent'
import Navbar, { BLOCK_ANCHORS } from '../components/Navbar'
import HeroBlock from '../blocks/HeroBlock'
import AboutBlock from '../blocks/AboutBlock'
import ServicesBlock from '../blocks/ServicesBlock'
import PricingBlock from '../blocks/PricingBlock'
import BooksBlock from '../blocks/BooksBlock'

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  about: AboutBlock,
  services: ServicesBlock,
  pricing: PricingBlock,
  books: BooksBlock,
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

  const visibleBlocks = content.blocks.filter(b => b.visible)

  return (
    <>
      <Navbar navbar={content.navbar} blocks={content.blocks} />
      <main>
        {visibleBlocks.map(block => {
          const Component = BLOCK_COMPONENTS[block.type]
          if (!Component) return null
          return (
            <section key={block.id} id={BLOCK_ANCHORS[block.type]}>
              <Component block={block} />
            </section>
          )
        })}
      </main>
    </>
  )
}
