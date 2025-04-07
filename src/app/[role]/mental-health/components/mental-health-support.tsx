"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Phone, Mail, Globe } from "lucide-react"

export function MentalHealthSupport() {
  // This would typically fetch data from your Supabase backend
  const professionals = [
    {
      id: "1",
      name: "Dr. Sarah Kimani",
      title: "Sports Psychologist",
      image: "/placeholder.svg?height=100&width=100",
      specialties: ["Performance Anxiety", "Injury Recovery", "Goal Setting"],
      availability: "Mon, Wed, Fri",
      location: "Nairobi",
      contact: {
        phone: "+254 712 345 678",
        email: "sarah.kimani@example.com",
      },
    },
    {
      id: "2",
      name: "John Omondi",
      title: "Mental Health Counselor",
      image: "/placeholder.svg?height=100&width=100",
      specialties: ["Stress Management", "Depression", "Team Dynamics"],
      availability: "Tue, Thu",
      location: "Virtual",
      contact: {
        phone: "+254 723 456 789",
        email: "john.omondi@example.com",
      },
    },
    {
      id: "3",
      name: "Dr. Mary Wanjiku",
      title: "Clinical Psychologist",
      image: "/placeholder.svg?height=100&width=100",
      specialties: ["Anxiety Disorders", "Depression", "Eating Disorders"],
      availability: "Mon-Fri",
      location: "Mombasa",
      contact: {
        phone: "+254 734 567 890",
        email: "mary.wanjiku@example.com",
      },
    },
  ]

  const resources = [
    {
      id: "1",
      name: "Kenya Mental Health Hotline",
      description: "24/7 crisis support and mental health resources",
      phone: "1199",
      website: "https://mentalhealthhotline.ke",
    },
    {
      id: "2",
      name: "Athletes Mental Health Alliance",
      description: "Support network specifically for athletes",
      phone: "+254 700 123 456",
      website: "https://athletesmentalhealth.org",
    },
    {
      id: "3",
      name: "Sports Psychology Association of Kenya",
      description: "Find certified sports psychologists",
      phone: "+254 711 234 567",
      website: "https://spak.org",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mental Health Professionals</CardTitle>
          <CardDescription>
            Connect with mental health professionals who specialize in working with athletes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {professionals.map((professional) => (
              <div key={professional.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={professional.image} alt={professional.name} />
                  <AvatarFallback>{professional.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-medium">{professional.name}</h3>
                    <p className="text-sm text-muted-foreground">{professional.title}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {professional.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{professional.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{professional.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{professional.contact.phone}</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support Resources</CardTitle>
          <CardDescription>Hotlines and organizations providing mental health support.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex flex-col md:flex-row justify-between gap-4 p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{resource.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kas-green hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule a Consultation</CardTitle>
          <CardDescription>Book a confidential consultation with a mental health professional.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <p className="text-center text-muted-foreground mb-4">
            Our online booking system allows you to schedule appointments with mental health professionals at your
            convenience.
          </p>
          <Button>Book Appointment</Button>
        </CardContent>
      </Card>
    </div>
  )
}

