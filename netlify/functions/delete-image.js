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

  // Quitar también la entrada de content.json en el mismo paso, para que no
  // quede una referencia huérfana esperando a que alguien haga clic en
  // "Publicar cambios" por separado.
  const contentPath = 'public/content.json'
  const getContentRes = await fetch(`${apiBase}/contents/${contentPath}?ref=${GITHUB_BRANCH}`, { headers })
  if (getContentRes.ok) {
    const contentFile = await getContentRes.json()
    try {
      const decoded = decodeURIComponent(escape(atob(contentFile.content.replace(/\n/g, ''))))
      const contentJson = JSON.parse(decoded)
      const nextGallery = (contentJson.gallery || []).filter(g => g.url !== url)
      if (nextGallery.length !== (contentJson.gallery || []).length) {
        contentJson.gallery = nextGallery
        const newContentB64 = btoa(unescape(encodeURIComponent(JSON.stringify(contentJson, null, 2))))
        await fetch(`${apiBase}/contents/${contentPath}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            message: 'Actualización de galería (borrado de imagen)',
            content: newContentB64,
            sha: contentFile.sha,
            branch: GITHUB_BRANCH,
          }),
        })
      }
    } catch {
      // La imagen ya se borró correctamente; si esto falla no lo tratamos como error fatal.
    }
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
