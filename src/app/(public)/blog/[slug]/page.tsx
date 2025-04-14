import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CalendarDays, User, ArrowLeft, Tag } from "lucide-react"

// Define WordPress post types
interface WPPost {
  id?: number
  slug?: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  modified?: string
  _embedded?: {
    "wp:featuredmedia"?: [{ source_url: string }]
    author?: [{ name: string }]
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>
  }
}

// Define page props according to Next.js 14 requirements
interface PageProps {
  params: {
    slug: string
  }
  searchParams?: Record<string, string | string[] | undefined>
}

// Mock WordPress Service for development (remove when actual service is implemented)
const WordPressService = {
  getPosts: async (page = 1, perPage = 10) => {
    const posts = [
      {
        id: 1,
        slug: "sample-post",
        title: { rendered: "Sample Post" },
        excerpt: { rendered: "<p>This is a sample excerpt.</p>" },
        date: "2025-04-01T12:00:00",
      },
      {
        id: 2,
        slug: "training-programs",
        title: { rendered: "Effective Training Programs for Youth Athletes" },
        excerpt: { rendered: "<p>Discover effective training programs designed specifically for young athletes.</p>" },
        date: "2025-04-10T10:00:00",
      },
      {
        id: 3,
        slug: "nutrition-tips",
        title: { rendered: "Nutrition Tips for Peak Performance" },
        excerpt: { rendered: "<p>Learn how proper nutrition can help young athletes perform at their best.</p>" },
        date: "2025-04-12T14:30:00",
      },
      {
        id: 4,
        slug: "injury-prevention",
        title: { rendered: "Injury Prevention Strategies for Youth Sports" },
        excerpt: { rendered: "<p>Essential strategies to help prevent injuries in young athletes.</p>" },
        date: "2025-04-08T09:15:00",
      },
      {
        id: 5,
        slug: "mental-preparation",
        title: { rendered: "Mental Preparation Techniques for Competitions" },
        excerpt: { rendered: "<p>Mental skills training to help young athletes perform under pressure.</p>" },
        date: "2025-04-05T11:45:00",
      }
    ]
    const startIndex = (page - 1) * perPage
    return posts.slice(startIndex, startIndex + perPage)
  },
  getPostBySlug: async (slug: string) => {
    // Sample post data based on slug
    const postData: Record<string, WPPost> = {
      "sample-post": {
        title: { rendered: "Sample Post" },
        content: { rendered: "<p>This is a sample post content.</p><p>This is another paragraph in the sample post content.</p>" },
        excerpt: { rendered: "<p>This is a sample excerpt.</p>" },
        date: "2025-04-01T12:00:00",
        modified: "2025-04-14T12:00:00",
        _embedded: {
          "wp:featuredmedia": [{ source_url: "/placeholder.svg" }],
          "author": [{ name: "Sample Author" }],
          "wp:term": [
            [{ id: 1, name: "Sample Category", slug: "sample-category" }],
            [{ id: 2, name: "Sample Tag", slug: "sample-tag" }]
          ]
        }
      },
      "training-programs": {
        title: { rendered: "Effective Training Programs for Youth Athletes" },
        content: { rendered: "<p>Youth athletes have unique needs when it comes to training programs. Their bodies are still developing, and proper training can help them grow stronger while minimizing injury risk.</p><h2>Key Components of Youth Training Programs</h2><ul><li>Age-appropriate exercises</li><li>Proper technique focus</li><li>Adequate recovery periods</li><li>Progressive overload</li></ul><p>Always consult with qualified coaches who understand youth development.</p>" },
        excerpt: { rendered: "<p>Discover effective training programs designed specifically for young athletes.</p>" },
        date: "2025-04-10T10:00:00",
        modified: "2025-04-14T12:00:00",
        _embedded: {
          "wp:featuredmedia": [{ source_url: "/placeholder.svg?text=Training+Programs" }],
          "author": [{ name: "Coach Johnson" }],
          "wp:term": [
            [{ id: 1, name: "Training", slug: "training" }],
            [{ id: 3, name: "Youth Development", slug: "youth-development" }, { id: 4, name: "Strength Training", slug: "strength-training" }]
          ]
        }
      },
      "nutrition-tips": {
        title: { rendered: "Nutrition Tips for Peak Performance" },
        content: { rendered: "<p>Proper nutrition is crucial for young athletes' performance and development.</p><h2>Essential Nutrition Guidelines</h2><p>Young athletes should focus on balanced meals containing:</p><ul><li>Quality protein sources</li><li>Complex carbohydrates</li><li>Healthy fats</li><li>Plenty of fruits and vegetables</li></ul><p>Hydration is also critical for optimal performance and recovery.</p>" },
        excerpt: { rendered: "<p>Learn how proper nutrition can help young athletes perform at their best.</p>" },
        date: "2025-04-12T14:30:00",
        modified: "2025-04-13T09:20:00",
        _embedded: {
          "wp:featuredmedia": [{ source_url: "/placeholder.svg?text=Nutrition+Tips" }],
          "author": [{ name: "Nutrition Team" }],
          "wp:term": [
            [{ id: 5, name: "Nutrition", slug: "nutrition" }],
            [{ id: 6, name: "Performance", slug: "performance" }, { id: 7, name: "Health", slug: "health" }]
          ]
        }
      },
      "injury-prevention": {
        title: { rendered: "Injury Prevention Strategies for Youth Sports" },
        content: { rendered: "<p>Preventing injuries is essential for young athletes' long-term development and enjoyment of sports.</p><h2>Effective Prevention Strategies</h2><ul><li>Proper warm-up and cool-down routines</li><li>Appropriate equipment that fits correctly</li><li>Strength and flexibility training</li><li>Adequate rest between training sessions</li></ul><p>Coaches and parents should also monitor training loads to prevent overtraining.</p>" },
        excerpt: { rendered: "<p>Essential strategies to help prevent injuries in young athletes.</p>" },
        date: "2025-04-08T09:15:00",
        modified: "2025-04-09T16:40:00",
        _embedded: {
          "wp:featuredmedia": [{ source_url: "/placeholder.svg?text=Injury+Prevention" }],
          "author": [{ name: "Sports Medicine Team" }],
          "wp:term": [
            [{ id: 8, name: "Injury Prevention", slug: "injury-prevention" }],
            [{ id: 9, name: "Safety", slug: "safety" }, { id: 10, name: "Sports Medicine", slug: "sports-medicine" }]
          ]
        }
      },
      "mental-preparation": {
        title: { rendered: "Mental Preparation Techniques for Competitions" },
        content: { rendered: "<p>Mental skills are just as important as physical skills for athletic success.</p><h2>Key Mental Preparation Techniques</h2><ul><li>Visualization and imagery</li><li>Positive self-talk</li><li>Goal setting</li><li>Focus and concentration drills</li><li>Breathing techniques for anxiety management</li></ul><p>Regular practice of these techniques can help young athletes perform better under pressure.</p>" },
        excerpt: { rendered: "<p>Mental skills training to help young athletes perform under pressure.</p>" },
        date: "2025-04-05T11:45:00",
        modified: "2025-04-07T14:15:00",
        _embedded: {
          "wp:featuredmedia": [{ source_url: "/placeholder.svg?text=Mental+Preparation" }],
          "author": [{ name: "Sports Psychology Team" }],
          "wp:term": [
            [{ id: 11, name: "Mental Training", slug: "mental-training" }],
            [{ id: 12, name: "Psychology", slug: "psychology" }, { id: 13, name: "Competition", slug: "competition" }]
          ]
        }
      }
    };
    
    // Return the post data or null if not found
    return postData[slug] || null;
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await WordPressService.getPosts(1, 100)
  return posts.map((post) => ({
    slug: post.slug || '',
  }))
}

// Update metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await WordPressService.getPostBySlug(params.slug)

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      }
    }

    const title = post.title.rendered
    const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160)
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/og-image.jpg"

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: ["Sports Academy Hub"],
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [featuredImage],
      },
    }
  } catch (error) {
    console.error("Error generating metadata for blog post:", error)
    return {
      title: "Blog Post",
      description: "Sports Academy Hub blog post",
    }
  }
}

// Update the page component
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await WordPressService.getPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    const author = post._embedded?.["author"]?.[0]?.name || "Sports Academy Hub"
    const date = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const categories = post._embedded?.["wp:term"]?.[0] || []
    const tags = post._embedded?.["wp:term"]?.[1] || []

    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category: { id: number; slug: string; name: string }) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded-md hover:bg-primary/90"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Link href="/blog" className="inline-flex items-center mb-6 text-sm hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>

          {featuredImage && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={featuredImage || "/placeholder.svg"}
                alt={post.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              <Tag className="h-5 w-5 text-muted-foreground" />
              {tags.map((tag: { id: number; slug: string; name: string }) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="text-sm bg-muted px-2 py-1 rounded-md hover:bg-muted/80"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </article>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Using our mock posts as related posts */}
            {(() => {
              // Get related posts based on current post's categories/tags, excluding current post
              const allPosts = [
                {
                  id: 2,
                  slug: "training-programs",
                  title: "Effective Training Programs for Youth Athletes",
                  excerpt: "Discover effective training programs designed specifically for young athletes.",
                  image: "/placeholder.svg?text=Training+Programs",
                  author: "Coach Johnson"
                },
                {
                  id: 3,
                  slug: "nutrition-tips",
                  title: "Nutrition Tips for Peak Performance",
                  excerpt: "Learn how proper nutrition can help young athletes perform at their best.",
                  image: "/placeholder.svg?text=Nutrition+Tips",
                  author: "Nutrition Team"
                },
                {
                  id: 4,
                  slug: "injury-prevention",
                  title: "Injury Prevention Strategies for Youth Sports",
                  excerpt: "Essential strategies to help prevent injuries in young athletes.",
                  image: "/placeholder.svg?text=Injury+Prevention",
                  author: "Sports Medicine Team"
                }
              ];
              
              // Filter out current post (in real implementation)
              const relatedPosts = allPosts.filter(post => post.slug !== params.slug).slice(0, 3);
              
              return relatedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </Card>
              ));
            })()}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }
}