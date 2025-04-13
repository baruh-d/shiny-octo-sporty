// app/unauthorized/page.tsx
import type { Metadata } from "next"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: "Access Denied | KAS Sports",
  description: "You don't have permission to access this page",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Access Denied | KAS Sports",
    description: "Unauthorized access attempt",
    url: "https://yourdomain.com/unauthorized",
    siteName: "KAS Sports",
    images: [
      {
        url: "/images/unauthorized-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Access Denied | KAS Sports",
    description: "Unauthorized access attempt",
    images: ["/images/unauthorized-og.png"],
  },
}

export default function UnauthorizedPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              You don&apos;t have permission to view this page. Please sign in with the correct account.
            </p>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button asChild variant="secondary">
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

