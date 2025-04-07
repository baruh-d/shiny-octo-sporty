import { useDispatch, useSelector, useStore, type TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch, AppStore } from "./store"

/**
 * A typed version of the `useDispatch` hook from react-redux.
 *
 * @returns A properly typed dispatch function for your Redux store.
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(someAction());
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * A typed version of the `useSelector` hook from react-redux.
 * Use this hook throughout your app instead of plain `useSelector` for better TypeScript support.
 *
 * @example
 * const user = useAppSelector((state) => state.auth.user);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * A typed version of the `useStore` hook from react-redux.
 * Provides direct access to the store, but prefer using useAppSelector when possible.
 *
 * @returns A properly typed Redux store.
 * @example
 * const store = useAppStore();
 * const state = store.getState();
 */
export const useAppStore: () => AppStore = useStore

/**
 * A hook that returns the current state of the Redux store.
 * This is a convenience wrapper around useAppSelector(state => state).
 *
 * @returns The current state of the Redux store.
 * @example
 * const state = useAppState();
 * console.log(state.auth.user);
 */
export const useAppState = (): RootState => useAppSelector((state) => state)

/**
 * A hook that returns a specific slice of the Redux store.
 *
 * @param sliceName - The name of the slice to select
 * @returns The specified slice of the Redux store
 * @example
 * const authSlice = useAppSlice('auth');
 * console.log(authSlice.user);
 */
export const useAppSlice = <K extends keyof RootState>(sliceName: K): RootState[K] => {
  return useAppSelector((state) => state[sliceName])
}

