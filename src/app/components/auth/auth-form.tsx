'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mountain, Eye, EyeOff } from "lucide-react"
import { useAuthToast } from "@/app/hooks/use-auth-toast"
import { SocialAuth } from "@/app/auth/components/social-auth"
import { useSignIn, useSignUp, useResetPassword } from "@/features/auth/auth-queries"
import { useEffect, useState, useMemo, useCallback } from "react"
import { KenyanFlagLoader } from "@/components/ui/loading-spinner"
import { debounce } from "lodash"

// Form components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Constants
const USER_ROLES = ["athlete", "coach", "scout"] as const
const MAX_FAILED_ATTEMPTS = 3
const INITIAL_DELAY_MS = 1000
const MAX_DELAY_MS = 5000

const AUTH_TEXTS = {
  signin: {
    title: "Sign In",
    description: "Enter your email and password to access your account",
    button: "Sign In",
    footerText: "Don't have an account?",
    footerLink: "Sign up",
    footerHref: "/auth/signup"
  },
  signup: {
    title: "Create an Account",
    description: "Enter your details to create your account",
    button: "Create Account",
    footerText: "Already have an account?",
    footerLink: "Sign in",
    footerHref: "/auth/signin"
  },
  "forgot-password": {
    title: "Reset Password",
    description: "Enter your email to receive a password reset link",
    button: "Send Reset Link",
    footerText: "Remember your password?",
    footerLink: "Sign in",
    footerHref: "/auth/signin"
  }
} as const

// Validation schemas
const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })

const schemas = {
  signin: z.object({
    email: z.string().trim().toLowerCase().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  signup: z.object({
    email: z.string().trim().toLowerCase().email({ message: "Please enter a valid email address" }),
    password: passwordSchema,
    role: z.enum(USER_ROLES, {
      errorMap: () => ({ message: "Please select a valid role" })
    }),
  }),
  "forgot-password": z.object({
    email: z.string().trim().toLowerCase().email({ message: "Please enter a valid email address" }),
  })
}

type AuthType = keyof typeof AUTH_TEXTS
type FormData<T extends AuthType> = z.infer<typeof schemas[T]>

interface AuthFormProps {
  type: AuthType
  title?: string
  description?: string
}

export function AuthForm({ type, title, description }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { error, success, setToast, clearToast } = useAuthToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)

  // Get redirect URL safely
  const redirectTo = useMemo(() => {
    const url = searchParams.get("redirectedFrom") || "/"
    try {
      const parsed = new URL(url, window.location.origin)
      return parsed.origin === window.location.origin ? parsed.pathname : "/"
    } catch {
      return "/"
    }
  }, [searchParams])

  // Auth mutations
  const { mutateAsync: signIn } = useSignIn()
  const { mutateAsync: signUp } = useSignUp()
  const { mutateAsync: resetPassword } = useResetPassword()

  // Form setup
  const form = useForm<FormData<AuthType>>({
    resolver: zodResolver(schemas[type]),
    defaultValues: {
      email: "",
      ...(type !== "forgot-password" && { password: "" }),
      ...(type === "signup" && { role: "athlete" })
    }
  })

  // Reset form when type changes
  useEffect(() => {
    form.reset({
      email: "",
      ...(type !== "forgot-password" && { password: "" }),
      ...(type === "signup" && { role: "athlete" })
    })
    clearToast()
    setFailedAttempts(0)
  }, [type, form, clearToast])

  // Handle successful redirect
  useEffect(() => {
    if (isRedirecting) {
      const timer = setTimeout(() => router.push(redirectTo), 500)
      return () => clearTimeout(timer)
    }
  }, [isRedirecting, redirectTo, router])

  // Form submission handler
  const onSubmit = useCallback(debounce(async (data: FormData<AuthType>) => {
    try {
      clearToast()
      
      if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
        const delay = Math.min(
          INITIAL_DELAY_MS * Math.pow(1.5, failedAttempts - MAX_FAILED_ATTEMPTS),
          MAX_DELAY_MS
        )
        await new Promise(resolve => setTimeout(resolve, delay))
      }
  
      if (type === "signup") {
        await signUp(data as FormData<"signup">)
        setToast({ success: "Account created! Please check your email.", error: undefined })
        form.reset()
      } else if (type === "signin") {
        await signIn(data as FormData<"signin">)
        setToast({ success: "Welcome back! Redirecting...", error: undefined })
        setIsRedirecting(true)
      } else {
        // Fix: Extract email from the data object
        await resetPassword((data as FormData<"forgot-password">).email)
        setToast({ success: "Password reset link sent!", error: undefined })
        form.reset()
      }
      
      setFailedAttempts(0)
    } catch (err: unknown) {
      setFailedAttempts(prev => prev + 1)
      const message = err instanceof Error 
        ? err.message.includes("Email not confirmed")
          ? "Please verify your email first."
          : "Authentication failed. Please try again."
        : "An unexpected error occurred."
      setToast({ error: message, success: undefined })
    }
  }, 300), [failedAttempts, type, signIn, signUp, resetPassword, form, setToast, clearToast])
  // Cleanup debounce
  useEffect(() => {
    return () => onSubmit.cancel()
  }, [onSubmit])

  const currentTexts = AUTH_TEXTS[type]
  const isLoading = 
    form.formState.isSubmitting || 
    isRedirecting

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-10 w-10 text-kas-green" />
            <span className="font-bold text-2xl ml-2">Integrated Sports Management System</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {title || currentTexts.title}
          </CardTitle>
          <CardDescription className="text-center">
            {description || currentTexts.description}
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-kas-green/10 text-kas-green border-kas-green">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type !== "forgot-password" && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            autoComplete={type === "signin" ? "current-password" : "new-password"}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <FormMessage />
                      {type === "signup" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be 8+ chars with uppercase, lowercase, number, and special character.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              )}

              {type === "signup" && (
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {USER_ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type !== "forgot-password" && <SocialAuth />}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-kas-green hover:bg-kas-green/90" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <KenyanFlagLoader size="sm" className="mr-2" />
                    {isRedirecting ? "Redirecting..." : "Processing..."}
                  </div>
                ) : (
                  currentTexts.button
                )}
              </Button>

              <div className="text-center text-sm">
                {currentTexts.footerText}{" "}
                <Link 
                  href={currentTexts.footerHref} 
                  className="text-kas-green hover:underline"
                >
                  {currentTexts.footerLink}
                </Link>
              </div>

              {type === "signin" && (
                <div className="text-center text-sm">
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-kas-green hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}