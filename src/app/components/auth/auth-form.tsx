"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mountain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "./auth-provider"

type AuthFormProps = {
  type: "signin" | "signup" | "forgot-password"; // Include "forgot-password"
}

const signinSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["athlete", "coach", "scout"]),
})

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export function AuthForm({ type }: AuthFormProps) {
  const { signIn, signUp, resetPassword } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectedFrom") || "/"

  // Determine which schema to use based on form type
  const schema = type === "signin" ? signinSchema : type === "signup" ? signupSchema : forgotPasswordSchema

  type FormData = {
    email: string;
    password?: string;
    role?: "athlete" | "coach" | "scout";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      ...(type !== "forgot-password" ? { password: "" } : {}),
      ...(type === "signup" ? { role: "athlete" as const } : {}),
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (type === "signin") {
        const { email, password } = data as z.infer<typeof signinSchema>
        const { error } = await signIn(email, password)
        if (error) throw error
        router.push(redirectTo)
      } else if (type === "signup") {
        const { email, password, role } = data as z.infer<typeof signupSchema>
        const { error } = await signUp(email, password, role)
        if (error) throw error
        setSuccess("Account created successfully! Please check your email for verification.")
      } else if (type === "forgot-password") {
        const { error } = await resetPassword(data.email)
        if (error) throw error
        setSuccess("Password reset link sent to your email.")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-10 w-10 text-kas-green" />
            <span className="font-bold text-2xl ml-2">Sports Academy Hub</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {type === "signin" ? "Sign In" : type === "signup" ? "Create an Account" : "Reset Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {type === "signin"
              ? "Enter your email and password to access your account"
              : type === "signup"
                ? "Enter your details to create your account"
                : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}
            </div>
            {type !== "forgot-password" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  autoComplete={type === "signin" ? "current-password" : "new-password"}
                  disabled={isLoading}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            )}
            {type === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  onValueChange={(value) => setValue("role", value as "athlete" | "coach" | "scout")}
                  defaultValue="athlete"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="athlete">Athlete</SelectItem>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="scout">Scout</SelectItem>
                  </SelectContent>
                </Select>
                {type === "signup" && "role" in errors && errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-kas-green hover:bg-kas-green/90" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Please wait
                </div>
              ) : type === "signin" ? (
                "Sign In"
              ) : type === "signup" ? (
                "Create Account"
              ) : (
                "Send Reset Link"
              )}
            </Button>
            <div className="text-center text-sm">
              {type === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-kas-green hover:underline">
                    Sign up
                  </Link>
                </>
              ) : type === "signup" ? (
                <>
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-kas-green hover:underline">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Remember your password?{" "}
                  <Link href="/auth/signin" className="text-kas-green hover:underline">
                    Sign in
                  </Link>
                </>
              )}
            </div>
            {type === "signin" && (
              <div className="text-center text-sm">
                <Link href="/auth/forgot-password" className="text-kas-green hover:underline">
                  Forgot your password?
                </Link>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}