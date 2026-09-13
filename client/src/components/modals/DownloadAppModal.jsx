import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, Download, Check, Copy, ShieldCheck, HelpCircle, ArrowDownToLine } from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import soundManager from '../../utils/soundManager'
import useDownloadModalStore from '../../store/useDownloadModalStore'
import './DownloadAppModal.css'

export default function DownloadAppModal() {
  const { isOpen, closeDownloadModal } = useDownloadModalStore()
  const [copied, setCopied] = useState(false)
  const [apkMeta, setApkMeta] = useState(null)

  useEffect(() => {
    if (!isOpen || Capacitor.isNativePlatform()) return
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

  const handleCopyLink = async () => {
    soundManager.playClick()
    try {
      await navigator.clipboard.writeText(apkDownloadUrl)
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
              <span className="android-robot-badge">🤖</span>
            </div>
            <h2>Cài Đặt App Toán Vui Cho Điện Thoại</h2>
            <p className="download-modal-subtitle">
              Ứng dụng học toán tương tác chuẩn Bộ Giáo Dục trên Android (APK)
            </p>
          </div>

          {/* Main Download CTA Box */}
          <div className="download-cta-box">
            <div className="cta-app-meta">
              <div className="meta-row">
                <span className="meta-badge-version">Bản 1.0.0 (APK)</span>
                <span className="meta-badge-tag">Android 7.0+</span>
                <span className="meta-badge-size">
                  {apkMeta?.fileSizeMB ? `Dung lượng: ${apkMeta.fileSizeMB}` : 'Dung lượng: ~15 MB'}
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
              <span className="share-label">Chia sẻ link để tải trên điện thoại khác:</span>
              <button
                type="button"
                className={`btn-copy-link ${copied ? 'is-copied' : ''}`}
                onClick={handleCopyLink}
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
              <HelpCircle size={18} />
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

          {/* Safety Guarantee */}
          <div className="download-safety-badge">
            <ShieldCheck size={18} className="safety-icon" />
            <span>Cam kết an toàn 100%, không chứa mã độc hại, không thu thập dữ liệu cá nhân của trẻ.</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}
