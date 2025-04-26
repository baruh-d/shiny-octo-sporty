"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import type { UserRole } from "@/types/auth"

type UserDetails = {
  id: string
  role: UserRole
  first_name?: string
  last_name?: string
  avatar_url?: string
} | null

type AuthContextType = {
  user: User | null
  userDetails: UserDetails
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const handleSignOut = useCallback(async () => {
    setSession(null)
    setUser(null)
    setUserDetails(null)
    localStorage.removeItem('supabase-auth-event')
    router.push("/auth/signin")
  }, [router])

  const fetchUserDetails = useCallback(async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (error) throw error
      setUserDetails(profileData)
    } catch (error) {
      console.error("Error fetching user details:", error)
      setUserDetails(null)
    }
  }, [])

  const refreshAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()

      if (error) throw error

      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      if (currentSession?.user) {
        await fetchUserDetails(currentSession.user.id)
        localStorage.setItem('supabase-auth-event', JSON.stringify({
          event: 'SIGNED_IN',
          session: currentSession
        }))
      } else {
        setUserDetails(null)
      }
    } catch (error) {
      console.error("Auth refresh error:", error)
      await handleSignOut()
    } finally {
      setIsLoading(false)
    }
  }, [fetchUserDetails, handleSignOut])

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      localStorage.setItem('supabase-auth-event', JSON.stringify({
        event: 'SIGNED_OUT',
        session: null
      }))
      await handleSignOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }, [handleSignOut])

  const handleStorageEvent = useCallback((event: StorageEvent) => {
    if (event.key === 'supabase-auth-event') {
      const { event: authEvent, session: newSession } = JSON.parse(event.newValue || '{}')

      if (authEvent === 'SIGNED_OUT') {
        handleSignOut()
      } else if (newSession) {
        setSession(newSession)
        setUser(newSession.user)
        fetchUserDetails(newSession.user.id)
      }
    }
  }, [fetchUserDetails, handleSignOut])

  useEffect(() => {
    refreshAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        await handleSignOut()
      } else if (session) {
        setSession(session)
        setUser(session.user)
        await fetchUserDetails(session.user.id)
        localStorage.setItem('supabase-auth-event', JSON.stringify({
          event,
          session
        }))
      }
    })

    window.addEventListener('storage', handleStorageEvent)
    return () => {
      subscription.unsubscribe()
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [refreshAuth, handleSignOut, fetchUserDetails, handleStorageEvent])

  return (
    <AuthContext.Provider value={{
      user,
      userDetails,
      session,
      isLoading,
      signOut,
      refreshAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
