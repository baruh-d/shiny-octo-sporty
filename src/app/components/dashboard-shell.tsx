"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { Logo } from "./logo"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/utils"

export function DashboardShell({ 
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div 
          className="fixed inset-0 bg-gray-600/75" 
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex w-72 max-w-xs flex-1 flex-col bg-background">
          <div className="h-16 border-b px-6 flex items-center">
            <Logo size="sm" />
          </div>
          <Sidebar className="flex-1 overflow-y-auto" />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r">
        <div className="flex h-16 items-center px-6 border-b">
          <Logo size="sm" />
        </div>
        <Sidebar className="flex-1 overflow-y-auto" />
      </div>

      {/* Main content area */}
      <div className="lg:pl-72 flex flex-col flex-1">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          <div className="flex-1" /> {/* Spacer */}
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>

        <main className={cn(
          "flex-1 overflow-auto p-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}