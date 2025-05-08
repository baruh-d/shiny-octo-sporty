// features/auth/auth-queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setAuthLoading, setAuthError } from "@/lib/redux/slices/authSlice"

import { 
  getSession, 
  loginUser, 
  registerUser, 
  logoutUser, 
  resetPassword 
} from "@/lib/supabase/auth"
import { supabase } from "@/lib/supabase/client"

export const useAuthSession = () => {
  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const { data, error } = await getSession()
      if (error) throw new Error(error.message)
      return data
    },
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  })
}

export const useSignIn = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      dispatch(setAuthLoading(true))
      const { data, error } = await loginUser(credentials.email, credentials.password)
      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'session'], data)
      // Fetch user profile after successful sign in
      queryClient.prefetchQuery({
        queryKey: ['user', data.user.id],
        queryFn: async () => {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()
          if (error) throw error
          return profile
        }
      })
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message))
    },
    onSettled: () => {
      dispatch(setAuthLoading(false))
    }
  })
}

export const useSignUp = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: async (payload: { email: string; password: string; role: string }) => {
      dispatch(setAuthLoading(true))
      const { data, error } = await registerUser(payload.email, payload.password, { role: payload.role })
      if (error) throw new Error(error.message)
      return data
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message))
    },
    onSettled: () => {
      dispatch(setAuthLoading(false))
    }
  })
}

export const useSignOut = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: async () => {
      dispatch(setAuthLoading(true))
      const { error } = await logoutUser()
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'] })
      queryClient.removeQueries({ queryKey: ['user'] })
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message))
    },
    onSettled: () => {
      dispatch(setAuthLoading(false))
    }
  })
}

export const useResetPassword = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: async (email: string) => {
      dispatch(setAuthLoading(true))
      const { error } = await resetPassword(email)
      if (error) throw new Error(error.message)
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message))
    },
    onSettled: () => {
      dispatch(setAuthLoading(false))
    }
  })
}
