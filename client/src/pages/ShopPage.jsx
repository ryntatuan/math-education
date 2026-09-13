import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Sparkles, Check, Coins } from 'lucide-react'
import Button from '../components/ui/Button'
import useUserStore from '../store/useUserStore'
import useAuthStore from '../store/useAuthStore'
import GuestFeatureLock from '../components/auth/GuestFeatureLock'
import soundManager from '../utils/soundManager'
import fireConfetti from '../utils/confettiHelper'
import './ShopPage.css'

const SHOP_AVATARS = [
  { id: 'av_owl_smart', emoji: '🦉', name: 'Cú Mèo Tri Thức', price: 40 },
  { id: 'av_super', emoji: '🦸', name: 'Siêu Nhân Toán Học', price: 50 },
  { id: 'av_unicorn', emoji: '🦄', name: 'Kỳ Lân Cầu Vồng', price: 60 },
  { id: 'av_dino', emoji: '🦖', name: 'Khủng Long Tí Hon', price: 60 },
  { id: 'av_astro', emoji: '👨‍🚀', name: 'Phi Hành Gia Vũ Trụ', price: 80 },
  { id: 'av_fox', emoji: '🦊', name: 'Cáo Thông Thái', price: 40 },
  { id: 'av_robot', emoji: '🤖', name: 'Robot Tính Nhanh', price: 90 },
  { id: 'av_dragon', emoji: '🐲', name: 'Rồng Con May Mắn', price: 100 },
]

export default function ShopPage() {
  const { isGuest } = useAuthStore()
  const { coins, avatar, unlockedAvatars = ['👦', '👧'], setAvatar, spendCoins, unlockAvatar } = useUserStore()
  const [purchaseMsg, setPurchaseMsg] = useState(null)

  if (isGuest) {
    return (
      <GuestFeatureLock
        icon="🛍️"
        badgeText="CỬA HÀNG PHẦN THƯỞNG"
        title="Cửa Hàng Dành Riêng Cho Thành Viên"
        subtitle="Đăng nhập tài khoản để tích lũy xu vàng qua mỗi bài học và đổi các nhân vật hoạt hình ngộ nghĩnh!"
        benefits={[
          'Tích lũy xu vàng thưởng khi hoàn thành bài học và nhiệm vụ',
          'Mở khóa bộ sưu tập hơn 10 hình đại diện ngộ nghĩnh độc quyền',
          'Tùy biến phong cách riêng cho trang hồ sơ cá nhân',
          'Lưu giữ vĩnh viễn các nhân vật đã mua trên đám mây',
        ]}
      />
    )
  }

  const ownedList = unlockedAvatars || ['👦', '👧', avatar]

  const handleBuyOrEquip = (item) => {
    if (ownedList.includes(item.emoji)) {
      // Already owned: equip it
      setAvatar(item.emoji)
      soundManager.playClick()
      setPurchaseMsg(`Đã đổi hình đại diện thành ${item.name}!`)
      setTimeout(() => setPurchaseMsg(null), 2500)
    } else {
      // Need to purchase
      if (coins >= item.price) {
        spendCoins(item.price)
        unlockAvatar(item.emoji)
        setAvatar(item.emoji)
        soundManager.playFanfare()
        fireConfetti({ particleCount: 70, spread: 60 })
        setPurchaseMsg(`🎉 Chúc mừng! Bạn đã mở khóa ${item.name}!`)
        setTimeout(() => setPurchaseMsg(null), 3000)
      } else {
        soundManager.playWrong()
        setPurchaseMsg(`❌ Bạn cần thêm ${item.price - coins} xu nữa để mua món này!`)
        setTimeout(() => setPurchaseMsg(null), 2500)
      }
    }
  }

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="shop-coin-pill">
          <Coins size={24} className="coin-glow" />
          <span className="shop-coin-amount number">{coins} Xu</span>
        </div>
        <h1>🛍️ Cửa Hàng Phần Thưởng</h1>
        <p>Dùng xu vàng tích lũy được từ các bài học để đổi lấy nhân vật hoạt hình ngộ nghĩnh!</p>
      </div>

      {purchaseMsg && (
        <motion.div
          className="shop-notification"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {purchaseMsg}
        </motion.div>
      )}

      {/* Avatars Grid */}
      <div className="shop-items-grid">
        {SHOP_AVATARS.map((item) => {
          const isOwned = ownedList.includes(item.emoji)
          const isEquipped = avatar === item.emoji

          return (
            <motion.div
              key={item.id}
              className={`shop-card ${isEquipped ? 'equipped' : isOwned ? 'owned' : ''}`}
              whileHover={{ y: -6 }}
            >
              <div className="shop-item-emoji">{item.emoji}</div>
              <div className="shop-item-info">
                <h3>{item.name}</h3>
                <span className="shop-price-tag number">
                  {isOwned ? (isEquipped ? 'Đang dùng' : 'Đã sở hữu') : `🪙 ${item.price} Xu`}
                </span>
              </div>

              <Button
                variant={isEquipped ? 'ghost' : isOwned ? 'primary' : 'warning'}
                size="md"
                className="shop-buy-btn"
                onClick={() => handleBuyOrEquip(item)}
              >
                {isEquipped ? (
                  <>
                    <Check size={16} /> Đang chọn
                  </>
                ) : isOwned ? (
                  'Chọn dùng'
                ) : (
                  'Mua ngay'
                )}
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
