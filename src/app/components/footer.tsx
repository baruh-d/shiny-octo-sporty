import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from "@/app/components/logo"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Logo className="mb-4" showText={false} size="lg" />
            <h3 className="mb-2 text-lg font-bold">Kenya Academy of Sports</h3>
            <p className="mb-4 text-sm">
              Empowering athletes, coaches, and scouts with cutting-edge tools and resources to achieve excellence in
              sports.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/KenyaAcademyOfSports" target="_blank" className="hover:text-primary-foreground/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/kenyaacademyofsports" target="_blank" className="hover:text-primary-foreground/80">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com/KenyaSports" target="_blank" className="hover:text-primary-foreground/80">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.youtube.com/c/KenyaAcademyOfSports" target="_blank" className="hover:text-primary-foreground/80">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs/athletics" className="hover:underline">
                  Athletics
                </Link>
              </li>
              <li>
                <Link href="/programs/football" className="hover:underline">
                  Football
                </Link>
              </li>
              <li>
                <Link href="/programs/rugby" className="hover:underline">
                  Rugby
                </Link>
              </li>
              <li>
                <Link href="/programs/basketball" className="hover:underline">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/programs/volleyball" className="hover:underline">
                  Volleyball
                </Link>
              </li>
              <li>
                <Link href="/programs/swimming" className="hover:underline">
                  Swimming
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:underline">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:underline">
                  Training Resources
                </Link>
              </li>
              <li>
                <Link href="/mental-health" className="hover:underline">
                  Mental Health
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="hover:underline">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:underline">
                  Scholarships
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@kenyaacademyofsports.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Kenya Academy of Sports Complex, Kasarani Stadium, Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kenya Academy of Sports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

