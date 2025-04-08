import { Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center">
          <Mountain className="h-16 w-16 text-kas-green" />
        </div>
        <h1 className="text-3xl font-bold">You&apos;re offline</h1>
        <p className="text-muted-foreground max-w-md">
          It looks like you&apos;re currently offline. Please check your internet connection and try again.
        </p>
        <Button asChild>
          <Link href="/">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}
