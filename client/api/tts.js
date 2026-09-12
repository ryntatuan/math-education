export default async function handler(req, res) {
  try {
    const text = req.query.q || ''
    if (!text) {
      return res.status(400).send('Missing query text q')
    }

    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(text)}`
    const upstream = await fetch(googleUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (!upstream.ok) {
      return res.status(upstream.status).send(`Google TTS upstream error: ${upstream.status}`)
    }

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')
    res.setHeader('Access-Control-Allow-Origin', '*')

    const arrayBuffer = await upstream.arrayBuffer()
    res.status(200).send(Buffer.from(arrayBuffer))
  } catch (err) {
    res.status(500).send(`Server error: ${err.message}`)
  }
}
