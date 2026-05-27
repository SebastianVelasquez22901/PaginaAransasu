import ColorField from './ColorField'
import ButtonActionEditor from './ButtonActionEditor'
import AnimationField from './AnimationField'

function FeatureRow({ feature, onUpdate, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onUpdate({ included: !feature.included })}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition ${
          feature.included
            ? 'bg-violet-600 border-violet-600 text-white'
            : 'bg-white border-gray-300 text-gray-300'
        }`}
        title={feature.included ? 'Incluido — clic para excluir' : 'Excluido — clic para incluir'}
      >
        ✓
      </button>
      <input
        className="border border-gray-200 rounded-lg px-2 py-1 text-sm flex-1"
        value={feature.text}
        onChange={e => onUpdate({ text: e.target.value })}
        placeholder="Característica..."
      />
      <button type="button" onClick={onRemove} className="text-red-400 hover:text-red-600 px-1 text-lg leading-none">×</button>
    </div>
  )
}

function PlanCard({ plan, accentColor, onUpdate, onRemove }) {
  function updateFeature(featureId, changes) {
    onUpdate({
      features: plan.features.map(f => f.id === featureId ? { ...f, ...changes } : f)
    })
  }

  function addFeature() {
    onUpdate({
      features: [...plan.features, { id: `f${Date.now()}`, text: 'Nueva característica', included: true }]
    })
  }

  function removeFeature(featureId) {
    onUpdate({ features: plan.features.filter(f => f.id !== featureId) })
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Plan</span>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              checked={!!plan.featured}
              onChange={e => onUpdate({ featured: e.target.checked })}
              className="rounded"
            />
            Destacado
          </label>
          <button type="button" onClick={onRemove} className="text-red-400 hover:text-red-600 text-sm font-medium">
            Eliminar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Nombre del plan</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={plan.name}
            onChange={e => onUpdate({ name: e.target.value })}
            placeholder="Ej: Individual"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Descripción corta</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={plan.description}
            onChange={e => onUpdate({ description: e.target.value })}
            placeholder="Ej: Para comenzar..."
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Moneda</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={plan.currency}
            onChange={e => onUpdate({ currency: e.target.value })}
            placeholder="Q"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Precio</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={plan.price}
            onChange={e => onUpdate({ price: e.target.value })}
            placeholder="250"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Período</label>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
            value={plan.period}
            onChange={e => onUpdate({ period: e.target.value })}
            placeholder="por sesión"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Texto del botón</label>
        <input
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
          value={plan.buttonText}
          onChange={e => onUpdate({ buttonText: e.target.value })}
          placeholder="Reservar"
        />
      </div>
      <div className="border border-gray-100 rounded-xl p-3 bg-white">
        <ButtonActionEditor config={plan} onChange={onUpdate} compact />
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Características</label>
          <button
            type="button"
            onClick={addFeature}
            className="text-xs text-violet-600 hover:text-violet-800 font-medium"
          >
            + Agregar
          </button>
        </div>
        {plan.features.map(feature => (
          <FeatureRow
            key={feature.id}
            feature={feature}
            onUpdate={changes => updateFeature(feature.id, changes)}
            onRemove={() => removeFeature(feature.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default function PricingEditor({ block, onChange }) {
  const set = (key, val) => onChange({ [key]: val })

  function updatePlan(planId, changes) {
    onChange({ plans: block.plans.map(p => p.id === planId ? { ...p, ...changes } : p) })
  }

  function addPlan() {
    const newPlan = {
      id: `plan${Date.now()}`,
      name: 'Nuevo plan',
      description: '',
      currency: 'Q',
      price: '0',
      period: 'por sesión',
      featured: false,
      buttonText: 'Reservar',
      buttonLink: '#contacto',
      features: [
        { id: `f${Date.now()}`, text: 'Sesión de 50 minutos', included: true },
      ],
    }
    onChange({ plans: [...block.plans, newPlan] })
  }

  function removePlan(planId) {
    onChange({ plans: block.plans.filter(p => p.id !== planId) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título de sección</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={block.subtitle || ''}
          onChange={e => set('subtitle', e.target.value)}
          placeholder="Opcional"
        />
      </div>
      <ColorField label="Color de fondo" value={block.bgColor} onChange={v => set('bgColor', v)} />
      <ColorField label="Color de texto" value={block.textColor} onChange={v => set('textColor', v)} />
      <ColorField label="Color de acento" value={block.accentColor} onChange={v => set('accentColor', v)} />
      <AnimationField value={block.blockAnimation || 'none'} onChange={v => set('blockAnimation', v)} />

      <div className="border-t pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Planes</span>
          <button
            type="button"
            onClick={addPlan}
            className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700"
          >
            + Agregar plan
          </button>
        </div>
        {block.plans.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            accentColor={block.accentColor}
            onUpdate={changes => updatePlan(plan.id, changes)}
            onRemove={() => removePlan(plan.id)}
          />
        ))}
      </div>
    </div>
  )
}
