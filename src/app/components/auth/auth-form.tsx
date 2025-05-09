'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mountain, Eye, EyeOff } from "lucide-react"  // Added Eye and EyeOff icons
import { useAuthToast } from "@/app/hooks/use-auth-toast"
import { SocialAuth } from "@/app/auth/components/social-auth"
import { useSignIn, useSignUp, useResetPassword } from "@/features/auth/auth-queries"
import { useEffect, useMemo, useState } from "react"
import debounce from "lodash.debounce"
import { KenyanFlagLoader } from "@/components/ui/loading-spinner"

// Import shadcn form components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UserRole } from "@/types/auth"

// Constants for reusable strings
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
} as const;

// Available user roles
const USER_ROLES: UserRole[] = ["athlete", "coach", "scout"];

type AuthType = keyof typeof AUTH_TEXTS;

interface AuthFormProps {
  type: AuthType;
  title?: string;
  description?: string;
}

// Improved password validation
const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });

// Validation schemas
const schemas = {
  signin: z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  signup: z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: passwordSchema,
    role: z.enum(USER_ROLES),
  }),
  "forgot-password": z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
  })
};

type SignInFormData = z.infer<typeof schemas.signin>;
type SignUpFormData = z.infer<typeof schemas.signup>;
type ForgotPasswordFormData = z.infer<typeof schemas["forgot-password"]>;

type FormData = SignInFormData | SignUpFormData | ForgotPasswordFormData;

export function AuthForm({ type, title, description }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { error, success, setToast, clearToast } = useAuthToast();
  const [showPassword, setShowPassword] = useState(false);

  // Validate redirect URL to prevent open redirects
  const validateRedirectUrl = (url: string) => {
    try {
      const parsed = new URL(url, window.location.origin);
      return parsed.origin === window.location.origin ? parsed.pathname : "/";
    } catch {
      return "/";
    }
  };

  const redirectTo = validateRedirectUrl(searchParams.get("redirectedFrom") || "/");

  // Auth mutations
  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  const resetPasswordMutation = useResetPassword();

  // Combined loading state
  const isLoading = signInMutation.isPending || signUpMutation.isPending || resetPasswordMutation.isPending;

  // Create memoized initial values based on the form type
  const defaultValues = useMemo(() => {
    if (type === "signin") {
      return { email: "", password: "" };
    } else if (type === "signup") {
      return { email: "", password: "", role: "athlete" as UserRole };
    } else {
      return { email: "" };
    }
  }, [type]);

  // Get the appropriate schema based on the form type
  const formSchema = schemas[type];
  
  // Setup form with shadcn/ui Form components
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Reset form when auth type changes
  useEffect(() => {
    form.reset(defaultValues);
    clearToast();
  }, [type, form, defaultValues, clearToast]);

  // Debounced form submission
  const debouncedSubmit = useMemo(() => 
    debounce(form.handleSubmit(onSubmit), 300, { leading: true, trailing: false })
  , [form.handleSubmit]);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    clearToast();
    
    try {
      if (type === "signup") {
        const { email, password, role } = data as SignUpFormData;
        await signUpMutation.mutateAsync({ email, password, role });
        // Supabase will automatically send verification email
        setToast({ 
          success: "Account created! Please check your email to verify your account.", 
          error: undefined 
        });
        form.reset();
      } else if (type === "signin") {
        const { email, password } = data as SignInFormData;
        await signInMutation.mutateAsync({ email, password });
      } else {
        const { email } = data as ForgotPasswordFormData;
        await resetPasswordMutation.mutateAsync(email);
      }
    } catch (err) {
      // Handle Supabase verification errors specifically
      if (err.message.includes("Email not confirmed")) {
        setToast({ 
          error: "Please verify your email first. Check your inbox for the verification link.", 
          success: undefined 
        });
      } else {
        setToast({ 
          error: err.message || "An unexpected error occurred", 
          success: undefined 
        });
      }
    }
  };

  // Unified effect for handling all mutation results
  useEffect(() => {
    if (signInMutation.isSuccess) {
      setToast({ 
        success: "Welcome back! Redirecting to dashboard...", 
        error: undefined 
      });
      router.push(redirectTo);
    } else if (resetPasswordMutation.isSuccess) {
      setToast({ 
        success: "Password reset link sent! Please check your email.", 
        error: undefined 
      });
    }

    // Handle error cases
    const mutationError = 
      signInMutation.error || 
      signUpMutation.error || 
      resetPasswordMutation.error;
    
    if (mutationError) {
      setToast({ 
        error: mutationError.message || "An error occurred. Please try again.",
        success: undefined 
      });
    }
  }, [
    signInMutation.isSuccess, signInMutation.error,
    signUpMutation.isSuccess, signUpMutation.error,
    resetPasswordMutation.isSuccess, resetPasswordMutation.error,
    setToast, router, redirectTo
  ]);

  const currentTexts = AUTH_TEXTS[type];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
          <form onSubmit={(e) => {
            e.preventDefault();
            debouncedSubmit();
          }} className="space-y-4">
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

              {/* Email Field - present in all form types */}
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
                        autoFocus
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field - only in signin and signup */}
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
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Role Selection - only in signup */}
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
                            <SelectValue placeholder="Select your role" />
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
                    Please wait
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
                    Forgot your password?
                  </Link>
                </div>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}