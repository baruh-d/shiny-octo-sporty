import Link from "next/link"
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'
// import { Logo } from "@/components/logo"

export function TopNavbar() {
  return (
    <div className="bg-muted text-muted-foreground py-1 px-4 text-xs">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-1" />
            <span>info@kenyaacademyofsports.org</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            <span>+254 712 345 678</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://www.facebook.com/KenyaAcademyOfSports" target="_blank" className="hover:text-foreground transition-colors">
            <Facebook className="h-3 w-3" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="https://twitter.com/KenyaSports" target="_blank" className="hover:text-foreground transition-colors">
            <Twitter className="h-3 w-3" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://www.instagram.com/kenyaacademyofsports" target="_blank" className="hover:text-foreground transition-colors">
            <Instagram className="h-3 w-3" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

