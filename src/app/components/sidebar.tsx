"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/components/logo"
import { BarChart3, CalendarDays, Gift, GraduationCapIcon as Graduation, Home, Settings, Trophy, Users, Video, BookOpen, Heart, Dumbbell, Utensils, FileText, MapPin, MessageSquare } from 'lucide-react'
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"

export function Sidebar() {
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user)
  
  // Base routes for all users
  const baseRoutes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Events",
      icon: CalendarDays,
      href: "/events",
    },
    {
      label: "Training",
      icon: BookOpen,
      href: "/training",
    },
    {
      label: "Videos",
      icon: Video,
      href: "/videos",
    },
    {
      label: "Mental Health",
      icon: Heart,
      href: "/mental-health",
    },
    {
      label: "Meal Plans",
      icon: Utensils,
      href: "/meal-plans",
    },
    {
      label: "Donations",
      icon: Gift,
      href: "/donate",
    },
  ]
  
  // Role-specific routes
  const roleRoutes = {
    athlete: [
      {
        label: "My Performance",
        icon: BarChart3,
        href: "/athlete/performance",
      },
      {
        label: "Achievements",
        icon: Trophy,
        href: "/athlete/achievements",
      },
      {
        label: "Workouts",
        icon: Dumbbell,
        href: "/athlete/workouts",
      },
      {
        label: "Scholarships",
        icon: Graduation,
        href: "/scholarships",
      },
    ],
    coach: [
      {
        label: "My Athletes",
        icon: Users,
        href: "/coach/athletes",
      },
      {
        label: "Training Plans",
        icon: FileText,
        href: "/coach/training-plans",
      },
      {
        label: "Team Management",
        icon: Users,
        href: "/coach/teams",
      },
      {
        label: "Performance Analytics",
        icon: BarChart3,
        href: "/coach/analytics",
      },
    ],
    scout: [
      {
        label: "Athlete Database",
        icon: Users,
        href: "/scout/athletes",
      },
      {
        label: "Watchlist",
        icon: Trophy,
        href: "/scout/watchlist",
      },
      {
        label: "Scouting Reports",
        icon: FileText,
        href: "/scout/reports",
      },
      {
        label: "Venues",
        icon: MapPin,
        href: "/scout/venues",
      },
    ],
    admin: [
      {
        label: "User Management",
        icon: Users,
        href: "/admin/users",
      },
      {
        label: "Content Management",
        icon: FileText,
        href: "/admin/content",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        href: "/admin/analytics",
      },
      {
        label: "System Settings",
        icon: Settings,
        href: "/admin/settings",
      },
    ],
  }
  
  // Combine base routes with role-specific routes
  const routes = [
    ...baseRoutes,
    ...(user?.role && roleRoutes[user.role as keyof typeof roleRoutes] ? roleRoutes[user.role as keyof typeof roleRoutes] : []),
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className="flex flex-col h-screen border-r bg-background w-64">
      <div className="p-6">
        <Logo size="lg" />
      </div>
      <div className="flex-1 px-3 py-2 space-y-1">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === route.href && "bg-kas-green/10 text-kas-green hover:bg-kas-green/20 hover:text-kas-green",
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>Need help? Contact support</span>
        </div>
      </div>
    </div>
  )
}

