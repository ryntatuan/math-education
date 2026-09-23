import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createGuestAwareStorage } from "./sessionMode";
import useUserStore from "./useUserStore";
import useProgressStore from "./useProgressStore";

/**
 * Mối GIỜ trôi qua thì tụt 2% (độ no và độ vui dùng chung).
 * Chỉ tụt theo TỪNG MỐC GIỜ TRÒN, không trừ lẻ từng giây: cho ăn/chơi xong bé
 * được yên tâm thấy 100% suốt 1 tiếng, con số không nhấp nháy làm bé lo.
 */
export const DECAY_RATE = 2;
export const HOUR_MS = 3600000;

/**
 * Mức chăm sóc theo giá trị 0-100, dùng chung cho độ no & độ vui:
 * 100 tuyệt vời · 80-99 tốt · 50-79 bình thường · 20-49 thấp · 0-19 nguy hiểm.
 */
export const CARE_TIERS = [
  { id: "great", min: 100, label: "Tuyệt vời" },
  { id: "good", min: 80, label: "Tốt" },
  { id: "normal", min: 50, label: "Bình thường" },
  { id: "low", min: 20, label: "Thấp" },
  { id: "danger", min: 0, label: "Nguy hiểm" },
];

export const getCareTier = (value) =>
  CARE_TIERS.find((tier) => (value || 0) >= tier.min) ||
  CARE_TIERS[CARE_TIERS.length - 1];

/** Trừ dần theo TỪNG GIỜ TRÒN đã trôi qua (không trừ lẻ từng giây). */
const decayByHour = (value, since) => {
  const hours = Math.max(
    0,
    Math.floor((Date.now() - (since || Date.now())) / HOUR_MS),
  );
  return Math.max(0, Math.min(100, (value || 0) - hours * DECAY_RATE));
};

export const PET_TYPES = [
  {
    id: "owl",
    name: "Cú Con Trí Tuệ",
    icon: "🦉",
    desc: "Thần đồng toán học rừng xanh",
    price: 0,
    sound: "Cú cú!",
  },
  {
    id: "cat",
    name: "Mèo Mướp Siêu Nhẩm",
    icon: "🐱",
    desc: "Nhanh nhẹn, mê các con số",
    price: 500,
    sound: "Meo meo!",
  },
  {
    id: "corgi",
    name: "Corgi Thông Thái",
    icon: "🐶",
    desc: "Trung thành, thích nhẩm toán nhanh",
    price: 2000,
    sound: "Gâu gâu!",
  },
  {
    id: "dragon",
    name: "Rồng Nhỏ May Mắn",
    icon: "🐲",
    desc: "Mạnh mẽ, tỏa năng lượng tích cực",
    price: 5000,
    sound: "Grừ grừ!",
  },
];

/** Tiếng kêu đúng của loại thú đang nuôi (để câu thoại không bị "Gâu gâu" với mèo). */
export const getPetSound = (petType) =>
  (PET_TYPES.find((p) => p.id === petType) || PET_TYPES[0]).sound;

export const FOOD_TYPES = [
  {
    id: "apple",
    name: "Táo Trí Tuệ",
    icon: "🍎",
    hungerGain: 20,
    price: 10,
    expGain: 10,
  },
  {
    id: "croissant",
    name: "Bánh Tri Thức",
    icon: "🥐",
    hungerGain: 50,
    price: 20,
    expGain: 25,
  },
];

export const TOY_TYPES = [
  {
    id: "yarn",
    name: "Bóng Len",
    icon: "🧶",
    expGain: 30,
    price: 15,
    happinessGain: 20,
  },
  {
    id: "skateboard",
    name: "Ván Trượt",
    icon: "🛹",
    expGain: 75,
    price: 30,
    happinessGain: 20,
  },
  {
    id: "spaceship",
    name: "Tàu Vũ Trụ",
    icon: "🚀",
    expGain: 180,
    price: 60,
    happinessGain: 20,
  },
];

/**
 * 5 ngoại hình (tiến hoá) của thú cưng.
 * `level` = mốc cấp để MỞ ngoại hình đó. Mở rồi thì bé tự chọn cái mình thích
 * (xem `petEvolution` + `getActiveEvolution`), không bị gán cứng theo cấp.
 */
export const PET_EVOLUTIONS = [
  // id "plain" (khong dung "baby") de KHONG trung gia tri `stage` cu do app
  // phien ban truoc ghi: "baby"/"teen"/"master" -> cac gia tri do se tro
  // thanh khong hop le va tu roi ve che do "auto" theo cap.
  { id: "plain", name: "Thú con", icon: "🐾", level: 1 },
  { id: "crown", name: "Vương miện", icon: "👑", level: 10 },
  { id: "aura", name: "Hào quang", icon: "✨", level: 20 },
  { id: "wand", name: "Gậy phép", icon: "🪄", level: 30 },
  { id: "wings", name: "Đôi cánh", icon: "🪽", level: 40 },
];

/** Ngoại hình cao nhất mà cấp hiện tại đã mở (dùng khi bé chưa tự chọn). */
export const getUnlockedEvolution = (level) => {
  let best = PET_EVOLUTIONS[0];
  for (const e of PET_EVOLUTIONS) {
    if ((level || 1) >= e.level) best = e;
  }
  return best;
};

/**
 * Ngoại hình đang trưng: bé chọn thì theo bé (miễn là đã mở);
 * "auto" hoặc chọn cái chưa mở thì theo cấp.
 */
export const getActiveEvolution = (level, chosen) => {
  if (chosen && chosen !== "auto") {
    const found = PET_EVOLUTIONS.find((e) => e.id === chosen);
    if (found && (level || 1) >= found.level) return found;
  }
  return getUnlockedEvolution(level);
};

/**
 * Cộng EXP cho thú cưng: lên cấp nếu đủ, và trả về số hộp quà được thưởng
 * theo mốc 5 cấp (dùng chung cho đồ chơi và thức ăn).
 */
const applyPetExp = (state, expGain, getExpForNextLevel) => {
  let exp = state.exp + (expGain || 0);
  let level = state.level;
  let expForNextLevel = state.expForNextLevel;

  while (exp >= expForNextLevel) {
    exp -= expForNextLevel;
    level += 1;
    expForNextLevel = getExpForNextLevel(level);
  }

  const boxesGained = Math.floor(level / 5) - Math.floor(state.level / 5);
  return { exp, level, expForNextLevel, boxesGained };
};

const usePetStore = create(
  persist(
    (set, get) => ({
      // Current Pet State
      hasPet: false,
      petType: "owl",
      petName: "Bạn Cú Nhỏ",
      unlockedPets: ["owl"],
      hunger: 80, // 0 - 100
      happiness: 90, // 0 - 100
      level: 1,
      exp: 0,
      expForNextLevel: 100,
      lastFedTime: Date.now(),
      // Mốc để suy giảm độ vui (khác mốc độ no: cho ăn mà làm mới đồng hồ độ vui là sai)
      lastHappinessTime: Date.now(),
      unopenedGiftBoxes: 0,
      // Ngoại hình đang trưng: "auto" = theo cấp, hoặc id trong PET_EVOLUTIONS
      petEvolution: "auto",

      // Inventory holds both foods and toys
      inventory: {
        apple: 3,
        croissant: 2,
        yarn: 2,
      },

      // Speech bubble
      petSpeech: "Chào bạn nhỏ! Cùng học toán thật vui nhé! ✨",

      // Selectors
      getExpForNextLevel: (lvl) => 100 + 20 * (lvl - 1),
      getHunger: (state) => decayByHour(state.hunger, state.lastFedTime),
      getHappiness: (state) =>
        decayByHour(state.happiness, state.lastHappinessTime),

      // Actions
      adoptPet: (typeId, name) => {
        const found = PET_TYPES.find((p) => p.id === typeId) || PET_TYPES[0];
        set((state) => ({
          hasPet: true,
          petType: found.id,
          petName: name || found.name,
          unlockedPets: Array.from(
            new Set([...(state.unlockedPets || []), found.id]),
          ),
          hunger: 90,
          happiness: 100,
          level: 1,
          exp: 0,
          expForNextLevel: 100,
          lastFedTime: Date.now(),
          lastHappinessTime: Date.now(),
          petSpeech: `${found.sound} Xin chào! Tớ là ${name || found.name}! Rất vui được đồng hành cùng bạn! 🎉`,
        }));
      },

      unlockPet: (typeId) => {
        const found = PET_TYPES.find((p) => p.id === typeId);
        if (!found) return;
        set((state) => ({
          unlockedPets: Array.from(
            new Set([...(state.unlockedPets || []), found.id]),
          ),
          hasPet: true,
          petType: state.hasPet ? state.petType : found.id,
          petName: state.hasPet ? state.petName : found.name,
          // Chưa từng nuôi thú: vào chuồng với trạng thái tươi mới.
          // Không set `lastFedTime` thì thú đầu tiên mua từ Shop sẽ "đói sẵn"
          // (độ no suy từ `lastFedTime` cũ đã lưu ở phiên trước).
          ...(state.hasPet
            ? {}
            : {
                hunger: 90,
                happiness: 90,
                lastFedTime: Date.now(),
                lastHappinessTime: Date.now(),
              }),
        }));
      },

      switchPet: (typeId) => {
        const state = get();
        const found = PET_TYPES.find((p) => p.id === typeId);
        if (!found || !(state.unlockedPets || []).includes(typeId)) return;
        set({
          petType: found.id,
          petName: found.name,
          petSpeech: `Tớ đã trở lại! Chúng ta tiếp tục học nào! 🚀`,
        });
      },

      /**
       * Đổi tên thú cưng SAU khi đã nhận nuôi.
       * Trước đây bé chỉ đặt tên được MỘT LẦN lúc nhận nuôi rồi không sửa được nữa
       * (người dùng báo 2026-09-23).
       *
       * Tên rỗng / toàn dấu cách ⇒ GIỮ NGUYÊN tên cũ, không xoá tên của bé.
       * Cắt 16 ký tự cho khớp `maxLength` của ô nhập và cho vừa thẻ tên trên widget.
       */
      renamePet: (name) => {
        const tenMoi = String(name ?? "")
          .trim()
          .slice(0, 16);
        if (!tenMoi) return;
        set({
          petName: tenMoi,
          petSpeech: `Tớ là ${tenMoi}! Rất vui được gặp bạn! 🐾`,
        });
      },

      /**
       * Bé tự chọn ngoại hình trưng. Chỉ nhận ngoại hình ĐÃ MỞ
       * (cấp hiện tại >= mốc); "auto" = quay về theo cấp.
       */
      setPetEvolution: (evolutionId) => {
        if (evolutionId === "auto") {
          set({ petEvolution: "auto" });
          return;
        }
        const found = PET_EVOLUTIONS.find((e) => e.id === evolutionId);
        if (!found) return;
        if ((get().level || 1) < found.level) return;
        set({ petEvolution: found.id });
      },

      addFood: (foodId, amount = 1) => {
        set((state) => ({
          inventory: {
            ...state.inventory,
            [foodId]: (state.inventory[foodId] || 0) + amount,
          },
        }));
      },

      addToy: (toyId, amount = 1) => {
        set((state) => ({
          inventory: {
            ...state.inventory,
            [toyId]: (state.inventory[toyId] || 0) + amount,
          },
        }));
      },

      feedPet: (foodId) => {
        const state = get();
        const count = state.inventory[foodId] || 0;
        if (count <= 0) return { error: "Không đủ thức ăn!" };

        const food = FOOD_TYPES.find((f) => f.id === foodId);
        if (!food) return { error: "Thức ăn không tồn tại!" };

        const currentHunger = get().getHunger(state);
        // So theo số bé NHÌN THẤY (đã làm tròn). Trước đây so với số gốc nên
        // 99.6% vẫn bị chặn trong khi màn hình hiện 100%.
        if (Math.round(currentHunger) >= 100)
          return { error: "Thú cưng no căng bụng rồi, chờ chút nhé!" };

        const phrases = [
          "Ngon quá đi! Cảm ơn bé nhiều nha! 💖",
          "Được ăn no rồi, tớ thấy thông minh hơn hẳn! 🧠",
          "Bé học giỏi ghê, tớ vui lắm luôn! ✨",
          "Yum yum! Cùng giải bài tiếp nào bạn ơi! 🚀",
        ];
        const randomPhrase =
          phrases[Math.floor(Math.random() * phrases.length)];

        // Cho ăn cũng tăng EXP cho thú (bằng nửa độ no của món ăn) và có thể lên cấp
        const petExp = applyPetExp(
          state,
          food.expGain || 0,
          get().getExpForNextLevel,
        );

        set({
          inventory: {
            ...state.inventory,
            [foodId]: count - 1,
          },
          hunger: Math.min(100, currentHunger + food.hungerGain),
          // Cho ăn CHỈ tăng độ no + XP, KHÔNG đụng độ vui — và cũng không làm mới
          // đồng hồ suy giảm của độ vui (nếu không, bé cho ăn là độ vui được "reset" oan).
          lastFedTime: Date.now(),
          exp: petExp.exp,
          level: petExp.level,
          expForNextLevel: petExp.expForNextLevel,
          unopenedGiftBoxes:
            state.unopenedGiftBoxes + Math.max(0, petExp.boxesGained),
          petSpeech: randomPhrase,
        });

        // Update quest progress for taking care of pet
        useProgressStore.getState().progressQuest("quest_pet");

        return {
          success: true,
          expGained: food.expGain || 0,
          levelUp: petExp.level > state.level,
          boxesGained: Math.max(0, petExp.boxesGained),
        };
      },

      playWithPet: (toyId) => {
        const state = get();
        const currentHunger = get().getHunger(state);

        if (currentHunger < 50) {
          return { error: "Thú cưng đang đói, cần độ no trên 50% để chơi!" };
        }

        const count = state.inventory[toyId] || 0;
        if (count <= 0) return { error: "Không đủ đồ chơi!" };

        const toy = TOY_TYPES.find((t) => t.id === toyId);
        if (!toy) return { error: "Đồ chơi không tồn tại!" };

        const petExp = applyPetExp(
          state,
          toy.expGain,
          get().getExpForNextLevel,
        );

        const phrases = [
          `${getPetSound(state.petType)} Trò này vui quá! 🥰`,
          "Chơi vui quá! Tớ thêm bao nhiêu kinh nghiệm! ❤️",
          "Tớ có thêm năng lượng để cùng bé học bài rồi! ⭐",
        ];

        set({
          inventory: {
            ...state.inventory,
            [toyId]: count - 1,
          },
          happiness: Math.min(
            100,
            get().getHappiness(state) + toy.happinessGain,
          ),
          lastHappinessTime: Date.now(),
          exp: petExp.exp,
          level: petExp.level,
          expForNextLevel: petExp.expForNextLevel,
          petSpeech: phrases[Math.floor(Math.random() * phrases.length)],
          unopenedGiftBoxes:
            state.unopenedGiftBoxes + Math.max(0, petExp.boxesGained),
        });

        useProgressStore.getState().progressQuest("quest_pet");
        return {
          success: true,
          expGained: toy.expGain,
          levelUp: petExp.level > state.level,
          boxesGained: Math.max(0, petExp.boxesGained),
        };
      },

      openGiftBox: () => {
        const state = get();
        if (state.unopenedGiftBoxes <= 0)
          return { error: "Không có hộp quà nào!" };

        const { activeBoosters, addBooster } = useUserStore.getState();
        const aliveBoosters = activeBoosters.filter(
          (b) => b.type === "XP" && b.expiresAt > Date.now(),
        );

        if (aliveBoosters.length > 0) {
          return {
            error:
              "Chà! Con đang có phần thưởng nhân XP rồi. Hãy học chăm chỉ cho đến khi hết giờ rồi mở tiếp nhé!",
          };
        }

        const types = [
          { type: "XP", multiplier: 1.5, durationMinutes: 20 },
          { type: "XP", multiplier: 2, durationMinutes: 15 },
          { type: "XP", multiplier: 3, durationMinutes: 10 },
        ];
        const randomBooster = types[Math.floor(Math.random() * types.length)];

        addBooster(randomBooster);

        set({
          unopenedGiftBoxes: state.unopenedGiftBoxes - 1,
        });

        return {
          multiplier: randomBooster.multiplier,
          duration: randomBooster.durationMinutes,
        };
      },

      petPet: () => {
        const phrases = [
          `${getPetSound(get().petType)} Bé vuốt ve thích quá à! 🥰`,
          "Hi hi, nhột quá đi! Yêu bé nhất trần đời! ❤️",
          "Tớ có thêm năng lượng để cùng bé học bài rồi! ⭐",
        ];
        set((state) => ({
          happiness: Math.min(
            100,
            decayByHour(state.happiness, state.lastHappinessTime) + 10,
          ),
          lastHappinessTime: Date.now(),
          petSpeech: phrases[Math.floor(Math.random() * phrases.length)],
        }));
      },

      resetPet: () =>
        set({
          hasPet: false,
          petType: "owl",
          petName: "Bạn Cú Nhỏ",
          unlockedPets: ["owl"],
          hunger: 80,
          happiness: 90,
          level: 1,
          exp: 0,
          expForNextLevel: 100,
          lastFedTime: Date.now(),
          lastHappinessTime: Date.now(),
          unopenedGiftBoxes: 0,
          petEvolution: "auto",
          inventory: {
            apple: 3,
            croissant: 2,
            yarn: 2,
          },
          petSpeech: "Chào bạn nhỏ! Cùng học toán thật vui nhé! ✨",
        }),
    }),
    {
      name: "toan-vui-pet",
      storage: createGuestAwareStorage(),
    },
  ),
);

export default usePetStore;
