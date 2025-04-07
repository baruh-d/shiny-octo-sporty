// store/store.ts
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import authReducer from '@/lib/redux/slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Define a reusable AppThunk type for async actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>


export default store;