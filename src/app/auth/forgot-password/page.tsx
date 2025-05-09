import type { Metadata } from "next"
import { AuthClientWrapper } from '@/app/components/auth/auth-client-wrapper'
import { constructMetadata } from '@/lib/utils/metadata'

export const generateMetadata = (): Metadata => {
  return constructMetadata({
    title: "Password Recovery | Sports Academy Hub",
    description: "Reset your password to regain access to your Sports Academy Hub account",
    keywords: ["password recovery", "account access", "sports management login"],
    canonicalPath: "/auth/forgot-password",
    noIndex: true // Prevent search indexing of password reset pages
  })
}

export default function ForgotPasswordPage() {
  return (
    <AuthClientWrapper 
      type="forgot-password"
      title="Reset Your Password"
      description="Enter your email to receive a password reset link"
    />
  )
}