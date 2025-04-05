"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session, User, AuthError, PostgrestError } from "@supabase/supabase-js"
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
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, role: UserRole) => Promise<{ error: AuthError | PostgrestError | null; data: { user: User | null } | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

        setUserDetails(data)
      } else {
        setUserDetails(null)
      }

      setIsLoading(false)
    })

    // Initial session check
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setUser(data.session?.user ?? null)

      if (data.session?.user) {
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single()

        setUserDetails(profileData)
      }

      setIsLoading(false)
    }

    initializeAuth()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      router.refresh()
    }

    return { error }
  }

  const signUp = async (email: string, password: string, role: UserRole) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (!error && data.user) {
      // Create user profile with role
      const { error: profileError } = await supabase.from("user_profiles").insert([
        {
          id: data.user.id,
          role,
          email,
        },
      ])

      if (profileError) {
        return { error: profileError, data: null }
      }

      router.refresh()
      return { error: null, data: { user: data.user } }
    }

    return { error, data: data ? { user: data.user } : null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/signin")
    router.refresh()
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    return { error }
  }

  const value = {
    user,
    userDetails,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
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

