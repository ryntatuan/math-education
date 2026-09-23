import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, X, Utensils, Gamepad2, Gift } from "lucide-react";
import Button from "../ui/Button";
import GoogleIcon from "../common/GoogleIcon";
import ProgressBar from "../ui/ProgressBar";
import usePetStore, {
  PET_TYPES,
  FOOD_TYPES,
  TOY_TYPES,
  PET_EVOLUTIONS,
  getActiveEvolution,
  getCareTier,
} from "../../store/usePetStore";
import useProgressStore from "../../store/useProgressStore";
import PetAvatar from "./PetAvatar";
import useAuthStore from "../../store/useAuthStore";
import soundManager from "../../utils/soundManager";
import fireConfetti from "../../utils/confettiHelper";
import "./PetWidget.css";

export default function PetWidget({ compact = false }) {
  const { isGuest, setAuthModalOpen } = useAuthStore();

  // Lấy toàn bộ state để tính toán getHunger động theo thời gian
  const state = usePetStore();
  const {
    hasPet,
    petType,
    petName,
    level,
    exp,
    expForNextLevel,
    inventory,
    unopenedGiftBoxes,
    petEvolution,
    petSpeech,
    adoptPet,
    feedPet,
    playWithPet,
    openGiftBox,
    setPetEvolution,
    petPet,
  } = state;

  const { progressQuest } = useProgressStore();

  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showGuestPetModal, setShowGuestPetModal] = useState(false);
  const [selectedPetType, setSelectedPetType] = useState("owl");
  const [customName, setCustomName] = useState("");
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [showToyMenu, setShowToyMenu] = useState(false);
  // Modal xem/đổi ngoại hình thú cưng (mở khi bé bấm vào thú cưng)
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);

  // Thông báo lỗi/thành công cục bộ
  const [localMsg, setLocalMsg] = useState({ text: "", type: "" });
  // Modal chúc mừng khi mở hộp quà (hiện giữa màn hình)
  const [giftModal, setGiftModal] = useState(null);

  // Force re-render để cập nhật đồng hồ đói
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!hasPet) return;
    const timer = setInterval(() => setTick((t) => t + 1), 60000); // Cập nhật mỗi phút
    return () => clearInterval(timer);
  }, [hasPet]);

  // Làm TRÒN chứ không làm phẳng: độ no vừa được nạp 100% sẽ tụt ngay vài
  // phần nghìn do trừ dần theo giờ, `Math.floor` cho ra 99% khiến bé tưởng ăn không lên.
  const currentHunger = hasPet ? Math.round(state.getHunger(state)) : 0;
  // Độ vui cũng suy giảm 2%/giờ nên phải tính động, không đọc số thô
  const currentHappiness = hasPet ? Math.round(state.getHappiness(state)) : 0;
  const hungerTier = getCareTier(currentHunger);
  const happinessTier = getCareTier(currentHappiness);
  // NÉT MẶT = mức THẤP HƠN trong hai chỉ số: thú buồn nếu HOẶC đói HOẶC chán,
  // nên bé chỉ cần nhìn mặt là biết cần chăm. Hai viên chỉ số vẫn tô màu riêng
  // theo từng chỉ số, để biết cần cho ăn hay cho chơi.
  const moodTier = getCareTier(
    Math.min(hasPet ? currentHunger : 100, hasPet ? currentHappiness : 100),
  );

  const currentPetInfo =
    PET_TYPES.find((p) => p.id === petType) || PET_TYPES[0];
  // Ngoại hình đang trưng: bé tự chọn được, mặc định theo cấp
  const evolution = getActiveEvolution(level, petEvolution);
  const tier = evolution.id;
  const tierName = evolution.name;
  const tierIcon = evolution.icon;

  // Hộp quà phát ở các mốc chia hết cho 5 -> cho bé biết còn mấy cấp nữa
  const nextGiftLevel = (Math.floor(level / 5) + 1) * 5;
  const levelsToGift = nextGiftLevel - level;

  const showMessage = (text, type = "success") => {
    setLocalMsg({ text, type });
    setTimeout(() => setLocalMsg({ text: "", type: "" }), 3500);
  };

  const handleFeed = (foodId) => {
    const res = feedPet(foodId);
    if (res.error) {
      soundManager.playWrong();
      showMessage(`❌ ${res.error}`, "error");
    } else {
      soundManager.playCoin();
      fireConfetti({ particleCount: 35, spread: 50 });
      showMessage(
        res.levelUp
          ? `Lên cấp ${level + 1}! +${res.expGained} XP`
          : `Ngon quá! +${res.expGained} XP cho thú cưng`,
      );
    }
  };

  const handlePlay = (toyId) => {
    const res = playWithPet(toyId);
    if (res.error) {
      soundManager.playWrong();
      showMessage(`❌ ${res.error}`, "error");
    } else {
      soundManager.playFanfare();
      fireConfetti({ particleCount: 50, spread: 60 });
      showMessage(
        res.levelUp
          ? `Lên cấp ${level + 1}! +${res.expGained} XP`
          : `Chơi vui quá! +${res.expGained} XP cho thú cưng`,
      );
    }
  };

  const handleOpenBox = () => {
    const res = openGiftBox();
    if (res.error) {
      soundManager.playWrong();
      showMessage(`❌ ${res.error}`, "error");
    } else {
      soundManager.playFanfare();
      fireConfetti({ particleCount: 100, spread: 80 });
      // Hiện MODAL giữa màn hình để bé thấy rõ vừa nhận được phần thưởng gì
      setGiftModal({ multiplier: res.multiplier, duration: res.duration });
    }
  };

  const handleConfirmAdopt = () => {
    adoptPet(selectedPetType, customName.trim() || undefined);
    setShowAdoptModal(false);
    soundManager.playFanfare();
    fireConfetti({ particleCount: 80, spread: 70 });
  };

  // Not adopted yet or guest account: Teaser / Locked card
  if (!hasPet || isGuest) {
    return (
      <div
        className={`pet-widget-card adopt-teaser ${compact ? "compact-teaser" : ""}`}
      >
        {/* Animated background stars */}
        <div className="teaser-sparkles-bg" aria-hidden="true">
          <span className="sparkle-item sp-1">✨</span>
          <span className="sparkle-item sp-2">⭐</span>
          <span className="sparkle-item sp-3">🌟</span>
          <span className="sparkle-item sp-4">🐾</span>
          <span className="sparkle-item sp-5">💖</span>
        </div>

        <div className={`teaser-main-content ${compact ? "compact" : ""}`}>
          <div className={`teaser-body-row ${compact ? "compact" : ""}`}>
            <div className={`teaser-egg-wrap ${compact ? "compact" : ""}`}>
              <span className="egg-aura-ring" />
              <motion.div
                className={`egg-display ${compact ? "compact" : ""}`}
                animate={{ rotate: [-6, 6, -6], y: [0, -5, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="egg-art">🥚</span>
                <span className="egg-shimmer">✨</span>
              </motion.div>
            </div>

            <div className={`teaser-info ${compact ? "compact" : ""}`}>
              <div className="teaser-badge">
                <Sparkles size={compact ? 12 : 14} />{" "}
                {isGuest
                  ? "🐾 Thú Cưng Học Toán"
                  : compact
                    ? "Ấp Trứng Kỳ Diệu"
                    : "Trứng Kỳ Diệu Đang Chờ Bé!"}
              </div>
              <h3>Thú Cưng Học Toán</h3>
              <p>
                {compact ? (
                  "Ấp nở Rồng Con 🐲, Corgi 🐶 cùng học toán!"
                ) : (
                  <>
                    Ấp nở{" "}
                    <strong>
                      Corgi 🐶, Mèo Con 🐱, Cú Mèo 🦉 hay Rồng Con 🐲
                    </strong>
                    ! Cùng bé giải toán tích xu, cho ăn và xem thú cưng lớn khôn
                    mỗi ngày!
                  </>
                )}
              </p>
            </div>
          </div>

          <div className={`teaser-action-area ${compact ? "compact" : ""}`}>
            <motion.button
              type="button"
              className={`btn-adopt-special ${compact ? "compact" : ""}`}
              onClick={() => {
                soundManager.playClick();
                if (isGuest) {
                  setShowGuestPetModal(true);
                } else {
                  setShowAdoptModal(true);
                }
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles size={compact ? 16 : 18} className="btn-sparkle-icon" />
              <span>Nhận Nuôi Ngay</span>
            </motion.button>
          </div>
        </div>

        {/* Adopt Modal */}
        <AnimatePresence>
          {showAdoptModal && (
            <div className="pet-adopt-overlay">
              <motion.div
                className="pet-adopt-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h2>🐾 Chọn Bạn Thú Cưng Của Bé</h2>
                <p>
                  Hãy chọn quả trứng mà bé thích nhất để cùng nhau học toán nhé!
                </p>

                <div className="pet-choice-grid">
                  {PET_TYPES.map((p) => {
                    const isLocked = p.price > 0;
                    return (
                      <div
                        key={p.id}
                        className={`pet-choice-card ${selectedPetType === p.id ? "active" : ""} ${isLocked ? "locked" : ""}`}
                        onClick={() => {
                          if (isLocked) return;
                          setSelectedPetType(p.id);
                          soundManager.playClick();
                        }}
                      >
                        <span className="pet-choice-icon">
                          <PetAvatar
                            petId={p.id}
                            moodId="great"
                            className="pet-choice-avatar"
                          />
                        </span>
                        <h4>
                          {p.name} {isLocked && `(🪙 ${p.price})`}
                        </h4>
                        <p>{isLocked ? "Mua trong Cửa Hàng" : p.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="pet-name-input-box">
                  <label>Đặt tên cho thú cưng (tùy chọn):</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Đậu Đậu, Miu Miu, Lửa Nhỏ..."
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={16}
                  />
                </div>

                <div className="pet-adopt-btns">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleConfirmAdopt}
                  >
                    <Check size={18} /> Nhận Nuôi Bạn Này
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAdoptModal(false)}
                  >
                    Để sau
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Guest Pet Locked / Intro Modal */}
        <AnimatePresence>
          {showGuestPetModal && (
            <div
              className="pet-adopt-overlay"
              onClick={() => setShowGuestPetModal(false)}
            >
              <motion.div
                className="pet-adopt-modal guest-pet-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button
                  className="guest-pet-close-btn"
                  onClick={() => setShowGuestPetModal(false)}
                >
                  <X size={20} />
                </button>

                <div className="guest-pet-badge-icon">
                  <span className="guest-pet-egg">🥚</span>
                  <span className="guest-pet-lock-badge">🔒</span>
                </div>

                <h2>🐾 Thú Cưng Học Toán Dành Cho Thành Viên</h2>
                <p className="guest-pet-desc">
                  Để nuôi và chăm sóc thú cưng lớn khôn, bé cần tích lũy{" "}
                  <strong>Xu Vàng</strong> qua mỗi bài học để mua thức ăn (Táo
                  🍎, Bánh mì 🥖, Thịt nướng 🍖...).
                </p>

                <div className="guest-pet-perks-box">
                  <h4>Quyền lợi khi đăng ký tài khoản:</h4>
                  <ul>
                    <li>
                      🥚 <strong>Ấp nở thú cưng độc quyền:</strong> Corgi 🐶,
                      Mèo Con 🐱, Cú Mèo 🦉, Rồng Con 🐲
                    </li>
                    <li>
                      🪙 <strong>Tích lũy Xu Vàng</strong> để mua đồ ăn, giúp
                      thú cưng tiến hóa lên cấp Vương Miện 👑
                    </li>
                    <li>
                      💖 <strong>Tương tác vui nhộn:</strong> Vuốt ve, cho ăn và
                      lắng nghe thú cưng cổ vũ bé học tập
                    </li>
                    <li>
                      ☁️ <strong>Bảo lưu vĩnh viễn</strong> dữ liệu thú cưng
                      trên đám mây, không lo mất khi đổi máy
                    </li>
                  </ul>
                </div>

                <div className="guest-pet-actions">
                  <Button
                    variant="primary"
                    size="lg"
                    className="btn-guest-pet-login"
                    onClick={() => {
                      soundManager.playClick();
                      setShowGuestPetModal(false);
                      setAuthModalOpen(true);
                    }}
                  >
                    <GoogleIcon size={20} />
                    <span>Đăng nhập Google để nhận thú cưng</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setShowGuestPetModal(false)}
                  >
                    Để sau
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Pet already adopted: Interactive Companion Widget
  return (
    <div
      className={`pet-widget-card active-pet ${compact ? "compact-pet" : ""}`}
    >
      {localMsg.text && (
        <motion.div
          className={`pet-local-msg ${localMsg.type}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {localMsg.text}
        </motion.div>
      )}

      <div
        className="pet-visual-area"
        onClick={() => {
          soundManager.playClick();
          setShowEvolutionModal(true);
        }}
        title="Bấm để xem và đổi ngoại hình thú cưng"
      >
        <motion.div
          className={`pet-avatar-wrapper pet-${petType} mood-${moodTier.id}`}
          whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <PetAvatar petId={petType} moodId={moodTier.id} />
          {tier === "wings" && <span className="pet-crown">🪽</span>}
          {tier === "wand" && <span className="pet-crown">🪄</span>}
          {tier === "aura" && <span className="pet-crown">✨</span>}
          {tier === "crown" && <span className="pet-crown">👑</span>}
        </motion.div>

        <div className="pet-speech-bubble">
          <span>{petSpeech}</span>
        </div>
      </div>

      <div className="pet-details-area">
        <div className="pet-name-row">
          <div className="pet-title-tag">
            <h4>{petName}</h4>
            <span className="pet-level-badge number">Lv. {level}</span>
          </div>

          <div className="pet-action-buttons">
            <button
              type="button"
              className={`food-menu-toggle-btn ${showFoodMenu ? "active" : ""}`}
              onClick={() => {
                setShowFoodMenu(!showFoodMenu);
                setShowToyMenu(false);
                soundManager.playClick();
              }}
            >
              <Utensils size={15} />
              <span>Ăn</span>
            </button>
            <button
              type="button"
              className={`food-menu-toggle-btn toy-btn ${showToyMenu ? "active" : ""}`}
              onClick={() => {
                setShowToyMenu(!showToyMenu);
                setShowFoodMenu(false);
                soundManager.playClick();
              }}
            >
              <Gamepad2 size={15} />
              <span>Chơi</span>
            </button>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="pet-stat-bar-group">
          <div className="pet-stat-labels">
            <span>Ngoại hình: {tierName}</span>
            <span className="number">
              {exp} / {expForNextLevel} XP
            </span>
          </div>
          <ProgressBar
            value={exp}
            max={expForNextLevel}
            variant="warning"
            size="sm"
          />
          <div className="pet-gift-hint">
            <Gift size={13} />
            <span>
              {compact
                ? `Còn ${levelsToGift} cấp nữa có hộp quà`
                : `Hộp quà tiếp theo ở cấp ${nextGiftLevel} — còn ${levelsToGift} cấp nữa!`}
            </span>
          </div>
        </div>

        {/* Hunger & Happiness stats */}
        <div className="pet-vitals-row">
          <div
            className={`vital-item tier-${hungerTier.id}`}
            title={`Độ no: ${hungerTier.label}`}
          >
            <span className="vital-label">🍗 Độ no:</span>
            <span className="vital-val number">{currentHunger}%</span>
          </div>
          <div
            className={`vital-item tier-${happinessTier.id}`}
            title={`Độ vui: ${happinessTier.label}`}
          >
            <span className="vital-label">❤️ Độ vui:</span>
            <span className="vital-val number">{currentHappiness}%</span>
          </div>
        </div>

        {/* Hộp Quà */}
        {unopenedGiftBoxes > 0 && (
          <div className="pet-gift-box-alert">
            <Gift size={16} className="gift-pulse" />
            <span>
              {compact
                ? `Hộp quà: ${unopenedGiftBoxes} cái`
                : `Bé có ${unopenedGiftBoxes} hộp quà nhân XP!`}
            </span>
            <Button variant="primary" size="sm" onClick={handleOpenBox}>
              {compact ? "Mở" : "Mở ngay"}
            </Button>
          </div>
        )}

        {/* Food Menu Dropdown */}
        <AnimatePresence>
          {showFoodMenu && (
            <motion.div
              className="pet-food-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="food-menu-title">Túi thức ăn của bé:</span>
              <div className="food-items-row">
                {FOOD_TYPES.map((f) => {
                  const qty = inventory[f.id] || 0;
                  return (
                    <button
                      key={f.id}
                      className="food-choice-btn"
                      disabled={qty <= 0}
                      onClick={() => handleFeed(f.id)}
                    >
                      <span className="food-emoji">{f.icon}</span>
                      <span className="food-name">{f.name}</span>
                      <span className="food-effect">
                        +{f.hungerGain} no · +{f.expGain} XP
                      </span>
                      <span className="food-qty number">x{qty}</span>
                    </button>
                  );
                })}
              </div>
              <span className="food-hint">
                💡 Mua thức ăn trong Cửa Hàng để thú cưng không bị đói!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toy Menu Dropdown */}
        <AnimatePresence>
          {showToyMenu && (
            <motion.div
              className="pet-food-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="food-menu-title">Đồ chơi của bé:</span>
              <div className="food-items-row">
                {TOY_TYPES.map((t) => {
                  const qty = inventory[t.id] || 0;
                  return (
                    <button
                      key={t.id}
                      className="food-choice-btn"
                      disabled={qty <= 0}
                      onClick={() => handlePlay(t.id)}
                    >
                      <span className="food-emoji">{t.icon}</span>
                      <span className="food-name">{t.name}</span>
                      <span className="food-effect">
                        +{t.expGain} XP · +{t.happinessGain} vui
                      </span>
                      <span className="food-qty number">x{qty}</span>
                    </button>
                  );
                })}
              </div>
              <span className="food-hint">
                💡 Đồ chơi giúp thú cưng mau lớn, nhớ cho ăn no {">"} 50% trước
                nhé!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL CHÚC MỪNG KHI MỞ HỘP QUÀ — hiện giữa màn hình */}
      <AnimatePresence>
        {giftModal && (
          <div className="pet-adopt-overlay" onClick={() => setGiftModal(null)}>
            <motion.div
              className="pet-gift-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <span className="pet-gift-modal-icon">🎁</span>
              <h2>Chúc mừng bé!</h2>
              <div className="pet-gift-modal-badge">
                Nhân <strong>{giftModal.multiplier}</strong> XP
              </div>
              <p className="pet-gift-modal-desc">
                Trong <strong>{giftModal.duration} phút</strong> tới, mọi XP bé
                nhận được sẽ được nhân{" "}
                <strong>{giftModal.multiplier} lần</strong> — kể cả điểm Đấu
                Trường!
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setGiftModal(null)}
              >
                Tuyệt vời! Học luôn 🚀
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL NGOẠI HÌNH — mở khi bé bấm vào thú cưng */}
      <AnimatePresence>
        {showEvolutionModal && (
          <div
            className="pet-adopt-overlay"
            onClick={() => setShowEvolutionModal(false)}
          >
            <motion.div
              className="pet-evo-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2>Ngoại hình của {petName}</h2>
              <p className="pet-evo-sub">
                Thú cưng lên cấp sẽ mở thêm ngoại hình. Cái nào đã mở là bé chọn
                được nhé!
              </p>

              <button
                type="button"
                className="pet-evo-preview"
                onClick={petPet}
                title="Chạm để vuốt ve thú cưng"
              >
                <span className="pet-evo-preview-pet">
                  <PetAvatar
                    petId={petType}
                    moodId={moodTier.id}
                    className="pet-evo-preview-avatar"
                  />
                  {tier !== "plain" && (
                    <span className="pet-evo-preview-icon">{tierIcon}</span>
                  )}
                </span>
                <span className="pet-evo-preview-text">{petSpeech}</span>
              </button>

              <div className="pet-evo-grid">
                {PET_EVOLUTIONS.map((e) => {
                  const unlocked = level >= e.level;
                  const isActive = e.id === tier;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={`pet-evo-card ${isActive ? "active" : ""} ${
                        unlocked ? "" : "locked"
                      }`}
                      disabled={!unlocked}
                      onClick={() => {
                        setPetEvolution(e.id);
                        soundManager.playClick();
                      }}
                    >
                      <span className="pet-evo-card-icon">{e.icon}</span>
                      <span className="pet-evo-card-name">{e.name}</span>
                      {isActive ? (
                        <span className="pet-evo-card-tag">Đang dùng</span>
                      ) : unlocked ? (
                        <span className="pet-evo-card-tag mo">Đã mở</span>
                      ) : (
                        <span className="pet-evo-card-tag khoa">
                          Mở ở cấp {e.level}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {level < 40 && (
                <p className="pet-evo-tip">
                  🎮 Chơi đồ chơi với thú cưng để lên cấp và mở ngoại hình mới!
                </p>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowEvolutionModal(false)}
              >
                Xong
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
