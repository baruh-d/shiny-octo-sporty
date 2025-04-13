// components/dashboard-header.tsx
import { cn } from "@/lib/utils"
import { useAuth } from "@/app/components/auth/auth-provider"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  const { userDetails } = useAuth()
  
  return (
    <div className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      className
    )}>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {heading}
          {userDetails?.role && (
            <span className="ml-2 text-sm font-normal text-muted-foreground capitalize">
              ({userDetails.role})
            </span>
          )}
        </h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  )
}