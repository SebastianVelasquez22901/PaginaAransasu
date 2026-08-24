import { compressImage } from './compressImage'

export const GALLERY_SOFT_CAP_BYTES = 150 * 1024 * 1024

export function formatBytes(bytes) {
  if (!bytes) return '0 MB'
  const mb = bytes / (1024 * 1024)
  if (mb < 1) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${mb.toFixed(1)} MB`
}

export function computeGalleryUsage(gallery) {
  const usedBytes = (gallery || []).reduce((sum, g) => sum + (g.sizeBytes || 0), 0)
  const pct = Math.min(100, (usedBytes / GALLERY_SOFT_CAP_BYTES) * 100)
  return { usedBytes, pct }
}

export function findGalleryImageUsage(content, url) {
  if (!content || !url) return false

  if (content.navbar?.logoUrl === url) return true

  for (const block of content.blocks || []) {
    if (block.image === url) return true
    if (Array.isArray(block.books) && block.books.some(b => b.image === url)) return true
    if (Array.isArray(block.photos) && block.photos.some(p => p.url === url)) return true
    if (Array.isArray(block.episodes) && block.episodes.some(e => e.image === url)) return true
  }

  return false
}

// La imagen recién subida tarda 1-2 min en quedar disponible en /img/gallery/...
// (espera al redeploy de Netlify tras el commit a GitHub). Mientras tanto, se
// cachea una vista previa local (blob URL) para que se vea de inmediato en el
// panel admin de esta sesión.
const previewCache = new Map()

export function getPreviewUrl(url) {
  return previewCache.get(url)
}

export async function uploadImage(file, password) {
  const compressed = await compressImage(file)

  const res = await fetch('/.netlify/functions/upload-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password,
      filename: compressed.filename,
      base64: compressed.base64,
      contentType: compressed.contentType,
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'No se pudo subir la imagen.')
  }

  const blob = await (await fetch(`data:${compressed.contentType};base64,${compressed.base64}`)).blob()
  previewCache.set(data.url, URL.createObjectURL(blob))

  return {
    id: `img${Date.now()}`,
    url: data.url,
    filename: compressed.filename,
    sizeBytes: data.sizeBytes || compressed.sizeBytes,
    width: compressed.width,
    height: compressed.height,
    uploadedAt: new Date().toISOString(),
  }
}
