import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import ReduxProvider from "@/lib/redux/provider"
import { AuthProvider } from "@/app/components/auth/auth-provider"
import { TopNavbar } from "@/app/components/top-navbar"
import { Footer } from "@/app/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://sportsacademyhub.com"),
  title: {
    default: "Sports Academy Hub | Empowering Kenyan Athletes",
    template: "%s | Sports Academy Hub",
  },
  description:
    "A comprehensive platform connecting athletes, coaches, scouts, and administrators to nurture sporting talent across Kenya.",
  keywords: ["sports", "kenya", "athletes", "coaches", "scouts", "training", "sports academy", "athletics"],
  authors: [{ name: "Sports Academy Hub Team" }],
  creator: "Sports Academy Hub",
  publisher: "Sports Academy Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Sports Academy Hub | Empowering Kenyan Athletes",
    description:
      "A comprehensive platform connecting athletes, coaches, scouts, and administrators to nurture sporting talent across Kenya.",
    siteName: "Sports Academy Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sports Academy Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Academy Hub | Empowering Kenyan Athletes",
    description:
      "A comprehensive platform connecting athletes, coaches, scouts, and administrators to nurture sporting talent across Kenya.",
    images: ["/og-image.jpg"],
    creator: "@sportsacademyhub",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <TopNavbar />
                {children}
                <Footer />
              </div>
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

