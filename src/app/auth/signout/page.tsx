// app/auth/signout/page.tsx
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions"
import { Mountain } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Out | Sports Academy Hub",
  description: "Sign out of your Sports Academy Hub account",
};

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-kas-green/10 p-4">
      <Card className="w-full max-w-md border-kas-green/20 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-10 w-10 text-kas-green" />
            <span className="font-bold text-2xl ml-2 text-kas-green-dark">
              Integrated Sports Management System
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Sign Out
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Are you sure you want to sign out?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signOut}>
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            >
              Confirm Sign Out
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link 
            href="/" 
            className="text-sm text-kas-green hover:text-kas-green-dark hover:underline transition-colors duration-200"
          >
            Return to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}