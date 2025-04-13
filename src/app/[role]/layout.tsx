"use-client"

import { Sidebar } from "@/app/components/sidebar"
import { UserNav } from "@/app/components/user-nav"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { Logo } from "@/app/components/logo"
// import { notFound } from "next/navigation"

export default function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { role: "athlete" | "coach" | "scout" | "admin" }
}) {
  // // Validate role against existing folder structure
  // const validRoles = ["athlete", "coach", "scout", "admin"]
  // if (!validRoles.includes(params.role)) {
  //   notFound()
  // }

  // Role-specific titles
  const roleTitles = {
    athlete: "Athlete Dashboard",
    coach: "Coach Dashboard",
    scout: "Scout Dashboard",
    admin: "Admin Dashboard",
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-64"> {/* Added padding for sidebar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <Logo size="sm" />
            <h1 className="text-lg font-semibold">{roleTitles[params.role]}</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main> {/* Added padding */}
      </div>
    </div>
  )
}