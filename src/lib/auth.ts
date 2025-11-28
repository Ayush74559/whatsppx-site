import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'
import type { AuthUser } from '@/types/auth'

// ⚠️ Must be synchronous - NO async/await
export function mapSupabaseUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email!,
    username: user.user_metadata?.username || user.user_metadata?.name || user.user_metadata?.full_name || user.email!.split('@')[0],
    avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
  }
}

class AuthService {
  // Email/Password signup
  async signUp(email: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (error) throw error
    return data.user
  }

  // Email/Password login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data.user
  }

  // Google OAuth
  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        skipBrowserRedirect: false,
      },
    })

    if (error) throw error
  }

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // Create organization for new user
  async createOrganization(userId: string, orgName: string) {
    const { data, error } = await supabase
      .from('orgs')
      .insert({
        name: orgName,
        owner_user_id: userId,
        theme_preset: 'apple-neon-black',
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Get user's organizations
  async getUserOrganizations(userId: string) {
    const { data, error } = await supabase
      .from('orgs')
      .select('*')
      .or(`owner_user_id.eq.${userId},id.in.(select org_id from org_users where user_id = ${userId})`)

    if (error) throw error
    return data
  }
}

export const authService = new AuthService()
