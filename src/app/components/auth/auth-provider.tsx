"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

type UserRole = "admin" | "athlete" | "coach" | "scout" | null

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

  // Handle sign out logic
  const handleSignOut = useCallback(async () => {
    setSession(null)
    setUser(null)
    setUserDetails(null)
    localStorage.removeItem('supabase-auth-event')
    router.push("/auth/signin")
  }, [router])

  // Fetch user details from profiles table
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

  // Handle storage events for multi-tab sync
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

  // Main auth refresh function
  const refreshAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      
      if (currentSession?.user) {
        await fetchUserDetails(currentSession.user.id)
        
        // Broadcast login to other tabs
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

  // Sign out function exposed to consumers
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Broadcast logout to other tabs
      localStorage.setItem('supabase-auth-event', JSON.stringify({
        event: 'SIGNED_OUT',
        session: null
      }))
      
      await handleSignOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }, [handleSignOut])

  // Set up auth state listener and storage event listener
  useEffect(() => {
    // Initialize auth state
    refreshAuth()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        await handleSignOut()
      } else if (session) {
        setSession(session)
        setUser(session.user)
        await fetchUserDetails(session.user.id)
        
        // Broadcast auth change to other tabs
        localStorage.setItem('supabase-auth-event', JSON.stringify({
          event,
          session
        }))
      }
    })

    // Set up storage event listener for multi-tab sync
    window.addEventListener('storage', handleStorageEvent)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [refreshAuth, handleSignOut, fetchUserDetails, handleStorageEvent])

  const value = {
    user,
    userDetails,
    session,
    isLoading,
    signOut,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}