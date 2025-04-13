"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/app/components/logo";
import {
  Home,
  Settings,
  Menu,
  BarChart3,
  CalendarDays,
  Gift,
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
  MessageSquare,
} from "lucide-react";
import { Transition } from "@headlessui/react";
import { useAuth } from "@/app/components/auth/auth-provider";

// Define the props for the Sidebar component
interface SidebarProps {
  className?: string; // Optional className prop
}

type Route = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles?: string[]; // Optional role restriction
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const { userDetails } = useAuth();
  const currentRole = userDetails?.role || (params.role as string) || "athlete";

  // All possible routes with role restrictions
  const allRoutes: Route[] = [
    // Base routes for all roles
    { label: "Dashboard", icon: Home, href: `/${currentRole}/dashboard` },
    { label: "Events", icon: CalendarDays, href: `/${currentRole}/events` },
    { label: "Training", icon: BookOpen, href: `/${currentRole}/training` },
    { label: "Videos", icon: Video, href: `/${currentRole}/videos` },
    { label: "Mental Health", icon: Heart, href: `/${currentRole}/mental-health` },
    { label: "Meal Plans", icon: Utensils, href: `/${currentRole}/meal-plans` },
    { label: "Health", icon: HeartPulse, href: `/${currentRole}/health` },
    { label: "Donations", icon: Gift, href: `/${currentRole}/donate` },

    // Athlete-specific
    { label: "My Performance", icon: BarChart3, href: `/${currentRole}/performance`, roles: ["athlete"] },
    { label: "Achievements", icon: Trophy, href: `/${currentRole}/achievements`, roles: ["athlete"] },
    { label: "Workouts", icon: Dumbbell, href: `/${currentRole}/workouts`, roles: ["athlete"] },

    // Coach-specific
    { label: "My Athletes", icon: Users, href: `/${currentRole}/athletes`, roles: ["coach"] },
    { label: "Training Plans", icon: FileText, href: `/${currentRole}/training-plans`, roles: ["coach"] },

    // Scout-specific
    { label: "Athlete Database", icon: Users, href: `/${currentRole}/athletes`, roles: ["scout"] },
    { label: "Venues", icon: MapPin, href: `/${currentRole}/venues`, roles: ["scout"] },

    // Admin-specific
    { label: "User Management", icon: Users, href: `/${currentRole}/users`, roles: ["admin"] },
    { label: "System Settings", icon: Settings, href: `/${currentRole}/settings`, roles: ["admin"] },

    // Settings (all roles)
    { label: "Settings", icon: Settings, href: `/${currentRole}/settings` },
  ];

  // Filter routes based on current role
  const routes = allRoutes.filter((route) => !route.roles || route.roles.includes(currentRole));

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className // Apply the className prop
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <Logo size="lg" />}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <nav className="space-y-1 mt-4 px-2">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md transition-colors",
                isActive(route.href) ? "bg-kas-green/10 text-kas-green" : "hover:bg-muted hover:text-primary",
                collapsed ? "justify-center" : "px-3"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <Transition
                show={!collapsed}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <span>{route.label}</span>
              </Transition>
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t absolute bottom-0 w-[calc(100%-1rem)]">
          <Link
            href="/support"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Need help? Contact support</span>
          </Link>
        </div>
      )}
    </aside>
  );
}