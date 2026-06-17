import express from 'express'
import { createServer as createViteServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { extractUrlColors } from './lib/extractUrl.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV !== 'production'
const allowPrivateNetworkExtraction = isDev || process.env.HUEPRINT_LOCAL_DEV_MODE === 'true'
const PORT = Number(process.env.PORT) || 5173

const app = express()
app.use(express.json())

app.post('/api/extract-url', async (req, res) => {
  const { url } = req.body || {}
  const result = await extractUrlColors(url, {
    allowPrivateNetwork: allowPrivateNetworkExtraction,
  })
  return res.json(result)
})

if (isDev) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  })

  app.use(vite.middlewares)
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HuePrint] Dev server running at http://0.0.0.0:${PORT}`)
    console.log(`[HuePrint] API available at /api/extract-url`)
    console.log(`[HuePrint] Localhost extraction ${allowPrivateNetworkExtraction ? 'enabled' : 'disabled'}`)
  })
} else {
  const distPath = path.join(__dirname, 'dist')
  app.use(express.static(distPath))
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HuePrint] Production server running at http://0.0.0.0:${PORT}`)
  })
}
