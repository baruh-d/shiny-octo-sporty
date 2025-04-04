import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase/client"
import type { Session, User } from "@supabase/supabase-js"

type UserRole = "admin" | "athlete" | "coach" | "scout" | null

type UserDetails = {
  id: string
  role: UserRole
  first_name?: string
  last_name?: string
  avatar_url?: string
} | null

interface AuthState {
  user: User | null
  userDetails: UserDetails
  session: Session | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  userDetails: null,
  session: null,
  isLoading: true,
  error: null,
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch user details
      const { data: userDetails, error: userDetailsError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (userDetailsError) throw userDetailsError

      return { session: data.session, user: data.user, userDetails }
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  },
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, role }: { email: string; password: string; role: UserRole }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Create user profile with role
        const { error: profileError } = await supabase.from("user_profiles").insert([
          {
            id: data.user.id,
            role,
            email,
          },
        ])

        if (profileError) throw profileError
      }

      return { session: data.session, user: data.user }
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  },
)

export const signOut = createAsyncThunk("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return null
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message)
  }
})

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      return null
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  },
)

export const getSession = createAsyncThunk("auth/getSession", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    if (data.session) {
      // Fetch user details
      const { data: userDetails, error: userDetailsError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single()

      if (userDetailsError) throw userDetailsError

      return { session: data.session, user: data.session.user, userDetails }
    }

    return { session: null, user: null, userDetails: null }
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message)
  }
})

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    {
      userId,
      profileData,
    }: {
      userId: string
      profileData: Partial<{
        first_name: string
        last_name: string
        avatar_url: string
        [key: string]: string | undefined
      }>
    },
    { rejectWithValue },
  ) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update(profileData)
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
        state.userDetails = action.payload.userDetails
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.session = null
        state.userDetails = null
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Get Session
      .addCase(getSession.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
        state.userDetails = action.payload.userDetails
      })
      .addCase(getSession.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update User Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userDetails = action.payload
      })
  },
})

export const { setUser, setUserDetails, setSession } = authSlice.actions
export default authSlice.reducer

