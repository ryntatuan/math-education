import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Check,
  Coins,
  Utensils,
  Shirt,
} from "lucide-react";
import Button from "../components/ui/Button";
import CoinIcon from "../components/common/CoinIcon";
import useUserStore from "../store/useUserStore";
import useAuthStore from "../store/useAuthStore";
import usePetStore, {
  PET_TYPES,
  FOOD_TYPES,
  TOY_TYPES,
} from "../store/usePetStore";
import PetAvatar from "../components/pet/PetAvatar";
import GuestFeatureLock from "../components/auth/GuestFeatureLock";
import soundManager from "../utils/soundManager";
import fireConfetti from "../utils/confettiHelper";
import "./ShopPage.css";

const SHOP_AVATARS = [
  { id: "av_owl_smart", emoji: "🦉", name: "Cú Mèo Tri Thức", price: 40 },
  { id: "av_super", emoji: "🦸", name: "Siêu Nhân Toán Học", price: 50 },
  { id: "av_unicorn", emoji: "🦄", name: "Kỳ Lân Cầu Vồng", price: 60 },
  { id: "av_dino", emoji: "🦖", name: "Khủng Long Tí Hon", price: 60 },
  { id: "av_astro", emoji: "👨‍🚀", name: "Phi Hành Gia Vũ Trụ", price: 80 },
  { id: "av_fox", emoji: "🦊", name: "Cáo Thông Thái", price: 40 },
  { id: "av_robot", emoji: "🤖", name: "Robot Tính Nhanh", price: 90 },
  { id: "av_dragon", emoji: "🐲", name: "Rồng Con May Mắn", price: 100 },
];

export default function ShopPage() {
  const { isGuest } = useAuthStore();
  const {
    coins,
    avatar,
    unlockedAvatars = ["👦", "👧"],
    setAvatar,
    spendCoins,
    unlockAvatar,
  } = useUserStore();

  const {
    hasPet,
    unlockedPets,
    petType,
    unlockPet,
    switchPet,
    addFood,
    addToy,
  } = usePetStore();

  const [purchaseMsg, setPurchaseMsg] = useState(null);
  const [activeTab, setActiveTab] = useState("pets"); // 'pets' | 'avatars'

  if (isGuest) {
    return (
      <GuestFeatureLock
        icon="🛍️"
        badgeText="CỬA HÀNG PHẦN THƯỞNG"
        title="Cửa Hàng Dành Riêng Cho Thành Viên"
        subtitle="Đăng nhập tài khoản để tích lũy xu vàng qua mỗi bài học và đổi các vật phẩm ngộ nghĩnh!"
        benefits={[
          {
            icon: "🪙",
            title: "Tích Lũy Xu Vàng Thưởng",
            desc: "Thu thập xu vàng mỗi khi bé hoàn thành bài học, thử thách và nhiệm vụ hàng ngày.",
          },
          {
            icon: "🐾",
            title: "Mua Sắm Cho Thú Cưng",
            desc: "Mua thức ăn, đồ chơi, và mở khóa thêm nhiều người bạn thú cưng mới.",
          },
        ]}
      />
    );
  }

  const ownedAvatars = unlockedAvatars || ["👦", "👧", avatar];
  const ownedPets = unlockedPets || ["owl"];

  const showMessage = (msg, isSuccess = true) => {
    if (isSuccess) {
      soundManager.playFanfare();
      fireConfetti({ particleCount: 70, spread: 60 });
    } else {
      soundManager.playWrong();
    }
    setPurchaseMsg({ text: msg, isSuccess });
    setTimeout(() => setPurchaseMsg(null), 3000);
  };

  const handleBuyOrEquipAvatar = (item) => {
    if (ownedAvatars.includes(item.emoji)) {
      setAvatar(item.emoji);
      soundManager.playClick();
      setPurchaseMsg({
        text: `Đã đổi hình đại diện thành ${item.name}!`,
        isSuccess: true,
      });
      setTimeout(() => setPurchaseMsg(null), 2500);
    } else {
      if (coins >= item.price) {
        spendCoins(item.price, "shop.avatar");
        unlockAvatar(item.emoji);
        setAvatar(item.emoji);
        showMessage(`🎉 Chúc mừng! Bạn đã mở khóa ${item.name}!`);
      } else {
        showMessage(
          `❌ Bạn cần thêm ${item.price - coins} xu nữa để mua món này!`,
          false,
        );
      }
    }
  };

  const handleBuyPet = (pet) => {
    if (ownedPets.includes(pet.id)) {
      if (petType !== pet.id) {
        switchPet(pet.id);
        soundManager.playClick();
        setPurchaseMsg({
          text: `Đã đổi thú cưng thành ${pet.name}!`,
          isSuccess: true,
        });
        setTimeout(() => setPurchaseMsg(null), 2500);
      }
    } else {
      if (coins >= pet.price) {
        spendCoins(pet.price, "shop.pet");
        unlockPet(pet.id);
        switchPet(pet.id);
        showMessage(`🎉 Chúc mừng! Chào mừng ${pet.name} về đội!`);
      } else {
        showMessage(
          `❌ Bạn cần thêm ${pet.price - coins} xu để nhận nuôi bạn này!`,
          false,
        );
      }
    }
  };

  const handleBuyItem = (item, isToy = false) => {
    if (coins >= item.price) {
      spendCoins(item.price, isToy ? "shop.toy" : "shop.food");
      if (isToy) {
        addToy(item.id, 1);
      } else {
        addFood(item.id, 1);
      }
      soundManager.playCoin();
      setPurchaseMsg({ text: `Đã mua 1 ${item.name}!`, isSuccess: true });
      setTimeout(() => setPurchaseMsg(null), 2000);
    } else {
      showMessage(`❌ Không đủ xu để mua ${item.name}!`, false);
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="shop-coin-pill">
          <Coins size={24} className="coin-glow" />
          <span className="shop-coin-amount number">{coins} Xu</span>
        </div>
        <h1>🛍️ Cửa Hàng</h1>
        <p>Dùng xu vàng để mua sắm vật phẩm hoặc hình đại diện!</p>
      </div>

      <div className="shop-tabs">
        <button
          className={`shop-tab ${activeTab === "pets" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("pets");
            soundManager.playClick();
          }}
        >
          <Utensils size={18} /> Thú Cưng & Đồ Ăn
        </button>
        <button
          className={`shop-tab ${activeTab === "avatars" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("avatars");
            soundManager.playClick();
          }}
        >
          <Shirt size={18} /> Hình Đại Diện
        </button>
      </div>

      {purchaseMsg && (
        <motion.div
          className={`shop-notification ${!purchaseMsg.isSuccess ? "error" : ""}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {purchaseMsg.text}
        </motion.div>
      )}

      {activeTab === "avatars" && (
        <div className="shop-items-grid">
          {SHOP_AVATARS.map((item) => {
            const isOwned = ownedAvatars.includes(item.emoji);
            const isEquipped = avatar === item.emoji;

            return (
              <motion.div
                key={item.id}
                className={`shop-card ${isEquipped ? "equipped" : isOwned ? "owned" : ""}`}
                whileHover={{ y: -6 }}
              >
                <div className="shop-item-emoji">{item.emoji}</div>
                <div className="shop-item-info">
                  <h3>{item.name}</h3>
                  {!isOwned && (
                    <span className="shop-price-tag">
                      <CoinIcon size={14} />{" "}
                      <span className="number">{item.price} Xu</span>
                    </span>
                  )}
                </div>
                <Button
                  variant={
                    isEquipped ? "ghost" : isOwned ? "primary" : "warning"
                  }
                  size="md"
                  className="shop-buy-btn"
                  onClick={() => handleBuyOrEquipAvatar(item)}
                >
                  {isEquipped ? (
                    <>
                      <Check size={16} /> Đang chọn
                    </>
                  ) : isOwned ? (
                    "Chọn dùng"
                  ) : (
                    "Mua ngay"
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === "pets" && (
        <>
          <h2 className="shop-section-title">Thú Cưng</h2>
          <div className="shop-items-grid">
            {PET_TYPES.map((pet) => {
              const isOwned = ownedPets.includes(pet.id);
              const isEquipped = hasPet && petType === pet.id;

              return (
                <motion.div
                  key={pet.id}
                  className={`shop-card ${isEquipped ? "equipped" : isOwned ? "owned" : ""}`}
                  whileHover={{ y: -6 }}
                >
                  <div className="shop-item-emoji">
                    <PetAvatar
                      petId={pet.id}
                      moodId="great"
                      className="shop-pet-avatar"
                    />
                  </div>
                  <div className="shop-item-info">
                    <h3>{pet.name}</h3>
                    {!isOwned && (
                      <span className="shop-price-tag">
                        <CoinIcon size={14} />{" "}
                        <span className="number">{pet.price} Xu</span>
                      </span>
                    )}
                  </div>
                  <Button
                    variant={
                      isEquipped ? "ghost" : isOwned ? "primary" : "warning"
                    }
                    size="md"
                    className="shop-buy-btn"
                    onClick={() => handleBuyPet(pet)}
                  >
                    {isEquipped ? (
                      <>
                        <Check size={16} /> Đang chọn
                      </>
                    ) : isOwned ? (
                      "Chọn"
                    ) : (
                      "Nhận nuôi"
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <h2 className="shop-section-title">Thức Ăn & Đồ Chơi</h2>
          <div className="shop-items-grid">
            {[...FOOD_TYPES, ...TOY_TYPES].map((item) => {
              const isToy = TOY_TYPES.some((t) => t.id === item.id);
              return (
                <motion.div
                  key={item.id}
                  className="shop-card"
                  whileHover={{ y: -6 }}
                >
                  <div className="shop-item-emoji">{item.icon}</div>
                  <div className="shop-item-info">
                    <h3>{item.name}</h3>
                    <p className="shop-item-desc">
                      {isToy
                        ? `+${item.expGain} XP · +${item.happinessGain} Độ vui`
                        : `+${item.hungerGain} Độ No · +${item.expGain} XP`}
                    </p>
                    <span className="shop-price-tag number">
                      <CoinIcon size={14} /> {item.price} Xu
                    </span>
                  </div>
                  <Button
                    variant="warning"
                    size="md"
                    className="shop-buy-btn"
                    onClick={() => handleBuyItem(item, isToy)}
                  >
                    Mua ngay
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
