import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import ReduxProvider from "@/lib/redux/provider"
import { AuthProvider } from "@/app/components/auth/auth-provider"
import { TopNavbar } from "@/app/components/top-navbar"
import { Footer } from "@/app/components/footer"
import { Toaster } from "@/components/toaster"
import { Suspense } from "react"
import { KenyanFlagLoader } from "@/components/ui/loading-spinner"
import { constructMetadata } from "@/lib/utils/metadata"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = constructMetadata({
  title: "Sports Academy Hub | Empowering Kenyan Athletes",
  description: "A comprehensive platform connecting athletes, coaches, scouts, and administrators to nurture sporting talent across Kenya.",
  keywords: ["sports", "kenya", "athletes", "coaches", "scouts", "training", "sports academy", "athletics"],
  openGraphImages: [{
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Sports Academy Hub",
  }],
  twitterCardType: "summary_large_image"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <TopNavbar />
                <Suspense fallback={<KenyanFlagLoader fullPage />}>
                  {children}
                </Suspense>
                <Toaster />
                <Footer />
              </div>
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}