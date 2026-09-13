import { supabase, isSupabaseConfigured } from './supabaseClient'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import usePetStore from '../store/usePetStore'
import useLeagueStore from '../store/useLeagueStore'

// Helper đọc an toàn từ localStorage
function getLocalStoreData(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.state || parsed
  } catch (e) {
    return null
  }
}

let syncDebounceTimer = null
let activeChildIdGetter = null

export function setActiveChildIdGetter(fn) {
  activeChildIdGetter = fn
}

export const syncService = {
  /**
   * Lên lịch tự động lưu lên đám mây sau khi có thay đổi (chống spam request)
   */
  scheduleCloudSync() {
    if (syncDebounceTimer) clearTimeout(syncDebounceTimer)
    syncDebounceTimer = setTimeout(async () => {
      try {
        const childId = activeChildIdGetter ? activeChildIdGetter() : null
        if (childId) {
          await this.saveCurrentProgressToCloud(childId)
        }
      } catch (err) {
        console.warn('Lỗi auto sync:', err)
      }
    }, 500)
  },

  /**
   * Tự động di chuyển dữ liệu từ localStorage (Guest mode) lên Supabase khi đăng nhập lần đầu
   */
  async autoMigrateGuestDataToCloud(parentUser) {
    if (!isSupabaseConfigured() || !supabase || !parentUser) return null

    try {
      // Bóc tách tên hiển thị mặc định từ tài khoản Google
      const googleDisplayName =
        parentUser.user_metadata?.full_name ||
        parentUser.user_metadata?.name ||
        parentUser.user_metadata?.given_name ||
        (parentUser.email ? parentUser.email.split('@')[0] : '')

      // 1. Kiểm tra xem tài khoản đã có hồ sơ bé học chưa (Mỗi account chỉ có 1 bé duy nhất)
      const { data: existingChildren, error: fetchErr } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_id', parentUser.id)
        .order('created_at', { ascending: true })

      if (fetchErr) {
        console.error('Lỗi kiểm tra hồ sơ bé trên Supabase:', fetchErr)
      }

      // Nếu đã có hồ sơ bé trên đám mây: Nạp dữ liệu bé duy nhất của tài khoản
      if (existingChildren && existingChildren.length > 0) {
        const activeChild = existingChildren[0]
        await this.loadChildDataToLocalStores(activeChild.id)
        return { activeChild }
      }

      // 2. Nếu CHƯA có hồ sơ: Di chuyển toàn bộ tiến độ local của bé lên Cloud
      const localUserData = getLocalStoreData('toan-vui-user') || {}
      const localProgressData = getLocalStoreData('toan-vui-progress') || {}
      const localPetData = getLocalStoreData('toan-vui-pet') || {}

      // Nếu là tên mặc định guest ('Bé Yêu' / 'Bé Học Giỏi'), ưu tiên lấy tên Google;
      // nếu người dùng đã tự đặt tên riêng từ trước thì giữ nguyên tên đó
      const isDefaultGuestName =
        !localUserData.nickname ||
        localUserData.nickname === 'Bé Yêu' ||
        localUserData.nickname === 'Bé Học Giỏi'

      const nickname = isDefaultGuestName
        ? (googleDisplayName || 'Bé Yêu')
        : localUserData.nickname

      const grade = localUserData.grade || 1
      const avatar = localUserData.avatar || '👦'
      const unlocked_avatars = localUserData.unlockedAvatars?.length
        ? localUserData.unlockedAvatars
        : ['👦', '👧']
      const level = localUserData.level || 1
      const xp = localUserData.xp || 0
      const coins = localUserData.coins || 0
      const totalXp = localUserData.totalXpForNextLevel || 100

      // Tạo hồ sơ bé duy nhất của tài khoản
      const { data: newChild, error: createChildErr } = await supabase
        .from('child_profiles')
        .insert({
          parent_id: parentUser.id,
          nickname,
          grade,
          avatar,
          unlocked_avatars,
          level,
          xp,
          total_xp_for_next_level: totalXp,
          coins,
          is_active: true,
        })
        .select()
        .single()

      if (createChildErr || !newChild) {
        console.error('Lỗi tạo hồ sơ bé:', createChildErr)
        return null
      }

      // Cập nhật ngay useUserStore với nickname và thông tin đã chuẩn hóa
      useUserStore.setState({
        nickname,
        grade,
        avatar,
        unlockedAvatars: unlocked_avatars,
        level,
        xp,
        totalXpForNextLevel: totalXp,
        coins,
      })

      // Đồng bộ tiến độ bài học & chuỗi ngày học
      await supabase.from('child_progress').upsert({
        child_id: newChild.id,
        current_streak: localProgressData.currentStreak || 0,
        longest_streak: localProgressData.longestStreak || 0,
        last_active_date: localProgressData.lastActiveDate || null,
        completed_lessons: localProgressData.completedLessons || {},
        exercise_results: localProgressData.exerciseResults || {},
        math_race_wins: localProgressData.mathRaceWins || 0,
        totalGamesPlayed: localProgressData.totalGamesPlayed || 0,
      })

      // Đồng bộ thú cưng
      if (localPetData.hasPet) {
        await supabase.from('child_pets').upsert({
          child_id: newChild.id,
          has_pet: true,
          pet_type: localPetData.petType || 'corgi',
          pet_name: localPetData.petName || 'Bạn Cún Nhỏ',
          hunger: localPetData.hunger || 80,
          happiness: localPetData.happiness || 90,
          level: localPetData.level || 1,
          exp: localPetData.exp || 0,
          stage: localPetData.stage || 'baby',
          inventory: localPetData.inventory || {},
        })
      }

      console.log('✅ Đã di chuyển thành công dữ liệu học tập lên Supabase Database!')
      return {
        activeChild: newChild,
      }
    } catch (err) {
      console.error('Lỗi trong quá trình auto-migration:', err)
      return null
    }
  },

  /**
   * Tải toàn bộ dữ liệu của 1 bé từ Supabase vào local stores
   */
  async loadChildDataToLocalStores(childId) {
    if (!isSupabaseConfigured() || !supabase || !childId) return

    try {
      // 1. Tải hồ sơ bé từ Cloud
      const { data: childProfile, error: profileErr } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('id', childId)
        .single()

      if (profileErr) {
        console.warn('Lỗi đọc child_profiles từ Supabase:', profileErr)
      }

      // 2. Tải tiến độ bài học & streak từ Cloud
      const { data: progress, error: progressErr } = await supabase
        .from('child_progress')
        .select('*')
        .eq('child_id', childId)
        .single()

      if (progressErr) {
        console.warn('Lỗi đọc child_progress từ Supabase:', progressErr)
      }

      const unlocked = (childProfile?.unlocked_avatars && childProfile.unlocked_avatars.length > 0)
        ? childProfile.unlocked_avatars
        : ['👦', '👧']

      // Cập nhật lại vào Zustand Stores với dữ liệu chuẩn từ đám mây của bé này
      useUserStore.setState({
        nickname: childProfile?.nickname || 'Bé Yêu',
        grade: childProfile?.grade || 1,
        avatar: childProfile?.avatar || '👦',
        unlockedAvatars: unlocked,
        level: Number(childProfile?.level) || 1,
        xp: Number(childProfile?.xp) || 0,
        totalXpForNextLevel: Number(childProfile?.total_xp_for_next_level) || 100,
        coins: Number(childProfile?.coins) || 0,
      })

      // Đồng bộ trạng thái thử thách hàng ngày từ exercise_results.__daily_challenge
      const exerciseResults = progress?.exercise_results || {}
      const dailyChallengeMeta = exerciseResults?.__daily_challenge
      const today = new Date().toISOString().split('T')[0]
      const isDailyDoneToday = dailyChallengeMeta?.date === today && !!dailyChallengeMeta?.completed

      // Đồng bộ điểm giải đấu tuần từ exercise_results.__league
      const leagueMeta = exerciseResults?.__league
      const cloudLeagueXp = typeof leagueMeta?.userWeeklyXp === 'number' ? leagueMeta.userWeeklyXp : 0
      useLeagueStore.setState({
        userWeeklyXp: cloudLeagueXp,
      })

      useProgressStore.setState({
        completedLessons: progress?.completed_lessons || {},
        exerciseResults,
        currentStreak: Number(progress?.current_streak) || 0,
        longestStreak: Number(progress?.longest_streak) || 0,
        lastActiveDate: progress?.last_active_date || null,
        dailyChallengeCompleted: isDailyDoneToday,
        dailyChallengeDate: isDailyDoneToday ? today : null,
        mathRaceWins: Number(progress?.math_race_wins) || 0,
        totalGamesPlayed: Number(progress?.total_games_played) || 0,
      })

      // 3. Tải thú cưng
      const { data: pet } = await supabase
        .from('child_pets')
        .select('*')
        .eq('child_id', childId)
        .single()

      if (pet && pet.has_pet) {
        usePetStore.setState({
          hasPet: true,
          petType: pet.pet_type,
          petName: pet.pet_name,
          hunger: pet.hunger,
          happiness: pet.happiness,
          level: pet.level,
          exp: pet.exp,
          stage: pet.stage,
          inventory: pet.inventory || {},
        })
      } else {
        usePetStore.setState({
          hasPet: false,
        })
      }
    } catch (e) {
      console.error('Lỗi nạp dữ liệu bé từ đám mây:', e)
    }
  },

  /**
   * Lưu ngay lập tức tiến độ học của bé hiện tại lên Supabase
   */
  async saveCurrentProgressToCloud(childId) {
    if (!isSupabaseConfigured() || !supabase || !childId) return

    const userState = useUserStore.getState()
    const progressState = useProgressStore.getState()

    try {
      await Promise.all([
        supabase
          .from('child_profiles')
          .update({
            nickname: userState.nickname,
            grade: userState.grade,
            avatar: userState.avatar,
            unlocked_avatars: userState.unlockedAvatars || ['👦', '👧'],
            level: userState.level,
            xp: userState.xp,
            total_xp_for_next_level: userState.totalXpForNextLevel,
            coins: userState.coins,
            updated_at: new Date().toISOString(),
          })
          .eq('id', childId),

        supabase
          .from('child_progress')
          .upsert({
            child_id: childId,
            current_streak: progressState.currentStreak,
            longest_streak: progressState.longestStreak,
            last_active_date: progressState.lastActiveDate,
            completed_lessons: progressState.completedLessons,
            exercise_results: progressState.exerciseResults,
            math_race_wins: progressState.mathRaceWins,
            totalGamesPlayed: progressState.totalGamesPlayed,
            updated_at: new Date().toISOString(),
          }),
      ])
    } catch (e) {
      console.error('Lỗi lưu tiến độ lên Cloud:', e)
    }
  },

  /**
   * Lưu trạng thái thú cưng lên Supabase
   */
  async saveCurrentPetToCloud(childId) {
    if (!isSupabaseConfigured() || !supabase || !childId) return

    const petState = usePetStore.getState()
    if (!petState.hasPet) return

    try {
      await supabase.from('child_pets').upsert({
        child_id: childId,
        has_pet: true,
        pet_type: petState.petType,
        pet_name: petState.petName,
        hunger: petState.hunger,
        happiness: petState.happiness,
        level: petState.level,
        exp: petState.exp,
        stage: petState.stage,
        inventory: petState.inventory,
        updated_at: new Date().toISOString(),
      })
    } catch (e) {
      console.error('Lỗi lưu thú cưng lên Cloud:', e)
    }
  },
}

// Khởi tạo tự động lắng nghe thay đổi của các store để đồng bộ thời gian thực lên Cloud
let isListenersAttached = false
export function setupAutoSync() {
  if (isListenersAttached) return
  isListenersAttached = true

  // Khi có thay đổi xu, cấp độ, kinh nghiệm -> Tự động lưu lên Cloud
  useUserStore.subscribe((state, prevState) => {
    if (
      state.coins !== prevState.coins ||
      state.xp !== prevState.xp ||
      state.level !== prevState.level ||
      state.avatar !== prevState.avatar ||
      state.grade !== prevState.grade ||
      state.nickname !== prevState.nickname ||
      state.unlockedAvatars !== prevState.unlockedAvatars
    ) {
      syncService.scheduleCloudSync()
    }
  })

  // Khi có thay đổi bài học hoàn thành, chuỗi ngày streak -> Tự động lưu lên Cloud
  useProgressStore.subscribe((state, prevState) => {
    if (
      state.completedLessons !== prevState.completedLessons ||
      state.currentStreak !== prevState.currentStreak ||
      state.exerciseResults !== prevState.exerciseResults ||
      state.mathRaceWins !== prevState.mathRaceWins ||
      state.totalGamesPlayed !== prevState.totalGamesPlayed
    ) {
      syncService.scheduleCloudSync()
    }
  })
}

export default syncService
