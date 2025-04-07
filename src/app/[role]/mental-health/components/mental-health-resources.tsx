"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const resources = {
  articles: [
    {
      title: "Managing Performance Anxiety in Sports",
      description: "Learn techniques to overcome anxiety before competitions.",
      link: "#",
    },
    {
      title: "Building Mental Resilience as an Athlete",
      description: "Strategies to bounce back from setbacks and failures.",
      link: "#",
    },
    {
      title: "The Importance of Rest and Recovery",
      description: "Why mental rest is as important as physical recovery.",
      link: "#",
    },
    {
      title: "Mindfulness Techniques for Athletes",
      description: "Improve focus and performance through mindfulness.",
      link: "#",
    },
  ],
  videos: [
    {
      title: "Visualization Techniques for Athletes",
      description: "How to use mental imagery to improve performance.",
      link: "#",
    },
    {
      title: "Managing Stress During Competition",
      description: "Expert advice on handling pressure moments.",
      link: "#",
    },
    {
      title: "Team Dynamics and Mental Health",
      description: "Building a supportive team environment.",
      link: "#",
    },
  ],
  podcasts: [
    {
      title: "The Athlete's Mind",
      description: "Weekly discussions on sports psychology topics.",
      link: "#",
    },
    {
      title: "Mental Game Coaching",
      description: "Interviews with top sports psychologists.",
      link: "#",
    },
    {
      title: "Beyond the Physical",
      description: "Stories of athletes overcoming mental challenges.",
      link: "#",
    },
  ],
}

export function MentalHealthResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
        <CardDescription>Educational materials to support your mental wellbeing</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="articles">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-4">
                {resources.articles.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Read more <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="videos">
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-4">
                {resources.videos.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Watch video <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="podcasts">
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-4">
                {resources.podcasts.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Listen now <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

