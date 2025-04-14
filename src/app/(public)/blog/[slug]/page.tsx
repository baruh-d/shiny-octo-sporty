// src/app/(public)/blog/[slug]/page.tsx
export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold">Post: {params.slug}</h1>
        <p>Content will go here</p>
      </div>
    )
  }