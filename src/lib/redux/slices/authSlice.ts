// features/auth/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { 
  loginUser,
  registerUser,
  logoutUser,
  getSession,
  resetPassword as supabaseResetPassword,
  getCurrentUser,
} from "@/lib/supabase/auth";
import { 
  getUserProfile,
  updateUserProfile as usersUpdateProfile,
  type UserProfileUpdate
} from "@/lib/supabase/users";
import type { User, Session } from "@supabase/supabase-js";
import type { AppUser, AuthSession, UserProfile, UserRole } from "@/types/auth";

interface AuthState {
  userDetails: UserProfile | null;
  user: AppUser | null;
  profile: UserProfile | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  csrfVerified: boolean;
}

interface SessionData {
  session: AuthSession | null;
  user: AppUser | null;
  userDetails: UserProfile | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  error: null,
  csrfVerified: false,
  userDetails: null
};

// Improved error handling with user-friendly messages
const handleAuthError = (error: unknown): string => {
  return error instanceof Error ? error.message : "Authentication error";
};

// Helper to convert Supabase User to AppUser
const toAppUser = (user: User | null): AppUser | null => {
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email ?? '',
    role: user.user_metadata?.role ?? 'athlete',
    status: 'active',
    auth_id: user.id,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user_metadata: user.user_metadata
  };
};

// Helper to convert Supabase Session to AuthSession
const toAuthSession = (session: Session | null): AuthSession | null => {
  if (!session || !session.user) return null;
  
  return {
    user: toAppUser(session.user) as AppUser,
    access_token: session.access_token,
    expires_at: session.expires_at
  };
};

// Type to ensure the profile from getUserProfile matches UserProfile
interface RawUserProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  date_of_birth: string | null;
  gender: string | null;
  location: string | null;
  phone: string | null;
  updated_at: string | null;
  [key: string]: unknown; // For any other properties
}

// Helper to convert raw profile to proper UserProfile
const toUserProfile = (profile: RawUserProfile | null): UserProfile | null => {
  if (!profile) return null;
  
  return {
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    created_at: profile.created_at || new Date().toISOString(),
    updated_at: profile.updated_at || new Date().toISOString(),
    date_of_birth: profile.date_of_birth,
    gender: profile.gender, // This is now compatible with our UserProfile type
    location: profile.location,
    phone: profile.phone
  };
};

export const signIn = createAsyncThunk<
  { user: AppUser; userDetails: UserProfile | null; session: AuthSession | null },
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(email, password);
      if (response.error || !response.data) {
        return rejectWithValue(response.error?.message || "Login failed");
      }
      
      const session = toAuthSession(response.data);
      const userResponse = await getCurrentUser();
      
      if (userResponse.error || !userResponse.data) {
        return rejectWithValue(userResponse.error?.message || "Failed to get user data");
      }
      
      const user = toAppUser(userResponse.data);
      if (!user) return rejectWithValue("User data is invalid");
      
      const rawUserDetails = await getUserProfile(user.id);
      const userDetails = toUserProfile(rawUserDetails);
      
      return { 
        user, 
        userDetails,
        session 
      };
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const signUp = createAsyncThunk<
  { user: AppUser; userDetails: UserProfile | null; session: AuthSession | null },
  { email: string; password: string; role: UserRole },
  { rejectValue: string }
>(
  "auth/signUp",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await registerUser(email, password);
      if (response.error || !response.data) {
        return rejectWithValue(response.error?.message || "Registration failed");
      }

      const user = toAppUser(response.data);
      if (!user) return rejectWithValue("User creation failed");

      await usersUpdateProfile(user.id, { role } as UserProfileUpdate);
      
      const sessionResponse = await getSession();
      const session = toAuthSession(sessionResponse.data);
      
      return { 
        user,
        session,
        userDetails: { 
          id: user.id,
          first_name: '',
          last_name: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          role 
        } as UserProfile
      };
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const signOut = createAsyncThunk<
  null,
  void,
  { rejectValue: string }
>(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      if (response.error) {
        return rejectWithValue(response.error.message);
      }
      return null;
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const getSessionThunk = createAsyncThunk<
  SessionData,
  void,
  { rejectValue: string }
>(
  "auth/getSession",
  async (_, { rejectWithValue }) => {
    try {
      const sessionResponse = await getSession();
      const session = toAuthSession(sessionResponse.data);
      
      if (!session) {
        return { session: null, user: null, userDetails: null };
      }

      const userResponse = await getCurrentUser();
      const user = toAppUser(userResponse.data);
      
      if (!user) {
        return { session, user: null, userDetails: null };
      }

      const rawUserDetails = await getUserProfile(user.id);
      const userDetails = toUserProfile(rawUserDetails);
      
      return { 
        session, 
        user, 
        userDetails 
      };
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const resetPassword = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await supabaseResetPassword(email);
      if (response.error) {
        return rejectWithValue(response.error.message);
      }
      return "Password reset email sent. Please check your inbox.";
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  UserProfile,
  { userId: string; updates: UserProfileUpdate },
  { rejectValue: string }
>(
  "auth/updateUserProfile",
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      const updatedProfile = await usersUpdateProfile(userId, updates);
      if (!updatedProfile) {
        return rejectWithValue("Profile update failed");
      }
      return toUserProfile(updatedProfile) as UserProfile;
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state: AuthState) => {
      state.error = null;
    },
    verifyCSRF: (state, action: PayloadAction<boolean>) => {
      state.csrfVerified = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userDetails = action.payload.userDetails;
        state.session = action.payload.session;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.userDetails = action.payload.userDetails;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.userDetails = null;
        state.session = null;
        state.isLoading = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(getSessionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.userDetails = action.payload.userDetails;
        state.isLoading = false;
      })
      .addCase(getSessionThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const { 
  setAuthLoading, 
  setAuthError, 
  clearError,
  verifyCSRF 
} = authSlice.actions;
export default authSlice.reducer;