import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import MascotIcon from '../components/common/MascotIcon'
import { supabase } from '../services/supabaseClient'
import soundManager from '../utils/soundManager'
import './AuthCallbackPage.css'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing') // 'processing' | 'ready' | 'error'

  useEffect(() => {
    const rawSearch = window.location.search || ''
    const rawHash = window.location.hash || ''
    const searchParams = new URLSearchParams(rawSearch)
    const fromApp = searchParams.get('from') === 'app'

    // Xử lý nạp phiên đăng nhập cho Supabase
    const processSession = async () => {
      try {
        if (!supabase) {
          setStatus('ready')
          setTimeout(() => navigate('/', { replace: true }), 800)
          return
        }

        // 1. Kiểm tra mã PKCE code
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

        // Nếu từ app mobile gọi ra web auth thì chuyển tiếp về app
        if (fromApp) {
          const deepLink = `toanvui://auth/callback${rawSearch}${rawHash}`
          try {
            window.location.href = deepLink
          } catch (err) {
            console.warn('Deep link redirect failed:', err)
          }
        } else {
          // Luôn giữ người dùng ở lại Web mượt mà
          const timer = setTimeout(() => {
            navigate('/', { replace: true })
          }, 1000)
          return () => clearTimeout(timer)
        }
      } catch (err) {
        console.error('Lỗi xử lý Auth Callback:', err)
        setStatus('error')
      }
    }

    processSession()
  }, [navigate])

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

        <p className="callback-desc">
          {status === 'error'
            ? 'Đã có lỗi xảy ra trong quá trình xác thực. Bạn có thể nhấn bên dưới để về trang chủ.'
            : 'Chào mừng bạn đến với Toán Vui! Đang chuyển hướng về trang học tập...'}
        </p>

        {status !== 'error' && (
          <div className="callback-spinner">
            <Sparkles className="spin-icon" size={24} color="#FF9F1C" />
          </div>
        )}

        <button className="continue-web-btn" onClick={handleContinueWeb} style={{ marginTop: '1rem' }}>
          <span>Vào học ngay</span>
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  )
}
