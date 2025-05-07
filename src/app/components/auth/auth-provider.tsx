"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { getSession, signOut } from "@/lib/redux/slices/authSlice"
import { supabase } from "@/lib/supabase/client"
import KenyanFlagLoader from "@/components/ui/loading-spinner"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading } = useAppSelector((state) => state.auth)

  // Handle auth state changes
  useEffect(() => {
    // Initial session load
    dispatch(getSession())

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          dispatch(signOut())
          router.push("/auth/signin")
        } else if (session) {
          dispatch(getSession()) // Re-fetch full session data
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch, router])

  // Optional: Handle storage events for cross-tab sync
  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "supabase-auth-event") {
        const { event: authEvent } = JSON.parse(event.newValue || "{}")
        if (authEvent === "SIGNED_OUT") {
          dispatch(signOut())
          router.push("/auth/signin")
        }
      }
    }

    window.addEventListener("storage", handleStorageEvent)
    return () => window.removeEventListener("storage", handleStorageEvent)
  }, [dispatch, router])

  // Optional: Show loading state while initializing
  if (isLoading) {
    return <div><KenyanFlagLoader /></div>
  }

  return <>{children}</>
}