// import type { Metadata } from "next"
// import Image from "next/image"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react"
// import { EventsService } from "@/lib/services/events-service"

// export async function generateStaticParams() {
//   const events = await EventsService.getEvents()
//   return events.map((event) => ({ slug: event.slug }))
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string }
// }): Promise<Metadata> {
//   const event = await EventsService.getEventBySlug(params.slug)
//   if (!event) {
//     return {
//       title: "Event Not Found",
//       description: "The requested event could not be found.",
//     }
//   }

//   return {
//     title: `${event.title} | Sports Academy Hub`,
//     description: event.description,
//     openGraph: {
//       title: event.title,
//       description: event.description,
//       images: [{
//         url: event.image || "/og-images/events.jpg",
//         width: 1200,
//         height: 630,
//         alt: event.title,
//       }],
//     },
//   }
// }

// export default async function EventPage({ params }: { params: { slug: string } }) {
//   const event = await EventsService.getEventBySlug(params.slug)
//   if (!event) notFound()

//   const relatedEvents = await EventsService.getRelatedEvents(params.slug)

//   return (
//     <div className="container mx-auto py-10 px-4 md:px-6">
//       <Link href="/events" className="inline-flex items-center mb-6 text-sm hover:text-primary">
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to all events
//       </Link>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main content area */}
//         <div className="lg:col-span-2">
//           {/* Event image */}
//           <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
//             <Image 
//               src={event.image || `/placeholder.svg?text=${event.category}`}
//               alt={event.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           {/* Event details */}
//           <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
//           {/* Info cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <InfoCard icon={Calendar} label="Date" value={event.date} />
//             <InfoCard icon={Clock} label="Time" value={event.time} />
//             <InfoCard icon={MapPin} label="Location" value={event.location} />
//             <InfoCard icon={Users} label="Attendees" value={event.attendees.toString()} />
//           </div>

//           {/* Description */}
//           <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
//             <h2>About This Event</h2>
//             <p>{event.description}</p>
//             {/* ... rest of your content ... */}
//           </div>
//         </div>

//         {/* Related events sidebar */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-8">
//             <h2 className="text-xl font-bold mb-4">Related Events</h2>
//             <div className="space-y-4">
//               {relatedEvents.map((event) => (
//                 <EventCard key={event.slug} event={event} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Helper components (extract these to separate files if needed)
// function InfoCard({ icon: Icon, label, value }: { 
//   icon: React.ComponentType<{ className?: string }>
//   label: string
//   value: string 
// }) {
//   return (
//     <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
//       <Icon className="h-6 w-6 mb-2 text-primary" />
//       <span className="text-sm font-medium">{label}</span>
//       <span className="text-sm text-muted-foreground">{value}</span>
//     </div>
//   )
// }

// function EventCard({ event }: { event: { slug: string; title: string; description: string } }) {
//   return (
//     <Link
//       href={`/events/${event.slug}`}
//       className="block p-4 bg-muted rounded-lg hover:bg-muted/80"
//     >
//       <h3 className="font-medium mb-2">{event.title}</h3>
//       <p className="text-sm text-muted-foreground">{event.description}</p>
//     </Link>
//   )
// }

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react"
import { EventsService } from "@/lib/services/events-service"

export async function generateStaticParams() {
  const events = await EventsService.getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await EventsService.getEventBySlug(params.slug)
  return {
    title: event?.title || "Event Not Found",
    description: event?.description || "Event details",
    ...(event?.image && {
      openGraph: { images: [{ url: event.image }] },
      twitter: { images: [event.image] }
    })
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await EventsService.getEventBySlug(params.slug)
  if (!event) notFound()

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Link href="/events" className="inline-flex items-center mb-6 text-sm hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to events
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
            <Image 
              src={event.image || `/placeholder.svg?text=${event.category}`}
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
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}