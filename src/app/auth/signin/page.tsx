import type { Metadata } from "next"
import { AuthClientWrapper } from '@/app/components/auth/auth-client-wrapper'

export const metadata: Metadata = {
  title: "Sign In | Sports Academy Hub",
  description: "Sign in to your Sports Academy Hub account",
}

export default function SignInPage() {
  return <AuthClientWrapper type="signin" />
}

