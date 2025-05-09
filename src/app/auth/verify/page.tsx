// app/auth/verify/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mountain } from "lucide-react"
import { useAuthToast } from "@/app/hooks/use-auth-toast"
import { useVerifyEmail } from "@/features/auth/auth-queries"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { KenyanFlagLoader } from "@/components/ui/loading-spinner"
import Link from "next/link"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setToast } = useAuthToast()
  const verifyEmail = useVerifyEmail()
  const token = searchParams.get("token")
  const type = searchParams.get("type")

  useEffect(() => {
    if (!token || !type) {
      setToast({
        error: "Invalid verification link",
        success: undefined
      })
      router.push("/auth/signin")
      return
    }

    verifyEmail.mutate({ token, type })
  }, [token, type, router, setToast, verifyEmail])

  useEffect(() => {
    if (verifyEmail.isSuccess) {
      setToast({
        success: "Email verified successfully! You can now sign in.",
        error: undefined
      })
      router.push("/auth/signin")
    } else if (verifyEmail.error) {
      setToast({
        error: verifyEmail.error.message || "Failed to verify email. The link may have expired or is invalid.",
        success: undefined
      })
      router.push("/auth/signup")
    }
  }, [verifyEmail.isSuccess, verifyEmail.error, router, setToast])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-10 w-10 text-kas-green" />
            <span className="font-bold text-2xl ml-2">Sports Academy Hub</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {verifyEmail.isPending ? "Verifying your email..." : "Email Verification"}
          </CardTitle>
          <CardDescription className="text-center">
            {verifyEmail.isPending 
              ? "Please wait while we verify your email address" 
              : verifyEmail.isError
                ? "Verification failed"
                : "Verification successful! Redirecting..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {verifyEmail.isPending && <KenyanFlagLoader size="lg" />}
          {verifyEmail.isError && (
            <div className="text-center">
              <p className="text-red-500 mb-4">{verifyEmail.error.message}</p>
              <Link
                href="/auth/signup" 
                className="text-kas-green hover:underline font-medium"
              >
                Return to Sign Up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}