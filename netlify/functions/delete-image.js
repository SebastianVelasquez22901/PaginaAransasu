export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), { status: 405 })
  }

  const { password, url } = await req.json()

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

  if (typeof url !== 'string' || !/^\/img\/gallery\/[a-zA-Z0-9._-]+$/.test(url)) {
    return new Response(JSON.stringify({ error: 'Ruta de imagen inválida.' }), { status: 400 })
  }

  const filePath = `public${url}`
  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}`
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }

  const getRes = await fetch(`${apiBase}/contents/${filePath}?ref=${GITHUB_BRANCH}`, { headers })
  if (!getRes.ok) {
    return new Response(JSON.stringify({ error: 'No se encontró la imagen en el repositorio.' }), { status: 404 })
  }
  const fileData = await getRes.json()

  const delRes = await fetch(`${apiBase}/contents/${filePath}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({
      message: 'Borrado de imagen desde el editor',
      sha: fileData.sha,
      branch: GITHUB_BRANCH,
    }),
  })

  if (!delRes.ok) {
    const err = await delRes.json()
    return new Response(JSON.stringify({ error: err.message || 'Error al borrar la imagen.' }), { status: 502 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
