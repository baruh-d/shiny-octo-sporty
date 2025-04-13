// components/public-navbar.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { Menu, X } from "lucide-react"
// import { Logo } from "@/app/components/logo"
import { useAuth } from "@/app/components/auth/auth-provider"

const navItems = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    subItems: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/about/mission" },
      { label: "Our Team", href: "/about/team" },
      { label: "Facilities", href: "/about/facilities" }
    ]
  },
  {
    label: "Programs",
    subItems: [
      { label: "Athletics", href: "/programs/athletics" },
      { label: "Football", href: "/programs/football" },
      { label: "Rugby", href: "/programs/rugby" },
      { label: "Basketball", href: "/programs/basketball" },
      { label: "Youth Development", href: "/programs/youth" },
      { label: "Coach Education", href: "/programs/coaching" }
    ]
  },
  { label: "Events", href: "/events" },
  {
    label: "Blog", 
    href: "/blog"
  },
  { label: "Contact", href: "/contact" }
]

export function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="bg-background sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
        {/* <Logo /> */}
          <Link href="/" className="text-xl font-bold">Kenyan Sports Platform</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              item.href && !item.subItems ? (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label} className="relative group">
                  <button className="hover:text-primary transition-colors flex items-center gap-1">
                    {item.label}
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-accent rounded"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <Button asChild variant="outline" size="sm">
                <Link href={`/${user.user_metadata?.role || 'dashboard'}`}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth/signin">
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="bg-kas-green text-primary-foreground hover:opacity-90" size="sm">
                  <Link href="/auth/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="block md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 flex flex-col gap-4 border-t">
            {navItems.map((item) => (
              <div key={item.label || item.href} className="flex flex-col gap-2">
                {item.href && !item.subItems ? (
                  <Link 
                    href={item.href}
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <span className="font-medium">{item.label}</span>
                    <div className="ml-2 flex flex-col gap-1">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            <div className="flex flex-col gap-4 pt-4 border-t">
              <ThemeToggle />
              <div className="flex gap-4">
                {user ? (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link 
                      href={`/${user.user_metadata?.role || 'dashboard'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm" className="w-1/2">
                      <Link 
                        href="/auth/signin" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="bg-kas-green text-primary-foreground hover:opacity-90 w-1/2" size="sm">
                      <Link 
                        href="/auth/signup" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}