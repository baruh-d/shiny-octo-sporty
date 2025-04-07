import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sportsacademyhub.com"

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

  return routes
}

