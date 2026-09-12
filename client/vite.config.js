import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tts-proxy-middleware',
      configureServer(server) {
        server.middlewares.use('/api/tts', async (req, res) => {
          try {
            const parsedUrl = new URL(req.url, 'http://localhost')
            const text = parsedUrl.searchParams.get('q') || ''
            if (!text) {
              res.statusCode = 400
              return res.end('Missing text q')
            }
            const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(text)}`
            const upstream = await fetch(googleUrl, {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              },
            })
            if (!upstream.ok) {
              res.statusCode = upstream.status
              return res.end(`Google TTS error: ${upstream.status}`)
            }
            res.setHeader('Content-Type', 'audio/mpeg')
            res.setHeader('Cache-Control', 'public, max-age=86400')
            res.setHeader('Access-Control-Allow-Origin', '*')
            const arrayBuffer = await upstream.arrayBuffer()
            res.end(Buffer.from(arrayBuffer))
          } catch (e) {
            res.statusCode = 500
            res.end(`Server error: ${e.message}`)
          }
        })
      },
    },
  ],
})

