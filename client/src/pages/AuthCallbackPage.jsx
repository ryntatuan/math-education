import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, CheckCircle2, ArrowRight, Sparkles, Globe } from 'lucide-react'
import MascotIcon from '../components/common/MascotIcon'
import { supabase } from '../services/supabaseClient'
import { isAndroid, isIOS } from '../utils/deviceHelper'
import soundManager from '../utils/soundManager'
import './AuthCallbackPage.css'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [appUrl, setAppUrl] = useState('')
  const [status, setStatus] = useState('processing') // 'processing' | 'ready' | 'error'

  useEffect(() => {
    const isMobile = isAndroid() || isIOS() || /android|iphone|ipad|ipod/i.test(navigator.userAgent)
    setIsMobileDevice(isMobile)

    const rawSearch = window.location.search || ''
    const rawHash = window.location.hash || ''
    const deepLink = `toanvui://auth/callback${rawSearch}${rawHash}`
    setAppUrl(deepLink)

    // Nếu là thiết bị di động, tự động thử mở ứng dụng ngay lập tức
    if (isMobile) {
      try {
        window.location.href = deepLink
      } catch (err) {
        console.warn('Auto deep link redirect failed:', err)
      }
    }

    // Xử lý nạp phiên đăng nhập cho Supabase
    const processSession = async () => {
      try {
        if (!supabase) {
          setStatus('ready')
          return
        }

        // 1. Kiểm tra mã PKCE code
        const searchParams = new URLSearchParams(rawSearch)
        const code = searchParams.get('code')
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) console.warn('Web exchangeCode error:', error.message)
        }

        // 2. Kiểm tra hash tokens
        if (rawHash) {
          const hashParams = new URLSearchParams(rawHash.replace(/^#/, ''))
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })
          }
        }

        setStatus('ready')

        // Nếu là máy tính để bàn (desktop), tự động quay về trang chủ sau 1.2s
        if (!isMobile) {
          const timer = setTimeout(() => {
            navigate('/', { replace: true })
          }, 1200)
          return () => clearTimeout(timer)
        }
      } catch (err) {
        console.error('Lỗi xử lý Auth Callback:', err)
        setStatus('error')
      }
    }

    processSession()
  }, [navigate])

  const handleOpenApp = () => {
    soundManager.playClick()
    if (appUrl) {
      window.location.href = appUrl
    }
  }

  const handleContinueWeb = () => {
    soundManager.playClick()
    navigate('/', { replace: true })
  }

  return (
    <div className="auth-callback-container">
      <motion.div
        className="auth-callback-card"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="callback-mascot-wrapper">
          <MascotIcon size={64} />
          <div className="callback-badge">
            <CheckCircle2 size={24} color="#10B981" />
          </div>
        </div>

        <h2>Đăng Nhập Thành Công!</h2>

        {isMobileDevice ? (
          <>
            <p className="callback-desc">
              Hệ thống đang mở ứng dụng <strong>Toán Vui</strong> trên điện thoại của bạn...
            </p>

            <div className="callback-actions">
              <button className="open-app-btn" onClick={handleOpenApp}>
                <Smartphone size={20} />
                <span>Mở Ứng Dụng Toán Vui</span>
                <ArrowRight size={18} />
              </button>

              <button className="continue-web-btn" onClick={handleContinueWeb}>
                <Globe size={18} />
                <span>Hoặc tiếp tục học trên Trình duyệt Web</span>
              </button>
            </div>

            <p className="callback-hint">
              💡 Nếu app không tự mở, hãy nhấn nút <strong>Mở Ứng Dụng Toán Vui</strong> ở trên.
            </p>
          </>
        ) : (
          <>
            <p className="callback-desc">
              Chào mừng bạn đến với Toán Vui! Đang chuyển hướng về trang học tập...
            </p>
            <div className="callback-spinner">
              <Sparkles className="spin-icon" size={24} color="#FF9F1C" />
            </div>
            <button className="continue-web-btn" onClick={handleContinueWeb} style={{ marginTop: '1rem' }}>
              <span>Vào học ngay</span>
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}
