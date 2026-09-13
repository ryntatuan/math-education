// Advanced Vietnamese Text-to-Speech Engine for Primary Education
// Features:
// 1. Guaranteed Vietnamese Female Teacher Voice:
//    - Primary: High-speed, high-clarity streaming via local /api/tts proxy (Google Neural Vietnamese Female)
//    - Direct Stream fallback: Google TTS with no-referrer policy
//    - Web Speech fallback ONLY if a verified Vietnamese female voice exists (e.g., Microsoft HoaiMy)
//    - STRICT PROTECTION: NEVER plays non-Vietnamese or English voices (like Microsoft David)
// 2. Specialized Vietnamese math terminology & grammar translator (converts numbers, colons, operations, units)

class SpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    this.voices = []
    this.vietnameseVoice = null
    this.currentAudio = null
    this.isSpeaking = false
    this.enabled = true
    this.engineMode = 'auto' // 'auto' | 'google' | 'browser'

    if (this.synth) {
      this.initVoices()
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices()
      }
    }
  }

  initVoices() {
    if (!this.synth) return
    this.voices = this.synth.getVoices() || []

    const viVoices = this.voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase()
      const name = (v.name || '').toLowerCase()
      return (
        lang === 'vi-vn' ||
        lang === 'vi_vn' ||
        lang.startsWith('vi') ||
        name.includes('vietnam') ||
        name.includes('tiếng việt')
      )
    })

    // Filter strictly for female voices
    const femaleViVoices = viVoices.filter((v) => this.isFemaleVoice(v))

    femaleViVoices.sort((a, b) => {
      const score = (v) => {
        const name = (v.name || '').toLowerCase()
        let s = 0
        if (name.includes('hoaimy') || name.includes('hoài my')) s += 150
        if (name.includes('google')) s += 100
        if (name.includes('natural') || name.includes('online')) s += 40
        return s
      }
      return score(b) - score(a)
    })

    this.vietnameseVoice = femaleViVoices[0] || null
  }

  // Check if voice is genuinely a Vietnamese female voice
  isFemaleVoice(v) {
    if (!v) return false
    const name = (v.name || '').toLowerCase()
    const lang = (v.lang || '').toLowerCase()

    // Explicitly reject known male voices
    if (
      name.includes('namminh') ||
      name.includes('an ') ||
      name.includes(' an') ||
      name.includes('nam') ||
      name.includes('male') ||
      name.includes('david') ||
      name.includes('mark') ||
      name.includes('george')
    ) {
      return false
    }

    // Must have Vietnamese language or Vietnamese indicator in name
    const isVi =
      lang === 'vi-vn' ||
      lang === 'vi_vn' ||
      lang.startsWith('vi') ||
      name.includes('vietnam') ||
      name.includes('tiếng việt')

    if (!isVi) return false

    // Known female voices in Windows/Edge/Chrome
    if (name.includes('hoaimy') || name.includes('hoài my')) return true
    if (name.includes('google') && (lang === 'vi-vn' || lang === 'vi_vn')) return true
    if (name.includes('female') || name.includes('nữ') || name.includes('linh') || name.includes('mai')) return true

    return false
  }

  // Pre-process text to sound completely natural and grammatically correct in Vietnamese
  prepareMathText(text) {
    if (text === null || text === undefined) return ''

    let t = String(text)

    // Handle single digit cases (e.g. quiz options: 1, 2, 3)
    const trimmed = t.trim()
    const singleDigitMap = {
      '0': 'Số không',
      '1': 'Số một',
      '2': 'Số hai',
      '3': 'Số ba',
      '4': 'Số bốn',
      '5': 'Số năm',
      '6': 'Số sáu',
      '7': 'Số bảy',
      '8': 'Số tám',
      '9': 'Số chín',
      '10': 'Số mười',
    }
    if (singleDigitMap[trimmed]) {
      return singleDigitMap[trimmed]
    }

    // 1. Remove emojis, pictographs, and visual decor icons
    try {
      t = t.replace(/\p{Extended_Pictographic}/gu, '')
    } catch (e) {
      t = t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}]/gu, '')
    }

    // 2. Natural question endings: "= ?" or "=?" -> "bằng bao nhiêu?"
    t = t.replace(/=\s*\?/g, 'bằng bao nhiêu?')
    t = t.replace(/\.{2,}\s*\?/g, 'điền số nào?')
    t = t.replace(/\.{2,}|…/g, ' ... ')

    // 3. Math operations between numbers FIRST (before any colon replacement):
    // Division: "18 : 3" or "18 ÷ 3" -> "18 chia 3"
    t = t.replace(/(\d+)\s*[:÷]\s*(\d+)/g, '$1 chia $2')
    // Multiplication: "3 × 4" or "3 * 4" -> "3 nhân 4"
    t = t.replace(/(\d+)\s*[×*]\s*(\d+)/g, '$1 nhân $2')
    // Addition: "3 + 4" -> "3 cộng 4"
    t = t.replace(/(\d+)\s*\+\s*(\d+)/g, '$1 cộng $2')
    // Subtraction: "5 - 2" -> "5 trừ 2"
    t = t.replace(/(\d+)\s*-\s*(\d+)/g, '$1 trừ $2')

    // 4. Colon after letters or digits (e.g. "Số 1:", "Số 2:", "Số 3:", "Tính:", "Ví dụ:", "Hỏi:", "là:") -> replace with comma for a natural pause (NOT "chia"!)
    t = t.replace(/([a-zA-Zà-ỹÀ-Ỹ0-9])\s*:\s*/g, '$1, ')

    // 5. Currency and thousand separators:
    t = t.replace(/(\d+)\.000\s*(?:đ|đồng|vnd)/gi, '$1 nghìn đồng')
    t = t.replace(/(\d+)\.000/g, '$1 nghìn')
    t = t.replace(/\b(\d+)\s*(?:đ|vnd)\b/gi, '$1 đồng')

    // 6. Units with exponents (cm², m²):
    t = t.replace(/(\d+)\s*(?:cm²|cm2)/gi, '$1 xăng-ti-mét vuông')
    t = t.replace(/(\d+)\s*(?:m²|m2)/gi, '$1 mét vuông')
    t = t.replace(/(?:cm²|cm2)/gi, 'xăng-ti-mét vuông')
    t = t.replace(/(?:m²|m2)/gi, 'mét vuông')

    // 7. Unit rates: "/cái", "/quyển", "/hộp", "/kg"
    t = t.replace(/\/(?:cái|chiếc)/gi, ' một cái')
    t = t.replace(/\/quyển/gi, ' một quyển')
    t = t.replace(/\/hộp/gi, ' một hộp')
    t = t.replace(/\/kg/gi, ' một ki-lô-gam')

    // 8. Measurement units attached to numbers (only after digits to prevent breaking Vietnamese words like 'Một', 'nhẩm', 'chấm', 'là'):
    t = t.replace(/(\d+)\s*km\b/gi, '$1 ki-lô-mét')
    t = t.replace(/(\d+)\s*kg\b/gi, '$1 ki-lô-gam')
    t = t.replace(/(\d+)\s*dm\b/gi, '$1 đề-xi-mét')
    t = t.replace(/(\d+)\s*cm\b/gi, '$1 xăng-ti-mét')
    t = t.replace(/(\d+)\s*mm\b/gi, '$1 mi-li-mét')
    t = t.replace(/(\d+)\s*ml\b/gi, '$1 mi-li-lít')
    t = t.replace(/(\d+)\s*l\b/gi, '$1 lít')
    t = t.replace(/(\d+)\s*m\b/gi, '$1 mét')
    t = t.replace(/(\d+)\s*g\b/gi, '$1 gam')

    // 9. Common elementary fractions:
    t = t.replace(/\b1\/2\b/g, ' một phần hai ')
    t = t.replace(/\b1\/3\b/g, ' một phần ba ')
    t = t.replace(/\b1\/4\b/g, ' một phần tư ')
    t = t.replace(/\b1\/5\b/g, ' một phần năm ')
    t = t.replace(/\b3\/4\b/g, ' ba phần tư ')
    t = t.replace(/\b2\/3\b/g, ' hai phần ba ')
    t = t.replace(/\b(\d+)\/(\d+)\b/g, '$1 phần $2')

    // 10. Isolated math symbols:
    t = t.replace(/\s*[+]\s*/g, ' cộng ')
    t = t.replace(/\s*[×]\s*/g, ' nhân ')
    t = t.replace(/\s*[÷]\s*/g, ' chia ')
    t = t.replace(/\s*[=]\s*/g, ' bằng ')
    t = t.replace(/\s*[>]\s*/g, ' lớn hơn ')
    t = t.replace(/\s*[<]\s*/g, ' bé hơn ')
    t = t.replace(/\s*[%]\s*/g, ' phần trăm ')

    // 11. Em-dash or en-dash: " — " -> ", "
    t = t.replace(/\s*[—–]\s*/g, ', ')

    // 12. Arrows in text: "->" or "→" -> ", tức là " (natural pause and explanation)
    t = t.replace(/\s*(?:->|→|-->)\s*/g, ', tức là ')

    // Clean up extra whitespaces
    t = t.replace(/\s+/g, ' ').trim()

    return t
  }

  // Split long texts into sentences (< 150 chars) for smooth streaming
  splitSentences(text) {
    const rawSentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text]
    const chunks = []

    for (let s of rawSentences) {
      s = s.trim()
      if (!s) continue
      if (s.length <= 150) {
        chunks.push(s)
      } else {
        const subParts = s.split(/,\s*/)
        let current = ''
        for (const part of subParts) {
          if ((current + ', ' + part).length <= 150) {
            current = current ? current + ', ' + part : part
          } else {
            if (current) chunks.push(current)
            current = part
          }
        }
        if (current) chunks.push(current)
      }
    }
    return chunks.length > 0 ? chunks : [text]
  }

  speak(text, onStart, onEnd) {
    if (!this.enabled || !text) return

    // Stop any currently playing speech
    this.stop()

    const prepared = this.prepareMathText(text)
    if (!prepared) return

    // Re-verify voices if not loaded yet
    if (!this.vietnameseVoice && this.synth) {
      this.initVoices()
    }

    // Only use browser SpeechSynthesis if a verified high-quality FEMALE voice is available
    const hasVerifiedFemaleVoice = this.isFemaleVoice(this.vietnameseVoice)

    if (hasVerifiedFemaleVoice && this.engineMode === 'browser') {
      this.speakBrowser(prepared, onStart, onEnd)
    } else {
      // By default in 'auto' and 'google' mode, stream Google's authentic Vietnamese female voice
      this.speakFemaleStream(prepared, onStart, onEnd)
    }
  }

  // Stream authentic Vietnamese female voice via /api/tts proxy or direct stream with no-referrer
  speakFemaleStream(text, onStart, onEnd) {
    const chunks = this.splitSentences(text)
    let index = 0
    this.isSpeaking = true

    if (onStart) onStart()

    const playNext = () => {
      if (!this.isSpeaking || index >= chunks.length) {
        this.isSpeaking = false
        if (onEnd) onEnd()
        return
      }

      const chunk = chunks[index++]
      // 1. Primary: Local dev/backend proxy (completely bypasses referrer blocks)
      const proxyUrl = `/api/tts?q=${encodeURIComponent(chunk)}`
      // 2. Direct Google TTS URL
      const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(chunk)}`

      const audio = document.createElement('audio')
      audio.referrerPolicy = 'no-referrer'
      audio.src = proxyUrl
      audio.playbackRate = 1.05
      this.currentAudio = audio

      audio.onended = () => {
        playNext()
      }

      audio.onerror = () => {
        // If /api/tts proxy isn't available, try direct stream
        if (audio.src.includes('/api/tts')) {
          audio.src = directUrl
          audio.play().catch((err) => {
            console.warn('[SpeechEngine] Audio playback error:', err)
            // If browser has a verified female voice, try it as absolute last resort
            if (this.isFemaleVoice(this.vietnameseVoice)) {
              this.speakBrowser(chunk, null, () => playNext())
            } else {
              this.isSpeaking = false
              if (onEnd) onEnd()
            }
          })
          return
        }

        // If direct stream also fails, only use browser if verified female
        if (this.isFemaleVoice(this.vietnameseVoice)) {
          this.speakBrowser(chunk, null, () => playNext())
        } else {
          this.isSpeaking = false
          if (onEnd) onEnd()
        }
      }

      audio.play().catch((err) => {
        console.warn('[SpeechEngine] audio.play failed:', err)
        if (audio.src.includes('/api/tts')) {
          audio.src = directUrl
          audio.play().catch(() => {
            if (this.isFemaleVoice(this.vietnameseVoice)) {
              this.speakBrowser(chunk, null, () => playNext())
            } else {
              this.isSpeaking = false
              if (onEnd) onEnd()
            }
          })
          return
        }

        if (this.isFemaleVoice(this.vietnameseVoice)) {
          this.speakBrowser(chunk, null, () => playNext())
        } else {
          this.isSpeaking = false
          if (onEnd) onEnd()
        }
      })
    }

    playNext()
  }

  speakBrowser(text, onStart, onEnd) {
    if (!this.synth) {
      this.isSpeaking = false
      if (onEnd) onEnd()
      return
    }

    // Double check voice selection
    if (!this.vietnameseVoice) {
      this.initVoices()
    }

    // STRICT CHECK: Never speak with an English or non-female voice!
    if (!this.vietnameseVoice || !this.isFemaleVoice(this.vietnameseVoice)) {
      console.warn('[SpeechEngine] Refusing speakBrowser: No verified Vietnamese female voice installed.')
      this.isSpeaking = false
      if (onEnd) onEnd()
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = this.vietnameseVoice
    utterance.lang = this.vietnameseVoice.lang || 'vi-VN'

    // Natural, clear female pacing at 1.05x
    utterance.rate = 1.05
    utterance.pitch = 1.05

    utterance.onstart = () => {
      this.isSpeaking = true
      if (onStart) onStart()
    }

    utterance.onend = () => {
      this.isSpeaking = false
      if (onEnd) onEnd()
    }

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e)
      this.isSpeaking = false
      if (onEnd) onEnd()
    }

    this.synth.speak(utterance)
  }

  stop() {
    this.isSpeaking = false

    // Stop HTML5 Audio stream
    if (this.currentAudio) {
      try {
        this.currentAudio.pause()
        this.currentAudio.currentTime = 0
      } catch (e) {}
      this.currentAudio = null
    }

    // Stop Web Speech Synthesis
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel()
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled
    if (!enabled) this.stop()
  }
}

export const speechHelper = new SpeechEngine()
export default speechHelper
