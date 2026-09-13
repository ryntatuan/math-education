import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Smartphone,
  Download,
  Check,
  Copy,
  ShieldCheck,
  HelpCircle,
  ArrowDownToLine,
  Share2,
  Sparkles,
  ExternalLink
} from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import soundManager from '../../utils/soundManager'
import useDownloadModalStore from '../../store/useDownloadModalStore'
import { detectDeviceOS, isIOS } from '../../utils/deviceHelper'
import './DownloadAppModal.css'

export default function DownloadAppModal() {
  const { isOpen, closeDownloadModal } = useDownloadModalStore()
  const [copied, setCopied] = useState(false)
  const [apkMeta, setApkMeta] = useState(null)
  const [activeOS, setActiveOS] = useState('android')

  useEffect(() => {
    if (!isOpen || Capacitor.isNativePlatform()) return
    // Auto-detect user OS on modal open
    setActiveOS(isIOS() ? 'ios' : 'android')

    fetch('/downloads/version.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setApkMeta(data)
      })
      .catch(() => {})
  }, [isOpen])

  if (!isOpen || Capacitor.isNativePlatform()) return null

  const handleClose = () => {
    soundManager.playClick()
    closeDownloadModal()
  }

  const apkDownloadUrl = `${window.location.origin}/downloads/ToanVui.apk`
  const webAppUrl = window.location.origin

  const handleCopyLink = async (textToCopy) => {
    soundManager.playClick()
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownloadClick = () => {
    soundManager.playClick()
  }

  return createPortal(
    <AnimatePresence>
      <div className="download-modal-overlay" onClick={handleClose}>
        <motion.div
          className="download-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button className="download-modal-close" onClick={handleClose} aria-label="Đóng">
            <X size={20} />
          </button>

          {/* Header */}
          <div className="download-modal-header">
            <div className="download-app-badge-icon">
              <span className="app-owl-icon">🦉</span>
              <span className="android-robot-badge">
                {activeOS === 'ios' ? '🍎' : '🤖'}
              </span>
            </div>
            <h2>
              {activeOS === 'ios'
                ? 'Cài App Toán Vui Cho iPhone & iPad'
                : 'Cài Đặt App Toán Vui Cho Điện Thoại'}
            </h2>
            <p className="download-modal-subtitle">
              {activeOS === 'ios'
                ? 'Cài đặt miễn phí trực tiếp lên Màn hình chính (PWA) • Không cần App Store'
                : 'Ứng dụng học toán tương tác chuẩn Bộ Giáo Dục trên Android (APK)'}
            </p>
          </div>

          {/* OS Switcher Tabs */}
          <div className="modal-os-tabs">
            <button
              type="button"
              className={`os-tab-btn ${activeOS === 'android' ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClick()
                setActiveOS('android')
              }}
            >
              <span>🤖 Android (.APK)</span>
            </button>
            <button
              type="button"
              className={`os-tab-btn ${activeOS === 'ios' ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClick()
                setActiveOS('ios')
              }}
            >
              <span>🍎 iPhone / iPad (iOS)</span>
            </button>
          </div>

          {/* TAB 1: ANDROID (.APK) */}
          {activeOS === 'android' && (
            <>
              {/* Main Download CTA Box */}
              <div className="download-cta-box">
                <div className="cta-app-meta">
                  <div className="meta-row">
                    <span className="meta-badge-version">Bản 1.0.0 (APK)</span>
                    <span className="meta-badge-tag">Android 7.0+</span>
                    <span className="meta-badge-size">
                      {apkMeta?.fileSizeMB ? `Dung lượng: ${apkMeta.fileSizeMB}` : 'Dung lượng: ~5.4 MB'}
                    </span>
                    {apkMeta?.buildDateFormatted && (
                      <span className="meta-badge-date">Cập nhật: {apkMeta.buildDateFormatted}</span>
                    )}
                  </div>
                </div>

                <a
                  href="/downloads/ToanVui.apk"
                  download="ToanVui.apk"
                  className="download-apk-action-btn"
                  onClick={handleDownloadClick}
                >
                  <ArrowDownToLine size={24} className="btn-dl-icon" />
                  <div className="btn-dl-text">
                    <span className="btn-dl-title">Tải File Cài Đặt (.APK)</span>
                    <span className="btn-dl-sub">Tải trực tiếp tốc độ cao • Miễn phí 100%</span>
                  </div>
                </a>

                {/* Copy Link to send to phone via Zalo/Messenger */}
                <div className="download-share-row">
                  <span className="share-label">Chia sẻ link tải cho điện thoại khác:</span>
                  <button
                    type="button"
                    className={`btn-copy-link ${copied ? 'is-copied' : ''}`}
                    onClick={() => handleCopyLink(apkDownloadUrl)}
                    title="Sao chép link tải"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Đã sao chép link!' : 'Copy Link Tải'}</span>
                  </button>
                </div>
              </div>

              {/* 3 Step Installation Guide */}
              <div className="install-steps-section">
                <h3 className="install-steps-title">
                  <HelpCircle size={17} />
                  <span>3 Bước Cài Đặt Nhanh:</span>
                </h3>

                <div className="install-steps-grid">
                  <div className="install-step-card">
                    <div className="step-num">1</div>
                    <div className="step-content">
                      <strong>Tải file về máy</strong>
                      <p>Bấm nút màu xanh ở trên để tải file <code>ToanVui.apk</code>.</p>
                    </div>
                  </div>

                  <div className="install-step-card">
                    <div className="step-num">2</div>
                    <div className="step-content">
                      <strong>Cho phép cài đặt</strong>
                      <p>Mở file vừa tải. Nếu máy hỏi, chọn <strong>"Cho phép nguồn này"</strong>.</p>
                    </div>
                  </div>

                  <div className="install-step-card">
                    <div className="step-num">3</div>
                    <div className="step-content">
                      <strong>Cài đặt & Mở học</strong>
                      <p>Bấm <strong>"Cài đặt"</strong> → Bắt đầu học với Toán Vui</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: iOS (IPHONE / IPAD) */}
          {activeOS === 'ios' && (
            <div className="ios-guide-box">
              <div className="ios-badge-intro">
                <span className="ios-badge-pill">💡 Không cần tải file • Không cần tài khoản Apple Developer</span>
                <p>
                  Trên iPhone & iPad, bé có thể cài app trực tiếp về màn hình chính chỉ trong <strong>5 giây</strong> qua trình duyệt <strong>Safari</strong>:
                </p>
              </div>

              <div className="ios-steps-list">
                <div className="ios-step-item">
                  <div className="ios-step-badge">1</div>
                  <div className="ios-step-info">
                    <div className="ios-step-heading">
                      <strong>Bấm nút Chia sẻ (Share 📤)</strong>
                    </div>
                    <p>
                      Mở website bằng <strong>Safari</strong>, nhìn xuống thanh công cụ dưới đáy màn hình và bấm biểu tượng <strong>Chia sẻ 📤</strong> (hình vuông có mũi tên hướng lên).
                    </p>
                  </div>
                </div>

                <div className="ios-step-item">
                  <div className="ios-step-badge">2</div>
                  <div className="ios-step-info">
                    <div className="ios-step-heading">
                      <strong>Chọn "Thêm vào MH chính" (Add to Home Screen 📲)</strong>
                    </div>
                    <p>
                      Cuộn danh sách tùy chọn xuống dưới, bấm chọn <strong>"Thêm vào Màn hình chính"</strong>, sau đó bấm nút <strong>"Thêm" (Add)</strong> ở góc trên bên phải.
                    </p>
                  </div>
                </div>

                <div className="ios-step-item">
                  <div className="ios-step-badge">3</div>
                  <div className="ios-step-info">
                    <div className="ios-step-heading">
                      <strong>Bé mở học toàn màn hình! 🎉</strong>
                    </div>
                    <p>
                      Icon app <strong>Toán Vui 🦉</strong> sẽ xuất hiện ngay trên màn hình iPhone/iPad. Mở lên sẽ chạy toàn màn hình (Fullscreen) mượt mà như app thật!
                    </p>
                  </div>
                </div>
              </div>

              {/* Copy link to open in Safari */}
              <div className="ios-copy-row">
                <span className="ios-copy-label">Đang xem trên trình duyệt khác?</span>
                <button
                  type="button"
                  className={`btn-copy-link ${copied ? 'is-copied' : ''}`}
                  onClick={() => handleCopyLink(webAppUrl)}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Đã sao chép link web!' : 'Copy Link để dán vào Safari'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Safety Guarantee */}
          <div className="download-safety-badge">
            <ShieldCheck size={17} className="safety-icon" />
            <span>Cam kết an toàn 100%, không chứa mã độc, không thu thập dữ liệu riêng tư của bé.</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}
