import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/admin/", "/athlete/", "/coach/", "/scout/"],
    },
    sitemap: "https://sportsacademyhub.com/sitemap.xml",
  }
}

