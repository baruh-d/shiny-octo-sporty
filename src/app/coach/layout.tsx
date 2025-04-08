import type React from "react"
import { Sidebar } from "@/app/components/sidebar"
import { UserNav } from "@/app/components/user-nav"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { Logo } from "@/app/components/logo"

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <Logo size="sm" />
            <h1 className="text-lg font-semibold">Coach Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
