import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react"
import { EventsService } from "@/lib/services/events-service"

// Generate static params for all events
export async function generateStaticParams() {
  try {
    const events = await EventsService.getEvents()
    return events.map((event) => ({
      slug: event.slug,
    }))
  } catch (error) {
    console.error("Error generating static params for events:", error)
    return []
  }
}

// Generate metadata for each event
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const event = await EventsService.getEventBySlug(params.slug)

    if (!event) {
      return {
        title: "Event Not Found",
        description: "The requested event could not be found.",
      }
    }

    return {
      title: event.title,
      description: event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        type: "article",
        images: [
          {
            url: event.image || "/og-images/events.jpg",
            width: 1200,
            height: 630,
            alt: event.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description: event.description,
        images: [event.image || "/og-images/events.jpg"],
      },
    }
  } catch (error) {
    console.error("Error generating metadata for event:", error)
    return {
      title: "Event Details",
      description: "Sports Academy Hub event details",
    }
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await EventsService.getEventBySlug(params.slug)
  
  if (!event) {
    notFound()
  }
  
  const relatedEvents = await EventsService.getRelatedEvents(params.slug)
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Link href="/events" className="inline-flex items-center mb-6 text-sm hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all events
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
            <Image 
              src={event.image || `/placeholder.svg?height=800&width=1200&text=${event.category}`}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Date</span>
              <span className="text-sm text-muted-foreground">{event.date}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Time</span>
              <span className="text-sm text-muted-foreground">{event.time}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <MapPin className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Location</span>
              <span className="text-sm text-muted-foreground">{event.location}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Attendees</span>
              <span className="text-sm text-muted-foreground">{event.attendees}</span>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <h2>About This Event</h2>
            <p>{event.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>What to Expect</h2>
            <p>
              Join us for an exciting event where you&apos;ll have the opportunity to:
            </p>
            <ul>
              <li>Meet fellow sports enthusiasts</li>
              <li>Learn from experienced coaches</li>
              <li>Participate in hands-on activities</li>
              <li>Network with other participants</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <h2 className="text-xl font-bold mb-4">Related Events</h2>
            <div className="space-y-4">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.slug}
                  href={`/events/${relatedEvent.slug}`}
                  className="block p-4 bg-muted rounded-lg hover:bg-muted/80"
                >
                  <h3 className="font-medium mb-2">{relatedEvent.title}</h3>
                  <p className="text-sm text-muted-foreground">{relatedEvent.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}