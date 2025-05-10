import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthUIState {
  authModalOpen: boolean
  authModalView: 'signin' | 'signup' | 'reset_password'
  isLoading: boolean
  error: string | null
  csrfVerified: boolean 
}

const initialState: AuthUIState = {
  authModalOpen: false,
  authModalView: 'signin',
  isLoading: false,
  error: null,
  csrfVerified: false  // CSRF verification state
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<'signin' | 'signup' | 'reset_password'>) => {
      state.authModalOpen = true
      state.authModalView = action.payload
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    switchAuthView: (state, action: PayloadAction<'signin' | 'signup' | 'reset_password'>) => {
      state.authModalView = action.payload
    },
    clearError: (state) => {
      state.error = null;
    },
    verifyCSRF: (state, action: PayloadAction<boolean>) => {
      state.csrfVerified = action.payload;
    },
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    }
  }
})

export const { 
  openAuthModal, 
  closeAuthModal, 
  setAuthLoading, 
  setAuthError,
  switchAuthView,
  clearError,
  verifyCSRF,
  resetAuthState
} = authSlice.actions

export default authSlice.reducer