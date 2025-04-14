import type { Metadata } from "next"
// import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
// import { WordPressService } from "@/lib/services/wordpress-service"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CalendarDays, User, ArrowLeft, Tag } from "lucide-react"

// Define correct page props type
type BlogPostPageProps = {
  params: {
    slug: string
  }
}

// Mock WordPress Service for development (remove when actual service is implemented)
const WordPressService = {
  getPosts: async (page = 1, perPage = 10) => {
    const posts = [
      {
        id: 1,
        slug: "sample-post",
        // Add other necessary properties for development
      }
    ]
    const startIndex = (page - 1) * perPage
    return posts.slice(startIndex, startIndex + perPage)
  },
  getPostBySlug: async (slug: string) => {
    // Use the slug to identify which post to return
    if (slug !== "sample-post") {
      return null;
    }
    return {
      title: { rendered: "Sample Post" },
      content: { rendered: "<p>This is a sample post content.</p>" },
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
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await WordPressService.getPosts(1, 100)
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params for blog posts:", error)
    return []
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
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
            {/* Related posts would be fetched and displayed here */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Related+Post+${i}`}
                    alt={`Related Post ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Related Post Title {i}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/blog/related-post-${i}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }
}