export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), { status: 405 })
  }

  const { password, content } = await req.json()

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_REPO = process.env.GITHUB_REPO   // formato: "usuario/nombre-repo"
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

  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}`
  const filePath = 'public/content.json'
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }

  // Obtener el SHA actual del archivo (necesario para actualizarlo)
  const getRes = await fetch(`${apiBase}/contents/${filePath}?ref=${GITHUB_BRANCH}`, { headers })
  if (!getRes.ok) {
    return new Response(JSON.stringify({ error: 'No se pudo leer el archivo del repositorio.' }), { status: 502 })
  }
  const fileData = await getRes.json()
  const sha = fileData.sha

  // Actualizar el archivo con el nuevo contenido
  const newContent = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))))
  const putRes = await fetch(`${apiBase}/contents/${filePath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'Actualización de contenido desde el editor',
      content: newContent,
      sha,
      branch: GITHUB_BRANCH,
    }),
  })

  if (!putRes.ok) {
    const err = await putRes.json()
    return new Response(JSON.stringify({ error: err.message || 'Error al guardar en GitHub.' }), { status: 502 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
