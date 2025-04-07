import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react'
// import { SportsHeroAnimation } from "@/components/animations/sports-hero-animation"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Kenyan athletes running"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Empowering Kenyan Sports Excellence</h1>
              <p className="text-xl mb-8">
                A comprehensive platform connecting athletes, coaches, scouts, and administrators to nurture sporting
                talent across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              {/* <SportsHeroAnimation className="h-[400px]" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Transforming Kenyan Sports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Connect</CardTitle>
                <CardDescription>Connect athletes with coaches and scouts across the country</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Build your profile, showcase your talents, and get discovered by top coaches and scouts from Kenya and
                  beyond.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Develop</CardTitle>
                <CardDescription>Access training resources and performance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Track your progress, access personalized training plans, and receive feedback from professional
                  coaches.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Compete</CardTitle>
                <CardDescription>Discover events and competitions nationwide</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Stay updated on upcoming events, register for competitions, and showcase your skills on the national
                  stage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Kenyan Sports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Kenyan Sports Excellence</h2>
              <p className="mb-4">
                Kenya has established itself as a global powerhouse in athletics, producing world-class long-distance
                runners who have dominated international competitions for decades.
              </p>
              <p className="mb-4">
                Beyond athletics, Kenya is developing talent in rugby, football, volleyball, and many other sports,
                creating a diverse sporting culture that celebrates excellence and determination.
              </p>
              <p className="mb-6">
                Our platform aims to nurture this talent by providing the tools, connections, and resources needed to
                develop the next generation of Kenyan sports stars.
              </p>
              <Button asChild>
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Kenyan athletes celebrating"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming National Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Event+${i}`}
                    alt={`Event ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>National Athletics Championship {2023 + i}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {`${i * 2 + 10}-${i * 2 + 12} June, 2023`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" /> Kasarani Stadium, Nairobi
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" /> 9:00 AM - 6:00 PM
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/events">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sports Organizations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sports Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>National Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="https://sportskenya.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      Ministry of Sports, Culture and Heritage <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.nock.or.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      National Olympic Committee of Kenya <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://athletics-kenya.or.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      Athletics Kenya <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.fkf.or.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      Football Kenya Federation <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.kru.co.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      Kenya Rugby Union <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>International Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="https://www.olympic.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      International Olympic Committee <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.fifa.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      FIFA <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.worldathletics.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      World Athletics <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.world.rugby/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      World Rugby <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.fiba.basketball/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary"
                    >
                      FIBA <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Kenyan Sports Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you&apos;re an athlete looking to showcase your talent, a coach seeking promising prospects, or a scout
            searching for the next big star, our platform has everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

