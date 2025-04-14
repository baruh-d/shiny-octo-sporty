// app/components/auth/auth-client-wrapper.tsx
'use client'
import { Suspense } from 'react'
import { AuthForm } from './auth-form'
import KenyanFlagLoader from '@/components/ui/loading-spinner'

export function AuthClientWrapper({ type }: { type: 'signin' | 'signup' | 'forgot-password' }) {
  return (
    <Suspense fallback={<KenyanFlagLoader fullPage />}>
      <AuthForm type={type} />
    </Suspense>
  )
}