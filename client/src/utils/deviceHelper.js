/**
 * Device & OS detection utility for smart mobile app installer experience
 */

export function detectDeviceOS() {
  if (typeof window === 'undefined') return 'desktop'
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || ''

  // iOS detection (iPhone, iPod, iPad)
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios'
  }
  // iPad on iOS 13+ (reports platform as MacIntel with touch support)
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return 'ios'
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    return 'android'
  }

  return 'desktop'
}

export function isIOS() {
  return detectDeviceOS() === 'ios'
}

export function isAndroid() {
  return detectDeviceOS() === 'android'
}
