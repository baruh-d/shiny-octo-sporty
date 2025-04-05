import type { Metadata } from "next"
import { AuthForm } from "@/app/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign In | Sports Academy Hub",
  description: "Sign in to your Sports Academy Hub account",
}

export default function SignInPage() {
  return <AuthForm type="signin" />
}

