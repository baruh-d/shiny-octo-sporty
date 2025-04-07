import type { Metadata } from "next"
import { VideoGallery } from "@/components/video/video-gallery"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundImage } from "@/components/ui/background-image"

export const metadata: Metadata = {
  title: "Training Videos | Sports Academy Hub",
  description: "Access training videos and tutorials for athletes and coaches",
}

export default function TrainingVideosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundImage src="/placeholder.svg?height=200&width=1200" alt="Training videos background" className="mb-8 rounded-lg">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Training Videos</h1>
          <p className="text-white/90 max-w-2xl">
            Access a comprehensive library of training videos to improve your skills and techniques. Learn from experts
            and enhance your performance.
          </p>
        </div>
      </BackgroundImage>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="technique">Techniques</TabsTrigger>
          <TabsTrigger value="drills">Drills</TabsTrigger>
          <TabsTrigger value="tactics">Tactics</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <VideoGallery />
        </TabsContent>
        <TabsContent value="technique" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Technique Videos</CardTitle>
              <CardDescription>Master the fundamentals with our technique training videos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon: Filtered technique videos</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drills" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Drill Videos</CardTitle>
              <CardDescription>Improve your skills with our specialized drill videos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon: Filtered drill videos</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tactics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tactical Videos</CardTitle>
              <CardDescription>Learn advanced tactics and strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon: Filtered tactical videos</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

