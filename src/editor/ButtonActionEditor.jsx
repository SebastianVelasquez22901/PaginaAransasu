import { BUTTON_ACTIONS } from '../utils/buttonAction'

const inputCls = 'border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 w-full'

export default function ButtonActionEditor({ config, onChange, compact = false }) {
  const action = config.buttonAction || 'proximamente'

  return (
    <div className="flex flex-col gap-3">
      {/* Action selector */}
      <div>
        {!compact && (
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
            ¿Qué hace el botón?
          </label>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {BUTTON_ACTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ buttonAction: opt.value })}
              title={opt.description}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl border text-xs font-medium transition ${
                action === opt.value
                  ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600'
              }`}
            >
              <span className="text-base">{opt.emoji}</span>
              <span className="leading-tight text-center">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conditional fields */}
      {action === 'whatsapp' && (
        <div className="flex flex-col gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Número de WhatsApp</label>
            <input
              className={inputCls}
              value={config.whatsappNumber || ''}
              onChange={e => onChange({ whatsappNumber: e.target.value })}
              placeholder="+502 1234 5678"
            />
            <p className="text-xs text-gray-400">Incluye el código de país, ej: +502 para Guatemala</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Mensaje pre-escrito (opcional)</label>
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              value={config.whatsappMessage || ''}
              onChange={e => onChange({ whatsappMessage: e.target.value })}
              placeholder="Hola, me gustaría agendar una consulta."
            />
          </div>
        </div>
      )}

      {action === 'url' && (
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">URL de destino</label>
          <input
            className={inputCls}
            value={config.buttonLink || ''}
            onChange={e => onChange({ buttonLink: e.target.value })}
            placeholder="https://calendly.com/..."
          />
        </div>
      )}

      {action === 'email' && (
        <div className="flex flex-col gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Correo electrónico</label>
            <input
              className={inputCls}
              value={config.emailAddress || ''}
              onChange={e => onChange({ emailAddress: e.target.value })}
              placeholder="tucorreo@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Asunto (opcional)</label>
            <input
              className={inputCls}
              value={config.emailSubject || ''}
              onChange={e => onChange({ emailSubject: e.target.value })}
              placeholder="Solicitud de consulta"
            />
          </div>
        </div>
      )}

      {action === 'phone' && (
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">Número de teléfono</label>
          <input
            className={inputCls}
            value={config.phoneNumber || ''}
            onChange={e => onChange({ phoneNumber: e.target.value })}
            placeholder="+502 1234 5678"
          />
        </div>
      )}

      {action === 'proximamente' && (
        <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
          El botón mostrará un aviso de "Próximamente" al hacer clic. Úsalo mientras defines el destino final.
        </p>
      )}
    </div>
  )
}
