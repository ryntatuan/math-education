import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import CoinIcon from "../common/CoinIcon";
import Button from "../ui/Button";
import "./RewardClaimModal.css";

export default function RewardClaimModal({
  isOpen,
  onClose,
  title = "Rương Thưởng Ngày!",
  subtitle = "Bé đã hoàn thành xuất sắc nhiệm vụ hôm nay!",
  chestIcon = "🎁",
  coins = 50,
  xp = 60,
  extraRewards = [],
  mascotMessage = "Bé học chăm chỉ quá! Rô-bốt và Cú Mèo tặng bé rương quà siêu to khổng lồ này nhé! 🦉✨",
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="reward-claim-overlay" onClick={onClose}>
          <motion.div
            className="reward-claim-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            {/* Nút đóng nhỏ ở góc */}
            <button
              type="button"
              className="reward-modal-close-btn"
              onClick={onClose}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            {/* Vầng sáng xoay phía sau rương */}
            <div className="reward-glow-backdrop" />

            {/* Icon Rương Quà toả sáng */}
            <motion.div
              className="reward-chest-visual"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, -3, 3, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="reward-chest-emoji">{chestIcon}</span>
              <span className="reward-sparkle-1">✨</span>
              <span className="reward-sparkle-2">⭐</span>
              <span className="reward-sparkle-3">✨</span>
            </motion.div>

            {/* Tiêu đề & phụ đề */}
            <div className="reward-modal-header">
              <span className="reward-celebrate-badge">🎉 CHÚC MỪNG BÉ!</span>
              <h2 className="reward-modal-title">{title}</h2>
              <p className="reward-modal-subtitle">{subtitle}</p>
            </div>

            {/* Khối hiển thị chi tiết phần thưởng to rõ */}
            <div className="reward-items-grid">
              {coins > 0 && (
                <motion.div
                  className="reward-item-card reward-item-coin"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                >
                  <div className="reward-item-icon-wrap coin-glow">
                    <CoinIcon size={32} />
                  </div>
                  <div className="reward-item-info">
                    <span className="reward-item-val number">+{coins}</span>
                    <span className="reward-item-name">Xu Vàng</span>
                  </div>
                </motion.div>
              )}

              {xp > 0 && (
                <motion.div
                  className="reward-item-card reward-item-xp"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 300 }}
                >
                  <div className="reward-item-icon-wrap xp-glow">
                    <span className="reward-xp-emoji">⚡</span>
                  </div>
                  <div className="reward-item-info">
                    <span className="reward-item-val number">+{xp}</span>
                    <span className="reward-item-name">Điểm XP</span>
                  </div>
                </motion.div>
              )}

              {extraRewards.map((extra, idx) => (
                <motion.div
                  key={idx}
                  className="reward-item-card reward-item-extra"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + idx * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <div className="reward-item-icon-wrap extra-glow">
                    <span className="reward-extra-emoji">{extra.icon}</span>
                  </div>
                  <div className="reward-item-info">
                    <span className="reward-item-val number">{extra.value}</span>
                    <span className="reward-item-name">{extra.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lời chúc vui từ linh vật */}
            {mascotMessage && (
              <div className="reward-mascot-box">
                <span className="reward-mascot-avatar">🦉</span>
                <p className="reward-mascot-text">{mascotMessage}</p>
              </div>
            )}

            {/* Nút bấm nhận quà to rực rỡ */}
            <div className="reward-modal-actions">
              <Button
                variant="warning"
                size="lg"
                className="btn-claim-reward-big"
                onClick={onClose}
              >
                <Sparkles size={20} />
                <span>Tuyệt vời! Nhận ngay</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

