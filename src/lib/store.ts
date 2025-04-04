// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/redux/slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Define AppDispatch here

export default store;