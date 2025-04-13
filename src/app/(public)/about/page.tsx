import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Award, Users, Target, BookOpen, Calendar, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Kenya Academy of Sports",
  description: "Learn about our mission, vision, and the impact of Kenya Academy of Sports in developing athletic talent across the nation",
}

export default function AboutPage() {
  const achievements = [
    { number: "5,000+", label: "Athletes Trained" },
    { number: "150+", label: "National Champions" },
    { number: "42", label: "Olympic Athletes" },
    { number: "23", label: "Partner Institutions" }
  ]

  const teamMembers = [
    {
      name: "Dr. Sarah Wangari",
      position: "Chief Executive Officer",
      bio: "Former Olympic athlete with 15+ years in sports administration and development.",
      image: "/placeholder.svg?height=320&width=320&text=Dr.+Sarah"
    },
    {
      name: "James Ochieng",
      position: "Head of Athlete Development",
      bio: "Expert in talent identification with experience coaching national teams.",
      image: "/placeholder.svg?height=320&width=320&text=James+O"
    },
    {
      name: "Elizabeth Njeri",
      position: "Director of Coaching Excellence",
      bio: "International coaching certification expert and former national coach.",
      image: "/placeholder.svg?height=320&width=320&text=Elizabeth+N"
    },
    {
      name: "Daniel Kipchoge",
      position: "Technology & Innovation Lead",
      bio: "Pioneering sports technology integration across East African sports programs.",
      image: "/placeholder.svg?height=320&width=320&text=Daniel+K"
    }
  ]

  const partners = [
    { name: "Ministry of Sports, Culture and Heritage", logo: "/placeholder.svg?height=160&width=240&text=Ministry+of+Sports" },
    { name: "National Olympic Committee of Kenya", logo: "/placeholder.svg?height=160&width=240&text=NOCK" },
    { name: "Athletics Kenya", logo: "/placeholder.svg?height=160&width=240&text=Athletics+Kenya" },
    { name: "Kenya Rugby Union", logo: "/placeholder.svg?height=160&width=240&text=Kenya+Rugby" },
    { name: "Football Kenya Federation", logo: "/placeholder.svg?height=160&width=240&text=FKF" },
    { name: "Kenya Basketball Federation", logo: "/placeholder.svg?height=160&width=240&text=Basketball+Fed" }
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Sports+Academy+Track"
            alt="Kenya Academy of Sports Track Field"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
              Established 2013
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Developing Kenya&apos;s Athletic Excellence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Africa&apos;s premier sports academy dedicated to identifying, nurturing, and developing athletic talent across Kenya through innovation, science, and world-class coaching.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/programs">
                  <span className="flex items-center gap-2">
                    Explore Our Programs
                    <ChevronRight size={16} />
                  </span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-12 bg-accent/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{item.number}</p>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                Our Purpose
              </div>
              <h2 className="text-3xl font-bold mb-6">Mission & Vision</h2>
              <div className="mb-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To transform sports development in Kenya by providing world-class training facilities, expert coaching, and innovative programs that identify, nurture, and elevate athletic talent from grassroots to international competition.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be Africa&apos;s premier sports development institution, recognized globally for producing elite athletes who compete at the highest international levels while promoting sporting excellence, health, and unity across Kenya.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="rounded-full">
                <Link href="/our-story">
                  <span className="flex items-center gap-2">
                    Our Full Story
                    <ChevronRight size={16} />
                  </span>
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=1000&width=800&text=Training+at+KAS"
                alt="Athletes training at Kenya Academy of Sports"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Our Foundation
            </div>
            <h2 className="text-3xl font-bold">Core Values</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our approach to sports development and athlete support
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-background p-8 rounded-xl border shadow-sm">
              <Award className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We pursue excellence in all aspects of our operations, from training methodologies to facility management, empowering athletes to achieve their personal best.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Inclusivity</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to creating pathways for all talented athletes across Kenya, regardless of socioeconomic background, geography, gender, or physical ability.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm">
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace cutting-edge sports science, technology, and training methodologies to give our athletes competitive advantages on the global stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              World-Class Facilities
            </div>
            <h2 className="text-3xl font-bold">Our Training Center</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Located at Kasarani Sports Complex in Nairobi, our facilities provide athletes with everything they need to excel
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=640&width=800&text=Athletic+Track"
                alt="Olympic standard athletic track"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-white mb-1">Olympic Standard Track</h3>
                  <p className="text-white/80 text-sm">IAAF certified 400m track with spectator facilities</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=640&width=800&text=High+Performance+Center"
                alt="High Performance Training Center"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-white mb-1">High Performance Center</h3>
                  <p className="text-white/80 text-sm">State-of-the-art strength and conditioning facility</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=640&width=800&text=Sports+Science+Lab"
                alt="Sports Science Laboratory"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-white mb-1">Sports Science Lab</h3>
                  <p className="text-white/80 text-sm">Physiological testing and performance analysis</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/facilities">View All Facilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Meet Our Experts
            </div>
            <h2 className="text-3xl font-bold">Leadership Team</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of sports professionals brings decades of experience in athlete development, coaching, and sports management
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-background rounded-xl overflow-hidden border shadow-sm">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/team">View Complete Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Collaborative Success
            </div>
            <h2 className="text-3xl font-bold">Our Partners</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading sports organizations and institutions to create opportunities for Kenyan athletes
            </p>
          </div>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-background border rounded-lg p-4 flex items-center justify-center h-24">
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  width={120} 
                  height={60} 
                  className="max-h-12 w-auto" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold">Key Milestones</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The evolution of Kenya Academy of Sports since our founding
            </p>
          </div>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border md:before:mx-auto md:before:ml-0 md:space-y-12">
            {[
              { year: "2013", title: "Founding", description: "Established by an act of Parliament as Kenya's premier sports development institution" },
              { year: "2016", title: "Facility Completion", description: "Opening of the main campus at Kasarani Sports Complex in Nairobi" },
              { year: "2018", title: "First Olympic Medalists", description: "Academy graduates win 3 medals at international competitions" },
              { year: "2022", title: "Digital Transformation", description: "Launch of integrated sports management system for athlete development" },
              { year: "2024", title: "Regional Expansion", description: "Opening of training centers in Eldoret, Kisumu, and Mombasa" }
            ].map((milestone, i) => (
              <div key={i} className="relative flex flex-col items-start md:flex-row md:items-center md:justify-between md:space-x-4">
                <div className="flex items-center space-x-4 md:space-x-reverse md:space-x-8">
                  <div className="flex h-10 w-10 rounded-full bg-primary text-primary-foreground items-center justify-center z-10 relative md:order-1">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="text-left md:text-right">
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                    <time className="text-sm text-primary font-semibold">{milestone.year}</time>
                  </div>
                </div>
                <div className="ml-14 md:ml-0 md:max-w-lg">
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/5 border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join our sports community?</h2>
              <p className="text-muted-foreground max-w-xl">
                Whether you&apos;re an athlete looking to develop your skills, a coach seeking certification, or an organization interested in partnership, we&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/programs/apply">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}