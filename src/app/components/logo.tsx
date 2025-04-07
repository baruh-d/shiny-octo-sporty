import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
  showText?: boolean
}

export function Logo({ className, size = "md", variant = "default", showText = true }: LogoProps) {
  const sizeMap = {
    sm: { logo: 32, text: "text-lg" },
    md: { logo: 40, text: "text-xl" },
    lg: { logo: 48, text: "text-2xl" },
  }

  const textColorClass = variant === "white" ? "text-white" : "text-foreground"

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Image
          src="/logo.png"
          alt="Kenya Academy of Sports Logo"
          width={sizeMap[size].logo}
          height={sizeMap[size].logo}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", sizeMap[size].text, textColorClass)}>Sports Academy Hub</span>
      )}
    </Link>
  )
}

