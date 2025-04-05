import type { Metadata } from "next"
import { AuthForm } from "@/app/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign Up | Sports Academy Hub",
  description: "Create a Sports Academy Hub account",
}

export default function SignUpPage() {
  return <AuthForm type="signup" />
}

// This page is for signing up users. It uses the AuthForm component and passes the type "signup" to it.
// The metadata object contains the title and description for the page, which will be used for SEO purposes.
// The title is set to "Sign Up | Sports Academy Hub" and the description is "Create a Sports Academy Hub account".
// The AuthForm component is imported from the "@/components/auth/auth-form" path.
// The AuthForm component is used to render the sign up form. It takes the type "signup " as a prop, which indicates that this form is for signing up users.
// The AuthForm component is expected to handle the logic for signing up users, including form validation and submission.
// The page is exported as a default export, which means it can be used as a route in the Next.js application.
// The metadata object is also exported so that it can be used by Next.js for SEO purposes.
// The page is expected to be located at the "/signup" route in the application.
