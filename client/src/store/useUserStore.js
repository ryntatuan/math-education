import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set, get) => ({
      // Profile
      nickname: 'Bé Học Giỏi',
      grade: 1,
      avatar: '👦',
      unlockedAvatars: ['👦', '👧'],
      frame: null,
      level: 1,
      coins: 0,
      xp: 0,
      totalXpForNextLevel: 100,

      // Settings
      soundEnabled: true,
      musicEnabled: true,
      parentPin: null,

      // Actions
      setGrade: (grade) => set({ grade }),
      setNickname: (nickname) => set({ nickname }),
      setAvatar: (avatar) => set({ avatar }),
      unlockAvatar: (avatarEmoji) =>
        set((state) => ({
          unlockedAvatars: Array.from(
            new Set([...(state.unlockedAvatars || ['👦', '👧', state.avatar]), avatarEmoji])
          ),
        })),

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      spendCoins: (amount) => {
        const { coins } = get()
        if (coins >= amount) {
          set({ coins: coins - amount })
          return true
        }
        return false
      },

      addXp: (amount) => {
        const state = get()
        let newXp = state.xp + amount
        let newLevel = state.level
        let newTotalXp = state.totalXpForNextLevel

        while (newXp >= newTotalXp) {
          newXp -= newTotalXp
          newLevel++
          newTotalXp = Math.floor(newTotalXp * 1.3)
        }

        set({
          xp: newXp,
          level: newLevel,
          totalXpForNextLevel: newTotalXp,
        })

        return newLevel > state.level // returns true if leveled up
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      setParentPin: (pin) => set({ parentPin: pin }),
    }),
    {
      name: 'toan-vui-user',
    }
  )
)

export default useUserStore
