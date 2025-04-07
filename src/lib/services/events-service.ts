// This is a placeholder service that would normally fetch from your database
// In a real application, you would connect to your database or API

export interface Event {
    id: string
    title: string
    slug: string
    description: string
    date: string
    time: string
    location: string
    category: string
    image?: string
    attendees: number
    organizer: string
    featured: boolean
  }
  
  // Mock data for demonstration
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "National Athletics Championship 2023",
      slug: "national-athletics-championship-2023",
      description: "The premier athletics event in Kenya featuring top athletes from across the country.",
      date: "June 10-12, 2023",
      time: "9:00 AM - 6:00 PM",
      location: "Kasarani Stadium, Nairobi",
      category: "athletics",
      image: "/placeholder.svg?height=400&width=600&text=Athletics",
      attendees: 1200,
      organizer: "Athletics Kenya",
      featured: true,
    },
    {
      id: "2",
      title: "Kenya Premier League Finals",
      slug: "kenya-premier-league-finals",
      description: "The culmination of the football season with the top teams competing for the championship.",
      date: "July 15, 2023",
      time: "3:00 PM - 5:00 PM",
      location: "Nyayo Stadium, Nairobi",
      category: "football",
      image: "/placeholder.svg?height=400&width=600&text=Football",
      attendees: 2500,
      organizer: "Football Kenya Federation",
      featured: true,
    },
    {
      id: "3",
      title: "Safari Sevens Rugby Tournament",
      slug: "safari-sevens-rugby-tournament",
      description: "International rugby sevens tournament featuring teams from around the world.",
      date: "August 5-6, 2023",
      time: "10:00 AM - 7:00 PM",
      location: "RFUEA Ground, Nairobi",
      category: "rugby",
      image: "/placeholder.svg?height=400&width=600&text=Rugby",
      attendees: 1800,
      organizer: "Kenya Rugby Union",
      featured: true,
    },
    {
      id: "4",
      title: "Basketball Elite League Playoffs",
      slug: "basketball-elite-league-playoffs",
      description: "The top basketball teams in Kenya compete in the playoff series.",
      date: "September 20-25, 2023",
      time: "4:00 PM - 9:00 PM",
      location: "Nyayo Gymnasium, Nairobi",
      category: "basketball",
      image: "/placeholder.svg?height=400&width=600&text=Basketball",
      attendees: 950,
      organizer: "Kenya Basketball Federation",
      featured: false,
    },
    {
      id: "5",
      title: "National Volleyball Championship",
      slug: "national-volleyball-championship",
      description: "Annual volleyball championship featuring the best teams from across Kenya.",
      date: "October 8-10, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "Kasarani Indoor Arena, Nairobi",
      category: "volleyball",
      image: "/placeholder.svg?height=400&width=600&text=Volleyball",
      attendees: 750,
      organizer: "Kenya Volleyball Federation",
      featured: false,
    },
    {
      id: "6",
      title: "Youth Athletics Development Camp",
      slug: "youth-athletics-development-camp",
      description: "Training camp for promising young athletes aged 12-18.",
      date: "November 15-20, 2023",
      time: "8:00 AM - 4:00 PM",
      location: "Kenyatta University, Nairobi",
      category: "athletics",
      image: "/placeholder.svg?height=400&width=600&text=Youth+Athletics",
      attendees: 300,
      organizer: "Sports Academy Hub",
      featured: false,
    },
  ]
  
  export class EventsService {
    // Get all events or filter by category
    static async getEvents(category = "all"): Promise<Event[]> {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      if (category === "all") {
        return mockEvents
      }
  
      return mockEvents.filter((event) => event.category === category)
    }
  
    // Get featured events
    static async getFeaturedEvents(): Promise<Event[]> {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
  
      return mockEvents.filter((event) => event.featured)
    }
  
    // Get event by slug
    static async getEventBySlug(slug: string): Promise<Event | null> {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200))
  
      const event = mockEvents.find((event) => event.slug === slug)
      return event || null
    }
  
    // Get related events (same category)
    static async getRelatedEvents(slug: string, limit = 3): Promise<Event[]> {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
  
      const currentEvent = mockEvents.find((event) => event.slug === slug)
      if (!currentEvent) return []
  
      return mockEvents.filter((event) => event.category === currentEvent.category && event.slug !== slug).slice(0, limit)
    }
  }
  
  