import { BackgroundImage } from "@/components/ui/background-image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:w-1/2 relative">
        <BackgroundImage
          src="/placeholder.svg?height=1080&width=720"
          alt="Sports background"
          className="h-full"
          overlay="gradient"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Integrated Sports Management System</h1>
            <p className="text-xl max-w-md">
              Empowering athletes, coaches, and scouts with cutting-edge tools and resources.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

