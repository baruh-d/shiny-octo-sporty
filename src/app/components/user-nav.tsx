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
import { useAuth } from "@/app/components/auth/auth-provider"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import Link from "next/link"
import { User, Medal, FileText } from "lucide-react"

export function UserNav() {
  const { signOut } = useAuth()
  const user = useSelector((state: RootState) => state.auth.user)

  // Get the first letter of the email for the avatar fallback
  const getInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt={user?.email || "User"} />
            <AvatarFallback>{getInitial()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
            <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role || "User"}</p>
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
          
          {user?.role === 'athlete' && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/athlete/performance">
                  <Medal className="mr-2 h-4 w-4" />
                  <span>Performance</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/athlete/training">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Training Plans</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          
                {user?.role === 'coach' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/coach/athletes">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Athletes</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/coach/training">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Training Plans</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
              )
            }

