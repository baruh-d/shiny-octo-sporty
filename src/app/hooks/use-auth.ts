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
import type { UserRole } from "@/types/auth"
import {
  openAuthModal,
  closeAuthModal,
} from "@/lib/redux/slices/authSlice"

export default function useAuth() {
  const dispatch = useAppDispatch()
  const uiState = useAppSelector((state) => state.auth)
  const sessionQuery = useAuthSession()

  // Get mutations
  const signIn = useSignIn()
  const signUp = useSignUp()
  const signOut = useSignOut()

  const user = sessionQuery.data?.user ?? null
  const role = user?.user_metadata?.role as UserRole | undefined

  const { data: profile, isLoading: isProfileLoading } = useUserProfile(user?.id)

  const isLoading = uiState.isLoading || sessionQuery.isLoading || isProfileLoading

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
    role, // exposed separately for convenience
    session: sessionQuery.data,

    // State
    isLoading,
    error: uiState.error,
    isAuthenticated: !!user,

    // UI State
    authModalOpen: uiState.authModalOpen,
    authModalView: uiState.authModalView,

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
    uiState,
    sessionQuery,
    isLoading,
    dispatch,
    signIn,
    signUp,
    signOut,
    userWithProfile,
    role,
    isProfileLoading,
  ])
}
