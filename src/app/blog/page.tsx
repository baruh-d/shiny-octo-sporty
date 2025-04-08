// import type { Metadata } from "next"
// import Image from "next/image"
// import { WordPressService } from "@/lib/services/wordpress-service"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"

// export const metadata: Metadata = {
//   title: "Blog | Sports Academy Hub",
//   description: "Latest news, articles, and insights from Sports Academy Hub",
// }

// export default async function BlogPage() {
//   const posts = await WordPressService.getPosts(1, 9)
//   const categories = await WordPressService.getCategories()
//   const tags = await WordPressService.getTags()

//   return (
//     <div className="container mx-auto py-10 px-4 md:px-6">
//       <div className="mb-10 text-center">
//         <h1 className="text-3xl font-bold tracking-tight">Sports Academy Blog</h1>
//         <p className="mt-2 text-muted-foreground">
//           Latest news, articles, and insights from our sports academy
//         </p>
//       </div>

//       <div className="grid gap-8 md:grid-cols-4">
//         <div className="md:col-span-3">
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {posts.map((post) => (
//               <Card key={post.id} className="overflow-hidden">
//                 <div className="aspect-video relative">
//                   <Image
//                     src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=200&width=300"}
//                     alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-lg" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
//                   <CardDescription 
//                     className="line-clamp-2 mt-2"
//                     dangerouslySetInnerHTML={{ 
//                       __html: post.excerpt.rendered.replace(/<[^>]*>/g, '')
//                     }} 
//                   />
//                 </CardHeader>
//                 <CardFooter className="p-4 pt-0 flex justify-between">
//                   <div className="text-xs text-muted-foreground">
//                     {new Date(post.date).toLocaleDateString()}
//                   </div>
//                   <Button variant="ghost" size="sm" asChild>
//                     <Link href={`/blog/${post.slug}`}>Read More</Link>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
        
//         <div>
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Categories</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2">
//                   {categories.map((category) => (
//                     <li key={category.id}>
//                       <Link 
//                         href={`/blog/category/${category.slug}`}
//                         className="text-sm hover:text-primary"
//                       >
//                         {category.name} ({category.count})
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Popular Tags</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2">
//                   {tags.slice(0, 15).map((tag) => (
//                     <Badge key={tag.id} variant="outline" asChild>
//                       <Link href={`/blog/tag/${tag.slug}`}>
//                         {tag.name}
//                       </Link>
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Subscribe</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form className="space-y-4">
//                   <Input placeholder="Your email address" type="email" />
//                   <Button className="w-full">Subscribe to Newsletter</Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // This code defines a blog page for a sports academy website using Next.js and React.