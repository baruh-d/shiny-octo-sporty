// app/components/dashboard-shell.tsx
import * as React from "react"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={`flex-1 space-y-6 p-6 md:p-8 ${className || ""}`}>
      <div className="flex flex-col space-y-6">
        {children}
      </div>
    </div>
  )
}