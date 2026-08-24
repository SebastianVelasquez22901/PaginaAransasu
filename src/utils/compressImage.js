export const MAX_DIMENSION = 1920
export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024

const QUALITY_STEPS = [0.82, 0.7, 0.6, 0.5]
const DIMENSION_STEPS = [MAX_DIMENSION, 1600, 1280]

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo leer la imagen. Prueba con otro archivo.'))
    }
    img.src = url
  })
}

function drawToCanvas(img, maxDimension) {
  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
  const width = Math.round(img.width * scale)
  const height = Math.round(img.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)
  return { canvas, width, height }
}

function canvasToDataUrl(canvas, quality) {
  return canvas.toDataURL('image/jpeg', quality)
}

function dataUrlToBase64(dataUrl) {
  return dataUrl.slice(dataUrl.indexOf(',') + 1)
}

function base64Size(base64) {
  return Math.ceil((base64.length * 3) / 4)
}

export async function compressImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('El archivo seleccionado no es una imagen.')
  }

  const img = await loadImage(file)

  for (const maxDimension of DIMENSION_STEPS) {
    const { canvas, width, height } = drawToCanvas(img, maxDimension)
    for (const quality of QUALITY_STEPS) {
      const dataUrl = canvasToDataUrl(canvas, quality)
      const base64 = dataUrlToBase64(dataUrl)
      const sizeBytes = base64Size(base64)
      if (sizeBytes <= MAX_UPLOAD_BYTES) {
        return {
          base64,
          contentType: 'image/jpeg',
          sizeBytes,
          width,
          height,
          filename: file.name,
        }
      }
    }
  }

  throw new Error('La imagen sigue siendo muy pesada incluso después de comprimirla. Prueba con una foto más simple o de menor resolución.')
}
