import ColorField from './ColorField'

const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/tu_usuario' },
  { key: 'facebook',  label: 'Facebook',  placeholder: 'https://facebook.com/tu_pagina' },
  { key: 'whatsapp',  label: 'WhatsApp',  placeholder: 'https://wa.me/50212345678' },
  { key: 'tiktok',    label: 'TikTok',    placeholder: 'https://tiktok.com/@tu_usuario' },
  { key: 'youtube',   label: 'YouTube',   placeholder: 'https://youtube.com/@tu_canal' },
  { key: 'linkedin',  label: 'LinkedIn',  placeholder: 'https://linkedin.com/in/tu_perfil' },
  { key: 'twitter',   label: 'X / Twitter', placeholder: 'https://x.com/tu_usuario' },
]

export default function FooterEditor({ footer, onChange }) {
  const set = (key, val) => onChange({ [key]: val })
  const setSocial = (platform, val) =>
    onChange({ socials: { ...footer.socials, [platform]: val } })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre / Marca</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={footer.brandName || ''}
            onChange={e => set('brandName', e.target.value)}
            placeholder="Ej: Aransasú Aguilar"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Frase corta</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={footer.tagline || ''}
            onChange={e => set('tagline', e.target.value)}
            placeholder="Ej: Psicoterapia Humanista"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Correo electrónico</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={footer.email || ''}
            onChange={e => set('email', e.target.value)}
            placeholder="tu@correo.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Teléfono / WhatsApp</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={footer.phone || ''}
            onChange={e => set('phone', e.target.value)}
            placeholder="+502 1234 5678"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Texto de copyright</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={footer.copyright || ''}
          onChange={e => set('copyright', e.target.value)}
          placeholder="© {year} Aransasú Aguilar · Todos los derechos reservados"
        />
        <p className="text-xs text-gray-400">Usa <code className="bg-gray-100 px-1 rounded">{'{year}'}</code> para insertar el año actual automáticamente.</p>
      </div>

      <div className="border-t pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Colores</span>
        <div className="grid grid-cols-3 gap-3">
          <ColorField label="Fondo" value={footer.bgColor} onChange={v => set('bgColor', v)} />
          <ColorField label="Texto" value={footer.textColor} onChange={v => set('textColor', v)} />
          <ColorField label="Acento" value={footer.accentColor} onChange={v => set('accentColor', v)} />
        </div>
      </div>

      <div className="border-t pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Redes sociales</span>
        <p className="text-xs text-gray-400 -mt-1">Deja vacíos los que no uses. Solo aparecen los que tengan enlace.</p>
        {SOCIAL_PLATFORMS.map(({ key, label, placeholder }) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-24 flex-shrink-0">{label}</span>
            <input
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm flex-1 min-w-0"
              value={(footer.socials || {})[key] || ''}
              onChange={e => setSocial(key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
