"use client"

import { useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  useAuthSession,
  useSignIn,
  useSignUp,
  useSignOut
} from "@/features/auth/auth-queries"
import { useUserProfile } from "@/features/users/user-queries"
import type { UserRole } from "@/types/consolidated-types"
import {
  openAuthModal,
  closeAuthModal,
} from "@/lib/redux/slices/authSlice"

export default function useAuth() {
  const dispatch = useAppDispatch()
  const { 
    isLoading: authLoading, 
    error, 
    authModalOpen, 
    authModalView 
  } = useAppSelector((state) => state.auth)
  
  const sessionQuery = useAuthSession()
  const user = sessionQuery.data?.user ?? null
  const role = user?.user_metadata?.role as UserRole | undefined

  // Get mutations
  const signIn = useSignIn()
  const signUp = useSignUp()
  const signOut = useSignOut()

  const { data: profile, isLoading: isProfileLoading } = useUserProfile(user?.id)

  const isLoading = authLoading || sessionQuery.isLoading || isProfileLoading

  const userWithProfile = useMemo(() => {
    if (!user) return null
    return {
      ...user,
      profile,
      role,
    }
  }, [user, profile, role])

  return useMemo(() => ({
    // User data
    user: userWithProfile,
    role,
    session: sessionQuery.data,

    // State
    isLoading,
    error,
    isAuthenticated: !!user,

    // UI State
    authModalOpen,
    authModalView,

    // Actions
    openAuthModal: (view: 'signin' | 'signup' | 'reset_password') => 
      dispatch(openAuthModal(view)),
    closeAuthModal: () => dispatch(closeAuthModal()),

    // Auth methods
    signIn: signIn.mutate,
    signUp: signUp.mutate,
    signOut: signOut.mutate,

    // Status flags
    isSigningIn: signIn.isPending,
    isSigningUp: signUp.isPending,
    isProfileLoading,
  }), [
    userWithProfile,
    role,
    sessionQuery.data,
    isLoading,
    error,
    authModalOpen,
    authModalView,
    dispatch,
    signIn.mutate,
    signUp.mutate,
    signOut.mutate,
    signIn.isPending,
    signUp.isPending,
    isProfileLoading,
    user, // for isAuthenticated
  ])
}