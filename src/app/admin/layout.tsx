"use client"

import { DashboardShell } from "@/app/components/dashboard-shell"
import { useAuth } from "@/app/components/auth/auth-provider"
import { redirect } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userDetails } = useAuth()
  
  // Redirect if not admin
  if (!userDetails || userDetails.role !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  )
}