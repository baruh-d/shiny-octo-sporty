import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sportsacademyhub.com"

  if (process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_BASE_URL) {
    console.warn("NEXT_PUBLIC_BASE_URL is not set. Using default.");
  }
  // Ensure baseUrl is a valid URL
  try {
    new URL(baseUrl);
  }
  catch {
    console.error("Invalid base URL:", baseUrl);
    throw new Error("Invalid base URL. Please set a valid NEXT_PUBLIC_BASE_URL.");
  }  

  // Static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/events",
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Add dynamic routes here when you have data
  // For example, blog posts, events, etc.
//   const blogPosts = [
//   { slug: "kenyan-sports-rising" },
//   { slug: "athlete-nutrition" },
// ];

// const dynamicRoutes = blogPosts.map((post) => ({
//   url: `${baseUrl}/blog/${post.slug}`,
//   lastModified: new Date("2024-04-01"), // replace with actual date
//   changeFrequency: "monthly" as const,
//   priority: 0.7,
// }));


  return routes
}

