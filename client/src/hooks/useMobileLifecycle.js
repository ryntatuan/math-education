import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { App as CapApp } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Network } from '@capacitor/network'
import useAuthStore from '../store/useAuthStore'
import { syncService } from '../services/syncService'
import { supabase } from '../services/supabaseClient'

export function useMobileLifecycle() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationRef = useRef(location.pathname)
  const lastBackPressRef = useRef(0)
  const isNative = Capacitor.isNativePlatform()

  useEffect(() => {
    locationRef.current = location.pathname
  }, [location.pathname])

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
        backListener = await CapApp.addListener('backButton', () => {
          const pathname = locationRef.current || window.location.pathname

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

    // 3. Deep Linking Handler (Custom Scheme: toanvui://)
    const handleAuthDeepLink = async (rawUrl) => {
      if (!rawUrl || !rawUrl.includes('toanvui://')) return
      console.log('Mobile App Deep Link Received:', rawUrl)

      // 3.1. Đóng Chrome Custom Tab nếu đang mở
      try {
        await Browser.close()
      } catch {
        // Bỏ qua nếu browser đã đóng hoặc không mở
      }

      try {
        // Chuẩn hóa URL để parse searchParams và hash
        const urlObj = new URL(rawUrl.replace(/^toanvui:\/\//, 'https://toanvui/'))
        let sessionEstablished = false

        // Trường hợp A: Luồng PKCE nhận mã xác thực code (?code=...)
        const code = urlObj.searchParams.get('code')
        if (code && supabase) {
          console.log('Đang đổi mã PKCE code lấy session...')
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            console.error('Lỗi khi exchangeCodeForSession:', error.message)
          } else if (data?.session) {
            console.log('Đăng nhập thành công qua mã PKCE!')
            sessionEstablished = true
          }
        }

        // Trường hợp B: Luồng Implicit nhận token qua hash (#access_token=...&refresh_token=...)
        const hashStr = urlObj.hash ? urlObj.hash.substring(1) : (rawUrl.split('#')[1] || '')
        if (!sessionEstablished && hashStr && supabase) {
          const hashParams = new URLSearchParams(hashStr)
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          if (accessToken && refreshToken) {
            console.log('Đang nạp session từ hash access_token...')
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            if (error) {
              console.error('Lỗi khi setSession từ hash:', error.message)
            } else if (data?.session) {
              console.log('Đăng nhập thành công qua access_token hash!')
              sessionEstablished = true
            }
          }
        }

        // Trường hợp C: Token trả về qua query parameters (?access_token=...)
        if (!sessionEstablished && supabase) {
          const accessToken = urlObj.searchParams.get('access_token')
          const refreshToken = urlObj.searchParams.get('refresh_token')
          if (accessToken && refreshToken) {
            console.log('Đang nạp session từ query access_token...')
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            if (!error && data?.session) {
              sessionEstablished = true
            }
          }
        }

        // Dọn dẹp trạng thái auth modal và quay lại trang chủ
        useAuthStore.getState().setAuthModalOpen(false)
        useAuthStore.setState({ loading: false })

        if (sessionEstablished) {
          try {
            const currentUser = (await supabase.auth.getUser()).data?.user
            if (currentUser) {
              await syncService.autoMigrateGuestDataToCloud(currentUser)
            }
          } catch (syncErr) {
            console.warn('Lỗi autoMigrate sau deep link:', syncErr)
          }
        }

        navigate('/')
      } catch (err) {
        console.error('Lỗi xử lý Deep Link:', err)
        useAuthStore.getState().setAuthModalOpen(false)
        useAuthStore.setState({ loading: false })
      }
    }

    // 3.2. Bắt deep link khi app mở từ trạng thái tắt hoàn toàn (Cold Start)
    const checkLaunchUrl = async () => {
      try {
        const launchUrl = await CapApp.getLaunchUrl()
        if (launchUrl?.url) {
          await handleAuthDeepLink(launchUrl.url)
        }
      } catch (e) {
        console.warn('Lỗi kiểm tra getLaunchUrl:', e)
      }
    }
    checkLaunchUrl()

    // 3.3. Lắng nghe deep link khi app đang chạy nền (Warm/Resume)
    let urlListener = null
    const setupDeepLinking = async () => {
      try {
        urlListener = await CapApp.addListener('appUrlOpen', async (event) => {
          await handleAuthDeepLink(event.url)
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
  }, [isNative, navigate])
}

export default useMobileLifecycle
