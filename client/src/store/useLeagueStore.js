import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useProgressStore from './useProgressStore'
import useUserStore from './useUserStore'
import useAuthStore from './useAuthStore'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

export const LEAGUE_TIERS = [
  { id: 'bronze', name: 'Giải Đồng', icon: '🥉', color: '#cd7f32', minXp: 0 },
  { id: 'silver', name: 'Giải Bạc', icon: '🥈', color: '#94a3b8', minXp: 150 },
  { id: 'gold', name: 'Giải Vàng', icon: '🥇', color: '#eab308', minXp: 350 },
  { id: 'diamond', name: 'Giải Kim Cương', icon: '💎', color: '#06b6d4', minXp: 600 },
  { id: 'master', name: 'Giải Cao Thủ', icon: '👑', color: '#8b5cf6', minXp: 1000 },
]

/**
 * Danh sách 10 bot cho TẤT CẢ các hạng giải đấu
 * Mỗi giải đấu có 10 bạn bot riêng biệt với tên và biểu tượng đặc sắc
 */
export const TIER_BOTS_DEFINITIONS = {
  bronze: [
    { id: 'bot_bronze_1', name: 'Bảo Nam', avatar: '🚀' },
    { id: 'bot_bronze_2', name: 'Tuệ Lâm', avatar: '🦄' },
    { id: 'bot_bronze_3', name: 'Khánh Vy', avatar: '🍓' },
    { id: 'bot_bronze_4', name: 'Minh Khang', avatar: '🦁' },
    { id: 'bot_bronze_5', name: 'Mai Chi', avatar: '🌻' },
    { id: 'bot_bronze_6', name: 'Quang Anh', avatar: '⚡' },
    { id: 'bot_bronze_7', name: 'Anh Thư', avatar: '🎨' },
    { id: 'bot_bronze_8', name: 'Gia Hân', avatar: '🌸' },
    { id: 'bot_bronze_9', name: 'Hoàng Bách', avatar: '🦖' },
    { id: 'bot_bronze_10', name: 'Hải Đăng', avatar: '🌟' },
  ],
  silver: [
    { id: 'bot_silver_1', name: 'Thanh Trúc', avatar: '🌿' },
    { id: 'bot_silver_2', name: 'Nhật Minh', avatar: '☀️' },
    { id: 'bot_silver_3', name: 'Thảo My', avatar: '🍀' },
    { id: 'bot_silver_4', name: 'Đức Trí', avatar: '🧠' },
    { id: 'bot_silver_5', name: 'Ngọc Diệp', avatar: '🍃' },
    { id: 'bot_silver_6', name: 'Trọng Khôi', avatar: '⚽' },
    { id: 'bot_silver_7', name: 'Quỳnh Anh', avatar: '🌷' },
    { id: 'bot_silver_8', name: 'Phúc An', avatar: '🎈' },
    { id: 'bot_silver_9', name: 'Lan Chi', avatar: '🌼' },
    { id: 'bot_silver_10', name: 'Tùng Dương', avatar: '🪁' },
  ],
  gold: [
    { id: 'bot_gold_1', name: 'Hùng Dũng', avatar: '🐯' },
    { id: 'bot_gold_2', name: 'Thùy Dương', avatar: '🌞' },
    { id: 'bot_gold_3', name: 'Đăng Khoa', avatar: '📚' },
    { id: 'bot_gold_4', name: 'Ánh Tuyết', avatar: '❄️' },
    { id: 'bot_gold_5', name: 'Tuấn Kiệt', avatar: '🎯' },
    { id: 'bot_gold_6', name: 'Phương Linh', avatar: '🦚' },
    { id: 'bot_gold_7', name: 'Hoàng Nam', avatar: '🏆' },
    { id: 'bot_gold_8', name: 'Yến Nhi', avatar: '🕊️' },
    { id: 'bot_gold_9', name: 'Quốc Bảo', avatar: '🛡️' },
    { id: 'bot_gold_10', name: 'Hà Phương', avatar: '🌺' },
  ],
  diamond: [
    { id: 'bot_diamond_1', name: 'Minh Triết', avatar: '🔮' },
    { id: 'bot_diamond_2', name: 'Huyền Trang', avatar: '💎' },
    { id: 'bot_diamond_3', name: 'Việt Anh', avatar: '🦅' },
    { id: 'bot_diamond_4', name: 'Kim Ngân', avatar: '💰' },
    { id: 'bot_diamond_5', name: 'Huy Hoàng', avatar: '👑' },
    { id: 'bot_diamond_6', name: 'Bảo Ngọc', avatar: '💍' },
    { id: 'bot_diamond_7', name: 'Thiên Phúc', avatar: '🌠' },
    { id: 'bot_diamond_8', name: 'Thục Anh', avatar: '💫' },
    { id: 'bot_diamond_9', name: 'Khôi Nguyên', avatar: '🎖️' },
    { id: 'bot_diamond_10', name: 'Tường Vy', avatar: '🌹' },
  ],
  master: [
    { id: 'bot_master_1', name: 'Long Vũ', avatar: '🐉' },
    { id: 'bot_master_2', name: 'Thái Dương', avatar: '🔆' },
    { id: 'bot_master_3', name: 'Diệu Linh', avatar: '🌌' },
    { id: 'bot_master_4', name: 'Bá Tùng', avatar: '🌲' },
    { id: 'bot_master_5', name: 'Minh Tuệ', avatar: '⚡' },
    { id: 'bot_master_6', name: 'Thùy Tiên', avatar: '🧚' },
    { id: 'bot_master_7', name: 'Nam Phong', avatar: '🌪️' },
    { id: 'bot_master_8', name: 'Ngân Hà', avatar: '🪐' },
    { id: 'bot_master_9', name: 'Anh Quân', avatar: '🏹' },
    { id: 'bot_master_10', name: 'Cẩm Tú', avatar: '💐' },
  ],
}

// Giữ lại alias để tương thích ngược nếu có chỗ gọi cũ
export const FIXED_LEAGUE_BOTS = TIER_BOTS_DEFINITIONS.bronze

/**
 * Lấy mốc 00:00:00 sáng Thứ Hai đầu tuần hiện tại
 */
export function getStartOfWeekMonday(targetDate = new Date()) {
  const d = new Date(targetDate)
  const day = d.getDay() // 0 = Chủ Nhật, 1 = Thứ Hai...
  const diffToMonday = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diffToMonday)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Lấy mốc 23:59:59 Chủ Nhật cuối tuần hiện tại
 */
export function getEndOfWeekSunday(targetDate = new Date()) {
  const monday = getStartOfWeekMonday(targetDate)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)
  return sunday.toISOString()
}

/**
 * Tạo seed băm theo tuần và hạng đấu để phân loại ngẫu nhiên
 */
function getWeekTierSeed(tier = 'bronze', monday = getStartOfWeekMonday()) {
  let hash = monday.getFullYear() * 10000 + (monday.getMonth() + 1) * 100 + monday.getDate()
  for (let i = 0; i < tier.length; i++) {
    hash = (hash * 31 + tier.charCodeAt(i)) & 0xffffff
  }
  return hash
}

/**
 * Phân loại ngẫu nhiên mỗi tuần cho 10 bot ở mỗi hạng đấu:
 * - 3 bot siêng năng ('hardworking')
 * - 4 bot bình thường ('normal')
 * - 3 bot làm biếng ('lazy')
 * Sử dụng Fisher-Yates shuffle với seed của tuần để kết quả đổi mới mỗi tuần nhưng đồng bộ giữa mọi máy
 */
export function getWeeklyBotRoles(tier = 'bronze', monday = getStartOfWeekMonday()) {
  let seed = getWeekTierSeed(tier, monday)
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }

  const rolesMap = {}
  indices.slice(0, 3).forEach((idx) => { rolesMap[idx] = 'hardworking' }) // 3 bot siêng năng
  indices.slice(3, 7).forEach((idx) => { rolesMap[idx] = 'normal' })      // 4 bot bình thường
  indices.slice(7, 10).forEach((idx) => { rolesMap[idx] = 'lazy' })       // 3 bot làm biếng
  return rolesMap
}

/**
 * Sinh lịch học ngẫu nhiên trong ngày của bot (từ 7:30 đến tối đa 21:00)
 * Điểm thưởng mỗi ngày tương đương 1-2 bài luyện tập (20 - 55 XP / ngày)
 */
function getBotDaySessions(botIndex, dayIndex, role, weekSeed) {
  let daySeed = (weekSeed * 17 + botIndex * 101 + dayIndex * 1337) & 0xffffff
  const rand = () => {
    daySeed = (daySeed * 9301 + 49297) % 233280
    return daySeed / 233280
  }

  const sessions = []

  if (role === 'hardworking') {
    // 3 bot siêng năng: Học 2 bài/ngày (~40 - 55 XP/ngày)
    // Buổi 1: Sáng / Trưa (7:30 -> 11:30)
    const morningHour = 7.5 + rand() * 4.0
    const morningXp = 20 + Math.floor(rand() * 10) // 20-29 XP
    sessions.push({ hour: morningHour, xp: morningXp })

    // Buổi 2: Chiều / Tối (14:00 -> 20:30, tuyệt đối không quá 21:00)
    const eveningHour = 14.0 + rand() * 6.5 // Max 20.5 (20:30)
    const eveningXp = 20 + Math.floor(rand() * 10) // 20-29 XP
    sessions.push({ hour: eveningHour, xp: eveningXp })
  } else if (role === 'normal') {
    // 4 bot bình thường: Học 1 bài/ngày (~20 - 30 XP/ngày)
    // Giờ học ngẫu nhiên từ 8:00 đến 20:30 (không quá 21:00)
    const sessionHour = 8.0 + rand() * 12.5 // Max 20.5 (20:30)
    const sessionXp = 20 + Math.floor(rand() * 11) // 20-30 XP
    sessions.push({ hour: sessionHour, xp: sessionXp })
  } else {
    // 3 bot làm biếng: Chỉ học 3-4 ngày trong tuần, các ngày khác nghỉ (0 XP)
    const willStudyToday = rand() > 0.45
    if (willStudyToday) {
      // Học 1 bài ngắn từ 10:00 đến 18:00
      const sessionHour = 10.0 + rand() * 8.0
      const sessionXp = 15 + Math.floor(rand() * 10) // 15-24 XP
      sessions.push({ hour: sessionHour, xp: sessionXp })
    }
  }

  return sessions
}

/**
 * Tính điểm tích lũy tuần của 1 bot tại thời điểm hiện tại:
 * - Khởi đầu tuần mới (Thứ Hai trước khi học): Điểm = 0
 * - Tăng dần theo các phiên học trong ngày (chỉ từ 7:30 đến trước 21:00)
 * - Sau 21:00: Giữ nguyên điểm, không tăng thêm
 */
export function calculateTierBotWeeklyXp(tier = 'bronze', botIndex = 0, now = new Date()) {
  const monday = getStartOfWeekMonday(now)
  if (now.getTime() < monday.getTime()) return 0

  const weekSeed = getWeekTierSeed(tier, monday)
  const rolesMap = getWeeklyBotRoles(tier, monday)
  const role = rolesMap[botIndex] || 'normal'

  // Thứ Hai = 0, ..., Chủ Nhật = 6
  const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1
  const currentHourDecimal = now.getHours() + now.getMinutes() / 60

  let totalWeeklyXp = 0

  for (let d = 0; d <= Math.min(currentDay, 6); d++) {
    const sessions = getBotDaySessions(botIndex, d, role, weekSeed)
    for (const session of sessions) {
      if (session.hour > 21.0) continue // Đảm bảo không quá 21h

      if (d < currentDay) {
        // Ngày trước đó trong tuần: đã hoàn thành
        totalWeeklyXp += session.xp
      } else if (d === currentDay) {
        // Hôm nay: chỉ cộng nếu đã đến giờ học
        if (currentHourDecimal >= session.hour) {
          totalWeeklyXp += session.xp
        }
      }
    }
  }

  return totalWeeklyXp
}

/**
 * Lấy danh sách 10 bot động của hạng đấu cụ thể (Bronze, Silver, Gold, Diamond, Master)
 */
export function getTierDynamicBots(tier = 'bronze', now = new Date()) {
  const definitions = TIER_BOTS_DEFINITIONS[tier] || TIER_BOTS_DEFINITIONS.bronze
  const rolesMap = getWeeklyBotRoles(tier, getStartOfWeekMonday(now))

  return definitions.map((bot, index) => ({
    id: bot.id,
    name: bot.name,
    avatar: bot.avatar,
    weeklyXp: calculateTierBotWeeklyXp(tier, index, now),
    role: rolesMap[index] || 'normal', // 'hardworking' | 'normal' | 'lazy'
    tier: tier,
    is_bot: true,
    isUser: false,
  }))
}

// Alias hỗ trợ
export function getDynamicLeagueBots(tier = 'bronze') {
  return getTierDynamicBots(tier)
}

const useLeagueStore = create(
  persist(
    (set, get) => ({
      currentTier: 'bronze',
      weekEndDate: getEndOfWeekSunday(),
      userWeeklyXp: 0,
      cloudPlayers: [], // Danh sách người thật và bot lấy từ Supabase
      isLoadingCloud: false,
      lastPromotionStatus: null, // 'promoted' | 'relegated' | 'stayed' | null

      resetLeague: () =>
        set({
          currentTier: 'bronze',
          weekEndDate: getEndOfWeekSunday(),
          userWeeklyXp: 0,
          cloudPlayers: [],
          lastPromotionStatus: null,
        }),

      /**
       * Tải dữ liệu Đấu trường từ Supabase theo đúng Hạng đấu (currentTier)
       * Đồng thời đồng bộ điểm của 10 bot trong giải đấu lên database
       */
      fetchCloudLeaderboard: async () => {
        const tier = get().currentTier || 'bronze'
        const currentBots = getTierDynamicBots(tier)

        if (!isSupabaseConfigured() || !supabase) {
          set({ cloudPlayers: currentBots, isLoadingCloud: false })
          return
        }

        set({ isLoadingCloud: true })

        try {
          // Tải danh sách người chơi và bot của hạng đấu này từ bảng leaderboard
          const { data, error } = await supabase
            .from('leaderboard')
            .select('*')
            .eq('tier', tier)
            .order('weekly_xp', { ascending: false })
            .limit(50)

          if (!error && Array.isArray(data)) {
            // Kiểm tra xem bot của tier này có cần cập nhật điểm số không
            const dbBotMap = new Map()
            data.filter((p) => p.is_bot).forEach((b) => dbBotMap.set(b.id, b.weekly_xp))

            let needsBotSync = false
            for (const bot of currentBots) {
              const currentDbXp = dbBotMap.get(bot.id)
              if (currentDbXp === undefined || currentDbXp !== bot.weeklyXp) {
                needsBotSync = true
                break
              }
            }

            if (needsBotSync) {
              // Cập nhật điểm 10 bot của tier này lên Supabase
              supabase
                .from('leaderboard')
                .upsert(
                  currentBots.map((b) => ({
                    id: b.id,
                    name: b.name,
                    avatar: b.avatar,
                    grade: 1,
                    weekly_xp: b.weeklyXp,
                    is_bot: true,
                    tier: tier,
                    updated_at: new Date().toISOString(),
                  }))
                )
                .then(() => {})
                .catch((e) => console.warn('Lỗi upsert bots:', e))
            }

            set({ cloudPlayers: data, isLoadingCloud: false })
          } else {
            set({ cloudPlayers: currentBots, isLoadingCloud: false })
          }
        } catch (err) {
          console.warn('Lỗi lấy bảng xếp hạng từ Supabase:', err)
          set({ cloudPlayers: currentBots, isLoadingCloud: false })
        }
      },

      /**
       * Kiểm tra kết thúc tuần để thăng hạng / rớt hạng
       * Khi sang tuần mới: reset điểm của bé và bot về 0
       */
      checkWeekReset: (customName, customAvatar) => {
        const now = new Date()
        const end = new Date(get().weekEndDate)

        if (now >= end) {
          const { currentTier, userWeeklyXp } = get()
          const currentTierIdx = LEAGUE_TIERS.findIndex((t) => t.id === currentTier)

          const standings = get().getStandings(customName, customAvatar)
          const userRank = standings.findIndex((p) => p.isUser) + 1

          let nextTier = currentTier
          let status = 'stayed'

          if (userRank > 0 && userRank <= 3 && currentTierIdx < LEAGUE_TIERS.length - 1) {
            nextTier = LEAGUE_TIERS[currentTierIdx + 1].id
            status = 'promoted'
          } else if (userRank >= 8 && currentTierIdx > 0) {
            nextTier = LEAGUE_TIERS[currentTierIdx - 1].id
            status = 'relegated'
          }

          // Reset tuần mới: điểm về 0, tuần mới bắt đầu lại
          set({
            currentTier: nextTier,
            weekEndDate: getEndOfWeekSunday(),
            userWeeklyXp: 0,
            lastPromotionStatus: status,
          })

          // Reset điểm 10 bot của tier mới về 0 trên Supabase cho tuần mới
          if (isSupabaseConfigured() && supabase) {
            const nextTierBots = TIER_BOTS_DEFINITIONS[nextTier] || TIER_BOTS_DEFINITIONS.bronze
            const freshBots = nextTierBots.map((b) => ({
              id: b.id,
              name: b.name,
              avatar: b.avatar,
              grade: 1,
              weekly_xp: 0,
              is_bot: true,
              tier: nextTier,
              updated_at: new Date().toISOString(),
            }))
            supabase.from('leaderboard').upsert(freshBots).then(() => {})
          }
        }
      },

      /**
       * Thêm điểm XP tuần này cho bé và tự động lưu vào DB kèm tier hiện tại
       */
      addLeagueXp: (amount) => {
        set((state) => {
          const newXp = state.userWeeklyXp + amount

          try {
            useProgressStore.getState().setLeagueXp?.(newXp)
          } catch (e) {}

          return { userWeeklyXp: newXp }
        })

        // Tự động đẩy điểm số tuần này lên bảng leaderboard của Supabase
        try {
          const { nickname, avatar, grade } = useUserStore.getState()
          const childId = useAuthStore.getState().activeChild?.id

          if (isSupabaseConfigured() && supabase && childId) {
            supabase
              .from('leaderboard')
              .upsert({
                id: childId,
                name: nickname,
                avatar: avatar,
                grade: grade,
                weekly_xp: get().userWeeklyXp,
                is_bot: false,
                tier: get().currentTier || 'bronze',
                updated_at: new Date().toISOString(),
              })
              .then(() => {
                get().fetchCloudLeaderboard()
              })
              .catch((e) => {
                console.warn('Lỗi auto sync leaderboard:', e)
              })
          }
        } catch (e) {
          console.warn('Lỗi push XP lên cloud:', e)
        }
      },

      /**
       * Tính toán bảng xếp hạng Top 10 của Giải đấu hiện tại:
       * - Lấy 10 bot của đúng giải đấu đó (Bronze / Silver / Gold / Diamond / Master)
       * - Phân loại 3 bot siêng năng, 4 bot bình thường, 3 bot làm biếng ngẫu nhiên theo tuần
       * - Học ngẫu nhiên trong ngày và dừng lại sau 21:00
       * - Người thật có điểm cao hơn bot sẽ xếp trên bot và thay thế vị trí bot
       */
      getStandings: (customName, customAvatar, currentChildId) => {
        const { userWeeklyXp, cloudPlayers, currentTier } = get()
        const tier = currentTier || 'bronze'
        const dynamicBots = getTierDynamicBots(tier)

        let userName = customName
        let userAvatar = customAvatar
        if (!userName) {
          try {
            const userState = useUserStore.getState()
            userName = userState.nickname
            userAvatar = userState.avatar
          } catch (e) {}
        }

        let effectiveUserId = currentChildId || useAuthStore.getState().activeChild?.id || 'current_user'

        // 1. Tập hợp người chơi thuộc đúng Tier này:
        let pool = []

        if (cloudPlayers && cloudPlayers.length > 0) {
          // Lọc những người chơi thuộc đúng tier này
          const tierPlayers = cloudPlayers.filter((p) => !p.tier || p.tier === tier)

          pool = tierPlayers.map((p) => {
            let xp = Number(p.weekly_xp ?? p.weeklyXp ?? 0)
            if (p.is_bot) {
              const matchedBot = dynamicBots.find((b) => b.id === p.id)
              if (matchedBot) {
                xp = Math.max(xp, matchedBot.weeklyXp)
              }
            }
            return {
              id: p.id,
              name: p.name,
              avatar: p.avatar,
              weeklyXp: xp,
              tier: tier,
              is_bot: !!p.is_bot,
              isUser: p.id === effectiveUserId,
            }
          })

          // Đảm bảo luôn đủ 10 bot của tier này
          for (const bot of dynamicBots) {
            if (!pool.some((p) => p.id === bot.id)) {
              pool.push({
                id: bot.id,
                name: bot.name,
                avatar: bot.avatar,
                weeklyXp: bot.weeklyXp,
                tier: tier,
                is_bot: true,
                isUser: false,
              })
            }
          }
        } else {
          // Fallback offline: Dùng 10 bot tính theo ngày giờ hiện tại của tier này
          pool = dynamicBots.map((b) => ({ ...b }))
        }

        // 2. Thêm hoặc cập nhật người dùng hiện tại
        const userIndex = pool.findIndex((p) => p.isUser || p.id === effectiveUserId)
        if (userIndex >= 0) {
          pool[userIndex].weeklyXp = Math.max(pool[userIndex].weeklyXp, userWeeklyXp)
          pool[userIndex].name = userName || pool[userIndex].name || 'Bé Yêu'
          pool[userIndex].avatar = userAvatar || pool[userIndex].avatar || '🦉'
          pool[userIndex].isUser = true
        } else {
          pool.push({
            id: effectiveUserId,
            name: userName || 'Bé Yêu',
            avatar: userAvatar || '🦉',
            weeklyXp: userWeeklyXp,
            tier: tier,
            is_bot: false,
            isUser: true,
          })
        }

        // 3. Sắp xếp toàn bộ người chơi theo điểm weeklyXp giảm dần.
        // Người thật có điểm cao hơn bot sẽ xếp trên bot và chiếm vị trí của bot!
        pool.sort((a, b) => b.weeklyXp - a.weeklyXp)

        // 4. Giới hạn Top 10 của giải đấu
        const top10 = pool.slice(0, 10)
        const myOverallRank = pool.findIndex((p) => p.isUser) + 1

        const result = top10.map((player, index) => ({
          ...player,
          rank: index + 1,
          isUser: !!player.isUser,
        }))

        return Object.assign(result, {
          userRank: myOverallRank,
          userTotalPlayers: pool.length,
        })
      },

      dismissStatus: () => set({ lastPromotionStatus: null }),
    }),
    {
      name: 'math_edu_league_storage',
      partialize: (state) => ({
        currentTier: state.currentTier,
        weekEndDate: state.weekEndDate,
        userWeeklyXp: state.userWeeklyXp,
        lastPromotionStatus: state.lastPromotionStatus,
      }),
    }
  )
)

export default useLeagueStore
