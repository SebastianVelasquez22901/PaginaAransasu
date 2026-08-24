const CONTENT_TYPE_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

const MAX_BASE64_LENGTH = Math.ceil((2.2 * 1024 * 1024 * 4) / 3)

function slugify(name) {
  return name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'imagen'
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), { status: 405 })
  }

  const { password, filename, base64, contentType } = await req.json()

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_REPO = process.env.GITHUB_REPO
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

  if (!password || password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 })
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return new Response(
      JSON.stringify({ error: 'Configuración incompleta en el servidor.' }),
      { status: 500 }
    )
  }

  const ext = CONTENT_TYPE_EXT[contentType]
  if (!ext) {
    return new Response(JSON.stringify({ error: 'Tipo de imagen no permitido.' }), { status: 400 })
  }

  if (!base64 || typeof base64 !== 'string') {
    return new Response(JSON.stringify({ error: 'Falta la imagen.' }), { status: 400 })
  }

  const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, '')

  if (cleanBase64.length > MAX_BASE64_LENGTH) {
    return new Response(JSON.stringify({ error: 'La imagen es demasiado pesada.' }), { status: 413 })
  }

  const slug = slugify(filename || 'imagen')
  const finalName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${slug}.${ext}`
  const filePath = `public/img/gallery/${finalName}`

  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}`
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }

  const putRes = await fetch(`${apiBase}/contents/${filePath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'Subida de imagen desde el editor',
      content: cleanBase64,
      branch: GITHUB_BRANCH,
    }),
  })

  if (!putRes.ok) {
    const err = await putRes.json()
    return new Response(JSON.stringify({ error: err.message || 'Error al subir la imagen a GitHub.' }), { status: 502 })
  }

  return new Response(
    JSON.stringify({ ok: true, url: `/img/gallery/${finalName}`, filename: finalName, sizeBytes: Math.ceil((cleanBase64.length * 3) / 4) }),
    { status: 200 }
  )
}
