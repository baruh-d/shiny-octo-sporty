// components/dashboard-header.tsx
import { cn } from "@/lib/utils/utils"
import useAuth from "@/app/hooks/use-auth"

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
  const { user } = useAuth()

  return (
    <div className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      className
    )}>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {heading}
          {user?.role && (
            <span className="ml-2 text-sm font-normal text-muted-foreground capitalize">
              ({user.role})
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
