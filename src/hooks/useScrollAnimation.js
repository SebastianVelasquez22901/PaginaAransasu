import { useEffect, useRef, useState } from 'react'

const HIDDEN_STYLES = {
  fade:         { opacity: 0 },
  'fade-up':    { opacity: 0, transform: 'translateY(36px)' },
  'fade-left':  { opacity: 0, transform: 'translateX(-36px)' },
  'fade-right': { opacity: 0, transform: 'translateX(36px)' },
  zoom:         { opacity: 0, transform: 'scale(0.92)' },
}

export const ANIMATION_HIDDEN = HIDDEN_STYLES

export function useScrollAnimation(animation = 'none') {
  const ref = useRef(null)
  const [visible, setVisible] = useState(animation === 'none')

  useEffect(() => {
    if (animation === 'none') {
      setVisible(true)
      return
    }
    setVisible(false)
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [animation])

  const animStyle = visible
    ? { transition: 'opacity 0.7s ease, transform 0.7s ease' }
    : { transition: 'opacity 0.7s ease, transform 0.7s ease', ...(HIDDEN_STYLES[animation] || { opacity: 0 }) }

  return [ref, animStyle, visible]
}
