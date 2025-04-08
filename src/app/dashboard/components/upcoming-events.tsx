import { CalendarDays, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function UpcomingEvents() {
  // This would typically fetch data from your Supabase backend
  const events = [
    {
      id: "1",
      title: "Youth Soccer Tournament",
      date: "May 15, 2025",
      location: "Nairobi Sports Complex",
      participants: 120,
      url: "/events/youth-soccer-tournament",
    },
    {
      id: "2",
      title: "Basketball Skills Camp",
      date: "May 22, 2025",
      location: "Mombasa Indoor Arena",
      participants: 45,
      url: "/events/basketball-skills-camp",
    },
    {
      id: "3",
      title: "Athletics Trials",
      date: "June 5, 2025",
      location: "Eldoret Stadium",
      participants: 80,
      url: "/events/athletics-trials",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex flex-col space-y-2 rounded-lg border p-3">
          <div className="font-medium">{event.title}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-1 h-4 w-4" />
            {event.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            {event.participants} participants
          </div>
          <Button size="sm" variant="outline" className="mt-2" asChild>
            <Link href={event.url}>Event Details</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
