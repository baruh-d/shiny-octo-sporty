// app/(public)/blog/[slug]/page.tsx
import { notFound } from "next/navigation"

// Simple mock data - replace with your actual data fetching
const mockPosts = {
  "sample-post": {
    title: "Sample Post",
    content: "<p>This is sample content</p>",
    date: "2025-01-01",
    author: "Admin",
    image: "/placeholder.svg"
  },
  "training-programs": {
    title: "Training Programs",
    content: "<p>Training content</p>",
    date: "2025-01-02",
    author: "Coach",
    image: "/placeholder.svg"
  }
}

export async function generateStaticParams() {
  return Object.keys(mockPosts).map(slug => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockPosts[params.slug as keyof typeof mockPosts]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}