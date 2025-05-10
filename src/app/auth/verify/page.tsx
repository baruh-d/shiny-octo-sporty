// app/auth/verify/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mountain, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { useAuthToast } from "@/app/hooks/use-auth-toast"
import { useVerifyEmail } from "@/features/auth/auth-queries"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { KenyanFlagLoader } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Constants
const VERIFICATION_STATES = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setToast } = useAuthToast()
  const verifyEmail = useVerifyEmail()
  
  // Extract and validate params
  const token = searchParams.get("token")
  const type = searchParams.get("type")
  
  // Track local verification state for UX
  const [verificationState, setVerificationState] = useState<
    typeof VERIFICATION_STATES[keyof typeof VERIFICATION_STATES]
  >(VERIFICATION_STATES.IDLE)
  
  // Track time remaining before auto-redirect
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  useEffect(() => {
    // Validate parameters
    if (!token || !type) {
      setVerificationState(VERIFICATION_STATES.ERROR)
      setToast({
        error: "Invalid verification link. Please request a new one.",
        success: undefined
      })
      return
    }

    // Start verification process
    setVerificationState(VERIFICATION_STATES.PROCESSING)
    verifyEmail.mutate({ token, type })
  }, [token, type, setToast, verifyEmail])

  // Handle verification result and redirect
  useEffect(() => {
    if (verifyEmail.isSuccess) {
      setVerificationState(VERIFICATION_STATES.SUCCESS)
      setToast({
        success: "Email verified successfully! You can now sign in.",
        error: undefined
      })
      
      // Start countdown for auto-redirect
      const intervalId = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalId)
            router.push("/auth/signin")
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(intervalId)
    } else if (verifyEmail.isError) {
      setVerificationState(VERIFICATION_STATES.ERROR)
      setToast({
        error: verifyEmail.error?.message || "Failed to verify email. The link may have expired or is invalid.",
        success: undefined
      })
    }
  }, [verifyEmail.isSuccess, verifyEmail.isError, verifyEmail.error, router, setToast])

  // Handle manual navigation
  const handleSignIn = () => {
    router.push("/auth/signin")
  }
  
  const handleRequestNewLink = () => {
    router.push("/auth/signup?resend=true")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-10 w-10 text-kas-green" />
            <span className="font-bold text-2xl ml-2">Sports Academy Hub</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {verificationState === VERIFICATION_STATES.PROCESSING && "Verifying your email..."}
            {verificationState === VERIFICATION_STATES.SUCCESS && "Email Verified!"}
            {verificationState === VERIFICATION_STATES.ERROR && "Verification Failed"}
            {verificationState === VERIFICATION_STATES.IDLE && "Email Verification"}
          </CardTitle>
          <CardDescription className="text-center">
            {verificationState === VERIFICATION_STATES.PROCESSING && 
              "Please wait while we verify your email address"}
            {verificationState === VERIFICATION_STATES.SUCCESS && 
              `Verification successful! Redirecting to sign in page in ${redirectCountdown}...`}
            {verificationState === VERIFICATION_STATES.ERROR && 
              "We couldn't verify your email with the provided link"}
            {verificationState === VERIFICATION_STATES.IDLE && 
              "Preparing to verify your email address"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center gap-4 py-6">
          {verificationState === VERIFICATION_STATES.PROCESSING && (
            <div className="flex flex-col items-center gap-4">
              <KenyanFlagLoader size="lg" />
              <p className="text-sm text-muted-foreground">
                This should only take a moment...
              </p>
            </div>
          )}
          
          {verificationState === VERIFICATION_STATES.SUCCESS && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-center">
                Your email address has been verified successfully. You can now sign in to your account.
              </p>
            </div>
          )}
          
          {verificationState === VERIFICATION_STATES.ERROR && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="text-center">
                {verifyEmail.error?.message || 
                  "The verification link is invalid or has expired. Please request a new verification link."}
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          {verificationState === VERIFICATION_STATES.SUCCESS && (
            <Button 
              className="w-full bg-kas-green hover:bg-kas-green/90" 
              onClick={handleSignIn}
            >
              Sign In Now
            </Button>
          )}
          
          {verificationState === VERIFICATION_STATES.ERROR && (
            <>
              <Button 
                className="w-full bg-kas-green hover:bg-kas-green/90" 
                onClick={handleRequestNewLink}
              >
                Request New Verification Link
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleSignIn}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </>
          )}
          
          {verificationState === VERIFICATION_STATES.PROCESSING && (
            <p className="text-center text-sm text-muted-foreground">
              If verification takes too long, you can 
              <Link 
                href="/auth/signup?resend=true" 
                className="text-kas-green hover:underline ml-1"
              >
                request a new link
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}