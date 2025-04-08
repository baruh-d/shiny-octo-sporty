"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function usePersistedState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state with initialState
  const [state, setState] = useState<T>(initialState)

  // Load persisted state from localStorage on component mount
  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        setState(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, state])

  return [state, setState]
}
