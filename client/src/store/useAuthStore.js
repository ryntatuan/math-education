import { create } from 'zustand'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { SocialLogin } from '@capgo/capacitor-social-login'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'
import syncService, { setActiveChildIdGetter } from '../services/syncService'
import useUserStore from './useUserStore'
import useProgressStore from './useProgressStore'
import useLeagueStore from './useLeagueStore'
import usePetStore from './usePetStore'
import soundManager from '../utils/soundManager'
const GOOGLE_WEB_CLIENT_ID = '974832122244-8pkn02h3puctsl4fcpc60ig28k421a4u.apps.googleusercontent.com'

let isSocialLoginInitialized = false
const initSocialLogin = async () => {
  if (isSocialLoginInitialized) return
  try {
    await SocialLogin.initialize({
      google: {
        webClientId: GOOGLE_WEB_CLIENT_ID,
        mode: 'online',
      },
    })
    isSocialLoginInitialized = true
  } catch (e) {
    console.warn('SocialLogin init warning:', e)
  }
}

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
   * Đăng nhập một chạm bằng Google (Native trên Mobile, OAuth trên Web)
   */
  signInWithGoogle: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      alert('Chưa cấu hình Supabase! Vui lòng cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env để dùng tính năng này.')
      return
    }

    try {
      soundManager.playClick()
      set({ loading: true })

      if (Capacitor.isNativePlatform()) {
        await initSocialLogin()

        try {
          // 1. Kích hoạt Native Google Sign-In (hiện Bottom Sheet chọn tài khoản của hệ điều hành)
          const res = await SocialLogin.login({
            provider: 'google',
            options: {
              scopes: ['email', 'profile'],
            },
          })

          const idToken = res?.result?.idToken || res?.idToken

          if (idToken) {
            // 2. Trao đổi idToken trực tiếp với Supabase mà không cần mở bất kỳ trình duyệt nào
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: idToken,
            })

            if (error) throw error

            if (data?.session) {
              set({
                user: data.session.user,
                session: data.session,
                isGuest: false,
                isAuthModalOpen: false,
                loading: false,
              })
              if (data.session.user) {
                const result = await syncService.autoMigrateGuestDataToCloud(data.session.user)
                if (result?.activeChild) {
                  set({ activeChild: result.activeChild })
                }
              }
            }
            return
          } else {
            throw new Error('Không nhận được Google ID Token từ hệ thống')
          }
        } catch (nativeErr) {
          console.warn('Lỗi đăng nhập Native, chuyển sang dự phòng Custom Tab:', nativeErr)

          // Nếu người dùng chủ động bấm hủy / dismiss màn hình chọn tài khoản
          const errMsg = nativeErr?.message || String(nativeErr)
          if (
            errMsg.includes('cancelled') ||
            errMsg.includes('canceled') ||
            errMsg.includes('16:') ||
            errMsg.includes('12501')
          ) {
            set({ loading: false })
            return
          }

          // Dự phòng sang In-App Browser Custom Tab nếu thiết bị chưa cấu hình SHA-1
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: 'toanvui://auth/callback',
              skipBrowserRedirect: true,
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
            },
          })
          if (error) throw error
          if (data?.url) {
            await Browser.open({ url: data.url, windowName: '_self' })
          }
        }
      } else {
        const redirectTo = `${window.location.origin}/auth/callback`
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        })
        if (error) throw error
        
        // Force redirect if Supabase does not automatically redirect
        if (data?.url) {
          window.location.href = data.url
        }
      }
    } catch (err) {
      console.error('Lỗi đăng nhập Google:', err.message)
      alert(`Đăng nhập không thành công: ${err.message}`)
      set({ loading: false })
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

        // Nếu cập nhật tên hoặc avatar, đồng bộ ngay lập tức vào bảng leaderboard
        if (updates.nickname || updates.avatar) {
          const lbUpdates = {}
          if (updates.nickname) lbUpdates.name = updates.nickname
          if (updates.avatar) lbUpdates.avatar = updates.avatar
          lbUpdates.updated_at = new Date().toISOString()

          await supabase
            .from('leaderboard')
            .update(lbUpdates)
            .eq('id', activeChild.id)

          useLeagueStore.getState().fetchCloudLeaderboard?.()
        }
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
