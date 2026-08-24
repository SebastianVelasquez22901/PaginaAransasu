import { computeGalleryUsage, formatBytes, GALLERY_SOFT_CAP_BYTES } from '../utils/gallery'

export default function GalleryUsageBar({ gallery }) {
  const { usedBytes, pct } = computeGalleryUsage(gallery)
  const color = pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-amber-500' : 'bg-violet-500'

  return (
    <div className="flex flex-col gap-1">
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-400">
        {formatBytes(usedBytes)} de {formatBytes(GALLERY_SOFT_CAP_BYTES)} usados
      </p>
    </div>
  )
}
