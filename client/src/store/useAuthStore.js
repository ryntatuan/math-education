import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'
import syncService, { setActiveChildIdGetter } from '../services/syncService'
import useUserStore from './useUserStore'
import useProgressStore from './useProgressStore'
import useLeagueStore from './useLeagueStore'
import usePetStore from './usePetStore'
import soundManager from '../utils/soundManager'

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isGuest: true,
  activeChild: null,
  loading: true,
  isAuthModalOpen: false,

  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),

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
        if (result?.activeChild) {
          set({ activeChild: result.activeChild })
        }
      } else {
        set({ isGuest: true, user: null, session: null, activeChild: null })
      }

      // 2. Lắng nghe thay đổi trạng thái đăng nhập
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          set({ user: session.user, session, isGuest: false, loading: false })
          const result = await syncService.autoMigrateGuestDataToCloud(session.user)
          if (result?.activeChild) {
            set({ activeChild: result.activeChild })
          }
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            session: null,
            isGuest: true,
            activeChild: null,
            loading: false,
          })
          // Đặt lại các store về trạng thái ban đầu cho khách
          try {
            useUserStore.getState().resetUser?.()
            useProgressStore.getState().resetProgress?.()
            useLeagueStore.getState().resetLeague?.()
            usePetStore.getState().resetPet?.()
            localStorage.removeItem('math_edu_active_child_id')
          } catch (e) {
            console.error('Lỗi dọn dẹp state khi đăng xuất:', e)
          }
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
   * Đăng xuất & dọn dẹp toàn bộ dữ liệu tạm thời
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
        activeChild: null,
      })
      useUserStore.getState().resetUser?.()
      useProgressStore.getState().resetProgress?.()
      useLeagueStore.getState().resetLeague?.()
      usePetStore.getState().resetPet?.()
      try {
        localStorage.removeItem('math_edu_active_child_id')
      } catch (e) {}
    } catch (e) {
      console.error('Lỗi đăng xuất:', e)
    }
  },

  /**
   * Cập nhật thông tin bé học của tài khoản (tên, avatar, khối lớp...)
   * Đồng bộ ngay lập tức vào activeChild và Supabase
   */
  updateActiveChild: async (updates) => {
    const { activeChild, user } = get()
    if (!activeChild) return

    const updatedChild = { ...activeChild, ...updates }
    set({ activeChild: updatedChild })

    if (supabase && user) {
      try {
        await supabase
          .from('child_profiles')
          .update(updates)
          .eq('id', activeChild.id)
      } catch (err) {
        console.error('Lỗi cập nhật child_profile trên Supabase:', err)
      }
    }
  },
}))

setActiveChildIdGetter(() => {
  const state = useAuthStore.getState()
  return !state.isGuest ? state.activeChild?.id : null
})

export default useAuthStore
