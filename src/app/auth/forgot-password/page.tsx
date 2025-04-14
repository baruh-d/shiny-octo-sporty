import type { Metadata } from "next"
import { AuthClientWrapper } from '@/app/components/auth/auth-client-wrapper'

export const metadata: Metadata = {
  title: "Forgot Password | Sports Academy Hub",
  description: "Reset your Sports Academy Hub password",
}

export default function ForgotPasswordPage() {
  return <AuthClientWrapper type="forgot-password" />
}
