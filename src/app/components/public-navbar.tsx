"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { Logo } from "@/app/components/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Mobile menu button */}
        <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-primary">About</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about/mission">Our Mission</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about/team">Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about/facilities">Facilities</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-primary">Programs</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sports Programs</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/programs/athletics">Athletics</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/programs/football">Football</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/programs/rugby">Rugby</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/programs/basketball">Basketball</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Development Programs</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/programs/youth">Youth Development</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/programs/coaching">Coach Education</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/events" className="text-sm font-medium hover:text-primary">
            Events
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-primary">Resources</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/blog">Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources/training">Training Resources</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources/nutrition">Nutrition Guides</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources/mental-health">Mental Health</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>

          <ThemeToggle />

          <Button asChild variant="outline" size="sm">
            <Link href="/auth/signin">Sign In</Link>
          </Button>

          <Button asChild size="sm">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden p-4 flex flex-col gap-4">
            <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link
              href="/programs"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

