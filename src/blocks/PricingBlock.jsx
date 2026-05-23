export default function PricingBlock({ block }) {
  const { title, subtitle, bgColor, textColor, accentColor, plans = [] } = block

  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: textColor }}>{title}</h2>
          {subtitle && (
            <p className="text-base opacity-70 max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Plans grid */}
        <div className={`grid gap-6 ${
          plans.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
          plans.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl flex flex-col transition-transform ${
                plan.featured
                  ? 'shadow-xl ring-2 scale-[1.02]'
                  : 'shadow-md hover:shadow-lg'
              }`}
              style={plan.featured ? { ringColor: accentColor } : {}}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                  style={{ backgroundColor: accentColor }}
                >
                  Más popular
                </div>
              )}

              {/* Top accent bar */}
              <div
                className="h-1.5 rounded-t-2xl"
                style={{ backgroundColor: plan.featured ? accentColor : '#e5e7eb' }}
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <h3 className="text-lg font-bold text-gray-800 mb-1">{plan.name}</h3>
                {plan.description && (
                  <p className="text-sm text-gray-500 mb-5 leading-snug">{plan.description}</p>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-gray-500">{plan.currency || 'Q'}</span>
                    <span className="text-4xl font-extrabold" style={{ color: accentColor }}>{plan.price}</span>
                  </div>
                  {plan.period && (
                    <span className="text-xs text-gray-400">{plan.period}</span>
                  )}
                </div>

                {/* Features */}
                {plan.features && plan.features.length > 0 && (
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {plan.features.map(feature => (
                      <li key={feature.id} className="flex items-start gap-2.5 text-sm">
                        {feature.included ? (
                          <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        ) : (
                          <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </span>
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA button */}
                {plan.buttonText && (
                  <a
                    href={plan.buttonLink || '#'}
                    className="mt-auto block text-center py-3 px-5 rounded-xl font-semibold text-sm transition"
                    style={
                      plan.featured
                        ? { backgroundColor: accentColor, color: '#fff' }
                        : { backgroundColor: '#f3f4f6', color: accentColor }
                    }
                  >
                    {plan.buttonText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
