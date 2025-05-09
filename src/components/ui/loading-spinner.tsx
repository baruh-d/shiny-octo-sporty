"use client"

import React from "react"
import { cn } from "@/lib/utils/utils"

interface KenyanFlagLoaderProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  fullPage?: boolean
  text?: string
}

export function KenyanFlagLoader({ 
  size = "md", 
  className, 
  fullPage = false,
  text = "Loading..."
}: KenyanFlagLoaderProps) {
  // Size configuration using your existing theme scales
  const sizeClasses = {
    xs: "h-4 w-4 text-xs",
    sm: "h-6 w-6 text-sm",
    md: "h-8 w-8 text-base",
    lg: "h-10 w-10 text-lg",
    xl: "h-12 w-12 text-xl"
  }

  // Shield size relative to container
  const shieldSize = {
    xs: "h-1 w-1",
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
    xl: "h-5 w-5"
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-2",
      fullPage ? "fixed inset-0 bg-black/50 z-50" : "",
      className
    )}>
      {/* Spinner container - using your configured spin animation */}
      <div className={cn(
        "relative rounded-full",
        sizeClasses[size],
        "animate-spin" // Using your tailwind config's spin animation
      )}>
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-kas-black"></div>
        
        {/* Flag stripes using borders for performance */}
        <div className="absolute inset-0 rounded-full border-t-2 border-kas-red"></div>
        <div className="absolute inset-0 rounded-full border-r-2 border-white"></div>
        <div className="absolute inset-0 rounded-full border-b-2 border-kas-green"></div>
        
        {/* Maasai shield - centered and simplified */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "rounded-full bg-kas-red",
          shieldSize[size]
        )}></div>
      </div>
      
      {/* Optional loading text */}
      {text && (
        <div className={cn(
          "text-white font-medium",
          sizeClasses[size].split(" ")[3] // Match text size to spinner size
        )}>
          {text}
        </div>
      )}
    </div>
  )
}