import Link from "next/link";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import { IconType } from "react-icons";
import { Logo } from "@/app/components/logo";

// Component for social icons with sleek styling
interface SocialLinkProps {
  href: string;
  icon: IconType;
  label: string;
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => (
  <Link 
    href={href} 
    target="_blank" 
    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:bg-primary hover:text-primary-foreground"
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </Link>
);

// Component for footer links with elegant styling
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link 
      href={href} 
      className="inline-block py-2 text-muted-foreground transition-all hover:translate-x-1 hover:text-primary"
    >
      {children}
    </Link>
  </li>
);

// Component for contact items with improved styling
interface ContactItemProps {
  icon: IconType;
  children: React.ReactNode;
}

const ContactItem = ({ icon: Icon, children }: ContactItemProps) => (
  <li className="flex items-center gap-4 mb-4">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-primary">
      <Icon className="h-4 w-4" />
    </span>
    <span className="text-muted-foreground">{children}</span>
  </li>
);

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="h-10 w-10" showText={false} size="lg" />
              <h3 className="text-xl font-bold text-primary">Kenya Academy of Sports</h3>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Empowering athletes, coaches, and scouts with cutting-edge tools and resources to achieve excellence in
              sports.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="https://www.facebook.com/KenyaAcademyOfSports" icon={FaFacebookF} label="Facebook" />
              <SocialLink href="https://www.instagram.com/kenyaacademyofsports" icon={FaInstagram} label="Instagram" />
              <SocialLink href="https://twitter.com/KenyaSports" icon={FaTwitter} label="Twitter" />
              <SocialLink href="https://www.youtube.com/c/KenyaAcademyOfSports" icon={FaYoutube} label="YouTube" />
            </div>
          </div>
          
          {/* Programs section */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-primary">
              Programs
            </h3>
            <ul className="space-y-1 text-sm">
              <FooterLink href="/programs/athletics">Athletics</FooterLink>
              <FooterLink href="/programs/football">Football</FooterLink>
              <FooterLink href="/programs/rugby">Rugby</FooterLink>
              <FooterLink href="/programs/basketball">Basketball</FooterLink>
              <FooterLink href="/programs/volleyball">Volleyball</FooterLink>
              <FooterLink href="/programs/swimming">Swimming</FooterLink>
            </ul>
          </div>
          
          {/* Resources section */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-primary">
              Resources
            </h3>
            <ul className="space-y-1 text-sm">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/events">Events Calendar</FooterLink>
              <FooterLink href="/training">Training Resources</FooterLink>
              <FooterLink href="/mental-health">Mental Health</FooterLink>
              <FooterLink href="/nutrition">Nutrition</FooterLink>
              <FooterLink href="/scholarships">Scholarships</FooterLink>
            </ul>
          </div>
          
          {/* Contact section */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-primary">
              Contact Us
            </h3>
            <ul>
              <ContactItem icon={FaEnvelope}>
                info@kenyaacademyofsports.org
              </ContactItem>
              <ContactItem icon={FaPhone}>
                +254 712 345 678
              </ContactItem>
              <ContactItem icon={FaMapMarkerAlt}>
                Kenya Academy of Sports Complex, 
                Kasarani Stadium, Nairobi, Kenya
              </ContactItem>
            </ul>
          </div>
        </div>
        
        {/* Copyright section with subtle styling */}
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="flex flex-wrap items-center justify-center gap-3 text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Kenya Academy of Sports.</span>
            <span className="hidden md:inline">|</span>
            <span>All rights reserved.</span>
          </p>
          <div className="mt-4 flex justify-center space-x-8 text-sm">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}