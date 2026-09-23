import { create } from "zustand";
import { persist } from "zustand/middleware";
import useLeagueStore from "./useLeagueStore";
import useAuthStore from "./useAuthStore";
import { getReward, getLevelCurve } from "../services/rewardService";
import { supabase, isSupabaseConfigured } from "../services/supabaseClient";
import { createGuestAwareStorage } from "./sessionMode";

/**
 * Ghi sổ cái. Cố ý "bắn rồi quên" — đây là nhật ký kiểm toán, không phải
 * đường điều khiển. Ghi sổ lỗi KHÔNG được làm hỏng trải nghiệm học của bé.
 */
function logCoinTx(amount, reason, refId, balanceAfter) {
  try {
    if (!isSupabaseConfigured() || !supabase) return;
    const childId = useAuthStore.getState().activeChild?.id;
    if (!childId) return;
    supabase
      .from("coin_transactions")
      .insert({
        child_id: childId,
        amount,
        reason,
        ref_id: refId ?? null,
        balance_after: balanceAfter ?? null,
      })
      .then(
        () => {},
        (err) => console.warn("Không ghi được sổ cái Xu:", err?.message),
      );
  } catch (e) {
    console.warn("Lỗi ghi sổ cái Xu:", e?.message);
  }
}

function logXpEvent(amount, reason) {
  try {
    if (!isSupabaseConfigured() || !supabase) return;
    const childId = useAuthStore.getState().activeChild?.id;
    if (!childId) return;
    supabase
      .from("xp_events")
      .insert({ child_id: childId, amount, source: reason })
      .then(
        () => {},
        (err) => console.warn("Không ghi được sổ cái XP:", err?.message),
      );
  } catch (e) {
    console.warn("Lỗi ghi sổ cái XP:", e?.message);
  }
}

const useUserStore = create(
  persist(
    (set, get) => ({
      // Profile
      nickname: "Bé Yêu",
      grade: 1,
      avatar: "👦",
      unlockedAvatars: ["👦", "👧"],
      frame: null,
      level: 1,
      coins: 0,
      xp: 0,
      totalXpForNextLevel: 100,

      // Settings
      soundEnabled: true,
      musicEnabled: true,
      autoSpeakLesson: false,
      parentPin: null,

      // Boosters (không đồng bộ lên cloud, chỉ lưu local)
      activeBoosters: [],

      // Actions
      setGrade: (grade) => set({ grade }),
      setNickname: (nickname) => set({ nickname }),
      setAvatar: (avatar) => set({ avatar }),
      unlockAvatar: (avatarEmoji) =>
        set((state) => ({
          unlockedAvatars: Array.from(
            new Set([
              ...(state.unlockedAvatars || ["👦", "👧", state.avatar]),
              avatarEmoji,
            ]),
          ),
        })),

      addBooster: ({ type = 'XP', multiplier, durationMinutes }) => {
        set((state) => {
          const now = Date.now();
          // Lọc bùa hết hạn
          const aliveBoosters = (state.activeBoosters || []).filter(b => b.expiresAt > now);
          
          return {
            activeBoosters: [
              ...aliveBoosters,
              {
                type,
                multiplier,
                expiresAt: now + durationMinutes * 60 * 1000,
              },
            ],
          };
        });
      },

      cleanupBoosters: () => {
        set((state) => {
          const now = Date.now();
          const alive = (state.activeBoosters || []).filter(b => b.expiresAt > now);
          if (alive.length === (state.activeBoosters || []).length) return {};
          return { activeBoosters: alive };
        });
      },

      /**
       * Cộng Xu. `reason` là khoá trong reward_configs (hoặc 'manual' khi
       * admin cấp tay) — dùng để ghi sổ cái tra soát khiếu nại.
       */
      addCoins: (amount, reason = "unknown", refId = null) => {
        try {
          if (useAuthStore.getState().isGuest) return;
        } catch {}
        set((state) => ({ coins: state.coins + amount }));
        logCoinTx(amount, reason, refId, get().coins);
      },

      spendCoins: (amount, reason = "shop.purchase", refId = null) => {
        try {
          if (useAuthStore.getState().isGuest) return false;
        } catch {}
        const { coins } = get();
        if (coins >= amount) {
          set({ coins: coins - amount });
          logCoinTx(-amount, reason, refId, get().coins);
          return true;
        }
        return false;
      },

      addXp: (baseAmount, reason = "unknown") => {
        try {
          if (useAuthStore.getState().isGuest) return 0;
        } catch {}
        const state = get();
        const now = Date.now();

        // 1. Áp dụng Bùa XP (nếu có)
        const aliveBoosters = (state.activeBoosters || []).filter(b => b.type === 'XP' && b.expiresAt > now);
        const multiplier = aliveBoosters.length > 0 
          ? Math.max(...aliveBoosters.map(b => b.multiplier)) 
          : 1;
        
        const finalAmount = Math.round(baseAmount * multiplier);

        const { base, growth } = getLevelCurve();
        let newXp = state.xp + finalAmount;
        let newLevel = state.level;
        let newTotalXp = state.totalXpForNextLevel || base;

        while (newXp >= newTotalXp) {
          newXp -= newTotalXp;
          newLevel++;
          newTotalXp = Math.floor(newTotalXp * growth);
        }

        set({
          xp: newXp,
          level: newLevel,
          totalXpForNextLevel: newTotalXp,
          // Cập nhật mảng bùa (xóa bùa hết hạn)
          activeBoosters: aliveBoosters,
        });

        logXpEvent(finalAmount, reason);

        // Also contribute to weekly league leaderboard
        try {
          useLeagueStore.getState().addLeagueXp(finalAmount);
        } catch (e) {
          // Ignore
        }

        // Return amount for UI display (so UI shows the multiplied value)
        return finalAmount;
      },

      /**
       * Cấp thưởng theo khoá cấu hình: tra cứu -> cộng -> ghi sổ.
       * Trả về { coins, xp } ĐÃ cấp để nơi gọi hiển thị đúng con số —
       * quan trọng với phần thưởng ngẫu nhiên như rương bí ẩn, vì nếu
       * gọi getReward() lần nữa sẽ ra một con số khác.
       */
      grantReward: (key, refId = null) => {
        const reward = getReward(key);
        let grantedXp = 0;
        if (reward.coins) get().addCoins(reward.coins, key, refId);
        if (reward.xp) {
          grantedXp = get().addXp(reward.xp, key, refId);
        }
        return {
          ...reward,
          xp: grantedXp || reward.xp // Use the multiplied XP value
        };
      },

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleMusic: () =>
        set((state) => ({ musicEnabled: !state.musicEnabled })),
      toggleAutoSpeak: () =>
        set((state) => ({ autoSpeakLesson: !state.autoSpeakLesson })),
      setAutoSpeakLesson: (enabled) => set({ autoSpeakLesson: !!enabled }),
      setParentPin: (pin) => set({ parentPin: pin }),

      resetUser: () =>
        set({
          nickname: "Bé Yêu",
          grade: 1,
          avatar: "👦",
          unlockedAvatars: ["👦", "👧"],
          frame: null,
          level: 1,
          coins: 0,
          xp: 0,
          totalXpForNextLevel: 100,
          autoSpeakLesson: false,
          activeBoosters: [],
        }),
    }),
    {
      name: "toan-vui-user",
      // Chế độ Khách thì không ghi gì xuống máy — xem `sessionMode.js`.
      storage: createGuestAwareStorage(),
      migrate: (persistedState) => {
        if (persistedState && persistedState.nickname === "Bé Học Giỏi") {
          persistedState.nickname = "Bé Yêu";
        }
        return persistedState;
      },
      version: 1,
    },
  ),
);

export default useUserStore;
