import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { mapSupabaseUser } from '@/lib/auth'
import type { AuthUser } from '@/types/auth'

interface AuthState {
  user: AuthUser | null
  loading: boolean
  login: (user: AuthUser) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  login: (user) => set({ user, loading: false }),

  logout: () => set({ user: null, loading: false }),

  setLoading: (loading) => set({ loading }),

  initialize: () => {
    let mounted = true

    // Safety #1: Check existing session (page refresh)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session?.user) {
        set({ user: mapSupabaseUser(session.user), loading: false })
      } else if (mounted) {
        set({ loading: false })
      }
    })

    // Safety #2: Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return

      if (event === 'SIGNED_IN' && session?.user) {
        set({ user: mapSupabaseUser(session.user), loading: false })
      } else if (event === 'SIGNED_OUT') {
        set({ user: null, loading: false })
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        set({ user: mapSupabaseUser(session.user) })
      }
    })

    // Cleanup
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  },
}))
