import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ActivityFeed() {
  // This would typically fetch data from your Supabase backend
  const activities = [
    {
      id: "1",
      user: {
        name: "John Kamau",
        image: "/placeholder.svg?height=32&width=32",
        initials: "JK",
      },
      action: "registered for",
      target: "Youth Soccer Tournament",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Mary Wanjiku",
        image: "/placeholder.svg?height=32&width=32",
        initials: "MW",
      },
      action: "uploaded a new",
      target: "performance video",
      time: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "Peter Ochieng",
        image: "/placeholder.svg?height=32&width=32",
        initials: "PO",
      },
      action: "donated",
      target: "10 soccer balls",
      time: "yesterday",
    },
    {
      id: "4",
      user: {
        name: "Susan Akinyi",
        image: "/placeholder.svg?height=32&width=32",
        initials: "SA",
      },
      action: "was selected for",
      target: "National Youth Team",
      time: "2 days ago",
    },
    {
      id: "5",
      user: {
        name: "James Mwangi",
        image: "/placeholder.svg?height=32&width=32",
        initials: "JM",
      },
      action: "completed",
      target: "Advanced Training Module",
      time: "3 days ago",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
