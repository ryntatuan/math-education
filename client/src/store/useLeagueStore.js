import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useProgressStore from './useProgressStore'

export const LEAGUE_TIERS = [
  { id: 'bronze', name: 'Giải Đồng', icon: '🥉', color: '#cd7f32', minXp: 0 },
  { id: 'silver', name: 'Giải Bạc', icon: '🥈', color: '#94a3b8', minXp: 150 },
  { id: 'gold', name: 'Giải Vàng', icon: '🥇', color: '#eab308', minXp: 350 },
  { id: 'diamond', name: 'Giải Kim Cương', icon: '💎', color: '#06b6d4', minXp: 600 },
  { id: 'master', name: 'Giải Cao Thủ', icon: '👑', color: '#8b5cf6', minXp: 1000 },
]

const AI_NAMES_POOL = [
  { name: 'Bảo Nam', avatar: '🚀', baseMultiplier: 1.1 },
  { name: 'Gia Hân', avatar: '🌸', baseMultiplier: 0.95 },
  { name: 'Minh Khang', avatar: '🦁', baseMultiplier: 1.05 },
  { name: 'Tuệ Lâm', avatar: '🦄', baseMultiplier: 1.15 },
  { name: 'Quang Anh', avatar: '⚡', baseMultiplier: 1.0 },
  { name: 'Hải Đăng', avatar: '🌟', baseMultiplier: 0.9 },
  { name: 'Khánh Vy', avatar: '🍓', baseMultiplier: 1.08 },
  { name: 'Đức Huy', avatar: '⚽', baseMultiplier: 0.85 },
  { name: 'Anh Thư', avatar: '🎨', baseMultiplier: 1.12 },
  { name: 'Hoàng Bách', avatar: '🦖', baseMultiplier: 0.98 },
  { name: 'Mai Chi', avatar: '🌻', baseMultiplier: 1.02 },
]

function getEndOfWeekSunday() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() + (day === 0 ? 0 : 7 - day) // next Sunday
  const sunday = new Date(now.setDate(diff))
  sunday.setHours(23, 59, 59, 999)
  return sunday.toISOString()
}

function generateRivalsForTier(tierId) {
  const tierIndex = LEAGUE_TIERS.findIndex((t) => t.id === tierId)
  const baseRange = 80 + tierIndex * 90

  // Shuffle and pick 9 rivals
  const shuffled = [...AI_NAMES_POOL].sort(() => 0.5 - Math.random()).slice(0, 9)

  return shuffled.map((bot, index) => {
    // Generate organic staggered scores
    const randomVariation = Math.floor(Math.random() * 40) - 20
    const score = Math.max(
      20,
      Math.round(baseRange * bot.baseMultiplier + (8 - index) * 15 + randomVariation)
    )

    return {
      id: `bot_${index}_${Date.now()}`,
      name: bot.name,
      avatar: bot.avatar,
      weeklyXp: score,
      isUser: false,
    }
  })
}

const useLeagueStore = create(
  persist(
    (set, get) => ({
      currentTier: 'bronze',
      weekEndDate: getEndOfWeekSunday(),
      userWeeklyXp: 0,
      rivals: generateRivalsForTier('bronze'),
      lastPromotionStatus: null, // 'promoted' | 'relegated' | 'stayed' | null

      resetLeague: () =>
        set({
          currentTier: 'bronze',
          weekEndDate: getEndOfWeekSunday(),
          userWeeklyXp: 0,
          rivals: generateRivalsForTier('bronze'),
          lastPromotionStatus: null,
        }),

      // Check weekly expiration and handle promotion/relegation
      checkWeekReset: (customName, customAvatar) => {
        const now = new Date()
        const end = new Date(get().weekEndDate)

        if (now >= end) {
          const { currentTier, userWeeklyXp, rivals } = get()
          const currentTierIdx = LEAGUE_TIERS.findIndex((t) => t.id === currentTier)

          let userName = customName
          let userAvatar = customAvatar
          if (!userName) {
            try {
              const raw = localStorage.getItem('toan-vui-user')
              if (raw) {
                const parsed = JSON.parse(raw)
                userName = parsed?.state?.nickname || parsed?.nickname
                userAvatar = parsed?.state?.avatar || parsed?.avatar
              }
            } catch (e) {
              // Ignore
            }
          }

          // Calculate final rank
          const allPlayers = [
            ...rivals,
            { id: 'user', name: userName || 'Bé Yêu', avatar: userAvatar || '🦉', weeklyXp: userWeeklyXp, isUser: true },
          ].sort((a, b) => b.weeklyXp - a.weeklyXp)

          const userRank = allPlayers.findIndex((p) => p.isUser) + 1

          let nextTier = currentTier
          let status = 'stayed'

          if (userRank <= 3 && currentTierIdx < LEAGUE_TIERS.length - 1) {
            nextTier = LEAGUE_TIERS[currentTierIdx + 1].id
            status = 'promoted'
          } else if (userRank >= 8 && currentTierIdx > 0) {
            nextTier = LEAGUE_TIERS[currentTierIdx - 1].id
            status = 'relegated'
          }

          set({
            currentTier: nextTier,
            weekEndDate: getEndOfWeekSunday(),
            userWeeklyXp: 0,
            rivals: generateRivalsForTier(nextTier),
            lastPromotionStatus: status,
          })
        }
      },

      // Add XP to weekly league score
      addLeagueXp: (amount) => {
        set((state) => {
          const newXp = state.userWeeklyXp + amount
          // Simulate slight rival progression to keep competition dynamic
          const updatedRivals = state.rivals.map((r) => {
            const chance = Math.random()
            if (chance > 0.65) {
              return { ...r, weeklyXp: r.weeklyXp + Math.floor(Math.random() * 12) + 5 }
            }
            return r
          })

          try {
            useProgressStore.getState().setLeagueXp?.(newXp)
          } catch (e) {}

          return {
            userWeeklyXp: newXp,
            rivals: updatedRivals,
          }
        })
      },

      // Get full leaderboard standings with child's rank
      getStandings: (customName, customAvatar) => {
        const { userWeeklyXp, rivals } = get()
        let userName = customName
        let userAvatar = customAvatar
        if (!userName) {
          try {
            const raw = localStorage.getItem('toan-vui-user')
            if (raw) {
              const parsed = JSON.parse(raw)
              userName = parsed?.state?.nickname || parsed?.nickname
              userAvatar = parsed?.state?.avatar || parsed?.avatar
            }
          } catch (e) {
            // Ignore
          }
        }

        const userObj = {
          id: 'user',
          name: userName || 'Bé Yêu',
          avatar: userAvatar || '🦉',
          weeklyXp: userWeeklyXp,
          isUser: true,
        }

        const all = [...rivals, userObj].sort((a, b) => b.weeklyXp - a.weeklyXp)
        return all.map((player, index) => ({
          ...player,
          rank: index + 1,
        }))
      },

      dismissStatus: () => set({ lastPromotionStatus: null }),
    }),
    {
      name: 'math_edu_league_storage',
    }
  )
)

export default useLeagueStore
