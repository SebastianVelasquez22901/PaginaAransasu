import { useDraggable } from '@dnd-kit/core'
import { BLOCK_TEMPLATES } from './blockTemplates'

function TemplateCard({ template }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${template.type}`,
    data: { source: 'sidebar', template },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="bg-white border border-gray-200 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-violet-400 hover:shadow-md transition select-none"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{template.icon}</span>
        <div>
          <p className="text-sm font-semibold text-gray-800">{template.label}</p>
          <p className="text-xs text-gray-400 leading-snug">{template.description}</p>
        </div>
      </div>
      <p className="text-xs text-violet-500 mt-2 text-center font-medium">⠿ Arrastrar a la página</p>
    </div>
  )
}

export default function BlocksSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-50 border-l border-gray-200 min-h-screen">
      <div className="sticky top-[52px] flex flex-col" style={{ maxHeight: 'calc(100vh - 52px)' }}>
        <div className="px-4 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bloques</span>
          </div>
          <p className="text-xs text-gray-400">
            Arrastra un bloque a la página para agregarlo
          </p>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-4 overflow-y-auto">
          {BLOCK_TEMPLATES.map(template => (
            <TemplateCard key={template.type} template={template} />
          ))}
        </div>
      </div>
    </aside>
  )
}
