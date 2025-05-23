"use client"

import { Sidebar } from "@/app/components/sidebar"
import { UserNav } from "@/app/components/user-nav"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { Logo } from "@/app/components/logo"
import { notFound } from "next/navigation"

import { UserRole, UserRoles } from "@/types/consolidated-types"

// Derive valid roles from the UserRoles constant
const validRoles = Object.values(UserRoles) as UserRole[]

// Role-specific titles
const roleTitles: Record<UserRole, string> = {
  athlete: "Athlete Dashboard",
  coach: "Coach Dashboard",
  scout: "Scout Dashboard",
  admin: "Admin Dashboard",
}

// Main component
export default function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { role: string }
}) {
  // Type guard using UserRole
  const isValidRole = (role: string): role is UserRole => {
    return validRoles.includes(role as UserRole)
  }

  // Validate route param
  if (!isValidRole(params.role)) {
    notFound()
  }

  const pageTitle = roleTitles[params.role]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <Logo size="sm" />
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
