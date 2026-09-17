import hapticsManager from './hapticsManager'

// Web Audio API based Sound Engine for immediate, zero-latency, zero-external-asset sound effects
class SoundEngine {
  constructor() {
    this.ctx = null
    this.soundEnabled = true
    this.bgmEnabled = true
    this.activeOscillators = []
  }

  stopAll() {
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop()
        osc.disconnect()
      } catch (e) {
        // ignore
      }
    })
    this.activeOscillators = []
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled
  }

  playTone(freq, type = 'sine', duration = 0.15, startTime = 0, gainLevel = 0.15) {
    if (!this.soundEnabled) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime)

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(this.ctx.currentTime + startTime)
      osc.stop(this.ctx.currentTime + startTime + duration)
      this.activeOscillators.push(osc)
    } catch (e) {
      console.warn('Audio playTone error', e)
    }
  }

  playCorrect() {
    this.stopAll()
    hapticsManager.success()
    if (!this.soundEnabled) return
    // Joyful major arpeggio
    this.playTone(523.25, 'triangle', 0.12, 0, 0.2)      // C5
    this.playTone(659.25, 'triangle', 0.12, 0.08, 0.2)   // E5
    this.playTone(783.99, 'triangle', 0.15, 0.16, 0.22)  // G5
    this.playTone(1046.50, 'triangle', 0.35, 0.24, 0.25) // C6
  }

  playWrong() {
    this.stopAll()
    hapticsManager.error()
    if (!this.soundEnabled) return
    // Gentle boop
    this.playTone(280, 'sine', 0.15, 0, 0.18)
    this.playTone(220, 'sine', 0.25, 0.12, 0.18)
  }

  playClick() {
    this.stopAll()
    hapticsManager.light()
    if (!this.soundEnabled) return
    this.playTone(800, 'sine', 0.04, 0, 0.08)
  }

  playCoin() {
    this.stopAll()
    hapticsManager.medium()
    if (!this.soundEnabled) return
    // Sparkly chime
    this.playTone(987.77, 'sine', 0.08, 0, 0.2)    // B5
    this.playTone(1318.51, 'sine', 0.25, 0.08, 0.22) // E6
  }

  playLevelUp() {
    this.stopAll()
    hapticsManager.success()
    if (!this.soundEnabled) return
    const notes = [440, 554.37, 659.25, 880, 1108.73]
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.2, idx * 0.08, 0.2)
    })
  }

  playFanfare() {
    this.stopAll()
    hapticsManager.success()
    if (!this.soundEnabled) return
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 523.25, d: 0.12, t: 0.12 },
      { f: 523.25, d: 0.12, t: 0.24 },
      { f: 659.25, d: 0.25, t: 0.36 },
      { f: 783.99, d: 0.35, t: 0.52 },
      { f: 1046.50, d: 0.5, t: 0.72 },
    ]
    notes.forEach((n) => {
      this.playTone(n.f, 'triangle', n.d, n.t, 0.22)
    })
  }
}

export const soundManager = new SoundEngine()
export default soundManager
