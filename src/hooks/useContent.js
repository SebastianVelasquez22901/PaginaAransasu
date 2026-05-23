import { useState, useEffect } from 'react'

export function useContent() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/content.json')
      .then(r => r.json())
      .then(data => {
        setContent(data)
        setLoading(false)
      })
  }, [])

  function updateBlock(blockId, changes) {
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === blockId ? { ...b, ...changes } : b)
    }))
  }

  function updateServiceCard(blockId, cardId, changes) {
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => {
        if (b.id !== blockId) return b
        return {
          ...b,
          cards: b.cards.map(c => c.id === cardId ? { ...c, ...changes } : c)
        }
      })
    }))
  }

  function addServiceCard(blockId) {
    const newCard = {
      id: `s${Date.now()}`,
      title: 'Nuevo servicio',
      description: 'Descripción del servicio.',
      icon: '⭐'
    }
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(b =>
        b.id === blockId ? { ...b, cards: [...b.cards, newCard] } : b
      )
    }))
  }

  function removeServiceCard(blockId, cardId) {
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(b =>
        b.id === blockId ? { ...b, cards: b.cards.filter(c => c.id !== cardId) } : b
      )
    }))
  }

  function toggleBlock(blockId) {
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(b =>
        b.id === blockId ? { ...b, visible: !b.visible } : b
      )
    }))
  }

  return {
    content,
    loading,
    updateBlock,
    updateServiceCard,
    addServiceCard,
    removeServiceCard,
    toggleBlock,
  }
}
