// app/[role]/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoleNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            The dashboard page you were looking for doesn&apos;t exist or you might not have permission to access it.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/">
              Return to Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}