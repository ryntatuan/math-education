import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { App as CapApp } from '@capacitor/app'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Network } from '@capacitor/network'
import useAuthStore from '../store/useAuthStore'
import { syncService } from '../services/syncService'
import { supabase } from '../services/supabaseClient'

export function useMobileLifecycle() {
  const navigate = useNavigate()
  const location = useLocation()
  const lastBackPressRef = useRef(0)
  const isNative = Capacitor.isNativePlatform()

  useEffect(() => {
    if (!isNative) return

    // 1. Configure Status Bar
    const configureStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light })
        if (Capacitor.getPlatform() === 'android') {
          await StatusBar.setBackgroundColor({ color: '#FFFFFF' })
        }
      } catch (err) {
        console.warn('StatusBar config error', err)
      }
    }
    configureStatusBar()

    // 2. Hardware Back Button Listener (Android)
    let backListener = null
    const setupBackButton = async () => {
      try {
        backListener = await CapApp.addListener('backButton', ({ canGoBack }) => {
          const pathname = window.location.pathname

          // Close modal if auth modal open
          const { isAuthModalOpen, setAuthModalOpen } = useAuthStore.getState()
          if (isAuthModalOpen) {
            setAuthModalOpen(false)
            return
          }

          if (pathname === '/' || pathname === '') {
            const now = Date.now()
            if (now - lastBackPressRef.current < 2000) {
              CapApp.exitApp()
            } else {
              lastBackPressRef.current = now
            }
          } else {
            navigate(-1)
          }
        })
      } catch (err) {
        console.warn('BackButton listener error', err)
      }
    }
    setupBackButton()

    // 3. Deep Linking (Custom Scheme: toanvui://)
    let urlListener = null
    const setupDeepLinking = async () => {
      try {
        urlListener = await CapApp.addListener('appUrlOpen', async (event) => {
          // e.g. toanvui://auth/callback#access_token=...&refresh_token=...
          const rawUrl = event.url || ''
          const slug = rawUrl.split('toanvui://').pop()
          if (slug && slug.startsWith('auth/callback')) {
            const hash = rawUrl.split('#')[1]
            if (hash && supabase) {
              const params = new URLSearchParams(hash)
              const accessToken = params.get('access_token')
              const refreshToken = params.get('refresh_token')
              if (accessToken && refreshToken) {
                try {
                  await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                  })
                } catch (sessionErr) {
                  console.warn('Error setting native session from deep link', sessionErr)
                }
              }
            }
            navigate('/')
          }
        })
      } catch (err) {
        console.warn('Deep linking listener error', err)
      }
    }
    setupDeepLinking()

    // 4. Network Status (Auto sync when coming back online)
    let networkListener = null
    const setupNetwork = async () => {
      try {
        networkListener = await Network.addListener('networkStatusChange', (status) => {
          if (status.connected) {
            syncService.scheduleCloudSync()
          }
        })
      } catch (err) {
        console.warn('Network listener error', err)
      }
    }
    setupNetwork()

    return () => {
      if (backListener?.remove) backListener.remove()
      if (urlListener?.remove) urlListener.remove()
      if (networkListener?.remove) networkListener.remove()
    }
  }, [isNative, navigate, location.pathname])
}

export default useMobileLifecycle
