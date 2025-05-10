import Link from "next/link";
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export function TopNavbar() {
  return (
    <div className="bg-muted text-muted-foreground py-2 px-4 text-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-4 mb-2 sm:mb-0">
          <div className="flex items-center hover:text-foreground transition-colors">
            <FaEnvelope className="mr-2 text-xs" />
            <a 
              href="mailto:info@kenyaacademyofsports.org" 
              className="text-xs hover:text-primary"
            >
              info@kenyaacademyofsports.org
            </a>
          </div>
          <div className="flex items-center hover:text-foreground transition-colors">
            <FaPhoneAlt className="mr-2 text-xs" />
            <a 
              href="tel:+254712345678" 
              className="text-xs hover:text-primary"
            >
              +254 712 345 678
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="https://www.facebook.com/KenyaAcademyOfSports" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors p-1 rounded-full hover:bg-accent"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-xs" />
          </Link>
          <Link 
            href="https://twitter.com/KenyaSports" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors p-1 rounded-full hover:bg-accent"
            aria-label="Twitter"
          >
            <FaTwitter className="text-xs" />
          </Link>
          <Link 
            href="https://www.instagram.com/kenyaacademyofsports" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors p-1 rounded-full hover:bg-accent"
            aria-label="Instagram"
          >
            <FaInstagram className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}