export const BUTTON_ACTIONS = [
  { value: 'proximamente', label: 'Próximamente',  emoji: '🚀', description: 'Muestra un aviso de "próximamente"' },
  { value: 'whatsapp',     label: 'WhatsApp',       emoji: '💬', description: 'Abre conversación en WhatsApp' },
  { value: 'url',          label: 'Link externo',   emoji: '🔗', description: 'Va a una página externa (Calendly, etc.)' },
  { value: 'email',        label: 'Correo',         emoji: '📧', description: 'Abre el cliente de correo' },
  { value: 'phone',        label: 'Teléfono',       emoji: '📞', description: 'Inicia una llamada' },
]

export function getButtonProps(config, onProximamente) {
  const action = config.buttonAction || 'proximamente'

  switch (action) {
    case 'whatsapp': {
      const num = (config.whatsappNumber || '').replace(/\D/g, '')
      const msg = encodeURIComponent(config.whatsappMessage || 'Hola, me gustaría agendar una consulta.')
      return {
        href: `https://wa.me/${num}?text=${msg}`,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    }
    case 'url':
      return {
        href: config.buttonLink || '#',
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    case 'email': {
      const sub = config.emailSubject ? `?subject=${encodeURIComponent(config.emailSubject)}` : ''
      return { href: `mailto:${config.emailAddress || ''}${sub}` }
    }
    case 'phone':
      return { href: `tel:${(config.phoneNumber || '').replace(/\s/g, '')}` }
    default:
      return { href: '#', onClick: onProximamente }
  }
}
