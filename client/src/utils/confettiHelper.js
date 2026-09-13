import confetti from 'canvas-confetti'

/**
 * Robust confetti runner for web and native mobile apps.
 * Explicitly sets `useWorker: false` to eliminate the known Android WebView bug
 * where OffscreenCanvas animations in Web Workers freeze mid-air upon React DOM updates.
 */
const confettiCannon = confetti.create(null, {
  resize: true,
  useWorker: false,
})

export function fireConfetti(options = {}) {
  try {
    return confettiCannon({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      disableForReducedMotion: false,
      ...options,
    })
  } catch (err) {
    console.warn('fireConfetti error:', err)
  }
}

export default fireConfetti
