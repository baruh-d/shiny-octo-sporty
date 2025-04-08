import { CalendarCheck, Medal, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RecentEvents() {
  // This would typically fetch data from your Supabase backend
  const events = [
    {
      id: "1",
      title: "Regional Soccer Championship",
      date: "April 28, 2025",
      participants: 150,
      winner: "Nairobi United",
      url: "/events/regional-soccer-championship",
    },
    {
      id: "2",
      title: "Swimming Gala",
      date: "April 15, 2025",
      participants: 75,
      winner: "Mombasa Sharks",
      url: "/events/swimming-gala",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex flex-col space-y-2 rounded-lg border p-3">
          <div className="font-medium">{event.title}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarCheck className="mr-1 h-4 w-4" />
            {event.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            {event.participants} participants
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Medal className="mr-1 h-4 w-4" />
            Winner: {event.winner}
          </div>
          <Button size="sm" variant="outline" className="mt-2" asChild>
            <Link href={event.url}>View Results</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
