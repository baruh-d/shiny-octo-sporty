import type { Metadata } from "next"
import { AuthClientWrapper } from '@/app/components/auth/auth-client-wrapper'
import { constructMetadata } from '@/lib/utils/metadata' // Assume you have this utility

export const generateMetadata = (): Metadata => {
  return constructMetadata({
    title: "Sign In | Sports Academy Hub",
    description: "Access your Sports Academy Hub account to manage your sports profile, training sessions, and more.",
    keywords: ["sports academy login", "athlete portal", "coach dashboard", "sports management system"],
    canonicalPath: "/auth/signin"
  })
}

export default function SignInPage() {
  return (
    <AuthClientWrapper 
      type="signin"
      title="Welcome Back"
      description="Sign in to access your personalized sports dashboard"
    />
  )
}