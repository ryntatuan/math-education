import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { Capacitor } from '@capacitor/core'

class HapticsManager {
  constructor() {
    this.isNative = Capacitor.isNativePlatform()
  }

  async light() {
    try {
      if (this.isNative) {
        await Haptics.impact({ style: ImpactStyle.Light })
      } else if (navigator.vibrate) {
        navigator.vibrate(10)
      }
    } catch {
      // Ignore vibration errors gracefully
    }
  }

  async medium() {
    try {
      if (this.isNative) {
        await Haptics.impact({ style: ImpactStyle.Medium })
      } else if (navigator.vibrate) {
        navigator.vibrate(20)
      }
    } catch {
      // Ignore vibration errors gracefully
    }
  }

  async success() {
    try {
      if (this.isNative) {
        await Haptics.notification({ type: NotificationType.Success })
      } else if (navigator.vibrate) {
        navigator.vibrate([15, 50, 25])
      }
    } catch {
      // Ignore vibration errors gracefully
    }
  }

  async error() {
    try {
      if (this.isNative) {
        await Haptics.notification({ type: NotificationType.Error })
      } else if (navigator.vibrate) {
        navigator.vibrate([30, 40, 30])
      }
    } catch {
      // Ignore vibration errors gracefully
    }
  }
}

export const hapticsManager = new HapticsManager()
export default hapticsManager
