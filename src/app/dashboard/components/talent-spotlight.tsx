import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TalentSpotlight() {
  // This would typically fetch data from your Supabase backend
  const featuredAthletes = [
    {
      id: "1",
      name: "Michael Omondi",
      sport: "Soccer",
      age: 17,
      location: "Nairobi",
      achievements: ["Regional Champion", "Youth League MVP"],
      image: "/placeholder.svg?height=100&width=100",
      profileUrl: "/athletes/michael-omondi",
    },
    {
      id: "2",
      name: "Sarah Kimani",
      sport: "Basketball",
      age: 16,
      location: "Mombasa",
      achievements: ["National Team Selection", "School Tournament MVP"],
      image: "/placeholder.svg?height=100&width=100",
      profileUrl: "/athletes/sarah-kimani",
    },
    {
      id: "3",
      name: "David Njoroge",
      sport: "Athletics",
      age: 18,
      location: "Eldoret",
      achievements: ["800m National Record", "Cross Country Champion"],
      image: "/placeholder.svg?height=100&width=100",
      profileUrl: "/athletes/david-njoroge",
    },
  ]

  return (
    <div className="space-y-8">
      {featuredAthletes.map((athlete) => (
        <div key={athlete.id} className="flex items-center gap-4 rounded-lg border p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={athlete.image} alt={athlete.name} />
            <AvatarFallback>{athlete.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{athlete.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {athlete.age} years • {athlete.sport} • {athlete.location}
                </p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={athlete.profileUrl}>View Profile</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {athlete.achievements.map((achievement, i) => (
                <Badge key={i} variant="outline" className="bg-kas-green/10 text-kas-green">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
