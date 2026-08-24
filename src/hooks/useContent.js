import { useState, useEffect } from 'react'

export function useContent() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/content.json')
      .then(r => r.json())
      .then(data => {
        setContent({ ...data, gallery: data.gallery || [] })
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

  function removeBlock(blockId) {
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId),
    }))
  }

  function addBlock(template, overBlockId) {
    const newBlock = { ...template.defaults, id: `${template.type}-${Date.now()}`, type: template.type, visible: true }
    setContent(prev => {
      const blocks = [...prev.blocks]
      const insertAt = overBlockId ? blocks.findIndex(b => b.id === overBlockId) : -1
      if (insertAt !== -1) {
        blocks.splice(insertAt, 0, newBlock)
      } else {
        blocks.push(newBlock)
      }
      return { ...prev, blocks }
    })
  }

  function updateNavbar(changes) {
    setContent(prev => ({
      ...prev,
      navbar: { ...prev.navbar, ...changes },
    }))
  }

  function updateFooter(changes) {
    setContent(prev => ({
      ...prev,
      footer: { ...prev.footer, ...changes },
    }))
  }

  function addGalleryImage(entry) {
    setContent(prev => ({
      ...prev,
      gallery: [entry, ...prev.gallery],
    }))
  }

  function removeGalleryImage(id) {
    setContent(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id),
    }))
  }

  function moveBlock(activeId, overId) {
    setContent(prev => {
      const blocks = [...prev.blocks]
      const from = blocks.findIndex(b => b.id === activeId)
      const to = blocks.findIndex(b => b.id === overId)
      if (from === -1 || to === -1 || from === to) return prev
      const [moved] = blocks.splice(from, 1)
      blocks.splice(to, 0, moved)
      return { ...prev, blocks }
    })
  }

  return {
    content,
    loading,
    updateBlock,
    updateServiceCard,
    addServiceCard,
    removeServiceCard,
    toggleBlock,
    moveBlock,
    addBlock,
    removeBlock,
    updateNavbar,
    updateFooter,
    addGalleryImage,
    removeGalleryImage,
  }
}
