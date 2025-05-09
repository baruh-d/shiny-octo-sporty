"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mountain } from "lucide-react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { resetPassword } from "@/lib/redux/slices/authSlice"
import { useToast } from "@/app/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { KenyanFlagLoader } from "@/components/ui/loading-spinner"

const resetPasswordSchema = z
  .object({
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type PasswordStrength = {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<
    z.infer<typeof resetPasswordSchema>
  >({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  const password = watch("password")
  const passwordStrength: PasswordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }
  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  const handleResetPassword = async (data: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true)
    
    try {
      const result = await dispatch(resetPassword(data.password))
      
      if (resetPassword.fulfilled.match(result)) {
        toast({
          title: "Success",
          description: "Your password has been updated successfully",
          variant: "default",
        })
        setTimeout(() => router.push("/auth/signin"), 2000)
      } else if (resetPassword.rejected.match(result)) {
        throw new Error(result.payload as string || "Failed to update password")
      }
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderPasswordStrength = () => (
    <div className="mt-2">
      <div className="flex gap-1 h-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${
              strengthScore >= i
                ? i <= 2 ? "bg-red-500"
                : i === 3 ? "bg-yellow-500"
                : "bg-green-500"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {password && (
        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
          {Object.entries(passwordStrength).map(([key, met]) => (
            <li key={key} className={met ? "text-green-500" : ""}>
              {key === 'length' && 'At least 8 characters'}
              {key === 'uppercase' && 'At least one uppercase letter'}
              {key === 'lowercase' && 'At least one lowercase letter'}
              {key === 'number' && 'At least one number'}
              {key === 'special' && 'At least one special character'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-10 w-10 text-kas-green" />
            <span className="font-bold text-2xl ml-2">Sports Academy Hub</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Create a new secure password for your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
              {renderPasswordStrength()}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-kas-green hover:bg-kas-green/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <KenyanFlagLoader size="sm" className="mr-2" />
                  Updating Password...
                </div>
              ) : "Reset Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}