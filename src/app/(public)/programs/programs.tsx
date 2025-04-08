import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundImage } from "@/components/ui/background-image"

export const metadata: Metadata = {
  title: "Programs | Sports Academy Hub",
  description: "Explore our sports programs and development initiatives",
}

export default function ProgramsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <BackgroundImage src="/placeholder.svg?height=200&width=1200" alt="Programs Background" className="mb-8 rounded-lg">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Our Programs</h1>
          <p className="text-white/90 max-w-2xl">
            Comprehensive sports programs designed to develop athletes at all levels, from beginners to elite
            performers.
          </p>
        </div>
      </BackgroundImage>

      <Tabs defaultValue="sports" className="mb-8">
        <TabsList>
          <TabsTrigger value="sports">Sports Programs</TabsTrigger>
          <TabsTrigger value="development">Development Programs</TabsTrigger>
          <TabsTrigger value="coaching">Coaching Education</TabsTrigger>
        </TabsList>

        <TabsContent value="sports" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Athletics", "Football", "Basketball", "Rugby", "Volleyball", "Swimming"].map((sport) => (
              <Card key={sport} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${sport}`}
                    alt={sport}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{sport} Program</CardTitle>
                  <CardDescription>Comprehensive training and development</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our {sport.toLowerCase()} program offers specialized training, competition opportunities, and
                    development pathways for athletes of all levels.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/programs/${sport.toLowerCase()}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="development" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Youth Development", "Elite Performance", "Talent Identification", "Sports Science"].map((program) => (
              <Card key={program} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${program.replace(" ", "+")}`}
                    alt={program}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{program}</CardTitle>
                  <CardDescription>Specialized development programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our {program.toLowerCase()} program focuses on building fundamental skills and creating pathways for
                    athletic progression.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/programs/${program.toLowerCase().replace(" ", "-")}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coaching" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Coach Certification", "Mentorship", "Workshops", "Advanced Coaching"].map((program) => (
              <Card key={program} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${program.replace(" ", "+")}`}
                    alt={program}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{program}</CardTitle>
                  <CardDescription>Coach education and development</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our {program.toLowerCase()} program helps coaches develop their skills and knowledge to better
                    support athlete development.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/programs/${program.toLowerCase().replace(" ", "-")}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-8 border rounded-lg bg-muted/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Ready to Join a Program?</h2>
          <p className="text-muted-foreground">Take the first step in your sports journey with Sports Academy Hub</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signup">Register as an Athlete</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact for More Information</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
