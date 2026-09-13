import { supabase, isSupabaseConfigured } from './supabaseClient'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import usePetStore from '../store/usePetStore'

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
      // 1. Kiểm tra xem phụ huynh đã có hồ sơ bé nào chưa
      const { data: existingChildren, error: fetchErr } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_id', parentUser.id)
        .order('created_at', { ascending: true })

      if (fetchErr) {
        console.error('Lỗi kiểm tra hồ sơ bé trên Supabase:', fetchErr)
      }

      // Nếu đã có hồ sơ bé trên đám mây: Nạp và hợp nhất thông minh với dữ liệu hiện tại
      if (existingChildren && existingChildren.length > 0) {
        const activeChild = existingChildren.find((c) => c.is_active) || existingChildren[0]
        await this.loadChildDataToLocalStores(activeChild.id)
        return { children: existingChildren, activeChild }
      }

      // 2. Nếu CHƯA có hồ sơ: Di chuyển toàn bộ tiến độ local của bé lên Cloud
      const localUserData = getLocalStoreData('toan-vui-user') || {}
      const localProgressData = getLocalStoreData('toan-vui-progress') || {}
      const localPetData = getLocalStoreData('toan-vui-pet') || {}

      const nickname = localUserData.nickname || 'Bé Yêu'
      const grade = localUserData.grade || 1
      const avatar = localUserData.avatar || '👦'
      const level = localUserData.level || 1
      const xp = localUserData.xp || 0
      const coins = localUserData.coins || 0
      const totalXp = localUserData.totalXpForNextLevel || 100

      // Tạo hồ sơ bé đầu tiên
      const { data: newChild, error: createChildErr } = await supabase
        .from('child_profiles')
        .insert({
          parent_id: parentUser.id,
          nickname,
          grade,
          avatar,
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

      // Đồng bộ tiến độ bài học & chuỗi ngày học
      await supabase.from('child_progress').upsert({
        child_id: newChild.id,
        current_streak: localProgressData.currentStreak || 0,
        longest_streak: localProgressData.longestStreak || 0,
        last_active_date: localProgressData.lastActiveDate || null,
        completed_lessons: localProgressData.completedLessons || {},
        exercise_results: localProgressData.exerciseResults || {},
        math_race_wins: localProgressData.mathRaceWins || 0,
        total_games_played: localProgressData.totalGamesPlayed || 0,
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
        children: [newChild],
        activeChild: newChild,
      }
    } catch (err) {
      console.error('Lỗi trong quá trình auto-migration:', err)
      return null
    }
  },

  /**
   * Tải toàn bộ dữ liệu của 1 bé từ Supabase và HỢP NHẤT THÔNG MINH với local store
   * Đảm bảo KHÔNG BAO GIỜ bị mất sao, xu hay bài học vừa làm xong
   */
  async loadChildDataToLocalStores(childId) {
    if (!isSupabaseConfigured() || !supabase || !childId) return

    try {
      const localUserState = useUserStore.getState()
      const localProgressState = useProgressStore.getState()

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

      // Hợp nhất dữ liệu thông minh: Lấy giá trị cao nhất / đầy đủ nhất
      const cloudCoins = Number(childProfile?.coins) || 0
      const localCoins = Number(localUserState.coins) || 0
      const finalCoins = Math.max(cloudCoins, localCoins)

      const cloudLevel = Number(childProfile?.level) || 1
      const localLevel = Number(localUserState.level) || 1
      const finalLevel = Math.max(cloudLevel, localLevel)

      const cloudXp = Number(childProfile?.xp) || 0
      const localXp = Number(localUserState.xp) || 0
      const finalXp = Math.max(cloudXp, localXp)

      // Hợp nhất danh sách bài học đã hoàn thành (giữ nguyên số sao cao nhất của từng bài)
      const cloudLessons = progress?.completed_lessons || {}
      const localLessons = localProgressState.completedLessons || {}
      const mergedLessons = { ...localLessons }

      for (const [lessonId, cData] of Object.entries(cloudLessons)) {
        if (!mergedLessons[lessonId]) {
          mergedLessons[lessonId] = cData
        } else {
          mergedLessons[lessonId] = {
            ...mergedLessons[lessonId],
            stars: Math.max(mergedLessons[lessonId]?.stars || 0, cData?.stars || 0),
          }
        }
      }

      const cloudStreak = Number(progress?.current_streak) || 0
      const localStreak = Number(localProgressState.currentStreak) || 0
      const finalStreak = Math.max(cloudStreak, localStreak)

      const finalLastActiveDate = progress?.last_active_date || localProgressState.lastActiveDate

      // Cập nhật lại vào Zustand Stores
      useUserStore.setState({
        nickname: childProfile?.nickname || localUserState.nickname,
        grade: childProfile?.grade || localUserState.grade,
        avatar: childProfile?.avatar || localUserState.avatar,
        level: finalLevel,
        xp: finalXp,
        totalXpForNextLevel: childProfile?.total_xp_for_next_level || localUserState.totalXpForNextLevel || 100,
        coins: finalCoins,
      })

      useProgressStore.setState({
        completedLessons: mergedLessons,
        exerciseResults: {
          ...(localProgressState.exerciseResults || {}),
          ...(progress?.exercise_results || {}),
        },
        currentStreak: finalStreak,
        longestStreak: Math.max(Number(progress?.longest_streak) || 0, Number(localProgressState.longestStreak) || 0, finalStreak),
        lastActiveDate: finalLastActiveDate,
        mathRaceWins: Math.max(Number(progress?.math_race_wins) || 0, Number(localProgressState.mathRaceWins) || 0),
        totalGamesPlayed: Math.max(Number(progress?.total_games_played) || 0, Number(localProgressState.totalGamesPlayed) || 0),
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
      }

      // Nếu dữ liệu local trước đó có thông tin mới hơn cloud (ví dụ bé vừa được cộng xu, hoàn thành bài)
      // -> Đẩy ngay tiến độ vừa hợp nhất lên Supabase để đám mây luôn là bản cập nhật mới nhất!
      if (
        localCoins > cloudCoins ||
        localXp > cloudXp ||
        Object.keys(localLessons).length > Object.keys(cloudLessons).length ||
        localStreak > cloudStreak
      ) {
        await this.saveCurrentProgressToCloud(childId)
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
            total_games_played: progressState.totalGamesPlayed,
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
      state.nickname !== prevState.nickname
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
