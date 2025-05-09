// components/user-nav.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Medal, FileText, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/components/auth/auth-provider"
import { SignOutButton } from "@/app/auth/components/signout-button"

export function UserNav() {
  const { user, userDetails } = useAuth()

  const getInitial = () => {
    if (user?.email) return user.email.charAt(0).toUpperCase()
    if (userDetails?.first_name) return userDetails.first_name.charAt(0).toUpperCase()
    return "U"
  }

  const roleSpecificItems = () => {
    switch(userDetails?.role) {
      case 'athlete':
        return [
          { icon: Medal, label: "Performance", href: "/athlete/performance" },
          { icon: FileText, label: "Training Plans", href: "/athlete/training" }
        ]
      case 'coach':
        return [
          { icon: User, label: "My Athletes", href: "/coach/athletes" },
          { icon: FileText, label: "Training Plans", href: "/coach/training" }
        ]
      case 'admin':
        return [
          { icon: User, label: "User Management", href: "/admin/users" },
          { icon: Settings, label: "System Settings", href: "/admin/settings" }
        ]
      default:
        return []
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={userDetails?.avatar_url || "/avatars/default.png"} 
              alt={user?.email || "User"} 
            />
            <AvatarFallback className="bg-kas-green text-white">
              {getInitial()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userDetails?.first_name || user?.email || "User"}
            </p>
            {userDetails?.role && (
              <p className="text-xs leading-none text-muted-foreground capitalize">
                {userDetails.role}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          
          {roleSpecificItems().map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}