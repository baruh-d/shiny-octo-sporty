import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | Sports Academy Hub",
  description: "Learn about our mission, vision, and the team behind Sports Academy Hub",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">About Integrated Sports Management System</h1>
        <p className="mt-2 text-muted-foreground">Empowering athletes, coaches, and scouts across Kenya</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            Sports Academy Hub is dedicated to transforming sports development in Kenya by creating a comprehensive
            digital platform that connects athletes, coaches, scouts, and administrators.
          </p>
          <p className="mb-4">
            We aim to identify, nurture, and showcase sporting talent across the country, providing the tools,
            resources, and connections needed to help athletes reach their full potential.
          </p>
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600&text=Our+Mission"
            alt="Sports Academy Hub Mission"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-medium mb-2">Excellence</h3>
            <p>We strive for excellence in everything we do, from platform development to athlete support.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-medium mb-2">Inclusivity</h3>
            <p>We believe in creating opportunities for all athletes regardless of background or location.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-medium mb-2">Innovation</h3>
            <p>We continuously innovate to provide cutting-edge tools and resources for sports development.</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src={`/placeholder.svg?height=160&width=160&text=Team+Member+${i}`}
                  alt={`Team Member ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">Team Member {i}</h3>
              <p className="text-sm text-muted-foreground">Position</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Partners</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 border rounded-lg flex items-center justify-center h-32">
              <p className="text-muted-foreground">Partner Logo {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
