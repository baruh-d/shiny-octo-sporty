import type { Metadata } from "next"
import { AuthForm } from "@/app/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Forgot Password | Sports Academy Hub",
  description: "Reset your Sports Academy Hub password",
}

export default function ForgotPasswordPage() {
  return <AuthForm type="forgot-password" />
}
