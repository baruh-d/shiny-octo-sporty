"use client"

import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/components/logo"
import { 
  BarChart3, 
  CalendarDays, 
  Gift, 
  GraduationCap as Graduation, 
  Home, 
  Settings, 
  Trophy, 
  Users, 
  Video, 
  BookOpen, 
  Heart, 
  HeartPulse,
  Dumbbell, 
  Utensils, 
  FileText, 
  MapPin, 
  MessageSquare 
} from 'lucide-react'
// import { useSelector } from "react-redux"
// import type { RootState } from "@/lib/redux/store"

type Route = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

type RoleRoutes = {
  athlete: Route[];
  coach: Route[];
  scout: Route[];
  admin: Route[];
};

export function Sidebar() {
  const pathname = usePathname()
  const params = useParams()
  const currentRole = (params.role as string) || "athlete"
  // const user = useSelector((state: RootState) => state.auth.user)
  
  // Base routes for all users
  const baseRoutes: Route[] = [
    {
      label: "Dashboard",
      icon: Home,
      href: `/${currentRole}/dashboard`,
    },
    {
      label: "Events",
      icon: CalendarDays,
      href: `/${currentRole}/events`,
    },
    {
      label: "Training",
      icon: BookOpen,
      href: `/${currentRole}/training`,
    },
    {
      label: "Videos",
      icon: Video,
      href: `/${currentRole}/videos`,
    },
    {
      label: "Mental Health",
      icon: Heart,
      href: `/${currentRole}/mental-health`,
    },
    {
      label: "Meal Plans",
      icon: Utensils,
      href: `/${currentRole}/meal-plans`,
    },
    {
      label: "Health",
      icon: HeartPulse, 
      href: `/${currentRole}/health`, 
    },
    {
      label: "Donations",
      icon: Gift,
      href: `/${currentRole}/donate`,
    },
  ]
  
  // Role-specific routes
  const roleRoutes: RoleRoutes = {
    athlete: [
      {
        label: "My Performance",
        icon: BarChart3,
        href: `/${currentRole}/performance`,
      },
      {
        label: "Achievements",
        icon: Trophy,
        href: `/${currentRole}/achievements`,
      },
      {
        label: "Workouts",
        icon: Dumbbell,
        href: `/${currentRole}/workouts`,
      },
      {
        label: "Scholarships",
        icon: Graduation,
        href: `/${currentRole}/scholarships`,
      },
    ],
    coach: [
      {
        label: "My Athletes",
        icon: Users,
        href: `/${currentRole}/athletes`,
      },
      {
        label: "Training Plans",
        icon: FileText,
        href: `/${currentRole}/training-plans`,
      },
      {
        label: "Team Management",
        icon: Users,
        href: `/${currentRole}/teams`,
      },
      {
        label: "Performance Analytics",
        icon: BarChart3,
        href: `/${currentRole}/analytics`,
      },
    ],
    scout: [
      {
        label: "Athlete Database",
        icon: Users,
        href: `/${currentRole}/athletes`,
      },
      {
        label: "Watchlist",
        icon: Trophy,
        href: `/${currentRole}/watchlist`,
      },
      {
        label: "Scouting Reports",
        icon: FileText,
        href: `/${currentRole}/reports`,
      },
      {
        label: "Venues",
        icon: MapPin,
        href: `/${currentRole}/venues`,
      },
    ],
    admin: [
      {
        label: "User Management",
        icon: Users,
        href: `/${currentRole}/users`,
      },
      {
        label: "Content Management",
        icon: FileText,
        href: `/${currentRole}/content`,
      },
      {
        label: "Analytics",
        icon: BarChart3,
        href: `/${currentRole}/analytics`,
      },
      {
        label: "System Settings",
        icon: Settings,
        href: `/${currentRole}/settings`,
      },
    ],
  }
  
  // Get role-specific routes based on current role
  const currentRoleRoutes = roleRoutes[currentRole as keyof RoleRoutes] || []
  
  // Combine all routes
  const routes: Route[] = [
    ...baseRoutes,
    ...currentRoleRoutes,
    {
      label: "Settings",
      icon: Settings,
      href: `/${currentRole}/settings`,
    },
  ]

  // Check if route is active
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div className="flex flex-col h-full border-r bg-background w-64">
      <div className="p-6">
        <Logo size="lg" />
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={isActive(route.href) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start transition-colors",
              isActive(route.href) && "bg-kas-green/10 text-kas-green hover:bg-kas-green/20"
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Link 
          href="/support" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Need help? Contact support</span>
        </Link>
      </div>
    </div>
  )
}