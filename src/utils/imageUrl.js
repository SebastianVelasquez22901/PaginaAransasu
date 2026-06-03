/**
 * Convierte links de Google Drive al formato de imagen directa.
 * Acepta: https://drive.google.com/file/d/FILE_ID/view?...
 * Devuelve: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200
 * Cualquier otra URL se devuelve sin cambios.
 */
export function resolveImageUrl(url) {
  if (!url) return url
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`
  return url
}
