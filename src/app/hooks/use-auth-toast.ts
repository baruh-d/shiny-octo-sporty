// hooks/useAuthToast.ts
import { useState } from "react"

type UseAuthToastReturn = {
  error: string | null
  success: string | null
  setToast: (opts: { error?: string; success?: string }) => void
  clearToast: () => void
}

export function useAuthToast(): UseAuthToastReturn {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const setToast = ({ error, success }: { error?: string; success?: string }) => {
    if (error) {
      setError(error)
      setSuccess(null)
    } else if (success) {
      setSuccess(success)
      setError(null)
    }
  }

  const clearToast = () => {
    setError(null)
    setSuccess(null)
  }

  return {
    error,
    success,
    setToast,
    clearToast,
  }
}
