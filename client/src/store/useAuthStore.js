import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'
import syncService, { setActiveChildIdGetter } from '../services/syncService'
import soundManager from '../utils/soundManager'


export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isGuest: true,
  children: [],
  activeChild: null,
  loading: true,
  isAuthModalOpen: false,
  isSwitcherModalOpen: false,

  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  setSwitcherModalOpen: (open) => set({ isSwitcherModalOpen: open }),

  /**
   * Khởi tạo lắng nghe phiên đăng nhập Supabase Auth
   */
  initAuth: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      set({ loading: false, isGuest: true })
      return
    }

    try {
      // 1. Kiểm tra session hiện tại
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        set({ user: session.user, session, isGuest: false })
        const result = await syncService.autoMigrateGuestDataToCloud(session.user)
        if (result) {
          set({
            children: result.children || [],
            activeChild: result.activeChild || null,
          })
        }
      } else {
        set({ isGuest: true, user: null, session: null })
      }

      // 2. Lắng nghe thay đổi trạng thái đăng nhập
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          set({ user: session.user, session, isGuest: false, loading: false })
          const result = await syncService.autoMigrateGuestDataToCloud(session.user)
          if (result) {
            set({
              children: result.children || [],
              activeChild: result.activeChild || null,
            })
          }
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            session: null,
            isGuest: true,
            children: [],
            activeChild: null,
            loading: false,
          })
        }
      })
    } catch (e) {
      console.error('Lỗi khởi tạo Auth:', e)
    } finally {
      set({ loading: false })
    }
  },

  /**
   * Đăng nhập một chạm bằng Google
   */
  signInWithGoogle: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      alert('Chưa cấu hình Supabase! Vui lòng cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env để dùng tính năng này.')
      return
    }

    try {
      soundManager.playClick()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (err) {
      console.error('Lỗi đăng nhập Google:', err.message)
      alert(`Đăng nhập không thành công: ${err.message}`)
    }
  },

  /**
   * Đăng xuất
   */
  signOut: async () => {
    if (!supabase) return
    try {
      soundManager.playClick()
      await supabase.auth.signOut()
      set({
        user: null,
        session: null,
        isGuest: true,
        children: [],
        activeChild: null,
      })
    } catch (e) {
      console.error('Lỗi đăng xuất:', e)
    }
  },

  /**
   * Chuyển đổi bé đang học
   */
  switchChild: async (childId) => {
    const { children, user } = get()
    const target = children.find((c) => c.id === childId)
    if (!target) return

    soundManager.playFanfare()
    set({ activeChild: target, isSwitcherModalOpen: false })

    // Đánh dấu active trên Supabase
    if (supabase && user) {
      await supabase.from('child_profiles').update({ is_active: false }).eq('parent_id', user.id)
      await supabase.from('child_profiles').update({ is_active: true }).eq('id', childId)
    }

    // Tải dữ liệu bé được chọn vào các store
    await syncService.loadChildDataToLocalStores(childId)
  },

  /**
   * Thêm hồ sơ bé mới cho gia đình
   */
  addChildProfile: async ({ nickname, grade, avatar }) => {
    const { user, children } = get()
    if (!supabase || !user) return false

    try {
      soundManager.playClick()
      const { data: newChild, error } = await supabase
        .from('child_profiles')
        .insert({
          parent_id: user.id,
          nickname: nickname || 'Bé Yêu',
          grade: Number(grade) || 1,
          avatar: avatar || '👦',
          level: 1,
          xp: 0,
          total_xp_for_next_level: 100,
          coins: 0,
          is_active: false,
        })
        .select()
        .single()

      if (error || !newChild) throw error

      // Khởi tạo tiến độ & thú cưng trống cho bé mới
      await supabase.from('child_progress').insert({ child_id: newChild.id })
      await supabase.from('child_pets').insert({ child_id: newChild.id })

      const updated = [...children, newChild]
      set({ children: updated })

      return newChild
    } catch (err) {
      console.error('Lỗi thêm bé mới:', err)
      return null
    }
  },
}))

setActiveChildIdGetter(() => {
  const state = useAuthStore.getState()
  return !state.isGuest ? state.activeChild?.id : null
})


export default useAuthStore

