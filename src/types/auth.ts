export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface Organization {
  id: string
  name: string
  owner_user_id: string
  theme_preset: string
  created_at: string
}
