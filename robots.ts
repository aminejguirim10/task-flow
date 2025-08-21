import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Applies to all search engines like Google, Bing, Yahoo, etc.
      allow: "/",
    },
    sitemap: `${process.env.BETTER_AUTH_URL}/sitemap.xml`,
  }
}
